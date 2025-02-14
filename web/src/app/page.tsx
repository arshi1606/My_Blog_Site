import SingleBlog from "@/components/Blogs/singleblog";
import ThreeBlogs from "@/components/Blogs/threeblog";
import RemainingBlogs from "@/components/Blogs/remaningblogs";

const WelcomeSection = () => {
  return (
    <div className="text-center py-16 px-4">
      <div className="inline-flex items-center bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm font-semibold shadow-sm">
        <span className="text-green-600 font-bold text-lg">19,234</span>
        <span className="ml-2">Monthly visitor read our blog! 🎉</span>
      </div>

      <h1 className="mt-6 text-5xl font-extrabold text-gray-900 leading-tight">
        Code Chronicles: <br /> Frontend and Backend in Perfect Harmony
      </h1>

      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Your ultimate hub for modern development insights, tutorials, and trends—crafted by developers, for developers.
      </p>
    </div>
  );
};

const HomePage = () => {
  return (
    <section className="pt-[120px] md:pt-[130px] lg:pt-[160px]">
      <div className="container max-w-7xl mx-auto px-4">
        <WelcomeSection />
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.05fr_1fr] gap-4 lg:gap-12 mt-6">
          <div className="lg:pr-16 xl:pr-20 2xl:pr-24">
            <SingleBlog />
          </div>
          <div className="hidden lg:block w-[2px] bg-gray-300 h-full mx-auto"></div>
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

export default HomePage;
