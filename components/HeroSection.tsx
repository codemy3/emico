"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data ───────────────────────────────────────────────────────────
const TABS = ["Buy", "Rent", "Off Plan"] as const;
type Tab = (typeof TABS)[number];

const PROPERTY_TYPES = ["Any Type", "Apartment", "Villa", "Penthouse", "Townhouse", "Commercial"];
const BED_OPTIONS    = ["Any", "Studio", "1", "2", "3", "4", "5+"];
const PRICE_RANGES   = [
  "Any Price",
  "Under AED 500K",
  "AED 500K – 1M",
  "AED 1M – 2M",
  "AED 2M – 5M",
  "AED 5M – 10M",
  "Above AED 10M",
];
const SUGGESTIONS = [
  "Dubai Marina",
  "Downtown Dubai",
  "Palm Jumeirah",
  "Business Bay",
  "Jumeirah Village Circle",
  "Arabian Ranches",
  "Jumeirah Lake Towers",
  "Dubai Hills Estate",
];

// ── Small helpers ──────────────────────────────────────────────────
const Chevron = ({ open }: { open: boolean }) => (
  <svg
    className="w-3 h-3 text-white/40 shrink-0"
    style={{
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.2s ease",
    }}
    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
  >
    <path strokeLinecap="round" d="M6 9l6 6 6-6" />
  </svg>
);

const VDivider = () => (
  <div className="w-px bg-white/10 my-3.5 shrink-0" />
);

