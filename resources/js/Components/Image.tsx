import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
}

export default function Image({ src, alt, fill, priority, className, ...props }: ImageProps) {
  if (!src) return null;

  const fillClasses = fill
    ? `absolute inset-0 w-full h-full ${className?.includes("object-") ? "" : "object-cover"}`
    : "";

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      className={`${fillClasses} ${className || ""}`}
      {...props}
    />
  );
}
