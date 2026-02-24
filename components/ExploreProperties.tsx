"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  AnimatePresence,
  type Variants,
} from "framer-motion";

const categories = ["All", "Apartment", "Villa", "Penthouse", "Townhouse", "Commercial"];

const properties = [
  {
    id: 1,
    title: "Azure Residences",
    location: "Dubai Marina",
    type: "Apartment",
    price: "AED 2,500,000",
    beds: 2,
    baths: 2,
    area: "1,250 sqft",
    tag: "Off-Plan",
    tagColor: "#1a1a1a",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    completion: "Q4 2026",
  },
  {
    id: 2,
    title: "Palm Elite Villa",
    location: "Palm Jumeirah",
    type: "Villa",
    price: "AED 18,000,000",
    beds: 5,
    baths: 6,
    area: "7,800 sqft",
    tag: "Ready",
    tagColor: "#4a5568",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
    completion: null,
  },
  {
    id: 3,
    title: "Skyline Penthouse",
    location: "Downtown Dubai",
    type: "Penthouse",
    price: "AED 12,500,000",
    beds: 4,
    baths: 5,
    area: "5,200 sqft",
    tag: "Exclusive",
    tagColor: "#1a1a1a",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    completion: null,
  },
  {
    id: 4,
    title: "Marina Heights",
    location: "Dubai Marina",
    type: "Apartment",
    price: "AED 1,800,000",
    beds: 1,
    baths: 2,
    area: "850 sqft",
    tag: "New Launch",
    tagColor: "#1a1a1a",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    completion: "Q2 2027",
  },
  {
    id: 5,
    title: "Creek Townhouse",
    location: "Dubai Creek Harbour",
    type: "Townhouse",
    price: "AED 4,200,000",
    beds: 3,
    baths: 4,
    area: "2,800 sqft",
    tag: "Off-Plan",
    tagColor: "#4a5568",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    completion: "Q1 2026",
  },
  {
    id: 6,
    title: "Business Bay Tower",
    location: "Business Bay",
    type: "Commercial",
    price: "AED 3,500,000",
    beds: 0,
    baths: 2,
    area: "2,100 sqft",
    tag: "Ready",
    tagColor: "#4a5568",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    completion: null,
  },
];

// ── Icons ──────────────────────────────────────────────────────────
const BedIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const BathIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const AreaIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
  </svg>
);

const PinIcon = () => (
  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// ── Typed easing tuple — fixes TS2322 Easing errors ───────────────
const EASE_CUBIC: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ── Framer Motion Variants ─────────────────────────────────────────
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_CUBIC },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, delay: 0.3, ease: "easeOut" as const },
  },
};

const tabContainerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.2, ease: "easeOut" as const },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.55,
      ease: EASE_CUBIC,
    },
  }),
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.97,
    transition: { duration: 0.22, ease: "easeIn" as const },
  },
};

// ── Component ──────────────────────────────────────────────────────
export default function ExploreProperties() {
  const [active, setActive] = useState("All");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Show max 3 cards
  const filtered = (
    active === "All"
      ? properties
      : properties.filter((p) => p.type === active)
  ).slice(0, 3);

  return (
    <section
      className="py-24 px-6 overflow-hidden"
      ref={sectionRef}
      style={{ backgroundColor: "#f8f7f5" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Header ───────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Eyebrow line + label */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="h-px bg-black origin-left"
                style={{ width: 36 }}
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />
              <span
                className="text-black/40 text-xs tracking-[0.35em] uppercase"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Featured Listings
              </span>
            </div>

            {/* Headline */}
            <h2
              className="text-black leading-[1.1]"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.2rem, 4.5vw, 3.75rem)",
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              Explore Property{" "}
              <em style={{ fontWeight: 300, fontStyle: "italic", color: "#777" }}>
                in Dubai
              </em>
            </h2>
          </motion.div>

          {/* View All CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <Link
              href="/properties"
              className="group flex items-center gap-3 text-black text-xs font-bold tracking-[0.2em] uppercase hover:gap-5 transition-all duration-300"
            >
              View All Properties
              <span className="block h-px bg-black w-8 group-hover:w-12 transition-all duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* ── Filter Tabs ──────────────────────────────────────── */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          variants={tabContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="px-5 py-2 text-xs font-bold tracking-widest uppercase"
              style={{
                border: "1px solid",
                borderColor: active === cat ? "#1a1a1a" : "#d1cdc8",
                color: active === cat ? "#fff" : "#666",
                backgroundColor: active === cat ? "#1a1a1a" : "transparent",
                transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Property Grid — max 3 cards ───────────────────────── */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((property, i) => (
              <motion.div
                key={property.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                exit="exit"
                layout
              >
                <Link
                  href={`/properties/${property.id}`}
                  className="group block bg-white overflow-hidden"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.07 }}
                      transition={{ duration: 0.7, ease: EASE_CUBIC }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Tag badge */}
                    <div
                      className="absolute top-4 left-4 text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase"
                      style={{ backgroundColor: property.tagColor }}
                    >
                      {property.tag}
                    </div>

                    {/* Completion date */}
                    {property.completion && (
                      <div
                        className="absolute bottom-4 left-4 text-white/90 text-xs font-medium tracking-wide"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        Completion: {property.completion}
                      </div>
                    )}

                    {/* Sweep underline on hover */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-white"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.4, ease: "easeOut" as const }}
                    />
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-semibold text-gray-900 leading-tight truncate"
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: "1.2rem",
                            fontWeight: 600,
                          }}
                        >
                          {property.title}
                        </h3>
                        <p className="text-gray-400 text-xs mt-1 flex items-center gap-1 tracking-wide">
                          <PinIcon />
                          {property.location}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-black font-bold text-sm">{property.price}</div>
                        <div className="text-gray-400 text-[10px] tracking-widest uppercase mt-0.5">
                          {property.type}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-5 text-gray-400 text-xs tracking-wide">
                      {property.beds > 0 && (
                        <span className="flex items-center gap-1.5">
                          <BedIcon />
                          {property.beds} Beds
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <BathIcon />
                        {property.baths} Baths
                      </span>
                      <span className="flex items-center gap-1.5 ml-auto">
                        <AreaIcon />
                        {property.area}
                      </span>
                    </div>

                    {/* Hover CTA */}
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Details
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" as const }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}