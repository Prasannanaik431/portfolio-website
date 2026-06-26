import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import CommandPaletteProvider from "@/components/CommandPaletteProvider";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import { getAllPosts } from "@/lib/blog";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prasanna Suresh Naik | Platform & DevOps Engineer",
  description:
    "Platform Engineer specializing in Kubernetes, Internal Developer Platforms, GitOps, AWS, Azure, DevSecOps, Infrastructure Automation, Platform Reliability and Developer Experience.",
  keywords: [
    "Prasanna Suresh Naik",
    "Platform Engineer",
    "DevOps Engineer",
    "Kubernetes Specialist",
    "GitOps",
    "Flux2",
    "Terraform",
    "Infrastructure as Code",
    "Internal Developer Platforms",
    "SaaS Infrastructure",
  ],
  authors: [{ name: "Prasanna Suresh Naik" }],
  openGraph: {
    title: "Prasanna Suresh Naik | Platform & DevOps Engineer",
    description:
      "Platform Engineer specializing in Kubernetes, Internal Developer Platforms, GitOps, AWS, Azure, DevSecOps, Infrastructure Automation, Platform Reliability and Developer Experience.",
    url: "https://prasannanaik.com",
    siteName: "Prasanna Suresh Naik Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prasanna Suresh Naik | Platform & DevOps Engineer",
    description:
      "Platform Engineer specializing in Kubernetes, Internal Developer Platforms, GitOps, AWS, Azure, DevSecOps, Infrastructure Automation, Platform Reliability and Developer Experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data for search engine optimization
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Prasanna Suresh Naik",
    "jobTitle": "Platform Engineer / DevOps Engineer",
    "url": "https://prasannanaik.com",
    "sameAs": [
      "https://linkedin.com/in/prasanna-naik-40124b1ba",
      "https://leetcode.com/prasannanaik"
    ],
    "knowsAbout": [
      "Kubernetes",
      "DevOps",
      "Platform Engineering",
      "GitOps",
      "Terraform",
      "Ansible",
      "AWS",
      "Azure",
      "DevSecOps",
      "Observability"
    ]
  };

  // Server-side fetch blog post metadata for command palette
  const blogPosts = getAllPosts().map(p => ({
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
  }));

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="font-sans antialiased text-foreground bg-background transition-colors duration-300 overflow-x-hidden"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Boot splash loading screen */}
          <LoadingScreen />

          {/* Custom cursor overlay */}
          <CustomCursor />

          {/* Global command palette Ctrl+K */}
          <CommandPaletteProvider blogPosts={blogPosts} />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
