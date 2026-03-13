"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type DropdownItem = 
  | { label: string; href: string; divider?: false }
  | { divider: true; label?: undefined; href?: undefined };

type NavLink = {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
};

const navLinks: NavLink[] = [
  {
    label: "Properties",
    href: "/properties",
    dropdown: [
      { label: "Commercial", href: "/properties?category=Commercial" },
      { label: "Residential", href: "/properties?category=Residential" },
    ],
  },
  {
    label: "Developers",
    href: "/developers",
    dropdown: [
      { label: "Beyond", href: "/developers/beyond" },
      { label: "Nakheel", href: "/developers/nakheel" },
      { label: "Emaar", href: "/developers/emaar-properties" },
      { label: "DP World", href: "/developers/dp-world" },
      { label: "Meraas", href: "/developers/meraas" },
      { label: "All Developers", href: "/developers" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Services",
    href: "/services",
    dropdown: [
      { label: "Investment Advisory", href: "/services/investment" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blogs" },
];

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [listFormOpen, setListFormOpen] = useState(false);
  const [listFormSubmitted, setListFormSubmitted] = useState(false);
  const [listFormData, setListFormData] = useState({ name: "", phone: "", email: "" });
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const openListingForm = () => {
      setListFormSubmitted(false);
      setListFormOpen(true);
    };

    window.addEventListener("open-list-property-form", openListingForm as EventListener);
    return () => {
      window.removeEventListener("open-list-property-form", openListingForm as EventListener);
    };
  }, []);

  const openDropdown = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(label);
  };

  const closeDropdownWithDelay = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const openListPropertyForm = () => {
    setListFormSubmitted(false);
    setListFormOpen(true);
    setMobileOpen(false);
  };

  const submitListPropertyForm = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = localStorage.getItem("emico-list-property-leads");
    const leads = existing ? JSON.parse(existing) : [];
    leads.push({ ...listFormData, createdAt: new Date().toISOString() });
    localStorage.setItem("emico-list-property-leads", JSON.stringify(leads));
    setListFormSubmitted(true);
  };

  /*
    Navbar is always visible with white background and dark text
  */
  const isTransparent   = false;

  // Derived color tokens so we only define once
  const textColor    = isTransparent ? "text-white/90"  : "text-gray-700";
  const textHover    = isTransparent ? "hover:text-white" : "hover:text-black";
  const burgerColor  = isTransparent ? "bg-white"       : "bg-black";
  const logoSrc      = isTransparent ? "/logo.png"      : "/logo-black.png";

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <nav
        className={`
          fixed top-0 left-0 right-0 z-1100
          transition-all duration-500
          ${isTransparent
            ? "bg-transparent py-5"
            : "bg-white py-3"
          }
        `}
        style={
          isTransparent
            ? { boxShadow: "none" }
            : {
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                backgroundColor: "rgba(255,255,255,0.98)",
                backdropFilter: "saturate(140%) blur(10px)",
                WebkitBackdropFilter: "saturate(140%) blur(10px)",
              }
        }
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src={logoSrc}
              alt="Logo"
              className="h-8 w-32 object-contain transition-all duration-300"
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && openDropdown(link.label)}
                onMouseLeave={closeDropdownWithDelay}
              >
                <Link
                  href={link.href}
                  className={`
                    px-4 py-2 text-sm font-medium tracking-wide
                    flex items-center gap-1
                    transition-colors duration-200
                    ${textColor} ${textHover}
                  `}
                >
                  {link.label}
                  {link.dropdown && (
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${
                        activeDropdown === link.label ? "rotate-180" : ""
                      }`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown panel */}
                {link.dropdown && (
                  <div
                    onMouseEnter={() => openDropdown(link.label)}
                    onMouseLeave={closeDropdownWithDelay}
                    className={`
                      absolute top-full left-0 mt-2 
                      ${link.label === "Properties" ? "w-80" : "w-52"}
                      bg-white rounded-sm border-t-2 border-black
                      shadow-2xl
                      transition-all duration-200
                      ${activeDropdown === link.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                      }
                    `}
                  >
                    {link.dropdown.map((item, idx) => (
                      item.divider ? (
                        <div key={`divider-${idx}`} className="border-t border-gray-200" />
                      ) : (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-5 py-3 text-sm text-gray-700 hover:text-black hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                        >
                          {item.label}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+97140000000"
              className={`text-sm font-medium tracking-wide transition-colors duration-200 ${textColor} ${textHover}`}
            >
              +971 4 XXX XXXX
            </a>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                openListPropertyForm();
              }}
              className={`
                px-5 py-2.5 text-sm font-semibold tracking-wide
                transition-all duration-300
                ${isTransparent
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-black text-white hover:bg-gray-800"
                }
              `}
            >
              List Property
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="lg:hidden p-2 -mr-2 flex flex-col justify-center items-center gap-1.25"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {/* Three lines — animate to X when open */}
            <span
              className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${burgerColor} ${
                mobileOpen ? "rotate-45 translate-y-1.75" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${burgerColor} ${
                mobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${burgerColor} ${
                mobileOpen ? "-rotate-45 -translate-y-1.75" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* ─── MOBILE MENU OVERLAY ─── */}
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-sm
          transition-opacity duration-300 lg:hidden
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setMobileOpen(false)}
      />

      {/* Slide-in panel */}
      <div
        className={`
          fixed top-0 right-0 bottom-0 z-40 w-80 max-w-[90vw]
          bg-white shadow-2xl flex flex-col
          transition-transform duration-500 ease-in-out lg:hidden
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100 shrink-0">
          <img src="/logo-black.png" alt="Logo" className="h-7 w-28 object-contain" />
          <button
            aria-label="Close menu"
            className="p-1 text-black"
            onClick={() => setMobileOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {navLinks.map((link) => (
            <div key={link.label} className="border-b border-gray-100">
              <Link
                href={link.href}
                className="block px-6 py-4 text-base font-semibold text-black hover:bg-gray-50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
              {link.dropdown && (
                <div className="pb-2 px-6 pl-8 bg-gray-50/60">
                  {link.dropdown.map((item, idx) => (
                    item.divider ? (
                      <div key={`divider-${idx}`} className="border-t border-gray-200 my-2" />
                    ) : (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block py-2.5 text-sm text-gray-600 hover:text-black transition-colors border-b border-gray-100 last:border-0"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Panel footer CTA */}
        <div className="shrink-0 p-6 bg-white border-t border-gray-100">
          <Link
            href="#"
            className="block w-full text-center py-3.5 bg-black text-white text-sm font-semibold tracking-wide hover:bg-gray-800 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              openListPropertyForm();
            }}
          >
            List Your Property
          </Link>
        </div>
      </div>

      {listFormOpen && (
        <div
          className="fixed inset-0 z-60 bg-black/55 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setListFormOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {listFormSubmitted ? (
              <div className="text-center py-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Property Submitted</h3>
                <p className="text-sm text-gray-600 mb-6">Thanks. Our team will contact you shortly to complete your listing.</p>
                <button
                  type="button"
                  onClick={() => setListFormOpen(false)}
                  className="px-5 py-2.5 bg-black text-white text-sm font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={submitListPropertyForm} className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">List Your Property</h3>
                  <p className="text-sm text-gray-500">Share your details and we will help publish your listing.</p>
                </div>
                <div>
                  <input
                    required
                    aria-label="Name"
                    placeholder="Name"
                    value={listFormData.name}
                    onChange={(e) => setListFormData({ ...listFormData, name: e.target.value })}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <input
                    required
                    aria-label="Phone Number"
                    placeholder="Phone Number"
                    value={listFormData.phone}
                    onChange={(e) => setListFormData({ ...listFormData, phone: e.target.value })}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    aria-label="Email"
                    placeholder="Email"
                    value={listFormData.email}
                    onChange={(e) => setListFormData({ ...listFormData, email: e.target.value })}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <button type="submit" className="flex-1 bg-black text-white py-3 text-sm font-semibold">Submit</button>
                  <button type="button" onClick={() => setListFormOpen(false)} className="flex-1 border border-gray-300 py-3 text-sm font-semibold text-gray-700">Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}