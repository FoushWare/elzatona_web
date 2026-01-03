import React from "react";
import { AdminLayout as SharedAdminLayout } from "@elzatona/common-ui";
// ThemeProvider and globals.css are already provided by _app.tsx

interface AdminLayoutProps {
  readonly children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <SharedAdminLayout>{children}</SharedAdminLayout>;
}
