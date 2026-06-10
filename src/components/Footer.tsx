import React from 'react';
import { Mail, Phone, ExternalLink, ArrowUp } from 'lucide-react';

interface FooterProps {
  isDark: boolean;
}

export default function Footer({ isDark }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const footerServices = [
    { name: 'Web Applications', href: '#services' },
    { name: 'Mobile App Eng', href: '#services' },
    { name: 'HIPAA Care HIMS', href: '#services' },
    { name: 'Enterprise ERPs', href: '#services' },
    { name: 'Bespoke AI Integrations', href: '#services' }
  ];

  const footerCompany = [
    { name: 'About Team', href: '#about' },
    { name: 'Selected Case Studies', href: '#portfolio' },
    { name: 'Our Stacks', href: '#technologies' },
    { name: 'Our Process', href: '#process' },
    { name: 'Book Inquiries', href: '#contact' }
  ];

  const socialHandles = [
    { name: 'LinkedIn', href: '#' },
    { name: 'GitHub', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Dribbble', href: '#' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer
      id="main-footer"
      className={`border-t py-16 sm:py-20 relative z-15 ${
        isDark ? 'bg-black border-white/5 text-gray-400' : 'bg-slate-50 border-teal-500/5 text-gray-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Split Grid Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16 pb-12 border-b border-gray-500/10">
          
          {/* Trademark details (Col Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-8 h-8 flex items-center justify-center border-2 border-teal-500 rounded-lg">
                <div className="w-3.5 h-3.5 bg-teal-500 rounded-sm rotate-45 shadow-[0_0_8px_#14b8a6]" />
              </div>
              <div className="flex flex-col">
                <span className={`text-base font-display font-bold leading-none tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  TSQUARE
                </span>
                <span className="text-[9px] font-mono text-teal-500 tracking-widest font-semibold uppercase leading-none mt-1">
                  Innovations
                </span>
              </div>
            </div>
            
            <p className="text-xs font-light leading-relaxed max-w-sm">
              TSquare Innovations delivers world-class custom web, mobile client applications, enterprise cloud solutions, and HIPAA clinical portals to businesses worldwide.
            </p>
          </div>

          {/* Quick links Category block (Col Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className={`text-xs font-mono uppercase tracking-widest font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Key Disciplines
            </h4>
            <ul className="space-y-2.5">
              {footerServices.map((srv, idx) => (
                <li key={idx}>
                  <a
                    href={srv.href}
                    onClick={(e) => handleLinkClick(e, srv.href)}
                    className="text-xs font-light hover:text-teal-400 Transition border-b border-transparent hover:border-teal-500/20 pb-0.5"
                  >
                    {srv.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links Company block (Col Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className={`text-xs font-mono uppercase tracking-widest font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Corporate Roadmap
            </h4>
            <ul className="space-y-2.5">
              {footerCompany.map((com, idx) => (
                <li key={idx}>
                  <a
                    href={com.href}
                    onClick={(e) => handleLinkClick(e, com.href)}
                    className="text-xs font-light hover:text-teal-400 Transition border-b border-transparent hover:border-teal-500/20 pb-0.5"
                  >
                    {com.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Digital Social links (Col Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className={`text-xs font-mono uppercase tracking-widest font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              External Handles
            </h4>
            <ul className="space-y-2.5">
              {socialHandles.map((soc, idx) => (
                <li key={idx}>
                  <a
                    href={soc.href}
                    className="text-xs font-light hover:text-teal-400 inline-flex items-center space-x-1.5 transition-colors border-b border-transparent hover:border-teal-500/20 pb-0.5"
                  >
                    <span>{soc.name}</span>
                    <ExternalLink size={10} className="opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Lower row: Copyright and Back to Top Trigger */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
            © {new Date().getFullYear()} TSquare Innovations. All corporate patents, blueprints, and assets are reserved.
          </p>

          <button
            id="back-to-top-btn"
            onClick={handleScrollToTop}
            className={`px-4 py-2 border rounded-full text-xs font-mono uppercase tracking-wider flex items-center space-x-2 transition-all ${
              isDark
                ? 'border-white/10 hover:border-teal-500 text-gray-300 hover:text-white hover:bg-white/5'
                : 'border-slate-300 hover:border-teal-500 text-gray-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>Elevate Top</span>
            <ArrowUp size={12} className="text-teal-400 animate-bounce" />
          </button>
        </div>

      </div>
    </footer>
  );
}
