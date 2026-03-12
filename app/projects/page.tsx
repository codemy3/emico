import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarClock,
  HardHat,
  MapPin,
  Sparkles,
} from "lucide-react";

const stageCards = [
  {
    title: "New Launches",
    href: "/projects/new-launches",
    description:
      "Fresh market entries with early pricing, launch incentives, and the strongest upside for buyers entering ahead of the curve.",
    stat: "14 active launches",
    image: "/developers/downtown.jpeg",
    icon: Sparkles,
  },
  {
    title: "Under Construction",
    href: "/projects/under-construction",
    description:
      "Projects already in motion for buyers who want staged payments with clearer delivery visibility and construction progress.",
    stat: "22 progressing sites",
    image: "/developers/dubaicreek.jpeg",
    icon: HardHat,
  },
  {
    title: "Completed",
    href: "/projects/completed",
    description:
      "Move-in ready communities and income-producing assets for end users and investors who want immediate access or rental yield.",
    stat: "31 ready communities",
    image: "/developers/dubaihills.jpeg",
    icon: Building2,
  },
];

const featuredProjects = [
  {
    name: "Beach Vista",
    stage: "Under Construction",
    location: "Emaar Beachfront",
    developer: "Emaar Properties",
    price: "From AED 1.8M",
    summary: "Waterfront residences with private beach access and strong end-user appeal.",
    image: "/developers/emaar.webp",
  },
  {
    name: "DAMAC Bay by Cavalli",
    stage: "New Launch",
    location: "Dubai Harbour",
    developer: "DAMAC Properties",
    price: "From AED 4.5M",
    summary: "Branded luxury inventory positioned for buyers targeting premium waterfront demand.",
    image: "/developers/damac2.webp",
  },
  {
    name: "Creek Vistas Heights",
    stage: "New Launch",
    location: "Sobha Hartland",
    developer: "Sobha Realty",
    price: "From AED 1.1M",
    summary: "Skyline-facing apartments backed by a trusted developer and strong MBR City demand.",
    image: "/developers/soba2.webp",
  },
  {
    name: "Bluewaters Island Residences",
    stage: "Completed",
    location: "Bluewaters Island",
    developer: "Meraas",
    price: "From AED 3.0M",
    summary: "Ready premium homes in a lifestyle-led waterfront district with resilient resale appeal.",
    image: "/developers/dubaihills.jpeg",
  },
];

const highlights = [
  { label: "Project Stages", value: "3 clear entry points" },
  { label: "Focus", value: "Launch, build, ready" },
  { label: "Coverage", value: "Dubai primary market" },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ee] text-[#111111]">
      <section className="border-b border-black/10 bg-[#f6f3ee] px-6 pb-10 pt-28 md:px-10 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <div className="flex flex-col justify-between rounded-4xl border border-black/10 bg-[#0a1325] p-8 text-white md:p-10">
            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.34em] text-white/55">
                Projects In Dubai
              </p>
              <h1 className="max-w-3xl text-4xl leading-none md:text-6xl" style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}>
                One place to browse launches, active builds, and ready communities.
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 md:text-[15px]">
                Start by delivery stage, then move into the opportunities that match your timing, budget, and risk profile.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects/new-launches"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0a1325] transition-transform hover:-translate-y-0.5"
              >
                Explore New Launches
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/82 transition-colors hover:border-white/40 hover:text-white"
              >
                Browse All Properties
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="relative overflow-hidden rounded-4xl border border-black/10 bg-black">
              <img
                src="/developers/dubaicreek.jpeg"
                alt="Dubai Creek waterfront project"
                className="h-80 w-full object-cover opacity-90 lg:h-full"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-[11px] uppercase tracking-[0.32em] text-white/55">Market View</p>
                <p className="mt-2 max-w-sm text-2xl leading-tight" style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}>
                  Start with the stage that matches your buying timeline.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-3xl border border-black/10 bg-white p-5">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#6c6b68]">{item.label}</p>
                  <p className="mt-3 text-lg leading-tight text-[#0a1325]" style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#07234B]">Browse By Stage</p>
              <h2 className="mt-3 text-3xl leading-none text-[#111111] md:text-5xl" style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}>
                Choose how far along the project already is.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#5d5a55]">
              Each path is structured around a different buyer profile: early-entry investors, mid-cycle buyers seeking visibility, or ready-asset purchasers who want immediate use.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {stageCards.map((card) => {
              const Icon = card.icon;

              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group overflow-hidden rounded-4xl border border-black/10 bg-white transition-transform hover:-translate-y-1"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0a1325]">
                      <Icon size={14} />
                      {card.stat}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl text-[#111111]" style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}>
                          {card.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-[#5d5a55]">{card.description}</p>
                      </div>
                      <ArrowUpRight className="mt-1 text-[#07234B] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={18} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white px-6 py-12 md:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#07234B]">Featured Projects</p>
              <h2 className="mt-3 text-3xl leading-none text-[#111111] md:text-5xl" style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}>
                A sharper overview of what buyers are asking for now.
              </h2>
            </div>
            <div className="rounded-full border border-black/10 bg-[#f6f3ee] px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#5d5a55]">
              Curated by project momentum and buyer demand
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <article key={project.name} className="overflow-hidden rounded-4xl border border-black/10 bg-[#f6f3ee]">
                <div className="grid md:grid-cols-[0.95fr_1.05fr]">
                  <div className="relative min-h-70 overflow-hidden">
                    <img src={project.image} alt={project.name} className="h-full w-full object-cover" />
                    <div className="absolute left-4 top-4 rounded-full bg-[#0a1325] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                      {project.stage}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between p-6 md:p-7">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[#6c6b68]">{project.developer}</p>
                      <h3 className="mt-2 text-3xl leading-none text-[#111111]" style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}>
                        {project.name}
                      </h3>
                      <div className="mt-4 flex items-center gap-2 text-sm text-[#5d5a55]">
                        <MapPin size={14} />
                        {project.location}
                      </div>
                      <p className="mt-5 text-sm leading-7 text-[#5d5a55]">{project.summary}</p>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-black/10 pt-5">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#6c6b68]">Entry Price</p>
                        <p className="mt-2 text-xl text-[#0a1325]" style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}>
                          {project.price}
                        </p>
                      </div>
                      <Link
                        href="/properties"
                        className="inline-flex items-center gap-2 rounded-full border border-[#07234B]/20 px-4 py-2 text-sm font-semibold text-[#07234B] transition-colors hover:border-[#07234B] hover:bg-[#07234B] hover:text-white"
                      >
                        View Properties
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-[2.25rem] bg-[#0a1325] p-8 text-white md:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/55">Next Step</p>
              <h2 className="mt-3 max-w-3xl text-3xl leading-none md:text-5xl" style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}>
                Need help deciding between launch upside, construction visibility, or ready inventory?
              </h2>
              <div className="mt-6 flex flex-wrap gap-5 text-sm text-white/68">
                <div className="inline-flex items-center gap-2">
                  <CalendarClock size={16} />
                  Delivery timeline guidance
                </div>
                <div className="inline-flex items-center gap-2">
                  <Building2 size={16} />
                  Developer and project comparison
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0a1325] transition-transform hover:-translate-y-0.5"
              >
                Speak With An Advisor
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/properties"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/82 transition-colors hover:border-white/40 hover:text-white"
              >
                Browse All Listings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
