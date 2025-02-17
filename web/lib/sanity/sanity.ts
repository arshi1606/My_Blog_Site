import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: '1g22v7v2',
  dataset: 'production',
  apiVersion: '2023-01-01',   
  useCdn: false,
});

