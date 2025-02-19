import { client } from "../../sanity/queries/sanityclient"; 



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





export async function getBlogs(searchTerm: string = "") {
  // if a search term exists, filter by title or body text (using wildcards)
  const searchFilter = searchTerm
    ? ` && (title match "*${searchTerm}*" || body[].children[].text match "*${searchTerm}*")`
    : "";
  const query = `*[_type == "blog"${searchFilter}]{
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

export async function getLatestBlogs(searchTerm: string = "") {
  const searchFilter = searchTerm
    ? ` && (title match "*${searchTerm}*" || body[].children[].text match "*${searchTerm}*")`
    : "";
  const query = `*[_type == "blog"${searchFilter}] | order(publishedAt desc) {
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

export async function getPopularBlogs(searchTerm: string = "") {
  const searchFilter = searchTerm
    ? ` && (title match "*${searchTerm}*" || body[].children[].text match "*${searchTerm}*")`
    : "";
  const query = `*[_type == "blog"${searchFilter}] | order(views desc) {
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
    views,
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
