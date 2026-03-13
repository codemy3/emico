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
      <div className="w-full px-6 md:px-14 flex flex-col md:flex-row items-center gap-6 md:gap-8">

        {/* Label — mobile unchanged, desktop centered without extra width */}
        <div
          className="w-full md:shrink-0 flex items-center justify-center md:justify-start"
          style={{ flexBasis: "430px" }}
        >
          <span
            className="block md:hidden text-gray-700 font-light whitespace-nowrap"
            style={{ fontSize: 13, letterSpacing: ".04em", fontFamily: "var(--font-dm-serif), serif" }}
          >
            Partners with Dubai&apos;s leading developers
          </span>
          <span
            className="hidden md:inline-block text-gray-700 font-light whitespace-nowrap text-center"
            style={{ fontSize: 22, letterSpacing: ".03em", fontFamily: "var(--font-dm-serif), serif", lineHeight: 1.2 }}
          >
            Partners with Dubai&apos;s leading developers
          </span>
        </div>

        {/* Marquee */}
        <div className="w-full md:flex-1 overflow-hidden">
          <div
            className="partner-marquee flex items-center gap-16"
            style={{ width: "max-content", animation: "marquee-rtl 22s linear infinite" }}
          >
            {[...partners, ...partners].map((partner, i) => (
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