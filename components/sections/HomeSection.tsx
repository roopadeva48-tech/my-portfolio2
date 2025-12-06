import React, { useState, useEffect, useRef } from 'react';

// --- Social Icons (Existing) ---
const LinkedInIcon = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.271V1.729C24 .774 23.2 0 22.224 0z"/></svg>
);

const GithubIcon = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.763-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
);

// --- Tech Icons Data (CORRECTED: Unique Positions and Delay) ---
const techIconsData =  [
    { name: 'Python', Icon: (props) => (<svg className={props.className} viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-2.91l.01-.2.04-.28.08-.32.12-.35.18-.35.24-.33.3-.3.36-.26.4-.2.45-.13.5-.07.53-.02h.53l.48.03zm-2.43 2.15l-.39.05-.33.15-.26.24-.18.33-.07.41.02.43.14.39.27.32.39.21.46.08.48-.03.44-.16.36-.3.24-.43.08-.5-.07-.53-.22-.44-.38-.3-.51-.13-.45.02zm-6.28 7.37l.45.02.4.07.34.13.29.19.23.25.18.31.12.37.07.42.02.46-.02.49-.07.51-.13.52-.19.52-.25.5-.32.48-.39.44-.46.4-.52.34-.58.27-.64.2-.7.11-.74.04h-.76l-.73-.07-.67-.17-.59-.28-.5-.38-.4-.48-.3-.57-.2-.65-.11-.73-.03-.78.02-.75.09-.7.16-.63.24-.55.32-.47.4-.38.48-.28.55-.18.61-.09.68-.02h.73l.66.08zM18.8 9.61l.55.13.48.25.4.35.31.42.23.48.15.52.07.54.01.55-.06 1.22-.16 1.05-.24.87-.33.71-.36.56-.4.44-.42.33-.42.24-.4.16-.36.1-.32.05-.24.02h-.16l-.06.01h-8.16v2.91l-.01.2-.04.28-.08.32-.12.35-.18.35-.24.33-.3.3-.36.26-.4.2-.45.13.5-.07.53-.02h.53l-.48-.03-.9-.2-.73-.26-.59-.3-.45-.32-.34-.34-.25-.34-.16-.33-.1-.3-.04-.26-.02-.2.01-.13v-5.26l.05-.63.13-.55.21-.46.26-.38.3-.31.33-.25.35-.19.35-.14.33-.1.3-.07.26-.04.27-.02-.21V8.5h2.64l.21.03.28.07.32.12.35.18.36.26.36.36.35.46.32.59.28.73.21.88.14 1.05.05 1.23z"/></svg>), hoverColor: '#3776AB' },
    { name: 'JavaScript', Icon: (props) => (<svg className={props.className} viewBox="0 0 24 24" fill="currentColor"><path d="M24 0v24H0V0h24zm-2.887 18.232c-.126.544-.424 1.047-.852 1.41-.65.55-1.558.766-2.45.542-.76-.192-1.396-.64-1.874-1.23-.332-.412-.55-.89-.667-1.407l1.967-.478c.097.35.283.655.57.87.355.25.867.24 1.206-.057.29-.26.34-.73.08-1.048-.09-.11-.2-.2-.33-.265-.63-.3-1.3-.532-1.95-.792-.816-.33-1.637-.665-2.28-1.25-.79-.727-1.026-1.914-.59-2.906.402-.916 1.34-1.503 2.333-1.57 1.157-.08 2.302.32 3.125 1.11.455.437.766 1.008.877 1.63l-1.932.493c-.04-.235-.124-.46-.263-.655-.31-.412-.917-.506-1.343-.23-.357.23-.42.75-.125 1.05.08.083.18.15.286.205.625.32 1.3.568 1.954.84.814.34 1.635.684 2.27 1.28.75.7 1.004 1.83.626 2.802-.012.03-.025.06-.038.09zM11.66 10.395h-2.15v6.52c0 .59.034 1.13.33 1.63.363.598 1.056.88 1.745.816.66-.024 1.268-.328 1.65-.83.336-.452.47-1.01.44-1.568l-2.02-.132c-.01.488-.315.656-.634.656-.252 0-.472-.116-.54-.36-.086-.296-.067-.62-.067-1.006v-5.72z"/></svg>), hoverColor: '#F7DF1E' },
    { name: 'C++ ', Icon: (props) => (<svg className={props.className} viewBox="0 0 24 24" fill="currentColor"><path d="M11.615 6.007c2.14.07 3.868 1.488 4.416 3.498l-3.328 1.17c-.183-.717-.79-1.2-1.48-1.127-1.284.137-1.96 1.654-1.306 2.76.36.608 1.077.892 1.746.745.72-.16 1.27-.728 1.47-1.44l3.367.927c-.52 2.382-2.73 3.99-5.15 3.692-2.614-.32-4.48-2.67-4.14-5.26.305-2.31 2.29-4.067 4.62-3.957-.07.01-.14.002-.21-.008zm11.238 6.495c0-1.082.268-1.57 1.147-1.57v-1.18c-1.334 0-2.027.675-2.28 1.57-.253-.895-.947-1.57-2.28-1.57v1.18c.88 0 1.147.488 1.147 1.57v5.52h2.266v-5.52zm-5.462-1.57v-1.18c-1.333 0-2.026.675-2.28 1.57-.253-.895-.947-1.57-2.28-1.57v1.18c.88 0 1.147.488 1.147 1.57v5.52h2.266v-5.52c0-1.082.267-1.57 1.147-1.57z"/></svg>), hoverColor: '#00599C' },
    { name: 'HTML', Icon: (props) => (<svg className={props.className} viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.666 5.122-2.63.694-2.63-.694-.298-3.23H5.87l.414 5.3 5.694 1.573 5.696-1.573 1.476-13.63L18.59 4.413z"/></svg>), hoverColor: '#E34F26' },
    { name: 'CSS', Icon: (props) => (<svg className={props.className} viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.666 5.122-2.63.694-2.63-.694-.298-3.23H5.87l.414 5.3 5.694 1.573 5.696-1.573 1.476-13.63L18.59 4.413z"/></svg>), hoverColor: '#1572B6' },
    { name: 'SQL', Icon: (props) => (<svg className={props.className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.783 17.51a1.2 1.2 0 011.127.763l2.84 6.848-1.488.72-2.16-5.464h-.057l-1.897 5.256-1.488-.568 2.551-6.72a1.208 1.208 0 01.572-.835zM4.15 17.58c1.396 0 2.228 1.135 2.228 2.571s-.832 2.571-2.228 2.571c-.703 0-1.184-.25-1.528-.624v1.864H1.42V17.72h1.168v.636c.332-.424.84-.776 1.56-.776zm0 1.092c-.776 0-1.164.672-1.164 1.48 0 .8.388 1.476 1.164 1.476.78 0 1.164-.676 1.164-1.476 0-.804-.384-1.48-1.164-1.48zM10.138 21.67c-1.396 0-2.228-1.135-2.228-2.571s.832-2.571 2.228-2.571c1.396 0 2.228 1.135 2.228 2.571s-.832 2.571-2.228 2.571zm0-1.092c.78 0 1.164-.676 1.164-1.476 0-.8-.384-1.476-1.164-1.476-.776 0-1.164.672-1.164 1.476 0 .808.388 1.48 1.164 1.48zM24 6c0 1.657-5.373 3-12 3S0 7.657 0 6V4.5C0 2.843 5.373 1.5 12 1.5s12 1.343 12 3V6zm-24 5.25v1.5c0 1.657 5.373 3 12 3s12-1.343 12-3v-1.5c0 1.657-5.373 3-12 3s-12-1.343-12-3zm0 5.25v1.5c0 1.657 5.373 3 12 3s12-1.343 12-3v-1.5c0 1.657-5.373 3-12 3s-12-1.343-12-3z"/></svg>), hoverColor: '#61DAFB' },
];

// Spin and Float Animations (Unchanged) ---
const SpinStyle = () => (
    <style>{`
        /* Standard Spin Animation (Unchanged) */
        @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spinSlow 30s linear infinite;
        }
        .animate-spin-hover:hover {
            animation: spinSlow 3s linear infinite;
        }

        /* Floating Animation (NEW) */
        @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(-10px, 5px) rotate(1deg); }
            50% { transform: translate(15px, -10px) rotate(-1deg); }
            75% { transform: translate(-5px, 10px) rotate(1deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
        }
        .animate-float {
            animation: float 15s ease-in-out infinite alternate; 
        }
    `}</style>
);

// --- Scroll Reveal Tech Stack Component (MODIFIED) ---
const ScrollRevealTechStack: React.FC = () => {
    const [isRevealed, setIsRevealed] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Intersection Observer to detect scroll into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isRevealed) {
                    setIsRevealed(true);
                    observer.unobserve(entry.target); 
                }
            },
            {
                root: null, 
                rootMargin: '0px',
                threshold: 0.1 
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [isRevealed]);

    const iconBaseClasses = "transition-all duration-1000 ease-in-out transform";

    return (
        // The container is relative and large enough to hold scattered elements
        <div className="p-10 relative w-full h-[80vh] min-h-[600px] flex flex-col justify-center items-center" ref={containerRef}> 
            <SpinStyle /> 
            <p className="text-2xl uppercase tracking-wider text-neon-blue font-semibold text-center z-10">
                Core Tech Stack
            </p>
            
            {/* The inner container for absolute icons */}
            <div className="absolute inset-0 max-w-6xl mx-auto">
                {techIconsData.map((tech) => {
                    const IconComponent = tech.Icon;
                    
                    // Hide/Show logic
                    const iconSizeClass = isRevealed ? 'w-14 h-14 opacity-100 scale-100' : 'w-10 h-10 opacity-0 scale-75';

                    return (
                        <div 
                            key={tech.name} 
                            // Applied classes: spin, float, unique position (from tech.position)
                            className={`group absolute ${iconBaseClasses} ${iconSizeClass} animate-spin-slow animate-spin-hover animate-float ${tech.position}`} 
                            // Applied unique animation delay
                            style={{ animationDelay: tech.animDelay }}
                        >
                            <div 
                                className="transition-colors duration-300 w-full h-full"
                                style={{
                                    color: tech.hoverColor 
                                }}
                                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.setProperty('color', '#ffffff')} 
                                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.setProperty('color', tech.hoverColor)} 
                            >
                                <IconComponent className="w-full h-full" />
                            </div>
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                                {tech.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


// --- Social Links Component (NOT FIXED, Centered) ---
const SocialLinks: React.FC<{ linkedinUrl: string; githubUrl: string }> = ({ linkedinUrl, githubUrl }) => {
    return (
        <div className="w-full p-8 flex justify-center mt-20"> 
            <div className="flex gap-8">
                {/* LinkedIn Link */}
                <a 
                    href={linkedinUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-blue hover:text-white transition-colors hover:scale-110 transform duration-200"
                >
                    <span className="sr-only">LinkedIn</span>
                    <LinkedInIcon />
                </a>

                {/* GitHub Link */}
                <a 
                    href={githubUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-pink hover:text-white transition-colors hover:scale-110 transform duration-200"
                >
                    <span className="sr-only">GitHub</span>
                    <GithubIcon />
                </a>
            </div>
        </div>
    );
};


// --- Home Section (Main Component) ---
const HomeSection: React.FC = () => {
    // === IMPORTANT: PASTE YOUR REAL LINKS HERE ===
    const LINKEDIN_URL = "YOUR_LINKEDIN_PROFILE_URL_HERE"; 
    const GITHUB_URL = "YOUR_GITHUB_PROFILE_URL_HERE";
    // ===========================================

    return (
        // Container is taller (min-h-[200vh])
        <div className="w-full min-h-[200vh] relative z-10">
            
            {/* 1. TOP HALF: Centered Professional Details & Image (H-SCREEN) */}
            <div className="h-screen flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-10">
                
                {/* Left: Details */}
                <div className="w-full md:w-1/2 space-y-6 animate-fade-in-up text-center md:text-left">
                    <h2 className="text-xl text-gray-400 font-light tracking-widest uppercase">Hello, I am</h2>
                    
                    <h1 className="text-5xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue pb-2 whitespace-nowrap">
                        Devaroopa E
                    </h1>
                    
                    <div className="space-y-2">
                        <h3 className="text-2xl text-white font-bold">AI Developer</h3>
                        <p className="text-gray-400 max-w-lg">
                            Crafting intelligent solutions through code. Passionate about turning raw data into actionable insights and building robust systems.
                        </p>
                    </div>
                </div>

                {/* Right: Image */}
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <div className="relative group">
                        {/* Glowing Rectangular Frame */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple to-neon-blue rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow"></div>
                        
                        <div className ="relative w-64 h-80 md:w-80 md:h-96 bg-black p-1 rounded-lg">
                            <div className="w-full h-full overflow-hidden rounded-lg border-2 border-black">
                                <img 
                                    src="/portimage.jpg"
                                    alt="DevaroopaEProfile" 
                                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. BOTTOM HALF: Scroll-Revealed Tech Stack (Wide Float) */}
            <div className="flex justify-center items-start py-20">
                <ScrollRevealTechStack />
            </div>

            {/* 3. Social Links placed at the absolute bottom of the 200vh container */}
            <div className="absolute bottom-10 w-full">
                <SocialLinks linkedinUrl={LINKEDIN_URL} githubUrl={GITHUB_URL} />
            </div>
        </div>
    );
};


export default HomeSection;




