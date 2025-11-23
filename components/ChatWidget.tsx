import React from 'react';

interface ChatWidgetProps {
  onClick?: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ onClick }) => {
  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex items-end flex-col space-y-2 pointer-events-auto cursor-pointer group"
      onClick={onClick}
    >
      <div className="bg-slate-900 border border-neon-blue/30 text-neon-blue text-xs p-2 rounded-lg mb-2 shadow-[0_0_15px_rgba(0,234,255,0.2)] max-w-[150px] animate-bounce group-hover:animate-none group-hover:opacity-80 transition-opacity">
        Need help? Click to chat!
      </div>
      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-neon-purple to-neon-blue p-[2px] shadow-[0_0_20px_rgba(176,38,255,0.6)] group-hover:shadow-[0_0_30px_rgba(0,234,255,0.8)] transition-shadow duration-300">
        <div className="w-full h-full bg-black rounded-full flex items-center justify-center group-hover:bg-slate-900 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white group-hover:text-neon-blue transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;