import React from 'react';

interface BackgroundProps {
  onMoonClick?: () => void;
}

const Background: React.FC<BackgroundProps> = ({ onMoonClick }) => {
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 3 + 1}px`,
  }));

  // Logic: If onMoonClick is passed, we are in "Game Mode"
  const isInteractive = !!onMoonClick;

  return (
    <>
      {/* LAYER 1: Base Background & Stars (Always Z-0) 
          This provides the black backdrop and star field behind all content. */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        {/* Star Field */}
        <div className="absolute inset-0 w-[200%] h-full animate-star-drift flex">
          <div className="w-1/2 h-full relative">
            {stars.map((star) => (
              <div key={`star-1-${star.id}`} className="absolute bg-white rounded-full opacity-60" style={{ top: star.top, left: star.left, width: star.size, height: star.size }} />
            ))}
          </div>
          <div className="w-1/2 h-full relative">
            {stars.map((star) => (
              <div key={`star-2-${star.id}`} className="absolute bg-white rounded-full opacity-60" style={{ top: star.top, left: star.left, width: star.size, height: star.size }} />
            ))}
          </div>
        </div>
        
        {/* Ambient Glows */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-[rgba(176,38,255,0.05)]"></div>
      </div>

      {/* LAYER 2: The Moon 
          KEY FIX: Dynamic Z-Index
          - If isInteractive (Certificates): z-50 (Sits on top of content to be clicked)
          - Else (Home/Projects): z-0 (Sits BEHIND content as decoration) 
      */}
      <div className={`fixed inset-0 ${isInteractive ? 'z-50' : 'z-0'} pointer-events-none overflow-hidden`}>
        <div 
          onClick={isInteractive ? onMoonClick : undefined}
          className={`
              absolute top-1/4 left-[-150px] w-32 h-32 
              bg-slate-200 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.3)] 
              animate-moon-move opacity-90 overflow-hidden 
              transition-all duration-300
              ${isInteractive 
                  ? 'cursor-pointer pointer-events-auto hover:shadow-[0_0_80px_rgba(64,255,170,0.8)] hover:scale-110 border-2 border-transparent hover:border-neon-blue' 
                  : 'pointer-events-none' // Ensures it ignores mouse on other pages
              }
          `}
        >
          {/* Moon Craters */}
          <div className="absolute top-4 left-6 w-6 h-6 bg-slate-300 rounded-full opacity-50"></div>
          <div className="absolute bottom-8 right-8 w-10 h-10 bg-slate-300 rounded-full opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-slate-300 rounded-full opacity-50"></div>
        </div>
      </div>
    </>
  );
};

export default Background;
