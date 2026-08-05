"use client";

import React from "react";
import Image from "next/image";

export default function OurStorySection() {
  return (
    <section id="our-story" className="relative bg-[#121212] py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden text-white">
      <div className="relative max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-7 reveal-slide-right">
            <div>
              <span className="text-[#c5a880] font-['Inter',sans-serif] text-xs font-bold tracking-[0.3em] uppercase block mb-3">
                OUR STORY
              </span>
              <h2 className="font-extrabold font-['Outfit',sans-serif] leading-tight text-3xl sm:text-4xl lg:text-5xl">
                Built on<br />
                <span className="text-[#c5a880]">Honesty &amp;</span><br />
                Follow-Through
              </h2>
            </div>

            <div className="relative pl-6">
              <div
                className="absolute left-0 top-0 w-[3px] rounded-full h-full"
                style={{ background: "linear-gradient(to bottom, #c5a880, rgba(197,168,128,0.35), transparent)" }}
              ></div>
              <div className="space-y-5 font-['Inter',sans-serif] leading-[1.85] text-sm sm:text-base text-stone-300">
                <p>
                  What began as a commitment to do real estate the right way has grown into a full-service property partner for clients across Coimbatore and beyond. Over 7 years, we have guided buyers through due diligence, helped sellers reach the right price, managed assets for owners living overseas, and supported families through approvals, valuations, and construction.
                </p>
                <p>
                  Through it all, one principle has stayed constant:{" "}
                  <strong className="text-[#c5a880] font-semibold">
                    transparency builds trust, and trust builds lasting relationships.
                  </strong>{" "}
                  It is the reason so much of our work comes from referrals and repeat clients.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border-2 border-[#c5a880] bg-[#c5a880]/10 flex items-center justify-center shrink-0 group-hover:bg-[#c5a880] transition-all duration-300">
                  <i className="fa-solid fa-flag text-[#c5a880] text-xs group-hover:text-[#381e23]"></i>
                </div>
                <div>
                  <div className="text-[10px] text-[#c5a880] font-bold font-['Inter',sans-serif] uppercase tracking-wider">Founded</div>
                  <div className="text-sm text-white font-medium font-['Inter',sans-serif]">Established in Sulur, Coimbatore with a clear vision</div>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border-2 border-[#c5a880] bg-[#c5a880]/10 flex items-center justify-center shrink-0 group-hover:bg-[#c5a880] transition-all duration-300">
                  <i className="fa-solid fa-users text-[#c5a880] text-xs group-hover:text-[#381e23]"></i>
                </div>
                <div>
                  <div className="text-[10px] text-[#c5a880] font-bold font-['Inter',sans-serif] uppercase tracking-wider">Growth</div>
                  <div className="text-sm text-white font-medium font-['Inter',sans-serif]">Expanded NRI services &amp; full property management across South India</div>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border-2 border-[#c5a880] bg-[#c5a880]/10 flex items-center justify-center shrink-0 group-hover:bg-[#c5a880] transition-all duration-300">
                  <i className="fa-solid fa-trophy text-[#c5a880] text-xs group-hover:text-[#381e23]"></i>
                </div>
                <div>
                  <div className="text-[10px] text-[#c5a880] font-bold font-['Inter',sans-serif] uppercase tracking-wider">Today</div>
                  <div className="text-sm text-white font-medium font-['Inter',sans-serif]">500+ clients, referral-driven growth across Coimbatore</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Framed Image */}
          <div className="lg:col-span-6 reveal-slide-left">
            <figure className="relative border border-[#c5a880]/35 p-3 sm:p-4 bg-white/[0.03] shadow-[20px_24px_0_rgba(197,168,128,0.10)]">
              <div className="relative overflow-hidden aspect-[4/3] w-full">
                <Image
                  src="/assets/images/story-bg.jpg"
                  alt="Vizhi Infragen team discussing a property project in Coimbatore"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent pointer-events-none"></div>
                <figcaption className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 font-['Inter',sans-serif]">
                  <span className="block text-[#c5a880] text-[10px] font-bold uppercase tracking-[0.26em] mb-2">
                    Coimbatore, Tamil Nadu
                  </span>
                  <span className="block text-white text-base sm:text-lg font-medium leading-snug">
                    Local knowledge. Personal accountability.
                  </span>
                </figcaption>
              </div>
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-r-2 border-[#c5a880] pointer-events-none"></div>
            </figure>
          </div>

        </div>
      </div>
    </section>
  );
}
