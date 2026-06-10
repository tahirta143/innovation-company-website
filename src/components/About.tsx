import { useState } from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import { TIMELINE } from '../data';

interface AboutProps {
  isDark: boolean;
}

export default function About({ isDark }: AboutProps) {
  const [selectedMile, setSelectedMile] = useState<number>(TIMELINE.length - 1);

  const stats = [
    { value: '5+', label: 'Years in Business' },
    { value: '50+', label: 'Successful Launches' },
    { value: '100%', label: 'Commitment Level' }
  ];

  return (
    <section
      id="about"
      className={`relative py-28 sm:py-36 border-t ${
        isDark ? 'bg-black border-white/5 text-white' : 'bg-white border-teal-500/5 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-500 text-xs font-mono uppercase tracking-widest font-semibold mb-4"
          >
            <Sparkles size={12} />
            <span>Cohesive Agility</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-6 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Who We Are
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`text-base sm:text-lg font-light leading-relaxed ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            TSquare Innovations is an elite team of developers, consultants, and UX specialists. We design, program, and manage bespoke web, mobile, cloud, and enterprise ERP systems.
          </motion.p>
        </div>

        {/* Master Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Mission, Vision, and Stats Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-teal-500 uppercase tracking-wider">
                Engineering Custom Superpowers
              </h3>
              <p className={`text-base font-light leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Unlike standard template-based agencies, we specialize in hard-core custom development. Whether migrating a clinical hospital system, centralizing massive supply chains, or connecting multi-tenant checkouts, we build high-availability solutions from scratch.
              </p>
            </div>

            {/* Mission & Vision Bento Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Mission Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  isDark
                    ? 'glass-panel-dark border-white/5 hover:border-teal-500/35'
                    : 'glass-panel-light border-teal-500/10 hover:border-teal-500/35'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 mb-4 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                  <Target size={20} />
                </div>
                <h4 className="text-base font-display font-bold uppercase tracking-wide mb-2 text-teal-400">
                  Our Mission
                </h4>
                <p className={`text-xs font-light leading-loose ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  To construct secure, robust, and future-proof digital tools that empower modern businesses to automate operations and scale with confidence.
                </p>
              </motion.div>

              {/* Vision Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  isDark
                    ? 'glass-panel-dark border-white/5 hover:border-teal-500/35'
                    : 'glass-panel-light border-teal-500/10 hover:border-teal-500/35'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 mb-4 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                  <Eye size={20} />
                </div>
                <h4 className="text-base font-display font-bold uppercase tracking-wide mb-2 text-teal-400">
                  Our Vision
                </h4>
                <p className={`text-xs font-light leading-loose ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  To build a top-tier digital ecosystem where complex back-end architectures combine with elegant UX designs to shape digital standards.
                </p>
              </motion.div>
            </div>

            {/* Statistics Row */}
            <div className={`grid grid-cols-3 gap-4 p-6 rounded-xl ${isDark ? 'bg-white/5' : 'bg-teal-500/5'}`}>
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <span className="block text-2xl sm:text-3xl font-mono font-bold text-teal-500">
                    {stat.value}
                  </span>
                  <span className={`text-[10px] sm:text-xs uppercase tracking-wider font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Interactive Timeline */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h3 className="text-sm font-mono font-bold text-teal-500 uppercase tracking-widest mb-6">
              TIMELINE & INNOVATION LOGS
            </h3>

            <div className="relative border-l-2 border-teal-500/20 pl-6 sm:pl-8 space-y-8 py-2">
              {TIMELINE.map((item, index) => {
                const isSelected = selectedMile === index;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    onClick={() => setSelectedMile(index)}
                    className={`relative cursor-pointer group transition-all duration-300 ${
                      isSelected ? 'scale-101' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {/* Bullet marker */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        isSelected
                          ? 'bg-teal-500 border-teal-500 scale-125 shadow-[0_0_10px_#14b8a6]'
                          : 'bg-black border-teal-500 border-teal-500/30 group-hover:border-teal-500'
                      }`}
                    />

                    {/* Timeline card */}
                    <div
                      className={`p-5 rounded-lg border transition-all duration-300 ${
                        isSelected
                          ? isDark
                            ? 'bg-teal-950/20 border-teal-500'
                            : 'bg-teal-500/5 border-teal-500'
                          : isDark
                          ? 'border-transparent hover:border-white/10'
                          : 'border-transparent hover:border-teal-500/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-base font-bold text-teal-500 tracking-wider">
                          {item.year}
                        </span>
                        {isSelected && (
                          <span className="inline-flex items-center text-[9px] font-mono text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded-full uppercase font-semibold">
                            ACTIVE STAGE
                          </span>
                        )}
                      </div>
                      <h4 className={`text-base font-display font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {item.title}
                      </h4>
                      <p className={`text-xs font-light leading-relaxed mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
