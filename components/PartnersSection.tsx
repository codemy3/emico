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
      <div className="px-6 md:px-14 mb-6 md:mb-8 text-center">
        <h2
          className="text-gray-900 font-semibold"
          style={{
            fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
            letterSpacing: ".01em",
            fontFamily: "var(--font-dm-serif), serif",
            lineHeight: 1.2,
            background: "linear-gradient(90deg, #0a0a0a 0%, #555 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Partners with Dubai&apos;s leading developers
        </h2>
      </div>

      <div className="w-full overflow-hidden">
        <div
          className="partner-marquee flex items-center gap-16 md:gap-24"
          style={{ width: "max-content", animation: "marquee-rtl 22s linear infinite", paddingInline: "3.5rem" }}
        >
          {[...partners, ...partners, ...partners].map((partner, i) => (
            <div key={i} className="flex items-center justify-center h-16 md:h-20 shrink-0">
              <img
                src={partner.src}
                alt={partner.alt}
                className="h-10 md:h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                style={{ maxWidth: 180 }}
              />
            </div>
          ))}
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