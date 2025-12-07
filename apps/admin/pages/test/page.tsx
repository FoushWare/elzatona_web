"use client";

import { useAdminAuth } from "@elzatona/contexts";

export default function TestPage() {
  const { isAuthenticated, isLoading, user } = useAdminAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>
      <div className="space-y-2">
        <p>
          <strong>Loading:</strong> {isLoading ? "true" : "false"}
        </p>
        <p>
          <strong>Authenticated:</strong> {isAuthenticated ? "true" : "false"}
        </p>
        <p>
          <strong>User:</strong> {user ? JSON.stringify(user, null, 2) : "null"}
        </p>
      </div>
    </div>
  );
}
