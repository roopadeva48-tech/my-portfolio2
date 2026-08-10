import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import GradientText from '../GradientText'; // Ensure path is correct

// Define the Education type locally for completeness
type Education = {
    institution: string;
    degree: string;
    score: string;
    imagePlaceholder: string;
}
// Constants
const N8N_WEBHOOK_URL = "https://ak365.app.n8n.cloud/webhook/d565dc1a-6dc4-462e-b1c1-f041d802b9f5/chat";

const educationData: Education[] = [
    {
        institution: "KSR College of Engineering, Tiruchengode",
        degree: "Bachelor of Engineering",
        score: "8.55 CGPA (Pursuing 3rd year)",
        imagePlaceholder: "ksrimage.jpg"
    },
    {
        institution: "Sri Vidya Mandir Matriculation Hr. Sec. School",
        degree: "HSC (Higher Secondary)",
        score: "181 Cutoff | 83.6%",
        imagePlaceholder: "schimage.jpg"
    },
    {
        institution: "Sri Vidya Mandir Matriculation Hr. Sec. School",
        degree: "SSLC (Secondary)",
        score: "86.4%",
        imagePlaceholder: "schimage.jpg"
    }
];

const certificationsData = [
    { name: "Deep Learning Specialization", issuer: "Coursera/DeepLearning.AI", icon: "🧠", color: "text-neon-pink", detail: "Advanced neural networks, CNNs, RNNs, and sequence models." },
    { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services (AWS)", icon: "☁️", color: "text-yellow-400", detail: "Validated foundational cloud concepts and security knowledge." },
    { name: "Google Cloud Fundamentals", issuer: "Google Cloud", icon: "🚀", color: "text-blue-400", detail: "Core infrastructure, networking, and data services in GCP." },
    { name: "Practical Data Science", issuer: "Kaggle", icon: "📊", color: "text-green-400", detail: "Hands-on experience with feature engineering and model validation." },
];


// =========================================================================
// 2. HELPER COMPONENTS
// =========================================================================

// --- Neural Network Background Component ---
const NeuralNetworkBackground: React.FC = () => {
    const nodes = [
        { top: '10%', left: '20%', delay: '0s', size: 'w-2 h-2' },
        { top: '35%', left: '50%', delay: '2s', size: 'w-3 h-3' },
        { top: '60%', left: '80%', delay: '4s', size: 'w-2 h-2' },
        { top: '85%', left: '15%', delay: '1s', size: 'w-4 h-4' },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
            {nodes.map((node, index) => (
                <div
                    key={index}
                    className={`absolute rounded-full bg-neon-blue animate-float-slow`}
                    style={{ 
                        top: node.top, 
                        left: node.left, 
                        animationDelay: node.delay,
                        width: node.size,
                        height: node.size,
                    }}
                ></div>
            ))}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <line x1="20%" y1="10%" x2="50%" y2="35%" stroke="#06b6d4" strokeWidth="1" opacity="0.5" />
                <line x1="50%" y1="35%" x2="80%" y2="60%" stroke="#7c3aed" strokeWidth="1" opacity="0.5" />
                <line x1="15%" y1="85%" x2="50%" y2="35%" stroke="#ec4899" strokeWidth="1" opacity="0.5" />
            </svg>
        </div>
    );
};

// --- UPDATED: Education Cards Component (More Spacious) ---
const EducationCards: React.FC = () => {
    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold text-neon-pink uppercase tracking-widest mb-8 text-center md:text-left">Educational Journey</h3> 
            <div className="space-y-8"> {/* Increased spacing between cards */}
                {educationData.map((edu, idx) => (
                    <div 
                        key={idx} 
                        className="flex flex-col sm:flex-row gap-6 p-6 bg-slate-900/70 border border-neon-purple/50 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-neon-purple/50"
                    >
                        {/* Image/Logo Placeholder */}
                        <div className="flex-shrink-0 w-full sm:w-28 h-28 rounded-xl overflow-hidden border-2 border-neon-blue/50">
                            <img 
                                src={edu.imagePlaceholder} 
                                alt="Institution" 
                                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500" 
                            />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-center">
                            <h4 className="font-bold text-white text-xl leading-tight mb-2">{edu.institution}</h4>
                            <p className="text-neon-blue text-md mb-3">{edu.degree}</p>
                            <span className="text-neon-pink text-sm font-mono block tracking-wide">{edu.score}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- UPDATED: Certifications Section Component (More Spacious) ---
const CertificationsSection: React.FC = () => {
    return (
        <div className="mt-16 border-t border-slate-700/50 pt-10"> {/* Increased top margin and padding */}
            <h3 className="text-xl font-semibold text-neon-blue uppercase tracking-widest mb-8 text-center md:text-left">Certifications</h3> 
            <div className="grid grid-cols-1 gap-6"> {/* Increased gap */}
                {certificationsData.map((cert, idx) => (
                    <div 
                        key={idx} 
                        className="p-5 bg-slate-900/60 border border-slate-700/50 rounded-xl shadow-lg transition-all duration-300 hover:shadow-neon-blue/30 group flex items-start gap-4"
                    >
                        <span className={`text-3xl mt-1 ${cert.color}`}>{cert.icon}</span>
                        <div>
                            <h4 className="font-bold text-white text-lg group-hover:text-neon-pink transition-colors">{cert.name}</h4>
                            <p className="text-sm text-gray-400 mt-2 leading-relaxed">{cert.detail}</p>
                            <p className="text-[11px] font-mono text-gray-500 mt-2 uppercase tracking-wide">{cert.issuer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Astronaut Icon Component ---
const AstronautIcon = () => (
    <svg className="w-8 h-8 fill-neon-blue/80" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        <rect x="7" y="9" width="10" height="4" rx="2" fill="#61DAFB"/>
        <path d="M16 4h-2V2h2v2z"/>
    </svg>
);


// --- Side Chatbot Component ---
const SideChatbot: React.FC<any> = ({
    messages,
    inputValue,
    setInputValue,
    isLoading,
    handleSendMessage,
    handleKeyDown,
    chatContainerRef,
}) => {
    return (
        <div className="flex flex-col h-full bg-slate-900/90 border border-neon-blue/30 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md sticky top-8 max-h-[85vh]">
            
            {/* Header */}
            <div className="bg-slate-800/90 p-4 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-xs text-neon-blue font-mono tracking-wider">AI ASSISTANT ACTIVE</span>
            </div>

            {/* Astronaut Greeting */}
            <div className="flex items-center gap-3 p-4 bg-black/40 border-b border-slate-800">
                <AstronautIcon />
                <span className="text-white text-sm font-semibold">
                    Questions about my journey? Ask away!
                </span>
            </div>
            
            {/* Chat Area */}
            <div ref={chatContainerRef} className="flex-1 p-4 space-y-4 overflow-y-auto bg-black/20 font-mono text-sm relative scrollbar-thin scrollbar-thumb-neon-purple/30 scrollbar-track-transparent">
                {/* Background Animation */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute w-2 h-2 rounded-full bg-neon-blue top-10 left-10 animate-pulse"></div>
                    <div className="absolute w-1 h-1 rounded-full bg-white bottom-20 right-10 animate-ping"></div>
                </div>

                {messages.map((msg: any, index: number) => (
                    <div key={index} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in-up`}>
                        <div className={`${msg.role === 'user' 
                            ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30 rounded-2xl rounded-tr-sm' 
                            : 'bg-slate-800 text-gray-200 border border-slate-700 rounded-2xl rounded-tl-sm'} 
                            px-4 py-2.5 max-w-[90%] shadow-sm`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                
                {isLoading && (
                    <div className="flex gap-1 items-center p-2 text-neon-blue">
                        <span className="text-xs animate-pulse">Processing...</span>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-slate-800/80 border-t border-slate-700 flex gap-2">
                <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    className="flex-1 bg-black/50 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-neon-blue border border-slate-700 focus:border-neon-blue transition-all"
                    placeholder="Ask me anything..."
                />
                <button 
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    className="p-2 bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue rounded-lg transition-colors disabled:opacity-30"
                >
                    <X className="rotate-45" size={20} /> 
                </button>
            </div>
        </div>
    );
};


// --- Scroll Up Prompt Component (NEW) ---
const ScrollUpPrompt: React.FC = () => {
    const handleScrollUp = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div 
            className="fixed bottom-6 right-6 z-50 cursor-pointer group" 
            onClick={handleScrollUp}
        >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neon-pink/20 border border-neon-pink/50 text-neon-pink shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:bg-neon-pink group-hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"></path></svg>
            </div>
        </div>
    );
};


// =========================================================================
// 3. MAIN COMPONENT (SPACIOUS SPLIT LAYOUT)
// =========================================================================

const AboutSection: React.FC = () => {
    // Chatbot State 
    const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
        { role: 'bot', text: "Hello! I am Devaroopa's AI Assistant. Ask me about his projects, skills, or experience." }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Scroll page to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        const mainEl = document.querySelector('main');
        if (mainEl) mainEl.scrollTop = 0;
    }, []);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };
    
    useEffect(() => { 
        if (messages.length > 1) {
            scrollToBottom(); 
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage = inputValue;
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setInputValue("");
        setIsLoading(true);

        try {
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chatInput: userMessage })
            });
            
            if (!response.ok) throw new Error(`API Error: ${response.status}`);

            const data = await response.json();
            const botReply = data.output || "I received an empty response.";
            setMessages(prev => [...prev, { role: 'bot', text: botReply }]);

        } catch (error) {
            console.error("Chatbot Error:", error);
            setMessages(prev => [...prev, { 
                role: 'bot', 
                text: "⚠️ Connection issue. Please check the network." 
            }]);
        }
        setIsLoading(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="w-full min-h-screen p-4 md:p-8 lg:p-12 relative flex justify-center">
            
            <NeuralNetworkBackground />
            
            <style>{`
                /* Global Animations */
                @keyframes float-slow { 0% { transform: translate(0,0); } 50% { transform: translate(10px,10px); } 100% { transform: translate(0,0); } }
                .animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
            `}</style>
            
            {/* MAIN SPLIT GRID CONTAINER - INCREASED GAP */}
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 z-10">
                
                {/* --- LEFT COLUMN (CONTENT: 7/12 width) --- */}
                <div className="lg:col-span-7 flex flex-col space-y-20 pb-20"> {/* Increased vertical space between major blocks */}
                    
                    {/* Header */}
                    <div className="space-y-8 text-center lg:text-left">
                        <div className="inline-block">
                            <GradientText 
                                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff"]} 
                                animationSpeed={3} 
                                showBorder={false} 
                                className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
                            >
                                About Me
                            </GradientText>
                            <div className="h-1 w-full bg-gradient-to-r from-neon-purple to-neon-blue mt-4 rounded-full"></div>
                        </div>
                        
                        <p className="text-gray-300 text-xl leading-loose border-l-4 border-neon-purple pl-8 py-4 bg-white/5 rounded-r-2xl"> 
                            I am a motivated Computer Science student specializing in <strong className="text-white">UI/UX and Frontend Development</strong>. My focus is on crafting intuitive user-centric interfaces, responsive web workflows, and high-fidelity prototypes that bridge aesthetics with seamless functionality.
                        </p>
                    </div>

                    {/* Education */}
                    <EducationCards />
                </div>

                {/* --- RIGHT COLUMN (CHATBOT: 5/12 width) --- */}
                <div className="lg:col-span-5 h-auto lg:h-[calc(100vh-100px)] sticky top-8">
                    <SideChatbot 
                        messages={messages}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        isLoading={isLoading}
                        handleSendMessage={handleSendMessage}
                        handleKeyDown={handleKeyDown}
                        chatContainerRef={chatContainerRef}
                    />
                </div>

            </div>

            
        </div>
    );
};


export default AboutSection;
