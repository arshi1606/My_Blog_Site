import React from "react";
import Link from "next/link";
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

  const mainImageUrl = blog.mainImage?.asset?.url?.trim();

  return (

    <div className="max-w-[1200px] mx-auto px-4 pt-20 pb-8">
      <div className="flex flex-col gap-16 mb-16 py-12">
        <p className="flex items-center gap-2 text-gray-600 font-regular
                   text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl !leading-[16px]">
          {new Date(blog.publishedAt).toDateString()}
        </p>
        <h1 className="text-gray-500
                       text-[45px] sm:text-[50px] md:text-[55px] lg:text-[60px] xl:text-[75px]
                       font-semibold
                       leading-[60px] sm:leading-[65px] md:leading-[70px] lg:leading-[80px]
                       text-left">
          {blog.title}
        </h1>

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

      <div className="flex flex-col md:flex-row gap-8 items-stretch">

        <aside className="hidden md:block md:w-1/4 flex-shrink-0 sticky top-32 h-[calc(100vh-8rem)] overflow-auto bg-white p-4">
          <div className="mb-6">
            <Link
              href="/blogs"
              className="flex items-center justify-center gap-2 bg-gray-200 rounded-full text-sm xl:text-base text-black font-semibold px-6 py-3 border border-transparent hover:border-gray-400 hover:bg-transparent transition-colors whitespace-nowrap"
            >
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
        <main className="w-full md:w-3/4 flex-1 min-h-[calc(100vh-8rem)]">
          <article className="prose max-w-none pb-16">
            <PortableText value={blog.body} components={portableTextComponents} />
          </article>
        </main>
        </div>
      </div>  
  );
}
