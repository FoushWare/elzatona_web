/**
 * Global Loading Component
 *
 * Shows a loading state while pages are being loaded
 * This is automatically shown by Next.js during navigation
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
          Loading page...
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
          Please wait
        </p>
      </div>
    </div>
  );
}
