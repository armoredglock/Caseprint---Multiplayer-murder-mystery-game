import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingDust = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles once on mount
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white opacity-20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            boxShadow: `0 0 ${p.size * 2}px rgba(255, 255, 255, 0.4)`
          }}
          animate={{
            y: ['0vh', '-100vh'],
            x: [
              `${Math.sin(p.delay) * 10}vw`, 
              `${Math.cos(p.duration) * 10}vw`, 
              `${-Math.sin(p.delay) * 10}vw`
            ],
            opacity: [0, 0.4, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay
          }}
        />
      ))}
    </div>
  );
};

export default FloatingDust;
