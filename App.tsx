import React, { useState, useRef, useEffect } from 'react';
import { SectionType } from './types'; // Use your shared types file
import Background from './components/Background';
import ChatWidget from './components/ChatWidget';
import Navbar from './components/Navbar.tsx'; // Import the new component

import HomeSection from './components/sections/HomeSection';
import CertificateSection from './components/sections/CertificateSection';
import ProjectSection from './components/sections/ProjectSection';
import SkillsSection from './components/sections/SkillsSection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';

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

      {/* Navigation Component */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

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
