"use client";

import { usePathname } from "next/navigation";
import { AdminNavbar, SimpleAdminNavbar } from "@elzatona/components";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Use simple navbar for login page
  if (pathname === "/admin/login") {
    return <SimpleAdminNavbar />;
  }

  // Use full navbar for all other admin pages
  return <AdminNavbar />;
}
