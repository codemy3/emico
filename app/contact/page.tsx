import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f5] pt-28 pb-16 px-6">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">Contact</p>
        <h1 className="text-3xl md:text-4xl font-semibold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
          Get In Touch
        </h1>
        <p className="mt-4 text-gray-600 text-sm leading-7">
          Reach our advisory team for buying, selling, or investment opportunities in Dubai.
        </p>
        <div className="mt-8 grid gap-4 text-sm text-gray-700">
          <p><span className="font-semibold">Phone:</span> +971 4 XXX XXXX</p>
          <p><span className="font-semibold">Email:</span> info@emico.ae</p>
          <p><span className="font-semibold">Office:</span> Business Bay, Dubai, UAE</p>
        </div>
        <Link href="/" className="inline-block mt-8 text-sm font-semibold text-black underline underline-offset-4">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
