"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data ───────────────────────────────────────────────────────────
const TABS = ["Buy", "Rent", "Off Plan", "Plots"] as const;
type Tab = (typeof TABS)[number];

const CITIES = [
  "Dubai", "Abu Dhabi", "All Cities (UAE)", "Ras al Khaimah",
  "Sharjah", "Fujairah", "Ajman", "Umm al Quwain", "Al Ain",
];

// Property types per tab (non-Plots)
const PROPERTY_TYPES_RESIDENTIAL = [
  "All in Residential", "Apartment", "Villa", "Townhouse",
  "Penthouse", "Hotel Apartment", "Residential Building",
  "Residential Floor", "Villa Compound",
];
const PROPERTY_TYPES_COMMERCIAL = [
  "All in Commercial", "Office", "Shop", "Warehouse",
  "Labour Camp", "Commercial Building", "Commercial Floor", "Commercial Villa",
];
const PROPERTY_TYPES_LAND = [
  "All in Land", "Residential Land", "Commercial Land",
  "Industrial Land", "Mixed Use Land",
];
const PROPERTY_TYPES_MULTIPLE = [
  "All in Multiple Units", "Full Building", "Full Floor", "Full Villa Compound",
];

// Sub-tabs shown inside Property Type dropdown (non-Plots)
const SUB_TABS = ["Residential", "Commercial", "Land", "Multiple Units"] as const;
type SubTab = (typeof SUB_TABS)[number];

const PROP_TYPE_MAP: Record<SubTab, string[]> = {
  "Residential":    PROPERTY_TYPES_RESIDENTIAL,
  "Commercial":     PROPERTY_TYPES_COMMERCIAL,
  "Land":           PROPERTY_TYPES_LAND,
  "Multiple Units": PROPERTY_TYPES_MULTIPLE,
};

// Plots-specific property types
const PLOT_PROPERTY_TYPES = ["Commercial", "Residential", "Industrial", "Mix use"];

