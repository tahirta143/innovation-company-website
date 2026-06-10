import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import { PROCESS_STEPS } from '../data';

interface ProcessProps {
  isDark: boolean;
}

export default function Process({ isDark }: ProcessProps) {
  return (
    <section
      id="process"
      className={`relative py-28 sm:py-36 border-t ${
        isDark ? 'bg-black border-white/5 text-white' : 'bg-white border-teal-500/5 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono uppercase tracking-widest font-semibold rounded-full mb-4"
          >
            <RefreshCw size={12} className="animate-spin" />
            <span>HOW WE DELIVER</span>
          </motion.div>
          
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Our Structured Process
          </h2>
          
          <p className={`text-base sm:text-lg font-light leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            We implement a strict, feedback-driven software development cycle that ensures transparent objectives, continuous status updates, and premium execution quality.
          </p>
        </div>

        {/* Process Steps Connection Row / Stack */}
        <div className="relative">
          {/* Horizontal timeline connector bar (desktop only) */}
          <div className="hidden lg:block absolute left-4 right-4 top-1/2 -translate-y-12 h-0.5 bg-teal-500/15 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className={`p-6 sm:p-8 rounded-2xl border relative z-10 overflow-hidden group transition-all duration-300 ${
                  isDark
                    ? 'glass-panel-dark border-white/5 hover:border-teal-500/30'
                    : 'glass-panel-light border-teal-500/10 hover:border-teal-500/30 shadow-sm'
                }`}
              >
                {/* Numeric badge watermark */}
                <div className="absolute -top-6 -right-3 text-7xl sm:text-8xl font-mono font-black text-teal-500/5 select-none pointer-events-none transition-transform duration-500 group-hover:scale-110">
                  {step.step}
                </div>

                <div className="flex items-center justify-between mb-6">
                  {/* Step ID badge */}
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-500 text-white dark:text-gray-950 font-mono text-sm font-bold shadow-[0_0_10px_#14b8a6]">
                    {step.step}
                  </span>
                  
                  {index < PROCESS_STEPS.length - 1 && (
                    <span className="text-[10px] font-mono tracking-widest text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      NEXT STEP &gt;
                    </span>
                  )}
                </div>

                <h3 className={`text-lg sm:text-xl font-display font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {step.title}
                </h3>
                
                <p className={`text-xs sm:text-sm font-light leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {step.description}
                </p>

                {/* Sub Bullet details to showcase extreme transparency */}
                <div className="space-y-2 border-t border-gray-500/10 pt-5">
                  {step.points.map((point, ptIdx) => (
                    <div key={ptIdx} className="flex items-start space-x-2">
                      <CheckCircle2 size={12} className="text-teal-500 mt-0.5 shrink-0" />
                      <span className={`text-[10.5px] font-light ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
