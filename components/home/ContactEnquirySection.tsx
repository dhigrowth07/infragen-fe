"use client";

import React, { useState } from "react";
import { enquiryService } from "@/lib/services/enquiryService";

const DEFAULT_ENQUIRY_MESSAGE =
  "Hello, I am interested in property consulting and would like to know more details.";

export default function ContactEnquirySection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(DEFAULT_ENQUIRY_MESSAGE);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Real-time live validation handlers matching reference index.html / script.js
  const handleNameChange = (val: string) => {
    setName(val);
    if (/\d/.test(val)) {
      setNameError("Name does not contain number");
    } else if (/[^a-zA-Z\s\.\'-]/.test(val)) {
      setNameError("Name cannot contain special characters.");
    } else if (val.length > 50) {
      setNameError("Name cannot exceed 50 characters.");
    } else {
      setNameError("");
    }
  };

  const handleNameBlur = () => {
    const trimmed = name.trim();
    if (/\d/.test(name)) {
      setNameError("Name does not contain number");
    } else if (/[^a-zA-Z\s\.\'-]/.test(trimmed)) {
      setNameError("Name cannot contain special characters.");
    } else if (!trimmed) {
      setNameError("Please enter your name.");
    } else if (trimmed.length < 2) {
      setNameError("Name must be at least 2 characters.");
    } else if (trimmed.length > 50) {
      setNameError("Name cannot exceed 50 characters.");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailError && emailRegex.test(val.trim())) {
      setEmailError("");
    }
  };

  const handleEmailBlur = () => {
    const trimmed = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!trimmed) {
      setEmailError("Please enter your email address.");
    } else if (!emailRegex.test(trimmed)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneChange = (val: string) => {
    setPhone(val);
    // Instantly detect characters/letters typed into phone number (matches screenshot)
    if (/[a-zA-Z]/.test(val)) {
      setPhoneError("Phone number does not contain characters");
    } else {
      setPhoneError("");
    }
  };

  const handlePhoneBlur = () => {
    const trimmed = phone.trim();
    if (/[a-zA-Z]/.test(phone)) {
      setPhoneError("Phone number does not contain characters");
      return;
    }
    if (!trimmed) {
      setPhoneError("Please enter your phone number.");
      return;
    }
    const phoneRegex = /^(\+91|0)?[6-9]\d{9}$/;
    if (!phoneRegex.test(trimmed.replace(/[\s\-\(\)]/g, ""))) {
      setPhoneError("Please enter a valid 10-digit mobile number.");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    let hasError = false;

    // Validate Name
    const nameTrimmed = name.trim();
    if (/\d/.test(name)) {
      setNameError("Name does not contain number");
      hasError = true;
    } else if (/[^a-zA-Z\s\.\'-]/.test(nameTrimmed)) {
      setNameError("Name cannot contain special characters.");
      hasError = true;
    } else if (!nameTrimmed) {
      setNameError("Please enter your name.");
      hasError = true;
    } else if (nameTrimmed.length < 2) {
      setNameError("Name must be at least 2 characters.");
      hasError = true;
    } else if (nameTrimmed.length > 50) {
      setNameError("Name cannot exceed 50 characters.");
      hasError = true;
    } else {
      setNameError("");
    }

    // Validate Email
    const emailTrimmed = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailTrimmed) {
      setEmailError("Please enter your email address.");
      hasError = true;
    } else if (!emailRegex.test(emailTrimmed)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    } else {
      setEmailError("");
    }

    // Validate Phone
    const phoneTrimmed = phone.trim();
    if (/[a-zA-Z]/.test(phone)) {
      setPhoneError("Phone number does not contain characters");
      hasError = true;
    } else if (!phoneTrimmed) {
      setPhoneError("Please enter your phone number.");
      hasError = true;
    } else {
      const phoneRegex = /^(\+91|0)?[6-9]\d{9}$/;
      if (!phoneRegex.test(phoneTrimmed.replace(/[\s\-\(\)]/g, ""))) {
        setPhoneError("Please enter a valid 10-digit mobile number.");
        hasError = true;
      } else {
        setPhoneError("");
      }
    }

    if (hasError) return;

    if (message.length > 1000) {
      setErrorMessage("Message cannot exceed 1000 characters.");
      return;
    }

    const finalMsg =
      message && message.trim() !== "" ? message.trim() : DEFAULT_ENQUIRY_MESSAGE;

    setIsSubmitting(true);

    try {
      await enquiryService.submitEnquiry({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        subject: `Quick Inquiry from ${name.trim()} - Homepage`,
        message: finalMsg,
        enquiry_type: "GENERAL",
      });

      setShowToast(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage(DEFAULT_ENQUIRY_MESSAGE);
      setNameError("");
      setEmailError("");
      setPhoneError("");

      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    } catch (err: unknown) {
      console.error("[ContactEnquirySection] Submission error:", err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Failed to submit enquiry. Please try again or reach out on WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="pt-[100px] pb-[100px] w-full flex flex-col gap-0 items-start justify-start relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(15, 23, 42, 0.70) 100%), url('/assets/images/hero-4.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-[1440px] px-6 sm:px-10 lg:px-16 flex flex-col lg:flex-row gap-10 lg:gap-[60px] items-start lg:items-center justify-between relative z-10 mx-auto">
        
        {/* Left Column Text */}
        <div className="pt-[4.79px] flex flex-col gap-[16px] items-start justify-start flex-1 relative text-left">
          <div className="text-[#c5a880] text-left font-['Inter',sans-serif] text-sm leading-[22px] font-semibold uppercase relative flex items-center justify-start tracking-[1.75px]">
            LET&apos;S CONNECT
          </div>
          <div className="flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative">
            <h2 className="text-white text-left font-['Outfit',sans-serif] text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] leading-[1.2] font-extrabold relative self-stretch flex flex-col justify-start drop-shadow-md">
              <span className="block sm:whitespace-nowrap">Talk to a Coimbatore Real Estate</span>
              <span className="block text-white">Expert Today</span>
            </h2>
          </div>
          <div className="pt-[1.2px] flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative">
            <p className="text-gray-200 text-left font-['Inter',sans-serif] text-xs sm:text-sm lg:text-base leading-relaxed relative max-w-[550px] w-full flex flex-col justify-start">
              <span className="block">Whether you want to buy, sell, or manage property, our team is here</span>
              <span className="block">to guide you every step of the way.</span>
            </p>
          </div>

          <a
            href="tel:9688889420"
            className="bg-[#8A1F36] hover:bg-[#a22c46] rounded-md border-none pt-[15px] pr-[28px] pb-[15px] pl-[28px] flex flex-row gap-3 items-center justify-start shrink-0 relative hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group shadow-lg"
          >
            <i className="fa-solid fa-phone-volume text-[#c5a880] text-lg group-hover:rotate-12 transition-transform"></i>
            <span className="text-white text-left font-['Inter',sans-serif] text-base leading-[26px] font-semibold relative flex items-center justify-start">
              Start Your Property Journey
            </span>
            <i className="fa-solid fa-arrow-right text-white text-sm group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>

        {/* Right Column: Quick Enquiry Form */}
        <div className="glass-white-box rounded-md pt-[36px] pr-[32px] pb-[36px] pl-[32px] flex flex-col gap-[24px] items-start justify-start flex-1 relative w-full border border-white/70 shadow-2xl">
          <div className="text-[#c99b4a] text-left font-['Inter',sans-serif] text-sm leading-[22px] font-bold uppercase tracking-[1.75px]">
            QUICK ENQUIRY
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 items-start justify-start self-stretch shrink-0 relative w-full">
            <div className="flex flex-col sm:flex-row gap-4 items-start justify-center self-stretch shrink-0 relative w-full">
              {/* Your Name Input */}
              <div className="flex flex-col flex-1 w-full text-left">
                <div
                  className={`bg-white/90 rounded-md border px-4 py-3.5 flex flex-col gap-0 items-start justify-start relative overflow-hidden transition-all w-full ${
                    nameError
                      ? "border-red-500 ring-2 ring-red-500/20"
                      : "border-gray-300/80 focus-within:border-[#612124] focus-within:ring-2 focus-within:ring-[#612124]/20"
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    onBlur={handleNameBlur}
                    className="w-full bg-transparent border-none outline-none text-[#000000] text-[14px] font-['Inter',sans-serif] font-medium placeholder-[#666666] focus:ring-0 p-0"
                  />
                </div>
                {nameError && (
                  <span className="text-xs text-red-500 font-medium mt-1 text-left font-['Inter',sans-serif]">
                    {nameError}
                  </span>
                )}
              </div>

              {/* Email Address Input */}
              <div className="flex flex-col flex-1 w-full text-left">
                <div
                  className={`bg-white/90 rounded-md border px-4 py-3.5 flex flex-col gap-0 items-start justify-start relative overflow-hidden transition-all w-full ${
                    emailError
                      ? "border-red-500 ring-2 ring-red-500/20"
                      : "border-gray-300/80 focus-within:border-[#612124] focus-within:ring-2 focus-within:ring-[#612124]/20"
                  }`}
                >
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onBlur={handleEmailBlur}
                    className="w-full bg-transparent border-none outline-none text-[#000000] text-[14px] font-['Inter',sans-serif] font-medium placeholder-[#666666] focus:ring-0 p-0"
                  />
                </div>
                {emailError && (
                  <span className="text-xs text-red-500 font-medium mt-1 text-left font-['Inter',sans-serif]">
                    {emailError}
                  </span>
                )}
              </div>
            </div>

            {/* Phone Number Input */}
            <div className="flex flex-col w-full text-left">
              <div
                className={`bg-white/90 rounded-md border px-4 py-3.5 flex flex-col gap-0 items-start justify-start relative overflow-hidden w-full transition-all ${
                  phoneError
                    ? "border-red-500 ring-2 ring-red-500/20"
                    : "border-gray-300/80 focus-within:border-[#612124] focus-within:ring-2 focus-within:ring-[#612124]/20"
                }`}
              >
                <input
                  type="tel"
                  placeholder="Phone Number (10 digits)"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  onBlur={handlePhoneBlur}
                  className="w-full bg-transparent border-none outline-none text-[#000000] text-[14px] font-['Inter',sans-serif] font-medium placeholder-[#666666] focus:ring-0 p-0"
                />
              </div>
              {phoneError && (
                <span className="text-xs text-red-500 font-medium mt-1 text-left font-['Inter',sans-serif]">
                  {phoneError}
                </span>
              )}
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col w-full text-left">
              <div
                className={`bg-white/90 rounded-md border px-4 py-3.5 flex flex-col gap-0 items-start justify-start relative overflow-hidden w-full transition-all ${
                  message.length > 1000
                    ? "border-red-500 ring-2 ring-red-500/20"
                    : "border-gray-300/80 focus-within:border-[#612124] focus-within:ring-2 focus-within:ring-[#612124]/20"
                }`}
              >
                <textarea
                  rows={3}
                  placeholder="How can we help you? (Max 1000 characters)"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full bg-transparent border-none outline-none text-[#000000] text-[14px] font-['Inter',sans-serif] font-medium placeholder-[#666666] focus:ring-0 resize-none p-0"
                ></textarea>
              </div>
              <div className="flex justify-between items-center mt-1 text-xs font-['Inter',sans-serif]">
                {message.length > 1000 ? (
                  <span className="text-red-500 font-medium">Message cannot exceed 1000 characters.</span>
                ) : (
                  <span></span>
                )}
                <span className={`ml-auto ${message.length > 1000 ? "text-red-500 font-semibold" : "text-stone-500"}`}>
                  {message.length}/1000
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#c5a880] hover:bg-[#b59870] active:scale-[0.98] rounded-md border-none py-4 px-8 flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 relative transition-all duration-300 w-full cursor-pointer shadow-lg text-[#612124] font-['Outfit',sans-serif] font-extrabold text-base tracking-wider uppercase disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <span>SEND MESSAGE</span>
                  <i className="fa-solid fa-paper-plane text-xs text-[#612124]"></i>
                </>
              )}
            </button>
          </form>
        </div>

      </div>

      {/* Success Toast Notification */}
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
            <h4 className="font-bold text-sm">Enquiry Submitted!</h4>
            <p className="text-white/80 text-xs mt-1 leading-relaxed">
              Thank you. Your request is registered successfully. An expert will connect with you shortly.
            </p>
          </div>
        </div>
      </div>

      {/* Error Toast Notification */}
      {errorMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm">
          <div className="bg-red-600 text-white rounded-xl shadow-2xl p-5 border border-red-500/30 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-white text-lg">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm">Submission Failed</h4>
              <p className="text-white/80 text-xs mt-1 leading-relaxed">
                {errorMessage}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-white/80 hover:text-white cursor-pointer"
            >
              <i className="fas fa-times text-xs"></i>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
