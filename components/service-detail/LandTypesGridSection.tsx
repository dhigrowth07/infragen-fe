"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { landSalesDetailData, LandTypeCard } from "@/data/landSalesDetailData";

interface Props {
  data?: typeof landSalesDetailData;
}

export default function LandTypesGridSection({ data = landSalesDetailData }: Props) {
  const { landTypes } = data;

  return (
    <section className="py-[85px] bg-white relative">
      <div className="w-[min(1240px,calc(100%-48px))] mx-auto">
        {/* Section Header */}
        <div className="mb-[45px]">
          <div className="inline-flex items-center gap-2 bg-[#381e23] text-[#c5a880] px-4 py-1.5 text-[0.78rem] font-bold tracking-[0.15em] uppercase font-outfit mb-3.5">
            <i className="fa-solid fa-layer-group"></i>
            <span>Tailored Portfolio</span>
          </div>
          <h2 className="font-outfit text-[2.1rem] sm:text-[2.8rem] font-extrabold text-[#381e23] mb-3 leading-[1.18]">
            Types of Land for Sale in Coimbatore We Offer
          </h2>
          <p className="text-[#4b5563] font-inter text-[1.02rem] leading-[1.8] max-w-[800px]">
            We provide a wide range of plot options across the city, so buyers with different needs can find the right fit:
          </p>
        </div>

        {/* 6 Luxury Type Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7.5">
          {landTypes.map((card: LandTypeCard) => (
            <article
              key={card.id}
              className="bg-white border border-[#dfd4c4] shadow-[0_14px_35px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-2.5 hover:shadow-[0_28px_60px_rgba(0,0,0,0.18)] hover:border-[#c5a880] flex flex-col group relative"
            >
              {/* Image Banner */}
              <div className="relative h-[230px] overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-112"
                />

                {/* Top Badge */}
                <span className="absolute top-3.5 left-3.5 bg-[#c5a880] text-[#381e23] font-outfit text-[0.76rem] font-extrabold px-3.5 py-1.2 uppercase tracking-wider shadow-[0_4px_12px_rgba(0,0,0,0.25)] z-10">
                  {card.badge}
                </span>

                {/* Floating Icon Top Right */}
                <div className="absolute top-3.5 right-3.5 w-9 h-9 bg-[#231518]/85 backdrop-blur-sm text-[#c5a880] border border-[#c5a880] grid place-items-center text-[0.95rem] z-10">
                  <i className={`fa-solid ${card.icon}`} />
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-outfit text-[1.35rem] font-bold text-[#381e23] mb-2.5">
                  {card.title}
                </h3>
                <p className="text-[#4b5563] font-inter text-[0.92rem] leading-[1.65] mb-4">
                  {card.description}
                </p>

                {/* Bullet Points */}
                <ul className="list-none p-0 m-0 mb-4 flex flex-col gap-1.5 mt-auto">
                  {card.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-[0.85rem] font-semibold text-[#381e23] flex items-center gap-2 font-inter">
                      <i className="fa-solid fa-circle-check text-[#b09167] text-[0.85rem]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer Link */}
                <div className="pt-3.5 border-t border-[#dfd4c4] flex items-center justify-between text-[#b09167] font-outfit text-[0.86rem] font-bold group-hover:text-[#381e23] transition-colors">
                  <span>{card.footerText}</span>
                  <i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
