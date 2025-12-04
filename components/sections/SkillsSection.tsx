import React, { JSX } from 'react';
import { GitHubCalendar } from 'react-github-calendar'; // Import the correct default export
import { FaPython, FaJs, FaJava, FaDatabase, FaCode, FaRobot, FaFigma, FaHtml5, FaCss3Alt } from 'react-icons/fa';

// Define the type for the skills list
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

const SkillsSection: React.FC = () => {
    // Replace with your GitHub username
    const GITHUB_USERNAME = "roopadeva48-tech"; // **IMPORTANT: Update this!**

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 relative min-h-[700px]">
            
            {/* Background Pattern (Keeping your original aesthetic) */}
            <div className="absolute inset-0 z-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }}></div>

            <div className="w-full max-w-7xl z-10 grid grid-cols-1 md:grid-cols-4 gap-8 h-auto md:h-[550px]">
                
                {/* Left Box: Core Skills */}
                <div className="md:col-span-1 bg-black/80 backdrop-blur-md border border-neon-purple/30 rounded-xl p-6 flex flex-col shadow-[0_0_20px_rgba(176,38,255,0.1)]">
                    <h3 className="text-xl font-bold text-neon-purple mb-6 border-b border-neon-purple/30 pb-2 flex items-center gap-2">
                        <FaCode className="text-2xl" /> Core Tech Stack
                    </h3>
                    <ul className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {CoreSkills.map((skill, index) => (
                            <li key={index} className="flex items-center gap-3 text-gray-300 transition duration-300 hover:text-white hover:translate-x-1">
                                <span className={`text-xl ${skill.color}`}>{skill.icon}</span>
                                {skill.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Middle Section: GitHub Calendar (The Core of the Page) */}
                <div className="md:col-span-2 flex flex-col items-center justify-center p-4 bg-black/80 backdrop-blur-md border border-neon-blue/30 rounded-xl shadow-[0_0_30px_rgba(0,234,255,0.2)]">
                    <h2 className="text-3xl font-extrabold text-white mb-6 text-center">
                        Coding Consistency: <strong className="text-neon-blue">Days I Code</strong>
                    </h2>
                    
                    {/* GitHub Calendar Wrapper */}
                    <div className="w-full overflow-x-auto p-4 rounded-lg bg-gray-900/50 border border-gray-700/50">
                        <GitHubCalendar
                            username={GITHUB_USERNAME}
                            blockSize={12}
                            blockMargin={4}
                            fontSize={12}
                            showTotalCount={true}
                            // Custom Theme using the requested Gold/Neon Blue aesthetic
                            theme={{
                                dark: [
                                    '#161b22', // Empty (Darkest)
                                    '#003344', // Dark Blue-Green
                                    '#006688', // Medium Blue-Green
                                    '#0099bb', // Light Blue-Green
                                    '#00eaff', // Brightest Neon Blue
                                ],
                            }}
                        />
                        <p className="text-xs text-center text-gray-500 mt-3">
                            <a 
                                href={`https://github.com/${GITHUB_USERNAME}`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="hover:text-neon-blue transition-colors"
                            >
                                Contributions for @{GITHUB_USERNAME}
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right Box: Achievements & Focus */}
                <div className="md:col-span-1 bg-black/80 backdrop-blur-md border border-neon-pink/30 rounded-xl p-6 flex flex-col shadow-[0_0_20px_rgba(255,0,127,0.1)]">
                    <h3 className="text-xl font-bold text-neon-pink mb-6 border-b border-neon-pink/30 pb-2 flex items-center gap-2">
                        <FaRobot className="text-2xl" /> Focus & Achievements
                    </h3>
                    <div className="space-y-4 flex-1 overflow-y-auto">
                        
                        <div className="p-3 rounded border border-gray-700 bg-gray-900/30">
                            <span className="text-sm font-medium text-white block mb-1">Generative AI</span>
                            <span className="text-xs text-neon-pink">Project: Text Summarizer</span>
                        </div>
                        
                        <div className="p-3 rounded border border-gray-700 bg-gray-900/30">
                            <span className="text-sm font-medium text-white block mb-1">Competitive Programming</span>
                            <span className="text-xs text-green-500">Active on LeetCode/HackerRank</span>
                        </div>

                        <div className="p-3 rounded border border-gray-700 bg-gray-900/30">
                            <span className="text-sm font-medium text-white block mb-1">Research & Presentation</span>
                            <span className="text-xs text-yellow-400">Paper Presentation at PSG College</span>
                        </div>
                        
                        <div className="p-3 rounded border border-gray-700 bg-gray-900/30">
                            <span className="text-sm font-medium text-white block mb-1">UI/UX Workshop</span>
                            <span className="text-xs text-purple-400">Practical design tools experience</span>
                        </div>
                        
                        <div className="p-3 rounded border border-gray-700 bg-gray-900/30">
                            <span className="text-sm font-medium text-white block mb-1">Web Dev Internship</span>
                            <span className="text-xs text-orange-400">CodTech IT Solutions (2025)</span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default SkillsSection;