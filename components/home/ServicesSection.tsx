"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/data/services";

export default function ServicesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -390, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 390, behavior: "smooth" });
    }
  };

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
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md text-[#612124] border border-[#612124]/30 hover:bg-[#612124] hover:text-white shadow-2xl flex items-center justify-center transition-all cursor-pointer"
            aria-label="Previous Service"
          >
            <i className="fa-solid fa-chevron-left text-lg"></i>
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md text-[#612124] border border-[#612124]/30 hover:bg-[#612124] hover:text-white shadow-2xl flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next Service"
          >
            <i className="fa-solid fa-chevron-right text-lg"></i>
          </button>

          {/* Marquee Track */}
          <div
            ref={scrollRef}
            className="flex items-stretch overflow-hidden no-scrollbar px-0 py-6 min-h-[560px] relative scroll-smooth"
          >
            <div className="infinite-marquee-track flex items-stretch space-x-6 sm:space-x-8 pr-6 sm:pr-8">
              {/* Set 1 & Set 2 Duplicated for Seamless Infinite Loop */}
              {[...servicesData, ...servicesData].map((service, idx) => (
                <div
                  key={`${service.id}-${idx}`}
                  className="min-w-[320px] sm:min-w-[370px] max-w-[380px] shrink-0 flex flex-col items-center text-center justify-between service-float-card floating-bob-card bg-white p-6 rounded-[22px] shadow-sm border border-stone-200/80"
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
            href="#contact"
            className="inline-block border-2 border-[#612124] text-[#612124] hover:bg-[#612124] hover:text-white px-9 py-4 rounded-none font-bold text-xs tracking-[0.25em] transition-all duration-300 uppercase shadow-sm hover:shadow-md hover:-translate-y-0.5 font-['Inter',sans-serif]"
          >
            READ MORE
          </Link>
        </div>

      </div>
    </section>
  );
}
