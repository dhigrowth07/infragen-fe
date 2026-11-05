"use client";

import React from "react";

export default function OtherWaysToConnect() {
  return (
    <section className="py-16 px-6 sm:px-10 lg:px-16 bg-[#FAF7F2] border-t border-stone-200">
      <div className="max-w-[1440px] mx-auto text-center space-y-12">
        
        {/* Section Title */}
        <div className="inline-block text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] font-['Outfit',sans-serif] tracking-tight">
            Other Ways To Connect
          </h2>
          <div className="w-16 h-1 bg-[#c5a880] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Call Us */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-full bg-[#FAF5EE] text-[#c5a880] flex items-center justify-center text-xl mb-5 group-hover:bg-[#4E1421] group-hover:text-white transition-all duration-300 shadow-sm">
              <i className="fa-solid fa-phone"></i>
            </div>
            <h3 className="text-lg font-bold text-[#1E293B] font-['Outfit',sans-serif] mb-2">Call Us</h3>
            <a href="tel:9688889420" className="text-stone-700 hover:text-[#4E1421] font-bold text-xs sm:text-sm font-['Inter',sans-serif] block mb-1">
              +91 96888 89420
            </a>
            <p className="text-stone-400 text-xs font-['Inter',sans-serif]">Mon - Sun: 9.00 AM - 10.00 PM</p>
          </div>

          {/* Card 2: Email Us */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-full bg-[#FAF5EE] text-[#c5a880] flex items-center justify-center text-xl mb-5 group-hover:bg-[#4E1421] group-hover:text-white transition-all duration-300 shadow-sm">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <h3 className="text-lg font-bold text-[#1E293B] font-['Outfit',sans-serif] mb-2">Email Us</h3>
            <a href="mailto:srissa2006@gmail.com" className="text-stone-700 hover:text-[#4E1421] font-bold text-xs sm:text-sm font-['Inter',sans-serif] block mb-1 break-all">
              srissa2006@gmail.com
            </a>
            <p className="text-stone-400 text-xs font-['Inter',sans-serif]">We respond within 24 hrs</p>
          </div>

          {/* Card 3: Visit Us */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-full bg-[#FAF5EE] text-[#c5a880] flex items-center justify-center text-xl mb-5 group-hover:bg-[#4E1421] group-hover:text-white transition-all duration-300 shadow-sm">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <h3 className="text-lg font-bold text-[#1E293B] font-['Outfit',sans-serif] mb-2">Visit Us</h3>
            <p className="text-stone-700 font-bold text-xs leading-relaxed font-['Inter',sans-serif] mb-1">
              Shop No.24, Old Bus Stand Complex, Suganthi Nagar Rd, Sulur, TN 641402
            </p>
          </div>

          {/* Card 4: Office Hours */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-full bg-[#FAF5EE] text-[#c5a880] flex items-center justify-center text-xl mb-5 group-hover:bg-[#4E1421] group-hover:text-white transition-all duration-300 shadow-sm">
              <i className="fa-regular fa-clock"></i>
            </div>
            <h3 className="text-lg font-bold text-[#1E293B] font-['Outfit',sans-serif] mb-2">Office Hours</h3>
            <p className="text-stone-700 font-bold text-xs sm:text-sm font-['Inter',sans-serif] mb-1">
              Mon - Sun: 9.00 AM - 10.00 PM
            </p>
            <p className="text-stone-400 text-xs font-['Inter',sans-serif]">Open Everyday</p>
          </div>

        </div>

      </div>
    </section>
  );
}
