import React, { useState, useRef, useEffect } from 'react';
import ChatWidget from '../ChatWidget'; 
import AboutSection from './AboutSection'; 
import MoonGate from '../MoonGate';

// --- START: FULL CERTIFICATES DATA (All 11 Certificates) ---
// NOTE: Please ensure you replace the placeholder URLs with your actual hosted image links.
const certificates = [
  // 1. CODTECH IT SOLUTIONS Internship
  { 
    id: 1, 
    title: 'Online Internship in Frontend Web Development', 
    issuer: 'CODTECH IT SOLUTIONS PRIVATE LIMITED', 
    date: 'July 18th, 2025 - September 3rd, 2025', 
    description: "Successfully completed a 6 weeks Online Internship Program in Frontend Web Development.",
    imageUrl: '/assets/Untitled.pdf_thumb.jpg', 
    fullUrl: '/assets/Untitled.pdf_full.jpg' 
  },
  // 2. MongoDB Basics for Students
  { 
    id: 2, 
    title: 'MongoDB Basics for Students', 
    issuer: 'MongoDB', 
    date: 'June 25, 2025', 
    description: "Earned MongoDB Skill Badge demonstrating proficiency in MongoDB fundamentals.",
    imageUrl: '/assets/MongoDBBasicsforStudents_thumb.jpg', 
    fullUrl: '/assets/MongoDBBasicsforStudents_full.jpg' 
  },
  // 3. Generative AI Workshop (K.S.R. College of Engineering)
  { 
    id: 3, 
    title: 'Workshop: Generative AI & Large Language Models', 
    issuer: 'K.S.R. College of Engineering', 
    date: 'April 28 & 29, 2025', 
    description: "Participation in a two-day workshop on Generative AI and Large Language Models (LLMs).",
    imageUrl: '/assets/workshop-AI_thumb.jpg', 
    fullUrl: '/assets/workshop-AI_full.jpg' 
  },
  // 4. MathWorks: Make and Manipulate Matrices
  { 
    id: 4, 
    title: 'Course Completion: Make and Manipulate Matrices', 
    issuer: 'MathWorks | Training Services', 
    date: 'August 29, 2025', 
    description: "Completed self-paced training course on core MATLAB matrix operations.",
    imageUrl: '/assets/MakeMatrices_thumb.jpg', 
    fullUrl: '/assets/MakeMatrices_full.jpg' 
  },
  // 5. MathWorks: Signal Segmentation with Deep Learning
  { 
    id: 5, 
    title: 'Course Completion: Signal Segmentation with Deep Learning', 
    issuer: 'MathWorks | Training Services', 
    date: 'August 29, 2025', 
    description: "Completed self-paced training course on deep learning applied to signal processing using MATLAB.",
    imageUrl: '/assets/SignalSegmentation_thumb.jpg', 
    fullUrl: '/assets/SignalSegmentation_full.jpg' 
  },
  // 6. MathWorks: Statistics Onramp
  { 
    id: 6, 
    title: 'Course Completion: Statistics Onramp', 
    issuer: 'MathWorks | Training Services', 
    date: 'August 29, 2025', 
    description: "Completed self-paced training course covering statistical analysis fundamentals using MATLAB.",
    imageUrl: '/assets/StatisticsOnramp_thumb.jpg', 
    fullUrl: '/assets/StatisticsOnramp_full.jpg' 
  },
  // 7. MathWorks: Dimensionality Reduction Techniques
  { 
    id: 7, 
    title: 'Course Completion: Dimensionality Reduction Techniques', 
    issuer: 'MathWorks | Training Services', 
    date: 'August 29, 2025', 
    description: "Completed self-paced training course on applying dimensionality reduction techniques.",
    imageUrl: '/assets/DimensionalityReduction_thumb.jpg', 
    fullUrl: '/assets/DimensionalityReduction_full.jpg' 
  },
  // 8. Debugging Competition (KSR College of Engineering)
  { 
    id: 8, 
    title: 'Debugging Competition Participation', 
    issuer: 'KSR College of Engineering (CSE)', 
    date: 'August 9th, 2025', 
    description: "Awarded certificate in recognition of active engagement in the Debugging competition.",
    imageUrl: '/assets/Debugging_thumb.jpg', 
    fullUrl: '/assets/Debugging_full.jpg' 
  },
  // 9. Large Language Model Workshop (VIT)
  { 
    id: 9, 
    title: 'Workshop on Large Language Model in Generative AI', 
    issuer: 'Vellore Institute of Technology (VIT - SCOPE)', 
    date: 'October 30th, 2025', 
    description: "Participation in a one-day workshop on LLM in Generative AI with Research and Industry Applications.",
    imageUrl: '/assets/DEVAROOPA_E_thumb.jpg', 
    fullUrl: '/assets/DEVAROOPA_E_full.jpg' 
  },
  // 10. Yukta: 2K25 Paper Presentation
  { 
    id: 10, 
    title: 'Paper Presentation Participation (YUKTA: 2K25)', 
    issuer: 'PSG Institute of Technology and Applied Research (CSE)', 
    date: 'March 15, 2025', 
    description: "Certificate of Appreciation for participation in the Paper Presentation event at Yukta: 2K25.",
    imageUrl: '/assets/Yukta_thumb.jpg', 
    fullUrl: '/assets/Yukta_full.jpg' 
  },
  // 11. UI/UX Workshop (Imagivite)
  { 
    id: 11, 
    title: 'UI/UX Workshop', 
    issuer: 'Imagivite Technology Private Limited', 
    date: 'July 20, 2025', 
    description: "Successfully completed an UI/UX workshop.",
    imageUrl: '/assets/imagitive-certificate_thumb.jpg', 
    fullUrl: '/assets/imagitive-certificate_full.jpg' 
  }
];
// --- END: FULL CERTIFICATES DATA ---

