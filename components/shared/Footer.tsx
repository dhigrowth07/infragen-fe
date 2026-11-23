"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSiteSettings } from "@/lib/context/SiteSettingsContext";

export default function Footer() {
  const { siteInfo } = useSiteSettings();


  return (
    <footer className="bg-[#331C20] text-white pt-14 pb-8 px-6 sm:px-10 lg:px-16 flex flex-col items-center justify-start relative overflow-hidden text-left border-t border-white/10">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-start max-w-[1440px] px-2 sm:px-6 lg:px-8 relative z-10 mx-auto">
        
        {/* Col 1: Brand Logo & Tagline */}
        <div className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-2 flex flex-col gap-3.5 items-start justify-start lg:-ml-2 xl:-ml-4 -mt-2.5 sm:-mt-3.5 lg:-mt-4">
          <Link href="/" className="inline-block hover:scale-105 transition-transform duration-300">
            <Image
              src="/vizhi-infragen-realtors-logo-white.png"
              alt="Vizhi Infragen Realtors Logo"
              width={155}
              height={105}
              className="w-[145px] sm:w-[155px] h-auto object-contain footer-logo-img"
            />
          </Link>
          <p className="text-stone-300 font-['Inter',sans-serif] text-xs sm:text-[13px] leading-relaxed max-w-[260px]">
            Building the future with geometric<br />
            precision and organic harmony.<br />
            Elevating real estate standards.
          </p>
        </div>

        {/* Col 2: Company */}
        <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2 flex flex-col gap-2 items-start justify-start">
          <h4 className="text-white font-['Outfit',sans-serif] text-base font-bold mb-1 tracking-wide leading-6">Company</h4>
          <Link href="/about-us" className="text-stone-300 hover:text-[#c5a880] transition-colors font-['Inter',sans-serif] text-xs sm:text-[13px] leading-5 font-medium">About us</Link>
          <Link href="/properties/building" className="text-stone-300 hover:text-[#c5a880] transition-colors font-['Inter',sans-serif] text-xs sm:text-[13px] leading-5 font-medium">Residential Property</Link>
          <Link href="/services" className="text-stone-300 hover:text-[#c5a880] transition-colors font-['Inter',sans-serif] text-xs sm:text-[13px] leading-5 font-medium">Commercial property</Link>
          <Link href="/services" className="text-stone-300 hover:text-[#c5a880] transition-colors font-['Inter',sans-serif] text-xs sm:text-[13px] leading-5 font-medium">Services</Link>
          <Link href="/contact" className="text-stone-300 hover:text-[#c5a880] transition-colors font-['Inter',sans-serif] text-xs sm:text-[13px] leading-5 font-medium">Contact</Link>
        </div>

        {/* Col 3: Services (2 Equal Sub-columns of 5 & 5) */}
        <div className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-4 xl:col-span-4 flex flex-col gap-2 items-start sm:items-center justify-start w-full">
          <h4 className="text-white font-['Outfit',sans-serif] text-base font-bold mb-1 tracking-wide leading-6 text-left sm:text-center sm:-translate-x-10 w-full">Services</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-2 items-start w-full">
            {/* Sub-column 1 */}
            <div className="flex flex-col gap-2 items-start justify-start">
              <Link href="/services/land-sales" className="text-stone-300 hover:text-[#c5a880] transition-colors font-['Inter',sans-serif] text-xs sm:text-[13px] leading-5 font-medium">Land sales</Link>
              <Link href="/services/property-management" className="text-stone-300 hover:text-[#c5a880] transition-colors font-['Inter',sans-serif] text-xs sm:text-[13px] leading-5 font-medium">Property Management</Link>
              <Link href="/services/construction" className="text-stone-300 hover:text-[#c5a880] transition-colors font-['Inter',sans-serif] text-xs sm:text-[13px] leading-5 font-medium">Building Construction</Link>
              <Link href="/services/conversion" className="text-stone-300 hover:text-[#c5a880] transition-colors font-['Inter',sans-serif] text-xs sm:text-[13px] leading-5 font-medium">Land conversion services</Link>
              <Link href="/services/approvals" className="text-stone-300 hover:text-[#c5a880] transition-colors font-['Inter',sans-serif] text-xs sm:text-[13px] leading-5 font-medium">land approvals and documentation</Link>
            </div>
            {/* Sub-column 2 */}
            <div className="flex flex-col gap-2 items-start justify-start">
              <Link href="/services/purchase-assistance" className="text-stone-300 hover:text-[#c5a880] transition-colors font-['Inter',sans-serif] text-xs sm:text-[13px] leading-5 font-medium">land purchase Assistance</Link>
              <Link href="/services/nri-management" className="text-stone-300 hover:text-[#c5a880] transition-colors font-['Inter',sans-serif] text-xs sm:text-[13px] leading-5 font-medium">NRI property Management</Link>
              <Link href="/services/valuation" className="text-stone-300 hover:text-[#c5a880] transition-colors font-['Inter',sans-serif] text-xs sm:text-[13px] leading-5 font-medium">Building Valuation</Link>
              <Link href="/services/rentals" className="text-stone-300 hover:text-[#c5a880] transition-colors font-['Inter',sans-serif] text-xs sm:text-[13px] leading-5 font-medium">Rental services</Link>
              <Link href="/services/warehouse" className="text-stone-300 hover:text-[#c5a880] transition-colors font-['Inter',sans-serif] text-xs sm:text-[13px] leading-5 font-medium">warehouse and corporate solutions</Link>
            </div>
          </div>
        </div>

        {/* Col 4: Contact Us */}
        <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2 flex flex-col gap-2 items-start justify-start min-w-[210px]">
          <h4 className="text-white font-['Outfit',sans-serif] text-base font-bold mb-1 tracking-wide leading-6">Contact Us</h4>
          <a href={`mailto:${siteInfo.email}`} className="text-stone-300 hover:text-[#c5a880] transition-colors font-['Inter',sans-serif] text-xs sm:text-[13px] leading-5 font-medium whitespace-nowrap block">
            {siteInfo.email}
          </a>
          <div className="text-stone-300 font-['Inter',sans-serif] text-xs sm:text-[13px] leading-5 font-medium whitespace-nowrap flex items-center gap-1.5 flex-wrap">
            <a
              href={`tel:+91${(siteInfo.phone1Raw || siteInfo.phone1 || "").replace(/^(\+91|91)/, "").replace(/\D/g, "")}`}
              className="text-stone-300 hover:text-[#c5a880] transition-colors"
              title={`Call +91 ${siteInfo.phone1}`}
            >
              +91 {siteInfo.phone1.replace(/^\+91\s*/, "")}
            </a>
            {siteInfo.phone2 && (
              <>
                <span className="text-stone-400">/</span>
                <a
                  href={`tel:+91${(siteInfo.phone2Raw || siteInfo.phone2 || "").replace(/^(\+91|91)/, "").replace(/\D/g, "")}`}
                  className="text-stone-300 hover:text-[#c5a880] transition-colors"
                  title={`Call +91 ${siteInfo.phone2}`}
                >
                  {siteInfo.phone2.replace(/^\+91\s*/, "")}
                </a>
              </>
            )}
          </div>
          <div className="text-stone-300 font-['Inter',sans-serif] text-xs leading-relaxed max-w-[260px] pt-0.5">
            {siteInfo.address}
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-3 pt-2">
            <a href={siteInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#833AB4] hover:scale-110 transition-all duration-300 shadow-sm" aria-label="Instagram">
              <i className="fa-brands fa-instagram text-sm"></i>
            </a>
            <a href={siteInfo.social.whatsapp} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#25D366] hover:scale-110 transition-all duration-300 shadow-sm" aria-label="WhatsApp">
              <i className="fa-brands fa-whatsapp text-sm"></i>
            </a>
            <a href={siteInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#1877F2] hover:scale-110 transition-all duration-300 shadow-sm" aria-label="Facebook">
              <i className="fa-brands fa-facebook-f text-xs"></i>
            </a>
          </div>
        </div>

        {/* Col 5: Find Us (Satellite Google Map Card) */}
        <div className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-2 flex flex-col gap-2.5 items-start justify-start w-full lg:pl-4 xl:pl-6 lg:translate-x-2 xl:translate-x-3">
          <h4 className="text-white font-['Outfit',sans-serif] text-base font-bold mb-1 tracking-wide leading-6">Find Us</h4>
          <a
            href={siteInfo.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-white/20 w-full max-w-[260px] h-[155px] relative overflow-hidden shadow-lg group block cursor-pointer transition-transform hover:scale-[1.02]"
            aria-label="Open location in Google Maps"
          >
            <iframe
              src={siteInfo.mapsEmbed}
              className="absolute inset-0 w-full h-full border-0 opacity-90 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="bg-white/95 backdrop-blur-sm rounded-md px-2.5 py-1 flex items-center gap-1.5 absolute left-2.5 top-2.5 z-10 shadow-md">
              <span className="flex items-center gap-1 text-[#1a73e8] text-[11px] font-semibold">
                <span>Maps</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
              </span>
            </div>
            <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-sm rounded px-2 py-1 z-10 text-[10px] text-white truncate font-medium flex items-center justify-between">
              <span className="truncate">📍 Vizhi Infragen Realtors LLP</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-[8px] text-[#c5a880] ml-1 shrink-0"></i>
            </div>
          </a>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/10 pt-6 pb-2 px-2 sm:px-6 lg:px-8 flex items-center justify-center w-full max-w-[1440px] relative z-10 mx-auto mt-10">
        <div className="text-stone-400 text-center font-['Inter',sans-serif] text-xs font-medium">
          &copy; {siteInfo.copyrightYear} {siteInfo.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
