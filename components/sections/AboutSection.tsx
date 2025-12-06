import React, { useState, useRef, useEffect } from 'react';

// Define the Education type locally for completeness
type Education = {
    institution: string;
    degree: string;
    score: string;
    imagePlaceholder: string;
}

// Constants
const N8N_WEBHOOK_URL = "https://ak356.app.n8n.cloud/webhook/d565dc1a-6dc4-462e-b1c1-f041d802b9f5/chat"; // Insert your N8N Webhook URL here if available

const educationData: Education[] = [
    {
        institution: "KSR College of Engineering, Tiruchengode",
        degree: "Bachelor of Engineering",
        score: "8.5 CGPA (Pursuing 2nd year)",
        imagePlaceholder: "ksrimage.jpg" // Static College Image
    },
    {
        institution: "Sri Vidya Mandir Matriculation Hr. Sec. School",
        degree: "HSC (Higher Secondary)",
        score: "181 Cutoff | 83.6%",
        imagePlaceholder: "schimage.jpg" // Static School Image
    },
    {
        institution: "Sri Vidya Mandir Matriculation Hr. Sec. School",
        degree: "SSLC (Secondary)",
        score: "86.4%",
        imagePlaceholder: "schimage.jpg" // Static School Image
    }
];

const AboutSection: React.FC = () => {
    // Chatbot State (Unchanged)
    const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
        { role: 'bot', text: "Hello! I'm Devaroopa's AI assistant. I can answer questions about his skills, projects, and background using a RAG pipeline connected to my portfolio data." }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage = inputValue;
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setInputValue("");
        setIsLoading(true);

        try {
            if (N8N_WEBHOOK_URL) {
                // Real implementation if URL exists
                const response = await fetch(N8N_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chatInput: userMessage })
                });
                const data = await response.json();
                // Assuming N8N returns { output: "text response" }
                setMessages(prev => [...prev, { role: 'bot', text: data.output || "I received a response, but it was empty." }]);
            } else {
                // Simulated Response (Pinecone/N8N Simulation)
                setTimeout(() => {
                    let reply = "I am a simulated N8N bot. Connect me to a real webhook to query the vector database!";
                    if (userMessage.toLowerCase().includes("project")) {
                        reply = "Roopadeva has worked on several key projects like Krishi Sakthi (AI for agriculture) and a RAG Chatbot. Which one would you like to know more about?";
                    } else if (userMessage.toLowerCase().includes("skill") || userMessage.toLowerCase().includes("python")) {
                        reply = "Roopadeva is proficient in Python, JavaScript, C++, and SQL. He specializes in AI/ML frameworks like TensorFlow and LangChain.";
                    } else if (userMessage.toLowerCase().includes("contact") || userMessage.toLowerCase().includes("email")) {
                        reply = "You can reach him via the Contact section or email him directly.";
                    }

                    setMessages(prev => [...prev, { role: 'bot', text: reply }]);
                    setIsLoading(false);
                }, 1500);
                return; // Exit early for simulation to handle loading state inside timeout
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I encountered an error connecting to the knowledge base." }]);
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
        // Added custom CSS for the loading border pulse animation
        <div className="w-full max-w-7xl mx-auto p-6 md:p-12 flex flex-col md:flex-row gap-8 h-full items-center z-10">
            
            <style>{`
                @keyframes pulse-border {
                    0%, 100% { border-color: #4b5563; } /* slate-700 fallback */
                    50% { border-color: #06b6d4; } /* neon-blue pulse */
                }
                .animate-pulse-border {
                    animation: pulse-border 1.5s ease-in-out infinite alternate;
                }
            `}</style>
            
            {/* Left Half: Education & Personal Statement (Polished in previous step) */}
            <div className="w-full md:w-1/2 space-y-8 animate-fade-in text-left">
                <h2 className="text-4xl font-bold text-neon-purple mb-4">About Me</h2> 
                
                <p className="text-white leading-relaxed text-lg border-l-4 border-neon-purple pl-4"> 
                    I am a driven technology enthusiast focusing on <strong>AI/ML and Data Science</strong>. My academic journey has been defined by consistent performance and a deep curiosity for how systems learn and evolve.
                </p>

                <div className="space-y-6 mt-8">
                    <h3 className="text-xl font-semibold text-neon-pink uppercase tracking-widest">Education Path</h3> 
                    <div className="space-y-4">
                        {educationData.map((edu, idx) => (
                            <div key={idx} className="group flex items-center gap-4 py-4 px-3 rounded-lg transition-all duration-300 hover:bg-white/5 border-b border-dashed border-neon-purple/30 last:border-b-0">
                                <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-neon-purple/50">
                                    <img 
                                        src={edu.imagePlaceholder} 
                                        alt="Institution" 
                                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" 
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm md:text-base">{edu.institution}</h4>
                                    <p className="text-gray-400 text-xs md:text-sm">{edu.degree}</p> 
                                    <p className="text-neon-pink text-xs font-mono mt-1">{edu.score}</p> 
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Half: Functional Chatbot UI (MODIFIED) */}
            {/* Added dynamic class for pulsing border effect during loading */}
            <div className="w-full md:w-1/2 h-full flex items-center justify-center p-4">
                <div className={`w-full max-w-md bg-slate-900 border rounded-xl overflow-hidden shadow-2xl flex flex-col h-[500px] transition-colors duration-500 
                    ${isLoading ? 'animate-pulse-border' : 'border-slate-700'}`}
                >
                    {/* Header (Unchanged) */}
                    <div className="bg-slate-800 p-4 flex items-center gap-3 border-b border-slate-700">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="ml-2 text-xs text-gray-400 font-mono">portfolio_bot.n8n --workflow</span>
                    </div>
                    
                    {/* Chat Area */}
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-black/50 font-mono text-sm">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in-up`}>
                                <span className="text-xs text-gray-500">{msg.role === 'user' ? 'You' : 'Bot'}</span>
                                <div className={`${msg.role === 'user' 
                                    ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30 rounded-tl-lg rounded-b-lg' 
                                      // MODIFIED: Changed bot bubble background for slightly better contrast
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
                            // MODIFIED: Sharper focus ring and input border color on focus
                            className="flex-1 bg-black/30 rounded px-3 py-2 text-white text-xs focus:outline-none focus:ring-2 focus:ring-neon-blue border border-black focus:border-neon-blue transition-all duration-300"
                            placeholder="Ask about my projects..."
                        />
                        <button 
                            onClick={handleSendMessage}
                            disabled={isLoading || !inputValue.trim()}
                            className="w-8 h-8 bg-neon-blue/20 hover:bg-neon-blue/40 rounded flex items-center justify-center text-neon-blue disabled:opacity-50 transition-colors"
                        >
                            ➤
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};


export default AboutSection;
