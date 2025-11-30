import React, { useState, useEffect } from 'react';
import RocketEntry from '../RocketEntry'; // Import the 3D entry component

// Define the static contact data
const CONTACT_DATA = {
    email: "roopadeva48@gmail54.com",
    phone: "9566426085", // Placeholder Phone
    address: "Gurusamipalayam,Rasipuram,Namakkal.", // Placeholder Address
};

// --- Icon Components for Visual Contact Points (Unchanged) ---

// Simple Mail Icon
const MailIcon = (props: any) => (
    <svg {...props} className={"w-6 h-6 " + props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-17 4v10a1 1 0 001 1h14a1 1 0 001-1V12"></path></svg>
);

// Phone/Connect Icon
const ConnectIcon = (props: any) => (
    <svg {...props} className={"w-6 h-6 " + props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-3.28a1 1 0 01-.948-.684l-1.498-4.493a1 1 0 01.502-1.21l2.257-1.13a11.042 11.042 0 00-5.516-5.516l-1.13 2.257a1 1 0 01-1.21.502l-4.493-1.498A1 1 0 015 3.28V5z"></path></svg>
);

// Location Icon
const LocationIcon = (props: any) => (
    <svg {...props} className={"w-6 h-6 " + props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
);


const ContactSection = () => {
    // === ANIMATION CONTROL STATES ===
    const [animationStarted, setAnimationStarted] = useState(true);
    const [animationProgress, setAnimationProgress] = useState(0); // 0 to 1
    // ================================

    // State to manage a simple copy-to-clipboard function status
    const [copiedItem, setCopiedItem] = useState('');

    const handleCopy = (text: string, key: string) => {
        // Use a temporary textarea for better cross-browser compatibility with execCommand
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            setCopiedItem(key);
            setTimeout(() => setCopiedItem(''), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            // Fallback for environments where execCommand is blocked
            setCopiedItem('FAILED');
            setTimeout(() => setCopiedItem(''), 2000);
        } finally {
            document.body.removeChild(textArea);
        }
    };

    const InfoBlock = ({ Icon, title, value, detail, isCopyable, copyKey }: any) => (
        <div className="flex items-start space-x-4 p-4 border-b border-white/10 last:border-b-0">
            <div className="mt-1 flex-shrink-0">
                <Icon className="text-neon-pink group-hover:text-neon-blue transition-colors duration-300" />
            </div>
            <div className="flex-grow">
                <h4 className="text-lg font-semibold text-white">{title}</h4>
                <div 
                    className={`text-gray-300 whitespace-pre-line ${isCopyable ? 'cursor-pointer hover:text-neon-blue transition-colors duration-200' : ''}`}
                    onClick={() => isCopyable && handleCopy(value, copyKey)}
                >
                    {value}
                </div>
                <p className="text-xs text-gray-500 mt-1">{isCopyable && copiedItem === copyKey ? 'COPIED!' : detail}</p>
            </div>
        </div>
    );

    // Calculate translation percentage based on rocket progress:
    // Starts at 0% (hidden right) and moves to 100% (fully visible)
    const translateX = 100 - (animationProgress * 100); 

    return (
        <>
            {/* 1. Rocket 3D Animation Overlay */}
            {animationStarted && (
                <RocketEntry 
                    onAnimationComplete={() => setAnimationStarted(false)} 
                    onProgressUpdate={setAnimationProgress}
                />
            )}
            
            {/* 2. Contact Section Content - Shifted by Rocket progress */}
            <div 
                className="w-full max-w-6xl mx-auto p-4 sm:p-8 z-10 flex flex-col justify-center min-h-screen transition-transform" 
                style={{ transform: `translateX(${translateX}%)` }}
            >
            
                {/* Main Header */}
                <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
                    //TRANSMIT
                </h2>
                <p className="text-center text-gray-400 mb-12 text-lg">
                    Connect directly or send a secure encrypted message.
                </p>

                {/* Main Two-Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                
                    {/* --- LEFT SIDE: Detailed Message Form (The console) --- */}
                    <div className="order-2 md:order-1 bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl">
                        <h3 className="text-2xl font-bold text-white mb-6 border-b border-neon-purple/50 pb-3">
                            Secure Transmission Console
                        </h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm text-neon-blue font-medium ml-1">Name</label>
                                    <input 
                                        type="text" 
                                        id="name"
                                        className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all placeholder-gray-500"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm text-neon-blue font-medium ml-1">Email</label>
                                    <input 
                                        type="email" 
                                        id="email"
                                        className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all placeholder-gray-500"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm text-neon-blue font-medium ml-1">Subject</label>
                                <input 
                                    type="text" 
                                    id="subject"
                                    className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all placeholder-gray-500"
                                    placeholder="Collaboration Request"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm text-neon-blue font-medium ml-1">Message</label>
                                <textarea 
                                    id="message"
                                    rows={5}
                                    className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all resize-none placeholder-gray-500"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>

                            <button 
                                type="button" 
                                className="w-full bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold py-4 rounded-lg hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(176,38,255,0.4)] uppercase tracking-wider text-lg"
                            >
                                Send Transmission
                            </button>
                        </form>
                    </div>

                    {/* --- RIGHT SIDE: Contact Information Panel --- */}
                    <div className="order-1 md:order-2 bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-4 h-full">
                        <h3 className="text-2xl font-bold text-white mb-6 border-b border-neon-blue/50 pb-3">
                            Contact Directory
                        </h3>
                        
                        <div className="divide-y divide-white/10">
                            {/* 1. Address */}
                            <InfoBlock
                                Icon={LocationIcon}
                                title="Primary Location"
                                value={CONTACT_DATA.address}
                                detail="Meeting by appointment only."
                                isCopyable={false}
                            />

                            {/* 2. Phone Number */}
                            <InfoBlock
                                Icon={ConnectIcon}
                                title="Secure Link"
                                value={CONTACT_DATA.phone}
                                detail="Click to copy phone number."
                                isCopyable={true}
                                copyKey="phone"
                            />

                            {/* 3. Email ID */}
                            <InfoBlock
                                Icon={MailIcon}
                                title="Direct Email"
                                value={CONTACT_DATA.email}
                                detail="Click to copy email address."
                                isCopyable={true}
                                copyKey="email"
                            />
                        </div>
                        
                        {/* Schedule Call CTA - Remains a separate link for action */}
                        <a 
                            href="YOUR_CALENDLY_LINK" // Replace with actual Calendly or booking link
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-8 block text-center bg-transparent border border-neon-blue/50 text-neon-blue font-bold py-3 px-6 rounded-lg hover:bg-neon-blue/20 hover:text-white transition-all duration-300 uppercase tracking-widest text-sm"
                        >
                            Schedule a 15-Min Briefing
                        </a>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ContactSection;
