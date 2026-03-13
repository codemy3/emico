"use client";

import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "About Us",   href: "/about" },
  { label: "Services",   href: "/services" },
  { label: "Developers", href: "/developers" },
  { label: "Projects",   href: "/projects" },
  { label: "Blogs",      href: "/blogs" },
  { label: "Contact",    href: "/contact" },
];

const socials = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="4" r="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];


export default function Footer() {
  return (
    <footer
      style={{
        background: "#0d0d0d",
        color: "#fff",
        fontFamily: "var(--font-dm-sans), sans-serif",
      }}
    >
      {/* ── Main content ── */}
      <div style={{ padding: "64px 0 52px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">

            {/* Brand column — wider */}
            <div className="md:col-span-5">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/logo.png"
                  alt="Emico Real Estate"
                  width={130}
                  height={44}
                  style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
                />
              </Link>

              <p style={{ fontSize: 14, lineHeight: 1.9, color: "rgba(255,255,255,0.65)", maxWidth: 320, marginBottom: 32 }}>
                Dubai&apos;s premier real estate advisory firm — connecting investors and homebuyers with finest properties across the UAE.
              </p>

              {/* Contact info */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                {[
                  {
                    icon: (<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>),
                    value: "+971 4 XXX XXXX",
                  },
                  {
                    icon: (<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>),
                    value: "info@emico.ae",
                  },
                  {
                    icon: (<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
                    value: "Office 1204, Business Bay, Dubai, UAE",
                  },
                ].map((c) => (
                  <div key={c.value} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "rgba(255,255,255,0.45)", paddingTop: 2, flexShrink: 0 }}>{c.icon}</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{c.value}</span>
                  </div>
                ))}
              </div>

              {/* Social icons */}
              <div style={{ display: "flex", gap: 10 }}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    style={{
                      width: 40, height: 40,
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: 4,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "rgba(255,255,255,0.65)",
                      transition: "border-color 0.2s, color 0.2s, background 0.2s",
                      textDecoration: "none",
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)";
                        e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Spacer on large screens */}
            <div className="hidden lg:block lg:col-span-1" />

            {/* Quick Links */}
            <div className="md:col-span-3">
              <p style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                marginBottom: 22,
                fontWeight: 600,
              }}>
                Quick Links
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {navLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,0.75)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                    >
                      <span style={{ width: 14, height: 1, background: "rgba(255,255,255,0.3)", display: "inline-block", flexShrink: 0 }} />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get in Touch CTA */}
            <div className="md:col-span-3">
              <p style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                marginBottom: 22,
                fontWeight: 600,
              }}>
                Get In Touch
              </p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: 24 }}>
                Looking for your dream property in Dubai? Our experts are ready to guide you.
              </p>
              <Link
                href="/contact"
                style={{
                  display: "inline-block",
                  padding: "11px 24px",
                  border: "1px solid rgba(255,255,255,0.35)",
                  color: "#fff",
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "background 0.2s, color 0.2s",
                  borderRadius: 3,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.color = "#0d0d0d";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#fff";
                }}
              >
                Contact Us
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ padding: "20px 0" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-3">
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0 }}>
            &copy; {new Date().getFullYear()} Emico Real Estate LLC. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Use"].map((t) => (
              <Link
                key={t}
                href="#"
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
