'use client'

import React from 'react'
import { SearchX, RotateCcw } from 'lucide-react'

export interface PropertyCardSkeletonProps {
  className?: string
}

/**
 * Shimmer Skeleton Loader for Property Cards
 * Proportions precisely match PropertyCardBuilding and PropertyCardLand.
 */
export function PropertyCardSkeleton({ className = '' }: PropertyCardSkeletonProps) {
  return (
    <div
      className={`rounded-2xl border border-stone-200/90 bg-white shadow-sm overflow-hidden flex flex-col h-full animate-pulse ${className}`}
      aria-hidden="true"
    >
      {/* 1. Image Skeleton (16:10 aspect ratio) */}
      <div className="relative aspect-[16/10] w-full bg-stone-200">
        <div className="absolute top-3 left-3 h-6 w-20 rounded-md bg-stone-300/80" />
        <div className="absolute top-3 right-3 h-6 w-24 rounded-md bg-stone-300/80" />
      </div>

      {/* 2. Content Skeleton */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <div className="h-5 bg-stone-200 rounded-md w-3/4 mb-3" />

        {/* Price & Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="h-7 bg-stone-200 rounded-md w-1/3" />
          <div className="h-5 bg-stone-100 rounded-full w-20" />
        </div>

        {/* Description Snippet (2 lines) */}
        <div className="space-y-1.5 mb-4 flex-grow">
          <div className="h-3.5 bg-stone-100 rounded w-full" />
          <div className="h-3.5 bg-stone-100 rounded w-4/5" />
        </div>

        {/* 3. Specs Bottom Bar */}
        <div className="pt-3 border-t border-stone-100 grid grid-cols-3 gap-2 mt-auto">
          <div className="h-4 bg-stone-200 rounded w-16" />
          <div className="h-4 bg-stone-200 rounded w-16 mx-auto" />
          <div className="h-4 bg-stone-200 rounded w-16 ml-auto" />
        </div>
      </div>
    </div>
  )
}

export interface PropertyGridSkeletonProps {
  count?: number
  className?: string
}

/**
 * Grid of Property Card Skeletons
 */
export function PropertyGridSkeleton({
  count = 6,
  className = '',
}: PropertyGridSkeletonProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      aria-label="Loading properties"
    >
      {Array.from({ length: count }).map((_, index) => (
        <PropertyCardSkeleton key={index} />
      ))}
    </div>
  )
}

export interface PropertyEmptyStateProps {
  title?: string
  description?: string
  onReset?: () => void
  className?: string
}

/**
 * Modern Empty State View
 * Rendered when no properties match user filter criteria.
 */
export function PropertyEmptyState({
  title = 'No Properties Found',
  description = "We couldn't find any properties matching your current search criteria. Try broadening your filter selections or reset all filters to view the full catalog.",
  onReset,
  className = '',
}: PropertyEmptyStateProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-stone-200/90 shadow-sm p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-xl mx-auto my-12 ${className}`}
    >
      {/* Icon Circle */}
      <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#612124] border border-amber-200/60 flex items-center justify-center mb-5 shadow-inner">
        <SearchX className="w-8 h-8" />
      </div>

      {/* Heading */}
      <h3 className="text-xl font-bold text-stone-900 mb-2">{title}</h3>

      {/* Narrative */}
      <p className="text-stone-500 text-sm leading-relaxed mb-6 max-w-md">
        {description}
      </p>

      {/* Action Button */}
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#381e23] hover:bg-[#612124] shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Filters</span>
        </button>
      )}
    </div>
  )
}

export default PropertyCardSkeleton

