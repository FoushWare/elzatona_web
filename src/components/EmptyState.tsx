import Link from 'next/link';

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-8 sm:py-12 px-4">
      <div className="text-4xl sm:text-6xl mb-4">🔍</div>
      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
        No learning paths found
      </h3>
      <p className="text-muted-foreground mb-4 text-sm sm:text-base">
        Try adjusting your filters or check out our other learning resources
      </p>
      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={onClearFilters}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          Clear Filters
        </button>
        <Link
          href="/study-plans"
          className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors text-sm sm:text-base"
        >
          View Study Plans
        </Link>
      </div>
    </div>
  );
}
