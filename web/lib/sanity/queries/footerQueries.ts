// lib/sanity/queries/footerQueries.js
import { client } from '../sanity';

export async function getFooter() {
  const query = `*[_type == "footer"][0]{
    newsletterHeading,
    emailPlaceholder,
    newsletterButtonText,
    socialLinks,
    "footerLinks": footerLinks[]{
      "text": title,
      "url": link
    }
  }`;
  return await client.fetch(query);
}
