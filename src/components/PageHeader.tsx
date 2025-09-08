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
        return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-400 shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-blue-400/30';
      case 'secondary':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 dark:from-purple-600 dark:to-purple-700 dark:hover:from-purple-700 dark:hover:to-purple-800 text-white border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-400 shadow-lg hover:shadow-purple-500/25 dark:hover:shadow-purple-400/30';
      case 'tertiary':
        return 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 dark:from-emerald-600 dark:to-emerald-700 dark:hover:from-emerald-700 dark:hover:to-emerald-800 text-white border-2 border-transparent hover:border-emerald-300 dark:hover:border-emerald-400 shadow-lg hover:shadow-emerald-500/25 dark:hover:shadow-emerald-400/30';
      default:
        return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-400 shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-blue-400/30';
    }
  };

  return (
    <div className={`text-center mb-8 sm:mb-12 ${className}`}>
      <div className="relative">
        {/* Enhanced decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20 rounded-full blur-3xl transform scale-150 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-blue-400/20 dark:from-emerald-500/15 dark:via-cyan-500/15 dark:to-blue-500/15 rounded-full blur-2xl transform scale-125 animate-pulse delay-1000"></div>
        <div className="relative">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-3 sm:mb-4 drop-shadow-sm">
            {title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto px-2 leading-relaxed font-medium">
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
              className={`inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm ${
                showStatistics
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white shadow-xl shadow-blue-500/30 dark:shadow-blue-400/40'
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/30 dark:hover:to-blue-800/30 border border-gray-200 dark:border-gray-600'
              }`}
            >
              <span className="mr-2">📊</span>
              {showStatistics ? 'Hide Stats' : 'Show Stats'}
            </button>

            {/* Filters Toggle */}
            <button
              onClick={onToggleFilters}
              className={`inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm ${
                showFilters
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 text-white shadow-xl shadow-purple-500/30 dark:shadow-purple-400/40'
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-900/30 dark:hover:to-purple-800/30 border border-gray-200 dark:border-gray-600'
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
