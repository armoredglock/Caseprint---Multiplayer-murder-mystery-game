import React, { useId } from 'react';

/**
 * Realistic 3D Metallic Paperclip component
 * Features:
 * - Cylindrical wire bevel with multi-stop metallic linear gradients
 * - Physical paper clamping indent shadow
 * - Snipped wire end-caps with metallic bevel
 * - Multi-stage soft drop shadows & contact ambient occlusion
 * - Specular light streak along grazing angle
 */
const RealisticPaperclip = ({ 
  className = '', 
  angle = -12, 
  size = 72, 
  variant = 'steel' 
}) => {
  const reactId = useId();
  // Sanitize id for SVG element id references
  const id = reactId.replace(/[^a-zA-Z0-9-_]/g, '_');
  const isBrass = variant === 'brass';

  // Standard GEM Paperclip single-line wire path
  const clipPathD = "M 8,26 L 8,56 A 8,8 0 0,0 24,56 L 24,14 A 6,6 0 0,0 12,14 L 12,46 A 3,3 0 0,0 18,46 L 18,28";

  return (
    <div 
      className={`absolute pointer-events-none z-30 select-none ${className}`}
      style={{
        width: `${size * 0.44}px`,
        height: `${size}px`,
        transform: `rotate(${angle}deg)`,
      }}
    >
      <svg 
        viewBox="0 0 32 72" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Dual-stage realistic soft shadow filter */}
          <filter id={`clipFilter-${id}`} x="-40%" y="-40%" width="200%" height="200%">
            {/* Ambient occlusion contact shadow (dark, tight) */}
            <feDropShadow dx="0.6" dy="1.4" stdDeviation="0.8" floodColor="#000000" floodOpacity="0.45" />
            {/* Diffuse cast shadow on paper (soft, extended) */}
            <feDropShadow dx="1.8" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.4" />
          </filter>

          {/* Paper indent / pinch blur filter */}
          <filter id={`pinchBlur-${id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>

          {/* Steel/Chrome Cylindrical Metallic Gradient */}
          <linearGradient id={`steelGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="15%" stopColor="#cbd5e1" />
            <stop offset="30%" stopColor="#f8fafc" />
            <stop offset="48%" stopColor="#94a3b8" />
            <stop offset="65%" stopColor="#ffffff" />
            <stop offset="82%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Brass / Aged Vintage Metal Gradient */}
          <linearGradient id={`brassGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5c3d0b" />
            <stop offset="15%" stopColor="#d4af37" />
            <stop offset="32%" stopColor="#fff8db" />
            <stop offset="50%" stopColor="#aa7c11" />
            <stop offset="68%" stopColor="#ffeaa7" />
            <stop offset="85%" stopColor="#c59b27" />
            <stop offset="100%" stopColor="#483008" />
          </linearGradient>

          {/* Specular White Highlight Gradient */}
          <linearGradient id={`specularGrad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#f1f5f9" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#94a3b8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* 1. Subtle Paper Clamping Indent (The depression made by physical tension) */}
        <ellipse 
          cx="15" 
          cy="38" 
          rx="5" 
          ry="12" 
          fill="rgba(0, 0, 0, 0.14)" 
          filter={`url(#pinchBlur-${id})`} 
        />

        {/* 2. Primary Shadow & Contact Wire Layer */}
        <g filter={`url(#clipFilter-${id})`}>
          {/* Wire dark silhouette (underlying metal edge bevel) */}
          <path
            d={clipPathD}
            stroke={isBrass ? "#2d1b04" : "#0f172a"}
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 3. Primary Cylindrical Metal Body */}
          <path
            d={clipPathD}
            stroke={`url(#${isBrass ? `brassGrad-${id}` : `steelGrad-${id}`})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 4. Fine Metallic Specular Ridge */}
          <path
            d="M 7.5,26 L 7.5,56 A 7.5,7.5 0 0,0 23.5,56 L 23.5,14 A 5.5,5.5 0 0,0 12.5,14 L 12.5,46"
            stroke={`url(#specularGrad-${id})`}
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />
        </g>

        {/* 5. Snipped Wire End-Caps (Flat factory cut detail) */}
        <ellipse 
          cx="8" 
          cy="26" 
          rx="1.4" 
          ry="1.1" 
          fill={isBrass ? "#855811" : "#475569"} 
          stroke={isBrass ? "#2d1b04" : "#0f172a"} 
          strokeWidth="0.5" 
        />
        <ellipse 
          cx="18" 
          cy="28" 
          rx="1.4" 
          ry="1.1" 
          fill={isBrass ? "#855811" : "#475569"} 
          stroke={isBrass ? "#2d1b04" : "#0f172a"} 
          strokeWidth="0.5" 
        />
      </svg>
    </div>
  );
};

export default RealisticPaperclip;
