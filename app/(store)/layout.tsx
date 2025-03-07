// import { DisableDraftMode } from "@/components/DisableDraftMode";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/header/Header";
import { SanityLive } from "@/sanity/lib/live";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
// import { VisualEditing } from "next-sanity";
// import { draftMode } from "next/headers";
import "../globals.css";

// agregar la url canonical a la meta

export const metadata: Metadata = {
  title: "Vinceville- Connecting hearts to art",
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
  authors: [{ name: "Vincent Nyangor", url: "http://vinceville.africa/en/" }],

  openGraph: {
    title: "Vinceville online - Connecting Hearts to art",

    description:
      "Explore a world of artistic expression at Vinceville Art Shop & Exhibitions. We offer a diverse collection of art, from contemporary paintings and stunning sculptures to digital prints and handcrafted pieces. Whether you're an art enthusiast, collector, or looking for a unique piece to enhance your space, Vinceville has something for you.",
    url: "http://vinceville.africa/en/",

    siteName: "Vinceville Store ",
    type: "website",
    images: [
      {
        url: "/og-img.png",
        width: 800,
        height: 600,
        alt: "Art image on the we",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinceville online - Connecting Hearts to art",
    description:
      "Exclusive, high-quality pieces by talented artists.",
    creator: "Vincent Nyangor",
    images: [
      {
        url: "/og-img.png",
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
          {/* {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )} */}
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
