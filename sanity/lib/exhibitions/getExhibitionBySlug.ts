import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

// Fetch a single exhibition by slug
export const getExhibitionBySlug = async (slug: string) => {
  const EXHIBITION_BY_SLUG_QUERY = defineQuery(`
    *[_type == "exhibition" && slug.current == $slug][0] {
      _id,
      title,
      slug {
        current
      },
      date,
      venue,
      guestsOfHonor,
      presentArtists,
      sponsors,
      image {
        asset -> {
          url
        }
      },
      description
    }
  `);

  try {
    const exhibition = await sanityFetch({ query: EXHIBITION_BY_SLUG_QUERY, params: { slug } });
    return exhibition.data || null;
  } catch (error) {
    console.log("Error fetching exhibition by slug:", error);
    return null;
  }
};