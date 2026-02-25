"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import { developers } from "@/lib/developers-data";

/* ─────────────────────────────────────────────────────────────
   CSS RULES:
   1. NO global resets whatsoever — no *, no :root, no html/body
   2. NO margin:0 / padding:0 on any wildcard selector
   3. Every rule is explicitly scoped to .pv .specific-class
   4. box-sizing only applied to .pv itself, not children
───────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');

.pv {
  background: #ffffff;
  color: #07234B;
  font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  min-height: 100vh;
}

/* ── BREADCRUMB ── */
.pv .pv-bc {
  max-width: 1320px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 20px;
  padding-left: clamp(1rem, 4vw, 2.5rem);
  padding-right: clamp(1rem, 4vw, 2.5rem);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #777777;
  list-style: none;
}
.pv .pv-bc li {
  display: flex;
  align-items: center;
  gap: 8px;
}
.pv .pv-bc a {
  color: #777777;
  text-decoration: none;
}
.pv .pv-bc a:hover {
  color: #07234B;
}
.pv .pv-bc-sep {
  color: #cccccc;
}
.pv .pv-bc-cur {
  color: #07234B;
  font-weight: 500;
}

/* ── HERO ── */
.pv .pv-hero {
  text-align: center;
  padding-top: clamp(2.5rem, 6vw, 5rem);
  padding-bottom: clamp(2rem, 5vw, 3.5rem);
  padding-left: clamp(1rem, 4vw, 2rem);
  padding-right: clamp(1rem, 4vw, 2rem);
}
.pv .pv-hero-h1 {
  font-family: 'Libre Baskerville', Georgia, serif;
  font-size: clamp(28px, 5.5vw, 62px);
  font-weight: 700;
  color: #07234B;
  line-height: 1.15;
  margin-top: 0;
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
  letter-spacing: -0.01em;
}

/* ── SEARCH ── */
.pv .pv-search-wrap {
  max-width: 620px;
  margin-left: auto;
  margin-right: auto;
}
.pv .pv-search-form {
  display: flex;
  align-items: stretch;
  border: 1.5px solid #d0d0d0;
  border-radius: 6px;
  overflow: hidden;
  background: #ffffff;
  transition: border-color 0.2s;
}
.pv .pv-search-form:focus-within {
  border-color: #07234B;
}
.pv .pv-search-input {
  flex: 1;
  border: none;
  outline: none;
  font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  font-size: 15px;
  color: #07234B;
  padding: 14px 18px;
  background: transparent;
  margin: 0;
}
.pv .pv-search-input::placeholder {
  color: #aaaaaa;
}
.pv .pv-search-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #E8672A;
  color: #ffffff;
  border: none;
  cursor: pointer;
  font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  font-size: 15px;
  font-weight: 600;
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 24px;
  padding-right: 24px;
  transition: background 0.18s;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  margin: 0;
}
.pv .pv-search-btn:hover {
  background: #d45a20;
}

/* ── COUNT BAR ── */
.pv .pv-count-bar {
  max-width: 1320px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 16px;
  padding-left: clamp(1rem, 4vw, 2.5rem);
  padding-right: clamp(1rem, 4vw, 2.5rem);
}
.pv .pv-count-text {
  font-size: 12px;
  font-weight: 500;
  color: #777777;
  letter-spacing: 0.03em;
  margin: 0;
}
.pv .pv-count-text strong {
  color: #07234B;
  font-weight: 600;
}

/* ── DIVIDER ── */
.pv .pv-divider {
  max-width: 1320px;
  margin-top: 14px;
  margin-left: auto;
  margin-right: auto;
  padding-left: clamp(1rem, 4vw, 2.5rem);
  padding-right: clamp(1rem, 4vw, 2.5rem);
}
.pv .pv-divider-line {
  height: 1px;
  background: #eeeeee;
}

/* ── 4-COLUMN GRID ── */
.pv .pv-grid {
  max-width: 1320px;
  margin-left: auto;
  margin-right: auto;
  padding-top: clamp(1.5rem, 3vw, 2.5rem);
  padding-bottom: clamp(3rem, 8vh, 6rem);
  padding-left: clamp(1rem, 4vw, 2.5rem);
  padding-right: clamp(1rem, 4vw, 2.5rem);
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(20px, 2.5vw, 32px);
}
@media (min-width: 540px) {
  .pv .pv-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 900px) {
  .pv .pv-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 1100px) {
  .pv .pv-grid { grid-template-columns: repeat(4, 1fr); }
}

