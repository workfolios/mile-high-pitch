import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

export function ArchiveInquiry() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, handleSubmit] = useForm("xwlealvn");

  return (
    <section className="bg-logo-blue text-white py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col w-full">
        {!isOpen ? (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24 animate-in fade-in duration-300 items-start w-full">
            <div className="w-full lg:w-7/12">
              <h2 className="font-sora text-[40px] md:text-[52px] font-bold leading-tight">
                Questions, Corrections & Context
              </h2>
            </div>
            <div className="w-full lg:w-5/12 flex flex-col pt-2 lg:pt-4">
              <p className="font-inter text-[18px] md:text-[20px] text-white/90 mb-10 leading-relaxed border-l-2 border-white/30 pl-6 py-1">
                Have information, a correction, or a question about Mile High Pitch 2019?
              </p>
              <button
                onClick={() => setIsOpen(true)}
                className="group inline-flex items-center justify-center bg-white text-logo-blue font-sora font-semibold text-[16px] px-8 py-4 hover:bg-surface-mist transition-colors focus:outline-none focus:ring-4 focus:ring-white/30 w-max"
              >
                Open Inquiry Form 
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full text-left animate-in slide-in-from-bottom-4 duration-500 flex flex-col max-w-4xl">
            <div className="border-b border-white/30 pb-8 mb-10">
              <h2 className="font-sora text-[32px] md:text-[40px] font-bold mb-4">Archive Inquiry</h2>
              <p className="font-inter text-[18px] text-white/80">
                Send an archival question, historical correction, or participant inquiry.
              </p>
            </div>
            
            {state.succeeded ? (
              <div className="py-12 flex flex-col items-start animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-sora font-bold text-[24px] mb-3">Inquiry Submitted</h3>
                <p className="font-inter text-[16px] text-white/80 mb-8">Thank you. Your inquiry has been sent to the archive maintainers.</p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="font-sora font-semibold text-white hover:text-white/70 transition-colors underline underline-offset-4"
                >
                  Close Form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex flex-col w-full md:w-1/2">
                    <label htmlFor="name" className="font-inter font-semibold text-[14px] mb-3 text-white/90 uppercase tracking-widest">
                      Name <span className="text-white/60">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      className="bg-white text-deep-ink border-0 px-4 py-3 font-inter text-[16px] focus:outline-none focus:ring-4 focus:ring-white/30 transition-all w-full rounded-none"
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-300 text-sm mt-2" />
                  </div>
                  <div className="flex flex-col w-full md:w-1/2">
                    <label htmlFor="email" className="font-inter font-semibold text-[14px] mb-3 text-white/90 uppercase tracking-widest">
                      Email <span className="text-white/60">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      className="bg-white text-deep-ink border-0 px-4 py-3 font-inter text-[16px] focus:outline-none focus:ring-4 focus:ring-white/30 transition-all w-full rounded-none"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-300 text-sm mt-2" />
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <label htmlFor="inquiryType" className="font-inter font-semibold text-[14px] mb-3 text-white/90 uppercase tracking-widest">
                    Inquiry Type <span className="text-white/60">*</span>
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    required
                    defaultValue="General Event Inquiry"
                    className="bg-white text-deep-ink border-0 px-4 py-3 font-inter text-[16px] focus:outline-none focus:ring-4 focus:ring-white/30 transition-all w-full rounded-none"
                  >
                    <option value="General Event Inquiry">General Event Inquiry</option>
                    <option value="Archive Correction / Historical Record">Archive Correction / Historical Record</option>
                    <option value="Participant / Profile Update">Participant / Profile Update</option>
                    <option value="Media / Press">Media / Press</option>
                    <option value="Other">Other</option>
                  </select>
                  <ValidationError prefix="Inquiry Type" field="inquiryType" errors={state.errors} className="text-red-300 text-sm mt-2" />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="message" className="font-inter font-semibold text-[14px] mb-3 text-white/90 uppercase tracking-widest">
                    Message <span className="text-white/60">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="bg-white text-deep-ink border-0 px-4 py-3 font-inter text-[16px] focus:outline-none focus:ring-4 focus:ring-white/30 resize-y transition-all w-full rounded-none"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-300 text-sm mt-2" />
                </div>

                <div className="pt-8 flex justify-between items-center border-t border-white/30 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="font-sora text-[16px] font-semibold text-white/70 hover:text-white transition-colors py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="bg-deep-ink hover:bg-archive-navy text-white font-sora font-semibold text-[16px] px-10 py-4 transition-colors disabled:opacity-50"
                  >
                    {state.submitting ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
