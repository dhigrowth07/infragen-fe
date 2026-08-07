"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
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
          <Link href="/#services" className="text-[#9b98a1] hover:text-white transition-colors text-left font-['Inter',sans-serif] text-xs leading-[20px] font-normal">
            Our Services
          </Link>
          <Link href="/#projects" className="text-[#9b98a1] hover:text-white transition-colors text-left font-['Inter',sans-serif] text-xs leading-[20px] font-normal">
            Projects
          </Link>
          <Link href="/contact" className="text-[#9b98a1] hover:text-white transition-colors text-left font-['Inter',sans-serif] text-xs leading-[20px] font-normal">
            Contact
          </Link>
        </div>

        {/* Col 3: Services Links */}
        <div className="flex flex-col gap-2 items-start justify-start relative">
          <div className="text-[#ffffff] text-left font-['Inter',sans-serif] text-base leading-5 font-bold relative self-stretch flex items-center justify-start mb-0.5">
            Services
          </div>
          <Link href="/#services" className="text-[#9b98a1] hover:text-white transition-colors text-left font-['Inter',sans-serif] text-xs leading-[20px] font-normal">
            Land Sales &amp; Plots
          </Link>
          <Link href="/#services" className="text-[#9b98a1] hover:text-white transition-colors text-left font-['Inter',sans-serif] text-xs leading-[20px] font-normal">
            Property Management
          </Link>
          <Link href="/#services" className="text-[#9b98a1] hover:text-white transition-colors text-left font-['Inter',sans-serif] text-xs leading-[20px] font-normal">
            NRI Property Shield
          </Link>
          <Link href="/#services" className="text-[#9b98a1] hover:text-white transition-colors text-left font-['Inter',sans-serif] text-xs leading-[20px] font-normal">
            DTCP &amp; Legal Approvals
          </Link>
        </div>

        {/* Col 4: Contact Info */}
        <div className="flex flex-col gap-2 items-start justify-start relative">
          <div className="text-[#ffffff] text-left font-['Inter',sans-serif] text-base leading-5 font-bold relative self-stretch flex items-center justify-start mb-0.5">
            Contact Us
          </div>
          <a href="mailto:srissa2006@gmail.com" className="text-[#9b98a1] hover:text-white transition-colors text-left font-['Inter',sans-serif] text-xs leading-[20px] font-normal break-all">
            srissa2006@gmail.com
          </a>
          <a href="tel:+919688889420" className="text-[#9b98a1] hover:text-white transition-colors text-left font-['Inter',sans-serif] text-xs leading-[20px] font-normal">
            +91 96888 89420
          </a>
          <div className="text-[#9b98a1] text-left font-['Inter',sans-serif] text-xs leading-[18px] font-normal max-w-[220px]">
            First Floor, Shop No.24, Old Bus Stand Complex, 24, Suganthi Nagar Rd, Sulur, TN 641402
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.483981881518!2d77.1235!3d11.0258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85703730aa18b%3A0xc3457df7aa121d5a!2sOld%20Bus%20Stand%20Complex%2C%20Suganthi%20Nagar%20Rd%2C%20Sulur%2C%20Tamil%20Nadu%20641402!5e0!3m2!1sen!2sin!4v1721800000000"
                className="absolute inset-0 w-full h-full border-0 grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="bg-white rounded-sm px-2 py-1 flex items-center justify-start shrink-0 absolute left-2 top-2 z-10 shadow-md">
                <a
                  href="https://maps.google.com/?q=First+Floor,+Shop+No.24,+Old+Bus+Stand+Complex,+24,+Suganthi+Nagar+Rd,+Sulur,+Tamil+Nadu+641402"
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
          © 2026 Vizhi Infragen Realtors LLP. All rights reserved.
        </div>
        <div className="flex flex-row gap-7 sm:gap-8 items-center justify-start shrink-0">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:scale-125 transition-transform duration-300" aria-label="Instagram">
            <i className="fa-brands fa-instagram text-xl"></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[#FF0000] hover:scale-125 transition-transform duration-300" aria-label="YouTube">
            <i className="fa-brands fa-youtube text-xl"></i>
          </a>
          <a href="https://wa.me/919688889420" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:scale-125 transition-transform duration-300" aria-label="WhatsApp">
            <i className="fa-brands fa-whatsapp text-xl"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#1DA1F2] hover:scale-125 transition-transform duration-300" aria-label="Twitter">
            <i className="fa-brands fa-twitter text-xl"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:scale-125 transition-transform duration-300" aria-label="Facebook">
            <i className="fa-brands fa-facebook-f text-xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
