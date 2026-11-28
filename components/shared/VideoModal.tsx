"use client";

import React, { useEffect, useRef } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Effect 1: Body overflow lock & Escape key handling
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Effect 2: Video playback lifecycle strictly tied to isOpen
  useEffect(() => {
    if (isOpen) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/85 backdrop-blur-md z-[200] flex items-center justify-center p-4 transition-opacity duration-300 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 text-white hover:bg-[#612124] flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-lg"
          aria-label="Close Video"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>
        <div className="aspect-video w-full">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            controls
            autoPlay
            playsInline
            preload="auto"
            poster="/videos/hero-corporate-video-poster.webp"
          >
            <source
              src="https://d1pcf1j7ccms3v.cloudfront.net/videos/hero-corporate-video.mp4"
              type="video/mp4"
            />
            <source
              src="/videos/watermark-removed-I_attached_photos_and_video.MOV"
              type="video/quicktime"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
