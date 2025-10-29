'use client';

import dynamic from 'next/dynamic';

// Import directly from module path to ensure a defined component
const EnhancedDashboard = dynamic(
  () =>
    import('@elzatona/shared-components/lib/common/EnhancedDashboard').then(
      mod => mod.default
    ),
  { ssr: false }
);

export default function DashboardPage() {
  return <EnhancedDashboard />;
}
