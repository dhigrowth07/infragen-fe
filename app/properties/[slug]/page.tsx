import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { propertyService } from '@/lib/services/propertyService'
import { PropertyDetailClient } from '@/components/property-detail'
import { getPrimaryPropertyImage } from '@/lib/formatters'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

/**
 * Dynamic SEO & OpenGraph Metadata Generator
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const response = await propertyService.getPropertyBySlug(slug)
    const property = response.data
    if (!property) {
      return { title: 'Property Not Found | Vizhi Infragen Realtors' }
    }

    const title = `${property.name} (${property.pid || 'Property'}) | Vizhi Infragen Realtors`
    const description = property.description || property.name

    const primaryImage = getPrimaryPropertyImage(property)

    const keywords = [
      property.name,
      property.property_type === 'LAND' ? 'Land For Sale' : 'Building For Sale',
      property.location || '',
      property.city || 'Coimbatore',
      'Vizhi Infragen Realtors',
      'Real Estate Coimbatore',
    ].filter(Boolean)

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: `/properties/${encodeURIComponent(property.slug)}`,
      },
      openGraph: {
        title,
        description,
        images: [{ url: primaryImage }],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [primaryImage],
      },
    }
  } catch {
    return {
      title: 'Property Details | Vizhi Infragen Realtors',
    }
  }
}

/**
 * Property Details Page Route
 * Next.js Server Component with deep SSR hydration and notFound handling.
 */
export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params

  let property
  let similar = [] as Awaited<ReturnType<typeof propertyService.getSimilarProperties>>
  let featured = [] as NonNullable<Awaited<ReturnType<typeof propertyService.getFeaturedProperties>>['data']>

  try {
    const response = await propertyService.getPropertyBySlug(slug)
    property = response.data

    if (property) {
      // Parallel fetch similar and featured properties with resilient fallbacks
      const [similarList, featuredRes] = await Promise.all([
        propertyService.getSimilarProperties(property.property_type, slug, 3).catch(() => []),
        propertyService.getFeaturedProperties(4).catch(() => ({ data: [] })),
      ])

      similar = similarList
      featured = (featuredRes?.data || []).filter((p) => p.slug !== slug).slice(0, 2)
    }
  } catch (err: unknown) {
    console.error(`[PropertyDetailPage] Failed to load slug '${slug}':`, err)
    notFound()
  }

  if (!property) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.name,
    description: property.description || property.name,
    url: `/properties/${encodeURIComponent(property.slug)}`,
    image: getPrimaryPropertyImage(property),
    offers: {
      '@type': 'Offer',
      price: property.price || 0,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.street_address || property.location || '',
      addressLocality: property.city || 'Coimbatore',
      addressRegion: property.state || 'Tamil Nadu',
      postalCode: property.pincode || '',
      addressCountry: 'IN',
    },
    ...(property.latitude && property.longitude
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: Number(property.latitude),
            longitude: Number(property.longitude),
          },
        }
      : {}),
  }

  return (
    <main className="w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertyDetailClient
        property={property}
        similarProperties={similar}
        featuredProperties={featured}
      />
    </main>
  )
}

