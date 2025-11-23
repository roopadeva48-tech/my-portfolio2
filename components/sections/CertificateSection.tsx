import React from 'react';

const certificates = [
  { id: 1, title: 'Data Science Professional', issuer: 'IBM', date: '2023', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 2, title: 'Machine Learning Specialization', issuer: 'DeepLearning.AI', date: '2024', imageUrl: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 3, title: 'Advanced SQL for Data Scientists', issuer: 'Udemy', date: '2023', imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 4, title: 'React Native Developer', issuer: 'Meta', date: '2024', imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=300&h=200' }
];

const CertificateSection: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 z-10">
      <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
        Certifications
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col sm:flex-row gap-6 hover:border-neon-purple/50 transition-all duration-300">
            {/* Left: Image Placeholder */}
            <div className="w-full sm:w-1/3 h-32 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center overflow-hidden border border-white/5">
              <img 
                src={cert.imageUrl} 
                alt="Certificate" 
                className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            
            {/* Right: Content */}
            <div className="w-full sm:w-2/3 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
              <p className="text-neon-pink font-medium">{cert.issuer}</p>
              <p className="text-gray-500 text-sm mt-1">Issued: {cert.date}</p>
              <button className="mt-4 text-xs uppercase tracking-widest text-neon-blue border border-neon-blue/30 px-4 py-2 rounded hover:bg-neon-blue/10 w-max transition-colors">
                View Credential
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificateSection;