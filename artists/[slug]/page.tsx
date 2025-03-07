import React from "react";
import Image from "next/image";
import { getArtistBySlug } from "@/sanity/lib/artists/getArtistBySlug";
import { Metadata } from "next";

// Define the Artist type
interface Artist {
  _id: string;
  slug: { current: string | null } | null;
  image: { asset: { url: string | null } | null } | null;
  fullName: string | null;
  country: string | null;
  bio: string | null;
}

// Define props for the page
interface ArtistPageProps {
  params: { slug: string };
}

// Metadata for SEO (optional)
export async function generateMetadata({ params }: ArtistPageProps): Promise<Metadata> {
  return {
    title: `Artist - ${params.slug}`,
  };
}

// Main component
export default async function ArtistPage({ params }: ArtistPageProps) {
  try {
    // Fetch artist data
    const artist: Artist | null = await getArtistBySlug(params.slug);

    // Handle case where artist is not found
    if (!artist) {
      return <div className="text-center text-red-500 font-semibold">Artist not found</div>;
    }

    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          {/* Artist Image */}
          <div className="relative aspect-square w-64 h-64 rounded-full overflow-hidden mx-auto mb-6">
            {artist.image?.asset?.url ? (
              <Image
                src={artist.image.asset.url}
                alt={artist.fullName || "Artist Image"}
                fill
                className="object-cover rounded-full"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100">
                <p className="text-gray-500 text-sm">Image not available</p>
              </div>
            )}
          </div>

          {/* Artist Details */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {artist.fullName || "Unnamed Artist"}
            </h1>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Country:</span> {artist.country || "Not specified"}
            </p>
            <div className="text-gray-600">
              <span className="font-semibold">About:</span>{" "}
              <p className="mt-2">{artist.bio || "No bio available"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching artist:", error);
    return <div className="text-center text-red-500 font-semibold">Error loading artist details.</div>;
  }
}
