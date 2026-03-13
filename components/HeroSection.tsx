"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// ── Data ───────────────────────────────────────────────────────────
const TABS = ["Buy", "Rent", "Off Plan", "Plots"] as const;
type Tab = (typeof TABS)[number];

const CITIES = [
  "Dubai", "Abu Dhabi", "All Cities (UAE)", "Ras al Khaimah",
  "Sharjah", "Fujairah", "Ajman", "Umm al Quwain", "Al Ain",
];

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

const SUB_TABS = ["Residential", "Commercial", "Land", "Multiple Units"] as const;
type SubTab = (typeof SUB_TABS)[number];

const PROP_TYPE_MAP: Record<SubTab, string[]> = {
  "Residential":    PROPERTY_TYPES_RESIDENTIAL,
  "Commercial":     PROPERTY_TYPES_COMMERCIAL,
  "Land":           PROPERTY_TYPES_LAND,
  "Multiple Units": PROPERTY_TYPES_MULTIPLE,
};

const PLOT_PROPERTY_TYPES = ["Commercial", "Residential", "Industrial", "Mix use"];
const PROPERTY_CATEGORIES = ["Residential", "Commercial", "Industrial", "Mixed Use"] as const;
type PropertyCategory = (typeof PROPERTY_CATEGORIES)[number];

const CATEGORY_TO_SUBTAB: Record<PropertyCategory, SubTab> = {
  "Residential": "Residential",
  "Commercial": "Commercial",
  "Industrial": "Land",
  "Mixed Use": "Multiple Units",
};

const AMENITIES = [
  "Maids Room", "Study", "Central A/C & Heating", "Concierge Service",
  "Balcony", "Private Garden", "Private Pool", "Private Gym",
  "Private Jacuzzi", "Shared Pool", "Shared Spa", "Shared Gym",
];

const SUGGESTIONS = [
  "Dubai Marina", "Downtown Dubai", "Palm Jumeirah", "Business Bay",
  "Jumeirah Village Circle", "Arabian Ranches",
  "Jumeirah Lake Towers", "Dubai Hills Estate",
];

// ── Helpers ────────────────────────────────────────────────────────
const Chevron = ({ open }: { open: boolean }) => (
  <svg
    style={{
      width: 10, height: 10, flexShrink: 0,
      color: "rgba(255,255,255,0.5)",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.2s ease",
    }}
    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
  >
    <path strokeLinecap="round" d="M6 9l6 6 6-6" />
  </svg>
);

const VDivider = () => <div className="w-px bg-white/10 my-3.5 shrink-0" />;

const labelStyle: React.CSSProperties = {
  fontSize: 9,
  color: "rgba(255,255,255,0.55)",
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  display: "block",
  marginBottom: 3,
  whiteSpace: "nowrap",
  fontFamily: "var(--font-dm-sans), sans-serif",
};

const valueStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#ffffff",
  fontWeight: 500,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontFamily: "var(--font-dm-sans), sans-serif",
  lineHeight: 1.2,
};

const dropdownPanelStyle: React.CSSProperties = {
  background: "rgba(12,12,12,0.97)",
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(16px)",
  boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
  zIndex: 9999,
};

