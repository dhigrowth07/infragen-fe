'use client'

import React, { useState } from 'react'
import {
  Send,
  Phone,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import type { PublicProperty } from '@/lib/types/property.types'
import { enquiryService } from '@/lib/services/enquiryService'

export interface PropertyEnquiryFormProps {
  property: PublicProperty
  className?: string
}

/**
 * Property Lead Enquiry Form Card (Phase 7.1)
 * Strictly matching right sidebar of `reference-ui/property - details - page.png`:
 * - First Name & Last Name inputs side by side
 * - Email & Phone input fields
 * - Subject field (pre-filled with `Inquiry regarding [Property Name]`)
 * - Message textarea (pre-filled with `Hello, I am interested in [Property Name]`)
 * - Consent checkbox: `* I consent to having this website store my submitted information so they can respond to my inquiry.`
 * - CTA Button: `SEND MESSAGE` with paper airplane icon in brand teal (#169b91)
 * - Quick direct connect icons: WhatsApp (deep-linked), Phone call, Instagram
 * - Submits to `POST /api/v1/public/enquiries` with `enquiry_type: 'PROPERTY_ENQUIRY'` and `pid`.
 */
export default function PropertyEnquiryForm({
  property,
  className = '',
}: PropertyEnquiryFormProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState(
    `Inquiry regarding ${property.name}`
  )
  const [message, setMessage] = useState(
    `Hello, I am interested in [${property.name}]. Please share complete documentation and site visit details.`
  )
  const [consent, setConsent] = useState(true)

  // Submission & Toast States
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!consent) {
      setToast({
        type: 'error',
        message: 'Please accept the consent checkbox to submit your inquiry.',
      })
      return
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim()
    if (fullName.length < 2) {
      setToast({
        type: 'error',
        message: 'Please enter your first name and last name.',
      })
      return
    }

    if (!phone.trim()) {
      setToast({
        type: 'error',
        message: 'Please enter a valid contact phone number.',
      })
      return
    }

    if (!email.trim() || !email.includes('@')) {
      setToast({
        type: 'error',
        message: 'Please enter a valid email address.',
      })
      return
    }

    setIsSubmitting(true)
    setToast(null)

    try {
      await enquiryService.submitEnquiry({
        name: fullName,
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        subject: subject.trim(),
        message: message.trim(),
        pid: property.pid || undefined,
        enquiry_type: 'PROPERTY_ENQUIRY',
      })

      setToast({
        type: 'success',
        message:
          'Thank you! Your inquiry has been submitted successfully. Our property advisor will reach out shortly.',
      })

      // Reset fields gracefully
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : 'Failed to submit inquiry. Please call directly or try again.'
      setToast({
        type: 'error',
        message: errorMsg,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Pre-configured manager contacts or default corporate desk
  const managerPhone = property.manager_phone || '+91 96888 89420'
  const rawManagerPhone = managerPhone.replace(/[^0-9]/g, '')
  const whatsappUrl = `https://wa.me/${rawManagerPhone || '919688889420'}?text=${encodeURIComponent(
    `Hello Vizhi Infragen, I am interested in ${property.name} (${property.pid || 'Property Reference'}). Could you share more details?`
  )}`

  return (
    <div
      className={`bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-7 relative ${className}`}
      id="property-enquiry-form-card"
    >
      {/* Toast Notification Banner */}
      {toast && (
        <div
          role="alert"
          className={`mb-4 p-3.5 rounded-xl border flex items-start justify-between gap-3 text-xs font-medium transition-all animate-fadeIn ${
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

      {/* Inbound Lead Capture Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Row 1: First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-[#169b91] focus:border-transparent transition-all placeholder:text-stone-400 text-stone-900 bg-white"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-[#169b91] focus:border-transparent transition-all placeholder:text-stone-400 text-stone-900 bg-white"
          />
        </div>

        {/* Row 2: Email */}
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-[#169b91] focus:border-transparent transition-all placeholder:text-stone-400 text-stone-900 bg-white"
        />

        {/* Row 3: Phone */}
        <input
          type="tel"
          required
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-[#169b91] focus:border-transparent transition-all placeholder:text-stone-400 text-stone-900 bg-white"
        />

        {/* Row 4: Subject */}
        <input
          type="text"
          required
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-[#169b91] focus:border-transparent transition-all placeholder:text-stone-400 text-stone-900 bg-white"
        />

        {/* Row 5: Message Textarea */}
        <textarea
          rows={4}
          required
          placeholder={`Hello, I am interested in [${property.name}]`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-[#169b91] focus:border-transparent transition-all placeholder:text-stone-400 text-stone-900 resize-none bg-white"
        />

        {/* Row 6: Consent Checkbox */}
        <label className="flex items-start gap-2.5 text-xs text-stone-500 cursor-pointer pt-0.5 select-none">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 rounded border-stone-300 text-[#169b91] focus:ring-[#169b91] cursor-pointer"
          />
          <span className="leading-tight">
            * I consent to having this website store my submitted information so they can respond to my inquiry.
          </span>
        </label>

        {/* Row 7: Teal CTA Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 py-3 rounded-lg bg-[#169b91] hover:bg-[#13857c] text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] shadow-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4 transform rotate-6" />
          <span>{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
        </button>
      </form>

      {/* Row 8: Quick Direct Connect Icons (WhatsApp, Phone, Instagram) */}
      <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-center gap-5">
        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct message on WhatsApp"
          title="Chat on WhatsApp"
          className="w-10 h-10 rounded-full border border-stone-200 hover:border-emerald-400 bg-white hover:bg-emerald-50 text-[#25D366] flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-xs"
        >
          <FaWhatsapp className="w-5 h-5" />
        </a>

        {/* Phone Call Button */}
        <a
          href={`tel:${managerPhone}`}
          aria-label={`Call ${managerPhone}`}
          title={`Call ${managerPhone}`}
          className="w-10 h-10 rounded-full border border-stone-200 hover:border-blue-400 bg-white hover:bg-blue-50 text-[#2563eb] flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-xs"
        >
          <Phone className="w-4 h-4" />
        </a>

        {/* Instagram Profile Button */}
        <a
          href="https://www.instagram.com/vizhi_infragen/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on Instagram"
          title="Follow Vizhi Infragen on Instagram"
          className="w-10 h-10 rounded-full border border-stone-200 hover:border-pink-400 bg-white hover:bg-pink-50 text-[#E1306C] flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-xs"
        >
          <FaInstagram className="w-5 h-5" />
        </a>
      </div>
    </div>
  )
}

