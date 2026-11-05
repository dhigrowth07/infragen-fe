"use client";

import React from "react";

export default function OfficeMapSection() {
  return (
    <section className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16 bg-[#FDFBF7] border-t border-stone-200">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left: Interactive Map */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-[380px] sm:h-[440px] rounded-3xl overflow-hidden shadow-2xl border border-stone-200 group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.483981881518!2d77.1235!3d11.0258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85703730aa18b%3A0xc3457df7aa121d5a!2sOld%20Bus%20Stand%20Complex%2C%20Suganthi%20Nagar%20Rd%2C%20Sulur%2C%20Tamil%20Nadu%20641402!5e0!3m2!1sen!2sin!4v1721800000000"
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
                  First Floor, Shop No.24, Old Bus Stand Complex, 24, Suganthi Nagar Rd, Sulur, Tamil Nadu 641402
                </p>
                <p className="text-stone-500 text-xs font-['Inter',sans-serif]">
                  Opening Hours: 9:00 AM - 10:00 PM (Daily)
                </p>
              </div>

              <div className="pt-4">
                <a
                  href="https://maps.google.com/?q=First+Floor,+Shop+No.24,+Old+Bus+Stand+Complex,+24,+Suganthi+Nagar+Rd,+Sulur,+Tamil+Nadu+641402"
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
