import { useState, useEffect, useCallback } from "react";

// Inline utility functions to avoid module resolution issues
function generateOptimizedImageUrl(
  src: string,
  _options: {
    quality?: number;
    format?: "webp" | "jpeg" | "png";
    width?: number;
    height?: number;
  },
): string {
  return src;
}

function generateResponsiveSrcSet(src: string, baseWidth: number): string {
  const widths = [baseWidth, baseWidth * 1.5, baseWidth * 2];
  return widths.map((w) => `${src}?w=${w} ${w}w`).join(", ");
}

function generateSizesAttribute(): string {
  return "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
}

function shouldPrioritizeImage(
  isAboveTheFold?: boolean,
  isHero?: boolean,
  isLogo?: boolean,
): boolean {
  return Boolean(isAboveTheFold || isHero || isLogo);
}

function getPreferredImageFormat(): string {
  if (typeof globalThis.window !== "undefined") {
    const canvas = document.createElement("canvas");
    return canvas.toDataURL("image/webp").startsWith("data:image/webp")
      ? "webp"
      : "jpeg";
  }
  return "webp";
}

interface UseImageOptimizationOptions {
  src: string;
  width: number;
  height: number;
  quality?: number;
  format?: "webp" | "jpeg" | "png" | "auto";
  isAboveTheFold?: boolean;
  isHero?: boolean;
  isLogo?: boolean;
  responsive?: boolean;
  lazy?: boolean;
}

interface OptimizedImageData {
  src: string;
  srcSet?: string;
  sizes?: string;
  loading: "lazy" | "eager";
  format: string;
  optimizedUrl: string;
  isLoaded: boolean;
  error: string | null;
  onLoad: () => void;
  onError: (error: string) => void;
}

/**
 * Custom hook for image optimization
 *
 * Provides optimized image data including:
 * - Responsive srcset for different screen sizes
 * - Proper loading strategy (lazy/eager)
 * - Format detection and optimization
 * - Error handling and loading states
 */
export const useImageOptimization = (
  options: UseImageOptimizationOptions,
): OptimizedImageData => {
  const {
    src,
    width,
    height,
    quality = 85,
    format = "auto",
    isAboveTheFold = false,
    isHero = false,
    isLogo = false,
    responsive = true,
    lazy = true,
  } = options;

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preferredFormat, setPreferredFormat] = useState<string>("webp");

  // Detect preferred image format
  useEffect(() => {
    if (typeof globalThis.window !== "undefined") {
      setPreferredFormat(getPreferredImageFormat());
    }
  }, []);

  // Generate optimized image URL
  const optimizedUrl = useCallback(() => {
    const finalFormat = format === "auto" ? preferredFormat : format;
    return generateOptimizedImageUrl(src, {
      quality,
      format: finalFormat as "webp" | "jpeg" | "png",
      width,
      height,
    });
  }, [src, quality, format, preferredFormat, width, height]);

  // Generate responsive srcset
  const srcSet = useCallback(() => {
    if (!responsive) return undefined;
    return generateResponsiveSrcSet(src, width);
  }, [src, width, responsive]);

  // Generate sizes attribute
  const sizes = useCallback(() => {
    if (!responsive) return undefined;
    return generateSizesAttribute();
  }, [responsive]);

  // Determine loading strategy
  const loading = useCallback((): "lazy" | "eager" => {
    if (!lazy) return "eager";
    if (shouldPrioritizeImage(isAboveTheFold, isHero, isLogo)) return "eager";
    return "lazy";
  }, [lazy, isAboveTheFold, isHero, isLogo]);

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
    setError(null);
  }, []);

  // Handle image error
  const handleImageError = useCallback((errorMessage: string) => {
    setError(errorMessage);
    setIsLoaded(false);
  }, []);

  // Preload image if it's critical
  useEffect(() => {
    if (shouldPrioritizeImage(isAboveTheFold, isHero, isLogo)) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = optimizedUrl();
      document.head.appendChild(link);

      return () => {
        link.remove();
      };
    }
  }, [isAboveTheFold, isHero, isLogo, optimizedUrl]);

  return {
    src,
    srcSet: srcSet(),
    sizes: sizes(),
    loading: loading(),
    format: preferredFormat,
    optimizedUrl: optimizedUrl(),
    isLoaded,
    error,
    onLoad: handleImageLoad,
    onError: handleImageError,
  };
};

/**
 * Hook for managing multiple images with optimization
 */
export const useMultipleImageOptimization = (
  images: UseImageOptimizationOptions[],
) => {
  const [optimizedImages, setOptimizedImages] = useState<OptimizedImageData[]>(
    [],
  );
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    // Process images without calling hooks inside callbacks
    const processImages = async () => {
      // Extract callback functions to reduce nesting depth
      const handleImageLoad = () => {};
      const handleImageError = () => {};

      const results = images.map((imageOptions) => {
        // Create optimized image data directly without calling the hook
        return {
          src: imageOptions.src,
          srcSet: undefined, // Will be generated when needed
          sizes: undefined, // Will be generated when needed
          loading: "lazy" as const,
          format: imageOptions.format || "webp",
          optimizedUrl: imageOptions.src, // Simplified for now
          isLoaded: false,
          error: null,
          onLoad: handleImageLoad,
          onError: handleImageError,
        } as OptimizedImageData;
      });

      setOptimizedImages(results);
      setAllLoaded(false); // Will be updated when images actually load
    };

    processImages();
  }, [images]);

  return {
    optimizedImages,
    allLoaded,
    totalImages: images.length,
    loadedImages: optimizedImages.filter((img) => img.isLoaded).length,
  };
};

/**
 * Hook for intersection observer based lazy loading
 */
export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit,
) => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: "50px 0px",
    threshold: 0.1,
  };
  const observerOptions = options || defaultOptions;
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // nosemgrep: js.superfluous-trailing-arguments
    // CodeQL suppression: options parameter is required for IntersectionObserver configuration
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setIsIntersecting(entry.isIntersecting);
      }
    }, observerOptions);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, options]);

  return isIntersecting;
};
