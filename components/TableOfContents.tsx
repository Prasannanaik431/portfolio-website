"use client";

import React, { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TocItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -80% 0px", // triggers when heading is in the top 20% of viewport
      threshold: 1.0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe each heading element on the page
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-2 text-left">
      <h4 className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground mb-4 font-semibold">
        Table of Contents
      </h4>
      <ul className="space-y-2.5 text-xs font-mono select-none">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
              className="list-none"
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(heading.id);
                  if (element) {
                    window.scrollTo({
                      top: element.offsetTop - 90,
                      behavior: "smooth",
                    });
                    setActiveId(heading.id);
                  }
                }}
                className={`transition-colors block py-0.5 leading-normal ${
                  isActive
                    ? "text-brand-cyan font-bold border-l-2 border-brand-cyan pl-2 -ml-2.5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
