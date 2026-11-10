import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import BuildingCatalogClient from './BuildingCatalogClient'
import { PropertyGridSkeleton } from '@/components/properties'

export const metadata: Metadata = {
  title: 'Building Properties & Luxury Homes for Sale in Coimbatore | Vizhi Infragen',
  description:
    'Browse premier villas, modern townhouses, penthouses, commercial spaces, and apartments in Coimbatore with verified documents and clear titles.',
}

export default function BuildingPropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 py-24 min-h-screen">
          <PropertyGridSkeleton count={6} />
        </div>
      }
    >
      <BuildingCatalogClient />
    </Suspense>
  )
}

