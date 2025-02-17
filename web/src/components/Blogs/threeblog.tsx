import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { getBlogs } from "../../../lib/sanity/queries/blogQueries";
import Image from "next/image";
import Link from "next/link";
import readingTime from "reading-time";

function toPlainText(blocks: any): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block: any) => {
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((child: any) => child.text).join("");
    })
    .join("\n\n");
}

export default async function LatestBlogs() {
  const blogs = await getBlogs();

  const firstBlogs = blogs.slice(0, 3);

  return (
    <section className="max-w-3xl mx-auto px-6 py-8">
      <h2 className="text-theme-darkBrown text-2xl font-dm font-semibold mb-[30px]">
        Latest Blogs
      </h2>
      <div className="space-y-[56px]">
        {firstBlogs.map((blog: any) => {

          const plainText = blog.body ? toPlainText(blog.body) : "";
          const stats = plainText
            ? readingTime(plainText)
            : { text: "Unknown read time" };

          return (
            <div>
              <div className="border-b-theme-charcolBlue30 border-b border-solid pb-[56px] cursor-pointer transition duration-200">
                <div className="flex items-center gap-3 text-theme-charcolBlue font-regular text-sm sm:text-base lg:text-lg opacity-70 !leading-[20px]">
                  <span>
                    {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span>-</span>
                  <span>{stats.text}</span>
                </div>
                <Link key={blog._id} href={`/blog/${blog.slug.current}`} passHref>
                  <div className="flex items-center justify-between w-full gap-4">
                    <h2 className="text-theme-darkBrown text-2xl font-dm font-semibold hover:opacity-50 flex-1">
                      {blog.title}
                    </h2>

                    {blog.mainImage?.asset?.url && (
                      <Image
                        src={blog.mainImage.asset.url}
                        alt={String(blog.title)}
                        width={52}
                        height={52}
                        className="rounded-lg object-cover w-[52px] h-[52px] shadow-md"
                      />
                    )}
                  </div>


                </Link>
                <div className="flex items-center gap-[14px] md:gap-[15px] mt-2">
                  {blog.author?.image?.asset?.url && (
                    <Image
                      src={blog.author.image.asset.url}
                      alt={String(blog.author.name)}
                      width={24}
                      height={24}
                      className="rounded-full w-[24px] h-[24px] object-cover"
                    />
                  )}
                  <span className="text-theme-charcolBlue70 font-normal text-sm md:text-base lg:text-lg">
                    By {blog.author?.name || "Unknown"}
                  </span>
                </div>
              </div>

              {/* <div>
                    {blog.mainImage?.asset?.url && (
                      <Image
                        src={blog.mainImage.asset.url}
                        alt={String(blog.title)}
                        width={52}
                        height={52}
                        className="rounded-lg"
                      />
                    )}
                  </div> */}

            </div>
          );
        })}
      </div>

    </section>
  );
}
