"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ValueCard {
  id: number;
  icon: string;
  title: string;
  desc: string;
}

const valueCards: ValueCard[] = [
  {
    id: 1,
    icon: "fa-eye",
    title: "Transparency",
    desc: "Clear pricing, verified documentation, and honest timelines — with no hidden surprises at any stage of your property journey.",
  },
  {
    id: 2,
    icon: "fa-award",
    title: "Expertise",
    desc: "First-hand knowledge of Coimbatore's micro-markets, approval bodies, and price trends acquired over years of active practice.",
  },
  {
    id: 3,
    icon: "fa-shield-halved",
    title: "Accountability",
    desc: "We stand behind our clients long after the paperwork is signed — follow-through is not optional, it is our standard.",
  },
  {
    id: 4,
    icon: "fa-seedling",
    title: "Sustainability",
    desc: "Value-driven, responsible solutions designed to last — not just to close a deal, but to create generational wealth.",
  },
  {
    id: 5,
    icon: "fa-user-gear",
    title: "Client-First Thinking",
    desc: "Advice shaped around your goals, your budget, and your timeline — not our commission targets.",
  },
];

export default function CoreValuesSection() {
  const [openCardId, setOpenCardId] = useState<number | null>(null);

  const toggleCard = (id: number) => {
    setOpenCardId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden mb-0 pb-32 border-t border-white/10">
      {/* Background Image & Ambient Dark Overlay for White Glass Contrast */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/assets/images/values-bg-bright.jpg"
          alt="Aerial Bright Property Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#180A0D]/80 via-[#231518]/82 to-[#180A0D]/88"></div>
      </div>

      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#c5a880]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-14 px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 reveal-slide-up">
          <span className="text-[#c5a880] font-['Inter',sans-serif] text-xs font-bold tracking-[0.25em] uppercase block">
            CORE PHILOSOPHY
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Outfit',sans-serif] tracking-tight text-white">
            The Values That Guide Us
          </h2>
          <div className="w-16 h-1 bg-[#c5a880] mx-auto rounded-full"></div>
        </div>

        {/* 5 White Shade Glassy 3D Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-[1440px] mx-auto items-start">
          {valueCards.map((card) => {
            const isOpen = openCardId === card.id;
            return (
              <div
                key={card.id}
                onClick={() => toggleCard(card.id)}
                className="relative rounded-[20px] p-6 border border-white/30 bg-white/15 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.35)] transition-all duration-300 cursor-pointer overflow-hidden group hover:-translate-y-1.5 hover:bg-white/25 hover:border-white/60 hover:shadow-[0_20px_45px_rgba(255,255,255,0.18)]"
              >
                {/* Top Icon */}
                <div className="w-11 h-11 rounded-xl bg-white/20 border border-white/40 text-white flex items-center justify-center text-lg mb-4 group-hover:scale-110 group-hover:bg-white group-hover:text-[#231518] transition-all duration-300 shadow-inner">
                  <i className={`fa-solid ${card.icon}`}></i>
                </div>

                {/* Title Row */}
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-['Outfit',sans-serif] font-bold text-base text-white group-hover:text-amber-200 transition-colors leading-tight">
                    {card.title}
                  </h3>
                  <button
                    className="w-7 h-7 rounded-full bg-white/20 border border-white/40 text-white group-hover:bg-white group-hover:text-[#231518] flex items-center justify-center shrink-0 transition-all duration-300"
                    aria-label="Toggle Details"
                  >
                    <i
                      className={`fa-solid fa-chevron-right text-[10px] transition-transform duration-350 ${
                        isOpen ? "rotate-90" : "rotate-0"
                      }`}
                    ></i>
                  </button>
                </div>

                {/* Accent Line */}
                <div className="w-8 h-[2px] bg-gradient-to-r from-white to-transparent rounded-full mt-2.5"></div>

                {/* Expandable Body */}
                <div
                  className={`transition-all duration-400 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[180px] opacity-100 mt-3.5" : "max-h-0 opacity-0 mt-0"
                  }`}
                >
                  <p className="font-['Inter',sans-serif] text-xs text-white/95 leading-[1.85] font-medium">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
