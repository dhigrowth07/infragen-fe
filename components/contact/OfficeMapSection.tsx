"use client";

import React from "react";
import { useSiteSettings } from "@/lib/context/SiteSettingsContext";

export default function OfficeMapSection() {
  const { siteInfo } = useSiteSettings();
  return (
    <section className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16 bg-[#FDFBF7] border-t border-stone-200">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left: Interactive Map */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-[380px] sm:h-[440px] rounded-3xl overflow-hidden shadow-2xl border border-stone-200 group">
              <iframe
                src={siteInfo.mapsEmbed}
                className="w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: Visit Our Office Info */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-stone-100 space-y-6">
              
              <span className="text-[#c5a880] font-['Inter',sans-serif] text-xs font-bold tracking-[0.2em] uppercase block">
                OUR OFFICE
              </span>

              <div className="space-y-2">
                <h3 className="text-3xl font-extrabold text-[#1E293B] font-['Outfit',sans-serif] tracking-tight">
                  Visit Our Office
                </h3>
                <div className="w-12 h-1 bg-[#c5a880] rounded-full"></div>
              </div>

              <div className="space-y-2">
                <p className="text-stone-800 text-xs sm:text-sm font-semibold font-['Inter',sans-serif] leading-relaxed">
                  {siteInfo.address}
                </p>
                <p className="text-stone-500 text-xs font-['Inter',sans-serif]">
                  Opening Hours: {siteInfo.officeHours} (Daily)
                </p>
              </div>

              <div className="pt-4">
                <a
                  href={siteInfo.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#4E1421] hover:bg-[#612124] text-white px-8 py-3.5 rounded-lg text-sm font-bold font-['Outfit',sans-serif] transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98]"
                >
                  <span>Get Directions</span>
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
