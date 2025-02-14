import { client } from "../sanity";

export async function getAuthors() {
  const query = `*[_type == "author"]{
    _id,
    name,
    slug,
    image {
      asset->{
        url
      }
    },
    bio
  }`;
  return await client.fetch(query);
}

export async function getAuthorBySlug(slug: string) {
  const query = `*[_type == "author" && slug.current == $slug]{
    _id,
    name,
    slug,
    image { asset-> { url } },
    bio
  }`;
  return await client.fetch(query, { slug });
}

export async function getAuthorByName(name: string) {
  const query = `*[_type == "author" && name == $name]{
    _id,
    name,
    slug,
    image { asset-> { url } },
    bio
  }`;
  return await client.fetch(query, { name });
}

export async function getAuthorsWithBlogs() {
  const query = `*[_type == "author"]{
    _id,
    name,
    slug,
    image { asset-> { url } },
    bio,
    "blogs": *[_type == "blog" && author._ref == ^._id]{
      _id,
      title,
      slug,
      publishedAt,
      mainImage { asset-> { url } }
    }
  }`;
  return await client.fetch(query);
}
