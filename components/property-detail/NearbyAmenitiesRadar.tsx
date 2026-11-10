'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { Map as LeafletMap, TileLayer as LeafletTileLayer } from 'leaflet'
import {
  MapPin,
  Compass,
  Plus,
  Minus,
  RotateCcw,
  Layers,
  ExternalLink,
} from 'lucide-react'
import type { PublicProperty } from '@/lib/types/property.types'

export interface NearbyAmenitiesRadarProps {
  property: PublicProperty
  className?: string
}

interface CategoryStyle {
  label: string
  color: string
  badgeBg: string
  dotClass: string
  svgIcon: string
}

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  SCHOOLS_COLLEGES: {
    label: 'Schools & Colleges',
    color: '#6366f1',
    badgeBg: '#6366f1',
    dotClass: 'bg-[#6366f1]',
    svgIcon:
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
  },
  HOSPITALS: {
    label: 'Hospitals',
    color: '#0d9488',
    badgeBg: '#0d9488',
    dotClass: 'bg-[#0d9488]',
    svgIcon:
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v12M6 12h12"/></svg>',
  },
  TRANSIT_HIGHWAYS: {
    label: 'Transit & Highways',
    color: '#f59e0b',
    badgeBg: '#f59e0b',
    dotClass: 'bg-[#f59e0b]',
    svgIcon:
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>',
  },
  BANKS_MARKETS: {
    label: 'Banks & Markets',
    color: '#e11d48',
    badgeBg: '#e11d48',
    dotClass: 'bg-[#e11d48]',
    svgIcon:
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M12 3 2 10h20Z"/><line x1="6" y1="10" x2="6" y2="21"/><line x1="10" y1="10" x2="10" y2="21"/><line x1="14" y1="10" x2="14" y2="21"/><line x1="18" y1="10" x2="18" y2="21"/></svg>',
  },
  PARKS_RECREATION: {
    label: 'Parks & Recreation',
    color: '#059669',
    badgeBg: '#059669',
    dotClass: 'bg-[#059669]',
    svgIcon:
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M7 16v6"/><path d="M13 19v3"/><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-4 4.3a1 1 0 0 0 .8 1.7H10l-3 3.3a1 1 0 0 0 .7 1.7H8l-3 3.3a1 1 0 0 0 .7 1.7H12Z"/></svg>',
  },
  OTHER: {
    label: 'Other Amenities',
    color: '#64748b',
    badgeBg: '#64748b',
    dotClass: 'bg-[#64748b]',
    svgIcon:
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
  },
}

const DEFAULT_STYLE: CategoryStyle = {
  label: 'Landmark',
  color: '#0d9488',
  badgeBg: '#0d9488',
  dotClass: 'bg-[#0d9488]',
  svgIcon:
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
}

/**
 * Calculates accurate real-world GPS coordinates using Haversine forward geodetic formula
 */
function calculateGeodesicDestination(
  centerLat: number,
  centerLng: number,
  distanceKm: number,
  bearingDeg: number
): [number, number] {
  const R = 6371 // Earth radius in km
  const dByR = distanceKm / R
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const toDeg = (rad: number) => (rad * 180) / Math.PI

  const lat1 = toRad(centerLat)
  const lon1 = toRad(centerLng)
  const brng = toRad(bearingDeg)

  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(dByR) +
      Math.cos(lat1) * Math.sin(dByR) * Math.cos(brng)
  )
  const lon2 =
    lon1 +
    Math.atan2(
      Math.sin(brng) * Math.sin(dByR) * Math.cos(lat1),
      Math.cos(dByR) - Math.sin(lat1) * Math.sin(lat2)
    )

  return [toDeg(lat2), toDeg(lon2)]
}

/**
 * Interactive 5KM Proximity Radar & Real Leaflet Map Component
 * Strictly matching reference-ui/property - details - page.png (Slice 3):
 * - Live Leaflet.js map engine with real street and satellite tile layers
 * - Real geodesic 1.0 km, 2.5 km, and 5.0 km distance rings centered on Property Site
 * - Color-coded radiating connection lines from Property Zero Point to prominent landmarks
 * - Custom HTML DivIcon markers with floating tooltip cards showing distance and drive times
 * - Top-left property info card, top-right landmark count and zoom controls
 * - Bottom legend bar with category dots, survey number, and live Satellite View toggle
 */
