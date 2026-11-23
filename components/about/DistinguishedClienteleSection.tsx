"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface BubbleItem {
  name: string;
  icon: string;
  maxW?: string;
}

interface ClientCard {
  id: number;
  title: string;
  medallionIcon: string;
  bubblesRow1: BubbleItem[];
  bubblesRow2: BubbleItem[];
}

const CLIENT_CARDS: ClientCard[] = [
  {
    id: 0,
    title: "Professionals",
    medallionIcon: "fa-solid fa-user-doctor",
    bubblesRow1: [
      { name: "Doctors", icon: "fa-solid fa-stethoscope" },
      { name: "Healthcare Professionals", icon: "fa-solid fa-heart-pulse" },
      { name: "Judiciary Members", icon: "fa-solid fa-scale-balanced" },
      { name: "Legal Professionals", icon: "fa-solid fa-gavel" },
    ],
    bubblesRow2: [
      { name: "Chartered Accountants", icon: "fa-solid fa-calculator", maxW: "max-w-[140px]" },
      { name: "Architects & Consultants", icon: "fa-solid fa-compass-drafting", maxW: "max-w-[150px]" },
    ],
  },
  {
    id: 1,
    title: "Investors & Business Leaders",
    medallionIcon: "fa-solid fa-arrow-trend-up",
    bubblesRow1: [
      { name: "High-Net-Worth Individuals", icon: "fa-solid fa-gem" },
      { name: "Individual & Institutional Investors", icon: "fa-solid fa-handshake" },
      { name: "Industrialists & Entrepreneurs", icon: "fa-solid fa-industry" },
    ],
    bubblesRow2: [
      { name: "Business Owners", icon: "fa-solid fa-briefcase", maxW: "max-w-[140px]" },
      { name: "Corporate & MNC Executives", icon: "fa-solid fa-users", maxW: "max-w-[150px]" },
    ],
  },
  {
    id: 2,
    title: "Global & Institutional Clients",
    medallionIcon: "fa-solid fa-globe",
    bubblesRow1: [
      { name: "NRIs & Overseas Property Owners", icon: "fa-solid fa-plane-departure" },
      { name: "International Investors", icon: "fa-solid fa-earth-americas" },
      { name: "Corporate Organisations", icon: "fa-solid fa-city" },
    ],
    bubblesRow2: [
      { name: "Commercial & Institutional Buyers", icon: "fa-solid fa-handshake-simple", maxW: "max-w-[150px]" },
      { name: "Developers & Business Groups", icon: "fa-solid fa-building", maxW: "max-w-[150px]" },
    ],
  },
];

