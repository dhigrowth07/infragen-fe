'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export interface HeroSlide {
  titleLine1: string
  titleLine2: string
  subtitle: string
  imageUrl: string
}

const HERO_SLIDES: HeroSlide[] = [
  {
    titleLine1: 'Find Your Dream',
    titleLine2: 'Property',
    subtitle:
      'Explore modern villas, luxury penthouses, commercial spaces, and cozy family apartments hand-picked for quality living.',
    imageUrl: '/assets/images/building-hero-img.png',
  },
  {
    titleLine1: 'Architectural Elegance',
    titleLine2: 'In Prime Locations',
    subtitle:
      "Premium gated communities and custom-crafted commercial developments in Coimbatore's most coveted expressway corridors.",
    imageUrl: '/assets/images/building-hero-img.png',
  },
  {
    titleLine1: 'Contemporary Luxury',
    titleLine2: 'Tailored For Families',
    subtitle:
      'Experience superior ventilation, 100% vaastu compliance, and state-of-the-art community clubhouse amenities.',
    imageUrl: '/assets/images/building-hero-img.png',
  },
]

export interface BuildingHeroBannerProps {
  className?: string
  slides?: HeroSlide[]
}

/**
 * Building Catalog Hero Section
 * Strictly matching reference-ui/property - building - page.png:
 * - Dark luxury interior skyline background with subtle vignette overlay
 * - Headline: "Find Your Dream Property"
 * - Subtitle: "Explore modern villas, luxury penthouses, commercial spaces, and cozy family apartments hand-picked for quality living."
 * - Carousel arrow buttons (←, →) for multi-banner rotation
 */
export default function BuildingHeroBanner({
  className = '',
  slides = HERO_SLIDES,
}: BuildingHeroBannerProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const activeSlide = slides[currentSlideIndex] || slides[0]

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  return (
    <section
      className={`relative w-full overflow-hidden bg-[#1c1214] text-white min-h-[600px] sm:min-h-[620px] md:min-h-[640px] lg:min-h-[660px] flex items-center ${className}`}
      aria-label="Building property catalog hero banner"
    >
      {/* 1. Background Image with Fade Transition */}
      <div className="absolute inset-0 z-0">
        <Image
          src={activeSlide.imageUrl}
          alt={`${activeSlide.titleLine1} ${activeSlide.titleLine2}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-all duration-700 ease-out"
        />

        {/* Brand Vignette & Dark Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 z-10 pointer-events-none" />
      </div>

      {/* 2. Banner Content Container */}
      <div className="relative z-20 max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 pt-32 sm:pt-36 md:pt-36 lg:pt-38 pb-16 sm:pb-20 w-full flex flex-col justify-center min-h-[600px] sm:min-h-[620px] md:min-h-[640px] lg:min-h-[660px]">
        <div className="max-w-3xl">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
            <span className="block">{activeSlide.titleLine1}</span>
            <span className="block text-white/95">{activeSlide.titleLine2}</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-white/80 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl">
            {activeSlide.subtitle}
          </p>

          {/* Carousel Arrow Controls */}
          <div className="mt-6 sm:mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full border border-white/25 bg-black/35 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full border border-white/25 bg-black/35 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Slide Index Indicators */}
            <div className="flex items-center gap-1.5 ml-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentSlideIndex
                      ? 'w-6 bg-white'
                      : 'w-2 bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

