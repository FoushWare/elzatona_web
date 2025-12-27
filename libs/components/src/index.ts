export * from "./components/ui";
export * from "./components/admin";
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
export { Button } from "./ui/button";
export { Badge } from "./ui/badge";
export { Progress } from "./ui/progress";
export { Skeleton } from "./ui/skeleton";
export { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
export { Switch } from "./ui/switch";
export { Input } from "./ui/input";
export { Label } from "./ui/label";
export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
export { ToastContainer, useToast } from "./common/Toast";
export { BulkOperations } from "./admin/BulkOperations";
export { CategoryForm } from "./forms/CategoryForm";
export { TopicForm } from "./forms/TopicForm";
export { QuestionForm } from "./forms/QuestionForm";
export { CardForm } from "./forms/CardForm";
export { PlanForm } from "./forms/PlanForm";
export { Modal } from "./ui/modal";
export { Alert, AlertTitle, AlertDescription } from "./ui/alert";
export { EmptyState } from "./ui/empty-state";
export { SignInPopup } from "./auth/SignInPopup";
export { default as AdminNavbar } from "./auth/AdminNavbar";
export { default as AdminLoginNavbar } from "./auth/AdminLoginNavbar";
export { default as NavbarSimple } from "./common/NavbarSimple";
export { default as FirestoreErrorBoundary } from "./common/FirestoreErrorBoundary";
export { default as FrontendTaskEditor } from "./admin/FrontendTaskEditor";
export { default as ProblemSolvingEditor } from "./admin/ProblemSolvingEditor";
export {
  default as ClientCodeRunner,
  type TestCase,
} from "./admin/ClientCodeRunner";
export { NotificationContainer } from "./ui/Notification";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
export {
  QuestionContent,
  isValidCode,
  formatCodeContent,
} from "./QuestionContent";
export { FormModal, type FormModalProps } from "./common/FormModal";
export { Separator } from "./ui/separator";
export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./ui/collapsible";
export { ActivityFeed } from "./components/organisms/ActivityFeed";

// Atomic Design Components
export * from "./components/atoms";
export * from "./components/molecules";
export * from "./components/organisms";
export * from "./components/templates";
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
