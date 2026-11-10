'use client'

import React, { useState, useEffect, useCallback, useTransition } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type {
  LandFilterFormState,
  PublicPropertyListQuery,
  PublicProperty,
  PaginationMeta,
  PublicPropertySort,
  AreaUnit,
} from '@/lib/types/property.types'
import { propertyService } from '@/lib/services/propertyService'
import { extractLandApproval } from '@/lib/formatters'
import {
  LandHeroBanner,
  LandFilterSidebar,
  PropertySortToolbar,
  PropertyCardLand,
  PropertyPagination,
  PropertyGridSkeleton,
  PropertyEmptyState,
} from '@/components/properties'
import {
  MIN_PRICE_LIMIT,
  MAX_PRICE_LIMIT,
} from '@/components/properties/LandFilterSidebar'

export const DEFAULT_LAND_FILTERS: LandFilterFormState = {
  propertyId: '',
  propertyType: '',
  category: '',
  location: '',
  city: '',
  road: '',
  minSize: '',
  priceRange: [MIN_PRICE_LIMIT, MAX_PRICE_LIMIT],
  sort: 'newest',
  sizeRange: 'all',
  status: 'all',
}

const DEFAULT_PAGINATION: PaginationMeta = {
  page: 1,
  limit: 6,
  total: 0,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
}

