import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import LandCatalogClient from './LandCatalogClient'
import { PropertyGridSkeleton } from '@/components/properties'

export const metadata: Metadata = {
  title:
    'Land & Plots for Sale in Coimbatore | DTCP & RERA Approved Plots | Vizhi Infragen',
  description:
    'Explore verified DTCP approved plots, fertile agricultural farmlands, commercial parcels, and premium industrial layouts in Coimbatore and surrounding expressway corridors.',
}

export default function LandPropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 py-24 min-h-screen">
          <PropertyGridSkeleton count={6} />
        </div>
      }
    >
      <LandCatalogClient />
    </Suspense>
  )
}

