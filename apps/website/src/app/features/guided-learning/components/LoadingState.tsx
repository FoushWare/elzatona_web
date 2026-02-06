"use client";

import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="col-span-full text-center py-16">
      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
        <Loader2 className="w-10 h-10 animate-spin text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Loading Learning Plans
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Fetching your personalized learning options...
      </p>
    </div>
  );
}
