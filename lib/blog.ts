import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  cover: string;
  author: string;
  readTime: string;
  slug: string;
  content: string;
}

// Calculate reading time based on typical WPM (words per minute)
function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const numberOfWords = text.split(/\s+/g).length;
  const minutes = Math.ceil(numberOfWords / wordsPerMinute);
  return `${minutes} min read`;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);

  const posts = files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(BLOG_DIR, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      const slug = file.replace(/\.mdx?$/, "");
      const calculatedReadTime = calculateReadingTime(content);

      return {
        slug,
        content,
        title: data.title || "Untitled Post",
        date: data.date || "2026-06-26",
        excerpt: data.excerpt || "",
        tags: data.tags || [],
        cover: data.cover || "/blog/default-cover.svg",
        author: data.author || "Prasanna Suresh Naik",
        readTime: data.readTime || calculatedReadTime,
      } as BlogPost;
    });

  // Sort posts by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const mdPath = path.join(BLOG_DIR, `${slug}.md`);
    const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
    let filePath = "";

    if (fs.existsSync(mdxPath)) {
      filePath = mdxPath;
    } else if (fs.existsSync(mdPath)) {
      filePath = mdPath;
    } else {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const calculatedReadTime = calculateReadingTime(content);

    return {
      slug,
      content,
      title: data.title || "Untitled Post",
      date: data.date || "2026-06-26",
      excerpt: data.excerpt || "",
      tags: data.tags || [],
      cover: data.cover || "/blog/default-cover.svg",
      author: data.author || "Prasanna Suresh Naik",
      readTime: data.readTime || calculatedReadTime,
    };
  } catch {
    return null;
  }
}

export function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts
    .filter((post) => post.slug !== currentSlug) // exclude current
    .map((post) => {
      // count intersecting tags
      const matchCount = post.tags.filter((t) => tags.includes(t)).length;
      return { post, matchCount };
    })
    .filter((item) => item.matchCount > 0) // only matching tags
    .sort((a, b) => b.matchCount - a.matchCount || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
    .map((item) => item.post)
    .slice(0, limit);
}

export function getPrevNextPosts(currentSlug: string): { prev: BlogPost | null; next: BlogPost | null } {
  const descPosts = getAllPosts();
  const descIndex = descPosts.findIndex((post) => post.slug === currentSlug);
  
  if (descIndex === -1) {
    return { prev: null, next: null };
  }
  
  return {
    next: descIndex > 0 ? descPosts[descIndex - 1] : null, // newer post
    prev: descIndex < descPosts.length - 1 ? descPosts[descIndex + 1] : null, // older post
  };
}
