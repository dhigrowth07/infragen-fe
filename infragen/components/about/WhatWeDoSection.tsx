"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface SecondaryService {
  title: string;
  img: string;
}

const secondaryServices: SecondaryService[] = [
  { title: "Building Construction", img: "/assets/images/service-5.jpg" },
  { title: "Building Valuation", img: "/assets/images/service-6.jpg" },
  { title: "Land Approvals", img: "/assets/images/service-7.jpg" },
  { title: "Rental Services", img: "/assets/images/service-8.jpg" },
  { title: "Warehouse & Corporate", img: "/assets/images/service-9.jpg" },
];

export default function WhatWeDoSection() {
  return (
    <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#FDFBF7] overflow-hidden border-t border-stone-200">
      <div className="max-w-[1440px] mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 reveal-slide-up">
          <span className="text-[#c5a880] font-['Inter',sans-serif] text-xs font-bold tracking-[0.2em] uppercase block">
            COMPREHENSIVE OFFERINGS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] font-['Outfit',sans-serif] tracking-tight">
            What We Do
          </h2>
          <div className="w-16 h-1 bg-[#c5a880] mx-auto rounded-full"></div>
          <p className="text-stone-600 text-xs sm:text-sm font-['Inter',sans-serif] max-w-xl mx-auto">
            We offer a complete range of property services so you never have to coordinate multiple agencies.
          </p>
        </div>

        {/* Primary Photo Grid (Matching Screenshot Bento Layout Exactly) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Left Column: Tall Card - Land Sales */}
          <Link
            href="/#services"
            className="relative overflow-hidden rounded-2xl cursor-pointer group h-[360px] md:h-[440px] shadow-lg border border-stone-200/60"
          >
            <Image
              src="/assets/images/service-1.jpg"
              alt="Land Sales"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E080E]/90 via-[#1E080E]/25 to-transparent group-hover:from-[#1E080E]/95 transition-all duration-300"></div>

            <div className="absolute bottom-0 left-0 right-0 p-6 font-['Inter',sans-serif]">
              <div className="flex items-end justify-between">
                <div>
                  <h4 className="text-white font-extrabold text-xl font-['Outfit',sans-serif]">
                    Land Sales
                  </h4>
                  <p className="text-stone-300 text-xs font-['Inter',sans-serif] mt-0.5">
                    DTCP &amp; RERA verified plots
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#c5a880]/20 border border-[#c5a880]/50 text-[#c5a880] group-hover:bg-[#c5a880] group-hover:text-[#381e23] flex items-center justify-center transition-all duration-300 shrink-0">
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </div>
              </div>
            </div>
          </Link>

          {/* Middle Column: Stacked 2 Cards - Purchase Assistance & NRI Property Shield */}
          <div className="flex flex-col gap-5 h-[360px] md:h-[440px]">
            {/* Top Card: Purchase Assistance */}
            <Link
              href="/#services"
              className="relative overflow-hidden rounded-2xl cursor-pointer group flex-1 shadow-lg border border-stone-200/60"
            >
              <Image
                src="/assets/images/service-2.jpg"
                alt="Purchase Assistance"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E080E]/90 via-[#1E080E]/25 to-transparent group-hover:from-[#1E080E]/95 transition-all duration-300"></div>

              <div className="absolute bottom-0 left-0 right-0 p-5 font-['Inter',sans-serif]">
                <div className="flex items-end justify-between">
                  <div>
                    <h4 className="text-white font-extrabold text-lg font-['Outfit',sans-serif]">
                      Purchase Assistance
                    </h4>
                    <p className="text-stone-300 text-xs font-['Inter',sans-serif] mt-0.5">
                      End-to-end guidance
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#c5a880]/20 border border-[#c5a880]/50 text-[#c5a880] group-hover:bg-[#c5a880] group-hover:text-[#381e23] flex items-center justify-center transition-all duration-300 shrink-0">
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </div>
                </div>
              </div>
            </Link>

            {/* Bottom Card: NRI Property Shield */}
            <Link
              href="/#services"
              className="relative overflow-hidden rounded-2xl cursor-pointer group flex-1 shadow-lg border border-stone-200/60"
            >
              <Image
                src="/assets/images/service-3.jpg"
                alt="NRI Property Shield"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E080E]/90 via-[#1E080E]/25 to-transparent group-hover:from-[#1E080E]/95 transition-all duration-300"></div>

              <div className="absolute bottom-0 left-0 right-0 p-5 font-['Inter',sans-serif]">
                <div className="flex items-end justify-between">
                  <div>
                    <h4 className="text-white font-extrabold text-lg font-['Outfit',sans-serif]">
                      NRI Property Shield
                    </h4>
                    <p className="text-stone-300 text-xs font-['Inter',sans-serif] mt-0.5">
                      Dedicated overseas asset protection
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#c5a880]/20 border border-[#c5a880]/50 text-[#c5a880] group-hover:bg-[#c5a880] group-hover:text-[#381e23] flex items-center justify-center transition-all duration-300 shrink-0">
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Column: Tall Card - Property Management */}
          <Link
            href="/#services"
            className="relative overflow-hidden rounded-2xl cursor-pointer group h-[360px] md:h-[440px] shadow-lg border border-stone-200/60"
          >
            <Image
              src="/assets/images/service-4.jpg"
              alt="Property Management"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E080E]/90 via-[#1E080E]/25 to-transparent group-hover:from-[#1E080E]/95 transition-all duration-300"></div>

            <div className="absolute bottom-0 left-0 right-0 p-6 font-['Inter',sans-serif]">
              <div className="flex items-end justify-between">
                <div>
                  <h4 className="text-white font-extrabold text-xl font-['Outfit',sans-serif]">
                    Property Management
                  </h4>
                  <p className="text-stone-300 text-xs font-['Inter',sans-serif] mt-0.5">
                    Complete maintenance &amp; inspection
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#c5a880]/20 border border-[#c5a880]/50 text-[#c5a880] group-hover:bg-[#c5a880] group-hover:text-[#381e23] flex items-center justify-center transition-all duration-300 shrink-0">
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </div>
              </div>
            </div>
          </Link>

        </div>

        {/* Secondary 5-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {secondaryServices.map((item, idx) => (
            <Link
              href="/#services"
              key={idx}
              className="relative overflow-hidden rounded-2xl cursor-pointer group h-[165px] shadow-md border border-stone-200/60"
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E080E]/90 via-[#1E080E]/30 to-transparent group-hover:from-[#1E080E]/95 transition-all duration-300"></div>

              <div className="absolute bottom-0 left-0 right-0 p-4 font-['Inter',sans-serif]">
                <div className="flex items-end justify-between gap-1">
                  <h4 className="text-white font-extrabold text-xs sm:text-sm font-['Outfit',sans-serif] leading-tight">
                    {item.title}
                  </h4>
                  <div className="w-6 h-6 rounded-full bg-[#c5a880]/20 border border-[#c5a880]/50 text-[#c5a880] group-hover:bg-[#c5a880] group-hover:text-[#381e23] flex items-center justify-center transition-all duration-300 shrink-0">
                    <i className="fa-solid fa-arrow-right text-[9px]"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

