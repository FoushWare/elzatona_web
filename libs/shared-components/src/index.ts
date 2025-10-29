export * from './lib/components/ui';
export * from './lib/components/admin';
export * from './lib/components/common/AdvancedSearch';
export * from './lib/utils';
// Export specific common components that are needed
export { ErrorBoundary, UserStatistics } from './lib/common';
// Removed problematic auth components that have import issues
// export * from './lib';
// Explicitly export dashboards required by website app
export { default as EnhancedDashboard } from './lib/common/EnhancedDashboard';
export { default as EnhancedUserDashboard } from './lib/common/EnhancedUserDashboard';
