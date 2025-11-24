import React, { useState } from 'react';

// --- Icon Components for Visual Contact Points ---

// Simple Mail Icon (Updated to w-6 h-6 for better visual balance)
const MailIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-17 4v10a1 1 0 001 1h14a1 1 0 001-1V12"></path></svg>
);

// Phone/Connect Icon
const ConnectIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
);


const ContactSection: React.FC = () => {
    // State to manage a simple copy-to-clipboard function or focus effect
    const [copied, setCopied] = useState(false);
    
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-8 z-10 flex flex-col justify-center min-h-screen">
            <h2 className="text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
                //TRANSMIT
            </h2>
            <p className="text-center text-gray-400 mb-12 text-lg">
                Initiate contact via direct transmission or use the secure console below.
            </p>

            {/* --- 1. Primary Contact Orb/Grid (Visually Attractive) --- */}
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 mb-16">
                
                {/* Contact Card 1: Email */}
                <div className="group relative bg-white/5 p-6 rounded-xl border border-white/10 flex-1 hover:border-neon-pink transition duration-300">
                    {/* Visual Glow Effect on Hover */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 bg-neon-pink blur-md transition duration-500 pointer-events-none"></div>
                    
                    <div className="relative space-y-4">
                        <MailIcon />
                        <h3 className="text-xl font-bold text-white">Direct Email</h3>
                        <p className="text-gray-400 text-sm">Preferred contact method for project inquiries and detailed discussions.</p>
                        
                        <div 
                            className="flex justify-between items-center bg-black/50 p-3 rounded-lg cursor-pointer border border-transparent hover:border-neon-pink transition duration-300"
                            onClick={() => handleCopy("devaroopa@example.com")} // Replace with actual email
                        >
                            <span className="text-neon-pink text-sm md:text-base font-mono truncate">
                                devaroopa@example.com 
                            </span>
                            <span className="text-xs text-gray-500 ml-4 group-hover:text-neon-pink transition duration-300">
                                {copied ? 'COPIED!' : 'CLICK TO COPY'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Contact Card 2: Scheduling / Phone */}
                <a 
                    href="YOUR_CALENDLY_LINK" // Replace with actual Calendly or booking link
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative bg-white/5 p-6 rounded-xl border border-white/10 flex-1 hover:border-neon-blue transition duration-300"
                >
                    {/* Visual Glow Effect on Hover */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 bg-neon-blue blur-md transition duration-500 pointer-events-none"></div>

                    <div className="relative space-y-4">
                        <ConnectIcon />
                        <h3 className="text-xl font-bold text-white">Schedule a Call</h3>
                        <p className="text-gray-400 text-sm">Book a 15-minute slot directly into my calendar for fast connection.</p>
                        
                        <div className="flex justify-between items-center bg-black/50 p-3 rounded-lg border border-transparent group-hover:border-neon-blue transition duration-300">
                            <span className="text-neon-blue text-sm md:text-base font-mono">
                                BOOK SLOT
                            </span>
                            <svg className="w-5 h-5 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </div>
                    </div>
                </a>
            </div>

            {/* --- 2. Divider and Form Console --- */}
            
            <div className="relative mb-10">
                <div className="h-0.5 bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-4 text-sm uppercase text-neon-purple font-semibold tracking-wider">
                    OR MESSAGE DIRECTLY
                </div>
            </div>

            {/* 3. Detailed Message Form (Kept the original style) */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-2xl">
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm text-neon-blue font-medium ml-1">Name</label>
                            <input 
                                type="text" 
                                id="name"
                                className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm text-neon-blue font-medium ml-1">Email</label>
                            <input 
                                type="email" 
                                id="email"
                                className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm text-neon-blue font-medium ml-1">Subject</label>
                        <input 
                            type="text" 
                            id="subject"
                            className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all"
                            placeholder="Collaboration Request"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm text-neon-blue font-medium ml-1">Message</label>
                        <textarea 
                            id="message"
                            rows={4}
                            className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all resize-none"
                            placeholder="Tell me about your project..."
                        ></textarea>
                    </div>

                    <button type="button" className="w-full bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold py-4 rounded-lg hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(176,38,255,0.4)]">
                        Send Transmission
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactSection;