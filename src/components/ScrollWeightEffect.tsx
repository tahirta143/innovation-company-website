import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollWeightEffect() {
  useEffect(() => {
    // Highly responsive offset delay to let React fully paint the layout of the cards
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
              perspective: 1250,
              transformStyle: 'preserve-3d'
            });
          }

          // Force hardware acceleration and initial 3D states
          gsap.set(element, {
            transformOrigin: 'center center',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          });

          // Consolidate both Entry and Exit stages into a SINGLE GSAP Timeline.
          // This eliminates tween property conflicts and ensures high-performance calculation.
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top bottom', // Begins when the top of card reaches the bottom of viewport
              end: 'bottom top',   // Ends when the bottom of card exits the top of viewport
              scrub: 0.3,          // Ultra-responsive scrub for immediate, elegant feedback
            }
          });

          tl.fromTo(element,
            {
              z: -35,
              rotationX: 12,
              scale: 0.95,
              opacity: 0,
              y: 40
            },
            {
              z: 0,
              rotationX: 0,
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 1, // Represents 1 part of the timeline
              ease: 'power2.out'
            }
          )
          .to(element, {
            // Plateau: remain perfectly flat and interactive in the active view
            duration: 1.5,
          })
          .to(element, {
            z: -35,
            rotationX: -12,
            scale: 0.95,
            opacity: 0,
            y: -40,
            duration: 1,
            ease: 'power2.in'
          });
        });
      });

      // Refresh measurements once to align coordinates perfectly
      ScrollTrigger.refresh();

      return () => {
        ctx.revert();
      };
    }, 50);

    return () => clearTimeout(delayTimer);
  }, []);

  return null;
}
