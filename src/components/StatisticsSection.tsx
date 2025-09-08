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
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl shadow-lg border border-blue-200 dark:border-blue-700 p-3 sm:p-4 lg:p-6 text-center hover:shadow-xl hover:scale-105 transform transition-all duration-300">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1 sm:mb-2">
          {learningPathsCount}
        </div>
        <div className="text-blue-700 dark:text-blue-300 font-semibold text-xs sm:text-sm lg:text-base">
          Learning Paths
        </div>
      </div>
      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl shadow-lg border border-emerald-200 dark:border-emerald-700 p-3 sm:p-4 lg:p-6 text-center hover:shadow-xl hover:scale-105 transform transition-all duration-300">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent mb-1 sm:mb-2">
          {totalHours}
        </div>
        <div className="text-emerald-700 dark:text-emerald-300 font-semibold text-xs sm:text-sm lg:text-base">
          Total Hours
        </div>
      </div>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl shadow-lg border border-purple-200 dark:border-purple-700 p-3 sm:p-4 lg:p-6 text-center hover:shadow-xl hover:scale-105 transform transition-all duration-300">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-1 sm:mb-2">
          {totalResources}
        </div>
        <div className="text-purple-700 dark:text-purple-300 font-semibold text-xs sm:text-sm lg:text-base">
          Total Resources
        </div>
      </div>
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl shadow-lg border border-orange-200 dark:border-orange-700 p-3 sm:p-4 lg:p-6 text-center hover:shadow-xl hover:scale-105 transform transition-all duration-300">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent mb-1 sm:mb-2">
          {categoriesCount}
        </div>
        <div className="text-orange-700 dark:text-orange-300 font-semibold text-xs sm:text-sm lg:text-base">
          Categories
        </div>
      </div>
    </div>
  );
}
