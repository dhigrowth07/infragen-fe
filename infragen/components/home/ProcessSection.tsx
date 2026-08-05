"use client";

import React from "react";
import Image from "next/image";

interface StepItem {
  id: number;
  stepNum: string;
  title: string;
  sub?: string;
  img: string;
  left: string;
  top: string;
  isUp: boolean;
}

const steps: StepItem[] = [
  {
    id: 1,
    stepNum: "01",
    title: "1. Land Analysis",
    img: "/assets/images/about-property-management.jpg",
    left: "19%",
    top: "160px",
    isUp: true,
  },
  {
    id: 2,
    stepNum: "02",
    title: "2. Land Purchase",
    img: "/assets/images/handshake-deal.jpg",
    left: "39%",
    top: "160px",
    isUp: true,
  },
  {
    id: 3,
    stepNum: "03",
    title: "3. Land Conversion",
    sub: "(DTCP / CMDA / RERA)",
    img: "/assets/images/plot-layout-1.jpg",
    left: "59%",
    top: "160px",
    isUp: true,
  },
  {
    id: 4,
    stepNum: "04",
    title: "4. Architectural & Structural Design",
    img: "/assets/images/carousel-villa-1.jpg",
    left: "79%",
    top: "160px",
    isUp: true,
  },
  {
    id: 5,
    stepNum: "05",
    title: "5. Building Approvals",
    sub: "(Corporation / Panchayat)",
    img: "/assets/images/hero-4.jpg",
    left: "79%",
    top: "360px",
    isUp: false,
  },
  {
    id: 6,
    stepNum: "06",
    title: "6. Building Construction",
    img: "/assets/images/carousel-villa-4.jpg",
    left: "59%",
    top: "360px",
    isUp: false,
  },
  {
    id: 7,
    stepNum: "07",
    title: "7. Quality Inspection & Final Finishing",
    img: "/assets/images/hero-1.jpg",
    left: "39%",
    top: "360px",
    isUp: false,
  },
  {
    id: 8,
    stepNum: "08",
    title: "8. Turnkey Key Handover",
    img: "/assets/images/key-handover.jpg",
    left: "19%",
    top: "360px",
    isUp: false,
  },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="py-16 sm:py-24 bg-[#FDFBF7] text-[#381e23] relative overflow-hidden"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-5xl lg:text-[50px] font-['Outfit',sans-serif] font-black tracking-tight leading-tight text-[#381e23]">
            One Stop Solution
          </h2>
        </div>

        {/* Roadmap Canvas */}
        <div className="overflow-x-auto pb-6 scrollbar-none">
          <div className="relative min-w-[1000px] max-w-[1120px] mx-auto my-2" style={{ height: "540px" }}>
            
            {/* SVG Solid Curve */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1120 540" fill="none">
              <path
                d="M 180 160 L 890 160 A 100 100 0 0 1 890 360 L 140 360"
                stroke="#c5a880"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Static End Arrow Circle near Step 8 */}
            <div
              className="absolute z-20 w-7 h-7 rounded-full bg-[#381e23] border-2 border-[#c5a880] flex items-center justify-center shadow-md"
              style={{ left: "135px", top: "360px", transform: "translate(-50%, -50%)" }}
            >
              <i className="fa-solid fa-chevron-right text-[10px] text-white"></i>
            </div>

            {/* Far Left Brand Logo */}
            <div
              className="absolute flex items-center justify-center z-20"
              style={{ left: "15px", top: "260px", transform: "translate(0, -50%)", width: "140px" }}
            >
              <Image
                src="/vizhi-infragen-realtors-logo.png"
                alt="Vizhi Infragen Realtors Logo"
                width={130}
                height={70}
                className="w-32 h-16 object-contain"
              />
            </div>

            {/* All 8 Step Nodes */}
            {steps.map((step) => (
              <div
                key={step.id}
                className="absolute z-20"
                style={{ left: step.left, top: step.top, transform: "translate(-50%, -50%)" }}
              >
                {/* Center Node Dot */}
                <div className="w-5 h-5 rounded-full bg-[#381e23] border-3 border-[#c5a880] mx-auto relative z-20 flex items-center justify-center shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c5a880]"></div>
                </div>

                {step.isUp ? (
                  <>
                    {/* Top Image Circle Frame */}
                    <div className="absolute" style={{ bottom: "18px", left: "50%", transform: "translateX(-50%)" }}>
                      <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full border-3 border-[#c5a880] overflow-hidden shadow-md bg-white relative">
                        <Image
                          src={step.img}
                          alt={step.title}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Bottom Text Label */}
                    <div className="absolute text-center" style={{ top: "18px", left: "50%", transform: "translateX(-50%)", width: "210px" }}>
                      <h3 className="text-xs lg:text-sm font-extrabold font-['Outfit',sans-serif] text-[#381e23] leading-tight">
                        {step.title}
                      </h3>
                      {step.sub && (
                        <span className="text-[10px] lg:text-[11px] text-[#6b4a50] font-semibold block font-['Inter',sans-serif] mt-0.5">
                          {step.sub}
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Top Text Label */}
                    <div className="absolute text-center" style={{ bottom: "18px", left: "50%", transform: "translateX(-50%)", width: "210px" }}>
                      <h3 className="text-xs lg:text-sm font-extrabold font-['Outfit',sans-serif] text-[#381e23] leading-tight">
                        {step.title}
                      </h3>
                      {step.sub && (
                        <span className="text-[10px] lg:text-[11px] text-[#6b4a50] font-semibold block font-['Inter',sans-serif] mt-0.5">
                          {step.sub}
                        </span>
                      )}
                    </div>

                    {/* Bottom Image Circle Frame */}
                    <div className="absolute" style={{ top: "18px", left: "50%", transform: "translateX(-50%)" }}>
                      <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full border-3 border-[#c5a880] overflow-hidden shadow-md bg-[#381e23] relative">
                        <Image
                          src={step.img}
                          alt={step.title}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
