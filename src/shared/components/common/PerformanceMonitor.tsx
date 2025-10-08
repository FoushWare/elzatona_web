import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  fid: number | null;
  ttfb: number | null;
  imageLoadTime: number | null;
  totalImages: number;
  loadedImages: number;
}

interface PerformanceMonitorProps {
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
  showMetrics?: boolean;
  className?: string;
}

/**
 * Performance Monitor Component
 *
 * Tracks Core Web Vitals and image performance metrics:
 * - First Contentful Paint (FCP)
 * - Largest Contentful Paint (LCP)
 * - Cumulative Layout Shift (CLS)
 * - First Input Delay (FID)
 * - Time to First Byte (TTFB)
 * - Image loading performance
 */
export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  onMetricsUpdate,
  showMetrics = false,
  className = '',
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null,
    imageLoadTime: null,
    totalImages: 0,
    loadedImages: 0,
  });

  const [isVisible] = useState(showMetrics);

  // Measure FCP (First Contentful Paint)
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      const fcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const fcpEntry = entries.find(
          entry => entry.name === 'first-contentful-paint'
        );
        if (fcpEntry) {
          setMetrics(prev => ({
            ...prev,
            fcp: fcpEntry.startTime,
          }));
        }
      });

      fcpObserver.observe({ entryTypes: ['paint'] });

      return () => fcpObserver.disconnect();
    }
  }, []);

  // Measure LCP (Largest Contentful Paint)
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          setMetrics(prev => ({
            ...prev,
            lcp: lastEntry.startTime,
          }));
        }
      });

      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      return () => lcpObserver.disconnect();
    }
  }, []);

  // Measure CLS (Cumulative Layout Shift)
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          // Check if the entry has hadRecentInput property (for CLS entries)
          const layoutShiftEntry = entry as PerformanceEntry & {
            value: number;
            hadRecentInput?: boolean;
          };
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        }
        setMetrics(prev => ({
          ...prev,
          cls: clsValue,
        }));
      });

      clsObserver.observe({ entryTypes: ['layout-shift'] });

      return () => clsObserver.disconnect();
    }
  }, []);

  // Measure FID (First Input Delay)
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      const fidObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const firstEntry = entries[0];
        if (firstEntry) {
          // For FID entries, use the correct property
          const fidEntry = firstEntry as PerformanceEntry & {
            processingStart?: number;
          };
          const fidValue = fidEntry.processingStart
            ? fidEntry.processingStart - firstEntry.startTime
            : 0;
          setMetrics(prev => ({
            ...prev,
            fid: fidValue,
          }));
        }
      });

      fidObserver.observe({ entryTypes: ['first-input'] });

      return () => fidObserver.disconnect();
    }
  }, []);

  // Measure TTFB (Time to First Byte)
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      const navigationObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const navigationEntry = entries.find(
          entry => entry.entryType === 'navigation'
        );
        if (navigationEntry) {
          const navEntry = navigationEntry as PerformanceNavigationTiming;
          setMetrics(prev => ({
            ...prev,
            ttfb: navEntry.responseStart - navEntry.requestStart,
          }));
        }
      });

      navigationObserver.observe({ entryTypes: ['navigation'] });

      return () => navigationObserver.disconnect();
    }
  }, []);

  // Monitor image loading performance
  useEffect(() => {
    const images = document.querySelectorAll('img');
    let loadedCount = 0;
    const startTime = performance.now();

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        const totalTime = performance.now() - startTime;
        setMetrics(prev => ({
          ...prev,
          imageLoadTime: totalTime,
          totalImages: images.length,
          loadedImages: loadedCount,
        }));
      }
    };

    const handleImageError = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        const totalTime = performance.now() - startTime;
        setMetrics(prev => ({
          ...prev,
          imageLoadTime: totalTime,
          totalImages: images.length,
          loadedImages: loadedCount,
        }));
      }
    };

    images.forEach(img => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener('load', handleImageLoad);
        img.addEventListener('error', handleImageError);
      }
    });

    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageError);
      });
    };
  }, []);

  // Notify parent component of metrics updates
  useEffect(() => {
    if (onMetricsUpdate) {
      onMetricsUpdate(metrics);
    }
  }, [metrics, onMetricsUpdate]);

  // Get performance grade based on metrics
  const getPerformanceGrade = (): string => {
    let score = 0;

    if (metrics.fcp && metrics.fcp < 1800) score += 25;
    if (metrics.lcp && metrics.lcp < 2500) score += 25;
    if (metrics.cls && metrics.cls < 0.1) score += 25;
    if (metrics.fid && metrics.fid < 100) score += 25;

    if (score >= 90) return 'A';
    if (score >= 75) return 'B';
    if (score >= 60) return 'C';
    if (score >= 45) return 'D';
    return 'F';
  };

  // Get color based on performance grade
  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case 'A':
        return 'text-green-600';
      case 'B':
        return 'text-blue-600';
      case 'C':
        return 'text-yellow-600';
      case 'D':
        return 'text-orange-600';
      case 'F':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          🚀 Performance Metrics
        </h3>
        <div
          className={`text-2xl font-bold ${getGradeColor(getPerformanceGrade())}`}
        >
          {getPerformanceGrade()}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              FCP:
            </span>
            <span className="text-sm font-mono">
              {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              LCP:
            </span>
            <span className="text-sm font-mono">
              {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              CLS:
            </span>
            <span className="text-sm font-mono">
              {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              FID:
            </span>
            <span className="text-sm font-mono">
              {metrics.fid ? `${Math.round(metrics.fid)}ms` : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              TTFB:
            </span>
            <span className="text-sm font-mono">
              {metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Images:
            </span>
            <span className="text-sm font-mono">
              {metrics.loadedImages}/{metrics.totalImages}
            </span>
          </div>
        </div>
      </div>

      {metrics.imageLoadTime && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Image Load Time:
            </span>
            <span className="text-sm font-mono">
              {Math.round(metrics.imageLoadTime)}ms
            </span>
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>FCP: First Contentful Paint</p>
        <p>LCP: Largest Contentful Paint</p>
        <p>CLS: Cumulative Layout Shift</p>
        <p>FID: First Input Delay</p>
        <p>TTFB: Time to First Byte</p>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
