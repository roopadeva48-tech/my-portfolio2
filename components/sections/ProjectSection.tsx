import React from 'react';
import TiltCard from '../TiltCard';
import { Project } from '../../types';

const projects: (Project & { imageUrl: string })[] = [
  {
    title: "Krishi Sakthi",
    description: "An AI-powered agricultural assistant helping farmers with crop disease detection and yield prediction using advanced computer vision models.",
    link: "#",
    tags: ["Python", "TensorFlow", "React", "FastAPI"],
    imageUrl: "https://images.unsplash.com/photo-1625246333195-58197bd47d26?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    title: "RAG CHATBOT",
    description: "Retrieval-Augmented Generation chatbot capable of ingesting custom documents to provide context-aware answers with high accuracy.",
    link: "#",
    tags: ["LangChain", "OpenAI", "Pinecone", "Next.js"],
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    title: "my-utility-toolkit",
    description: "A comprehensive CLI and Web toolkit for developers offering rapid data formatting, regex testing, and file conversion utilities.",
    link: "#",
    tags: ["TypeScript", "Node.js", "Rust", "WebAssembly"],
    imageUrl: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=600&h=400"
  }
];

const ProjectSection: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-12 z-10">
      <h2 className="text-4xl font-bold text-center mb-16 text-white">Featured Projects</h2>
      
      <div className="space-y-24">
        {projects.map((project, index) => (
          <div key={index} className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            
            {/* Visual Side (3D Tilt) */}
            <div className="w-full md:w-1/2">
              <TiltCard className="rounded-xl overflow-hidden shadow-2xl shadow-neon-purple/20 border border-white/10 bg-black/50 group">
                <div className="relative h-64 w-full bg-gray-900 overflow-hidden">
                    <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                </div>
                <div className="p-6 relative">
                    <div className="absolute -top-10 right-6 w-12 h-12 bg-neon-pink rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-neon-pink/40">
                        {index + 1}
                    </div>
                </div>
              </TiltCard>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                {project.title}
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono text-neon-blue border border-neon-blue/30 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="pt-4">
                 <a href={project.link} className="inline-flex items-center gap-2 text-white hover:text-neon-pink transition-colors group">
                    View Project 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                 </a>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;