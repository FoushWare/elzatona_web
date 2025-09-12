import Link from 'next/link';

export function CallToAction() {
  return (
    <div className="mt-12 sm:mt-16 text-center px-4">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 sm:p-8 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-foreground">
          Ready to Start Learning?
        </h2>
        <p className="text-lg sm:text-xl mb-4 sm:mb-6 opacity-90 text-foreground">
          Choose your learning path and begin your frontend development journey
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link
            href="/study-plans"
            className="bg-white text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base"
          >
            📅 Study Plans
          </Link>
          <Link
            href="/preparation-guides"
            className="border-2 border-white text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors duration-200 text-sm sm:text-base"
          >
            🎯 Preparation Guides
          </Link>
        </div>
      </div>
    </div>
  );
}
