"use client";

const partners = [
  { src: "/partner1.webp", alt: "Binghatti" },
  { src: "/patner2.webp", alt: "Select Group" },
  { src: "/partner3.webp", alt: "City View" },
  { src: "/partner4.webp", alt: "Ellington" },
  { src: "/partner5.webp", alt: "Deyaar" },
];

export default function PartnersSection() {
  return (
    <section className="py-10 bg-[#f3f6fa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-6 md:gap-0">

        {/* Label — single line on mobile, 3 lines on desktop */}
        <div className="flex-1 flex items-center justify-center md:justify-start w-full">
          {/* Mobile: one line */}
          <span
            className="block md:hidden text-gray-700 font-light whitespace-nowrap"
            style={{ fontSize: 13, letterSpacing: ".04em", fontFamily: "'Playfair Display', serif" }}
          >
            Partners with Dubai&apos;s leading developers
          </span>
          {/* Desktop: 3 lines */}
          <span
            className="hidden md:block text-gray-700 text-lg font-light leading-snug text-left"
            style={{ letterSpacing: ".04em", fontFamily: "'Playfair Display', serif" }}
          >
            Partners with<br />Dubai&apos;s leading<br />developers
          </span>
        </div>

        {/* Marquee */}
        <div className="flex-3 w-full max-w-4xl mx-auto overflow-hidden">
          <div
            className="partner-marquee flex items-center gap-16"
            style={{ minWidth: "200vw", animation: "marquee-rtl 22s linear infinite" }}
          >
            {[...partners, ...partners, ...partners].map((partner, i) => (
              <div key={i} className="flex items-center justify-center h-16">
                <img
                  src={partner.src}
                  alt={partner.alt}
                  className="h-12 md:h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  style={{ maxWidth: 160 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-rtl {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          .partner-marquee {
            animation-duration: 7s !important;
          }
        }
        .partner-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}