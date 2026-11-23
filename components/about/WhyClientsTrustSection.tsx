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
      className="relative w-full overflow-hidden"
      style={{ background: "#D0B999", margin: 0 }}
    >
      {/* Decorative subtle light tints */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.28) 0%, transparent 70%)",
          transform: "translate(-30%, -30%)",
        }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
          transform: "translate(30%, 30%)",
        }}
      ></div>

      {/* Maroon top accent line */}
      <div
        className="w-full h-[3px]"
        style={{
          background: "linear-gradient(90deg, transparent, #331C20 30%, #331C20 70%, transparent)",
        }}
      ></div>

      <div className="relative z-10 w-full px-8 sm:px-16 lg:px-24 py-20 sm:py-28">
        {/* Header */}
        <div className="text-center mb-16 reveal-slide-up">
          <span className="font-['Inter',sans-serif] text-xs font-extrabold tracking-[0.30em] uppercase block mb-3 text-[#331C20]">
            EARNED TRUST &amp; DEPENDABILITY
          </span>
          <h2
            className="font-['Outfit',sans-serif] font-extrabold text-[#1F0A10] leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Why Clients Trust <span className="text-[#521922]">Vizhi Infragen</span>
          </h2>
          <div
            className="w-20 h-[2px] mx-auto mt-5"
            style={{
              background: "linear-gradient(90deg, transparent, #331C20, transparent)",
            }}
          ></div>
        </div>

        {/* Two-column layout: text left, 4-grid right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-[1400px] mx-auto">
          {/* Left: narrative text */}
          <div className="space-y-6 reveal-slide-right">
            <p className="font-['Inter',sans-serif] text-[#331C20]/90 leading-[1.85] text-base sm:text-[17.5px]">
              Confidence in real estate is earned, never claimed. Every transaction we handle is led by people who have
              done it before — verifying titles, walking sites, negotiating fairly, and reporting honestly.
            </p>
            <p className="font-['Inter',sans-serif] font-bold text-[#1F0A10] leading-[1.85] text-base sm:text-[17.5px]">
              For our NRI clients especially, this means consistent updates and verifiable records, so your property is as
              secure as if you were managing it yourself.
            </p>
            <p className="font-['Inter',sans-serif] text-[#331C20]/90 leading-[1.85] text-base sm:text-[17.5px]">
              We believe in showing our work, not just promising results. That commitment to professionalism and
              transparency is what makes Vizhi Infragen a partner clients return to and recommend.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 mt-2 font-['Inter',sans-serif] font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-white"
              style={{ background: "#331C20" }}
            >
              <span>Start Your Journey</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
          </div>

          {/* Right: 4 trust feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 reveal-slide-left">
            {trustFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 bg-white border-[#331C20]/15 shadow-sm hover:shadow-md"
              >
                <div className="mb-4 text-[#331C20] text-3xl transition-transform duration-300 group-hover:scale-110">
                  <i className={`fa-solid ${feat.icon}`}></i>
                </div>
                <h4 className="font-['Outfit',sans-serif] font-bold text-[#1F0A10] text-base sm:text-lg mb-2">
                  {feat.title}
                </h4>
                <p className="font-['Inter',sans-serif] text-[#331C20]/80 text-xs sm:text-[13px] leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Maroon bottom border line — seamlessly connects to footer */}
      <div
        className="w-full h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent, #331C20 30%, #331C20 70%, transparent)",
        }}
      ></div>
    </section>
  );
}
