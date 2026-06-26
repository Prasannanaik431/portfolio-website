import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import CommandPaletteProvider from "@/components/CommandPaletteProvider";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import { getAllPosts } from "@/lib/blog";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prasanna Suresh Naik | Platform · DevOps · Cloud · SRE Engineer",
  description:
    "Platform, DevOps, Cloud & SRE Engineer — 2 year in production, 35+ K8s environments, 95% faster deployments, 100+ CI/CD pipelines, 99% config automation, 99.999% uptime SLO.",
  keywords: [
    "Prasanna Suresh Naik",
    "Platform Engineer",
    "DevOps Engineer",
    "Cloud Engineer",
    "Site Reliability Engineer",
    "SRE",
    "Kubernetes",
    "GitOps",
    "Flux2",
    "Terraform",
    "Infrastructure as Code",
    "Internal Developer Platforms",
    "IDP",
    "AWS EKS",
    "Azure AKS",
    "DevSecOps",
    "Kyverno",
    "Helm",
    "Jenkins",
    "FinOps",
    "Observability",
    "Prometheus",
    "Grafana",
  ],
  authors: [{ name: "Prasanna Suresh Naik" }],
  openGraph: {
    title: "Prasanna Suresh Naik | Platform · DevOps · Cloud · SRE Engineer",
    description:
      "Platform, DevOps, Cloud & SRE Engineer — Kubernetes, Internal Developer Platforms, GitOps, AWS, Azure, DevSecOps, SLO Reliability, and Infrastructure Automation.",
    url: "https://prasannanaik.com",
    siteName: "Prasanna Suresh Naik Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prasanna Suresh Naik | Platform · DevOps · Cloud · SRE Engineer",
    description:
      "Platform, DevOps, Cloud & SRE Engineer — Kubernetes, IDP, GitOps, AWS, Azure, DevSecOps, FinOps.",
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
    "jobTitle": "Platform Engineer · DevOps Engineer · Cloud Engineer · SRE",
    "url": "https://prasannanaik.com",
    "sameAs": [
      "https://linkedin.com/in/prasanna-naik-40124b1ba",
      "https://github.com/Prasannanaik431",
      "https://leetcode.com/u/prasannanaik431"
    ],
    "knowsAbout": [
      "Platform Engineering",
      "DevOps Engineering",
      "Cloud Engineering",
      "Site Reliability Engineering",
      "Kubernetes",
      "GitOps",
      "Flux2",
      "ArgoCD",
      "Terraform",
      "Ansible",
      "AWS",
      "Azure",
      "DevSecOps",
      "Kyverno",
      "Helm",
      "Jenkins",
      "Internal Developer Platforms",
      "FinOps",
      "Observability",
      "Prometheus",
      "Grafana",
      "Elasticsearch"
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
