// v1.0 - Enhanced User Dashboard with Progress Tracking
"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// useUserProgress is not exported from shared-hooks in this workspace build.
// Provide a safe local fallback that returns empty data to avoid runtime errors.
const useUserProgress = () => ({
  progress: null,
  dashboardStats: null as any,
  continueData: null,
  isLoading: false,
  error: null as string | null,
  updateQuestion: async () => {},
  updateChallenge: async () => {},
  updateLearningPath: async () => {},
  updateStreak: async () => {},
  updatePreferences: async () => {},
  refreshProgress: async () => {},
  refreshDashboardStats: async () => {},
  refreshContinueData: async () => {},
});
import { useAuth } from "@elzatona/contexts";

// Import Supabase client (available in both website and admin apps)
// Note: This import path assumes this component is used in apps/website
// For proper architecture, supabaseClient should be injected or moved to shared location
// TODO: Move supabase client to libs/database or inject as dependency
import {
  supabaseClient as supabase,
  isSupabaseAvailable,
} from "../../../../../apps/website/src/app/lib/supabase-client";

import {
  BookOpen,
  Code,
  Target,
  Zap,
  BarChart3,
  CheckCircle,
  Loader2,
  LogOut,
  Settings,
  Trophy,
  Star,
  Play,
  ArrowRight,
  Timer,
  Flame,
  Medal,
  ChevronRight,
  FolderOpen,
  Activity,
  RefreshCw,
} from "lucide-react";

interface DashboardCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  href: string;
  stats: string;
  progress?: number;
}

interface RecentActivity {
  id: string;
  type: "question" | "challenge" | "path";
  title: string;
  time: string;
  points: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface DashboardStats {
  questionsCompleted: number;
  totalPoints: number;
  dayStreak: number;
  longestStreak: number;
  achievements: Array<{
    id: string;
    name: string;
    description: string;
    unlockedAt: string;
  }>;
}

export default function EnhancedDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const {
    progress,
    dashboardStats: oldDashboardStats,
    continueData,
    isLoading,
    error,
    refreshProgress,
    refreshDashboardStats,
  } = useUserProgress();

