"use client";

import { useState, useEffect } from "react";
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex flex-col items-start">
              <img
                src={scrolled ? "/logo-black.png" : "/logo.png"}
                alt="Logo"
                className="h-8 w-32 object-contain transition-all duration-300"
              />
              
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 flex items-center gap-1 ${
                    scrolled
                      ? "text-gray-700 hover:text-black"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                  {link.dropdown && (
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${
                        activeDropdown === link.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown */}
                {link.dropdown && (
                  <div
                    className={`absolute top-full left-0 mt-1 w-52 bg-white shadow-2xl rounded-sm border-t-2 border-black transition-all duration-200 ${
                      activeDropdown === link.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
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

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                scrolled ? "text-gray-700 hover:text-black" : "text-white/90 hover:text-white"
              }`}
            >
              +971 4 XXX XXXX
            </Link>
            <Link
              href="/contact"
              className={`px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 ${
                scrolled
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              List Property
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`lg:hidden p-2 ${scrolled ? "text-black" : "text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 w-full transition-all duration-300 ${scrolled ? "bg-black" : "bg-white"} ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-full transition-all duration-300 ${scrolled ? "bg-black" : "bg-white"} ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-full transition-all duration-300 ${scrolled ? "bg-black" : "bg-white"} ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-500 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-24 px-6 pb-8 h-full overflow-y-auto">
          {navLinks.map((link) => (
            <div key={link.label} className="border-b border-gray-100">
              <Link
                href={link.href}
                className="block py-4 text-lg font-semibold text-black"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
              {link.dropdown && (
                <div className="pb-3 pl-4">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block py-2 text-sm text-gray-600"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-8">
            <Link
              href="/contact"
              className="block w-full text-center py-4 bg-black text-white font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              List Your Property
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
