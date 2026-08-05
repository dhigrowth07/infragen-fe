"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#fbf9f5] overflow-hidden relative border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20 reveal reveal-slide-up">
          <span className="text-[#c5a880] font-['Inter',sans-serif] text-xs sm:text-sm font-bold uppercase tracking-[0.25em] mb-4 block">
            ABOUT US
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-['Outfit',sans-serif] text-[#612124] font-extrabold tracking-tight leading-[1.15]">
            Rooted in Excellence,<br />Growing with Vision
          </h2>
          <div className="w-12 h-[2.5px] bg-[#c5a880] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Main 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">

          {/* Left Column: Image with 3D Backside Layer & "6+ YEARS OF LEGACY" Badge */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end reveal reveal-slide-right">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] overflow-visible group [perspective:1000px]">
              
              {/* 3D Backside Layer Accent Frames */}
              <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-[#612124]/40 via-[#c5a880]/30 to-[#612124]/10 rounded-[28px] transform -rotate-6 scale-105 border-2 border-[#c5a880]/50 shadow-2xl backdrop-blur-sm group-hover:-rotate-3 group-hover:scale-110 transition-all duration-700 pointer-events-none z-0"></div>
              <div className="absolute -inset-2 sm:-inset-3 bg-[#612124]/30 rounded-[24px] transform rotate-3 shadow-xl border border-white/40 group-hover:rotate-1 transition-all duration-700 pointer-events-none z-0"></div>
              <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-[#c5a880]/20 blur-xl pointer-events-none"></div>

              {/* Main Image */}
              <div className="w-full h-full overflow-hidden shadow-[0_25px_60px_-15px_rgba(97,33,36,0.35)] border-4 border-white bg-stone-900 relative rounded-xl z-10 transform transition-transform duration-700 group-hover:-translate-y-2">
                <Image
                  src="/assets/images/hero-3.jpg"
                  alt="Vizhi Infragen Modern Architecture & Property Legacy"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Overlapping Badge: "6+ YEARS OF LEGACY" */}
              <div className="absolute -bottom-6 -right-3 sm:-right-8 bg-[#612124] text-white p-6 sm:p-7 shadow-2xl border border-white/20 z-20 min-w-[170px] sm:min-w-[190px] rounded-sm">
                <span className="text-4xl sm:text-5xl font-black text-[#c5a880] font-['Outfit',sans-serif] leading-none block mb-1.5">
                  6+
                </span>
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.18em] text-stone-200 uppercase font-['Inter',sans-serif] block leading-tight">
                  YEARS OF LEGACY
                </span>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative Story & Button */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center gap-6 reveal reveal-slide-left pt-6 lg:pt-0">
            <p className="text-[#555555] font-['Outfit',sans-serif] text-base sm:text-lg leading-relaxed sm:leading-8 font-normal">
              <strong className="text-[#612124] font-semibold">Vizhi Infragen Realtors LLP</strong> is a trusted real estate and property management company in Coimbatore. Established in 1998, the company has built a strong reputation through decades of experience in the real estate industry. Today, the business is proudly carried forward by the second generation, combining traditional values with modern real estate expertise. We help individuals, investors, businesses, and NRI clients buy, sell, manage, and develop properties. Our deep local knowledge, transparent approach, and reliable guidance ensure every client makes confident and informed real estate decisions.
            </p>

            <div className="pt-2">
              <Link
                href="#contact"
                className="inline-block border-2 border-[#612124] text-[#612124] hover:bg-[#612124] hover:text-white px-8 py-3.5 rounded-none font-bold text-xs tracking-[0.2em] transition-all duration-300 uppercase shadow-sm hover:shadow-md hover:-translate-y-0.5 font-['Inter',sans-serif]"
              >
                READ OUR STORY
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
