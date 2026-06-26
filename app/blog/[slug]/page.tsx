/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from "lucide-react";

import { getPostBySlug, getAllPosts, getRelatedPosts, getPrevNextPosts } from "@/lib/blog";
import { mdxComponents } from "@/components/MdxComponents";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all MDX blog posts at build time (static site generation)
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate page-specific metadata for search engines
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Prasanna Suresh Naik`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

// Parse Markdown text to extract H2/H3 headings for TOC
interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(content: string): TocItem[] {
  const headings: TocItem[] = [];
  const lines = content.split("\n");
  const seen: Record<string, number> = {};

  lines.forEach((line) => {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      // rehype-slug uses github-slugger style: lowercase, keep unicode letters/digits, spaces → hyphens
      let id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")   // strip non-word chars except hyphen
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      // Handle duplicates the same way github-slugger does
      if (seen[id] !== undefined) {
        seen[id]++;
        id = `${id}-${seen[id]}`;
      } else {
        seen[id] = 0;
      }

      headings.push({ id, text, level });
    }
  });

  return headings;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);
  const relatedPosts = getRelatedPosts(slug, post.tags, 2);
  const { prev, next } = getPrevNextPosts(slug);

  const mdxOptions = {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [
        // rehype-slug MUST come before rehype-pretty-code so heading IDs are
        // applied before the highlighter processes code blocks
        rehypeSlug,
        [
          rehypePrettyCode,
          {
            theme: "one-dark-pro",
            keepBackground: true,
          },
        ],
      ] as any,
    },
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden pb-16">
      {/* Scroll indicator progress bar */}
      <ReadingProgressBar />

      {/* Background layer */}
      <AnimatedBackground />

      {/* Header navbar */}
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full flex-1">
        {/* Navigation path back to blog listings */}
        <div className="mb-8 text-left">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-brand-cyan transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            cd ../blog_listings
          </Link>
        </div>

        {/* Article header metadata info */}
        <header className="mb-10 text-left space-y-4">
          <div className="flex flex-wrap gap-1.5 select-none">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono text-brand-cyan bg-brand-cyan/5 border border-brand-cyan/20 px-2.5 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-xs font-mono text-muted-foreground pt-2">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-brand-blue" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-brand-cyan" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-brand-teal" />
              {post.readTime}
            </span>
          </div>

          <div className="w-full h-[1px] bg-white/5 dark:bg-white/5 pt-4" />
        </header>

        {/* Dynamic page grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main article content body */}
          <main className="lg:col-span-8 text-left select-text">
            <div className="prose dark:prose-invert max-w-none text-sm text-foreground/90 leading-relaxed font-sans prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-cyan hover:prose-a:underline prose-strong:text-foreground prose-strong:font-semibold prose-code:font-mono prose-code:text-xs dark:prose-code:text-brand-cyan/90 dark:prose-pre:bg-black/40">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={mdxOptions}
              />
            </div>

            {/* Previous & Next navigators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-10 mt-16 font-mono text-xs">
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="flex flex-col gap-1.5 p-4 rounded-lg border border-black/10 dark:border-white/5 bg-white/[0.01] hover:border-brand-cyan/20 hover:text-brand-cyan transition-colors"
                >
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    <ArrowLeft className="h-3 w-3" /> Previous Post
                  </span>
                  <span className="font-bold truncate text-left">{prev.title}</span>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="flex flex-col gap-1.5 p-4 rounded-lg border border-black/10 dark:border-white/5 bg-white/[0.01] hover:border-brand-cyan/20 hover:text-brand-cyan transition-colors items-end text-right"
                >
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1 justify-end">
                    Next Post <ArrowRight className="h-3 w-3" />
                  </span>
                  <span className="font-bold truncate w-full">{next.title}</span>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}
            </div>
          </main>

          {/* Sidebar: Table of contents (Sticky) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 self-start pl-6 border-l border-white/5">
            <TableOfContents headings={headings} />
          </aside>
        </div>

        {/* Related articles deck */}
        {relatedPosts.length > 0 && (
          <div className="border-t border-white/5 pt-12 mt-16 text-left">
            <h3 className="text-sm font-mono tracking-wider uppercase text-muted-foreground mb-6 font-semibold flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
              Related Operations Manuals
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.slug}
                  href={`/blog/${rPost.slug}`}
                  className="glass-panel p-5 rounded-lg border border-black/5 dark:border-white/5 block hover:border-brand-cyan/20 transition-all group"
                >
                  <span className="text-[9px] font-mono text-muted-foreground tracking-wide block mb-1">
                    {rPost.date} • {rPost.readTime}
                  </span>
                  <h4 className="text-sm font-bold text-foreground group-hover:text-brand-cyan transition-colors truncate">
                    {rPost.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                    {rPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
