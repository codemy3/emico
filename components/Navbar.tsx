"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  {
    label: "Properties",
    href: "/properties",
    dropdown: [
      { label: "Off-Plan Properties", href: "/properties/off-plan" },
      { label: "Ready to Move", href: "/properties/ready" },
      { label: "Luxury Villas", href: "/properties/villas" },
      { label: "Apartments", href: "/properties/apartments" },
      { label: "Penthouses", href: "/properties/penthouses" },
      { label: "Commercial", href: "/properties/commercial" },
    ],
  },
  {
    label: "Developers",
    href: "/developers",
    dropdown: [
      { label: "Emaar Properties", href: "/developers/emaar" },
      { label: "DAMAC", href: "/developers/damac" },
      { label: "Nakheel", href: "/developers/nakheel" },
      { label: "Meraas", href: "/developers/meraas" },
      { label: "Sobha Realty", href: "/developers/sobha" },
      { label: "All Developers", href: "/developers" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    dropdown: [
      { label: "New Launches", href: "/projects/new-launches" },
      { label: "Under Construction", href: "/projects/under-construction" },
      { label: "Completed Projects", href: "/projects/completed" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    dropdown: [
      { label: "Property Management", href: "/services/property-management" },
      { label: "Investment Advisory", href: "/services/investment" },
      { label: "Mortgage Services", href: "/services/mortgage" },
      { label: "Relocation Services", href: "/services/relocation" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blogs" },
];

/* Pages where the hero is a DARK background image → navbar should be white/transparent */
const DARK_HERO_PAGES = ["/", "/home"];

/* Pages where the hero is a LIGHT/WHITE background → navbar should be dark from the start */
const LIGHT_HERO_PAGES = ["/developers", "/properties", "/projects", "/services", "/about", "/blogs"];

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const pathname                         = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /*
    isTransparent = navbar sits on a dark hero image (transparent bg, white text)
    Once scrolled past 50px, always switch to white bg + dark text.
    On light-hero pages, always use white bg + dark text (never transparent).
  */
  const pageHasDarkHero = DARK_HERO_PAGES.includes(pathname ?? "");
  const isTransparent   = pageHasDarkHero && !scrolled;

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
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500
          ${isTransparent
            ? "bg-transparent py-5"
            : "bg-white py-3"
          }
        `}
        style={
          isTransparent
            ? { boxShadow: "none" }
            : { boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }
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
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
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
                    className={`
                      absolute top-full left-0 mt-2 w-52
                      bg-white rounded-sm border-t-2 border-black
                      shadow-2xl
                      transition-all duration-200
                      ${activeDropdown === link.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                      }
                    `}
                  >
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-5 py-3 text-sm text-gray-700 hover:text-black hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                      >
                        {item.label}
                      </Link>
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
              href="/contact"
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
            className="lg:hidden p-2 -mr-2 flex flex-col justify-center items-center gap-[5px]"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {/* Three lines — animate to X when open */}
            <span
              className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${burgerColor} ${
                mobileOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${burgerColor} ${
                mobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${burgerColor} ${
                mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
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
          bg-white shadow-2xl
          transition-transform duration-500 ease-in-out lg:hidden
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
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
        <div className="overflow-y-auto h-[calc(100%-130px)]">
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
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block py-2.5 text-sm text-gray-600 hover:text-black transition-colors border-b border-gray-100 last:border-0"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Panel footer CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
          <Link
            href="/contact"
            className="block w-full text-center py-3.5 bg-black text-white text-sm font-semibold tracking-wide hover:bg-gray-800 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            List Your Property
          </Link>
        </div>
      </div>
    </>
  );
}