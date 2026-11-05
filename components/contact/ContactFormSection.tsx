"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ContactFormSection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [terms, setTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terms) return;
    setIsSubmitting(true);

    const constantToEmail = "srissa2006@gmail.com";
    const fullName = `${firstName} ${lastName}`.trim();
    const emailSubject = encodeURIComponent(`Contact Form: ${subject || "Inquiry"} - ${fullName}`);
    const emailBody = encodeURIComponent(
      `Name: ${fullName}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    const mailtoUrl = `mailto:${constantToEmail}?subject=${emailSubject}&body=${emailBody}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setSubject("");
      setMessage("");
      setTerms(false);

      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }, 1000);
  };

  return (
    <section className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16 bg-[#FDFBF7]">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] font-['Outfit',sans-serif] tracking-tight">
                Have Any Questions?
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm font-['Inter',sans-serif] mt-2">
                Fill in the details below and our team will get back to you at the earliest.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="First Name *"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg pl-10 pr-4 py-3.5 text-sm text-[#1E293B] placeholder-stone-400 focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition-all shadow-sm font-['Inter',sans-serif]"
                  />
                  <i className="fa-solid fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs"></i>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Last Name *"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg pl-10 pr-4 py-3.5 text-sm text-[#1E293B] placeholder-stone-400 focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition-all shadow-sm font-['Inter',sans-serif]"
                  />
                  <i className="fa-solid fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs"></i>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="Contact Number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg pl-10 pr-4 py-3.5 text-sm text-[#1E293B] placeholder-stone-400 focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition-all shadow-sm font-['Inter',sans-serif]"
                  />
                  <i className="fa-solid fa-phone absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs"></i>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Your Email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg pl-10 pr-4 py-3.5 text-sm text-[#1E293B] placeholder-stone-400 focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition-all shadow-sm font-['Inter',sans-serif]"
                  />
                  <i className="fa-solid fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs"></i>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Subject *"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-lg pl-10 pr-4 py-3.5 text-sm text-[#1E293B] placeholder-stone-400 focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition-all shadow-sm font-['Inter',sans-serif]"
                />
                <i className="fa-solid fa-tag absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs"></i>
              </div>

              <div className="relative">
                <textarea
                  rows={4}
                  required
                  placeholder="Your Message *"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-lg pl-10 pr-4 py-3.5 text-sm text-[#1E293B] placeholder-stone-400 focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition-all shadow-sm font-['Inter',sans-serif] resize-none"
                ></textarea>
                <i className="fa-solid fa-pen absolute left-3.5 top-4 text-stone-400 text-xs"></i>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  id="contact-terms"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  required
                  className="mt-1 w-4 h-4 rounded border-stone-300 text-[#4E1421] focus:ring-[#c5a880] cursor-pointer"
                />
                <label
                  htmlFor="contact-terms"
                  className="text-[11px] sm:text-xs text-stone-500 font-['Inter',sans-serif] leading-relaxed cursor-pointer select-none"
                >
                  By clicking submit, I agree to the Terms &amp; Conditions and Privacy Policy and I am giving my consent to receive updates through email/sms.
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#4E1421] hover:bg-[#612124] text-white px-8 py-3.5 rounded-lg text-sm font-bold font-['Outfit',sans-serif] transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98] cursor-pointer"
                >
                  <span>{isSubmitting ? "Opening Mail..." : "Send Message"}</span>
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Dark Luxury Trust Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-[#111111] text-white rounded-3xl p-8 sm:p-10 flex flex-col items-center text-center justify-between h-full shadow-2xl relative overflow-hidden border border-stone-800">
              
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#c5a880]/15 rounded-full blur-3xl pointer-events-none"></div>

              <div className="pt-2">
                <div className="w-14 h-14 rounded-full border border-[#c5a880] flex items-center justify-center text-[#c5a880] text-xl mx-auto shadow-md">
                  <i className="fa-regular fa-user"></i>
                </div>
              </div>

              <div className="my-6 space-y-3 max-w-sm">
                <h3 className="text-2xl sm:text-3xl font-bold font-['Outfit',sans-serif] tracking-tight text-white">
                  We value your time and trust.
                </h3>
                
                <div className="w-10 h-0.5 bg-[#c5a880] mx-auto my-2"></div>

                <p className="text-stone-300 text-xs sm:text-sm font-['Inter',sans-serif] leading-relaxed font-normal opacity-80">
                  Our team is committed to providing you with the best real estate solutions.
                </p>
              </div>

              <div className="relative w-full max-w-xs mx-auto mt-4 mb-2">
                <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-[#4E1421] rounded-xl pointer-events-none bg-[#4E1421]"></div>
                
                <div className="relative rounded-xl overflow-hidden shadow-xl border border-stone-700 bg-stone-900 h-48">
                  <Image
                    src="/assets/images/about-property-management.jpg"
                    alt="Real Estate Highrise Towers"
                    fill
                    sizes="320px"
                    className="object-cover object-center"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Success Toast */}
      <div
        className={`fixed bottom-6 right-6 z-50 transform transition-all duration-500 ease-out max-w-sm ${
          showToast ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-emerald-600 text-white rounded-xl shadow-2xl p-5 border border-emerald-500/30 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-white text-lg">
            <i className="fas fa-check-circle"></i>
          </div>
          <div>
            <h4 className="font-bold text-sm">Message Sent!</h4>
            <p className="text-white/80 text-xs mt-1 leading-relaxed">
              Thank you. Your inquiry is received successfully. Our team will get back to you shortly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
