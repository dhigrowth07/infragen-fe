"use client";

import React from "react";
import Image from "next/image";
import { landSalesDetailData } from "@/data/landSalesDetailData";

interface Props {
  data?: typeof landSalesDetailData;
}

export default function HowToBuyProcessSection({ data = landSalesDetailData }: Props) {
  const { process } = data;

  return (
    <section className="py-[85px] bg-white relative">
      <div className="w-[min(1240px,calc(100%-48px))] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-[720px] mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#381e23] text-[#c5a880] px-4 py-1.5 text-[0.78rem] font-bold tracking-[0.15em] uppercase font-outfit mb-3.5">
            <i className="fa-solid fa-route"></i>
            <span>{process.tagBadge}</span>
          </div>
          <h2 className="font-outfit text-[2.1rem] sm:text-[2.8rem] font-extrabold text-[#381e23] mb-3 leading-[1.18]">
            {process.title}
          </h2>
          <p className="text-[#4b5563] font-inter text-[1.02rem] leading-[1.8]">
            {process.subtext}
          </p>
        </div>

        {/* Process Flow Container */}
        <div className="relative mt-[50px] py-5">
          {/* Single Moving Line touching each step node (Hidden on small screens) */}
          <div className="hidden lg:block absolute top-[70px] left-[8%] h-[3px] bg-gradient-to-r from-[#c5a880] via-white to-[#c5a880] shadow-[0_0_14px_rgba(197,168,128,0.9)] z-10 animate-line-flow pointer-events-none" />

          {/* 5 Steps Grid */}
          <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7 text-center">
            {process.steps.map((item) => (
              <div key={item.step} className="flex flex-col items-center group">
                {/* Circular Circle Image Wrapper */}
                <div className="relative w-[140px] h-[140px] mb-5">
                  <div className="w-[140px] h-[140px] rounded-full overflow-hidden border-4 border-white shadow-[0_10px_25px_rgba(0,0,0,0.12)] transition-all duration-350 group-hover:scale-108 group-hover:border-[#c5a880] group-hover:shadow-[0_14px_32px_rgba(197,168,128,0.35)] relative bg-[#f5efe6]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Step Badge Circle */}
                  <span className="absolute top-[2px] right-[2px] w-8.5 h-8.5 rounded-full bg-black text-white border-2 border-white font-outfit font-extrabold text-[0.95rem] grid place-items-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-colors duration-300 group-hover:bg-[#c5a880] group-hover:text-[#381e23]">
                    {item.step}
                  </span>
                </div>

                {/* Step Title */}
                <h4 className="font-outfit text-[1.12rem] font-bold text-[#381e23] mb-2 leading-[1.3]">
                  {item.title}
                </h4>

                {/* Step Desc */}
                <p className="text-[#4b5563] font-inter text-[0.86rem] leading-[1.55] max-w-[210px] m-0">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
