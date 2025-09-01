"use client";

import { useState } from "react";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: "frontend" | "interview" | "react" | "javascript" | "css" | "performance" | "architecture";
  tags: string[];
  externalUrl?: string;
  isExternal: boolean;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  // Original Content
  {
    id: "git-worktree-guide",
    title: "What is Git Worktree and How to Make Use of It",
    excerpt: "A comprehensive guide to Git worktrees - the powerful feature that allows you to work on multiple branches simultaneously without stashing or committing incomplete work.",
    author: "KodDev Team",
    date: "2024-01-15",
    readTime: "15 min read",
    category: "frontend",
    tags: ["git", "worktree", "version-control", "workflow"],
    isExternal: false,
    featured: true
  },
  {
    id: "frontend-interview-prep-guide",
    title: "Complete Frontend Interview Preparation Guide",
    excerpt: "A comprehensive guide covering everything you need to know for frontend interviews, from basic concepts to advanced topics.",
    author: "KodDev Team",
    date: "2024-01-14",
    readTime: "15 min read",
    category: "interview",
    tags: ["interview", "preparation", "frontend", "guide"],
    isExternal: false,
    featured: true
  },
  {
    id: "react-performance-optimization",
    title: "React Performance Optimization Techniques",
    excerpt: "Learn advanced techniques to optimize React applications, including memoization, code splitting, and bundle optimization.",
    author: "KodDev Team",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "react",
    tags: ["react", "performance", "optimization", "memoization"],
    isExternal: false,
    featured: true
  },
  {
    id: "modern-css-techniques",
    title: "Modern CSS Techniques for Better Layouts",
    excerpt: "Explore modern CSS features like Grid, Flexbox, and CSS Custom Properties to create responsive and maintainable layouts.",
    author: "KodDev Team",
    date: "2024-01-05",
    readTime: "10 min read",
    category: "css",
    tags: ["css", "grid", "flexbox", "layout", "responsive"],
    isExternal: false
  },
  {
    id: "javascript-interview-questions",
    title: "Top 50 JavaScript Interview Questions",
    excerpt: "Essential JavaScript concepts and questions that frequently appear in frontend interviews, with detailed explanations.",
    author: "KodDev Team",
    date: "2024-01-01",
    readTime: "20 min read",
    category: "javascript",
    tags: ["javascript", "interview", "questions", "es6"],
    isExternal: false,
    featured: true
  },

  // Curated External Articles
  {
    id: "kent-c-dodds-testing",
    title: "Testing Implementation Details",
    excerpt: "Why testing implementation details can lead to brittle tests and how to focus on testing behavior instead.",
    author: "Kent C. Dodds",
    date: "2024-01-12",
    readTime: "8 min read",
    category: "frontend",
    tags: ["testing", "react", "best-practices"],
    externalUrl: "https://kentcdodds.com/blog/testing-implementation-details",
    isExternal: true
  },
  {
    id: "kent-c-dodds-useeffect",
    title: "A Complete Guide to useEffect",
    excerpt: "Everything you need to know about useEffect, from basic usage to advanced patterns and common pitfalls.",
    author: "Kent C. Dodds",
    date: "2024-01-08",
    readTime: "25 min read",
    category: "react",
    tags: ["react", "hooks", "useeffect", "tutorial"],
    externalUrl: "https://kentcdodds.com/blog/a-complete-guide-to-useeffect",
    isExternal: true,
    featured: true
  },
  {
    id: "kent-c-dodds-forms",
    title: "React Hook Form vs Formik",
    excerpt: "A detailed comparison of React Hook Form and Formik, helping you choose the right form library for your project.",
    author: "Kent C. Dodds",
    date: "2024-01-05",
    readTime: "12 min read",
    category: "react",
    tags: ["react", "forms", "react-hook-form", "formik"],
    externalUrl: "https://kentcdodds.com/blog/react-hook-form-vs-formik",
    isExternal: true
  },
  {
    id: "kent-c-dodds-accessible",
    title: "Making Your React App Accessible",
    excerpt: "Practical tips and techniques for making React applications more accessible to users with disabilities.",
    author: "Kent C. Dodds",
    date: "2024-01-02",
    readTime: "15 min read",
    category: "frontend",
    tags: ["accessibility", "react", "a11y", "inclusive-design"],
    externalUrl: "https://kentcdodds.com/blog/making-your-react-app-accessible",
    isExternal: true
  },
  {
    id: "css-grid-complete-guide",
    title: "CSS Grid Complete Guide",
    excerpt: "A comprehensive guide to CSS Grid Layout, covering all properties and practical examples for modern layouts.",
    author: "CSS-Tricks",
    date: "2024-01-10",
    readTime: "18 min read",
    category: "css",
    tags: ["css", "grid", "layout", "tutorial"],
    externalUrl: "https://css-tricks.com/snippets/css/complete-guide-grid/",
    isExternal: true
  },
  {
    id: "javascript-promises-guide",
    title: "JavaScript Promises: An In-Depth Guide",
    excerpt: "Master JavaScript Promises with practical examples, error handling, and advanced patterns for async programming.",
    author: "JavaScript.info",
    date: "2024-01-07",
    readTime: "20 min read",
    category: "javascript",
    tags: ["javascript", "promises", "async", "es6"],
    externalUrl: "https://javascript.info/promise-basics",
    isExternal: true
  },
  {
    id: "react-performance-tips",
    title: "React Performance Tips and Best Practices",
    excerpt: "Essential performance optimization techniques for React applications, from rendering optimization to bundle size reduction.",
    author: "React Blog",
    date: "2024-01-03",
    readTime: "14 min read",
    category: "performance",
    tags: ["react", "performance", "optimization", "best-practices"],
    externalUrl: "https://react.dev/learn/render-and-commit",
    isExternal: true
  },
  {
    id: "frontend-architecture-patterns",
    title: "Frontend Architecture Patterns for Scalable Applications",
    excerpt: "Explore different architectural patterns for building scalable frontend applications, from monoliths to micro-frontends.",
    author: "Frontend Masters",
    date: "2024-01-01",
    readTime: "22 min read",
    category: "architecture",
    tags: ["architecture", "scalability", "patterns", "micro-frontends"],
    externalUrl: "https://frontendmasters.com/blog/frontend-architecture-patterns/",
    isExternal: true
  }
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<BlogPost["category"] | "all">("all");
  // const [selectedAuthor, setSelectedAuthor] = useState("all");
  const [showStatistics, setShowStatistics] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const originalPosts = blogPosts.filter(post => !post.isExternal);
  const externalPosts = blogPosts.filter(post => post.isExternal);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "frontend": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "interview": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "react": return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400";
      case "javascript": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "css": return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "performance": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "architecture": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4 inline-block"
            >
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frontend Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Curated articles and original content for frontend interview preparation and skill development
            </p>
            
            {/* Stats */}
            <div className="mb-6">
                          {/* Mobile Toggle Buttons - Hidden on desktop */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4 md:hidden">
              <button
                onClick={() => setShowStatistics(!showStatistics)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {showStatistics ? "Hide Statistics" : "Show Statistics"}
                <span className="ml-2">📊</span>
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
                <span className="ml-2">🔍</span>
              </button>
            </div>
              
              <div className={`flex justify-center gap-8 transition-all duration-300 ${
                showStatistics ? 'block' : 'hidden md:flex'
              }`}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{blogPosts.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-blue-400">{originalPosts.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Original Content</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{externalPosts.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Curated Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{featuredPosts.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Featured</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 transition-all duration-300 ${
          showFilters ? 'block' : 'hidden md:block'
        }`}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {["all", "frontend", "interview", "react", "javascript", "css", "performance", "architecture"].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category as BlogPost["category"] | "all")}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === "all" && searchQuery === "" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border-l-4 border-blue-500">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                    {post.isExternal && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">External</span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {post.isExternal ? (
                      <a 
                        href={post.externalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {post.title} ↗
                      </a>
                    ) : (
                      <Link href={`/blog/${post.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                        {post.title}
                      </Link>
                    )}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {selectedCategory === "all" ? "All Articles" : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Articles`}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                  {post.isExternal && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">External</span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {post.isExternal ? (
                    <a 
                      href={post.externalUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {post.title} ↗
                    </a>
                  ) : (
                    <Link href={`/blog/${post.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                      {post.title}
                    </Link>
                  )}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{post.excerpt}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No articles found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
