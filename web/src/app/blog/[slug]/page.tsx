import React from "react";
import { getBlogBySlug } from "../../../../lib/sanity/queries/blogQueries";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

interface Blog {
  title: string;
  mainImage: { asset: { url: string } };
  author?: { name: string };
  publishedAt: string;
  body: any;
}

interface BlogDetailsProps {
  params: {
    slug: string;
  };
}

const portableTextComponents = {
  types: {
    // Custom rendering for images within your Portable Text content
    image: ({ value }: { value: { asset: { url: string }; alt?: string } }) => {
      // Ensure that the URL exists and is not just empty or whitespace
      const url = value?.asset?.url?.trim();
      if (!url) {
        return null; // Do not render if URL is invalid
      }
      return (
        <div className="my-6">
          <Image
            src={url}
            alt={value.alt || "Blog image"}
            width={800}
            height={600}
            className="rounded-lg"
          />
        </div>
      );
    },
  },
  marks: {
    // Custom link rendering
    link: ({ children, value }: { children: React.ReactNode; value: { href: string } }) => {
      const target = value.href.startsWith("http") ? "_blank" : "_self";
      return (
        <a
          href={value.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-blue-600 underline"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    // Custom heading rendering
    h1: ({ children }: { children: React.ReactNode }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
    h2: ({ children }: { children: React.ReactNode }) => <h2 className="text-2xl font-semibold my-3">{children}</h2>,
    normal: ({ children }: { children: React.ReactNode }) => <p className="my-2">{children}</p>,
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => <ul className="list-disc ml-5 my-2">{children}</ul>,
    number: ({ children }: { children: React.ReactNode }) => <ol className="list-decimal ml-5 my-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => <li>{children}</li>,
    number: ({ children }: { children: React.ReactNode }) => <li>{children}</li>,
  },
};

const BlogDetails = async ({ params }: BlogDetailsProps) => {
  const blogData = await getBlogBySlug(params.slug);
  const blog: Blog | null = blogData?.[0] ?? null;

  if (!blog) {
    return <p className="text-center text-gray-500">Blog not found.</p>;
  }
  const mainImageUrl = blog.mainImage?.asset?.url?.trim();

  return (
    <div className="max-w-4xl mx-auto p-10">
      <div className="bg-white p-10 shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-4">{blog.title}</h1>
        <p className="text-blue-600 text-sm text-center mb-6">
          {blog.author?.name ? `By ${blog.author.name}` : "Unknown Author"} |{" "}
          {new Date(blog.publishedAt).toDateString()}
        </p>
        {mainImageUrl && (
          <div className="flex justify-center mb-6">
            <Image
              src={mainImageUrl}
              alt={blog.title}
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
        )}

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <div className="text-gray-700 prose mx-auto">
            <PortableText value={blog.body} components={portableTextComponents} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
