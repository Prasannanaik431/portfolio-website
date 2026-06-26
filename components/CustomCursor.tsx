"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [trail, setTrail] = useState({ x: -200, y: -200 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    // Only show on pointer devices (not touch-only)
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const clickable = target.closest("a, button, [role='button'], select, input, textarea, label");
      setIsPointer(!!clickable);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    // Smooth ring lerp via rAF
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      setTrail(prev => ({
        x: lerp(prev.x, targetRef.current.x, 0.1),
        y: lerp(prev.y, targetRef.current.y, 0.1),
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!mounted) return null;

  const ringSize = isPointer ? 40 : isClicking ? 24 : 30;
  const dotSize = isClicking ? 5 : 3;

  return (
    <>
      {/* Outer ring — smooth trail */}
      <div
        className="pointer-events-none fixed z-[99999]"
        style={{
          width: ringSize,
          height: ringSize,
          left: trail.x - ringSize / 2,
          top: trail.y - ringSize / 2,
          borderRadius: "50%",
          border: `1px solid ${isPointer ? "rgba(6,182,212,0.7)" : "rgba(6,182,212,0.35)"}`,
          backgroundColor: isPointer ? "rgba(6,182,212,0.06)" : "transparent",
          boxShadow: isPointer ? "0 0 14px rgba(6,182,212,0.25)" : "none",
          transition: "width 200ms ease, height 200ms ease, border-color 200ms ease, box-shadow 200ms ease",
          willChange: "transform",
        }}
      />

      {/* Inner dot — exact position */}
      <div
        className="pointer-events-none fixed z-[99999]"
        style={{
          width: dotSize,
          height: dotSize,
          left: pos.x - dotSize / 2,
          top: pos.y - dotSize / 2,
          borderRadius: "50%",
          backgroundColor: "rgb(6,182,212)",
          opacity: 0.95,
          transition: "width 100ms ease, height 100ms ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
