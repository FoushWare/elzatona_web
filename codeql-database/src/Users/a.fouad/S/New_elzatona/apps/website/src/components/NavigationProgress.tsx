"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useNavigation } from "@/context/NavigationContext";

/**
 * Navigation Progress Bar Component
 *
 * Shows a progress bar at the top of the page during navigation
 * Provides visual feedback when pages are loading
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Always call hook at top level - React Hooks rules
  const navigationContext = useNavigation();

  // Safely get navigation context - use context if available, otherwise use defaults
  const navigation = navigationContext || {
    isNavigating: false,
    setIsNavigating: () => {},
  };

  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const completionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    // Only show progress if pathname actually changed
    if (previousPathnameRef.current === pathname) {
      return;
    }

    // Clear any existing timers
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    if (progressTimeoutRef.current) {
      clearTimeout(progressTimeoutRef.current);
    }
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current);
    }

    // Start progress animation immediately
    setIsVisible(true);
    navigation?.setIsNavigating?.(true);
    setProgress(0);

    // Simulate progress with smooth increments
    let currentProgress = 0;
    progressIntervalRef.current = setInterval(() => {
      currentProgress += Math.random() * 10 + 5; // Increment between 5-15
      if (currentProgress >= 85) {
        currentProgress = 85; // Stop at 85% until page loads
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
      }
      setProgress(currentProgress);
    }, 50); // Update every 50ms for smoother animation

    // Helper to wait for next paint cycle (reduces nesting)
    const waitForNextPaint = (callback: () => void) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(callback);
      });
    };

    // Function to complete progress
    const completeProgress = () => {
      // Clear any pending timeouts
      if (progressTimeoutRef.current) {
        clearTimeout(progressTimeoutRef.current);
        progressTimeoutRef.current = null;
      }

      // Complete to 100%
      setProgress(100);

      // Hide after a brief moment to show completion
      completionTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
        navigation?.setIsNavigating?.(false);
        previousPathnameRef.current = pathname;
      }, 400); // Wait 400ms for the 100% animation to show
    };

    // In Next.js App Router, navigation is client-side
    // We need to detect when the new page has rendered
    // Use requestAnimationFrame to wait for next paint cycle
    const checkPageReady = () => {
      // Check if document is ready
      if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
      ) {
        waitForNextPaint(completeProgress);
        return;
      }

      // Wait for DOMContentLoaded or use fallback
      const handleDOMReady = () => {
        waitForNextPaint(completeProgress);
      };

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", handleDOMReady, {
          once: true,
        });
      } else {
        handleDOMReady();
      }

      // Fallback: complete after reasonable timeout (1.5 seconds max)
      progressTimeoutRef.current = setTimeout(() => {
        document.removeEventListener("DOMContentLoaded", handleDOMReady);
        completeProgress();
      }, 1500);
    };

    // Start checking for page readiness after a short delay
    // This allows Next.js to start rendering the new page
    progressTimeoutRef.current = setTimeout(() => {
      checkPageReady();
    }, 200);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (progressTimeoutRef.current) {
        clearTimeout(progressTimeoutRef.current);
      }
      if (completionTimeoutRef.current) {
        clearTimeout(completionTimeoutRef.current);
      }
    };
  }, [pathname, searchParams, navigation]);

  if (!isVisible && progress === 0) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[10000] h-1 bg-transparent pointer-events-none transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10000,
      }}
    >
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
          transition:
            progress === 100
              ? "width 0.3s ease-out, opacity 0.3s ease-out"
              : "width 0.1s linear",
        }}
      />
    </div>
  );
}
