export default function TestNoHooksPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">No Hooks Test Page</h1>
      <p className="mb-4">This page has no hooks or useEffect calls.</p>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold">Static Content</h2>
        <p className="text-gray-600 dark:text-gray-400">
          This should render immediately.
        </p>
      </div>
    </div>
  );
}
