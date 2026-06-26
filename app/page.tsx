import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnimatedBackground from "@/components/AnimatedBackground";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function Home() {
  const featuredPosts = getAllPosts().slice(0, 3);

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden">
      {/* Dynamic Background Layout */}
      <AnimatedBackground />

      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="flex-1 w-full animate-fadeIn">
        {/* Home Hero Section */}
        <Hero />
        
        {/* About Section */}
        <About />

        {/* Experience Section */}
        <Experience />

        {/* Projects Section */}
        <Projects />

        {/* Skills Section */}
        <Skills />

        {/* Achievements Section */}
        <Achievements />

        {/* Blog Section */}
        <section id="blog" className="py-24 relative overflow-hidden bg-black/10 dark:bg-black/10 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Section Heading */}
            <div className="mb-16 text-left">
              <h2 className="text-xs font-mono text-brand-cyan tracking-wide mb-2">
                $ tail -n 3 /var/log/articles
              </h2>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400">
                Field notes from production.
              </h3>
              <p className="text-sm text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                Deep dives on GitOps, policy-as-code, and platform engineering — written from the cluster, not the slide deck.
              </p>
              <div className="h-1 w-12 bg-gradient-to-r from-brand-blue to-brand-cyan mt-3 rounded-full" />
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredPosts.map((post) => (
                <div
                  key={post.slug}
                  className="glass-panel p-6 rounded-lg border border-black/5 dark:border-white/5 flex flex-col justify-between hover:border-brand-cyan/20 transition-all duration-300 group"
                >
                  <div className="text-left">
                    {/* Cover visual overlay */}
                    <div className="w-full h-32 rounded-md mb-5 bg-gradient-to-br from-brand-blue/10 via-brand-cyan/5 to-transparent border border-white/5 flex items-center justify-center relative overflow-hidden select-none">
                      <div className="absolute inset-0 grid-bg opacity-20" />
                      <span className="text-[10px] font-mono text-brand-cyan/30 tracking-wider">
                        {post.tags[0] || "PLATFORM"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-foreground mb-2 group-hover:text-brand-cyan transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4 flex justify-between items-center select-none">
                    <div className="flex gap-1">
                      {post.tags.slice(0, 2).map((t) => (
                        <span key={t} className="text-[8px] font-mono text-muted-foreground bg-white/[0.01] border border-white/5 px-1.5 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[10px] font-mono text-brand-cyan hover:text-white flex items-center gap-1 transition-colors"
                    >
                      Read
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Read more button */}
            <div className="flex justify-center select-none">
              <Link
                href="/blog"
                className="group flex items-center gap-2 rounded-full border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 px-6 py-2.5 text-xs font-semibold font-mono tracking-wider text-muted-foreground hover:text-foreground transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                $ cd ../publications
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 text-brand-cyan" />
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <Contact />
      </main>
    </div>
  );
}