export default function LandCatalogClient() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  // Initialize filters from URL parameters
  const [filters, setFilters] = useState<LandFilterFormState>(() => {
    const propertyId = searchParams.get('propertyId') || ''
    const propertyType =
      searchParams.get('propertyType') || searchParams.get('category') || ''
    const location =
      searchParams.get('location') || searchParams.get('city') || ''
    const road = searchParams.get('road') || ''
    const minSize = searchParams.get('minSize') || ''
    const minPrice = searchParams.get('minPrice')
      ? Number(searchParams.get('minPrice'))
      : MIN_PRICE_LIMIT
    const maxPrice = searchParams.get('maxPrice')
      ? Number(searchParams.get('maxPrice'))
      : MAX_PRICE_LIMIT

    const rawSort = searchParams.get('sort')
    const validSorts: PublicPropertySort[] = [
      'newest',
      'oldest',
      'price_asc',
      'price_desc',
      'area_desc',
    ]
    const sort: PublicPropertySort = validSorts.includes(
      rawSort as PublicPropertySort
    )
      ? (rawSort as PublicPropertySort)
      : 'newest'

    const sizeRange = searchParams.get('sizeRange') || 'all'
    const status = searchParams.get('status') || 'all'

    return {
      propertyId,
      propertyType,
      category: propertyType,
      location,
      city: location,
      road,
      minSize,
      priceRange: [minPrice, maxPrice],
      sort,
      sizeRange,
      status,
    }
  })

  const [page, setPage] = useState<number>(() => {
    const p = searchParams.get('page')
    return p ? Math.max(1, parseInt(p, 10)) : 1
  })

  const [properties, setProperties] = useState<PublicProperty[]>([])
  const [pagination, setPagination] = useState<PaginationMeta>(DEFAULT_PAGINATION)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Sync state to browser URL search params
  const syncUrlParams = useCallback(
    (currentFilters: LandFilterFormState, currentPage: number) => {
      const params = new URLSearchParams()

      if (currentPage > 1) params.set('page', String(currentPage))
      if (currentFilters.propertyId)
        params.set('propertyId', currentFilters.propertyId)
      if (currentFilters.propertyType)
        params.set('propertyType', currentFilters.propertyType)
      if (currentFilters.location) params.set('location', currentFilters.location)
      if (currentFilters.road) params.set('road', currentFilters.road)
      if (currentFilters.minSize) params.set('minSize', currentFilters.minSize)
      if (currentFilters.priceRange[0] > MIN_PRICE_LIMIT) {
        params.set('minPrice', String(currentFilters.priceRange[0]))
      }
      if (currentFilters.priceRange[1] < MAX_PRICE_LIMIT) {
        params.set('maxPrice', String(currentFilters.priceRange[1]))
      }
      if (currentFilters.sort !== 'newest') params.set('sort', currentFilters.sort)
      if (currentFilters.sizeRange !== 'all')
        params.set('sizeRange', currentFilters.sizeRange)
      if (currentFilters.status !== 'all')
        params.set('status', currentFilters.status)

      const qs = params.toString()
      const newUrl = qs ? `${pathname}?${qs}` : pathname
      startTransition(() => {
        router.push(newUrl, { scroll: false })
      })
    },
    [pathname, router]
  )

  // Load land properties whenever filters or page changes
  useEffect(() => {
    let ignore = false

    async function loadLandProperties() {
      const query: PublicPropertyListQuery = {
        property_type: 'LAND',
        page,
        limit: 6,
        sort: filters.sort,
      }

      if (filters.propertyId.trim()) {
        query.search = filters.propertyId.trim()
      }
      if (filters.propertyType || filters.category) {
        query.sub_type = filters.propertyType || filters.category
      }
      if (filters.location || filters.city) {
        query.location = filters.location || filters.city
      }
      if (filters.road) {
        query.road_base = filters.road
      }
      if (filters.priceRange[0] > MIN_PRICE_LIMIT) {
        query.min_price = filters.priceRange[0]
      }
      if (filters.priceRange[1] < MAX_PRICE_LIMIT) {
        query.max_price = filters.priceRange[1]
      }
      if (
        filters.minSize !== '' &&
        !isNaN(Number(filters.minSize)) &&
        Number(filters.minSize) >= 0
      ) {
        query.min_area = Number(filters.minSize)
      }

      // Map toolbar size range presets
      if (filters.sizeRange === 'below_500') {
        query.max_area = 500
      } else if (filters.sizeRange === '500_1000') {
        query.min_area = 500
        query.max_area = 1000
      } else if (filters.sizeRange === '1000_2000') {
        query.min_area = 1000
        query.max_area = 2000
      } else if (filters.sizeRange === 'above_2000') {
        query.min_area = 2000
      }

      // Map toolbar status filter
      if (filters.status === 'featured') {
        query.is_featured = true
      }

      try {
        const response = await propertyService.getProperties(query)
        if (!ignore) {
          let propertyList = response.data || []

          // Client-side status negotiation filter
          if (filters.status === 'negotiable') {
            propertyList = propertyList.filter((p) => p.is_negotiable === true)
          }

          setProperties(propertyList)
          const metaObj = response.pagination || response.meta
          setPagination({
            page: Number(metaObj?.page) || page,
            limit: Number(metaObj?.limit) || 6,
            total: Number(metaObj?.total) || propertyList.length,
            totalPages: Number(metaObj?.totalPages || metaObj?.total_pages) || 1,
            hasNextPage: Boolean(metaObj?.hasNextPage ?? metaObj?.has_next_page),
            hasPrevPage: Boolean(metaObj?.hasPrevPage ?? metaObj?.has_prev_page),
          })
        }
      } catch (err) {
        console.error('Failed to load land properties:', err)
        if (!ignore) {
          setProperties([])
          setPagination(DEFAULT_PAGINATION)
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadLandProperties()

    return () => {
      ignore = true
    }
  }, [filters, page])

  const handleSearch = () => {
    setIsLoading(true)
    setPage(1)
    syncUrlParams(filters, 1)
  }

  const handleReset = () => {
    setIsLoading(true)
    setFilters(DEFAULT_LAND_FILTERS)
    setPage(1)
    syncUrlParams(DEFAULT_LAND_FILTERS, 1)
  }

  const handleSortChange = (newSort: PublicPropertySort) => {
    setIsLoading(true)
    setFilters((prev) => {
      const updated = { ...prev, sort: newSort }
      syncUrlParams(updated, 1)
      return updated
    })
    setPage(1)
  }

  const handleSizeRangeChange = (newSizeRange: string) => {
    setIsLoading(true)
    setFilters((prev) => {
      const updated = { ...prev, sizeRange: newSizeRange }
      syncUrlParams(updated, 1)
      return updated
    })
    setPage(1)
  }

  const handleStatusChange = (newStatus: string) => {
    setIsLoading(true)
    setFilters((prev) => {
      const updated = { ...prev, status: newStatus }
      syncUrlParams(updated, 1)
      return updated
    })
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    setIsLoading(true)
    setPage(newPage)
    syncUrlParams(filters, newPage)
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      {/* 1. Land Catalog Hero Banner */}
      <LandHeroBanner />

      {/* 2. Main Land Catalog Section */}
      <div
        id="land-catalog-grid"
        className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 py-10 sm:py-14"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar (Desktop: 4 cols, XL: 3 cols) */}
          <aside className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24">
            <LandFilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onSearch={handleSearch}
              onReset={handleReset}
            />
          </aside>

          {/* Right Property Grid Area (Desktop: 8 cols, XL: 9 cols) */}
          <section className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
            {/* Top Toolbar */}
            <PropertySortToolbar
              sort={filters.sort}
              onSortChange={handleSortChange}
              sizeRange={filters.sizeRange}
              onSizeRangeChange={handleSizeRangeChange}
              status={filters.status}
              onStatusChange={handleStatusChange}
              onReset={handleReset}
              totalCount={pagination.total}
            />

            {/* Catalog Grid View */}
            {isLoading ? (
              <PropertyGridSkeleton count={6} />
            ) : properties.length === 0 ? (
              <PropertyEmptyState onReset={handleReset} />
            ) : (
              <>
                {/* 3x2 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {properties.map((property, idx) => (
                    <PropertyCardLand
                      key={property.id}
                      property={property}
                      priority={idx < 3}
                    />
                  ))}
                </div>

                {/* Bottom Pagination */}
                <div className="pt-6">
                  <PropertyPagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                    scrollTargetId="land-catalog-grid"
                  />
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
