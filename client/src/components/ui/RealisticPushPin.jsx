import React, { useId } from 'react';

/**
 * Realistic 3D Push Pin (Thumb Tack) Component
 * Features:
 * - 3D molded acrylic head with cylindrical bevel and specular glint
 * - Fine steel needle penetrating the board
 * - Realistic contact & cast drop shadows
 */
const RealisticPushPin = ({ 
  className = '', 
  color = 'red', 
  size = 28,
  angle = 12 
}) => {
  const reactId = useId();
  const id = reactId.replace(/[^a-zA-Z0-9-_]/g, '_');

  const colorConfig = {
    red: {
      headTop: '#ff4d4d',
      headBody: '#b91c1c',
      headDark: '#7f1d1d',
      rim: '#dc2626',
      glint: '#ffffff'
    },
    blue: {
      headTop: '#38bdf8',
      headBody: '#0284c7',
      headDark: '#0369a1',
      rim: '#0284c7',
      glint: '#ffffff'
    },
    brass: {
      headTop: '#fde047',
      headBody: '#ca8a04',
      headDark: '#713f12',
      rim: '#a16207',
      glint: '#ffffff'
    }
  }[color] || {
    headTop: '#ff4d4d',
    headBody: '#b91c1c',
    headDark: '#7f1d1d',
    rim: '#dc2626',
    glint: '#ffffff'
  };

  return (
    <div 
      className={`absolute pointer-events-none select-none z-30 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size * 1.3}px`,
        transform: `rotate(${angle}deg)`,
      }}
    >
      <svg 
        viewBox="0 0 32 42" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Cast Shadow Filter */}
          <filter id={`pinShadow-${id}`} x="-50%" y="-30%" width="200%" height="200%">
            <feDropShadow dx="2" dy="5" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.55" />
            <feDropShadow dx="0.5" dy="1.5" stdDeviation="0.8" floodColor="#000000" floodOpacity="0.4" />
          </filter>

          {/* Needle Metallic Gradient */}
          <linearGradient id={`needleGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="35%" stopColor="#e2e8f0" />
            <stop offset="70%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          {/* Pin Body Plastic Cylindrical Gradient */}
          <linearGradient id={`pinHeadGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorConfig.headDark} />
            <stop offset="25%" stopColor={colorConfig.headBody} />
            <stop offset="50%" stopColor={colorConfig.headTop} />
            <stop offset="80%" stopColor={colorConfig.headBody} />
            <stop offset="100%" stopColor={colorConfig.headDark} />
          </linearGradient>

          {/* Spherical Dome Radial Gradient */}
          <radialGradient id={`domeGrad-${id}`} cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="25%" stopColor={colorConfig.headTop} />
            <stop offset="70%" stopColor={colorConfig.headBody} />
            <stop offset="100%" stopColor={colorConfig.headDark} />
          </radialGradient>
        </defs>

        {/* Paper Puncture Hole Shadow */}
        <ellipse cx="16" cy="38" rx="2.5" ry="1.2" fill="#000000" opacity="0.6" />

        {/* Pin Body with Drop Shadow */}
        <g filter={`url(#pinShadow-${id})`}>
          {/* Steel Needle */}
          <path 
            d="M 15,24 L 15,37 L 17,37 L 17,24 Z" 
            fill={`url(#needleGrad-${id})`} 
          />

          {/* Push Pin Flange Base */}
          <path 
            d="M 10,24 C 10,22 22,22 22,24 C 22,26 10,26 10,24 Z" 
            fill={colorConfig.headDark} 
          />

          {/* Hourglass Waist / Stem */}
          <path 
            d="M 12,14 C 12,18 10,22 10,23 C 12,24 20,24 22,23 C 22,22 20,18 20,14 Z" 
            fill={`url(#pinHeadGrad-${id})`} 
          />

          {/* Lower Ring Ridge */}
          <ellipse cx="16" cy="14" rx="6" ry="2" fill={colorConfig.headTop} opacity="0.8" />

          {/* Upper Head Bulb / Cap */}
          <ellipse cx="16" cy="9" rx="8" ry="7" fill={`url(#domeGrad-${id})`} />

          {/* High-Gloss Specular Highlight Glint */}
          <ellipse cx="14" cy="6.5" rx="3.5" ry="2" fill="#ffffff" opacity="0.75" />
          <circle cx="12.5" cy="5.5" r="1" fill="#ffffff" opacity="0.95" />
        </g>
      </svg>
    </div>
  );
};

export default RealisticPushPin;
