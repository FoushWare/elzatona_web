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
      className={`bg-card rounded-lg shadow-sm border border-border p-4 sm:p-6 mb-6 sm:mb-8 transition-all duration-300 ${
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
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 transform border-2 ${
                    selectedDifficulty === difficulty
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                      : 'bg-transparent border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md'
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
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 transform border-2 ${
                  selectedCategory === category
                    ? 'bg-purple-600 border-purple-600 text-white shadow-lg'
                    : 'bg-transparent border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white hover:shadow-md'
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
