// app/developers/[slug]/page.tsx
// Server Component only — no "use client"

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { developers, getDeveloperBySlug } from "@/lib/developers-data";
import DeveloperDetailClient from "@/app/developers/[slug]/Developerdetailclient";

export async function generateStaticParams() {
  return developers.map((d) => ({ slug: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dev = getDeveloperBySlug(slug);
  if (!dev) return {};
  return {
    title: `${dev.name} | Real Estate Developers in Dubai & UAE`,
    description: dev.description,
  };
}

export default async function DeveloperDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dev = getDeveloperBySlug(slug);
  if (!dev) notFound();

  return <DeveloperDetailClient dev={dev} />;
}