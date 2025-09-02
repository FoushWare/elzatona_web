'use client';

import { useState } from 'react';
import Link from 'next/link';

const htmlQuestions = [
  {
    id: 1,
    question: 'What are the key differences between HTML4 and HTML5?',
    answer:
      'HTML5 introduced semantic elements (header, nav, main, section, article, footer), new form controls, multimedia support (audio, video), canvas for graphics, local storage, and improved accessibility features.',
    category: 'HTML5',
    difficulty: 'Intermediate',
  },
  {
    id: 2,
    question: 'Explain the purpose of semantic HTML elements.',
    answer:
      'Semantic HTML elements clearly describe their meaning to both the browser and developer. Examples include header, nav, main, section, article, aside, footer. They improve accessibility, SEO, and code readability.',
    category: 'Semantics',
    difficulty: 'Beginner',
  },
  {
    id: 3,
    question: 'What is the difference between div and span elements?',
    answer:
      "div is a block-level element that creates a new line and takes full width, while span is an inline element that only takes the space it needs and doesn't create line breaks.",
    category: 'Elements',
    difficulty: 'Beginner',
  },
  {
    id: 4,
    question: 'How do you create a responsive image in HTML?',
    answer:
      'Use the picture element with multiple source elements for different screen sizes, or use CSS with max-width: 100% and height: auto on img elements.',
    category: 'Responsive',
    difficulty: 'Intermediate',
  },
  {
    id: 5,
    question: 'What are the new form input types in HTML5?',
    answer:
      'email, url, tel, number, range, date, time, datetime-local, month, week, color, search, and datalist for suggestions.',
    category: 'Forms',
    difficulty: 'Intermediate',
  },
  {
    id: 6,
    question: 'Explain the difference between GET and POST methods.',
    answer:
      'GET sends data in URL parameters, is cached, has length limits, and is less secure. POST sends data in request body, is not cached, has no length limits, and is more secure.',
    category: 'Forms',
    difficulty: 'Beginner',
  },
  {
    id: 7,
    question: 'What is the purpose of the alt attribute in img tags?',
    answer:
      'The alt attribute provides alternative text for images, improving accessibility for screen readers and displaying when images fail to load.',
    category: 'Accessibility',
    difficulty: 'Beginner',
  },
  {
    id: 8,
    question: 'How do you create a table in HTML?',
    answer:
      'Use table element with tr for rows, th for headers, and td for data cells. You can also use thead, tbody, and tfoot for better structure.',
    category: 'Tables',
    difficulty: 'Beginner',
  },
  {
    id: 9,
    question: 'What is the difference between id and class attributes?',
    answer:
      'id must be unique in the document and is used for specific targeting, while class can be used on multiple elements and is used for grouping similar elements.',
    category: 'Attributes',
    difficulty: 'Beginner',
  },
  {
    id: 10,
    question: 'How do you embed audio and video in HTML5?',
    answer:
      'Use audio and video elements with source elements for different formats. Include controls, autoplay, loop, and preload attributes as needed.',
    category: 'Multimedia',
    difficulty: 'Intermediate',
  },
  {
    id: 11,
    question: 'What are ARIA attributes in HTML and why are they important?',
    answer:
      "ARIA (Accessible Rich Internet Applications) attributes add semantic information to HTML to improve accessibility for assistive technologies like screen readers. They help users with disabilities by providing additional context when semantic HTML isn't sufficient. Common examples include aria-label (defines a label), aria-hidden='true' (hides from screen readers), role='dialog' (defines as dialog), and aria-expanded (indicates expandable content state). Best practice is to prefer semantic HTML (nav, main, button) over ARIA when possible; use ARIA to fill accessibility gaps.",
    category: 'Accessibility',
    difficulty: 'Advanced',
  },
  {
    id: 12,
    question:
      'What is the srcset attribute in HTML and how does it help with responsive images?',
    answer:
      "The srcset attribute allows you to specify multiple image sources for different screen sizes and pixel densities. It helps create responsive images by serving the most appropriate image version to each device. The 'w' descriptor specifies image width (e.g., '300w', '600w'), while 'x' specifies pixel density (e.g., '1x', '2x'). Combined with the 'sizes' attribute, it tells the browser which image to download based on the viewport size. Example: <img srcset='small.jpg 300w, medium.jpg 600w, large.jpg 900w' sizes='(max-width: 600px) 300px, (max-width: 900px) 600px, 900px' src='fallback.jpg' alt='Responsive image'>. This improves performance by avoiding downloading unnecessarily large images on small devices.",
    category: 'Responsive',
    difficulty: 'Advanced',
  },
  {
    id: 14,
    question:
      'What are common mistakes when implementing srcset and how do you debug responsive image issues?',
    answer:
      "Implementing srcset can be tricky, and developers often make several common mistakes. Here's how to identify and fix them:\n\n**Common Mistakes**:\n\n1. **Missing Fallback Image**:\n```html\n<!-- ❌ WRONG - No fallback -->\n<img srcset='small.jpg 300w, large.jpg 900w' alt='Image' />\n\n<!-- ✅ CORRECT - With fallback -->\n<img srcset='small.jpg 300w, large.jpg 900w' src='fallback.jpg' alt='Image' />\n```\n\n2. **Incorrect Sizes Attribute**:\n```html\n<!-- ❌ WRONG - Sizes don't match actual CSS -->\n<img srcset='small.jpg 300w, large.jpg 900w' sizes='100vw' />\n\n<!-- ✅ CORRECT - Sizes match actual display size -->\n<img srcset='small.jpg 300w, large.jpg 900w' sizes='(max-width: 600px) 100vw, 50vw' />\n```\n\n3. **Wrong Image Dimensions**:\n```html\n<!-- ❌ WRONG - Images don't match srcset dimensions -->\n<img srcset='small.jpg 300w, large.jpg 900w' />\n<!-- If small.jpg is actually 500px wide, this causes issues -->\n\n<!-- ✅ CORRECT - Actual image dimensions match descriptors -->\n<img srcset='small.jpg 300w, large.jpg 900w' />\n<!-- Ensure small.jpg is actually 300px wide -->\n```\n\n**Debugging Techniques**:\n\n1. **Browser DevTools**:\n   • Open Network tab and resize browser\n   • Check which image is actually downloaded\n   • Look for 404 errors on image requests\n\n2. **Console Logging**:\n```javascript\n// Add this to check which image is selected\nconst img = document.querySelector('img[srcset]');\nconsole.log('Current src:', img.currentSrc);\nconsole.log('Natural dimensions:', img.naturalWidth, 'x', img.naturalHeight);\n```\n\n3. **Lighthouse Audits**:\n   • Run Lighthouse performance audit\n   • Check 'Properly size images' section\n   • Look for 'Serve images in next-gen formats' recommendations\n\n4. **Testing Tools**:\n   • BrowserStack for cross-device testing\n   • Chrome DevTools device simulation\n   • Network throttling to test slow connections\n\n**Performance Monitoring**:\n• Use `window.performance.getEntriesByType('resource')` to track image loading\n• Monitor Core Web Vitals (LCP, CLS)\n• Check bundle analyzer for image sizes\n• Use WebPageTest for detailed performance analysis\n\n**Best Practices for Debugging**:\n• Start with simple srcset implementations\n• Test one attribute at a time\n• Use browser dev tools extensively\n• Validate HTML with W3C validator\n• Test on multiple devices and browsers\n• Monitor network requests in production",
    category: 'Responsive',
    difficulty: 'Advanced',
  },
  {
    id: 15,
    question:
      'Coding Challenge: Implement a responsive image gallery using srcset and picture elements. How would you structure this for optimal performance?',
    answer:
      "This coding challenge tests your ability to implement a complete responsive image gallery using modern HTML techniques. Here's a comprehensive solution:\n\n**Gallery Structure with srcset**:\n```html\n<div class='gallery'>\n  <!-- Hero Image with Art Direction -->\n  <div class='gallery-hero'>\n    <picture>\n      <source \n        media='(min-width: 1200px)'\n        srcset='hero-wide.jpg 1200w, hero-wide@2x.jpg 2400w'\n      />\n      <source \n        media='(min-width: 768px)'\n        srcset='hero-medium.jpg 768w, hero-medium@2x.jpg 1536w'\n      />\n      <img \n        src='hero-mobile.jpg' \n        alt='Gallery hero image'\n        class='gallery-hero-img'\n      />\n    </picture>\n  </div>\n\n  <!-- Thumbnail Grid with srcset -->\n  <div class='gallery-grid'>\n    <div class='gallery-item'>\n      <img \n        srcset='thumb1-300w.jpg 300w, thumb1-600w.jpg 600w, thumb1-900w.jpg 900w'\n        sizes='(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'\n        src='thumb1-300w.jpg'\n        alt='Gallery thumbnail 1'\n        loading='lazy'\n        class='gallery-thumb'\n      />\n    </div>\n    <!-- Repeat for more items -->\n  </div>\n</div>\n```\n\n**CSS for Responsive Layout**:\n```css\n.gallery {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.gallery-hero {\n  margin-bottom: 40px;\n}\n\n.gallery-hero-img {\n  width: 100%;\n  height: auto;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n}\n\n.gallery-grid {\n  display: grid;\n  gap: 20px;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n}\n\n.gallery-item {\n  aspect-ratio: 1;\n  overflow: hidden;\n  border-radius: 8px;\n  transition: transform 0.3s ease;\n}\n\n.gallery-item:hover {\n  transform: scale(1.05);\n}\n\n.gallery-thumb {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n/* Responsive breakpoints */\n@media (max-width: 768px) {\n  .gallery-grid {\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    gap: 15px;\n  }\n}\n\n@media (max-width: 480px) {\n  .gallery-grid {\n    grid-template-columns: 1fr;\n    gap: 10px;\n  }\n}\n```\n\n**JavaScript for Enhanced Functionality**:\n```javascript\n// Lazy loading with Intersection Observer\nconst imageObserver = new IntersectionObserver((entries, observer) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      const img = entry.target;\n      if (img.dataset.src) {\n        img.src = img.dataset.src;\n        img.removeAttribute('data-src');\n        observer.unobserve(img);\n      }\n    }\n  });\n}, {\n  rootMargin: '50px'\n});\n\n// Observe all lazy images\ndocument.querySelectorAll('img[data-src]').forEach(img => {\n  imageObserver.observe(img);\n});\n\n// Performance monitoring\nconst trackImageLoad = (img) => {\n  const startTime = performance.now();\n  img.addEventListener('load', () => {\n    const loadTime = performance.now() - startTime;\n    console.log(`Image loaded in ${loadTime.toFixed(2)}ms:`, img.src);\n  });\n};\n\n// Track all images\ndocument.querySelectorAll('.gallery img').forEach(trackImageLoad);\n```\n\n**Performance Optimizations**:\n\n1. **Image Sizing Strategy**:\n   • 300w for mobile (1x and 2x)\n   • 600w for tablet (1x and 2x)\n   • 900w for desktop (1x and 2x)\n   • 1200w for large screens (1x and 2x)\n\n2. **Loading Strategy**:\n   • Hero image: Eager load (above the fold)\n   • Thumbnails: Lazy load with Intersection Observer\n   • Preload critical images with `<link rel='preload'>`\n\n3. **Format Strategy**:\n   • WebP for modern browsers\n   • JPEG fallback for older browsers\n   • Consider AVIF for even better compression\n\n**Testing Checklist**:\n• [ ] Test on multiple devices (mobile, tablet, desktop)\n• [ ] Verify correct images load at different screen sizes\n• [ ] Check network tab for appropriate image requests\n• [ ] Test with slow network conditions\n• [ ] Verify lazy loading works correctly\n• [ ] Run Lighthouse performance audit\n• [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)\n• [ ] Monitor Core Web Vitals (LCP, CLS)\n\n**Advanced Enhancements**:\n• Add image zoom on click\n• Implement swipe gestures for mobile\n• Add keyboard navigation\n• Include image metadata display\n• Add loading skeletons\n• Implement progressive image loading\n• Add image search/filtering\n• Include social sharing functionality",
    category: 'Responsive',
    difficulty: 'Advanced',
  },
];

