import { Footer } from "@/components/Footer";
import { Header } from "@/components/header/Header";
import { SanityLive } from "@/sanity/lib/live";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "../globals.css";

// Define the base URL for metadata
const METADATA_BASE_URL = "https://vinceville.africa";

export const metadata: Metadata = {
  metadataBase: new URL(METADATA_BASE_URL), // Set metadataBase for resolving absolute URLs
  title: "Vinceville - Connecting Hearts to Art",
  description:
    "Discover a world of creativity and inspiration in our online art store. We offer a curated selection of stunning artwork, from contemporary paintings to timeless sculptures, digital prints, and handcrafted pieces. Whether you're an art collector, a home decorator, or simply looking for a unique gift, our collection has something for everyone.",
  keywords: [
    "Vinceville art shop",
    "Vinceville exhibitions",
    "contemporary art",
    "paintings",
    "sculptures",
    "digital prints",
    "handcrafted art",
    "art collectors",
    "home decor",
    "art gifts",
  ],
  authors: [{ name: "Vincent Nyangor", url: `${METADATA_BASE_URL}/en/` }],
  alternates: {
    canonical: `${METADATA_BASE_URL}/en/`, // Add canonical URL for SEO
  },
  openGraph: {
    title: "Vinceville Online - Connecting Hearts to Art",
    description:
      "Explore a world of artistic expression at Vinceville Art Shop & Exhibitions. We offer a diverse collection of art, from contemporary paintings and stunning sculptures to digital prints and handcrafted pieces. Whether you're an art enthusiast, collector, or looking for a unique piece to enhance your space, Vinceville has something for you.",
    url: `${METADATA_BASE_URL}/en/`, // Use absolute URL
    siteName: "Vinceville Store",
    type: "website",
    images: [
      {
        url: `${METADATA_BASE_URL}/og-img.png`, // Use absolute URL for the image
        width: 800,
        height: 600,
        alt: "Art image on the web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinceville Online - Connecting Hearts to Art",
    description: "Exclusive, high-quality pieces by talented artists.",
    creator: "Vincent Nyangor",
    images: [
      {
        url: `${METADATA_BASE_URL}/og-img.png`, // Use absolute URL for the image
        width: 800,
        height: 600,
        alt: "Image of art collections",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="es">
        <body suppressHydrationWarning>
          <main className="overflow-x-hidden">
            <Header />
            {children}
            <Footer />
          </main>
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}