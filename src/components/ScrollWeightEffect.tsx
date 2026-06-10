import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollWeightEffect() {
  useEffect(() => {
    // Delay slightly to allow the DOM to fully stabilize and render high-fidelity containers
    const delayTimer = setTimeout(() => {
      const cards = document.querySelectorAll('.scroll-weight-card');
      if (cards.length === 0) return;

      const ctx = gsap.context(() => {
        cards.forEach((card) => {
          const element = card as HTMLElement;
          
          // Apply 3D perspective to parent to achieve authentic distance depth
          const parent = element.parentElement;
          if (parent) {
            gsap.set(parent, { 
              perspective: 1200,
              transformStyle: 'preserve-3d'
            });
          }

          // Force hardware acceleration and initial 3D states
          gsap.set(element, {
            transformOrigin: 'center center',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            z: -40,
            rotationX: 15,
            scale: 0.94,
            opacity: 0.15,
            y: 35
          });

          // 1. Entry ScrollTrigger: Animates card from tilted bottom entry stance to fully flat, focused state
          gsap.to(element, {
            z: 0,
            rotationX: 0,
            scale: 1,
            opacity: 1,
            y: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom-=60', // Start animation when card top creeps into bottom of screen
              end: 'top center+=140',   // Resolve fully flat as card settles into upper viewport
              scrub: 1.2,                // Smooth weighted latency to represent solid material inertia
              toggleActions: 'play none none reverse'
            }
          });

          // 2. Exit ScrollTrigger: Smoothly tilts and folds back the card as it scrolls out of the top
          gsap.to(element, {
            z: -40,
            rotationX: -15,
            scale: 0.94,
            opacity: 0.15,
            y: -35,
            ease: 'power1.in',
            scrollTrigger: {
              trigger: element,
              start: 'bottom center-=140', // Start fading/tilting as it reaches top section of view
              end: 'bottom top+=60',       // Fully minimized at the exit threshold
              scrub: 1.2,
              toggleActions: 'play none none reverse'
            }
          });
        });
      });

      return () => {
        ctx.revert();
      };
    }, 150);

    return () => clearTimeout(delayTimer);
  }, []);

  return null;
}
