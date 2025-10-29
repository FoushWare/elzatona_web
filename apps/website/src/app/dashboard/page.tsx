'use client';

import dynamic from 'next/dynamic';

// Lazy-load the dashboard component to avoid SSR issues
const EnhancedUserDashboard = dynamic(
  () => import('@elzatona/shared-components/lib/common/EnhancedUserDashboard'),
  { ssr: false }
);

export default function DashboardPage() {
  return <EnhancedUserDashboard />;
}
