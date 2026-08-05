"use client";

import React from "react";
import Image from "next/image";

export default function VisionMissionSection() {
  return (
    <section id="vm-section" className="bg-white py-16 sm:py-20 px-6 sm:px-10 border-t border-stone-200">
      <div className="max-w-[960px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* VISION */}
          <div className="flex flex-col items-start">
            <div className="w-full h-[250px] relative overflow-hidden mb-4 rounded-none">
              <Image
                src="/assets/images/vision-dartboard.jpg"
                alt="Our Vision"
                fill
                className="object-cover object-center"
              />
            </div>
            <h3 className="font-['Outfit',sans-serif] font-extrabold text-xl text-[#111111] mb-3 leading-tight">
              Our Vision
            </h3>
            <p className="font-['Inter',sans-serif] text-[14.5px] text-[#444444] leading-[1.9] text-justify mb-3">
              To become South India's most trusted real estate and property management company by delivering transparent, sustainable, and value driven property solutions.
            </p>
            <p className="font-['Inter',sans-serif] text-[14.5px] text-[#444444] leading-[1.9] text-justify">
              We measure success not by the number of deals we close, but by the long-term value and confidence we create for the people who choose us.
            </p>
          </div>

          {/* MISSION */}
          <div className="flex flex-col items-start">
            <div className="w-full h-[250px] relative overflow-hidden mb-4 rounded-none">
              <Image
                src="/assets/images/mission-meeting.jpg"
                alt="Our Mission"
                fill
                className="object-cover object-center"
              />
            </div>
            <h3 className="font-['Outfit',sans-serif] font-extrabold text-xl text-[#111111] mb-3 leading-tight">
              Our Mission
            </h3>
            <p className="font-['Inter',sans-serif] text-[14.5px] text-[#444444] leading-[1.9] text-justify mb-2.5">
              Provide end to end property solutions — from site selection and documentation to construction, valuation, and ongoing management, all under one roof.
            </p>
            <p className="font-['Inter',sans-serif] text-[14.5px] text-[#444444] leading-[1.9] text-justify mb-2.5">
              Offer hassle free property management for NRI clients — so owners abroad can rely on secure, transparent, fully reported care for their property back home.
            </p>
            <p className="font-['Inter',sans-serif] text-[14.5px] text-[#444444] leading-[1.9] text-justify mb-2.5">
              Build long term relationships through trust and professionalism — earning loyalty through honesty, consistency, and accountability rather than short-term gain.
            </p>
            <p className="font-['Inter',sans-serif] text-[14.5px] text-[#444444] leading-[1.9] text-justify">
              Deliver expert guidance for real estate investments — backed by real local market knowledge that helps clients invest with clarity and confidence.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
