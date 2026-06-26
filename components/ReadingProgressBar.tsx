"use client";

import React, { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setCompletion((window.scrollY / scrollHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-white/[0.05] z-[100] pointer-events-none select-none">
      <div
        className="h-full bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-teal transition-all duration-75"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
}
