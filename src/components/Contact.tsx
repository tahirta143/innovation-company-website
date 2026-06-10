import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ContactProps {
  isDark: boolean;
}

export default function Contact({ isDark }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    details: '',
  });

  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.details.trim()) {
      setErrorMessage('Please fill out all required fields (Name, Email, and Project Details).');
      setFormState('error');
      return;
    }

    setFormState('loading');
    setErrorMessage('');

    try {
      // Simulate real secure API post action
      await new Promise((resolve) => setTimeout(resolve, 1400));
      setFormState('success');
      setFormData({ name: '', email: '', company: '', details: '' });
    } catch (err) {
      setErrorMessage('An unexpected problem occurred. Please try again.');
      setFormState('error');
    }
  };

  const officeDetails = [
    { icon: <Mail size={16} />, label: 'Email Address', value: 'hello@tsquareinnovations.com', href: 'mailto:hello@tsquareinnovations.com' },
    { icon: <Phone size={16} />, label: 'Commercial Lines', value: '+1 (800) 555-TSQR', href: 'tel:+18005558777' },
    { icon: <MapPin size={16} />, label: 'Innovation HQ', value: '454 Tech Avenue, Floor 12, San Francisco, CA 94107', href: '#' }
  ];

  return (
    <section
      id="contact"
      className={`relative py-28 sm:py-36 border-t ${
        isDark ? 'bg-black border-white/5 text-white' : 'bg-slate-50 border-teal-500/5 text-slate-900'
      }`}
    >
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Section Head */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-xs font-mono font-bold text-teal-500 uppercase tracking-widest bg-teal-500/10 px-3 py-1.5 rounded-full border border-teal-500/15">
            GET IN TOUCH
          </span>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mt-6 mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Start Your Digital Transformation
          </h2>
          <p className={`text-base sm:text-lg font-light leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Ready to deploy high-availability POS, HIPAA-secure clinical databases, or cross-platform Flutter engines? Our solution architects respond within 12 business hours.
          </p>
        </div>

        {/* Form Split Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Direct Inquiries cards (Col span 5) */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="text-lg sm:text-xl font-display font-semibold text-teal-500 uppercase tracking-wider">
              Direct Contact & Channels
            </h3>
            
            <p className={`text-xs sm:text-sm font-light leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Speak directly to our procurement department, configure enterprise support agreements, or book certified engineering contractors.
            </p>

            <div className="space-y-4">
              {officeDetails.map((detail, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border flex items-center space-x-4 ${
                    isDark ? 'bg-white/5 border-white/5' : 'bg-white border-teal-500/10 shadow-sm'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0">
                    {detail.icon}
                  </div>
                  <div className="overflow-hidden">
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      {detail.label}
                    </span>
                    <a
                      href={detail.href}
                      className={`text-xs sm:text-sm font-light hover:text-teal-400 transition-colors block truncate ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {detail.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual SLA Badge */}
            <div className={`p-5 rounded-xl border border-teal-500/25 bg-teal-500/10 font-mono text-xs text-teal-400 leading-relaxed`}>
              ⭐ <strong className="font-bold">SLA Guarantee:</strong> Premium ticket accounts receive real-time engineer support line channels within 15 minutes response standard.
            </div>
          </div>

          {/* Right Column: Interaction Form panel (Col span 7) */}
          <div className="lg:col-span-7">
            <div
              className={`rounded-2xl border p-6 sm:p-10 relative overflow-hidden ${
                isDark ? 'glass-panel-dark' : 'glass-panel-light bg-white/80'
              }`}
            >
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  /* Success Frame */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-12 flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6 glow-teal-sm">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white dark:text-teal-400 mb-3">
                      Blueprint Proposal Initiated!
                    </h3>
                    <p className={`text-xs sm:text-sm font-light max-w-sm mx-auto leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Thank you for contacting TSquare Innovations. Your project parameters were transmitted securely. One of our Senior Architects will reach out in 12 hours.
                    </p>
                    <button
                      onClick={() => setFormState('idle')}
                      className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white dark:text-black font-semibold font-display text-xs uppercase tracking-wider rounded-lg transition-transform"
                    >
                      Transmit Another Entry
                    </button>
                  </motion.div>
                ) : (
                  /* Interactive Form Form */
                  <motion.form
                    key="form"
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                  >
                    <h3 className={`text-lg sm:text-xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Project Intake Form
                    </h3>

                    {/* Error Box */}
                    {formState === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center space-x-3"
                      >
                        <AlertTriangle size={16} className="shrink-0" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name Item */}
                      <div className="space-y-2">
                        <label className={`text-[10px] font-mono uppercase tracking-widest font-semibold block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="contact-name-input"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border font-light text-sm outline-none transition-all ${
                            isDark
                              ? 'bg-black border-white/10 hover:border-teal-500/30 focus:border-teal-500 text-white'
                              : 'bg-white border-slate-200 hover:border-teal-500/30 focus:border-teal-500 text-slate-900'
                          }`}
                          placeholder="Sarah Jenkins"
                        />
                      </div>

                      {/* Email Item */}
                      <div className="space-y-2">
                        <label className={`text-[10px] font-mono uppercase tracking-widest font-semibold block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Work Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="contact-email-input"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border font-light text-sm outline-none transition-all ${
                            isDark
                              ? 'bg-black border-white/10 hover:border-teal-500/30 focus:border-teal-500 text-white'
                              : 'bg-white border-slate-200 hover:border-teal-500/30 focus:border-teal-500 text-slate-900'
                          }`}
                          placeholder="sarah@apexclinicals.com"
                        />
                      </div>
                    </div>

                    {/* Company Item */}
                    <div className="space-y-2">
                      <label className={`text-[10px] font-mono uppercase tracking-widest font-semibold block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Company / Corporation
                      </label>
                      <input
                        id="contact-company-input"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border font-light text-sm outline-none transition-all ${
                          isDark
                            ? 'bg-black border-white/10 hover:border-teal-500/30 focus:border-teal-500 text-white'
                            : 'bg-white border-slate-200 hover:border-teal-500/30 focus:border-teal-500 text-slate-900'
                        }`}
                        placeholder="Apex Clinicals Inc."
                      />
                    </div>

                    {/* Project Details */}
                    <div className="space-y-2">
                      <label className={`text-[10px] font-mono uppercase tracking-widest font-semibold block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Project Details <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="contact-details-input"
                        name="details"
                        rows={5}
                        value={formData.details}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border font-light text-sm outline-none resize-none transition-all ${
                          isDark
                            ? 'bg-black border-white/10 hover:border-teal-500/30 focus:border-teal-500 text-white'
                            : 'bg-white border-slate-200 hover:border-teal-500/30 focus:border-teal-500 text-slate-900'
                        }`}
                        placeholder="We are looking to develop a custom HIPAA-compliant dashboard to replace..."
                      />
                    </div>

                    {/* Submission button */}
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={formState === 'loading'}
                      className="group w-full py-4 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-500/50 text-white dark:text-black font-semibold font-display text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
                    >
                      {formState === 'loading' ? (
                        <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Transmit Request</span>
                          <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
