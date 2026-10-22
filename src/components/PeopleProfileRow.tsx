import React from 'react';
import { LinkedInBadge } from './LinkedInBadge';
import { ImageWithFallback } from './ImageWithFallback';

interface Person {
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
  alt: string;
  image: string;
}

interface PeopleProfileRowProps {
  person: Person;
  key?: React.Key;
}

export function PeopleProfileRow({ person }: PeopleProfileRowProps) {
  return (
    <article className="flex flex-col md:grid md:grid-cols-12 md:gap-x-10 items-start py-7 md:py-10 border-t border-surface-stone first:border-t-0 first:pt-0">
      
      {/* Portrait (Cols 1-3) */}
      <div className="md:col-span-4 lg:col-span-3 w-[160px] md:w-full mb-6 md:mb-0 shrink-0">
        <ImageWithFallback 
          src={person.image} 
          alt={person.alt} 
          className="w-full aspect-[4/5] object-cover rounded-sm border border-surface-stone/50"
          loading="lazy"
        />
      </div>

      {/* Identity (Cols 4-7) */}
      <div className="md:col-span-8 lg:col-span-4 flex flex-col mb-4 lg:mb-0 pt-1 lg:pt-2 pr-0 lg:pr-8">
        <h3 className="font-sora text-[28px] md:text-[32px] lg:text-[34px] font-bold text-deep-ink mb-2 leading-tight">
          {person.name}
        </h3>
        
        <div className="font-inter font-semibold text-[17px] md:text-[18px] text-text-secondary mb-3 lg:mb-4 leading-snug">
          {person.role}
        </div>

        {person.linkedin && (
          <div className="mt-1">
            <LinkedInBadge url={person.linkedin} name={person.name} />
          </div>
        )}
      </div>
      
      {/* Biography (Cols 8-12) */}
      <div className="md:col-span-12 lg:col-span-5 flex flex-col pt-2 lg:pt-2 mt-2 md:mt-5 lg:mt-0">
        <p className="font-inter text-[16px] md:text-[17px] text-deep-ink/90 leading-relaxed max-w-[65ch]">
          {person.bio}
        </p>
      </div>

    </article>
  );
}
