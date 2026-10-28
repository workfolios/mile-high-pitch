import React from 'react';

interface CompactRecordPickerProps {
  id: string;
  label: string;
  records: string[];
  activeIndex: number;
  dossierId: string;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

/** The existing record selector in a single-record presentation for tablet and phone. */
export function CompactRecordPicker({
  id,
  label,
  records,
  activeIndex,
  dossierId,
  onSelect,
  onPrevious,
  onNext,
}: CompactRecordPickerProps) {
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === records.length - 1;

  return (
    <div className="xl:hidden mb-7 md:mb-9">
      <div className="flex items-center justify-between gap-4 mb-3">
        <label htmlFor={id} className="font-inter text-[14px] font-semibold text-deep-ink">
          {label}
        </label>
        <span className="font-inter text-[13px] text-text-secondary tabular-nums">
          {activeIndex + 1} of {records.length}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={isFirst}
          onClick={onPrevious}
          aria-label={isFirst ? 'No previous record' : `Previous: ${records[activeIndex - 1]}`}
          className="h-12 min-w-11 rounded-sm border border-surface-stone text-deep-ink disabled:opacity-35 disabled:cursor-not-allowed hover:border-logo-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue"
        >
          <span aria-hidden="true">←</span>
        </button>
        <select
          id={id}
          value={activeIndex}
          aria-controls={dossierId}
          onChange={(event) => onSelect(Number(event.target.value))}
          className="h-12 min-w-0 flex-1 rounded-sm border border-surface-stone bg-white px-3 font-inter text-[15px] font-semibold text-deep-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue"
        >
          {records.map((name, index) => (
            <option key={name} value={index}>{name}</option>
          ))}
        </select>
        <button
          type="button"
          disabled={isLast}
          onClick={onNext}
          aria-label={isLast ? 'No next record' : `Next: ${records[activeIndex + 1]}`}
          className="h-12 min-w-11 rounded-sm border border-surface-stone text-deep-ink disabled:opacity-35 disabled:cursor-not-allowed hover:border-logo-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
