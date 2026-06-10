import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data';

interface TestimonialsProps {
  isDark: boolean;
}

export default function Testimonials({ isDark }: TestimonialsProps) {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const activeTestimonial = TESTIMONIALS[current];

  return (
    <section
      id="testimonials"
      className={`relative py-28 sm:py-36 border-t overflow-hidden ${
        isDark ? 'bg-black border-white/5 text-white' : 'bg-slate-50 border-teal-500/5 text-slate-900'
      }`}
    >
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-teal-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono uppercase tracking-widest font-semibold mb-4"
          >
            <Sparkles size={12} />
            <span>CLIENT REVIEWS</span>
          </motion.div>
          <h2 className={`text-3xl sm:text-4xl font-display font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            What Clients Say
          </h2>
          <p className={`text-xs sm:text-sm font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Read reviews from international corporate operational headers who entrusted their digital transformation blueprints onto our engineering squad.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.4 }}
              className={`p-8 sm:p-12 rounded-3xl border relative ${
                isDark ? 'glass-panel-dark' : 'glass-panel-light bg-white/80'
              }`}
            >
              {/* Quote Mark Icon */}
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-teal-500/15">
                <Quote size={80} strokeWidth={1} />
              </div>

              {/* Rating stars */}
              <div className="flex space-x-1 mb-6 text-teal-400">
                {Array.from({ length: activeTestimonial.rating }).map((_, fIdx) => (
                  <Star key={fIdx} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>

              {/* Review Content */}
              <blockquote className={`text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed mb-8 relative z-10 ${
                isDark ? 'text-gray-200' : 'text-slate-800'
              }`}>
                "{activeTestimonial.content}"
              </blockquote>

              {/* Client Information */}
              <div className="flex items-center justify-between border-t border-gray-500/10 pt-6">
                <div>
                  <cite className={`block text-base sm:text-lg font-display font-medium not-italic font-bold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {activeTestimonial.name}
                  </cite>
                  <span className="block text-xs font-mono uppercase tracking-tight text-teal-500 mt-1">
                    {activeTestimonial.role} — {activeTestimonial.company}
                  </span>
                </div>

                {/* Left/Right Buttons in-card controls */}
                <div className="flex space-x-3">
                  <button
                    id="testimonial-prev-btn"
                    onClick={handlePrev}
                    className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                      isDark
                        ? 'border-white/10 hover:border-teal-500 hover:bg-white/5 text-white'
                        : 'border-slate-300 hover:border-teal-500 hover:bg-slate-100 text-slate-900'
                    }`}
                    aria-label="Previous review"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    id="testimonial-next-btn"
                    onClick={handleNext}
                    className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                      isDark
                        ? 'border-white/10 hover:border-teal-500 hover:bg-white/5 text-white'
                        : 'border-slate-300 hover:border-teal-500 hover:bg-slate-100 text-slate-900'
                    }`}
                    aria-label="Next review"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bullet Indicators (Dot indicators) */}
          <div className="flex justify-center space-x-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                id={`testimonial-bullet-${idx}`}
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  current === idx ? 'w-6 bg-teal-500' : 'w-2 bg-teal-500/25'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
