export * from "./components/ui";
export * from "./admin/components";
export * from "./components/common/AdvancedSearch";
export * from "./utils";
// Export specific common components that are needed
export { ErrorBoundary, UserStatistics } from "./common";
// Removed problematic auth components that have import issues
// export * from './lib';
// Explicitly export dashboards required by website app
export { default as EnhancedDashboard } from "./common/EnhancedDashboard";
export { default as EnhancedUserDashboard } from "./common/EnhancedUserDashboard";
// Re-export commonly used UI primitives for app imports
export { Button } from "./components/ui/button";
export { Badge } from "./components/ui/badge";
export { Progress } from "./components/ui/progress";
export { Skeleton } from "./components/ui/skeleton";
export { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
export { Switch } from "./components/ui/switch";
export { Input } from "./components/ui/input";
export { Label } from "./components/ui/label";
export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
export { ToastContainer, useToast } from "./common/Toast";
export { BulkOperations } from "./admin/editors/BulkOperations";
export { default as FrontendTaskEditor } from "./admin/editors/FrontendTaskEditor";
export { default as ProblemSolvingEditor } from "./admin/editors/ProblemSolvingEditor";
export {
  default as ClientCodeRunner,
  type TestCase,
} from "./admin/editors/ClientCodeRunner";
export { default as AdminNavbar } from "./admin/components/AdminNavbar";
export { default as AdminDashboard } from "./admin/components/AdminDashboard";
export { default as AdminLoginForm } from "./admin/components/AdminLoginForm";
export { CategoryForm } from "./forms/CategoryForm";
export { TopicForm } from "./forms/TopicForm";
export { QuestionForm } from "./forms/QuestionForm";
export { CardForm } from "./forms/CardForm";
export { PlanForm } from "./forms/PlanForm";
export { Modal } from "./components/ui/modal";
export { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
export { EmptyState } from "./components/ui/empty-state";
export { SignInPopup } from "./auth/SignInPopup";
export { default as AdminLoginNavbar } from "./auth/AdminLoginNavbar";
export { default as AdminManagement } from "./auth/AdminManagement";
export { default as NavbarSimple } from "./common/NavbarSimple";
export { default as FirestoreErrorBoundary } from "./common/FirestoreErrorBoundary";
export { NotificationContainer } from "./components/ui/Notification";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./components/ui/dialog";
export {
  QuestionContent,
  isValidCode,
  formatCodeContent,
} from "./QuestionContent";
export { FormModal, type FormModalProps } from "./common/FormModal";
export { Separator } from "./components/ui/separator";
export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./components/ui/collapsible";
export { ActivityFeed } from "./components/organisms/ActivityFeed";

// Atomic Design Components
export * from "./components/atoms";
export * from "./components/molecules";
export * from "./components/organisms";
export * from "./components/templates";
export * from "./components/modals";
export * from "./layouts";
export { ErrorAlert } from "./components/molecules/ErrorAlert";
export type { ErrorAlertPropsType } from "./components/molecules/ErrorAlert";
export { DataTableHeader } from "./components/molecules/DataTableHeader";
export type { DataTableHeaderPropsType } from "./components/molecules/DataTableHeader";
export { WelcomeHeader } from "./components/molecules/WelcomeHeader";
export type { WelcomeHeaderPropsType } from "./components/molecules/WelcomeHeader";
export { MetricGrid } from "./components/organisms/MetricGrid";
export {
  QuickActions,
  type QuickAction,
} from "./components/organisms/QuickActions";
export type { QuickActionsPropsType } from "./components/organisms/QuickActions";
