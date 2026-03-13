"use client";

import { useEffect, useMemo, useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Bath, BedDouble, MapPin, Maximize2, Search, SlidersHorizontal, X } from "lucide-react";

type PropertyType = "Apartment" | "Villa" | "Townhouse" | "Penthouse" | "Studio" | "Commercial";
type PropertyStatus = "Ready" | "Off-Plan" | "Under Construction";
type PropertyCategory = "Residential" | "Commercial";

interface Property {
  id: string;
  title: string;
  location: string;
  community: string;
  developer: string;
  developerLogo: string;
  type: PropertyType;
  status: PropertyStatus;
  beds: "Studio" | "1" | "2" | "3" | "4" | "5+";
  baths: number;
  size: number;
  price: number;
  priceLabel: string;
  image: string;
  completionYear?: number;
  roi?: string;
  tags?: string[];
}

const PROPERTIES: Property[] = [
  { id: "p1",  title: "The Address Residences",       developer: "Emaar Properties",  developerLogo: "/developers/emaar-logo.png",            location: "Downtown Dubai",     community: "Downtown Dubai",          type: "Apartment",  status: "Ready",              beds: "2",      baths: 2, size: 1250,  price: 2500000,  priceLabel: "AED 2,500,000",  image: "/developers/downtown.jpeg",        roi: "6.2%",  tags: ["Burj Views", "High ROI"] },
  { id: "p2",  title: "Park Lane Villas",              developer: "Emaar Properties",  developerLogo: "/developers/emaar-logo.png",            location: "Dubai Hills Estate", community: "Dubai Hills Estate",      type: "Villa",      status: "Off-Plan",           beds: "4",      baths: 4, size: 3400,  price: 3200000,  priceLabel: "AED 3,200,000",  image: "/developers/dubaihills.jpeg",      completionYear: 2027, tags: ["Golf Views", "Gated"] },
  { id: "p3",  title: "Beach Vista",                   developer: "Emaar Properties",  developerLogo: "/developers/emaar-logo.png",            location: "Emaar Beachfront",   community: "Emaar Beachfront",        type: "Apartment",  status: "Under Construction", beds: "1",      baths: 1, size: 780,   price: 1800000,  priceLabel: "AED 1,800,000",  image: "/developers/emaar.jpeg",           completionYear: 2026, tags: ["Sea Views", "Beach Access"] },
  { id: "p4",  title: "Trump Villas",                  developer: "DAMAC Properties",  developerLogo: "/developers/damac-logo.png",            location: "DAMAC Hills",        community: "DAMAC Hills",             type: "Villa",      status: "Ready",              beds: "4",      baths: 4, size: 3800,  price: 2800000,  priceLabel: "AED 2,800,000",  image: "/developers/damac.jpg",            roi: "5.8%",  tags: ["Golf Club", "Gated"] },
  { id: "p5",  title: "Malta Cluster Townhouses",      developer: "DAMAC Properties",  developerLogo: "/developers/damac-logo.png",            location: "DAMAC Lagoons",      community: "DAMAC Lagoons",           type: "Townhouse",  status: "Off-Plan",           beds: "3",      baths: 3, size: 2200,  price: 1600000,  priceLabel: "AED 1,600,000",  image: "/developers/lagoos.jpg",           completionYear: 2027, tags: ["Lagoon", "Beach"] },
  { id: "p6",  title: "DAMAC Bay by Cavalli",          developer: "DAMAC Properties",  developerLogo: "/developers/damac-logo.png",            location: "Dubai Harbour",      community: "Dubai Harbour",           type: "Apartment",  status: "Off-Plan",           beds: "3",      baths: 3, size: 2100,  price: 4500000,  priceLabel: "AED 4,500,000",  image: "/developers/damac2.webp",          completionYear: 2026, tags: ["Cavalli Design", "Ultra Luxury"] },
  { id: "p7",  title: "Garden Homes – Palm Fronds",    developer: "Nakheel",           developerLogo: "/developers/nakheel-logo.png",          location: "Palm Jumeirah",      community: "Palm Jumeirah",           type: "Villa",      status: "Ready",              beds: "5+",     baths: 5, size: 5500,  price: 8000000,  priceLabel: "AED 8,000,000",  image: "/developers/jvc.webp",             roi: "4.8%",  tags: ["Private Beach", "Iconic"] },
  { id: "p8",  title: "Canal Residences",              developer: "Nakheel",           developerLogo: "/developers/nakheel-logo.png",          location: "JVC",                community: "Jumeirah Village Circle", type: "Apartment",  status: "Ready",              beds: "1",      baths: 1, size: 720,   price: 650000,   priceLabel: "AED 650,000",    image: "/developers/jvc.webp",             roi: "7.5%",  tags: ["High Yield", "Central"] },
  { id: "p9",  title: "Palm Jebel Ali – Frond Villa",  developer: "Nakheel",           developerLogo: "/developers/nakheel-logo.png",          location: "Palm Jebel Ali",     community: "Palm Jebel Ali",          type: "Villa",      status: "Off-Plan",           beds: "5+",     baths: 6, size: 7200,  price: 9500000,  priceLabel: "AED 9,500,000",  image: "/developers/downtown.jpeg",        completionYear: 2028, tags: ["Beachfront", "Capital Growth"] },
  { id: "p10", title: "Forest Villas",                 developer: "Sobha Realty",      developerLogo: "/developers/sobha-logo.png",            location: "MBR City",           community: "Sobha Hartland",          type: "Villa",      status: "Ready",              beds: "5+",     baths: 5, size: 5200,  price: 5500000,  priceLabel: "AED 5,500,000",  image: "/developers/sobha.jpeg",           roi: "5.1%",  tags: ["Canal View", "Greenery"] },
  { id: "p11", title: "Creek Vistas Heights",          developer: "Sobha Realty",      developerLogo: "/developers/sobha-logo.png",            location: "MBR City",           community: "Sobha Hartland",          type: "Apartment",  status: "Off-Plan",           beds: "2",      baths: 2, size: 1050,  price: 1100000,  priceLabel: "AED 1,100,000",  image: "/developers/soba2.webp",           completionYear: 2027, tags: ["Skyline Views", "Premium"] },
  { id: "p12", title: "Bugatti Residences",            developer: "Binghatti",         developerLogo: "/developers/binghatti-logo.png",        location: "Business Bay",       community: "Business Bay",            type: "Penthouse",  status: "Off-Plan",           beds: "5+",     baths: 6, size: 14000, price: 52000000, priceLabel: "AED 52,000,000", image: "/developers/dubaicreek.jpeg",      completionYear: 2026, tags: ["World First", "Ultra Luxury"] },
  { id: "p13", title: "Orchid – JVC",                  developer: "Binghatti",         developerLogo: "/developers/binghatti-logo.png",        location: "JVC",                community: "Jumeirah Village Circle", type: "Apartment",  status: "Ready",              beds: "1",      baths: 1, size: 820,   price: 750000,   priceLabel: "AED 750,000",    image: "/developers/jvc.webp",             roi: "7.2%",  tags: ["High ROI", "Ready"] },
  { id: "p14", title: "Oceanz",                        developer: "Danube",            developerLogo: "/developers/danube-logo.png",           location: "Dubai Maritime City",community: "Dubai Maritime City",      type: "Apartment",  status: "Off-Plan",           beds: "2",      baths: 2, size: 1100,  price: 950000,   priceLabel: "AED 950,000",    image: "/developers/dubaisportcity.webp",  completionYear: 2027, tags: ["1% Payment", "Sea Views"] },
  { id: "p15", title: "Sportz",                        developer: "Danube",            developerLogo: "/developers/danube-logo.png",           location: "Dubai Sports City",  community: "Dubai Sports City",       type: "Studio",     status: "Ready",              beds: "Studio", baths: 1, size: 490,   price: 600000,   priceLabel: "AED 600,000",    image: "/developers/dubaisportcity.webp",  roi: "7.8%",  tags: ["Affordable", "High Yield"] },
  { id: "p16", title: "Bluewaters Island Residences",  developer: "Meraas",            developerLogo: "/developers/Meraas-logo.svg",           location: "Bluewaters Island",  community: "Bluewaters Island",       type: "Apartment",  status: "Ready",              beds: "2",      baths: 2, size: 1400,  price: 3000000,  priceLabel: "AED 3,000,000",  image: "/developers/dubaihills.jpeg",      roi: "5.4%",  tags: ["Island Living", "Ain Dubai"] },
  { id: "p17", title: "City Walk Residences",          developer: "Meraas",            developerLogo: "/developers/Meraas-logo.svg",           location: "City Walk",          community: "City Walk",               type: "Apartment",  status: "Ready",              beds: "2",      baths: 2, size: 1150,  price: 2200000,  priceLabel: "AED 2,200,000",  image: "/developers/arjan.jpg",            roi: "5.9%",  tags: ["Lifestyle", "Retail"] },
  { id: "p18", title: "Ellington House",               developer: "Ellington",         developerLogo: "/developers/ellington-logo.png",        location: "Dubai Hills Estate", community: "Dubai Hills Estate",      type: "Apartment",  status: "Ready",              beds: "1",      baths: 1, size: 870,   price: 1400000,  priceLabel: "AED 1,400,000",  image: "/developers/meydan.jpg",           roi: "6.1%",  tags: ["Design-Led", "Boutique"] },
  { id: "p19", title: "The Crestmark",                 developer: "Ellington",         developerLogo: "/developers/ellington-logo.png",        location: "Business Bay",       community: "Business Bay",            type: "Apartment",  status: "Off-Plan",           beds: "1",      baths: 1, size: 740,   price: 1200000,  priceLabel: "AED 1,200,000",  image: "/developers/mayden.jpg",           completionYear: 2026, tags: ["Canal View", "Art Interiors"] },
  { id: "p20", title: "Riviera Phase 4",               developer: "Azizi",             developerLogo: "/developers/azizi-logo.png",            location: "Meydan",             community: "Azizi Riviera",           type: "Apartment",  status: "Ready",              beds: "1",      baths: 1, size: 650,   price: 700000,   priceLabel: "AED 700,000",    image: "/developers/azizi.jpeg",           roi: "7.0%",  tags: ["Crystal Lagoon", "Meydan"] },
  { id: "p21", title: "Venice Lagoon Residences",      developer: "Azizi",             developerLogo: "/developers/azizi-logo.png",            location: "Dubai South",        community: "Azizi Venice",            type: "Apartment",  status: "Off-Plan",           beds: "2",      baths: 2, size: 1020,  price: 850000,   priceLabel: "AED 850,000",    image: "/developers/azizivenice.webp",     completionYear: 2027, tags: ["Lagoon", "Expo City"] },
  { id: "p22", title: "6 Senses Residences",           developer: "Select Group",      developerLogo: "/developers/select-logo.png",           location: "Palm Jumeirah",      community: "Palm Jumeirah",           type: "Penthouse",  status: "Off-Plan",           beds: "4",      baths: 4, size: 6500,  price: 18000000, priceLabel: "AED 18,000,000", image: "/developers/dubaicreek.jpeg",      completionYear: 2027, tags: ["Wellness", "6 Senses"] },
  { id: "p23", title: "Marina Gate Tower 1",           developer: "Select Group",      developerLogo: "/developers/select-logo.png",           location: "Dubai Marina",       community: "Dubai Marina",            type: "Apartment",  status: "Ready",              beds: "1",      baths: 1, size: 840,   price: 1300000,  priceLabel: "AED 1,300,000",  image: "/developers/al.jpg",               roi: "6.5%",  tags: ["Marina Views", "5-Star"] },
  { id: "p24", title: "Serenity Mansions",             developer: "Majid Al Futtaim",  developerLogo: "/developers/maf-logo.png",              location: "Tilal Al Ghaf",      community: "Tilal Al Ghaf",           type: "Villa",      status: "Off-Plan",           beds: "5+",     baths: 6, size: 10000, price: 12000000, priceLabel: "AED 12,000,000", image: "/developers/dubaihills.jpeg",      completionYear: 2028, tags: ["Lagoon Access", "Mansion"] },
  { id: "p25", title: "Aura Townhouses",               developer: "Majid Al Futtaim",  developerLogo: "/developers/maf-logo.png",              location: "Tilal Al Ghaf",      community: "Tilal Al Ghaf",           type: "Townhouse",  status: "Ready",              beds: "4",      baths: 4, size: 3200,  price: 2500000,  priceLabel: "AED 2,500,000",  image: "/developers/valley.jpg",           roi: "5.2%",  tags: ["Beach Access", "Family"] },
  { id: "p26", title: "JBR – The Residence",           developer: "Dubai Properties",  developerLogo: "/developers/dubai-properties-logo.png", location: "JBR",                community: "Jumeirah Beach Residence",type: "Apartment",  status: "Ready",              beds: "2",      baths: 2, size: 1350,  price: 1800000,  priceLabel: "AED 1,800,000",  image: "/developers/dubaisportcity.webp",  roi: "6.3%",  tags: ["Beachfront", "The Walk"] },
  { id: "p27", title: "La Rosa Townhouses",            developer: "Dubai Properties",  developerLogo: "/developers/dubai-properties-logo.png", location: "Villanova",          community: "Villanova",               type: "Townhouse",  status: "Ready",              beds: "3",      baths: 3, size: 1900,  price: 1400000,  priceLabel: "AED 1,400,000",  image: "/developers/valley.jpg",           roi: "5.6%",  tags: ["Family", "Spanish Style"] },
];

