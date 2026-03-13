import Link from "next/link";
import { blogCategories, blogPosts } from "@/lib/blogs-data";

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-[#f5f3ef] text-[#0d0d0d]">
      <section className="relative h-80 md:h-105 overflow-hidden">
        <img src="/developers/dubaicreek.jpeg" alt="Dubai skyline at sunset" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="max-w-2xl">
            <p className="text-white/70 text-xs tracking-[0.26em] uppercase mb-4">Journal</p>
            <h1
              className="text-white text-4xl md:text-6xl leading-[1.05]"
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontWeight: 600 }}
            >
              Market Intelligence
              <br />
              by Emico Advisors
            </h1>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="flex flex-wrap gap-3">
          {blogCategories.map((category) => (
            <span key={category} className="px-3 py-1.5 bg-white border border-[#ddd5ca] text-[11px] uppercase tracking-[0.14em] text-[#6d6458]">
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16 md:pb-24">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group bg-white border border-[#e4ddd4] overflow-hidden hover:shadow-[0_14px_34px_rgba(0,0,0,0.07)] transition-shadow"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <article className="p-6 md:p-7">
                <p className="text-[10px] tracking-[0.18em] uppercase text-[#9a8b78] mb-3">{post.tag}</p>
                <h2
                  className="text-[28px] leading-[1.08] mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontWeight: 600 }}
                >
                  {post.title}
                </h2>
                <p className="text-sm leading-7 text-[#585044] mb-6">{post.excerpt}</p>
                <div className="flex items-center justify-between border-t border-[#eee5da] pt-4">
                  <span className="text-xs tracking-[0.12em] uppercase text-[#8d8274]">{post.readTime}</span>
                  <span className="text-xs font-semibold tracking-[0.12em] uppercase text-black">Read More</span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-[#0d0d0d] text-white p-7 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-white/60 mb-2">Need Project Advice</p>
            <h3
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontWeight: 600 }}
            >
              Speak with the Emico advisory team.
            </h3>
          </div>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 border border-white/35 text-xs tracking-[0.13em] uppercase font-semibold hover:bg-white hover:text-black transition-colors"
          >
            Book Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
