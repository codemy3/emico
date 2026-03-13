"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { num: "0%",   label: "Tax on Income",  sub: "No income, capital gains or property tax — ever." },
  { num: "8.2%", label: "Rental Yield",   sub: "Highest average yield among all prime global markets." },
  { num: "10yr", label: "UAE Golden Visa",sub: "UAE Golden Visa eligibility from AED 2M+ property investment." },
  { num: "24/7", label: "Global Hub",     sub: "A business-friendly city with world-class infrastructure and year-round demand." },
];

function HangingBoard() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      transformOrigin: "top center",
      animation: "sway 5s ease-in-out infinite",
      pointerEvents: "none", userSelect: "none",
    }}>
      <div style={{ width: 1, height: 44, background: "#c8c8c8" }} />
      <div style={{
        background: "#111", borderRadius: 8, padding: "16px 20px 14px",
        minWidth: 148, position: "relative",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
        transform: "perspective(500px) rotateX(4deg)",
      }}>
        <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", width: 16, height: 16, borderRadius: "50%", background: "#e5e7eb", border: "2px solid #d1d5db" }} />
        <div style={{ color: "rgba(255,255,255,0.68)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>STARTING FROM</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img
            src="/dirham.png"
            alt=""
            aria-hidden
            style={{ width: 22, height: 22, objectFit: "contain", filter: "brightness(0) invert(1)" }}
          />
          <div style={{ fontFamily: "var(--font-dm-serif), serif", color: "#fff", fontSize: "1.5rem", lineHeight: 1 }}>590K</div>
        </div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, marginTop: 7 }}>ONWARDS</div>
        <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: "linear-gradient(130deg,rgba(255,255,255,0.07) 0%,transparent 55%)", pointerEvents: "none" }} />
      </div>
      <div style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "8px solid #111", marginTop: -1 }} />
    </div>
  );
}

