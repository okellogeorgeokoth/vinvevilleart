import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllArtists } from '@/sanity/lib/artists/getAllArtists';

// Define the Artist type
interface Artist {
  _id: string;
  slug: { current: string | null } | null;
  image: { asset: { url: string | null } | null } | null;
  fullName: string | null;
  country: string | null;
  bio: string | null;
}

async function artists() {
  const artists: Artist[] = await getAllArtists();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Artists
        </h1>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <div
              key={artist._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={`/artists/${artist.slug?.current || ""}`}>
                {/* Image Container with Fixed Aspect Ratio */}
                <div className="relative aspect-square w-full rounded-full overflow-hidden mx-auto">
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
              </Link>

              {/* Artist Details */}
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {artist.fullName || "Unnamed Artist"}
                </h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Country:</span> {artist.country || "Not specified"}
                </p>
                <div className="text-gray-600 mb-4">
                  <span className="font-semibold">About:</span>{" "}
                  <span className="line-clamp-3">
                    {artist.bio || "No bio available"}
                  </span>
                </div>
                {/* "Read more" link */}
                <Link
                  href={`/artists/${artist.slug?.current || ""}`}
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300"
                  target="_blank" // Opens in a new tab
                  rel="noopener noreferrer" // Security best practice for target="_blank"
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default artists;