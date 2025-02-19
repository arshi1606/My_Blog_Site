"use client"
import Navbar from "@/components/Blogs/Blogs_Navbar";
import SingleBlog from "@/components/Blogs/singleblog";
import ThreeBlogs from "@/components/Blogs/threeblog";

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
    
      </div>
    </section>
  );
};

export default BlogPage;
