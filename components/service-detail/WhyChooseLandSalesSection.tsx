"use client";

import React from "react";
import Image from "next/image";
import { landSalesDetailData } from "@/data/landSalesDetailData";

interface Props {
  data?: typeof landSalesDetailData;
}

export default function WhyChooseLandSalesSection({ data = landSalesDetailData }: Props) {
  const { whyChoose } = data;

  return (
    <section className="py-[85px] bg-[#f5efe6] relative">
      <div className="w-[min(1240px,calc(100%-48px))] mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-[50px] items-center">
        {/* Left Side Content */}
        <div>
          {/* Section Tag Badge */}
          <div className="inline-flex items-center gap-2 bg-[#381e23] text-[#c5a880] px-4 py-1.5 text-[0.78rem] font-bold tracking-[0.15em] uppercase font-outfit mb-3.5">
            <i className="fa-solid fa-crown"></i>
            <span>{whyChoose.tagBadge}</span>
          </div>

          {/* Title */}
          <h2 className="font-outfit text-[2.1rem] sm:text-[2.8rem] font-extrabold text-[#381e23] mb-5 leading-[1.18]">
            {whyChoose.title}
          </h2>

          {/* Paragraphs */}
          <p className="text-[#4b5563] font-inter text-[1.02rem] leading-[1.8] mb-5">
            {whyChoose.paragraph1}
          </p>
          <p className="text-[#4b5563] font-inter text-[1.02rem] leading-[1.8]">
            {whyChoose.paragraph2}
          </p>
        </div>

        {/* Right Side: 3D Showcase Image Card Effect */}
        <div className="relative [perspective:1000px] flex justify-center">
          <div className="w-full h-[340px] sm:h-[380px] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.18)] [transform:rotateX(10deg)_rotateY(-12deg)] transition-all duration-600 ease-out hover:[transform:rotateX(0deg)_rotateY(0deg)_translateY(-8px)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.25)] relative overflow-hidden border-2 border-[#c5a880]">
            <Image
              src={whyChoose.image3D}
              alt="3D Masterplan Layout Render"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
