import React from 'react';

export function EventSection() {
  return (
    <section id="competition" className="bg-archive-paper py-16 md:py-20 lg:py-24 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Section Heading */}
        <h2 className="font-sora text-[40px] md:text-[52px] font-bold text-deep-ink leading-tight mb-12 lg:mb-16">
          The 2019 Competition
        </h2>

        {/* Program Notes Field */}
        <div className="flex flex-col max-w-5xl">
          {/* Introductory Deck */}
          <p className="font-inter text-[20px] md:text-[24px] text-deep-ink leading-[1.6] font-light mb-10 lg:mb-12">
            Mile High Pitch 2019 was a founder-facing startup competition presented by WorkAbility CoWorking and The Bank of Denver. The live event was created to give five selected startup companies visibility, a structured presentation platform, access to an experienced judging panel, and the opportunity to compete for a meaningful prize package.
          </p>

          {/* Two-Column Reading Field */}
          <div className="lg:columns-2 gap-10 xl:gap-12 font-inter text-[16px] md:text-[17px] text-text-secondary leading-[1.7] space-y-5 lg:space-y-0 text-justify-none">
            <p className="mb-5 lg:mb-5 break-inside-avoid">
              Five companies were selected as finalists. Each was asked to present a concise case for the business: the problem it was addressing, the value of its solution, and the opportunity behind it. That shared format gave very different companies a common framework for communicating what they were building and why it mattered.
            </p>
            <p className="mb-5 lg:mb-5 break-inside-avoid">
              The competition combined founder presentation with practical evaluation. Finalists had to distill their companies into a focused live pitch while the judging panel brought perspectives shaped by entrepreneurship, business leadership, banking, fundraising, innovation, economic development, sales, and Denver's startup community.
            </p>
            <p className="mb-5 lg:mb-5 break-inside-avoid">
              Mile High Pitch was co-created and produced by Caroline Lofts and Brian Curr through WorkAbility. Their work included shaping the competition concept and founder-facing format, coordinating partnerships and communications, supporting the participating companies, and bringing together the people and operational pieces required for the live event. Community partners and event collaborators contributed additional support.
            </p>
            <p className="mb-5 lg:mb-5 break-inside-avoid">
              The Judges Panel selected Boogaloo Beds as the 2019 winner. The company later became Cubby Beds, creating one of the clearest lines between the original competition and the current-company continuity documented throughout this portfolio.
            </p>
            <p className="mb-5 lg:mb-5 break-inside-avoid">
              Mile High Pitch ultimately remained a one-year event. Planning for a 2020 competition was halted amid the COVID-19 pandemic and the related public-health shutdowns that disrupted in-person programming.
            </p>
            <p className="mb-5 lg:mb-5 break-inside-avoid">
              This portfolio preserves the 2019 competition as a record of the founders who presented, the people who created and supported the event, the judges who evaluated the finalists, and the company stories that continued beyond that evening.
            </p>
          </div>
        </div>

        {/* Factual Interruptions / Prize Evidence */}
        <div className="mt-16 lg:mt-24 pt-12 border-t border-surface-stone/80 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 xl:gap-12 w-full max-w-6xl">
          <div className="flex flex-col border-l border-logo-blue pl-6">
            <span className="font-sora text-[28px] md:text-[32px] xl:text-[36px] font-bold text-deep-ink mb-3 leading-tight tracking-tight">$10,000 cash award</span>
            <span className="font-inter text-[14px] md:text-[15px] text-text-secondary uppercase tracking-[0.1em] font-medium">The Bank of Denver</span>
          </div>
          <div className="flex flex-col border-l border-logo-blue pl-6">
            <span className="font-sora text-[28px] md:text-[32px] xl:text-[36px] font-bold text-deep-ink mb-3 leading-tight tracking-tight">1 year dedicated office space</span>
            <span className="font-inter text-[14px] md:text-[15px] text-text-secondary uppercase tracking-[0.1em] font-medium">WorkAbility</span>
          </div>
          <div className="flex flex-col border-l border-logo-blue pl-6">
            <span className="font-sora text-[28px] md:text-[32px] xl:text-[36px] font-bold text-deep-ink mb-3 leading-tight tracking-tight">1 year Startup Lab membership</span>
            <span className="font-inter text-[14px] md:text-[15px] text-text-secondary uppercase tracking-[0.1em] font-medium">The Bank of Denver Startup Lab</span>
          </div>
        </div>

      </div>
    </section>
  );
}
