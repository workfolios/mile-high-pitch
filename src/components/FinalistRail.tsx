import React from 'react';
import { ImageWithFallback } from './ImageWithFallback';
import { assets } from '../data/siteAssets';
import { DossierTraversal, useDossierTraversal } from './DossierTraversal';

const finalists = [
  {
    historicalName: 'Boogaloo Beds',
    historicalValue: 'Smart beds for children with autism.',
    currentName: 'Cubby Beds',
    currentLogo: assets.cubbyBedsMark,
    currentAlt: 'Cubby Beds logo',
    currentDescriptor: 'Smart enclosed safety beds designed for children with complex conditions and safety-related sleep needs.',
    continuity: 'Boogaloo Beds was the company that competed in and won Mile High Pitch 2019. Cubby Beds is the current company and brand continuity reference.',
    currentLink: 'https://cubbybeds.com/',
    logoClassName: 'max-h-[130px] md:max-h-[160px] max-w-[260px] xl:max-w-[300px]'
  },
  {
    historicalName: 'EVmatch',
    historicalValue: 'Private charging for electric vehicles.',
    currentName: 'EVmatch',
    currentLogo: assets.evmatchLogo,
    currentAlt: 'EVmatch logo',
    currentDescriptor: 'Managed EV charging solutions for multifamily properties, businesses, vacation rentals, and drivers.',
    continuity: 'EVmatch competed in Mile High Pitch 2019 and continues under the EVmatch brand.',
    currentLink: 'https://evmatch.com/',
    logoClassName: 'max-h-[130px] md:max-h-[110px] max-w-[260px] xl:max-w-[400px]'
  },
  {
    historicalName: 'AET',
    historicalValue: 'Software-as-a-solution advertising agency.',
    currentName: 'AET Automotive',
    currentLogo: assets.aetAutomotiveLogo,
    currentAlt: 'AET Automotive logo',
    currentDescriptor: 'Self-service automotive marketing software for dealerships, agencies, and OEMs.',
    continuity: 'AET competed in Mile High Pitch 2019. The company currently operates as AET Automotive.',
    currentLink: 'https://aetautomotive.com/',
    logoClassName: 'max-h-[130px] md:max-h-[160px] max-w-[260px] xl:max-w-[300px]'
  },
  {
    historicalName: 'Slope Threads',
    historicalValue: 'Name-brand ski outfit bundles offered at a daily rental rate.',
    currentName: 'Slope Threads',
    currentLogo: assets.slopeThreadsLogo,
    currentAlt: 'Slope Threads logo',
    currentDescriptor: 'Ski and snowboard apparel rental with destination delivery and Colorado pickup.',
    continuity: 'Slope Threads competed in Mile High Pitch 2019 and continues under the Slope Threads brand.',
    currentLink: 'https://slopethreads.com/',
    logoClassName: 'max-h-[130px] md:max-h-[165px] max-w-[260px] xl:max-w-[310px]'
  },
  {
    historicalName: 'Etta Epidermis',
    historicalValue: 'Consumer artificial intelligence for diagnosing skin cancer.',
    currentName: 'cysto.ai',
    currentLogo: assets.cystoAiWordmark,
    currentAlt: 'cysto.ai logo',
    currentDescriptor: 'Investigational AI software for real-time detection of bladder carcinoma in situ during standard white-light cystoscopy.',
    continuity: 'Etta Epidermis competed in Mile High Pitch 2019. Its subsequent company lineage continued through Etta.io; cysto.ai is a current Etta.io DBA focused on AI-assisted cystoscopy.',
    currentLink: 'https://cysto.ai/',
    logoClassName: 'max-h-[130px] md:max-h-[120px] max-w-[260px] xl:max-w-[400px]'
  }
];

