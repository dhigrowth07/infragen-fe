"use client";

import React, { useEffect, useRef, useState } from "react";

interface ProjectReelItem {
  mp4Src: string;
  webmSrc: string;
  poster: string;
  alt: string;
  isLong: boolean;
}

const row1BaseItems: ProjectReelItem[] = [
  {
    mp4Src: "/videos/projects/01-property-2-70-acres-lt-bypass.mp4",
    webmSrc: "https://infragen-assets.s3.us-east-1.amazonaws.com/videos/01-property-2-70-acres-lt-bypass.webm",
    poster: "/videos/posters/01-property-2-70-acres-lt-bypass.webp",
    alt: "2.70 Acres L&T Bypass",
    isLong: false,
  },
  {
    mp4Src: "/videos/projects/02-property-4-5-cents-kovilpalayam-sathy-road.mp4",
    webmSrc: "https://infragen-assets.s3.us-east-1.amazonaws.com/videos/02-property-4-5-cents-kovilpalayam-sathy-road.webm",
    poster: "/videos/posters/02-property-4-5-cents-kovilpalayam-sathy-road.webp",
    alt: "4.5 Cents Kovilpalayam - Sathy Road",
    isLong: true,
  },
  {
    mp4Src: "/videos/projects/03-property-14-cents-kovilpalayam.mp4",
    webmSrc: "https://infragen-assets.s3.us-east-1.amazonaws.com/videos/03-property-14-cents-kovilpalayam.webm",
    poster: "/videos/posters/03-property-14-cents-kovilpalayam.webp",
    alt: "14 Cents Kovilpalayam",
    isLong: false,
  },
  {
    mp4Src: "/videos/projects/04-property-20-acres-farmland-kannampalayam.mp4",
    webmSrc: "https://infragen-assets.s3.us-east-1.amazonaws.com/videos/04-property-20-acres-farmland-kannampalayam.webm",
    poster: "/videos/posters/04-property-20-acres-farmland-kannampalayam.webp",
    alt: "20 Acres Farmland Kannampalayam",
    isLong: true,
  },
  {
    mp4Src: "/videos/projects/05-property-33-cents-opp-ocean.mp4",
    webmSrc: "https://infragen-assets.s3.us-east-1.amazonaws.com/videos/05-property-33-cents-opp-ocean.webm",
    poster: "/videos/posters/05-property-33-cents-opp-ocean.webp",
    alt: "33 Cents Opp Ocean",
    isLong: false,
  },
];

const row2BaseItems: ProjectReelItem[] = [
  {
    mp4Src: "/videos/projects/06-property-45-cents-chettipalayam.mp4",
    webmSrc: "https://infragen-assets.s3.us-east-1.amazonaws.com/videos/06-property-45-cents-chettipalayam.webm",
    poster: "/videos/posters/06-property-45-cents-chettipalayam.webp",
    alt: "45 Cents Chettipalayam",
    isLong: true,
  },
  {
    mp4Src: "/videos/projects/07-property-67-cents-lt-bypass.mp4",
    webmSrc: "https://infragen-assets.s3.us-east-1.amazonaws.com/videos/07-property-67-cents-lt-bypass.webm",
    poster: "/videos/posters/07-property-67-cents-lt-bypass.webp",
    alt: "67 Cents L&T Bypass",
    isLong: false,
  },
  {
    mp4Src: "/videos/projects/08-property-73-cents-opp-casagrand.mp4",
    webmSrc: "https://infragen-assets.s3.us-east-1.amazonaws.com/videos/08-property-73-cents-opp-casagrand.webm",
    poster: "/videos/posters/08-property-73-cents-opp-casagrand.webp",
    alt: "73 Cents Opp Casagrand",
    isLong: true,
  },
  {
    mp4Src: "/videos/projects/09-property-farmland-gated-community.mp4",
    webmSrc: "https://infragen-assets.s3.us-east-1.amazonaws.com/videos/09-property-farmland-gated-community.webm",
    poster: "/videos/posters/09-property-farmland-gated-community.webp",
    alt: "Farmland Gated Community",
    isLong: false,
  },
  {
    mp4Src: "/videos/projects/10-property-kurumbapalayam-main-road.mp4",
    webmSrc: "https://infragen-assets.s3.us-east-1.amazonaws.com/videos/10-property-kurumbapalayam-main-road.webm",
    poster: "/videos/posters/10-property-kurumbapalayam-main-road.webp",
    alt: "Kurumbapalayam Main Road",
    isLong: true,
  },
];

// Duplicate each row once for a seamless infinite scroll loop
const row1Items = [...row1BaseItems, ...row1BaseItems];
const row2Items = [...row2BaseItems, ...row2BaseItems];

function ProjectCard({ item, inView }: { item: ProjectReelItem; inView: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (inView && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [inView]);

  return (
    <div
      className={`${
        item.isLong
          ? "w-[240px] sm:w-[270px] h-[450px] sm:h-[510px]"
          : "w-[240px] sm:w-[270px] h-[360px] sm:h-[420px]"
      } rounded-[24px] overflow-hidden relative group bg-stone-900 border border-white/10 shadow-2xl shrink-0 transition-transform duration-500 hover:scale-[1.03]`}
    >
      {/* Background Poster Image - Shows IMMEDIATELY with 0 delay (no black screen) */}
      <img
        src={item.poster}
        alt={item.alt}
        loading="eager"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video Element - Streams ultra-fast when inView */}
      {inView && (
        <video
          ref={videoRef}
          poster={item.poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onPlaying={() => setIsPlaying(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-opacity duration-700 pointer-events-none ${
            isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={item.mp4Src} type="video/mp4" />
          <source src={item.webmSrc} type="video/webm" />
        </video>
      )}

      {/* Subtle Ambient Hover Overlay */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none"></div>
    </div>
  );
}

export default function OurProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { rootMargin: "300px" } // Start preloading 300px before arriving at the section
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
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
              <ProjectCard key={`r1-${idx}`} item={item} inView={inView} />
            ))}
          </div>
        </div>

        {/* ROW 2: Scrolling Right Continuously */}
        <div className="marquee-container py-1">
          <div className="marquee-track-rtl flex items-center gap-6">
            {row2Items.map((item, idx) => (
              <ProjectCard key={`r2-${idx}`} item={item} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
