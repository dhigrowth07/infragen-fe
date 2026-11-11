import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function PropertyNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#fbf9f5] px-4 py-24 sm:py-32">
      <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-xl">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#381e23]/10 flex items-center justify-center text-[#381e23]">
          <Image
            src="/vizhi-infragen-realtors-logo.png"
            alt="Vizhi Infragen Realtors"
            width={64}
            height={36}
            className="w-16 h-auto object-contain opacity-80"
          />
        </div>

        <span className="text-xs font-bold text-[#c5a880] uppercase tracking-[0.2em] font-['Inter',sans-serif] block mb-2">
          Listing Status
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#381e23] font-['Outfit',sans-serif] tracking-tight mb-3">
          Property Not Found
        </h1>

        <p className="text-sm text-stone-600 font-['Inter',sans-serif] leading-relaxed mb-8">
          The property listing you are searching for might have been sold, archived, or is temporarily unavailable. Explore our active listings below.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/properties/land"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#381e23] hover:bg-[#4d2930] text-white font-bold text-xs uppercase tracking-wider font-['Inter',sans-serif] transition-all shadow-md hover:shadow-lg"
          >
            Browse Land Plots
          </Link>
          <Link
            href="/properties/building"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#c5a880] hover:bg-[#b5956a] text-[#251215] font-bold text-xs uppercase tracking-wider font-['Inter',sans-serif] transition-all shadow-md hover:shadow-lg"
          >
            Browse Buildings
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-stone-100">
          <Link
            href="/"
            className="text-xs text-stone-500 hover:text-[#381e23] font-medium font-['Inter',sans-serif] transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

