import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // High-performance motion values for target coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring configuration to create organic trail latency
  const springConfigTrail = { damping: 30, stiffness: 220, mass: 0.6 };
  const springConfigDot = { damping: 15, stiffness: 450, mass: 0.1 };

  const trailX = useSpring(mouseX, springConfigTrail);
  const trailY = useSpring(mouseY, springConfigTrail);

  const dotX = useSpring(mouseX, springConfigDot);
  const dotY = useSpring(mouseY, springConfigDot);

  useEffect(() => {
    // Detect mobile or touch capability to gracefully disable custom cursor
    const checkDevice = () => {
      const hasTouch = window.matchMedia('(max-width: 768px)').matches || 
                       ('ontouchstart' in window) || 
                       (navigator.maxTouchPoints > 0);
      setIsMobile(hasTouch);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Listen globally for cursor entering clickable/interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = target.closest('a') || 
                            target.closest('button') || 
                            target.closest('input') || 
                            target.closest('textarea') || 
                            target.closest('[role="button"]') ||
                            target.closest('.cursor-pointer') ||
                            target.closest('[id*="tab"]') ||
                            target.closest('[id*="btn"]') ||
                            target.closest('[id*="bullet"]');

      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    // Inject styles globally to hide default pointer on desktops
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @media (min-width: 769px) {
        a, button, [role="button"], input, textarea, select, .cursor-pointer {
          cursor: none !important;
        }
        html, body {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      styleEl.remove();
    };
  }, [mouseX, mouseY, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* 1. Fast main pointer dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-teal-500 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      />

      {/* 2. Loose, glowing teal lag trail */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 border border-teal-500/40"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          backgroundColor: isHovered ? 'rgba(20, 184, 166, 0.12)' : 'rgba(20, 184, 166, 0.02)',
          boxShadow: isHovered 
            ? '0 0 20px rgba(20, 184, 166, 0.6), inset 0 0 10px rgba(20, 184, 166, 0.3)' 
            : '0 0 10px rgba(20, 184, 166, 0.15)',
          borderColor: isHovered ? 'rgba(20, 184, 166, 0.8)' : 'rgba(20, 184, 166, 0.4)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      />
    </>
  );
}
