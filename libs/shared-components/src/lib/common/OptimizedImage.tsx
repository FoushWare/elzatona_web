import React from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  loading?: 'lazy' | 'eager';
}

/**
 * OptimizedImage Component
 *
 * Implements comprehensive image optimization for better performance and FCP:
 * - Automatic WebP conversion with fallbacks
 * - Responsive images with srcset
 * - Lazy loading for below-the-fold images
 * - Priority loading for above-the-fold images
 * - Blur placeholders for better perceived performance
 * - Proper dimensions to prevent CLS
 * - CDN optimization via Vercel/Next.js
 *
 * @version 1.1 - Enhanced with Next.js Image integration and better type safety
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  placeholder = 'blur',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  style,
  onClick,
  loading = 'lazy',
}) => {
  // Determine if this image should have priority loading
  // Priority is typically for above-the-fold images (hero, logo, etc.)
  const shouldPrioritize = priority || loading === 'eager';

  // Handle external images (like CDN images)
  const isExternalImage = src.startsWith('http');

  if (isExternalImage) {
    // For external images, use Next.js Image component with optimization
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        priority={shouldPrioritize}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        onLoad={() => {
          // Add fade-in effect for better UX
          const target = document.querySelector(
            `img[src="${src}"]`
          ) as HTMLImageElement;
          if (target) {
            target.style.opacity = '0';
            target.style.transition = 'opacity 0.3s ease-in-out';
            setTimeout(() => {
              target.style.opacity = '1';
            }, 50);
          }
        }}
      />
    );
  }

  // For local images, use Next.js Image component with full optimization
  return (
    <div
      className={`relative ${className}`}
      style={{
        width: fill ? '100%' : width,
        height: fill ? '100%' : height,
        ...style,
      }}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={shouldPrioritize}
        quality={quality}
        placeholder={placeholder}
        sizes={sizes}
        className='object-cover'
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        // Enable blur placeholder for better perceived performance
        blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
      />
    </div>
  );
};

export default OptimizedImage;
