"use client";

import React from "react";
import Link from "next/link";
import { landSalesDetailData } from "@/data/landSalesDetailData";

interface Props {
  data?: typeof landSalesDetailData;
}

export default function LandSalesCTASection({ data = landSalesDetailData }: Props) {
  const { cta } = data;

  return (
    <section className="py-[110px] relative overflow-hidden bg-[#0e0608] text-white text-center isolate border-y-2 border-[#c5a880] mt-[50px]">
      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0507]/72 to-[#12090c]/84 z-10" />

      {/* Moving Background Image */}
      <div
        className="absolute -inset-[12%] bg-center bg-cover bg-no-repeat z-0 animate-cta-bg-pan"
        style={{ backgroundImage: `url('${cta.backgroundImage}')` }}
      />

      {/* Floating Content */}
      <div className="relative z-20 max-w-[860px] mx-auto px-6 animate-cta-float">
        <h2 className="font-outfit font-extrabold text-[2.2rem] sm:text-[3.4rem] leading-[1.12] text-white mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]">
          {cta.title}
        </h2>
        <p className="text-[#eadfd3] font-inter text-[1.08rem] leading-[1.8] mb-[30px] max-w-[800px] mx-auto">
          {cta.paragraph}
        </p>

        {/* Grand Button Format */}
        <Link
          href={cta.buttonLink}
          className="inline-flex items-center gap-3 bg-[#c5a880] text-[#381e23] px-9 py-4 font-outfit text-[1.1rem] font-extrabold tracking-wide border-0 shadow-[0_8px_24px_rgba(197,168,128,0.4)] hover:bg-white hover:text-[#381e23] hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(255,255,255,0.3)] transition-all duration-300"
        >
          <span>{cta.buttonText}</span>
          <i className="fa-solid fa-arrow-right text-[1rem]" />
        </Link>
      </div>
    </section>
  );
}