// Price Range — shown as "Any" with min/max inputs like dubizzle
// Beds
const BEDS_MIN = ["Studio", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12+"];
const BEDS_MAX = ["Studio", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12+ Bedrooms"];

// More → Completion Status + Amenities
const AMENITIES = [
  "Maids Room",         "Study",
  "Central A/C & Heating", "Concierge Service",
  "Balcony",            "Private Garden",
  "Private Pool",       "Private Gym",
  "Private Jacuzzi",    "Shared Pool",
  "Shared Spa",         "Shared Gym",
];

const SUGGESTIONS = [
  "Dubai Marina", "Downtown Dubai", "Palm Jumeirah", "Business Bay",
  "Jumeirah Village Circle", "Arabian Ranches",
  "Jumeirah Lake Towers", "Dubai Hills Estate",
];

// ── Helpers ────────────────────────────────────────────────────────
const Chevron = ({ open }: { open: boolean }) => (
  <svg
    className="w-3 h-3 text-white/40 shrink-0"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
  >
    <path strokeLinecap="round" d="M6 9l6 6 6-6" />
  </svg>
);

const VDivider = () => <div className="w-px bg-white/10 my-3.5 shrink-0" />;

// ── Column wrapper — consistent look for every cell ───────────────
function Cell({ children, onClick, label, valueDisplay, isDefault }: {
  children?: React.ReactNode;
  onClick?: () => void;
  label: string;
  valueDisplay?: string;
  isDefault?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="h-full px-4 flex flex-col justify-center gap-0 hover:bg-white/5 transition-colors duration-150 shrink-0 whitespace-nowrap text-left"
      style={{ fontFamily: "var(--font-dm-sans), sans-serif", minWidth: 90 }}
    >
      <span className="text-[11px] text-white/40 leading-none mb-0.5">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className={`text-[13px] leading-none ${isDefault ? "text-white/45" : "text-white font-medium"}`}>
          {valueDisplay}
        </span>
        <Chevron open={false} />
      </div>
      {children}
    </button>
  );
}

// ── Main Component ─────────────────────────────────────────────────
export default function HeroSection() {
  const [activeTab, setActiveTab]         = useState<Tab>("Buy");
  const [city, setCity]                   = useState("Dubai");
  const [location, setLocation]           = useState("");
  const [activeSubTab, setActiveSubTab]   = useState<SubTab>("Residential");
  const [propType, setPropType]           = useState("All in Residential");
  const [plotType, setPlotType]           = useState("Commercial");
  const [priceMin, setPriceMin]           = useState("");
  const [priceMax, setPriceMax]           = useState("");
  const [bedsMin, setBedsMin]             = useState("");
  const [bedsMax, setBedsMax]             = useState("");
  const [completionStatus, setCompletionStatus] = useState("All");
  const [amenities, setAmenities]         = useState<string[]>([]);
  const [openDropdown, setOpenDropdown]   = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [videoLoaded, setVideoLoaded]     = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef   = useRef<HTMLDivElement>(null);

  const isPlotsTab = activeTab === "Plots";

  useEffect(() => { videoRef.current?.play().catch(() => {}); }, []);

  // Reset on tab change
  useEffect(() => {
    setActiveSubTab("Residential");
    setPropType("All in Residential");
    setPlotType("Commercial");
    setBedsMin(""); setBedsMax("");
    setPriceMin(""); setPriceMax("");
  }, [activeTab]);

  // Reset propType when sub-tab changes
  useEffect(() => {
    setPropType(PROP_TYPE_MAP[activeSubTab][0]);
  }, [activeSubTab]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const toggle = (name: string) =>
    setOpenDropdown((prev) => (prev === name ? null : name));

  const toggleAmenity = (a: string) =>
    setAmenities((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);

  const filteredSuggestions = SUGGESTIONS.filter((s) =>
    location.length > 0 && s.toLowerCase().includes(location.toLowerCase())
  );

  // Display helpers
  const priceDisplay = priceMin || priceMax
    ? `${priceMin || "0"} – ${priceMax || "Any"}`
    : "Any";
  const bedsDisplay = bedsMin || bedsMax
    ? `${bedsMin || "Studio"} – ${bedsMax || "12+"}`
    : "Any";
  const moreCount = (completionStatus !== "All" ? 1 : 0) + amenities.length;

  return (
    <section
      className="relative w-full overflow-visible"
      style={{ height: "100svh", minHeight: 680, zIndex: 50 }}
    >
      {/* ── VIDEO BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=90')" }}
        />
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
          src="https://videos.pexels.com/video-files/8534528/8534528-hd_1920_1080_25fps.mp4"
        />
      </div>

      {/* ── GRADIENT OVERLAY ── */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(165deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.62) 78%, rgba(0,0,0,0.76) 100%)" }}
      />

      {/* ── CONTENT ── */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end overflow-visible">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 pb-8 sm:pb-16 lg:pb-24">

          {/* HEADLINE */}
          <motion.h1
            className="text-white leading-none mb-6 sm:mb-10"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 7.5vw, 7rem)", fontWeight: 700, letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: "easeOut" }}
          >
            Find your home
            <br />
            <em style={{ fontWeight: 400, opacity: 0.9 }}>in Dubai.</em>
          </motion.h1>

          {/* ── SEARCH PANEL ── */}
          <motion.div
            ref={barRef}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
            onMouseDown={(e) => e.stopPropagation()}
            className="relative"
          >
            {/* ── TABS ── */}
            <div className="flex items-end flex-wrap gap-1">
              {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-4 sm:px-6 py-2.5 text-xs sm:text-[13px] font-semibold tracking-wide relative transition-all duration-200"
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      color: isActive ? "#111" : "rgba(255,255,255,0.85)",
                      backgroundColor: isActive ? "rgba(255,255,255,1)" : "rgba(0,0,0,0.45)",
                      backdropFilter: isActive ? "none" : "blur(10px)",
                      border: "1px solid",
                      borderColor: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)",
                      borderBottom: isActive ? "1px solid transparent" : undefined,
                      marginBottom: isActive ? "-1px" : "0",
                      zIndex: isActive ? 3 : 1,
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* ── SEARCH BAR ── */}
            <div
              className="flex flex-col md:flex-row md:items-stretch relative overflow-visible"
              style={{
                minHeight: 64,
                zIndex: 2,
                background: "rgba(255,255,255,0.09)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "0 16px 56px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.13)",
              }}
            >

              {/* ── 1. CITY ── */}
              <div className="relative flex-1 md:flex-initial md:shrink-0 min-w-0">
                <button
                  onClick={() => toggle("city")}
                  className="w-full h-full min-h-16 px-4 flex flex-col justify-center hover:bg-white/5 transition-colors"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  <span className="text-[11px] text-white/60 leading-none mb-0.5">City</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] text-white font-medium">{city}</span>
                    <Chevron open={openDropdown === "city"} />
                  </div>
                </button>

                <AnimatePresence>
                  {openDropdown === "city" && (
                    <motion.ul
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="absolute top-[calc(100%+6px)] left-0 w-full min-w-50 overflow-y-auto max-h-64 list-none m-0 p-0"
                      style={{ background: "rgba(12,12,12,0.97)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", boxShadow: "0 16px 48px rgba(0,0,0,0.5)", zIndex: 9999 }}
                    >
                      {CITIES.map((c) => (
                        <li key={c}>
                          <button
                            onClick={() => { setCity(c); setOpenDropdown(null); }}
                            className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-white/10 transition-colors ${city === c ? "text-white font-semibold" : "text-white/75"}`}
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                          >{c}</button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden md:block"><VDivider /></div>

              {/* ── 2. LOCATION ── */}
              <div className="relative flex-1 flex flex-col justify-center min-w-0 px-4 min-h-16">
                <span className="text-[11px] text-white/60 leading-none mb-0.5" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Location</span>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => { setShowSuggestions(true); setOpenDropdown(null); }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 160)}
                  placeholder="Enter Neighborhood or Building"
                  className="bg-transparent text-white text-[13px] placeholder-white/45 focus:outline-none leading-none w-full"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                />
                <AnimatePresence>
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.16 }}
                      className="absolute top-[calc(100%+6px)] left-0 right-0 overflow-hidden"
                      style={{ background: "rgba(12,12,12,0.97)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", boxShadow: "0 16px 48px rgba(0,0,0,0.5)", zIndex: 9999 }}
                    >
                      {filteredSuggestions.map((s) => (
                        <button
                          key={s}
                          onMouseDown={() => { setLocation(s); setShowSuggestions(false); }}
                          className="w-full text-left px-4 py-3 text-sm text-white/75 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3"
                          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                        >
                          <svg className="w-3.5 h-3.5 text-white/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {s}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden md:block"><VDivider /></div>

              {/* ── 3. PROPERTY TYPE ── */}
              <div className="relative flex-1 md:flex-initial md:shrink-0 min-w-0">
                <button
                  onClick={() => toggle("type")}
                  className="w-full h-full min-h-16 px-4 flex flex-col justify-center hover:bg-white/5 transition-colors"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  <span className="text-[11px] text-white/60 leading-none mb-0.5">Property Type</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[13px] leading-none truncate ${isPlotsTab ? (plotType === PLOT_PROPERTY_TYPES[0] ? "text-white/55" : "text-white font-medium") : (propType === PROP_TYPE_MAP[activeSubTab][0] ? "text-white/55" : "text-white font-medium")}`}>
                      {isPlotsTab ? plotType : propType}
                    </span>
                    <Chevron open={openDropdown === "type"} />
                  </div>
                </button>

                <AnimatePresence>
                  {openDropdown === "type" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="absolute top-[calc(100%+6px)] left-0 w-full min-w-60 max-w-xs"
                      style={{ background: "rgba(12,12,12,0.97)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", boxShadow: "0 16px 48px rgba(0,0,0,0.5)", zIndex: 9999 }}
                    >
                      {isPlotsTab ? (
                        // Plots: flat list
                        <ul className="list-none m-0 p-0">
                          {PLOT_PROPERTY_TYPES.map((opt) => (
                            <li key={opt}>
                              <button
                                onClick={() => { setPlotType(opt); setOpenDropdown(null); }}
                                className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-white/10 transition-colors ${plotType === opt ? "text-white font-semibold" : "text-white/75"}`}
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                              >{opt}</button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        // Non-Plots: sub-tabs then list
                        <>
                          {/* Sub-tab row */}
                          <div className="flex border-b border-white/10 overflow-x-auto">
                            {SUB_TABS.map((sub) => (
                              <button
                                key={sub}
                                onClick={() => setActiveSubTab(sub)}
                                className="flex-1 py-2.5 px-2 text-[10px] sm:text-[11px] font-semibold transition-colors whitespace-nowrap"
                                style={{
                                  fontFamily: "var(--font-dm-sans), sans-serif",
                                  color: activeSubTab === sub ? "#fff" : "rgba(255,255,255,0.5)",
                                  borderBottom: activeSubTab === sub ? "2px solid rgba(255,255,255,0.7)" : "2px solid transparent",
                                  background: "transparent",
                                }}
                              >{sub}</button>
                            ))}
                          </div>
                          <ul className="list-none m-0 p-0 overflow-y-auto max-h-52">
                            {PROP_TYPE_MAP[activeSubTab].map((opt) => (
                              <li key={opt}>
                                <button
                                  onClick={() => { setPropType(opt); setOpenDropdown(null); }}
                                  className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-white/10 transition-colors ${propType === opt ? "text-white font-semibold" : "text-white/75"}`}
                                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                >{opt}</button>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden lg:block"><VDivider /></div>

              {/* ── 4. PRICE RANGE ── */}
              <div className="relative flex-1 md:flex-initial md:shrink-0 min-w-0">
                <button
                  onClick={() => toggle("price")}
                  className="w-full h-full min-h-16 px-4 flex flex-col justify-center hover:bg-white/5 transition-colors"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  <span className="text-[11px] text-white/60 leading-none mb-0.5">Price Range</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[13px] leading-none truncate ${priceDisplay === "Any" ? "text-white/55" : "text-white font-medium"}`}>{priceDisplay}</span>
                    <Chevron open={openDropdown === "price"} />
                  </div>
                </button>

                <AnimatePresence>
                  {openDropdown === "price" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="absolute top-[calc(100%+6px)] left-0 p-4 w-full min-w-60 max-w-xs"
                      style={{ background: "rgba(12,12,12,0.97)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", boxShadow: "0 16px 48px rgba(0,0,0,0.5)", zIndex: 9999 }}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <p className="text-[11px] text-white/60 mb-1.5" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Min</p>
                          <input type="number" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} placeholder="Min"
                            className="w-full px-3 py-2 text-[13px] text-white bg-transparent outline-none placeholder-white/35"
                            style={{ border: "1px solid rgba(255,255,255,0.2)", fontFamily: "var(--font-dm-sans), sans-serif" }} />
                        </div>
                        <span className="text-white/40 mt-4">–</span>
                        <div className="flex-1">
                          <p className="text-[11px] text-white/60 mb-1.5" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Max</p>
                          <input type="number" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} placeholder="Max"
                            className="w-full px-3 py-2 text-[13px] text-white bg-transparent outline-none placeholder-white/35"
                            style={{ border: "1px solid rgba(255,255,255,0.2)", fontFamily: "var(--font-dm-sans), sans-serif" }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── 5. BEDS — hidden on Plots ── */}
              {!isPlotsTab && (
                <>
                  <div className="hidden lg:block"><VDivider /></div>
                  <div className="relative flex-1 md:flex-initial md:shrink-0 min-w-0">
                    <button
                      onClick={() => toggle("beds")}
                      className="w-full h-full min-h-16 px-4 flex flex-col justify-center hover:bg-white/5 transition-colors"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                      <span className="text-[11px] text-white/60 leading-none mb-0.5">Beds</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[13px] leading-none truncate ${bedsDisplay === "Any" ? "text-white/55" : "text-white font-medium"}`}>{bedsDisplay}</span>
                        <Chevron open={openDropdown === "beds"} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {openDropdown === "beds" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.16, ease: "easeOut" }}
                          className="absolute top-[calc(100%+6px)] left-0 right-0 lg:right-auto p-4 w-full lg:w-80"
                          style={{ background: "rgba(12,12,12,0.97)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", boxShadow: "0 16px 48px rgba(0,0,0,0.5)", zIndex: 9999 }}
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              <p className="text-[11px] text-white/60 mb-1.5" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Minimum Bedrooms</p>
                              <select value={bedsMin} onChange={(e) => setBedsMin(e.target.value)}
                                className="w-full px-3 py-2 text-[13px] text-white bg-transparent outline-none cursor-pointer"
                                style={{ border: "1px solid rgba(255,255,255,0.2)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                <option value="" style={{ background: "#111" }}>Studio</option>
                                {BEDS_MIN.map((b) => <option key={b} value={b} style={{ background: "#111" }}>{b === "12+" ? "12+ Bedrooms" : `${b} Bedroom${b === "1" ? "" : "s"}`}</option>)}
                              </select>
                            </div>
                            <span className="text-white/40 mt-6">–</span>
                            <div className="flex-1">
                              <p className="text-[11px] text-white/60 mb-1.5" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Maximum Bedrooms</p>
                              <select value={bedsMax} onChange={(e) => setBedsMax(e.target.value)}
                                className="w-full px-3 py-2 text-[13px] text-white bg-transparent outline-none cursor-pointer"
                                style={{ border: "1px solid rgba(255,255,255,0.2)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                <option value="" style={{ background: "#111" }}>12+ Bedrooms</option>
                                {BEDS_MAX.map((b) => <option key={b} value={b} style={{ background: "#111" }}>{b === "12+ Bedrooms" ? "12+ Bedrooms" : b === "Studio" ? "Studio" : `${b} Bedroom${b === "1" ? "" : "s"}`}</option>)}
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}

              <div className="hidden md:block"><VDivider /></div>

              {/* ── 6. MORE ── */}
              <div className="relative flex-1 md:flex-initial md:shrink-0 min-w-0">
                <button
                  onClick={() => toggle("more")}
                  className="w-full h-full min-h-16 px-4 flex flex-col justify-center hover:bg-white/5 transition-colors"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  <span className="text-[11px] text-white/60 leading-none mb-0.5">More</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[13px] leading-none ${moreCount > 0 ? "text-white font-medium" : "text-white/55"}`}>
                      {moreCount > 0 ? `${moreCount} filter${moreCount > 1 ? "s" : ""}` : "Filters"}
                    </span>
                    <Chevron open={openDropdown === "more"} />
                  </div>
                </button>

                <AnimatePresence>
                  {openDropdown === "more" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="absolute top-[calc(100%+6px)] right-0 left-0 md:left-auto w-full md:w-120"
                      style={{ background: "rgba(12,12,12,0.97)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", boxShadow: "0 16px 48px rgba(0,0,0,0.5)", zIndex: 9999 }}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <div className="p-5">
                        <p className="text-[12px] text-white/60 uppercase tracking-wide mb-3" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Completion Status</p>
                        <div className="flex gap-5 mb-5">
                          {["All", "Ready", "Off-Plan"].map((s) => (
                            <label key={s} className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" name="completion" value={s} checked={completionStatus === s}
                                onChange={() => setCompletionStatus(s)} className="w-4 h-4 cursor-pointer accent-white" />
                              <span className="text-[13px] text-white/80" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{s}</span>
                            </label>
                          ))}
                        </div>
                        <p className="text-[12px] text-white/60 uppercase tracking-wide mb-3" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Amenities</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
                          {AMENITIES.map((a) => (
                            <label key={a} className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" checked={amenities.includes(a)} onChange={() => toggleAmenity(a)}
                                className="w-4 h-4 cursor-pointer accent-white" />
                              <span className="text-[13px] text-white/80" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{a}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="px-5 pb-5">
                        <motion.button
                          onClick={() => setOpenDropdown(null)}
                          whileHover={{ backgroundColor: "#2a2a2a" }}
                          whileTap={{ scale: 0.97 }}
                          className="w-full py-2.5 text-white text-[13px] font-semibold tracking-widest uppercase relative overflow-hidden"
                          style={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.18)", fontFamily: "var(--font-dm-sans), sans-serif" }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
                          Apply Filters
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── 7. SEARCH BUTTON ── */}
              <motion.button
                whileHover={{ backgroundColor: "#2a2a2a" }}
                whileTap={{ scale: 0.97 }}
                className="w-full md:w-auto h-full min-h-16 px-8 text-white text-[13px] font-semibold tracking-widest uppercase flex items-center justify-center gap-2.5 relative overflow-hidden"
                style={{ backgroundColor: "#111", fontFamily: "var(--font-dm-sans), sans-serif", borderLeft: "1px solid rgba(255,255,255,0.12)" }}
                transition={{ duration: 0.2 }}
              >
                <span className="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
                Search
              </motion.button>
            </div>
          </motion.div>

          {/* STATS ROW */}
          <motion.div
            className="mt-4 sm:mt-5 flex flex-wrap items-center text-white/70 text-xs sm:text-[13px]"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            {["4,000+ listings", "400+ agents", "Serving 80+ countries"].map((item, i) => (
              <span key={item} className="flex items-center">
                {i > 0 && <span className="mx-2 sm:mx-2.5 text-white/35">·</span>}
                {item}
              </span>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}