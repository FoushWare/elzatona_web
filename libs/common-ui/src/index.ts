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
// Content Management Organisms
export { StatsSection } from "./admin/content-management/StatsSection";
export { SearchAndFilters } from "./admin/content-management/SearchAndFilters";
export { LearningCardsManager } from "./admin/content-management/LearningCardsManager";
export { PlansManager } from "./admin/content-management/PlansManager";
export { TopicsManager } from "./admin/content-management/TopicsManager";
export { CategoriesManager } from "./admin/content-management/CategoriesManager";
// Content Management Modals
export { TopicQuestionsModal } from "./admin/content-management/modals/TopicQuestionsModal";
export { DeleteConfirmationModal } from "./admin/content-management/modals/DeleteConfirmationModal";
export { CardManagementModal } from "./admin/content-management/modals/CardManagementModal";

// Admin Questions
export * from "./admin/questions/QuestionForm";
export * from "./admin/questions/QuestionsList";
export * from "./admin/questions/QuestionItem";
export * from "./admin/questions/FiltersCard";
export * from "./admin/questions/StatsCards";
export * from "./admin/questions/CategoriesOverview";
export * from "./admin/questions/PaginationControls";

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

// Problem Solving Feature
export { ProblemSolver } from "./features/problem-solving/ProblemSolver";
export { useProblemSolver } from "./features/problem-solving/ProblemSolverHooks";
