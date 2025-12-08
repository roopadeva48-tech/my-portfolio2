import React, { useState, useRef, useEffect } from 'react';
import ChatWidget from '../ChatWidget'; 
import AboutSection from './AboutSection'; 
import MoonGate from '../MoonGate';
// --- START: FULL CERTIFICATES DATA (All 11 Certificates) ---
// NOTE: Please ensure you replace the placeholder URLs with your actual hosted image links.
const certificates = [
  
  // 2. MongoDB Basics for Students
  { 
    id: 1, 
    title: 'MongoDB Basics for Students', 
    issuer: 'MongoDB', 
    date: 'June 25, 2025', 
    description: "Earned MongoDB Skill Badge demonstrating proficiency in MongoDB fundamentals.",
    imageUrl: '/mangodb.jpg', 
    fullUrl: '/mangodb.jpg'
  },
  // 3. Generative AI Workshop (K.S.R. College of Engineering)
  { 
    id: 2, 
    title: 'Workshop: Generative AI & Large Language Models', 
    issuer: 'K.S.R. College of Engineering', 
    date: 'April 28 & 29, 2025', 
    description: "Participation in a two-day workshop on Generative AI and Large Language Models (LLMs).",
    imageUrl: '/AI-ws-clg.jpg', 
    fullUrl: '/AI-ws-clg.jpg' 
  },
 
  // 8. Debugging Competition (KSR College of Engineering)
  { 
    id:3, 
    title: 'Debugging Competition Participation', 
    issuer: 'KSR College of Engineering (CSE)', 
    date: 'August 9th, 2025', 
    description: "Awarded certificate in recognition of active engagement in the Debugging competition.",
    imageUrl: '/KSR-deb.jpg', 
    fullUrl: '/KSR-deb.jpg' 
  },
  // 9. Large Language Model Workshop (VIT)
  { 
    id: 4, 
    title: 'Workshop on Large Language Model in Generative AI', 
    issuer: 'Vellore Institute of Technology (VIT)', 
    date: 'October 30th, 2025', 
    description: "Participation in a one-day workshop on LLM in Generative AI with Research and Industry Applications.",
    imageUrl: '/VIT-ws.jpg', 
    fullUrl: '/VIT-ws.jpg' 
  },
  // 10. Yukta: 2K25 Paper Presentation
  { 
    id: 5, 
    title: 'Paper Presentation Participation (YUKTA: 2K25)', 
    issuer: 'PSG Institute of Technology and Applied Research (CSE)', 
    date: 'March 15, 2025', 
    description: "Certificate of Appreciation for participation in the Paper Presentation event at Yukta(PSG): 2K25.",
    imageUrl: '/psg.jpg', 
    fullUrl: '/psg.jpg' 
  },
  // 11. UI/UX Workshop (Imagivite)
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
// --- END: FULL CERTIFICATES DATA ---

// --- Tilt Logic Component (Unchanged) ---
interface TiltProps {
  children: React.ReactNode;
  className?: string;
  onClick: () => void; // Added onClick prop to the TiltEffect
}

const TiltEffect: React.FC<TiltProps> = ({ children, className, onClick }) => {
  const tiltRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [transformStyle, setTransformStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;

    const rect = tiltRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position within the element.
    const y = e.clientY - rect.top;  // Y position within the element.
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 10; // Max rotation 10deg
    const rotateY = ((x - centerX) / centerX) * 10;  // Max rotation 10deg

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
    });
  };

  const handleMouseEnter = () => setIsHovering(true);

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTransformStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease', // Smoothly reset
    });
  };

  // The div now uses the onClick prop provided by the parent
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

// --- Image Modal Component (Unchanged) ---
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

// --- Certificate Section Main Component ---
const CertificateSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{ url: string, title: string } | null>(null);
  // NEW STATE: Controls whether the 3D gate or the certificate list is shown
  const [isCertificatesVisible, setIsCertificatesVisible] = useState(false); 

  // Function to show the actual certificates page (triggered by moon click)
  const handleMoonClick = () => {
      setIsCertificatesVisible(true);
  };
  
  const handleImageClick = (fullUrl: string, title: string) => {
    setSelectedImage({ url: fullUrl, title: title });
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-12 z-10 relative">
      
      
      {/* 1. INTERACTIVE 3D GATE (Initial View) */}
      {!isCertificatesVisible && (
          // Full screen overlay for the 3D scene
          <div className="fixed inset-0 z-50">
              <MoonGate onMoonClick={handleMoonClick} />
              
              {/* Overlay text for "Where is it?" */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">

                 <p className="text-5xl text-white font-extrabold" style={{ textShadow: '0 0 10px #b026ff, 0 0 5px #b026ff' }}>
                    Where the Certificate?
                  </p>

              </div>
          </div>
      )}

      {/* 2. ORIGINAL CERTIFICATE LIST (After Moon Click) */}
      {isCertificatesVisible && (
          <div className="space-y-24">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center uppercase tracking-wider text-white mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
                        CERTIFICATIONS
                    </span>
                </h1>
            {certificates.map((cert, index) => {
              // ... (The entire original map loop for displaying certificates goes here)
              const isRightAligned = index % 2 !== 0; 
              
              const contentClass = isRightAligned 
                ? 'md:text-right md:items-end' 
                : 'md:text-left md:items-start';

              const flexOrderClass = isRightAligned 
                ? 'md:flex-row-reverse' 
                : 'md:flex-row';

              return (
                <div 
                  key={cert.id} 
                  className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${flexOrderClass}`}
                >
                  
                  {/* Visual Side (Tilt Card) - MODIFIED TO MATCH PROJECT SIZE */}
                  <div className="w-full md:w-1/2">
                    <TiltEffect 
                      className="rounded-xl overflow-hidden shadow-2xl shadow-neon-purple/20 border border-white/10 bg-black/50 group cursor-pointer w-full" // Removed fixed width/height
                      onClick={() => handleImageClick(cert.fullUrl || cert.imageUrl, cert.title)}
                    >
                      {/* IMAGE CONTAINER: Uses h-64 for height consistency */}
                      <div className="relative h-64 w-full bg-gray-900 overflow-hidden"> 
                        <img 
                          src={cert.imageUrl} 
                          alt={cert.title}
                            // object-cover ensures it fills the frame like projects
                          className="w-full h-full object-cover transition-transform duration-500 opacity-80 group-hover:scale-110" // Added group-hover:scale-110
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                      </div>

                      <div className="p-6 relative">
                        {/* Certificate Number Indicator (Repositioned for consistent look) */}
                        <div className="absolute -top-10 right-6 w-12 h-12 bg-neon-pink rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-neon-pink/40"> 
                          {index + 1}
                        </div>
                      </div>
                    </TiltEffect>
                  </div>

                  {/* Content Side - Takes remaining space */}
									<div className={`w-full md:w-1/2 space-y-3 flex flex-col ${contentClass}`}>
										<h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
											{cert.title}
										</h3>
										<p className="text-neon-pink font-medium">{cert.issuer}</p>
										<p className="text-gray-400 text-sm mt-1">Issued: {cert.date}</p>

										<div className="mt-4">
											<button
												aria-label={`View ${cert.title}`}
												title="View"
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

      {/* Render the Modal if an image is selected */}
      {selectedImage && (
        <ImageModal 
          imageUrl={selectedImage.url}
          title={selectedImage.title}
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default CertificateSection;
