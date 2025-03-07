import React from "react";
import Image from "next/image";
import { getArtistBySlug } from "@/sanity/lib/artists/getArtistBySlug";
import { notFound } from "next/navigation";
import { Artist } from "@/app/types/artistTypes";

export default async function ArtistPage({ params }: { params:Promise<{ slug: string }>}) {
  // ✅ Directly access params (remove `await`)
  const { slug } = await(params);

  if (!slug) {
    console.error("Missing slug parameter");
    return notFound();
  }

  console.log("Slug received:", slug);

  let artist: Artist | null = null;

  try {
    // Fetch the artist data
    artist = await getArtistBySlug(slug);

    if (!artist) {
      console.error("Artist not found for slug:", slug);
      return notFound();
    }

    if (!artist.slug?.current) {
      artist.slug = { current: "unknown" };
    }
  } catch (error) {
    console.error("Error fetching artist data:", error);
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
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
}
