import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live"; // Adjust the import path as needed

export const getArtistBySlug = async (slug: string) =>  {
  const ARTIST_BY_SLUG_QUERY = defineQuery(`
    *[_type == "artist" && slug.current == $slug][0] {
      _id,
      fullName,
      slug {
        current
      },
      image {
        asset -> {
          url
        }
      },
      country,
      bio
    }
  `);

  try {
    const artist = await sanityFetch({ query: ARTIST_BY_SLUG_QUERY, params: { slug } });
    console.log("Fetched Artist:", artist); // Debugging: Log fetched data
    return artist.data || null;
  } catch (error) {
    console.log("Error fetching artist:", error);
    return null;
  }
};