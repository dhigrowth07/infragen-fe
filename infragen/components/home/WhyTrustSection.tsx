"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ResidenceCard {
  id: number;
  category: string;
  title: string;
  image: string;
}

const residenceCards: ResidenceCard[] = [
  {
    id: 1,
    category: "TRANSPARENT DEALINGS",
    title: "Clear documentation, honest pricing, no hidden surprises.",
    image: "/assets/images/hero-3.jpg",
  },
  {
    id: 2,
    category: "GENUINE LOCAL EXPERTISE",
    title: "First-hand knowledge of Coimbatore's micro-markets and approval bodies.",
    image: "/assets/images/hero-4.jpg",
  },
  {
    id: 3,
    category: "PERSONALISED SOLUTIONS",
    title: "Advice shaped around your budget, timeline, and objectives.",
    image: "/assets/images/hero-5.jpg",
  },
  {
    id: 4,
    category: "END-TO-END SUPPORT",
    title: "From site selection and documentation to handover and ongoing management.",
    image: "/assets/images/land-development.jpg",
  },
  {
    id: 5,
    category: "TRUSTED LOCAL NETWORK",
    title: "Verified contacts across legal, survey, banking, and construction.",
    image: "/assets/images/carousel-villa-1.jpg",
  },
  {
    id: 6,
    category: "STRONG MARKET KNOWLEDGE",
    title: "Data-backed guidance on where, when, and how to invest.",
    image: "/assets/images/carousel-villa-2.jpg",
  },
  {
    id: 7,
    category: "NRI-FRIENDLY SERVICES",
    title: "Built specifically for owners managing property from overseas.",
    image: "/assets/images/carousel-villa-3.jpg",
  },
  {
    id: 8,
    category: "INVESTMENT-FOCUSED APPROACH",
    title: "Every recommendation weighed for long-term return, not a quick deal.",
    image: "/assets/images/carousel-villa-4.jpg",
  },
];

export default function WhyTrustSection() {
  return (
    <section
      id="why-trust-section"
      className="py-24 sm:py-32 relative overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed text-white"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(23, 13, 16, 0.93) 0%, rgba(35, 18, 22, 0.96) 100%), url('/assets/images/hero-1.jpg')",
      }}
    >
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#612124]/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6 text-left relative z-10">
            {/* Step Badge 02 */}
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-white/10 border border-white/25 backdrop-blur-md flex items-center justify-center font-extrabold text-xl text-[#c5a880] font-['Outfit',sans-serif] shadow-lg">
                02
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#c5a880]"></div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-stone-300 font-['Inter',sans-serif]">
                WHY CHOOSE VIZHI INFRAGEN
              </span>
            </div>

            {/* Watermark & Title */}
            <div className="relative">
              <span className="absolute -top-10 left-0 text-6xl sm:text-8xl font-black text-white/[0.04] uppercase font-['Outfit',sans-serif] pointer-events-none select-none tracking-widest">
                WHY TRUST
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-['Outfit',sans-serif] tracking-tight relative z-10">
                Why Property Owners and Investors Choose <span className="text-[#c5a880]">Vizhi Infragen</span>
              </h2>
            </div>

            <p className="text-stone-300 font-medium text-base sm:text-lg leading-relaxed font-['Inter',sans-serif] max-w-xl">
              As a trusted real estate company in Coimbatore, we have built our reputation on honesty and follow-through rather than sales pressure. Here's what sets us apart:
            </p>

            <div className="pt-2">
              <Link
                href="#contact"
                className="inline-flex items-center gap-3 bg-[#c5a880] hover:bg-[#b59870] text-[#231518] font-bold px-8 py-4 rounded-xl text-base transition-all duration-300 shadow-xl transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <span>Explore More</span>
                <i className="fa-solid fa-arrow-right text-sm"></i>
              </Link>
            </div>
          </div>

          {/* Right Column: Horizontal Scroll Track */}
          <div className="lg:col-span-7 relative">
            <div
              id="projects-horizontal-track"
              className="flex space-x-6 sm:space-x-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-4 px-2 no-scrollbar"
            >
              {residenceCards.map((card) => (
                <div
                  key={card.id}
                  className="min-w-[280px] sm:min-w-[340px] max-w-[360px] flex-shrink-0 snap-start group relative rounded-[24px] rounded-tr-[70px] overflow-hidden bg-stone-900 border border-white/20 shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="h-80 sm:h-96 w-full relative overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#231518]/95 via-[#231518]/45 to-transparent"></div>

                    <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between">
                      <div className="text-left space-y-1.5 pr-2">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#c5a880] font-['Inter',sans-serif] block">
                          {card.category}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit',sans-serif] leading-snug">
                          {card.title}
                        </h3>
                      </div>

                      <Link
                        href="#contact"
                        className="w-11 h-11 rounded-full bg-[#c5a880] hover:bg-white text-[#231518] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0"
                      >
                        <i className="fa-solid fa-arrow-right text-sm"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Dots */}
            <div className="flex items-center justify-center space-x-3 mt-6">
              <div className="w-12 h-1 bg-[#c5a880] rounded-full"></div>
              <div className="w-8 h-1 bg-white/20 rounded-full"></div>
              <div className="w-8 h-1 bg-white/20 rounded-full"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


