import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

// Fetch all exhibitions
export const getExhibitions = async () => {
  const EXHIBITIONS_QUERY = defineQuery(`
    *[_type == "exhibition"] | order(date asc) {
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
    const exhibitions = await sanityFetch({ query: EXHIBITIONS_QUERY });
    return exhibitions.data || [];
  } catch (error) {
    console.log("Error fetching exhibitions:", error);
    return [];
  }
};
