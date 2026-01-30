"use client";

import React from "react";

interface AdminLayoutProps {
  readonly children: React.ReactNode;
}

/**
 * Admin Layout - Redirect Only
 *
 * Admin functionality has been moved to the dedicated admin app (port 3001).
 * This layout simply wraps the redirect page.
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</div>
  );
}
