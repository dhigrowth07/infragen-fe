"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavbarProps {
  onOpenDrawer?: () => void;
}

export default function Navbar({ onOpenDrawer }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isAbout = pathname === "/about-us";
  const isContact = pathname === "/contact";

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 w-full z-[100] px-2 sm:px-4 lg:px-6 pt-2 sm:pt-2.5 transition-all duration-300 pointer-events-none"
    >
      {/* Floating Slim Fully Curved Header Bar */}
      <div className={`max-w-[1720px] mx-auto bg-[#381e23] border border-white/20 rounded-full shadow-[0_14px_36px_rgba(0,0,0,0.65)] px-3 sm:px-6 lg:px-6 xl:px-10 transition-all duration-300 pointer-events-auto ${
        scrolled ? "py-0.5 sm:py-1" : "py-1 sm:py-1.5"
      }`}>
        <div className="flex items-center justify-between">
          
          {/* Left: Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:scale-[1.02] transition-transform duration-300 shrink-0"
          >
            <Image
              width={130}
              height={65}
              className="w-[95px] sm:w-[105px] lg:w-[115px] xl:w-[130px] h-auto object-contain drop-shadow-md nav-logo-img"
              src="/vizhi-infragen-realtors-logo-white.png"
              alt="Vizhi Infragen Realtors Logo"
              style={{ height: "auto" }}
              priority
            />
          </Link>

          {/* Center: Contained Navigation Pill Menu — hidden on tablet and below */}
          <nav className="hidden lg:flex items-center h-[42px] bg-[#251215]/85 backdrop-blur-md border border-white/15 rounded-full px-2 lg:px-3 xl:px-6 shadow-inner space-x-1 lg:space-x-2 xl:space-x-6 shrink-0">
            {/* Home */}
            <Link
              href="/"
              className={`text-[12px] lg:text-[13px] xl:text-[14.5px] font-['Inter',sans-serif] tracking-wide transition-all duration-300 px-3 lg:px-4 xl:px-8 h-[32px] flex items-center justify-center rounded-full font-medium whitespace-nowrap ${
                isHome
                  ? "bg-[#c5a880] text-[#231518] font-bold shadow-md"
                  : "text-white hover:text-[#c5a880] hover:bg-white/10"
              }`}
            >
              Home
            </Link>

            {/* About Us */}
            <Link
              href="/about-us"
              className={`text-[12px] lg:text-[13px] xl:text-[14.5px] font-['Inter',sans-serif] tracking-wide transition-all duration-300 px-3 lg:px-4 xl:px-8 h-[32px] flex items-center justify-center rounded-full font-medium whitespace-nowrap ${
                isAbout
                  ? "bg-[#c5a880] text-[#231518] font-bold shadow-md"
                  : "text-white hover:text-[#c5a880] hover:bg-white/10"
              }`}
            >
              About Us
            </Link>

            {/* Properties Dropdown */}
            <Link
              href="/#projects"
              className="text-white hover:text-[#c5a880] hover:bg-white/10 text-[12px] lg:text-[13px] xl:text-[14.5px] font-['Inter',sans-serif] font-medium tracking-wide transition-all duration-300 px-3 lg:px-4 xl:px-8 h-[32px] flex items-center justify-center rounded-full gap-1.5 whitespace-nowrap"
            >
              <span>Properties</span>
              <i className="fa-solid fa-chevron-down text-[9.5px] opacity-75"></i>
            </Link>

            {/* Services */}
            <Link
              href="/#services"
              className="text-white hover:text-[#c5a880] hover:bg-white/10 text-[12px] lg:text-[13px] xl:text-[14.5px] font-['Inter',sans-serif] font-medium tracking-wide transition-all duration-300 px-3 lg:px-4 xl:px-8 h-[32px] flex items-center justify-center rounded-full whitespace-nowrap"
            >
              Services
            </Link>

            {/* Blog */}
            <Link
              href="/#trust-section"
              className="text-white hover:text-[#c5a880] hover:bg-white/10 text-[12px] lg:text-[13px] xl:text-[14.5px] font-['Inter',sans-serif] font-medium tracking-wide transition-all duration-300 px-3 lg:px-4 xl:px-8 h-[32px] flex items-center justify-center rounded-full whitespace-nowrap"
            >
              Blog
            </Link>

            {/* Contact Us */}
            <Link
              href="/contact"
              className={`text-[12px] lg:text-[13px] xl:text-[14.5px] font-['Inter',sans-serif] tracking-wide transition-all duration-300 px-3 lg:px-4 xl:px-8 h-[32px] flex items-center justify-center rounded-full font-medium whitespace-nowrap ${
                isContact
                  ? "bg-[#c5a880] text-[#231518] font-bold shadow-md"
                  : "text-white hover:text-[#c5a880] hover:bg-white/10"
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right: White Social Icons Capsule */}
          <div className="flex items-center space-x-2.5 shrink-0">
            {/* White Capsule Badge with Social Icons & Dividers */}
            <div className="h-[42px] bg-white rounded-full px-3.5 sm:px-4 lg:px-4 xl:px-5 flex items-center space-x-3 sm:space-x-3.5 xl:space-x-4 text-stone-800 shadow-md border border-white/90 shrink-0">
              {/* WhatsApp */}
              <a
                href="https://wa.me/919688889420?text=Hii!%20I'm%20interested%20Can%20i%20know%20about%20more%20details"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:scale-125 transition-transform duration-200 text-base sm:text-lg flex items-center justify-center"
                aria-label="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>

              {/* Vertical Divider */}
              <span className="w-[1px] h-3.5 bg-stone-300"></span>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c13584] hover:scale-125 transition-transform duration-200 text-base sm:text-lg flex items-center justify-center"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>

              {/* Vertical Divider */}
              <span className="w-[1px] h-3.5 bg-stone-300"></span>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1877F2] hover:scale-125 transition-transform duration-200 text-sm sm:text-base flex items-center justify-center"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </div>

            {/* Mobile/Tablet Menu Toggle Button */}
            <button
              onClick={onOpenDrawer}
              className="lg:hidden w-8.5 h-8.5 rounded-full bg-white/10 text-white hover:bg-[#c5a880] hover:text-[#231518] flex items-center justify-center text-xs transition-all cursor-pointer border border-white/20"
              aria-label="Open Menu Drawer"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

