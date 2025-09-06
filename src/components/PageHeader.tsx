import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Filter, MoreHorizontal } from 'lucide-react';

export interface HeaderLink {
  href: string;
  label: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

interface PageHeaderProps {
  title: string;
  description: string;
  showMobileButtons?: boolean;
  onToggleStatistics?: () => void;
  onToggleFilters?: () => void;
  showStatistics?: boolean;
  showFilters?: boolean;
  links?: HeaderLink[];
  className?: string;
}

export function PageHeader({
  title,
  description,
  showMobileButtons = false,
  onToggleStatistics,
  onToggleFilters,
  showStatistics = false,
  showFilters = false,
  links = [
    {
      href: '/study-plans',
      label: 'View Study Plans',
      icon: '📅',
      variant: 'primary' as const,
    },
    {
      href: '/preparation-guides',
      label: 'Preparation Guides',
      icon: '🎯',
      variant: 'secondary' as const,
    },
    {
      href: '/learning-paths/enhanced',
      label: 'Enhanced Learning Path (Interactive)',
      icon: '🚀',
      variant: 'tertiary' as const,
    },
  ],
  className = '',
}: PageHeaderProps) {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMoreMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const getLinkStyles = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white';
      case 'secondary':
        return 'bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white';
      case 'tertiary':
        return 'bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white';
      default:
        return 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white';
    }
  };

  return (
    <div className={`text-center mb-8 sm:mb-12 ${className}`}>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
        {title}
      </h1>
      <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
        {description}
      </p>
      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`${getLinkStyles(link.variant || 'primary')} px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base`}
          >
            {link.icon && <span className="mr-2">{link.icon}</span>}
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile Action Buttons - Clean & Organized */}
      {showMobileButtons && (
        <div className="mt-4 sm:mt-6 md:hidden px-4">
          {/* Primary Action Row */}
          <div className="flex items-center justify-center gap-3 mb-3">
            {/* Statistics Toggle */}
            <button
              onClick={onToggleStatistics}
              className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md text-sm ${
                showStatistics
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
              }`}
            >
              <span className="mr-2">📊</span>
              {showStatistics ? 'Hide Stats' : 'Show Stats'}
            </button>

            {/* Filters Toggle */}
            <button
              onClick={onToggleFilters}
              className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md text-sm ${
                showFilters
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              {showFilters ? 'Hide Filters' : 'Filters'}
            </button>

            {/* More Options Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <MoreHorizontal className="w-4 h-4 mr-2" />
                More
                <ChevronDown
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${showMoreMenu ? 'rotate-180' : ''}`}
                />
              </button>

              {/* More Options Dropdown Menu */}
              {showMoreMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                      More Options
                    </h3>
                  </div>
                  <div className="py-1">
                    {links.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => setShowMoreMenu(false)}
                      >
                        <span className="mr-3 text-base">{link.icon}</span>
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    ))}
                    <Link
                      href="/learning-paths/enhanced"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => setShowMoreMenu(false)}
                    >
                      <span className="mr-3 text-base">🚀</span>
                      <span className="font-medium">Enhanced Learning</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Status Indicators */}
          {(showStatistics || showFilters) && (
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              {showStatistics && (
                <span className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                  📊 Statistics Active
                </span>
              )}
              {showFilters && (
                <span className="inline-flex items-center px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                  🔍 Filters Active
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
