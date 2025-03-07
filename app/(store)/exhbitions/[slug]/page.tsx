import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getExhibitionBySlug } from '@/sanity/lib/exhibitions/getExhibitionBySlug';
import { Exhibition } from '@/app/types/exhibitionTypes';

export default async function ExhibitionPage({ params }: { params:Promise<{ slug: string }>}) {
  try {
    const { slug } = await params;

    if (!slug) return notFound();

    console.log("Slug:", slug);

    // Fetch the exhibition
    const exhibition: Exhibition | null = await getExhibitionBySlug(slug);
    
    if (!exhibition) return notFound();

    return (
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-6xl">
          {/* Exhibition Title */}
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            {exhibition.title || "Untitled Exhibition"}
          </h1>

          {/* Exhibition Image */}
          <div className="relative h-96 w-full mb-6">
            {exhibition.image?.asset?.url ? (
              <Image
                src={exhibition.image.asset.url}
                alt={exhibition.title || "Exhibition Image"}
                fill
                className="object-cover rounded-lg"
              />
            ) : (
              <div className="bg-gray-200 flex items-center justify-center h-full rounded-lg">
                <p className="text-gray-500">Image not available</p>
              </div>
            )}
          </div>

          {/* Exhibition Details */}
          <div className="space-y-4">
            <p className="text-gray-600">
              <strong>Date:</strong>{" "}
              {exhibition.date ? new Date(exhibition.date).toLocaleDateString() : "TBD"}
            </p>
            <p className="text-gray-600">
              <strong>Venue:</strong> {exhibition.venue || "Venue not specified"}
            </p>
            <p className="text-gray-600">
              <strong>Guests of Honor:</strong>{" "}
              {exhibition.guestsOfHonor?.join(", ") || "None"}
            </p>
            <p className="text-gray-600">
              <strong>Sponsors:</strong>{" "}
              {exhibition.sponsors?.join(", ") || "None"}
            </p>
            <p className="text-gray-600">
              <strong>Present Artists:</strong>{" "}
              {exhibition.presentArtists?.join(", ") || "None"}
            </p>
            {exhibition.description && (
              <div className="text-gray-600">
                <strong>Description:</strong>
                <p className="mt-2">{exhibition.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching exhibition data:", error);
    return notFound();
  }
}
