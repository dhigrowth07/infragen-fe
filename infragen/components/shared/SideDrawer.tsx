"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideDrawer({ isOpen, onClose }: SideDrawerProps) {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isAbout = pathname === "/about-us";
  const isContact = pathname === "/contact";

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Off-canvas Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[340px] sm:w-[400px] bg-white z-[101] shadow-2xl transition-transform duration-300 ease-out flex flex-col justify-between p-8 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-stone-100 text-[#612124] hover:bg-[#612124] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
          aria-label="Close Menu Drawer"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        <div className="flex flex-col items-center text-center mt-6 space-y-6">
          {/* Logo */}
          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 shadow-md inline-block mb-2">
            <Image
              src="/vizhi-infragen-realtors-logo.png"
              alt="Vizhi Infragen Realtors Logo"
              width={144}
              height={80}
              className="w-36 h-20 object-contain mx-auto"
            />
          </div>

          {/* Navigation Links inside Drawer */}
          <nav className="flex flex-col space-y-3 w-full border-t border-b border-stone-100 py-6">
            <Link
              href="/"
              onClick={onClose}
              className={`drawer-link text-lg font-bold transition-colors font-['Inter',sans-serif] ${
                isHome ? "text-[#c5a880]" : "text-[#334155] hover:text-[#c5a880]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about-us"
              onClick={onClose}
              className={`drawer-link text-lg font-bold transition-colors font-['Inter',sans-serif] ${
                isAbout ? "text-[#c5a880]" : "text-[#334155] hover:text-[#c5a880]"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/#projects"
              onClick={onClose}
              className="drawer-link text-lg font-bold text-[#334155] hover:text-[#c5a880] transition-colors font-['Inter',sans-serif]"
            >
              Properties
            </Link>
            <Link
              href="/#services"
              onClick={onClose}
              className="drawer-link text-lg font-bold text-[#334155] hover:text-[#c5a880] transition-colors font-['Inter',sans-serif]"
            >
              Services
            </Link>
            <Link
              href="/#why-trust-section"
              onClick={onClose}
              className="drawer-link text-lg font-bold text-[#334155] hover:text-[#c5a880] transition-colors font-['Inter',sans-serif]"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className={`drawer-link text-lg font-bold transition-colors font-['Inter',sans-serif] ${
                isContact ? "text-[#c5a880]" : "text-[#334155] hover:text-[#c5a880]"
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Address & Contact Info */}
          <div className="space-y-3 text-center text-[#334155] font-['Inter',sans-serif] text-sm">
            <div className="flex items-center justify-center gap-2 text-[#612124] font-bold text-base font-['Inter',sans-serif]">
              <i className="fa-solid fa-location-dot text-[#c5a880]"></i>
              <span>Vizhi Infragen Realtors</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed max-w-[280px] mx-auto">
              First Floor, Shop No.24, Old Bus Stand Complex, 24, Suganthi Nagar Rd, Sulur, Tamil Nadu 641402
            </p>

            <div className="pt-2 flex flex-col items-center gap-2 text-xs">
              <a
                href="mailto:srissa2006@gmail.com?subject=Inquiry%20Regarding%20Coimbatore%20Real%20Estate%20Properties"
                className="flex items-center gap-2 text-[#612124] hover:text-[#c5a880] font-semibold transition-colors"
              >
                <i className="fa-solid fa-envelope text-[#c5a880]"></i>
                <span>srissa2006@gmail.com</span>
              </a>
              <a
                href="tel:9688889420"
                className="flex items-center gap-2 text-[#612124] hover:text-[#c5a880] font-semibold transition-colors"
              >
                <i className="fa-solid fa-phone text-[#c5a880]"></i>
                <span>+91 96888 89420</span>
              </a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-3 pt-4 border-t border-stone-100 w-full">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-stone-100 text-[#1877F2] hover:scale-110 shadow-sm flex items-center justify-center transition-all"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook-f text-lg"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-stone-100 text-[#1DA1F2] hover:scale-110 shadow-sm flex items-center justify-center transition-all"
              aria-label="Twitter"
            >
              <i className="fa-brands fa-twitter text-lg"></i>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-stone-100 text-[#FF0000] hover:scale-110 shadow-sm flex items-center justify-center transition-all"
              aria-label="YouTube"
            >
              <i className="fa-brands fa-youtube text-lg"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-stone-100 text-[#c13584] hover:scale-110 shadow-sm flex items-center justify-center transition-all"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram text-lg"></i>
            </a>
            <a
              href="https://wa.me/919688889420"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-stone-100 text-[#25D366] hover:scale-110 shadow-sm flex items-center justify-center transition-all"
              aria-label="WhatsApp"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
            </a>
          </div>
        </div>

        <div className="text-center pt-6 text-[11px] text-stone-400 font-medium">
          &copy; 2026 Vizhi Infragen Realtors. All Rights Reserved.
        </div>
      </div>
    </>
  );
}
