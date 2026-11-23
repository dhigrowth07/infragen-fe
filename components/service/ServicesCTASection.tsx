"use client";

import React from "react";
import Link from "next/link";

export default function ServicesCTASection() {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden text-center bg-[#D0B999]">
      <div className="max-w-[860px] mx-auto px-6 relative z-10">
        <span className="inline-block text-[#331C20] font-inter text-[0.85rem] font-extrabold uppercase tracking-[0.22em] mb-3">
          Ready to get started?
        </span>
        <h2 className="font-outfit font-bold text-[2.2rem] sm:text-[3.2rem] lg:text-[3.8rem] leading-[1.15] text-[#1F0A10] max-w-[820px] mx-auto mb-4">
          Whatever your property goal, our team is ready to help.
        </h2>
        <p className="text-[#381E23] font-inter text-[1rem] sm:text-[1.05rem] leading-[1.7] max-w-[620px] mx-auto mb-8 font-medium">
          Buying, selling, building, managing, or investing—start with a straightforward conversation.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2.5 bg-[#331C20] hover:bg-[#4E1E26] text-white px-8 py-3.5 sm:px-9 sm:py-4 rounded-full font-bold text-[0.95rem] font-inter shadow-[0_6px_18px_rgba(51,28,32,0.22)] hover:shadow-[0_10px_25px_rgba(51,28,32,0.32)] hover:-translate-y-0.5 transition-all duration-300"
        >
          <span>Get In touch today</span>
          <i className="fa-solid fa-arrow-right text-xs" />
        </Link>
      </div>
    </section>
  );
}
