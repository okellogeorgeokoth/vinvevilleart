import sanityClient from '@sanity/client';

export const sanity = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Your Sanity project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,     // Your Sanity dataset
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,         // Your Sanity write token
  useCdn: false,                           // Disable CDN for real-time updates
});