import React, { useState, useRef } from 'react';
import { ImageWithFallback } from './ImageWithFallback';
import { getAssetPath } from '../utils/assetPath';
import { InquiryDialog } from './InquiryDialog';

export function Footer() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  const closeInquiry = () => {
    setIsInquiryOpen(false);
    // Restore focus to trigger when modal closes
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 50);
  };

  return (
    <footer className="bg-archive-navy text-white px-6 py-12 md:py-14 lg:py-10 border-t-8 border-logo-blue">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-10 lg:gap-8 border-b border-white/15 pb-8 lg:pb-5 mb-4 lg:mb-2">
        
        {/* Left Zone: Historical Identity & Stewardship */}
        <div className="flex flex-col w-full md:w-5/12">
          <ImageWithFallback 
            src={getAssetPath('assets/mhp2019-logo-master.svg')}
            alt="Mile High Pitch 2019"
            className="w-[200px] md:w-[240px] h-auto object-contain opacity-100 mb-5 lg:mb-3"
          />
          <div className="flex flex-col space-y-2">
            <h2 className="font-sora font-semibold text-[24px] md:text-[26px] lg:text-[28px] leading-tight text-white/95">
              Historical Event Portfolio
            </h2>
            <div className="font-inter text-[15px] md:text-[16px] text-white/50">
              Managed by{' '}
              <a 
                href="https://workfolios.github.io/lofts/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white/80 transition-colors focus:outline-none focus:ring-1 focus:ring-logo-blue rounded-sm"
              >
                Caroline Lofts
              </a>
              {' '}&{' '}
              <a 
                href="https://www.linkedin.com/in/brianjamescurr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white/80 transition-colors focus:outline-none focus:ring-1 focus:ring-logo-blue rounded-sm"
              >
                Brian Curr
              </a>
            </div>
          </div>
        </div>

        {/* Right Zone: Colophon & Navigation */}
        <div className="w-full md:w-7/12 flex flex-col md:flex-row gap-8 lg:gap-10 xl:gap-12 md:justify-end">
          <div className="flex flex-col border-l border-white/20 pl-6 space-y-3 lg:space-y-2">
            <h3 className="font-sora font-semibold text-[14px] text-white/90 tracking-widest uppercase mb-2 lg:mb-1">Event Colophon</h3>
            <p className="font-inter text-[15px] md:text-[16px] text-white/60 leading-relaxed">
              November 21, 2019<br />
              Denver, Colorado
            </p>
            <p className="font-inter text-[15px] md:text-[16px] text-white/60 leading-relaxed">
              Presented by<br />
              WorkAbility & The Bank of Denver
            </p>
          </div>
          
          <nav className="flex flex-col gap-2 lg:gap-1.5" aria-label="Footer navigation">
            <h3 className="font-sora font-semibold text-[14px] text-white/90 tracking-widest uppercase mb-2 lg:mb-1">Archive Index</h3>
            <a href="#competition" className="font-sora text-[15px] md:text-[16px] text-white/60 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-logo-blue rounded-sm w-max py-0.5">The 2019 Competition</a>
            <a href="#finalists" className="font-sora text-[15px] md:text-[16px] text-white/60 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-logo-blue rounded-sm w-max py-0.5">2019 Finalists</a>
            <a href="#behind" className="font-sora text-[15px] md:text-[16px] text-white/60 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-logo-blue rounded-sm w-max py-0.5">Behind Mile High Pitch</a>
            <a href="#judges" className="font-sora text-[15px] md:text-[16px] text-white/60 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-logo-blue rounded-sm w-max py-0.5">Judges Panel</a>
            
            <div className="mt-3 pt-3 lg:mt-2 lg:pt-2 border-t border-white/20">
              <button
                ref={triggerRef}
                onClick={() => setIsInquiryOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={isInquiryOpen}
                className="font-sora text-[15px] md:text-[16px] text-white/60 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-logo-blue rounded-sm py-0.5 inline-flex items-center text-left"
              >
                Archive inquiry <span className="ml-1.5" aria-hidden="true">→</span>
              </button>
            </div>
          </nav>
        </div>

      </div>

      <div className="max-w-7xl mx-auto flex justify-end">
        <button
          onClick={scrollToTop}
          className="group font-inter font-medium text-[14px] uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-3 focus:outline-none focus:ring-1 focus:ring-white/50 rounded-sm px-2 py-1"
          aria-label="Back to top"
        >
          Back to top
          <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>

      <InquiryDialog 
        isOpen={isInquiryOpen} 
        onClose={closeInquiry} 
      />
    </footer>
  );
}
