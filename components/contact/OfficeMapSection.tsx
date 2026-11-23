"use client";

import React from "react";
import { useSiteSettings } from "@/lib/context/SiteSettingsContext";

export default function OfficeMapSection() {
  const { siteInfo } = useSiteSettings();

  // Embed satellite view centered on office coordinates with iwloc suppressed to hide review ratings
  const mapEmbedUrl =
    "https://maps.google.com/maps?q=11.025895,77.122566&t=k&z=17&ie=UTF8&iwloc=&output=embed";

  return (
    <section className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16 bg-[#FDFBF7]">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Interactive Satellite Map Frame (7 Cols) */}
          <div className="lg:col-span-7">
            <div
              className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-200/90 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(52,29,34,0.18)]"
              style={{ aspectRatio: "1010 / 557", minHeight: "360px" }}
            >
              <iframe
                title="Vizhi Infragen Realtors LLP Office Location"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Right Side: Visit Our Office Info Card (5 Cols) */}
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
                  {siteInfo.address ||
                    "Shop No. 24, Suganthi Nagar Road, Bus Stand Complex, Sulur Old Bus Stand, Sulur, Coimbatore – 641402"}
                </p>
                <p className="text-stone-700 text-xs sm:text-sm font-bold font-['Inter',sans-serif] flex items-center gap-1.5 mt-2">
                  <i className="fa-regular fa-clock text-[#c5a880]"></i>
                  <span>Open Everyday</span>
                </p>
              </div>

              <div className="pt-4">
                <a
                  href={
                    siteInfo.mapsLink ||
                    "https://maps.google.com/?q=Shop+No.+24,+Suganthi+Nagar+Road,+Bus+Stand+Complex,+Sulur+Old+Bus+Stand,+Sulur,+Coimbatore+-+641402"
                  }
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
