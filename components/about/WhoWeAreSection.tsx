"use client";

import React from "react";
import Image from "next/image";

export default function WhoWeAreSection() {
  return (
    <div className="who-we-are-white-section py-16 sm:py-24 bg-white relative z-20">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Grid: Left MD Card with Overlap + Right Text & MD Bio Card (Aligned straight at the bottom) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* LEFT: Managing Director Frame Card */}
          <div className="lg:col-span-5 relative z-20 reveal reveal-slide-up flex flex-col">
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl border-2 border-white/80 bg-black group w-full max-w-[460px] mx-auto h-full flex flex-col justify-between">
              
              {/* MD Photo */}
              <div className="w-full h-[480px] sm:h-[520px] lg:h-full min-h-[480px] lg:min-h-[560px] relative overflow-hidden bg-black">
                <Image
                  src="/assets/images/managing-director-sekar.jpg"
                  alt="Sekar - Managing Director, Vizhi Infragen Realtors LLP"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                {/* Subtle dark gradient at bottom for floating card contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none"></div>

                {/* Bottom Floating White Card: Sekar Managing Director */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-stone-200 shadow-2xl z-20">
                  <div className="flex items-center gap-3.5">
                    {/* 7+ Circle Badge */}
                    <div className="w-12 h-12 rounded-full bg-[#4E1421] text-[#c5a880] flex items-center justify-center text-base shrink-0 font-extrabold shadow-md font-['Outfit',sans-serif]">
                      7+
                    </div>
                    {/* Details */}
                    <div className="text-left">
                      <h4 className="font-bold text-base text-[#1E293B] font-['Outfit',sans-serif] leading-tight">
                        Mr. Sekar Balasubramaniam
                      </h4>
                      <p className="text-xs font-semibold text-[#612124] font-['Outfit',sans-serif] mt-0.5">
                        Managing Director
                      </p>
                      <p className="text-[11px] text-stone-500 font-['Inter',sans-serif] mt-0.5">
                        7+ Years of Leadership &amp; Excellence
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: Content on Crisp White Background */}
          <div className="lg:col-span-7 pt-2 sm:pt-4 space-y-6 text-left reveal reveal-slide-up flex flex-col justify-between h-full">
            
            {/* Top Content Block */}
            <div className="space-y-4 sm:space-y-5">
              {/* Pill Badge: • WHO WE ARE */}
              <div className="inline-flex items-center gap-2 bg-[#F9F6F0] border border-[#EBE3D5] px-3.5 py-1.5 rounded-full w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#612124]"></span>
                <span className="text-xs font-bold text-[#612124] uppercase tracking-[0.22em] font-['Inter',sans-serif]">
                  WHO WE ARE
                </span>
              </div>

              {/* Main Heading: Your Property. Your Vision. Our Commitment. */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold font-['Outfit',sans-serif] tracking-tight leading-[1.18]">
                <span className="text-[#612124] block">Your Property. Your Vision.</span>
                <span className="text-[#c5a880] block">Our Commitment.</span>
              </h2>

              {/* Small accent line */}
              <div className="w-12 h-[3px] bg-[#c5a880] rounded-full"></div>

              {/* Description Paragraph */}
              <p className="font-normal text-stone-600 text-sm sm:text-base leading-relaxed font-['Inter',sans-serif] max-w-2xl">
                Vizhi Infragen Realtors LLP provides comprehensive real estate solutions across Coimbatore and surrounding
                areas. We serve property owners, buyers, investors, corporate clients, and NRIs with professional property
                assistance and personalised service.
              </p>
            </div>

            {/* Bottom Card: ABOUT OUR MANAGING DIRECTOR (Last line content aligns straight with bottom of MD photo) */}
            <div className="rounded-2xl p-6 sm:p-7 border border-[#EFE9DF] bg-gradient-to-br from-[#FAF8F5] via-[#FFFDFB] to-[#F5EFE6] shadow-sm relative overflow-hidden mt-6 lg:mt-auto">
              {/* Subtle gold ambient glow in top-right of card */}
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#c5a880]/15 rounded-full blur-2xl pointer-events-none"></div>

              <span className="text-[#c5a880] text-[11px] font-bold uppercase tracking-[0.25em] block mb-1.5 font-['Inter',sans-serif]">
                ABOUT OUR MANAGING DIRECTOR
              </span>

              <h3 className="text-lg sm:text-xl font-bold font-['Outfit',sans-serif] mb-3">
                <span className="text-[#612124]">Mr. Sekar Balasubramaniam</span>
                <span className="text-stone-400 font-normal mx-1.5">|</span>
                <span className="text-stone-700 font-semibold text-base sm:text-lg">Managing Director</span>
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-['Inter',sans-serif]">
                With 7 years of real estate experience, Mr. Sekar Balasubramaniam leads Vizhi Infragen Realtors LLP with a
                focus on trust, transparency, and client satisfaction. A BNI member, JCI Secretary, national champion
                shooter, and state-level karate champion, he brings leadership, discipline, and determination to the
                business.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
