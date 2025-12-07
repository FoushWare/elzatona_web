"use client";

import React, { useState, useEffect } from "react";

interface LoadingTransitionProps {
  isVisible: boolean;
  message?: string;
  duration?: number;
}

export const LoadingTransition: React.FC<LoadingTransitionProps> = ({
  isVisible,
  message = "Loading...",
  duration = 2000,
}) => {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);

      const timer = setTimeout(() => {
        setShouldRender(false);
      }, duration);

      return () => clearTimeout(timer);
    }
    setShouldRender(false);
    return undefined;
  }, [isVisible, duration]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      data-testid="loading-transition"
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <div
          data-testid="loading-spinner"
          className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"
        />
        <p className="text-white text-lg">{message}</p>
      </div>
    </div>
  );
};
