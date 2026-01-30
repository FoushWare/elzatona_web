"use client";

import { useEffect } from "react";

export default function AdminRedirectPage() {
  useEffect(() => {
    // Redirect to the admin app on port 3001
    globalThis.location.href = "http://localhost:3001/admin";
  }, []);

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-4">Redirecting to Admin Dashboard...</h1>
        <p className="text-gray-600 mb-4">Taking you to the admin application</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-sm text-gray-500 mt-4">
          If you are not redirected, <a href="http://localhost:3001/admin" className="text-blue-600 underline">click here</a>
        </p>
      </div>
    </div>
  );
}
