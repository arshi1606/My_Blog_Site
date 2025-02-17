// // pages/blog/[slug].tsx
// import React from "react";
// import { getBlogBySlug } from "../../../../lib/sanity/queries/blogQueries";
// import Image from "next/image";
// import { PortableText } from "@portabletext/react";
// import { portableTextComponents } from "@/components/portabletext";

// interface HeadingBlock {
//   _type: string;
//   style: string;
//   children: Array<{ text: string }>;
//   _key: string;
// }

// interface Blog {
//   title: string;
//   mainImage: { asset: { url: string } };
//   author?: { name: string };
//   publishedAt: string;
//   body: any;
//   heading?: HeadingBlock[];
// }

// interface BlogDetailsProps {
//   params: {
//     slug: string;
//   };
// }
// const slugify = (text: any) => {
//   return text
//     .toString()
//     .toLowerCase()
//     .normalize()
//     .trim()
//     .replace(/\s+/g, "-")
//     .replace(/[^\w-]+/g, "");
// };


// const Toc = ({ heading }: { heading?: HeadingBlock[] }) => (
//   <div className="mb-4">
//     <h2 className="text-2xl font-semibold font-dm text-theme-charcolBlue">Table of Contents</h2>
//     <div className="flex flex-col gap-4 max-h-[52vh] overflow-auto scrollbar">
//     <nav>
//       <ul className="list-disc ml-4">
//         {heading?.map((item) => {
//           const text = item.children[0]?.text || "Untitled";
//           const anchor = slugify(text);
//           return (
//             <li key={item._key} className="mb-2">
//               <a href={`#${anchor}`} className="text-blue-600 hover:underline">

//                 {text}
//               </a>
//             </li>
//           );
//         })}
//       </ul>
//     </nav>
//     </div>
//   </div>
// );

// const BlogDetails = async ({ params: { slug } }: BlogDetailsProps) => {
//   const blogData = await getBlogBySlug(slug);
//   const blog: Blog | null = blogData?.[0] ?? null;

//   if (!blog) {
//     return <p className="text-center text-gray-500">Blog not found.</p>;
//   }

//   const mainImageUrl = blog.mainImage?.asset?.url?.trim();

//   return (
//     <div className="max-w-4xl mx-auto p-10">
//       <div className="bg-white p-10 shadow-xl rounded-lg">
//         <Toc heading={blog.heading} />
//         <h1 className="text-3xl font-bold text-center mb-4">{blog.title}</h1>
//         <p className="text-blue-600 text-sm text-center mb-6">
//           {blog.author?.name ? `By ${blog.author.name}` : "Unknown Author"} |{" "}
//           {new Date(blog.publishedAt).toDateString()}
//         </p>
//         {mainImageUrl && (
//           <div className="flex justify-center mb-6">
//             <Image
//               src={mainImageUrl}
//               alt={blog.title}
//               width={400}
//               height={300}
//               className="rounded-lg"
//             />
//           </div>
//         )}
//         <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//           <div className="text-gray-700 prose mx-auto">
//             <PortableText value={blog.body} components={portableTextComponents} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogDetails;


import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getBlogBySlug } from "../../../../lib/sanity/queries/blogQueries";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/portabletext";

interface HeadingBlock {
  _type: string;
  style: string;
  children: Array<{ text: string }>;
  _key: string;
}

interface Blog {
  title: string;
  mainImage: { asset: { url: string } };
  publishedAt: string;
  body: any;
  heading?: HeadingBlock[];
  author?: {
    name: string;
    image?: { asset?: { url: string } };
  };
}

interface BlogDetailsProps {
  params: {
    slug: string;
  };
}

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .normalize()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

export default async function BlogDetails({ params: { slug } }: BlogDetailsProps) {
  const blogData = await getBlogBySlug(slug);
  const blog: Blog | null = blogData?.[0] ?? null;

  if (!blog) {
    return <p className="text-center text-gray-500">Blog not found.</p>;
  }

  // Safely grab the blog’s main image URL (if needed)
  const mainImageUrl = blog.mainImage?.asset?.url?.trim();

  return (
    // Added pt-20 to account for a sticky navbar at the top
    <div className="max-w-[1200px] mx-auto px-4 pt-20 pb-8">
      {/* Top Section: Date, Title, Author */}
      <div className="flex flex-col gap-16 mb-16 py-12">
        {/* Date */}
        <p className="flex items-center gap-2 text-gray-600 font-regular
                   text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl !leading-[16px]">
          {new Date(blog.publishedAt).toDateString()}
        </p>

        {/* Title */}
        <h1 className="text-gray-500
                       text-[45px] sm:text-[50px] md:text-[55px] lg:text-[60px] xl:text-[75px]
                       font-semibold
                       leading-[60px] sm:leading-[65px] md:leading-[70px] lg:leading-[80px]
                       text-left">
          {blog.title}
        </h1>

        {/* Author with Image */}
        <div className="flex items-center gap-4 md:gap-6">
          {blog.author?.image?.asset?.url && (
            <img
              alt={blog.author?.name || "Unknown"}
              loading="lazy"
              width="24"
              height="24"
              decoding="async"
              className="rounded-full object-cover w-[24px] h-[24px]"
              src={blog.author.image.asset.url || ""}
              style={{ color: "transparent" }}
            />
          )}
          <span className="text-base md:text-base lg:text-lg text-gray-600 font-normal !leading-[1]">
            By {blog.author?.name || "Unknown"}
          </span>
        </div>
      </div>

      {/* Two-column layout with stretching columns */}
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        {/* LEFT SIDEBAR (Sticky Table of Contents) */}
        <aside className="hidden md:block md:w-1/4 flex-shrink-0 sticky top-32 h-[calc(100vh-8rem)] overflow-auto bg-white p-4">
          {/* Back to articles */}
          <div className="mb-6">
            <Link
              href="/blogs"
              className="flex items-center justify-center gap-2 bg-gray-200 rounded-full text-sm xl:text-base text-black font-semibold px-6 py-3 border border-transparent hover:border-gray-400 hover:bg-transparent transition-colors whitespace-nowrap"
            >
              {/* Left arrow icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Back to articles
            </Link>
          </div>

          {/* Table of Contents */}
          <h2 className="text-lg font-semibold mb-4">Table of contents</h2>
          <nav className="flex flex-col gap-2">
            {blog.heading?.map((item) => {
              const text = item.children[0]?.text || "Untitled";
              const anchor = slugify(text);
              return (
                <a
                  key={item._key}
                  href={`#${anchor}`}
                  className="text-gray-700 hover:underline text-sm leading-relaxed"
                >
                  {text}
                </a>
              );
            })}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="w-full md:w-3/4 flex-1 min-h-[calc(100vh-8rem)]">
          <article className="prose max-w-none pb-16">
            <PortableText value={blog.body} components={portableTextComponents} />
          </article>
        </main>
      </div>
    </div>
  );
}
