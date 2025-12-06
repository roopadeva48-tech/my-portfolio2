import React from 'react';
import TiltCard from '../TiltCard'; // Assuming TiltCard component is correctly imported
// import { Project } from '../../types'; // Keeping the type reference commented

// Define the Project type locally for completeness
type Project = {
    title: string;
    description: string;
    link: string;
    tags: string[];
    imageUrl: string;
}

const projects: Project[] = [
  {
    title: "Krishi Sakthi",
    description: "An AI-powered agricultural assistant helping farmers with crop disease detection and yield prediction using advanced computer vision models.",
    link: "https://krishi-sakhi-innovix-yp7whczthex5zaachik6gu.streamlit.app/",
    tags: ["Python", "TensorFlow", "React", "FastAPI"],
    imageUrl: 'public/krishi.jpg'
  },
  {
    title: "RAG CHATBOT",
    description: "Retrieval-Augmented Generation chatbot capable of ingesting custom documents to provide context-aware answers with high accuracy.",
    link: "https://roopadeva48-tech.github.io/N8n_chatbot/)",
    tags: ["LangChain", "OpenAI", "Pinecone", "Next.js"],
    imageUrl: 'public/rag-pj.jpg'
  },
  {
    title: "my-utility-toolkit",
    description: "A comprehensive CLI and Web toolkit for developers offering rapid data formatting, regex testing, and file conversion utilities.",
    link: "https://roopadeva48-tech.github.io/my-utility-toolkit/",
    tags: ["TypeScript", "Node.js", "Rust", "WebAssembly"],
    imageUrl: "public/uti-pj.jpg"
  }
];

// --- Repository Showcase Component (Code from previous step, simplified/modified for Projects page) ---
const RepositoryShowcase: React.FC = () => {
    // Data for extra repositories or related smaller projects
    const repos = [
        { name: "ML-Model-Deployment", lang: "FastAPI", desc: "A template for deploying Python models via REST APIs.", url: "YOUR_REPO_URL_5" },
        { name: "Portfolio-Design-System", lang: "Tailwind", desc: "Custom Tailwind CSS configuration and component library.", url: "YOUR_REPO_URL_6" },
        { name: "Data-Preprocessing-Pipeline", lang: "Python", desc: "Modular scripts for efficient data cleaning and transformation.", url: "YOUR_REPO_URL_7" },
    ];

    return (
        <div className="w-full mt-32 pt-8 relative p-8 rounded-xl shadow-2xl bg-black/70 border border-neon-blue/30">
            <h4 className="text-2xl font-extrabold text-neon-blue mb-6 uppercase tracking-widest text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-purple">
                    [ Secondary Code Contributions ]
                </span>
            </h4>
            
            {/* Terminal Header Bar */}
            <div className="flex items-center gap-2 mb-4">
                <span className="ml-2 text-xs text-gray-500 font-mono">github/roopadeva48-tech/misc-repos</span>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto space-x-6 pb-2 scrollbar-hide">
                {repos.map((repo, index) => (
                    <a 
                        key={index} 
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        // Glass Card Style: Translucent background, subtle border, strong hover effect
                        className="min-w-[320px] p-5 bg-black/30 border border-white/20 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.03] hover:border-neon-purple/80 hover:bg-black/50 group cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h5 className="font-extrabold text-xl text-neon-pink group-hover:text-neon-blue transition-colors">{repo.name}</h5>
                        </div>
                        <p className="text-sm text-gray-300 mb-3 font-mono">{repo.desc}</p>
                        <span className="text-xs font-mono px-2 py-1 bg-neon-purple/30 text-white rounded">
                            {repo.lang}
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
};
// --- End Repository Showcase Component ---


const ProjectSection: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-12 z-10">
      <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">
            Featured Projects
        </h2>
      
      <div className="space-y-28"> {/* Increased spacing between projects */}
        {projects.map((project, index) => (
          <div key={index} className={`flex flex-col md:flex-row items-center gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            
            {/* Visual Side (3D Tilt) - Polished Shadow/Border */}
            <div className="w-full md:w-1/2">
              <TiltCard className="rounded-xl overflow-hidden shadow-3xl shadow-neon-blue/20 border border-neon-blue/30 bg-black/50 group">
                <div className="relative h-72 w-full bg-gray-900 overflow-hidden"> {/* Increased height */}
                    <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                </div>
                <div className="p-6 relative">
                    {/* Project Index Number Stylized */}
                    <div className="absolute -top-10 right-6 w-12 h-12 bg-neon-pink rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-neon-pink/40 animate-pulse-slow">
                        {index + 1}
                    </div>
                </div>
              </TiltCard>
            </div>

            {/* Content Side - Polished Text */}
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                {project.title}
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg border-l-4 border-neon-pink/50 pl-4"> {/* Added subtle text border */}
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="text-sm bg-neon-purple/20 text-neon-purple px-3 py-1 rounded-full font-mono hover:bg-neon-purple/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="pt-4">
                 <a href={project.link} className="inline-flex items-center gap-2 text-neon-pink hover:text-white transition-colors group">
                    View Project 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                 </a>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* NEW SECTION: Repository Showcase (Glass Card Style) */}
      <RepositoryShowcase />
    </div>
  );
};

export default ProjectSection;
