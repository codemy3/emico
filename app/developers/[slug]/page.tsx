// app/developers/[slug]/page.tsx
// ─────────────────────────────────────────────────────────────
// This single file handles ALL 20 community detail pages.
// Next.js reads the [slug] folder name and auto-generates:
//   /developers/downtown-dubai
//   /developers/jvc
//   /developers/damac-hills  ...etc
// ─────────────────────────────────────────────────────────────

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { developers, getDeveloperBySlug } from "@/lib/developers-data";

/* ── Tell Next.js which slugs to pre-render at build time ── */
export async function generateStaticParams() {
  return developers.map((d) => ({ slug: d.id }));
}

/* ── Per-page SEO metadata ── */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dev = getDeveloperBySlug(slug);
  if (!dev) return {};
  return {
    title: `${dev.name} | Real Estate Communities in Dubai & UAE`,
    description: dev.description,
  };
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default async function DeveloperDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dev = getDeveloperBySlug(slug);
  if (!dev) notFound();

  return (
    <>
      <style>{CSS}</style>
      <div className="cd">

        {/* ── BREADCRUMB ── */}
        <nav>
          <ol className="cd-bc">
            <li><Link href="/">Home</Link></li>
            <li><span className="cd-sep">/</span></li>
            <li><Link href="/developers">Communities</Link></li>
            <li><span className="cd-sep">/</span></li>
            <li><span className="cd-bc-cur">{dev.name}</span></li>
          </ol>
        </nav>

        {/* ── HERO IMAGE ── */}
        <div className="cd-hero">
          <div className="cd-hero-img-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dev.coverImage} alt={dev.name} className="cd-hero-img" />
            <div className="cd-hero-overlay" />

            {/* Logo badge — top-right */}
            <div className="cd-hero-logo-wrap">
              {dev.logoIsText ? (
                <span className="cd-hero-logo-text">{dev.name}</span>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={dev.logo} alt={`${dev.name} logo`} className="cd-hero-logo" />
              )}
            </div>

            {/* Title overlay — bottom-left */}
            <div className="cd-hero-title-wrap">
              <p className="cd-hero-location">📍 {dev.location}</p>
              <h1 className="cd-hero-h1">{dev.name}</h1>
              <p className="cd-hero-dev">Developed by <strong>{dev.developer}</strong></p>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="cd-body">
          <div className="cd-layout">

            {/* ── MAIN COLUMN ── */}
            <main className="cd-main">

              {/* About */}
              <section className="cd-section">
                <h2 className="cd-section-h">About {dev.name}</h2>
                <p className="cd-section-text">{dev.longDescription}</p>
              </section>

              {/* Property types */}
              <section className="cd-section">
                <h2 className="cd-section-h">Properties in {dev.name}</h2>
                <p className="cd-section-sub">
                  Browse the latest off-plan and ready properties available in {dev.name}.
                </p>

                {/* Filter tabs */}
                <div className="cd-tabs">
                  {dev.propertyTypes.map((t, i) => (
                    <button key={t} className={`cd-tab${i === 0 ? " active" : ""}`}>
                      {t}
                    </button>
                  ))}
                </div>

                {/* Placeholder property cards */}
                <div className="cd-prop-grid">
                  {[1, 2, 3].map((i) => (
                    <Link
                      key={i}
                      href="#" // Replace with actual property detail route if available
                      className="cd-prop-card"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="cd-prop-img-wrap">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={dev.coverImage} alt="Property" className="cd-prop-img" />
                        <span className="cd-prop-badge">Off-Plan</span>
                      </div>
                      <div className="cd-prop-body">
                        <p className="cd-prop-type">Apartment</p>
                        <h3 className="cd-prop-name">{dev.name} — Residence {i}</h3>
                        <p className="cd-prop-price">From AED 1,200,000</p>
                        <div className="cd-prop-meta">
                          <span>2 Beds</span><span className="cd-dot">·</span>
                          <span>2 Baths</span><span className="cd-dot">·</span>
                          <span>1,150 sqft</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="cd-prop-cta">
                  <button className="cd-btn-primary">View All Properties</button>
                </div>
              </section>
            </main>

            {/* ── SIDEBAR ── */}
            <aside className="cd-sidebar">

              {/* Key facts */}
              <div className="cd-sidebar-card">
                <h3 className="cd-sidebar-label">Key Facts</h3>
                <ul className="cd-facts">
                  <li className="cd-fact">
                    <span className="cd-fact-k">Developer</span>
                    <span className="cd-fact-v">{dev.developer}</span>
                  </li>
                  <li className="cd-fact">
                    <span className="cd-fact-k">Location</span>
                    <span className="cd-fact-v">{dev.location}</span>
                  </li>
                  <li className="cd-fact">
                    <span className="cd-fact-k">Property Types</span>
                    <span className="cd-fact-v">{dev.propertyTypes.join(", ")}</span>
                  </li>
                </ul>
              </div>

              {/* Market position */}
              <div className="cd-sidebar-card">
                <h3 className="cd-sidebar-label">Market Position</h3>
                <div className="cd-pills">
                  {dev.marketPosition.map((p) => (
                    <span key={p} className="cd-pill">{p}</span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="cd-sidebar-card cd-cta-card">
                <h3 className="cd-cta-title">Interested in {dev.name}?</h3>
                <p className="cd-cta-text">
                  Speak with our expert advisors to find the best property for your needs and budget.
                </p>
                <button className="cd-btn-white cd-btn-full">Book a Free Consultation</button>
                <button className="cd-btn-outline-white cd-btn-full">Download Brochure</button>
              </div>

            </aside>
          </div>
        </div>

        {/* ── BACK ── */}
        <div className="cd-back-wrap">
          <Link href="/developers" className="cd-back-link">← Back to all Communities</Link>
        </div>

      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   CSS — scoped under .cd
───────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

.cd {
  --cd-black:  #0a0a0a;
  --cd-white:  #ffffff;
  --cd-g1:     #1a1a1a;
  --cd-g2:     #2e2e2e;
  --cd-g3:     #555;
  --cd-g4:     #888;
  --cd-g5:     #bbb;
  --cd-g6:     #e8e8e8;
  --cd-g7:     #f4f4f4;
  --cd-serif:  'Cormorant Garamond', Georgia, serif;
  --cd-sans:   'DM Sans', ui-sans-serif, system-ui, sans-serif;
}
.cd *, .cd *::before, .cd *::after { box-sizing: border-box; margin: 0; padding: 0; }
.cd { background: var(--cd-white); min-height: 100vh; font-family: var(--cd-sans); color: var(--cd-black); }

/* BREADCRUMB */
.cd .cd-bc {
  max-width: 1280px; margin: 0 auto;
  padding: 18px clamp(1rem,4vw,2.5rem) 0;
  display: flex; align-items: center; gap: 7px;
  font-size: 12px; color: var(--cd-g4); list-style: none; flex-wrap: wrap;
}
.cd .cd-bc a { color: var(--cd-g4); text-decoration: none; transition: color .15s; }
.cd .cd-bc a:hover { color: var(--cd-black); }
.cd .cd-sep { color: var(--cd-g5); }
.cd .cd-bc-cur { color: var(--cd-black); font-weight: 500; }

/* HERO */
.cd .cd-hero { max-width: 1280px; margin: 0 auto; padding: 18px clamp(1rem,4vw,2.5rem) 0; }
.cd .cd-hero-img-wrap {
  position: relative; width: 100%;
  height: clamp(260px, 46vw, 520px);
  border-radius: 4px; overflow: hidden; background: var(--cd-g6);
}
.cd .cd-hero-img { width: 100%; height: 100%; object-fit: cover; display: block; filter: grayscale(12%); }
.cd .cd-hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.6) 100%);
}
/* logo — top right */
.cd .cd-hero-logo-wrap {
  position: absolute; top: 18px; right: 18px; z-index: 3;
  background: rgba(255,255,255,0.97); border-radius: 3px;
  padding: 7px 13px; display: flex; align-items: center; justify-content: center;
  min-width: 90px; min-height: 38px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
}
.cd .cd-hero-logo { max-width: 90px; max-height: 30px; width: auto; height: auto; object-fit: contain; }
.cd .cd-hero-logo-text { font-family: var(--cd-sans); font-size: 10px; font-weight: 700; color: var(--cd-black); letter-spacing: .07em; text-transform: uppercase; }
/* title — bottom left */
.cd .cd-hero-title-wrap {
  position: absolute; bottom: 0; left: 0; right: 0; z-index: 3;
  padding: clamp(1.5rem,4vw,2.5rem);
}
.cd .cd-hero-location { font-size: 13px; color: rgba(255,255,255,.75); margin-bottom: 7px; }
.cd .cd-hero-h1 { font-family: var(--cd-serif); font-size: clamp(26px,5vw,52px); font-weight: 700; color: #fff; line-height: 1.12; letter-spacing: -.015em; margin-bottom: 8px; }
.cd .cd-hero-dev { font-size: 13px; color: rgba(255,255,255,.75); }
.cd .cd-hero-dev strong { color: #fff; }

/* BODY */
.cd .cd-body { max-width: 1280px; margin: 0 auto; padding: clamp(2rem,4vw,3rem) clamp(1rem,4vw,2.5rem) 3rem; }
.cd .cd-layout { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
@media (min-width: 960px) { .cd .cd-layout { grid-template-columns: 1fr 320px; align-items: start; } }

/* SECTIONS */
.cd .cd-section { margin-bottom: 2.5rem; }
.cd .cd-section-h {
  font-family: var(--cd-serif); font-size: clamp(20px,2.5vw,28px);
  font-weight: 700; color: var(--cd-black);
  padding-bottom: .75rem; margin-bottom: 1rem;
  border-bottom: 1px solid var(--cd-g6);
}
.cd .cd-section-text { font-size: 15px; color: var(--cd-g2); line-height: 1.8; }
.cd .cd-section-sub { font-size: 13px; color: var(--cd-g4); margin-bottom: 1.25rem; line-height: 1.6; }

/* TABS */
.cd .cd-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 1.5rem; }
.cd .cd-tab {
  font-family: var(--cd-sans); font-size: 12px; font-weight: 600;
  letter-spacing: .05em; text-transform: uppercase;
  color: var(--cd-black); background: var(--cd-white);
  border: 1.5px solid var(--cd-g5); border-radius: 2px;
  padding: 7px 18px; cursor: pointer; transition: all .15s;
}
.cd .cd-tab.active, .cd .cd-tab:hover { background: var(--cd-black); color: var(--cd-white); border-color: var(--cd-black); }

/* PROPERTY CARDS */
.cd .cd-prop-grid { display: grid; grid-template-columns: 1fr; gap: 18px; }
@media (min-width: 600px) { .cd .cd-prop-grid { grid-template-columns: repeat(2,1fr); } }
@media (min-width: 1000px) { .cd .cd-prop-grid { grid-template-columns: repeat(3,1fr); } }
.cd .cd-prop-card { border: 1px solid var(--cd-g6); border-radius: 3px; overflow: hidden; background: var(--cd-white); transition: box-shadow .2s, transform .2s; }
.cd .cd-prop-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,.09); transform: translateY(-3px); }
.cd .cd-prop-img-wrap { position: relative; aspect-ratio: 16/10; overflow: hidden; background: var(--cd-g6); }
.cd .cd-prop-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s cubic-bezier(.22,1,.36,1); filter: grayscale(15%); }
.cd .cd-prop-card:hover .cd-prop-img { transform: scale(1.05); filter: grayscale(0%); }
.cd .cd-prop-badge { position: absolute; top: 10px; left: 10px; background: var(--cd-black); color: var(--cd-white); font-size: 9px; font-weight: 700; border-radius: 2px; padding: 3px 8px; letter-spacing: .06em; text-transform: uppercase; }
.cd .cd-prop-body { padding: 14px 16px 18px; }
.cd .cd-prop-type { font-size: 10px; font-weight: 700; color: var(--cd-g4); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 5px; }
.cd .cd-prop-name { font-size: 14px; font-weight: 600; color: var(--cd-black); margin-bottom: 6px; line-height: 1.4; }
.cd .cd-prop-price { font-size: 15px; font-weight: 700; color: var(--cd-black); margin-bottom: 8px; }
.cd .cd-prop-meta { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--cd-g4); }
.cd .cd-dot { color: var(--cd-g5); }
.cd .cd-prop-cta { margin-top: 1.5rem; }

/* BUTTONS */
.cd .cd-btn-primary {
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--cd-black); color: var(--cd-white); border: none; cursor: pointer;
  font-family: var(--cd-sans); font-size: 12px; font-weight: 600;
  letter-spacing: .07em; text-transform: uppercase;
  padding: 13px 28px; border-radius: 2px; transition: opacity .18s;
}
.cd .cd-btn-primary:hover { opacity: .82; }
.cd .cd-btn-white {
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--cd-white); color: var(--cd-black); border: none; cursor: pointer;
  font-family: var(--cd-sans); font-size: 12px; font-weight: 600;
  letter-spacing: .07em; text-transform: uppercase;
  padding: 13px 28px; border-radius: 2px; transition: opacity .18s;
}
.cd .cd-btn-white:hover { opacity: .88; }
.cd .cd-btn-outline-white {
  display: inline-flex; align-items: center; justify-content: center;
  background: transparent; color: rgba(255,255,255,.85);
  border: 1.5px solid rgba(255,255,255,.4); cursor: pointer;
  font-family: var(--cd-sans); font-size: 12px; font-weight: 600;
  letter-spacing: .07em; text-transform: uppercase;
  padding: 12px 28px; border-radius: 2px; transition: all .18s;
}
.cd .cd-btn-outline-white:hover { background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.7); }
.cd .cd-btn-full { width: 100%; }

