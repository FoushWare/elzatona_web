'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  Shield,
  Palette,
  Globe,
  Smartphone,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';

interface CheatSheetSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  items: CheatSheetItem[];
}

interface CheatSheetItem {
  title: string;
  content: string;
  type: 'tip' | 'warning' | 'info' | 'checklist';
  priority: 'high' | 'medium' | 'low';
}

const cheatSheetData: CheatSheetSection[] = [
  {
    id: 'performance',
    title: 'Performance Optimization & Monitoring',
    icon: <Zap className="w-8 h-8" />,
    description:
      'Comprehensive performance optimization strategies and monitoring',
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor:
      'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    items: [
      {
        title: 'Performance Audit Workflow',
        content:
          'Lighthouse → Core Web Vitals → Identify bottlenecks → Implement fixes → Re-audit. Use Chrome DevTools Performance tab for detailed analysis.',
        type: 'checklist',
        priority: 'high',
      },
      {
        title: 'Critical Rendering Path',
        content:
          'DOM + CSSOM → Render Tree → Layout → Paint. Minimize blocking resources, inline critical CSS, defer non-critical JavaScript.',
        type: 'info',
        priority: 'high',
      },
      {
        title: 'Core Web Vitals Monitoring',
        content:
          'FCP (First Contentful Paint) < 1.8s, LCP (Largest Contentful Paint) < 2.5s, TBT (Total Blocking Time) < 200ms, CLS (Cumulative Layout Shift) < 0.1.',
        type: 'checklist',
        priority: 'high',
      },
      {
        title: 'Bundle Size Optimization',
        content:
          'Code splitting, tree shaking, dynamic imports, analyze bundle with webpack-bundle-analyzer, remove unused dependencies, compress with gzip/brotli.',
        type: 'tip',
        priority: 'high',
      },
      {
        title: 'Critical CSS Strategy',
        content:
          'Inline critical CSS for above-the-fold content, extract and inline critical styles, use tools like Critical or CriticalCSS, preload non-critical CSS.',
        type: 'tip',
        priority: 'high',
      },
      {
        title: 'Image Optimization Pipeline',
        content:
          'WebP/AVIF format, responsive images with srcset and sizes attributes, picture element for art direction, lazy loading with Intersection Observer, proper sizing (300w, 600w, 900w), compression optimization, CDN delivery with automatic format conversion.',
        type: 'checklist',
        priority: 'high',
      },
      {
        title: 'Loading Strategy Flow',
        content:
          'Critical resources first → Lazy load below-fold → Preload important resources → Prefetch likely resources → Background loading for others.',
        type: 'info',
        priority: 'medium',
      },
      {
        title: 'Caching Strategy',
        content:
          'Service Worker for offline, HTTP caching headers, CDN caching, browser caching, versioned assets, cache-first for static resources.',
        type: 'tip',
        priority: 'medium',
      },
      {
        title: 'JavaScript Performance',
        content:
          'Debounce/throttle events, use Web Workers for heavy tasks, optimize loops and algorithms, avoid memory leaks, use requestAnimationFrame for animations.',
        type: 'tip',
        priority: 'medium',
      },
      {
        title: 'Network Optimization',
        content:
          'HTTP/2 or HTTP/3, request compression, minimize round trips, use CDN, implement resource hints (preload, prefetch, dns-prefetch).',
        type: 'info',
        priority: 'medium',
      },
    ],
  },
  {
    id: 'security',
    title: 'Frontend Security Best Practices',
    icon: <Shield className="w-8 h-8" />,
    description: 'Comprehensive security measures for frontend applications',
    color: 'text-red-600 dark:text-red-400',
    bgColor:
      'bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20',
    borderColor: 'border-red-200 dark:border-red-800',
    items: [
      {
        title: 'Content Security Policy (CSP)',
        content:
          "Implement CSP headers to prevent inline script execution. Example: Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://trusted-cdn.com; style-src 'self' 'unsafe-inline';",
        type: 'warning',
        priority: 'high',
      },
      {
        title: 'Cross-Site Scripting (XSS) Prevention',
        content:
          'Escape user input, sanitize HTML, avoid dangerouslySetInnerHTML, use DOMPurify library for sanitization, implement input validation.',
        type: 'warning',
        priority: 'high',
      },
      {
        title: 'Cross-Site Request Forgery (CSRF) Protection',
        content:
          'Use CSRF tokens for sensitive requests, implement SameSite cookie attributes, validate request origins, use double-submit cookie pattern.',
        type: 'tip',
        priority: 'high',
      },
      {
        title: 'Secure Data Storage',
        content:
          'Avoid storing sensitive data in localStorage/sessionStorage; prefer httpOnly cookies for authentication tokens, use secure and SameSite flags.',
        type: 'warning',
        priority: 'high',
      },
      {
        title: 'HTTPS Everywhere',
        content:
          'Ensure all API and asset requests are served over HTTPS, implement HSTS headers, redirect HTTP to HTTPS, secure cookie flags.',
        type: 'checklist',
        priority: 'high',
      },
      {
        title: 'Dependency Security',
        content:
          'Regularly audit npm packages (npm audit, snyk), keep dependencies updated, use package-lock.json, monitor for known vulnerabilities.',
        type: 'info',
        priority: 'medium',
      },
      {
        title: 'Authentication & Authorization',
        content:
          "Don't rely solely on client-side checks, implement proper JWT validation, use secure token storage, implement proper logout mechanisms.",
        type: 'tip',
        priority: 'high',
      },
      {
        title: 'Error Handling Security',
        content:
          'Avoid exposing stack traces or sensitive info in errors, implement generic error messages, log errors securely, sanitize error responses.',
        type: 'warning',
        priority: 'medium',
      },
      {
        title: 'Input Validation & Sanitization',
        content:
          'Validate all user inputs on both client and server side, use whitelist approach, implement proper encoding, avoid eval() and Function().',
        type: 'tip',
        priority: 'high',
      },
      {
        title: 'Secure Headers',
        content:
          'Implement security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-XSS-Protection.',
        type: 'checklist',
        priority: 'medium',
      },
    ],
  },
  {
    id: 'accessibility',
    title: 'Accessibility (ARIA)',
    icon: <Globe className="w-8 h-8" />,
    description: 'Web accessibility guidelines and ARIA implementation',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor:
      'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    items: [
      {
        title: 'Semantic HTML',
        content:
          'Use proper HTML elements (nav, main, section, article) instead of generic divs.',
        type: 'tip',
        priority: 'high',
      },
      {
        title: 'ARIA Labels',
        content:
          'Provide descriptive labels for interactive elements using aria-label or aria-labelledby.',
        type: 'tip',
        priority: 'medium',
      },
      {
        title: 'Keyboard Navigation',
        content:
          'Ensure all interactive elements are keyboard accessible with proper focus management.',
        type: 'checklist',
        priority: 'high',
      },
    ],
  },
  {
    id: 'responsive',
    title: 'Responsive Design',
    icon: <Smartphone className="w-8 h-8" />,
    description: 'Mobile-first responsive design principles',
    color: 'text-green-600 dark:text-green-400',
    bgColor:
      'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20',
    borderColor: 'border-green-200 dark:border-green-800',
    items: [
      {
        title: 'Mobile-First Approach',
        content:
          'Start with mobile design and progressively enhance for larger screens.',
        type: 'tip',
        priority: 'high',
      },
      {
        title: 'Flexible Images',
        content: 'Use max-width: 100% and height: auto for responsive images.',
        type: 'tip',
        priority: 'medium',
      },
      {
        title: 'Breakpoint Strategy',
        content: 'Use logical breakpoints based on content, not device sizes.',
        type: 'info',
        priority: 'medium',
      },
    ],
  },
  {
    id: 'css',
    title: 'CSS Best Practices',
    icon: <Palette className="w-8 h-8" />,
    description: 'Modern CSS techniques and optimization',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor:
      'bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    items: [
      {
        title: 'CSS Custom Properties',
        content:
          'Use CSS variables for consistent theming and easier maintenance.',
        type: 'tip',
        priority: 'medium',
      },
      {
        title: 'CSS Grid & Flexbox',
        content:
          'Master modern layout techniques for complex, responsive layouts.',
        type: 'tip',
        priority: 'high',
      },
      {
        title: 'CSS-in-JS Considerations',
        content:
          'Be aware of bundle size impact and runtime performance implications.',
        type: 'warning',
        priority: 'medium',
      },
    ],
  },
  {
    id: 'testing',
    title: 'Testing Strategies',
    icon: <CheckCircle className="w-8 h-8" />,
    description: 'Frontend testing approaches and tools',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor:
      'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    items: [
      {
        title: 'Unit Testing',
        content: 'Test individual components and functions in isolation.',
        type: 'tip',
        priority: 'high',
      },
      {
        title: 'Integration Testing',
        content: 'Test component interactions and API integrations.',
        type: 'tip',
        priority: 'medium',
      },
      {
        title: 'E2E Testing',
        content: 'Test complete user workflows and critical paths.',
        type: 'info',
        priority: 'medium',
      },
    ],
  },
  {
    id: 'frontend-checklist',
    title: 'Frontend Task Checklist',
    icon: <CheckCircle className="w-8 h-8" />,
    description:
      'Comprehensive checklist for frontend feature development and review',
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor:
      'bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    items: [
      {
        title: 'Accessibility (ARIA & Navigation)',
        content:
          'ARIA roles and labels, keyboard navigation support, focus management, screen reader compatibility, semantic HTML structure.',
        type: 'checklist',
        priority: 'high',
      },
      {
        title: 'Responsive Design Testing',
        content:
          'Test at breakpoints: 375px (mobile), 425px (large mobile), 768px (tablet), 1024px (desktop), 1440px (large desktop), 1700px (ultra-wide).',
        type: 'checklist',
        priority: 'high',
      },
      {
        title: 'RTL & Internationalization',
        content:
          'Right-to-left language support, i18n text extraction, locale-specific formatting, cultural considerations, translation keys.',
        type: 'checklist',
        priority: 'medium',
      },
      {
        title: 'Performance Optimization',
        content:
          'Lazy loading implementation, code splitting, bundle size analysis, Core Web Vitals compliance, image optimization.',
        type: 'checklist',
        priority: 'high',
      },
      {
        title: 'Security Implementation',
        content:
          'XSS prevention measures, CSP headers, input validation, secure data handling, HTTPS enforcement.',
        type: 'checklist',
        priority: 'high',
      },
      {
        title: 'SEO & Meta Tags',
        content:
          'Meta tags (title, description), structured data (JSON-LD), OpenGraph tags, semantic HTML, alt text for images.',
        type: 'checklist',
        priority: 'medium',
      },
      {
        title: 'Cross-Browser Compatibility',
        content:
          'Test in Chrome, Firefox, Safari, Edge. Check for polyfills, vendor prefixes, fallback styles.',
        type: 'checklist',
        priority: 'medium',
      },
      {
        title: 'Error Handling & Validation',
        content:
          'Form validation, error boundaries, user-friendly error messages, graceful degradation, loading states.',
        type: 'checklist',
        priority: 'medium',
      },
      {
        title: 'Code Quality & Standards',
        content:
          'ESLint compliance, TypeScript types, consistent naming conventions, code documentation, component reusability.',
        type: 'checklist',
        priority: 'medium',
      },
      {
        title: 'Testing Coverage',
        content:
          'Unit tests for components, integration tests for workflows, accessibility testing, performance testing, cross-device testing.',
        type: 'checklist',
        priority: 'medium',
      },
    ],
  },
  {
    id: 'responsive-images',
    title: 'Responsive Images & srcset Implementation',
    icon: <Smartphone className="w-8 h-8" />,
    description:
      'Complete guide to implementing responsive images with srcset, picture elements, and performance optimization',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor:
      'bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    items: [
      {
        title: 'Basic srcset Implementation',
        content:
          'Use width descriptors (300w, 600w, 900w) with sizes attribute. Always include fallback src. Example: <img srcset="small.jpg 300w, medium.jpg 600w, large.jpg 900w" sizes="(max-width: 600px) 300px, (max-width: 900px) 600px, 900px" src="fallback.jpg" alt="Responsive image" />',
        type: 'checklist',
        priority: 'high',
      },
      {
        title: 'Picture Element for Art Direction',
        content:
          'Use picture element with media queries for different image crops. Combine with srcset for optimal performance. Perfect for hero images that need different compositions on mobile vs desktop.',
        type: 'tip',
        priority: 'high',
      },
      {
        title: 'Multiple Image Formats',
        content:
          'Provide WebP/AVIF with JPEG fallback. Use type attribute in source elements. Modern browsers will choose the best format, older browsers fall back to JPEG.',
        type: 'info',
        priority: 'medium',
      },
      {
        title: 'Sizes Attribute Strategy',
        content:
          'Match sizes attribute to actual CSS layout. Use viewport units (vw) and media queries. Consider CSS Grid/Flexbox behavior when calculating sizes.',
        type: 'tip',
        priority: 'high',
      },
      {
        title: 'Performance Monitoring',
        content:
          'Use Network tab in DevTools to verify correct image loading. Monitor Core Web Vitals (LCP, CLS). Test with different screen sizes and network conditions.',
        type: 'checklist',
        priority: 'medium',
      },
      {
        title: 'Common Mistakes to Avoid',
        content:
          'Missing fallback src, incorrect sizes attribute, wrong image dimensions, not testing on multiple devices, forgetting to optimize images before creating srcset.',
        type: 'warning',
        priority: 'high',
      },
      {
        title: 'Advanced Techniques',
        content:
          'Lazy loading with Intersection Observer, preloading critical images, service worker caching, progressive image loading, CDN with automatic format conversion.',
        type: 'info',
        priority: 'medium',
      },
    ],
  },
];

