"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });

      // Check if hovering something clickable
      const target = e.target as HTMLElement;
      const clickable = target.closest("a, button, [role='button'], select, input, textarea, label");
      setIsPointer(!!clickable);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth trailing dot animation via rAF
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      setTrail(prev => ({
        x: lerp(prev.x, targetRef.current.x, 0.12),
        y: lerp(prev.y, targetRef.current.y, 0.12),
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring — trails behind cursor */}
      <div
        className="pointer-events-none fixed z-[9999] rounded-full border transition-all duration-150"
        style={{
          width: isPointer ? 36 : 28,
          height: isPointer ? 36 : 28,
          borderColor: isPointer ? "rgba(6,182,212,0.6)" : "rgba(6,182,212,0.3)",
          borderWidth: 1.5,
          left: trail.x - (isPointer ? 18 : 14),
          top: trail.y - (isPointer ? 18 : 14),
          transform: `scale(${isClicking ? 0.85 : 1})`,
          mixBlendMode: "normal",
          backgroundColor: isPointer ? "rgba(6,182,212,0.05)" : "transparent",
        }}
      />

      {/* Inner dot — snaps exactly to cursor */}
      <div
        className="pointer-events-none fixed z-[9999] rounded-full bg-brand-cyan transition-transform duration-75"
        style={{
          width: isClicking ? 6 : 4,
          height: isClicking ? 6 : 4,
          left: pos.x - (isClicking ? 3 : 2),
          top: pos.y - (isClicking ? 3 : 2),
          opacity: 0.9,
          transform: `scale(${isClicking ? 1.5 : 1})`,
        }}
      />
    </>
  );
}
