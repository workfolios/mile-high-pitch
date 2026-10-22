import React, { useEffect, useRef, useState } from 'react';

export interface DossierTraversalProps {
  recordType: 'finalist' | 'contributor' | 'judge';
  prevRecordName?: string | null;
  nextRecordName?: string | null;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}

export function DossierTraversal({
  recordType,
  prevRecordName,
  nextRecordName,
  onPrevious,
  onNext,
  className = '',
}: DossierTraversalProps) {
  const isFirst = !prevRecordName;
  const isLast = !nextRecordName;

  return (
    <div
      aria-label={`${recordType.charAt(0).toUpperCase() + recordType.slice(1)} record traversal`}
      className={`w-full pt-6 md:pt-8 mt-10 lg:mt-12 border-t border-surface-stone flex items-center justify-between ${className}`}
    >
      <button
        type="button"
        disabled={isFirst}
        onClick={onPrevious}
        aria-label={isFirst ? `No previous ${recordType}` : `Previous ${recordType}: ${prevRecordName}`}
        className={`group inline-flex items-center font-sora font-semibold text-[14px] md:text-[15px] min-h-[44px] py-2 pr-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 rounded-sm ${
          isFirst
            ? 'text-text-secondary/35 cursor-not-allowed select-none'
            : 'text-text-secondary hover:text-deep-ink cursor-pointer'
        }`}
      >
        <span aria-hidden="true" className="mr-2.5">
          ←
        </span>
        <span>Previous</span>
      </button>

      <button
        type="button"
        disabled={isLast}
        onClick={onNext}
        aria-label={isLast ? `No next ${recordType}` : `Next ${recordType}: ${nextRecordName}`}
        className={`group inline-flex items-center font-sora font-semibold text-[14px] md:text-[15px] min-h-[44px] py-2 pl-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 rounded-sm ${
          isLast
            ? 'text-text-secondary/35 cursor-not-allowed select-none'
            : 'text-text-secondary hover:text-deep-ink cursor-pointer'
        }`}
      >
        <span>Next</span>
        <span aria-hidden="true" className="ml-2.5">
          →
        </span>
      </button>
    </div>
  );
}

export function useDossierTraversal({
  totalRecords,
  scrollBreakpoint = 1280,
}: {
  totalRecords: number;
  scrollBreakpoint?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isTraversingRef = useRef(false);
  const dossierRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const rosterButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTraverse = (direction: 'prev' | 'next') => {
    const targetIndex = direction === 'next' ? activeIndex + 1 : activeIndex - 1;
    if (targetIndex < 0 || targetIndex >= totalRecords) return;

    isTraversingRef.current = true;
    setActiveIndex(targetIndex);

    // Bounded internal horizontal roster adjustment for smaller breakpoints
    const container = scrollContainerRef.current;
    const targetButton = rosterButtonsRef.current[targetIndex];
    if (container && targetButton && window.innerWidth < scrollBreakpoint) {
      const scrollLeft =
        targetButton.offsetLeft - container.clientWidth / 2 + targetButton.clientWidth / 2;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      container.scrollTo({
        left: scrollLeft,
        behavior: prefersReduced ? 'auto' : 'smooth',
      });
    }
  };

  useEffect(() => {
    if (!isTraversingRef.current) return;
    isTraversingRef.current = false;

    // Viewport repositioning to dossier beginning (accounting for sticky header)
    if (dossierRef.current) {
      const headerEl = document.querySelector('header');
      const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 72;
      const rect = dossierRef.current.getBoundingClientRect();
      const targetScrollY = window.scrollY + rect.top - (headerHeight + 20);

      window.scrollTo({
        top: Math.max(0, targetScrollY),
        behavior: 'auto', // deterministic, restrained positioning
      });
    }

    // Programmatic focus on principal identity heading
    if (headingRef.current) {
      headingRef.current.focus({ preventScroll: true });
    }
  }, [activeIndex]);

  return {
    activeIndex,
    setActiveIndex,
    dossierRef,
    headingRef,
    scrollContainerRef,
    rosterButtonsRef,
    handleTraverse,
  };
}
