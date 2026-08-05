"use client";

import React from "react";
import Image from "next/image";

export default function AboutHero() {
  return (
    <div id="about-hero" className="relative text-white overflow-hidden pt-0 min-h-[640px] sm:min-h-[720px]">
      {/* Background with continuous zoom animation */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src="/assets/images/hero-bright-house.jpg"
          alt="Luxury Bright House - Vizhi Infragen Realtors"
          fill
          priority
          sizes="100vw"
          className="carousel-zoom-img object-cover object-center"
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center pt-36 sm:pt-40 pb-24 min-h-[640px] sm:min-h-[720px]">
        <div className="text-center max-w-3xl px-6 space-y-5 animate-float-down">
          {/* Top Badge Label */}
          <span className="text-[#c5a880] font-['Inter',sans-serif] text-xs sm:text-sm font-extrabold tracking-[0.35em] uppercase block drop-shadow-md">
            ABOUT VIZHI INFRAGEN REALTORS LLP
          </span>

          {/* Gold Accent Line Above Heading */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-px bg-[#c5a880]/60 rounded-full"></div>
            <div className="w-2 h-2 rounded-full bg-[#c5a880]"></div>
            <div className="w-10 h-px bg-[#c5a880]/60 rounded-full"></div>
          </div>

          {/* H1 Heading */}
          <h1 className="font-extrabold font-['Outfit',sans-serif] text-white tracking-tight drop-shadow-2xl text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px]">
            A Trusted Real Estate and Property Management Company in
            <span className="text-[#c5a880]"> Coimbatore</span>
          </h1>

          {/* Gold Accent Bar Below Heading */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <div className="w-8 h-px bg-[#c5a880]/50 rounded-full"></div>
            <div className="w-24 h-1.5 bg-[#c5a880] rounded-full shadow-lg shadow-[#c5a880]/60"></div>
            <div className="w-8 h-px bg-[#c5a880]/50 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
