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
      className={`bg-gradient-to-br from-pink-50 via-purple-50 via-blue-50 to-cyan-50 dark:from-pink-900/20 dark:via-purple-900/20 dark:via-blue-900/20 dark:to-cyan-900/20 rounded-2xl shadow-xl border border-pink-200 dark:border-pink-700 p-4 sm:p-6 mb-6 sm:mb-8 transition-all duration-300 backdrop-blur-sm ${
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
                      ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 dark:from-pink-600 dark:via-purple-600 dark:to-blue-600 border-pink-500 dark:border-pink-600 text-white shadow-xl shadow-pink-500/30 dark:shadow-pink-400/40'
                      : 'bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-blue-900/30 border-pink-300 dark:border-pink-600 text-pink-700 dark:text-pink-200 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 dark:hover:from-pink-600 dark:hover:via-purple-600 dark:hover:to-blue-600 hover:text-white hover:shadow-lg hover:shadow-pink-500/25 dark:hover:shadow-pink-400/30'
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
                    ? 'bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 dark:from-emerald-600 dark:via-cyan-600 dark:to-blue-600 border-emerald-500 dark:border-emerald-600 text-white shadow-xl shadow-emerald-500/30 dark:shadow-emerald-400/40'
                    : 'bg-gradient-to-r from-emerald-50 via-cyan-50 to-blue-50 dark:from-emerald-900/30 dark:via-cyan-900/30 dark:to-blue-900/30 border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-200 hover:from-emerald-500 hover:via-cyan-500 hover:to-blue-500 dark:hover:from-emerald-600 dark:hover:via-cyan-600 dark:hover:to-blue-600 hover:text-white hover:shadow-lg hover:shadow-emerald-500/25 dark:hover:shadow-emerald-400/30'
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
