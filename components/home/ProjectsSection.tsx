"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { propertyService } from "@/lib/services/propertyService";
import type { PublicProperty } from "@/lib/types/property.types";
import { formatPropertyPrice, getPrimaryPropertyImage } from "@/lib/formatters";

function ProjectCard({ item }: { item: PublicProperty }) {
  const [imgSrc, setImgSrc] = useState(() => getPrimaryPropertyImage(item));

  return (
    <Link
      href={`/properties/${encodeURIComponent(item.slug)}`}
      className="property-card bg-[#f6f4f0] rounded-none border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#c5a880]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group cursor-pointer"
    >
      <div className="flex flex-col flex-1">
        {/* Image */}
        <div className="relative h-60 sm:h-64 w-full shrink-0 overflow-hidden bg-stone-900">
          <Image
            src={imgSrc}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => {
              setImgSrc(
                item.property_type === "LAND"
                  ? "/assets/images/land-hero-img.png"
                  : "/assets/images/building-hero-img.png"
              );
            }}
          />
          <span className="absolute top-3.5 left-3.5 bg-[#612124] text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-none shadow-md z-10 font-['Inter',sans-serif]">
            {item.is_featured
              ? "FEATURED"
              : item.property_type === "LAND"
                ? "LAND PLOT"
                : "BUILDING"}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#1f2937] font-['Outfit',sans-serif] tracking-tight group-hover:text-[#612124] transition-colors leading-tight min-h-[32px] flex items-center">
              {item.name}
            </h3>
            <div className="text-[11px] font-bold text-[#c5a880] uppercase tracking-[0.18em] flex items-center gap-1.5 font-['Inter',sans-serif] mt-2 mb-2">
              <i className="fas fa-location-dot text-[10px]"></i>{" "}
              {item.location || item.city || "Coimbatore"}
            </div>
            <p className="text-sm text-stone-600 font-normal leading-relaxed min-h-[44px] line-clamp-2">
              {item.description ||
                "Prime investment and development opportunity in Coimbatore."}
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-stone-200/60 flex items-center justify-between font-['Inter',sans-serif] mt-auto">
        <span className="text-[11px] font-bold text-[#612124] tracking-[0.2em] uppercase">
          {item.property_type === "LAND" ? "LAND & SITES" : "VILLAS & LIVING"}
        </span>
        <span className="text-sm font-bold text-[#169b91]">
          {formatPropertyPrice(item.price)}
        </span>
      </div>
    </Link>
  );
}

export default function ProjectsSection() {
  const [properties, setProperties] = useState<PublicProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      try {
        const res = await propertyService.getFeaturedProperties(6);
        let list = res?.data || [];
        if (list.length === 0) {
          const allRes = await propertyService.getProperties({ limit: 6 });
          list = allRes?.data || [];
        }
        if (isMounted) {
          setProperties(list);
        }
      } catch (err) {
        console.error("[ProjectsSection] Failed to load featured properties:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="projects" className="py-20 sm:py-28 bg-[#fbf9f5] overflow-hidden relative border-t border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-16 items-center justify-start relative">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto reveal reveal-slide-up">
          <span className="text-[#c5a880] font-['Inter',sans-serif] text-xs sm:text-sm font-bold uppercase tracking-[0.25em] mb-4 block">
            PRIME LAND &amp; PROPERTY LISTINGS
          </span>
          <h2 className="text-3xl sm:text-5xl font-['Outfit',sans-serif] text-[#612124] font-extrabold tracking-tight leading-tight mb-4">
            Explore Our Properties
          </h2>
          <p className="text-[#666666] font-['Inter',sans-serif] text-base leading-relaxed max-w-xl mx-auto">
            Verified DTCP &amp; RERA plot layouts, prime residential land, and commercial sites across Coimbatore.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl mx-auto items-stretch relative">
          {loading ? (
            // Shimmer Loading Skeletons
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-[#f6f4f0] border border-stone-200/80 rounded-none overflow-hidden animate-pulse flex flex-col h-[420px]"
              >
                <div className="bg-stone-300 h-60 w-full" />
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-6 bg-stone-300 rounded w-3/4" />
                    <div className="h-4 bg-stone-200 rounded w-1/2" />
                    <div className="h-4 bg-stone-200 rounded w-full" />
                  </div>
                  <div className="h-4 bg-stone-300 rounded w-1/3 pt-3" />
                </div>
              </div>
            ))
          ) : properties.length > 0 ? (
            properties.map((item) => (
              <ProjectCard key={item.id} item={item} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-stone-500 font-['Inter',sans-serif]">
              No properties currently available. Check back soon!
            </div>
          )}
        </div>

        {/* View All Properties Navigation Buttons */}
        <div className="mt-4 reveal reveal-slide-up flex flex-wrap items-center justify-center gap-4 text-center">
          <Link
            href="/properties/land"
            className="inline-block border-2 border-[#612124] text-[#612124] hover:bg-[#612124] hover:text-white px-8 py-3.5 rounded-none font-bold text-xs tracking-[0.25em] transition-all duration-300 uppercase shadow-sm hover:shadow-md hover:-translate-y-0.5 font-['Inter',sans-serif]"
          >
            VIEW LAND PLOTS
          </Link>
          <Link
            href="/properties/building"
            className="inline-block border-2 border-[#c5a880] bg-[#c5a880] text-[#251215] hover:bg-[#b98c3b] px-8 py-3.5 rounded-none font-bold text-xs tracking-[0.25em] transition-all duration-300 uppercase shadow-sm hover:shadow-md hover:-translate-y-0.5 font-['Inter',sans-serif]"
          >
            VIEW BUILDINGS &amp; VILLAS
          </Link>
        </div>

      </div>
    </section>
  );
}