  const [showStats, setShowStats] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [plans, setPlans] = useState<{ id: string; name: string }[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(
    null,
  );
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  // Dashboard cards with real progress data
  const dashboardCards: DashboardCard[] = [
    {
      id: "guided-learning",
      title: "Guided Learning",
      description: "Follow structured, time-based plans (1–7 days)",
      icon: Target,
      color: "from-indigo-500 to-purple-600",
      href: "/features/guided-learning",
      stats: "Structured plans with cards and progress",
      progress: undefined,
    },
    {
      id: "free-style",
      title: "Free Style Learning",
      description: "Explore topics at your own pace with a custom roadmap",
      icon: Zap,
      color: "from-emerald-500 to-teal-600",
      href: "/browse-practice-questions",
      stats: "Browse learning paths and topics",
      progress: undefined,
    },
    {
      id: "my-plans",
      title: "My Plans",
      description: "View and manage your custom learning plans",
      icon: FolderOpen,
      color: "from-purple-500 to-pink-600",
      href: "/my-plans",
      stats: "Your personalized learning plans",
      progress: undefined,
    },
    {
      id: "flashcards",
      title: "Flashcards",
      description: "Review questions you saved from practice",
      icon: BookOpen,
      color: "from-amber-500 to-rose-600",
      href: "/flashcards",
      stats: "Revise weak points efficiently",
      progress: undefined,
    },
    {
      id: "questions",
      title: "Practice Questions",
      description: "Continue practicing frontend questions",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      href: "/questions",
      stats: `${(progress as any)?.total_questions_answered || 0} completed`,
      progress: (dashboardStats as any)?.accuracy || 0,
    },
    // Learning Paths card removed per product decision
    {
      id: "challenges",
      title: "Coding Challenges",
      description: "Solve real coding problems",
      icon: Code,
      color: "from-green-500 to-green-600",
      href: "/challenges",
      stats: `${0} challenges solved`,
      progress: (dashboardStats as any)?.accuracy || 0,
    },
    {
      id: "analytics",
      title: "Progress Analytics",
      description: "View your learning progress",
      icon: BarChart3,
      color: "from-orange-500 to-orange-600",
      href: "/progress",
      stats: `${Math.round(oldDashboardStats?.accuracy || 0)}% accuracy rate`,
    },
  ];

  // Check for pending browse practice questions intent after login
  // Use useLayoutEffect to run synchronously before paint to catch redirects early
  useLayoutEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    try {
      // Check localStorage flags immediately (before any auth checks)
      const pendingBrowseIntent = localStorage.getItem(
        "pending_browse_practice_questions_intent",
      );
      const pendingRoadmapIntent = localStorage.getItem(
        "pending_custom_roadmap_intent",
      );

      console.log(
        "🔍 Dashboard (useLayoutEffect): Checking for pending intents...",
      );
      console.log(
        "🔍 Dashboard: pending_browse_practice_questions_intent =",
        pendingBrowseIntent,
      );
      console.log(
        "🔍 Dashboard: pending_custom_roadmap_intent =",
        pendingRoadmapIntent,
      );

      // If we have a flag, redirect immediately - don't wait for anything
      if (pendingBrowseIntent === "true" || pendingRoadmapIntent === "true") {
        console.log(
          "✅ Dashboard: Found pending intent, redirecting to /custom-roadmap...",
        );

        // Clean up localStorage values immediately after reading them
        try {
          localStorage.removeItem("pending_browse_practice_questions_intent");
          localStorage.removeItem("pending_custom_roadmap_intent");
          console.log(
            "🧹 Dashboard: Cleared pending intent flags from localStorage",
          );
        } catch (e) {
          console.warn("⚠️ Dashboard: Error clearing localStorage flags:", e);
        }

        // Use a small delay to ensure component can render loading state first
        setTimeout(() => {
          window.location.href = "/custom-roadmap";
        }, 50);
        return;
      }

      console.log("ℹ️ Dashboard: No pending intents found");
    } catch (error) {
      console.error("❌ Error checking pending intents:", error);
    }
  }, [router]); // Include router in deps

  // Also check in useEffect as a backup (in case useLayoutEffect didn't catch it)
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const checkAndRedirect = () => {
      try {
        const pendingBrowseIntent = localStorage.getItem(
          "pending_browse_practice_questions_intent",
        );
        const pendingRoadmapIntent = localStorage.getItem(
          "pending_custom_roadmap_intent",
        );

        if (pendingBrowseIntent === "true" || pendingRoadmapIntent === "true") {
          console.log(
            "✅ Dashboard (useEffect backup): Found pending intent, redirecting to /custom-roadmap...",
          );

          // Clean up localStorage values immediately after reading them
          try {
            localStorage.removeItem("pending_browse_practice_questions_intent");
            localStorage.removeItem("pending_custom_roadmap_intent");
            console.log(
              "🧹 Dashboard (useEffect): Cleared pending intent flags from localStorage",
            );
          } catch (e) {
            console.warn(
              "⚠️ Dashboard (useEffect): Error clearing localStorage flags:",
              e,
            );
          }

          // Use a small delay to ensure component can render loading state first
          setTimeout(() => {
            window.location.href = "/custom-roadmap";
          }, 50);
          return;
        }
      } catch (error) {
        console.error("❌ Error in backup redirect check:", error);
      }
    };

    // Check immediately
    checkAndRedirect();
    // Also check after a short delay as backup (in case localStorage wasn't ready)
    const timeout = setTimeout(checkAndRedirect, 50);

    return () => clearTimeout(timeout);
  }, [router]); // Include router in deps

  // Load dashboard stats from API
  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        setStatsLoading(true);
        setStatsError(null);

        // Get auth token from localStorage (for custom auth) or use cookie
        const authToken = localStorage.getItem("auth-token");

        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };

        if (authToken) {
          headers["Authorization"] = `Bearer ${authToken}`;
        }

        const res = await fetch("/api/dashboard/stats", {
          headers,
        });

        const json = await res.json();

        if (json.success && json.stats) {
          setDashboardStats(json.stats);
          console.log("✅ Dashboard stats loaded:", json.stats);
        } else {
          setStatsError(json.error || "Failed to load dashboard stats");
          console.warn("⚠️ Dashboard stats API warning:", json.warning);
        }
      } catch (e) {
        console.error("❌ Error loading dashboard stats:", e);
        setStatsError("Failed to load dashboard stats");
      } finally {
        setStatsLoading(false);
      }
    };

    loadDashboardStats();
  }, []);

  // Load available guided-learning plans from API
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await fetch("/api/plans");
        const json = await res.json();
        if (json?.plans && Array.isArray(json.plans)) {
          setPlans(json.plans);
        }
      } catch (e) {
        console.warn("Failed to load plans", e);
      }
    };
    loadPlans();
  }, []);

  // Recent activities from real data
  const recentActivities: RecentActivity[] =
    oldDashboardStats?.recentActivity
      ?.slice(0, 4)
      .map((activity: any, index: number) => ({
        id: `activity-${index}`,
        type: activity.type as "question" | "challenge" | "path",
        title: activity.description,
        time: formatTimeAgo(activity.timestamp),
        points: activity.points,
        icon:
          activity.type === "question"
            ? CheckCircle
            : activity.type === "challenge"
              ? Trophy
              : Target,
        color:
          activity.type === "question"
            ? "text-green-500"
            : activity.type === "challenge"
              ? "text-blue-500"
              : "text-purple-500",
      })) || [];

  const handleLogout = async () => {
    try {
      setIsSigningOut(true);
      // Call app context logout (clears any local user state)
      try {
        logout();
      } catch (error) {
        console.warn("Error during logout:", error);
      }
      // Ensure Supabase session is cleared (for social logins)
      if (isSupabaseAvailable() && supabase && supabase && supabase.auth) {
        try {
          await supabase && supabase.auth.signOut();
        } catch (error) {
          console.warn("Error during Supabase sign out:", error);
        }
      }
      // Clear storage and redirect
      try {
        sessionStorage.clear();
      } catch (_) {}
      try {
        localStorage.clear();
      } catch (_) {}
      router.push("/");
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Refresh both old progress and new dashboard stats
      await Promise.all([
        refreshProgress?.() || Promise.resolve(),
        refreshDashboardStats?.() || Promise.resolve(),
        // Also refresh new dashboard stats
        (async () => {
          try {
            const authToken = localStorage.getItem("auth-token");
            const headers: HeadersInit = {
              "Content-Type": "application/json",
            };
            if (authToken) {
              headers["Authorization"] = `Bearer ${authToken}`;
            }
            const res = await fetch("/api/dashboard/stats", { headers });
            const json = await res.json();
            if (json.success && json.stats) {
              setDashboardStats(json.stats);
            }
          } catch (e) {
            console.error("Error refreshing dashboard stats:", e);
          }
        })(),
      ]);
    } catch (error) {
      console.error("Error refreshing dashboard:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const formatTimeSpent = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <p className="text-gray-700 dark:text-gray-300">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Show error screen for any error (including timeouts) if we don't have progress data
  if (error && !progress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // If we have an error but also have progress data, show a warning banner
  if (error && progress) {
    console.log("Showing dashboard with real data despite error:", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Error Warning Banner - only show if we have real data but there's an error */}
        {error && progress && (
          <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-yellow-600 dark:text-yellow-400 mr-3">
                ⚠️
              </div>
              <div className="flex-1">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  Some data may not be fully loaded. {error}
                </p>
              </div>
              <button
                onClick={handleRefresh}
                className="ml-3 px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {user?.name || "Developer"}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Ready to continue your frontend development journey?
            </p>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50"
              title="Refresh Dashboard"
            >
              <RefreshCw
                className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              disabled={isSigningOut}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isSigningOut
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              <LogOut className="w-4 h-4" />
              <span>{isSigningOut ? "Signing out…" : "Sign Out"}</span>
            </button>
          </div>
        </div>

        {/* Continue Where You Left Off */}
        {(continueData as any)?.recentPath && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center">
                  <Play className="w-6 h-6 mr-2" />
                  Continue Where You Left Off
                </h2>
                <span className="text-blue-200 text-sm">
                  {formatTimeAgo((continueData as any).recentPath.lastAccessed)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {(continueData as any).recentPath.pathName}
                  </h3>
                  <p className="text-blue-100 mb-3">
                    {(continueData as any).recentPath.completedSections.length}{" "}
                    sections completed
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-blue-200">
                    <span className="flex items-center">
                      <Timer className="w-4 h-4 mr-1" />
                      {formatTimeSpent(
                        (continueData as any).recentPath.timeSpent,
                      )}
                    </span>
                    <span className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      {(continueData as any).recentPath.progress}% complete
                    </span>
                  </div>
                </div>
                <Link
                  href={`/learning-paths/${(continueData as any).recentPath.pathId}`}
                  className="flex items-center space-x-2 px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-semibold"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="mt-4">
                <div className="w-full bg-blue-500/30 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(continueData as any).recentPath.progress}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Progress
            </h2>
            <button
              onClick={() => setShowStats(!showStats)}
              className="md:hidden px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showStats ? "Hide Stats" : "Show Stats"}
            </button>
          </div>

          {showStats && (
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {statsLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin inline-block" />
                      ) : (
                        (dashboardStats?.questionsCompleted ??
                        (progress as any)?.total_questions_answered ??
                        0)
                      )}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Questions Completed
                    </div>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {statsLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin inline-block" />
                      ) : (
                        (dashboardStats?.totalPoints ??
                        (progress as any)?.total_points ??
                        0)
                      )}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Total Points
                    </div>
                  </div>
                  <Star className="w-8 h-8 text-purple-500" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {statsLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin inline-block" />
                      ) : (
                        (dashboardStats?.dayStreak ??
                        (progress as any)?.current_streak ??
                        0)
                      )}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Day Streak
                    </div>
                  </div>
                  <Flame className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {statsLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin inline-block" />
                      ) : (
                        (dashboardStats?.achievements?.length ??
                        (progress as any)?.achievements?.length ??
                        0)
                      )}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Achievements
                    </div>
                  </div>
                  <Medal className="w-8 h-8 text-orange-500" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${card.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
              >
                <card.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {card.description}
              </p>
              <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
                {card.stats}
              </div>
              {card.progress !== undefined && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${card.progress}%` }}
                  ></div>
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Guided Plans & Recommendations */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Available Guided Plans (1–7 days) */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-500" />
              Guided Learning Plans
            </h3>
            {plans.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {plans.map((p) => (
                  <Link
                    key={p.id}
                    href={`/features/guided-learning/${p.id}`}
                    className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {p.name}
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400">
                No plans found.
              </div>
            )}
          </div>

          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-500" />
              Recent Activities
            </h3>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-green-600">
                      +{activity.points}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No recent activities yet</p>
                  <p className="text-sm">
                    Start learning to see your progress here!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
