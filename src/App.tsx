import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Technologies from './components/Technologies';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import AIAssistant from './components/AIAssistant';
import ScrollWeightEffect from './components/ScrollWeightEffect';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Sync isDark with document element for consistent high-performance theme utility mappings
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.style.backgroundColor = '#000000';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#ffffff';
    }
  }, [isDark]);

  // Robust intersection observer to track active section highlights on navigation links
  useEffect(() => {
    const sections = ['hero', 'about', 'services', 'portfolio', 'technologies', 'process', 'contact'];
    const observers = sections.map((secId) => {
      const el = document.getElementById(secId);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setActiveSection(secId);
          }
        },
        {
          // Trigger highlights slightly before midway point intersection
          rootMargin: '-30% 0px -40% 0px',
          threshold: 0
        }
      );

      observer.observe(el);
      return { el, observer };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
          obs.observer.disconnect();
        }
      });
    };
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleScrollToSection = (href: string) => {
    const decodedId = href.startsWith('#') ? href.slice(1) : href;
    const element = document.getElementById(decodedId);
    if (element) {
      const offset = 80; // sticky navbar offset
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
    <div
      id="root-container"
      className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${
        isDark ? 'bg-black text-white' : 'bg-white text-slate-900'
      }`}
    >
      {/* Animated Custom Cursor Effect */}
      <CustomCursor />

      {/* Scroll weight physics tilt & scale effect */}
      <ScrollWeightEffect />

      {/* Concierge AI Assistant */}
      <AIAssistant isDark={isDark} />

      {/* Sticky top navigation rail */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
      />

      {/* Main landing sections stack */}
      <main id="main-content-flow" className="relative">
        <Hero
          isDark={isDark}
          onNavigate={handleScrollToSection}
        />
        <About isDark={isDark} />
        <Services isDark={isDark} />
        <Portfolio isDark={isDark} />
        <Technologies isDark={isDark} />
        <Stats isDark={isDark} />
        <Testimonials isDark={isDark} />
        <Process isDark={isDark} />
        <Contact isDark={isDark} />
      </main>

      {/* Footer copyright and resources section */}
      <Footer isDark={isDark} />
    </div>
  );
}
