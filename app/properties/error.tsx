'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function PropertiesError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[PropertiesError] Client route error:', error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#fbf9f5] px-4 py-24 sm:py-32">
      <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-xl">
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold text-[#c5a880] uppercase tracking-[0.2em] font-['Inter',sans-serif] block mb-2">
          Unable to Load
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#381e23] font-['Outfit',sans-serif] tracking-tight mb-3">
          Something went wrong
        </h1>

        <p className="text-sm text-stone-600 font-['Inter',sans-serif] leading-relaxed mb-6">
          {error.message ||
            'We encountered an issue fetching property information. Please try refreshing or check back shortly.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#381e23] hover:bg-[#4d2930] text-white font-bold text-xs uppercase tracking-wider font-['Inter',sans-serif] transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold text-xs uppercase tracking-wider font-['Inter',sans-serif] transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

