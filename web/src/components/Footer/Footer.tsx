"use client";

import React from "react";
import { getFooter } from "../../../lib/sanity/queries/footerQueries";
import { ArrowUp } from "lucide-react";

interface SocialLink {
  platform: string;
  url: string;
}

interface FooterLink {
  text: string;
  url: string;
}

interface FooterType {
  newsletterHeading: string;
  emailPlaceholder: string;
  newsletterButtonText: string;
  socialLinks: SocialLink[];
  footerLinks: FooterLink[];
}

const GreenDot = () => (
  <span className="rounded-full text-[#65ed75] text-3xl mx-4">•</span>
);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Footer = async () => {
  const footer: FooterType = await getFooter();
  if (!footer) return <div>Loading...</div>;

  return (
    <>
      <footer className="bg-black relative ">
        <div className="container">
          <div className="pt-14 sm:pt-16 md:pt-20 pb-11">
            <div className="flex flex-col justify-center items-center">
              <div className="[&>h2]:text-white [&>h2]:font-medium [&>h2]:text-[32px] sm:[&>h2]:text-[38px] md:[&>h2]:text-[40px] lg:[&>h2]:text-[42px] w-full mx-auto [&>h2]:text-center [&>h2>br]:hidden xs:[&>h2>br]:inline-block [&>h2]:leading-[120%]">
                <h2 id="join-our-newsletter-and-get-daily-updates">
                  {footer.newsletterHeading}
                </h2>
              </div>
              <div className="mt-8 w-full max-w-md mx-auto">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Newsletter subscription submitted");
                  }}
                  className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-2"
                >
                  <div className="w-full">
                    <input
                      name="email"
                      type="email"
                      placeholder={footer.emailPlaceholder}
                      className="mt-1 block w-full rounded-[72px] border border-gray-300 px-4 py-3 shadow-sm focus:border-green-500 focus:ring-green-500 placeholder:font-semibold placeholder:text-base placeholder:text-white bg-transparent text-white focus-visible:outline-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-transparent bg-green-500 px-8 py-[10px] md:px-10 md:py-[12px] text-base font-semibold text-black hover:bg-transparent hover:border-green-500 hover:text-green-500 transition-all duration-200"
                  >
                    {footer.newsletterButtonText}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="flex items-center flex-col sm:flex-row justify-center mt-[70px] md:mt-[75px] lg:mt-[85px] gap-4 sm:gap-0">
            {footer.socialLinks.map((social, index) => (
              <div
                key={index}
                className="flex items-center flex-col sm:flex-row gap-4 sm:gap-0"
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-lg sm:text-xl md:text-2xl font-medium hover:opacity-50 !leading-[120%]"
                  href={social.url}
                >
                  {social.platform}
                </a>
                {index !== footer.socialLinks.length - 1 && <GreenDot />}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-10 xs:mt-12 sm:mt-14 md:mt-16 lg:mt-20 xl:mt-[92px]">
            {footer.footerLinks.map((link, index) => (
              <div key={index}>
                <a
                  target="_self"
                  rel=""
                  className="text-white text-base font-medium hover:opacity-50 leading-[120%] opacity-100"
                  href={link.url}
                >
                  {link.text}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-4 xs:right-6 sm:right-8 bottom-6 md:bottom-8 cursor-pointer">
          <button
            onClick={scrollToTop}
            className="text-black text-base font-semibold bg-[#65ed75] px-8 py-[10px] md:px-10 md:py-[12px] rounded-full inline-flex items-center justify-center border border-transparent hover:bg-transparent hover:border-green-500 hover:text-green-500 transition-all duration-200"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </>
  );
};

export default Footer;
