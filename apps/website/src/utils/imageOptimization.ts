/**
 * Image Optimization Utilities
 *
 * Provides helper functions for optimizing images across the application
 * to improve performance, Core Web Vitals, and user experience.
 */

export interface ImageOptimizationConfig {
  quality: number;
  format: 'webp' | 'jpeg' | 'png' | 'auto';
  width: number;
  height: number;
  fit: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  placeholder: 'blur' | 'empty';
}

/**
 * Generate optimized image URL with query parameters
 * @param src - Original image source
 * @param config - Optimization configuration
 * @returns Optimized image URL
 */
export const generateOptimizedImageUrl = (
  src: string,
  config: Partial<ImageOptimizationConfig> = {}
): string => {
  const params = new URLSearchParams();

  if (config.quality) params.append('q', config.quality.toString());
  if (config.format) params.append('f', config.format);
  if (config.width) params.append('w', config.width.toString());
  if (config.height) params.append('h', config.height.toString());
  if (config.fit) params.append('fit', config.fit);

  return params.toString() ? `${src}?${params.toString()}` : src;
};

/**
 * Generate responsive srcset for different screen sizes
 * @param src - Image source
 * @param baseWidth - Base image width
 * @param breakpoints - Array of width multipliers
 * @returns Responsive srcset string
 */
export const generateResponsiveSrcSet = (
  src: string,
  baseWidth: number,
  breakpoints: number[] = [0.5, 1, 1.5, 2, 3]
): string => {
  return breakpoints
    .map(multiplier => {
      const size = Math.round(baseWidth * multiplier);
      const optimizedUrl = generateOptimizedImageUrl(src, { width: size });
      return `${optimizedUrl} ${size}w`;
    })
    .join(', ');
};

/**
 * Generate sizes attribute for responsive images
 * @param breakpoints - Array of breakpoint objects
 * @returns Sizes attribute string
 */
export const generateSizesAttribute = (
  breakpoints: Array<{ maxWidth: number; size: string }> = [
    { maxWidth: 640, size: '100vw' },
    { maxWidth: 1024, size: '50vw' },
    { maxWidth: 1280, size: '33vw' },
  ]
): string => {
  return breakpoints
    .map(({ maxWidth, size }) => `(max-width: ${maxWidth}px) ${size}`)
    .join(', ');
};

/**
 * Check if image should be loaded with priority
 * @param isAboveTheFold - Whether image is above the fold
 * @param isHero - Whether image is a hero image
 * @param isLogo - Whether image is a logo
 * @returns Boolean indicating if priority loading should be used
 */
export const shouldPrioritizeImage = (
  isAboveTheFold: boolean = false,
  isHero: boolean = false,
  isLogo: boolean = false
): boolean => {
  return isAboveTheFold || isHero || isLogo;
};

/**
 * Generate blur placeholder data URL for better perceived performance
 * @returns Base64 encoded blur placeholder
 */
export const generateBlurPlaceholder = (): string => {
  return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';
};

/**
 * Calculate optimal image dimensions based on container and aspect ratio
 * @param containerWidth - Container width
 * @param containerHeight - Container height
 * @param aspectRatio - Image aspect ratio (width/height)
 * @returns Optimal width and height
 */
export const calculateOptimalDimensions = (
  containerWidth: number,
  containerHeight: number,
  aspectRatio: number
): { width: number; height: number } => {
  let width = containerWidth;
  let height = containerWidth / aspectRatio;

  if (height > containerHeight) {
    height = containerHeight;
    width = containerHeight * aspectRatio;
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
  };
};

/**
 * Preload critical images for better performance
 * @param imageUrls - Array of image URLs to preload
 */
export const preloadImages = (imageUrls: string[]): void => {
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Lazy load images using Intersection Observer
 * @param imageElements - Array of image elements to observe
 * @param options - Intersection Observer options
 */
export const lazyLoadImages = (
  imageElements: HTMLImageElement[],
  options: IntersectionObserverInit = {
    rootMargin: '50px 0px',
    threshold: 0.1,
  }
): void => {
  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers without Intersection Observer
    imageElements.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
      }
    });
    return;
  }

  const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      }
    });
  }, options);

  imageElements.forEach(img => imageObserver.observe(img));
};

/**
 * Get image format based on browser support
 * @returns Preferred image format
 */
export const getPreferredImageFormat = (): 'webp' | 'jpeg' => {
  // Check if WebP is supported
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
    ? 'webp'
    : 'jpeg';
};

/**
 * Optimize image loading strategy based on viewport position
 * @param element - DOM element to check
 * @returns Loading strategy ('eager' | 'lazy')
 */
export const getLoadingStrategy = (element: Element): 'eager' | 'lazy' => {
  const rect = element.getBoundingClientRect();
  const isAboveTheFold = rect.top < window.innerHeight;

  return isAboveTheFold ? 'eager' : 'lazy';
};
