"use client";

import React, { useState } from "react";
import Image from "next/image";
import { enquiryService } from "@/lib/services/enquiryService";

const MAX_MESSAGE_LENGTH = 1000;

export default function ContactFormSection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Field error states
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Validation functions matching reference contact.html & script.js
  const handleFirstNameChange = (val: string) => {
    setFirstName(val);
    if (/\d/.test(val)) {
      setFirstNameError("Name does not contain number");
    } else if (/[^a-zA-Z\s\.\'-]/.test(val)) {
      setFirstNameError("First name cannot contain special characters.");
    } else if (val.length > 50) {
      setFirstNameError("First name cannot exceed 50 characters.");
    } else {
      setFirstNameError("");
    }
  };

  const handleFirstNameBlur = () => {
    const raw = firstName;
    const val = raw.trim();
    if (/\d/.test(raw)) {
      setFirstNameError("Name does not contain number");
    } else if (/[^a-zA-Z\s\.\'-]/.test(val)) {
      setFirstNameError("First name cannot contain special characters.");
    } else if (!val) {
      setFirstNameError("Please enter your first name.");
    } else if (val.length < 2) {
      setFirstNameError("First name must be at least 2 characters.");
    } else if (val.length > 50) {
      setFirstNameError("First name cannot exceed 50 characters.");
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (val: string) => {
    setLastName(val);
    if (/\d/.test(val)) {
      setLastNameError("Name does not contain number");
    } else if (/[^a-zA-Z\s\.\'-]/.test(val)) {
      setLastNameError("Last name cannot contain special characters.");
    } else if (val.length > 50) {
      setLastNameError("Last name cannot exceed 50 characters.");
    } else {
      setLastNameError("");
    }
  };

  const handleLastNameBlur = () => {
    const raw = lastName;
    const val = raw.trim();
    if (/\d/.test(raw)) {
      setLastNameError("Name does not contain number");
    } else if (/[^a-zA-Z\s\.\'-]/.test(val)) {
      setLastNameError("Last name cannot contain special characters.");
    } else if (!val) {
      setLastNameError("Please enter your last name.");
    } else if (val.length < 2) {
      setLastNameError("Last name must be at least 2 characters.");
    } else if (val.length > 50) {
      setLastNameError("Last name cannot exceed 50 characters.");
    } else {
      setLastNameError("");
    }
  };

  const handlePhoneChange = (val: string) => {
    setPhone(val);
    if (/[a-zA-Z]/.test(val)) {
      setPhoneError("Phone number does not contain characters");
    } else {
      setPhoneError("");
    }
  };

  const handlePhoneBlur = () => {
    const raw = phone;
    const val = raw.trim();
    if (/[a-zA-Z]/.test(raw)) {
      setPhoneError("Phone number does not contain characters");
      return;
    }
    if (!val) {
      setPhoneError("Please enter your contact number.");
      return;
    }
    const phoneRegex = /^(\+91|0)?[6-9]\d{9}$/;
    if (!phoneRegex.test(val.replace(/[\s\-\(\)]/g, ""))) {
      setPhoneError("Please enter a valid 10-digit mobile number.");
    } else {
      setPhoneError("");
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
    const val = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!val) {
      setEmailError("Please enter your email address.");
    } else if (!emailRegex.test(val)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSubjectChange = (val: string) => {
    setSubject(val);
    if (subjectError && val.trim()) {
      setSubjectError("");
    }
  };

  const handleSubjectBlur = () => {
    if (!subject.trim()) {
      setSubjectError("Please enter a subject.");
    } else {
      setSubjectError("");
    }
  };

  const handleMessageChange = (val: string) => {
    setMessage(val);
    if (val.length > MAX_MESSAGE_LENGTH) {
      setMessageError(`Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`);
    } else if (messageError) {
      if (val.trim().length >= 10 && val.length <= MAX_MESSAGE_LENGTH) {
        setMessageError("");
      }
    }
  };

  const handleMessageBlur = () => {
    const val = message.trim();
    if (!val) {
      setMessageError("Please enter your message.");
    } else if (val.length < 10) {
      setMessageError("Message must be at least 10 characters.");
    } else if (message.length > MAX_MESSAGE_LENGTH) {
      setMessageError(`Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`);
    } else {
      setMessageError("");
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    let hasError = false;

    // Validate First Name
    const fVal = firstName.trim();
    if (/\d/.test(firstName)) {
      setFirstNameError("Name does not contain number");
      hasError = true;
    } else if (/[^a-zA-Z\s\.\'-]/.test(fVal)) {
      setFirstNameError("First name cannot contain special characters.");
      hasError = true;
    } else if (!fVal) {
      setFirstNameError("Please enter your first name.");
      hasError = true;
    } else if (fVal.length < 2) {
      setFirstNameError("First name must be at least 2 characters.");
      hasError = true;
    } else if (fVal.length > 50) {
      setFirstNameError("First name cannot exceed 50 characters.");
      hasError = true;
    } else {
      setFirstNameError("");
    }

    // Validate Last Name
    const lVal = lastName.trim();
    if (/\d/.test(lastName)) {
      setLastNameError("Name does not contain number");
      hasError = true;
    } else if (/[^a-zA-Z\s\.\'-]/.test(lVal)) {
      setLastNameError("Last name cannot contain special characters.");
      hasError = true;
    } else if (!lVal) {
      setLastNameError("Please enter your last name.");
      hasError = true;
    } else if (lVal.length < 2) {
      setLastNameError("Last name must be at least 2 characters.");
      hasError = true;
    } else if (lVal.length > 50) {
      setLastNameError("Last name cannot exceed 50 characters.");
      hasError = true;
    } else {
      setLastNameError("");
    }

    // Validate Phone
    const pVal = phone.trim();
    if (/[a-zA-Z]/.test(phone)) {
      setPhoneError("Phone number does not contain characters");
      hasError = true;
    } else if (!pVal) {
      setPhoneError("Please enter your contact number.");
      hasError = true;
    } else {
      const phoneRegex = /^(\+91|0)?[6-9]\d{9}$/;
      if (!phoneRegex.test(pVal.replace(/[\s\-\(\)]/g, ""))) {
        setPhoneError("Please enter a valid 10-digit mobile number.");
        hasError = true;
      } else {
        setPhoneError("");
      }
    }

    // Validate Email
    const eVal = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!eVal) {
      setEmailError("Please enter your email address.");
      hasError = true;
    } else if (!emailRegex.test(eVal)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    } else {
      setEmailError("");
    }

    // Validate Subject
    if (!subject.trim()) {
      setSubjectError("Please enter a subject.");
      hasError = true;
    } else {
      setSubjectError("");
    }

    // Validate Message
    const mVal = message.trim();
    if (!mVal) {
      setMessageError("Please enter your message.");
      hasError = true;
    } else if (mVal.length < 10) {
      setMessageError("Message must be at least 10 characters.");
      hasError = true;
    } else if (message.length > MAX_MESSAGE_LENGTH) {
      setMessageError(`Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`);
      hasError = true;
    } else {
      setMessageError("");
    }


    if (hasError) return;

    setIsSubmitting(true);

    const fullName = `${firstName} ${lastName}`.trim();
    try {
      await enquiryService.submitEnquiry({
        name: fullName,
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        subject: subject.trim() || `Contact Inquiry from ${fullName}`,
        message: message.trim(),
        enquiry_type: "GENERAL",
      });

      setShowToast(true);
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setSubject("");
      setMessage("");

      // Clear any remaining errors
      setFirstNameError("");
      setLastNameError("");
      setPhoneError("");
      setEmailError("");
      setSubjectError("");
      setMessageError("");

      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    } catch (err: unknown) {
      console.error("[ContactFormSection] Submission error:", err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Failed to submit enquiry. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="have-any-questions" className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16 bg-[#FDFBF7]">
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

            <form onSubmit={handleSubmit} noValidate className="space-y-4 pt-2">
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="First Name *"
                      value={firstName}
                      onChange={(e) => handleFirstNameChange(e.target.value)}
                      onBlur={handleFirstNameBlur}
                      className={`w-full bg-white border rounded-lg px-4 py-3.5 text-sm text-[#1E293B] placeholder-stone-400 focus:outline-none transition-all shadow-sm font-['Inter',sans-serif] ${
                        firstNameError
                          ? "border-red-500 ring-2 ring-red-500/20"
                          : "border-stone-200 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]"
                      }`}
                    />
                  </div>
                  {firstNameError && (
                    <span className="text-xs text-red-500 font-medium mt-1 text-left block font-['Inter',sans-serif]">
                      {firstNameError}
                    </span>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Last Name *"
                      value={lastName}
                      onChange={(e) => handleLastNameChange(e.target.value)}
                      onBlur={handleLastNameBlur}
                      className={`w-full bg-white border rounded-lg px-4 py-3.5 text-sm text-[#1E293B] placeholder-stone-400 focus:outline-none transition-all shadow-sm font-['Inter',sans-serif] ${
                        lastNameError
                          ? "border-red-500 ring-2 ring-red-500/20"
                          : "border-stone-200 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]"
                      }`}
                    />
                  </div>
                  {lastNameError && (
                    <span className="text-xs text-red-500 font-medium mt-1 text-left block font-['Inter',sans-serif]">
                      {lastNameError}
                    </span>
                  )}
                </div>
              </div>

              {/* Row 2: Contact Number & Your Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="Contact Number *"
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      onBlur={handlePhoneBlur}
                      className={`w-full bg-white border rounded-lg pl-10 pr-4 py-3.5 text-sm text-[#1E293B] placeholder-stone-400 focus:outline-none transition-all shadow-sm font-['Inter',sans-serif] ${
                        phoneError
                          ? "border-red-500 ring-2 ring-red-500/20"
                          : "border-stone-200 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]"
                      }`}
                    />
                    <i className="fa-solid fa-phone absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs"></i>
                  </div>
                  {phoneError && (
                    <span className="text-xs text-red-500 font-medium mt-1 text-left block font-['Inter',sans-serif]">
                      {phoneError}
                    </span>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Your Email *"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      onBlur={handleEmailBlur}
                      className={`w-full bg-white border rounded-lg pl-10 pr-4 py-3.5 text-sm text-[#1E293B] placeholder-stone-400 focus:outline-none transition-all shadow-sm font-['Inter',sans-serif] ${
                        emailError
                          ? "border-red-500 ring-2 ring-red-500/20"
                          : "border-stone-200 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]"
                      }`}
                    />
                    <i className="fa-solid fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs"></i>
                  </div>
                  {emailError && (
                    <span className="text-xs text-red-500 font-medium mt-1 text-left block font-['Inter',sans-serif]">
                      {emailError}
                    </span>
                  )}
                </div>
              </div>

              {/* Row 3: Subject */}
              <div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Subject *"
                    value={subject}
                    onChange={(e) => handleSubjectChange(e.target.value)}
                    onBlur={handleSubjectBlur}
                    className={`w-full bg-white border rounded-lg px-4 py-3.5 text-sm text-[#1E293B] placeholder-stone-400 focus:outline-none transition-all shadow-sm font-['Inter',sans-serif] ${
                      subjectError
                        ? "border-red-500 ring-2 ring-red-500/20"
                        : "border-stone-200 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]"
                    }`}
                  />
                </div>
                {subjectError && (
                  <span className="text-xs text-red-500 font-medium mt-1 text-left block font-['Inter',sans-serif]">
                    {subjectError}
                  </span>
                )}
              </div>

              {/* Row 4: Your Message */}
              <div>
                <div className="relative">
                  <textarea
                    rows={4}
                    placeholder={`Your Message * (Min 10, Max ${MAX_MESSAGE_LENGTH} characters)`}
                    value={message}
                    onChange={(e) => handleMessageChange(e.target.value)}
                    onBlur={handleMessageBlur}
                    className={`w-full bg-white border rounded-lg pl-10 pr-4 py-3.5 text-sm text-[#1E293B] placeholder-stone-400 focus:outline-none transition-all shadow-sm font-['Inter',sans-serif] resize-none ${
                      messageError
                        ? "border-red-500 ring-2 ring-red-500/20"
                        : "border-stone-200 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]"
                    }`}
                  ></textarea>
                  <i className="fa-solid fa-pen absolute left-3.5 top-4 text-stone-400 text-xs"></i>
                </div>
                <div className="flex justify-between items-center mt-1">
                  {messageError ? (
                    <span className="text-xs text-red-500 font-medium text-left block font-['Inter',sans-serif]">
                      {messageError}
                    </span>
                  ) : (
                    <span></span>
                  )}
                  <span
                    className={`text-xs ml-auto font-['Inter',sans-serif] ${
                      message.length > MAX_MESSAGE_LENGTH
                        ? "text-red-500 font-semibold"
                        : "text-stone-400"
                    }`}
                  >
                    {message.length}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>
              </div>


              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#4E1421] hover:bg-[#612124] text-white px-8 py-3.5 rounded-lg text-sm font-bold font-['Outfit',sans-serif] transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? "Submitting..." : "Send Message"}</span>
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

      {/* Error Toast */}
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
