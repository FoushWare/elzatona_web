"use client";

import { usePathname } from "next/navigation";
import { NavbarSimple } from "@elzatona/common-ui";

/**
 * ConditionalNavbar Component
 * Renders NavbarSimple only on non-admin routes
 * Admin routes use AdminNavbar from admin layout
 */
export function ConditionalNavbar() {
  const pathname = usePathname();

  // Hide website navbar on admin routes
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return null;
  }

  return <NavbarSimple />;
}
