"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import VideoModal from "@/components/shared/VideoModal";

interface HeroSectionProps {
  onOpenVideoModal?: () => void;
}

const slides = [
  {
    src: "/assets/images/carousel-villa-1.jpg",
    alt: "Modern White Villa with Carport - Vizhi Infragen Realtors",
  },
  {
    src: "/assets/images/carousel-villa-2.jpg",
    alt: "Luxury Villa with Pool and Mountain View",
  },
  {
    src: "/assets/images/carousel-villa-3.jpg",
    alt: "Modern Glass Luxury Villa at Twilight",
  },
  {
    src: "/assets/images/carousel-villa-4.jpg",
    alt: "Contemporary White Villa with Swimming Pool",
  },
  {
    src: "/assets/images/carousel-villa-5.jpg",
    alt: "Elegant Garden Villa with Swimming Pool",
  },
];

export default function HeroSection({ onOpenVideoModal }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-[#381e23] text-white overflow-hidden w-full m-0 p-0">
      {/* Full-bleed Hero Carousel Container (Covers top-0 behind Navbar fully) */}
      <section id="home" className="relative w-full min-h-[640px] md:min-h-[720px] lg:min-h-[760px] flex items-center overflow-hidden">
        
        {/* Full-bleed Carousel Slides (Edge to Edge, Top to Bottom) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`hero-slide absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out overflow-hidden ${
                idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="100vw"
                priority={idx === 0}
                className="carousel-zoom-img object-cover object-center"
              />
            </div>
          ))}

          {/* Full-bleed Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35 pointer-events-none z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#381e23]/95 via-transparent to-black/50 pointer-events-none z-10"></div>
        </div>

        {/* Hero Content Overlay (Positioned below floating Navbar with top padding) */}
        <div className="relative z-20 max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 w-full pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-12 sm:pb-16 flex flex-col justify-between min-h-[640px] md:min-h-[720px] lg:min-h-[760px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto">
            
            {/* Left Text */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-5 text-left">
              <span className="text-[#c5a880] font-['Inter',sans-serif] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase block animate-float-down">
                Welcome to vizhi infragen
              </span>

              <h1 className="text-[28px] sm:text-[36px] md:text-[40px] lg:text-[46px] xl:text-[50px] font-extrabold text-white leading-[36px] sm:leading-[46px] md:leading-[50px] lg:leading-[54px] xl:leading-[58px] font-['Outfit',sans-serif] tracking-tight max-w-3xl animate-float-down [animation-delay:200ms]">
                Trusted Real Estate &amp; NRI Property Management Company
              </h1>

              <p className="text-white/90 font-['Inter',sans-serif] text-base sm:text-lg font-normal max-w-2xl leading-relaxed animate-float-down [animation-delay:400ms]">
                Your Reliable Partner for Land, Property &amp; Asset Management in Coimbatore
              </p>

              <div className="pt-3 animate-float-up [animation-delay:600ms]">
                <a
                  href="https://wa.me/919688889420?text=Hii!%20I'm%20interested%20Can%20i%20know%20about%20more%20details"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white/10 hover:bg-[#c5a880] text-white hover:text-[#231518] font-bold px-8 py-4 rounded-xl text-base transition-all duration-300 border-2 border-[#c5a880] shadow-xl backdrop-blur-md transform hover:-translate-y-1"
                >
                  <i className="fa-brands fa-whatsapp text-lg"></i>
                  <span>Contact Us</span>
                  <i className="fa-solid fa-arrow-right text-sm"></i>
                </a>
              </div>
            </div>

            {/* Right Interactive Video Button */}
            <div className="lg:col-span-4 flex justify-center items-center py-4 hidden lg:flex">
              <button
                onClick={() => {
                  if (onOpenVideoModal) onOpenVideoModal();
                  setIsVideoModalOpen(true);
                }}
                className="group relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-md border-2 border-white/80 shadow-2xl transition-all duration-500 transform hover:scale-110 cursor-pointer z-30"
                aria-label="Play Property Video"
              >
                <span className="absolute inset-0 rounded-full border-2 border-white/60 animate-ping opacity-75 pointer-events-none"></span>
                <span className="absolute -inset-2 rounded-full border border-white/40 animate-pulse pointer-events-none"></span>

                <div className="w-12 h-12 rounded-full bg-white text-[#612124] flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition-transform pointer-events-none">
                  <i className="fa-solid fa-play text-xl text-[#612124]"></i>
                </div>
              </button>
            </div>
          </div>

          {/* Bottom Indicators & Navigation Controls */}
          <div className="flex justify-between items-center pt-4 border-t border-white/15">
            <div className="flex items-center space-x-2.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`transition-all duration-300 cursor-pointer ${
                    i === currentSlide
                      ? "w-9 h-2.5 rounded-full bg-[#c5a880]"
                      : "w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white/80"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="w-10 h-10 rounded-full bg-black/40 hover:bg-[#c5a880] hover:text-[#231518] text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer"
                aria-label="Previous Slide"
              >
                <i className="fa-solid fa-chevron-left text-sm"></i>
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="w-10 h-10 rounded-full bg-black/40 hover:bg-[#c5a880] hover:text-[#231518] text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer"
                aria-label="Next Slide"
              >
                <i className="fa-solid fa-chevron-right text-sm"></i>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Video Modal Popup */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  );
}

