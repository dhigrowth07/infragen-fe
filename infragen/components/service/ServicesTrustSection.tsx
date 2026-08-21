"use client";

import React from "react";

export default function ServicesTrustSection() {
  return (
    <section className="py-[106px] bg-[#381e23] text-white relative overflow-hidden">
      {/* Background Watermark 'V' */}
      <div
        className="absolute -right-[50px] -bottom-[190px] font-outfit font-bold text-[35rem] leading-none color-white text-white/5 pointer-events-none select-none"
        aria-hidden="true"
      >
        V
      </div>

      <div className="w-[min(1240px,calc(100%-48px))] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-[40px] lg:gap-[74px] items-center">
        {/* Left Info */}
        <div>
          <span className="text-[#c5a880] font-outfit uppercase tracking-[0.22em] text-[15px] leading-[24px] font-bold block mb-2">
            Why Vizhi Infragen
          </span>
          <h2 className="font-outfit font-semibold text-[2.2rem] sm:text-[3rem] lg:text-[3.8rem] leading-[1.11] my-3">
            Property guidance that stays personal.
          </h2>
          <p className="text-[#e7dbcd] font-inter max-w-[635px] text-[1rem] leading-[1.75]">
            Every service we offer is delivered with the same commitment: transparent dealings, genuine local expertise, and accountability that lasts long after the paperwork is signed. As a trusted real estate and property management company in Coimbatore, we treat your property as carefully as our own.
          </p>
        </div>

        {/* Right Qualities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-white/18">
          {/* Quality 1 */}
          <div className="p-6 border-r border-b border-white/18">
            <i className="fa-solid fa-eye text-[#c5a880] text-[1.2rem]" />
            <b className="block mt-2.5 mb-1 font-outfit text-white text-[1.1rem]">
              Transparent dealings
            </b>
            <span className="text-[0.82rem] font-inter text-[#d7c7b7] block">
              Clear process and honest guidance at every stage.
            </span>
          </div>

          {/* Quality 2 */}
          <div className="p-6 border-r border-b border-white/18">
            <i className="fa-solid fa-location-dot text-[#c5a880] text-[1.2rem]" />
            <b className="block mt-2.5 mb-1 font-outfit text-white text-[1.1rem]">
              Local expertise
            </b>
            <span className="text-[0.82rem] font-inter text-[#d7c7b7] block">
              Knowledge grounded in Coimbatore's real micro-markets.
            </span>
          </div>

          {/* Quality 3 */}
          <div className="p-6 border-r border-b border-white/18">
            <i className="fa-solid fa-shield-heart text-[#c5a880] text-[1.2rem]" />
            <b className="block mt-2.5 mb-1 font-outfit text-white text-[1.1rem]">
              Lasting accountability
            </b>
            <span className="text-[0.82rem] font-inter text-[#d7c7b7] block">
              Support that continues beyond a signature.
            </span>
          </div>

          {/* Quality 4 */}
          <div className="p-6 border-r border-b border-white/18">
            <i className="fa-solid fa-handshake text-[#c5a880] text-[1.2rem]" />
            <b className="block mt-2.5 mb-1 font-outfit text-white text-[1.1rem]">
              One trusted team
            </b>
            <span className="text-[0.82rem] font-inter text-[#d7c7b7] block">
              Practical answers across your property journey.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
