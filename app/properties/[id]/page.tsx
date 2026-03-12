import Link from "next/link";

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-[#f8f7f5] pt-28 pb-16 px-6">
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">Property</p>
        <h1 className="text-3xl md:text-4xl font-semibold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
          Property Details
        </h1>
        <p className="mt-4 text-gray-600 text-sm leading-7">
          You are viewing property ID: <span className="font-semibold text-black">{id}</span>
        </p>
        <Link href="/properties" className="inline-block mt-8 text-sm font-semibold text-black underline underline-offset-4">
          Back to Properties
        </Link>
      </div>
    </main>
  );
}
