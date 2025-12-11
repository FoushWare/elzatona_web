/**
 * Content Management Loading Component
 *
 * Shows a loading state while the content management page is loading
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
          Loading content management...
        </p>
      </div>
    </div>
  );
}
