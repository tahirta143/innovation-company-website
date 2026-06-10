import { motion } from 'motion/react';
import { Sparkles, Cpu, Code2, Database, CloudFog } from 'lucide-react';
import { TECHNOLOGIES } from '../data';

interface TechnologiesProps {
  isDark: boolean;
}

export default function Technologies({ isDark }: TechnologiesProps) {
  // Duplicate list to achieve continuous seamless loop
  const duplicatedTechList = [...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES];

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Frontend':
        return <Code2 size={12} className="text-teal-400" />;
      case 'Database':
        return <Database size={12} className="text-pink-400" />;
      case 'Cloud':
      case 'DevOps':
        return <CloudFog size={12} className="text-sky-400" />;
      default:
        return <Cpu size={12} className="text-teal-400" />;
    }
  };

  return (
    <section
      id="technologies"
      className={`relative py-20 overflow-hidden ${
        isDark ? 'bg-black border-t border-white/5 text-white' : 'bg-slate-50 border-t border-teal-500/5 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
        <div className="text-center max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-mono uppercase tracking-widest font-semibold mb-3"
          >
            <Sparkles size={10} />
            <span>MODERN STACK</span>
          </motion.div>
          <h2 className={`text-2xl sm:text-3xl font-display font-medium tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Technologies We Master
          </h2>
          <p className={`text-xs sm:text-sm font-light mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Highly optimized, enterprise-vetted frameworks configured for sub-second load performance and solid security benchmarks.
          </p>
        </div>
      </div>

      {/* Endless horizontal loop carousel track */}
      <div className="relative w-full flex overflow-x-hidden pointer-events-auto select-none py-4 border-y border-gray-500/5">
        <div className="carousel-track flex space-x-6 items-center">
          {duplicatedTechList.map((tech, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 px-6 py-3.5 rounded-full border transition-colors shadow-sm shrink-0 ${
                isDark
                  ? 'bg-[#0a0a0a] border-white/5 hover:border-teal-500/30 text-white'
                  : 'bg-white border-teal-500/10 hover:border-teal-500/30 text-slate-900'
              }`}
            >
              {getCategoryIcon(tech.category)}
              <span className="text-xs sm:text-sm font-mono font-bold tracking-tight">
                {tech.name}
              </span>
              <span className="text-[9px] font-mono tracking-wider text-gray-400 uppercase font-semibold pl-1.5 border-l border-gray-500/10">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
