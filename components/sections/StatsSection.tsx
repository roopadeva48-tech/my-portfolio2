

import React from 'react';
import AnimatedStat from './AnimatedStat'; // Import the new component

const STATS = [
    { id: 1, value: 2, label: 'Years of Experience', suffix: '+' },
    { id: 2, value: 140, label: 'Github Commits', suffix: '+' },
    { id: 3, value: 2, label: 'Major Projects Completed', suffix: '' },
    { id: 4, value: 80, label: 'Knowledge Gained ', suffix: '%' },
];

const StatsSection: React.FC = () => {
    return (
        <section className="py-20 relative z-10">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 uppercase tracking-wider text-white">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-pink">
                        My Professional Impact
                    </span>
                </h2>
                
                {/* Grid for Stats Cards */}
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

            {/* Global CSS Styles for the Stat Gradient */}
            <style>{`
                /* Separate gradient for stats to give it a unique color scheme */
                .gradient-text-stat {
                    background: linear-gradient(45deg, #10b981, #3b82f6); /* Emerald to Blue */
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </section>
    );
};

export default StatsSection;