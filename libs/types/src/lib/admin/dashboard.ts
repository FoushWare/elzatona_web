/**
 * Admin Dashboard Types
 * Shared types for admin dashboard functionality
 * v1.0
 */

import { LucideIcon } from "lucide-react";

// Quick Action - used in AdminDashboardTemplate
export interface AdminQuickAction {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
}
