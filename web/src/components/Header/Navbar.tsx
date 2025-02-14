import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getNavbar } from "../../../lib/sanity/queries/navbarQueries";
import { TfiAlignJustify as ReorderIcon } from "react-icons/tfi";

export const revalidate = 60;

interface MenuItem {
  title: string;
  link: string;
}

interface NavbarType {
  menuItems: MenuItem[];
}

export default async function Navbar() {
  const navbar: NavbarType = await getNavbar();
  return <NavbarContent navbar={navbar} />;
}

function NavbarContent({ navbar }: { navbar: NavbarType }) {
  return (
    <header
      id="header"
      className="sticky top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200 py-4"
    >
      <div className="hidden lg:flex">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <DesktopMenu navbar={navbar} />
          </div>
        </div>
      </div>
      <MobileMenuToggle navbar={navbar} />
    </header>
  );
}

function Logo() {
  return (
    <Link href="/">
      <Image
        src="https://cdn.sanity.io/images/7w000gxc/production/651ffe10cb0581f32fcae4b2547d426a8363d05b-700x299.png?w=700&q=100&fit=clip&auto=format"
        alt="Logo"
        width={175}
        height={75}
        priority
        className="max-w-[175px] w-full"
      />
    </Link>
  );
}

function LogoSmall() {
  return (
    <Link href="/">
      <Image
        src="https://cdn.sanity.io/images/7w000gxc/production/651ffe10cb0581f32fcae4b2547d426a8363d05b-700x299.png?w=700&q=100&fit=clip&auto=format"
        alt="Logo"
        width={140}
        height={60}
        priority
        className="max-w-[140px] w-full"
      />
    </Link>
  );
}

function DesktopMenu({ navbar }: { navbar: NavbarType }) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-8">
        {navbar.menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="text-theme-primary text-lg font-medium hover:opacity-50 transition-opacity duration-200"
          >
            {item.title}
          </Link>
        ))}
      </div>
      <ContactButton />
    </div>
  );
}

function ContactButton() {
  return (
    <Link
      href="/contact_us"
      className="text-black text-base font-semibold bg-green-500 px-8 py-[10px] md:px-10 md:py-[12px] rounded-full inline-flex items-center justify-center border-2 border-transparent hover:bg-transparent hover:border-green-500 hover:text-green-500 transition-all duration-200"
    >
      Contact
    </Link>
  );
}

function MobileMenuToggle({ navbar }: { navbar: NavbarType }) {
  return (
    <div className="lg:hidden">
      <input type="checkbox" id="mobile-menu-toggle" className="peer hidden" />
      <div className="w-full bg-white">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12 flex items-center justify-between h-16">
          <LogoSmall />
          <label htmlFor="mobile-menu-toggle" className="cursor-pointer">
            <ReorderIcon className="text-2xl" />
          </label>
        </div>
      </div>
      <div className="peer-checked:translate-x-0 translate-x-full fixed top-0 right-0 w-screen h-full bg-black text-white p-6 transition-transform duration-300 z-[999] py-36 px-12">
        <div className="absolute top-14 right-6">
          <label htmlFor="mobile-menu-toggle" className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
              className="w-[28px] h-[28px]"
            >
              <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z" />
            </svg>
          </label>
        </div>
        <div className="flex flex-col gap-8">
          {navbar.menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="text-4xl font-semibold hover:opacity-50 transition-opacity duration-200"
            >
              {item.title}
            </Link>
          ))}
          <Link
            href="/privacy_policy"
            className="text-4xl font-semibold capitalize hover:opacity-50 transition-opacity duration-200"
          >
            Privacy Policy
          </Link>
        </div>
        <div className="mt-12">
          <ContactButton />
        </div>
      </div>
    </div>
  );
}
