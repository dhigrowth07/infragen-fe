"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/data/services";

export default function ServicesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const isPausedRef = useRef(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateArrows = useCallback(() => {
    const track = scrollRef.current;
    if (!track) return;
    const tolerance = 8;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const currentScroll = track.scrollLeft;
    setIsAtStart(currentScroll <= tolerance);
    setIsAtEnd(currentScroll >= maxScroll - tolerance);
  }, []);

  const getStep = () => {
    if (!scrollRef.current) return 390;
    const firstCard = scrollRef.current.querySelector(".service-float-card") as HTMLElement | null;
    return firstCard ? firstCard.offsetWidth + 24 : 390;
  };

  const pauseAutoRun = (duration = 5000) => {
    isPausedRef.current = true;
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, duration);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      pauseAutoRun(6000);
      scrollRef.current.style.scrollBehavior = "smooth";
      scrollRef.current.scrollBy({ left: -getStep(), behavior: "smooth" });
      setTimeout(updateArrows, 350);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      pauseAutoRun(6000);
      scrollRef.current.style.scrollBehavior = "smooth";
      scrollRef.current.scrollBy({ left: getStep(), behavior: "smooth" });
      setTimeout(updateArrows, 350);
    }
  };

  useEffect(() => {
    updateArrows();
    const track = scrollRef.current;
    if (!track) return;

    let autoRunRAF: number;
    const runSpeed = 0.85;

    function autoRunStep() {
      if (!isPausedRef.current && track) {
        const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
        if (maxScroll > 10) {
          if (track.scrollLeft >= maxScroll - 4) {
            updateArrows();
            isPausedRef.current = true;
            setTimeout(() => {
              if (track) {
                track.style.scrollBehavior = "smooth";
                track.scrollTo({ left: 0, behavior: "smooth" });
                setTimeout(() => {
                  isPausedRef.current = false;
                  updateArrows();
                }, 900);
              }
            }, 3000);
          } else {
            track.style.scrollBehavior = "auto";
            track.scrollLeft += runSpeed;
            updateArrows();
          }
        }
      }
      autoRunRAF = requestAnimationFrame(autoRunStep);
    }

    autoRunRAF = requestAnimationFrame(autoRunStep);
    window.addEventListener("resize", updateArrows);

    return () => {
      cancelAnimationFrame(autoRunRAF);
      window.removeEventListener("resize", updateArrows);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [updateArrows]);

  return (
    <section id="services" className="py-24 overflow-hidden relative bg-[#fdfbf7]">
      <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 reveal reveal-slide-up">
          <span className="text-[#c5a880] font-['Inter',sans-serif] font-bold tracking-[0.2em] text-xs sm:text-sm uppercase mb-2 block">
            EXPERT REAL ESTATE SOLUTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-['Outfit',sans-serif] text-[#612124] font-extrabold leading-tight">
            Our Real Estate Services in Coimbatore
          </h2>
        </div>

        {/* Slider Container */}
        <div className="relative w-full pt-8 pb-12">
          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            disabled={isAtStart}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md text-[#612124] border border-[#612124]/30 hover:bg-[#612124] hover:text-white shadow-2xl flex items-center justify-center transition-all ${
              isAtStart ? "opacity-30 cursor-not-allowed pointer-events-none" : "cursor-pointer"
            }`}
            aria-label="Previous Service"
          >
            <i className="fa-solid fa-chevron-left text-lg"></i>
          </button>

          <button
            onClick={scrollRight}
            disabled={isAtEnd}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md text-[#612124] border border-[#612124]/30 hover:bg-[#612124] hover:text-white shadow-2xl flex items-center justify-center transition-all ${
              isAtEnd ? "opacity-30 cursor-not-allowed pointer-events-none" : "cursor-pointer"
            }`}
            aria-label="Next Service"
          >
            <i className="fa-solid fa-chevron-right text-lg"></i>
          </button>

          {/* Slider Track */}
          <div
            ref={scrollRef}
            id="services-track"
            onScroll={updateArrows}
            onMouseEnter={() => { isPausedRef.current = true; }}
            onMouseLeave={() => pauseAutoRun(1200)}
            onTouchStart={() => { isPausedRef.current = true; }}
            onTouchEnd={() => pauseAutoRun(2500)}
            className="flex items-stretch overflow-x-auto scroll-smooth no-scrollbar px-2 sm:px-4 py-6 min-h-[560px] relative"
          >
            <div className="flex items-stretch space-x-6 sm:space-x-8 pr-6 sm:pr-8">
              {servicesData.map((service) => (
                <div
                  key={service.id}
                  className="snap-start min-w-[280px] sm:min-w-[350px] md:min-w-[370px] max-w-[380px] shrink-0 flex flex-col items-center text-center justify-between service-float-card floating-bob-card bg-white p-6 rounded-[22px] shadow-sm border border-stone-200/80 hover:shadow-xl hover:border-[#c5a880]/60 transition-all"
                  style={{ animationDelay: service.delay }}
                >
                  <div className="w-full flex flex-col items-center">
                    <div className="w-full aspect-[4/3] rounded-[18px] overflow-hidden shadow-md border border-stone-200 bg-stone-900 mb-5 relative">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#612124] font-['Outfit',sans-serif] mb-1">
                      {service.title}
                    </h3>

                    <span className="text-xs font-bold text-[#c5a880] uppercase tracking-[0.18em] font-['Inter',sans-serif] mb-3 block">
                      {service.subtitle}
                    </span>

                    <div className="flex items-center justify-center gap-4 text-xs font-semibold text-stone-500 py-2 border-t border-b border-stone-200/80 w-full mb-3 font-['Inter',sans-serif]">
                      <span>
                        <i className={`fa-solid ${service.icon1} text-[#c5a880] mr-1`}></i>
                        {service.badge1}
                      </span>
                      <span>
                        <i className={`fa-solid ${service.icon2} text-[#c5a880] mr-1`}></i>
                        {service.badge2}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed font-['Inter',sans-serif]">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Read More Button */}
        <div className="mt-4 text-center reveal reveal-slide-up">
          <Link
            href="/services"
            className="inline-block border-2 border-[#612124] text-[#612124] hover:bg-[#612124] hover:text-white px-9 py-4 rounded-none font-bold text-xs tracking-[0.25em] transition-all duration-300 uppercase shadow-sm hover:shadow-md hover:-translate-y-0.5 font-['Inter',sans-serif]"
          >
            READ MORE
          </Link>
        </div>

      </div>
    </section>
  );
}
