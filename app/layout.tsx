import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "../components/Footer";

// Body font — clean modern sans matching the reference website
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Display font — bold editorial serif for headings, exactly like reference
const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "emico — Premium Real Estate in Dubai",
  description:
    "Dubai's leading real estate agency. Discover luxury apartments, villas, penthouses and off-plan investments with Apex Realty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmSerif.variable} antialiased`}
        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        suppressHydrationWarning  
      >
        <Navbar />
        {children}
        <div style={{ height: 1, background: "linear-gradient(to right, transparent, #d1d5db 20%, #d1d5db 80%, transparent)" }} />
        <Footer />
      </body>
    </html>
  );
}