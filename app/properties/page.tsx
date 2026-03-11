"use client";

import { useMemo, useState } from "react";
import { Bath, BedDouble, MapPin, Maximize2, Search, X } from "lucide-react";

type PropertyType = "Apartment" | "Villa" | "Townhouse" | "Penthouse";
type PropertyStatus = "Ready" | "Off-Plan";

interface Property {
  id: string;
  title: string;
  location: string;
  developer: "Beyond" | "Nakheel" | "Emaar" | "DP World" | "Meraas" | "Sobha";
  type: PropertyType;
  status: PropertyStatus;
  beds: "Studio" | "1" | "2" | "3" | "4" | "5+";
  baths: number;
  size: number;
  price: number;
  priceLabel: string;
  image: string;
}

const PROPERTIES: Property[] = [
  {
    id: "d1",
    title: "Placeholder Residence 01",
    location: "Dubai Central",
    developer: "Emaar",
    type: "Apartment",
    status: "Ready",
    beds: "2",
    baths: 2,
    size: 1120,
    price: 980000,
    priceLabel: "AED 980,000",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
  },
  {
    id: "d2",
    title: "Placeholder Residence 02",
    location: "Waterfront District",
    developer: "Nakheel",
    type: "Villa",
    status: "Off-Plan",
    beds: "4",
    baths: 4,
    size: 3450,
    price: 2800000,
    priceLabel: "AED 2,800,000",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  },
  {
    id: "d3",
    title: "Placeholder Residence 03",
    location: "Marina Side",
    developer: "Meraas",
    type: "Penthouse",
    status: "Ready",
    beds: "3",
    baths: 4,
    size: 2680,
    price: 3300000,
    priceLabel: "AED 3,300,000",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
  },
  {
    id: "d4",
    title: "Placeholder Residence 04",
    location: "Family Community",
    developer: "Sobha",
    type: "Townhouse",
    status: "Off-Plan",
    beds: "3",
    baths: 3,
    size: 2110,
    price: 2200000,
    priceLabel: "AED 2,200,000",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
  },
  {
    id: "d5",
    title: "Placeholder Residence 05",
    location: "Business District",
    developer: "DP World",
    type: "Apartment",
    status: "Ready",
    beds: "1",
    baths: 1,
    size: 760,
    price: 720000,
    priceLabel: "AED 720,000",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
  },
  {
    id: "d6",
    title: "Placeholder Residence 06",
    location: "Urban Core",
    developer: "Beyond",
    type: "Apartment",
    status: "Off-Plan",
    beds: "Studio",
    baths: 1,
    size: 560,
    price: 640000,
    priceLabel: "AED 640,000",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
  },
];

const TYPES: PropertyType[] = ["Apartment", "Villa", "Townhouse", "Penthouse"];
const STATUSES: PropertyStatus[] = ["Ready", "Off-Plan"];
const BEDS = ["Studio", "1", "2", "3", "4", "5+"] as const;
const DEVELOPERS = ["Beyond", "Nakheel", "Emaar", "DP World", "Meraas", "Sobha"] as const;
const PRICE_OPTIONS = ["AED 500K – 1M", "AED 2M – 3M", "AED 3M+"] as const;

function inPriceRange(price: number, range: string) {
  if (range === "AED 500K – 1M") return price >= 500000 && price <= 1000000;
  if (range === "AED 2M – 3M") return price >= 2000000 && price <= 3000000;
  if (range === "AED 3M+") return price >= 3000000;
  return true;
}

