"use client";

import React from "react";
import Image from "next/image";

export default function ContactHero() {
  return (
    <div id="contact-hero" className="relative text-white overflow-hidden pt-0 min-h-[640px] sm:min-h-[720px]">
      {/* Background Image (Edge-to-Edge, Top to Bottom with zoom animation) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src="/assets/images/carousel-villa-1.jpg"
          alt="Vizhi Infragen Realtors Luxury Property"
          fill
          priority
          sizes="100vw"
          className="carousel-zoom-img object-cover object-center"
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85"></div>
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Hero Centered Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center pt-36 sm:pt-40 pb-20 min-h-[640px] sm:min-h-[720px]">
        <div className="text-center max-w-3xl px-6 space-y-5 animate-float-down">
          
          {/* Badge */}
          <span className="text-[#c5a880] font-['Inter',sans-serif] text-xs sm:text-sm font-extrabold tracking-[0.35em] uppercase block drop-shadow-md">
            LET'S CONNECT
          </span>

          {/* Gold Line Above Heading */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-px bg-[#c5a880]/60 rounded-full"></div>
            <div className="w-2 h-2 rounded-full bg-[#c5a880]"></div>
            <div className="w-10 h-px bg-[#c5a880]/60 rounded-full"></div>
          </div>

          {/* Main H1 Heading */}
          <h1 className="font-extrabold font-['Outfit',sans-serif] text-white tracking-tight drop-shadow-2xl text-[36px] sm:text-[48px] leading-[44px] sm:leading-[56px]">
            Contact <span className="text-[#c5a880]">Us</span>
          </h1>

          {/* Gold Accent Bar */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <div className="w-8 h-px bg-[#c5a880]/50 rounded-full"></div>
            <div className="w-24 h-1.5 bg-[#c5a880] rounded-full shadow-lg shadow-[#c5a880]/60"></div>
            <div className="w-8 h-px bg-[#c5a880]/50 rounded-full"></div>
          </div>

          {/* Lead Paragraph */}
          <p className="text-stone-200 text-sm sm:text-base leading-relaxed font-['Inter',sans-serif] max-w-xl mx-auto font-normal opacity-90">
            We're here to help with all your real estate needs in Coimbatore. Reach out to our team for expert guidance and personalised solutions. We value your trust and look forward to working with you.
          </p>

          {/* 3 Trust Badges Centered */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 border-t border-white/15 mt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#c5a880]/60 bg-[#c5a880]/15 flex items-center justify-center text-[#c5a880] shrink-0 shadow-sm">
                <i className="fa-regular fa-comments text-base"></i>
              </div>
              <div className="text-left">
                <h4 className="text-white font-bold text-sm leading-tight">24/7</h4>
                <p className="text-stone-300 text-xs font-medium">Support</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#c5a880]/60 bg-[#c5a880]/15 flex items-center justify-center text-[#c5a880] shrink-0 shadow-sm">
                <i className="fa-solid fa-shield-halved text-base"></i>
              </div>
              <div className="text-left">
                <h4 className="text-white font-bold text-sm leading-tight">Trusted</h4>
                <p className="text-stone-300 text-xs font-medium">Local Experts</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#c5a880]/60 bg-[#c5a880]/15 flex items-center justify-center text-[#c5a880] shrink-0 shadow-sm">
                <i className="fa-regular fa-star text-base"></i>
              </div>
              <div className="text-left">
                <h4 className="text-white font-bold text-sm leading-tight">Client</h4>
                <p className="text-stone-300 text-xs font-medium">Satisfaction</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}



