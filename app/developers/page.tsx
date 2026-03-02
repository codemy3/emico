"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import { developers } from "@/lib/developers-data";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');

.pv {
  background: #f8f7f5;
  color: #07234B;
  font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  min-height: 100vh;
}

/* ── BREADCRUMB ── */
.pv .pv-bc {
  max-width: 1320px; margin-left: auto; margin-right: auto;
  padding-top: 20px;
  padding-left: clamp(1rem, 4vw, 2.5rem);
  padding-right: clamp(1rem, 4vw, 2.5rem);
  display: flex; align-items: center; gap: 8px;
  font-size: 12px; color: #888; list-style: none;
}
.pv .pv-bc li { display: flex; align-items: center; gap: 8px; }
.pv .pv-bc a { color: #888; text-decoration: none; transition: color .15s; }
.pv .pv-bc a:hover { color: #07234B; }
.pv .pv-bc-sep { color: #ccc; }
.pv .pv-bc-cur { color: #07234B; font-weight: 500; }

/* ── HERO ── */
.pv .pv-hero {
  max-width: 1320px; margin-left: auto; margin-right: auto;
  padding-top: clamp(1.5rem, 3vw, 2.5rem);
  padding-bottom: clamp(1rem, 2.5vw, 2rem);
  padding-left: clamp(1rem, 4vw, 2.5rem);
  padding-right: clamp(1rem, 4vw, 2.5rem);
}
.pv .pv-hero-eyebrow {
  font-size: 11px; font-weight: 600; letter-spacing: 0.15em;
  text-transform: uppercase; color: #9a8060; margin-bottom: 10px; display: block;
}

/* ── HERO INLINE ROW ── */
.pv .pv-hero-inline {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 3vw, 2.5rem);
  flex-wrap: wrap;
}
.pv .pv-hero-h1 {
  font-family: 'Libre Baskerville', Georgia, serif;
  font-size: clamp(20px, 3vw, 38px); font-weight: 700;
  color: #000; line-height: 1.15; margin: 0;
  letter-spacing: -0.02em; white-space: nowrap; flex-shrink: 0;
}

/* ── SEARCH ── */
.pv .pv-search-wrap { flex: 1; min-width: 240px; max-width: 460px; }
.pv .pv-search-form {
  display: flex; align-items: stretch;
  border: 1.5px solid #d8d3cc; border-radius: 4px;
  overflow: hidden; background: #fff; transition: border-color 0.2s, box-shadow 0.2s;
}
.pv .pv-search-form:focus-within { border-color: #07234B; box-shadow: 0 0 0 3px rgba(7,35,75,0.08); }
.pv .pv-search-input {
  flex: 1; border: none; outline: none;
  font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  font-size: 14px; color: #07234B; padding: 11px 16px; background: transparent; margin: 0;
}
.pv .pv-search-input::placeholder { color: #aaa; }
.pv .pv-search-btn {
  display: flex; align-items: center; gap: 7px;
  background: #000; color: #fff; border: none; cursor: pointer;
  font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  font-size: 13px; font-weight: 600; letter-spacing: 0.04em;
  padding: 11px 20px; transition: background 0.18s; white-space: nowrap; margin: 0;
}
.pv .pv-search-btn:hover { background: #222; }

/* ── COUNT BAR ── */
.pv .pv-count-bar {
  max-width: 1320px; margin-left: auto; margin-right: auto;
  padding-top: 12px;
  padding-left: clamp(1rem, 4vw, 2.5rem);
  padding-right: clamp(1rem, 4vw, 2.5rem);
}
.pv .pv-count-text { font-size: 12px; font-weight: 500; color: #888; letter-spacing: 0.02em; margin: 0; }
.pv .pv-count-text strong { color: #07234B; font-weight: 600; }

/* ── DIVIDER ── */
.pv .pv-divider {
  max-width: 1320px; margin-top: 12px; margin-left: auto; margin-right: auto;
  padding-left: clamp(1rem, 4vw, 2.5rem);
  padding-right: clamp(1rem, 4vw, 2.5rem);
}
.pv .pv-divider-line { height: 1px; background: #e2ddd8; }

/* ── GRID ── */
.pv .pv-grid {
  max-width: 1320px; margin-left: auto; margin-right: auto;
  padding-top: clamp(1.2rem, 2.5vw, 2rem);
  padding-bottom: clamp(3rem, 8vh, 6rem);
  padding-left: clamp(1rem, 4vw, 2.5rem);
  padding-right: clamp(1rem, 4vw, 2.5rem);
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 cols on mobile */
  gap: clamp(10px, 2vw, 20px);
}
@media (min-width: 720px)  { .pv .pv-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1100px) { .pv .pv-grid { grid-template-columns: repeat(4, 1fr); } }

/* ── CARD ── */
.pv .pv-card {
  display: block; text-decoration: none; color: inherit;
  border-radius: 8px; overflow: hidden;
  position: relative; aspect-ratio: 4 / 3;
  background: #0d1b3e;
  animation: pvcardIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}
.pv .pv-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 24px 60px rgba(5, 15, 40, 0.28);
}

/* background image */
.pv .pv-card-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%; object-fit: cover; display: block;
  opacity: 0.42;
  transition: opacity 0.55s ease, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}
.pv .pv-card:hover .pv-card-img { opacity: 0.32; transform: scale(1.07); }

/* vignette gradient */
.pv .pv-card-gradient {
  position: absolute; inset: 0; z-index: 1;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.15) 0%,
    rgba(0, 0, 0, 0.35) 35%,
    rgba(0, 0, 0, 0.92) 100%
  );
}

/* ── LOGO AREA ── */
.pv .pv-card-logo-area {
  position: absolute; top: 0; left: 0; right: 0; height: 62%;
  display: flex; align-items: center; justify-content: center;
  z-index: 2;
  padding: 16px;
  box-sizing: border-box;
}
.pv .pv-card-logo-pill {
  display: flex; align-items: center; justify-content: center;
  width: 100%; height: 100%;
  transition: transform 0.22s ease;
}
.pv .pv-card:hover .pv-card-logo-pill { transform: scale(1.08); }

/* Logo: fill available space uniformly using % of card width */
.pv .pv-card-logo {
  width: 70%;          /* fills 70% of card width — same ratio on all cards */
  max-width: 200px;    /* cap on large screens */
  height: auto;        /* let height scale naturally */
  max-height: 80px;    /* prevent very tall logos */
  object-fit: contain;
  object-position: center center; /* always center within box */
  display: block;
  filter: brightness(0) invert(1);
  opacity: 0.95;
}

.pv .pv-card-logo-text {
  font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  font-size: clamp(13px, 2.5vw, 18px); font-weight: 700; color: #fff;
  letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap;
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
  text-align: center;
}

/* bottom content */
.pv .pv-card-body {
  position: absolute; bottom: 0; left: 0; right: 0;
  z-index: 3; padding: 12px 12px;
}
.pv .pv-card-name-row {
  display: flex; align-items: flex-end; justify-content: space-between;
  gap: 6px; margin-bottom: 3px;
}
.pv .pv-card-name {
  font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  font-size: clamp(11px, 1.8vw, 14px); font-weight: 600; color: #fff;
  line-height: 1.25; letter-spacing: -0.01em;
}
.pv .pv-card-arrow {
  flex-shrink: 0; color: rgba(255,255,255,0.45);
  transition: color 0.2s, transform 0.2s; margin-bottom: 1px;
}
.pv .pv-card:hover .pv-card-arrow { color: #fff; transform: translate(3px, -3px); }
.pv .pv-card-location {
  font-size: clamp(8px, 1.2vw, 10px); font-weight: 500; color: rgba(255,255,255,0.5);
  letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 6px;
}
.pv .pv-card-tags { display: flex; gap: 4px; flex-wrap: wrap; }
.pv .pv-card-tag {
  font-size: clamp(7px, 1vw, 9px); font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;
  color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.2);
  border-radius: 2px; padding: 2px 6px; background: rgba(255,255,255,0.07);
}

/* hide tags on very small screens to avoid overflow */
@media (max-width: 380px) { .pv .pv-card-tags { display: none; } }

/* ── PAGINATION ── */
.pv .pv-pag {
  max-width: 1320px; margin-left: auto; margin-right: auto;
  padding-top: 1.5rem; padding-bottom: 4rem;
  padding-left: clamp(1rem, 4vw, 2.5rem);
  padding-right: clamp(1rem, 4vw, 2.5rem);
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 12px; border-top: 1px solid #e2ddd8;
}
.pv .pv-pag-btn {
  font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  font-size: 13px; font-weight: 500; color: #555;
  background: #fff; border: 1px solid #ddd; border-radius: 4px;
  padding: 8px 18px; cursor: pointer; transition: background .15s, border-color .15s; margin: 0;
}
.pv .pv-pag-btn:hover:not(:disabled) { background: #f5f5f5; border-color: #bbb; }
.pv .pv-pag-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.pv .pv-pag-center { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #777; }
.pv .pv-pag-sel {
  font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  font-size: 13px; font-weight: 600; color: #07234B;
  background: #fff; border: 1px solid #ddd; border-radius: 4px;
  padding: 6px 24px 6px 10px; appearance: none; cursor: pointer; outline: none; margin: 0;
}
.pv .pv-pag-sel-wrap { position: relative; display: inline-flex; align-items: center; }
.pv .pv-pag-sel-wrap svg { position: absolute; right: 6px; pointer-events: none; color: #888; }
.pv .pv-empty { padding: 3rem 0; font-size: 14px; color: #777; }

@keyframes pvcardIn {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: none; }
}
`;

const PER_PAGE = 12;

export default function DevelopersPage() {
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = "pv-dev-css";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  const filtered = developers.filter((d) => {
    const q = query.trim().toLowerCase();
    return !q || d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const goTo = (p: number) => {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSearch = () => { setQuery(input); setPage(1); };
  useEffect(() => { setPage(1); }, [query]);

  return (
    <div className="pv">

      {/* BREADCRUMB */}
      <nav>
        <ol className="pv-bc">
          <li><a href="/">Home</a></li>
          <li><span className="pv-bc-sep">/</span></li>
          <li><span className="pv-bc-cur">Developers</span></li>
        </ol>
      </nav>

      {/* HERO */}
      <div className="pv-hero">
        <span className="pv-hero-eyebrow">UAE Real Estate</span>
        <div className="pv-hero-inline">
          <h1 className="pv-hero-h1">Top Developers in Dubai &amp; The UAE</h1>
          <div className="pv-search-wrap">
            <div className="pv-search-form">
              <input
                className="pv-search-input"
                type="text"
                placeholder="Search by developer name…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button className="pv-search-btn" onClick={handleSearch}>
                <Search size={14} /> Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* COUNT + DIVIDER */}
      <div className="pv-count-bar">
        <p className="pv-count-text">
          Showing <strong>{filtered.length}</strong> developer{filtered.length !== 1 ? "s" : ""}
          {query && <> for &ldquo;<strong>{query}</strong>&rdquo;</>}
        </p>
      </div>
      <div className="pv-divider"><div className="pv-divider-line" /></div>

      {/* GRID */}
      <div ref={topRef} className="pv-grid">
        {paginated.length === 0 ? (
          <div className="pv-empty" style={{ gridColumn: "1/-1" }}>
            No developers found for &ldquo;{query}&rdquo;.
          </div>
        ) : (
          paginated.map((dev, idx) => (
            <Link
              key={dev.id}
              href={dev.href}
              className="pv-card"
              style={{ animationDelay: `${idx * 0.04}s` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dev.coverImage}
                alt={dev.name}
                className="pv-card-img"
                loading={idx < 8 ? "eager" : "lazy"}
              />
              <div className="pv-card-gradient" />
              <div className="pv-card-logo-area">
                <div className="pv-card-logo-pill">
                  {dev.logoIsText ? (
                    <span className="pv-card-logo-text">{dev.name}</span>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={dev.logo}
                      alt={`${dev.name} logo`}
                      className="pv-card-logo"
                    />
                  )}
                </div>
              </div>
              <div className="pv-card-body">
                <div className="pv-card-name-row">
                  <span className="pv-card-name">{dev.name}</span>
                  <ArrowUpRight size={14} className="pv-card-arrow" />
                </div>
                <div className="pv-card-location">{dev.location}</div>
                <div className="pv-card-tags">
                  {dev.marketPosition.slice(0, 2).map((tag) => (
                    <span key={tag} className="pv-card-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pv-pag">
          <button className="pv-pag-btn" onClick={() => goTo(page - 1)} disabled={page === 1}>Back</button>
          <div className="pv-pag-center">
            <span>Page:</span>
            <div className="pv-pag-sel-wrap">
              <select className="pv-pag-sel" value={page} onChange={(e) => goTo(Number(e.target.value))}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span>of {totalPages}</span>
          </div>
          <button className="pv-pag-btn" onClick={() => goTo(page + 1)} disabled={page === totalPages}>Next</button>
        </div>
      )}

    </div>
  );
}