// --- Tilt Logic Component ---
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
    const y = e.clientY - rect.top;  // Y position within the element.
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 10; // Max rotation 10deg
    const rotateY = ((x - centerX) / centerX) * 10;  // Max rotation 10deg

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
      <h2 className="text-4xl font-bold text-center mb-16 text-white z-20 relative">Certifications 🎓</h2>
      
      {/* 1. INTERACTIVE 3D GATE (Initial View) */}
      {!isCertificatesVisible && (
          // Full screen overlay for the 3D scene
          <div className="fixed inset-0 z-50">
              <MoonGate onMoonClick={handleMoonClick} />
              
              {/* Overlay text for "Where is it?" */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <p className="text-6xl text-white font-extrabold" style={{ textShadow: '0 0 10px #b026ff, 0 0 5px #b026ff' }}>
                    Where is it?
                  </p>
              </div>
          </div>
      )}

      {/* 2. ORIGINAL CERTIFICATE LIST (After Moon Click) */}
      {isCertificatesVisible && (
          <div className="space-y-24">
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
                  className={`flex flex-col md:flex-row items-center gap-12 ${flexOrderClass}`}
                >
                  
                  {/* Visual Side (Tilt Card) */}
                  <div className="w-full md:w-1/2">
                    <TiltEffect 
                      className="rounded-xl overflow-hidden shadow-2xl shadow-neon-purple/20 border border-white/10 bg-black/50 group cursor-pointer"
                      onClick={() => handleImageClick(cert.fullUrl || cert.imageUrl, cert.title)}
                    >
                      <div className="relative h-64 w-full bg-gray-900 overflow-hidden">
                        <img 
                          src={cert.imageUrl} 
                          alt={cert.title}
                          className="w-full h-full object-contain transition-transform duration-500 opacity-80" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                      </div>
                      
                      {/* Certificate Number Indicator */}
                      <div className="p-4 relative">
                        <div className="absolute -top-10 right-6 w-12 h-12 bg-neon-pink rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-neon-pink/40">
                          {index + 1}
                        </div>
                      </div>
                    </TiltEffect>
                  </div>

                  {/* Content Side */}
                  <div className={`w-full md:w-1/2 space-y-4 flex flex-col ${contentClass}`}>
                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                      {cert.title}
                    </h3>
                    <p className="text-neon-pink font-medium">{cert.issuer}</p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {cert.description || "A professional certification demonstrating skill and proficiency in this area."}
                    </p>
                    <div className="pt-2">
                      <p className="text-gray-500 text-sm">Issued: **{cert.date}**</p>
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
