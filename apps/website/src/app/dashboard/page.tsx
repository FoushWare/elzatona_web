"use client";

import { EnhancedDashboard } from "@elzatona/components";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="pt-24">
        <EnhancedDashboard />
      </div>
    </div>
  );
}
