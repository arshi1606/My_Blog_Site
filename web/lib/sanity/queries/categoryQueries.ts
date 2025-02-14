import { client } from "../sanity";

export async function getCategoriesWithBlogs() {
  const query = `*[_type == "category"]{
    _id,
    title,
    mainImage { asset-> { url } }, // Fetch mainImage URL
    description,
    "blogs": *[_type == "blog" && references(^._id)]{
      _id,
      title,
      slug,
      mainImage { asset-> { url } },
      publishedAt
    }
  }`;
  return await client.fetch(query);
}
