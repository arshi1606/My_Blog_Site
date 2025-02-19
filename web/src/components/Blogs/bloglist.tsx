// components/Blogs/BlogList.tsx
import Link from "next/link";
import Image from "next/image";
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

interface BlogListProps {
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

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  return (
    <div className="space-y-8">
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => {
          const plainText = blog.body ? toPlainText(blog.body) : "";
          const stats = plainText
            ? readingTime(plainText)
            : { text: "Unknown read time" };

          return (
            <Link key={blog._id} href={`/blog/${blog.slug.current}`}>
              <div className="cursor-pointer border-b pb-6">
                <div className="flex items-center gap-2 text-sm opacity-70">
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
                <h2 className="text-2xl font-semibold hover:opacity-50">
                  {blog.title}
                </h2>
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
        })
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
};

export default BlogList;