// ── Main Component ─────────────────────────────────────────────────
export default function HeroSection() {
  const router = useRouter();
  const [activeTab, setActiveTab]               = useState<Tab>("Buy");
  const [city, setCity]                         = useState("Dubai");
  const [location, setLocation]                 = useState("");
  const [category, setCategory]                 = useState<PropertyCategory>("Residential");
  const [activeSubTab, setActiveSubTab]         = useState<SubTab>("Residential");
  const [propType, setPropType]                 = useState("All in Residential");
  const [plotType, setPlotType]                 = useState("Commercial");
  const [priceMin, setPriceMin]                 = useState("");
  const [priceMax, setPriceMax]                 = useState("");
  const [bedsMin, setBedsMin]                   = useState("");
  const [bedsMax, setBedsMax]                   = useState("");
  const [completionStatus, setCompletionStatus] = useState("All");
  const [amenities, setAmenities]               = useState<string[]>([]);
  const [openDropdown, setOpenDropdown]         = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions]   = useState(false);
  const [videoLoaded, setVideoLoaded]           = useState(false);
  const [isMobile, setIsMobile]                 = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef   = useRef<HTMLDivElement>(null);
  const isPlotsTab = activeTab === "Plots";

  useEffect(() => { videoRef.current?.play().catch(() => {}); }, []);

  useEffect(() => {
    setActiveSubTab("Residential");
    setPropType("All in Residential");
    setPlotType("Commercial");
    setBedsMin(""); setBedsMax("");
    setPriceMin(""); setPriceMax("");
  }, [activeTab]);

  useEffect(() => {
    setPropType(PROP_TYPE_MAP[activeSubTab][0]);
  }, [activeSubTab]);

  const applyCategory = (nextCategory: PropertyCategory) => {
    setCategory(nextCategory);
    if (!isPlotsTab) {
      setActiveSubTab(CATEGORY_TO_SUBTAB[nextCategory]);
    }
    setOpenDropdown(null);
  };

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node))
        setOpenDropdown(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const toggle = (name: string) =>
    setOpenDropdown((prev) => (prev === name ? null : name));

  const toggleAmenity = (a: string) =>
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );

  const filteredSuggestions = SUGGESTIONS.filter((s) =>
    location.length > 0 && s.toLowerCase().includes(location.toLowerCase())
  );

  const runSearch = () => {
    const params = new URLSearchParams();
    params.set("tab", activeTab.toLowerCase().replace(/\s+/g, "-"));
    params.set("city", city);
    if (location) params.set("location", location);
    params.set("category", category);
    params.set("propertyType", isPlotsTab ? plotType : propType);
    if (priceMin) params.set("priceMin", priceMin);
    if (priceMax) params.set("priceMax", priceMax);
    if (!isPlotsTab && bedsMin) params.set("bedsMin", bedsMin);
    if (!isPlotsTab && bedsMax) params.set("bedsMax", bedsMax);
    router.push(`/properties?${params.toString()}`);
  };

  const priceDisplay = priceMin || priceMax ? `${priceMin || "0"}–${priceMax || "Any"}` : "Any";
  const bedsDisplay  = bedsMin  || bedsMax  ? `${bedsMin  || "0"}–${bedsMax  || "Any"}` : "Any";
  const moreCount    = (completionStatus !== "All" ? 1 : 0) + amenities.length;

  return (
    <section
      className="hero-section relative w-full overflow-visible"
      style={{ height: "100svh", minHeight: 680, zIndex: 1 }}
    >
      {/* ── VIDEO BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=90')" }} />
        <video
          ref={videoRef} autoPlay muted loop playsInline
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
          src="https://videos.pexels.com/video-files/8534528/8534528-hd_1920_1080_25fps.mp4"
        />
      </div>

      {/* ── GRADIENT OVERLAY ── */}
      <div className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(165deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.62) 78%, rgba(0,0,0,0.76) 100%)" }} />

      {/* ── CONTENT ── */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end overflow-visible">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 pb-8 sm:pb-16 lg:pb-24">

          {/* HEADLINE */}
          <motion.h1
            className="text-white leading-none mb-6 sm:mb-10"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 7.5vw, 7rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              textShadow: "0 2px 16px rgba(0,0,0,0.5)",
            }}
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
            style={{ position: "relative" }}
          >

            {/* ════════════════════════
                MOBILE LAYOUT
            ════════════════════════ */}
            {isMobile && (
              <div>

                {/* TABS */}
                <div style={{
                  display: "flex", gap: 8, marginBottom: 8,
                  overflowX: "auto", scrollbarWidth: "none",
                }}>
                  {TABS.map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                      <button key={tab} onClick={() => setActiveTab(tab)} style={{
                        padding: "7px 18px",
                        borderRadius: 999,
                        border: `1px solid ${isActive ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.22)"}`,
                        background: isActive ? "rgba(255,255,255,0.18)" : "transparent",
                        color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                        fontSize: 13,
                        fontWeight: isActive ? 600 : 500,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        cursor: "pointer",
                        fontFamily: "var(--font-dm-sans), sans-serif",
                      }}>{tab}</button>
                    );
                  })}
                </div>

                {/* SEARCH BOX */}
                <div style={{
                  background: "rgba(255,255,255,0.09)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 16,
                  overflow: "visible",  // ← must be visible so dropdowns aren't clipped
                  position: "relative",
                  boxShadow: "0 16px 56px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.13)",
                }}>

                  {/* ROW 1: CITY | CATEGORY — equal halves */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid rgba(255,255,255,0.08)", position: "relative", zIndex: 30, overflow: "visible" }}>

                    {/* CITY */}
                    <div style={{ position: "relative", borderRight: "1px solid rgba(255,255,255,0.08)", overflow: "visible", zIndex: openDropdown === "city" ? 50 : "auto" }}>
                      <button onClick={() => toggle("city")} style={{ width: "100%", minHeight: 48, padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                        <span style={labelStyle}>City</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={valueStyle}>{city}</span>
                          <Chevron open={openDropdown === "city"} />
                        </div>
                      </button>
                      <AnimatePresence>
                        {openDropdown === "city" && (
                          <motion.ul initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            style={{ ...dropdownPanelStyle, position: "absolute", top: "calc(100% + 4px)", left: 0, width: "200%", maxHeight: 240, overflowY: "auto", listStyle: "none", margin: 0, padding: 0 }}>
                            {CITIES.map((c) => (
                              <li key={c}>
                                <button onClick={() => { setCity(c); setOpenDropdown(null); }}
                                  style={{ width: "100%", textAlign: "left", padding: "10px 16px", fontSize: 13, color: city === c ? "#fff" : "rgba(255,255,255,0.7)", fontWeight: city === c ? 600 : 400, background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif" }}
                                >{c}</button>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* CATEGORY */}
                    <div style={{ position: "relative", overflow: "visible", zIndex: openDropdown === "category" ? 50 : "auto" }}>
                      <button onClick={() => toggle("category")} style={{ width: "100%", minHeight: 48, padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                        <span style={labelStyle}>Category</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={valueStyle}>{category}</span>
                          <Chevron open={openDropdown === "category"} />
                        </div>
                      </button>
                      <AnimatePresence>
                        {openDropdown === "category" && (
                          <motion.ul initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            style={{ ...dropdownPanelStyle, position: "absolute", top: "calc(100% + 4px)", right: 0, width: "200%", listStyle: "none", margin: 0, padding: 0 }}>
                            {PROPERTY_CATEGORIES.map((opt) => (
                              <li key={opt}>
                                <button onClick={() => applyCategory(opt)}
                                  style={{ width: "100%", textAlign: "left", padding: "10px 16px", fontSize: 13, color: category === opt ? "#fff" : "rgba(255,255,255,0.7)", fontWeight: category === opt ? 600 : 400, background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif" }}
                                >{opt}</button>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* ROW 2: PROP TYPE | PRICE | BEDS (3 equal cols, or 2 if Plots) */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: isPlotsTab ? "1fr 1fr" : "1fr 1fr 1fr",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    position: "relative", zIndex: 20, overflow: "visible",
                  }}>

                    {/* PROPERTY TYPE */}
                    <div style={{ position: "relative", borderRight: "1px solid rgba(255,255,255,0.08)", overflow: "visible", zIndex: openDropdown === "type" ? 50 : "auto" }}>
                      <button onClick={() => toggle("type")} style={{ width: "100%", minHeight: 48, padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                        <span style={labelStyle}>Prop. Type</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ ...valueStyle, fontSize: 12 }}>
                            {isPlotsTab ? plotType : propType.replace("All in ", "")}
                          </span>
                          <Chevron open={openDropdown === "type"} />
                        </div>
                      </button>
                      <AnimatePresence>
                        {openDropdown === "type" && (
                          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            style={{ ...dropdownPanelStyle, position: "absolute", top: "calc(100% + 4px)", left: 0, width: "min(280px, 90vw)" }}>
                            {isPlotsTab ? (
                              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                                {PLOT_PROPERTY_TYPES.map((opt) => (
                                  <li key={opt}>
                                    <button onClick={() => { setPlotType(opt); setOpenDropdown(null); }}
                                      style={{ width: "100%", textAlign: "left", padding: "10px 16px", fontSize: 13, color: plotType === opt ? "#fff" : "rgba(255,255,255,0.7)", fontWeight: plotType === opt ? 600 : 400, background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif" }}
                                    >{opt}</button>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <>
                                <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.1)", overflowX: "auto" }}>
                                  {SUB_TABS.map((sub) => (
                                    <button key={sub} onClick={() => setActiveSubTab(sub)}
                                      style={{ flex: 1, padding: "9px 6px", fontSize: 10, fontWeight: 600, whiteSpace: "nowrap", color: activeSubTab === sub ? "#fff" : "rgba(255,255,255,0.45)", borderBottom: activeSubTab === sub ? "2px solid rgba(255,255,255,0.7)" : "2px solid transparent", background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif" }}
                                    >{sub}</button>
                                  ))}
                                </div>
                                <ul style={{ listStyle: "none", margin: 0, padding: 0, maxHeight: 200, overflowY: "auto" }}>
                                  {PROP_TYPE_MAP[activeSubTab].map((opt) => (
                                    <li key={opt}>
                                      <button onClick={() => { setPropType(opt); setOpenDropdown(null); }}
                                        style={{ width: "100%", textAlign: "left", padding: "10px 16px", fontSize: 13, color: propType === opt ? "#fff" : "rgba(255,255,255,0.7)", fontWeight: propType === opt ? 600 : 400, background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif" }}
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

                    {/* PRICE RANGE */}
                    <div style={{ position: "relative", borderRight: isPlotsTab ? undefined : "1px solid rgba(255,255,255,0.08)", overflow: "visible", zIndex: openDropdown === "price" ? 50 : "auto" }}>
                      <button onClick={() => toggle("price")} style={{ width: "100%", minHeight: 48, padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                        <span style={labelStyle}>Price</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ ...valueStyle, fontSize: 12, color: priceDisplay === "Any" ? "rgba(255,255,255,0.45)" : "#fff" }}>{priceDisplay}</span>
                          <Chevron open={openDropdown === "price"} />
                        </div>
                      </button>
                      <AnimatePresence>
                        {openDropdown === "price" && (
                          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            style={{ ...dropdownPanelStyle, position: "absolute", top: "calc(100% + 4px)", right: 0, width: "min(260px, 90vw)" }}
                            onMouseDown={(e) => e.stopPropagation()}>
                            <div style={{ padding: 16, display: "flex", gap: 10, alignItems: "flex-end" }}>
                              <div style={{ flex: 1 }}>
                                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 6, fontFamily: "var(--font-dm-sans), sans-serif" }}>Min (AED)</p>
                                <input type="number" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} placeholder="0"
                                  style={{ width: "100%", padding: "8px 10px", fontSize: 13, color: "#fff", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 4, outline: "none", fontFamily: "var(--font-dm-sans), sans-serif" }} />
                              </div>
                              <span style={{ color: "rgba(255,255,255,0.4)", paddingBottom: 8, flexShrink: 0 }}>–</span>
                              <div style={{ flex: 1 }}>
                                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 6, fontFamily: "var(--font-dm-sans), sans-serif" }}>Max (AED)</p>
                                <input type="number" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} placeholder="Any"
                                  style={{ width: "100%", padding: "8px 10px", fontSize: 13, color: "#fff", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 4, outline: "none", fontFamily: "var(--font-dm-sans), sans-serif" }} />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* BEDS — hidden on Plots */}
                    {!isPlotsTab && (
                      <div style={{ position: "relative", overflow: "visible", zIndex: openDropdown === "beds" ? 50 : "auto" }}>
                        <button onClick={() => toggle("beds")} style={{ width: "100%", minHeight: 48, padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                          <span style={labelStyle}>Beds</span>
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <span style={{ ...valueStyle, fontSize: 12, color: bedsDisplay === "Any" ? "rgba(255,255,255,0.45)" : "#fff" }}>{bedsDisplay}</span>
                            <Chevron open={openDropdown === "beds"} />
                          </div>
                        </button>
                        <AnimatePresence>
                          {openDropdown === "beds" && (
                            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                              style={{ ...dropdownPanelStyle, position: "absolute", top: "calc(100% + 4px)", right: 0, width: "min(260px, 90vw)" }}
                              onMouseDown={(e) => e.stopPropagation()}>
                              <div style={{ padding: 16, display: "flex", gap: 10, alignItems: "flex-end" }}>
                                <div style={{ flex: 1 }}>
                                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 6, fontFamily: "var(--font-dm-sans), sans-serif" }}>Min Beds</p>
                                  <input type="number" inputMode="numeric" min={0} step={1} value={bedsMin} onChange={(e) => setBedsMin(e.target.value)} placeholder="0"
                                    style={{ width: "100%", padding: "8px 10px", fontSize: 13, color: "#fff", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 4, outline: "none", fontFamily: "var(--font-dm-sans), sans-serif" }} />
                                </div>
                                <span style={{ color: "rgba(255,255,255,0.4)", paddingBottom: 8, flexShrink: 0 }}>–</span>
                                <div style={{ flex: 1 }}>
                                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 6, fontFamily: "var(--font-dm-sans), sans-serif" }}>Max Beds</p>
                                  <input type="number" inputMode="numeric" min={0} step={1} value={bedsMax} onChange={(e) => setBedsMax(e.target.value)} placeholder="Any"
                                    style={{ width: "100%", padding: "8px 10px", fontSize: 13, color: "#fff", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 4, outline: "none", fontFamily: "var(--font-dm-sans), sans-serif" }} />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>

                  {/* ROW 3: SEARCH BUTTON — full width, matches row background */}
                  <motion.button
                    onClick={runSearch}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: "100%", height: 44,
                      background: "transparent",
                      color: "#ffffff",
                      border: "none",
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "0 0 16px 16px",
                      fontSize: 13, fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      cursor: "pointer",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      position: "relative", zIndex: 10,
                    }}
                    transition={{ duration: 0.15 }}
                  >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                      style={{ width: 15, height: 15, color: "#ffffff", flexShrink: 0 }}>
                      <circle cx="11" cy="11" r="8" />
                      <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                    </svg>
                    <span style={{ color: "#ffffff" }}>Search</span>
                  </motion.button>

                </div>
              </div>
            )}

            {/* ════════════════════════
                DESKTOP LAYOUT
            ════════════════════════ */}
            {!isMobile && (
              <>
                {/* TABS */}
                <div className="flex items-end gap-1">
                  {TABS.map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                      <button key={tab} onClick={() => setActiveTab(tab)} style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        padding: "10px 24px", fontSize: 13, fontWeight: 600,
                        letterSpacing: "0.02em",
                        color: isActive ? "#111" : "rgba(255,255,255,0.85)",
                        backgroundColor: isActive ? "rgba(255,255,255,1)" : "rgba(0,0,0,0.45)",
                        backdropFilter: isActive ? "none" : "blur(10px)",
                        border: "1px solid",
                        borderColor: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)",
                        borderBottom: isActive ? "1px solid transparent" : undefined,
                        marginBottom: isActive ? "-1px" : "0",
                        zIndex: isActive ? 3 : 1,
                        position: "relative", cursor: "pointer", whiteSpace: "nowrap",
                      }}>{tab}</button>
                    );
                  })}
                </div>

                {/* SEARCH BAR */}
                <div className="flex items-stretch relative overflow-visible" style={{
                  minHeight: 64, zIndex: 2,
                  background: "rgba(255,255,255,0.09)",
                  backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow: "0 16px 56px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.13)",
                }}>

                  {/* CITY */}
                  <div className="relative flex-1 min-w-0">
                    <button onClick={() => toggle("city")} className="w-full h-full min-h-16 px-5 flex flex-col justify-center hover:bg-white/5 transition-colors" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      <span style={labelStyle}>City</span>
                      <div className="flex items-center gap-1.5"><span style={valueStyle}>{city}</span><Chevron open={openDropdown === "city"} /></div>
                    </button>
                    <AnimatePresence>
                      {openDropdown === "city" && (
                        <motion.ul initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.16 }}
                          className="absolute top-[calc(100%+6px)] left-0 w-full min-w-50 overflow-y-auto max-h-64 list-none m-0 p-0" style={dropdownPanelStyle}>
                          {CITIES.map((c) => (<li key={c}><button onClick={() => { setCity(c); setOpenDropdown(null); }} className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-white/10 transition-colors ${city === c ? "text-white font-semibold" : "text-white/75"}`} style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{c}</button></li>))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>

                  <VDivider />

                  {/* LOCATION */}
                  <div className="relative flex-1 flex flex-col justify-center min-w-0 px-5 min-h-16">
                    <span style={labelStyle}>Location</span>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                      onFocus={() => { setShowSuggestions(true); setOpenDropdown(null); }}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 160)}
                      placeholder="Neighbourhood or Building"
                      className="bg-transparent text-white text-[13px] placeholder-white/45 focus:outline-none leading-none w-full"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }} />
                    <AnimatePresence>
                      {showSuggestions && filteredSuggestions.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.16 }}
                          className="absolute top-[calc(100%+6px)] left-0 right-0 overflow-hidden" style={dropdownPanelStyle}>
                          {filteredSuggestions.map((s) => (
                            <button key={s} onMouseDown={() => { setLocation(s); setShowSuggestions(false); }}
                              className="w-full text-left px-4 py-3 text-sm text-white/75 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3"
                              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
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

                  <VDivider />

                  {/* CATEGORY */}
                  <div className="relative flex-1 min-w-0">
                    <button onClick={() => toggle("category")} className="w-full h-full min-h-16 px-5 flex flex-col justify-center hover:bg-white/5 transition-colors" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      <span style={labelStyle}>Category</span>
                      <div className="flex items-center gap-1.5"><span style={valueStyle}>{category}</span><Chevron open={openDropdown === "category"} /></div>
                    </button>
                    <AnimatePresence>
                      {openDropdown === "category" && (
                        <motion.ul initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.16 }}
                          className="absolute top-[calc(100%+6px)] left-0 w-full min-w-50 list-none m-0 p-0" style={dropdownPanelStyle}>
                          {PROPERTY_CATEGORIES.map((opt) => (<li key={opt}><button onClick={() => applyCategory(opt)} className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-white/10 transition-colors ${category === opt ? "text-white font-semibold" : "text-white/75"}`} style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{opt}</button></li>))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>

                  <VDivider />

                  {/* PROPERTY TYPE */}
                  <div className="relative flex-1 min-w-0">
                    <button onClick={() => toggle("type")} className="w-full h-full min-h-16 px-5 flex flex-col justify-center hover:bg-white/5 transition-colors" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      <span style={labelStyle}>Property Type</span>
                      <div className="flex items-center gap-1.5"><span style={valueStyle}>{isPlotsTab ? plotType : propType}</span><Chevron open={openDropdown === "type"} /></div>
                    </button>
                    <AnimatePresence>
                      {openDropdown === "type" && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.16 }}
                          className="absolute top-[calc(100%+6px)] left-0 w-full min-w-60 max-w-xs" style={dropdownPanelStyle}>
                          {isPlotsTab ? (
                            <ul className="list-none m-0 p-0">
                              {PLOT_PROPERTY_TYPES.map((opt) => (<li key={opt}><button onClick={() => { setPlotType(opt); setOpenDropdown(null); }} className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-white/10 transition-colors ${plotType === opt ? "text-white font-semibold" : "text-white/75"}`} style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{opt}</button></li>))}
                            </ul>
                          ) : (
                            <>
                              <div className="flex border-b border-white/10 overflow-x-auto">
                                {SUB_TABS.map((sub) => (<button key={sub} onClick={() => setActiveSubTab(sub)} className="flex-1 py-2.5 px-2 text-[11px] font-semibold transition-colors whitespace-nowrap" style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: activeSubTab === sub ? "#fff" : "rgba(255,255,255,0.5)", borderBottom: activeSubTab === sub ? "2px solid rgba(255,255,255,0.7)" : "2px solid transparent", background: "transparent" }}>{sub}</button>))}
                              </div>
                              <ul className="list-none m-0 p-0 overflow-y-auto max-h-52">
                                {PROP_TYPE_MAP[activeSubTab].map((opt) => (<li key={opt}><button onClick={() => { setPropType(opt); setOpenDropdown(null); }} className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-white/10 transition-colors ${propType === opt ? "text-white font-semibold" : "text-white/75"}`} style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{opt}</button></li>))}
                              </ul>
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <VDivider />

                  {/* PRICE RANGE */}
                  <div className="relative flex-1 min-w-0">
                    <button onClick={() => toggle("price")} className="w-full h-full min-h-16 px-5 flex flex-col justify-center hover:bg-white/5 transition-colors" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      <span style={labelStyle}>Price Range</span>
                      <div className="flex items-center gap-1.5"><span style={{ ...valueStyle, color: priceDisplay === "Any" ? "rgba(255,255,255,0.45)" : "#fff" }}>{priceDisplay}</span><Chevron open={openDropdown === "price"} /></div>
                    </button>
                    <AnimatePresence>
                      {openDropdown === "price" && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.16 }}
                          className="absolute top-[calc(100%+6px)] left-0 p-4 w-full min-w-60 max-w-xs" style={dropdownPanelStyle} onMouseDown={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-3">
                            <div className="flex-1"><p className="text-[11px] text-white/60 mb-1.5" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Min</p><input type="number" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} placeholder="Min" className="w-full px-3 py-2 text-[13px] text-white bg-transparent outline-none placeholder-white/35" style={{ border: "1px solid rgba(255,255,255,0.2)", fontFamily: "var(--font-dm-sans), sans-serif" }} /></div>
                            <span className="text-white/40 mt-4">–</span>
                            <div className="flex-1"><p className="text-[11px] text-white/60 mb-1.5" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Max</p><input type="number" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} placeholder="Max" className="w-full px-3 py-2 text-[13px] text-white bg-transparent outline-none placeholder-white/35" style={{ border: "1px solid rgba(255,255,255,0.2)", fontFamily: "var(--font-dm-sans), sans-serif" }} /></div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* BEDS */}
                  {!isPlotsTab && (
                    <>
                      <VDivider />
                      <div className="relative flex-1 min-w-0">
                        <button onClick={() => toggle("beds")} className="w-full h-full min-h-16 px-5 flex flex-col justify-center hover:bg-white/5 transition-colors" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                          <span style={labelStyle}>Beds</span>
                          <div className="flex items-center gap-1.5"><span style={{ ...valueStyle, color: bedsDisplay === "Any" ? "rgba(255,255,255,0.45)" : "#fff" }}>{bedsDisplay}</span><Chevron open={openDropdown === "beds"} /></div>
                        </button>
                        <AnimatePresence>
                          {openDropdown === "beds" && (
                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.16 }}
                              className="absolute top-[calc(100%+6px)] left-0 right-0 lg:right-auto p-4 w-full lg:w-72" style={dropdownPanelStyle} onMouseDown={(e) => e.stopPropagation()}>
                              <div className="flex items-start gap-3">
                                <div className="flex-1"><p className="text-[11px] text-white/60 mb-1.5" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Min Beds</p><input type="number" inputMode="numeric" min={0} step={1} value={bedsMin} onChange={(e) => setBedsMin(e.target.value)} placeholder="Min" className="w-full px-3 py-2 text-[13px] text-white bg-transparent outline-none placeholder-white/35" style={{ border: "1px solid rgba(255,255,255,0.2)", fontFamily: "var(--font-dm-sans), sans-serif" }} /></div>
                                <span className="text-white/40 mt-6">–</span>
                                <div className="flex-1"><p className="text-[11px] text-white/60 mb-1.5" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Max Beds</p><input type="number" inputMode="numeric" min={0} step={1} value={bedsMax} onChange={(e) => setBedsMax(e.target.value)} placeholder="Max" className="w-full px-3 py-2 text-[13px] text-white bg-transparent outline-none placeholder-white/35" style={{ border: "1px solid rgba(255,255,255,0.2)", fontFamily: "var(--font-dm-sans), sans-serif" }} /></div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  )}

                  <VDivider />

                  {/* MORE */}
                  <div className="relative shrink-0">
                    <button onClick={() => toggle("more")} className="w-full h-full min-h-16 px-5 flex flex-col justify-center hover:bg-white/5 transition-colors" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      <span style={labelStyle}>More</span>
                      <div className="flex items-center gap-1.5"><span style={{ ...valueStyle, color: moreCount > 0 ? "#fff" : "rgba(255,255,255,0.45)" }}>{moreCount > 0 ? `${moreCount} filter${moreCount > 1 ? "s" : ""}` : "Filters"}</span><Chevron open={openDropdown === "more"} /></div>
                    </button>
                    <AnimatePresence>
                      {openDropdown === "more" && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.16 }}
                          className="absolute top-[calc(100%+6px)] right-0 w-120" style={dropdownPanelStyle} onMouseDown={(e) => e.stopPropagation()}>
                          <div className="p-5">
                            <p className="text-[12px] text-white/60 uppercase tracking-wide mb-3" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Completion Status</p>
                            <div className="flex gap-5 mb-5">
                              {["All", "Ready", "Off-Plan"].map((s) => (
                                <label key={s} className="flex items-center gap-2 cursor-pointer">
                                  <input type="radio" name="completion" value={s} checked={completionStatus === s} onChange={() => setCompletionStatus(s)} className="w-4 h-4 cursor-pointer accent-white" />
                                  <span className="text-[13px] text-white/80" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{s}</span>
                                </label>
                              ))}
                            </div>
                            <p className="text-[12px] text-white/60 uppercase tracking-wide mb-3" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Amenities</p>
                            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                              {AMENITIES.map((a) => (
                                <label key={a} className="flex items-center gap-2 cursor-pointer">
                                  <input type="checkbox" checked={amenities.includes(a)} onChange={() => toggleAmenity(a)} className="w-4 h-4 cursor-pointer accent-white" />
                                  <span className="text-[13px] text-white/80" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{a}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                          <div className="px-5 pb-5">
                            <motion.button onClick={() => setOpenDropdown(null)} whileHover={{ backgroundColor: "#2a2a2a" }} whileTap={{ scale: 0.97 }}
                              className="w-full py-2.5 text-white text-[13px] font-semibold tracking-widest uppercase"
                              style={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.18)", fontFamily: "var(--font-dm-sans), sans-serif" }}
                              transition={{ duration: 0.2 }}>Apply Filters</motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* SEARCH BUTTON */}
                  <motion.button onClick={runSearch} whileHover={{ backgroundColor: "#2a2a2a" }} whileTap={{ scale: 0.97 }}
                    className="shrink-0 h-full min-h-16 px-8 uppercase flex items-center justify-center gap-2.5"
                    style={{ backgroundColor: "#111111", color: "#ffffff", borderLeft: "1px solid rgba(255,255,255,0.12)", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", fontFamily: "var(--font-dm-sans), sans-serif", whiteSpace: "nowrap" }}
                    transition={{ duration: 0.2 }}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ width: 15, height: 15, color: "#fff", flexShrink: 0 }}>
                      <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                    </svg>
                    <span>SEARCH</span>
                  </motion.button>

                </div>
              </>
            )}

          </motion.div>

          {/* STATS ROW */}
          <motion.div
            className="mt-4 sm:mt-5 flex flex-wrap items-center text-white/70 text-xs sm:text-[13px]"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
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