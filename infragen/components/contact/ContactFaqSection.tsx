"use client";

import React, { useState } from "react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: 1,
    question: "What makes Vizhi Infragen a trusted real estate company in Coimbatore?",
    answer:
      "Our reputation rests on transparent dealings, verified documentation, first-hand local market knowledge, and end-to-end support across Coimbatore's key growth corridors.",
  },
  {
    id: 2,
    question: "Are you a full-service property management company in Coimbatore?",
    answer:
      "Yes. We manage residential and commercial assets including tenant coordination, rent collection, maintenance, and inspections and offer dedicated NRI property management.",
  },
  {
    id: 3,
    question: "Which areas in Coimbatore do you cover?",
    answer:
      "We serve all of Coimbatore, with deep focus on Pattanam, Sulur, Neelambur, Kalapatti, and the Sathy Road, Trichy Road, and Avinashi Road corridors.",
  },
  {
    id: 4,
    question: "Can you assist with land approvals, conversion, construction, and valuation?",
    answer:
      "Absolutely. We handle approvals, documentation, agricultural-to-residential conversion, building construction, and accurate market valuations end-to-end.",
  },
];

export default function ContactFaqSection() {
  const [openId, setOpenId] = useState<number | null>(1); // Default open first FAQ

  const toggleFaq = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#FDFBF7] border-t border-stone-200 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3.5 reveal-slide-up">
          <span className="text-[#c5a880] font-['Inter',sans-serif] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase block">
            GOT QUESTIONS?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] font-['Outfit',sans-serif] tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-[#c5a880] mx-auto rounded-full"></div>
          <p className="text-stone-600 text-xs sm:text-sm font-['Inter',sans-serif] max-w-lg mx-auto">
            Find clear answers to common questions about real estate and property management in Coimbatore.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 sm:p-7 flex items-center justify-between text-left gap-4 cursor-pointer select-none group"
                  aria-expanded={isOpen}
                >
                  <span className="font-['Outfit',sans-serif] font-bold text-base sm:text-lg text-[#1E293B] group-hover:text-[#612124] transition-colors leading-snug">
                    {faq.question}
                  </span>

                  {/* Up / Down Arrow Toggle */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen ? "bg-[#612124] text-white rotate-180" : "bg-[#c5a880]/15 text-[#612124] group-hover:bg-[#612124] group-hover:text-white"
                  }`}>
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </div>
                </button>

                {/* Answer Body */}
                <div
                  className={`transition-all duration-400 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-0 border-t border-stone-100">
                    <p className="font-['Inter',sans-serif] text-stone-600 text-sm sm:text-base leading-relaxed pt-3">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
