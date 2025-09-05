interface StatisticsSectionProps {
  learningPathsCount: number;
  totalHours: number;
  totalResources: number;
  categoriesCount: number;
  isVisible?: boolean;
}

export function StatisticsSection({
  learningPathsCount,
  totalHours,
  totalResources,
  categoriesCount,
  isVisible = true,
}: StatisticsSectionProps) {
  return (
    <div
      data-testid="statistics-section"
      className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 transition-all duration-300 ${
        isVisible ? 'block' : 'hidden md:grid'
      }`}
    >
      <div className="bg-card rounded-lg shadow-sm border border-border p-3 sm:p-4 lg:p-6 text-center">
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">
          {learningPathsCount}
        </div>
        <div className="text-card-foreground font-medium text-xs sm:text-sm lg:text-base">
          Learning Paths
        </div>
      </div>
      <div className="bg-card rounded-lg shadow-sm border border-border p-3 sm:p-4 lg:p-6 text-center">
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mb-1 sm:mb-2">
          {totalHours}
        </div>
        <div className="text-card-foreground font-medium text-xs sm:text-sm lg:text-base">
          Total Hours
        </div>
      </div>
      <div className="bg-card rounded-lg shadow-sm border border-border p-3 sm:p-4 lg:p-6 text-center">
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">
          {totalResources}
        </div>
        <div className="text-card-foreground font-medium text-xs sm:text-sm lg:text-base">
          Total Resources
        </div>
      </div>
      <div className="bg-card rounded-lg shadow-sm border border-border p-3 sm:p-4 lg:p-6 text-center">
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">
          {categoriesCount}
        </div>
        <div className="text-card-foreground font-medium text-xs sm:text-sm lg:text-base">
          Categories
        </div>
      </div>
    </div>
  );
}
