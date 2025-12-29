"use client";

import React from "react";
import { AdminLayout as SharedAdminLayout } from "@elzatona/common-ui";
// ThemeProvider is already provided by root layout
import "../../globals.css";

interface AdminLayoutProps {
  readonly children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <SharedAdminLayout>{children}</SharedAdminLayout>;
}