export default function CheatSheetPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showStatistics, setShowStatistics] = useState(false);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tip':
        return <Lightbulb className="w-4 h-4 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
      case 'checklist':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const totalSections = cheatSheetData.length;
  const totalItems = cheatSheetData.reduce(
    (sum, section) => sum + section.items.length,
    0
  );
  const highPriorityItems = cheatSheetData.reduce(
    (sum, section) =>
      sum + section.items.filter(item => item.priority === 'high').length,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Frontend Development Cheat Sheet
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Essential knowledge, best practices, and quick references for
              frontend developers
            </p>

            {/* Mobile Toggle Button */}
            <div className="flex justify-center mt-6 md:hidden">
              <button
                onClick={() => setShowStatistics(!showStatistics)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
                <span className="ml-2">📊</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Section */}
        <div
          className={`${showStatistics ? 'block' : 'hidden md:grid'} grid-cols-1 md:grid-cols-4 gap-6 mb-8`}
        >
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {totalSections}
            </div>
            <div className="text-card-foreground font-medium">
              Knowledge Areas
            </div>
          </div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {totalItems}
            </div>
            <div className="text-card-foreground font-medium">Total Tips</div>
          </div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {highPriorityItems}
            </div>
            <div className="text-card-foreground font-medium">
              High Priority
            </div>
          </div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">🚀</div>
            <div className="text-card-foreground font-medium">
              Always Updated
            </div>
          </div>
        </div>

        {/* Cheat Sheet Sections */}
        <div className="space-y-6">
          {cheatSheetData.map(section => (
            <div
              key={section.id}
              className={`${section.bgColor} ${section.borderColor} border-2 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg`}
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`${section.color} p-3 rounded-lg bg-white/50 dark:bg-black/20`}
                    >
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {section.title}
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`transform transition-transform duration-300 ${
                      expandedSection === section.id ? 'rotate-180' : ''
                    }`}
                  >
                    <svg
                      className="w-6 h-6 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Section Content */}
              {expandedSection === section.id && (
                <div className="px-6 pb-6 border-t border-border/50">
                  <div className="grid gap-4 mt-4">
                    {section.items.map((item, index) => (
                      <div
                        key={index}
                        className="bg-card rounded-lg p-4 border border-border/50 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1">{getTypeIcon(item.type)}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-foreground">
                                {item.title}
                              </h3>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}
                              >
                                {item.priority}
                              </span>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {item.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-700 dark:via-purple-700 dark:to-pink-700 rounded-lg p-8 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Ready to Master Frontend Development?
            </h2>
            <p className="text-xl mb-6 text-white/95 dark:text-white/90">
              Use this cheat sheet as your quick reference guide for frontend
              best practices.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/practice/fundamentals"
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Practice Fundamentals
              </Link>
              <Link
                href="/learning-paths"
                className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 dark:hover:bg-white dark:hover:text-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Explore Learning Paths
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
