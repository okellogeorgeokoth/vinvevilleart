import { defineLive } from "next-sanity";
import { client } from "./client";

// Ensure the token is available
const token = process.env.SANITY_API_READ_TOKEN;
if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN. Please add it to your environment variables.");
}

// Configure Sanity Live
export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: "v2023-05-03", // Replace with your API version
  }),
  serverToken: token,
  browserToken: token, // Only include this if the token is safe to expose to the client
  fetchOptions: {
    revalidate: 0, // Disable caching for live preview
  },
});