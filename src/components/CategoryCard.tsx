"use client";

import { ResourceCategoryInfo } from "@/types/resource";

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
          ? "bg-blue-50 border-blue-200 shadow-md"
          : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
      }`}
      onClick={onClick}
    >
      <div className="text-center">
        {/* Icon */}
        <div
          className={`text-3xl mb-2 ${
            isSelected ? "scale-110" : ""
          } transition-transform`}
        >
          {category.icon}
        </div>

        {/* Name */}
        <h3
          className={`font-medium text-sm mb-1 ${
            isSelected ? "text-blue-900" : "text-gray-900"
          }`}
        >
          {category.name}
        </h3>

        {/* Count */}
        <p
          className={`text-xs ${
            isSelected ? "text-blue-600" : "text-gray-500"
          }`}
        >
          {category.count} resources
        </p>
      </div>
    </div>
  );
}
