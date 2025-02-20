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

interface SingleBlogProps {
  blog: Blog | null;
}

const SingleBlog: React.FC<SingleBlogProps> = ({ blog }) => {
  if (!blog) {
    return <p>No blog found.</p>;
  }

  return (
    <div className="cursor-pointer transition duration-200 border-b-theme-charcolBlue30 border-b border-solid pb-[40px] md:pb-[50px]">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2 text-theme-charcolBlue70 font-regular text-base lg:text-lg xl:text-xl !leading-[20px]">
          <span>
            {blog.publishedAt
              ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "Unknown Date"}
          </span>
          <span>-</span>
          <span>{getReadingTime(blog.body)}</span>
        </div>
        <a
          target="_self"
          rel=""
          className="block"
          href={`/blog/${blog.slug.current}`}
        >
          {blog.mainImage?.asset?.url && (
            <Image
              src={blog.mainImage.asset.url}
              alt={blog.title}
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
          href={`/blog/${blog.slug.current}`}
        >
          {blog.title}
        </Link>
        {blog.metadescription && (
          <div className="[&>p]:text-theme-darkBrown [&>p]:text-base [&>p]:font-regular [&>p]:!leading-[24px] -mt-3 lg:mt-0">
            <p>{blog.metadescription}</p>
          </div>
        )}
        <div className="flex items-center gap-[12px] md:gap-[15px]">
          <img
            alt="Image"
            loading="lazy"
            width="24"
            height="24"
            decoding="async"
            className="rounded-full text-theme-charcolBlue text-xl font-normal w-[24px] h-[24px] object-cover"
            src={blog.author?.image?.asset?.url || ""}
            style={{ color: "transparent" }}
          />
          <span className="text-base md:text-lg lg:text-xl text-theme-charcolBlue70 font-normal !leading-[1]">
            By {blog.author?.name || "Unknown"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