export function FinalistRail() {
  const {
    activeIndex,
    setActiveIndex,
    dossierRef,
    headingRef,
    scrollContainerRef,
    rosterButtonsRef,
    handleTraverse,
  } = useDossierTraversal({
    totalRecords: finalists.length,
    scrollBreakpoint: 1280,
  });

  const handleSelect = (idx: number, e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveIndex(idx);
    
    const container = scrollContainerRef.current;
    const button = e.currentTarget;
    
    if (container && window.innerWidth < 1280) {
      const scrollLeft = button.offsetLeft - (container.clientWidth / 2) + (button.clientWidth / 2);
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      container.scrollTo({
        left: scrollLeft,
        behavior: prefersReduced ? 'auto' : 'smooth'
      });
    }
  };

  const activeCompany = finalists[activeIndex];

  return (
    <section id="finalists" className="bg-white py-16 lg:py-24 scroll-mt-20 overflow-hidden">
      <div className="w-full max-w-[1792px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
        
        <div className="mb-12 lg:mb-16">
          <h2 className="font-sora text-[40px] md:text-[52px] font-bold leading-tight text-deep-ink mb-4">
            2019 Finalists
          </h2>
          <p className="font-inter text-[16px] md:text-[17px] text-text-secondary leading-relaxed max-w-3xl">
            Select a company to view its 2019 record and current continuity.
          </p>
        </div>

        {/* Cohort Board */}
        <div 
          ref={scrollContainerRef}
          className="flex xl:grid xl:grid-cols-5 gap-6 xl:gap-10 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-8 -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-16 lg:px-16 xl:mx-0 xl:px-0"
        >
          {finalists.map((company, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button 
                key={idx}
                ref={(el) => { rosterButtonsRef.current[idx] = el; }}
                aria-pressed={isActive}
                onClick={(e) => handleSelect(idx, e)}
                className={`group flex flex-col text-left border-t-2 pt-6 transition-all min-w-[260px] md:min-w-[300px] xl:min-w-0 snap-start focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-8 focus:ring-offset-white ${
                  isActive 
                    ? 'border-logo-blue' 
                    : 'border-surface-stone hover:border-logo-blue/40'
                }`}
              >
                <span className={`font-sora text-[14px] md:text-[16px] font-bold tracking-widest mb-8 transition-colors ${
                  isActive ? 'text-deep-ink/40' : 'text-deep-ink/20 group-hover:text-deep-ink/40'
                }`}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                
                <div className={`h-[70px] xl:h-[80px] flex items-center justify-start mb-8 w-full transition-opacity duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-75 group-hover:opacity-100'
                }`}>
                  <ImageWithFallback 
                    src={company.currentLogo} 
                    alt={company.currentAlt}
                    className={`${company.logoClassName} !max-h-[70px] xl:!max-h-[80px] !max-w-[220px] xl:!max-w-[200px] object-contain mix-blend-multiply`}
                    loading="lazy"
                  />
                </div>
                
                <div className="mt-auto flex flex-col">
                  <span className={`font-sora font-semibold text-[18px] md:text-[20px] transition-colors ${
                    isActive ? 'text-deep-ink' : 'text-deep-ink/70 group-hover:text-deep-ink'
                  }`}>
                    {company.historicalName}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Lineage Stage */}
        <div 
          ref={dossierRef}
          className="mt-4 pt-10 xl:pt-12 border-t border-surface-stone flex flex-col"
        >
          <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6 xl:gap-8 animate-in fade-in duration-500">
            {/* Left: 2019 Record */}
            <div className="w-full xl:w-[60%] flex flex-col pr-0 xl:pr-8">
              <div className="font-sora font-semibold uppercase text-[15px] md:text-[17px] xl:text-[18px] tracking-[0.04em] text-deep-ink/80 mb-6">
                2019 Record
              </div>
              <h3 
                ref={headingRef}
                tabIndex={-1}
                className="font-sora font-semibold text-[32px] md:text-[40px] xl:text-[48px] text-deep-ink mb-6 focus:outline-none"
              >
                {activeCompany.historicalName}
              </h3>
              <p className="font-inter text-[18px] md:text-[20px] xl:text-[22px] text-text-secondary leading-relaxed max-w-4xl">
                {activeCompany.historicalValue}
              </p>
            </div>
            
            {/* Lineage Connector */}
            <div className="flex items-center justify-start py-4 xl:py-0 xl:mt-16 text-logo-blue/40" aria-hidden="true">
              <svg className="w-8 h-8 md:w-10 md:h-10 transform rotate-90 xl:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            
            {/* Right: Current Continuity */}
            <div className="w-full xl:w-[35%] flex flex-col">
              <div className="font-sora font-semibold uppercase text-[15px] md:text-[17px] xl:text-[18px] tracking-[0.04em] text-deep-ink/80 mb-6">
                {activeCompany.historicalName !== activeCompany.currentName ? 'Current Continuity' : 'Continues Today'}
              </div>
              
              <h3 className="font-sora font-semibold text-[22px] md:text-[26px] xl:text-[28px] text-deep-ink mb-4">
                {activeCompany.currentName}
              </h3>
              
              <div className="flex flex-col space-y-4 mb-6">
                <p className="font-inter text-[16px] md:text-[17px] text-deep-ink leading-relaxed">
                  {activeCompany.currentDescriptor}
                </p>
                <p className="font-inter text-[16px] md:text-[17px] text-text-secondary leading-relaxed">
                  {activeCompany.continuity}
                </p>
              </div>
              
              <a 
                href={activeCompany.currentLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit current website for ${activeCompany.currentName}`}
                className="group inline-flex items-center font-sora font-semibold text-[16px] md:text-[18px] text-logo-blue hover:text-deep-ink transition-colors w-max focus:outline-none focus:ring-2 focus:ring-accent-blue rounded-sm"
              >
                <span aria-hidden="true">Visit Current Website</span>
                <span className="sr-only">for {activeCompany.currentName}</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Restrained Local Traversal */}
          <DossierTraversal
            recordType="finalist"
            prevRecordName={activeIndex > 0 ? finalists[activeIndex - 1].historicalName : null}
            nextRecordName={activeIndex < finalists.length - 1 ? finalists[activeIndex + 1].historicalName : null}
            onPrevious={() => handleTraverse('prev')}
            onNext={() => handleTraverse('next')}
          />
        </div>

      </div>
    </section>
  );
}
