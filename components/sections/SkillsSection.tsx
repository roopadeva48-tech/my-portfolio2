import React, { JSX, useRef, useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { FaPython, FaJs, FaJava, FaDatabase, FaCode, FaRobot, FaFigma, FaHtml5 } from 'react-icons/fa';
import GradientText from '../GradientText'; // Ensure path is correct

// =========================================================================
// 1. STATS DATA & OPTIMIZED COUNTER
// =========================================================================
const STATS = [
  { id: 1, value: 2, label: 'Years in Tech Study', suffix: '+' },
  { id: 2, value: 680, label: 'GitHub Commits', suffix: '+' },
  { id: 3, value: 7, label: 'Projects / Demos Built', suffix: '' },
  { id: 4, value: 100, label: 'Technical Skills Gained', suffix: '%' },
];

const AnimatedStat: React.FC<{ value: number; label: string; suffix?: string }> = ({ value, label, suffix = '' }) => {
  const statRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = statRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasAnimated(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasAnimated || !numRef.current) return;
    let start: number | null = null;
    const duration = 1200; 

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min(1, (timestamp - start) / duration);
      const eased = progress * (2 - progress);
      const current = Math.floor(eased * value);
      
      if (numRef.current) numRef.current.textContent = current.toLocaleString();

      if (progress < 1) requestAnimationFrame(step);
      else if (numRef.current) numRef.current.textContent = value.toLocaleString();
    };
    requestAnimationFrame(step);
  }, [hasAnimated, value]);

  return (
    <div ref={statRef} className="text-center p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:bg-white/10">
      <h3 className="text-5xl md:text-7xl font-black mb-2 gradient-text-stat">
        <span ref={numRef}>0</span><span>{suffix}</span>
      </h3>
      <p className="text-gray-400 uppercase tracking-[0.2em] font-bold text-xs">{label}</p>
    </div>
  );
};

// =========================================================================
// 2. MAIN COMPONENT
// =========================================================================
const SkillsSection: React.FC = () => {
  const GITHUB_USERNAME = "roopadeva48-tech";

  const coreSkills = [
    { name: "Python", icon: <FaPython />, color: "text-blue-400" },
    { name: "JavaScript / React", icon: <FaJs />, color: "text-yellow-400" },
    { name: "C / Java", icon: <FaJava />, color: "text-red-400" },
    { name: "HTML / CSS", icon: <FaHtml5 />, color: "text-orange-500" },
    { name: "MySQL / MongoDB", icon: <FaDatabase />, color: "text-green-500" },
    { name: "MATLAB", icon: <FaCode />, color: "text-purple-400" },
    { name: "UI/UX Tools", icon: <FaFigma />, color: "text-pink-400" },
  ];

  const achievements = [
    { name: "Generative AI", detail: "Project: Text Summarizer", color: "text-neon-pink" },
    { name: "Competitive Programming", detail: "Active on LeetCode/HackerRank", color: "text-green-500" },
    { name: "Research & Presentation", detail: "Paper Presentation at PSG College", color: "text-yellow-400" },
    { name: "UI/UX Workshop", detail: "Practical design tools experience", color: "text-purple-400" },
    { name: "Web Dev Internship", detail: "CodTech IT Solutions (2025)", color: "text-orange-400" },
  ];

  return (
    <div className="w-full min-h-screen py-20 px-6 relative flex flex-col items-center">
      
      {/* --- GRID BACKGROUND REMOVED FROM HERE --- */}

      <div className="w-full max-w-5xl z-10 space-y-32">
        
        {/* SECTION 1: HEADER WITH GRADIENT TEXT ANIMATION */}
        <div className="text-center space-y-4 flex flex-col items-center">
          <GradientText 
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} 
            animationSpeed={3} 
            showBorder={false} 
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
          >
            Skillset & Metrics
          </GradientText>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full"></div>
        </div>

        {/* SECTION 2: TECH STACK */}
        <div className="space-y-12">
          <h3 className="text-2xl font-bold text-center text-white/50 uppercase tracking-widest">Core Technology Stack</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {coreSkills.map((skill, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group">
                <span className={`text-4xl mb-4 transition-transform duration-500 group-hover:scale-125 ${skill.color}`}>
                  {skill.icon}
                </span>
                <span className="text-white font-medium text-sm text-center">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: GITHUB ACTIVITY */}
        <div className="space-y-12">
          <h3 className="text-2xl font-bold text-center text-white/50 uppercase tracking-widest">Coding Consistency</h3>
          <div className="p-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex justify-center">
            <GitHubCalendar 
              username={GITHUB_USERNAME}
              blockSize={14}
              blockMargin={5}
              theme={{ dark: ['#161b22', '#003344', '#006688', '#0099bb', '#00eaff'] }}
            />
          </div>
        </div>

        {/* SECTION 4: ACHIEVEMENTS */}
        <div className="space-y-12">
          <h3 className="text-2xl font-bold text-center text-white/50 uppercase tracking-widest">Focus Areas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((item, i) => (
              <div key={i} className="flex items-center p-6 bg-white/5 border-l-4 border-l-neon-purple rounded-r-2xl hover:bg-white/10 transition-all">
                <div>
                  <h4 className={`text-lg font-bold ${item.color}`}>{item.name}</h4>
                  <p className="text-gray-400 text-sm">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: METRICS */}
        <div className="space-y-12">
          <h3 className="text-2xl font-bold text-center text-white/50 uppercase tracking-widest">Professional Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {STATS.map(stat => (
              <AnimatedStat key={stat.id} {...stat} />
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .gradient-text-stat {
          background: linear-gradient(to bottom, #fff 30%, #4079ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default SkillsSection;