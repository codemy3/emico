"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X, ChevronDown, BedDouble, Bath, Maximize2, MapPin, ArrowUpRight, Building2, Home, Trees } from "lucide-react";

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
interface Property {
  id: string;
  title: string;
  developer: string;
  developerLogo: string;
  location: string;
  community: string;
  type: "Apartment" | "Villa" | "Townhouse" | "Penthouse" | "Studio";
  status: "Off-Plan" | "Ready" | "Under Construction";
  price: number;
  priceLabel: string;
  beds: number | "Studio";
  baths: number;
  size: number;
  image: string;
  featured?: boolean;
  completionYear?: number;
  roi?: string;
  tags?: string[];
}

/* ─────────────────────────────────────────
   SAMPLE DATA  (replace with real API/data)
───────────────────────────────────────── */
const PROPERTIES: Property[] = [
  { id: "p1",  title: "The Address Residences",       developer: "Emaar Properties",    developerLogo: "/developers/logos/emaar-logo.png",         location: "Downtown Dubai",    community: "Downtown Dubai",       type: "Apartment",  status: "Ready",              price: 2500000,  priceLabel: "AED 2,500,000",  beds: 2,       baths: 2, size: 1250, image: "/developers/downtown.jpeg",     featured: true,  roi: "6.2%",  tags: ["Burj Views", "High ROI"] },
  { id: "p2",  title: "Park Lane Villas",              developer: "Emaar Properties",    developerLogo: "/developers/logos/emaar-logo.png",         location: "Dubai Hills Estate",community: "Dubai Hills Estate",   type: "Villa",      status: "Off-Plan",           price: 3200000,  priceLabel: "AED 3,200,000",  beds: 4,       baths: 4, size: 3400, image: "/developers/dubaihills.jpeg",   featured: true,  completionYear: 2027, tags: ["Golf Views", "Gated"] },
  { id: "p3",  title: "Beach Vista",                   developer: "Emaar Properties",    developerLogo: "/developers/logos/emaar-logo.png",         location: "Emaar Beachfront",  community: "Emaar Beachfront",    type: "Apartment",  status: "Under Construction", price: 1800000,  priceLabel: "AED 1,800,000",  beds: 1,       baths: 1, size: 780,  image: "/developers/emaar.jpeg",        completionYear: 2026, tags: ["Sea Views", "Beach Access"] },
  { id: "p4",  title: "Trump Villas",                  developer: "DAMAC Properties",    developerLogo: "/developers/logos/damac-logo.png",         location: "DAMAC Hills",       community: "DAMAC Hills",         type: "Villa",      status: "Ready",              price: 2800000,  priceLabel: "AED 2,800,000",  beds: 4,       baths: 4, size: 3800, image: "/developers/damac.jpg",         featured: true,  roi: "5.8%", tags: ["Golf Club", "Gated"] },
  { id: "p5",  title: "Malta Cluster Townhouses",      developer: "DAMAC Properties",    developerLogo: "/developers/logos/damac-logo.png",         location: "DAMAC Lagoons",     community: "DAMAC Lagoons",       type: "Townhouse",  status: "Off-Plan",           price: 1600000,  priceLabel: "AED 1,600,000",  beds: 3,       baths: 3, size: 2200, image: "/developers/lagoos.jpg",        completionYear: 2027, tags: ["Lagoon", "Beach"] },
  { id: "p6",  title: "DAMAC Bay by Cavalli",          developer: "DAMAC Properties",    developerLogo: "/developers/logos/damac-logo.png",         location: "Dubai Harbour",     community: "Dubai Harbour",       type: "Apartment",  status: "Off-Plan",           price: 4500000,  priceLabel: "AED 4,500,000",  beds: 3,       baths: 3, size: 2100, image: "/developers/damac2.webp",       completionYear: 2026, tags: ["Cavalli Design", "Ultra Luxury"] },
  { id: "p7",  title: "Garden Homes – Palm Fronds",    developer: "Nakheel",             developerLogo: "/developers/logos/nakheel-logo.png",       location: "Palm Jumeirah",     community: "Palm Jumeirah",       type: "Villa",      status: "Ready",              price: 8000000,  priceLabel: "AED 8,000,000",  beds: 5,       baths: 5, size: 5500, image: "/developers/jvc.webp",          featured: true,  roi: "4.8%", tags: ["Private Beach", "Iconic"] },
  { id: "p8",  title: "Canal Residences",              developer: "Nakheel",             developerLogo: "/developers/logos/nakheel-logo.png",       location: "JVC",               community: "Jumeirah Village Circle", type: "Apartment", status: "Ready",             price: 650000,   priceLabel: "AED 650,000",    beds: 1,       baths: 1, size: 720,  image: "/developers/jvc.webp",          roi: "7.5%",  tags: ["High Yield", "Central"] },
  { id: "p9",  title: "Palm Jebel Ali – Frond Villa",  developer: "Nakheel",             developerLogo: "/developers/logos/nakheel-logo.png",       location: "Palm Jebel Ali",    community: "Palm Jebel Ali",      type: "Villa",      status: "Off-Plan",           price: 9500000,  priceLabel: "AED 9,500,000",  beds: 6,       baths: 6, size: 7200, image: "/developers/downtown.jpeg",     completionYear: 2028, tags: ["Beachfront", "Capital Growth"] },
  { id: "p10", title: "Forest Villas",                 developer: "Sobha Realty",        developerLogo: "/developers/logos/sobha-logo.png",         location: "MBR City",          community: "Sobha Hartland",      type: "Villa",      status: "Ready",              price: 5500000,  priceLabel: "AED 5,500,000",  beds: 5,       baths: 5, size: 5200, image: "/developers/sobha.jpeg",        roi: "5.1%",  tags: ["Canal View", "Greenery"] },
  { id: "p11", title: "Creek Vistas Heights",          developer: "Sobha Realty",        developerLogo: "/developers/logos/sobha-logo.png",         location: "MBR City",          community: "Sobha Hartland",      type: "Apartment",  status: "Off-Plan",           price: 1100000,  priceLabel: "AED 1,100,000",  beds: 2,       baths: 2, size: 1050, image: "/developers/soba2.webp",        completionYear: 2027, tags: ["Skyline Views", "Premium"] },
  { id: "p12", title: "Bugatti Residences",            developer: "Binghatti",           developerLogo: "/developers/logos/binghatti-logo.png",     location: "Business Bay",      community: "Business Bay",        type: "Penthouse",  status: "Off-Plan",           price: 52000000, priceLabel: "AED 52,000,000", beds: 5,       baths: 6, size: 14000,image: "/developers/dubaicreek.jpeg",   featured: true,  completionYear: 2026, tags: ["World First", "Ultra Luxury"] },
  { id: "p13", title: "Orchid – JVC",                  developer: "Binghatti",           developerLogo: "/developers/logos/binghatti-logo.png",     location: "JVC",               community: "Jumeirah Village Circle", type: "Apartment", status: "Ready",             price: 750000,   priceLabel: "AED 750,000",    beds: 1,       baths: 1, size: 820,  image: "/developers/jvc.webp",          roi: "7.2%",  tags: ["High ROI", "Ready"] },
  { id: "p14", title: "Oceanz",                        developer: "Danube",              developerLogo: "/developers/logos/danube-logo.png",        location: "Dubai Maritime City", community: "Dubai Maritime City", type: "Apartment", status: "Off-Plan",            price: 950000,   priceLabel: "AED 950,000",    beds: 2,       baths: 2, size: 1100, image: "/developers/dubaisportcity.webp", completionYear: 2027, tags: ["1% Payment", "Sea Views"] },
  { id: "p15", title: "Sportz",                        developer: "Danube",              developerLogo: "/developers/logos/danube-logo.png",        location: "Dubai Sports City", community: "Dubai Sports City",   type: "Apartment",  status: "Ready",              price: 600000,   priceLabel: "AED 600,000",    beds: "Studio", baths: 1, size: 490,  image: "/developers/dubaisportcity.webp", roi: "7.8%", tags: ["Affordable", "High Yield"] },
  { id: "p16", title: "Bluewaters Island Residences",  developer: "Meraas",              developerLogo: "/developers/logos/meraas-logo.svg",        location: "Bluewaters Island", community: "Bluewaters Island",   type: "Apartment",  status: "Ready",              price: 3000000,  priceLabel: "AED 3,000,000",  beds: 2,       baths: 2, size: 1400, image: "/developers/dubaihills.jpeg",   roi: "5.4%",  tags: ["Island Living", "Ain Dubai"] },
  { id: "p17", title: "City Walk Residences",          developer: "Meraas",              developerLogo: "/developers/logos/meraas-logo.svg",        location: "City Walk",         community: "City Walk",           type: "Apartment",  status: "Ready",              price: 2200000,  priceLabel: "AED 2,200,000",  beds: 2,       baths: 2, size: 1150, image: "/developers/arjan.jpg",         roi: "5.9%",  tags: ["Lifestyle", "Retail"] },
  { id: "p18", title: "Ellington House",               developer: "Ellington",           developerLogo: "/developers/logos/ellington-logo.png",     location: "Dubai Hills Estate",community: "Dubai Hills Estate",   type: "Apartment",  status: "Ready",              price: 1400000,  priceLabel: "AED 1,400,000",  beds: 1,       baths: 1, size: 870,  image: "/developers/meydan.jpg",        roi: "6.1%",  tags: ["Design-Led", "Boutique"] },
  { id: "p19", title: "The Crestmark",                 developer: "Ellington",           developerLogo: "/developers/logos/ellington-logo.png",     location: "Business Bay",      community: "Business Bay",        type: "Apartment",  status: "Off-Plan",           price: 1200000,  priceLabel: "AED 1,200,000",  beds: 1,       baths: 1, size: 740,  image: "/developers/mayden.jpg",        completionYear: 2026, tags: ["Canal View", "Art Interiors"] },
  { id: "p20", title: "Riviera Phase 4",               developer: "Azizi",               developerLogo: "/developers/logos/azizi-logo.png",         location: "Meydan",            community: "Azizi Riviera",       type: "Apartment",  status: "Ready",              price: 700000,   priceLabel: "AED 700,000",    beds: 1,       baths: 1, size: 650,  image: "/developers/azizi.jpeg",        roi: "7.0%",  tags: ["Crystal Lagoon", "Meydan"] },
  { id: "p21", title: "Venice Lagoon Residences",      developer: "Azizi",               developerLogo: "/developers/logos/azizi-logo.png",         location: "Dubai South",       community: "Azizi Venice",        type: "Apartment",  status: "Off-Plan",           price: 850000,   priceLabel: "AED 850,000",    beds: 2,       baths: 2, size: 1020, image: "/developers/azizivenice.webp",  completionYear: 2027, tags: ["Lagoon", "Expo City"] },
  { id: "p22", title: "6 Senses Residences",           developer: "Select Group",        developerLogo: "/developers/logos/select-logo.png",        location: "Palm Jumeirah",     community: "Palm Jumeirah",       type: "Penthouse",  status: "Off-Plan",           price: 18000000, priceLabel: "AED 18,000,000", beds: 4,       baths: 4, size: 6500, image: "/developers/dubaicreek.jpeg",   featured: true,  completionYear: 2027, tags: ["Wellness", "6 Senses"] },
  { id: "p23", title: "Marina Gate Tower 1",           developer: "Select Group",        developerLogo: "/developers/logos/select-logo.png",        location: "Dubai Marina",      community: "Dubai Marina",        type: "Apartment",  status: "Ready",              price: 1300000,  priceLabel: "AED 1,300,000",  beds: 1,       baths: 1, size: 840,  image: "/developers/al.jpg",            roi: "6.5%",  tags: ["Marina Views", "5-Star"] },
  { id: "p24", title: "Serenity Mansions",             developer: "Majid Al Futtaim",    developerLogo: "/developers/logos/maf-logo.png",           location: "Tilal Al Ghaf",     community: "Tilal Al Ghaf",       type: "Villa",      status: "Off-Plan",           price: 12000000, priceLabel: "AED 12,000,000", beds: 6,       baths: 6, size: 10000,image: "/developers/dubaihills.jpeg",   completionYear: 2028, tags: ["Lagoon Access", "Mansion"] },
  { id: "p25", title: "Aura Townhouses",               developer: "Majid Al Futtaim",    developerLogo: "/developers/logos/maf-logo.png",           location: "Tilal Al Ghaf",     community: "Tilal Al Ghaf",       type: "Townhouse",  status: "Ready",              price: 2500000,  priceLabel: "AED 2,500,000",  beds: 4,       baths: 4, size: 3200, image: "/developers/valley.jpg",        roi: "5.2%",  tags: ["Beach Access", "Family"] },
  { id: "p26", title: "JBR – The Residence",          developer: "Dubai Properties",    developerLogo: "/developers/logos/dubai-properties-logo.png", location: "JBR",            community: "Jumeirah Beach Res.", type: "Apartment",  status: "Ready",              price: 1800000,  priceLabel: "AED 1,800,000",  beds: 2,       baths: 2, size: 1350, image: "/developers/dubaisportcity.webp", roi: "6.3%", tags: ["Beachfront", "The Walk"] },
  { id: "p27", title: "La Rosa Townhouses",            developer: "Dubai Properties",    developerLogo: "/developers/logos/dubai-properties-logo.png", location: "Villanova",      community: "Villanova",           type: "Townhouse",  status: "Ready",              price: 1400000,  priceLabel: "AED 1,400,000",  beds: 3,       baths: 3, size: 1900, image: "/developers/valley.jpg",        roi: "5.6%",  tags: ["Family", "Spanish Style"] },
];

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const TYPE_ICONS: Record<string, React.ReactNode> = {
  Apartment:  <Building2 size={11} />,
  Villa:      <Home size={11} />,
  Townhouse:  <Home size={11} />,
  Penthouse:  <Building2 size={11} />,
  Studio:     <Building2 size={11} />,
};

