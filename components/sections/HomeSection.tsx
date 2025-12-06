import React, { useState, useEffect, useRef } from 'react';

// --- Social Icons (Existing) ---
const LinkedInIcon = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.271V1.729C24 .774 23.2 0 22.224 0z"/></svg>
);

const GithubIcon = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.763-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
);

// Removed large tech-stack visual and float/spin styles per request.
// We'll keep the social links and add a typing animation for the name below.


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

	// Typing animation state (use slice-based update for reliability)
	const fullName = 'Devaroopa E';
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

	return (
		<div className="w-full min-h-screen relative z-10">

			{/* 1. TOP HALF: Centered Professional Details & Image (H-SCREEN) */}
			<div className="h-screen flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-10">

				{/* Left: Details */}
				<div className="w-full md:w-1/2 space-y-6 animate-fade-in-up text-center md:text-left">
					<h2 className="text-xl text-gray-400 font-light tracking-widest uppercase">Hello, I am</h2>

					{/* Typing name with blinking cursor */}
					<h1 className="text-5xl md:text-8xl font-black pb-2 whitespace-nowrap tracking-tight gradient-text">
						<span>{typedName}</span>
						<span className="ml-1">
							<span className="typing-cursor">█</span>
						</span>
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

						<div className="relative w-64 h-80 md:w-80 md:h-96 bg-black p-1 rounded-lg">
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

			{/* 2. Social Links: placed below the main viewport (not absolute) */}
			<div className="w-full flex justify-center py-12">
				<SocialLinks linkedinUrl={LINKEDIN_URL} githubUrl={GITHUB_URL} />
			</div>

			{/* Typing cursor CSS (kept local to this component) */}
			<style>{`
				.typing-cursor { display: inline-block; animation: blink 1s steps(2, start) infinite; }
				@keyframes blink { 50% { opacity: 0; } }

				/* Gradient text with white fallback */
				.gradient-text {
					color: white; /* fallback for browsers that don't support background-clip */
					background: linear-gradient(90deg, #7c3aed, #ec4899, #06b6d4);
					-webkit-background-clip: text;
					background-clip: text;
					-webkit-text-fill-color: transparent; /* use gradient in WebKit-based browsers */
				}
			`}</style>
		</div>
	);
};


export default HomeSection;


