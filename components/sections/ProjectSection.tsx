import React, { useState } from 'react';
import TiltCard from '../TiltCard'; // Assuming TiltCard component is correctly imported
import { Link } from 'react-router-dom'; 

import { X } from 'lucide-react'; 


// --- Custom Icons (for consistent styling) ---
const GlobeIcon = ({ size = 20, className = '' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 0 4 10 15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0-4-10 15.3 15.3 0 0 0 4-10zM2.5 12h19"/></svg>
);

const EyeIcon = ({ size = 20, className = '' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
);

const GitHubIcon = ({ size = 20, className = '' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.822-.257.822-.576v-2.222c-3.322.72-4.015-1.611-4.015-1.611-.543-1.378-1.328-1.74-1.328-1.74-1.09-.745.083-.729.083-.729 1.204.084 1.839 1.237 1.839 1.237 1.07 1.834 2.809 1.305 3.495.998.109-.776.419-1.305.762-1.604-2.665-.304-5.467-1.334-5.467-5.931 0-1.311.465-2.381 1.235-3.221-.135-.303-.54-1.523.104-3.176 0 0 1.006-.322 3.3 1.23.96-.268 1.98-.403 3-.403s2.04.135 3 .403c2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.911 1.23 3.221 0 4.597-2.802 5.624-5.475 5.92.42.36.81 1.096.81 2.22v3.259c0 .319.223.69.823.575C20.563 22.092 24 17.592 24 12c0-6.627-5.374-12-12-12z"/></svg>
);
// --- End Custom Icons ---

// Define the Project type with all required details
type Project = {
    title: string;
    description: string;
    fullDescription: string;
    keyContributions: string[];
    duration: string;
    link: string;
    repo: string;
    tags: string[];
    imageUrl: string;
    galleryImages: string[]; // <--- NEW FIELD
}
const projects: Project[] = [
    {
        title: "Krishi Sakthi",
        description: "An AI-powered agricultural assistant helping farmers with crop disease detection.",
        fullDescription: "A comprehensive AI system designed to assist local farmers. It utilizes custom-trained computer vision models (YOLO/Faster R-CNN) deployed via FastAPI to identify specific crop diseases from images. Additionally, it integrates a machine learning model to recommend the best soil treatments and crop rotation schedules based on local data and climate input.",
        keyContributions: [
            "Trained and fine-tuned YOLOv5 model for high-accuracy disease identification.",
            "Developed the prediction API using FastAPI for scalable deployment.",
            "Designed the data acquisition and labeling pipeline.",
        ],
        duration: "Jan 2024 - May 2024 (4 Months)",
        link: "https://krishi-sakhi-innovix-yp7whczthex5zaachik6gu.streamlit.app/",
        repo: "https://github.com/roopadeva48-tech/Krishi-Sakthi-AI",
        tags: ["Python", "TensorFlow", "React", "FastAPI", "Computer Vision"],
        imageUrl: 'public/krishi.jpg',
        galleryImages: [
            'public/krishi_screen1.jpg',
            'public/krishi_screen2.jpg',
            'public/krishi_screen3.jpg',
            'public/krishi_screen4.jpg',
        ],
    },
    {
        title: "RAG CHATBOT",
        description: "Retrieval-Augmented Generation chatbot capable of ingesting custom documents.",
        fullDescription: "Built a fully functional RAG pipeline using LangChain for orchestration and Pinecone as the vector store. The chatbot can ingest PDF/DOCX documents, embed them using OpenAI models, and provide context-aware, highly accurate answers, eliminating external hallucinations.",
        keyContributions: [
            "Implemented LangChain chains for document parsing and retrieval.",
            "Managed and queried Pinecone vector database.",
            "Designed user interface in Next.js for seamless interaction."
        ],
        duration: "May 2024 - June 2024 (1.5 Months)",
        link: "https://roopadeva48-tech.github.io/N8n_chatbot/)",
        repo: "https://github.com/roopadeva48-tech/N8n_chatbot",
        tags: ["LangChain", "OpenAI", "Pinecone", "Next.js", "Vector DB"],
        imageUrl: 'public/rag-pj.jpg',
        galleryImages: [
            'public/krishi_screen1.jpg',
            'public/krishi_screen2.jpg',
            'public/krishi_screen3.jpg',
            'public/krishi_screen4.jpg',
        ],
    },
    {
        title: "my-utility-toolkit",
        description: "A comprehensive CLI and Web toolkit for developers offering rapid data formatting.",
        fullDescription: "A practical toolkit developed using Rust and WebAssembly (Wasm) for performance-critical utilities like data formatting, regex validation, and binary file conversion. The web interface is built with TypeScript and Node.js to showcase Wasm integration for high-speed client-side processing.",
        keyContributions: [
            "Developed core utility functions in Rust for high performance.",
            "Used WebAssembly (Wasm) to integrate Rust logic into the web UI.",
            "Created CLI interface for command-line access to tools.",
        ],
        duration: "Aug 2023 - Nov 2023",
        link: "https://roopadeva48-tech.github.io/my-utility-toolkit/",
        repo: "https://github.com/roopadeva48-tech/my-utility-toolkit",
        tags: ["TypeScript", "Node.js", "Rust", "WebAssembly", "CLI"],
        imageUrl: "public/uti-pj.jpg",
        galleryImages: [
            'public/krishi_screen1.jpg',
            'public/krishi_screen2.jpg',
            'public/krishi_screen3.jpg',
            'public/krishi_screen4.jpg',
        ],
    }
];


// --- Project Modal Component ---
const ProjectModal: React.FC<{ project: Project | null; onClose: () => void }> = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className="w-full max-w-4xl bg-slate-900 border border-neon-purple/50 rounded-xl shadow-3xl shadow-neon-purple/30 overflow-hidden relative animate-scale-in max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()} 
            >
                {/* Close Button */}
                {/* ... (Close button code remains the same) ... */}

                {/* Modal Image/Header */}
                <div className="h-48 w-full bg-gray-800 overflow-hidden relative">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-70" />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
                
                {/* Modal Content - Scrollable */}
                <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
                    
                    {/* Title and Duration */}
                    {/* ... (Title and duration section remains the same) ... */}

                    {/* Full Description */}
                    <section>
                        <h4 className="text-lg font-semibold text-white uppercase tracking-widest">Overview</h4>
                        <p className="text-gray-300 leading-relaxed mt-2">{project.fullDescription}</p>
                    </section>

                    {/* NEW: Image Gallery Section */}
                    
                    <ImageGallery images={project.galleryImages} title={project.title} />

                    {/* Key Contributions */}
                    <section>
                        <h4 className="text-lg font-semibold text-white uppercase tracking-widest">My Key Contributions</h4>
                        <ul className="list-disc list-inside text-gray-400 pl-4 space-y-1 mt-2">
                            {project.keyContributions.map((contribution, index) => (
                                <li key={index} className="text-md">{contribution}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Technologies Used */}
                    <section>
                        <h4 className="text-lg font-semibold text-white uppercase tracking-widest">Technologies Used</h4>
                        {/* ... (Technologies used section remains the same) ... */}
                    </section>

                    {/* Links */}
                    {/* ... (Links section remains the same) ... */}
                </div>
            </div>
        </div>
    );
};


const ProjectSection: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const openModal = (project: Project) => {
        setSelectedProject(project);
    };

    const closeModal = () => {
        setSelectedProject(null);
    };

    return (
        <>
            {/* Custom Modal Animation Style */}
            <style>{`
                @keyframes scale-in {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-scale-in {
                    animation: scale-in 0.3s ease-out forwards;
                }
            `}</style>
        
            <div className="w-full max-w-7xl mx-auto p-6 md:p-12 z-10">
                <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">
                    Featured Projects
                </h2>
                
                <div className="space-y-28">
                    {projects.map((project, index) => (
                        <div key={index} className={`flex flex-col md:flex-row items-center gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                            
                            {/* Visual Side (3D Tilt) - Clickable Image */}
                            <div className="w-full md:w-1/2 cursor-pointer" onClick={() => openModal(project)}>
                                <TiltCard className="rounded-xl overflow-hidden shadow-3xl shadow-neon-blue/20 border border-neon-blue/30 bg-black/50 group">
                                    <div className="relative h-72 w-full bg-gray-900 overflow-hidden"> 
                                        <img 
                                            src={project.imageUrl} 
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                                    </div>
                                    <div className="p-6 relative">
                                        {/* Removed: Project Index Number */}
                                    </div>
                                </TiltCard>
                            </div>

                            {/* Content Side */}
                            <div className="w-full md:w-1/2 space-y-4">
                                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                                    {project.title}
                                </h3>
                                <p className="text-gray-300 leading-relaxed text-md border-l-4 border-neon-pink/50 pl-4">
                                    {/* Reduced content for primary view */}
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs font-mono text-neon-blue border border-neon-blue/50 px-2 py-1 rounded hover:bg-neon-blue/10 transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="pt-4 flex gap-4">
                                    {/* ICON 1: View Project (Globe Icon) */}
                                    <a 
                                        href={project.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        aria-label={`View live site for ${project.title}`}
                                        className="p-3 rounded-full bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/40 transition-colors"
                                    >
                                        <GlobeIcon size={20} />
                                    </a>

                                    {/* ICON 2: GitHub Repository */}
                                    <a 
                                        href={project.repo} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        aria-label={`GitHub repository for ${project.title}`}
                                        className="p-3 rounded-full bg-slate-700/50 text-white hover:bg-slate-700 transition-colors"
                                    >
                                        <GitHubIcon size={20} />
                                    </a>

                                     {/* ICON 3: Details/Popup (Eye Icon) */}
                                    <button 
                                        onClick={() => openModal(project)}
                                        aria-label={`View full details for ${project.title}`}
                                        className="p-3 rounded-full bg-neon-pink/20 text-neon-pink hover:bg-neon-pink/40 transition-colors"
                                    >
                                        <EyeIcon size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Removed: Repository Showcase (Secondary Section) */}
            </div>

            {/* Render Modal if a project is selected */}
            <ProjectModal project={selectedProject} onClose={closeModal} />
        </>
    );
};

export default ProjectSection;
