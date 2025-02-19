// app/blogs/BlogsContainer.tsx
"use client";

import { useState, useEffect } from "react";
import {
  getBlogs,
  getLatestBlogs,
  getPopularBlogs,
} from "../../../lib/sanity/queries/blogQueries";
import BlogNavbar from "@/components/Blogs/Blogs_Navbar";
import SingleBlog from "@/components/Blogs/singleblog";
import ThreeBlogs from "@/components/Blogs/threeblog";
import RemainingBlogs from "@/components/Blogs/remaningblogs";

const BlogsContainer = () => {
  // State for active tab and search term
  const [activeTab, setActiveTab] = useState<"all" | "latest" | "popular">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs when activeTab or searchTerm changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let data;
      if (activeTab === "all") {
        data = await getBlogs(searchTerm);
      } else if (activeTab === "latest") {
        data = await getLatestBlogs(searchTerm);
      } else if (activeTab === "popular") {
        data = await getPopularBlogs(searchTerm);
      }
      setBlogs(data);
      setLoading(false);
    };
    fetchData();
  }, [activeTab, searchTerm]);

  // Split the fetched blogs into three sections
  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const threeBlogs = blogs.slice(1, 4);
  const remainingBlogs = blogs.slice(4);

  return (
    <section className="pt-[120px] md:pt-[130px] lg:pt-[160px]">
      <div className="container mx-auto max-w-[1350px] px-6 md:px-8 lg:px-12">
        {/* Pass state and setters to the Navbar */}
        <div className="mt-[-10px]">
          <BlogNavbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {loading ? (
          <p>Loading blogs...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.05fr_1fr] gap-3 lg:gap-6 mt-6">
              <div className="lg:pr-[30px] xl:pr-[50px] 2xl:pr-[70px]">
                <SingleBlog blog={featuredBlog} />
              </div>
              <div className="hidden lg:block w-[1.3px] bg-gray-300 h-full mx-auto"></div>
              <div>
                <ThreeBlogs blogs={threeBlogs} />
              </div>
            </div>
            <div className="mt-12">
              <RemainingBlogs blogs={remainingBlogs} />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BlogsContainer;