export default function DistinguishedClienteleSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const total = CLIENT_CARDS.length;

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const touchStartX = useRef(0);

  const autoPlayInterval = 4600;
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  const goTo = useCallback((idx: number) => {
    elapsedRef.current = 0;
    lastTimeRef.current = null;
    fillRefs.current.forEach((fill) => {
      if (fill) fill.style.transform = "scaleX(0)";
    });
    setActiveIndex(((idx % total) + total) % total);
  }, [total]);

  const next = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const prev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  // Autoplay loop using requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!isHovered) {
        if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
        const delta = timestamp - lastTimeRef.current;
        lastTimeRef.current = timestamp;
        elapsedRef.current += delta;

        const progress = Math.min(elapsedRef.current / autoPlayInterval, 1);
        const activeFill = fillRefs.current[activeIndex];
        if (activeFill) {
          activeFill.style.transform = `scaleX(${progress})`;
        }

        if (elapsedRef.current >= autoPlayInterval) {
          elapsedRef.current = 0;
          lastTimeRef.current = null;
          setActiveIndex((prevIdx) => (prevIdx + 1) % total);
        }
      } else {
        lastTimeRef.current = null;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [activeIndex, isHovered, total, autoPlayInterval]);

  // Reset other tab fills when active index changes
  useEffect(() => {
    fillRefs.current.forEach((fill, idx) => {
      if (fill && idx !== activeIndex) {
        fill.style.transform = "scaleX(0)";
      }
    });
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        if (e.key === "ArrowRight") next();
        else if (e.key === "ArrowLeft") prev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.changedTouches && e.changedTouches[0]) {
      touchStartX.current = e.changedTouches[0].screenX;
    }
    setIsHovered(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches && e.changedTouches[0]) {
      const diff = e.changedTouches[0].screenX - touchStartX.current;
      if (diff > 45) prev();
      else if (diff < -45) next();
    }
    setIsHovered(false);
    lastTimeRef.current = null;
  };

  return (
    <section
      id="who-we-serve"
      ref={sectionRef}
      className="clientele-section py-20 sm:py-28 px-4 sm:px-10 lg:px-16 relative overflow-hidden bg-white border-t border-[#C5A880]/20"
    >
      {/* Ambient Animated Subtle Glow Lights (#331C20 & #C5A880) */}
      <div className="absolute -top-12 left-1/4 w-[420px] h-[420px] bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none ambient-glow-gold"></div>
      <div className="absolute -bottom-12 right-1/4 w-[450px] h-[450px] bg-[#331C20]/5 rounded-full blur-3xl pointer-events-none ambient-glow-burgundy"></div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 reveal reveal-slide-up">
          {/* Top Label with Accent Lines & Stars */}
          <div className="flex items-center justify-center gap-3 mb-2.5">
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C5A880]"></div>
            <i className="fa-solid fa-sparkle text-[11px] text-[#C5A880]"></i>
            <span className="font-['Inter',sans-serif] text-xs sm:text-[13px] font-bold tracking-[0.28em] text-[#331C20] uppercase">
              OUR CLIENTS
            </span>
            <i className="fa-solid fa-sparkle text-[11px] text-[#C5A880]"></i>
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C5A880]"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold font-['Outfit',sans-serif] text-[#331C20] tracking-tight leading-tight">
            Tailored Real Estate Solutions for{" "}
            <span className="text-[#C5A880] drop-shadow-sm">Distinct Client Profiles</span>
          </h2>

          <p className="text-stone-500 font-['Inter',sans-serif] text-xs sm:text-[13px] font-semibold tracking-[0.22em] uppercase mt-2.5">
            A Diverse Ecosystem of Trusted Clients
          </p>
        </div>

        {/* Connected Carousel Container */}
        <div
          id="conn-carousel-container"
          ref={containerRef}
          className="conn-carousel-container relative px-2 sm:px-6"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Desktop Floating Arrow Buttons (Left & Right) */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous client profile"
            className="conn-arrow-btn conn-arrow-btn-desktop absolute left-1 xl:-left-6 top-1/2 -translate-y-1/2 z-30 !hidden md:!flex"
          >
            <i className="fa-solid fa-chevron-left text-sm"></i>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next client profile"
            className="conn-arrow-btn conn-arrow-btn-desktop absolute right-1 xl:-right-6 top-1/2 -translate-y-1/2 z-30 !hidden md:!flex"
          >
            <i className="fa-solid fa-chevron-right text-sm"></i>
          </button>

          {/* Connected Viewport with 3 Ecosystem Cards */}
          <div id="conn-viewport" className="conn-viewport">
            {CLIENT_CARDS.map((card) => {
              let offset = card.id - activeIndex;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              return (
                <div
                  key={card.id}
                  className="conn-card group"
                  data-card-index={card.id}
                  data-offset={offset}
                  onClick={() => {
                    if (offset !== 0) goTo(card.id);
                  }}
                  onMouseEnter={() => {
                    if (offset === 0) setIsHovered(true);
                  }}
                  onMouseLeave={() => {
                    setIsHovered(false);
                    lastTimeRef.current = null;
                  }}
                >
                  <div className="conn-card-body">
                    {/* Top Section: Glowing Concentric Medallion Orb */}
                    <div className="relative w-20 h-20 sm:w-28 sm:h-28 mx-auto flex items-center justify-center shrink-0">
                      {/* Concentric Gold Orbitals */}
                      <div className="absolute inset-0 rounded-full border border-[#C5A880]/40"></div>
                      <div className="absolute -inset-1 sm:-inset-1.5 rounded-full border border-dashed border-[#C5A880]/30 animate-[spin_30s_linear_infinite]"></div>
                      {/* Sparkle nodes */}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-[#C5A880] shadow-[0_0_8px_#C5A880]"></div>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-[#C5A880] shadow-[0_0_8px_#C5A880]"></div>

                      {/* Burgundy & Gold Medallion with Center Icon */}
                      <div className="w-[62px] h-[62px] sm:w-[86px] sm:h-[86px] rounded-full bg-gradient-to-br from-[#4A262E] via-[#331C20] to-[#200E12] border-2 border-[#C5A880] shadow-[0_10px_25px_rgba(51,28,32,0.35),0_0_20px_rgba(197,168,128,0.4)] flex items-center justify-center text-white">
                        <i className={`${card.medallionIcon} text-xl sm:text-3xl text-white drop-shadow-sm`}></i>
                      </div>
                    </div>

                    {/* Title Pill with Flanking Gold Lines */}
                    <div className="flex items-center justify-center gap-2 sm:gap-3 my-1.5 sm:my-2 shrink-0">
                      <div className="w-6 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C5A880]"></div>
                      <div className="px-3.5 sm:px-5 py-0.5 sm:py-1 rounded-full bg-white border border-[#C5A880]/70 shadow-sm max-w-[85%] text-center">
                        <h3 className="text-xs sm:text-base font-bold font-['Outfit',sans-serif] text-[#331C20] tracking-wide">
                          {card.title}
                        </h3>
                      </div>
                      <div className="w-6 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C5A880]"></div>
                    </div>

                    {/* Micro-Icon Bubbles Container */}
                    <div className="w-full flex flex-col justify-center gap-3 sm:gap-4 my-auto">
                      {/* Row 1 */}
                      <div
                        className={`grid ${
                          card.bubblesRow1.length === 4
                            ? "grid-cols-4 gap-1 sm:gap-2 md:gap-3 px-0.5 sm:px-1"
                            : "grid-cols-3 gap-1.5 sm:gap-3 md:gap-4 px-1 sm:px-2"
                        } items-start justify-items-center w-full`}
                      >
                        {card.bubblesRow1.map((bubble) => (
                          <div key={bubble.name} className="flex flex-col items-center gap-1 sm:gap-1.5 text-center group/bubble w-full min-w-0">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full bg-gradient-to-b from-[#FDFBF7] to-white border border-[#C5A880]/50 shadow-sm flex items-center justify-center text-[#331C20] shrink-0 group-hover/bubble:border-[#C5A880] group-hover/bubble:bg-[#331C20] group-hover/bubble:text-[#C5A880] group-hover/bubble:scale-110 transition-all duration-300">
                              <i className={`${bubble.icon} text-xs sm:text-sm md:text-base`}></i>
                            </div>
                            <span className="text-[10px] sm:text-[11px] md:text-xs lg:text-[13px] xl:text-sm font-bold font-['Inter',sans-serif] text-[#331C20] leading-[1.2] sm:leading-tight tracking-tight text-center w-full break-words px-0.5">
                              {bubble.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Row 2 */}
                      <div className="flex justify-center items-start gap-4 sm:gap-8 md:gap-12 w-full px-2 sm:px-6">
                        {card.bubblesRow2.map((bubble) => (
                          <div key={bubble.name} className="flex flex-col items-center gap-1 sm:gap-1.5 text-center group/bubble max-w-[130px] sm:max-w-[150px]">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full bg-gradient-to-b from-[#FDFBF7] to-white border border-[#C5A880]/50 shadow-sm flex items-center justify-center text-[#331C20] shrink-0 group-hover/bubble:border-[#C5A880] group-hover/bubble:bg-[#331C20] group-hover/bubble:text-[#C5A880] group-hover/bubble:scale-110 transition-all duration-300">
                              <i className={`${bubble.icon} text-xs sm:text-sm md:text-base`}></i>
                            </div>
                            <span
                              className={`text-[10.5px] sm:text-[11.5px] md:text-xs lg:text-[13px] xl:text-sm font-bold font-['Inter',sans-serif] text-[#331C20] leading-[1.2] sm:leading-tight tracking-tight text-center w-full break-words px-0.5 ${
                                bubble.maxW || "max-w-[140px]"
                              }`}
                            >
                              {bubble.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Curved Arc Boundary with Golden Node */}
                    <div className="pt-2 flex items-center justify-center relative shrink-0">
                      <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/50 to-transparent"></div>
                      <div className="w-2 h-2 rounded-full bg-[#331C20] border border-[#C5A880] absolute top-2 left-1/2 -translate-x-1/2 shadow-sm"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Tabs (Animated Fill Indicator) */}
          <div
            className="flex items-center justify-center gap-3 mt-4 sm:mt-6"
            id="conn-tablist"
            role="tablist"
            aria-label="Client Profiles"
          >
            <button
              type="button"
              onClick={prev}
              aria-label="Previous profile"
              className="conn-arrow-btn md:!hidden !w-9 !h-9 text-xs"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="flex items-center gap-2">
              {CLIENT_CARDS.map((card, idx) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => goTo(idx)}
                  className={`conn-tab ${idx === activeIndex ? "active" : ""}`}
                  role="tab"
                  aria-selected={idx === activeIndex}
                  aria-label={card.title}
                >
                  <div
                    ref={(el) => {
                      fillRefs.current[idx] = el;
                    }}
                    className="conn-tab-fill"
                  ></div>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next profile"
              className="conn-arrow-btn md:!hidden !w-9 !h-9 text-xs"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
