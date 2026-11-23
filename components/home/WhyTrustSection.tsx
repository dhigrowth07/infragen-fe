"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface WhyChooseCard {
  id: number;
  title: string;
  image: string;
}

const whyChooseCards: WhyChooseCard[] = [
  {
    id: 1,
    title: "TRANSPARENT DEALINGS",
    image: "/assets/images/val-transparency.jpg",
  },
  {
    id: 2,
    title: "GENUINE LOCAL EXPERTISE",
    image: "/assets/images/val-expertise.jpg",
  },
  {
    id: 3,
    title: "PERSONALISED SOLUTIONS",
    image: "/assets/images/why-personalised-solutions.jpg",
  },
  {
    id: 4,
    title: "END-TO-END SUPPORT",
    image: "/assets/images/key-handover.jpg",
  },
  {
    id: 5,
    title: "TRUSTED LOCAL NETWORK",
    image: "/assets/images/handshake-deal.jpg",
  },
  {
    id: 6,
    title: "STRONG MARKET KNOWLEDGE",
    image: "/assets/images/land-sales-hero-city.jpg",
  },
  {
    id: 7,
    title: "NRI-FRIENDLY SERVICES",
    image: "/assets/images/service-4.jpg",
  },
  {
    id: 8,
    title: "INVESTMENT-FOCUSED APPROACH",
    image: "/assets/images/land-development.jpg",
  },
];

export default function WhyTrustSection() {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const updateArrows = useCallback(() => {
    const track = scrollTrackRef.current;
    if (!track) return;
    const tolerance = 8;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    setIsAtStart(track.scrollLeft <= tolerance);
    setIsAtEnd(track.scrollLeft >= maxScroll - tolerance);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  const handlePrev = () => {
    if (scrollTrackRef.current) {
      const cardWidth = (scrollTrackRef.current.firstElementChild as HTMLElement)?.offsetWidth || 390;
      scrollTrackRef.current.scrollBy({ left: -(cardWidth + 24), behavior: "smooth" });
      setTimeout(updateArrows, 320);
    }
  };

  const handleNext = () => {
    if (scrollTrackRef.current) {
      const cardWidth = (scrollTrackRef.current.firstElementChild as HTMLElement)?.offsetWidth || 390;
      scrollTrackRef.current.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
      setTimeout(updateArrows, 320);
    }
  };

  return (
    <section
      id="why-choose"
      className="pt-10 sm:pt-12 lg:pt-14 pb-5 sm:pb-6 lg:pb-7 relative overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed text-white"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(23, 10, 14, 0.95) 0%, rgba(30, 13, 18, 0.97) 100%), url('/assets/images/hero-1.jpg')",
      }}
    >
      {/* Ambient dark lighting glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#612124]/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Matches Reference Image Layout) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5 text-left relative z-10 lg:-mt-3">
            {/* Large Background Watermark Text + H2 Title */}
            <div className="relative">
              <span className="absolute -top-10 left-0 text-6xl sm:text-7xl lg:text-8xl font-black text-white/[0.03] uppercase font-['Outfit',sans-serif] pointer-events-none select-none tracking-widest leading-none">
                WHY CHOOSE
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.12] sm:leading-[1.14] font-['Outfit',sans-serif] tracking-tight relative z-10">
                <span className="block">Why Property Owners</span>
                <span className="block">and Investors Choose</span>
                <span className="block text-[#c5a880]">Vizhi Infragen</span>
              </h2>
            </div>

            {/* Sub-paragraph */}
            <p className="text-stone-300 font-normal text-sm sm:text-base font-['Inter',sans-serif] max-w-md">
              As a trusted real estate company in Coimbatore, we have built our reputation on honesty and follow-through rather than sales pressure. Here&apos;s what sets us apart:
            </p>

            {/* Explore More Button */}
            <div className="pt-2">
              <Link
                href="/services"
                className="inline-flex items-center gap-2.5 bg-[#c5a880] hover:bg-[#b59870] text-[#231518] font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 font-['Inter',sans-serif]"
              >
                <span>Explore More</span>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: Horizontal Scrollable Cards with Special Arch Cut Corner Style */}
          <div className="lg:col-span-7 relative">
            <div
              ref={scrollTrackRef}
              id="why-choose-scroll-track"
              className="flex space-x-6 sm:space-x-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 sm:pb-4 pt-2 sm:pt-3 px-2 no-scrollbar"
              onScroll={updateArrows}
            >
              {whyChooseCards.map((card) => (
                <div
                  key={card.id}
                  className="min-w-[290px] sm:min-w-[350px] max-w-[390px] flex-shrink-0 snap-start group relative rounded-[24px] rounded-tr-[70px] overflow-hidden bg-stone-900 border border-white/20 shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="h-80 sm:h-96 w-full relative overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                    {/* Bottom Content inside Card: Headline Only */}
                    <div className="absolute bottom-0 inset-x-0 p-6">
                      <div className="text-left">
                        <h3 className="text-lg sm:text-xl font-bold text-white font-['Outfit',sans-serif] leading-tight uppercase tracking-wider">
                          {card.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Navigation Arrows */}
            <div className="flex items-center justify-end mt-3 sm:mt-4 px-2">
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={isAtStart}
                  className={`w-9 h-9 rounded-full bg-white/10 hover:bg-[#c5a880] hover:text-[#231518] text-white flex items-center justify-center transition-all border border-white/20 ${
                    isAtStart ? "opacity-30 cursor-not-allowed pointer-events-none" : "cursor-pointer"
                  }`}
                  aria-label="Previous"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isAtEnd}
                  className={`w-9 h-9 rounded-full bg-white/10 hover:bg-[#c5a880] hover:text-[#231518] text-white flex items-center justify-center transition-all border border-white/20 ${
                    isAtEnd ? "opacity-30 cursor-not-allowed pointer-events-none" : "cursor-pointer"
                  }`}
                  aria-label="Next"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
