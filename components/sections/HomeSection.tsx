import React, { useState, useEffect, useRef } from 'react';
import ContactSection from './ContactSection';

// =========================================================================
// 1. ICON COMPONENTS (EXISTING)
// =========================================================================
const LinkedInIcon = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.271V1.729C24 .774 23.2 0 22.224 0z"/></svg>
);

const GithubIcon = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.763-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
);


// =========================================================================
// 2. FUNCTIONAL COMPONENTS (HELPER)
// =========================================================================

const CTAButton: React.FC<{ href: string, label: string }> = ({ href, label }) => {
    return (
        <a href={href} download className="inline-block px-8 py-3 text-lg font-bold rounded-full text-white transition-all duration-300 transform hover:scale-105 shadow-xl bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink focus:outline-none focus:ring-4 focus:ring-neon-blue/50 focus:ring-opacity-75 cursor-pointer">
            {label}
        </a>
    );
};

const ContactOutlineButton: React.FC<{ onClick?: () => void, label: string, href?: string }> = ({ onClick, label, href = '#contact' }) => {
    return (
        <a href={href} onClick={onClick} aria-label={label} className="inline-block px-8 py-3 text-lg font-bold rounded-full transition-all duration-300 transform hover:scale-105 border-2 border-neon-purple text-neon-purple hover:text-white hover:bg-neon-purple/20 focus:outline-none focus:ring-4 focus:ring-neon-purple/50 focus:ring-opacity-75 cursor-pointer">
            {label}
        </a>
    );
};

const RepositoryShowcase: React.FC = () => {
    const repos = [ { name: "Krishi-Sakthi-AI", lang: "Python", stars: "45", desc: "AI solution for crop disease detection and soil recommendation.", url: "YOUR_REPO_URL_1" }, ];
    return (
        <div className="w-full mt-20 relative p-8 rounded-xl shadow-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <h4 className="text-2xl font-extrabold text-white mb-6 uppercase tracking-widest text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-pink"> [ Featured Codebase ] </span>
            </h4>
        </div>
    );
};

const SocialLinks: React.FC<{ linkedinUrl: string; githubUrl: string }> = ({ linkedinUrl, githubUrl }) => {
    return (
        <div className="w-full p-8 flex justify-center mt-20"> 
            <div className="flex gap-8">
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:text-white transition-colors hover:scale-110 transform duration-200 cursor-pointer">
                    <span className="sr-only">LinkedIn</span> <LinkedInIcon />
                </a>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-neon-pink hover:text-white transition-colors hover:scale-110 transform duration-200 cursor-pointer">
                    <span className="sr-only">GitHub</span> <GithubIcon />
                </a>
            </div>
        </div>
    );
};

const NeuralNetworkBackground: React.FC = () => {
    const nodes = [ { top: '10%', left: '20%', delay: '0s', size: 'w-2 h-2' }, { top: '35%', left: '50%', delay: '2s', size: 'w-3 h-3' }, { top: '60%', left: '80%', delay: '4s', size: 'w-2 h-2' }, { top: '85%', left: '15%', delay: '1s', size: 'w-4 h-4' }, ];
    return (
        <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
            {/* ... nodes and SVG lines ... */}
        </div>
    );
};


