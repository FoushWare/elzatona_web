import Link from 'next/link';

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

      {/* Mobile Toggle Buttons - Hidden on desktop */}
      {showMobileButtons && (
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:hidden px-4">
          <button
            onClick={onToggleStatistics}
            className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
          >
            {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
            <span className="ml-2">📊</span>
          </button>
          <button
            onClick={onToggleFilters}
            className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
            <span className="ml-2">🔍</span>
          </button>
          <Link
            href="/learning-paths/enhanced"
            className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
          >
            🚀 Enhanced Learning
          </Link>
        </div>
      )}
    </div>
  );
}
