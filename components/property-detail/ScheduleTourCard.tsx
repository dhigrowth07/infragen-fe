'use client'

import React, { useState } from 'react'
import {
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react'
import type { PublicProperty } from '@/lib/types/property.types'
import { enquiryService } from '@/lib/services/enquiryService'

export interface ScheduleTourCardProps {
  property: PublicProperty
  className?: string
}

/**
 * Schedule A Tour Widget (Phase 7.2)
 * Strictly matching `reference-ui/property - details - page.png`:
 * - Your Name *
 * - Your Phone number *
 * - Your Email *
 * - Date/Time selection for virtual or on-site tour
 * - CTA Button: `REQUEST A VIRTUAL TOUR`
 * - Submits to `POST /api/v1/public/enquiries` with `enquiry_type: 'VIRTUAL_TOUR_REQUEST'`
 */
export default function ScheduleTourCard({
  property,
  className = '',
}: ScheduleTourCardProps) {
  const [tourName, setTourName] = useState('')
  const [tourPhone, setTourPhone] = useState('')
  const [tourEmail, setTourEmail] = useState('')

  // Default to tomorrow's date using lazy state initialization
  const [tourDate, setTourDate] = useState(() =>
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  )
  const [tourTime, setTourTime] = useState('11:00')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (tourName.trim().length < 2) {
      setToast({
        type: 'error',
        message: 'Please enter your name.',
      })
      return
    }

    if (!tourPhone.trim()) {
      setToast({
        type: 'error',
        message: 'Please provide a valid contact phone number.',
      })
      return
    }

    if (!tourEmail.trim() || !tourEmail.includes('@')) {
      setToast({
        type: 'error',
        message: 'Please provide a valid email address.',
      })
      return
    }

    setIsSubmitting(true)
    setToast(null)

    try {
      const scheduledIso = tourDate
        ? new Date(`${tourDate}T${tourTime}:00`).toISOString()
        : new Date(Date.now() + 86400000).toISOString()

      await enquiryService.scheduleTour({
        name: tourName.trim(),
        email: tourEmail.trim().toLowerCase(),
        phone: tourPhone.trim(),
        pid: property.pid || undefined,
        scheduled_at: scheduledIso,
        subject: `Virtual Tour Request for ${property.name}`,
        message: `Customer requested a virtual tour for ${property.name} scheduled on ${tourDate} at ${tourTime}.`,
      })

      setToast({
        type: 'success',
        message:
          'Virtual Tour requested! Our property relationship manager will contact you with the meeting link.',
      })

      // Reset fields
      setTourName('')
      setTourPhone('')
      setTourEmail('')
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : 'Failed to schedule tour. Please try again or contact us directly.'
      setToast({
        type: 'error',
        message: errorMsg,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className={`bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-7 relative ${className}`}
      id="schedule-tour-widget"
    >
      <h3 className="text-base sm:text-lg font-bold text-stone-900 pb-3 border-b border-stone-100">
        Schedule A Tour
      </h3>

      {/* Toast Notification Banner */}
      {toast && (
        <div
          role="alert"
          className={`mt-4 p-3.5 rounded-xl border flex items-start justify-between gap-3 text-xs font-medium transition-all animate-fadeIn ${
            toast.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <div className="flex items-center gap-2">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-stone-400 hover:text-stone-600 transition-colors p-0.5"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Tour Booking Form */}
      <form onSubmit={handleScheduleSubmit} className="mt-4 space-y-3.5">
        <input
          type="text"
          required
          placeholder="Your Name *"
          value={tourName}
          onChange={(e) => setTourName(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-[#169b91] focus:border-transparent transition-all placeholder:text-stone-400 text-stone-900 bg-white"
        />

        <input
          type="tel"
          required
          placeholder="Your Phone number *"
          value={tourPhone}
          onChange={(e) => setTourPhone(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-[#169b91] focus:border-transparent transition-all placeholder:text-stone-400 text-stone-900 bg-white"
        />

        <input
          type="email"
          required
          placeholder="Your Email *"
          value={tourEmail}
          onChange={(e) => setTourEmail(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-[#169b91] focus:border-transparent transition-all placeholder:text-stone-400 text-stone-900 bg-white"
        />

        {/* Date and Time Selector */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              value={tourDate}
              onChange={(e) => setTourDate(e.target.value)}
              className="w-full pl-3 pr-2 py-2 text-xs rounded-lg border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-[#169b91] focus:border-transparent text-stone-800 bg-white cursor-pointer"
            />
          </div>
          <div className="relative">
            <input
              type="time"
              required
              value={tourTime}
              onChange={(e) => setTourTime(e.target.value)}
              className="w-full pl-3 pr-2 py-2 text-xs rounded-lg border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-[#169b91] focus:border-transparent text-stone-800 bg-white cursor-pointer"
            />
          </div>
        </div>

        {/* Teal CTA Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 py-3 rounded-lg bg-[#169b91] hover:bg-[#13857c] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] shadow-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span>{isSubmitting ? 'PROCESSING...' : 'REQUEST A VIRTUAL TOUR'}</span>
        </button>
      </form>
    </div>
  )
}