const TYPES: PropertyType[] = ["Apartment", "Villa", "Townhouse", "Penthouse", "Commercial"];
const STATUSES: PropertyStatus[] = ["Ready", "Off-Plan"];
const BEDS = ["Studio", "1", "2", "3", "4", "5+"] as const;
const DEVELOPERS = ["Beyond", "Nakheel", "Emaar", "DP World", "Meraas", "Sobha"] as const;
const PRICE_OPTIONS = ["AED 500K - 1M", "AED 2M - 3M", "AED 3M+"] as const;
const RESIDENTIAL_TYPES: PropertyType[] = ["Apartment", "Villa", "Townhouse", "Penthouse"];

function isValidCategory(value: string | null): value is PropertyCategory {
  return value === "Residential" || value === "Commercial";
}

function inPriceRange(price: number, range: string) {
  if (range === "AED 500K - 1M") return price >= 500000 && price <= 1000000;
  if (range === "AED 2M - 3M") return price >= 2000000 && price <= 3000000;
  if (range === "AED 3M+") return price >= 3000000;
  return true;
}

function filterButtonClass(isActive: boolean) {
  return `filter-chip rounded-sm px-3 py-1.5 text-xs border transition-all ${
    isActive ? "filter-chip--active" : "filter-chip--idle"
  }`;
}

