"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Page Transition Component
 *
 * Shows a loading overlay during page transitions
 * Provides visual feedback when navigating between pages
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    setIsTransitioning(true);

    // Show transition for a brief moment
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      setDisplayChildren(children);
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <>
      {isTransitioning && (
        <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Loading page...
            </p>
          </div>
        </div>
      )}
      <div
        className={
          isTransitioning
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-300"
        }
      >
        {displayChildren}
      </div>
    </>
  );
}
