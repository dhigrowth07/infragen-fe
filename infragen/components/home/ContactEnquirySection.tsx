"use client";

import React, { useState } from "react";

export default function ContactEnquirySection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const constantToEmail = "srissa2006@gmail.com";
    const defaultMsg = "Hii! I'm interested can I know about more details";
    const finalMsg = message && message.trim() !== "" ? message : defaultMsg;

    const subject = encodeURIComponent(`Property Inquiry from ${name || "Client"} - Vizhi Infragen`);
    const body = encodeURIComponent(
      `${finalMsg}\n\n---\nClient Contact Details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`
    );

    const mailtoUrl = `mailto:${constantToEmail}?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");

      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }, 1000);
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
      <div className="w-full max-w-none px-6 sm:px-10 lg:px-16 flex flex-col lg:flex-row gap-[60px] items-center justify-between relative z-10 mx-auto">
        
        {/* Left Column */}
        <div className="pt-[4.79px] flex flex-col gap-[16px] items-start justify-start flex-1 relative text-left">
          <div className="text-[#c5a880] text-left font-['Inter',sans-serif] text-sm leading-[22px] font-semibold uppercase relative flex items-center justify-start tracking-[1.75px]">
            LET'S CONNECT
          </div>
          <div className="flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative">
            <h2 className="text-[#ffffff] text-left font-['Outfit',sans-serif] text-3xl sm:text-4xl lg:text-[40px] leading-[1.2] font-bold relative self-stretch flex flex-col justify-start drop-shadow-md">
              <span className="block">Talk to a Coimbatore Real Estate</span>
              <span className="block">Expert Today</span>
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
            className="bg-[#8A1F36] hover:bg-[#a22c46] rounded-md border-none pt-[15px] pr-[28px] pb-[15px] pl-[28px] flex flex-row gap-2.5 items-center justify-start shrink-0 relative hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group shadow-lg"
          >
            <i className="fa-solid fa-arrow-right text-white text-sm group-hover:translate-x-1 transition-transform"></i>
            <div className="text-white text-left font-['Inter',sans-serif] text-base leading-[26px] font-semibold relative flex items-center justify-start">
              Start Your Property Journey
            </div>
          </a>
        </div>

        {/* Right Column: Quick Enquiry Form */}
        <div className="glass-white-box rounded-md pt-[36px] pr-[32px] pb-[36px] pl-[32px] flex flex-col gap-[24px] items-start justify-start flex-1 relative w-full border border-white/70 shadow-2xl">
          <div className="text-[#c99b4a] text-left font-['Inter',sans-serif] text-sm leading-[22px] font-bold uppercase tracking-[1.75px]">
            QUICK ENQUIRY
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-start justify-start self-stretch shrink-0 relative w-full">
            <div className="flex flex-col sm:flex-row gap-4 items-start justify-center self-stretch shrink-0 relative w-full">
              <div className="bg-white/90 rounded-md border border-gray-300/80 px-4 py-3.5 flex flex-col gap-0 items-start justify-start flex-1 relative overflow-hidden focus-within:border-burgundy-600 focus-within:ring-2 focus-within:ring-burgundy-600/20 transition-all w-full">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-[#000000] text-[14px] font-['Inter',sans-serif] font-medium placeholder-[#666666] focus:ring-0 p-0"
                />
              </div>

              <div className="bg-white/90 rounded-md border border-gray-300/80 px-4 py-3.5 flex flex-col gap-0 items-start justify-start flex-1 relative overflow-hidden focus-within:border-burgundy-600 focus-within:ring-2 focus-within:ring-burgundy-600/20 transition-all w-full">
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-[#000000] text-[14px] font-['Inter',sans-serif] font-medium placeholder-[#666666] focus:ring-0 p-0"
                />
              </div>
            </div>

            <div className="bg-white/90 rounded-md border border-gray-300/80 px-4 py-3.5 flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative overflow-hidden w-full focus-within:border-burgundy-600 focus-within:ring-2 focus-within:ring-burgundy-600/20 transition-all">
              <input
                type="tel"
                required
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-[#000000] text-[14px] font-['Inter',sans-serif] font-medium placeholder-[#666666] focus:ring-0 p-0"
              />
            </div>

            <div className="bg-white/90 rounded-md border border-gray-300/80 px-4 py-3.5 flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative overflow-hidden w-full focus-within:border-burgundy-600 focus-within:ring-2 focus-within:ring-burgundy-600/20 transition-all">
              <textarea
                rows={3}
                placeholder="How can we help you?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-[#000000] text-[14px] font-['Inter',sans-serif] font-medium placeholder-[#666666] focus:ring-0 resize-none p-0"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#c5a880] hover:bg-[#b59870] active:scale-[0.98] rounded-md border-none py-4 px-8 flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 relative transition-all duration-300 w-full cursor-pointer shadow-lg text-[#612124] font-['Outfit',sans-serif] font-extrabold text-base tracking-wider uppercase"
            >
              {isSubmitting ? (
                <span>Opening Mail...</span>
              ) : (
                <>
                  <span>Send Message</span>
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
    </section>
  );
}
