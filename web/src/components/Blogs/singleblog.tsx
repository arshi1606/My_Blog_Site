import { getBlogs } from "../../../lib/sanity/queries/blogQueries";
import Image from "next/image";
import Link from "next/link";
import readingTime from "reading-time";

interface Blog {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: { asset?: { url: string } };
  publishedAt?: string;
  body?: any; 
  metadescription?: string;
  author?: {
    name: string;
    image?: { asset?: { url: string } };
  };
}

function toPlainText(content: any): string {
  if (!content) return "";
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((block: any) => {
        if (block._type !== "block" || !block.children) return "";
        return block.children.map((child: any) => child.text).join("");
      })
      .join("\n\n");
  }
  return "";
}

function getReadingTime(content: any): string {
  const plainText = toPlainText(content);
  return plainText ? readingTime(plainText).text : "Unknown read time";
}

export default async function FeaturedBlog() {
  const blogs: Blog[] = await getBlogs();

  const selectedBlog = blogs.length > 0 ? blogs[0] : null;

  return (
    <main className="max-w-8xl mx-auto">
      {selectedBlog ? (
        <div className="cursor-pointer transition duration-200 border-b-theme-charcolBlue30 border-b border-solid pb-[40px] md:pb-[50px]">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-2 text-theme-charcolBlue70 font-regular text-base lg:text-lg xl:text-xl !leading-[20px]">
              <span>
                {selectedBlog.publishedAt
                  ? new Date(selectedBlog.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Unknown Date"}
              </span>
              <span>-</span>
              <span>{getReadingTime(selectedBlog.body)}</span>
            </div>
            <a
              target="_self"
              rel=""
              className="block"
              href={`/blog/${selectedBlog.slug.current}`}
            >
              {selectedBlog.mainImage?.asset?.url && (
                <Image
                  src={selectedBlog.mainImage.asset.url}
                  alt={selectedBlog.title}
                  loading="lazy"
                  width={98}
                  height={98}
                  decoding="async"
                  className="rounded-lg"
                  style={{ color: "transparent" }}
                />
              )}
            </a>
            <Link
              target="_self"
              rel=""
              className="text-theme-darkBrown text-3xl md:text-4xl lg:text-5xl font-dm font-semibold leading-[1.3] hover:opacity-50"
              href={`/blog/${selectedBlog.slug.current}`}
            >
              {selectedBlog.title}
            </Link>
            {selectedBlog.metadescription && (
              <div className="[&>p]:text-theme-darkBrown [&>p]:text-base [&>p]:font-regular [&>p]:!leading-[24px] -mt-3 lg:mt-0">
                <p>{selectedBlog.metadescription}</p>
              </div>
            )}
            <div className="flex items-center gap-[12px] md:gap-[15px]">
              <img
                alt="Image"
                loading="lazy"
                width="24"
                height="24"
                decoding="async"
                data-nimg="1"
                className="rounded-full text-theme-charcolBlue text-xl font-normal w-[24px] h-[24px] object-cover"
                src={selectedBlog.author?.image?.asset?.url || ""}
                style={{ color: "transparent" }}
              />
              <span className="text-base md:text-lg lg:text-xl text-theme-charcolBlue70 font-normal !leading-[1]">
                By {selectedBlog.author?.name || "Unknown"}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No blog found.</p>
      )}
    </main>
  );
}
