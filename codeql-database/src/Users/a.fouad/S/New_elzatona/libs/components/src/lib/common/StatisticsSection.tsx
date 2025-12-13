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
        isVisible ? "block" : "hidden md:grid"
      }`}
    >
      <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-pink-900/40 dark:via-purple-900/40 dark:to-blue-900/40 rounded-2xl shadow-xl border border-pink-200 dark:border-pink-600 p-3 sm:p-4 lg:p-6 text-center hover:shadow-2xl hover:scale-105 transform transition-all duration-300 hover:border-pink-300 dark:hover:border-pink-500 backdrop-blur-sm">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-1 sm:mb-2 drop-shadow-sm">
          {learningPathsCount}
        </div>
        <div className="text-pink-700 dark:text-pink-200 font-semibold text-xs sm:text-sm lg:text-base">
          Learning Paths
        </div>
      </div>
      <div className="bg-gradient-to-br from-emerald-100 via-cyan-100 to-blue-100 dark:from-emerald-900/40 dark:via-cyan-900/40 dark:to-blue-900/40 rounded-2xl shadow-xl border border-emerald-200 dark:border-emerald-600 p-3 sm:p-4 lg:p-6 text-center hover:shadow-2xl hover:scale-105 transform transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-500 backdrop-blur-sm">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 dark:from-emerald-400 dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-1 sm:mb-2 drop-shadow-sm">
          {totalHours}
        </div>
        <div className="text-emerald-700 dark:text-emerald-200 font-semibold text-xs sm:text-sm lg:text-base">
          Total Hours
        </div>
      </div>
      <div className="bg-gradient-to-br from-violet-100 via-fuchsia-100 to-pink-100 dark:from-violet-900/40 dark:via-fuchsia-900/40 dark:to-pink-900/40 rounded-2xl shadow-xl border border-violet-200 dark:border-violet-600 p-3 sm:p-4 lg:p-6 text-center hover:shadow-2xl hover:scale-105 transform transition-all duration-300 hover:border-violet-300 dark:hover:border-violet-500 backdrop-blur-sm">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-pink-400 bg-clip-text text-transparent mb-1 sm:mb-2 drop-shadow-sm">
          {totalResources}
        </div>
        <div className="text-violet-700 dark:text-violet-200 font-semibold text-xs sm:text-sm lg:text-base">
          Total Resources
        </div>
      </div>
      <div className="bg-gradient-to-br from-orange-100 via-red-100 to-pink-100 dark:from-orange-900/40 dark:via-red-900/40 dark:to-pink-900/40 rounded-2xl shadow-xl border border-orange-200 dark:border-orange-600 p-3 sm:p-4 lg:p-6 text-center hover:shadow-2xl hover:scale-105 transform transition-all duration-300 hover:border-orange-300 dark:hover:border-orange-500 backdrop-blur-sm">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 dark:from-orange-400 dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent mb-1 sm:mb-2 drop-shadow-sm">
          {categoriesCount}
        </div>
        <div className="text-orange-700 dark:text-orange-200 font-semibold text-xs sm:text-sm lg:text-base">
          Categories
        </div>
      </div>
    </div>
  );
}
