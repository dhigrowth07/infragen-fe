"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface SecondaryService {
  title: string;
  img: string;
  href: string;
}

const secondaryServices: SecondaryService[] = [
  { title: "Building Construction", img: "/assets/images/service-5.jpg", href: "/services/construction" },
  { title: "Building Valuation", img: "/assets/images/service-6.jpg", href: "/services/valuation" },
  { title: "Land Approvals", img: "/assets/images/service-7.jpg", href: "/services/approvals" },
  { title: "Land Conversion", img: "/assets/images/service-8.jpg", href: "/services/conversion" },
  { title: "Rental Services", img: "/assets/images/service-9.jpg", href: "/services/rentals" },
  { title: "Warehouse & Corporate", img: "/assets/images/service-10.jpg", href: "/services/warehouse" },
];

export default function WhatWeDoSection() {
  return (
    <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#FDFBF7] overflow-hidden">
      <div className="max-w-[1440px] mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 reveal-up">
          <span className="text-[#c5a880] font-['Inter',sans-serif] text-xs font-bold tracking-[0.2em] uppercase block">
            COMPREHENSIVE OFFERINGS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] font-['Outfit',sans-serif] tracking-tight">
            What We Do
          </h2>
          <div className="w-16 h-1 bg-[#c5a880] mx-auto rounded-full"></div>
          <p className="text-stone-600 text-xs sm:text-sm font-['Inter',sans-serif] max-w-xl mx-auto">
            We offer a complete range of property services so you never have to coordinate multiple agencies.
          </p>
        </div>

        {/* Primary Photo Grid (Matches Reference Bento Grid Layout) */}
        <div className="wwd-grid reveal-up">
          {/* 1: Land Sales (Tall - Column 1) */}
          <Link href="/services/land-sales" className="wwd-card wwd-tall block">
            <Image
              src="/assets/images/service-1.jpg"
              alt="Land Sales"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="wwd-card-overlay"></div>
            <div className="wwd-card-label">
              <div className="flex items-end justify-between">
                <div>
                  <h4 className="text-white font-extrabold text-xl font-['Outfit',sans-serif]">
                    Land Sales
                  </h4>
                  <p className="text-stone-400 text-xs font-['Inter',sans-serif]">
                    DTCP &amp; RERA verified plots
                  </p>
                </div>
                <div className="wwd-arrow-btn">
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </div>
              </div>
            </div>
          </Link>

          {/* 2: Purchase Assistance (Top - Column 2) */}
          <Link href="/services/purchase-assistance" className="wwd-card block">
            <Image
              src="/assets/images/service-2.jpg"
              alt="Purchase Assistance"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="wwd-card-overlay"></div>
            <div className="wwd-card-label">
              <div className="flex items-end justify-between">
                <div>
                  <h4 className="text-white font-extrabold text-lg font-['Outfit',sans-serif]">
                    Purchase Assistance
                  </h4>
                  <p className="text-stone-400 text-xs font-['Inter',sans-serif]">
                    End-to-end guidance
                  </p>
                </div>
                <div className="wwd-arrow-btn">
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </div>
              </div>
            </div>
          </Link>

          {/* 3: Property Management (Tall - Column 3) */}
          <Link href="/services/property-management" className="wwd-card wwd-tall block">
            <Image
              src="/assets/images/service-4.jpg"
              alt="Property Management"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="wwd-card-overlay"></div>
            <div className="wwd-card-label">
              <div className="flex items-end justify-between">
                <div>
                  <h4 className="text-white font-extrabold text-xl font-['Outfit',sans-serif]">
                    Property Management
                  </h4>
                  <p className="text-stone-400 text-xs font-['Inter',sans-serif]">
                    Complete maintenance &amp; inspection
                  </p>
                </div>
                <div className="wwd-arrow-btn">
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </div>
              </div>
            </div>
          </Link>

          {/* 4: NRI Property Shield (Bottom - Column 2) */}
          <Link href="/services/nri-management" className="wwd-card block">
            <Image
              src="/assets/images/service-3.jpg"
              alt="NRI Property Shield"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="wwd-card-overlay"></div>
            <div className="wwd-card-label">
              <div className="flex items-end justify-between">
                <div>
                  <h4 className="text-white font-extrabold text-lg font-['Outfit',sans-serif]">
                    NRI Property Shield
                  </h4>
                  <p className="text-stone-400 text-xs font-['Inter',sans-serif]">
                    Dedicated overseas asset protection
                  </p>
                </div>
                <div className="wwd-arrow-btn">
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Secondary 6-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 reveal-up" style={{ transitionDelay: "200ms" }}>
          {secondaryServices.map((item, idx) => (
            <Link
              href={item.href}
              key={idx}
              className="wwd-card block"
              style={{ minHeight: "165px" }}
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover"
              />
              <div className="wwd-card-overlay"></div>

              <div className="wwd-card-label">
                <div className="flex items-end justify-between gap-1">
                  <h4 className="text-white font-extrabold text-sm font-['Outfit',sans-serif]">
                    {item.title}
                  </h4>
                  <div className="wwd-arrow-btn" style={{ width: "22px", height: "22px" }}>
                    <i className="fa-solid fa-arrow-right" style={{ fontSize: "9px" }}></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
