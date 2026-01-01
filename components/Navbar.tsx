import React, { useState } from 'react';
import { 
    Home, 
    User, 
    Award, 
    Code, 
    Cpu, 
    Mail, 
    Menu, 
    X 
} from 'lucide-react';
import { SectionType } from '../types'; 

interface NavbarProps {
    activeSection: SectionType;
    setActiveSection: (section: SectionType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
    // Mobile menu state
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    // Navigation Items Config with Lucide Icons
    const navItems = [
        { id: SectionType.HOME, label: 'Home', icon: Home, hash: '#home' },
        { id: SectionType.ABOUT, label: 'About', icon: User, hash: '#about' },
        { id: SectionType.CERTIFICATE, label: 'Certificates', icon: Award, hash: '#certificates' },
        { id: SectionType.PROJECT, label: 'Projects', icon: Code, hash: '#projects' },
        { id: SectionType.SKILLS, label: 'Skills', icon: Cpu, hash: '#skills' },
        { id: SectionType.CONTACT, label: 'Contact', icon: Mail, hash: '#contact' },
    ];

    return (
        <>
            {/* 1. Mobile Menu Toggle Button (Visible only on small screens) */}
            <div className="fixed top-4 left-4 z-[60] md:hidden">
                <button
                    onClick={toggleMenu}
                    className="p-3 rounded-full bg-black/80 border border-neon-purple/50 text-white shadow-[0_0_15px_rgba(176,38,255,0.4)] backdrop-blur-md transition-transform active:scale-95"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* 2. Mobile Backdrop Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden" 
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* 3. Main Navigation Dock (Desktop & Mobile Slide-out) */}
            <nav className={`
                fixed z-50 flex flex-col items-center
                /* Mobile Styles */
                top-0 left-0 h-full w-64 bg-black/90 border-r border-white/10 pt-20 transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                
                /* Desktop Styles (Override Mobile) */
                md:translate-x-0 md:w-24 md:bg-transparent md:border-none md:justify-center md:pt-0
            `}>
                
                {/* Desktop Background Panel (Glassmorphism Strip) */}
                <div className="hidden md:block absolute left-0 top-0 h-full w-full bg-black/20 backdrop-blur-md border-r border-white/5"></div>
                
                {/* Vertical Line Decoration (Desktop) */}
                <div className="hidden md:block absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-neon-purple/50 to-transparent"></div>

                {/* Nav Items Loop */}
                <div className="flex flex-col gap-8 relative z-10 w-full items-center">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.id;
                        const IconComponent = item.icon;

                        return (
                            <div
                                key={item.id}
                                className="group relative flex items-center justify-center w-full"
                                onMouseEnter={() => {
                                    setActiveSection(item.id);
                                    window.history.pushState(null, '', item.hash);
                                }}
                                onClick={() => {
                                    setActiveSection(item.id);
                                    setIsOpen(false); // Close mobile menu on click
                                }}
                            >
                                {/* Hover Hit Area */}
                                <div className="absolute inset-[-12px] cursor-pointer" />

                                {/* Icon Circle */}
                                <div
                                    className={`
                                        w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 relative
                                        ${isActive
                                            ? 'bg-neon-purple text-white shadow-[0_0_20px_rgba(176,38,255,0.6)] scale-110 rotate-3'
                                            : 'bg-white/5 text-gray-400 border border-white/10 hover:border-neon-blue hover:text-neon-blue hover:bg-white/10'
                                        }
                                    `}
                                >
                                    <IconComponent size={22} strokeWidth={isActive ? 2.5 : 2} />
                                </div>

                                {/* Label Tooltip (Desktop Hover) */}
                                <span className={`
                                    hidden md:block absolute left-20 bg-black/90 border border-neon-blue/30 text-neon-blue px-3 py-1.5 text-xs font-bold tracking-wider rounded-lg opacity-0 transition-all duration-300 pointer-events-none whitespace-nowrap
                                    ${isActive ? 'opacity-100 translate-x-2' : 'group-hover:opacity-100 group-hover:translate-x-0'}
                                `}>
                                    {item.label}
                                </span>

                                {/* Mobile Label (Inline) */}
                                <span className={`md:hidden ml-4 text-sm font-bold tracking-widest ${isActive ? 'text-neon-purple' : 'text-gray-400'}`}>
                                    {item.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
