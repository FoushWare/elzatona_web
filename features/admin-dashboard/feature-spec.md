# Feature: Admin Dashboard

## Overview

The Admin Dashboard provides a high-level overview of the Elzatona platform's metrics, including counts for questions, learning cards, plans, categories, and topics. It serves as the primary gateway for administrators to monitor the health and growth of the content and user base.

## User Flow

1. **Initial Load**: After successful login, the user is redirected to `/admin/dashboard`.
2. **Statistics Rendering**:
   - The dashboard calls `GET /api/admin/dashboard-stats`.
   - Statistics display in numeric cards: "Total Questions", "Learning Cards", "Learning Plans", etc.
3. **Data Refresh**: Statistics are fetched once on initial load and can be refreshed by reloading the page.
4. **Navigation**: Quick links allow the admin to jump from the dashboard to specific management areas (e.g., Question Management, User Management).

## Key Files

- `apps/admin/src/app/admin/dashboard/page.tsx`: Main dashboard container.
- `apps/admin/src/app/api/admin/dashboard-stats/route.ts`: API route for aggregating statistics.
- `@elzatona/common-ui/components/AdminDashboard`: Reusable dashboard component used across phases.

## API Endpoints

- `GET /api/admin/dashboard-stats`: Returns aggregated counts for all content entities.

## Test Scenarios

### Happy Path

1. **Dashboard Statistics Load**: Visiting `/admin/dashboard` correctly displays all counts from the database.
2. **Accurate Counts**: Each statistic card reflects the actual number of items in its corresponding database table.

### Edge Cases

1. **Empty State**: If no items exist for a category (e.g., zero plans), the dashboard displays "0" instead of failing or showing `undefined`.
2. **Partial Data Failure**: If one statistic fails (e.g., user count), other statistics still load and display appropriately.

### Error States

1. **Table Mismatch**: Handles errors if expected tables (like `plans`, `users`) are renamed or missing by showing a fallback or descriptive error.
2. **Unauthorized Access**: Prevents unauthenticated users from accessing the statistics API directly.
