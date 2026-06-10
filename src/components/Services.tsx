import React from 'react';
import { motion } from 'motion/react';
import { Globe, Smartphone, Paintbrush, Cloud, Layers, HeartPulse, CreditCard, Cpu, CheckCircle2, Sparkles } from 'lucide-react';
import { SERVICES } from '../data';

interface ServicesProps {
  isDark: boolean;
}

// Statically typed icon lookup matching services iconNames
const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="text-teal-400" size={24} />,
  Smartphone: <Smartphone className="text-teal-400" size={24} />,
  Paintbrush: <Paintbrush className="text-teal-400" size={24} />,
  Cloud: <Cloud className="text-teal-400" size={24} />,
  Layers: <Layers className="text-teal-400" size={24} />,
  HeartPulse: <HeartPulse className="text-teal-400" size={24} />,
  CreditCard: <CreditCard className="text-teal-400" size={24} />,
  Cpu: <Cpu className="text-teal-400" size={24} />
};

export default function Services({ isDark }: ServicesProps) {
  return (
    <section
      id="services"
      className={`relative py-28 sm:py-36 border-t ${
        isDark ? 'bg-black border-white/5 text-white' : 'bg-slate-50 border-teal-500/5 text-slate-900'
      }`}
    >
      {/* Decorative ambient subtle background sphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono uppercase tracking-widest font-semibold mb-4"
          >
            <Sparkles size={12} />
            <span>EXPERT CAPABILITIES</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-6 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Core Digital Capabilities
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={`text-base sm:text-lg font-light leading-relaxed ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            We deploy production-ready codebases, secure storage engines, and high-fidelity layouts across eight focused engineering disciplines.
          </motion.p>
        </div>

        {/* Services Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {SERVICES.map((srv, index) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: (index % 4) * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`scroll-weight-card p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative group overflow-hidden ${
                isDark
                  ? 'glass-panel-dark border-white/5 hover:border-teal-500/30'
                  : 'glass-panel-light border-teal-500/10 hover:border-teal-500/40 hover:bg-white'
              }`}
            >
              {/* Animated top-corner background glow on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Service Header Icon */}
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                {iconMap[srv.iconName] || <Globe size={24} className="text-teal-400" />}
              </div>

              {/* Service Title */}
              <h3 className={`text-lg sm:text-xl font-display font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {srv.title}
              </h3>

              {/* Service Description */}
              <p className={`text-xs font-light leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {srv.description}
              </p>

              {/* Service bullet list points */}
              <div className="space-y-2 border-t border-gray-500/10 pt-5 mt-auto">
                <span className="text-[9px] font-mono uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500 block mb-2">
                  Specialized Scope
                </span>
                {srv.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start space-x-2">
                    <CheckCircle2 size={12} className="text-teal-500 mt-0.5 shrink-0" />
                    <span className={`text-[10px] sm:text-xs font-light ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
