"use client";

import { useState } from "react";
import { 
  Code, 
  Zap, 
  Shield, 
  BarChart3, 
  Palette, 
  Globe, 
  Smartphone, 
  Database,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";

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
    title: 'Performance Optimization',
    icon: <Zap className="w-8 h-8" />,
    description: 'Critical performance tips and best practices',
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    items: [
      {
        title: 'Critical CSS',
        content: 'Inline critical CSS for above-the-fold content. Use tools like Critical or CriticalCSS.',
        type: 'tip',
        priority: 'high'
      },
      {
        title: 'Image Optimization',
        content: 'Use WebP format, implement lazy loading, and provide multiple sizes with srcset.',
        type: 'tip',
        priority: 'high'
      },
      {
        title: 'Bundle Splitting',
        content: 'Split code into smaller chunks and use dynamic imports for route-based code splitting.',
        type: 'tip',
        priority: 'medium'
      },
      {
        title: 'Tree Shaking',
        content: 'Remove unused code during build process. Use ES6 modules and configure bundler properly.',
        type: 'info',
        priority: 'medium'
      }
    ]
  },
  {
    id: 'security',
    title: 'Security Best Practices',
    icon: <Shield className="w-8 h-8" />,
    description: 'Essential security measures for frontend applications',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20',
    borderColor: 'border-red-200 dark:border-red-800',
    items: [
      {
        title: 'XSS Prevention',
        content: 'Always sanitize user input, use Content Security Policy (CSP), and avoid innerHTML.',
        type: 'warning',
        priority: 'high'
      },
      {
        title: 'CSRF Protection',
        content: 'Implement CSRF tokens, use SameSite cookies, and validate request origins.',
        type: 'tip',
        priority: 'high'
      },
      {
        title: 'HTTPS Enforcement',
        content: 'Use HSTS headers, redirect HTTP to HTTPS, and secure cookie flags.',
        type: 'checklist',
        priority: 'high'
      }
    ]
  },
  {
    id: 'accessibility',
    title: 'Accessibility (ARIA)',
    icon: <Globe className="w-8 h-8" />,
    description: 'Web accessibility guidelines and ARIA implementation',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    items: [
      {
        title: 'Semantic HTML',
        content: 'Use proper HTML elements (nav, main, section, article) instead of generic divs.',
        type: 'tip',
        priority: 'high'
      },
      {
        title: 'ARIA Labels',
        content: 'Provide descriptive labels for interactive elements using aria-label or aria-labelledby.',
        type: 'tip',
        priority: 'medium'
      },
      {
        title: 'Keyboard Navigation',
        content: 'Ensure all interactive elements are keyboard accessible with proper focus management.',
        type: 'checklist',
        priority: 'high'
      }
    ]
  },
  {
    id: 'responsive',
    title: 'Responsive Design',
    icon: <Smartphone className="w-8 h-8" />,
    description: 'Mobile-first responsive design principles',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20',
    borderColor: 'border-green-200 dark:border-green-800',
    items: [
      {
        title: 'Mobile-First Approach',
        content: 'Start with mobile design and progressively enhance for larger screens.',
        type: 'tip',
        priority: 'high'
      },
      {
        title: 'Flexible Images',
        content: 'Use max-width: 100% and height: auto for responsive images.',
        type: 'tip',
        priority: 'medium'
      },
      {
        title: 'Breakpoint Strategy',
        content: 'Use logical breakpoints based on content, not device sizes.',
        type: 'info',
        priority: 'medium'
      }
    ]
  },
  {
    id: 'css',
    title: 'CSS Best Practices',
    icon: <Palette className="w-8 h-8" />,
    description: 'Modern CSS techniques and optimization',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    items: [
      {
        title: 'CSS Custom Properties',
        content: 'Use CSS variables for consistent theming and easier maintenance.',
        type: 'tip',
        priority: 'medium'
      },
      {
        title: 'CSS Grid & Flexbox',
        content: 'Master modern layout techniques for complex, responsive layouts.',
        type: 'tip',
        priority: 'high'
      },
      {
        title: 'CSS-in-JS Considerations',
        content: 'Be aware of bundle size impact and runtime performance implications.',
        type: 'warning',
        priority: 'medium'
      }
    ]
  },
  {
    id: 'testing',
    title: 'Testing Strategies',
    icon: <CheckCircle className="w-8 h-8" />,
    description: 'Frontend testing approaches and tools',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    items: [
      {
        title: 'Unit Testing',
        content: 'Test individual components and functions in isolation.',
        type: 'tip',
        priority: 'high'
      },
      {
        title: 'Integration Testing',
        content: 'Test component interactions and API integrations.',
        type: 'tip',
        priority: 'medium'
      },
      {
        title: 'E2E Testing',
        content: 'Test complete user workflows and critical paths.',
        type: 'info',
        priority: 'medium'
      }
    ]
  }
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
  const totalItems = cheatSheetData.reduce((sum, section) => sum + section.items.length, 0);
  const highPriorityItems = cheatSheetData.reduce((sum, section) => 
    sum + section.items.filter(item => item.priority === 'high').length, 0
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
              Essential knowledge, best practices, and quick references for frontend developers
            </p>
            
            {/* Mobile Toggle Button */}
            <div className="flex justify-center mt-6 md:hidden">
              <button
                onClick={() => setShowStatistics(!showStatistics)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {showStatistics ? "Hide Statistics" : "Show Statistics"}
                <span className="ml-2">📊</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Section */}
        <div className={`${showStatistics ? 'block' : 'hidden md:grid'} grid-cols-1 md:grid-cols-4 gap-6 mb-8`}>
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
            <div className="text-card-foreground font-medium">
              Total Tips
            </div>
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
            <div className="text-3xl font-bold text-purple-600 mb-2">
              🚀
            </div>
            <div className="text-card-foreground font-medium">
              Always Updated
            </div>
          </div>
        </div>

        {/* Cheat Sheet Sections */}
        <div className="space-y-6">
          {cheatSheetData.map((section) => (
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
                    <div className={`${section.color} p-3 rounded-lg bg-white/50 dark:bg-black/20`}>
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
                  <div className={`transform transition-transform duration-300 ${
                    expandedSection === section.id ? 'rotate-180' : ''
                  }`}>
                    <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                          <div className="mt-1">
                            {getTypeIcon(item.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-foreground">
                                {item.title}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
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
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Master Frontend Development?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Use this cheat sheet as your quick reference guide for frontend best practices.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/practice/fundamentals"
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                Practice Fundamentals
              </a>
              <a
                href="/learning-paths"
                className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Explore Learning Paths
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
