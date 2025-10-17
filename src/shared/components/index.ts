// Shared Components Index
// This file provides easy imports for all shared components

// UI Components
export * from './ui/button';
export * from './ui/card';
export * from './ui/input';
export * from './ui/textarea';
export * from './ui/select';
export * from './ui/checkbox';
export * from './ui/switch';
export * from './ui/tabs';
export * from './ui/dialog';
export * from './ui/popover';
export * from './ui/alert';
export * from './ui/badge';
export * from './ui/progress';
export * from './ui/label';
export * from './ui/calendar';
export * from './ui/collapsible';
export * from './ui/Notification';
export * from './ui/CelebrationModal';
export * from './ui/ConfirmationDialog';

// Learning Components
export { LearningPathCard } from './learning/LearningPathCard';
export { default as LearningPathQuestions } from './learning/LearningPathQuestions';
export { default as LearningPathWithProgress } from './learning/LearningPathWithProgress';
export { LearningPathsGrid } from './learning/LearningPathsGrid';
// export { LearningModeSwitcher } from './learning/LearningModeSwitcher';
export { LearningModeDetector } from './learning/LearningModeDetector';
export { GuidedPractice } from './learning/GuidedPractice';
export { GuidedAnalytics } from './learning/GuidedAnalytics';
export { FreeStyleRoadmapBuilder } from './learning/FreeStyleRoadmapBuilder';
export { SectorCard } from './learning/SectorCard';
export { default as ChallengeWithProgress } from './learning/ChallengeWithProgress';
export { default as QuestionWithProgress } from './learning/QuestionWithProgress';

// Additional Learning Components (moved from main components)
export { default as BehaviorQuestion } from './learning/BehaviorQuestion';
export { default as CompanyQuestionSection } from './learning/CompanyQuestionSection';
export { default as ContinueWhereLeftOff } from './learning/ContinueWhereLeftOff';
export { default as FirebaseQuestion } from './learning/FirebaseQuestion';
export { default as Flashcard } from './learning/Flashcard';
export { default as FlashcardDashboard } from './learning/FlashcardDashboard';
export { default as FlashcardSession } from './learning/FlashcardSession';
export { default as JavaScriptQuestionCard } from './learning/JavaScriptQuestionCard';
export { MarkdownQuestionExtractor } from './learning/MarkdownQuestionExtractor';
export { OpenEndedQuestion } from './learning/OpenEndedQuestion';
// export { default as QuestionAudioManager } from './learning/QuestionAudioManager';
export { QuestionCreationForm } from './learning/QuestionCreationForm';
export { default as QuestionCreator } from './learning/QuestionCreator';
export { QuestionEditModal } from './learning/QuestionEditModal';
export { default as QuestionManager } from './learning/QuestionManager';
export { QuestionViewModal } from './learning/QuestionViewModal';
export { default as SectionManager } from './learning/SectionManager';
export { SectionQuestionsManager } from './learning/SectionQuestionsManager';
export { default as SolutionDisplay } from './learning/SolutionDisplay';
export { default as TestRunner } from './learning/TestRunner';
export { TopicManager } from './learning/TopicManager';
export { TopicSelector } from './learning/TopicSelector';
// export { default as UnifiedQuestionManager } from './learning/UnifiedQuestionManager';

// Auth Components
export { SignInPopup } from './auth/SignInPopup';
export { SignInGuidance } from './auth/SignInGuidance';
export { SignInGuidanceDetector } from './auth/SignInGuidanceDetector';
export { default as ProtectedRoute } from './auth/ProtectedRoute';
export { default as AdminLoginNavbar } from './auth/AdminLoginNavbar';
export { default as AdminNavbar } from './auth/AdminNavbar';
export { default as AdminLayout } from './auth/AdminLayout';
export { default as AdminManagement } from './auth/AdminManagement';

// Common Components
export { EmptyState } from './common/EmptyState';
export { LoadingTransition } from './common/LoadingTransition';
export { default as ErrorBoundary } from './common/ErrorBoundary';
export { default as FirestoreErrorBoundary } from './common/FirestoreErrorBoundary';
export { default as Toast } from './common/Toast';
export { default as DarkModeToggle } from './common/DarkModeToggle';
export { LanguageSwitcher } from './common/LanguageSwitcher';
export { AlzatonaLogo } from './common/AlzatonaLogo';
export { default as Navbar } from './common/Navbar';
export { default as NavbarSimple } from './common/NavbarSimple';
export { default as Navigation } from './common/Navigation';
export { PageHeader } from './common/PageHeader';
export { StatisticsCard } from './common/StatisticsCard';
export { StatisticsSection } from './common/StatisticsSection';
export { default as ProgressTracker } from './common/ProgressTracker';
export { ProgressIndicator } from './common/ProgressIndicator';
export { default as ProgressAnalytics } from './common/ProgressAnalytics';
export { UserStatistics } from './common/UserStatistics';
export { default as UserTypeSelector } from './common/UserTypeSelector';
export { WelcomeBanner } from './common/WelcomeBanner';
export { default as VideoEmbed } from './common/VideoEmbed';
export { default as OptimizedImage } from './common/OptimizedImage';
export { default as ExpandableText } from './common/ExpandableText';
export { CallToAction } from './common/CallToAction';
export { default as ResourceCard } from './common/ResourceCard';
export { default as InternalResourceCard } from './common/InternalResourceCard';
export { default as CategoryCard } from './common/CategoryCard';
export { default as ChallengeCard } from './common/ChallengeCard';
export { FilterButton } from './common/FilterButton';
export { FilterButtons } from './common/FilterButtons';
export { default as MobilePagination } from './common/MobilePagination';
export { default as LayoutWrapper } from './common/LayoutWrapper';

// Additional Common Components (moved from main components)
export { AIInterviewerAgent } from './common/AIInterviewerAgent';
export { default as AddToFlashcard } from './common/AddToFlashcard';
export { default as BulkQuestionUploader } from './common/BulkQuestionUploader';
export { default as ChatGPT } from './common/ChatGPT';
export { default as CodeEditor } from './common/CodeEditor';
export { ComprehensiveGuidanceDetector } from './common/ComprehensiveGuidanceDetector';
export { default as DailyApiKeyInput } from './common/DailyApiKeyInput';
export { DailyVideoCall } from './common/DailyVideoCall';
export { ConditionalLayout } from './common/ConditionalLayout';
export { default as EnhancedDashboard } from './common/EnhancedDashboard';
export { default as EnhancedUserDashboard } from './common/EnhancedUserDashboard';
export { default as FeatureDetailsModal } from './common/FeatureDetailsModal';
export { FirstTimeVisitorDetector } from './common/FirstTimeVisitorDetector';
export { FirstVisitDetector } from './common/FirstVisitDetector';
export { FirstVisitModal } from './common/FirstVisitModal';
export { default as GitHubIssuesCard } from './common/GitHubIssuesCard';
export { GuidedTour } from './common/GuidedTour';
export { ModeSpecificOnboarding } from './common/ModeSpecificOnboarding';
export { OnboardingSystem } from './common/OnboardingSystem';
export { default as OnboardingTour } from './common/OnboardingTour';
export { OnboardingTrigger } from './common/OnboardingTrigger';
export { default as PerformanceMonitor } from './common/PerformanceMonitor';
export { UserGuidanceSystem } from './common/UserGuidanceSystem';
