"use client";

import React, { useState, useEffect } from "react";
import { landSalesDetailData } from "@/data/landSalesDetailData";

interface Props {
  data?: typeof landSalesDetailData;
}

export default function TrustworthinessSliderSection({ data = landSalesDetailData }: Props) {
  const { trustworthiness } = data;
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = trustworthiness.items.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const currentItem = trustworthiness.items[currentIndex];

  return (
    <section className="relative py-[110px] bg-[url('/assets/images/daylight-villa-1.png')] bg-center bg-cover bg-no-repeat isolate overflow-hidden border-y-2 border-[#c5a880]">
      {/* Light Dark Overlay Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0709]/55 to-[#1a0c10]/68 z-0" />

      <div className="w-[min(1240px,calc(100%-48px))] mx-auto relative z-10">
        {/* Main Section Header */}
        <div className="text-center max-w-[820px] mx-auto mb-7 relative z-10">
          <span className="text-[#c5a880] font-outfit text-[0.82rem] font-bold tracking-[0.24em] uppercase block mb-2">
            {trustworthiness.eyebrow}
          </span>
          <h2 className="font-outfit text-[2rem] sm:text-[3rem] font-extrabold text-white mb-3 leading-[1.25]">
            {trustworthiness.title}
          </h2>
          <p className="font-inter text-[1.05rem] text-[#eadfd3] leading-[1.7]">
            {trustworthiness.leadDesc}
          </p>
        </div>

        {/* Floating Dark Card Slider */}
        <div className="relative z-10 bg-[#0d0608] border border-[#c5a880]/38 rounded-[24px] shadow-[0_30px_80px_rgba(0,0,0,0.75)] max-w-[820px] mx-auto p-8 sm:p-12 md:p-[60px_80px_48px] text-center text-white">
          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-lg bg-white text-black border-none text-lg flex items-center justify-center cursor-pointer shadow-[0_6px_20px_rgba(0,0,0,0.3)] hover:bg-[#c5a880] hover:text-[#381e23] hover:scale-110 transition-all duration-300 z-20"
            aria-label="Previous slide"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          {/* Slide Content */}
          <div className="transition-opacity duration-500 min-h-[140px] flex flex-col items-center justify-center">
            <h3 className="font-outfit text-[1.8rem] sm:text-[2.5rem] font-extrabold text-white mb-3 leading-[1.25]">
              {currentItem.num}. {currentItem.title}
            </h3>
            <p className="text-[1.05rem] sm:text-[1.28rem] font-serif italic text-[#eadfd3] leading-[1.7] max-w-[680px] mx-auto mb-6">
              {currentItem.desc}
            </p>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-lg bg-white text-black border-none text-lg flex items-center justify-center cursor-pointer shadow-[0_6px_20px_rgba(0,0,0,0.3)] hover:bg-[#c5a880] hover:text-[#381e23] hover:scale-110 transition-all duration-300 z-20"
            aria-label="Next slide"
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>

          {/* Rating Stars & Author Info */}
          <div className="mt-6 pt-5 border-t border-[#dfd4c4]/15">
            <div className="text-[#c5a880] text-[1rem] flex justify-center gap-1 mb-2">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <div className="font-outfit font-bold text-[0.95rem] text-white">
              {currentItem.author}
            </div>
            <div className="text-[0.8rem] text-[#a89a8a] font-inter">
              {currentItem.sub}
            </div>
          </div>

          {/* Slide Pagination Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {trustworthiness.items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "bg-[#c5a880] w-6"
                    : "bg-white/30 w-2.5 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Concluding Reputation Note */}
        <div className="text-center max-w-[820px] mx-auto mt-8 relative z-10">
          <p className="font-inter text-[1.02rem] text-[#dfc7a4] font-medium leading-[1.7]">
            {trustworthiness.reputationNote}
          </p>
        </div>
      </div>
    </section>
  );
}
