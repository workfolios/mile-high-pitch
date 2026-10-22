import React from 'react';
import { assets } from '../data/siteAssets';
import { ImageWithFallback } from './ImageWithFallback';

export function WinnerSection() {
  return (
    <section className="bg-archive-navy py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Full-width Section Heading */}
        <h2 className="font-sora text-[40px] md:text-[52px] font-bold text-white leading-tight mb-12 md:mb-16">
          2019 Winner
        </h2>

        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-start lg:items-stretch">
          
          {/* Left: Photograph (8 cols) */}
          <div className="lg:col-span-8 flex flex-col w-full mb-12 lg:mb-0">
            <figure className="w-full relative">
              <ImageWithFallback 
                src={assets.winnerPhoto}
                alt="The award presentation following Mile High Pitch 2019"
                className="w-full h-auto object-cover rounded-sm"
                loading="lazy"
              />
              <figcaption className="mt-4 md:mt-5 font-inter text-[15px] text-white/60 leading-relaxed max-w-[80%]">
                The winner photograph captures Boogaloo Beds receiving the 2019 Mile High Pitch award.
              </figcaption>
            </figure>
          </div>

          {/* Right: Company Story (4 cols) */}
          <div className="lg:col-span-4 flex flex-col w-full lg:justify-center lg:pb-8">
            
            <div className="flex flex-col">
              {/* Historical Content (Top) */}
              <div className="flex flex-col mb-12 md:mb-16">
                <h3 className="font-sora text-[32px] md:text-[40px] font-bold text-white mb-4 leading-tight">
                  Boogaloo Beds
                </h3>
                
                <p className="font-inter text-[18px] md:text-[20px] text-white/90 leading-relaxed mb-6">
                  Smart beds for children with autism.
                </p>
                
                <p className="font-inter text-[15px] text-white/60 leading-relaxed">
                  Boogaloo Beds was the company that competed in and won Mile High Pitch 2019. Cubby Beds is the current company and brand continuity reference.
                </p>
              </div>

              {/* Current Company Content (Lower) */}
              <div className="flex flex-col pb-4">
                <div className="w-10 h-[1px] bg-white/20 mb-8"></div>
                
                <div className="mb-5 w-[160px] md:w-[185px]">
                  <a 
                    href="https://cubbybeds.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Cubby Beds official website"
                    className="block focus:outline-none focus:ring-1 focus:ring-white/50 transition-transform hover:-translate-y-0.5"
                  >
                    <ImageWithFallback 
                      src={assets.cubbyBedsWordmark}
                      alt="Cubby Beds wordmark"
                      className="w-full h-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                      loading="lazy"
                    />
                  </a>
                </div>

                <p className="font-inter text-[15px] text-white/60 leading-relaxed">
                  Smart enclosed safety beds designed for children with complex conditions and safety-related sleep needs.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
