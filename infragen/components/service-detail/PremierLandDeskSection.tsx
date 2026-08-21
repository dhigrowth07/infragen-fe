"use client";

import React from "react";
import Image from "next/image";
import { landSalesDetailData } from "@/data/landSalesDetailData";

interface Props {
  data?: typeof landSalesDetailData;
}

export default function PremierLandDeskSection({ data = landSalesDetailData }: Props) {
  const { premierDesk } = data;

  return (
    <section className="py-[85px] bg-white relative">
      <div className="w-[min(1240px,calc(100%-48px))] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[60px] items-center">
        {/* Left Side: 3-Image Bento Layout */}
        <div className="grid grid-cols-2 gap-4 relative">
          {/* Main Top Large Card */}
          <div className="col-span-2 h-[220px] sm:h-[240px] relative overflow-hidden rounded-[2px] border border-[#dfd4c4] bg-[#381e23] shadow-[0_12px_30px_rgba(0,0,0,0.1)] group transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(0,0,0,0.22)] hover:border-[#c5a880]">
            <Image
              src={premierDesk.bentoCards.largeCard.image}
              alt={premierDesk.bentoCards.largeCard.title}
              fill
              className="object-cover transition-transform duration-600 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#140a0c]/88 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-5 text-white z-10">
              <h4 className="font-outfit text-[1.25rem] font-extrabold text-white mb-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                {premierDesk.bentoCards.largeCard.title}
              </h4>
              <p className="font-outfit text-[0.84rem] font-semibold text-[#dfc7a4]">
                {premierDesk.bentoCards.largeCard.subtitle}
              </p>
            </div>
          </div>

          {/* Bottom Left Small Card */}
          <div className="h-[180px] sm:h-[195px] relative overflow-hidden rounded-[2px] border border-[#dfd4c4] bg-[#381e23] shadow-[0_12px_30px_rgba(0,0,0,0.1)] group transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(0,0,0,0.22)] hover:border-[#c5a880]">
            <Image
              src={premierDesk.bentoCards.smallCard1.image}
              alt={premierDesk.bentoCards.smallCard1.title}
              fill
              className="object-cover transition-transform duration-600 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#140a0c]/88 via-transparent to-transparent flex flex-col justify-end p-4 text-white z-10">
              <h4 className="font-outfit text-[1.1rem] font-extrabold text-white mb-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                {premierDesk.bentoCards.smallCard1.title}
              </h4>
              <p className="font-outfit text-[0.8rem] font-semibold text-[#dfc7a4]">
                {premierDesk.bentoCards.smallCard1.subtitle}
              </p>
            </div>
          </div>

          {/* Bottom Right Small Card */}
          <div className="h-[180px] sm:h-[195px] relative overflow-hidden rounded-[2px] border border-[#dfd4c4] bg-[#381e23] shadow-[0_12px_30px_rgba(0,0,0,0.1)] group transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(0,0,0,0.22)] hover:border-[#c5a880]">
            <Image
              src={premierDesk.bentoCards.smallCard2.image}
              alt={premierDesk.bentoCards.smallCard2.title}
              fill
              className="object-cover transition-transform duration-600 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#140a0c]/88 via-transparent to-transparent flex flex-col justify-end p-4 text-white z-10">
              <h4 className="font-outfit text-[1.1rem] font-extrabold text-white mb-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                {premierDesk.bentoCards.smallCard2.title}
              </h4>
              <p className="font-outfit text-[0.8rem] font-semibold text-[#dfc7a4]">
                {premierDesk.bentoCards.smallCard2.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div>
          {/* Section Tag Badge */}
          <div className="inline-flex items-center gap-2 bg-[#381e23] text-[#c5a880] px-4 py-1.5 text-[0.78rem] font-bold tracking-[0.15em] uppercase font-outfit mb-3.5">
            <i className="fa-solid fa-award"></i>
            <span>{premierDesk.tagBadge}</span>
          </div>

          {/* Section Title */}
          <h2 className="font-outfit text-[2.1rem] sm:text-[2.8rem] font-extrabold text-[#381e23] mb-5 leading-[1.18]">
            {premierDesk.title}
          </h2>

          {/* Lead Paragraph */}
          <p className="text-[#231518] font-inter text-[1.12rem] leading-[1.85]">
            {premierDesk.paragraph}
          </p>
        </div>
      </div>
    </section>
  );
}
