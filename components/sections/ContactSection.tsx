import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-8 z-10 flex flex-col justify-center h-full">
      <h2 className="text-4xl font-bold text-center mb-2 text-white">Get In Touch</h2>
      <p className="text-center text-gray-400 mb-10">Have a project or opportunity? Let's connect.</p>

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