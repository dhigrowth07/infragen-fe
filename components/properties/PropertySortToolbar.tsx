'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, X } from 'lucide-react'
import type { PublicPropertySort } from '@/lib/types/property.types'

export interface SortOption {
  label: string
  value: PublicPropertySort
}

export interface FilterOption {
  label: string
  value: string
}

export const SORT_OPTIONS: SortOption[] = [
  { label: 'Sort: Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Sort: Oldest', value: 'oldest' },
]

export const SIZE_OPTIONS: FilterOption[] = [
  { label: 'All Sizes', value: 'all' },
  { label: 'Below 500 sq.ft', value: 'below_500' },
  { label: '500 - 1,000 sq.ft', value: '500_1000' },
  { label: '1,000 - 2,000 sq.ft', value: '1000_2000' },
  { label: 'Above 2,000 sq.ft', value: 'above_2000' },
]

export const STATUS_OPTIONS: FilterOption[] = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Featured', value: 'featured' },
  { label: 'Negotiation', value: 'negotiable' },
]

export interface PropertySortToolbarProps {
  sort: PublicPropertySort
  onSortChange: (sort: PublicPropertySort) => void
  sizeRange: string
  onSizeRangeChange: (sizeRange: string) => void
  status: string
  onStatusChange: (status: string) => void
  onReset?: () => void
  totalCount?: number
  className?: string
}

/**
 * Property Top Sort & Size Toolbar
 * Strictly matching reference-ui/property - building - filter expend - page.png:
 * - 3 interactive dropdown menus with outside-click detection:
 *   1. Sort Dropdown (Newest, Price Asc, Price Desc, Oldest)
 *   2. Size (Sq. Ft.) Dropdown (All Sizes, <500, 500-1000, 1000-2000, >2000)
 *   3. All Statuses Dropdown (All, Featured, Negotiation)
 * - Active state indicators and animated expansion
 */
export default function PropertySortToolbar({
  sort,
  onSortChange,
  sizeRange,
  onSizeRangeChange,
  status,
  onStatusChange,
  onReset,
  totalCount,
  className = '',
}: PropertySortToolbarProps) {
  const [openDropdown, setOpenDropdown] = useState<
    'sort' | 'size' | 'status' | null
  >(null)

  const toolbarRef = useRef<HTMLDivElement>(null)

  // Outside click detection
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        toolbarRef.current &&
        !toolbarRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedSortOption =
    SORT_OPTIONS.find((opt) => opt.value === sort) || SORT_OPTIONS[0]

  const selectedSizeOption =
    SIZE_OPTIONS.find((opt) => opt.value === sizeRange) || SIZE_OPTIONS[0]

  const selectedStatusOption =
    STATUS_OPTIONS.find((opt) => opt.value === status) || STATUS_OPTIONS[0]

  const hasActiveFilters =
    sizeRange !== 'all' || status !== 'all' || sort !== 'newest'

  const handleResetFilters = () => {
    setOpenDropdown(null)
    if (onReset) {
      onReset()
    } else {
      onSortChange('newest')
      onSizeRangeChange('all')
      onStatusChange('all')
    }
  }

  return (
    <div
      ref={toolbarRef}
      className={`flex flex-wrap items-center justify-between gap-3 bg-white p-3 md:p-3.5 rounded-xl border border-stone-200/90 shadow-sm ${className}`}
    >
      {/* Left: Optional count info */}
      <div className="text-xs md:text-sm font-medium text-stone-500">
        {totalCount !== undefined ? (
          <span>
            Showing <strong className="text-stone-800">{totalCount}</strong>{' '}
            {totalCount === 1 ? 'property' : 'properties'}
          </span>
        ) : (
          <span className="hidden sm:inline">Filter & Sort</span>
        )}
      </div>

      {/* Right: 3 Dropdown Menus */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 ml-auto">
        {/* 1. Sort Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setOpenDropdown((prev) => (prev === 'sort' ? null : 'sort'))
            }
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
              openDropdown === 'sort'
                ? 'bg-stone-100 text-stone-900 border-stone-400 ring-2 ring-stone-200'
                : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-300'
            }`}
            aria-expanded={openDropdown === 'sort'}
          >
            <span>{selectedSortOption.label}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${
                openDropdown === 'sort' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openDropdown === 'sort' && (
            <div className="absolute right-0 sm:left-0 top-full mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-stone-200/90 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
              {SORT_OPTIONS.map((opt) => {
                const isSelected = opt.value === sort
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onSortChange(opt.value)
                      setOpenDropdown(null)
                    }}
                    className={`w-full px-3.5 py-2 text-left text-xs md:text-sm flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-stone-50 text-[#612124] font-semibold'
                        : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#612124] shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* 2. Size (Sq. Ft.) Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setOpenDropdown((prev) => (prev === 'size' ? null : 'size'))
            }
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
              sizeRange !== 'all'
                ? 'bg-[#f5e6e8] text-[#612124] border-[#612124]/40 font-semibold'
                : openDropdown === 'size'
                  ? 'bg-stone-100 text-stone-900 border-stone-400 ring-2 ring-stone-200'
                  : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-300'
            }`}
            aria-expanded={openDropdown === 'size'}
          >
            <span>
              {sizeRange === 'all'
                ? 'Size (Sq. Ft.)'
                : selectedSizeOption.label}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${
                openDropdown === 'size' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openDropdown === 'size' && (
            <div className="absolute right-0 sm:left-0 top-full mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-stone-200/90 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
              {SIZE_OPTIONS.map((opt) => {
                const isSelected = opt.value === sizeRange
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onSizeRangeChange(opt.value)
                      setOpenDropdown(null)
                    }}
                    className={`w-full px-3.5 py-2 text-left text-xs md:text-sm flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-stone-50 text-[#612124] font-semibold'
                        : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#612124] shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* 3. All Statuses Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setOpenDropdown((prev) => (prev === 'status' ? null : 'status'))
            }
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
              status !== 'all'
                ? 'bg-[#f5e6e8] text-[#612124] border-[#612124]/40 font-semibold'
                : openDropdown === 'status'
                  ? 'bg-stone-100 text-stone-900 border-stone-400 ring-2 ring-stone-200'
                  : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-300'
            }`}
            aria-expanded={openDropdown === 'status'}
          >
            <span>
              {status === 'all'
                ? 'All Statuses'
                : selectedStatusOption.label}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${
                openDropdown === 'status' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openDropdown === 'status' && (
            <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-stone-200/90 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
              {STATUS_OPTIONS.map((opt) => {
                const isSelected = opt.value === status
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onStatusChange(opt.value)
                      setOpenDropdown(null)
                    }}
                    className={`w-full px-3.5 py-2 text-left text-xs md:text-sm flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-stone-50 text-[#612124] font-semibold'
                        : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#612124] shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Clear Filters Button (shown when any filter or custom sort is applied) */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-semibold text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            title="Reset filters"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}
      </div>
    </div>
  )
}

