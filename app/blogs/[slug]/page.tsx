import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blogs-data";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return { title: "Blog Not Found | Emico" };
  }

  return {
    title: `${post.title} | Emico Blog`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f5f3ef] text-[#101010] pb-16 md:pb-24">
      <section className="relative h-84 md:h-112 overflow-hidden">
        <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/35 to-black/10" />

        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-end pb-10 md:pb-14">
          <div className="max-w-3xl text-white">
            <p className="text-[11px] tracking-[0.24em] uppercase text-white/70 mb-4">{post.tag}</p>
            <h1
              className="text-4xl md:text-6xl leading-[1.02]"
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontWeight: 600 }}
            >
              {post.title}
            </h1>
            <div className="mt-5 flex items-center gap-4 text-xs tracking-[0.12em] uppercase text-white/72">
              <span>{post.publishedOn}</span>
              <span className="h-1 w-1 rounded-full bg-white/50" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pt-10 md:pt-14">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10 items-start">
          <article className="bg-white border border-[#e6dfd4] p-7 md:p-10">
            <p className="text-sm md:text-[15px] leading-8 text-[#544c40] mb-8">{post.excerpt}</p>

            <div className="space-y-6">
              {post.content.map((paragraph) => (
                <p key={paragraph} className="text-sm md:text-[15px] leading-8 text-[#4d463b]">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 border-t border-[#eee5da] pt-5 flex items-center justify-between gap-4 flex-wrap">
              <span className="text-[11px] tracking-[0.16em] uppercase text-[#887c6f]">{post.tag}</span>
              <Link href="/blogs" className="text-xs font-semibold tracking-[0.12em] uppercase text-black hover:opacity-70 transition-opacity">
                Back To Blogs
              </Link>
            </div>
          </article>

          <aside className="lg:sticky lg:top-28 space-y-4">
            <div className="overflow-hidden border border-[#e6dfd4] bg-white">
              <img src={post.sideImage} alt={`${post.title} visual`} className="h-84 w-full object-cover" />
            </div>
            <div className="bg-[#0d0d0d] text-white p-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/60 mb-3">Need Help Deciding</p>
              <p
                className="text-2xl leading-[1.12]"
                style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontWeight: 600 }}
              >
                Talk to Emico advisors about this strategy.
              </p>
              <Link
                href="/contact"
                className="inline-block mt-5 px-5 py-2.5 border border-white/35 text-xs tracking-[0.12em] uppercase font-semibold hover:bg-white hover:text-black transition-colors"
              >
                Book Consultation
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
