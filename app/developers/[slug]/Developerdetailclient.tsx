"use client";

// app/developers/[slug]/DeveloperDetailClient.tsx

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { X, MapPin, BedDouble, Bath, Maximize2, ChevronRight, ChevronLeft, Mail, Phone, MessageCircle } from "lucide-react";
import type { Developer, ProjectItem } from "@/lib/developers-data";

interface Project {
  id: string;
  name: string;
  images: string[];
  type: string;
  status: "Off-Plan" | "Ready" | "Under Construction";
  price: string;
  beds: string;
  baths: string;
  size: string;
  location: string;
  description: string;
  highlights: string[];
}

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=95",
  "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&q=95",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=95",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=95",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=95",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=95",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=95",
  "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1600&q=95",
  "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1600&q=95",
];

/** Upgrade Unsplash URLs to full 1920px / q=100 for the hero. Local images pass through unchanged. */
function heroSrc(url: string): string {
  if (url.includes("unsplash.com")) {
    const base = url.split("?")[0];
    return `${base}?w=1920&q=100&fm=jpg&fit=crop&auto=format`;
  }
  return url; // local /developers/ images — Next.js serves at full quality
}

function resolveProjects(dev: Developer): Project[] {
  if (dev.projects && dev.projects.length > 0) {
    return dev.projects.map((p: ProjectItem, i: number) => {
      const baseImages = p.image ? [p.image] : [dev.coverImage];
      const images: string[] = [...baseImages];
      let pi = 0;
      while (images.length < 7) { images.push(PLACEHOLDER_IMAGES[pi % PLACEHOLDER_IMAGES.length]); pi++; }
      return {
        id: `${dev.id}-${i}`,
        name: p.name,
        images: images.slice(0, Math.max(7, baseImages.length)),
        type: p.type || "Apartment",
        status: p.status || "Off-Plan",
        price: p.price || "Price on Request",
        beds: p.beds || "1–3 Beds",
        baths: p.baths || "1–3 Baths",
        size: p.size || "600–2,000 sqft",
        location: dev.location,
        description: p.description || dev.longDescription,
        highlights: p.highlights || [],
      };
    });
  }
  return [1, 2, 3].map((i) => ({
    id: `${dev.id}-placeholder-${i}`,
    name: `${dev.name} — Residence ${i}`,
    images: [dev.coverImage, ...PLACEHOLDER_IMAGES.slice(0, 6)],
    type: "Apartment",
    status: "Off-Plan" as const,
    price: "From AED 1,200,000",
    beds: "2 Beds",
    baths: "2 Baths",
    size: "1,150 sqft",
    location: dev.location,
    description: dev.longDescription,
    highlights: ["Prime Location", "High ROI", "Modern Design"],
  }));
}

