// sanity/sanityClient.ts
import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: '1g22v7v2', // Replace with your Sanity project ID
  dataset: 'production',        // Replace with your dataset name if different
  apiVersion: '2023-01-01',       // Use a valid ISO date string
  useCdn: true,                 // `false` if you want to ensure fresh data
});
