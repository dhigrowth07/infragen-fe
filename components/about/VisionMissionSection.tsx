"use client";

import React from "react";
import Image from "next/image";

export default function VisionMissionSection() {
  return (
    <section id="vm-section" className="py-14 sm:py-20 px-6 sm:px-10 lg:px-16 bg-white relative">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 lg:gap-16">
          
          {/* Column 1: Our Mission */}
          <div className="flex flex-col text-left space-y-4">
            <div className="w-full h-52 sm:h-60 lg:h-64 relative overflow-hidden rounded-lg shadow-sm bg-stone-100 group">
              <Image
                src="/assets/images/mission-meeting.jpg"
                alt="Our Mission - Vizhi Infragen Realtors"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="pt-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]"></span>
                <span className="text-xs font-bold text-[#c5a880] uppercase tracking-[0.25em] font-['Inter',sans-serif]">
                  OUR PURPOSE
                </span>
              </div>
              <h3 className="font-['Outfit',sans-serif] font-bold text-2xl sm:text-3xl text-[#612124] leading-tight">
                Our Mission
              </h3>
              <p className="font-['Inter',sans-serif] text-sm sm:text-base text-stone-600 leading-relaxed">
                To deliver transparent, reliable real estate solutions that create lasting value for our clients.
              </p>
            </div>
          </div>

          {/* Column 2: Our Vision */}
          <div className="flex flex-col text-left space-y-4">
            <div className="w-full h-52 sm:h-60 lg:h-64 relative overflow-hidden rounded-lg shadow-sm bg-stone-100 group">
              <Image
                src="/assets/images/vision-dartboard.jpg"
                alt="Our Vision - Vizhi Infragen Realtors"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="pt-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]"></span>
                <span className="text-xs font-bold text-[#c5a880] uppercase tracking-[0.25em] font-['Inter',sans-serif]">
                  OUR FUTURE
                </span>
              </div>
              <h3 className="font-['Outfit',sans-serif] font-bold text-2xl sm:text-3xl text-[#612124] leading-tight">
                Our Vision
              </h3>
              <p className="font-['Inter',sans-serif] text-sm sm:text-base text-stone-600 leading-relaxed">
                To become a trusted real estate partner known for integrity, professional excellence, and comprehensive property solutions.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
