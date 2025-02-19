import { getCategoriesWithBlogs } from "../../../lib/sanity/queries/categoryQueries";
import Image from "next/image";
import Link from "next/link";

interface MainImage {
  asset?: {
    url?: string;
  };
}

interface Category {
  _id: string;
  title: string;
  description: string;
  mainImage?: MainImage;
}

export default async function CategoriesPage() {
  const categories: Category[] = await getCategoriesWithBlogs();
  return (
    <section className="pt-[180px] md:pt-[190px] lg:pt-[220px]">
   
      <div className="container mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
        <div>
       
          <div className="[&>h1]:font-dm [&>h1]:text-[#1D1D20] [&>h1]:text-[42px] sm:[&>h1]:text-[45px] md:[&>h1]:text-[55px] lg:[&>h1]:text-62px [&>h1]:font-semibold [&>h1]:leading-[72px]">
            <h1 id="categories">Categories</h1>
          </div>

    
          <div className="[&>p]:text-[#1D1D20] [&>p]:text-xl [&>p]:font-normal pt-4 pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16 max-w-[100%] md:max-w-[90%] lg:max-w-[75%] w-full [&>p]:leading-[28px] [&>p]:tracking-[-0.5px]">
            <p>
              Empowering businesses of all sizes—startups to global leaders—by transforming websites
              into fast, secure, and scalable digital experiences with Jamstack and cutting-edge web
              technologies.
            </p>
          </div>

       
          <div className="inline-flex justify-start [&>div>input]:min-w-full sm:[&>div>input]:min-w-[323px]">
            <div className="relative flex flex-row">
              <div className="absolute left-4 lg:left-5 cursor-auto top-1/2 -translate-y-1/2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.3333 15.5L9.08333 10.25C8.66667 10.5833 8.1875 10.8472 7.64583 11.0417C7.10417 11.2361 6.52778 11.3333 5.91667 11.3333C4.40278 11.3333 3.12153 10.809 2.07292 9.76042C1.02431 8.71181 0.5 7.43056 0.5 5.91667C0.5 4.40278 1.02431 3.12153 2.07292 2.07292C3.12153 1.02431 4.40278 0.5 5.91667 0.5C7.43056 0.5 8.71181 1.02431 9.76042 2.07292C10.809 3.12153 11.3333 4.40278 11.3333 5.91667C11.3333 6.52778 11.2361 7.10417 11.0417 7.64583C10.8472 8.1875 10.5833 8.66667 10.25 9.08333L15.5 14.3333L14.3333 15.5ZM5.91667 9.66667C6.95833 9.66667 7.84375 9.30208 8.57292 8.57292C9.30208 7.84375 9.66667 6.95833 9.66667 5.91667C9.66667 4.875 9.30208 3.98958 8.57292 3.26042C7.84375 2.53125 6.95833 2.16667 5.91667 2.16667C4.875 2.16667 3.98958 2.53125 3.26042 3.26042C2.53125 3.98958 2.16667 4.875 2.16667 5.91667C2.16667 6.95833 2.53125 7.84375 3.26042 8.57292C3.98958 9.30208 4.875 9.66667 5.91667 9.66667Z"
                    fill="#1C1B1F"
                  />
                </svg>
              </div>
              <input
                className="w-full px-10 py-2 rounded-3xl bg-[#F0F0F0] pr-10 pl-10 focus:outline-none"
                id="search"
                type="search"
                placeholder="Search"
                autoComplete="off"
              />
            </div>
          </div>


          <div className="pt-[80px] lg:pt-[100px] mb-[100px] sm:mb-[120px] md:mb-[150px] lg:mb-[180px]">
            <div>
              <div className="flex flex-col gap-[60px] md:gap-[90px] lg:gap-[104px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[60px] md:gap-[90px] lg:gap-[104px]">
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      href="#"
                      className=""
                    >
                      <div className="flex flex-col gap-[18px] w-full max-w-[510px]">
                        <img
                          alt={category.title}
                          loading="lazy"
                          width="82"
                          height="80"
                          decoding="async"
                          className="max-w-[82px] w-full h-[80px]"
                          src={
                            category.mainImage?.asset?.url ??
                            "https://cdn.sanity.io/images/7w000gxc/production/5106dd90453602cc4f28088b03ff0b23d770563c-800x800.svg?w=800&q=100&fit=clip&auto=format"
                          }
                          style={{ color: "transparent" }}
                        />
                        <div className="inline-block">
                          <h4 className="text-theme-charcolBlue text-[28px] md:text-[32px] font-dm font-semibold leading-[42px] hover:opacity-50 inline-block capitalize">
                            {category.title}
                          </h4>
                        </div>
                        <div className="[&>p]:text-theme-charcolBlue [&>p]:font-normal [&>p]:text-base [&>p]:leading-[24px]">
                          <p>{category.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
