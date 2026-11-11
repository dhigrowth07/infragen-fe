'use client'

import React from 'react'
import type { PublicProperty } from '@/lib/types/property.types'
import SimilarPropertiesGrid from './SimilarPropertiesGrid'

export interface PropertySimilarSectionProps {
  properties: PublicProperty[]
  className?: string
}

/**
 * Similar Properties Recommendation Section (Phase 7.3)
 * Backward-compatible wrapper delegating to SimilarPropertiesGrid.
 */
export default function PropertySimilarSection({
  properties,
  className = '',
}: PropertySimilarSectionProps) {
  return <SimilarPropertiesGrid properties={properties} className={className} />
}
