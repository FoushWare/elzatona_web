import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Filter, MoreHorizontal } from "lucide-react";

export interface HeaderLink {
  href: string;
  label: string;
  icon?: string;
  variant?: "primary" | "secondary" | "tertiary";
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
      href: "/study-plans",
      label: "View Study Plans",
      icon: "📅",
      variant: "primary" as const,
    },
    {
      href: "/preparation-guides",
      label: "Preparation Guides",
      icon: "🎯",
      variant: "secondary" as const,
    },
  ],
  className = "",
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const getLinkStyles = (variant: string) => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 dark:from-gray-500 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-700 text-white border-2 border-transparent hover:border-gray-400 dark:hover:border-gray-500 shadow-md hover:shadow-gray-500/20 dark:hover:shadow-gray-400/25";
      case "secondary":
        return "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 dark:from-slate-500 dark:to-slate-600 dark:hover:from-slate-600 dark:hover:to-slate-700 text-white border-2 border-transparent hover:border-slate-400 dark:hover:border-slate-500 shadow-md hover:shadow-slate-500/20 dark:hover:shadow-slate-400/25";
      case "tertiary":
        return "bg-gradient-to-r from-zinc-600 to-zinc-700 hover:from-zinc-700 hover:to-zinc-800 dark:from-zinc-500 dark:to-zinc-600 dark:hover:from-zinc-600 dark:hover:to-zinc-700 text-white border-2 border-transparent hover:border-zinc-400 dark:hover:border-zinc-500 shadow-md hover:shadow-zinc-500/20 dark:hover:shadow-zinc-400/25";
      default:
        return "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 dark:from-gray-500 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-700 text-white border-2 border-transparent hover:border-gray-400 dark:hover:border-gray-500 shadow-md hover:shadow-gray-500/20 dark:hover:shadow-gray-400/25";
    }
  };

  return (
    <div className={`text-center mb-8 sm:mb-12 ${className}`}>
      <div className="relative">
        {/* Subtle decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200/20 via-slate-200/20 to-gray-200/20 dark:from-gray-700/10 dark:via-slate-700/10 dark:to-gray-700/10 rounded-full blur-3xl transform scale-150"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200/15 via-gray-200/15 to-slate-200/15 dark:from-slate-600/8 dark:via-gray-600/8 dark:to-slate-600/8 rounded-full blur-2xl transform scale-125"></div>
        <div className="relative">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-700 via-slate-700 to-gray-700 dark:from-gray-300 dark:via-slate-300 dark:to-gray-300 bg-clip-text text-transparent mb-3 sm:mb-4 drop-shadow-sm text-foreground">
            {title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-foreground max-w-3xl mx-auto px-2 leading-relaxed font-medium">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`${getLinkStyles(link.variant || "primary")} px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base`}
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
                  ? "bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-500 dark:to-gray-600 text-white shadow-xl shadow-gray-500/20 dark:shadow-gray-400/25"
                  : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-600/30 dark:hover:to-gray-500/30 border border-gray-200 dark:border-gray-600"
              }`}
            >
              <span className="mr-2">📊</span>
              {showStatistics ? "Hide Stats" : "Show Stats"}
            </button>

            {/* Filters Toggle */}
            <button
              onClick={onToggleFilters}
              className={`inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm ${
                showFilters
                  ? "bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-500 dark:to-slate-600 text-white shadow-xl shadow-slate-500/20 dark:shadow-slate-400/25"
                  : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-600/30 dark:hover:to-gray-500/30 border border-gray-200 dark:border-gray-600"
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              {showFilters ? "Hide Filters" : "Filters"}
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
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${showMoreMenu ? "rotate-180" : ""}`}
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
