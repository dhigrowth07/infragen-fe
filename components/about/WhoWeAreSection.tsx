"use client";

import React from "react";
import Image from "next/image";

export default function WhoWeAreSection() {
  const targetClients = [
    "Property Owners",
    "Buyers",
    "Investors",
    "Corporate Clients",
    "NRIs",
  ];

  const credentials = [
    { icon: "fa-solid fa-bullseye", label: "National Champion Shooter" },
    { icon: "fa-solid fa-medal", label: "State-Level Karate Champion" },
    { icon: "fa-solid fa-handshake", label: "BNI Member" },
    { icon: "fa-solid fa-user-tie", label: "JCI Secretary" },
  ];

  return (
    <div className="relative bg-white pb-20 sm:pb-28 z-20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Overlapping Founder Image Card */}
          <div className="lg:col-span-5 relative -mt-16 sm:-mt-20 z-30 reveal-slide-right">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white group w-full">
              <div className="relative h-[440px] sm:h-[540px] lg:h-[640px] xl:h-[700px] w-full">
                <Image
                  src="/assets/images/about-founder.jpeg"
                  alt="Sekar - Managing Director, Vizhi Infragen Realtors LLP"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>

              {/* Top Role Tag */}
              <div className="absolute top-5 left-5 bg-[#381e23]/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-[#c5a880]/40 shadow-lg">
                <span className="text-[#c5a880] text-[10px] font-bold font-['Inter',sans-serif] tracking-wider uppercase">
                  Managing Director
                </span>
              </div>

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200 shadow-2xl animate-bob">
                <div className="flex items-center gap-4">
                  <div className="w-13 h-13 rounded-full bg-[#4E1421] text-[#c5a880] flex items-center justify-center text-lg shrink-0 font-extrabold shadow-md font-['Outfit',sans-serif]">
                    7+
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-[#1E293B] font-['Outfit',sans-serif] truncate">
                      Sekar
                    </h4>
                    <p className="text-xs text-[#612124] font-semibold font-['Inter',sans-serif]">
                      Managing Director
                    </p>
                    <p className="text-[11px] text-stone-500 font-['Inter',sans-serif]">
                      7+ Years of Leadership &amp; Excellence
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content Narrative */}
          <div className="lg:col-span-7 pt-4 lg:pt-8 reveal-slide-left space-y-8">
            
            {/* Who We Are & Tagline */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4E1421]/5 border border-[#c5a880]/30 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]"></span>
                <span className="text-[#612124] font-['Inter',sans-serif] text-xs font-bold tracking-[0.25em] uppercase">
                  Who We Are
                </span>
              </div>

              <h2 className="font-extrabold font-['Outfit',sans-serif] text-[#612124] text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3">
                Your Property. Your Vision.<br className="hidden sm:inline" />{" "}
                <span className="text-[#c5a880]">Our Commitment.</span>
              </h2>

              <div className="w-14 h-1 bg-[#c5a880] rounded-full mb-5"></div>

              <p className="font-['Inter',sans-serif] leading-[1.85] text-stone-600 text-sm sm:text-base">
                Vizhi Infragen Realtors LLP provides comprehensive real estate solutions across Coimbatore and surrounding areas. We serve property owners, buyers, investors, corporate clients, and NRIs with professional property assistance and personalised service.
              </p>

              {/* Target Clients Pills */}
              <div className="flex flex-wrap gap-2 pt-4">
                {targetClients.map((client) => (
                  <span
                    key={client}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-medium font-['Inter',sans-serif] border border-stone-200"
                  >
                    <i className="fa-solid fa-check text-[#c5a880] text-[10px]"></i>
                    {client}
                  </span>
                ))}
              </div>
            </div>

            {/* About Our Managing Director Card */}
            <div className="bg-[#FDFBF7] rounded-2xl p-6 sm:p-7 border border-[#c5a880]/30 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#c5a880]/15 to-transparent rounded-bl-full pointer-events-none"></div>

              <span className="text-[#c5a880] font-['Inter',sans-serif] text-xs font-bold tracking-[0.25em] uppercase block mb-1.5">
                About Our Managing Director
              </span>

              <div className="flex flex-wrap items-baseline gap-2 mb-3">
                <h3 className="font-bold font-['Outfit',sans-serif] text-[#612124] text-xl sm:text-2xl">
                  Sekar
                </h3>
                <span className="text-stone-400 font-light">|</span>
                <span className="text-stone-700 font-semibold font-['Inter',sans-serif] text-sm sm:text-base">
                  Managing Director
                </span>
              </div>

              <p className="font-['Inter',sans-serif] leading-[1.8] text-stone-600 text-sm sm:text-base mb-5">
                With 7 years of real estate experience, Sekar leads Vizhi Infragen Realtors LLP with a focus on trust, transparency, and client satisfaction. A BNI member, JCI Secretary, national champion shooter, and state-level karate champion, he brings leadership, discipline, and determination to the business.
              </p>

              {/* Highlights & Credentials
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-stone-200/80">
                {credentials.map((cred) => (
                  <div
                    key={cred.label}
                    className="flex items-center gap-2.5 text-xs text-stone-700 font-['Inter',sans-serif]"
                  >
                    <span className="w-7 h-7 rounded-lg bg-[#4E1421] text-[#c5a880] flex items-center justify-center shrink-0">
                      <i className={`${cred.icon} text-xs`}></i>
                    </span>
                    <span className="font-medium">{cred.label}</span>
                  </div>
                ))}
              </div>
              */}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
