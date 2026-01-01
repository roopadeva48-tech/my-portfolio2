import React, { useState, useRef } from 'react';
import GradientText from '../GradientText'; 
import MoonGate from '../MoonGate'; // 3D Astronaut

// ... (Certificates Data remains the same) ...
const certificates = [
  { 
    id: 1, 
    title: 'MongoDB Basics for Students', 
    issuer: 'MongoDB', 
    date: 'June 25, 2025', 
    description: "Earned MongoDB Skill Badge demonstrating proficiency in MongoDB fundamentals.",
    imageUrl: '/mangodb.jpg', 
    fullUrl: '/mangodb.jpg'
  },
  { 
    id: 2, 
    title: 'Workshop: Generative AI & Large Language Models', 
    issuer: 'K.S.R. College of Engineering', 
    date: 'April 28 & 29, 2025', 
    description: "Participation in a two-day workshop on Generative AI and Large Language Models (LLMs).",
    imageUrl: '/AI-ws-clg.jpg', 
    fullUrl: '/AI-ws-clg.jpg' 
  },
  { 
    id:3, 
    title: 'Debugging Competition Participation', 
    issuer: 'KSR College of Engineering (CSE)', 
    date: 'August 9th, 2025', 
    description: "Awarded certificate in recognition of active engagement in the Debugging competition.",
    imageUrl: '/KSR-deb.jpg', 
    fullUrl: '/KSR-deb.jpg' 
  },
  { 
    id: 4, 
    title: 'Workshop on Large Language Model in Generative AI', 
    issuer: 'Vellore Institute of Technology (VIT)', 
    date: 'October 30th, 2025', 
    description: "Participation in a one-day workshop on LLM in Generative AI with Research and Industry Applications.",
    imageUrl: '/VIT-ws.jpg', 
    fullUrl: '/VIT-ws.jpg' 
  },
  { 
    id: 5, 
    title: 'Paper Presentation Participation (YUKTA: 2K25)', 
    issuer: 'PSG Institute of Technology and Applied Research (CSE)', 
    date: 'March 15, 2025', 
    description: "Certificate of Appreciation for participation in the Paper Presentation event at Yukta(PSG): 2K25.",
    imageUrl: '/psg.jpg', 
    fullUrl: '/psg.jpg' 
  },
  { 
    id: 6, 
    title: 'UI/UX Workshop', 
    issuer: 'Imagivite Technology Private Limited', 
    date: 'July 20, 2025', 
    description: "Successfully completed an UI/UX workshop.",
    imageUrl: '/imagitive.jpg', 
    fullUrl: '/imagitive.jpg' 
  }
];

// ... (TiltEffect and ImageModal components remain unchanged) ...
interface TiltProps {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}

const TiltEffect: React.FC<TiltProps> = ({ children, className, onClick }) => {
  const tiltRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [transformStyle, setTransformStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
    });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setTransformStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease',
    });
  };

  return (
    <div
      ref={tiltRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick} 
      style={isHovering ? transformStyle : { transition: 'transform 0.5s ease' }}
    >
      {children}
    </div>
  );
};

const ImageModal: React.FC<{ imageUrl: string; title: string; onClose: () => void }> = ({ imageUrl, title, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex justify-center items-center p-4 cursor-pointer"
      onClick={onClose} 
    >
      <div 
        className="max-w-4xl max-h-full w-full relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <button 
          className="absolute top-4 right-4 text-white text-3xl font-bold bg-gray-800/50 rounded-full w-10 h-10 hover:bg-gray-700 transition"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-auto max-h-[90vh] object-contain border-2 border-white rounded-lg shadow-2xl"
        />
        <p className="text-white text-center mt-3 text-lg font-medium">{title}</p>
      </div>
    </div>
  );
};

interface CertificateSectionProps {
    isUnlocked: boolean;
}

const CertificateSection: React.FC<CertificateSectionProps> = ({ isUnlocked }) => {
  const [selectedImage, setSelectedImage] = useState<{ url: string, title: string } | null>(null);
  
  const handleImageClick = (fullUrl: string, title: string) => {
    setSelectedImage({ url: fullUrl, title: title });
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-12 z-10 relative min-h-screen flex flex-col justify-center">
      
      {/* 1. LOCKED VIEW */}
      {!isUnlocked && (
          // pointer-events-none on parent ensures clicks pass through to Background Moon
          <div className="fixed inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
             
             {/* 3D Model: MoonGate handles its own pointer events (set to none) */}
             <div className="w-full h-full max-h-[80vh] flex items-center justify-center">
                {/* We pass an empty function or just the component, clicks are handled by Background */}
                <MoonGate onMoonClick={() => {}} /> 
             </div>

             {/* Hint Text Overlay: Explicitly pointer-events-none */}
             <div className="absolute z-40 text-center space-y-4 bottom-20 md:bottom-32 pointer-events-none">
                 <p className="text-4xl md:text-6xl text-white font-extrabold animate-pulse" style={{ textShadow: '0 0 20px #b026ff' }}>
                    Where is the Certificate?
                  </p>
                  <p className="text-xl text-gray-400">Hint: Catch the drifting Moon! 🌑</p>
             </div>
          </div>
      )}

      {/* 2. UNLOCKED VIEW */}
      {isUnlocked && (
          <div className="space-y-24 animate-fade-in-up">
            <div className="text-center space-y-4 flex flex-col items-center mb-16">
                <GradientText 
                    colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} 
                    animationSpeed={3} 
                    showBorder={false} 
                    className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
                >
                    Certifications
                </GradientText>
                <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full"></div>
            </div>

            {certificates.map((cert, index) => {
              const isRightAligned = index % 2 !== 0; 
              const contentClass = isRightAligned ? 'md:text-right md:items-end' : 'md:text-left md:items-start';
              const flexOrderClass = isRightAligned ? 'md:flex-row-reverse' : 'md:flex-row';

              return (
                <div 
                  key={cert.id} 
                  className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${flexOrderClass}`}
                >
                  <div className="w-full md:w-1/2">
                    <TiltEffect 
                      className="rounded-xl overflow-hidden shadow-2xl shadow-neon-purple/20 border border-white/10 bg-black/50 group cursor-pointer w-full"
                      onClick={() => handleImageClick(cert.fullUrl || cert.imageUrl, cert.title)}
                    >
                      <div className="relative h-64 w-full bg-gray-900 overflow-hidden"> 
                        <img 
                          src={cert.imageUrl} 
                          alt={cert.title}
                          className="w-full h-full object-cover transition-transform duration-500 opacity-80 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                      </div>
                    </TiltEffect>
                  </div>

                  <div className={`w-full md:w-1/2 space-y-3 flex flex-col ${contentClass}`}>
                        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                            {cert.title}
                        </h3>
                        <p className="text-neon-pink font-medium">{cert.issuer}</p>
                        <p className="text-gray-400 text-sm mt-1">Issued: {cert.date}</p>

                        <div className="mt-4">
                            <button
                                aria-label={`View ${cert.title}`}
                                onClick={() => handleImageClick(cert.fullUrl || cert.imageUrl, cert.title)}
                                className="p-2 bg-neon-blue text-white rounded-md hover:brightness-110 transition flex items-center justify-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
              );
            })}
          </div>
      )}

      {/* Render Modal */}
      {selectedImage && (
        <ImageModal 
          imageUrl={selectedImage.url}
          title={selectedImage.title}
          onClose={handleCloseModal} 
        />
      )}
      
      <style>{`
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default CertificateSection;
