"use client"
import Navbar from "@/components/Blogs/Blogs_Navbar";
import SingleBlog from "@/components/Blogs/singleblog";
import ThreeBlogs from "@/components/Blogs/threeblog";
import RemainingBlogs from "@/components/Blogs/remaningblogs";

const BlogPage = () => {
  return (
    <section className="pt-[120px] md:pt-[130px] lg:pt-[160px]">
      <div className="container mx-auto max-w-[1350px] px-6 md:px-8 lg:px-12">
        
        <div className="mt-[-10px]">
          <Navbar />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.05fr_1fr] gap-3 lg:gap-6 mt-6">
          

          <div className="lg:pr-[30px] xl:pr-[50px] 2xl:pr-[70px]">
            <SingleBlog />
          </div>
      
          <div className="hidden lg:block w-[1.3px] bg-gray-300 h-full mx-auto"></div>

          <div>
            <ThreeBlogs />
          </div>
        </div>
        <div className="mt-12">
          <RemainingBlogs />
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
// "use client";

// import React, { useState, useEffect } from "react";
// import Navbar from "@/components/Blogs/Blogs_Navbar";
// import SingleBlog from "@/components/Blogs/singleblog";
// import ThreeBlogs from "@/components/Blogs/threeblog";
// import RemainingBlogs from "@/components/Blogs/remaningblogs";
// import { getBlogs } from "../../../lib/sanity/queries/blogQueries";
// import Image from "next/image";
// import Link from "next/link";
// import readingTime from "reading-time";

// interface Blog {
//   _id: string;
//   title: string;
//   slug: { current: string };
//   mainImage?: { asset?: { url: string } };
//   publishedAt?: string;
//   body?: any;
//   metadescription?: string;
//   author?: {
//     name: string;
//     image?: { asset?: { url: string } };
//   };
// }

// function toPlainText(content: any): string {
//   if (!content) return "";
//   if (typeof content === "string") return content;
//   if (Array.isArray(content)) {
//     return content
//       .map((block: any) => {
//         if (block._type !== "block" || !block.children) return "";
//         return block.children.map((child: any) => child.text).join("");
//       })
//       .join("\n\n");
//   }
//   return "";
// }

// function getReadingTime(content: any): string {
//   const plainText = toPlainText(content);
//   return plainText ? readingTime(plainText).text : "Unknown read time";
// }

// const BlogNavbar: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTab, setActiveTab] = useState("all");

//   return (
//     <div className="flex flex-col lg:flex-row gap-8 justify-between mb-16 overflow-hidden">
//       <div className="flex gap-4 whitespace-nowrap overflow-x-auto w-full">
//         {["all", "latest", "popular"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-6 py-3 text-sm font-semibold rounded-full transition flex items-center justify-center ${
//               activeTab === tab
//                 ? "bg-green-500 hover:bg-green-600 text-white"
//                 : "bg-gray-100 hover:bg-gray-200 text-black"
//             }`}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       <div className="relative flex w-full lg:w-auto">
//         <input
//           className="w-full pr-12 py-2 pl-12 bg-gray-100 rounded-full text-lg placeholder-gray-500 focus:outline-none"
//           type="search"
//           placeholder="Search"
//           autoComplete="off"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//     </div>
//   );
// };

// const FeaturedBlog = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);

//   useEffect(() => {
//     async function fetchBlogs() {
//       const data = await getBlogs();
//       setBlogs(data);
//     }
//     fetchBlogs();
//   }, []);

//   if (!blogs.length) return <p>Loading...</p>;

//   const selectedBlog = blogs[0];

//   return (
//     <div className="lg:pr-[40px] xl:pr-[60px] 2xl:pr-[73px] cursor-pointer border-b border-gray-300 pb-[40px]">
//       <div className="flex flex-col gap-8">
//         <div className="flex items-center gap-2 text-gray-600 text-lg">
//           <span>
//             {selectedBlog.publishedAt
//               ? new Date(selectedBlog.publishedAt).toLocaleDateString("en-US", {
//                   month: "long",
//                   day: "numeric",
//                   year: "numeric",
//                 })
//               : "Unknown Date"}
//           </span>
//           <span>-</span>
//           <span>{getReadingTime(selectedBlog.body)}</span>
//         </div>
//         <Link href={`/blog/${selectedBlog.slug.current}`}>
//           {selectedBlog.mainImage?.asset?.url && (
//             <Image
//               src={selectedBlog.mainImage.asset.url}
//               alt={selectedBlog.title}
//               width={800}
//               height={400}
//               className="rounded-lg"
//             />
//           )}
//           <h2 className="text-2xl font-semibold mt-4">{selectedBlog.title}</h2>
//         </Link>
//       </div>
//     </div>
//   );
// };

// const BlogPage = () => {
//   return (
//     <section className="pt-[120px] md:pt-[130px] lg:pt-[160px]">
//       <div className="container mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
//         <Navbar />
//         <BlogNavbar />

//         <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.05fr_1fr] gap-6 lg:gap-12 mt-6">
//           <div className="lg:pr-[50px] xl:pr-[70px] 2xl:pr-[90px]">
//             <FeaturedBlog />
//             <SingleBlog />
//           </div>

//           <div className="hidden lg:block w-[1.5px] bg-gray-300 h-full mx-auto"></div>

//           <div>
//             <ThreeBlogs />
//           </div>
//         </div>

//         <div className="mt-12">
//           <RemainingBlogs />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BlogPage;
