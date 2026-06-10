import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles, CheckCircle2, Flame, ShieldAlert, Award, X, Sliders, Cpu, Activity, Lightbulb } from 'lucide-react';
import { PROJECTS } from '../data';

interface PortfolioProps {
  isDark: boolean;
}

export default function Portfolio({ isDark }: PortfolioProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  
  const activeProject = PROJECTS[activeIndex];
  const comparisonContainerRef = useRef<HTMLDivElement>(null);

  // Before/After Drag Handlers
  const handleComparisonMove = (clientX: number) => {
    if (!comparisonContainerRef.current) return;
    const rect = comparisonContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && e.buttons !== 1) return;
    handleComparisonMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleComparisonMove(e.touches[0].clientX);
  };

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
          <div className="lg:col-span-12 xl:col-span-5 space-y-4">
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
                    onClick={() => {
                      setActiveIndex(idx);
                      setSliderPos(50); // reset slider
                    }}
                    className={`w-full text-left p-5 sm:p-6 rounded-xl border transition-all duration-300 relative overflow-hidden select-none cursor-none ${
                      isActive
                        ? isDark
                          ? 'bg-[#14b8a6]/10 border-[#14b8a6]/40 text-white'
                          : 'bg-[#14b8a6]/5 border-[#14b8a6]/40 text-slate-900 font-semibold'
                        : isDark
                        ? 'border-white/5 bg-transparent hover:bg-white/5 text-gray-400'
                        : 'border-slate-100 bg-transparent hover:bg-slate-50 text-gray-650'
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
          <div className="lg:col-span-12 xl:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className={`scroll-weight-card rounded-2xl border p-6 sm:p-8 relative ${
                  isDark ? 'bg-zinc-950/40 border-white/5' : 'bg-slate-50 border-teal-500/10'
                }`}
              >
                {/* Product Image Cover */}
                <div className="relative aspect-video rounded-xl overflow-hidden mb-6 sm:mb-8 group">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
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
                      <ShieldAlert size={18} className="mr-2 text-rose-450" />
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

                {/* Deep-dive storytelling triggers */}
                <div className="pt-6 border-t border-gray-500/10 flex justify-end">
                  <button
                    onClick={() => {
                      setIsDetailOpen(true);
                      setSliderPos(50);
                    }}
                    className="cursor-none inline-flex items-center space-x-2 px-5 py-2.5 bg-teal-500 text-white dark:text-black font-semibold uppercase font-display text-xs tracking-wider rounded-lg hover:bg-teal-400 hover:shadow-[0_0_20px_rgba(20,184,166,0.5)] transition-all duration-300"
                  >
                    <span>Inspect Deep-Dive Story</span>
                    <Sparkles size={12} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* 4. Full-Screen Interactive Detail Case Study Modal */}
      <AnimatePresence>
        {isDetailOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className={`relative w-full max-w-5xl rounded-2xl border overflow-hidden flex flex-col md:grid md:grid-cols-12 gap-0 ${
                isDark ? 'bg-zinc-950 border-white/10 text-white' : 'bg-white border-teal-500/20 text-slate-900'
              } shadow-[0_20px_50px_rgba(0,0,0,0.8)]`}
            >
              {/* Close Button top right */}
              <button
                onClick={() => setIsDetailOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 rounded-lg bg-black/40 hover:bg-black/70 border border-white/10 text-white transition-all cursor-none"
              >
                <X size={18} />
              </button>

              {/* LEFT COLUMN: Before / After Comparison Slider Container (Col span 7) */}
              <div className="md:col-span-7 p-6 border-b md:border-b-0 md:border-r border-gray-550/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-teal-400 font-mono text-xs mb-2">
                    <Sliders size={14} />
                    <span>INTERACTIVE SYSTEMS COMPARATIVE</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight mb-4">
                    Comparison: {activeProject.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                    Slide back and forth to inspect the transformation from legacy corporate grid systems to the automated, responsive TSquare digital workspace.
                  </p>
                </div>

                {/* Slider Interface Box */}
                <div 
                  ref={comparisonContainerRef}
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleTouchMove}
                  onMouseDown={() => {
                    setIsDragging(true);
                  }}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={() => setIsDragging(false)}
                  className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/5 select-none touch-none bg-zinc-900 cursor-none"
                >
                  {/* BEFORE: Legacy visual (e.g., sheets & grids) */}
                  <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center text-center p-4">
                    <div className="absolute top-3 left-3 bg-rose-500/80 text-white font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                      Legacy Complex Sheets
                    </div>
                    {/* Mock Excel legacy mesh */}
                    <div className="opacity-20 flex flex-col space-y-2 w-full max-w-sm">
                      <div className="h-6 bg-zinc-700/80 rounded w-full"></div>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="h-5 bg-zinc-700/80 rounded"></div>
                        <div className="h-5 bg-zinc-700/80 rounded"></div>
                        <div className="h-5 bg-zinc-700/85 rounded"></div>
                        <div className="h-5 bg-zinc-700/80 rounded"></div>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="h-5 bg-zinc-700/80 rounded"></div>
                        <div className="h-5 bg-zinc-700/80 rounded"></div>
                        <div className="h-5 bg-zinc-700/85 rounded"></div>
                        <div className="h-5 bg-zinc-700/80 rounded"></div>
                      </div>
                      <div className="h-5 bg-zinc-700/40 rounded w-2/3"></div>
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-rose-500/70 font-semibold mt-6">
                      ⚠️ Highly manual, redundant data & 4.2s paint lags
                    </span>
                  </div>

                  {/* AFTER: Modern UI Image (Project Cover) cropped using position state */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
                  >
                    <img 
                      src={activeProject.image} 
                      alt="Modern TSquare Solution" 
                      className="w-full h-full object-cover select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-teal-500 text-white font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-lg">
                      TSquare Integrated UI
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/70 text-teal-400 font-mono text-[10px] uppercase px-3 py-1 rounded border border-teal-500/30">
                      Real-time analytics & under 200ms API paint
                    </div>
                  </div>

                  {/* Slider Control Handler Bar */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-teal-400 cursor-col-resize flex items-center justify-center"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-2xl border border-white/20 text-xs font-bold leading-none select-none pointer-events-none active:scale-110 transition-transform">
                      ⇄
                    </div>
                  </div>
                </div>

                <div className="text-center font-mono text-[9px] text-gray-500 mt-3 uppercase tracking-wider">
                  ← Drag the circular handler to toggle between setups →
                </div>
              </div>

              {/* RIGHT COLUMN: Details / Statistics / Tech Stack (Col span 5) */}
              <div className="md:col-span-12 lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono text-teal-500 font-bold block mb-1">
                      CASE OUTLINE
                    </span>
                    <h4 className="text-lg font-bold font-display">
                      Technical Impact Story
                    </h4>
                  </div>

                  {/* Stats Block */}
                  <div className="bg-teal-500/5 border border-teal-500/10 rounded-xl p-4 flex items-center space-x-4">
                    <div className="p-3 bg-teal-500/10 rounded-lg text-teal-400">
                      <Activity size={20} className="animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase opacity-50 block leading-none mb-1">
                        OUTCOME DELIVERABLE
                      </span>
                      <span className="text-base sm:text-lg font-display font-black text-teal-400 leading-none block">
                        {activeProject.stats}
                      </span>
                    </div>
                  </div>

                  {/* Tech Stack list */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-teal-500 font-bold block">
                      CORE SYSTEMS INTEGRATION
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.tags.map((tg, idx) => (
                        <div 
                          key={tg}
                          className="px-2.5 py-1 text-xs font-mono font-medium rounded bg-white/5 border border-white/10 text-gray-300 flex items-center space-x-1"
                        >
                          <Cpu size={10} className="text-teal-400" />
                          <span>{tg}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Narrative details */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Lightbulb size={16} className="text-teal-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">
                          Innovations Philosophy
                        </span>
                        <p className="text-xs text-gray-450 leading-relaxed font-light mt-1">
                          Our blueprint is based on serverless scale-to-zero GCP and AWS container pipelines, combined with custom real-time event brokers. By caching telemetry variables at client nodes, we fully eliminated high-latency API request bottlenecks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex justify-end">
                  <button
                    onClick={() => setIsDetailOpen(false)}
                    className="cursor-none inline-flex items-center space-x-1.5 px-4 py-2 text-xs uppercase font-mono tracking-wider font-semibold border border-teal-500/30 hover:border-teal-500 text-teal-400 transition-all rounded"
                  >
                    <span>Minimize Analysis</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
