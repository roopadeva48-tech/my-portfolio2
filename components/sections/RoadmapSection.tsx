import React, { useState } from 'react';
import { Milestone } from '../../types';

const RoadmapSection: React.FC = () => {
  const [milestones] = useState<Milestone[]>([
    { title: "HTML", date: "july", completed: false },
    { title: "CSS", date: "august", completed: false },
    { title: "JS", date: "august", completed: false },
    { title: "n8n WORKFLOW", date: "october", completed: true },
  ]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="w-full max-w-6xl z-10 grid grid-cols-1 md:grid-cols-3 gap-8 h-[600px] md:h-[500px]">
        
        {/* Left Box: Planned Works */}
        <div className="bg-black/80 backdrop-blur-md border border-neon-purple/30 rounded-xl p-6 flex flex-col shadow-[0_0_20px_rgba(176,38,255,0.1)]">
          <h3 className="text-xl font-bold text-neon-purple mb-6 border-b border-neon-purple/30 pb-2">
            Planned Learning
          </h3>
          <ul className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <li className="flex items-center gap-3 text-gray-300">
              <span className="w-2 h-2 bg-neon-purple rounded-full"></span> REACT JS Advanced Concepts
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <span className="w-2 h-2 bg-neon-purple rounded-full"></span> PYTHON FOR AI
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <span className="w-2 h-2 bg-neon-purple rounded-full"></span> DATABASE WORK
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <span className="w-2 h-2 bg-neon-purple rounded-full"></span> DATA STRUCTURES & ALGORITHMS
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <span className="w-2 h-2 bg-neon-purple rounded-full"></span> GENERATING AI AGENTS
            </li>
          </ul>
        </div>

        {/* Middle: Moving Animation */}
        <div className="relative border-x-2 border-dashed border-gray-800 bg-black/20 flex justify-center overflow-hidden">
          <div className="absolute top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-neon-blue to-transparent opacity-50"></div>
          
          {/* Animated Girl Emoji */}
          <div className="absolute text-4xl animate-girl-drop z-20 left-1/2 -translate-x-1/2 p-2 bg-black rounded-full border border-neon-blue/50 shadow-[0_0_15px_rgba(0,234,255,0.5)]">
            👩‍💻
          </div>

          <div className="absolute bottom-10 text-center w-full px-4">
            <p className="text-xs text-neon-blue uppercase tracking-widest animate-pulse">Progress in Motion</p>
          </div>
        </div>

        {/* Right Box: Milestone Deadlines */}
        <div className="bg-black/80 backdrop-blur-md border border-neon-pink/30 rounded-xl p-6 flex flex-col shadow-[0_0_20px_rgba(255,0,127,0.1)]">
          <h3 className="text-xl font-bold text-neon-pink mb-6 border-b border-neon-pink/30 pb-2">
            Milestone Duration
          </h3>
          <div className="space-y-4 flex-1 overflow-y-auto">
            {milestones.map((milestone, idx) => (
              <div key={idx} className={`p-3 rounded border ${milestone.completed ? 'border-green-500/30 bg-green-900/10' : 'border-gray-700 bg-gray-900/30'}`}>
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-white">{milestone.title}</span>
                  {milestone.completed && <span className="text-green-500 text-xs">✓</span>}
                </div>
                <div className="mt-2 text-xs text-right text-neon-pink font-mono bg-black/50 inline-block px-2 py-1 rounded w-full">
                  Due: {milestone.date}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RoadmapSection;
