import React from "react";
import { getPrivacyPolicy } from "../../../lib/sanity/queries/privacypolicyQueries";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/portabletext";
export default async function PrivacyPolicyPage() {
  const privacyPolicy = await getPrivacyPolicy();

  const portableTextComponents = {
    types: {
      image: ({ value }: { value: { asset: { url: string }; alt?: string } }) => {
        const url = value?.asset?.url?.trim();
        if (!url) {
          return null; 
        }
        return <img src={url} alt={value.alt || "Image"} className="my-4" />;
      },
    },
    marks: {
      link: ({
        children,
        value,
      }: {
        children: React.ReactNode;
        value?: { href?: string };
      }) => {
        const href = value?.href || "#";
        const target = href.startsWith("http") ? "_blank" : "_self";
        return (
          <a
            href={href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            className="text-blue-600 underline"
          >
            {children}
          </a>
        );
      },
    },
    block: {
      h1: ({ children }: { children: React.ReactNode }) => (
        <h1 className="text-3xl font-bold my-4">{children}</h1>
      ),
      h2: ({ children }: { children: React.ReactNode }) => (
        <h2 className="text-2xl font-semibold my-3">{children}</h2>
      ),
      normal: ({ children }: { children: React.ReactNode }) => (
        <p className="my-2">{children}</p>
      ),
    },
    list: {
      bullet: ({ children }: { children: React.ReactNode }) => (
        <ul className="list-disc ml-5 my-2">{children}</ul>
      ),
      number: ({ children }: { children: React.ReactNode }) => (
        <ol className="list-decimal ml-5 my-2">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }: { children: React.ReactNode }) => <li>{children}</li>,
      number: ({ children }: { children: React.ReactNode }) => <li>{children}</li>,
    },
  };

  if (!privacyPolicy) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mx-auto px-6 py-12">
    <h1 className="text-5xl font-extrabold mb-8 text-center">{privacyPolicy.title}</h1>
    <div className="prose prose-lg max-w-3xl mx-auto">
      <PortableText
        value={privacyPolicy.content}
        components={portableTextComponents}
      />
    </div>
  </main>
  );
}