/* ── CARD ── */
.pv .pv-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  animation: pvcardIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.pv .pv-card:hover .pv-card-img {
  transform: scale(1.045);
}
.pv .pv-card:hover .pv-card-name {
  text-decoration: underline;
  text-underline-offset: 3px;
}
.pv .pv-card:hover .pv-card-arrow {
  color: #07234B;
  transform: translate(2px, -2px);
}

/* photo */
.pv .pv-card-photo {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  aspect-ratio: 4 / 3;
  background: #eeeeee;
  flex-shrink: 0;
}
.pv .pv-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}

/* white logo badge bottom-left */
.pv .pv-card-logo-wrap {
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 2;
  background: rgba(255, 255, 255, 0.97);
  border-radius: 3px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  min-height: 34px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.pv .pv-card-logo {
  max-width: 90px;
  max-height: 30px;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
}
.pv .pv-card-logo-text {
  font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: #07234B;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;
}

/* card body */
.pv .pv-card-body {
  padding-top: 14px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.pv .pv-card-name-row {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-bottom: 8px;
}
.pv .pv-card-name {
  font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #07234B;
  line-height: 1.3;
  flex: 1;
  letter-spacing: -0.01em;
}
.pv .pv-card-arrow {
  flex-shrink: 0;
  color: #777777;
  margin-top: 3px;
  transition: color 0.2s, transform 0.2s;
}
.pv .pv-card-desc {
  font-size: 12.5px;
  font-weight: 400;
  color: #444444;
  line-height: 1.75;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

/* ── PAGINATION ── */
.pv .pv-pag {
  max-width: 1320px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 1.5rem;
  padding-bottom: 4rem;
  padding-left: clamp(1rem, 4vw, 2.5rem);
  padding-right: clamp(1rem, 4vw, 2.5rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  border-top: 1px solid #eeeeee;
}
.pv .pv-pag-btn {
  font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #555555;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 18px;
  padding-right: 18px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  -webkit-tap-highlight-color: transparent;
  margin: 0;
}
.pv .pv-pag-btn:hover:not(:disabled) {
  background: #f5f5f5;
  border-color: #bbbbbb;
}
.pv .pv-pag-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.pv .pv-pag-center {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #777777;
}
.pv .pv-pag-sel {
  font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #07234B;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 10px;
  padding-right: 24px;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  outline: none;
  margin: 0;
}
.pv .pv-pag-sel:hover {
  border-color: #999999;
}
.pv .pv-pag-sel-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}
.pv .pv-pag-sel-wrap svg {
  position: absolute;
  right: 6px;
  pointer-events: none;
  color: #888888;
}

.pv .pv-empty {
  padding-top: 3rem;
  padding-bottom: 3rem;
  font-size: 14px;
  color: #777777;
}

@keyframes pvcardIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: none; }
}
`;

const PER_PAGE = 12;

export default function DevelopersPage() {
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const [page,  setPage]  = useState(1);
  const topRef            = useRef<HTMLDivElement>(null);

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
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

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
        <h1 className="pv-hero-h1">
          Real Estate Developers<br />in Dubai &amp; The UAE
        </h1>
        <div className="pv-search-wrap">
          <div className="pv-search-form">
            <input
              className="pv-search-input"
              type="text"
              placeholder="Search Developers"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button className="pv-search-btn" onClick={handleSearch}>
              Search <Search size={16} />
            </button>
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
              <div className="pv-card-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dev.coverImage}
                  alt={dev.name}
                  className="pv-card-img"
                  loading={idx < 8 ? "eager" : "lazy"}
                />
                <div className="pv-card-logo-wrap">
                  {dev.logoIsText ? (
                    <span className="pv-card-logo-text">{dev.name}</span>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={dev.logo} alt={`${dev.name} logo`} className="pv-card-logo" />
                  )}
                </div>
              </div>

              <div className="pv-card-body">
                <div className="pv-card-name-row">
                  <span className="pv-card-name">{dev.name}</span>
                  <ArrowUpRight size={15} className="pv-card-arrow" />
                </div>
                <p className="pv-card-desc">{dev.description}</p>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pv-pag">
          <button
            className="pv-pag-btn"
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
          >
            Back
          </button>
          <div className="pv-pag-center">
            <span>Page:</span>
            <div className="pv-pag-sel-wrap">
              <select
                className="pv-pag-sel"
                value={page}
                onChange={(e) => goTo(Number(e.target.value))}
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>of {totalPages}</span>
          </div>
          <button
            className="pv-pag-btn"
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
}