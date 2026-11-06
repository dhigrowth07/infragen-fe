"use client";

import React from "react";
import Image from "next/image";

export default function ServiceIntroSection() {
  return (
    <section className="w-[min(1240px,calc(100%-48px))] mx-auto py-[85px] pb-[50px] grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[64px] items-center relative">
      {/* Left Column */}
      <div className="relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#381e23] text-[#c5a880] px-[18px] py-[7px] text-[0.8rem] font-bold tracking-[0.16em] uppercase font-outfit mb-4 border-l-3 border-[#c5a880]">
          <i className="fa-solid fa-crown text-[#c5a880]"></i>
          <span>One Trusted Partner</span>
        </div>

        {/* Heading */}
        <h2 className="font-outfit font-bold text-[2.3rem] sm:text-[3rem] lg:text-[3.4rem] leading-[1.12] text-[#381e23] mb-4">
          Our Services
        </h2>

        {/* Gold Underline Line */}
        <span className="block w-[64px] h-[4px] bg-[#c5a880] mt-2.5 mb-5" />

        {/* Paragraph */}
        <p className="text-[#4b5563] text-[1.02rem] leading-[1.85] mb-[28px] font-inter">
          At Vizhi Infragen Realtors LLP, we offer a full range of real estate and property management services under one roof so you never have to coordinate multiple agencies, lawyers, or contractors on your own. From buying and selling land to managing assets for NRI owners and delivering turnkey construction, every service is handled with transparency, local market knowledge, and end to end support across Coimbatore and its fast-growing corridors.
        </p>

        {/* Thin Stat Cards Row */}
        <div className="flex gap-[10px] mt-6 flex-wrap sm:flex-nowrap">
          <div className="bg-white border border-[#dfd4c4] py-1.5 px-[10px] min-w-[105px] text-center shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-[#c5a880] transition-all duration-300">
            <strong className="block font-outfit text-[0.95rem] text-[#381e23] font-extrabold whitespace-nowrap">
              10 Services
            </strong>
            <span className="text-[0.65rem] text-[#4b5563] font-semibold leading-[1.2] block mt-0.5 whitespace-nowrap">
              Complete Desk
            </span>
          </div>

          <div className="bg-white border border-[#dfd4c4] py-1.5 px-[10px] min-w-[105px] text-center shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-[#c5a880] transition-all duration-300">
            <strong className="block font-outfit text-[0.95rem] text-[#381e23] font-extrabold whitespace-nowrap">
              100%
            </strong>
            <span className="text-[0.65rem] text-[#4b5563] font-semibold leading-[1.2] block mt-0.5 whitespace-nowrap">
              Legal Title Check
            </span>
          </div>

          <div className="bg-white border border-[#dfd4c4] py-1.5 px-[10px] min-w-[105px] text-center shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-[#c5a880] transition-all duration-300">
            <strong className="block font-outfit text-[0.95rem] text-[#381e23] font-extrabold whitespace-nowrap">
              Coimbatore
            </strong>
            <span className="text-[0.65rem] text-[#4b5563] font-semibold leading-[1.2] block mt-0.5 whitespace-nowrap">
              Local Market Experts
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Layered Frame */}
      <div className="relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
        {/* Glow */}
        <div className="absolute w-[280px] sm:w-[340px] h-[280px] sm:h-[340px] bg-[radial-gradient(circle,rgba(197,168,128,0.4)_0%,rgba(56,30,35,0.05)_70%)] blur-[40px] animate-float-glow -z-0" />

        {/* Frame Box */}
        <div className="relative w-full max-w-[480px] h-[340px] sm:h-[390px] z-10 group">
          {/* Border Box */}
          <div className="absolute -inset-[12px] border-2 border-[#c5a880] -z-10 pointer-events-none" />

          {/* Image */}
          <div className="w-full h-full relative overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
            <Image
              src="/assets/images/experience.jpg"
              alt="Real Estate Consultation at Vizhi Infragen Realtors"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-[20px] -left-[10px] sm:-left-[20px] bg-[#381e23] text-white p-3.5 sm:p-[16px_22px] z-20 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center gap-3 border border-[#c5a880]">
            <i className="fa-solid fa-building-circle-check text-[1.3rem] sm:text-[1.5rem] text-[#c5a880]"></i>
            <div>
              <strong className="block font-outfit text-[0.95rem] sm:text-[1.05rem] leading-tight">
                10 Complete Services
              </strong>
              <span className="text-[0.7rem] sm:text-[0.76rem] text-[#dfc7a4]">
                End-to-End Real Estate Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
