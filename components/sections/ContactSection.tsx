import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import GradientText from '../GradientText'; // Ensure path is correct relative to components folder
// Define the static contact data
const CONTACT_DATA = {
    email: "roopadeva48@gmail.com",
    phone: "9566426085",
    address: "Gurusamipalayam, Rasipuram, Namakkal.",
};

// --- EmailJS Configuration (REPLACE WITH YOUR ACTUAL IDs) ---
const EMAILJS_SERVICE_ID = 'service_n244czk';
const EMAILJS_TEMPLATE_ID = 'template_3akyifn';
const EMAILJS_USER_ID = 'GEb2hVKleWr3Gbukd';

// --- Icon Components ---
const MailIcon = (props: any) => (
    <svg {...props} className={"w-6 h-6 " + props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-17 4v10a1 1 0 001 1h14a1 1 0 001-1V12"></path></svg>
);
const ConnectIcon = (props: any) => (
    <svg {...props} className={"w-6 h-6 " + props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-3.28a1 1 0 01-.948-.684l-1.498-4.493a1 1 0 01.502-1.21l2.257-1.13a11.042 11.042 0 00-5.516-5.516l-1.13 2.257a1 1 0 01-1.21.502l-4.493-1.498A1 1 0 015 3.28V5z"></path></svg>
);
const LocationIcon = (props: any) => (
    <svg {...props} className={"w-6 h-6 " + props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
);

// --- Astronaut Image Component (Left Side Visual) ---
const AstronautImage = () => (
    <div className="w-full h-full relative flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/80 rounded-2xl pointer-events-none"></div>
        <img 
            src="/astronaut.jpg" // Ensure this path is correct in your public folder
            alt="Astronaut floating in space" 
            className="w-full h-auto object-contain max-h-[80%] opacity-90 z-10 animate-float-gentle"
        />
        <p className="absolute bottom-12 text-2xl md:text-3xl font-extrabold text-neon-blue/90 whitespace-nowrap px-6 py-3 rounded-full bg-black/80 border border-neon-blue/50 z-20 animate-pulse-slow shadow-lg shadow-neon-blue/20">
            Mission Control Awaits!
        </p>
    </div>
);


const ContactSection: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [copiedItem, setCopiedItem] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleCopy = (text: string, key: string) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            setCopiedItem(key);
            setTimeout(() => setCopiedItem(''), 2000);
        } catch (err) {
            setCopiedItem('FAILED');
            setTimeout(() => setCopiedItem(''), 2000);
        } finally {
            document.body.removeChild(textArea);
        }
    };
    
    // Info Block Component
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

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (status === 'sending') return;
        setStatus('sending');

        if (formRef.current) {
            emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_USER_ID)
                .then(() => {
                    setStatus('success');
                    formRef.current?.reset();
                    setTimeout(() => setStatus('idle'), 5000);
                }, (error) => {
                    console.error('EmailJS Error:', error);
                    setStatus('error');
                    setTimeout(() => setStatus('idle'), 5000);
                });
        } else {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };


    return (
        <div 
            id="contact"
            className="w-full max-w-7xl mx-auto p-4 sm:p-8 z-10 flex flex-col justify-center min-h-screen relative" 
        >
            
            {/* Page Header - Centered Top */}
            <div className="text-center mb-12 flex flex-col items-center gap-4">
                <GradientText 
                    colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff"]} 
                    animationSpeed={3} 
                    showBorder={false} 
                    className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
                >
                    CONNECT WITH ME
                </GradientText>
                <div className="h-1 w-24 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full"></div>
                <p className="text-gray-400 text-lg max-w-xl mx-auto">
                    Establish a direct link. Connect directly or send a secure encrypted message to mission control.
                </p>
            </div>

            {/* Main Content Grid: Left Image, Right Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full h-full">
                
                {/* --- LEFT SIDE: Visual Element (Astronaut) --- */}
                <div className="order-2 lg:order-1 flex justify-center items-center rounded-3xl shadow-2xl bg-black/40 border border-neon-blue/20 overflow-hidden relative min-h-[500px] lg:h-auto">
                    <AstronautImage />
                </div>
            
                {/* --- RIGHT SIDE: Scrollable Contact Console --- */}
                <div className="order-1 lg:order-2 flex flex-col h-[650px] overflow-y-auto custom-scrollbar-contact pr-2 space-y-8">
                    
                    {/* 1. Secure Form */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl flex-shrink-0">
                        <div className="flex items-center justify-between mb-6 border-b border-neon-purple/50 pb-3">
                            <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                                Secure Console
                            </h3>
                            <div className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            </div>
                        </div>

                        <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs uppercase font-bold text-neon-blue tracking-wide ml-1">Identity Name</label>
                                    <input name="from_name" type="text" id="name" required className="w-full bg-black/60 border border-gray-700/80 rounded-lg p-3 text-white text-sm focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all placeholder-gray-600" placeholder="Agent Smith"/>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs uppercase font-bold text-neon-blue tracking-wide ml-1">Frequency (Email)</label>
                                    <input name="user_email" type="email" id="email" required className="w-full bg-black/60 border border-gray-700/80 rounded-lg p-3 text-white text-sm focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all placeholder-gray-600" placeholder="smith@matrix.com"/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-xs uppercase font-bold text-neon-blue tracking-wide ml-1">Mission Objective</label>
                                <input name="subject" type="text" id="subject" required className="w-full bg-black/60 border border-gray-700/80 rounded-lg p-3 text-white text-sm focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all placeholder-gray-600" placeholder="Project Collaboration / Inquiry"/>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-xs uppercase font-bold text-neon-blue tracking-wide ml-1">Encrypted Message</label>
                                <textarea name="message" id="message" rows={4} required className="w-full bg-black/60 border border-gray-700/80 rounded-lg p-3 text-white text-sm focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all resize-none placeholder-gray-600" placeholder="Briefing details..."></textarea>
                            </div>

                            <button type="submit" disabled={status === 'sending'} className={`w-full text-white font-bold py-3.5 rounded-lg hover:opacity-90 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(176,38,255,0.4)] uppercase tracking-widest text-sm ${status === 'sending' ? 'bg-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-neon-purple to-neon-pink'}`}>
                                {status === 'sending' ? 'TRANSMITTING...' : status === 'success' ? 'TRANSMISSION SUCCESSFUL!' : status === 'error' ? 'TRANSMISSION FAILED' : 'SEND TRANSMISSION'}
                            </button>
                        </form>
                    </div>

                    {/* 2. Directory */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl flex-shrink-0">
                        <h3 className="text-xl font-bold text-white mb-6 border-b border-neon-blue/50 pb-3 uppercase tracking-wider">
                            Directory
                        </h3>
                        
                        <div className="divide-y divide-white/10">
                            <InfoBlock Icon={LocationIcon} title="Base of Operations" value={CONTACT_DATA.address} detail="On-site meetings by appointment." isCopyable={false} />
                            <InfoBlock Icon={ConnectIcon} title="Secure Line" value={CONTACT_DATA.phone} detail="Click to copy uplink number." isCopyable={true} copyKey="phone" />
                            <InfoBlock Icon={MailIcon} title="Direct Comms" value={CONTACT_DATA.email} detail="Click to copy secure email." isCopyable={true} copyKey="email" />
                        </div>
                        
                        <a href="https://calendly.com/roopadeva48/30min" target="_blank" rel="noopener noreferrer" className="mt-8 block text-center bg-transparent border border-neon-blue/50 text-neon-blue font-bold py-3 px-6 rounded-lg hover:bg-neon-blue/20 hover:text-white transition-all duration-300 uppercase tracking-widest text-xs">
                            Schedule Briefing (15m)
                        </a>
                    </div>

                </div>

            </div>

            <style>{`
                @keyframes float-gentle {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float-gentle {
                    animation: float-gentle 4s ease-in-out infinite;
                }
                @keyframes pulse-slow {
                    0% { box-shadow: 0 0 10px rgba(0, 234, 255, 0.3); transform: scale(1); }
                    50% { box-shadow: 0 0 25px rgba(0, 234, 255, 0.6); transform: scale(1.05); }
                    100% { box-shadow: 0 0 10px rgba(0, 234, 255, 0.3); transform: scale(1); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 3s infinite ease-in-out;
                }
                .custom-scrollbar-contact::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar-contact::-webkit-scrollbar-thumb {
                    background-color: #7c3aed; 
                    border-radius: 4px;
                }
                .custom-scrollbar-contact {
                    scrollbar-width: thin;
                    scrollbar-color: #7c3aed transparent;
                }
            `}</style>
        </div>
    );
};

export default ContactSection;
