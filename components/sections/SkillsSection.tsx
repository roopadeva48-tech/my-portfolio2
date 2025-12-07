import React, { JSX, useRef, useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { FaPython, FaJs, FaJava, FaDatabase, FaCode, FaRobot, FaFigma, FaHtml5 } from 'react-icons/fa';

// =========================================================================
// 1. STATS DATA & ANIMATION LOGIC (Reframed and Optimized)
// =========================================================================

// Reframed Stats for a Student Profile
const STATS = [
    { id: 1, value: 2, label: 'Years in Tech Study', suffix: '+' },
    { id: 2, value: 680, label: 'GitHub Commits', suffix: '+' },
    { id: 3, value: 7, label: 'Projects / Demos Built', suffix: '' },
    { id: 4, value: 100, label: 'Technical Skills Gained', suffix: '%' },
];

interface AnimatedStatProps {
    value: number;
    label: string;
    suffix?: string;
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({ value, label, suffix = '' }) => {
    const statRef = useRef<HTMLDivElement>(null);
    const numRef = useRef<HTMLSpanElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const el = statRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasAnimated(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!hasAnimated) return;
        const targetEl = numRef.current;
        if (!targetEl) return;

        let raf = 0;
        let start: number | null = null;
        const duration = 1000; // short and snappy

        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min(1, (timestamp - start) / duration);
            const eased = progress * (2 - progress); // easeOutQuad
            const current = Math.floor(eased * value);

            // update DOM directly to avoid React renders
            targetEl.textContent = current.toLocaleString();

            if (progress < 1) {
                raf = requestAnimationFrame(step);
            } else {
                // final value
                targetEl.textContent = value.toLocaleString();
            }
        };

        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [hasAnimated, value]);

    return (
        <div ref={statRef} className="text-center p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm transition-transform duration-400 hover:scale-105">
            <h3 className="text-5xl sm:text-6xl font-extrabold pb-1 gradient-text-stat leading-tight">
                <span ref={numRef}>0</span>
                <span className="text-2xl sm:text-4xl">{suffix}</span>
            </h3>
            <p className="text-gray-400 uppercase tracking-widest font-medium text-sm mt-2">{label}</p>
        </div>
    );
};


// =========================================================================
// 2. SKILLS DATA
// =========================================================================

interface SkillItem {
    name: string;
    icon: JSX.Element;
    color: string;
}

const CoreSkills: SkillItem[] = [
    { name: "Python", icon: <FaPython />, color: "text-blue-400" },
    { name: "JavaScript / React", icon: <FaJs />, color: "text-yellow-400" },
    { name: "C / Java", icon: <FaJava />, color: "text-red-400" },
    { name: "HTML / CSS", icon: <FaHtml5 />, color: "text-orange-500" },
    { name: "MySQL / MongoDB", icon: <FaDatabase />, color: "text-green-500" },
    { name: "MATLAB", icon: <FaCode />, color: "text-purple-400" },
    { name: "UI/UX Tools", icon: <FaFigma />, color: "text-pink-400" },
];

const Achievements = [
    { name: "Generative AI", detail: "Project: Text Summarizer", color: "text-neon-pink" },
    { name: "Competitive Programming", detail: "Active on LeetCode/HackerRank", color: "text-green-500" },
    { name: "Research & Presentation", detail: "Paper Presentation at PSG College", color: "text-yellow-400" },
    { name: "UI/UX Workshop", detail: "Practical design tools experience", color: "text-purple-400" },
    { name: "Web Dev Internship", detail: "CodTech IT Solutions (2025)", color: "text-orange-400" },
];


// =========================================================================
// 3. MAIN SKILLS SECTION COMPONENT (Vertical Layout)
// =========================================================================

const SkillsSection: React.FC = () => {
    const GITHUB_USERNAME = "roopadeva48-tech";

    return (
        <div className="w-full flex flex-col items-center p-6 relative min-h-[700px]">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }}></div>

            <div className="w-full max-w-7xl z-10 flex flex-col gap-10">
                
                {/* GLOBAL TITLE */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-center uppercase tracking-wider text-white mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
                        TECHNICAL SKILLSET & ACTIVITY
                    </span>
                </h1>
                
                {/* 1. CORE TECH STACK (Full Width List) */}
                <div className="pt-8 pb-10 border-b border-gray-700/50">
                    <h3 className="text-3xl font-bold text-neon-purple mb-8 text-center flex items-center justify-center gap-3">
                        <FaCode className="text-3xl" /> Core Tech Stack
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6">
                        {CoreSkills.map((skill, index) => (
                            <div key={index} className="flex items-center gap-3 text-lg text-gray-300 transition duration-300 hover:text-white hover:scale-[1.02]">
                                <span className={`text-2xl ${skill.color}`}>{skill.icon}</span>
                                {skill.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. CODING CONSISTENCY (GitHub Calendar) */}
                <div className="pt-10 pb-12 border-b border-gray-700/50">
                    <h3 className="text-3xl font-bold text-neon-blue mb-8 text-center">
                        Coding Consistency: Days I Code
                    </h3>
                    
                    <div className="w-full overflow-x-auto p-4 bg-gray-900/50 rounded-xl border border-neon-blue/30 shadow-xl">
                        <GitHubCalendar
                            username={GITHUB_USERNAME}
                            blockSize={12}
                            blockMargin={4}
                            fontSize={12}
                            showTotalCount={true}
                            theme={{
                                dark: [ '#161b22', '#003344', '#006688', '#0099bb', '#00eaff', ],
                            }}
                        />
                        <p className="text-xs text-center text-gray-500 mt-3">
                            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="hover:text-neon-blue transition-colors">
                                Contributions for @{GITHUB_USERNAME}
                            </a>
                        </p>
                    </div>
                </div>

                {/* 3. FOCUS & ACHIEVEMENTS (Full Width List) */}
                <div className="pt-10 pb-12 border-b border-gray-700/50">
                    <h3 className="text-3xl font-bold text-neon-pink mb-8 text-center flex items-center justify-center gap-3">
                        <FaRobot className="text-3xl" /> Focus & Achievements
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {Achievements.map((item, index) => (
                            <div key={index} className="p-4 rounded border border-neon-pink/30 bg-black/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-neon-pink/50">
                                <span className={`text-lg font-medium text-white block mb-1 ${item.color}`}>{item.name}</span>
                                <span className="text-sm text-gray-400">{item.detail}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. PROFESSIONAL IMPACT & METRICS (Animated Stats) */}
                <div className="pt-12 pb-12">
                    <h2 className="text-3xl font-extrabold text-center mb-10 uppercase tracking-wider text-white">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
                            MY PROFESSIONAL IMPACT & METRICS
                        </span>
                    </h2>
                    
                    {/* Animated Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {STATS.map(stat => (
                            <AnimatedStat 
                                key={stat.id}
                                value={stat.value}
                                label={stat.label}
                                suffix={stat.suffix}
                            />
                        ))}
                    </div>
                </div>

            </div>
            
            {/* Global CSS Styles for the Stat Gradient */}
            <style>{`
                /* Separate gradient for stats to give it a unique color scheme */
                .gradient-text-stat {
                    background: linear-gradient(45deg, #10b981, #3b82f6); /* Emerald to Blue */
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #7c3aed; /* Neon Purple */
                    border-radius: 3px;
                }
            `}</style>

        </div>
    );
};

export default SkillsSection;