/* ── Image Carousel ── */
function ImageCarousel({ images, projectName }: { images: string[]; projectName: string }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent((idx + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 3500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [images.length]);

  const pause = () => { if (timerRef.current) clearInterval(timerRef.current); };
  const resume = () => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 3500);
  };

  return (
    <div className="cd-carousel" onMouseEnter={pause} onMouseLeave={resume}>
      <div className="cd-carousel-track">
        {images.map((src, i) => (
          <div key={i} className={`cd-carousel-slide${i === current ? " active" : ""}`} aria-hidden={i !== current}>
            <img src={src} alt={`${projectName} — view ${i + 1}`} className="cd-carousel-img" />
          </div>
        ))}
      </div>
      <button className="cd-carousel-btn cd-carousel-prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">
        <ChevronLeft size={14} />
      </button>
      <button className="cd-carousel-btn cd-carousel-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">
        <ChevronRight size={14} />
      </button>
      <div className="cd-carousel-dots">
        {images.map((_, i) => (
          <button key={i} className={`cd-carousel-dot${i === current ? " active" : ""}`} onClick={(e) => { e.stopPropagation(); goTo(i); }} aria-label={`Go to image ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

/* ── Modal ── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="cd-modal-overlay" onClick={onClose}>
      <div className="cd-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cd-modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <div className="cd-modal-img-wrap">
          <img src={project.images[0]} alt={project.name} className="cd-modal-img" />
          <div className="cd-modal-img-overlay" />
          <span className={`cd-modal-badge cd-badge-${project.status.toLowerCase().replace(/\s/g, "-")}`}>{project.status}</span>
        </div>
        <div className="cd-modal-body">
          <p className="cd-modal-type">{project.type}</p>
          <h2 className="cd-modal-title">{project.name}</h2>
          <div className="cd-modal-location"><MapPin size={12} /><span>{project.location}</span></div>
          <p className="cd-modal-price">{project.price}</p>
          <div className="cd-modal-stats">
            <div className="cd-modal-stat"><BedDouble size={14} /><span>{project.beds}</span></div>
            <div className="cd-modal-stat-sep" />
            <div className="cd-modal-stat"><Bath size={14} /><span>{project.baths}</span></div>
            <div className="cd-modal-stat-sep" />
            <div className="cd-modal-stat"><Maximize2 size={14} /><span>{project.size}</span></div>
          </div>
          <p className="cd-modal-desc">{project.description}</p>
          {project.highlights.length > 0 && (
            <div className="cd-modal-highlights">
              <p className="cd-modal-highlights-label">Key Highlights</p>
              <ul className="cd-modal-highlights-list">
                {project.highlights.map((h, i) => (
                  <li key={i} className="cd-modal-highlight-item"><span className="cd-highlight-dot" />{h}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="cd-modal-actions">
            <button className="cd-modal-btn-primary">Book a Viewing</button>
            <button className="cd-modal-btn-outline">Download Brochure</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function DeveloperDetailClient({ dev }: { dev: Developer }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const projects = resolveProjects(dev);

  return (
    <>
      <style>{CSS}</style>
      <div className="cd">

        {/* BREADCRUMB */}
        <nav className="cd-bc-wrap">
          <ol className="cd-bc">
            <li><Link href="/">Home</Link></li>
            <li><ChevronRight size={12} className="cd-bc-chevron" /></li>
            <li><Link href="/developers">Developers</Link></li>
            <li><ChevronRight size={12} className="cd-bc-chevron" /></li>
            <li><span className="cd-bc-cur">{dev.name}</span></li>
          </ol>
        </nav>

        {/* HERO */}
        <div className="cd-hero">
          <img
            src={heroSrc(dev.coverImage)}
            alt={dev.name}
            className="cd-hero-bg"
            fetchPriority="high"
            decoding="sync"
          />
          <div className="cd-hero-overlay" />
          <div className="cd-hero-logo-wrap">
            {dev.logoIsText ? (
              <span className="cd-hero-logo-text">{dev.name}</span>
            ) : (
              <img src={dev.logo} alt={`${dev.name} logo`} className="cd-hero-logo-img" />
            )}
          </div>
        </div>

        {/* BODY */}
        <div className="cd-body">

          <section className="cd-section">
            <div className="cd-section-header">
              <h2 className="cd-section-h">Projects by {dev.name}</h2>
              <p className="cd-section-sub">Explore live and upcoming projects from {dev.name}.</p>
              <div className="cd-tabs">
                <button className={`cd-tab${activeTab === 0 ? " active" : ""}`} onClick={() => setActiveTab(0)}>
                  All Projects
                </button>
                {projects.map((project, idx) => (
                  <button
                    key={project.id}
                    className={`cd-tab${activeTab === idx + 1 ? " active" : ""}`}
                    onClick={() => setActiveTab(idx + 1)}
                  >
                    {project.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="cd-layout">
              <div className="cd-prop-grid">
                {(activeTab === 0 ? projects : [projects[activeTab - 1]]).map((project) => (
                  <article key={project.id} className="cd-prop-card">
                    <div className="cd-prop-carousel-wrap">
                      <ImageCarousel images={project.images} projectName={project.name} />
                      <span className={`cd-prop-badge cd-badge-${project.status.toLowerCase().replace(/\s/g, "-")}`}>{project.status}</span>
                      <span className="cd-prop-price-overlay">{project.price}</span>
                    </div>

                    <button className="cd-prop-card-inner" onClick={() => setSelectedProject(project)}>
                      <div className="cd-prop-body">
                        <p className="cd-prop-type">{project.type}</p>
                        <h3 className="cd-prop-name">{project.name}</h3>
                        <div className="cd-prop-location"><MapPin size={12} /><span>{project.location}</span></div>
                        <div className="cd-prop-stats">
                          <div className="cd-prop-stat"><BedDouble size={12} /><span>{project.beds}</span></div>
                          <div className="cd-prop-stat-sep" />
                          <div className="cd-prop-stat"><Bath size={12} /><span>{project.baths}</span></div>
                          <div className="cd-prop-stat-sep" />
                          <div className="cd-prop-stat"><Maximize2 size={12} /><span>{project.size}</span></div>
                        </div>
                      </div>
                    </button>

                    {dev.contact && (
                      <div className="cd-prop-contact">
                        <a className="cd-contact-btn cd-contact-email" href={`mailto:${dev.contact.email}`}>
                          <Mail size={14} /> Email
                        </a>
                        <a className="cd-contact-btn cd-contact-call" href={`tel:${dev.contact.phone}`}>
                          <Phone size={14} /> Call
                        </a>
                        <a className="cd-contact-btn cd-contact-whatsapp" href={`https://wa.me/${dev.contact.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
                          <MessageCircle size={14} /> WhatsApp
                        </a>
                      </div>
                    )}
                  </article>
                ))}
              </div>

              <aside className="cd-sidebar">
                <div className="cd-sidebar-card">
                  <h3 className="cd-sidebar-label">Market Position</h3>
                  <div className="cd-pills">
                    {dev.marketPosition.map((p) => (<span key={p} className="cd-pill">{p}</span>))}
                  </div>
                </div>
                <div className="cd-sidebar-card cd-cta-card">
                  <h3 className="cd-cta-title">Interested in {dev.name}?</h3>
                  <p className="cd-cta-text">Speak with our expert advisors to find the best property for your needs and budget.</p>
                  <button className="cd-btn-white cd-btn-full">Book a Free Consultation</button>
                  <button className="cd-btn-outline-white cd-btn-full">Download Brochure</button>
                </div>
              </aside>
            </div>
          </section>

          <section className="cd-section">
            <h2 className="cd-section-h">About {dev.name}</h2>
            <p className="cd-section-text">{dev.longDescription}</p>
          </section>

        </div>

        <div className="cd-back-wrap">
          <Link href="/developers" className="cd-back-link">← Back to all Developers</Link>
        </div>

        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </div>
    </>
  );
}

