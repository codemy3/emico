"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function CTASection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-black" ref={ref}>
      <div className="relative h-[80vh] min-h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=90"
          alt="Dubai skyline"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: visible ? "scale(1)" : "scale(1.05)", transition: "transform 1.5s ease" }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <span
                className={`text-white/50 text-xs tracking-[0.5em] uppercase block mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                Exclusive Opportunity
              </span>

              <h2
                className={`text-white leading-tight mb-6 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
                  fontWeight: 700,
                }}
              >
                Your Dream Home
                <br />
                <em className="font-light italic text-white/80">Is One Call Away</em>
              </h2>

              <p
                className={`text-white/60 text-base mb-10 leading-relaxed max-w-lg transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                Our expert advisors help buyers and investors find the right
                property in Dubai. Whether you&apos;re investing or searching for a family
                home, we match you with the right property at the right price.
              </p>

              <div
                className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                <Link
                  href="/contact"
                  className="bg-white text-black px-8 py-4 font-semibold text-sm tracking-wide hover:bg-gray-100 transition-colors inline-flex items-center gap-3 group"
                >
                  Schedule a Free Consultation
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                <Link
                  href="/properties"
                  className="border border-white/40 text-white px-8 py-4 font-semibold text-sm tracking-wide hover:border-white hover:bg-white/10 transition-all inline-flex items-center gap-3"
                >
                  Browse All Properties
                </Link>
              </div>

              <div
                className={`mt-12 flex items-center gap-6 transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                {[
                  { icon: "★", text: "Trusted by Homebuyers & Investors" },
                  { icon: "✓", text: "RERA Certified Agency" },
                  { icon: "◎", text: "15+ Years in Dubai" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-white/60 text-xs">
                    <span className="text-white/40">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
        >
          <div className="bg-white p-8 w-72 shadow-2xl">
            <div className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3">Live Availability</div>
            <div className="space-y-4">
              {[
                { area: "Downtown Dubai", count: 143, trend: "+12" },
                { area: "Palm Jumeirah", count: 67, trend: "+5" },
                { area: "Dubai Marina", count: 298, trend: "+24" },
              ].map((item) => (
                <div key={item.area} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{item.area}</div>
                    <div className="text-xs text-gray-400">{item.count} listings</div>
                  </div>
                  <div className="text-xs text-green-600 font-semibold">{item.trend} new</div>
                </div>
              ))}
            </div>
            <Link
              href="/properties"
              className="mt-6 block w-full bg-black text-white text-center py-3 text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              Explore All
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
