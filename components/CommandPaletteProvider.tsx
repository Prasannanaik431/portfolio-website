"use client";

import CommandPalette from "./CommandPalette";

interface BlogMeta {
  title: string;
  slug: string;
  excerpt: string;
}

export default function CommandPaletteProvider({ blogPosts }: { blogPosts: BlogMeta[] }) {
  return <CommandPalette blogPosts={blogPosts} />;
}
