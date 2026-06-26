import React from "react";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogList from "@/components/BlogList";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Blog | Prasanna Suresh Naik",
  description:
    "Technical articles on Kubernetes platform engineering, infrastructure-as-code, GitOps automation, and security policies.",
  openGraph: {
    title: "Blog | Prasanna Suresh Naik",
    description:
      "Technical articles on Kubernetes platform engineering, infrastructure-as-code, GitOps automation, and security policies.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden">
      {/* Background layer */}
      <AnimatedBackground />

      {/* Navigation bar */}
      <Navbar />

      {/* Blog listings */}
      <main className="flex-1 w-full animate-fadeIn">
        <BlogList posts={posts} />
      </main>
    </div>
  );
}
