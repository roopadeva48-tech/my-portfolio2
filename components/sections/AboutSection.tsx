import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react'; 

// =========================================================================
// 1. TYPE DEFINITIONS & CONSTANTS
// =========================================================================

// Define the Education type locally for completeness
type Education = {
    institution: string;
    degree: string;
    score: string;
    imagePlaceholder: string;
}

// Constants
const N8N_WEBHOOK_URL = "https://ak356.app.n8n.cloud/webhook/d565dc1a-6dc4-462e-b1c1-f041d802b9f5/chat";

const educationData: Education[] = [
    {
        institution: "KSR College of Engineering, Tiruchengode",
        degree: "Bachelor of Engineering",
        score: "8.5 CGPA (Pursuing 2nd year)",
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

// --- NEW: Education Cards Component ---
const EducationCards: React.FC = () => {
    return (
        <div className="pt-12 mt-8">
            <h3 className="text-xl font-semibold text-neon-pink uppercase tracking-widest mb-8 text-center">My Educational Journey</h3> 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {educationData.map((edu, idx) => (
                    <div 
                        key={idx} 
                        className="p-6 bg-slate-900/70 border border-neon-purple/50 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.03] hover:shadow-neon-purple/50 flex flex-col justify-between h-full"
                    >
                        {/* Image/Logo Placeholder */}
                        <div className="flex-shrink-0 w-full h-32 rounded-lg overflow-hidden border-2 border-neon-blue/50 mb-4">
                            <img 
                                src={edu.imagePlaceholder} 
                                alt="Institution" 
                                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500" 
                            />
                        </div>
                        
                        {/* Content */}
                        <div>
                            <h4 className="font-extrabold text-white text-xl mb-1 text-center">{edu.institution}</h4>
                            <p className="text-neon-blue text-md mb-2 text-center">{edu.degree}</p>
                            
                            <div className="border-t border-slate-700/50 pt-3 mt-3">
                                <p className="text-center">
                                    <span className="text-neon-pink text-lg font-mono">{edu.score}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- Certifications Section Component ---
const CertificationsSection: React.FC = () => {
    return (
        <div className="pt-12 mt-12 border-t border-slate-700/50">
            <h3 className="text-xl font-semibold text-neon-blue uppercase tracking-widest mb-6">Certifications & Achievements</h3> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificationsData.map((cert, idx) => (
                    <div 
                        key={idx} 
                        className="p-5 bg-slate-900/60 border border-slate-700/50 rounded-xl shadow-lg transition-all duration-300 hover:shadow-neon-blue/30 group"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`text-2xl ${cert.color}`}>{cert.icon}</span>
                            <h4 className="font-bold text-white text-lg group-hover:text-neon-pink transition-colors">{cert.name}</h4>
                        </div>
                        <p className="text-sm text-gray-400">{cert.detail}</p>
                        <p className="text-xs font-mono text-gray-500 mt-2">Issuer: {cert.issuer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Astronaut Icon Component (Re-added for Chatbot) ---
const AstronautIcon = () => (
    <svg className="w-8 h-8 fill-neon-blue/80" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        <rect x="7" y="9" width="10" height="4" rx="2" fill="#61DAFB"/>
        <path d="M16 4h-2V2h2v2z"/>
    </svg>
);


// --- Full-Width Q&A Chatbot Section Component ---
const FullWidthChatbot: React.FC<any> = ({
    messages,
    inputValue,
    setInputValue,
    isLoading,
    handleSendMessage,
    handleKeyDown,
    messagesEndRef,
}) => {
    return (
        <div className="pt-12 mt-12 border-t border-slate-700/50">
            <h3 className="text-xl font-semibold text-neon-pink uppercase tracking-widest text-center mb-8">
                Query My Knowledge Base 🤖
            </h3> 
            <div className="w-full max-w-4xl mx-auto bg-slate-900 border rounded-xl shadow-2xl flex flex-col h-[600px] transition-colors duration-500 border-slate-700">
                
                {/* Header */}
                <div className="bg-slate-800 p-4 flex items-center gap-3 border-b border-slate-700">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="ml-2 text-xs text-gray-400 font-mono">Personal Chatbot</span>
                </div>

                {/* Astronaut Greeting Header */}
                <div className="flex items-center gap-3 p-4 bg-slate-800/80 border-b border-slate-700/50">
                    <AstronautIcon />
                    <span className="text-white text-lg font-bold">
                        Hi! Ask away! 👋
                    </span>
                </div>
                
                {/* Chat Area (Added subtle animation background) */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-black/50 font-mono text-sm relative overflow-hidden">
                    {/* Subtly Animated Background Dots (NEW) */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute w-2 h-2 rounded-full bg-neon-blue top-1/4 left-1/4 animate-ping-slow"></div>
                        <div className="absolute w-3 h-3 rounded-full bg-neon-pink top-3/4 right-1/4 animate-pulse-slow"></div>
                        <div className="absolute w-1 h-1 rounded-full bg-white top-1/2 left-3/4 animate-float-slow" style={{animationDelay: '1s'}}></div>
                    </div>
                    {/* End Animated Background */}

                    {messages.map((msg: any, index: number) => (
                        <div key={index} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in-up relative z-10`}>
                            <span className="text-xs text-gray-500">{msg.role === 'user' ? 'You' : 'Bot'}</span>
                            <div className={`${msg.role === 'user' 
                                ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30 rounded-tl-lg rounded-b-lg' 
                                : 'bg-gray-800 text-gray-300 rounded-tr-lg rounded-b-lg'} 
                                p-3 max-w-[90%] break-words`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    
                    {isLoading && (
                        <div className="flex gap-1 items-center p-2">
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2">
                    <input 
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        className="flex-1 bg-black/30 rounded px-3 py-2 text-white text-xs focus:outline-none focus:ring-2 focus:ring-neon-blue border border-black focus:border-neon-blue transition-all duration-300"
                        placeholder="Ask about my projects, skills, or background..."
                    />
                    <button 
                        onClick={handleSendMessage}
                        disabled={isLoading || !inputValue.trim()}
                        className="w-8 h-8 bg-neon-blue/20 hover:bg-neon-blue/40 rounded flex items-center justify-center text-neon-blue disabled:opacity-50 transition-colors"
                    >
                        {/* Assuming X is meant to be a Send/Arrow icon here */}
                        <X size={24} /> 
                    </button>
                </div>
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
            className="fixed bottom-4 right-4 z-50 cursor-pointer" 
            onClick={handleScrollUp}
        >
            <div className="flex flex-col items-center p-3 rounded-full bg-neon-pink/70 text-white shadow-lg shadow-neon-pink/50 transition-all duration-300 hover:scale-110">
                {/* Arrow Icon */}
                <svg className="w-6 h-6 animate-bounce-slow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                <span className="text-xs mt-1 font-semibold">Top</span>
            </div>
        </div>
    );
};


// =========================================================================
// 3. MAIN COMPONENT (INTEGRATING ALL CHANGES)
// =========================================================================

const AboutSection: React.FC = () => {
    // Chatbot State and Handlers (kept the same)
    const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
        { role: 'bot', text: "Hello! I'm Devaroopa's AI assistant. I can answer questions about his skills, projects, and background using a RAG pipeline connected to my portfolio data." }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
    useEffect(() => { scrollToBottom(); }, [messages]);

    // --- Handlers (Simplified existing logic) ---
    const handleSendMessage = async () => { /* ... */ };
    const handleKeyDown = (e: React.KeyboardEvent) => { /* ... */ };

    return (
        <div className="w-full max-w-7xl mx-auto p-6 md:p-12 z-10 relative">
            
            {/* BACKGROUND: Neural Network Visualization */}
            <NeuralNetworkBackground />
            
            <style>{`
                /* Custom CSS for Chatbot Background Animation and Scroll Prompt */
                @keyframes ping-slow { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
                .animate-ping-slow { animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite; }
                @keyframes pulse-slow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
                .animate-pulse-slow { animation: pulse-slow 5s ease-in-out infinite alternate; }
                @keyframes bounce-slow { 0%, 100% { transform: translateY(-10%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); } 50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); } }
                .animate-bounce-slow { animation: bounce-slow 1.5s infinite; }
                /* Floating Animation (for Neural Network Nodes) */
                @keyframes float-slow {
                    0% { transform: translate(0, 0); } 50% { transform: translate(20px, 10px); } 100% { transform: translate(0, 0); }
                }
                .animate-float-slow { animation: float-slow 20s ease-in-out infinite alternate; }
            `}</style>
            
            {/* 1. TOP BLOCK: Bio */}
            <div className="w-full space-y-8 animate-fade-in text-left relative z-20">
                <h1 className="text-4xl md:text-5xl font-extrabold text-center uppercase tracking-wider text-white mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
                        ABOUT ME
                    </span>
                </h1>
                
                <p className="text-white leading-relaxed text-lg border-l-4 border-neon-purple pl-4"> 
                    I am a driven technology enthusiast focusing on <strong>AI/ML and Data Science</strong>. My academic journey has been defined by consistent performance and a deep curiosity for how systems learn and evolve.
                </p>
            </div>
            
            {/* 2. EDUCATION JOURNEY CARDS (SCROLL BLOCK) */}
            <EducationCards />

            {/* 3. CERTIFICATIONS SECTION (SCROLL BLOCK) */}
           

            {/* 4. FULL-WIDTH CHATBOT (SCROLL BLOCK) */}
            <FullWidthChatbot 
                messages={messages}
                inputValue={inputValue}
                setInputValue={setInputValue}
                isLoading={isLoading}
                handleSendMessage={handleSendMessage}
                handleKeyDown={handleKeyDown}
                messagesEndRef={messagesEndRef}
            />
            
            {/* REMOVED: 5. MISSION STATEMENT (Conclusion) */}

            {/* 6. SCROLL UP PROMPT (Fixed Position) */}
            <ScrollUpPrompt />
        </div>
    );
};
export default AboutSection;