import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles, CheckCircle, Flame, ShieldAlert, Award } from 'lucide-react';
import { PROJECTS } from '../data';

interface PortfolioProps {
  isDark: boolean;
}

export default function Portfolio({ isDark }: PortfolioProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = PROJECTS[activeIndex];

  return (
    <section
      id="portfolio"
      className={`relative py-28 sm:py-36 border-t overflow-hidden ${
        isDark ? 'bg-black border-white/5 text-white' : 'bg-white border-teal-500/5 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono uppercase tracking-widest font-semibold mb-4"
            >
              <Sparkles size={12} />
              <span>PROVEN CLIENT REPUTATION</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Selected Case Studies
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={`text-sm sm:text-base font-light max-w-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            A curated digest of high-profile platforms we engineered to optimize productivity, throughput, and customer retention.
          </motion.p>
        </div>

        {/* Dynamic Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Navigation Tabs (Col span 5) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono tracking-widest uppercase text-teal-500 font-bold block mb-4">
              Select Case Study
            </span>
            <div className="flex flex-col space-y-3">
              {PROJECTS.map((proj, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    id={`portfolio-tab-${idx}`}
                    key={proj.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-full text-left p-5 sm:p-6 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                      isActive
                        ? isDark
                          ? 'bg-[#14b8a6]/10 border-[#14b8a6]/40 text-white'
                          : 'bg-[#14b8a6]/5 border-[#14b8a6]/40 text-slate-900 font-semibold'
                        : isDark
                        ? 'border-white/5 bg-transparent hover:bg-white/5 text-gray-401'
                        : 'border-slate-100 bg-transparent hover:bg-slate-50 text-gray-600'
                    }`}
                  >
                    {/* Glowing vertical line for active element */}
                    {isActive && (
                      <motion.div
                        layoutId="activeProjIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1.5 bg-teal-500"
                      />
                    )}

                    <span className="block text-[10px] font-mono tracking-wider text-teal-500 uppercase font-semibold mb-1">
                      {proj.category}
                    </span>
                    <span className="text-base sm:text-lg font-display font-bold flex items-center justify-between">
                      <span>{proj.title}</span>
                      <ArrowUpRight
                        size={16}
                        className={`transition-transform duration-300 ${
                          isActive ? 'translate-x-0.5 -translate-y-0.5 text-teal-400' : 'opacity-40'
                        }`}
                      />
                    </span>
                    <span className={`block text-xs mt-2 line-clamp-1 font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {proj.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Active Project Showcase Panel (Col span 7) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className={`rounded-2xl border p-6 sm:p-8 relative ${
                  isDark ? 'glass-panel-dark' : 'glass-panel-light bg-white/70'
                }`}
              >
                {/* Product Image Cover */}
                <div className="relative aspect-video rounded-xl overflow-hidden mb-6 sm:mb-8 group">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                    <span className="text-white text-xs sm:text-sm font-mono uppercase bg-teal-500/85 px-3 py-1.5 rounded-md font-bold shadow-[0_4px_15px_rgba(20,184,166,0.3)]">
                      {activeProject.stats}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeProject.tags.map((tg) => (
                    <span
                      key={tg}
                      className="text-[10px] sm:text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-400"
                    >
                      {tg}
                    </span>
                  ))}
                </div>

                {/* Challenge & Solution details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-display font-extrabold text-teal-400 flex items-center mb-2">
                      <ShieldAlert size={18} className="mr-2 text-rose-400" />
                      The Corporate Challenge
                    </h3>
                    <p className={`text-xs sm:text-sm font-light leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {activeProject.challenge}
                    </p>
                  </div>

                  <div className="border-t border-gray-500/10 pt-5">
                    <h3 className="text-lg font-display font-extrabold text-teal-400 flex items-center mb-2">
                      <Award size={18} className="mr-2 text-teal-400" />
                      Our Bespoke Solution
                    </h3>
                    <p className={`text-xs sm:text-sm font-light leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {activeProject.solution}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
