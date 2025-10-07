'use client';

import { ResourceCategoryInfo } from '@/types/resource';

interface CategoryCardProps {
  category: ResourceCategoryInfo;
  isSelected: boolean;
  onClick: () => void;
}

export default function CategoryCard({
  category,
  isSelected,
  onClick,
}: CategoryCardProps) {
  return (
    <div
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        isSelected
          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 shadow-md'
          : 'bg-card border-border hover:border-border/60 hover:shadow-sm'
      }`}
      onClick={onClick}
    >
      <div className="text-center">
        {/* Icon */}
        <div
          className={`text-3xl mb-2 ${
            isSelected ? 'scale-110' : ''
          } transition-transform`}
        >
          {category.icon}
        </div>

        {/* Name */}
        <h3
          className={`font-medium text-sm mb-1 ${
            isSelected
              ? 'text-blue-900 dark:text-blue-100'
              : 'text-card-foreground'
          }`}
        >
          {category.name}
        </h3>

        {/* Count */}
        <p
          className={`text-xs ${
            isSelected
              ? 'text-blue-600 dark:text-blue-300'
              : 'text-muted-foreground'
          }`}
        >
          {category.count} resources
        </p>
      </div>
    </div>
  );
}
