"use client";

import { useRef, useEffect, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
}

const stats: Stat[] = [
  { value: 15, suffix: "+", label: "Years of Excellence", sublabel: "Established in Dubai's property market since 2009" },
  { value: 1000, suffix: "+", label: "Properties Sold", sublabel: "Across Dubai's most sought-after communities" },
  { value: 97, suffix: "%", label: "Client Satisfaction", sublabel: "Based on verified client reviews and feedback" },
];

function CountUp({ target, suffix, prefix }: { target: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, started]);

  return (
    <div ref={ref} className="text-4xl lg:text-5xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
      {prefix && <span className="text-2xl lg:text-3xl">{prefix}</span>}
      {count.toLocaleString()}
      <span className="text-white/60">{suffix}</span>
    </div>
  );
}

export default function StatsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-black py-24 px-6 relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{ background: "linear-gradient(to right, transparent, white, transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-white/30 text-xs tracking-[0.4em] uppercase block mb-4">By The Numbers</span>
          <h2
            className="text-white"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
            }}
          >
            A Legacy of <em className="font-light italic">Success</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`bg-black p-8 lg:p-12 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <CountUp target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              <div className="mt-3 text-white font-semibold text-sm tracking-wide">{stat.label}</div>
              <div className="mt-2 text-white/30 text-xs leading-relaxed">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
