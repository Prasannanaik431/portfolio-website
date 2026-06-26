import React from "react";
import Image from "next/image";

interface BlogFigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export default function BlogFigure({
  src,
  alt,
  caption,
  width = 960,
  height = 540,
}: BlogFigureProps) {
  return (
    <figure className="my-8 rounded-lg border border-white/10 bg-black/20 overflow-hidden">
      <div className="relative w-full aspect-video bg-black/40">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-contain p-4"
          unoptimized={src.endsWith(".svg")}
        />
      </div>
      {caption && (
        <figcaption className="px-4 py-3 text-xs text-muted-foreground border-t border-white/5 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
