"use client";

import React from "react";
import Image from "next/image";

export default function VisionMissionSection() {
  return (
    <section id="vm-section" className="bg-white py-16 sm:py-24 px-6 sm:px-10 border-t border-stone-200">
      <div className="max-w-[1040px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* MISSION */}
          <div className="flex flex-col items-start bg-[#FDFBF7] p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full h-[220px] sm:h-[260px] relative overflow-hidden mb-6 rounded-xl">
              <Image
                src="/assets/images/mission-meeting.jpg"
                alt="Our Mission - Vizhi Infragen Realtors"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#c5a880]"></span>
              <span className="text-xs font-bold text-[#c5a880] uppercase tracking-[0.2em] font-['Inter',sans-serif]">
                Our Purpose
              </span>
            </div>
            <h3 className="font-['Outfit',sans-serif] font-extrabold text-2xl text-[#612124] mb-3 leading-tight">
              Our Mission
            </h3>
            <div className="w-10 h-0.5 bg-[#c5a880] rounded-full mb-4"></div>
            <p className="font-['Inter',sans-serif] text-base text-[#444444] leading-[1.85]">
              To deliver transparent, reliable real estate solutions that create lasting value for our clients.
            </p>
          </div>

          {/* VISION */}
          <div className="flex flex-col items-start bg-[#FDFBF7] p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full h-[220px] sm:h-[260px] relative overflow-hidden mb-6 rounded-xl">
              <Image
                src="/assets/images/vision-dartboard.jpg"
                alt="Our Vision - Vizhi Infragen Realtors"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#c5a880]"></span>
              <span className="text-xs font-bold text-[#c5a880] uppercase tracking-[0.2em] font-['Inter',sans-serif]">
                Our Future
              </span>
            </div>
            <h3 className="font-['Outfit',sans-serif] font-extrabold text-2xl text-[#612124] mb-3 leading-tight">
              Our Vision
            </h3>
            <div className="w-10 h-0.5 bg-[#c5a880] rounded-full mb-4"></div>
            <p className="font-['Inter',sans-serif] text-base text-[#444444] leading-[1.85]">
              To become a trusted real estate partner known for integrity, professional excellence, and comprehensive property solutions.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
