import React from 'react';
import { getAssetPath } from '../utils/assetPath';
import { ImageWithFallback } from './ImageWithFallback';

export function Hero() {
  return (
    <section className="flex flex-col xl:flex-row w-full min-h-[560px] xl:min-h-[660px]">
      <h1 className="sr-only">Mile High Pitch 2019 — Denver Startup Pitch Competition</h1>
      
      {/* LEFT FIELD: Logo Presentation */}
      <div className="bg-identity-navy w-full xl:w-7/12 flex items-center justify-center p-12 lg:p-20 xl:p-24 min-h-[400px] xl:min-h-0 relative overflow-hidden">
        <ImageWithFallback 
          src={getAssetPath('assets/mhp2019-logo-master.svg')}
          alt="Mile High Pitch 2019 Logo"
          className="w-full max-w-[420px] lg:max-w-[500px] xl:max-w-[580px] h-auto object-contain animate-in fade-in zoom-in-95 duration-700 delay-100 fill-mode-both"
        />
      </div>

      {/* RIGHT FIELD: Archival Reference */}
      <div className="bg-archive-paper w-full xl:w-5/12 flex flex-col justify-center p-12 lg:p-20 xl:px-24 xl:py-32 border-t xl:border-t-0 xl:border-l border-surface-stone">
        <div className="animate-in fade-in slide-in-from-right-8 duration-700 delay-300 fill-mode-both">
          <p className="font-sora font-semibold text-[13px] md:text-[14px] uppercase tracking-[0.15em] text-logo-blue mb-8">
            Historical Event Portfolio
          </p>
          <h2 className="font-sora text-[32px] md:text-[38px] xl:text-[40px] font-bold leading-tight text-deep-ink mb-12">
            November 21, 2019<br />
            Denver, Colorado
          </h2>
          <div className="flex flex-col space-y-4 font-inter text-[17px] md:text-[18px] xl:text-[20px] text-text-secondary border-l-2 border-logo-blue pl-6 py-1">
            <p>Five selected startups</p>
            <p>Presented by WorkAbility<br />and The Bank of Denver</p>
          </div>
        </div>
      </div>
    </section>
  );
}