export default function PropertiesPage() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [types, setTypes] = useState<PropertyType[]>([]);
  const [statuses, setStatuses] = useState<PropertyStatus[]>([]);
  const [beds, setBeds] = useState<string[]>([]);
  const [developer, setDeveloper] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);

  const toggle = <T extends string>(arr: T[], value: T, setter: (val: T[]) => void) => {
    setter(arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value]);
  };

  const filtered = useMemo(() => {
    return PROPERTIES.filter((p) => {
      const q = query.trim().toLowerCase();
      if (q && !(`${p.title} ${p.location}`.toLowerCase().includes(q))) return false;
      if (types.length && !types.includes(p.type)) return false;
      if (statuses.length && !statuses.includes(p.status)) return false;
      if (beds.length && !beds.includes(p.beds)) return false;
      if (developer && p.developer !== developer) return false;
      if (priceRange && !inPriceRange(p.price, priceRange)) return false;
      return true;
    });
  }, [query, types, statuses, beds, developer, priceRange]);

  return (
    <div className="bg-[#f8f7f5] min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Find Your Perfect Property in Dubai
          </h1>
          <div className="flex items-center bg-white border border-gray-200 w-full lg:w-107.5">
            <Search size={16} className="text-gray-400 ml-3" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search placeholder listings"
              className="flex-1 px-3 py-3 text-sm outline-none"
            />
            <button onClick={() => setQuery(search)} className="bg-black text-white px-5 py-3 text-sm font-semibold">Search</button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          <aside className="bg-white border border-gray-200 p-5 h-fit sticky top-24">
            <div className="mb-5">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Property Type</p>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((t) => (
                  <button key={t} onClick={() => toggle(types, t, setTypes)} className={`px-3 py-1.5 text-xs border ${types.includes(t) ? "bg-black text-white border-black" : "border-gray-300 text-gray-600"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Status</p>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button key={s} onClick={() => toggle(statuses, s, setStatuses)} className={`px-3 py-1.5 text-xs border ${statuses.includes(s) ? "bg-black text-white border-black" : "border-gray-300 text-gray-600"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Beds</p>
              <div className="flex flex-wrap gap-2">
                {BEDS.map((b) => (
                  <button key={b} onClick={() => toggle(beds, b, setBeds)} className={`px-3 py-1.5 text-xs border ${beds.includes(b) ? "bg-black text-white border-black" : "border-gray-300 text-gray-600"}`}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Price Range</p>
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="w-full border border-gray-300 px-3 py-2 text-sm">
                <option value="">All</option>
                {PRICE_OPTIONS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>

            <div className="mb-5">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Developer</p>
              <select value={developer} onChange={(e) => setDeveloper(e.target.value)} className="w-full border border-gray-300 px-3 py-2 text-sm">
                <option value="">All</option>
                {DEVELOPERS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>

            <button
              onClick={() => {
                setQuery(""); setSearch(""); setTypes([]); setStatuses([]); setBeds([]); setDeveloper(""); setPriceRange("");
              }}
              className="w-full border border-gray-300 py-2.5 text-sm"
            >
              Clear Filters
            </button>
          </aside>

          <section>
            <p className="text-sm text-gray-600 mb-3">{filtered.length} placeholder properties found</p>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProperty(p)}
                  className="text-left bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img src={p.image} alt={p.title} className="w-full h-44 object-cover" />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{p.title}</h3>
                      <span className="text-sm font-bold">{p.priceLabel}</span>
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-3"><MapPin size={12} />{p.location}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span className="flex items-center gap-1"><BedDouble size={12} />{p.beds === "Studio" ? "Studio" : `${p.beds} Beds`}</span>
                      <span className="flex items-center gap-1"><Bath size={12} />{p.baths} Baths</span>
                      <span className="flex items-center gap-1"><Maximize2 size={12} />{p.size} sqft</span>
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
          <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>{activeProperty.title}</h2>
              <button onClick={() => setActiveProperty(null)} className="text-gray-500"><X size={20} /></button>
            </div>
            <img src={activeProperty.image} alt={activeProperty.title} className="w-full h-64 object-cover" />
            <div className="p-5 space-y-3">
              <p className="text-sm text-gray-500">Placeholder listing details. Final verified inventory will appear after Trakhees approval.</p>
              <p className="text-2xl font-bold text-gray-900">{activeProperty.priceLabel}</p>
              <p className="text-sm text-gray-600 flex items-center gap-1"><MapPin size={14} />{activeProperty.location}</p>
              <div className="grid grid-cols-3 gap-3 text-xs text-gray-600 pt-2">
                <div className="border border-gray-200 p-2.5 flex items-center gap-1 justify-center"><BedDouble size={12} />{activeProperty.beds}</div>
                <div className="border border-gray-200 p-2.5 flex items-center gap-1 justify-center"><Bath size={12} />{activeProperty.baths}</div>
                <div className="border border-gray-200 p-2.5 flex items-center gap-1 justify-center"><Maximize2 size={12} />{activeProperty.size}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
