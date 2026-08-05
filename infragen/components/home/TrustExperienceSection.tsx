"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const carouselImages = [
  { src: "/assets/images/handshake-deal.jpg", alt: "Built on Experience Run on Trust Coimbatore Real Estate" },
  { src: "/assets/images/about-property-management.jpg", alt: "Property Survey Coimbatore" },
  { src: "/assets/images/land-development.jpg", alt: "Land Sales & Plot Development Coimbatore" },
  { src: "/assets/images/plot-layout-1.jpg", alt: "DTCP Plot Layout Coimbatore" },
  { src: "/assets/images/plot-layout-2.jpg", alt: "Land Inspection Coimbatore" },
  { src: "/assets/images/plot-layout-3.jpg", alt: "Coimbatore Growth Corridor Layouts" },
  { src: "/assets/images/hero-1.jpg", alt: "Turnkey Building Construction Coimbatore" },
];

export default function TrustExperienceSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % carouselImages.length);
    }, 1000); // 1 second rapid change matching script.js
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="why-trust-experience"
      className="bg-white py-16 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col gap-0 items-start justify-start relative overflow-hidden"
    >
      <div className="pr-4 pl-4 sm:pr-6 sm:pl-6 w-full shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[70px] max-w-[1200px] relative mx-auto items-center">
        
        {/* Left Column */}
        <div className="pt-[4.8px] flex flex-col gap-[12.8px] items-start justify-start relative reveal reveal-slide-right">
          <div className="text-[#c5a880] text-left font-['Inter',sans-serif] text-sm leading-[22px] font-semibold uppercase relative flex items-center justify-start tracking-[1.75px]">
            WHY TRUST US
          </div>
          <div className="flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative">
            <h2 className="text-[#612124] text-left font-['Inter',sans-serif] text-[36px] sm:text-[40px] leading-[44px] sm:leading-[48px] font-bold relative self-stretch flex items-center justify-start">
              Built on Experience, Run on<br />Trust
            </h2>
          </div>
          <div className="pt-[1.2px] flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative">
            <p className="text-[#5c525c] text-left font-['Inter',sans-serif] text-base leading-7 font-normal relative self-stretch">
              Real estate works on confidence, and confidence is earned. What makes Vizhi Infragen a trusted real estate company in Coimbatore is that every transaction is handled by people who have done it before verifying documents, walking sites, negotiating fair deals, and standing behind clients long after the paperwork is signed.
            </p>
          </div>
          <div className="pt-[5.2px] flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative">
            <p className="text-[#5c525c] text-left font-['Inter',sans-serif] text-base leading-7 font-normal relative self-stretch">
              The same care defines our work as a property management company in Coimbatore: clear records, honest timelines, realistic valuations, and straight answers even when they aren't what you hoped to hear. For our NRI clients especially, this transparency is everything you receive consistent updates and verifiable reporting so your property is as secure as if you were managing it yourself.
            </p>
          </div>
        </div>

        {/* Right Column: 1-Second Image Carousel */}
        <div className="flex justify-center relative reveal reveal-slide-left">
          <div className="relative rounded-[20px] overflow-hidden shadow-2xl z-10 w-full max-w-[480px] border border-white/60 group h-[320px] sm:h-[360px]">
            {carouselImages.map((img, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
                  idx === activeIdx ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover rounded-[20px]" />
              </div>
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

            {/* Bottom Glass Badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-xl border border-white/80 shadow-lg flex items-center gap-3 z-20">
              <div className="w-9 h-9 rounded-full bg-[#612124] text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                <i className="fa-solid fa-layer-group text-sm"></i>
              </div>
              <div>
                <h4 className="font-bold text-[#612124] text-xs sm:text-sm">Land &amp; Property Management</h4>
                <p className="text-[11px] text-gray-600 font-medium">Verified layouts, clear titles &amp; asset security</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
