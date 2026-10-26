import React from 'react';

interface RasLogoProps {
  variant?: 'full' | 'icon' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  customTitle?: string;
  customSubtitle?: string;
}

export const RasLogo: React.FC<RasLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  customTitle = 'R.A.S STONE',
  customSubtitle = 'CNC Stone Carving & Design Studio'
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-20 h-20'
  };

  const titleSizes = {
    sm: 'text-sm tracking-widest',
    md: 'text-lg tracking-[0.2em]',
    lg: 'text-2xl tracking-[0.25em]',
    xl: 'text-4xl tracking-[0.3em]'
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-wider',
    md: 'text-[10px] tracking-[0.25em]',
    lg: 'text-xs tracking-[0.3em]',
    xl: 'text-sm tracking-[0.35em]'
  };

  // Sculpted Emblem: Hexagonal faceted stone shield with diamond CNC cutter bit and chisel geometry
  const Emblem = (
    <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_12px_rgba(217,119,6,0.35)]"
      >
        <defs>
          <linearGradient id="rasGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#d97706" />
            <stop offset="70%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="rasStoneFacet" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#292524" />
            <stop offset="50%" stopColor="#1c1917" />
            <stop offset="100%" stopColor="#0c0a09" />
          </linearGradient>
          <linearGradient id="cutterShine" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
        </defs>

        {/* Outer Faceted Geometric Stone Crest (Hexagon with Chiseled facets) */}
        <polygon
          points="50,4 92,26 92,74 50,96 8,74 8,26"
          fill="url(#rasStoneFacet)"
          stroke="url(#rasGoldGrad)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Inner Diamond Gemstone / Toolpath Lines */}
        <polygon
          points="50,14 82,31 82,69 50,86 18,69 18,31"
          stroke="rgba(217,119,6,0.3)"
          strokeWidth="1"
          fill="none"
        />

        {/* Diagonal Chisel Facet Lines */}
        <line x1="50" y1="4" x2="50" y2="28" stroke="url(#rasGoldGrad)" strokeWidth="1" opacity="0.6" />
        <line x1="92" y1="26" x2="70" y2="40" stroke="url(#rasGoldGrad)" strokeWidth="1" opacity="0.4" />
        <line x1="8" y1="26" x2="30" y2="40" stroke="url(#rasGoldGrad)" strokeWidth="1" opacity="0.4" />
        <line x1="92" y1="74" x2="70" y2="60" stroke="url(#rasGoldGrad)" strokeWidth="1" opacity="0.4" />
        <line x1="8" y1="74" x2="30" y2="60" stroke="url(#rasGoldGrad)" strokeWidth="1" opacity="0.4" />
        <line x1="50" y1="96" x2="50" y2="72" stroke="url(#rasGoldGrad)" strokeWidth="1" opacity="0.6" />

        {/* CNC Diamond End Mill Spindle Bit Silhouette at Center Top */}
        <path
          d="M47 24 H53 V38 L55 42 L50 48 L45 42 L47 38 Z"
          fill="url(#cutterShine)"
          opacity="0.9"
        />

        {/* Stylized Monogram "R.A.S" inside crest */}
        <text
          x="50"
          y="66"
          textAnchor="middle"
          fill="url(#rasGoldGrad)"
          fontFamily="Cinzel, serif"
          fontSize="22"
          fontWeight="900"
          letterSpacing="1.5"
          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))"
        >
          R·A·S
        </text>

        {/* Small Golden Stone Mason Compass Mark */}
        <circle cx="50" cy="77" r="1.5" fill="#fef08a" />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{Emblem}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {Emblem}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-display font-extrabold uppercase gold-shimmer ${titleSizes[size]}`}>
            {customTitle}
          </span>
        </div>
        <span className={`font-sans font-medium uppercase text-stone-400 ${subtitleSizes[size]}`}>
          {customSubtitle}
        </span>
      </div>
    </div>
  );
};