// ── Reusable dropdown cell ─────────────────────────────────────────
function DropdownCell({
  label, value, options, open, onToggle, onSelect, formatLabel, menuWidth = "w-44",
}: {
  label: string;
  value: string;
  options: string[];
  open: boolean;
  onToggle: () => void;
  onSelect: (v: string) => void;
  formatLabel?: (v: string) => string;
  menuWidth?: string;
}) {
  const isDefault = value === options[0];
  const display   = formatLabel ? formatLabel(value) : value;

  return (
    <div className="relative h-full shrink-0">
      <button
        onClick={onToggle}
        className="h-full px-5 flex items-center gap-2 text-[13px] hover:bg-white/5 transition-colors duration-150 whitespace-nowrap"
        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
      >
        <span className={isDefault ? "text-white/45" : "text-white font-medium"}>
          {isDefault ? label : display}
        </span>
        <Chevron open={open} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={`absolute top-[calc(100%+6px)] left-0 ${menuWidth} z-50 overflow-hidden list-none m-0 p-0`}
            style={{
              background: "rgba(12,12,12,0.97)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            }}
          >
            {options.map((opt) => (
              <li key={opt}>
                <button
                  onClick={() => onSelect(opt)}
                  className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors duration-100 hover:bg-white/10 ${
                    value === opt ? "text-white font-semibold" : "text-white/65"
                  }`}
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  {formatLabel ? formatLabel(opt) : opt}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────
export default function HeroSection() {
  const [activeTab, setActiveTab]             = useState<Tab>("Buy");
  const [searchQuery, setSearchQuery]         = useState("");
  const [propType, setPropType]               = useState("Any Type");
  const [beds, setBeds]                       = useState("Any");
  const [price, setPrice]                     = useState("Any Price");
  const [openDropdown, setOpenDropdown]       = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [videoLoaded, setVideoLoaded]         = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  // Close dropdowns when clicking outside the bar
  useEffect(() => {
    const close = () => setOpenDropdown(null);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const toggle = (name: string) =>
    setOpenDropdown((prev) => (prev === name ? null : name));

  const formatBeds = (v: string) =>
    v === "Any" ? "Any Beds" : v === "Studio" ? "Studio" : `${v} Bed${v === "1" ? "" : "s"}`;

  const filteredSuggestions = SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: 680 }}
    >
      {/* ── VIDEO BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=90')",
          }}
        />
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          src="https://videos.pexels.com/video-files/8534528/8534528-hd_1920_1080_25fps.mp4"
        />
      </div>

      {/* ── GRADIENT OVERLAY ── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(165deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.62) 78%, rgba(0,0,0,0.76) 100%)",
        }}
      />

      {/* ── CONTENT ── */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 pb-16 lg:pb-24">

          {/* HEADLINE */}
          <motion.h1
            className="text-white leading-none mb-10"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 7.5vw, 7rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: "easeOut" }}
          >
            Find your home
            <br />
            <em style={{ fontWeight: 400, opacity: 0.82 }}>in Dubai.</em>
          </motion.h1>

          {/* ── SEARCH PANEL ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
            // Stop mousedown here so outside-click doesn't close dropdowns inside bar
            onMouseDown={(e) => e.stopPropagation()}
          >

            {/* ── TABS — sit flush on top of the bar ── */}
            <div className="flex items-end">
              {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-6 py-2.5 text-[13px] font-semibold tracking-wide relative transition-all duration-200"
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      color: isActive ? "#111" : "rgba(255,255,255,0.7)",
                      backgroundColor: isActive
                        ? "rgba(255,255,255,1)"
                        : "rgba(0,0,0,0.38)",
                      backdropFilter: isActive ? "none" : "blur(10px)",
                      border: "1px solid",
                      borderColor: isActive
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.14)",
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
              className="flex items-stretch relative"
              style={{
                height: 58,
                zIndex: 2,
                background: "rgba(255,255,255,0.09)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow:
                  "0 16px 56px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.13)",
              }}
            >

              {/* LOCATION */}
              <div className="relative flex-1 flex items-center min-w-0">
                <div className="absolute left-4 text-white/35 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => { setShowSuggestions(true); setOpenDropdown(null); }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 160)}
                  placeholder="Area, project or community…"
                  className="w-full h-full pl-10 pr-4 bg-transparent text-white text-sm placeholder-white/38 focus:outline-none"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                />

                {/* AUTOCOMPLETE */}
                <AnimatePresence>
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.16 }}
                      className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 overflow-hidden"
                      style={{
                        background: "rgba(12,12,12,0.97)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        backdropFilter: "blur(16px)",
                        boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                      }}
                    >
                      {filteredSuggestions.map((s) => (
                        <button
                          key={s}
                          onMouseDown={() => { setSearchQuery(s); setShowSuggestions(false); }}
                          className="w-full text-left px-4 py-3 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3"
                          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                        >
                          <svg className="w-3.5 h-3.5 text-white/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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

              {/* PROPERTY TYPE */}
              <DropdownCell
                label="Property Type"
                value={propType}
                options={PROPERTY_TYPES}
                open={openDropdown === "type"}
                onToggle={() => toggle("type")}
                onSelect={(v) => { setPropType(v); setOpenDropdown(null); }}
                menuWidth="w-48"
              />

              <VDivider />

              {/* BEDS */}
              <DropdownCell
                label="Beds"
                value={beds}
                options={BED_OPTIONS}
                open={openDropdown === "beds"}
                onToggle={() => toggle("beds")}
                onSelect={(v) => { setBeds(v); setOpenDropdown(null); }}
                formatLabel={formatBeds}
                menuWidth="w-40"
              />

              {/* PRICE — hidden on mobile */}
              <div className="hidden sm:flex items-stretch">
                <VDivider />
                <DropdownCell
                  label="Price Range"
                  value={price}
                  options={PRICE_RANGES}
                  open={openDropdown === "price"}
                  onToggle={() => toggle("price")}
                  onSelect={(v) => { setPrice(v); setOpenDropdown(null); }}
                  menuWidth="w-52"
                />
              </div>

              {/* SEARCH BUTTON */}
              <motion.button
                whileHover={{ backgroundColor: "#2a2a2a" }}
                whileTap={{ scale: 0.97 }}
                className="h-full px-8 text-white text-[13px] font-semibold tracking-widest uppercase flex items-center gap-2.5 shrink-0 relative overflow-hidden"
                style={{
                  backgroundColor: "#111",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  borderLeft: "1px solid rgba(255,255,255,0.12)",
                }}
                transition={{ duration: 0.2 }}
              >
                {/* top shimmer */}
                <span className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
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
            className="mt-5 flex flex-wrap items-center text-white/55 text-[13px]"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            {["4,000+ listings", "400+ agents", "Serving 80+ countries"].map((item, i) => (
              <span key={item} className="flex items-center">
                {i > 0 && <span className="mx-2.5 text-white/25">·</span>}
                {item}
              </span>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}