import React from 'react';

type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackClassName?: string;
};

export function ImageWithFallback({ src, alt, className, fallbackClassName, ...props }: ImageWithFallbackProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      {...props}
    />
  );
}
