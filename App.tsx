import React, { useState, useRef, useEffect } from 'react';
// Assuming the SectionType enum is defined here or imported correctly
// For safety against undefined errors, I'll define a placeholder SectionType
// NOTE: You should ensure your actual `./types` file defines the full SectionType enum.
enum SectionType {
    HOME = 'HOME',
    ABOUT = 'ABOUT',
    CERTIFICATE = 'CERTIFICATE',
    PROJECT = 'PROJECT',
    SKILLS = 'SKILLS',
    CONTACT = 'CONTACT',
    // MAP = 'MAP' // Added in previous steps, ensuring consistency
}
// ---------------------------------------------------------------------

import Background from './components/Background';
import ChatWidget from './components/ChatWidget';
import HomeSection from './components/sections/HomeSection';
import CertificateSection from './components/sections/CertificateSection';
import ProjectSection from './components/sections/ProjectSection';
import SkillsSection from './components/sections/SkillsSection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
// import StatsSection from './components/sections/StatsSection'; // Removed as merged

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>(SectionType.HOME);
  const mainContentRef = useRef<HTMLElement>(null); 

  // Existing useEffect: Handles hash change (URL anchor links)
  React.useEffect(() => {
    const mapHashToSection = (hash: string) => {
      switch ((hash || '').toLowerCase()) {
        case '#contact': return SectionType.CONTACT;
        case '#projects': return SectionType.PROJECT;
        case '#skills': return SectionType.SKILLS;
        case '#certificates': case '#certificate': return SectionType.CERTIFICATE;
        case '#about': return SectionType.ABOUT;
        case '#home': return SectionType.HOME;
        default: return null;
      }
    };

    const applyHash = () => {
      const target = mapHashToSection(window.location.hash);
      if (target !== null) setActiveSection(target);
    };

    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  // Scroll Reset Fix: Resets scroll position when the active section changes
  React.useEffect(() => {
    if (mainContentRef.current) {
        mainContentRef.current.scrollTop = 0;
    }
  }, [activeSection]);


  // Icons (Solid/Filled style for clearer "Icon" look) - Simplified and restored
  const Icons = {
    Home: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" /></svg>,
    User: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" /></svg>,
    Award: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.626 2.25 2.25 0 01-1.184 1.98H6.112a2.25 2.25 0 00-2.25 2.25v2.858c-1.036.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.626h.056c.556 0 1.023-.393 1.132-.934l.652-3.26h9.63l.652 3.26c.109.54.576.934 1.132.934h.056a6.753 6.753 0 006.138-5.626.75.75 0 00-.584-.859 63.66 63.66 0 00-3.071-.543v-2.858a2.25 2.25 0 00-2.25-2.25h-.355a2.25 2.25 0 01-1.183-1.98 6.753 6.753 0 006.138-5.626.75.75 0 00-.584-.859 63.856 63.856 0 00-3.071-.543V2.62a.75.75 0 00-1.5 0v.68c-2.924.34-5.719.894-8.25 1.623V2.621a.75.75 0 00-1.5 0zM3.47 5.097a5.263 5.263 0 015.028-4.305v3.668c-1.93.36-3.708.85-5.028 1.442V5.097zm15.48 1.442V2.872a5.263 5.263 0 015.028 4.305v.805c-1.32-.592-3.098-1.082-5.028-1.442z" clipRule="evenodd" /></svg>,
    Project: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>,
    Skill: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" /></svg>,
    Mail: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" /><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" /></svg>
  };

  // Navigation Items
  const navItems = [
    { id: SectionType.HOME, label: 'Home', icon: Icons.Home, hash: '#home' },
    { id: SectionType.ABOUT, label: 'About', icon: Icons.User, hash: '#about' },
    { id: SectionType.CERTIFICATE, label: 'Certificates', icon: Icons.Award, hash: '#certificates' },
    { id: SectionType.PROJECT, label: 'Projects', icon: Icons.Project, hash: '#projects' },
    { id: SectionType.SKILLS, label: 'Skills', icon: Icons.Skill, hash: '#skills' },
    { id: SectionType.CONTACT, label: 'Contact', icon: Icons.Mail, hash: '#contact' },
  ];


  const renderSection = () => {
    switch (activeSection) {
      case SectionType.HOME: return <HomeSection />;
      case SectionType.CERTIFICATE: return <CertificateSection />;
      case SectionType.PROJECT: return <ProjectSection />;
      case SectionType.SKILLS: return <SkillsSection />;
      case SectionType.ABOUT: return <AboutSection />;
      case SectionType.CONTACT: return <ContactSection />;
      default: return <HomeSection />;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden font-sans text-white">
      {/* Background Layer */}
      <Background />

      {/* Main Content Area */}
      <main 
        ref={mainContentRef} 
        className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden pt-20 pb-20 md:pt-0 md:pb-0 md:pl-24"
      >
        {/* Animated Transition Wrapper */}
        <div key={activeSection} className="min-h-full flex items-center justify-center animate-[fadeIn_0.5s_ease-out]">
          {renderSection()}
        </div>
      </main>

      {/* Navigation Dock (Hover Triggered) */}
      <nav className="fixed bottom-0 md:bottom-auto md:left-0 md:top-0 w-full md:w-20 h-20 md:h-full z-50 bg-black/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-t md:border-t-0 md:border-r border-white/10 flex md:flex-col items-center justify-center gap-2 md:gap-8 px-4 md:px-0">
        {/* Vertical Line Decoration */}
        <div className="hidden md:block absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-neon-purple to-transparent opacity-50"></div>

        {navItems.map((item) => (
          <div
            key={item.id}
            className="group relative flex items-center justify-center"
            onMouseEnter={() => {
                setActiveSection(item.id);
                window.history.pushState(null, '', item.hash);
            }}
          >
            {/* Icon Circle */}
            <div
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 relative overflow-hidden
                  ${activeSection === item.id
                  ? 'bg-neon-purple text-white border border-neon-purple shadow-[0_0_15px_rgba(176,38,255,0.6)] scale-110'
                  : 'bg-black text-gray-500 border border-gray-700 hover:border-neon-blue hover:text-neon-blue'
                }`}
            >
              {item.icon}
            </div>

            {/* Label Tooltip (Appears on Hover) */}
            <span className={`
                  absolute md:left-16 -top-10 md:top-auto bg-black border border-neon-blue/50 text-neon-blue px-2 py-1 text-xs rounded opacity-0 transition-opacity pointer-events-none whitespace-nowrap
                  ${activeSection === item.id ? 'opacity-100 translate-x-1' : 'group-hover:opacity-100'}
               `}>
              {item.label}
            </span>
          </div>
        ))}
      </nav>

      {/* Global Elements - CHAT WIDGET CONDITIONAL RENDERING APPLIED HERE */}
      {activeSection !== SectionType.ABOUT && (
        <ChatWidget onClick={() => setActiveSection(SectionType.ABOUT)} />
      )}

      {/* Global Styles for Keyframes not in Tailwind config */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