export default function CreativeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState<number | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-white overflow-hidden"
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >

      {/* Desktop hanging tag */}
      <div className="cs-tag-desktop" style={{ position: "absolute", top: 0, right: "6%", zIndex: 50 }}>
        <HangingBoard />
      </div>

      {/* ── TOP SPLIT ── */}
      <div className="grid lg:grid-cols-2" style={{ minHeight: 500 }}>

        {/* LEFT — text */}
        <div
          className="flex flex-col justify-center px-8 md:px-14 lg:px-20 py-16 lg:py-20"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(36px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <span style={{ fontSize: 11, letterSpacing: "0.38em", textTransform: "uppercase", color: "#9ca3af", display: "block", marginBottom: 20 }}>
            Why Invest in Dubai
          </span>
          <h2 style={{
            fontFamily: "var(--font-dm-serif), serif",
            fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
            fontWeight: 400, lineHeight: 1.08, color: "#0a0a0a", marginBottom: 24,
          }}>
            The world&apos;s most
            <br />
            <em style={{ fontStyle: "italic", color: "#888" }}>investable city.</em>
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#6b7280", maxWidth: 400, marginBottom: 36 }}>
            Zero property tax, access to the UAE Golden Visa, strong yield potential, and one of the world's safest and most liveable places to call home.
          </p>
          <a
            href="/properties"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "#111", color: "#fff", fontSize: 13, fontWeight: 600,
              letterSpacing: "0.04em", padding: "13px 24px", alignSelf: "flex-start",
              textDecoration: "none", transition: "background 0.25s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#333")}
            onMouseLeave={e => (e.currentTarget.style.background = "#111")}
          >
            Explore Properties
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* RIGHT — photo */}
        <div className="relative overflow-hidden" style={{ minHeight: 400 }}>

          {/* Mobile hanging tag */}
          <div className="cs-tag-mobile" style={{ position: "absolute", top: 0, right: 20, zIndex: 10 }}>
            <HangingBoard />
          </div>

          {/* ── HERO IMAGE: crystal-clear Dubai skyline, Burj Khalifa, blue sky ── */}
          <img
            src="/skyvview.jpg"
            alt="Dubai skyline clear sky Burj Khalifa"
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center 55%",
              transform: vis ? "scale(1)" : "scale(1.06)",
              transition: "transform 1.6s ease",
            }}
          />
          {/* Subtle vignette */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 35%, rgba(0,0,0,0.18) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(255,255,255,0.06), transparent 40%)" }} />

          {/* Yield card */}
          <div style={{
            position: "absolute", bottom: 28, left: 28,
            background: "rgba(255,255,255,0.96)", backdropFilter: "blur(8px)",
            padding: "14px 18px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s",
            minWidth: 170,
          }}>
            <div style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 4 }}>Avg. Rental Yield</div>
            <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: "2rem", color: "#0a0a0a", lineHeight: 1 }}>8.2%</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#0a0a0a" }} />
              <span style={{ fontSize: 11, color: "#0a0a0a", fontWeight: 600 }}>World&apos;s highest</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div style={{ borderTop: "1px solid #f0f0f0" }}>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{
                padding: "36px 28px",
                borderRight: i < 3 ? "1px solid #f0f0f0" : "none",
                borderBottom: i < 2 ? "1px solid #f0f0f0" : "none",
                background: hov === i ? "#0a0a0a" : "#fff",
                cursor: "default",
                transition: "background 0.35s ease, opacity 0.7s ease, transform 0.7s ease",
                opacity: vis ? 1 : 0,
                transform: vis ? "translateY(0)" : "translateY(20px)",
                transitionDelay: vis ? `${0.2 + i * 0.08}s` : "0s",
              }}
            >
              <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight: 400, lineHeight: 1, color: hov === i ? "#fff" : "#0a0a0a", marginBottom: 6, transition: "color 0.35s ease" }}>
                {s.num}
              </div>
              <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: hov === i ? "rgba(255,255,255,0.4)" : "#9ca3af", marginBottom: 14, fontWeight: 600, transition: "color 0.35s ease" }}>
                {s.label}
              </div>
              <div style={{ width: 24, height: 1, background: hov === i ? "rgba(255,255,255,0.15)" : "#e5e7eb", marginBottom: 12, transition: "background 0.35s ease" }} />
              <p style={{ fontSize: 13, lineHeight: 1.65, color: hov === i ? "rgba(255,255,255,0.45)" : "#9ca3af", transition: "color 0.35s ease", margin: 0 }}>
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM IMAGE STRIP + CTA ── */}
      <div style={{
        borderTop: "1px solid #f0f0f0",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
      }}>
        <div className="flex flex-col lg:flex-row" style={{ minHeight: 240 }}>
          <div className="cs-gallery-grid flex lg:flex-1">
            {[
              "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
              "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80",
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
            ].map((src, i) => (
              <div
                key={i}
                className={`cs-gallery-item relative overflow-hidden ${i === 2 ? "cs-gallery-third" : ""}`}
                style={{ flex: 1, minHeight: 200 }}
              >
                <img
                  src={src}
                  alt={`Dubai property ${i + 1}`}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)" }} />
              </div>
            ))}
          </div>

          <div style={{ background: "#0a0a0a", padding: "36px 32px", display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 260, flexShrink: 0, textAlign: "left" }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 12, textAlign: "left" }}>Ready to invest?</p>
            <h3 style={{ fontFamily: "var(--font-dm-serif), serif", color: "#fff", fontSize: "1.55rem", fontWeight: 400, lineHeight: 1.15, marginBottom: 20, textAlign: "left" }}>
              <span style={{ display: "block" }}>Talk to an expert</span>
              <em style={{ display: "block", color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>today — free.</em>
            </h3>
            <a
              href="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 13, fontWeight: 600, padding: "11px 20px", alignSelf: "flex-start", textDecoration: "none", transition: "background 0.25s, border-color 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#000"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; }}
            >
              Book a Call
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes sway {
          0%   { transform: rotate(-3deg); }
          30%  { transform: rotate(2.5deg); }
          60%  { transform: rotate(-1.5deg); }
          85%  { transform: rotate(2deg); }
          100% { transform: rotate(-3deg); }
        }
        .cs-tag-desktop { display: block; }
        .cs-tag-mobile  { display: none; }
        @media (max-width: 1023px) {
          .cs-tag-desktop { display: none; }
          .cs-tag-mobile  { display: block; }
        }
        @media (max-width: 767px) {
          .cs-gallery-grid { display: grid; grid-template-columns: 1fr 1fr; width: 100%; }
          .cs-gallery-third { display: none; }
        }
      `}</style>
    </section>
  );
}