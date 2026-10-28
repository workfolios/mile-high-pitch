import React from 'react';
import { siteContent } from '../data/siteContent';
import { ImageWithFallback } from './ImageWithFallback';
import { DossierTraversal, useDossierTraversal } from './DossierTraversal';
import { CompactRecordPicker } from './CompactRecordPicker';

export function JudgesPanel() {
  const { judgesPanel } = siteContent;
  const {
    activeIndex,
    setActiveIndex,
    dossierRef,
    headingRef,
    scrollContainerRef,
    rosterButtonsRef,
    handleTraverse,
  } = useDossierTraversal({
    totalRecords: judgesPanel.judges.length,
    scrollBreakpoint: 768,
  });

  const activeJudge = judgesPanel.judges[activeIndex];

  const handleSelect = (idx: number) => setActiveIndex(idx);

  return (
    <section id="judges" className="bg-surface-white py-16 md:py-20 lg:py-24 scroll-mt-20">
      <div className="w-full max-w-[1792px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 flex flex-col">
        <div className="flex flex-col mb-8 lg:mb-10 max-w-3xl">
          <h2 className="font-sora text-[40px] md:text-[52px] font-bold text-deep-ink leading-tight mb-6">
            Judges Panel
          </h2>
          <p className="font-inter text-[16px] md:text-[18px] text-text-secondary leading-relaxed border-l-2 border-logo-blue pl-5 py-1">
            Professional titles shown reflect each judge's role at the time of Mile High Pitch 2019.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto w-full xl:max-w-none">
          {/* JURY BOARD (5 PORTRAITS) */}
          <div 
            ref={scrollContainerRef}
            className="hidden xl:grid xl:grid-cols-5 xl:gap-6 xl:mb-12"
          >
            {judgesPanel.judges.map((judge, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={idx}
                  ref={(el) => { rosterButtonsRef.current[idx] = el; }}
                  aria-pressed={isActive}
                  aria-controls="judges-dossier"
                  onClick={() => handleSelect(idx)}
                  className={`snap-start shrink-0 w-[52vw] max-w-[220px] md:w-auto md:max-w-none flex flex-col text-left group focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-4 focus:ring-offset-surface-white p-2 xl:p-0 transition-all`}
                >
                  <div className={`w-full aspect-square xl:aspect-[3/4] mb-4 xl:mb-5 border-b-4 transition-all duration-300 ${isActive ? 'border-logo-blue' : 'border-transparent group-hover:border-surface-stone'}`}>
                    <ImageWithFallback 
                       src={judge.image} 
                       alt={judge.alt}
                       className="w-full h-full object-cover"
                     />
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-sora font-bold text-[16px] md:text-[17px] text-left tracking-tight mb-1 transition-colors ${isActive ? 'text-deep-ink' : 'text-text-secondary group-hover:text-deep-ink'}`}>
                      {judge.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* JUDGE DETAIL STAGE */}
          <div ref={dossierRef} id="judges-dossier" className="flex flex-col xl:border-t border-b border-surface-stone pt-0 pb-10 xl:py-12">
            <CompactRecordPicker
              id="judge-record-picker"
              label="Choose a judge"
              records={judgesPanel.judges.map((judge) => judge.name)}
              activeIndex={activeIndex}
              dossierId="judges-dossier"
              onSelect={handleSelect}
              onPrevious={() => handleTraverse('prev')}
              onNext={() => handleTraverse('next')}
            />
            <div key={activeIndex} className="flex flex-col gap-7 md:grid md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:gap-x-9 md:gap-y-5 xl:grid-cols-12 xl:gap-12 xl:gap-x-16 animate-in fade-in duration-300 w-full">
              <div className="xl:hidden w-full max-w-[240px] md:max-w-none mx-auto md:mx-0 md:row-span-3">
                <ImageWithFallback src={activeJudge.image} alt={activeJudge.alt} className="w-full aspect-[4/5] object-cover rounded-sm border-b-4 border-logo-blue" />
              </div>
              
              <div className="md:col-start-2 xl:col-start-auto xl:col-span-4 flex flex-col">
                <h3 
                  ref={headingRef}
                  tabIndex={-1}
                  className="font-sora text-[32px] md:text-[40px] font-bold text-deep-ink tracking-tight mb-2 focus:outline-none"
                >
                  {activeJudge.name}
                </h3>
                <p className="font-inter font-semibold text-[15px] md:text-[16px] text-logo-blue uppercase tracking-wider mb-3 xl:mb-0">
                  {activeJudge.role}
                </p>
              </div>

              <div className="md:col-start-2 xl:col-start-auto xl:col-span-5 flex flex-col">
                <p className="font-inter text-[16px] md:text-[17px] text-text-secondary leading-[1.7]">
                  {activeJudge.bio}
                </p>
              </div>

              <div className="md:col-start-2 xl:col-start-auto xl:col-span-3 flex items-start xl:justify-end">
                <a 
                  href={activeJudge.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View LinkedIn Profile for ${activeJudge.name}`}
                  className="group inline-flex items-center font-sora font-semibold text-[16px] text-logo-blue hover:text-deep-ink transition-colors focus:outline-none focus:ring-2 focus:ring-accent-blue rounded-sm"
                >
                  <span aria-hidden="true">View LinkedIn Profile</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
              
            </div>

            {/* Restrained Local Traversal */}
            <DossierTraversal
              recordType="judge"
              prevRecordName={activeIndex > 0 ? judgesPanel.judges[activeIndex - 1].name : null}
              nextRecordName={activeIndex < judgesPanel.judges.length - 1 ? judgesPanel.judges[activeIndex + 1].name : null}
              onPrevious={() => handleTraverse('prev')}
              onNext={() => handleTraverse('next')}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
