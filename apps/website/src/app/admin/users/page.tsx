"use client";

import React from "react";
import { useAdminAuth } from "@elzatona/contexts";
// Import AdminManagement component directly
// Note: This component has dependencies on apps/website, so it's imported from the lib
import AdminManagement from "../../../../../../libs/common-ui/src/auth/AdminManagement";

export default function AdminUsersPage() {
  const { user, isAuthenticated } = useAdminAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please log in to access user management.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <AdminManagement currentUser={user} />
    </div>
  );
}