function PropertiesPageClient() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [types, setTypes] = useState<PropertyType[]>([]);
  const [statuses, setStatuses] = useState<PropertyStatus[]>([]);
  const [beds, setBeds] = useState<string[]>([]);
  const [developer, setDeveloper] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [category, setCategory] = useState<PropertyCategory | "">("");
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const activeFilterCount = types.length + statuses.length + beds.length + (developer ? 1 : 0) + (priceRange ? 1 : 0);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (!isValidCategory(categoryParam)) { setCategory(""); return; }
    setCategory(categoryParam);
    setTypes(categoryParam === "Residential" ? RESIDENTIAL_TYPES : ["Commercial"]);
  }, [searchParams]);

  const toggle = <T extends string>(arr: T[], value: T, setter: (val: T[]) => void) => {
    setter(arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value]);
  };

  const filtered = useMemo(() => {
    return PROPERTIES.filter((p) => {
      const q = query.trim().toLowerCase();
      if (q && !(`${p.title} ${p.location}`.toLowerCase().includes(q))) return false;
      if (category === "Commercial" && p.type !== "Commercial") return false;
      if (category === "Residential" && !RESIDENTIAL_TYPES.includes(p.type)) return false;
      if (types.length && !types.includes(p.type)) return false;
      if (statuses.length && !statuses.includes(p.status)) return false;
      if (beds.length && !beds.includes(p.beds)) return false;
      if (developer && p.developer !== developer) return false;
      if (priceRange && !inPriceRange(p.price, priceRange)) return false;
      return true;
    });
  }, [category, query, types, statuses, beds, developer, priceRange]);

  return (
    <div className="bg-[#f8f7f5] min-h-screen pt-24 pb-16 px-4 md:px-6">

      <style>{`
        /* ── IDLE chip ── */
        .filter-chip--idle {
          background: transparent;
          color: rgba(255,255,255,0.45);
          border-color: rgba(255,255,255,0.14);
        }
        .filter-chip--idle:hover {
          color: rgba(255,255,255,0.8);
          border-color: rgba(255,255,255,0.32);
          background: rgba(255,255,255,0.05);
        }

        /* ── ACTIVE chip — rich glossy black ── */
        .filter-chip--active {
          color: #ffffff;
          border-color: rgba(255,255,255,0.55);
          background: linear-gradient(
            160deg,
            #2a2a2a 0%,
            #0d0d0d 40%,
            #1a1a1a 100%
          );
          box-shadow:
            0 1px 0 rgba(255,255,255,0.14) inset,   /* top sheen */
            0 -1px 0 rgba(0,0,0,0.6) inset,          /* bottom depth */
            0 3px 10px rgba(0,0,0,0.45),              /* drop shadow */
            0 0 0 1px rgba(255,255,255,0.08);         /* outer glow ring */
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
          font-weight: 600;
          letter-spacing: 0.01em;
          position: relative;
        }

        /* subtle shimmer line at very top of active chip */
        .filter-chip--active::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0.12) 0%,
            transparent 40%
          );
          pointer-events: none;
        }

        .filter-chip { position: relative; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl md:text-4xl font-bold" style={{ fontFamily: "var(--font-dm-serif), serif" }}>
            Find Your Perfect Property in Dubai
          </h1>
          <div className="flex items-center bg-white border border-gray-200 w-full lg:w-[430px]">
            <Search size={16} className="text-gray-400 ml-3 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setQuery(search)}
              placeholder="Search property, developer or location"
              className="flex-1 px-3 py-3 text-sm outline-none min-w-0"
            />
            <button onClick={() => setQuery(search)} className="bg-black text-white px-4 py-3 text-sm font-semibold shrink-0">Search</button>
          </div>
        </div>

        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <p className="text-sm text-gray-600">{filtered.length} properties</p>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 bg-white text-sm text-gray-700"
          >
            <SlidersHorizontal size={14} />
            {showFilters ? "Hide Filters" : "Filters"}
            {activeFilterCount > 0 && (
              <span className="bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{activeFilterCount}</span>
            )}
          </button>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          <aside className={`bg-[#0a1325] border border-[#1e2f4f] p-5 h-fit lg:sticky lg:top-24 shadow-[0_18px_50px_rgba(7,18,38,0.18)] ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="mb-5">
              <p className="text-xs text-white/55 uppercase tracking-widest mb-2">Property Type</p>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((t) => (
                  <button key={t} onClick={() => toggle(types, t, setTypes)} className={filterButtonClass(types.includes(t))}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <p className="text-xs text-white/55 uppercase tracking-widest mb-2">Status</p>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button key={s} onClick={() => toggle(statuses, s, setStatuses)} className={filterButtonClass(statuses.includes(s))}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <p className="text-xs text-white/55 uppercase tracking-widest mb-2">Beds</p>
              <div className="flex flex-wrap gap-2">
                {BEDS.map((b) => (
                  <button key={b} onClick={() => toggle(beds, b, setBeds)} className={filterButtonClass(beds.includes(b))}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <p className="text-xs text-white/55 uppercase tracking-widest mb-2">Price Range</p>
              <div className="flex flex-wrap gap-2">
                {PRICE_OPTIONS.map((opt) => (
                  <button key={opt} onClick={() => setPriceRange(priceRange === opt ? "" : opt)} className={filterButtonClass(priceRange === opt)}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <p className="text-xs text-white/55 uppercase tracking-widest mb-2">Developer</p>
              <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto pr-1">
                {DEVELOPERS.map((d) => (
                  <button key={d} onClick={() => setDeveloper(developer === d ? "" : d)} className={filterButtonClass(developer === d)}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => { setQuery(""); setSearch(""); setTypes([]); setStatuses([]); setBeds([]); setDeveloper(""); setPriceRange(""); }}
              className="w-full border border-white/18 bg-transparent text-white py-2.5 text-sm hover:bg-white/6 transition-colors"
            >
              Clear Filters
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="w-full mt-2 bg-black text-white py-2.5 text-sm lg:hidden"
            >
              Show {filtered.length} Properties
            </button>
          </aside>

          <section>
            <p className="hidden lg:block text-sm text-gray-600 mb-3">{filtered.length} properties found</p>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProperty(p)}
                  className="text-left bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img src={p.image} alt={p.title} className="w-full h-44 object-cover" />
                    <span className="absolute top-2 left-2 bg-black text-white text-[10px] uppercase tracking-[0.15em] px-2 py-1">{p.status}</span>
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1">{p.priceLabel}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <img src={p.developerLogo} alt={p.developer} className="h-4 w-12 object-contain" />
                      <span className="text-xs text-gray-400">{p.developer}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1" style={{ fontFamily: "var(--font-dm-serif), serif" }}>{p.title}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-3"><MapPin size={12} />{p.location}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span className="flex items-center gap-1"><BedDouble size={12} />{p.beds === "Studio" ? "Studio" : `${p.beds} Beds`}</span>
                      <span className="flex items-center gap-1"><Bath size={12} />{p.baths} Baths</span>
                      <span className="flex items-center gap-1"><Maximize2 size={12} />{p.size.toLocaleString()} sqft</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      {activeProperty && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setActiveProperty(null)}>
          <div className="absolute right-0 top-0 h-full w-full sm:max-w-lg bg-white shadow-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold" style={{ fontFamily: "var(--font-dm-serif), serif" }}>{activeProperty.title}</h2>
              <button onClick={() => setActiveProperty(null)} className="text-gray-500"><X size={20} /></button>
            </div>
            <img src={activeProperty.image} alt={activeProperty.title} className="w-full h-64 object-cover" />
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 text-xs uppercase tracking-[0.15em] bg-black text-white">{activeProperty.status}</span>
                <span className="px-2.5 py-1 text-xs uppercase tracking-[0.15em] border border-black text-black">{activeProperty.type}</span>
                {activeProperty.roi && <span className="px-2.5 py-1 text-xs border border-gray-300 text-gray-700">{activeProperty.roi} ROI</span>}
                {activeProperty.completionYear && <span className="px-2.5 py-1 text-xs border border-gray-300 text-gray-700">Completion {activeProperty.completionYear}</span>}
              </div>
              <p className="text-2xl font-bold text-gray-900">{activeProperty.priceLabel}</p>
              <p className="text-sm text-gray-600 flex items-center gap-1"><MapPin size={14} />{activeProperty.location}</p>
              <p className="text-sm text-gray-600"><span className="font-semibold text-gray-900">Developer:</span> {activeProperty.developer}</p>
              <div className="grid grid-cols-3 gap-3 text-xs text-gray-600 pt-2">
                <div className="border border-gray-200 p-2.5 flex items-center gap-1 justify-center"><BedDouble size={12} />{activeProperty.beds === "Studio" ? "Studio" : `${activeProperty.beds} Beds`}</div>
                <div className="border border-gray-200 p-2.5 flex items-center gap-1 justify-center"><Bath size={12} />{activeProperty.baths} Baths</div>
                <div className="border border-gray-200 p-2.5 flex items-center gap-1 justify-center"><Maximize2 size={12} />{activeProperty.size.toLocaleString()} sqft</div>
              </div>
              {activeProperty.tags && activeProperty.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeProperty.tags.map((tag) => (
                    <span key={tag} className="text-[10px] uppercase tracking-[0.15em] border border-gray-300 text-gray-600 px-2 py-1">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="bg-[#f8f7f5] min-h-screen pt-24 pb-16 px-4 md:px-6" />}>
      <PropertiesPageClient />
    </Suspense>
  );
}