"use client";

import { useState, useEffect } from "react";
import {
  getBlogs,
  getLatestBlogs,
  getPopularBlogs,
} from "../../lib/sanity/queries/blogQueries";
import BlogNavbar from "@/components/Blogs/Blogs_Navbar";
import SingleBlog from "@/components/Blogs/singleblog";
import ThreeBlogs from "@/components/Blogs/threeblog";
import RemainingBlogs from "@/components/Blogs/remaningblogs";

const WelcomeSection = () => (
  <div className="text-center py-16 px-4">
    <div className="inline-flex items-center bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm font-semibold shadow-sm">
      <span className="text-green-600 font-bold text-lg">19,234</span>
      <span className="ml-2">Monthly visitors read our blog! 🎉</span>
    </div>
    <h1 className="mt-6 text-5xl font-extrabold text-gray-900 leading-tight">
      Code Chronicles: <br /> Frontend and Backend in Perfect Harmony
    </h1>
    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
      Your ultimate hub for modern development insights, tutorials, and trends—crafted by developers, for developers.
    </p>
  </div>
);

const HomePage = () => {
  
  const [activeTab, setActiveTab] = useState<"all" | "latest" | "popular">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState<any[]>([]);

  
  useEffect(() => {
    const fetchData = async () => {
      let data;
      if (activeTab === "all") {
        data = await getBlogs(searchTerm);
      } else if (activeTab === "latest") {
        data = await getLatestBlogs(searchTerm);
      } else if (activeTab === "popular") {
        data = await getPopularBlogs(searchTerm);
      }
      setBlogs(data);
    };
    fetchData();
  }, [activeTab, searchTerm]);

  
  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const threeBlogs = blogs.slice(1, 4);
  const remainingBlogs = blogs.slice(4);

  return (
    <section className="pt-[120px] md:pt-[130px] lg:pt-[160px]">
      <div className="container max-w-7xl mx-auto px-4">
        <WelcomeSection />
      
        <div className="mt-[-10px]">
          <BlogNavbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
    
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
      </div>
    </section>
  );
};

export default HomePage;
