import React, { useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface InquiryDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InquiryDialog({ isOpen, onClose }: InquiryDialogProps) {
  const [state, handleSubmit] = useForm("xwlealvn");
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // Initial focus on dialog open when form is active
  useEffect(() => {
    if (!isOpen) return;

    if (!state.succeeded) {
      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, state.succeeded]);

  // Lifecycle-aware focus transfer upon verified submission success (RO-086 / F-02)
  useEffect(() => {
    if (state.succeeded && isOpen) {
      const timer = setTimeout(() => {
        successHeadingRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded, isOpen]);

  // Keyboard navigation: Escape key dismissal and Tab/Shift+Tab focus containment
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement || document.activeElement === successHeadingRef.current) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-archive-navy/75 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-dialog-title"
        className="bg-white rounded-[16px] md:rounded-[20px] shadow-2xl border border-archive-navy/15 w-full max-w-lg p-6 md:p-8 relative text-archive-navy my-8"
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close inquiry dialog"
          className="absolute top-5 right-5 text-text-secondary hover:text-deep-ink transition-colors p-1.5 rounded-full hover:bg-surface-stone/50 focus:outline-none focus:ring-2 focus:ring-accent-blue cursor-pointer"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {/* Dialog Header */}
        <div className="mb-6 pr-8">
          <h3 
            id="inquiry-dialog-title" 
            className="font-sora font-bold text-[22px] md:text-[24px] text-deep-ink leading-tight mb-2"
          >
            Archive Inquiry
          </h3>
          <p className="font-inter text-[14px] text-text-secondary">
            Send an archival question, historical correction, or participant inquiry.
          </p>
        </div>

        {/* Success State */}
        {state.succeeded ? (
          <div className="flex flex-col items-center text-center py-6">
            <CheckCircle className="w-12 h-12 text-accent-blue mb-4" aria-hidden="true" />
            <h4 
              id="inquiry-success-title"
              ref={successHeadingRef}
              tabIndex={-1}
              className="font-sora font-bold text-[18px] text-deep-ink mb-2 focus:outline-none focus:ring-2 focus:ring-accent-blue rounded-sm"
            >
              Inquiry Submitted
            </h4>
            <p className="font-inter text-[15px] text-text-secondary mb-6 max-w-xs">
              Thank you. Your inquiry has been sent.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="bg-deep-ink hover:bg-deep-ink/90 text-white font-inter font-medium text-[15px] px-6 py-2.5 rounded-[8px] transition-colors focus:outline-none focus:ring-2 focus:ring-accent-blue cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          /* Form Body */
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            
            {/* General Submission Error */}
            {state.errors && (
              <div 
                className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-[8px] text-[14px] font-inter"
                role="alert"
                aria-live="polite"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                <span>There was a problem submitting your inquiry. Please verify the fields below and try again.</span>
              </div>
            )}

            {/* Name Field */}
            <div className="flex flex-col">
              <label 
                htmlFor="inquiry-name" 
                className="font-inter font-semibold text-[13px] md:text-[14px] text-deep-ink mb-1"
              >
                Name <span className="text-text-secondary" aria-hidden="true">*</span>
              </label>
              <input
                ref={firstInputRef}
                id="inquiry-name"
                type="text"
                name="name"
                required
                aria-required="true"
                className="font-inter text-[15px] text-deep-ink bg-white border border-surface-stone rounded-[8px] px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all"
                placeholder="Your full name"
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-600 text-[13px] mt-1" />
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label 
                htmlFor="inquiry-email" 
                className="font-inter font-semibold text-[13px] md:text-[14px] text-deep-ink mb-1"
              >
                Email <span className="text-text-secondary" aria-hidden="true">*</span>
              </label>
              <input
                id="inquiry-email"
                type="email"
                name="email"
                required
                aria-required="true"
                className="font-inter text-[15px] text-deep-ink bg-white border border-surface-stone rounded-[8px] px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all"
                placeholder="name@example.com"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-600 text-[13px] mt-1" />
            </div>

            {/* Inquiry Type Field */}
            <div className="flex flex-col">
              <label 
                htmlFor="inquiry-type" 
                className="font-inter font-semibold text-[13px] md:text-[14px] text-deep-ink mb-1"
              >
                Inquiry Type <span className="text-text-secondary" aria-hidden="true">*</span>
              </label>
              <select
                id="inquiry-type"
                name="inquiryType"
                required
                aria-required="true"
                defaultValue="General Event Inquiry"
                className="font-inter text-[15px] text-deep-ink bg-white border border-surface-stone rounded-[8px] px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all"
              >
                <option value="General Event Inquiry">General Event Inquiry</option>
                <option value="Archive Correction / Historical Record">Archive Correction / Historical Record</option>
                <option value="Participant / Profile Update">Participant / Profile Update</option>
                <option value="Media / Press">Media / Press</option>
                <option value="Other">Other</option>
              </select>
              <ValidationError prefix="Inquiry Type" field="inquiryType" errors={state.errors} className="text-red-600 text-[13px] mt-1" />
            </div>

            {/* Message Field */}
            <div className="flex flex-col">
              <label 
                htmlFor="inquiry-message" 
                className="font-inter font-semibold text-[13px] md:text-[14px] text-deep-ink mb-1"
              >
                Message <span className="text-text-secondary" aria-hidden="true">*</span>
              </label>
              <textarea
                id="inquiry-message"
                name="message"
                rows={4}
                required
                aria-required="true"
                className="font-inter text-[15px] text-deep-ink bg-white border border-surface-stone rounded-[8px] px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all resize-y min-h-[90px]"
                placeholder="Enter your inquiry details..."
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-600 text-[13px] mt-1" />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={state.submitting}
                aria-busy={state.submitting ? "true" : undefined}
                className="inline-flex items-center justify-center gap-2 bg-deep-ink hover:bg-deep-ink/90 text-white font-inter font-semibold text-[15px] px-6 py-2.5 rounded-[8px] transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent-blue cursor-pointer"
              >
                {state.submitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Inquiry</span>
                    <Send size={16} aria-hidden="true" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
