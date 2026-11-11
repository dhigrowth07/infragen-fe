"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface ProcessStep {
  id: number;
  title: string;
  sub?: string;
  desc: string;
  img: string;
  left: string;
  top: string;
  isUp: boolean;
}

const steps: ProcessStep[] = [
  {
    id: 1,
    title: "1. Land Analysis",
    desc: "Feasibility study, soil testing & title verification",
    img: "/assets/images/about-property-management.jpg",
    left: "22%",
    top: "180px",
    isUp: true,
  },
  {
    id: 2,
    title: "2. Land Purchase",
    desc: "Price negotiation & registered deed transfer",
    img: "/assets/images/handshake-deal.jpg",
    left: "42%",
    top: "180px",
    isUp: true,
  },
  {
    id: 3,
    title: "3. Land Conversion",
    sub: "(DTCP / CMDA / RERA)",
    desc: "Zoning conversion & RERA compliance",
    img: "/assets/images/plot-layout-1.jpg",
    left: "62%",
    top: "180px",
    isUp: true,
  },
  {
    id: 4,
    title: "4. Architectural & Structural Design",
    desc: "2D/3D floor plans & structural engineering",
    img: "/assets/images/hero-3.jpg",
    left: "82%",
    top: "180px",
    isUp: true,
  },
  {
    id: 5,
    title: "5. Building Approvals",
    sub: "(Corporation / Panchayat)",
    desc: "Municipal blueprint sanction permits",
    img: "/assets/images/hero-4.jpg",
    left: "82%",
    top: "400px",
    isUp: false,
  },
  {
    id: 6,
    title: "6. Building Construction",
    desc: "Foundation, RCC framing & site supervision",
    img: "/assets/images/about-property-management.jpg",
    left: "62%",
    top: "400px",
    isUp: false,
  },
  {
    id: 7,
    title: "7. Quality Inspection & Final Finishing",
    desc: "Quality audits, painting & utility testing",
    img: "/assets/images/hero-1.jpg",
    left: "42%",
    top: "400px",
    isUp: false,
  },
  {
    id: 8,
    title: "8. Turnkey Key Handover",
    desc: "Completion Certificate (CC) & key presentation",
    img: "/assets/images/key-handover.jpg",
    left: "22%",
    top: "400px",
    isUp: false,
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const drawLineRef = useRef<SVGPathElement>(null);
  const pathTipRef = useRef<SVGGElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let animId: number;
    let observer: IntersectionObserver;

    const processSection = sectionRef.current;
    const drawLine = drawLineRef.current;
    const pathTip = pathTipRef.current;
    const processNodes = nodesRef.current;

    if (processSection && drawLine) {
      const totalLength = drawLine.getTotalLength ? drawLine.getTotalLength() : 2106;
      drawLine.style.strokeDasharray = String(totalLength);
      drawLine.style.strokeDashoffset = String(totalLength);

      // Relative progress thresholds along path for Steps 1-8
      const stepThresholds = [0.037, 0.154, 0.270, 0.387, 0.613, 0.730, 0.846, 0.963];
      let animationStarted = false;

      function runSerpentineAnimation() {
        const startTime = performance.now();
        const duration = 8000; // 8.0 seconds relaxed smooth draw time

        function animateStep(now: number) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const distance = totalLength * progress;

          // Update SVG stroke-dashoffset synchronously with progress
          if (drawLine) {
            drawLine.style.strokeDashoffset = String(totalLength * (1 - progress));
          }

          // Update Moving Path Tip position & rotation angle around U-turn curve
          if (pathTip && drawLine && drawLine.getPointAtLength) {
            const pt = drawLine.getPointAtLength(distance);
            const ptNext = drawLine.getPointAtLength(Math.min(distance + 2, totalLength));
            const angle = Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x) * (180 / Math.PI);

            pathTip.setAttribute("transform", `translate(${pt.x}, ${pt.y}) rotate(${angle})`);
          }

          // Reveal step simultaneously when line tip touches its threshold
          processNodes.forEach((node, index) => {
            if (node && progress >= stepThresholds[index]) {
              node.classList.add("step-visible");
            }
          });

          if (progress < 1) {
            animId = requestAnimationFrame(animateStep);
          }
        }

        animId = requestAnimationFrame(animateStep);
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !animationStarted) {
              animationStarted = true;
              processSection.classList.add("process-active");
              runSerpentineAnimation();
              observer.unobserve(processSection);
            }
          });
        },
        { threshold: 0.25 }
      );

      observer.observe(processSection);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-24 bg-white text-[#2a2320] relative overflow-hidden border-t border-b border-stone-200"
    >
      {/* Subtle ambient background glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#612124]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-['Outfit',sans-serif] text-[#612124] font-extrabold tracking-tight">
            One Stop Solution
          </h2>
        </div>

        {/* Desktop Serpentine U-Turn Roadmap Track (Hidden on Mobile) */}
        <div
          className="hidden lg:block relative w-full max-w-[1280px] mx-auto my-8"
          style={{ height: "580px", overflow: "visible" }}
        >
          {/* SVG Track Layer (Single Progressive Drawing Line) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1280 580"
            fill="none"
          >
            {/* Single Progressive Animated Drawing Curve Line (Draws 0 to 100%) */}
            <path
              ref={drawLineRef}
              id="serpentine-main-path"
              d="M 200 180 L 1080 180 A 110 110 0 0 1 1080 400 L 200 400"
              stroke="#c5a880"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              className="serpentine-draw-line"
            />

            {/* Dynamic Rotating Path Tip Arrow (Follows growing curve head) */}
            <g
              ref={pathTipRef}
              id="serpentine-path-tip"
              transform="translate(200, 180) rotate(0)"
            >
              <circle cx="0" cy="0" r="14" fill="#612124" opacity="0.3" />
              <circle cx="0" cy="0" r="8" fill="#612124" stroke="#ffffff" strokeWidth="2" />
              <path
                d="M -3 -4 L 4 0 L -3 4"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
          </svg>

          {/* Far-Left Center Vizhi Infragen Logo (Start Point) */}
          <div
            className="absolute flex items-center justify-center z-20 hover:scale-105 transition-transform duration-300"
            style={{
              left: "20px",
              top: "290px",
              transform: "translate(0, -50%)",
              width: "140px",
              height: "140px",
            }}
          >
            <Image
              src="/vizhi-infragen-realtors-logo.png"
              alt="Vizhi Infragen Realtors Logo"
              width={144}
              height={80}
              className="w-36 h-20 object-contain"
              style={{ width: "auto", height: "auto" }}
            />
          </div>

          {/* All 8 Step Nodes */}
          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => {
                nodesRef.current[index] = el;
              }}
              className="absolute process-step-node"
              style={{
                left: step.left,
                top: step.top,
                zIndex: 20,
              }}
            >
              {/* Center Dot with Golden Halo Pulse */}
              <div className="w-6 h-6 rounded-full bg-white border-4 border-[#612124] shadow-md mx-auto relative z-20 node-pulse-ring" />

              {step.isUp ? (
                <>
                  {/* Top Image Circle */}
                  <div
                    className="absolute group cursor-pointer"
                    style={{ bottom: "22px", left: "50%", transform: "translateX(-50%)" }}
                  >
                    <div className="w-28 h-28 rounded-full border-2 border-white overflow-hidden shadow-xl bg-white group-hover:scale-110 transition-all duration-500 relative">
                      <Image
                        src={step.img}
                        alt={step.title}
                        fill
                        sizes="112px"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Bottom Title */}
                  <div
                    className="absolute text-center"
                    style={{ top: "22px", left: "50%", transform: "translateX(-50%)", width: "220px" }}
                  >
                    <h3 className="text-base font-extrabold font-['Outfit',sans-serif] text-[#612124] leading-tight">
                      {step.title}
                    </h3>
                    {step.sub && (
                      <span className="text-xs text-[#612124]/80 font-bold block font-['Outfit',sans-serif] mt-0.5">
                        {step.sub}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Top Title */}
                  <div
                    className="absolute text-center"
                    style={{ bottom: "22px", left: "50%", transform: "translateX(-50%)", width: "220px" }}
                  >
                    <h3 className="text-base font-extrabold font-['Outfit',sans-serif] text-[#612124] leading-tight">
                      {step.title}
                    </h3>
                    {step.sub && (
                      <span className="text-xs text-[#612124]/80 font-bold block font-['Outfit',sans-serif] mt-0.5">
                        {step.sub}
                      </span>
                    )}
                  </div>

                  {/* Bottom Image Circle */}
                  <div
                    className="absolute group cursor-pointer"
                    style={{ top: "22px", left: "50%", transform: "translateX(-50%)" }}
                  >
                    <div className="w-28 h-28 rounded-full border-2 border-white overflow-hidden shadow-xl bg-white group-hover:scale-110 transition-all duration-500 relative">
                      <Image
                        src={step.img}
                        alt={step.title}
                        fill
                        sizes="112px"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Mobile & Tablet Responsive View (2-Column Grid) */}
        <div className="block lg:hidden space-y-8 my-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((step) => (
              <div
                key={step.id}
                className="bg-stone-50 rounded-2xl p-5 border border-stone-200 shadow-sm hover:shadow-md flex items-center gap-4 group transition-all duration-300"
              >
                <div className="relative w-24 h-24 rounded-full shrink-0 overflow-hidden shadow-md border-2 border-white bg-white">
                  <Image
                    src={step.img}
                    alt={step.title}
                    fill
                    sizes="96px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-['Outfit',sans-serif] text-[#612124]">
                    {step.title}
                  </h3>
                  {step.sub && (
                    <span className="text-xs text-[#612124]/75 font-semibold block font-['Outfit',sans-serif] mt-0.5">
                      {step.sub}
                    </span>
                  )}
                  <p className="text-xs text-stone-600 mt-1 font-['Inter',sans-serif]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
