"use client";

import React from "react";
import { landSalesDetailData } from "@/data/landSalesDetailData";

interface Props {
  data?: typeof landSalesDetailData;
}

export default function LandSalesHero({ data = landSalesDetailData }: Props) {
  const { hero } = data;

  return (
    <section className="relative mt-[96px] min-h-[580px] sm:min-h-[720px] lg:min-h-[780px] flex items-center justify-center overflow-hidden bg-[#140b0e] text-center text-white isolate">
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0709]/68 via-[#160a0e]/58 to-[#0e0709]/86 z-10" />

      {/* Background Image Carousel with Zoom & Motion */}
      <div
        className="absolute -inset-[8%] bg-center bg-cover bg-no-repeat z-0 animate-hero-zoom-in-out"
        style={{ backgroundImage: `url('${hero.backgroundImage}')` }}
      />

      {/* Hero Inner Content */}
      <div className="relative z-20 py-[100px] sm:py-[130px] px-6 w-full max-w-[1000px] mx-auto flex flex-col items-center justify-center animate-cta-float">
        {/* Top Tagline with Gold Lines and Dots */}
        <div className="inline-flex items-center gap-3 sm:gap-4 mb-6">
          <span className="w-[30px] sm:w-[50px] h-[1px] bg-[#c5a880] opacity-85" />
          <span className="w-[6px] h-[6px] rounded-full bg-[#c5a880] inline-block" />
          <span className="text-[#dfc7a4] font-outfit text-[0.78rem] sm:text-[0.95rem] font-bold tracking-[0.28em] uppercase">
            {hero.tagline}
          </span>
          <span className="w-[6px] h-[6px] rounded-full bg-[#c5a880] inline-block" />
          <span className="w-[30px] sm:w-[50px] h-[1px] bg-[#c5a880] opacity-85" />
        </div>

        {/* H1 Title */}
        <h1 className="font-outfit font-extrabold text-[2.4rem] sm:text-[4rem] lg:text-[4.5rem] leading-[1.14] text-white mb-4 tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
          {hero.title}{" "}
          <span className="text-[#c5a880] font-extrabold">{hero.titleHighlight}</span>
        </h1>

        {/* Gold Bar Ornament */}
        <div className="w-[120px] sm:w-[150px] h-[4px] bg-[#c5a880] my-3 sm:my-5 shadow-[0_0_16px_rgba(197,168,128,0.8)]" />

        {/* Subtext */}
        <p className="font-outfit text-[1.15rem] sm:text-[1.5rem] font-semibold text-white tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] max-w-[780px]">
          {hero.subtext}
        </p>
      </div>
    </section>
  );
}
