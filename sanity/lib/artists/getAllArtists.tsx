import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllArtists = async () => {
  const ALL_ARTISTS_QUERY = defineQuery(`
    *[_type == "artist"] | order(fullName asc) {
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
    const artists = await sanityFetch({ query: ALL_ARTISTS_QUERY });
    console.log("Fetched Artists:", artists); // Debugging: Log fetched data
    return artists.data || [];
  } catch (error) {
    console.log("Error fetching artists:", error);
    return [];
  }
};