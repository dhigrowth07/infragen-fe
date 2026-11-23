"use client";

import React from "react";
import { useSiteSettings } from "@/lib/context/SiteSettingsContext";

export default function OtherWaysToConnect() {
  const { siteInfo } = useSiteSettings();

  return (
    <section className="py-16 px-6 sm:px-10 lg:px-16 bg-[#FAF7F2]">
      <div className="max-w-[1440px] mx-auto text-center space-y-12">
        
        {/* Section Title with Gold Line */}
        <div className="inline-block text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] font-['Outfit',sans-serif] tracking-tight">
            Other Ways To Connect
          </h2>
          <div className="w-16 h-1 bg-[#c5a880] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* 3 Cards Grid (Matches Reference Design Exactly) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Card 1: Call Us (Phone Number Only) */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-full bg-[#FAF5EE] text-[#c5a880] flex items-center justify-center text-xl mb-5 group-hover:bg-[#4E1421] group-hover:text-white transition-all duration-300 shadow-sm">
              <i className="fa-solid fa-phone"></i>
            </div>
            <h3 className="text-lg font-bold text-[#1E293B] font-['Outfit',sans-serif] mb-2">Call Us</h3>
            <a
              href={`tel:${siteInfo.phone1Raw || "9688889420"}`}
              className="text-stone-700 hover:text-[#4E1421] font-bold text-sm sm:text-base font-['Inter',sans-serif] block"
            >
              +91 {siteInfo.phone1 || "96888 89420"}
            </a>
          </div>

          {/* Card 2: Email Us (Email Only) */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-full bg-[#FAF5EE] text-[#c5a880] flex items-center justify-center text-xl mb-5 group-hover:bg-[#4E1421] group-hover:text-white transition-all duration-300 shadow-sm">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <h3 className="text-lg font-bold text-[#1E293B] font-['Outfit',sans-serif] mb-2">Email Us</h3>
            <a
              href={`mailto:${siteInfo.email || "admin@vizhiinfragenrealtors.com"}`}
              className="text-stone-700 hover:text-[#4E1421] font-bold text-xs sm:text-sm font-['Inter',sans-serif] block break-all"
            >
              {siteInfo.email || "admin@vizhiinfragenrealtors.com"}
            </a>
          </div>

          {/* Card 3: Office Hours (Open Everyday Only) */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-full bg-[#FAF5EE] text-[#c5a880] flex items-center justify-center text-xl mb-5 group-hover:bg-[#4E1421] group-hover:text-white transition-all duration-300 shadow-sm">
              <i className="fa-regular fa-clock"></i>
            </div>
            <h3 className="text-lg font-bold text-[#1E293B] font-['Outfit',sans-serif] mb-2">Office Hours</h3>
            <p className="text-stone-700 font-bold text-sm sm:text-base font-['Inter',sans-serif]">
              Open Everyday
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
