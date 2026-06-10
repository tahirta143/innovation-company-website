import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  activeSection: string;
}

export default function Navbar({ isDark, toggleTheme, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Technologies', href: '#technologies' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      setMobileMenuOpen(false);
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? isDark
              ? 'bg-[#000000]/80 border-b border-white/10 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
              : 'bg-white/85 border-b border-teal-500/10 backdrop-blur-md shadow-[0_4px_30px_rgba(20,184,166,0.06)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo with interactive glowing square */}
          <a
            id="navbar-logo"
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center space-x-3 group"
          >
            <div className="relative w-9 h-9 flex items-center justify-center border-2 border-teal-500 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
              {/* Spinning geometric inner square */}
              <div className="absolute w-4 h-4 bg-teal-500 rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-700 shadow-[0_0_10px_#14b8a6]" />
              <span className="absolute text-[10px] font-mono font-bold text-white z-10">T²</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-display font-bold leading-none tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                TSQUARE
              </span>
              <span className="text-[10px] font-mono text-teal-500 tracking-widest font-semibold uppercase leading-none mt-1">
                Innovations
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    id={`navitem-${link.name.toLowerCase()}`}
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative text-sm font-medium font-display tracking-wide uppercase transition-colors duration-300 ${
                      isActive
                        ? 'text-teal-500 font-semibold'
                        : isDark
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavLine"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-500"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Action Toggles & CTAs */}
            <div className="flex items-center space-x-4 border-l border-gray-500/20 pl-6">
              {/* Sun/Moon Toggle */}
              <button
                id="theme-toggler"
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-white/10 text-teal-400' : 'hover:bg-black/5 text-teal-600'
                }`}
                aria-label="Toggle theme brightness"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Header CTA Button */}
              <a
                id="navbar-cta"
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="inline-flex items-center space-x-1 px-4 py-2 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white dark:hover:text-black font-display text-xs font-semibold uppercase tracking-wider rounded-md transition-all duration-300 shadow-[0_0_12px_rgba(20,184,166,0)] hover:shadow-[0_0_12px_rgba(20,184,166,0.3)]"
              >
                <span>Call Us</span>
                <ArrowRight size={12} />
              </a>
            </div>
          </div>

          {/* Mobile Right Bar controls */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Theme Toggle */}
            <button
              id="theme-toggler-mobile"
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'text-teal-400' : 'text-teal-600'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Menu burger */}
            <button
              id="mobile-menu-burger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Slide down-overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navbar-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-20 left-0 w-full z-40 md:hidden overflow-hidden border-b ${
              isDark
                ? 'bg-[#050505]/95 border-white/10 text-white'
                : 'bg-white/95 border-teal-500/15 text-black'
            } backdrop-blur-lg shadow-xl`}
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, idx) => (
                <motion.a
                  id={`mobile-navitem-${link.name.toLowerCase()}`}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="block text-base font-display uppercase tracking-wider font-medium py-2 px-3 rounded-md hover:bg-teal-500/10 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}

              <div className="pt-4 border-t border-gray-500/10">
                <a
                  id="mobile-cta-button"
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="flex items-center justify-center space-x-2 w-full py-3 bg-teal-500 text-white dark:text-black font-display text-sm font-bold uppercase tracking-wider rounded-lg shadow-lg"
                >
                  <span>Start a Project</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
