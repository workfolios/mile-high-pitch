import React from 'react';
import { siteContent } from '../data/siteContent';
import { ImageWithFallback } from './ImageWithFallback';
import { DossierTraversal, useDossierTraversal } from './DossierTraversal';

export function BehindMileHighPitch() {
  const { behind } = siteContent;
  const {
    activeIndex,
    setActiveIndex,
    dossierRef,
    headingRef,
    scrollContainerRef,
    rosterButtonsRef,
    handleTraverse,
  } = useDossierTraversal({
    totalRecords: behind.people.length,
    scrollBreakpoint: 1024,
  });

  const handleSelect = (idx: number, e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveIndex(idx);
    
    const container = scrollContainerRef.current;
    const button = e.currentTarget;
    
    if (container && window.innerWidth < 1024) {
      const scrollLeft = button.offsetLeft - (container.clientWidth / 2) + (button.clientWidth / 2);
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      container.scrollTo({
        left: scrollLeft,
        behavior: prefersReduced ? 'auto' : 'smooth'
      });
    }
  };

  const activePerson = behind.people[activeIndex];

  return (
    <section id="behind" className="bg-archive-paper py-20 lg:py-24 scroll-mt-20 overflow-hidden">
      <div className="w-full max-w-[1792px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
        
        <div className="flex flex-col mb-8 lg:mb-10 max-w-3xl">
          <h2 className="font-sora text-[40px] md:text-[52px] font-bold text-deep-ink leading-tight mb-6">
            Behind Mile High Pitch
          </h2>
          <p className="font-inter text-[16px] md:text-[18px] text-text-secondary leading-relaxed border-l-2 border-logo-blue pl-5 py-1">
            Event roles shown reflect each contributor's role in Mile High Pitch 2019.
          </p>
        </div>
        
        {/* Credits Board */}
        <div 
          ref={scrollContainerRef}
          className="flex lg:grid lg:grid-cols-4 xl:grid-cols-7 gap-4 md:gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-8 -mx-6 px-6 md:-mx-12 md:px-12 lg:mx-0 lg:px-0"
        >
          {behind.people.map((person, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={idx}
                ref={(el) => { rosterButtonsRef.current[idx] = el; }}
                aria-pressed={isActive}
                onClick={(e) => handleSelect(idx, e)}
                className="snap-start shrink-0 w-[55vw] md:w-[32vw] lg:w-auto flex flex-col text-left group focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-4 focus:ring-offset-archive-paper"
              >
                <div className={`w-full aspect-[3/4] mb-5 border-b-4 transition-all duration-300 ${isActive ? 'border-logo-blue' : 'border-transparent group-hover:border-surface-stone'}`}>
                  <ImageWithFallback 
                    src={person.image} 
                    alt={person.alt}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}
                  />
                </div>
                <div className="flex flex-col">
                  <span className={`font-sora text-[15px] md:text-[17px] font-bold tracking-tight mb-1 transition-colors ${isActive ? 'text-deep-ink' : 'text-text-secondary group-hover:text-deep-ink'}`}>
                    {person.name}
                  </span>
                  <span className="font-inter text-[11px] md:text-[12px] font-semibold uppercase tracking-wider text-text-secondary/70">
                    {person.role}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Profile Dossier */}
        <div 
          ref={dossierRef}
          className="mt-2 lg:mt-4 pt-10 lg:pt-12 border-t border-surface-stone flex flex-col"
        >
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24 animate-in fade-in duration-500">
            {/* Left: Identity/Role */}
            <div className="w-full lg:w-4/12 flex flex-col">
              <h3 
                ref={headingRef}
                tabIndex={-1}
                className="font-sora text-[32px] md:text-[40px] font-bold text-deep-ink tracking-tight mb-4 focus:outline-none"
              >
                {activePerson.name}
              </h3>
              <p className="font-inter font-semibold text-[15px] md:text-[16px] text-logo-blue uppercase tracking-wider mb-8">
                {activePerson.role}
              </p>
              
              <a 
                href={activePerson.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View LinkedIn Profile for ${activePerson.name}`}
                className="group inline-flex items-center font-sora font-semibold text-[16px] text-deep-ink hover:text-logo-blue transition-colors focus:outline-none focus:ring-2 focus:ring-accent-blue w-max rounded-sm"
              >
                <span aria-hidden="true">View LinkedIn Profile</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            
            {/* Right: Bio */}
            <div className="w-full lg:w-8/12 flex flex-col lg:border-l lg:border-surface-stone lg:pl-16 xl:pl-24">
              <div className="font-inter font-semibold text-[13px] md:text-[14px] text-text-secondary uppercase tracking-[0.1em] mb-6">
                Biography
              </div>
              <p className="font-inter text-[17px] md:text-[19px] text-text-secondary leading-[1.7] md:leading-[1.8]">
                {activePerson.bio}
              </p>
            </div>
          </div>

          {/* Restrained Local Traversal */}
          <DossierTraversal
            recordType="contributor"
            prevRecordName={activeIndex > 0 ? behind.people[activeIndex - 1].name : null}
            nextRecordName={activeIndex < behind.people.length - 1 ? behind.people[activeIndex + 1].name : null}
            onPrevious={() => handleTraverse('prev')}
            onNext={() => handleTraverse('next')}
          />
        </div>
      </div>
    </section>
  );
}
