import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import ThreeCanvas from './ThreeCanvas';

interface HeroProps {
  isDark: boolean;
  onNavigate: (href: string) => void;
}

export default function Hero({ isDark, onNavigate }: HeroProps) {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Elegant bouncing chevron with GSAP
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        y: 12,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }

    // Split text letters reveal or line animations with GSAP
    if (headlineRef.current) {
      const text = headlineRef.current.innerText;
      const words = text.split(' ');
      headlineRef.current.innerHTML = words
        .map(
          (word) =>
            `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full origin-left transition-transform duration-500 ease-out font-display">${word}</span></span>`
        )
        .join(' ');

      const children = headlineRef.current.querySelectorAll('span > span');
      gsap.to(children, {
        translateY: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });
    }
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 sm:py-32"
    >
      {/* Three.js interactive immersive animation */}
      <ThreeCanvas isDark={isDark} />

      {/* Layer Overlay to increase readability */}
      <div
        className={`absolute inset-0 z-5 transition-opacity duration-700 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-b from-[#000000]/70 via-transparent to-[#000000]/80'
            : 'bg-gradient-to-b from-white/70 via-transparent to-white/80'
        }`}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        {/* Futuristic Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 mb-8 sm:mb-10 backdrop-blur-md"
        >
          <Sparkles size={14} className="text-teal-400 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-teal-400">
            Awwwards-Level Digital Agency
          </span>
        </motion.div>

        {/* Dynamic Main Title */}
        <h1
          ref={headlineRef}
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.1] mb-8 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Building Digital Solutions That Drive Innovation
        </h1>

        {/* Subhead with typing feel */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed mb-12 px-2 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          TSquare Innovations delivers modern web, mobile, cloud, and enterprise systems
          that transform abstract visions into scalable digital assets.
        </motion.p>

        {/* Glowing Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
        >
          {/* Primary Submit Custom Booking CTA */}
          <button
            onClick={(e) => handleCtaClick(e, '#contact')}
            className="group relative w-full sm:w-auto overflow-hidden px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white dark:text-black font-semibold font-display text-sm uppercase tracking-wider rounded-lg transition-all duration-300 hover:scale-102 hover:shadow-[0_0_25px_rgba(20,184,166,0.6)] flex items-center justify-center space-x-2"
          >
            <span>Start a Project</span>
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>

          {/* Secondary Portfolio CTA */}
          <button
            onClick={(e) => handleCtaClick(e, '#portfolio')}
            className={`w-full sm:w-auto px-8 py-4 border font-semibold font-display text-sm uppercase tracking-wider rounded-lg transition-all duration-300 ${
              isDark
                ? 'border-white/10 hover:border-teal-500 hover:bg-white/5 text-white'
                : 'border-slate-300 hover:border-teal-500 hover:bg-slate-50 text-slate-900'
            }`}
          >
            View Portfolio
          </button>
        </motion.div>
      </div>

      {/* Downward Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <span className={`text-[9px] font-mono uppercase tracking-widest font-semibold mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Scroll down
        </span>
        <div
          ref={scrollIndicatorRef}
          onClick={() => onNavigate('#about')}
          className={`cursor-pointer w-6 h-10 border-2 rounded-full flex items-start justify-center p-1 transition-colors ${
            isDark ? 'border-gray-500 hover:border-teal-500' : 'border-gray-400 hover:border-teal-500'
          }`}
        >
          <ChevronDown size={14} className="text-teal-400" />
        </div>
      </div>
    </section>
  );
}
