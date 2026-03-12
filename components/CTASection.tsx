"use client";

import { useState } from "react";

const INTERESTS = [
  "Buy a Property",
  "Sell a Property",
  "Off-Plan Investment",
  "Property Management",
  "Mortgage Advice",
  "Relocation Services",
];

const BUDGETS = [
  { label: "Under AED 1M",   value: "under-1m" },
  { label: "AED 1M – 3M",    value: "1m-3m" },
  { label: "AED 3M – 5M",    value: "3m-5m" },
  { label: "AED 5M – 10M",   value: "5m-10m" },
  { label: "AED 10M – 20M",  value: "10m-20m" },
  { label: "Above AED 20M",  value: "above-20m" },
];

export default function ContactSection() {
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget]       = useState("");
  const [form, setForm]           = useState({ name: "", phone: "", email: "", message: "" });
  const [buyingFor, setBuyingFor] = useState<"myself" | "someone">("myself");

  const toggleInterest = (item: string) =>
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );

  // ── Shared input style — black bg, white text ──────────────────
  const inputBase: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#0a0a0a",
    color: "#ffffff",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "14px 16px",
    fontSize: 14,
    outline: "none",
    fontFamily: "var(--font-dm-sans), sans-serif",
    letterSpacing: "0.01em",
    transition: "border-color 0.2s",
  };

  return (
    <section style={{ backgroundColor: "#080808", padding: "96px 0 80px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* ── HEADER ── */}
        <div style={{ marginBottom: 64, maxWidth: 560 }}>
          <span style={{
            display: "block", fontSize: 11, letterSpacing: "0.45em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
            marginBottom: 20, fontFamily: "var(--font-dm-sans), sans-serif",
          }}>
            Get In Touch
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 700, color: "#ffffff",
            lineHeight: 1.15, margin: 0,
          }}>
            Let&apos;s Find Your
            <br />
            <em style={{ fontWeight: 400, color: "rgba(255,255,255,0.7)" }}>Perfect Property</em>
          </h2>
          <p style={{
            marginTop: 20, fontSize: 15, lineHeight: 1.7,
            color: "rgba(255,255,255,0.45)",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}>
            Tell us what you&apos;re looking for and one of our consultants will come back to you within 24 hours with options matched to your needs.
          </p>
        </div>

        {/* ── TWO COLUMN LAYOUT ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }}>

          {/* ── LEFT: Contact Info ── */}
          <div>
            <div style={{ marginBottom: 48 }}>
              {[
                {
                  label: "Phone",
                  value: "+971 4 XXX XXXX",
                  icon: (
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ width: 18, height: 18 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  ),
                },
                {
                  label: "Email",
                  value: "info@emico.ae",
                  icon: (
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ width: 18, height: 18 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  ),
                },
                {
                  label: "Office",
                  value: "Office 1204, Business Bay, Dubai, UAE",
                  icon: (
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ width: 18, height: 18 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: 16, marginBottom: 32, alignItems: "flex-start" }}>
                  <div style={{
                    width: 40, height: 40, flexShrink: 0,
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.5)",
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 4, fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: 1.5 }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust signals */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "★★★★★", text: "4.9/5 Client Rating" },
                { icon: "✓", text: "RERA Certified Agency" },
                { icon: "◎", text: "15+ Years in Dubai" },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", width: 20 }}>{item.icon}</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-dm-sans), sans-serif" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div>
            <div style={{
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "48px 44px",
              backgroundColor: "#0d0d0d",
            }}>

              {/* Form label */}
              <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 32, fontFamily: "var(--font-dm-sans), sans-serif" }}>
                Request a Consultation
              </p>

              {/* Who are you buying for */}
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12, fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  I am looking for
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                  {(["myself", "someone"] as const).map((opt) => {
                    const active = buyingFor === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => setBuyingFor(opt)}
                        style={{
                          padding: "9px 20px",
                          fontSize: 13,
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          cursor: "pointer",
                          border: "1px solid",
                          borderColor: active ? "#ffffff" : "rgba(255,255,255,0.18)",
                          backgroundColor: active ? "#ffffff" : "#0a0a0a",
                          color: active ? "#000000" : "rgba(255,255,255,0.55)",
                          fontWeight: active ? 600 : 400,
                          transition: "all 0.2s",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {opt === "myself" ? "For Myself" : "For Someone Else"}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name + Phone */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <input
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="cta-input"
                  style={inputBase}
                />
                <input
                  type="tel"
                  placeholder="+971 phone number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="cta-input"
                  style={inputBase}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: 24 }}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="cta-input"
                  style={inputBase}
                />
              </div>

              {/* I Am Interested In */}
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12, fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  I Am Interested In
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {INTERESTS.map((item) => {
                    const active = interests.includes(item);
                    return (
                      <button
                        key={item}
                        onClick={() => toggleInterest(item)}
                        style={{
                          padding: "8px 16px",
                          fontSize: 12,
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          cursor: "pointer",
                          border: "1px solid",
                          // ── ACTIVE = white fill, black text ──
                          // ── INACTIVE = solid black, dim white text ──
                          borderColor: active ? "#ffffff" : "rgba(255,255,255,0.12)",
                          backgroundColor: active ? "#ffffff" : "#0a0a0a",
                          color: active ? "#000000" : "rgba(255,255,255,0.5)",
                          fontWeight: active ? 600 : 400,
                          letterSpacing: "0.02em",
                          transition: "all 0.18s ease",
                        }}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Range */}
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12, fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  Budget Range
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {BUDGETS.map((b) => {
                    const active = budget === b.value;
                    return (
                      <button
                        key={b.value}
                        onClick={() => setBudget(active ? "" : b.value)}
                        style={{
                          padding: "8px 16px",
                          fontSize: 12,
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          cursor: "pointer",
                          border: "1px solid",
                          borderColor: active ? "#ffffff" : "rgba(255,255,255,0.12)",
                          backgroundColor: active ? "#ffffff" : "#0a0a0a",
                          color: active ? "#000000" : "rgba(255,255,255,0.5)",
                          fontWeight: active ? 600 : 400,
                          letterSpacing: "0.02em",
                          transition: "all 0.18s ease",
                        }}
                      >
                        {b.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: 28 }}>
                <textarea
                  placeholder="Anything specific you're looking for? (optional)"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="cta-input"
                  style={{ ...inputBase, resize: "none" }}
                />
              </div>

              {/* Submit */}
              <button
                style={{
                  width: "100%",
                  padding: "16px 24px",
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  border: "none",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e8e8e8")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
              >
                Submit Enquiry
              </button>

              {/* Privacy note */}
              <p style={{ marginTop: 16, fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: 1.6 }}>
                By submitting, you agree to our Privacy Policy. We&apos;ll never share your data with third parties.
              </p>

            </div>
          </div>
        </div>
      </div>

      {/* Placeholder + focus styles */}
      <style jsx>{`
        .cta-input::placeholder {
          color: rgba(255, 255, 255, 0.25);
        }
        .cta-input:focus {
          border-color: rgba(255, 255, 255, 0.35) !important;
        }
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}