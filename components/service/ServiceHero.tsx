"use client";

import React from "react";

export default function ServiceHero() {
  return (
    <section className="relative mt-[96px] min-h-[560px] flex items-center justify-center overflow-hidden bg-[#180d0f] text-center text-white isolate">
      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f080a]/76 via-[#1a0c10]/68 to-[#0f080a]/88 -z-10" />

      {/* Background Image with Zoom Animation */}
      <div
        className="absolute -inset-[4%] bg-[url('/assets/images/carousel-villa-1.jpg')] bg-center bg-cover bg-no-repeat -z-20 animate-hero-zoom"
      />

      {/* Content Container */}
      <div className="py-[70px] px-6 w-full max-w-[880px] mx-auto flex flex-col items-center justify-center">
        {/* Subtitle */}
        <span className="text-[#c5a880] font-outfit text-sm leading-[22px] font-bold tracking-[0.28em] uppercase block mb-3">
          OUR SERVICES
        </span>

        {/* Top Divider Ornament: Line - Center Dot - Line */}
        <div className="flex items-center justify-center gap-3 mb-4.5 w-full">
          <span className="w-[48px] h-[1px] bg-[#c5a880]/55" />
          <span className="w-[7px] h-[7px] rounded-full bg-[#c5a880] shadow-[0_0_10px_rgba(197,168,128,0.85)]" />
          <span className="w-[48px] h-[1px] bg-[#c5a880]/55" />
        </div>

        {/* Main H1 Title */}
        <h1 className="font-outfit font-bold text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] text-white max-w-[820px] mb-[20px] drop-shadow-[0_4px_18px_rgba(0,0,0,0.65)]">
          Complete Real Estate and Property Management Solutions in{" "}
          <span className="text-[#c5a880]">Coimbatore</span>
        </h1>

        {/* Bottom Divider Ornament: Side Line - Gold Bar - Side Line */}
        <div className="flex items-center justify-center gap-3 w-full mt-1">
          <span className="w-[36px] h-[1px] bg-[#c5a880]/45" />
          <span className="w-[84px] h-[4px] bg-[#c5a880] rounded-[2px] shadow-[0_2px_10px_rgba(197,168,128,0.65)]" />
          <span className="w-[36px] h-[1px] bg-[#c5a880]/45" />
        </div>
      </div>

      {/* Scroll to Explore vertical text on right (hidden on small screens) */}
      <div className="hidden md:flex absolute right-[6%] bottom-[38px] [writing-mode:vertical-rl] tracking-[0.2em] text-[0.65rem] font-inter text-[#dfc7a4] items-center">
        <span>SCROLL TO EXPLORE</span>
        <div className="w-[1px] h-[55px] bg-[#c5a880] mt-3.5 mx-auto" />
      </div>
    </section>
  );
}