export default function NearbyAmenitiesRadar({
  property,
  className = '',
}: NearbyAmenitiesRadarProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<LeafletMap | null>(null)
  const streetLayerRef = useRef<LeafletTileLayer | null>(null)
  const satelliteLayerRef = useRef<LeafletTileLayer | null>(null)

  const [isSatelliteView, setIsSatelliteView] = useState(false)

  // Strictly filter for valid amenity items with real names
  const rawAmenities = property.nearbyAmenities || []
  const amenities = rawAmenities.filter(
    (item) => item && typeof item.name === 'string' && item.name.trim().length > 0
  )

  // Validate coordinates & amenities presence without early return before hooks
  const hasValidLat =
    property.latitude != null &&
    String(property.latitude).trim() !== '' &&
    !isNaN(Number(property.latitude))
  const hasValidLng =
    property.longitude != null &&
    String(property.longitude).trim() !== '' &&
    !isNaN(Number(property.longitude))

  const centerLat = hasValidLat ? Number(property.latitude) : 0
  const centerLng = hasValidLng ? Number(property.longitude) : 0

  const fullAddress = [
    property.street_address,
    property.location,
    property.city,
    property.state,
    property.pincode,
  ]
    .filter(Boolean)
    .join(', ')

  // Dynamically resolve only the unique categories actually present in amenities
  const presentCategories = Array.from(
    new Set(amenities.map((item) => item.category).filter(Boolean))
  )

  // Initialize and mount Leaflet map on client-side
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return
    if (!hasValidLat || !hasValidLng || amenities.length === 0) return
    let isMounted = true

    async function initLeaflet() {
      try {
        const L = (await import('leaflet')).default

        if (!isMounted || !mapContainerRef.current) return

        // Prevent double initialization
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove()
          mapInstanceRef.current = null
        }

        // 1. Initialize Map Instance
        const map = L.map(mapContainerRef.current, {
          center: [centerLat, centerLng],
          zoom: 14,
          zoomControl: false,
          attributionControl: false,
        })
        mapInstanceRef.current = map

        // 2. Define Real Tile Layers
        // Street: Esri World Street Map (Zero API key required, clean real-world street topography)
        const streetLayer = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
          {
            maxZoom: 19,
            attribution: '&copy; Esri',
          }
        )
        streetLayerRef.current = streetLayer

        // Satellite: Esri World Imagery high-res satellite photos
        const satelliteLayer = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          {
            maxZoom: 19,
          }
        )
        satelliteLayerRef.current = satelliteLayer

        // Add initial active layer
        if (isSatelliteView) {
          satelliteLayer.addTo(map)
        } else {
          streetLayer.addTo(map)
        }

        // 3. Concentric Geodesic Distance Rings (1 km, 2.5 km, 5 km)
        const ringColor = '#3b82f6'

        L.circle([centerLat, centerLng], {
          radius: 1000,
          color: ringColor,
          weight: 1.5,
          dashArray: '5, 5',
          fill: true,
          fillColor: ringColor,
          fillOpacity: 0.03,
          interactive: false,
        }).addTo(map)

        L.circle([centerLat, centerLng], {
          radius: 2500,
          color: ringColor,
          weight: 1.5,
          dashArray: '6, 6',
          fill: false,
          interactive: false,
        }).addTo(map)

        L.circle([centerLat, centerLng], {
          radius: 5000,
          color: ringColor,
          weight: 1.5,
          dashArray: '6, 6',
          fill: false,
          interactive: false,
        }).addTo(map)

        // 4. Center Marker: Property Site (Zero Point)
        const centerIcon = L.divIcon({
          className: 'zero-point-custom-marker',
          html: `
            <div style="display:flex; flex-direction:column; align-items:center; transform:translate(-50%, -100%); pointer-events:auto;">
              <div style="margin-bottom:6px; padding:4px 10px; border-radius:9999px; background:#e11d48; color:#ffffff; font-weight:800; font-size:11px; box-shadow:0 10px 15px -3px rgba(225,29,72,0.4); display:flex; align-items:center; gap:5px; white-space:nowrap;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                <span>Property Site (Zero Point)</span>
              </div>
              <div style="width:34px; height:34px; border-radius:50%; background:#e11d48; color:#ffffff; border:3px solid #ffffff; box-shadow:0 10px 20px rgba(0,0,0,0.25); display:flex; align-items:center; justify-content:center;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z"/></svg>
              </div>
            </div>
          `,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        })

        L.marker([centerLat, centerLng], {
          icon: centerIcon,
          zIndexOffset: 1000,
        })
          .addTo(map)
          .bindPopup(
            `
            <div style="padding:6px; font-family:sans-serif;">
              <strong style="font-size:13px; color:#111827;">${property.name}</strong>
              ${fullAddress ? `<div style="font-size:11px; color:#6b7280; margin-top:2px;">${fullAddress}</div>` : ''}
            </div>
          `
          )

        // 5. Hydrate Nearby Landmarks with accurate real coordinates & connection lines
        amenities.forEach((item, idx) => {
          const config = CATEGORY_STYLES[item.category] || DEFAULT_STYLE

          // Determine exact GPS coordinates
          let targetLat =
            item.latitude != null &&
            !isNaN(Number(item.latitude))
              ? Number(item.latitude)
              : null
          let targetLng =
            item.longitude != null &&
            !isNaN(Number(item.longitude))
              ? Number(item.longitude)
              : null

          if (targetLat === null || targetLng === null) {
            // Geodesically distribute radial landmarks around property site based on real distance
            const angleStep = 360 / Math.max(amenities.length, 1)
            const bearing = (idx * angleStep + 30) % 360
            const [calcLat, calcLng] = calculateGeodesicDestination(
              centerLat,
              centerLng,
              Number(item.distance_km) || 1,
              bearing
            )
            targetLat = calcLat
            targetLng = calcLng
          }

          // Radiating connecting line from Property Zero Point
          L.polyline([[centerLat, centerLng], [targetLat, targetLng]], {
            color: config.color,
            weight: 2,
            dashArray: '4, 4',
            opacity: 0.85,
          }).addTo(map)

          const distanceText =
            item.distance_km != null && !isNaN(Number(item.distance_km))
              ? `${item.distance_km} km`
              : null
          const travelTimeText =
            item.travel_time && typeof item.travel_time === 'string' && item.travel_time.trim().length > 0
              ? item.travel_time.trim()
              : null

          // Custom Marker Icon with Badge & Connected Tooltip Card
          const landmarkIcon = L.divIcon({
            className: 'nearby-landmark-custom-marker',
            html: `
              <div style="position:relative; transform:translate(-50%, -50%); cursor:pointer;">
                <!-- Pin Icon Circle -->
                <div style="width:32px; height:32px; border-radius:50%; background:${config.badgeBg}; color:#ffffff; border:2.5px solid #ffffff; box-shadow:0 4px 10px rgba(0,0,0,0.2); display:flex; align-items:center; justify-content:center; transition:transform 0.2s;">
                  ${config.svgIcon}
                </div>

                <!-- Floating Tooltip Card -->
                <div style="position:absolute; left:36px; top:-12px; background:rgba(255,255,255,0.96); backdrop-filter:blur(6px); border:1px solid rgba(229,231,235,0.95); border-radius:10px; padding:6px 10px; box-shadow:0 6px 14px rgba(0,0,0,0.08); white-space:nowrap; pointer-events:auto; z-index:20;">
                  <div style="font-weight:700; font-size:11px; color:#111827; max-width:180px; overflow:hidden; text-overflow:ellipsis;">
                    ${item.name}
                  </div>
                  ${(distanceText || travelTimeText) ? `
                    <div style="display:flex; align-items:center; gap:4px; margin-top:2px; font-size:10px;">
                      ${distanceText ? `<span style="font-weight:800; color:${config.color};">${distanceText}</span>` : ''}
                      ${distanceText && travelTimeText ? '<span style="color:#9ca3af;">•</span>' : ''}
                      ${travelTimeText ? `<span style="font-weight:600; color:#4b5563;">${travelTimeText}</span>` : ''}
                    </div>
                  ` : ''}
                </div>
              </div>
            `,
            iconSize: [0, 0],
            iconAnchor: [0, 0],
          })

          const marker = L.marker([targetLat, targetLng], {
            icon: landmarkIcon,
          }).addTo(map)

          // Interactive Popup
          marker.bindPopup(`
            <div style="padding:6px; font-family:sans-serif; min-width:170px;">
              <span style="font-size:10px; font-weight:800; text-transform:uppercase; color:${config.color}; letter-spacing:0.5px;">${config.label}</span>
              <h4 style="font-size:13px; font-weight:700; color:#111827; margin:2px 0 4px 0;">${item.name}</h4>
              ${(distanceText || travelTimeText) ? `
                <div style="font-size:11px; color:#4b5563;">
                  ${distanceText ? `Distance: <strong>${distanceText}</strong>` : ''}
                  ${travelTimeText ? ` (${travelTimeText})` : ''}
                </div>
              ` : ''}
              <a href="https://www.google.com/maps/dir/?api=1&origin=${centerLat},${centerLng}&destination=${targetLat},${targetLng}" target="_blank" rel="noopener noreferrer" style="display:inline-block; margin-top:6px; font-size:11px; font-weight:700; color:#2563eb; text-decoration:none;">Get Directions &rarr;</a>
            </div>
          `)
        })
      } catch (err) {
        console.error('[NearbyAmenitiesRadar] Leaflet initialization error:', err)
      }
    }

    initLeaflet()

    return () => {
      isMounted = false
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [centerLat, centerLng, amenities, property.name, fullAddress, hasValidLat, hasValidLng, isSatelliteView])

  // Handle Satellite / Street Layer Toggling Live
  useEffect(() => {
    if (!mapInstanceRef.current || !streetLayerRef.current || !satelliteLayerRef.current) return
    const map = mapInstanceRef.current

    if (isSatelliteView) {
      if (map.hasLayer(streetLayerRef.current)) map.removeLayer(streetLayerRef.current)
      if (!map.hasLayer(satelliteLayerRef.current)) map.addLayer(satelliteLayerRef.current)
    } else {
      if (map.hasLayer(satelliteLayerRef.current)) map.removeLayer(satelliteLayerRef.current)
      if (!map.hasLayer(streetLayerRef.current)) map.addLayer(streetLayerRef.current)
    }
  }, [isSatelliteView])

  // Map Navigation Handlers
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn()
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut()
  const handleResetZoom = () =>
    mapInstanceRef.current?.setView([centerLat, centerLng], 14, { animate: true })

  // Strictly show valid data only:
  // If property has no valid coordinates OR has zero nearby amenities, do not render this section.
  if (!hasValidLat || !hasValidLng || amenities.length === 0) {
    return null
  }

  return (
    <section
      className={`relative z-0 isolate w-full rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm bg-white ${className}`}
      aria-labelledby="proximity-radar-heading"
    >
      {/* Real Interactive Leaflet Map Viewport Container */}
      <div className="relative w-full min-h-[520px] sm:min-h-[580px] md:min-h-[640px] bg-[#e8f1f8]">
        {/* Leaflet DOM Anchor */}
        <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

        {/* Top-Left Floating Info Card (matching wireframe) */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-[400] max-w-[260px] sm:max-w-xs bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-lg border border-stone-200/90 pointer-events-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              PROPERTY LOCATION PIN
            </span>
          </div>
          <h4 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug truncate">
            {property.name}
          </h4>
          {fullAddress && (
            <p className="text-xs text-stone-500 mt-0.5 truncate">
              {fullAddress}
            </p>
          )}
        </div>

        {/* Top-Right Floating Controls (Landmark Count & Zoom Controls) */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-[400] flex flex-col items-end gap-2.5 pointer-events-auto">
          {/* Landmark Count Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-stone-800 text-xs font-bold border border-stone-200/90 shadow-md">
            <Compass className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>
              Showing {amenities.length} Prominent Landmark{amenities.length === 1 ? '' : 's'}
            </span>
          </div>

          {/* Vertical Zoom Controls */}
          <div className="flex flex-col bg-white/95 backdrop-blur-md rounded-xl border border-stone-200/90 shadow-md divide-y divide-stone-100 overflow-hidden">
            <button
              type="button"
              onClick={handleZoomIn}
              aria-label="Zoom in"
              className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-50 transition-colors cursor-pointer"
              title="Zoom In (+)"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              aria-label="Zoom out"
              className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-50 transition-colors cursor-pointer"
              title="Zoom Out (-)"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              aria-label="Reset view"
              className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-50 transition-colors cursor-pointer"
              title="Reset Radar View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Legend & Status Bar */}
        <div className="absolute bottom-3 inset-x-3 sm:inset-x-6 z-[400] bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-xl px-3.5 py-2.5 sm:px-5 sm:py-3 shadow-md flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
          {/* Left Category Dots - Strictly dynamically rendered from actual data present */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs font-semibold text-stone-700">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0" />
              <span>Property Site</span>
            </div>
            {presentCategories.map((catKey) => {
              const config = CATEGORY_STYLES[catKey] || DEFAULT_STYLE
              return (
                <div key={catKey} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: config.color }}
                  />
                  <span>{config.label}</span>
                </div>
              )
            })}
          </div>

          {/* Right Controls: Survey Number Pill & Satellite Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Survey Number Pill - Only show if real survey_number exists */}
            {property.survey_number && property.survey_number.trim().length > 0 && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-50 text-stone-700 text-xs font-semibold border border-stone-200">
                <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span className="truncate max-w-[200px]">{property.survey_number}</span>
              </div>
            )}

            {/* Satellite View Toggle */}
            <button
              type="button"
              onClick={() => setIsSatelliteView((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                isSatelliteView
                  ? 'bg-stone-900 text-white border-stone-800 shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200'
              }`}
              title="Toggle Real Satellite Imagery Layer"
            >
              <Layers className="w-3.5 h-3.5 text-[#0d9488]" />
              <span>{isSatelliteView ? 'Street View' : 'Satellite View'}</span>
            </button>

            {property.google_maps_url && (
              <a
                href={property.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-colors"
                title="Open in Google Maps"
              >
                <span>Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