export default function HTMLPracticePage() {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const handleQuestionClick = (questionId: number) => {
    if (selectedQuestion === questionId) {
      setShowAnswer(!showAnswer);
    } else {
      setSelectedQuestion(questionId);
      setShowAnswer(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-red-900/20 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <nav className="mb-8">
            <Link
              href="/preparation-guides"
              className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Preparation Guides
            </Link>
          </nav>

          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-4xl">🎨</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-6">
              HTML Practice Questions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Master HTML fundamentals with these essential interview questions
              covering semantics, accessibility, and modern web standards
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-6 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-bold border-2 border-blue-200 dark:border-blue-700 shadow-sm">
                {htmlQuestions.length} Questions
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 rounded-xl text-sm font-bold border-2 border-green-200 dark:border-green-700 shadow-sm">
                Beginner to Advanced
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-xl text-sm font-bold border-2 border-purple-200 dark:border-purple-700 shadow-sm">
                Semantic & Modern
              </span>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {htmlQuestions.map(question => (
            <div
              key={question.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-orange-200 dark:border-orange-800 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
            >
              <button
                onClick={() => handleQuestionClick(question.id)}
                className="w-full p-8 text-left hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 dark:hover:from-orange-900/20 dark:hover:to-red-900/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white text-lg font-bold">
                          {question.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-4 py-2 rounded-xl text-sm font-bold border-2 ${
                            question.difficulty === 'Beginner'
                              ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700'
                              : question.difficulty === 'Intermediate'
                                ? 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700'
                                : 'bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700'
                          }`}
                        >
                          {question.difficulty}
                        </span>
                        <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-bold border-2 border-blue-200 dark:border-blue-700">
                          {question.category}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-relaxed">
                      {question.question}
                    </h3>
                  </div>
                  <div className="ml-6 flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        selectedQuestion === question.id && showAnswer
                          ? 'bg-orange-500 text-white rotate-180'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 group-hover:text-orange-600 dark:group-hover:text-orange-400'
                      }`}
                    >
                      <svg
                        className="w-5 h-5 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>

              {selectedQuestion === question.id && showAnswer && (
                <div className="border-t-2 border-orange-200 dark:border-orange-800 p-8 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center text-xl">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      Answer
                    </h4>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-green-200 dark:border-green-800 shadow-md">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                        {question.answer}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/coding"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      🎯 Practice Coding
                    </Link>
                    <Link
                      href="https://developer.mozilla.org/en-US/docs/Web/HTML"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      📚 MDN Docs
                    </Link>
                    <Link
                      href="/practice/fundamentals"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      🔄 More Questions
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl p-10 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">
              Ready for More Practice?
            </h2>
            <p className="text-orange-100 mb-8 text-lg leading-relaxed">
              Continue your learning journey with related topics and master the
              complete frontend stack
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/practice/fundamentals/css"
                className="inline-flex items-center px-8 py-4 bg-white text-orange-600 rounded-xl hover:bg-orange-50 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🎨 CSS Practice
              </Link>
              <Link
                href="/practice/fundamentals/javascript"
                className="inline-flex items-center px-8 py-4 bg-white text-orange-600 rounded-xl hover:bg-orange-50 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                ⚡ JavaScript Practice
              </Link>
              <Link
                href="/coding"
                className="inline-flex items-center px-8 py-4 bg-white text-orange-600 rounded-xl hover:bg-orange-50 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🎯 Coding Challenges
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
