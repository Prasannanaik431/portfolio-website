"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowLeft, Calendar, Clock, Terminal } from "lucide-react";
import { BlogPost } from "@/lib/blog";

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags across posts
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [posts]);

  // Filter posts based on search query and tag selection
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col justify-between">
      <div>
        {/* Navigation back home */}
        <div className="mb-10 text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-brand-cyan transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            cd ../portfolio
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-left mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400">
            Platform Operations & Infrastructure Blog
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed font-mono">
            $ grep -r &quot;thoughts&quot; /var/log/engineering
          </p>
          <div className="h-1 w-12 bg-gradient-to-r from-brand-blue to-brand-cyan mt-4 rounded-full" />
        </div>

        {/* Search and Filters panel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search posts (e.g. GitOps, Kyverno)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.02] border border-black/10 dark:border-white/5 rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-brand-cyan/40 transition-colors"
            />
          </div>

          {/* Tags list */}
          <div className="flex flex-wrap gap-2 select-none">
            <button
              onClick={() => setSelectedTag(null)}
              className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${
                selectedTag === null
                  ? "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20 font-bold"
                  : "bg-white/[0.01] text-muted-foreground border-black/5 dark:border-white/5 hover:border-white/10 hover:text-foreground"
              }`}
            >
              All Posts
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${
                  selectedTag === tag
                    ? "bg-brand-blue/10 text-brand-blue border-brand-blue/20 font-bold"
                    : "bg-white/[0.01] text-muted-foreground border-black/5 dark:border-white/5 hover:border-white/10 hover:text-foreground"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="glass-panel p-6 rounded-lg border border-black/5 dark:border-white/5 flex flex-col justify-between hover:border-brand-cyan/20 transition-all duration-300 group"
              >
                <div>
                  {/* Decorative Banner Cover (SVG) */}
                  <div className="w-full h-32 rounded-md mb-5 bg-gradient-to-br from-brand-blue/10 via-brand-cyan/5 to-transparent border border-white/5 flex items-center justify-center relative overflow-hidden select-none">
                    <div className="absolute inset-0 grid-bg opacity-20" />
                    <Terminal className="h-8 w-8 text-brand-cyan/30 group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Date & Read time */}
                  <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-brand-cyan transition-colors text-left">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-xs text-muted-foreground mb-6 leading-relaxed text-left">
                    {post.excerpt}
                  </p>
                </div>

                {/* Tags bottom list */}
                <div className="flex flex-wrap gap-1 border-t border-white/5 pt-4 select-none">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono text-muted-foreground bg-white/[0.02] border border-white/5 px-2.5 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-white/10 rounded-lg">
            <p className="text-sm font-mono text-muted-foreground">
              $ grep: no matches found for &quot;{searchQuery}&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
