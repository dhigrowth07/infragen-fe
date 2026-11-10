'use client'

import React from 'react'
import type { PublicProperty } from '@/lib/types/property.types'

export interface PropertyDescriptionProps {
  property: PublicProperty
  className?: string
}

/**
 * Property Narrative & Description Card
 * Strictly matching reference-ui/property - details - page.png (Slice 1):
 * - Clean white card with "Description" heading
 * - Thin divider line
 * - Formatted narrative paragraphs with comfortable line-height and typography
 */
export default function PropertyDescription({
  property,
  className = '',
}: PropertyDescriptionProps) {
  const narrative = property.description?.trim()

  // Strictly show valid data only; if no description exists, hide the card
  if (!narrative) {
    return null
  }

  const paragraphs = narrative
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <article
      className={`bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 ${className}`}
      aria-labelledby="property-description-heading"
    >
      <h2
        id="property-description-heading"
        className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight pb-4 border-b border-stone-100"
      >
        Description
      </h2>

      <div className="mt-5 space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
        {paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>
    </article>
  )
}

