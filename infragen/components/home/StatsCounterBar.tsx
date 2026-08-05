"use client";

import React, { useState, useEffect, useRef } from "react";

interface StatConfig {
  target: number;
  suffix: string;
  label: string;
}

const statsList: StatConfig[] = [
  { target: 5, suffix: "+", label: "YEARS OF EXPERIENCE" },
  { target: 127, suffix: "+", label: "HAPPY CLIENTS" },
  { target: 105, suffix: "+", label: "PROJECTS COMPLETED" },
  { target: 100, suffix: "%", label: "TRANSPARENCY" },
];

export default function StatsCounterBar() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          statsList.forEach((stat, idx) => {
            setTimeout(() => {
              let current = 0;
              const stepTime = 30;
              const timer = setInterval(() => {
                const remaining = stat.target - current;
                const increment = Math.max(1, Math.ceil(remaining / 10));
                current = Math.min(current + increment, stat.target);
                setCounts((prev) => {
                  const updated = [...prev];
                  updated[idx] = current;
                  return updated;
                });
                if (current >= stat.target) {
                  clearInterval(timer);
                }
              }, stepTime);
            }, idx * 250);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div
      ref={containerRef}
      id="stats-counter-bar"
      className="w-full bg-[#c5a880] m-0 py-10 sm:py-12 border-t border-b border-[#b39569] shadow-inner"
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-black/15">
          {statsList.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center p-2">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black font-['Outfit',sans-serif] tracking-tight">
                {counts[idx]}
                {stat.suffix}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-black uppercase tracking-[0.18em] mt-3 font-['Inter',sans-serif]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
