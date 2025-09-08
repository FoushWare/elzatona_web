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
        return 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 dark:from-pink-600 dark:via-purple-600 dark:to-blue-600 dark:hover:from-pink-700 dark:hover:via-purple-700 dark:hover:to-blue-700 text-white border-2 border-transparent hover:border-pink-300 dark:hover:border-pink-400 shadow-xl hover:shadow-pink-500/30 dark:hover:shadow-pink-400/40';
      case 'secondary':
        return 'bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-blue-600 dark:from-emerald-600 dark:via-cyan-600 dark:to-blue-600 dark:hover:from-emerald-700 dark:hover:via-cyan-700 dark:hover:to-blue-700 text-white border-2 border-transparent hover:border-emerald-300 dark:hover:border-emerald-400 shadow-xl hover:shadow-emerald-500/30 dark:hover:shadow-emerald-400/40';
      case 'tertiary':
        return 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 dark:from-orange-600 dark:via-red-600 dark:to-pink-600 dark:hover:from-orange-700 dark:hover:via-red-700 dark:hover:to-pink-700 text-white border-2 border-transparent hover:border-orange-300 dark:hover:border-orange-400 shadow-xl hover:shadow-orange-500/30 dark:hover:shadow-orange-400/40';
      default:
        return 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 dark:from-pink-600 dark:via-purple-600 dark:to-blue-600 dark:hover:from-pink-700 dark:hover:via-purple-700 dark:hover:to-blue-700 text-white border-2 border-transparent hover:border-pink-300 dark:hover:border-pink-400 shadow-xl hover:shadow-pink-500/30 dark:hover:shadow-pink-400/40';
    }
  };

  return (
    <div className={`text-center mb-8 sm:mb-12 ${className}`}>
      <div className="relative">
        {/* Light decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-200/20 via-purple-200/20 via-blue-200/20 to-cyan-200/20 dark:from-pink-500/15 dark:via-purple-500/15 dark:via-blue-500/15 dark:to-cyan-500/15 rounded-full blur-3xl transform scale-150 animate-float-gentle"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/15 via-yellow-200/15 via-orange-200/15 to-red-200/15 dark:from-emerald-500/10 dark:via-yellow-500/10 dark:via-orange-500/10 dark:to-red-500/10 rounded-full blur-2xl transform scale-125 animate-float-slow delay-1000"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-violet-200/10 via-fuchsia-200/10 via-rose-200/10 to-pink-200/10 dark:from-violet-500/8 dark:via-fuchsia-500/8 dark:via-rose-500/8 dark:to-pink-500/8 rounded-full blur-xl transform scale-110 animate-float-reverse delay-2000"></div>
        <div className="relative">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 via-blue-600 to-cyan-600 dark:from-pink-400 dark:via-purple-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-3 sm:mb-4 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-800 dark:text-gray-100 max-w-3xl mx-auto px-2 leading-relaxed font-semibold">
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
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 dark:from-pink-600 dark:via-purple-600 dark:to-blue-600 text-white shadow-xl shadow-pink-500/30 dark:shadow-pink-400/40'
                  : 'bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 dark:from-pink-800/30 dark:via-purple-800/30 dark:to-blue-800/30 text-pink-700 dark:text-pink-200 hover:from-pink-200 hover:via-purple-200 hover:to-blue-200 dark:hover:from-pink-700/40 dark:hover:via-purple-700/40 dark:hover:to-blue-700/40 border border-pink-200 dark:border-pink-600'
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
                  ? 'bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 dark:from-emerald-600 dark:via-cyan-600 dark:to-blue-600 text-white shadow-xl shadow-emerald-500/30 dark:shadow-emerald-400/40'
                  : 'bg-gradient-to-r from-emerald-100 via-cyan-100 to-blue-100 dark:from-emerald-800/30 dark:via-cyan-800/30 dark:to-blue-800/30 text-emerald-700 dark:text-emerald-200 hover:from-emerald-200 hover:via-cyan-200 hover:to-blue-200 dark:hover:from-emerald-700/40 dark:hover:via-cyan-700/40 dark:hover:to-blue-700/40 border border-emerald-200 dark:border-emerald-600'
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
