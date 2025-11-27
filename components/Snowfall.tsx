import React, { useEffect, useState } from 'react';
import { Snowflake } from 'lucide-react';

const Snowfall: React.FC = () => {
  const [flakes, setFlakes] = useState<Array<{ id: number; left: number; animationDuration: number; size: number }>>([]);

  useEffect(() => {
    const count = 30;
    const newFlakes = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 1000,
      animationDuration: Math.random() * 10 + 10, // 10-20s
      size: Math.random() * 10 + 10,
    }));
    setFlakes(newFlakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-[-20px] text-white/40"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size}px`,
            animation: `fall ${flake.animationDuration}s linear infinite`,
          }}
        >
          <Snowflake size={flake.size} />
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Snowfall;