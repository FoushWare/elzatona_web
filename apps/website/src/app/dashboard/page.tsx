'use client';

import dynamic from 'next/dynamic';

// Lazy-load from the shared-components barrel export
const EnhancedUserDashboard = dynamic(
  () =>
    import('@elzatona/shared-components').then(m => m.EnhancedUserDashboard),
  { ssr: false }
);

export default function DashboardPage() {
  return <EnhancedUserDashboard />;
}
