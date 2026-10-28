import React from 'react';
import { siteContent } from '../data/siteContent';
import { ImageWithFallback } from './ImageWithFallback';
import { DossierTraversal, useDossierTraversal } from './DossierTraversal';
import { SwipeRecordCarousel } from './SwipeRecordCarousel';

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

  const handleSelect = (idx: number) => setActiveIndex(idx);

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
          className="hidden xl:grid xl:grid-cols-7 gap-6 pb-8"
        >
          {behind.people.map((person, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={idx}
                ref={(el) => { rosterButtonsRef.current[idx] = el; }}
                aria-pressed={isActive}
                aria-controls="behind-dossier"
                onClick={() => handleSelect(idx)}
                className="snap-start shrink-0 w-[48vw] max-w-[210px] md:w-[32vw] md:max-w-none lg:w-auto flex flex-col text-left group focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-4 focus:ring-offset-archive-paper"
              >
                <div className={`w-full aspect-[3/4] mb-5 border-b-4 transition-all duration-300 ${isActive ? 'border-logo-blue' : 'border-transparent group-hover:border-surface-stone'}`}>
                  <ImageWithFallback 
                    src={person.image} 
                    alt={person.alt}
                    className="w-full h-full object-cover"
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
          id="behind-dossier"
          className="mt-0 pt-0 xl:mt-4 xl:pt-12 xl:border-t border-surface-stone flex flex-col"
        >
          <SwipeRecordCarousel
            records={behind.people.map((person) => person.name)}
            activeIndex={activeIndex}
            onSelect={handleSelect}
          >
          <div className="flex flex-col gap-7 md:grid md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:gap-x-9 md:gap-y-5 xl:flex xl:flex-row xl:gap-24 animate-in fade-in duration-500">
            <div className="xl:hidden w-full max-w-[240px] md:max-w-none mx-auto md:mx-0 md:row-span-2">
              <ImageWithFallback src={activePerson.image} alt={activePerson.alt} className="w-full aspect-[3/4] object-cover rounded-sm border-b-4 border-logo-blue" />
            </div>
            {/* Left: Identity/Role */}
            <div className="w-full md:col-start-2 xl:w-4/12 flex flex-col">
              <h3 
                ref={headingRef}
                tabIndex={-1}
                className="font-sora text-[32px] md:text-[40px] font-bold text-deep-ink tracking-tight mb-4 focus:outline-none"
              >
                {activePerson.name}
              </h3>
              <p className="font-inter font-semibold text-[15px] md:text-[16px] text-logo-blue uppercase tracking-wider mb-4 xl:mb-8">
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
            <div className="w-full md:col-start-2 xl:w-8/12 flex flex-col xl:border-l xl:border-surface-stone xl:pl-24">
              <div className="font-inter font-semibold text-[13px] md:text-[14px] text-text-secondary uppercase tracking-[0.1em] mb-6">
                Biography
              </div>
              <p className="font-inter text-[17px] md:text-[19px] text-text-secondary leading-[1.7] md:leading-[1.8]">
                {activePerson.bio}
              </p>
            </div>
          </div>

          </SwipeRecordCarousel>

          {/* Preserve the original desktop-only dossier traversal. */}
          <DossierTraversal
            className="hidden xl:flex"
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
