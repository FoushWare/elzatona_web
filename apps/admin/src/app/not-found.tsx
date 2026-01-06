export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Page not found
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          The page you are looking for does not exist.
        </p>
        <div className="flex items-center gap-3 mt-6">
          <a
            className="px-4 py-2 rounded-md bg-gray-900 text-white"
            href="/admin"
          >
            Go to admin
          </a>
          <a
            className="px-4 py-2 rounded-md bg-gray-100 text-gray-900"
            href="/"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
