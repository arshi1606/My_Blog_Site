import { client } from "../sanity";

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
    author -> { name },
    publishedAt,
    body
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

// export async function getBlogsByViews() {
//   const query = `*[_type == "blog"] | order(views desc) {
//     _id,
//     title,
//     slug,
//     mainImage {
//       asset->{
//         url
//       }
//     },
//     publishedAt,
//     metadescription,
//     body,
//     views,
//     author->{
//       name,
//       image {
//         asset->{
//           url
//         }
//       }
//     }
//   }`;
//   return await client.fetch(query);
// }
