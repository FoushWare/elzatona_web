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
        return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-2 border-transparent hover:border-blue-300 shadow-lg hover:shadow-blue-500/25';
      case 'secondary':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-2 border-transparent hover:border-purple-300 shadow-lg hover:shadow-purple-500/25';
      case 'tertiary':
        return 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-2 border-transparent hover:border-emerald-300 shadow-lg hover:shadow-emerald-500/25';
      default:
        return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-2 border-transparent hover:border-blue-300 shadow-lg hover:shadow-blue-500/25';
    }
  };

  return (
    <div className={`text-center mb-8 sm:mb-12 ${className}`}>
      <div className="relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-3xl transform scale-150"></div>
        <div className="relative">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
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
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20'
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
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-900/20 dark:hover:to-purple-800/20'
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
