"use client";

import React, { useState } from "react";
import Image from "next/image";
import VideoModal from "@/components/shared/VideoModal";

interface ProjectReelItem {
  src: string;
  alt: string;
  isLong: boolean;
}

const row1BaseItems: ProjectReelItem[] = [
  { src: "/assets/images/carousel-villa-1.jpg", alt: "Modern Luxury Villa Project", isLong: false },
  { src: "/assets/images/carousel-villa-2.jpg", alt: "Contemporary Villa Architecture", isLong: true },
  { src: "/assets/images/plot-layout-1.jpg", alt: "Greenspace Elite Plot Layout", isLong: false },
  { src: "/assets/images/carousel-villa-3.jpg", alt: "Signature Frontage Landmark", isLong: true },
  { src: "/assets/images/hero-bright-house.jpg", alt: "Scenic Daylight Villa", isLong: false },
  { src: "/assets/images/carousel-villa-5.jpg", alt: "Scenic Garden Villa Estate", isLong: true },
];

const row2BaseItems: ProjectReelItem[] = [
  { src: "/assets/images/carousel-villa-4.jpg", alt: "Contemporary White Villa with Pool", isLong: true },
  { src: "/assets/images/hero-premium-building.jpg", alt: "Premium Commercial Building", isLong: false },
  { src: "/assets/images/plot-layout-2.jpg", alt: "Western County Layout Plots", isLong: true },
  { src: "/assets/images/land-development.jpg", alt: "Land Development & Gated Community", isLong: false },
  { src: "/assets/images/hero-1.jpg", alt: "Turnkey Architecture & Construction", isLong: true },
  { src: "/assets/images/plot-layout-3.jpg", alt: "Urbania Landmark Commercial Site", isLong: false },
];

// Duplicate each row once for a seamless infinite scroll loop
const row1Items = [...row1BaseItems, ...row1BaseItems];
const row2Items = [...row2BaseItems, ...row2BaseItems];

export default function OurProjectsSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
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
                  onClick={() => setIsVideoModalOpen(true)}
                  className={`${
                    item.isLong
                      ? "w-[240px] sm:w-[270px] h-[390px] sm:h-[440px]"
                      : "w-[240px] sm:w-[270px] h-[290px] sm:h-[330px]"
                  } rounded-[24px] overflow-hidden relative group bg-stone-900 border border-white/10 shadow-2xl shrink-0 cursor-pointer transition-transform duration-500 hover:scale-[1.03]`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Play ${item.alt} video`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setIsVideoModalOpen(true);
                    }
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 240px, 270px"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-500"></div>

                  {/* Center Reel Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-[#c5a880] group-hover:text-[#2D1217] transition-all shadow-lg">
                      <i className="fa-solid fa-play text-xs sm:text-sm ml-0.5"></i>
                    </div>
                  </div>
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
                  onClick={() => setIsVideoModalOpen(true)}
                  className={`${
                    item.isLong
                      ? "w-[240px] sm:w-[270px] h-[390px] sm:h-[440px]"
                      : "w-[240px] sm:w-[270px] h-[290px] sm:h-[330px]"
                  } rounded-[24px] overflow-hidden relative group bg-stone-900 border border-white/10 shadow-2xl shrink-0 cursor-pointer transition-transform duration-500 hover:scale-[1.03]`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Play ${item.alt} video`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setIsVideoModalOpen(true);
                    }
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 240px, 270px"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-500"></div>

                  {/* Center Reel Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-[#c5a880] group-hover:text-[#2D1217] transition-all shadow-lg">
                      <i className="fa-solid fa-play text-xs sm:text-sm ml-0.5"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Popup */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </>
  );
}
