"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  serviceCategoryTabs,
  servicesCardData,
  ServiceCardItem,
} from "@/data/servicesData";

export default function ServicesFilterShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("land");

  const filteredCards = servicesCardData.filter(
    (card) => card.category === activeCategory
  );

  return (
    <section className="py-[70px] pb-[110px] bg-[#f5efe6] relative" id="all-services">
      <div className="w-[min(1240px,calc(100%-48px))] mx-auto">
        {/* Header */}
        <div className="text-center max-w-[720px] mx-auto mb-9">
          <h2 className="font-outfit text-[2.2rem] sm:text-[3rem] lg:text-[3.4rem] font-bold leading-[1.12] text-[#381e23]">
            Explore all the services
          </h2>
        </div>

        {/* Filter Tabs Wrapper */}
        <div className="flex flex-col items-center w-full mb-12">
          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-3 w-full max-w-[1240px]">
            {serviceCategoryTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-5 py-3 rounded-none font-outfit text-[0.88rem] font-bold tracking-[0.03em] cursor-pointer transition-all duration-300 inline-flex items-center gap-2 shadow-[0_4px_12px_rgba(197,168,128,0.25)] ${
                    isActive
                      ? "bg-[#381e23] text-white border border-[#381e23] shadow-[0_6px_18px_rgba(56,30,35,0.45)] -translate-y-0.5"
                      : "bg-[#c5a880] text-[#231518] border border-[#c5a880] hover:bg-[#381e23] hover:text-white hover:border-[#381e23] hover:-translate-y-0.5"
                  }`}
                >
                  <i
                    className={`fa-solid ${tab.icon} text-[0.9rem] ${
                      isActive ? "text-[#c5a880]" : "text-[#231518]"
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Horizontal Line under filters */}
          <div className="w-full max-w-[1240px] h-[2px] bg-[#dfd4c4] mt-4" />
        </div>

        {/* 10 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredCards.map((card: ServiceCardItem) => (
            <article
              key={card.id}
              id={card.slug}
              className="bg-white rounded-none overflow-hidden border border-black/10 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.14)] hover:border-[#c5a880] transition-all duration-380 flex flex-col group"
            >
              {/* Top Image Banner */}
              <Link href={card.link} className="relative h-[230px] overflow-hidden block">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-600 group-hover:scale-107"
                />
                {/* Image Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-[#0a0506]/85" />

                {/* Top Left Badges */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-10">
                  {card.topBadgesLeft.map((badge, idx) => (
                    <span
                      key={idx}
                      className="bg-[#4cd964] text-white text-[0.72rem] font-bold px-2.5 py-1 font-inter shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Top Right Badges */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-10">
                  {card.topBadgesRight.map((badge, idx) => (
                    <span
                      key={idx}
                      className="bg-[#7052fb] text-white text-[0.72rem] font-bold px-2.5 py-1 font-inter shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Bottom Overlay Text */}
                <div className="absolute bottom-4 left-4.5 right-4.5 z-10">
                  <div className="font-outfit text-[1.15rem] font-extrabold text-white mb-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                    {card.tagline}
                  </div>
                  <h3 className="font-outfit text-[1.3rem] font-bold text-white m-0 leading-[1.25] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    {card.title}
                  </h3>
                </div>
              </Link>

              {/* Middle Specs Row (4 Columns) */}
              <div className="grid grid-cols-4 py-4 px-3 bg-white border-b border-black/6 text-center">
                {card.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-center justify-center gap-1 ${
                      idx < card.specs.length - 1 ? "border-r border-black/6" : ""
                    }`}
                  >
                    <i className={`fa-solid ${spec.icon} text-[#b09167] text-[0.95rem]`} />
                    <span className="font-inter text-[0.76rem] font-semibold text-[#475569]">
                      {spec.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Footer Row */}
              <div className="py-[14px] px-[18px] flex items-center justify-between bg-white mt-auto">
                <div className="flex items-center gap-2.5">
                  <Image
                    src={card.deskAvatar}
                    alt={card.deskName}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-cover border border-[#dfd4c4] shadow-sm"
                  />
                  <span className="font-inter text-[0.83rem] font-bold text-[#381e23]">
                    {card.deskName}
                  </span>
                </div>
                <div>
                  <Link
                    href={card.link}
                    className="inline-flex items-center gap-1.5 bg-[#381e23] text-white px-[18px] py-[8px] font-inter text-[0.8rem] font-bold hover:bg-[#c5a880] hover:text-[#381e23] transition-all duration-250"
                  >
                    <i className="fa-solid fa-paper-plane text-[0.85rem]"></i>
                    <span>Explore</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
