"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Download, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home",         href: "#home" },
  { label: "About",        href: "#about" },
  { label: "Experience",   href: "#experience" },
  { label: "Projects",     href: "#projects" },
  { label: "Skills",       href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Blog",         href: "#blog" },
  { label: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen]         = useState(false);
  const [activeSection, setActive]  = useState("home");
  const [scrolled, setScrolled]     = useState(false);
  const pathname = usePathname();
  const router   = useRouter();

  const isHomePage = pathname === "/";

  useEffect(() => {
    if (!isHomePage) return;
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 200;
      for (const item of NAV_ITEMS) {
        const id = item.href.substring(1);
        const el = document.getElementById(id);
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.substring(1);
    setIsOpen(false);

    if (isHomePage) {
      // Already on homepage — just smooth scroll
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
        setActive(id);
      }
    } else {
      // On blog or any other page — navigate home with hash
      router.push(`/#${id}`);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass-navbar shadow-lg shadow-black/20" : "glass-navbar"
      }`}
    >
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a
          href={isHomePage ? "#home" : "/"}
          onClick={isHomePage ? (e) => handleNavClick(e, "#home") : undefined}
          className="flex items-center gap-2 font-mono text-lg font-bold tracking-tight text-foreground"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <Terminal className="h-5 w-5 text-brand-cyan" />
          </motion.div>
          <span>
            prasanna<span className="text-brand-cyan font-semibold">.naik</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(item => {
            const id = item.href.substring(1);
            const isActive = isHomePage ? activeSection === id : (id === "blog" && pathname.startsWith("/blog"));
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={e => handleNavClick(e, item.href)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavBg"
                    className="absolute inset-0 z-[-1] rounded-md bg-white/5"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {/* ⌘K command palette */}
          <button
            onClick={() => {
              const ev = new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true });
              window.dispatchEvent(ev);
            }}
            className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 hover:border-brand-cyan/20 px-2.5 py-1.5 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-all group"
            aria-label="Open command palette"
          >
            <Search className="h-3 w-3 group-hover:text-brand-cyan transition-colors" />
            <span>Search</span>
            <span className="flex items-center gap-0.5 ml-1">
              <kbd className="bg-white/5 border border-white/10 px-1 py-0.5 rounded text-[9px]">⌘</kbd>
              <kbd className="bg-white/5 border border-white/10 px-1 py-0.5 rounded text-[9px]">K</kbd>
            </span>
          </button>

          <a
            href="/resume/Prasanna_Naik_DevOps.pdf"
            download
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-4 py-1.5 text-xs font-semibold text-white shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </a>
        </div>

        {/* Mobile: Hamburger only */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-navbar overflow-hidden border-t border-white/5"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_ITEMS.map(item => {
                const id = item.href.substring(1);
                const isActive = isHomePage ? activeSection === id : (id === "blog" && pathname.startsWith("/blog"));
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={e => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-white/5 text-foreground"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <div className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />}
                  </a>
                );
              })}
              <div className="mt-4 border-t border-white/5 pt-4">
                <a
                  href="/resume/Prasanna_Naik_DevOps.pdf"
                  download
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-brand-blue to-brand-cyan py-2.5 text-sm font-semibold text-white"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