/* SIDEBAR */
.cd .cd-sidebar { display: flex; flex-direction: column; gap: 18px; position: sticky; top: 90px; }
.cd .cd-sidebar-card { background: var(--cd-g7); border: 1px solid var(--cd-g6); border-radius: 3px; padding: 20px; }
.cd .cd-sidebar-label { font-family: var(--cd-sans); font-size: 10px; font-weight: 700; color: var(--cd-g4); text-transform: uppercase; letter-spacing: .12em; margin-bottom: 14px; }
.cd .cd-facts { list-style: none; display: flex; flex-direction: column; gap: 11px; }
.cd .cd-fact { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
.cd .cd-fact-k { font-size: 12px; color: var(--cd-g4); flex-shrink: 0; }
.cd .cd-fact-v { font-size: 12px; font-weight: 600; color: var(--cd-black); text-align: right; }
.cd .cd-pills { display: flex; flex-wrap: wrap; gap: 7px; }
.cd .cd-pill { font-size: 10px; font-weight: 600; color: var(--cd-g2); border: 1px solid var(--cd-g5); border-radius: 2px; padding: 4px 10px; letter-spacing: .05em; text-transform: uppercase; }

/* CTA CARD */
.cd .cd-cta-card { background: var(--cd-black); border-color: var(--cd-black); }
.cd .cd-cta-title { font-family: var(--cd-serif); font-size: 18px; font-weight: 700; color: var(--cd-white); margin-bottom: 10px; line-height: 1.3; }
.cd .cd-cta-text { font-size: 13px; color: rgba(255,255,255,.65); line-height: 1.65; margin-bottom: 18px; }
.cd .cd-cta-card .cd-btn-white { margin-bottom: 10px; }

/* BACK LINK */
.cd .cd-back-wrap { max-width: 1280px; margin: 0 auto; padding: 0 clamp(1rem,4vw,2.5rem) 3rem; }
.cd .cd-back-link { font-size: 13px; font-weight: 500; color: var(--cd-g4); text-decoration: none; letter-spacing: .02em; transition: color .15s; }
.cd .cd-back-link:hover { color: var(--cd-black); }
`;