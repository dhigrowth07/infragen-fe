"use client";

import React from "react";
import Image from "next/image";

export default function WhoWeAreSection() {
  return (
    <div className="relative bg-white pb-20 sm:pb-28 z-20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Overlapping Image Card */}
          <div className="lg:col-span-5 relative -mt-16 sm:-mt-20 z-30 reveal-slide-right">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white group w-full max-h-[760px]">
              <div className="relative h-[620px] sm:h-[720px] w-full">
                <Image
                  src="/assets/images/experience.jpg"
                  alt="Vizhi Infragen Team Consultation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200 shadow-2xl animate-bob">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#4E1421] text-[#c5a880] flex items-center justify-center text-lg shrink-0 font-extrabold shadow-md font-['Outfit',sans-serif]">
                    7+
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#1E293B] font-['Outfit',sans-serif]">Years of Excellence</h4>
                    <p className="text-xs text-stone-500 font-['Inter',sans-serif]">Guiding buyers, sellers &amp; NRI property owners</p>
                  </div>
                </div>
              </div>

              {/* Top Location Tag */}
              <div className="absolute top-5 left-5 bg-[#381e23]/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-[#c5a880]/40">
                <span className="text-[#c5a880] text-[10px] font-bold font-['Inter',sans-serif] tracking-wider uppercase">
                  Coimbatore, Tamil Nadu
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Story */}
          <div className="lg:col-span-7 pt-6 lg:pt-10 reveal-slide-left">
            <span className="text-[#c5a880] font-['Inter',sans-serif] text-xs font-bold tracking-[0.28em] uppercase block mb-3">
              WHO WE ARE
            </span>

            <h2
              className="font-bold font-['Outfit',sans-serif] mb-4 text-[#612124] text-2xl sm:text-3xl lg:text-4xl leading-tight"
            >
              Professional Real Estate &amp; Property Management Expertise
            </h2>

            <div className="w-14 h-1 bg-[#c5a880] rounded-full mb-6"></div>

            <div className="space-y-5 font-['Inter',sans-serif] leading-[1.85] text-stone-600 text-sm sm:text-base">
              <p>
                Vizhi Infragen Realtors LLP is a professional real estate and property management company based in Coimbatore, Tamil Nadu. We help individuals, investors, corporates, and NRI clients buy, sell, manage, and develop property with complete transparency and dependable, hands-on expertise.
              </p>
              <p>
                Real estate is rarely just a transaction. It is a home, a retirement plan, an inheritance, or a business decision that affects a family for years. We built Vizhi Infragen around that reality to take the uncertainty out of property dealings in Coimbatore and replace it with clear advice, honest documentation, and follow-through you can rely on.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
