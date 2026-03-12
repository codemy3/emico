"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ── useInView hook ── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, visible } = useInView(0.5);
  useEffect(() => {
    if (!visible) return;
    let cur = 0;
    const step = Math.max(1, Math.ceil(to / 55));
    const id = setInterval(() => {
      cur += step;
      if (cur >= to) { setVal(to); clearInterval(id); }
      else setVal(cur);
    }, 18);
    return () => clearInterval(id);
  }, [visible, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function FadeUp({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}
function FadeLeft({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-44px)", transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms` }}>
      {children}
    </div>
  );
}
function FadeRight({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(44px)", transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const pillars = [
  { num: "01", title: "Primary Market Access",  description: "Direct access to off-plan and ready inventory from Dubai's leading developers — with transparent pricing, structured payment plans, and honest handover timelines.", img: "/developers/downtown.jpeg" },
  { num: "02", title: "Investor Guidance",        description: "Data-backed advisory on rental yields, capital appreciation corridors, and market entry positioning across both affordable and ultra-prime segments.",               img: "/developers/dubaihills.jpeg" },
  { num: "03", title: "End-to-End Support",       description: "From shortlisting and developer negotiations through to documentation and key handover — one dedicated team handles the entire process.",                          img: "/developers/dubaicreek.jpeg" },
];

const values = [
  { roman: "I",   title: "Transparency First", body: "No hidden fees or conflicting incentives. We disclose pricing, developer margins, and our advisory structure so every decision is made with complete clarity." },
  { roman: "II",  title: "Dubai Specialists",   body: "We work exclusively in Dubai's property market. That singular focus gives us deeper developer relationships, sharper market intelligence, and better client outcomes." },
  { roman: "III", title: "Client-Aligned",       body: "Every recommendation is shaped around your objective — whether lifestyle, rental yield, or long-term capital appreciation — never by developer commissions." },
];

const snapshot = [
  { label: "Focus Market",  value: "Dubai, UAE" },
  { label: "Inventory",     value: "Ready & Off-Plan" },
  { label: "Asset Classes", value: "Residential & Commercial" },
  { label: "Head Office",   value: "Business Bay, Dubai" },
  { label: "Languages",     value: "8+ Languages" },
  { label: "Property Tax",  value: "0% — Always" },
];

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 80);
    const handle = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handle, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", handle); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        .about-root { background: #f5f1eb; color: #1a1814; font-family: 'Jost', sans-serif; }
        .ab-serif   { font-family: 'Cormorant Garamond', 'Playfair Display', serif; }

        /* ── CONTAINER ── */
        .ab-container { max-width: 1320px; margin: 0 auto; padding: 0 56px; }
        @media (max-width: 1024px) { .ab-container { padding: 0 36px; } }
        @media (max-width: 640px)  { .ab-container { padding: 0 20px; } }

        /* ── SECTION SPACING ── */
        .ab-section      { padding: 72px 0; }
        .ab-section-sm   { padding: 56px 0; }
        @media (max-width: 768px) {
          .ab-section    { padding: 52px 0; }
          .ab-section-sm { padding: 40px 0; }
        }

        /* ── STATS BAND ── */
        .ab-stats-grid { display: grid; grid-template-columns: repeat(4,1fr); border-left: 1px solid rgba(255,255,255,0.06); }
        @media (max-width: 768px) {
          .ab-stats-grid { grid-template-columns: repeat(2,1fr); border-left: none; }
          .ab-stats-cell { border-left: 1px solid rgba(255,255,255,0.06) !important; }
          .ab-stats-grid > div:nth-child(1),
          .ab-stats-grid > div:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,0.06); }
          .ab-stats-grid > div:nth-child(odd) { border-left: none !important; }
        }
        @media (max-width: 640px) {
          .ab-stats-cell { padding: 24px 20px !important; }
        }

        /* ── WHO WE ARE ── */
        .ab-who-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 56px; align-items: start; margin-bottom: 40px; }
        @media (max-width: 900px) {
          .ab-who-grid { grid-template-columns: 1fr; gap: 40px; }
        }

        .ab-who-photo { height: 460px; overflow: hidden; }
        @media (max-width: 900px) { .ab-who-photo { height: 320px; } }
        @media (max-width: 480px) { .ab-who-photo { height: 260px; } }

        .ab-who-badge {
          position: absolute; top: -18px; right: -18px;
          background: #1a1814; padding: 22px 26px; min-width: 120px; z-index: 5;
        }
        @media (max-width: 900px) {
          .ab-who-badge { top: -14px; right: -14px; padding: 16px 20px; min-width: 100px; }
        }
        @media (max-width: 480px) {
          .ab-who-badge { top: -10px; right: -10px; padding: 12px 16px; }
        }

        /* ── MOSAIC ── */
        .ab-mosaic { display: grid; grid-template-columns: 1.9fr 1fr 1fr; height: 340px; gap: 4px; }
        @media (max-width: 900px) {
          .ab-mosaic { grid-template-columns: 1fr 1fr; height: auto; }
          .ab-mosaic > div:first-child { grid-column: span 2; height: 240px; }
          .ab-mosaic > div:not(:first-child) { height: 180px; }
        }
        @media (max-width: 480px) {
          .ab-mosaic { grid-template-columns: 1fr; }
          .ab-mosaic > div:first-child { grid-column: span 1; height: 200px; }
          .ab-mosaic > div:not(:first-child) { height: 160px; }
        }

        .mosaic-img { transition: transform 0.7s ease; }
        .mosaic-wrap:hover .mosaic-img { transform: scale(1.05); }

        /* ── VALUES ── */
        .ab-principles-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
        @media (max-width: 640px) {
          .ab-principles-header { flex-direction: column; align-items: flex-start; gap: 20px; margin-bottom: 28px; }
        }

        .ab-values-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 3px; }
        @media (max-width: 900px) { .ab-values-grid { grid-template-columns: 1fr; } }

        .ab-val { transition: background 0.3s ease, transform 0.3s ease; cursor: default; }
        .ab-val:hover { background: #0a0908 !important; transform: translateY(-3px); }
        .ab-val:hover .ab-vt  { color: #fff !important; }
        .ab-val:hover .ab-vb  { color: rgba(255,255,255,0.52) !important; }
        .ab-val:hover .ab-vn  { color: rgba(255,255,255,0.04) !important; }
        .ab-val:hover .ab-vbar { background: rgba(255,255,255,0.4) !important; }

        /* ── PILLARS ── */
        .ab-pillar { overflow: hidden; transition: box-shadow 0.35s ease; }
        .ab-pillar:hover { box-shadow: 0 24px 64px rgba(0,0,0,0.13); }
        .ab-pillar-img { transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94); }
        .ab-pillar:hover .ab-pillar-img { transform: scale(1.05); }

        .ab-pillar-inner { display: grid; grid-template-columns: 1fr 1fr; background: #fff; box-shadow: 0 2px 24px rgba(0,0,0,0.05); }
        @media (max-width: 768px) {
          .ab-pillar-inner { grid-template-columns: 1fr !important; }
          .ab-pillar-img-wrap  { order: 1 !important; height: 240px !important; }
          .ab-pillar-text { order: 2 !important; padding: 28px 24px !important; }
        }

        .ab-pillar-img-wrap { position: relative; height: 360px; overflow: hidden; }
        .ab-pillar-text { padding: 40px 44px; display: flex; flex-direction: column; justify-content: center; }
        @media (max-width: 1024px) { .ab-pillar-text { padding: 32px 32px; } }

        /* ── SNAPSHOT ── */
        .ab-snapshot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        @media (max-width: 1024px) { .ab-snapshot-grid { gap: 48px; } }
        @media (max-width: 768px)  { .ab-snapshot-grid { grid-template-columns: 1fr; gap: 40px; } }

        .ab-collage { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
        .ab-collage-top  { grid-column: span 2; height: 250px; overflow: hidden; }
        .ab-collage-bot  { height: 170px; overflow: hidden; }
        @media (max-width: 480px) {
          .ab-collage-top  { height: 200px; }
          .ab-collage-bot  { height: 130px; }
        }

        .snap-img:hover { transform: scale(1.04); }
        .who-img:hover  { transform: scale(1.03); }
        .snap-row { transition: background 0.2s; }
        .snap-row:hover { background: rgba(255,255,255,0.04); }

        /* ── CTA BANNER ── */
        .ab-cta-grid { display: grid; grid-template-columns: 1fr auto; gap: 60px; align-items: center; }
        @media (max-width: 900px) { .ab-cta-grid { grid-template-columns: 1fr; gap: 36px; } }

        .ab-cta-btns { display: flex; flex-direction: column; gap: 10px; flex-shrink: 0; }
        @media (max-width: 900px) { .ab-cta-btns { flex-direction: row; flex-wrap: wrap; } }
        @media (max-width: 480px) {
          .ab-cta-btns { flex-direction: column; }
          .ab-cta-btns a { justify-content: center !important; }
        }

        .cta-primary:hover  { background: #333 !important; }
        .cta-outline:hover  { border-color: rgba(255,255,255,0.5) !important; color: rgba(255,255,255,0.85) !important; }

        @keyframes lineReveal {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
      `}</style>

      <main className="about-root min-h-screen">

        {/* ══ HERO ══ */}
        <section style={{ width: "100%", position: "relative", height: "clamp(260px, 38vw, 440px)", overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80"
            alt="About Emico"
            fetchPriority="high"
            decoding="sync"
            style={{
              position: "absolute", inset: 0, width: "100%", height: "115%",
              objectFit: "cover", objectPosition: "center 30%",
              transform: `translateY(${scrollY * 0.3}px)`, top: "-7.5%",
              willChange: "transform",
            }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 55%, transparent 80%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 65%)" }} />

          <div style={{ position: "absolute", top: 0, bottom: 0, left: "clamp(1.25rem,5vw,3.5rem)", right: "clamp(1.25rem,5vw,3.5rem)", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "center", gap: 4 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.44em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", opacity: heroReady ? 1 : 0, transform: heroReady ? "none" : "translateY(12px)", transition: "opacity 0.6s ease 0ms, transform 0.6s ease 0ms", margin: 0 }}>
              About Emico
            </p>
            {["Advisory Built", "for Dubai Property"].map((line, i) => (
              <div key={line} style={{ overflow: "hidden" }}>
                <span
                  className="ab-serif"
                  style={{
                    display: "block",
                    fontSize: "clamp(24px, 5vw, 58px)",
                    fontWeight: i === 1 ? 400 : 700,
                    color: i === 1 ? "rgba(255,255,255,0.7)" : "#fff",
                    fontStyle: i === 1 ? "italic" : "normal",
                    letterSpacing: "0.02em",
                    opacity: heroReady ? 1 : 0,
                    transform: heroReady ? "translateY(0)" : "translateY(100%)",
                    transition: `opacity 0.7s ease ${100 + i * 130}ms, transform 0.7s ease ${100 + i * 130}ms`,
                  }}
                >{line}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ══ STATS BAND ══ */}
        <div style={{ backgroundColor: "#0a0908" }}>
          <div className="ab-container">
            <div className="ab-stats-grid">
              {[
                { n: 1000, suffix: "+", label: "Properties Matched" },
                { n: 2,    suffix: "M", label: "Golden Visa Entry",  raw: "AED 2M", raw_only: true },
                { n: 8,    suffix: "+", label: "Languages Spoken" },
                { n: 0,    suffix: "%", label: "Tax on Property" },
              ].map((item, i) => (
                <div key={item.label} className="ab-stats-cell" style={{ padding: "32px 40px", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="ab-serif" style={{ fontSize: "clamp(1.6rem, 3vw, 3rem)", fontWeight: 700, color: "#fff", lineHeight: 1, marginBottom: 9 }}>
                    {item.raw_only ? item.raw : <Counter to={item.n} suffix={item.suffix} />}
                  </div>
                  <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ WHO WE ARE ══ */}
        <section style={{ paddingTop: "clamp(40px,6vw,72px)" }}>
          <div className="ab-container">
            <div className="ab-who-grid">

              <FadeLeft>
                <p style={{ fontSize: 10, letterSpacing: "0.44em", textTransform: "uppercase", color: "#1a1814", marginBottom: 22 }}>Who We Are</p>
                <h2 className="ab-serif" style={{ fontSize: "clamp(2rem, 4vw, 4rem)", fontWeight: 400, lineHeight: 1.08, color: "#1a1814", margin: "0 0 28px" }}>
                  A focused advisory<br />platform for{" "}
                  <em style={{ fontWeight: 600, fontStyle: "italic" }}>high&#8209;conviction</em>
                  <br />property decisions.
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: "clamp(13px,1.5vw,15px)", lineHeight: 1.95, color: "#5c5248" }}>
                  <p style={{ margin: 0 }}>Emico is a Dubai-based real estate advisory platform connecting buyers and investors with curated opportunities across the city's primary market — from entry-level apartments to ultra-prime developments.</p>
                  <p style={{ margin: 0 }}>We combine location intelligence, developer due diligence, and practical financial guidance to help clients make well-informed decisions — whether purchasing a first home or building a cross-border investment portfolio.</p>
                  <p style={{ margin: 0 }}>We work with both ready and off-plan inventory, aligning every recommendation to each client's specific objective: lifestyle quality, rental yield, or long-term capital appreciation.</p>
                </div>
              </FadeLeft>

              <FadeRight delay={100}>
                <div style={{ position: "relative" }}>
                  <div className="ab-who-photo">
                    <img src="/developers/emaar.webp" alt="Dubai skyline" className="who-img" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 1.2s ease" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to top, rgba(0,0,0,0.62), transparent)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", bottom: 20, left: 20 }}>
                      <p style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: "0 0 4px" }}>Primary Market</p>
                      <p className="ab-serif" style={{ fontSize: "clamp(1.2rem,2vw,1.5rem)", fontWeight: 600, color: "#fff", margin: 0, lineHeight: 1.2 }}>Dubai, UAE</p>
                    </div>
                  </div>
                  <div className="ab-who-badge">
                    <div className="ab-serif" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 700, color: "#fff", lineHeight: 1, marginBottom: 5 }}>12+</div>
                    <div style={{ fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.62)", lineHeight: 1.5 }}>Developer<br />Partners</div>
                  </div>
                </div>
              </FadeRight>
            </div>
          </div>

          {/* Mosaic */}
          <div className="ab-mosaic">
            {[
              { src: "/developers/dubaicreek.jpeg", area: "Dubai Creek Harbour", label: "Waterfront Living" },
              { src: "/developers/dubaihills.jpeg", area: "Dubai Hills",          label: "Urban Retreat" },
              { src: "/developers/sobha.webp",      area: "Sobha Realty",         label: "Crafted Excellence" },
            ].map((item, i) => (
              <FadeUp key={item.area} delay={i * 100} style={{ height: "100%" }}>
                <div className="mosaic-wrap" style={{ position: "relative", overflow: "hidden", height: "100%" }}>
                  <img src={item.src} alt={item.area} className="mosaic-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)" }} />
                  <div style={{ position: "absolute", bottom: 20, left: 20 }}>
                    <p style={{ fontSize: 9, letterSpacing: "0.34em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: "0 0 4px" }}>{item.area}</p>
                    <p className="ab-serif" style={{ fontSize: "clamp(1.1rem,1.8vw,1.45rem)", fontWeight: 600, color: "#fff", margin: 0, lineHeight: 1.2 }}>{item.label}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ══ VALUES ══ */}
        <section className="ab-section" style={{ backgroundColor: "#0a0908" }}>
          <div className="ab-container">
            <div className="ab-principles-header">
              <FadeLeft>
                <p style={{ fontSize: 10, letterSpacing: "0.44em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 18 }}>Our Principles</p>
                <h2 className="ab-serif" style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)", fontWeight: 400, color: "#fff", lineHeight: 1.12, margin: 0 }}>
                  What guides every<br /><em style={{ fontStyle: "italic", fontWeight: 600 }}>conversation.</em>
                </h2>
              </FadeLeft>
              <FadeRight>
                <Link href="/contact" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "rgba(255,255,255,0.8)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.35)", paddingBottom: 3, whiteSpace: "nowrap" }}>
                  Talk To Us →
                </Link>
              </FadeRight>
            </div>

            <div className="ab-values-grid">
              {values.map((item, i) => (
                <FadeUp key={item.title} delay={i * 110}>
                  <article className="ab-val" style={{ backgroundColor: "#141210", padding: "clamp(24px,3vw,36px) clamp(20px,2.5vw,28px)", position: "relative", overflow: "hidden", height: "100%" }}>
                    <span className="ab-vn ab-serif" style={{ position: "absolute", top: 12, right: 20, fontSize: "clamp(3.5rem,5vw,5.5rem)", fontWeight: 700, color: "rgba(255,255,255,0.04)", lineHeight: 1, userSelect: "none" }}>
                      {item.roman}
                    </span>
                    <div className="ab-vbar" style={{ width: 30, height: 2, backgroundColor: "rgba(255,255,255,0.25)", marginBottom: 28 }} />
                    <h3 className="ab-vt ab-serif" style={{ fontSize: "clamp(1.3rem,2vw,1.55rem)", fontWeight: 600, color: "#fff", marginBottom: 14, lineHeight: 1.2 }}>{item.title}</h3>
                    <p className="ab-vb" style={{ fontSize: 13.5, lineHeight: 1.9, color: "rgba(255,255,255,0.42)", margin: 0 }}>{item.body}</p>
                  </article>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HOW WE WORK (pillars) ══ */}
        <section className="ab-section" style={{ backgroundColor: "#f5f1eb" }}>
          <div className="ab-container">
            <FadeUp>
              <div style={{ textAlign: "center", marginBottom: "clamp(32px,4vw,48px)" }}>
                <p style={{ fontSize: 10, letterSpacing: "0.44em", textTransform: "uppercase", color: "#1a1814", marginBottom: 18 }}>Our Approach</p>
                <h2 className="ab-serif" style={{ fontSize: "clamp(2rem, 4vw, 3.8rem)", fontWeight: 400, color: "#1a1814", lineHeight: 1.1, margin: "0 auto", maxWidth: 500 }}>
                  Three pillars of<br /><em style={{ fontStyle: "italic", fontWeight: 600 }}>our advisory.</em>
                </h2>
              </div>
            </FadeUp>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {pillars.map((item, i) => (
                <FadeUp key={item.title} delay={80}>
                  <div className="ab-pillar">
                    <div className="ab-pillar-inner" style={{ gridTemplateColumns: "1fr 1fr" }}>
                      <div className="ab-pillar-img-wrap" style={{ order: i % 2 === 0 ? 1 : 2 }}>
                        <img src={item.img} alt={item.title} className="ab-pillar-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top right, rgba(0,0,0,0.35), transparent)" }} />
                        <span className="ab-serif" style={{ position: "absolute", bottom: 14, right: 20, fontSize: "clamp(4rem,6vw,7rem)", fontWeight: 700, color: "rgba(255,255,255,0.13)", lineHeight: 1, userSelect: "none" }}>{item.num}</span>
                      </div>
                      <div className="ab-pillar-text" style={{ order: i % 2 === 0 ? 2 : 1 }}>
                        <span style={{ fontSize: 10, letterSpacing: "0.44em", textTransform: "uppercase", color: "#1a1814", marginBottom: 18, display: "block" }}>Step {item.num}</span>
                        <div style={{ width: 36, height: 2, backgroundColor: "#e4ddd4", marginBottom: 20 }} />
                        <h3 className="ab-serif" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.3rem)", fontWeight: 600, color: "#1a1814", marginBottom: 16, lineHeight: 1.18 }}>{item.title}</h3>
                        <p style={{ fontSize: "clamp(13px,1.3vw,14.5px)", lineHeight: 1.9, color: "#5c5248", margin: "0 0 28px" }}>{item.description}</p>
                        <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1a1814", textDecoration: "none", borderBottom: "1px solid rgba(26,24,20,0.25)", paddingBottom: 2, width: "fit-content" }}>
                          Learn More
                          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: 11, height: 11 }}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══ COMPANY SNAPSHOT ══ */}
        <section className="ab-section" style={{ backgroundColor: "#0a0908" }}>
          <div className="ab-container">
            <div className="ab-snapshot-grid">

              <FadeLeft>
                <div className="ab-collage">
                  <div className="ab-collage-top">
                    <img src="/developers/emaar.webp" alt="Dubai skyline" className="snap-img" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 1s ease" }} />
                  </div>
                  <div className="ab-collage-bot">
                    <img src="/developers/dubaihills.jpeg" alt="Dubai Hills" className="snap-img" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 1s ease" }} />
                  </div>
                  <div className="ab-collage-bot">
                    <img src="/developers/valley.jpg" alt="The Valley" className="snap-img" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 1s ease" }} />
                  </div>
                </div>
              </FadeLeft>

              <FadeRight delay={100}>
                <p style={{ fontSize: 10, letterSpacing: "0.44em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 22 }}>Company Snapshot</p>
                <h2 className="ab-serif" style={{ fontSize: "clamp(1.7rem, 3.2vw, 3rem)", fontWeight: 400, color: "#fff", lineHeight: 1.18, marginBottom: 36 }}>
                  Operating at the<br /><em style={{ fontStyle: "italic", fontWeight: 600 }}>heart of Dubai's</em><br />property market.
                </h2>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {snapshot.map((row, i) => (
                    <div key={row.label} className="snap-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 8px", borderBottom: i < snapshot.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none", gap: 12 }}>
                      <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)" }}>{row.label}</span>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.78)", fontWeight: 500, textAlign: "right" }}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="cta-primary" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 32, padding: "14px 30px", backgroundColor: "#1a1814", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", transition: "background 0.2s" }}>
                  Speak With an Advisor
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: 12, height: 12 }}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </FadeRight>
            </div>
          </div>
        </section>

        {/* ══ CTA BANNER ══ */}
        <section style={{ position: "relative", overflow: "hidden" }}>
          <img src="/developers/dubaicreek.jpeg" alt="Dubai Creek Harbour" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 55%" }} />
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(8,7,6,0.84)" }} />
          <div style={{ position: "relative", zIndex: 10, padding: "clamp(40px,6vw,72px) 0" }}>
            <div className="ab-container">
              <div className="ab-cta-grid">
                <FadeLeft>
                  <p style={{ fontSize: 10, letterSpacing: "0.44em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>Get Started</p>
                  <h2 className="ab-serif" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", fontWeight: 400, color: "#fff", lineHeight: 1.08, marginBottom: 20 }}>
                    Ready to find your<br /><em style={{ fontStyle: "italic", fontWeight: 600 }}>next property?</em>
                  </h2>
                  <p style={{ fontSize: "clamp(13px,1.4vw,15px)", color: "rgba(255,255,255,0.42)", lineHeight: 1.85, maxWidth: 480 }}>
                    Our team is available to answer questions, run the numbers, or walk you through what's available in Dubai right now — with no obligation.
                  </p>
                </FadeLeft>
                <FadeRight delay={150}>
                  <div className="ab-cta-btns">
                    <Link href="/contact" className="cta-primary" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 38px", backgroundColor: "#1a1814", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", transition: "background 0.2s", whiteSpace: "nowrap" }}>
                      Book a Consultation
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: 12, height: 12 }}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                    <Link href="/properties" className="cta-outline" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "16px 38px", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.62)", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", transition: "border-color 0.2s, color 0.2s", whiteSpace: "nowrap" }}>
                      Browse Properties
                    </Link>
                  </div>
                </FadeRight>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}