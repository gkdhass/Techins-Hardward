const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Chip Icon Mark */}
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Hexagon chip outline with clipped corner */}
        <path 
          d="M12 3L18 7V17L12 21L6 17V7L12 3Z" 
          stroke="#D4971E" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
        />
        {/* Clipped corner trace */}
        <path 
          d="M18 7L15 5" 
          stroke="#D4971E" 
          strokeWidth="1.5" 
          strokeLinecap="round"
        />
        {/* Connection node with glow */}
        <circle 
          cx="12" 
          cy="3" 
          r="1.5" 
          fill="#D4971E"
          filter="url(#glow)"
        />
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
      
      {/* Wordmark */}
      <span className="text-2xl font-display font-semibold tracking-tight text-text-primary">
        TECHINS
      </span>
    </div>
  );
};

export default Logo;