// =========================================================================
// 3. MAIN COMPONENT (WITH INTERACTIVITY LOGIC)
// =========================================================================
const HomeSection: React.FC = () => {
    // --- Configuration ---
    const LINKEDIN_URL = "YOUR_LINKEDIN_PROFILE_URL_HERE"; 
    const GITHUB_URL = "https://github.com/roopadeva48-tech";
    const RESUME_FILE_PATH = "/Devaroopa_E_Resume.pdf"; 
    const fullName = 'Devaroopa E';
    
    // --- Refs and State for Parallax/Color Shift ---
    const imageRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
    // --- Typing Animation Logic (Kept Local) ---
    const [typedName, setTypedName] = useState('');
    const indexRef = useRef(0);

    useEffect(() => {
        indexRef.current = 0;
        setTypedName('');
        const interval = setInterval(() => {
            indexRef.current += 1;
            setTypedName(fullName.slice(0, indexRef.current));
            if (indexRef.current >= fullName.length) {
                clearInterval(interval);
            }
        }, 120);
        return () => clearInterval(interval);
    }, [fullName]);
    
    // --- Parallax/Tilt Logic ---
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (imageRef.current) {
            const rect = imageRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const offsetX = (e.clientX - centerX) / (rect.width / 2);
            const offsetY = (e.clientY - centerY) / (rect.height / 2);

            setMousePosition({ x: offsetX, y: offsetY });
            setIsHovering(true);
        }
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
        setIsHovering(false);
    };
    
    // --- Transform Styles ---
    const maxRotate = 6; 
    const maxTranslate = 5; 
    
    const imageTransform = {
        transform: `perspective(1000px) rotateX(${mousePosition.y * maxRotate * -1}deg) rotateY(${mousePosition.x * maxRotate}deg) translateZ(10px) scale(${isHovering ? 1.02 : 1})`, 
        transition: isHovering ? 'none' : 'transform 0.5s ease-out',
    };
    
    const frameTransform = {
        transform: `translateX(${mousePosition.x * maxTranslate}px) translateY(${mousePosition.y * maxTranslate}px)`,
        transition: isHovering ? 'none' : 'transform 0.5s ease-out',
    };
    
    const glowClasses = isHovering
        ? 'animate-pulse-glow-fast opacity-100'
        : 'animate-pulse-glow opacity-75';

    const scrollToContact = () => { /* ... */ };

    return (
        <div className="w-full min-h-screen relative z-10 overflow-hidden cursor-default">
            
            {/* Dynamic Background Elements (Z-index 0) */}
            <NeuralNetworkBackground />

            {/* 1. TOP HALF: Centered Professional Details & Image (Z-index 10) */}
            <div className="h-screen flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-10 relative z-10">

                {/* Left: Details */}
                <div className="w-full md:w-1/2 space-y-6 animate-fade-in-up text-center md:text-left">
                    <h2 className="text-xl text-gray-400 font-light tracking-widest uppercase">Hello, I am</h2>

                    {/* Typing name with blinking cursor */}
                    <h1 className="text-5xl md:text-8xl font-black pb-2 whitespace-nowrap tracking-tight gradient-text">
                        <span>{typedName}</span>
                        <span className="ml-1">
                            <span className={`typing-cursor ${typedName.length === fullName.length ? 'hidden' : ''}`}>█</span>
                        </span>
                    </h1>

                    <div className="space-y-2">
                        <h3 className="text-2xl text-white font-bold">AI Developer</h3>
                        <p className="text-gray-400 max-w-lg">
                            Crafting intelligent solutions through <strong>code</strong>. Passionate about turning <strong>raw data into actionable insights</strong> and building <strong>robust systems</strong>.
                        </p>
                    </div>

                    {/* CTA Buttons - Flex container for proper spacing */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4"> 
                        <CTAButton 
                            href={RESUME_FILE_PATH} 
                            label="Download Resume" 
                        />
                        
                        <ContactOutlineButton
                            onClick={scrollToContact}
                            label="Contact Me"
                        />
                    </div>
                </div>

                {/* Right: Image Container with Parallax/Tilt */}
                <div 
                    ref={imageRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="w-full md:w-1/2 flex justify-center items-center cursor-crosshair"
                >
                    <div 
                        className="relative group transition-transform duration-500" 
                        style={frameTransform} // Apply subtle floating effect
                    >
                        {/* Glowing Rectangular Frame */}
                        <div 
                            className={`absolute -inset-1 bg-gradient-to-r from-neon-purple to-neon-blue rounded-lg blur ${glowClasses} transition-all duration-300`} 
                        ></div>

                        <div 
                            className="relative w-64 h-80 md:w-80 md:h-96 bg-black p-1 rounded-lg"
                            style={imageTransform} // Apply tilt/perspective effect to the image holder
                        >
                            <div className="w-full h-full overflow-hidden rounded-lg border-2 border-black">
                                <img 
                                    src="/portimage.jpg"
                                    alt="DevaroopaEProfile" 
                                        // Grayscale shift + minor scale/unblur on hover
                                    className={`w-full h-full object-cover filter transition-all duration-500 ${isHovering ? 'grayscale-0 scale-[1.01]' : 'grayscale'}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          

            {/* 2. Social Links: placed at the bottom of the content */}
            <div className="w-full flex justify-center py-12 relative z-10">
                <SocialLinks linkedinUrl={LINKEDIN_URL} githubUrl={GITHUB_URL} />
            </div>

            {/* Global CSS Styles (for Animations and Gradient Text) */}
            <style>{`
                /* Typing and Cursor Animation */
                .typing-cursor { display: inline-block; color: white; transition: opacity 0.1s; animation: blink 1s steps(2, start) infinite; }
                @keyframes blink { 50% { opacity: 0; } }

                /* Gradient Text Styling */
                .gradient-text {
                    color: white; 
                    background: linear-gradient(90deg, #7c3aed, #ec4899, #06b6d4);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent; 
                }

                /* Floating Animation (for Neural Network Nodes) */
                @keyframes float-slow {
                    0% { transform: translate(0, 0); }
                    50% { transform: translate(20px, 10px); }
                    100% { transform: translate(0, 0); }
                }
                .animate-float-slow {
                    animation: float-slow 20s ease-in-out infinite alternate; 
                }
                
                /* Custom scrollbar hide for repository showcase (optional) */
                .scrollbar-hide::-webkit-scrollbar {
                    display: none; /* Safari and Chrome */
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
        </div>
    );
};


export default HomeSection;
