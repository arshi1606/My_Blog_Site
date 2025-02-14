// lib/sanity/queries/privacyPolicyQueries.js
import { client } from "../sanity";

export async function getPrivacyPolicy() {
  const query = `*[_type == "privacyPolicy"][0]{
    title,
    content
  }`;
  return await client.fetch(query);
}
