"use client";

import React from "react";
import Link from "next/link";

export default function ServicesCTASection() {
  return (
    <section className="py-[110px] relative overflow-hidden text-white text-center isolate bg-[#180d0f]">
      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1c0e11]/86 via-[#381e23]/78 to-[#120a0c]/88 z-10" />

      {/* Moving Background Image */}
      <div className="absolute -inset-[12%] bg-[url('/assets/images/hero-premium-building.jpg')] bg-center bg-cover bg-no-repeat z-0 animate-cta-bg-pan" />

      {/* Floating Content */}
      <div className="w-[min(1240px,calc(100%-48px))] mx-auto relative z-20 animate-cta-float">
        <span className="text-[#c5a880] font-outfit uppercase tracking-[0.22em] text-[15px] leading-[24px] font-bold block mb-2">
          Ready to get started?
        </span>
        <h2 className="font-outfit font-semibold text-[2.3rem] sm:text-[3.5rem] lg:text-[4.2rem] leading-[1.08] max-w-[780px] mx-auto mt-2.5 mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
          Whatever your property goal, our team is ready to help.
        </h2>
        <p className="text-[#eadfd3] font-inter max-w-[570px] mx-auto mb-7 text-[1.02rem]">
          Buying, selling, building, managing, or investing—start with a straightforward conversation.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 bg-[#c5a880] text-[#231518] px-[24px] py-[14px] font-bold text-[0.88rem] font-inter rounded-none hover:bg-white hover:text-[#381e23] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-250 shadow-[0_4px_14px_rgba(197,168,128,0.25)]"
        >
          <span>Get in touch today</span>
          <i className="fa-solid fa-arrow-right text-[0.9rem]" />
        </Link>
      </div>
    </section>
  );
}
