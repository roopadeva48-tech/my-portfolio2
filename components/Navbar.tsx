import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  // isOpen controls the visibility of the full sidebar on mobile (sm and below)
  // On md and up, the sidebar is always visible by CSS (md:translate-x-0)
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/', icon: 'Home' },
    { name: 'Certificates', path: '/certificates', icon: 'Award' },
    { name: 'Projects', path: '/projects', icon: 'Code' },
    { name: 'Skills', path: '/skills', icon: 'Map' }, // CHANGED: Renamed from Roadmap to Skills
    { name: 'About', path: '/about', icon: 'User' },
    { name: 'Contact', path: '/contact', icon: 'Mail' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  // Helper component to render Lucide icons dynamically
  const Icon = ({ name, size = 20, className = '' }: { name: string, size?: number, className?: string }) => {
    switch (name) {
      case 'Home': return <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
      case 'Award': return <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15 14v10l-3-3-3 3V14"/></svg>;
      case 'Code': return <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
      case 'Map': return <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>;
      case 'User': return <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
      case 'Mail': return <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
      default: return null;
    }
  };

  return (
    <>
      {/* 1. Hamburger Toggle Button (Always visible on mobile/fixed on desktop) */}
      {/* This button is fixed to the top left and toggles the mobile sidebar */}
      <div className="fixed top-4 left-4 z-[100] md:hidden">
        <button
          onClick={toggleMenu}
          className="inline-flex items-center justify-center p-2 rounded-full text-white bg-deep-rose hover:bg-bright-orchid focus:outline-none focus:ring-4 focus:ring-deep-rose/50 transition-colors shadow-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 2. Mobile Backdrop (Only for sm screens when menu is open) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={toggleMenu}
        />
      )}
      
      {/* 3. The Sidebar Menu */}
      <motion.nav
        initial={false}
        animate={isOpen ? { x: 0 } : { x: '-100%' }} // Animation for mobile slide-in/out
        transition={{ duration: 0.3 }}
        // Base classes for the sidebar
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 p-6 
          bg-gray-900/95 backdrop-blur-sm 
          shadow-2xl border-r-2 border-deep-rose/30
          flex flex-col space-y-8
          transform md:translate-x-0 transition-transform duration-300`} // Always show on md+
      >
        
        {/* Sidebar Header/Logo */}
        <div className="flex items-center gap-2 pb-4 border-b border-deep-rose/20 mt-8 md:mt-0">
          <Heart className="fill-deep-rose text-deep-rose animate-pulse" size={32} />
          <span className="text-2xl font-extrabold text-white">Portfolio</span>
          {/* Close button for mobile sidebar (hidden on md+) */}
          <button 
            className="absolute top-2 right-2 text-white md:hidden" 
            onClick={toggleMenu}
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Navigation Links */}
        <div className="flex flex-col space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              // Close menu on link click only if it was open (i.e., on mobile)
              onClick={() => setIsOpen(false)} 
              className={`flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300 ${
                location.pathname === link.path
                  ? 'bg-deep-rose text-white shadow-lg shadow-deep-rose/50 transform translate-x-1'
                  : 'text-gray-300 hover:bg-deep-rose/20 hover:text-white'
              }`}
            >
              <Icon name={link.icon as string} size={20} className="text-current" />
              {link.name}
            </Link>
          ))}
        </div>
        
        {/* Optional: Footer or Status area */}
        <div className="mt-auto text-sm text-gray-500 border-t border-deep-rose/20 pt-4">
            <p>Made with 💜 and React</p>
        </div>
      </motion.nav>
      {/* 4. Content Offset Class */}
      {/* You should apply a matching left margin to your main content container 
          to prevent it from being hidden behind the sidebar on md+ screens. */}
      {/* Example: <main className="md:ml-64 p-4"> ... </main> */}
    </>
  );
};

// Renamed the default export to Sidebar for clarity
export default Sidebar;
