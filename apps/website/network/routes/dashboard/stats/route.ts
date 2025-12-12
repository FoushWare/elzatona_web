import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { verifySupabaseToken, getUserFromRequest } from "@/lib/server-auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

/**
 * Calculate day streak from activity dates
 */
function calculateStreak(activityDates: string[]): {
  current: number;
  longest: number;
} {
  if (!activityDates || activityDates.length === 0) {
    return { current: 0, longest: 0 };
  }

  // Sort dates and remove duplicates
  const uniqueDates = Array.from(
    new Set(
      activityDates.map((date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      }),
    ),
  ).sort();

  if (uniqueDates.length === 0) {
    return { current: 0, longest: 0 };
  }

  // Calculate longest streak
  let longestStreak = 1;
  let currentLongest = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const prevDate = new Date(uniqueDates[i - 1]);
    const currDate = new Date(uniqueDates[i]);
    const daysDiff = Math.floor(
      (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (daysDiff === 1) {
      currentLongest++;
      longestStreak = Math.max(longestStreak, currentLongest);
    } else {
      currentLongest = 1;
    }
  }

  // Calculate current streak (consecutive days up to today)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  let currentStreak = 0;
  if (uniqueDates.includes(todayStr)) {
    currentStreak = 1;
    const sortedDates = uniqueDates.reverse();
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const currDate = new Date(sortedDates[i]);
      const nextDate = new Date(sortedDates[i + 1]);
      const daysDiff = Math.floor(
        (currDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (daysDiff === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  } else {
    // Check if yesterday was active
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;

    if (uniqueDates.includes(yesterdayStr)) {
      // Check consecutive days before yesterday
      const sortedDates = uniqueDates.reverse();
      const yesterdayIndex = sortedDates.indexOf(yesterdayStr);
      if (yesterdayIndex >= 0) {
        currentStreak = 1;
        for (let i = yesterdayIndex; i < sortedDates.length - 1; i++) {
          const currDate = new Date(sortedDates[i]);
          const nextDate = new Date(sortedDates[i + 1]);
          const daysDiff = Math.floor(
            (currDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24),
          );

          if (daysDiff === 1) {
            currentStreak++;
          } else {
            break;
          }
        }
      }
    }
  }

  return {
    current: currentStreak,
    longest: longestStreak,
  };
}

/**
 * Get user dashboard statistics
 * Aggregates data from all sources: guided learning, free-style practice, question attempts
 */
export async function GET(request: NextRequest) {
  try {
    // Get user ID from authentication
    let userId: string | null = null;

    // Try Authorization header first
    const authUser = await getUserFromRequest(request);
    if (authUser) {
      userId = authUser.id;
    }

    // Fallback to cookie-based auth
    if (!userId) {
      const cookieStore = await cookies();
      const token = cookieStore.get("firebase_token")?.value;
      if (token) {
        const decodedToken = await verifySupabaseToken(token);
        if (decodedToken) {
          userId = decodedToken.id;
        }
      }
    }

    // Fallback: try custom auth token from localStorage (for client-side calls)
    if (!userId) {
      // For development mode, we'll return mock data
      console.log(
        "⚠️ No authenticated user found, returning mock dashboard stats",
      );
      return NextResponse.json({
        success: true,
        stats: {
          questionsCompleted: 0,
          totalPoints: 0,
          dayStreak: 0,
          longestStreak: 0,
          achievements: [],
        },
        warning: "Using development mode - authentication not fully configured",
      });
    }

    console.log("📊 Fetching dashboard stats for user:", userId);

    // 1. Get all question attempts (for questions completed and points)
    const { data: questionAttempts, error: attemptsError } = await supabase
      .from("question_attempts")
      .select("question_id, is_correct, points_earned, created_at")
      .eq("user_id", userId);

    if (attemptsError) {
      console.error("❌ Error fetching question attempts:", attemptsError);
    }

    // 2. Get all user_progress entries (guided learning and free-style)
    const { data: userProgressEntries, error: progressError } = await supabase
      .from("user_progress")
      .select("id, plan_id, progress_data, updated_at, created_at")
      .eq("user_id", userId);

    if (progressError) {
      console.error("❌ Error fetching user progress:", progressError);
    }

    // 3. Aggregate questions completed
    // From question_attempts (unique question_ids)
    const uniqueQuestionIds = new Set<string>();
    const questionAttemptsList = questionAttempts || [];
    questionAttemptsList.forEach((attempt) => {
      if (attempt.question_id) {
        uniqueQuestionIds.add(attempt.question_id);
      }
    });

    // From user_progress (guided learning - completedQuestions array)
    const userProgressList = userProgressEntries || [];
    userProgressList.forEach((entry) => {
      if (entry.progress_data) {
        let progressData: any;
        // Handle both JSON string and object
        if (typeof entry.progress_data === "string") {
          try {
            progressData = JSON.parse(entry.progress_data);
          } catch (e) {
            console.warn("Failed to parse progress_data as JSON:", e);
            return;
          }
        } else {
          progressData = entry.progress_data;
        }

        if (
          progressData.completedQuestions &&
          Array.isArray(progressData.completedQuestions)
        ) {
          progressData.completedQuestions.forEach((qId: string) => {
            uniqueQuestionIds.add(qId);
          });
        }
      }
    });

    // Free-style practice completed questions
    const freeStyleProgress = userProgressList.find(
      (entry) => entry.plan_id === "free-style-practice",
    );
    if (freeStyleProgress?.progress_data) {
      let freeStyleData: any;
      if (typeof freeStyleProgress.progress_data === "string") {
        try {
          freeStyleData = JSON.parse(freeStyleProgress.progress_data);
        } catch (e) {
          console.warn("Failed to parse free-style progress_data:", e);
        }
      } else {
        freeStyleData = freeStyleProgress.progress_data;
      }

      if (
        freeStyleData?.answeredQuestions &&
        Array.isArray(freeStyleData.answeredQuestions)
      ) {
        freeStyleData.answeredQuestions.forEach((qId: string) => {
          uniqueQuestionIds.add(qId);
        });
      }
    }

    const questionsCompleted = uniqueQuestionIds.size;

    // 4. Calculate total points
    // Sum points from question_attempts
    const totalPointsFromAttempts = questionAttemptsList.reduce(
      (sum, attempt) => sum + (attempt.points_earned || 0),
      0,
    );

    // Calculate points from guided learning (assuming 10 points per correct answer)
    let totalPointsFromGuided = 0;
    userProgressList.forEach((entry) => {
      if (entry.progress_data) {
        let progressData: any;
        if (typeof entry.progress_data === "string") {
          try {
            progressData = JSON.parse(entry.progress_data);
          } catch (_e) {
            return;
          }
        } else {
          progressData = entry.progress_data;
        }

        if (
          progressData.correctAnswers &&
          Array.isArray(progressData.correctAnswers)
        ) {
          totalPointsFromGuided += progressData.correctAnswers.length * 10;
        }
      }
    });

    const totalPoints = totalPointsFromAttempts + totalPointsFromGuided;

    // 5. Calculate day streak from activity dates
    const activityDates: string[] = [];

    // From question_attempts
    questionAttemptsList.forEach((attempt) => {
      if (attempt.created_at) {
        activityDates.push(attempt.created_at);
      }
    });

    // From user_progress updates
    userProgressList.forEach((entry) => {
      if (entry.updated_at) {
        activityDates.push(entry.updated_at);
      } else if (entry.created_at) {
        activityDates.push(entry.created_at);
      }
    });

    const streak = calculateStreak(activityDates);

    // 6. Aggregate achievements
    // For now, we'll create achievements based on milestones
    const achievements: Array<{
      id: string;
      name: string;
      description: string;
      unlockedAt: string;
    }> = [];

    if (questionsCompleted >= 10) {
      achievements.push({
        id: "questions-10",
        name: "Getting Started",
        description: "Completed 10 questions",
        unlockedAt: new Date().toISOString(),
      });
    }
    if (questionsCompleted >= 50) {
      achievements.push({
        id: "questions-50",
        name: "Learning Fast",
        description: "Completed 50 questions",
        unlockedAt: new Date().toISOString(),
      });
    }
    if (questionsCompleted >= 100) {
      achievements.push({
        id: "questions-100",
        name: "Century Club",
        description: "Completed 100 questions",
        unlockedAt: new Date().toISOString(),
      });
    }
    if (totalPoints >= 100) {
      achievements.push({
        id: "points-100",
        name: "Point Collector",
        description: "Earned 100 points",
        unlockedAt: new Date().toISOString(),
      });
    }
    if (totalPoints >= 500) {
      achievements.push({
        id: "points-500",
        name: "Point Master",
        description: "Earned 500 points",
        unlockedAt: new Date().toISOString(),
      });
    }
    if (streak.current >= 7) {
      achievements.push({
        id: "streak-7",
        name: "Week Warrior",
        description: "7 day streak",
        unlockedAt: new Date().toISOString(),
      });
    }
    if (streak.current >= 30) {
      achievements.push({
        id: "streak-30",
        name: "Monthly Master",
        description: "30 day streak",
        unlockedAt: new Date().toISOString(),
      });
    }
    if (streak.longest >= 30) {
      achievements.push({
        id: "longest-streak-30",
        name: "Consistency Champion",
        description: "Longest streak of 30 days",
        unlockedAt: new Date().toISOString(),
      });
    }

    const stats = {
      questionsCompleted,
      totalPoints,
      dayStreak: streak.current,
      longestStreak: streak.longest,
      achievements,
      breakdown: {
        fromAttempts: {
          questions: questionAttemptsList.filter((a) => a.question_id).length,
          points: totalPointsFromAttempts,
        },
        fromGuided: {
          questions: userProgressList.reduce((count, entry) => {
            if (entry.progress_data) {
              let pd: any;
              if (typeof entry.progress_data === "string") {
                try {
                  pd = JSON.parse(entry.progress_data);
                } catch (_e) {
                  return count;
                }
              } else {
                pd = entry.progress_data;
              }
              return count + (pd.completedQuestions?.length || 0);
            }
            return count;
          }, 0),
          points: totalPointsFromGuided,
        },
      },
    };

    console.log("✅ Dashboard stats calculated:", {
      questionsCompleted: stats.questionsCompleted,
      totalPoints: stats.totalPoints,
      dayStreak: stats.dayStreak,
      achievements: stats.achievements.length,
    });

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error("❌ Error fetching dashboard stats:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch dashboard stats",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
