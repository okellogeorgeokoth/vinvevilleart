import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getExhibitions } from '@/sanity/lib/exhibitions/getExhibitions';

// Define the Exhibition type
interface Exhibition {
  _id: string;
  slug: { current: string | null } | null; // Allow `slug` and `slug.current` to be nullable
  image: { asset: { url: string | null } | null } | null; // Allow `image` and `image.asset.url` to be nullable
  title: string | null; // Allow `title` to be nullable
  date: string | null; // Allow `date` to be nullable
  venue: string | null; // Allow `venue` to be nullable
  guestsOfHonor: string[] | null; // Allow `guestsOfHonor` to be nullable
  sponsors: string[] | null; // Allow `guestsOfHonor` to be nullable
  presentArtists: string[] | null; // Allow `presentArtists` to be nullable
}

async function exhibitions() {
  const exhibitions: Exhibition[] = await getExhibitions();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-6xl">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Exhibitions
        </h1>

        {/* Upcoming Exhibitions */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Exhibitions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exhibitions
            .filter((exhibition) => new Date(exhibition.date || "") > new Date())
            .map((exhibition) => (
              <div key={exhibition._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <Link href={`/exhbitions/${exhibition.slug?.current || ""}`}>
                  <div className="relative h-48 w-full mb-4">
                    {exhibition.image?.asset?.url ? (
                      <Image
                        src={exhibition.image.asset.url}
                        alt={exhibition.title || "Exhibition Image"}
                        fill
                        className="object-cover rounded-lg"
                      />
                    ) : (
                      <p>Image not found</p>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {exhibition.title || "Untitled Exhibition"}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Date:</strong>{" "}
                    {exhibition.date ? new Date(exhibition.date).toLocaleDateString() : "TBD"}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Venue:</strong> {exhibition.venue || "Venue not specified"}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Guests of Honor:</strong>{" "}
                    {exhibition.guestsOfHonor?.join(", ") || "None"}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Sponsors:</strong>{" "}
                    {exhibition.sponsors?.join(", ") || "None"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Present Artists:</strong>{" "}
                    {exhibition.presentArtists?.join(", ") || "None"}
                  </p>
                </Link>
              </div>
            ))}
        </div>

        {/* Past Exhibitions */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Past Exhibitions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exhibitions
            .filter((exhibition) => new Date(exhibition.date || "") <= new Date())
            .map((exhibition) => (
              <div key={exhibition._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <Link href={`/exhbitions/${exhibition.slug?.current || ""}`}>
                  <div className="relative h-48 w-full mb-4">
                    {exhibition.image?.asset?.url ? (
                      <Image
                        src={exhibition.image.asset.url}
                        alt={exhibition.title || "Exhibition Image"}
                        fill
                        className="object-cover rounded-lg"
                      />
                    ) : (
                      <p>Image not found</p>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {exhibition.title || "Untitled Exhibition"}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Date:</strong>{" "}
                    {exhibition.date ? new Date(exhibition.date).toLocaleDateString() : "TBD"}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Venue:</strong> {exhibition.venue || "Venue not specified"}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Guests of Honor:</strong>{" "}
                    {exhibition.guestsOfHonor?.join(", ") || "None"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Present Artists:</strong>{" "}
                    {exhibition.presentArtists?.join(", ") || "None"}
                  </p>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default exhibitions;