"use client";

import React from "react";

export default function ContactCtaBanner() {
  return (
    <section className="bg-[#381e23] text-white py-16 sm:py-20 px-6 sm:px-10 lg:px-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[#c5a880] font-['Inter',sans-serif] text-xs font-bold tracking-[0.25em] uppercase block">
              READY TO GET STARTED?
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit',sans-serif] tracking-tight leading-tight">
              Let's Build Something <span className="text-[#c5a880]">Extraordinary</span> Together
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm font-['Inter',sans-serif]">
              Your dream property is just a conversation away.
            </p>

            <div className="pt-2">
              <a
                href="tel:9688889420"
                className="bg-[#c5a880] hover:bg-white text-[#381e23] hover:text-[#381e23] px-8 py-4 rounded-xl text-sm font-extrabold font-['Outfit',sans-serif] transition-all duration-300 inline-flex items-center gap-2 shadow-xl hover:shadow-2xl active:scale-[0.98]"
              >
                <span>Get in Touch Today</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </a>
            </div>
          </div>

          {/* Right Features */}
          <div className="lg:col-span-5 space-y-4 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/15 lg:pl-10">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#c5a880]/20 text-[#c5a880] flex items-center justify-center shrink-0 mt-0.5">
                <i className="fa-solid fa-users text-xs"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm text-white font-['Outfit',sans-serif]">Expert Guidance</h4>
                <p className="text-stone-300 text-xs font-['Inter',sans-serif]">From our local real estate experts</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#c5a880]/20 text-[#c5a880] flex items-center justify-center shrink-0 mt-0.5">
                <i className="fa-solid fa-sliders text-xs"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm text-white font-['Outfit',sans-serif]">Personalised Solutions</h4>
                <p className="text-stone-300 text-xs font-['Inter',sans-serif]">Tailored to meet your needs</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#c5a880]/20 text-[#c5a880] flex items-center justify-center shrink-0 mt-0.5">
                <i className="fa-solid fa-handshake text-xs"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm text-white font-['Outfit',sans-serif]">Trusted Partnership</h4>
                <p className="text-stone-300 text-xs font-['Inter',sans-serif]">Building relationships that last</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
