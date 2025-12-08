import React, { useState } from 'react';

// Define the static contact data
const CONTACT_DATA = {
    email: "roopadeva48@gmail.com",
    phone: "9566426085",
    address: "Gurusamipalayam, Rasipuram, Namakkal.",
};

// --- Icon Components for Visual Contact Points ---
// (MailIcon, ConnectIcon, LocationIcon definitions omitted for brevity, they remain unchanged)
const MailIcon = (props: any) => (
    <svg {...props} className={"w-6 h-6 " + props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-17 4v10a1 1 0 001 1h14a1 1 0 001-1V12"></path></svg>
);
const ConnectIcon = (props: any) => (
    <svg {...props} className={"w-6 h-6 " + props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-3.28a1 1 0 01-.948-.684l-1.498-4.493a1 1 0 01.502-1.21l2.257-1.13a11.042 11.042 0 00-5.516-5.516l-1.13 2.257a1 1 0 01-1.21.502l-4.493-1.498A1 1 0 015 3.28V5z"></path></svg>
);
const LocationIcon = (props: any) => (
    <svg {...props} className={"w-6 h-6 " + props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
);

// Astronaut Image Placeholder (from uploaded image)
const AstronautImage = () => (
    <div className="w-full h-full relative flex items-center justify-center">
        {/* Placeholder for Astronaut and Message */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/80 rounded-2xl"></div>
        <img 
            src="image_63923e.jpg" // Using the provided astronaut image URL
            alt="Astronaut floating in space" 
            className="w-full h-auto object-contain max-h-[80%] opacity-80"
        />
        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-2xl font-extrabold text-neon-blue/90 whitespace-nowrap px-4 py-2 rounded-full bg-black/70 border border-neon-blue/50 animate-pulse-slow">
            Mission Control Awaits!
        </p>
         {/* Custom slow pulse animation (define in <style>) */}
    </div>
);


const ContactSection = () => {
    const [copiedItem, setCopiedItem] = useState('');

    const handleCopy = (text: string, key: string) => {
        // ... (handleCopy logic remains the same)
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
            setCopiedItem('FAILED');
            setTimeout(() => setCopiedItem(''), 2000);
        } finally {
            document.body.removeChild(textArea);
        }
    };

    const InfoBlock = ({ Icon, title, value, detail, isCopyable, copyKey }: any) => (
        <div className="flex items-start space-x-4 p-4 border-b border-white/10 last:border-b-0 group">
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

    return (
        <div 
            id="contact"
            className="w-full max-w-7xl mx-auto p-4 sm:p-8 z-10 flex justify-center items-center min-h-screen transition-transform" 
        >
            {/* Main Header (Moved inside the grid for better centering or removed) */}
            
            {/* Main Two-Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
                
                {/* --- LEFT SIDE: Image and Message --- */}
                <div className="order-2 md:order-1 flex flex-col justify-center items-center p-6 md:p-8 rounded-2xl shadow-2xl bg-black/70 border border-neon-blue/30 h-[650px] relative">
                    <AstronautImage />
                </div>
            
                {/* --- RIGHT SIDE: Contact Form and Directory --- */}
                <div className="order-1 md:order-2 space-y-8">
                    
                    {/* Header */}
                    <div className="text-left mb-6">
                        <h2 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
                            Transmit
                        </h2>
                        <p className="text-gray-400 text-lg mt-2">
                            Connect directly or send a secure encrypted message.
                        </p>
                    </div>

                    {/* Form Console */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl">
                        <h3 className="text-2xl font-bold text-white mb-6 border-b border-neon-purple/50 pb-3">
                            Secure Transmission Console
                        </h3>
                        <form className="space-y-6">
                            {/* Form Inputs (Name, Email, Subject, Message) */}
                            {/* ... (Your form content remains here) ... */}
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2"><label htmlFor="name" className="text-sm text-neon-blue font-medium ml-1">Name</label><input type="text" id="name" className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all placeholder-gray-500" placeholder="John Doe"/></div>
                                <div className="space-y-2"><label htmlFor="email" className="text-sm text-neon-blue font-medium ml-1">Email</label><input type="email" id="email" className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all placeholder-gray-500" placeholder="john@example.com"/></div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm text-neon-blue font-medium ml-1">Subject</label>
                                <input type="text" id="subject" className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all placeholder-gray-500" placeholder="Collaboration Request"/>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm text-neon-blue font-medium ml-1">Message</label>
                                <textarea id="message" rows={5} className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all resize-none placeholder-gray-500" placeholder="Tell me about your project..."></textarea>
                            </div>

                            <button type="button" className="w-full bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold py-4 rounded-lg hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(176,38,255,0.4)] uppercase tracking-wider text-lg">
                                Send Transmission
                            </button>
                        </form>
                    </div>

                    {/* Contact Directory */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-4">
                        <h3 className="text-2xl font-bold text-white mb-6 border-b border-neon-blue/50 pb-3">
                            Contact Directory
                        </h3>
                        
                        <div className="divide-y divide-white/10">
                            {/* 1. Address */}
                            <InfoBlock Icon={LocationIcon} title="Primary Location" value={CONTACT_DATA.address} detail="Meeting by appointment only." isCopyable={false} />

                            {/* 2. Phone Number */}
                            <InfoBlock Icon={ConnectIcon} title="Secure Link" value={CONTACT_DATA.phone} detail="Click to copy phone number." isCopyable={true} copyKey="phone" />

                            {/* 3. Email ID */}
                            <InfoBlock Icon={MailIcon} title="Direct Email" value={CONTACT_DATA.email} detail="Click to copy email address." isCopyable={true} copyKey="email" />
                        </div>
                        
                        {/* Schedule Call CTA */}
                        <a href="YOUR_CALENDLY_LINK" target="_blank" rel="noopener noreferrer" className="mt-8 block text-center bg-transparent border border-neon-blue/50 text-neon-blue font-bold py-3 px-6 rounded-lg hover:bg-neon-blue/20 hover:text-white transition-all duration-300 uppercase tracking-widest text-sm">
                            Schedule a 15-Min Briefing
                        </a>
                    </div>

                </div>

            </div>
            {/* Custom Keyframes for Astronaut Message */}
            <style>{`
                @keyframes pulse-slow {
                    0% { transform: scale(1); box-shadow: 0 0 10px rgba(0, 234, 255, 0.5); }
                    50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(0, 234, 255, 0.9); }
                    100% { transform: scale(1); box-shadow: 0 0 10px rgba(0, 234, 255, 0.5); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 3s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default ContactSection;
