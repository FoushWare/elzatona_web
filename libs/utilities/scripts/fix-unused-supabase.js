#!/usr/bin/env node
/**
 * Fix unused supabase variables by prefixing with _
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const files = [
  "libs/components/src/lib/auth/AdminManagement.tsx",
  "libs/components/src/lib/auth/SignInGuidanceDetector.tsx",
  "libs/components/src/lib/common/AddToFlashcard.tsx",
  "libs/components/src/lib/common/ComprehensiveGuidanceDetector.tsx",
  "libs/components/src/lib/common/ErrorBoundary.tsx",
  "libs/components/src/lib/common/FeatureDetailsModal.tsx",
  "libs/components/src/lib/common/FilterButton.tsx",
  "libs/components/src/lib/common/FirstTimeVisitorDetector.tsx",
  "libs/components/src/lib/common/FirstVisitDetector.tsx",
  "libs/components/src/lib/common/FirstVisitModal.tsx",
  "libs/components/src/lib/common/GitHubIssuesCard.tsx",
  "libs/components/src/lib/common/GuidedTour.tsx",
  "libs/components/src/lib/common/LanguageSwitcher.tsx",
  "libs/components/src/lib/common/ModeSpecificOnboarding.tsx",
  "libs/components/src/lib/common/NavbarSimple.tsx",
  "libs/components/src/lib/common/OnboardingSystem.tsx",
  "libs/components/src/lib/common/OnboardingTour.tsx",
  "libs/components/src/lib/common/OnboardingTrigger.tsx",
  "libs/components/src/lib/common/PerformanceMonitor.tsx",
  "libs/components/src/lib/common/ProgressIndicator.tsx",
  "libs/components/src/lib/common/QuestionSectionAssigner.tsx",
  "libs/components/src/lib/common/SectionConfigManager.tsx",
  "libs/components/src/lib/common/SectionQuestionCountManager.tsx",
  "libs/components/src/lib/common/SectionQuestionManager.tsx",
  "libs/components/src/lib/common/StatisticsCard.tsx",
  "libs/components/src/lib/common/TopicManager.tsx",
  "libs/components/src/lib/common/UserGuidanceSystem.tsx",
  "libs/components/src/lib/common/UserStatistics.tsx",
  "libs/components/src/lib/common/UserStatisticsSafe.tsx",
  "libs/components/src/lib/common/WelcomeBanner.tsx",
  "libs/contexts/src/lib/MobileMenuContext.tsx",
  "libs/contexts/src/lib/NotificationContext.tsx",
  "libs/contexts/src/lib/OnboardingContext.tsx",
  "libs/contexts/src/lib/ThemeContext.tsx",
  "libs/contexts/src/lib/UserTypeContextSafe.tsx",
];

let fixedCount = 0;

files.forEach((file) => {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");
  const originalContent = content;

  // Replace const supabase = with const _supabase =
  content = content.replace(/const supabase = /g, "const _supabase = ");

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Fixed: ${file}`);
    fixedCount++;
  }
});

console.log(`\n✨ Fixed ${fixedCount} files`);
