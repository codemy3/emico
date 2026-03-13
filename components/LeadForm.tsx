"use client";

import { useState } from "react";

const interests = [
  "Buy a Property",
  "Sell a Property",
  "Off-Plan Investment",
  "Investment Advisory",
];

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    buyingFor: "",
    budget: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-gray-50 py-24 px-6 relative overflow-hidden">
      {/* Background decorative element */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 bg-black hidden lg:block"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 hidden lg:block"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C%2Fg%3E%3C%2Fsvg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left content */}
          <div>
            <span className="text-black/40 text-xs tracking-[0.4em] uppercase block mb-5">
              Get In Touch
            </span>
            <h2
              className="text-black mb-6 leading-tight"
              style={{
                fontFamily: "var(--font-dm-serif), serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 700,
              }}
            >
              Let&apos;s Find Your
              <br />
              <em className="font-light italic">Perfect Property</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-md">
              Share your requirements with us and one of our expert consultants will reach out within 24 hours with curated property recommendations tailored to your needs.
            </p>

            {/* Contact info */}
            <div className="space-y-5">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  label: "Phone",
                  value: "+971 4 XXX XXXX",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: "Email",
                  value: "info@apexrealty.ae",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  label: "Office",
                  value: "Office 1204, Business Bay, Dubai, UAE",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="text-black mt-0.5">{item.icon}</div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{item.label}</div>
                    <div className="text-sm text-gray-800 font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white shadow-xl p-8 lg:p-10">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: "var(--font-dm-serif), serif" }}>
                  Thank You!
                </h3>
                <p className="text-gray-500 text-sm">
                  We&apos;ve received your enquiry. One of our consultants will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: "var(--font-dm-serif), serif" }}>
                    Request a Consultation
                  </h3>
                  <p className="text-gray-400 text-xs">Fill in the form and we&apos;ll get back to you promptly.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="lead-field w-full border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-black transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="lead-field w-full border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-black transition-colors"
                      placeholder="+971 50 XXX XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="lead-field w-full border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-black transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">I Am Interested In</label>
                  <div className="grid grid-cols-2 gap-2">
                    {interests.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setFormData({ ...formData, interest: item })}
                        className={`text-left px-4 py-2.5 text-xs border transition-all duration-200 ${
                          formData.interest === item
                            ? "border-black bg-black text-white"
                            : "border-gray-700 bg-black text-white/60 hover:text-white hover:border-gray-400"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Who Are You Buying For?</label>
                  <select
                    value={formData.buyingFor}
                    onChange={(e) => setFormData({ ...formData, buyingFor: e.target.value })}
                    className="lead-field w-full border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-black transition-colors bg-white"
                  >
                    <option value="">Select Option</option>
                    <option>Myself</option>
                    <option>Someone Else</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Budget Range</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="lead-field w-full border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-black transition-colors bg-white"
                  >
                    <option value="">Select Budget</option>
                    <option>AED 500K – 1M</option>
                    <option>AED 2M – 3M</option>
                    <option>AED 3M+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Message</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="lead-field w-full border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-black transition-colors resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 font-semibold text-sm tracking-wide hover:bg-gray-900 transition-colors flex items-center justify-center gap-3 group"
                >
                  Submit Enquiry
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                <p className="text-gray-400 text-xs text-center">
                  By submitting, you agree to our Privacy Policy. We&apos;ll never share your data with third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .lead-field {
            background: #000 !important;
            color: #fff !important;
            border: 1px solid #333 !important;
            -webkit-appearance: none;
            appearance: none;
          }

          .lead-field::placeholder {
            color: #a3a3a3;
          }
        }
      `}</style>
    </section>
  );
}