/* ── CSS ── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Jost:wght@300;400;500;600;700&display=swap');

.cd {
  --cd-black:   #0d0d0d;
  --cd-white:   #ffffff;
  --cd-bg:      #f5f3ef;
  --cd-surface: #ffffff;
  --cd-border:  #e2ddd6;
  --cd-muted:   #8a8178;
  --cd-accent:  #b8955a;
  --cd-sans:    var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif;
  --cd-serif:   var(--font-dm-serif), Georgia, serif;
  --cd-radius:  10px;
  --cd-shadow:  0 2px 8px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.08);
  --cd-shadow-hover: 0 6px 24px rgba(0,0,0,0.1), 0 24px 60px rgba(0,0,0,0.13);
}

.cd *, .cd *::before, .cd *::after { box-sizing: border-box; margin: 0; padding: 0; }
.cd { background: var(--cd-bg); min-height: 100vh; font-family: var(--cd-sans); color: var(--cd-black); }

/* ── BREADCRUMB ── */
.cd .cd-bc-wrap { max-width: 1280px; margin: 0 auto; padding: 20px clamp(1rem,4vw,2.5rem) 0; }
.cd .cd-bc { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--cd-muted); list-style: none; flex-wrap: wrap; font-weight: 400; letter-spacing: .02em; }
.cd .cd-bc a { color: var(--cd-muted); text-decoration: none; transition: color .15s; }
.cd .cd-bc a:hover { color: var(--cd-black); }
.cd .cd-bc-chevron { color: #c8c2b8; flex-shrink: 0; }
.cd .cd-bc-cur { color: var(--cd-black); font-weight: 500; }

/* ── HERO ── */
.cd .cd-hero {
  width: 100%;
  position: relative;
  height: clamp(220px, 30vw, 380px);
  overflow: hidden;
  /* Isolation prevents backdrop-filter on child/sibling elements bleeding into hero */
  isolation: isolate;
}
.cd .cd-hero-bg {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center 30%;
  display: block;
  /* Prevent any subpixel rendering issues */
  will-change: auto;
  image-rendering: auto;
  /* No filter, no opacity — full native image quality */
}
.cd .cd-hero-overlay {
  position: absolute; inset: 0; z-index: 1;
  /* Gradient only covers left third where logo sits — right 40%+ is fully clear */
  background: linear-gradient(
    to right,
    rgba(0,0,0,0.55) 0%,
    rgba(0,0,0,0.15) 35%,
    rgba(0,0,0,0.00) 60%
  );
}
.cd .cd-hero-logo-wrap {
  position: absolute; top: 0; bottom: 0;
  left: clamp(1.5rem,5vw,3.5rem); right: 50%; z-index: 2;
  display: flex; align-items: center; justify-content: flex-start;
}
.cd .cd-hero-logo-img {
  width: 400px; height: 150px; object-fit: contain; display: block;
  filter: brightness(0) invert(1) drop-shadow(0 2px 16px rgba(0,0,0,0.5));
}
.cd .cd-hero-logo-text {
  font-family: var(--cd-serif);
  font-size: clamp(26px,5vw,52px); font-weight: 700; color: #fff;
  letter-spacing: 0.04em; text-shadow: 0 2px 32px rgba(0,0,0,0.6);
}

/* ── BODY ── */
.cd .cd-body { max-width: 1280px; margin: 0 auto; padding: 0 clamp(1rem,4vw,2.5rem) 3rem; }

/* ── SECTION ── */
.cd .cd-section { margin-bottom: 3rem; }
.cd .cd-section:first-child { padding-top: 0.5rem; }

.cd .cd-section-header { margin-bottom: 1.75rem; }
.cd .cd-section-h {
  font-family: var(--cd-serif);
  font-size: clamp(48px,5vw,60px); font-weight: 600; color: var(--cd-black);
  padding-bottom: .85rem; margin-bottom: 1rem;
  border-bottom: 1px solid var(--cd-border); letter-spacing: .01em;
}
.cd .cd-section-sub { font-size: 13px; color: var(--cd-muted); margin-bottom: 1.5rem; line-height: 1.65; }
.cd .cd-section-text { font-size: 15px; color: #444; line-height: 1.85; font-weight: 300; }

/* ── TABS ── */
.cd .cd-tabs { display: flex; gap: 6px; flex-wrap: wrap; }
.cd .cd-tab {
  font-size: 11px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase;
  color: var(--cd-muted); background: var(--cd-surface);
  border: 1.5px solid var(--cd-border); border-radius: 3px;
  padding: 8px 18px; cursor: pointer; transition: all .18s;
}
.cd .cd-tab.active, .cd .cd-tab:hover { background: var(--cd-black); color: #fff; border-color: var(--cd-black); }

/* ── LAYOUT ── */
.cd .cd-layout { display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: start; }
@media (min-width: 960px) { .cd .cd-layout { grid-template-columns: 1fr 300px; gap: 2.5rem; } }

/* ── PROPERTY GRID ── */
.cd .cd-prop-grid { display: grid; grid-template-columns: 1fr; gap: 22px; }
@media (min-width: 600px)  { .cd .cd-prop-grid { grid-template-columns: repeat(2,1fr); } }
@media (min-width: 960px)  { .cd .cd-prop-grid { grid-template-columns: repeat(2,1fr); } }
@media (min-width: 1100px) { .cd .cd-prop-grid { grid-template-columns: repeat(3,1fr); } }

/* ── PROPERTY CARD ── */
.cd .cd-prop-card {
  border-radius: var(--cd-radius); overflow: hidden;
  background: var(--cd-surface); border: 1px solid var(--cd-border);
  box-shadow: var(--cd-shadow);
  transition: box-shadow .28s ease, transform .28s ease;
  display: flex; flex-direction: column;
}
.cd .cd-prop-card:hover { box-shadow: var(--cd-shadow-hover); transform: translateY(-5px); }

/* ── CAROUSEL ── */
.cd .cd-prop-carousel-wrap { position: relative; cursor: pointer; overflow: hidden; }
.cd .cd-carousel { position: relative; width: 100%; aspect-ratio: 4/3; overflow: hidden; background: #1a1a1a; }
.cd .cd-carousel-track { position: absolute; inset: 0; }
.cd .cd-carousel-slide { position: absolute; inset: 0; opacity: 0; transition: opacity .6s ease; }
.cd .cd-carousel-slide.active { opacity: 1; }
.cd .cd-carousel-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.cd .cd-carousel-btn {
  position: absolute; top: 50%; transform: translateY(-50%); z-index: 10;
  width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.15); color: #fff; border: 1px solid rgba(255,255,255,0.3);
  border-radius: 50%; cursor: pointer; transition: all .18s;
  /* No backdrop-filter on carousel buttons to avoid stacking context issues */
  opacity: 0;
}
.cd .cd-prop-card:hover .cd-carousel-btn { opacity: 1; }
.cd .cd-carousel-btn:hover { background: rgba(255,255,255,0.3); }
.cd .cd-carousel-prev { left: 10px; }
.cd .cd-carousel-next { right: 10px; }
.cd .cd-carousel-dots { position: absolute; bottom: 10px; left: 0; right: 0; display: flex; justify-content: center; gap: 5px; z-index: 10; }
.cd .cd-carousel-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.4); border: none; cursor: pointer; padding: 0; transition: all .2s; }
.cd .cd-carousel-dot.active { background: #fff; transform: scale(1.4); }

.cd .cd-prop-badge {
  position: absolute; top: 12px; left: 12px; z-index: 10;
  font-size: 9px; font-weight: 700; border-radius: 3px;
  padding: 4px 9px; letter-spacing: .07em; text-transform: uppercase;
}
.cd .cd-badge-off-plan           { background: var(--cd-black); color: #fff; }
.cd .cd-badge-ready              { background: var(--cd-accent); color: #fff; }
.cd .cd-badge-under-construction { background: rgba(255,255,255,0.92); color: var(--cd-black); border: 1px solid rgba(0,0,0,0.12); }

.cd .cd-prop-price-overlay {
  position: absolute; bottom: 28px; right: 12px; z-index: 10;
  /* Solid semi-transparent background — no backdrop-filter to avoid blur bleed */
  background: rgba(13,13,13,0.82);
  color: #fff; font-size: 13px; font-weight: 600;
  padding: 5px 11px; border-radius: 4px; letter-spacing: 0.02em; font-family: var(--cd-sans);
}

.cd .cd-prop-card-inner { display: block; width: 100%; text-align: left; background: transparent; border: none; padding: 0; cursor: pointer; flex: 1; }
.cd .cd-prop-body { padding: 14px 16px 12px; }
.cd .cd-prop-type { font-size: 9px; font-weight: 700; color: var(--cd-accent); text-transform: uppercase; letter-spacing: .1em; margin-bottom: 5px; }
.cd .cd-prop-name { font-family: var(--cd-serif); font-size: 17px; font-weight: 600; color: var(--cd-black); margin-bottom: 7px; line-height: 1.35; }
.cd .cd-prop-location { display: flex; align-items: center; gap: 4px; font-size: 11px; color: var(--cd-muted); margin-bottom: 10px; }
.cd .cd-prop-stats { display: flex; align-items: center; background: var(--cd-bg); border-radius: 5px; padding: 8px 10px; border: 1px solid var(--cd-border); }
.cd .cd-prop-stat { display: flex; align-items: center; gap: 5px; font-size: 11px; color: #555; font-weight: 500; flex: 1; justify-content: center; }
.cd .cd-prop-stat svg { color: var(--cd-muted); flex-shrink: 0; }
.cd .cd-prop-stat-sep { width: 1px; height: 16px; background: var(--cd-border); flex-shrink: 0; }

/* ── CONTACT BAR ── */
.cd .cd-prop-contact {
  display: grid; grid-template-columns: repeat(3,1fr);
  border-top: 1px solid var(--cd-border); margin-top: auto;
}
.cd .cd-contact-btn {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  padding: 12px 6px; font-size: 11px; font-weight: 600; letter-spacing: .03em;
  text-decoration: none; border: none; background: transparent;
  cursor: pointer; transition: background .15s, color .15s; text-transform: uppercase;
}
.cd .cd-contact-btn:not(:last-child) { border-right: 1px solid var(--cd-border); }
.cd .cd-contact-email            { color: #374151; }
.cd .cd-contact-email:hover      { background: #f9f8f6; color: var(--cd-black); }
.cd .cd-contact-call             { color: #b45309; }
.cd .cd-contact-call:hover       { background: #fffbeb; }
.cd .cd-contact-whatsapp         { color: #15803d; }
.cd .cd-contact-whatsapp:hover   { background: #f0fdf4; }

/* ── SIDEBAR ── */
.cd .cd-sidebar { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 90px; }
.cd .cd-sidebar-card {
  background: var(--cd-surface); border: 1px solid var(--cd-border);
  border-radius: var(--cd-radius); padding: 22px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.cd .cd-sidebar-label { font-size: 9px; font-weight: 700; color: var(--cd-muted); text-transform: uppercase; letter-spacing: .14em; margin-bottom: 16px; }
.cd .cd-pills { display: flex; flex-wrap: wrap; gap: 7px; }
.cd .cd-pill {
  font-size: 10px; font-weight: 600; color: var(--cd-black);
  border: 1px solid var(--cd-border); border-radius: 3px;
  padding: 5px 11px; letter-spacing: .05em; text-transform: uppercase; background: var(--cd-bg);
}
.cd .cd-cta-card { background: var(--cd-black) !important; border-color: var(--cd-black) !important; }
.cd .cd-cta-title { font-family: var(--cd-serif); font-size: 20px; font-weight: 600; color: #fff; margin-bottom: 10px; line-height: 1.3; letter-spacing: .01em; }
.cd .cd-cta-text { font-size: 13px; color: rgba(255,255,255,0.65); line-height: 1.7; margin-bottom: 20px; font-weight: 300; }
.cd .cd-btn-white {
  display: inline-flex; align-items: center; justify-content: center;
  background: #fff; color: #000; border: none; cursor: pointer;
  font-size: 11px; font-weight: 700; letter-spacing: .09em; text-transform: uppercase;
  padding: 14px 28px; border-radius: 4px; transition: opacity .18s;
}
.cd .cd-btn-white:hover { opacity: .88; }
.cd .cd-btn-outline-white {
  display: inline-flex; align-items: center; justify-content: center;
  background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.5);
  cursor: pointer; font-size: 11px; font-weight: 700; letter-spacing: .09em; text-transform: uppercase;
  padding: 13px 28px; border-radius: 4px; transition: all .18s;
}
.cd .cd-btn-outline-white:hover { background: rgba(255,255,255,0.1); border-color: #fff; }
.cd .cd-btn-full { width: 100%; margin-bottom: 10px; }
.cd .cd-btn-full:last-child { margin-bottom: 0; }

/* ── BACK ── */
.cd .cd-back-wrap { max-width: 1280px; margin: 0 auto; padding: 0 clamp(1rem,4vw,2.5rem) 3rem; }
.cd .cd-back-link { font-size: 13px; font-weight: 500; color: var(--cd-muted); text-decoration: none; letter-spacing: .02em; transition: color .15s; }
.cd .cd-back-link:hover { color: var(--cd-black); }

/* ── MODAL ── */
.cd-modal-overlay {
  position: fixed; inset: 0; z-index: 1000;
  /* Removed backdrop-filter: blur — it was creating a new stacking context
     that caused the hero image to appear blurry even when modal was closed */
  background: rgba(13,13,13,0.80);
  display: flex; align-items: center; justify-content: center;
  padding: 16px; animation: cdOverlayIn 0.2s ease;
}
.cd-modal {
  background: #fff; border-radius: 12px; width: 100%; max-width: 580px;
  max-height: 92vh; overflow-y: auto; position: relative;
  animation: cdModalIn 0.3s cubic-bezier(0.22,1,0.36,1);
  scrollbar-width: thin; box-shadow: 0 40px 100px rgba(0,0,0,0.28);
}
.cd-modal-close {
  position: absolute; top: 14px; right: 14px; z-index: 10;
  width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.95); border: 1px solid rgba(0,0,0,0.1);
  border-radius: 50%; cursor: pointer; color: #333; box-shadow: 0 2px 10px rgba(0,0,0,0.14); transition: all .15s;
}
.cd-modal-close:hover { background: #fff; transform: scale(1.08); }
.cd-modal-img-wrap { position: relative; width: 100%; aspect-ratio: 16/9; overflow: hidden; background: #eee; border-radius: 12px 12px 0 0; }
.cd-modal-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.cd-modal-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 55%); }
.cd-modal-badge { position: absolute; top: 14px; left: 14px; font-size: 9px; font-weight: 700; border-radius: 3px; padding: 4px 10px; letter-spacing: .07em; text-transform: uppercase; }
.cd-badge-off-plan           { background: #0d0d0d; color: #fff; }
.cd-badge-ready              { background: #b8955a; color: #fff; }
.cd-badge-under-construction { background: rgba(255,255,255,0.92); color: #0d0d0d; }
.cd-modal-body { padding: 24px 26px 30px; }
.cd-modal-type { font-size: 9px; font-weight: 700; color: #b8955a; text-transform: uppercase; letter-spacing: .12em; margin-bottom: 6px; }
.cd-modal-title { font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(22px,5vw,30px); font-weight: 600; color: #0d0d0d; margin-bottom: 8px; line-height: 1.2; letter-spacing: .01em; }
.cd-modal-location { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #8a8178; margin-bottom: 14px; }
.cd-modal-price { font-size: 22px; font-weight: 700; color: #0d0d0d; margin-bottom: 18px; letter-spacing: -.01em; }
.cd-modal-stats { display: flex; align-items: center; background: #f5f3ef; border-radius: 6px; padding: 14px 0; margin-bottom: 20px; flex-wrap: wrap; border: 1px solid #e2ddd6; }
.cd-modal-stat { flex: 1; display: flex; align-items: center; justify-content: center; gap: 7px; font-size: 13px; font-weight: 500; color: #0d0d0d; padding: 4px 12px; min-width: 85px; }
.cd-modal-stat-sep { width: 1px; height: 22px; background: #e2ddd6; flex-shrink: 0; }
.cd-modal-desc { font-size: 14px; color: #444; line-height: 1.82; margin-bottom: 22px; font-weight: 300; }
.cd-modal-highlights { margin-bottom: 24px; }
.cd-modal-highlights-label { font-size: 9px; font-weight: 700; color: #8a8178; text-transform: uppercase; letter-spacing: .12em; margin-bottom: 12px; }
.cd-modal-highlights-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.cd-modal-highlight-item { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: #0d0d0d; line-height: 1.55; }
.cd-highlight-dot { width: 5px; height: 5px; border-radius: 50%; background: #b8955a; flex-shrink: 0; margin-top: 6px; }
.cd-modal-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.cd-modal-btn-primary { flex: 1; min-width: 130px; background: #0d0d0d; color: #fff; border: none; cursor: pointer; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; padding: 15px 18px; border-radius: 4px; transition: opacity .18s; }
.cd-modal-btn-primary:hover { opacity: .84; }
.cd-modal-btn-outline { flex: 1; min-width: 130px; background: transparent; color: #0d0d0d; border: 1.5px solid #0d0d0d; cursor: pointer; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; padding: 14px 18px; border-radius: 4px; transition: all .18s; }
.cd-modal-btn-outline:hover { background: #0d0d0d; color: #fff; }

@keyframes cdOverlayIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes cdModalIn   { from { opacity: 0; transform: translateY(30px) scale(0.97); } to { opacity: 1; transform: none; } }

@media (max-width: 480px) {
  .cd-modal-stats    { flex-direction: column; gap: 4px; }
  .cd-modal-stat-sep { width: 100%; height: 1px; }
  .cd-modal-actions  { flex-direction: column; }
  .cd-modal-btn-primary, .cd-modal-btn-outline { min-width: unset; }
  .cd .cd-hero { height: clamp(160px, 42vw, 240px); }
  .cd .cd-hero-logo-img { width: 200px; height: 80px; }
}
`;