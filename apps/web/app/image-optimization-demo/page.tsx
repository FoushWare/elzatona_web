'use client';

import React, { useState } from 'react';
import OptimizedImage from '@/components/OptimizedImage';
import PerformanceMonitor from '@/components/PerformanceMonitor';

/**
 * Image Optimization Demo Page
 *
 * Showcases all the image optimization features implemented for Issue #9:
 * - Responsive images with srcset
 * - WebP format with fallbacks
 * - Lazy loading for below-the-fold images
 * - Priority loading for above-the-fold images
 * - Blur placeholders for better perceived performance
 * - Performance monitoring and Core Web Vitals
 */
export default function ImageOptimizationDemoPage() {
  const [showPerformanceMetrics, setShowPerformanceMetrics] = useState(false);

  // Demo images with different optimization strategies
  const demoImages = [
    {
      src: '/next.svg',
      alt: 'Next.js Logo (Priority - Above the fold)',
      width: 200,
      height: 200,
      priority: true,
      isAboveTheFold: true,
      description: 'Priority loading for above-the-fold content',
    },
    {
      src: '/vercel.svg',
      alt: 'Vercel Logo (Lazy - Below the fold)',
      width: 150,
      height: 150,
      priority: false,
      isAboveTheFold: false,
      description: 'Lazy loading for below-the-fold content',
    },
    {
      src: '/globe.svg',
      alt: 'Globe Icon (Responsive)',
      width: 100,
      height: 100,
      priority: false,
      isAboveTheFold: false,
      description: 'Responsive image with srcset',
    },
    {
      src: '/file.svg',
      alt: 'File Icon (High Quality)',
      width: 120,
      height: 120,
      priority: false,
      isAboveTheFold: false,
      description: 'High quality with blur placeholder',
    },
    {
      src: '/window.svg',
      alt: 'Window Icon (Optimized)',
      width: 80,
      height: 80,
      priority: false,
      isAboveTheFold: false,
      description: 'Optimized with WebP conversion',
    },
  ];

  // External demo images
  const externalImages = [
    {
      src: 'https://img.icons8.com/color/344/javascript.png',
      alt: 'JavaScript Icon (External CDN)',
      width: 64,
      height: 64,
      description: 'External image with optimization attributes',
    },
    {
      src: 'https://i.imgur.com/ko5k0fs.png',
      alt: 'Demo Image (External)',
      width: 200,
      height: 150,
      description: 'External image with responsive srcset',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                🚀 Image Optimization Demo
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Showcasing performance improvements for Issue #9
              </p>
            </div>
            <button
              onClick={() => setShowPerformanceMetrics(!showPerformanceMetrics)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {showPerformanceMetrics ? 'Hide' : 'Show'} Performance Metrics
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Performance Metrics */}
        {showPerformanceMetrics && (
          <div className="mb-8">
            <PerformanceMonitor showMetrics={true} />
          </div>
        )}

        {/* Feature Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-blue-200 dark:border-blue-700 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            ✨ Image Optimization Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Responsive Images
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Automatic srcset generation for different screen sizes and
                densities
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                WebP Format
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Modern image formats with automatic fallbacks for better
                compression
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Lazy Loading
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Intelligent loading strategies based on viewport position
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border-2 border-yellow-200 dark:border-yellow-800">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Priority Loading
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Critical images loaded with priority for better FCP and LCP
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-red-200 dark:border-red-800">
              <div className="text-3xl mb-3">🖼️</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Blur Placeholders
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Smooth loading experience with blur placeholders
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-6 border-2 border-indigo-200 dark:border-indigo-800">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Performance Monitoring
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Real-time Core Web Vitals and image performance tracking
              </p>
            </div>
          </div>
        </div>

        {/* Local Images Demo */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-green-200 dark:border-green-700 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🏠 Local Images (Next.js Optimized)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoImages.map((image, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <OptimizedImage
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    priority={image.priority}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {image.alt}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {image.description}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <p>
                    Dimensions: {image.width} × {image.height}
                  </p>
                  <p>Priority: {image.priority ? 'Yes' : 'No'}</p>
                  <p>Above the fold: {image.isAboveTheFold ? 'Yes' : 'No'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* External Images Demo */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-orange-200 dark:border-orange-700 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🌐 External Images (CDN Optimized)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {externalImages.map((image, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border-2 border-orange-200 dark:border-orange-800"
              >
                <div className="flex justify-center mb-4">
                  <OptimizedImage
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {image.alt}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {image.description}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <p>
                    Dimensions: {image.width} × {image.height}
                  </p>
                  <p>Source: External CDN</p>
                  <p>Optimization: Responsive srcset + lazy loading</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-purple-200 dark:border-purple-700 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🔧 Technical Implementation Details
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                Next.js Configuration
              </h3>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-800 dark:text-gray-200">
                  {`// next.config.js
images: {
  unoptimized: false,
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                OptimizedImage Component
              </h3>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-800 dark:text-gray-200">
                  {`<OptimizedImage
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  priority={true}
  quality={85}
  placeholder="blur"
  sizes="(max-width: 768px) 100vw, 50vw"
/>`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                Performance Benefits
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Automatic WebP conversion reduces file sizes by 25-35%</li>
                <li>
                  Responsive images prevent unnecessary downloads on mobile
                  devices
                </li>
                <li>Lazy loading improves initial page load time</li>
                <li>Priority loading ensures critical images load first</li>
                <li>Blur placeholders improve perceived performance</li>
                <li>Proper dimensions prevent Cumulative Layout Shift (CLS)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              🎯 Ready to Optimize Your Images?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Implement these optimization techniques to improve your Core Web
              Vitals and provide a better user experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                📖 View Documentation
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                🚀 Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
