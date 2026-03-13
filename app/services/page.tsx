"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
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
    let start = 0;
    const step = Math.ceil(to / 60);
    const id = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(id); }
      else setVal(start);
    }, 16);
    return () => clearInterval(id);
  }, [visible, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const services = [
  { num: "01", title: "Buyer Representation",              description: "Shortlisting, project comparison, developer coordination, pricing guidance, and negotiation support for buyers entering Dubai's market with clarity.",          img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85",  alt: "Luxury Dubai apartment interior" },
  { num: "02", title: "Investment Advisory",               description: "Opportunity screening based on yield, appreciation potential, payment structure, community demand, and exit flexibility across Dubai's primary market.",        img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=85",  alt: "Dubai Marina investment property" },
  { num: "03", title: "Developer & Project Due Diligence", description: "We assess delivery track record, product quality, market positioning, and project-stage risk before you commit capital to any development.",                   img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=85",  alt: "Modern Dubai development" },
  { num: "04", title: "Portfolio Positioning",             description: "For repeat investors and family offices, we help allocate across launch, under-construction, and ready assets based on objective and holding horizon.",         img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=85", alt: "Palm Jumeirah luxury villa" },
  { num: "05", title: "Transaction Support",               description: "From reservation through SPA review, paperwork coordination, and payment milestone tracking — we stay involved until the deal is properly closed.",             img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=85",  alt: "Dubai property transaction" },
  { num: "06", title: "After-Sale Guidance",               description: "Support doesn't stop at purchase. We continue advising on handover, resale planning, rental strategy, and next-step portfolio decisions.",                       img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=85", alt: "Dubai skyline view" },
];

const process = [
  { step: "01", title: "Understand the Brief", body: "Budget, objective, risk tolerance, timeline, and preferred communities — we frame the search before we begin." },
  { step: "02", title: "Curate the Shortlist", body: "A tighter set of relevant options, not a bloated list. Every pick is explained in practical market terms." },
  { step: "03", title: "Compare with Context", body: "Developer strength, payment plans, yield potential, handover timing — real comparisons, clearly laid out." },
  { step: "04", title: "Execute Cleanly",       body: "From reservation to completion — we coordinate every step and keep the process structured and transparent." },
];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms` }}>
      {children}
    </div>
  );
}
function FadeLeft({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-40px)", transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms` }}>
      {children}
    </div>
  );
}
function FadeRight({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(40px)", transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function ServicesPage() {
  const [scrollY, setScrollY] = useState(0);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const handle = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="svc-root min-h-screen" style={{ backgroundColor: "#f5f3ef", color: "#1a1814" }}>

      <style>{`
        /* ── GLOBAL ── */
        .svc-root { font-family: 'DM Sans', sans-serif; }

        /* ── HERO ── */
        .svc-hero { position: relative; height: 92vh; min-height: 620px; overflow: hidden; }
        @media (max-width: 768px) {
          .svc-hero { height: 100svh; min-height: 520px; }
        }

        .svc-hero-content { max-width: 1280px; margin: 0 auto; padding: 0 24px; width: 100%; }
        @media (max-width: 768px) {
          .svc-hero-content { padding: 0 20px; }
        }

        .svc-hero-text { max-width: 680px; }
        @media (max-width: 768px) {
          .svc-hero-text { max-width: 100%; }
        }

        .svc-h1 {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: clamp(2.6rem, 7vw, 6rem);
          line-height: 1.04;
        }

        .svc-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        @media (max-width: 480px) {
          .svc-hero-btns { flex-direction: column; }
          .svc-hero-btns a { justify-content: center !important; text-align: center; }
        }

        /* ── STATS BAR ── */
        .svc-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 640px) {
          .svc-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .svc-stats-grid > div:nth-child(1),
          .svc-stats-grid > div:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,0.1); }
          .svc-stats-grid > div:nth-child(odd) { border-left: none !important; }
        }
        @media (max-width: 768px) {
          .svc-stats-item { padding: 16px 18px !important; }
        }

        /* ── SECTION WRAPPER ── */
        .svc-container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        @media (max-width: 768px) {
          .svc-container { padding: 0 20px; }
        }

        /* ── SERVICES SECTION ── */
        .svc-section { padding: 80px 0 60px; }
        @media (max-width: 768px) {
          .svc-section { padding: 56px 0 40px; }
        }

        .svc-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 56px; flex-wrap: wrap; gap: 20px; }
        @media (max-width: 768px) {
          .svc-header { flex-direction: column; align-items: flex-start; margin-bottom: 36px; gap: 16px; }
        }

        /* ── SERVICES GRID ── */
        .svc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background-color: #e4ddd4; }
        @media (max-width: 1024px) {
          .svc-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .svc-grid { grid-template-columns: 1fr; }
        }

        /* card image zoom */
        .svc-img { transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94); }
        .svc-card:hover .svc-img { transform: scale(1.06); }

        /* ── SPLIT SECTION ── */
        .split-section { padding: 60px 0; }
        @media (max-width: 768px) {
          .split-section { padding: 40px 0; }
        }

        .split-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; background-color: #e4ddd4; }
        @media (max-width: 768px) {
          .split-grid { grid-template-columns: 1fr; }
        }

        .split-img-wrap { position: relative; min-height: 500px; overflow: hidden; }
        @media (max-width: 768px) {
          .split-img-wrap { min-height: 320px; }
        }

        .split-right { padding: 64px 52px; display: flex; flex-direction: column; justify-content: center; min-height: 500px; }
        @media (max-width: 1024px) {
          .split-right { padding: 48px 36px; }
        }
        @media (max-width: 768px) {
          .split-right { padding: 40px 24px; min-height: auto; }
        }

        .split-img { transition: transform 1.2s ease; }
        .split-img:hover { transform: scale(1.03); }

        /* ── HOW WE WORK ── */
        .process-section { padding: 80px 0; }
        @media (max-width: 768px) {
          .process-section { padding: 56px 0; }
        }

        .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; background-color: #e4ddd4; }
        @media (max-width: 1024px) {
          .process-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .process-grid { grid-template-columns: 1fr; }
        }

        .process-card { padding: 40px 32px; height: 100%; }
        @media (max-width: 768px) {
          .process-card { padding: 32px 24px; }
        }

        /* ── CTA ── */
        .cta-section { position: relative; overflow: hidden; }
        .cta-inner { padding: 100px 0; }
        @media (max-width: 768px) {
          .cta-inner { padding: 64px 0; }
        }

        .cta-grid { display: grid; grid-template-columns: 1fr auto; gap: 40px 80px; align-items: center; }
        @media (max-width: 900px) {
          .cta-grid { grid-template-columns: 1fr; gap: 40px; }
        }

        .cta-btns { display: flex; flex-direction: column; gap: 10px; }
        @media (max-width: 900px) {
          .cta-btns { flex-direction: row; flex-wrap: wrap; }
        }
        @media (max-width: 480px) {
          .cta-btns { flex-direction: column; }
          .cta-btns a { justify-content: center !important; }
        }

        /* ── BUTTON HOVERS ── */
        .hero-btn-primary:hover { background-color: #e8e8e8 !important; }
      `}</style>

      {/* ══ HERO ══ */}
      <section className="svc-hero">
        <img
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=90"
          alt="Dubai skyline"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "115%",
            objectFit: "cover", objectPosition: "center",
            transform: `translateY(${scrollY * 0.35}px)`,
            top: "-7.5%", willChange: "transform",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(15,12,8,0.93) 0%, rgba(15,12,8,0.6) 55%, rgba(15,12,8,0.15) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,12,8,0.55) 0%, transparent 50%)" }} />

        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", paddingTop: "84px" }}>
          <div className="svc-hero-content">
            <div className="svc-hero-text">
              <p style={{
                fontSize: 11, letterSpacing: "0.46em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)", marginBottom: 28,
                opacity: heroReady ? 1 : 0, transform: heroReady ? "none" : "translateY(16px)",
                transition: "opacity 0.7s ease 0ms, transform 0.7s ease 0ms",
              }}>Advisory Services</p>

              {["Real estate advice", "built around", "decisions."].map((line, i) => (
                <div key={line} style={{ overflow: "hidden" }}>
                  <div style={{
                    opacity: heroReady ? 1 : 0,
                    transform: heroReady ? "translateY(0)" : "translateY(100%)",
                    transition: `opacity 0.8s ease ${150 + i * 120}ms, transform 0.8s ease ${150 + i * 120}ms`,
                  }}>
                    <span className="svc-h1" style={{
                      display: "block",
                      fontWeight: i === 2 ? 400 : 600,
                      fontStyle: i === 2 ? "italic" : "normal",
                      color: i === 2 ? "rgba(255,255,255,0.65)" : "#ffffff",
                      marginBottom: i === 2 ? 28 : 0,
                    }}>{line}</span>
                  </div>
                </div>
              ))}

              <p style={{
                fontSize: 15, lineHeight: 1.85, color: "rgba(255,255,255,0.55)",
                maxWidth: 480, marginBottom: 40,
                opacity: heroReady ? 1 : 0, transform: heroReady ? "none" : "translateY(20px)",
                transition: "opacity 0.8s ease 600ms, transform 0.8s ease 600ms",
              }}>
                Emico works across buyer representation, investment strategy, project due diligence, and transaction support — for clients navigating Dubai's primary market.
              </p>

              <div className="svc-hero-btns" style={{
                opacity: heroReady ? 1 : 0, transform: heroReady ? "none" : "translateY(20px)",
                transition: "opacity 0.8s ease 750ms, transform 0.8s ease 750ms",
              }}>
                <Link href="/contact" className="hero-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 32px", backgroundColor: "#ffffff", color: "#000000", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none" }}>
                  Speak With an Advisor
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: 13, height: 13 }}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <Link href="/properties" style={{ display: "inline-flex", alignItems: "center", padding: "15px 32px", border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none" }}>
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)", backgroundColor: "rgba(15,12,8,0.55)",
          opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0)" : "translateY(100%)",
          transition: "opacity 0.8s ease 900ms, transform 0.8s ease 900ms",
        }}>
          <div className="svc-hero-content">
            <div className="svc-stats-grid">
              {[
                { n: 1000, suffix: "+", label: "Properties Sold" },
                { n: 6,    suffix: "",  label: "Advisory Services" },
                { n: 8,    suffix: "+", label: "Languages Spoken" },
                { n: 0,    suffix: "%", label: "Tax on Property" },
              ].map((item, i) => (
                <div key={item.label} className="svc-stats-item" style={{ padding: "22px 32px", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontSize: "clamp(1.4rem, 2vw, 1.9rem)", fontWeight: 700, color: "#fff", lineHeight: 1, marginBottom: 5 }}>
                    <Counter to={item.n} suffix={item.suffix} />
                  </div>
                  <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES GRID ══ */}
      <section className="svc-section">
        <div className="svc-container">
          <div className="svc-header">
            <FadeLeft>
              <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#9a8b78", marginBottom: 16 }}>Core Services</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 600, lineHeight: 1.1, color: "#1a1814", margin: 0 }}>
                Practical support across
                <br /><em style={{ fontStyle: "italic", fontWeight: 400, color: "#7a6e64" }}>the full buying cycle.</em>
              </h2>
            </FadeLeft>
            <FadeRight>
              <p style={{ fontSize: 14, lineHeight: 1.85, color: "#5c5248", maxWidth: 360 }}>
                Six areas of advisory, designed to reduce noise and help you move with a clearer read on Dubai's market.
              </p>
            </FadeRight>
          </div>

          <div className="svc-grid">
            {services.map((s, i) => (
              <FadeUp key={s.title} delay={i * 80}>
                <article className="svc-card" style={{ backgroundColor: "#f5f3ef", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
                  <div style={{ position: "relative", height: 220, overflow: "hidden", flexShrink: 0 }}>
                    <img src={s.img} alt={s.alt} className="svc-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,24,20,0.45) 0%, transparent 60%)" }} />
                    <span style={{ position: "absolute", top: 16, left: 16, fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", lineHeight: 1 }}>{s.num}</span>
                  </div>
                  <div style={{ padding: "28px 24px 32px", flex: 1 }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 600, color: "#1a1814", marginBottom: 12, lineHeight: 1.25 }}>{s.title}</h3>
                    <p style={{ fontSize: 13.5, lineHeight: 1.85, color: "#5c5248" }}>{s.description}</p>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SPLIT ══ */}
      <section className="split-section">
        <div className="svc-container">
          <div className="split-grid">
            <FadeLeft>
              <div className="split-img-wrap">
                <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=85" alt="Luxury Dubai property interior" className="split-img" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,24,20,0.75) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontSize: "1.45rem", fontStyle: "italic", color: "#fff", lineHeight: 1.5 }}>
                    "Dubai offers one of the world's most compelling combinations of yield, lifestyle, and tax efficiency."
                  </p>
                  <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: 12 }}>— Emico Advisory Team</p>
                </div>
              </div>
            </FadeLeft>

            <FadeRight>
              <div className="split-right" style={{ backgroundColor: "#1a1814" }}>
                <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>Who It's For</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 600, lineHeight: 1.2, color: "#fff", marginBottom: 32 }}>
                  Built for clients who need direction,
                  <em style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.55)" }}> not just inventory.</em>
                </h2>
                {[
                  "First-time buyers entering Dubai real estate",
                  "Investors comparing off-plan and ready inventory",
                  "End users relocating to Dubai or upgrading homes",
                  "Portfolio buyers seeking market-backed allocation advice",
                ].map((item, i, arr) => (
                  <FadeUp key={item} delay={i * 100}>
                    <div style={{ padding: "16px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none", display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 20, height: 1, backgroundColor: "#c8b99a", flexShrink: 0 }} />
                      <p style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.65)", margin: 0 }}>{item}</p>
                    </div>
                  </FadeUp>
                ))}
                <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 36, padding: "13px 28px", backgroundColor: "#fff", color: "#000", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", alignSelf: "flex-start" }}>
                  Get in Touch
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: 13, height: 13 }}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ══ HOW WE WORK ══ */}
      <section className="process-section">
        <div className="svc-container">
          <FadeUp>
            <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#9a8b78", marginBottom: 16 }}>How We Work</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 600, lineHeight: 1.15, color: "#1a1814", maxWidth: 460, marginBottom: 52 }}>
              A tighter process from brief
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "#7a6e64" }}> to transaction.</em>
            </h2>
          </FadeUp>

          <div className="process-grid">
            {process.map((item, i) => (
              <FadeUp key={item.step} delay={i * 100}>
                <article className="process-card" style={{ backgroundColor: "#1a1814" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
                    <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: 0 }}>Step</p>
                    <span style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontSize: "3rem", fontWeight: 700, color: "rgba(255,255,255,0.07)", lineHeight: 1 }}>{item.step}</span>
                  </div>
                  <div style={{ width: 28, height: 1, backgroundColor: "#c8b99a", marginBottom: 20 }} />
                  <h3 style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 600, color: "#fff", lineHeight: 1.3, marginBottom: 14 }}>{item.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.85, color: "rgba(255,255,255,0.5)", margin: 0 }}>{item.body}</p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="cta-section">
        <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=90" alt="Dubai Marina" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(15,12,8,0.95) 0%, rgba(15,12,8,0.7) 55%, rgba(15,12,8,0.2) 100%)" }} />
        <div className="cta-inner" style={{ position: "relative", zIndex: 1 }}>
          <div className="svc-container">
            <div className="cta-grid">
              <FadeLeft>
                <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>Next Step</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.8rem)", fontWeight: 600, lineHeight: 1.1, color: "#fff", marginBottom: 20 }}>
                  Need support on a specific
                  <br /><em style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.55)" }}>investment brief or buying objective?</em>
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.5)", maxWidth: 520 }}>
                  Start with a consultation and we can narrow the market based on your budget, timeline, community preferences, and intended use — with no obligation.
                </p>
              </FadeLeft>
              <FadeRight delay={200}>
                <div className="cta-btns">
                  <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 36px", backgroundColor: "#fff", color: "#000", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", whiteSpace: "nowrap" }}>
                    Contact Emico
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: 13, height: 13 }}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                  <Link href="/properties" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "16px 36px", border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", whiteSpace: "nowrap" }}>
                    Browse Properties
                  </Link>
                </div>
              </FadeRight>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}