import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

const DiceRoller3D = ({ onRollStart, onRollComplete, isRolling }) => {
  const mountRef = useRef(null);
  
  // To track animation state
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const worldRef = useRef(null);
  const diceMeshRef = useRef(null);
  const diceBodyRef = useRef(null);
  const animationIdRef = useRef(null);

  // Helper to draw a texture for dice faces
  const createDiceTexture = (number) => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Background (ivory / bone color)
    ctx.fillStyle = '#f0eade';
    ctx.fillRect(0, 0, 128, 128);
    
    // Border
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#d0c8b6';
    ctx.strokeRect(0, 0, 128, 128);

    // Dots
    ctx.fillStyle = '#1a1a1a';
    
    const drawDot = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.fill();
    };

    const c = 64; // center
    const o = 32; // offset
    
    if (number === 1 || number === 3 || number === 5) drawDot(c, c);
    if (number !== 1) {
      drawDot(c - o, c - o);
      drawDot(c + o, c + o);
    }
    if (number === 4 || number === 5 || number === 6) {
      drawDot(c - o, c + o);
      drawDot(c + o, c - o);
    }
    if (number === 6) {
      drawDot(c, c - o);
      drawDot(c, c + o);
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };

  useEffect(() => {
    // 1. Setup Three.js Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // We want a small transparent canvas
    const width = 60;
    const height = 60;
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    
    if (mountRef.current) {
      mountRef.current.innerHTML = '';
      mountRef.current.appendChild(renderer.domElement);
    }
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // 2. Setup Cannon.js Physics
    const world = new CANNON.World();
    world.gravity.set(0, -9.82 * 4, 0); // strong gravity for snappy roll
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;
    worldRef.current = world;

    // 3. Create Dice Mesh & Body
    const size = 1.2;
    
    // Materials (1 to 6)
    const materials = [
      new THREE.MeshStandardMaterial({ map: createDiceTexture(1), roughness: 0.2 }), // Right
      new THREE.MeshStandardMaterial({ map: createDiceTexture(6), roughness: 0.2 }), // Left
      new THREE.MeshStandardMaterial({ map: createDiceTexture(2), roughness: 0.2 }), // Top
      new THREE.MeshStandardMaterial({ map: createDiceTexture(5), roughness: 0.2 }), // Bottom
      new THREE.MeshStandardMaterial({ map: createDiceTexture(3), roughness: 0.2 }), // Front
      new THREE.MeshStandardMaterial({ map: createDiceTexture(4), roughness: 0.2 }), // Back
    ];

    const geometry = new THREE.BoxGeometry(size, size, size);
    const diceMesh = new THREE.Mesh(geometry, materials);
    diceMesh.castShadow = true;
    diceMesh.receiveShadow = true;
    scene.add(diceMesh);
    diceMeshRef.current = diceMesh;

    const shape = new CANNON.Box(new CANNON.Vec3(size / 2, size / 2, size / 2));
    const diceBody = new CANNON.Body({
      mass: 1,
      shape: shape,
      material: new CANNON.Material({ friction: 0.3, restitution: 0.4 })
    });
    
    // Initial position
    diceBody.position.set(0, 1, 0);
    // Slight rotation to look natural at rest
    diceBody.quaternion.setFromEuler(Math.PI / 6, Math.PI / 4, 0);
    
    world.addBody(diceBody);
    diceBodyRef.current = diceBody;

    // 4. Ground Plane
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({
      mass: 0, // static
      shape: groundShape,
      material: new CANNON.Material({ friction: 0.3, restitution: 0.4 })
    });
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    groundBody.position.set(0, -0.5, 0); // slightly below to give bounce space
    world.addBody(groundBody);

    // Initial Sync
    diceMesh.position.copy(diceBody.position);
    diceMesh.quaternion.copy(diceBody.quaternion);

    // 5. Animation Loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      world.step(1 / 60, delta, 3);
      
      diceMesh.position.copy(diceBody.position);
      diceMesh.quaternion.copy(diceBody.quaternion);
      
      renderer.render(scene, camera);
    };
    
    animate();

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      materials.forEach(m => {
        m.map.dispose();
        m.dispose();
      });
      renderer.dispose();
    };
  }, []);

  // Monitor rolling state
  useEffect(() => {
    if (isRolling && diceBodyRef.current && worldRef.current) {
      const dice = diceBodyRef.current;
      
      // Toss it up and spin!
      dice.position.set(0, 4, 0); // Throw it up
      dice.velocity.set(0, 0, 0);
      dice.angularVelocity.set(
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10
      );
      
      // Wake it up
      dice.wakeUp();

      // Start checking for when it stops
      let checkInterval;
      
      // Wait a moment for it to start falling, then poll for resting state
      setTimeout(() => {
        checkInterval = setInterval(() => {
          // If velocity is very low and angular velocity is very low, it stopped
          const v = dice.velocity;
          const a = dice.angularVelocity;
          
          if (
            Math.abs(v.x) < 0.1 && Math.abs(v.y) < 0.1 && Math.abs(v.z) < 0.1 &&
            Math.abs(a.x) < 0.1 && Math.abs(a.y) < 0.1 && Math.abs(a.z) < 0.1
          ) {
            clearInterval(checkInterval);
            if (onRollComplete) onRollComplete();
          }
        }, 100);
      }, 500);
    }
  }, [triggerRoll]);

  return (
    <div 
      ref={mountRef} 
      className="cursor-pointer transition-transform hover:scale-110 active:scale-95" 
      onClick={() => {
        if (!isRolling && onRollStart) onRollStart();
      }}
      title="Roll Dice"
      style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden' }}
    />
  );
};

export default DiceRoller3D;
