"use client";

import React from "react";

interface ProjectReelItem {
  src: string;
  alt: string;
  isLong: boolean;
}

const row1BaseItems: ProjectReelItem[] = [
  {
    src: "https://infragen-assets.s3.us-east-1.amazonaws.com/videos/01-property-2-70-acres-lt-bypass.webm",
    alt: "2.70 Acres L&T Bypass",
    isLong: false,
  },
  {
    src: "https://infragen-assets.s3.us-east-1.amazonaws.com/videos/02-property-4-5-cents-kovilpalayam-sathy-road.webm",
    alt: "4.5 Cents Kovilpalayam - Sathy Road",
    isLong: true,
  },
  {
    src: "https://infragen-assets.s3.us-east-1.amazonaws.com/videos/03-property-14-cents-kovilpalayam.webm",
    alt: "14 Cents Kovilpalayam",
    isLong: false,
  },
  {
    src: "https://infragen-assets.s3.us-east-1.amazonaws.com/videos/04-property-20-acres-farmland-kannampalayam.webm",
    alt: "20 Acres Farmland Kannampalayam",
    isLong: true,
  },
  {
    src: "https://infragen-assets.s3.us-east-1.amazonaws.com/videos/05-property-33-cents-opp-ocean.webm",
    alt: "33 Cents Opp Ocean",
    isLong: false,
  },
];

const row2BaseItems: ProjectReelItem[] = [
  {
    src: "https://infragen-assets.s3.us-east-1.amazonaws.com/videos/06-property-45-cents-chettipalayam.webm",
    alt: "45 Cents Chettipalayam",
    isLong: true,
  },
  {
    src: "https://infragen-assets.s3.us-east-1.amazonaws.com/videos/07-property-67-cents-lt-bypass.webm",
    alt: "67 Cents L&T Bypass",
    isLong: false,
  },
  {
    src: "https://infragen-assets.s3.us-east-1.amazonaws.com/videos/08-property-73-cents-opp-casagrand.webm",
    alt: "73 Cents Opp Casagrand",
    isLong: true,
  },
  {
    src: "https://infragen-assets.s3.us-east-1.amazonaws.com/videos/09-property-farmland-gated-community.webm",
    alt: "Farmland Gated Community",
    isLong: false,
  },
  {
    src: "https://infragen-assets.s3.us-east-1.amazonaws.com/videos/10-property-kurumbapalayam-main-road.webm",
    alt: "Kurumbapalayam Main Road",
    isLong: true,
  },
];

// Duplicate each row once for a seamless infinite scroll loop
const row1Items = [...row1BaseItems, ...row1BaseItems];
const row2Items = [...row2BaseItems, ...row2BaseItems];

export default function OurProjectsSection() {
  return (
    <section
      id="our-projects"
      className="py-20 sm:py-28 bg-[#2E1418] text-white overflow-hidden relative border-t border-b border-white/10"
    >
      {/* Subtle Ambient Lighting Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#612124]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Only Topic Name */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-5xl font-['Outfit',sans-serif] text-white font-extrabold tracking-tight">
            Our Projects
          </h2>
        </div>
      </div>

      {/* 2-Row Continuous Horizontal Video Scroll (Alternating Short & Long Boxes) */}
      <div className="space-y-6 sm:space-y-8 w-full overflow-hidden">
        {/* ROW 1: Scrolling Left Continuously */}
        <div className="marquee-container py-1">
          <div className="marquee-track-ltr flex items-center gap-6">
            {row1Items.map((item, idx) => (
              <div
                key={`r1-${idx}`}
                className={`${
                  item.isLong
                    ? "w-[240px] sm:w-[270px] h-[450px] sm:h-[510px]"
                    : "w-[240px] sm:w-[270px] h-[360px] sm:h-[420px]"
                } rounded-[24px] overflow-hidden relative group bg-stone-900 border border-white/10 shadow-2xl shrink-0 transition-transform duration-500 hover:scale-[1.03]`}
              >
                <video
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={(e) => {
                    e.currentTarget.muted = true;
                    e.currentTarget.play().catch(() => {});
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Scrolling Right Continuously */}
        <div className="marquee-container py-1">
          <div className="marquee-track-rtl flex items-center gap-6">
            {row2Items.map((item, idx) => (
              <div
                key={`r2-${idx}`}
                className={`${
                  item.isLong
                    ? "w-[240px] sm:w-[270px] h-[450px] sm:h-[510px]"
                    : "w-[240px] sm:w-[270px] h-[360px] sm:h-[420px]"
                } rounded-[24px] overflow-hidden relative group bg-stone-900 border border-white/10 shadow-2xl shrink-0 transition-transform duration-500 hover:scale-[1.03]`}
              >
                <video
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={(e) => {
                    e.currentTarget.muted = true;
                    e.currentTarget.play().catch(() => {});
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
