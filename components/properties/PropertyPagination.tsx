'use client'

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface PropertyPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  scrollTargetId?: string
  className?: string
}

/**
 * Property Pagination Component
 * Strictly matching wireframes:
 * - < Previous disabled on page 1
 * - Number buttons with active page highlighted (solid dark rounded square)
 * - ... ellipsis for extended page ranges
 * - Next > disabled on last page
 * - Smooth viewport scrolling on page change
 */
export default function PropertyPagination({
  currentPage,
  totalPages,
  onPageChange,
  scrollTargetId = 'property-catalog-grid',
  className = '',
}: PropertyPaginationProps) {
  if (totalPages <= 1) return null

  const handlePageSelect = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return
    onPageChange(page)

    if (typeof window !== 'undefined') {
      const element = scrollTargetId
        ? document.getElementById(scrollTargetId)
        : null
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.scrollTo({ top: 350, behavior: 'smooth' })
      }
    }
  }

  // Generate page numbers with ellipses
  const getPageItems = (): (number | 'ellipsis-left' | 'ellipsis-right')[] => {
    const items: (number | 'ellipsis-left' | 'ellipsis-right')[] = []
    const delta = 1 // pages before and after current page

    const left = Math.max(2, currentPage - delta)
    const right = Math.min(totalPages - 1, currentPage + delta)

    // Always include first page
    items.push(1)

    // Left ellipsis if there's a gap between 1 and left
    if (left > 2) {
      items.push('ellipsis-left')
    }

    // Middle window
    for (let i = left; i <= right; i++) {
      items.push(i)
    }

    // Right ellipsis if there's a gap between right and totalPages
    if (right < totalPages - 1) {
      items.push('ellipsis-right')
    }

    // Always include last page
    if (totalPages > 1) {
      items.push(totalPages)
    }

    return items
  }

  const pageItems = getPageItems()

  return (
    <nav
      role="navigation"
      aria-label="Property Catalog Pagination"
      className={`flex items-center justify-center gap-1 sm:gap-2 my-8 ${className}`}
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => handlePageSelect(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`inline-flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
          currentPage <= 1
            ? 'text-stone-300 bg-stone-50 cursor-not-allowed border border-stone-200/60'
            : 'text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 shadow-sm active:scale-95'
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4 shrink-0" />
        <span className="hidden xs:inline">Previous</span>
      </button>

      {/* Number Buttons & Ellipses */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {pageItems.map((item, index) => {
          if (typeof item === 'string') {
            return (
              <span
                key={`${item}-${index}`}
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-stone-400 select-none text-sm font-medium"
              >
                …
              </span>
            )
          }

          const isActive = item === currentPage

          return (
            <button
              key={item}
              type="button"
              onClick={() => handlePageSelect(item)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center ${
                isActive
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'text-stone-700 hover:bg-stone-100 border border-transparent hover:border-stone-200'
              }`}
            >
              {item}
            </button>
          )
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => handlePageSelect(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`inline-flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
          currentPage >= totalPages
            ? 'text-stone-300 bg-stone-50 cursor-not-allowed border border-stone-200/60'
            : 'text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 shadow-sm active:scale-95'
        }`}
        aria-label="Next page"
      >
        <span className="hidden xs:inline">Next</span>
        <ChevronRight className="w-4 h-4 shrink-0" />
      </button>
    </nav>
  )
}

