/**
 * Utility functions for calculating dashboard statistics and user progress.
 */

interface StreakResult {
  current: number;
  longest: number;
}

/**
 * Calculates current and longest streaks from an array of activity timestamps.
 */
export function calculateStreak(activityDates: string[]): StreakResult {
  if (!activityDates || activityDates.length === 0) {
    return { current: 0, longest: 0 };
  }

  // Normalize, unique, and sort dates (YYYY-MM-DD)
  const uniqueDates = Array.from(
    new Set(
      activityDates.map((date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      }),
    ),
  ).sort((a, b) => a.localeCompare(b));

  if (uniqueDates.length === 0) return { current: 0, longest: 0 };

  // 1. Calculate Longest Streak
  let longest = 1;
  let currentLongRun = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(uniqueDates[i - 1]);
    const curr = new Date(uniqueDates[i]);
    const diff = Math.floor(
      (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diff === 1) {
      currentLongRun++;
      longest = Math.max(longest, currentLongRun);
    } else {
      currentLongRun = 1;
    }
  }

  // 2. Calculate Current Streak (working backwards from today or yesterday)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split("T")[0];

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  let current = 0;
  const sortedDesc = [...uniqueDates].reverse();
  const latestDate = sortedDesc[0];

  // If latest activity was today or yesterday, streak is active
  if (latestDate === todayStr || latestDate === yesterdayStr) {
    current = 1;
    for (let i = 0; i < sortedDesc.length - 1; i++) {
      const curr = new Date(sortedDesc[i]);
      const next = new Date(sortedDesc[i + 1]);
      const diff = Math.floor(
        (curr.getTime() - next.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diff === 1) current++;
      else break;
    }
  }

  return { current, longest };
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  unlockedAt: string;
}

/**
 * Maps question completed milestones to achievements.
 */
export function calculateAchievements(
  questionsCompleted: number,
  totalPoints: number,
  currentStreak: number,
  longestStreak: number,
): Achievement[] {
  const achievements: Achievement[] = [];
  const now = new Date().toISOString();

  const addIf = (cond: boolean, id: string, name: string, desc: string) => {
    if (cond)
      achievements.push({ id, name, description: desc, unlockedAt: now });
  };

  addIf(
    questionsCompleted >= 10,
    "questions-10",
    "Getting Started",
    "Completed 10 questions",
  );
  addIf(
    questionsCompleted >= 50,
    "questions-50",
    "Learning Fast",
    "Completed 50 questions",
  );
  addIf(
    questionsCompleted >= 100,
    "questions-100",
    "Century Club",
    "Completed 100 questions",
  );
  addIf(
    totalPoints >= 100,
    "points-100",
    "Point Collector",
    "Earned 100 points",
  );
  addIf(totalPoints >= 500, "points-500", "Point Master", "Earned 500 points");
  addIf(currentStreak >= 7, "streak-7", "Week Warrior", "7 day streak");
  addIf(currentStreak >= 30, "streak-30", "Monthly Master", "30 day streak");
  addIf(
    longestStreak >= 30,
    "longest-streak-30",
    "Consistency Champion",
    "Longest streak of 30 days",
  );

  return achievements;
}
