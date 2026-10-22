import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface LinkedInBadgeProps {
  url: string;
  name: string;
}

export function LinkedInBadge({ url, name }: LinkedInBadgeProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on LinkedIn`}
      className="group inline-flex items-center text-accent-blue hover:text-deep-ink font-inter font-medium text-[15px] md:text-[16px] transition-colors focus:outline-none focus:ring-2 focus:ring-accent-blue/50 rounded-sm py-2 w-max min-h-[44px]"
    >
      <span className="border-b border-accent-blue/30 group-hover:border-deep-ink/50 transition-colors">
        LinkedIn Profile
      </span>
      <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </a>
  );
}