const ALL_TYPES     = ["Apartment", "Villa", "Townhouse", "Penthouse", "Studio"] as const;
const ALL_STATUSES  = ["Off-Plan", "Ready", "Under Construction"] as const;
const ALL_BEDS      = ["Studio", "1", "2", "3", "4", "5+"] as const;
const ALL_COMMUNITIES = Array.from(new Set(PROPERTIES.map(p => p.community))).sort();
const ALL_DEVELOPERS  = Array.from(new Set(PROPERTIES.map(p => p.developer))).sort();
const PRICE_RANGES = [
  { label: "Any Price",          min: 0,         max: Infinity },
  { label: "Under AED 1M",       min: 0,         max: 1000000 },
  { label: "AED 1M – 3M",        min: 1000000,   max: 3000000 },
  { label: "AED 3M – 7M",        min: 3000000,   max: 7000000 },
  { label: "AED 7M – 15M",       min: 7000000,   max: 15000000 },
  { label: "AED 15M+",           min: 15000000,  max: Infinity },
];

const PER_PAGE = 12;

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function statusColor(s: string) {
  if (s === "Ready") return "#16a34a";
  if (s === "Under Construction") return "#ca8a04";
  return "#000";
}

function formatBeds(b: number | "Studio") {
  if (b === "Studio") return "Studio";
  if (b === 0) return "Studio";
  return `${b} Bed${b !== 1 ? "s" : ""}`;
}

