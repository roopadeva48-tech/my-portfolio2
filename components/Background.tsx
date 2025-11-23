import React from 'react';

const Background: React.FC = () => {
  // Generate random stars for the star field
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 3 + 1}px`,
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 10 + 10}s`
  }));

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* Layer 2: Star Field / Particles */}
      <div className="absolute inset-0 w-[200%] h-full animate-star-drift flex">
        <div className="w-1/2 h-full relative">
          {stars.map((star) => (
            <div
              key={`star-1-${star.id}`}
              className="absolute bg-white rounded-full opacity-60"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
              }}
            />
          ))}
        </div>
        <div className="w-1/2 h-full relative">
          {stars.map((star) => (
            <div
              key={`star-2-${star.id}`}
              className="absolute bg-white rounded-full opacity-60"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
              }}
            />
          ))}
        </div>
      </div>

      {/* Layer 1: Moving Moon */}
      <div className="absolute top-1/4 left-[-150px] w-32 h-32 bg-slate-200 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.3)] animate-moon-move opacity-90 z-0 overflow-hidden">
        {/* Moon Craters for texture */}
        <div className="absolute top-4 left-6 w-6 h-6 bg-slate-300 rounded-full opacity-50"></div>
        <div className="absolute bottom-8 right-8 w-10 h-10 bg-slate-300 rounded-full opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-slate-300 rounded-full opacity-50"></div>
      </div>
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-[rgba(176,38,255,0.05)]"></div>
    </div>
  );
};

export default Background;