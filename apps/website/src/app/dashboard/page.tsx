'use client';

import dynamic from 'next/dynamic';

// Lazy-load directly from module default export to avoid named export ambiguity
const EnhancedUserDashboard = dynamic(
  () =>
    import('@elzatona/shared-components/lib/common/EnhancedUserDashboard').then(
      mod => mod.default
    ),
  { ssr: false }
);

export default function DashboardPage() {
  return <EnhancedUserDashboard />;
}
