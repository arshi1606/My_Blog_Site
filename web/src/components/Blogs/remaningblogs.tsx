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
  author?: {
    name: string;
    image?: { asset?: { url: string } };
  };
}

interface RemainingBlogsProps {
  blogs: Blog[];
}

function toPlainText(blocks: any): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block: any) => {
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((child: any) => child.text).join("");
    })
    .join("\n\n");
}

const RemainingBlogs: React.FC<RemainingBlogsProps> = ({ blogs }) => {
  if (!blogs || blogs.length === 0)
    return <p className="text-center text-gray-500">No blogs found.</p>;

  return (
    <main className="max-w-[663px] w-full mx-auto pt-[100px] sm:pt-[120px] md:pt-[140px] lg:pt-[163px] pb-[100px] sm:pb-[150px] md:pb-[190px] lg:pb-[210px] xl:pb-[245px]">
      <h1 className="text-theme-charcolBlue text-[28px] md:text-[32px] font-dm font-bold leading-[1.3] pb-[30px] sm:pb-[40px] lg:pb-[48px] capitalize border-b-theme-charcolBlue30 border-b border-solid mb-[30px] sm:mb-[40px] lg:mb-[48px] text-center">
        All Posts
      </h1>
      <div className="flex flex-col">
        {blogs.map((blog) => {
          const plainText = blog.body ? toPlainText(blog.body) : "";
          const stats = plainText
            ? readingTime(plainText)
            : { text: "Unknown read time" };

          return (
            <Link key={blog._id} href={`/blog/${blog.slug.current}`} passHref>
              <div className="flex flex-col gap-6 sm:gap-8 border-b-theme-charcolBlue30 border-b border-solid pb-[40px] md:pb-[50px] pt-[40px] sm:pt-[64px] lg:pb-[64px] first:pt-0 cursor-pointer transition">
                <div className="flex items-center gap-2 text-theme-charcolBlue font-regular text-sm sm:text-base lg:text-lg opacity-70 !leading-[20px]">
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
                  <span>{stats.text}</span>
                </div>
                <div className="w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[75%]">
                  <h2 className="text-theme-darkBrown text-2xl font-dm font-semibold hover:opacity-50">
                    {blog.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {blog.author?.image?.asset?.url && (
                    <Image
                      src={blog.author.image.asset.url}
                      alt={blog.author.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-sm">
                    By {blog.author?.name || "Unknown"}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default RemainingBlogs;
