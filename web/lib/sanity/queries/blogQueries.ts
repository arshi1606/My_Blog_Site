import { client } from "../../sanity/queries/sanityclient"; 

export async function getBlogs() {
  const query = `*[_type == "blog"]{
    _id,
    title,
    slug,
    mainImage {
      asset->{
        url
      }
    },
    publishedAt,
    metadescription,
    body,  
    author->{
      name,
      image {
        asset->{
          url
        }
      }
    }
  }`;
  return await client.fetch(query);
}

export async function getBlogBySlug(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug]{
    title,
    mainImage { asset-> { url } },
    author-> { name },
    publishedAt,
    body,
    "heading": body[style in ["h1","h2","h3","h4","h5","h6"]]
  }`;
  return await client.fetch(query, { slug });
}

export async function getBlogBySlugHeading(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug][0]{
    title,
    mainImage { asset-> { url } },
    author-> { name },
    publishedAt,
    body,
    "heading": body[style in ["h1","h2","h3","h4","h5","h6"]]
  }`;
  return await client.fetch(query, { slug });
}

export async function getBlogsByDate() {
  const query = `*[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage {
      asset->{
        url
      }
    },
    publishedAt,
    metadescription,
    body,  
    author->{
      name,
      image {
        asset->{
          url
        }
      }
    }
  }`;
  return await client.fetch(query);
}
