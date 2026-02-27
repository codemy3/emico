"use client";

// app/developers/[slug]/DeveloperDetailClient.tsx

import { useState } from "react";
import Link from "next/link";
import { X, MapPin, BedDouble, Bath, Maximize2, ChevronRight } from "lucide-react";
import type { Developer, ProjectItem } from "@/lib/developers-data";

interface Project {
  id: string;
  name: string;
  image: string;
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

function resolveProjects(dev: Developer): Project[] {
  if (dev.projects && dev.projects.length > 0) {
    return dev.projects.map((p: ProjectItem, i: number) => ({
      id: `${dev.id}-${i}`,
      name: p.name,
      image: p.image || dev.coverImage,
      type: p.type || "Apartment",
      status: p.status || "Off-Plan",
      price: p.price || "Price on Request",
      beds: p.beds || "1–3 Beds",
      baths: p.baths || "1–3 Baths",
      size: p.size || "600–2,000 sqft",
      location: dev.location,
      description: p.description || dev.longDescription,
      highlights: p.highlights || [],
    }));
  }
  return [1, 2, 3].map((i) => ({
    id: `${dev.id}-placeholder-${i}`,
    name: `${dev.name} — Residence ${i}`,
    image: dev.coverImage,
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

/* ── Modal ── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="cd-modal-overlay" onClick={onClose}>
      <div className="cd-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cd-modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <div className="cd-modal-img-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.image} alt={project.name} className="cd-modal-img" />
          <div className="cd-modal-img-overlay" />
          <span className={`cd-modal-badge cd-badge-${project.status.toLowerCase().replace(/\s/g, "-")}`}>
            {project.status}
          </span>
        </div>

        <div className="cd-modal-body">
          <p className="cd-modal-type">{project.type}</p>
          <h2 className="cd-modal-title">{project.name}</h2>
          <div className="cd-modal-location">
            <MapPin size={12} />
            <span>{project.location}</span>
          </div>
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
                  <li key={i} className="cd-modal-highlight-item">
                    <span className="cd-highlight-dot" />{h}
                  </li>
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

        {/* ── BREADCRUMB ── */}
        <nav className="cd-bc-wrap">
          <ol className="cd-bc">
            <li><Link href="/">Home</Link></li>
            <li><ChevronRight size={12} className="cd-bc-chevron" /></li>
            <li><Link href="/developers">Developers</Link></li>
            <li><ChevronRight size={12} className="cd-bc-chevron" /></li>
            <li><span className="cd-bc-cur">{dev.name}</span></li>
          </ol>
        </nav>

        {/* ── HERO — cover image + dark overlay + logo only ── */}
        <div className="cd-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dev.coverImage} alt={dev.name} className="cd-hero-bg" />
          <div className="cd-hero-overlay" />
          <div className="cd-hero-logo-wrap">
            {dev.logoIsText ? (
              <span className="cd-hero-logo-text">{dev.name}</span>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={dev.logo} alt={`${dev.name} logo`} className="cd-hero-logo-img" />
            )}
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="cd-body">
          <div className="cd-layout">

            {/* MAIN */}
            <main className="cd-main">

              {/* PROJECTS — first */}
              <section className="cd-section">
                <h2 className="cd-section-h">Projects by {dev.name}</h2>
                <p className="cd-section-sub">Browse the latest off-plan and ready properties from {dev.name}.</p>

                <div className="cd-tabs">
                  {dev.propertyTypes.map((t, i) => (
                    <button
                      key={t}
                      className={`cd-tab${i === activeTab ? " active" : ""}`}
                      onClick={() => setActiveTab(i)}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="cd-prop-grid">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      className="cd-prop-card"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="cd-prop-img-wrap">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={project.image} alt={project.name} className="cd-prop-img" />
                        <span className={`cd-prop-badge cd-badge-${project.status.toLowerCase().replace(/\s/g, "-")}`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="cd-prop-body">
                        <p className="cd-prop-type">{project.type}</p>
                        <h3 className="cd-prop-name">{project.name}</h3>
                        <p className="cd-prop-price">{project.price}</p>
                        <div className="cd-prop-meta">
                          <span>{project.beds}</span>
                          <span className="cd-dot">·</span>
                          <span>{project.baths}</span>
                          <span className="cd-dot">·</span>
                          <span>{project.size}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="cd-prop-cta">
                  <button className="cd-btn-primary">View All Projects</button>
                </div>
              </section>

              {/* ABOUT — after projects */}
              <section className="cd-section">
                <h2 className="cd-section-h">About {dev.name}</h2>
                <p className="cd-section-text">{dev.longDescription}</p>
              </section>

            </main>

            {/* SIDEBAR */}
            <aside className="cd-sidebar">
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

              <div className="cd-sidebar-card">
                <h3 className="cd-sidebar-label">Market Position</h3>
                <div className="cd-pills">
                  {dev.marketPosition.map((p) => (
                    <span key={p} className="cd-pill">{p}</span>
                  ))}
                </div>
              </div>

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

        {/* BACK */}
        <div className="cd-back-wrap">
          <Link href="/developers" className="cd-back-link">← Back to all Developers</Link>
        </div>

        {/* MODAL */}
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}

      </div>
    </>
  );
}

/* ── CSS ── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

.cd {
  --cd-black: #000;
  --cd-white: #fff;
  --cd-sans: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
}
.cd *, .cd *::before, .cd *::after { box-sizing: border-box; margin: 0; padding: 0; }
.cd { background: #fff; min-height: 100vh; font-family: var(--cd-sans); color: var(--cd-black); }

/* BREADCRUMB */
.cd .cd-bc-wrap {
  max-width: 1280px; margin: 0 auto;
  padding: 20px clamp(1rem,4vw,2.5rem) 0;
}
.cd .cd-bc {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: #888; list-style: none; flex-wrap: wrap;
}
.cd .cd-bc a { color: #888; text-decoration: none; transition: color .15s; }
.cd .cd-bc a:hover { color: #000; }
.cd .cd-bc-chevron { color: #bbb; flex-shrink: 0; }
.cd .cd-bc-cur { color: #000; font-weight: 500; }

/* ── HERO ── */
.cd .cd-hero {
  max-width: 1280px; margin: 16px auto 0;
  padding: 0 clamp(1rem,4vw,2.5rem);
  position: relative;
  height: clamp(280px, 42vw, 500px);
}
/* inner wrapper for overflow:hidden + border-radius */
.cd .cd-hero::after {
  content: ''; position: absolute;
  inset: 0 clamp(1rem,4vw,2.5rem);
  border-radius: 12px;
  pointer-events: none; z-index: 3;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05);
}
.cd .cd-hero-bg {
  position: absolute;
  top: 0; left: clamp(1rem,4vw,2.5rem);
  right: clamp(1rem,4vw,2.5rem); bottom: 0;
  width: calc(100% - clamp(2rem,8vw,5rem));
  height: 100%;
  object-fit: cover; display: block;
  border-radius: 12px;
}
.cd .cd-hero-overlay {
  position: absolute;
  top: 0; left: clamp(1rem,4vw,2.5rem);
  right: clamp(1rem,4vw,2.5rem); bottom: 0;
  border-radius: 12px;
  background: rgba(0,0,0,0.52);
  z-index: 1;
}
.cd .cd-hero-logo-wrap {
  position: absolute; inset: 0; z-index: 2;
  display: flex; align-items: center; justify-content: center;
}
.cd .cd-hero-logo-img {
  width: 220px; height: 80px;
  object-fit: contain; display: block;
  filter: brightness(0) invert(1) drop-shadow(0 2px 16px rgba(0,0,0,0.6));
  opacity: 0.95;
}
.cd .cd-hero-logo-text {
  font-size: clamp(26px,5vw,52px); font-weight: 700; color: #fff;
  letter-spacing: 0.06em; text-transform: uppercase;
  text-shadow: 0 2px 24px rgba(0,0,0,0.7);
}

/* BODY */
.cd .cd-body { max-width: 1280px; margin: 0 auto; padding: clamp(2rem,4vw,3rem) clamp(1rem,4vw,2.5rem) 3rem; }
.cd .cd-layout { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
@media (min-width: 960px) { .cd .cd-layout { grid-template-columns: 1fr 300px; align-items: start; } }

/* SECTIONS */
.cd .cd-section { margin-bottom: 2.5rem; }
.cd .cd-section-h { font-size: clamp(18px,2.5vw,24px); font-weight: 700; color: #000; padding-bottom: .75rem; margin-bottom: 1rem; border-bottom: 1px solid #eee; }
.cd .cd-section-text { font-size: 15px; color: #333; line-height: 1.82; }
.cd .cd-section-sub { font-size: 13px; color: #888; margin-bottom: 1.25rem; line-height: 1.6; }

/* TABS */
.cd .cd-tabs { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 1.5rem; }
.cd .cd-tab { font-size: 11px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: #000; background: #fff; border: 1.5px solid #bbb; border-radius: 2px; padding: 7px 16px; cursor: pointer; transition: all .15s; }
.cd .cd-tab.active, .cd .cd-tab:hover { background: #000; color: #fff; border-color: #000; }

/* PROJECT CARDS */
.cd .cd-prop-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 600px)  { .cd .cd-prop-grid { grid-template-columns: repeat(2,1fr); } }
@media (min-width: 1000px) { .cd .cd-prop-grid { grid-template-columns: repeat(3,1fr); } }
.cd .cd-prop-card { border: 1px solid #eee; border-radius: 6px; overflow: hidden; background: #fff; transition: box-shadow .22s, transform .22s; cursor: pointer; text-align: left; width: 100%; }
.cd .cd-prop-card:hover { box-shadow: 0 12px 36px rgba(0,0,0,.10); transform: translateY(-4px); }
.cd .cd-prop-img-wrap { position: relative; aspect-ratio: 16/10; overflow: hidden; background: #eee; }
.cd .cd-prop-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s cubic-bezier(.22,1,.36,1); }
.cd .cd-prop-card:hover .cd-prop-img { transform: scale(1.05); }
.cd .cd-prop-badge { position: absolute; top: 10px; left: 10px; font-size: 9px; font-weight: 700; border-radius: 2px; padding: 3px 8px; letter-spacing: .06em; text-transform: uppercase; color: #fff; }
.cd .cd-badge-off-plan           { background: #000; }
.cd .cd-badge-ready              { background: #fff; color: #000; border: 1px solid #000; }
.cd .cd-badge-under-construction { background: #fff; color: #000; border: 1px solid #000; }
.cd .cd-prop-body { padding: 14px 16px 18px; }
.cd .cd-prop-type  { font-size: 10px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 5px; }
.cd .cd-prop-name  { font-size: 14px; font-weight: 600; color: #000; margin-bottom: 6px; line-height: 1.4; }
.cd .cd-prop-price { font-size: 15px; font-weight: 700; color: #000; margin-bottom: 8px; }
.cd .cd-prop-meta  { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #888; flex-wrap: wrap; }
.cd .cd-dot        { color: #bbb; }
.cd .cd-prop-cta   { margin-top: 1.5rem; }

/* BUTTONS */
.cd .cd-btn-primary { display: inline-flex; align-items: center; justify-content: center; background: #000; color: #fff; border: none; cursor: pointer; font-size: 12px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; padding: 13px 28px; border-radius: 3px; transition: opacity .18s; }
.cd .cd-btn-primary:hover { opacity: .82; }
.cd .cd-btn-white { display: inline-flex; align-items: center; justify-content: center; background: #fff; color: #000; border: none; cursor: pointer; font-size: 12px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; padding: 13px 28px; border-radius: 3px; transition: opacity .18s; }
.cd .cd-btn-white:hover { opacity: .88; }
.cd .cd-btn-outline-white { display: inline-flex; align-items: center; justify-content: center; background: transparent; color: #fff; border: 1.5px solid #fff; cursor: pointer; font-size: 12px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; padding: 12px 28px; border-radius: 3px; transition: all .18s; }
.cd .cd-btn-outline-white:hover { background: #fff; color: #000; }
.cd .cd-btn-full { width: 100%; }

/* SIDEBAR */
.cd .cd-sidebar { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 90px; }
.cd .cd-sidebar-card { background: #fff; border: 1px solid #eee; border-radius: 6px; padding: 20px; }
.cd .cd-sidebar-label { font-size: 10px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: .12em; margin-bottom: 14px; }
.cd .cd-facts { list-style: none; display: flex; flex-direction: column; gap: 11px; }
.cd .cd-fact { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
.cd .cd-fact-k { font-size: 12px; color: #888; flex-shrink: 0; }
.cd .cd-fact-v { font-size: 12px; font-weight: 600; color: #000; text-align: right; }
.cd .cd-pills { display: flex; flex-wrap: wrap; gap: 6px; }
.cd .cd-pill { font-size: 10px; font-weight: 600; color: #000; border: 1px solid #bbb; border-radius: 2px; padding: 4px 10px; letter-spacing: .05em; text-transform: uppercase; }
.cd .cd-cta-card { background: #000 !important; border-color: #000 !important; }
.cd .cd-cta-title { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 10px; line-height: 1.3; }
.cd .cd-cta-text { font-size: 13px; color: rgba(255,255,255,0.7); line-height: 1.65; margin-bottom: 18px; }
.cd .cd-cta-card .cd-btn-white { margin-bottom: 10px; }

/* BACK */
.cd .cd-back-wrap { max-width: 1280px; margin: 0 auto; padding: 0 clamp(1rem,4vw,2.5rem) 3rem; }
.cd .cd-back-link { font-size: 13px; font-weight: 500; color: #888; text-decoration: none; letter-spacing: .02em; transition: color .15s; }
.cd .cd-back-link:hover { color: #000; }

/* MODAL */
.cd-modal-overlay { position: fixed; inset: 0; z-index: 1000; background: rgba(0,0,0,0.72); display: flex; align-items: center; justify-content: center; padding: 16px; animation: cdOverlayIn 0.2s ease; }
.cd-modal { background: #fff; border-radius: 8px; width: 100%; max-width: 580px; max-height: 92vh; overflow-y: auto; position: relative; animation: cdModalIn 0.28s cubic-bezier(0.22,1,0.36,1); scrollbar-width: thin; box-shadow: 0 32px 80px rgba(0,0,0,0.22); }
.cd-modal-close { position: absolute; top: 12px; right: 12px; z-index: 10; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.95); border: none; border-radius: 50%; cursor: pointer; color: #333; box-shadow: 0 2px 10px rgba(0,0,0,0.18); }
.cd-modal-close:hover { background: #fff; }
.cd-modal-img-wrap { position: relative; width: 100%; aspect-ratio: 16/9; overflow: hidden; background: #eee; border-radius: 8px 8px 0 0; }
.cd-modal-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.cd-modal-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%); }
.cd-modal-badge { position: absolute; top: 12px; left: 12px; font-size: 10px; font-weight: 700; border-radius: 3px; padding: 4px 10px; letter-spacing: .06em; text-transform: uppercase; color: #fff; }
.cd-badge-off-plan           { background: #000; }
.cd-badge-ready              { background: #fff; color: #000; border: 1px solid #000; }
.cd-badge-under-construction { background: #fff; color: #000; border: 1px solid #000; }
.cd-modal-body { padding: 22px 24px 28px; }
.cd-modal-type { font-size: 10px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: .1em; margin-bottom: 5px; }
.cd-modal-title { font-size: clamp(20px,5vw,26px); font-weight: 700; color: #000; margin-bottom: 8px; line-height: 1.2; }
.cd-modal-location { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #888; margin-bottom: 12px; }
.cd-modal-price { font-size: 21px; font-weight: 700; color: #000; margin-bottom: 16px; }
.cd-modal-stats { display: flex; align-items: center; background: #f6f5f3; border-radius: 5px; padding: 12px 0; margin-bottom: 18px; flex-wrap: wrap; }
.cd-modal-stat { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 13px; font-weight: 500; color: #000; padding: 4px 12px; min-width: 85px; }
.cd-modal-stat-sep { width: 1px; height: 22px; background: #eee; flex-shrink: 0; }
.cd-modal-desc { font-size: 14px; color: #333; line-height: 1.78; margin-bottom: 20px; }
.cd-modal-highlights { margin-bottom: 22px; }
.cd-modal-highlights-label { font-size: 10px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: .1em; margin-bottom: 10px; }
.cd-modal-highlights-list { list-style: none; display: flex; flex-direction: column; gap: 7px; }
.cd-modal-highlight-item { display: flex; align-items: flex-start; gap: 9px; font-size: 13px; color: #000; line-height: 1.5; }
.cd-highlight-dot { width: 5px; height: 5px; border-radius: 50%; background: #000; flex-shrink: 0; margin-top: 6px; }
.cd-modal-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.cd-modal-btn-primary { flex: 1; min-width: 130px; background: #000; color: #fff; border: none; cursor: pointer; font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; padding: 14px 18px; border-radius: 3px; transition: opacity .18s; }
.cd-modal-btn-primary:hover { opacity: .84; }
.cd-modal-btn-outline { flex: 1; min-width: 130px; background: transparent; color: #000; border: 1.5px solid #000; cursor: pointer; font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; padding: 13px 18px; border-radius: 3px; transition: all .18s; }
.cd-modal-btn-outline:hover { background: #000; color: #fff; }

@keyframes cdOverlayIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes cdModalIn   { from { opacity: 0; transform: translateY(28px) scale(0.97); } to { opacity: 1; transform: none; } }

@media (max-width: 480px) {
  .cd-modal-stats    { flex-direction: column; gap: 4px; }
  .cd-modal-stat-sep { width: 100%; height: 1px; }
  .cd-modal-actions  { flex-direction: column; }
  .cd-modal-btn-primary, .cd-modal-btn-outline { min-width: unset; }
}
`;