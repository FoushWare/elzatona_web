interface FilterButtonsProps {
  selectedDifficulty: 'beginner' | 'intermediate' | 'advanced' | 'all';
  selectedCategory: string;
  onDifficultyChange: (
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'all'
  ) => void;
  onCategoryChange: (category: string) => void;
  categories: string[];
  isVisible?: boolean;
}

export function FilterButtons({
  selectedDifficulty,
  selectedCategory,
  onDifficultyChange,
  onCategoryChange,
  categories,
  isVisible = true,
}: FilterButtonsProps) {
  return (
    <div
      className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-6 sm:mb-8 transition-all duration-300 backdrop-blur-sm ${
        isVisible ? 'block' : 'hidden md:block'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Difficulty Level
          </label>
          <div className="flex flex-wrap gap-2">
            {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(
              difficulty => (
                <button
                  key={difficulty}
                  onClick={() => onDifficultyChange(difficulty)}
                  className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 transform border-2 ${
                    selectedDifficulty === difficulty
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 border-blue-500 dark:border-blue-600 text-white shadow-xl shadow-blue-500/30 dark:shadow-blue-400/40'
                      : 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-200 hover:from-blue-500 hover:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 hover:text-white hover:shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-blue-400/30'
                  }`}
                >
                  {difficulty === 'all'
                    ? 'All Levels'
                    : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </button>
              )
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 transform border-2 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 border-purple-500 dark:border-purple-600 text-white shadow-xl shadow-purple-500/30 dark:shadow-purple-400/40'
                    : 'bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-200 hover:from-purple-500 hover:to-purple-600 dark:hover:from-purple-600 dark:hover:to-purple-700 hover:text-white hover:shadow-lg hover:shadow-purple-500/25 dark:hover:shadow-purple-400/30'
                }`}
              >
                {category === 'all'
                  ? 'All Categories'
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
