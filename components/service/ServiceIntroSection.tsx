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
        <p className="text-[#4b5563] text-[1.02rem] leading-[1.85] mb-4 font-inter">
          At Vizhi Infragen Realtors LLP, we offer a full range of real estate and property management services under one roof so you never have to coordinate multiple agencies, lawyers, or contractors on your own. From buying and selling land to managing assets for NRI owners and delivering turnkey construction, every service is handled with transparency, local market knowledge, and end to end support across Coimbatore and its fast-growing corridors.
        </p>

        {/* One Stop Solution Single Box */}
        <div className="mt-1 w-fit max-w-fit inline-flex">
          <div className="inline-flex items-center justify-center px-[18px] py-[7px] bg-[#c5a880]/15 border-[1.5px] border-[#c5a880]/50 rounded-[12px] shadow-[0_4px_14px_rgba(0,0,0,0.04)]">
            <strong className="text-[1.12rem] font-outfit text-[#381e23] font-extrabold tracking-[-0.01em] m-0 leading-[1.2]">
              One Stop Solution
            </strong>
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

          {/* Floating Badge: End-to-End Real Estate Support */}
          <div className="absolute -bottom-[10px] -left-[10px] bg-[#2E1418] border-[1.5px] border-[#c5a880] py-2 px-3.5 sm:px-4 z-20 shadow-[0_10px_25px_rgba(0,0,0,0.35)] flex items-center gap-2.5 w-fit">
            <i className="fa-solid fa-building-circle-check text-[1.2rem] sm:text-[1.25rem] text-[#c5a880] shrink-0"></i>
            <div>
              <strong className="block font-outfit text-[0.85rem] sm:text-[0.88rem] font-bold text-white tracking-[0.01em] leading-[1.2] whitespace-nowrap">
                End-to-End Real Estate Support
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
