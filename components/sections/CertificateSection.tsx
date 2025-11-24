import React, { useState } from 'react';

// NOTE: I added titles to the missing certificate to make the display more complete.
const certificates = [
  { id: 1, title: 'Data Science Foundations', issuer: 'IBM', date: '2023', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300&h=200', fullUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200' },
  { id: 2, title: 'Machine Learning Specialization', issuer: 'DeepLearning.AI', date: '2024', imageUrl: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=300&h=200', fullUrl: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=1200' },
  { id: 3, title: 'Advanced SQL for Data Scientists', issuer: 'Udemy', date: '2023', imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=300&h=200', fullUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=1200' },
  { id: 4, title: 'React Native Developer', issuer: 'Meta', date: '2024', imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=300&h=200', fullUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200' }
];

// Helper component for the Modal
const ImageModal: React.FC<{ imageUrl: string; title: string; onClose: () => void }> = ({ imageUrl, title, onClose }) => {
  return (
    // Backdrop
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex justify-center items-center p-4 cursor-pointer"
      onClick={onClose} // Close when clicking the backdrop
    >
      {/* Modal Content - Stop propagation prevents the image click from closing the modal */}
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


const CertificateSection: React.FC = () => {
  // State to hold the URL of the certificate image to be displayed widely
  const [selectedImage, setSelectedImage] = useState<{ url: string, title: string } | null>(null);

  const handleImageClick = (fullUrl: string, title: string) => {
    setSelectedImage({ url: fullUrl, title: title });
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 z-10">
      <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
        Certifications 🎓
      </h2>

      <div className="flex flex-col space-y-8">
        {certificates.map((cert, index) => (
          <React.Fragment key={cert.id}>
            <div className="flex flex-col sm:flex-row gap-6 pb-6 items-center">
              
              {/* Left: Image (Now Clickable) */}
              <div 
                className="w-24 h-24 sm:w-20 sm:h-20 flex-shrink-0 rounded-full overflow-hidden border border-white/10 cursor-pointer transition-transform duration-300 hover:scale-[1.05]"
                // Use the 'fullUrl' if available, otherwise use the regular 'imageUrl'
                onClick={() => handleImageClick(cert.fullUrl || cert.imageUrl, cert.title)}
              >
                <img 
                  src={cert.imageUrl} 
                  alt={`${cert.title} Certificate`} 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              
              {/* Right: Content */}
              <div className="flex flex-col justify-center flex-grow">
                <h3 className="text-2xl font-semibold text-white mb-1">{cert.title}</h3>
                <p className="text-neon-pink font-medium">{cert.issuer}</p>
                <p className="text-gray-500 text-sm mt-1">Issued: **{cert.date}**</p>
                
                <button className="mt-4 text-xs uppercase tracking-widest text-neon-blue border border-neon-blue/30 px-4 py-2 rounded hover:bg-neon-blue/10 w-max transition-colors">
                  View Credential
                </button>
              </div>
            </div>
            
            {/* Separator */}
            {index < certificates.length - 1 && (
              <hr className="border-t border-gray-700/50" />
            )}
          </React.Fragment>
        ))}
      </div>

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