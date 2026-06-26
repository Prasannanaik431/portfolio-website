import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnimatedBackground from "@/components/AnimatedBackground";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";

export default function Home() {
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

        {/* Placeholder sections for next phases */}
        <section id="blog" className="min-h-screen w-full flex items-center justify-center border-t border-white/5 bg-black/5">
          <div className="text-center font-mono text-xs text-muted-foreground animate-pulse">
            [ Blog Section: Loading... Phase 3 ]
          </div>
        </section>

        <section id="contact" className="min-h-screen w-full flex items-center justify-center border-t border-white/5 bg-black/10">
          <div className="text-center font-mono text-xs text-muted-foreground animate-pulse">
            [ Contact Section: Loading... Phase 3 ]
          </div>
        </section>
      </main>
    </div>
  );
}
