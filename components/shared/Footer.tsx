"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSiteSettings } from "@/lib/context/SiteSettingsContext";

export default function Footer() {
  const { siteInfo } = useSiteSettings();
  return (
    <footer className="bg-[#121212] pt-16 pb-8 px-6 sm:px-10 lg:px-16 flex flex-col items-center justify-start relative overflow-hidden">
      <div className="pb-10 w-full shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 max-w-[1440px] px-6 sm:px-10 lg:px-16 relative z-10 mx-auto">
        {/* Col 1: Brand & Tagline */}
        <div className="flex flex-col gap-3 items-start justify-start relative text-left">
          <Link href="/" className="inline-block hover:scale-105 transition-transform duration-300">
            <Image
              width={150}
              height={80}
              className="shrink-0 w-[130px] h-[72px] sm:w-[150px] sm:h-[80px] relative object-contain footer-logo-img"
              src="/vizhi-infragen-realtors-logo-white.png"
              alt="Vizhi Infragen Realtors Logo"
              style={{ width: "auto", height: "auto" }}
            />
          </Link>
          <div className="flex flex-col gap-0 items-start justify-start shrink-0 max-w-[260px] relative text-left">
            <p className="text-[#9b98a1] text-left font-['Inter',sans-serif] text-xs leading-[18px] font-normal relative block">
              Building the future with geometric<br />
              precision and organic harmony.<br />
              Elevating real estate standards.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-[#c99b4a] hover:bg-[#b98c3b] hover:scale-[1.02] active:scale-[0.98] rounded-full border-none py-1.5 px-3.5 flex flex-row gap-2 items-center justify-start shrink-0 relative transition-all duration-300 group shadow-md mt-1"
          >
            <span className="text-[#3f131c] text-left font-['Inter',sans-serif] text-xs font-semibold relative flex items-center justify-start">
              Start Property Journey
            </span>
            <i className="fa-solid fa-arrow-right text-[#3f131c] text-[10px] group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </div>

        {/* Col 2: Company Links */}
        <div className="flex flex-col gap-2 items-start justify-start relative">
          <div className="text-[#ffffff] text-left font-['Inter',sans-serif] text-base leading-5 font-bold relative self-stretch flex items-center justify-start mb-0.5">
            Company
          </div>
          <Link href="/about-us" className="text-[#9b98a1] hover:text-white transition-colors text-left font-['Inter',sans-serif] text-xs leading-[20px] font-normal">
            About Us
          </Link>
          <Link href="/services" className="text-[#9b98a1] hover:text-white transition-colors text-left font-['Inter',sans-serif] text-xs leading-[20px] font-normal">
            Our Services
          </Link>
          <Link href="/properties/land" className="text-[#9b98a1] hover:text-white transition-colors text-left font-['Inter',sans-serif] text-xs leading-[20px] font-normal">
            Land Sales &amp; Plots
          </Link>
          <Link href="/properties/building" className="text-[#9b98a1] hover:text-white transition-colors text-left font-['Inter',sans-serif] text-xs leading-[20px] font-normal">
            Villas &amp; Buildings
          </Link>
          <Link href="/#projects" className="text-[#9b98a1] hover:text-white transition-colors text-left font-['Inter',sans-serif] text-xs leading-[20px] font-normal">
            Projects
          </Link>
          <Link href="/contact" className="text-[#9b98a1] hover:text-white transition-colors text-left font-['Inter',sans-serif] text-xs leading-[20px] font-normal">
            Contact
          </Link>
        </div>

        {/* Col 3: Services Links */}
        <div className="flex flex-col gap-1.5 items-start justify-start relative">
          <div className="text-[#ffffff] text-left font-['Inter',sans-serif] text-base leading-5 font-bold relative self-stretch flex items-center justify-start mb-0.5">
            Services
          </div>
          {[
            { name: "Land Sales & Acquisition", href: "/services/land-sales" },
            { name: "Residential Property", href: "/services/purchase-assistance" },
            { name: "Commercial Property", href: "/services/warehouse" },
            { name: "Property Rental Services", href: "/services/rentals" },
            { name: "NRI Property Management", href: "/services/nri-management" },
            { name: "Land Approval Assistance", href: "/services/approvals" },
            { name: "Land Conversion Assistance", href: "/services/conversion" },
            { name: "Building Valuation Coordination", href: "/services/valuation" },
            { name: "Building Construction", href: "/services/construction" },
            { name: "Structural Works", href: "/services/construction" },
            { name: "Warehouse Solutions", href: "/services/warehouse" },
            { name: "Real Estate Investment Assistance", href: "/services/purchase-assistance" },
          ].map((service) => (
            <Link
              key={service.name}
              href={service.href}
              className="text-[#9b98a1] hover:text-white transition-colors text-left font-['Inter',sans-serif] text-xs leading-[18px] font-normal"
            >
              {service.name}
            </Link>
          ))}
        </div>

        {/* Col 4: Contact Info */}
        <div className="flex flex-col gap-2 items-start justify-start relative">
          <div className="text-[#ffffff] text-left font-['Inter',sans-serif] text-base leading-5 font-bold relative self-stretch flex items-center justify-start mb-0.5">
            Contact Us
          </div>
          <a href={`mailto:${siteInfo.email}`} className="text-[#9b98a1] hover:text-white transition-colors text-left font-['Inter',sans-serif] text-xs leading-[20px] font-normal break-all">
            {siteInfo.email}
          </a>
          <a href={`tel:${siteInfo.phone1Raw}`} className="text-[#9b98a1] hover:text-white transition-colors text-left font-['Inter',sans-serif] text-xs leading-[20px] font-normal">
            +91 {siteInfo.phone1} / {siteInfo.phone2}
          </a>
          <div className="text-[#9b98a1] text-left font-['Inter',sans-serif] text-xs leading-[18px] font-normal max-w-[220px]">
            {siteInfo.address}
          </div>
        </div>

        {/* Col 5: Find Us Google Map */}
        <div className="flex flex-col gap-2 items-start justify-start relative w-full">
          <div className="text-[#ffffff] text-left font-[#Inter',sans-serif] text-base leading-5 font-bold relative self-stretch flex items-center justify-start mb-0.5">
            Find Us
          </div>
          <div className="rounded-xl border-solid border-[rgba(255,255,255,0.12)] border flex flex-col gap-0 items-start justify-center w-full max-w-[200px] shrink-0 h-[120px] relative overflow-hidden shadow-md">
            <div className="bg-[rgba(255,255,255,0.20)] w-full h-full relative overflow-hidden">
              <iframe
                src={siteInfo.mapsEmbed}
                className="absolute inset-0 w-full h-full border-0 grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="bg-white rounded-sm px-2 py-1 flex items-center justify-start shrink-0 absolute left-2 top-2 z-10 shadow-md">
                <a
                  href={siteInfo.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row gap-1 items-center justify-start cursor-pointer group"
                >
                  <span className="text-[#1a73e8] text-[10px] font-medium group-hover:underline">Maps</span>
                  <i className="fa-solid fa-location-dot text-[#1a73e8] text-[9px]"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-solid border-[rgba(255,255,255,0.1)] border-t py-6 px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between w-full max-w-[1440px] gap-4 relative z-10 mx-auto">
        <div className="text-[#888888] text-center sm:text-left font-['Inter',sans-serif] text-xs font-normal">
          © {siteInfo.copyrightYear} {siteInfo.name}. All rights reserved.
        </div>
        <div className="flex flex-row gap-7 sm:gap-8 items-center justify-start shrink-0">
          <a href={siteInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:scale-125 transition-transform duration-300" aria-label="Instagram">
            <i className="fa-brands fa-instagram text-xl"></i>
          </a>
          <a href={siteInfo.social.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:scale-125 transition-transform duration-300" aria-label="WhatsApp">
            <i className="fa-brands fa-whatsapp text-xl"></i>
          </a>
          <a href={siteInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:scale-125 transition-transform duration-300" aria-label="Facebook">
            <i className="fa-brands fa-facebook-f text-xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
