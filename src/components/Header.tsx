import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const navigation = [
  { label: 'Competition', href: '#competition' },
  { label: 'Finalists', href: '#finalists' },
  { label: 'Behind Mile High Pitch', href: '#behind' },
  { label: 'Judges Panel', href: '#judges' }
];

function computeActiveSection(
  currentActive: string | null,
  headerHeight: number
): string | null {
  const activationLine = headerHeight + 40;
  const HYSTERESIS = 24;

  const footerEl = document.querySelector('footer');
  const compEl = document.getElementById('competition');
  const finalistsEl = document.getElementById('finalists');
  const behindEl = document.getElementById('behind');
  const judgesEl = document.getElementById('judges');

  if (!compEl || !finalistsEl || !behindEl || !judgesEl) {
    return null;
  }

  const scrollY = window.scrollY || window.pageYOffset;
  const isNearBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60;
  const footerRect = footerEl ? footerEl.getBoundingClientRect() : null;

  // 1. Footer / closing region check (clears active navigation)
  if (footerRect) {
    const wasInFooter = currentActive === null && compEl.getBoundingClientRect().top <= 0;
    if (wasInFooter) {
      if (footerRect.top <= activationLine + HYSTERESIS || isNearBottom) {
        return null;
      }
    } else {
      if (footerRect.top <= activationLine || isNearBottom) {
        return null;
      }
    }
  }

  // 2. Section evaluation in reverse document order with hysteresis
  // If the section is already active, it retains active state until scrolling past the hysteresis band
  const getThreshold = (id: string) => {
    return currentActive === id ? activationLine + HYSTERESIS : activationLine;
  };

  const judgesRect = judgesEl.getBoundingClientRect();
  if (judgesRect.top <= getThreshold('#judges')) {
    return '#judges';
  }

  const behindRect = behindEl.getBoundingClientRect();
  if (behindRect.top <= getThreshold('#behind')) {
    return '#behind';
  }

  const finalistsRect = finalistsEl.getBoundingClientRect();
  if (finalistsRect.top <= getThreshold('#finalists')) {
    return '#finalists';
  }

  const compRect = compEl.getBoundingClientRect();
  if (compRect.top <= getThreshold('#competition')) {
    return '#competition';
  }

  // 3. Top of page / Hero region (before Competition crosses activation threshold)
  return null;
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let rafId: number | null = null;

    const updateActiveSection = () => {
      const headerHeight = headerRef.current?.offsetHeight || 72;
      setActiveSection((prev) => computeActiveSection(prev, headerHeight));
    };

    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateActiveSection();
        rafId = null;
      });
    };

    updateActiveSection();
    const timer = setTimeout(updateActiveSection, 100);

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      clearTimeout(timer);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return (
    <header 
      ref={headerRef} 
      className="sticky top-0 z-50 bg-surface-white border-b border-surface-stone text-deep-ink shadow-sm"
    >
      <div className="w-full max-w-[1792px] mx-auto px-6 h-[64px] md:h-[72px] flex items-center justify-between">
        <a 
          href="#" 
          className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-accent-blue flex items-center font-sora font-bold text-[18px] md:text-[20px] text-deep-ink hover:text-logo-blue transition-colors tracking-tight"
          aria-label="Mile High Pitch 2019 — Back to top"
        >
          Mile High Pitch <span className="font-light ml-[0.2em] text-text-secondary">2019</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {navigation.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a 
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'location' : undefined}
                className={`relative font-inter text-[15px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent-blue px-2 py-1 rounded-sm ${
                  isActive
                    ? 'text-deep-ink'
                    : 'text-text-secondary hover:text-logo-blue'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span 
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-logo-blue pointer-events-none" 
                    aria-hidden="true" 
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          ref={menuButtonRef}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-deep-ink hover:text-logo-blue focus:outline-none focus:ring-2 focus:ring-accent-blue p-1 rounded-sm"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden absolute top-full left-0 w-full bg-surface-white border-b border-surface-stone shadow-lg">
          <nav className="flex flex-col p-6 max-h-[calc(100vh-72px)] overflow-y-auto" aria-label="Mobile navigation">
            {navigation.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a 
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    menuButtonRef.current?.focus();
                  }}
                  className={`font-inter text-[16px] font-medium py-4 px-4 border-b border-surface-stone/50 last:border-b-0 focus:outline-none focus:ring-2 focus:ring-accent-blue rounded-sm transition-colors ${
                    isActive
                      ? 'text-deep-ink'
                      : 'text-text-secondary hover:text-logo-blue hover:bg-surface-mist'
                  }`}
                >
                  <span className="relative inline-block pb-1">
                    {item.label}
                    {isActive && (
                      <span 
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-logo-blue pointer-events-none" 
                        aria-hidden="true" 
                      />
                    )}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
