"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Hash, BookOpen, User, Briefcase, Code2, Award, Mail, Terminal, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: "navigation" | "blog";
}

interface BlogMeta {
  title: string;
  slug: string;
  excerpt: string;
}

interface CommandPaletteProps {
  blogPosts?: BlogMeta[];
}

const NAV_COMMANDS = [
  { id: "nav-home",         label: "Home",         description: "Go to the top",             icon: <Terminal className="h-3.5 w-3.5" />, href: "#home" },
  { id: "nav-about",        label: "About",        description: "Who is Prasanna?",           icon: <User className="h-3.5 w-3.5" />,     href: "#about" },
  { id: "nav-experience",   label: "Experience",   description: "Career & work history",      icon: <Briefcase className="h-3.5 w-3.5" />,href: "#experience" },
  { id: "nav-projects",     label: "Projects",     description: "Platform builds & tools",    icon: <Code2 className="h-3.5 w-3.5" />,    href: "#projects" },
  { id: "nav-skills",       label: "Skills",       description: "Technology stack overview",  icon: <Hash className="h-3.5 w-3.5" />,     href: "#skills" },
  { id: "nav-achievements", label: "Achievements", description: "Awards & LeetCode ranking",  icon: <Award className="h-3.5 w-3.5" />,    href: "#achievements" },
  { id: "nav-blog",         label: "Blog",         description: "Latest publications",        icon: <BookOpen className="h-3.5 w-3.5" />, href: "#blog" },
  { id: "nav-contact",      label: "Contact",      description: "Establish a connection",     icon: <Mail className="h-3.5 w-3.5" />,     href: "#contact" },
];

export default function CommandPalette({ blogPosts = [] }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to a section on the same page
  const scrollToSection = useCallback((href: string) => {
    setOpen(false);
    setQuery("");
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    } else {
      // If not on home page, navigate there first
      router.push(`/${href}`);
    }
  }, [router]);

  // Build full commands list
  const allCommands: CommandItem[] = [
    ...NAV_COMMANDS.map(cmd => ({
      ...cmd,
      category: "navigation" as const,
      action: () => scrollToSection(cmd.href),
    })),
    ...blogPosts.map(post => ({
      id: `blog-${post.slug}`,
      label: post.title,
      description: post.excerpt,
      icon: <BookOpen className="h-3.5 w-3.5" />,
      category: "blog" as const,
      action: () => {
        setOpen(false);
        setQuery("");
        router.push(`/blog/${post.slug}`);
      },
    })),
  ];

  // Filter based on query
  const filtered = query.trim()
    ? allCommands.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase()) ||
        (cmd.description ?? "").toLowerCase().includes(query.toLowerCase())
      )
    : allCommands;

  // Keyboard shortcut: Ctrl+K / Cmd+K to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Arrow key navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(i => (i + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(i => (i - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[selectedIndex]?.action();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selectedIndex]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  // Group commands by category
  const navItems = filtered.filter(c => c.category === "navigation");
  const blogItems = filtered.filter(c => c.category === "blog");

  return (
    <>
      {/* Trigger hint shown in Navbar (rendered separately) */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Command palette panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-[9999] w-full max-w-xl px-4"
            >
              <div className="rounded-xl border border-white/10 bg-[#080d1a]/95 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5">
                  <Search className="h-4 w-4 text-brand-cyan flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search sections, blog posts..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-mono"
                  />
                  <div className="flex items-center gap-1 select-none">
                    <kbd className="text-[10px] font-mono text-muted-foreground bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">ESC</kbd>
                  </div>
                  <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Results */}
                <div className="max-h-[50vh] overflow-y-auto py-2 no-scrollbar">
                  {filtered.length === 0 ? (
                    <div className="px-4 py-8 text-center font-mono text-xs text-muted-foreground">
                      $ grep: no results for &quot;{query}&quot;
                    </div>
                  ) : (
                    <>
                      {navItems.length > 0 && (
                        <div>
                          <div className="px-4 py-1.5 text-[9px] font-mono uppercase tracking-widest text-muted-foreground/60 select-none">
                            Navigation
                          </div>
                          {navItems.map(cmd => {
                            const globalIdx = filtered.indexOf(cmd);
                            const isSelected = globalIdx === selectedIndex;
                            return (
                              <button
                                key={cmd.id}
                                onClick={cmd.action}
                                onMouseEnter={() => setSelectedIndex(globalIdx)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                  isSelected
                                    ? "bg-brand-cyan/10 text-foreground"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                }`}
                              >
                                <span className={`flex-shrink-0 ${isSelected ? "text-brand-cyan" : ""}`}>
                                  {cmd.icon}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium truncate">{cmd.label}</div>
                                  {cmd.description && (
                                    <div className="text-[10px] font-mono text-muted-foreground/60 truncate">{cmd.description}</div>
                                  )}
                                </div>
                                {isSelected && (
                                  <ArrowRight className="h-3 w-3 flex-shrink-0 text-brand-cyan" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {blogItems.length > 0 && (
                        <div className={navItems.length > 0 ? "mt-1 border-t border-white/5 pt-1" : ""}>
                          <div className="px-4 py-1.5 text-[9px] font-mono uppercase tracking-widest text-muted-foreground/60 select-none">
                            Blog Posts
                          </div>
                          {blogItems.map(cmd => {
                            const globalIdx = filtered.indexOf(cmd);
                            const isSelected = globalIdx === selectedIndex;
                            return (
                              <button
                                key={cmd.id}
                                onClick={cmd.action}
                                onMouseEnter={() => setSelectedIndex(globalIdx)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                  isSelected
                                    ? "bg-brand-cyan/10 text-foreground"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                }`}
                              >
                                <span className={`flex-shrink-0 ${isSelected ? "text-brand-cyan" : ""}`}>
                                  {cmd.icon}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium truncate">{cmd.label}</div>
                                  {cmd.description && (
                                    <div className="text-[10px] font-mono text-muted-foreground/60 truncate">{cmd.description}</div>
                                  )}
                                </div>
                                {isSelected && (
                                  <ArrowRight className="h-3 w-3 flex-shrink-0 text-brand-cyan" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Footer hint */}
                <div className="flex items-center justify-between px-4 py-2 border-t border-white/5 select-none">
                  <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground/50">
                    <span className="flex items-center gap-1">
                      <kbd className="bg-white/5 border border-white/10 px-1 py-0.5 rounded text-[9px]">↑</kbd>
                      <kbd className="bg-white/5 border border-white/10 px-1 py-0.5 rounded text-[9px]">↓</kbd>
                      navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="bg-white/5 border border-white/10 px-1 py-0.5 rounded text-[9px]">↵</kbd>
                      select
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground/40">
                    {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
