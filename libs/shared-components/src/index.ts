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
// Re-export commonly used UI primitives for app imports
export { Button } from './lib/ui/button';
export { Badge } from './lib/ui/badge';
export { Progress } from './lib/ui/progress';
export { Card, CardContent, CardHeader, CardTitle } from './lib/ui/card';
export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './lib/ui/select';
export { ToastContainer, useToast } from './lib/common/Toast';
export { BulkOperations } from './lib/admin/BulkOperations';
export { CategoryForm } from './lib/forms/CategoryForm';
export { TopicForm } from './lib/forms/TopicForm';
export { QuestionForm } from './lib/forms/QuestionForm';
export { CardForm } from './lib/forms/CardForm';
export { PlanForm } from './lib/forms/PlanForm';
export { Modal } from './lib/ui/modal';
export { Alert, AlertTitle, AlertDescription } from './lib/ui/alert';
