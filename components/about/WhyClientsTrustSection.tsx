"use client";

import React from "react";
import Link from "next/link";

interface TrustFeature {
  icon: string;
  title: string;
  desc: string;
}

const trustFeatures: TrustFeature[] = [
  {
    icon: "fa-file-contract",
    title: "Verified Property Titles",
    desc: "Every title thoroughly checked — no hidden encumbrances, no legal surprises.",
  },
  {
    icon: "fa-earth-asia",
    title: "Regular NRI Field Audits",
    desc: "Periodic on-site visits and photo reports so you always know your property's condition.",
  },
  {
    icon: "fa-shield-halved",
    title: "No Hidden Surprises",
    desc: "Fully transparent pricing, documentation, and process from day one to handover.",
  },
  {
    icon: "fa-handshake-simple",
    title: "Dedicated Hands-on Advice",
    desc: "Personal expert guidance tailored to your goals, budget, and unique situation.",
  },
];

export default function WhyClientsTrustSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#1F0A10] via-[#2d0f17] to-[#120508] text-white"
    >
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(197,168,128,0.12)_0%,transparent_70%)] -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(197,168,128,0.08)_0%,transparent_70%)] translate-x-1/3 translate-y-1/3"></div>

      {/* Gold Top Line */}
      <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent"></div>

      <div className="relative z-10 w-full px-8 sm:px-16 lg:px-24 py-20 sm:py-28">
        {/* Header */}
        <div className="text-center mb-16 reveal-slide-up">
          <span className="font-['Inter',sans-serif] text-xs font-bold tracking-[0.30em] uppercase block mb-3 text-[#c5a880]">
            EARNED TRUST &amp; DEPENDABILITY
          </span>
          <h2 className="font-['Outfit',sans-serif] font-extrabold text-white leading-tight text-3xl sm:text-4xl lg:text-5xl">
            Why Clients Trust <span className="text-[#c5a880]">Vizhi Infragen</span>
          </h2>
          <div className="w-20 h-[2px] mx-auto mt-5 bg-gradient-to-r from-transparent via-[#c5a880] to-transparent"></div>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-[1400px] mx-auto">
          {/* Left Narrative */}
          <div className="space-y-6 reveal-slide-right">
            <p className="font-['Inter',sans-serif] text-stone-300 leading-[1.9] text-base">
              Confidence in real estate is earned, never claimed. Every transaction we handle is led by people who have done it before — verifying titles, walking sites, negotiating fairly, and reporting honestly.
            </p>
            <p className="font-['Inter',sans-serif] font-semibold text-white leading-[1.9] text-base">
              For our NRI clients especially, this means consistent updates and verifiable records, so your property is as secure as if you were managing it yourself.
            </p>
            <p className="font-['Inter',sans-serif] text-stone-300 leading-[1.9] text-base">
              We believe in showing our work, not just promising results. That commitment to professionalism and transparency is what makes Vizhi Infragen a partner clients return to and recommend.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 mt-2 font-['Inter',sans-serif] font-semibold text-sm px-7 py-3 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-[#c5a880] text-[#1F0A10]"
            >
              <span>Start Your Journey</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
          </div>

          {/* Right 4 Grid Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 reveal-slide-left">
            {trustFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 bg-white/[0.04] border-[#c5a880]/20 hover:border-[#c5a880]/50"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 transition-all duration-300 group-hover:scale-110 bg-[#c5a880]/15 text-[#c5a880]">
                  <i className={`fa-solid ${feat.icon}`}></i>
                </div>
                <h4 className="font-['Outfit',sans-serif] font-bold text-white text-base mb-2">
                  {feat.title}
                </h4>
                <p className="font-['Inter',sans-serif] text-stone-400 text-xs leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gold Bottom Line */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent"></div>
    </section>
  );
}
