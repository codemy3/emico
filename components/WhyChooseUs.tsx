"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const reasons = [
  {
    number: "01",
    title: "RERA Certified Experts",
    description:
      "Every one of our agents is fully RERA certified with deep market knowledge and an unwavering commitment to ethical practice.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Exclusive Off-Plan Access",
    description:
      "We give you first access to off-plan launches, pre-sales, and exclusive developer deals before they hit the open market.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "End-to-End Support",
    description:
      "From property search to key handover — legal guidance, transaction coordination, and after-sale support in one place.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Market Intelligence",
    description:
      "Our proprietary data platform tracks Dubai's real estate market in real time — giving you the edge to buy at the right moment.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Multilingual Team",
    description:
      "Our team speaks 8+ languages, serving a diverse global clientele from Europe, Asia, the Americas, and the Middle East.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Transparent Transactions",
    description:
      "No hidden fees. No surprises. We operate with complete transparency at every step — your trust is our most valued asset.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const CARD_WIDTH = 288;  // w-72
const CARD_GAP   = 24;   // gap-6
const CARD_STEP  = CARD_WIDTH + CARD_GAP;

// ── Single shared transition string ───────────────────────────────
// Longer duration (0.7s) + ease-in-out so the colour wash feels like
// it's physically flowing over the card rather than snapping.
const TRANSITION = "0.7s cubic-bezier(0.65, 0, 0.35, 1)";
const CARD_TRANSITION = [
  `background-color ${TRANSITION}`,
  `border-color ${TRANSITION}`,
  `box-shadow ${TRANSITION}`,
  `transform ${TRANSITION}`,
].join(", ");
const TEXT_TRANSITION = `color ${TRANSITION}`;
const BG_TRANSITION   = `background-color ${TRANSITION}`;

export default function WhyChooseUs() {
  const trackRef   = useRef<HTMLDivElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);
  const posRef     = useRef(0);
  const rafRef     = useRef<number>(0);
  const pausedRef  = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [visible,      setVisible]      = useState(false);
  const [highlightIdx, setHighlightIdx] = useState<number>(-1);
  const [hoveredIdx,   setHoveredIdx]   = useState<number | null>(null);

  // Intersection observer for header reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Calculate which card index sits at the "2nd from left" position
  const computeHighlight = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const wrapLeft = wrap.getBoundingClientRect().left;
    const targetX  = wrapLeft + CARD_STEP;
    const cards    = Array.from(wrap.querySelectorAll<HTMLElement>("[data-card]"));
    let closest = -1;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const cardLeft = card.getBoundingClientRect().left;
      const dist     = Math.abs(cardLeft - targetX);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setHighlightIdx(minDist < CARD_WIDTH / 2 ? closest : -1);
  }, []);

  // Animation loop — speed bumped from 0.6 → 1.2
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = reasons.length * CARD_STEP;
    const speed = 1.2; // ← faster

    const tick = () => {
      if (!pausedRef.current) {
        posRef.current += speed;
        if (posRef.current >= totalWidth) posRef.current -= totalWidth;
        track.style.transform = `translateX(-${posRef.current}px)`;
        computeHighlight();
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [computeHighlight]);

  return (
    <section className="py-24 bg-white overflow-hidden" ref={sectionRef}>
      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div
            className={`transition-all duration-700 text-center lg:text-center ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-black/30 text-xs tracking-[0.4em] uppercase block mb-3">
              Our Difference
            </span>
            <h2
              className="text-black leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 700,
              }}
            >
              Why Choose
              <br />
              <em className="font-light italic">Emico?</em>
            </h2>
          </div>
          <p
            className={`text-gray-500 text-sm max-w-md leading-relaxed transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            We&apos;ve built our reputation on one thing: delivering extraordinary outcomes
            for every client. Here&apos;s what makes us different.
          </p>
        </div>
      </div>

      {/* ── Scrolling track ── */}
      <div
        className="relative overflow-hidden"
        ref={wrapRef}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-linear-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-linear-to-l from-white to-transparent pointer-events-none" />

        {/* Track — tripled so the seam is never visible */}
        <div
          ref={trackRef}
          className="flex will-change-transform py-2"
          style={{ gap: CARD_GAP, width: "max-content" }}
        >
          {[...reasons, ...reasons, ...reasons].map((reason, i) => {
            const isHighlighted = i === highlightIdx;
            const isHovered     = i === hoveredIdx;
            const isDark        = isHighlighted || isHovered;

            return (
              <div
                key={i}
                data-card
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="shrink-0 p-8 cursor-default select-none"
                style={{
                  width: CARD_WIDTH,
                  border: "1px solid",
                  borderColor:     isDark ? "#111" : "#f0f0f0",
                  backgroundColor: isDark ? "#111" : "#fff",
                  transition:      CARD_TRANSITION,
                  boxShadow: isDark
                    ? "0 20px 60px rgba(0,0,0,0.22)"
                    : "0 0 0 rgba(0,0,0,0)",
                  transform: isDark ? "translateY(-4px)" : "translateY(0)",
                }}
              >
                {/* Icon */}
                <div
                  className="mb-6"
                  style={{
                    color:      isDark ? "rgba(255,255,255,0.85)" : "#d1d5db",
                    transition: TEXT_TRANSITION,
                  }}
                >
                  {reason.icon}
                </div>

                {/* Number */}
                <div
                  className="text-xs font-mono tracking-widest mb-3"
                  style={{
                    color:      isDark ? "rgba(255,255,255,0.35)" : "#d1d5db",
                    transition: TEXT_TRANSITION,
                  }}
                >
                  {reason.number}
                </div>

                {/* Title */}
                <h3
                  className="font-semibold text-base mb-3 leading-snug"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color:      isDark ? "#ffffff" : "#111827",
                    transition: TEXT_TRANSITION,
                  }}
                >
                  {reason.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color:      isDark ? "rgba(255,255,255,0.6)" : "#6b7280",
                    transition: TEXT_TRANSITION,
                  }}
                >
                  {reason.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="mt-6 h-px"
                  style={{
                    backgroundColor: isDark ? "rgba(255,255,255,0.15)" : "transparent",
                    transition:      BG_TRANSITION,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}