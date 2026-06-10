import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Award, Heart, Shield, Headphones } from 'lucide-react';

interface StatsProps {
  isDark: boolean;
}

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  isDark: boolean;
}

function StatCounter({ target, suffix, label, icon, isDark }: StatItemProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let current = 0;
          const duration = 1200; // ms
          const stepTime = Math.max(Math.floor(duration / target), 15);
          const increment = Math.ceil(target / (duration / stepTime));

          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(current);
            }
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden text-center flex flex-col items-center ${
        isDark
          ? 'glass-panel-dark border-white/5 hover:border-teal-500/35'
          : 'glass-panel-light border-teal-500/10 hover:border-teal-500/35'
      }`}
    >
      {/* Decorative colored glow backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-teal-500/5 rounded-full blur-xl pointer-events-none" />

      {/* Numerical Counter */}
      <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-5 text-teal-400">
        {icon}
      </div>

      <span className="block text-4xl sm:text-5xl font-mono font-bold text-teal-500 tracking-tight mb-2">
        {count}
        {suffix}
      </span>

      <span className={`text-xs sm:text-sm uppercase tracking-wider font-semibold font-display ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
        {label}
      </span>
    </motion.div>
  );
}

export default function Stats({ isDark }: StatsProps) {
  return (
    <section
      id="why-choose-us"
      className={`relative py-28 sm:py-36 border-t ${
        isDark ? 'bg-black border-white/5 text-white' : 'bg-white border-teal-500/5 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Why choose us head */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono font-bold text-teal-500 uppercase tracking-widest bg-teal-500/10 px-3 py-1.5 rounded-full border border-teal-500/15">
            WHY TSQUARE INNOVATIONS
          </span>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mt-6 mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Metrics Of Client Success
          </h2>
          <p className={`text-base sm:text-lg font-light leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Every project we deploy undergoes rigorous latency tuning, automated security auditing, and persistent performance tests. Our stats reflect our craftsmanship.
          </p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <StatCounter
            target={50}
            suffix="+"
            label="Delivered Projects"
            icon={<Award size={24} />}
            isDark={isDark}
          />
          <StatCounter
            target={20}
            suffix="+"
            label="Enterprise Clients"
            icon={<Shield size={24} />}
            isDark={isDark}
          />
          <StatCounter
            target={99}
            suffix="%"
            label="Client Satisfaction"
            icon={<Heart size={24} />}
            isDark={isDark}
          />
          <StatCounter
            target={24}
            suffix="/7"
            label="Continuous Support"
            icon={<Headphones size={24} />}
            isDark={isDark}
          />
        </div>

      </div>
    </section>
  );
}
