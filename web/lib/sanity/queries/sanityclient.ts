import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: '1g22v7v2', 
  dataset: 'production',       
  apiVersion: '2023-01-01',     
  useCdn: true,                 
});
