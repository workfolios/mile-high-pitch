import React, { useRef, useState } from 'react';

interface SwipeRecordCarouselProps {
  records: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
  children: React.ReactNode;
}

/**
 * One complete record (image and dossier) at a time on phone/tablet.
 * Swipe is progressive enhancement: visible arrow buttons remain the
 * keyboard, mouse, and assistive-technology alternative.
 */
export function SwipeRecordCarousel({
  records,
  activeIndex,
  onSelect,
  children,
}: SwipeRecordCarouselProps) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [direction, setDirection] = useState<'next' | 'previous'>('next');
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === records.length - 1;

  const goTo = (index: number) => {
    if (index < 0 || index >= records.length || index === activeIndex) return;
    setDirection(index > activeIndex ? 'next' : 'previous');
    onSelect(index);
  };

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 1280 || event.touches.length !== 1) {
      touchStart.current = null;
      return;
    }
    // Allow ordinary link/button interactions within the displayed record.
    if ((event.target as HTMLElement).closest('a, button, input, select, textarea')) {
      touchStart.current = null;
      return;
    }
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || window.innerWidth >= 1280 || event.changedTouches.length !== 1) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    // Horizontal intent only: vertical page scrolling must remain native.
    if (Math.abs(dx) < 55 || Math.abs(dx) <= Math.abs(dy) * 1.4) return;
    const next = dx < 0 ? activeIndex + 1 : activeIndex - 1;
    goTo(next);
  };

  return (
    <>
      <div className="xl:hidden mb-6 md:mb-8 flex items-center justify-between gap-4" role="group" aria-label="Record carousel navigation">
        <div className="min-w-0 flex flex-col gap-2.5">
          <div className="flex items-baseline gap-2" aria-hidden="true">
            <span className="font-sora text-[16px] font-bold tabular-nums text-deep-ink">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="font-inter text-[12px] tabular-nums text-text-secondary">
              / {String(records.length).padStart(2, '0')}
            </span>
          </div>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {records.map((name, index) => (
              <span
                key={name}
                className={`h-1.5 rounded-full transition-[width,background-color] duration-200 ${index === activeIndex ? 'w-7 bg-logo-blue' : 'w-2 bg-surface-stone'}`}
              />
            ))}
          </div>
        </div>
        <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {records[activeIndex]}, record {activeIndex + 1} of {records.length}
        </span>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            disabled={isFirst}
            onClick={() => goTo(activeIndex - 1)}
            aria-label={isFirst ? 'No previous record' : `Previous: ${records[activeIndex - 1]}`}
            className="flex size-11 items-center justify-center rounded-full border border-surface-stone bg-white text-deep-ink transition-colors hover:border-logo-blue hover:text-logo-blue disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue"
          >
            <span aria-hidden="true" className="text-[20px] leading-none">←</span>
          </button>
          <button
            type="button"
            disabled={isLast}
            onClick={() => goTo(activeIndex + 1)}
            aria-label={isLast ? 'No next record' : `Next: ${records[activeIndex + 1]}`}
            className="flex size-11 items-center justify-center rounded-full border border-surface-stone bg-white text-deep-ink transition-colors hover:border-logo-blue hover:text-logo-blue disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue"
          >
            <span aria-hidden="true" className="text-[20px] leading-none">→</span>
          </button>
        </div>
      </div>
      <div
        key={activeIndex}
        data-swipe-direction={direction}
        className="w-full min-w-0 touch-pan-y record-carousel-enter"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={() => { touchStart.current = null; }}
      >
        {children}
      </div>
    </>
  );
}