/* ─────────────────────────────────────────
   FILTER PANEL
───────────────────────────────────────── */
interface Filters {
  types: string[];
  statuses: string[];
  beds: string[];
  priceRange: number;
  developer: string;
  community: string;
}

const DEFAULT_FILTERS: Filters = {
  types: [], statuses: [], beds: [], priceRange: 0, developer: "", community: "",
};

function FilterPanel({
  filters, onChange, onClear, count,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  onClear: () => void;
  count: number;
}) {
  const toggle = (key: "types" | "statuses" | "beds", val: string) => {
    const arr = filters[key];
    onChange({ ...filters, [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] });
  };

  const activeCount = filters.types.length + filters.statuses.length + filters.beds.length
    + (filters.priceRange > 0 ? 1 : 0)
    + (filters.developer ? 1 : 0)
    + (filters.community ? 1 : 0);

  return (
    <div className="pp-filter-panel">
      {/* Header */}
      <div className="pp-filter-header">
        <span className="pp-filter-title">
          <SlidersHorizontal size={14} />
          Filters {activeCount > 0 && <span className="pp-filter-badge">{activeCount}</span>}
        </span>
        {activeCount > 0 && (
          <button className="pp-filter-clear" onClick={onClear}>Clear all</button>
        )}
      </div>

      {/* Results count */}
      <p className="pp-filter-count">
        <strong>{count}</strong> propert{count !== 1 ? "ies" : "y"} found
      </p>

      <div className="pp-filter-divider" />

      {/* Property Type */}
      <div className="pp-filter-group">
        <p className="pp-filter-label">Property Type</p>
        <div className="pp-filter-chips">
          {ALL_TYPES.map(t => (
            <button
              key={t}
              className={`pp-chip${filters.types.includes(t) ? " active" : ""}`}
              onClick={() => toggle("types", t)}
            >
              {TYPE_ICONS[t]}{t}
            </button>
          ))}
        </div>
      </div>

      <div className="pp-filter-divider" />

      {/* Status */}
      <div className="pp-filter-group">
        <p className="pp-filter-label">Status</p>
        <div className="pp-filter-chips">
          {ALL_STATUSES.map(s => (
            <button
              key={s}
              className={`pp-chip${filters.statuses.includes(s) ? " active" : ""}`}
              onClick={() => toggle("statuses", s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="pp-filter-divider" />

      {/* Bedrooms */}
      <div className="pp-filter-group">
        <p className="pp-filter-label">Bedrooms</p>
        <div className="pp-filter-chips">
          {ALL_BEDS.map(b => (
            <button
              key={b}
              className={`pp-chip${filters.beds.includes(b) ? " active" : ""}`}
              onClick={() => toggle("beds", b)}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="pp-filter-divider" />

      {/* Price Range */}
      <div className="pp-filter-group">
        <p className="pp-filter-label">Price Range</p>
        <div className="pp-filter-chips pp-filter-chips-col">
          {PRICE_RANGES.map((r, i) => (
            <button
              key={i}
              className={`pp-chip${filters.priceRange === i ? " active" : ""}`}
              onClick={() => onChange({ ...filters, priceRange: i })}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pp-filter-divider" />

      {/* Developer */}
      <div className="pp-filter-group">
        <p className="pp-filter-label">Developer</p>
        <div className="pp-select-wrap">
          <select
            className="pp-select"
            value={filters.developer}
            onChange={e => onChange({ ...filters, developer: e.target.value })}
          >
            <option value="">All Developers</option>
            {ALL_DEVELOPERS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <ChevronDown size={12} className="pp-select-icon" />
        </div>
      </div>

      <div className="pp-filter-divider" />

      {/* Community */}
      <div className="pp-filter-group">
        <p className="pp-filter-label">Community</p>
        <div className="pp-select-wrap">
          <select
            className="pp-select"
            value={filters.community}
            onChange={e => onChange({ ...filters, community: e.target.value })}
          >
            <option value="">All Communities</option>
            {ALL_COMMUNITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown size={12} className="pp-select-icon" />
        </div>
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────
   PROPERTY CARD
───────────────────────────────────────── */
function PropertyCard({ p, idx }: { p: Property; idx: number }) {
  return (
    <Link
      href={`/properties/${p.id}`}
      className="pp-card"
      style={{ animationDelay: `${(idx % PER_PAGE) * 0.04}s` }}
    >
      {/* Image */}
      <div className="pp-card-img-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.title} className="pp-card-img" loading={idx < 6 ? "eager" : "lazy"} />
        <div className="pp-card-img-overlay" />

        {/* Status badge */}
        <span className="pp-card-status" style={{ background: statusColor(p.status) }}>
          {p.status}
        </span>

        {/* Featured */}
        {p.featured && <span className="pp-card-featured">Featured</span>}

        {/* ROI badge */}
        {p.roi && (
          <span className="pp-card-roi">{p.roi} ROI</span>
        )}
      </div>

      {/* Body */}
      <div className="pp-card-body">

        {/* Developer row */}
        <div className="pp-card-dev-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.developerLogo} alt={p.developer} className="pp-card-dev-logo" />
          <span className="pp-card-dev-name">{p.developer}</span>
        </div>

        {/* Title + arrow */}
        <div className="pp-card-title-row">
          <h3 className="pp-card-title">{p.title}</h3>
          <ArrowUpRight size={14} className="pp-card-arrow" />
        </div>

        {/* Location */}
        <div className="pp-card-location">
          <MapPin size={11} />
          <span>{p.location}</span>
        </div>

        {/* Type + completion */}
        <div className="pp-card-meta-row">
          <span className="pp-card-type">
            {TYPE_ICONS[p.type]}{p.type}
          </span>
          {p.completionYear && (
            <span className="pp-card-completion">
              Completion {p.completionYear}
            </span>
          )}
        </div>

        <div className="pp-card-divider" />

        {/* Specs */}
        <div className="pp-card-specs">
          <span className="pp-card-spec">
            <BedDouble size={12} />
            {formatBeds(p.beds)}
          </span>
          <span className="pp-card-spec-sep">·</span>
          <span className="pp-card-spec">
            <Bath size={12} />
            {p.baths} Bath{p.baths !== 1 ? "s" : ""}
          </span>
          <span className="pp-card-spec-sep">·</span>
          <span className="pp-card-spec">
            <Maximize2 size={12} />
            {p.size.toLocaleString()} sqft
          </span>
        </div>

        {/* Price */}
        <div className="pp-card-price-row">
          <span className="pp-card-price">{p.priceLabel}</span>
          {p.tags && p.tags.length > 0 && (
            <span className="pp-card-tag">{p.tags[0]}</span>
          )}
        </div>

      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function PropertiesPage() {
  const [query,        setQuery]        = useState("");
  const [inputVal,     setInputVal]     = useState("");
  const [filters,      setFilters]      = useState<Filters>(DEFAULT_FILTERS);
  const [page,         setPage]         = useState(1);
  const [showMobPanel, setShowMobPanel] = useState(false);
  const [sortBy,       setSortBy]       = useState<"default" | "price-asc" | "price-desc" | "size">("default");
  const topRef = useRef<HTMLDivElement>(null);

  /* Inject CSS once */
  useEffect(() => {
    const id = "pp-css";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id; el.textContent = CSS;
    document.head.appendChild(el);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  /* Filter + search */
  const filtered = useMemo(() => {
    const pr = PRICE_RANGES[filters.priceRange];
    return PROPERTIES.filter(p => {
      const q = query.trim().toLowerCase();
      if (q && !p.title.toLowerCase().includes(q) && !p.developer.toLowerCase().includes(q) && !p.location.toLowerCase().includes(q) && !p.community.toLowerCase().includes(q)) return false;
      if (filters.types.length    && !filters.types.includes(p.type))       return false;
      if (filters.statuses.length && !filters.statuses.includes(p.status))  return false;
      if (filters.developer       && p.developer !== filters.developer)      return false;
      if (filters.community       && p.community !== filters.community)      return false;
      if (p.price < pr.min || p.price > pr.max)                             return false;
      if (filters.beds.length) {
        const bStr = p.beds === "Studio" ? "Studio" : p.beds >= 5 ? "5+" : String(p.beds);
        if (!filters.beds.includes(bStr)) return false;
      }
      return true;
    });
  }, [query, filters]);

  /* Sort */
  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sortBy === "price-asc")  arr.sort((a,b) => a.price - b.price);
    if (sortBy === "price-desc") arr.sort((a,b) => b.price - a.price);
    if (sortBy === "size")       arr.sort((a,b) => b.size  - a.size);
    if (sortBy === "default")    arr.sort((a,b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return arr;
  }, [filtered, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const paginated  = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const goTo = (p: number) => {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSearch = () => { setQuery(inputVal); setPage(1); };
  useEffect(() => { setPage(1); }, [filters, query]);

  const clearAll = () => { setFilters(DEFAULT_FILTERS); setQuery(""); setInputVal(""); };

  const activeFilterCount =
    filters.types.length + filters.statuses.length + filters.beds.length
    + (filters.priceRange > 0 ? 1 : 0)
    + (filters.developer ? 1 : 0)
    + (filters.community ? 1 : 0);

  return (
    <div className="pp">

      {/* BREADCRUMB */}
      <nav>
        <ol className="pp-bc">
          <li><a href="/">Home</a></li>
          <li><span className="pp-bc-sep">/</span></li>
          <li><span className="pp-bc-cur">Properties</span></li>
        </ol>
      </nav>

      {/* HERO */}
      <div className="pp-hero">
        <span className="pp-hero-eyebrow">UAE Real Estate</span>
        <h1 className="pp-hero-h1">
          Find Your Perfect<br />Property in Dubai
        </h1>

        {/* Search bar */}
        <div className="pp-search-wrap">
          <div className="pp-search-form">
            <Search size={15} className="pp-search-icon" />
            <input
              className="pp-search-input"
              type="text"
              placeholder="Search by property, developer, location…"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
            />
            {inputVal && (
              <button className="pp-search-clear" onClick={() => { setInputVal(""); setQuery(""); }}>
                <X size={14} />
              </button>
            )}
            <button className="pp-search-btn" onClick={handleSearch}>Search</button>
          </div>
        </div>

        {/* Quick filter pills */}
        <div className="pp-quick-filters">
          {ALL_TYPES.map(t => (
            <button
              key={t}
              className={`pp-qf-btn${filters.types.includes(t) ? " active" : ""}`}
              onClick={() => {
                const arr = filters.types;
                setFilters({ ...filters, types: arr.includes(t) ? arr.filter(x => x !== t) : [...arr, t] });
              }}
            >
              {t}
            </button>
          ))}
          <span className="pp-qf-sep" />
          {["Ready", "Off-Plan"].map(s => (
            <button
              key={s}
              className={`pp-qf-btn${filters.statuses.includes(s) ? " active" : ""}`}
              onClick={() => {
                const arr = filters.statuses;
                setFilters({ ...filters, statuses: arr.includes(s) ? arr.filter(x => x !== s) : [...arr, s] });
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="pp-layout" ref={topRef}>

        {/* SIDEBAR — desktop */}
        <aside className="pp-sidebar">
          <FilterPanel filters={filters} onChange={f => setFilters(f)} onClear={clearAll} count={sorted.length} />
        </aside>

        {/* CONTENT */}
        <div className="pp-content">

          {/* Toolbar */}
          <div className="pp-toolbar">
            <p className="pp-toolbar-count">
              <strong>{sorted.length}</strong> propert{sorted.length !== 1 ? "ies" : "y"}
              {query && <> for &ldquo;<em>{query}</em>&rdquo;</>}
            </p>

            <div className="pp-toolbar-right">
              {/* Sort */}
              <div className="pp-sort-wrap">
                <select
                  className="pp-sort-sel"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as typeof sortBy)}
                >
                  <option value="default">Featured First</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="size">Largest First</option>
                </select>
                <ChevronDown size={12} className="pp-sort-icon" />
              </div>

              {/* Mobile filter toggle */}
              <button
                className="pp-mob-filter-btn"
                onClick={() => setShowMobPanel(true)}
              >
                <SlidersHorizontal size={14} />
                Filters
                {activeFilterCount > 0 && <span className="pp-mob-filter-badge">{activeFilterCount}</span>}
              </button>
            </div>
          </div>

          {/* Active filter tags */}
          {activeFilterCount > 0 && (
            <div className="pp-active-tags">
              {filters.types.map(t => (
                <span key={t} className="pp-active-tag">
                  {t}
                  <button onClick={() => setFilters({ ...filters, types: filters.types.filter(x => x !== t) })}><X size={10} /></button>
                </span>
              ))}
              {filters.statuses.map(s => (
                <span key={s} className="pp-active-tag">
                  {s}
                  <button onClick={() => setFilters({ ...filters, statuses: filters.statuses.filter(x => x !== s) })}><X size={10} /></button>
                </span>
              ))}
              {filters.beds.map(b => (
                <span key={b} className="pp-active-tag">
                  {b === "Studio" ? "Studio" : `${b} Bed`}
                  <button onClick={() => setFilters({ ...filters, beds: filters.beds.filter(x => x !== b) })}><X size={10} /></button>
                </span>
              ))}
              {filters.priceRange > 0 && (
                <span className="pp-active-tag">
                  {PRICE_RANGES[filters.priceRange].label}
                  <button onClick={() => setFilters({ ...filters, priceRange: 0 })}><X size={10} /></button>
                </span>
              )}
              {filters.developer && (
                <span className="pp-active-tag">
                  {filters.developer}
                  <button onClick={() => setFilters({ ...filters, developer: "" })}><X size={10} /></button>
                </span>
              )}
              {filters.community && (
                <span className="pp-active-tag">
                  {filters.community}
                  <button onClick={() => setFilters({ ...filters, community: "" })}><X size={10} /></button>
                </span>
              )}
              <button className="pp-active-tag-clear" onClick={clearAll}>Clear all</button>
            </div>
          )}

          {/* Grid */}
          {paginated.length === 0 ? (
            <div className="pp-empty">
              <Trees size={32} className="pp-empty-icon" />
              <p>No properties found.</p>
              <button className="pp-empty-btn" onClick={clearAll}>Clear filters</button>
            </div>
          ) : (
            <div className="pp-grid">
              {paginated.map((p, i) => (
                <PropertyCard key={p.id} p={p} idx={i} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pp-pag">
              <button className="pp-pag-btn" onClick={() => goTo(page - 1)} disabled={page === 1}>← Back</button>
              <div className="pp-pag-pages">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    className={`pp-pag-num${p === page ? " active" : ""}`}
                    onClick={() => goTo(p)}
                  >{p}</button>
                ))}
              </div>
              <button className="pp-pag-btn" onClick={() => goTo(page + 1)} disabled={page === totalPages}>Next →</button>
            </div>
          )}

        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {showMobPanel && (
        <div className="pp-mob-overlay" onClick={() => setShowMobPanel(false)}>
          <div className="pp-mob-drawer" onClick={e => e.stopPropagation()}>
            <div className="pp-mob-drawer-header">
              <span>Filters</span>
              <button onClick={() => setShowMobPanel(false)}><X size={18} /></button>
            </div>
            <div className="pp-mob-drawer-body">
              <FilterPanel filters={filters} onChange={f => setFilters(f)} onClear={clearAll} count={sorted.length} />
            </div>
            <div className="pp-mob-drawer-footer">
              <button className="pp-mob-apply-btn" onClick={() => setShowMobPanel(false)}>
                Show {sorted.length} Properties
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

/* ─────────────────────────────────────────
   CSS
───────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

.pp {
  --pp-navy:   #07234B;
  --pp-black:  #0a0a0a;
  --pp-white:  #ffffff;
  --pp-cream:  #f8f7f5;
  --pp-gold:   #9a8060;
  --pp-g3:     #444;
  --pp-g4:     #888;
  --pp-g5:     #bbb;
  --pp-g6:     #e8e8e8;
  --pp-g7:     #f4f4f4;
  --pp-serif:  'Libre Baskerville', Georgia, serif;
  --pp-sans:   'DM Sans', ui-sans-serif, system-ui, sans-serif;
  background: var(--pp-cream);
  font-family: var(--pp-sans);
  color: var(--pp-black);
  min-height: 100vh;
}
.pp *, .pp *::before, .pp *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* BREADCRUMB */
.pp .pp-bc {
  max-width: 1380px; margin: 0 auto;
  padding: 20px clamp(1rem,4vw,2.5rem) 0;
  display: flex; align-items: center; gap: 8px;
  font-size: 12px; color: var(--pp-g4); list-style: none;
}
.pp .pp-bc a { color: var(--pp-g4); text-decoration: none; transition: color .15s; }
.pp .pp-bc a:hover { color: var(--pp-navy); }
.pp .pp-bc-sep { color: var(--pp-g5); }
.pp .pp-bc-cur { color: var(--pp-navy); font-weight: 500; }

/* HERO */
.pp .pp-hero {
  text-align: center;
  padding: clamp(2.5rem,6vw,5rem) clamp(1rem,4vw,2rem) clamp(2rem,4vw,3rem);
}
.pp .pp-hero-eyebrow {
  font-size: 11px; font-weight: 600; letter-spacing: .15em;
  text-transform: uppercase; color: var(--pp-gold);
  margin-bottom: 16px; display: block;
}
.pp .pp-hero-h1 {
  font-family: var(--pp-serif);
  font-size: clamp(28px,5.5vw,58px); font-weight: 700;
  color: var(--pp-navy); line-height: 1.12;
  margin-bottom: clamp(1.5rem,3vw,2rem); letter-spacing: -.02em;
}

/* SEARCH */
.pp .pp-search-wrap { max-width: 640px; margin: 0 auto 20px; }
.pp .pp-search-form {
  display: flex; align-items: center;
  border: 1.5px solid #d8d3cc; border-radius: 6px;
  overflow: hidden; background: var(--pp-white);
  transition: border-color .2s, box-shadow .2s;
}
.pp .pp-search-form:focus-within { border-color: var(--pp-navy); box-shadow: 0 0 0 3px rgba(7,35,75,.08); }
.pp .pp-search-icon { color: var(--pp-g4); flex-shrink: 0; margin-left: 14px; }
.pp .pp-search-input {
  flex: 1; border: none; outline: none;
  font-family: var(--pp-sans); font-size: 14px; color: var(--pp-navy);
  padding: 14px 12px; background: transparent;
}
.pp .pp-search-input::placeholder { color: #aaa; }
.pp .pp-search-clear {
  background: none; border: none; cursor: pointer; color: var(--pp-g4);
  padding: 0 8px; display: flex; align-items: center;
}
.pp .pp-search-btn {
  background: var(--pp-navy); color: var(--pp-white); border: none; cursor: pointer;
  font-family: var(--pp-sans); font-size: 13px; font-weight: 600; letter-spacing: .05em;
  padding: 14px 22px; transition: background .18s; white-space: nowrap; flex-shrink: 0;
}
.pp .pp-search-btn:hover { background: #0c3568; }

/* QUICK FILTERS */
.pp .pp-quick-filters {
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center;
}
.pp .pp-qf-btn {
  font-family: var(--pp-sans); font-size: 12px; font-weight: 500;
  color: var(--pp-g3); background: var(--pp-white);
  border: 1.5px solid var(--pp-g5); border-radius: 20px;
  padding: 6px 16px; cursor: pointer; transition: all .15s;
}
.pp .pp-qf-btn:hover { border-color: var(--pp-navy); color: var(--pp-navy); }
.pp .pp-qf-btn.active { background: var(--pp-navy); color: var(--pp-white); border-color: var(--pp-navy); }
.pp .pp-qf-sep { width: 1px; height: 20px; background: var(--pp-g5); }

/* MAIN LAYOUT */
.pp .pp-layout {
  max-width: 1380px; margin: 0 auto;
  padding: 0 clamp(1rem,4vw,2.5rem) 4rem;
  display: grid; grid-template-columns: 260px 1fr; gap: 28px; align-items: start;
}
@media (max-width: 960px) { .pp .pp-layout { grid-template-columns: 1fr; } }

/* SIDEBAR */
.pp .pp-sidebar { position: sticky; top: 90px; }
@media (max-width: 960px) { .pp .pp-sidebar { display: none; } }

/* FILTER PANEL */
.pp .pp-filter-panel {
  background: var(--pp-white); border: 1px solid var(--pp-g6);
  border-radius: 8px; padding: 20px; overflow: hidden;
}
.pp .pp-filter-header {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;
}
.pp .pp-filter-title {
  display: flex; align-items: center; gap: 7px;
  font-size: 13px; font-weight: 700; color: var(--pp-black); letter-spacing: .02em;
}
.pp .pp-filter-badge {
  background: var(--pp-navy); color: var(--pp-white);
  font-size: 10px; font-weight: 700;
  border-radius: 20px; padding: 2px 7px; margin-left: 2px;
}
.pp .pp-filter-clear {
  font-size: 11px; font-weight: 500; color: var(--pp-g4);
  background: none; border: none; cursor: pointer; transition: color .15s;
  text-decoration: underline; text-underline-offset: 2px;
}
.pp .pp-filter-clear:hover { color: var(--pp-navy); }
.pp .pp-filter-count { font-size: 12px; color: var(--pp-g4); margin-bottom: 12px; }
.pp .pp-filter-count strong { color: var(--pp-navy); font-weight: 600; }
.pp .pp-filter-divider { height: 1px; background: var(--pp-g6); margin: 14px 0; }
.pp .pp-filter-group { }
.pp .pp-filter-label {
  font-size: 10px; font-weight: 700; color: var(--pp-g4);
  text-transform: uppercase; letter-spacing: .1em; margin-bottom: 10px;
}
.pp .pp-filter-chips { display: flex; gap: 6px; flex-wrap: wrap; }
.pp .pp-filter-chips-col { flex-direction: column; gap: 4px; }
.pp .pp-chip {
  display: inline-flex; align-items: center; gap: 4px;
  font-family: var(--pp-sans); font-size: 11px; font-weight: 500;
  color: var(--pp-g3); background: var(--pp-g7);
  border: 1.5px solid transparent; border-radius: 3px;
  padding: 5px 10px; cursor: pointer; transition: all .15s;
}
.pp .pp-chip:hover { border-color: var(--pp-navy); color: var(--pp-navy); }
.pp .pp-chip.active { background: var(--pp-navy); color: var(--pp-white); border-color: var(--pp-navy); }
.pp .pp-select-wrap { position: relative; }
.pp .pp-select {
  width: 100%; font-family: var(--pp-sans); font-size: 12px; color: var(--pp-black);
  background: var(--pp-g7); border: 1px solid var(--pp-g6); border-radius: 4px;
  padding: 8px 28px 8px 10px; appearance: none; cursor: pointer; outline: none;
}
.pp .pp-select-icon { position: absolute; right: 9px; top: 50%; transform: translateY(-50%); color: var(--pp-g4); pointer-events: none; }

/* TOOLBAR */
.pp .pp-toolbar {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 14px; flex-wrap: wrap; gap: 10px;
}
.pp .pp-toolbar-count { font-size: 13px; color: var(--pp-g4); }
.pp .pp-toolbar-count strong { color: var(--pp-navy); font-weight: 600; }
.pp .pp-toolbar-count em { color: var(--pp-black); font-style: normal; font-weight: 500; }
.pp .pp-toolbar-right { display: flex; align-items: center; gap: 10px; }
.pp .pp-sort-wrap { position: relative; }
.pp .pp-sort-sel {
  font-family: var(--pp-sans); font-size: 12px; font-weight: 500; color: var(--pp-black);
  background: var(--pp-white); border: 1px solid var(--pp-g5); border-radius: 4px;
  padding: 7px 28px 7px 12px; appearance: none; cursor: pointer; outline: none;
}
.pp .pp-sort-icon { position: absolute; right: 9px; top: 50%; transform: translateY(-50%); color: var(--pp-g4); pointer-events: none; }

/* MOBILE FILTER BTN */
.pp .pp-mob-filter-btn {
  display: none; align-items: center; gap: 6px;
  font-family: var(--pp-sans); font-size: 12px; font-weight: 600;
  color: var(--pp-black); background: var(--pp-white);
  border: 1px solid var(--pp-g5); border-radius: 4px;
  padding: 7px 14px; cursor: pointer;
}
.pp .pp-mob-filter-badge {
  background: var(--pp-navy); color: var(--pp-white);
  font-size: 10px; font-weight: 700; border-radius: 10px; padding: 1px 6px;
}
@media (max-width: 960px) { .pp .pp-mob-filter-btn { display: flex; } }

/* ACTIVE TAGS */
.pp .pp-active-tags {
  display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 14px;
}
.pp .pp-active-tag {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 11px; font-weight: 500; color: var(--pp-navy);
  background: rgba(7,35,75,.07); border: 1px solid rgba(7,35,75,.18);
  border-radius: 3px; padding: 4px 8px;
}
.pp .pp-active-tag button {
  background: none; border: none; cursor: pointer; color: var(--pp-navy);
  display: flex; align-items: center; padding: 0;
}
.pp .pp-active-tag-clear {
  font-size: 11px; font-weight: 500; color: var(--pp-g4);
  background: none; border: none; cursor: pointer;
  text-decoration: underline; text-underline-offset: 2px; transition: color .15s;
}
.pp .pp-active-tag-clear:hover { color: var(--pp-navy); }

/* GRID */
.pp .pp-grid {
  display: grid; grid-template-columns: 1fr; gap: 20px;
}
@media (min-width: 540px)  { .pp .pp-grid { grid-template-columns: repeat(2,1fr); } }
@media (min-width: 1100px) { .pp .pp-grid { grid-template-columns: repeat(3,1fr); } }

/* PROPERTY CARD */
.pp .pp-card {
  display: flex; flex-direction: column;
  text-decoration: none; color: inherit;
  background: var(--pp-white); border-radius: 8px;
  border: 1px solid var(--pp-g6); overflow: hidden;
  transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s cubic-bezier(.22,1,.36,1);
  animation: ppCardIn .45s cubic-bezier(.22,1,.36,1) both;
}
.pp .pp-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 48px rgba(7,35,75,.12);
}

/* card image */
.pp .pp-card-img-wrap {
  position: relative; aspect-ratio: 16/10; overflow: hidden; background: var(--pp-g6);
}
.pp .pp-card-img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform .6s cubic-bezier(.22,1,.36,1);
}
.pp .pp-card:hover .pp-card-img { transform: scale(1.06); }
.pp .pp-card-img-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.2) 100%);
}

/* badges */
.pp .pp-card-status {
  position: absolute; top: 10px; left: 10px;
  font-size: 9px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
  color: var(--pp-white); border-radius: 3px; padding: 4px 9px;
}
.pp .pp-card-featured {
  position: absolute; top: 10px; right: 10px;
  font-size: 9px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
  color: var(--pp-black); background: rgba(255,255,255,.92);
  border-radius: 3px; padding: 4px 9px;
}
.pp .pp-card-roi {
  position: absolute; bottom: 10px; right: 10px;
  font-size: 10px; font-weight: 700;
  color: var(--pp-white); background: rgba(22,163,74,.85);
  border-radius: 3px; padding: 3px 8px;
}

/* card body */
.pp .pp-card-body { padding: 14px 16px 18px; display: flex; flex-direction: column; flex: 1; }
.pp .pp-card-dev-row {
  display: flex; align-items: center; gap: 7px; margin-bottom: 9px;
}
.pp .pp-card-dev-logo {
  width: 52px; height: 18px; object-fit: contain;
  filter: grayscale(100%) opacity(0.5);
}
.pp .pp-card-dev-name { font-size: 10px; color: var(--pp-g4); font-weight: 500; letter-spacing: .02em; }
.pp .pp-card-title-row {
  display: flex; align-items: flex-start; justify-content: space-between; gap: 6px; margin-bottom: 6px;
}
.pp .pp-card-title { font-size: 15px; font-weight: 600; color: var(--pp-black); line-height: 1.3; }
.pp .pp-card-arrow { flex-shrink: 0; color: var(--pp-g5); margin-top: 3px; transition: color .2s, transform .2s; }
.pp .pp-card:hover .pp-card-arrow { color: var(--pp-navy); transform: translate(2px,-2px); }
.pp .pp-card-location {
  display: flex; align-items: center; gap: 4px;
  font-size: 11px; color: var(--pp-g4); margin-bottom: 8px;
}
.pp .pp-card-meta-row {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;
}
.pp .pp-card-type {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 10px; font-weight: 600; letter-spacing: .05em; text-transform: uppercase;
  color: var(--pp-g4);
}
.pp .pp-card-completion {
  font-size: 10px; color: var(--pp-gold); font-weight: 500;
}
.pp .pp-card-divider { height: 1px; background: var(--pp-g6); margin-bottom: 10px; }
.pp .pp-card-specs {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: var(--pp-g3); flex-wrap: wrap; margin-bottom: 12px;
}
.pp .pp-card-spec { display: inline-flex; align-items: center; gap: 4px; }
.pp .pp-card-spec-sep { color: var(--pp-g5); }
.pp .pp-card-price-row {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: auto; padding-top: 4px;
}
.pp .pp-card-price {
  font-size: 16px; font-weight: 700; color: var(--pp-navy);
}
.pp .pp-card-tag {
  font-size: 9px; font-weight: 600; letter-spacing: .05em; text-transform: uppercase;
  color: var(--pp-navy); border: 1px solid rgba(7,35,75,.25);
  border-radius: 2px; padding: 3px 7px; background: rgba(7,35,75,.05);
}

/* EMPTY STATE */
.pp .pp-empty {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 4rem 2rem; text-align: center; gap: 14px;
}
.pp .pp-empty-icon { color: var(--pp-g5); }
.pp .pp-empty p { font-size: 14px; color: var(--pp-g4); }
.pp .pp-empty-btn {
  font-family: var(--pp-sans); font-size: 12px; font-weight: 600; letter-spacing: .05em;
  text-transform: uppercase; background: var(--pp-navy); color: var(--pp-white);
  border: none; border-radius: 3px; padding: 11px 24px; cursor: pointer;
}

/* PAGINATION */
.pp .pp-pag {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid var(--pp-g6);
  flex-wrap: wrap; gap: 10px;
}
.pp .pp-pag-btn {
  font-family: var(--pp-sans); font-size: 13px; font-weight: 500; color: var(--pp-g3);
  background: var(--pp-white); border: 1px solid var(--pp-g5); border-radius: 4px;
  padding: 8px 18px; cursor: pointer; transition: all .15s;
}
.pp .pp-pag-btn:hover:not(:disabled) { border-color: var(--pp-navy); color: var(--pp-navy); }
.pp .pp-pag-btn:disabled { opacity: .35; cursor: not-allowed; }
.pp .pp-pag-pages { display: flex; gap: 6px; }
.pp .pp-pag-num {
  font-family: var(--pp-sans); font-size: 13px; font-weight: 500; color: var(--pp-g3);
  background: var(--pp-white); border: 1px solid var(--pp-g5); border-radius: 4px;
  width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all .15s;
}
.pp .pp-pag-num:hover { border-color: var(--pp-navy); color: var(--pp-navy); }
.pp .pp-pag-num.active { background: var(--pp-navy); color: var(--pp-white); border-color: var(--pp-navy); }

/* MOBILE DRAWER */
.pp-mob-overlay {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,.55); animation: ppFadeIn .2s ease;
}
.pp-mob-drawer {
  position: absolute; right: 0; top: 0; bottom: 0;
  width: min(340px, 90vw); background: var(--pp-white);
  display: flex; flex-direction: column;
  animation: ppSlideIn .28s cubic-bezier(.22,1,.36,1);
}
.pp-mob-drawer-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 20px; border-bottom: 1px solid var(--pp-g6);
  font-size: 15px; font-weight: 600; color: var(--pp-black);
}
.pp-mob-drawer-header button {
  background: none; border: none; cursor: pointer; color: var(--pp-g4);
  display: flex; align-items: center;
}
.pp-mob-drawer-body { flex: 1; overflow-y: auto; padding: 0; }
.pp-mob-drawer-body .pp-filter-panel { border: none; border-radius: 0; }
.pp-mob-drawer-footer { padding: 16px 20px; border-top: 1px solid var(--pp-g6); }
.pp-mob-apply-btn {
  width: 100%; font-family: var(--pp-sans); font-size: 13px; font-weight: 600;
  letter-spacing: .05em; text-transform: uppercase;
  background: var(--pp-navy); color: var(--pp-white);
  border: none; border-radius: 4px; padding: 14px; cursor: pointer;
  transition: background .18s;
}
.pp-mob-apply-btn:hover { background: #0c3568; }

@keyframes ppCardIn  { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
@keyframes ppFadeIn  { from { opacity: 0; } to { opacity: 1; } }
@keyframes ppSlideIn { from { transform: translateX(100%); } to { transform: none; } }
`;