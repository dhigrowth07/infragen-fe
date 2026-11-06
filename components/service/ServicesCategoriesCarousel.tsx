"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { servicesCarouselItems } from "@/data/servicesData";

export default function ServicesCategoriesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -310, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 310, behavior: "smooth" });
    }
  };

  return (
    <section className="py-[60px] pb-[80px] bg-white relative" id="categories-section">
      <div className="w-[min(1240px,calc(100%-48px))] mx-auto">
        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-[36px]">
          <div className="inline-flex items-center gap-2 bg-[#381e23] text-[#c5a880] px-[18px] py-[7px] text-[0.8rem] font-bold tracking-[0.16em] uppercase font-outfit border-l-3 border-[#c5a880]">
            <i className="fa-solid fa-layer-group"></i>
            <span>Our Offerings</span>
          </div>
          <h2 className="font-outfit text-[2rem] sm:text-[2.2rem] font-bold text-[#381e23] mt-2">
            Our Real Estate &amp; Property Services
          </h2>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative flex items-center px-2 sm:px-6">
          {/* Prev Arrow Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#381e23] text-[#c5a880] border border-[#c5a880] flex items-center justify-center text-lg z-20 shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:bg-[#c5a880] hover:text-[#381e23] hover:scale-110 transition-all duration-300 cursor-pointer"
            aria-label="Scroll left"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          {/* Track Container */}
          <div
            ref={trackRef}
            className="w-full overflow-x-auto scroll-smooth no-scrollbar py-4 px-10 sm:px-14"
          >
            <div className="grid grid-rows-2 grid-flow-col auto-cols-[minmax(240px,270px)] gap-y-7 gap-x-6">
              {servicesCarouselItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  className="bg-white rounded-none transition-transform duration-350 hover:-translate-y-1.5 flex flex-col items-center text-center text-decoration-none pb-3 group"
                >
                  {/* Thumbnail with custom 32px 0 32px 0 corners */}
                  <div className="w-full h-[180px] rounded-tl-[32px] rounded-br-[32px] overflow-hidden relative shadow-[0_10px_24px_rgba(0,0,0,0.12)] mb-3.5">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                  </div>

                  {/* Card Title */}
                  <div className="px-2">
                    <h4 className="font-outfit text-[1.1rem] sm:text-[1.18rem] font-bold text-[#381e23] group-hover:text-[#c5a880] transition-colors">
                      {item.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#381e23] text-[#c5a880] border border-[#c5a880] flex items-center justify-center text-lg z-20 shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:bg-[#c5a880] hover:text-[#381e23] hover:scale-110 transition-all duration-300 cursor-pointer"
            aria-label="Scroll right"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
