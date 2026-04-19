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

  // 2. Calculate Current Streak (working backwards)
  const sortedDesc = [...uniqueDates].reverse();
  const latestDate = sortedDesc[0];

  const getDayDiff = (d1Str: string, d2Str: string) => {
    const d1 = new Date(d1Str);
    const d2 = new Date(d2Str);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return Math.floor((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));
  };

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const diffFromToday = getDayDiff(todayStr, latestDate);

  let current = 0;
  // If latest activity was today (0) or yesterday (1), streak is active
  if (diffFromToday === 0 || diffFromToday === 1) {
    current = 1;
    for (let i = 0; i < sortedDesc.length - 1; i++) {
      const diff = getDayDiff(sortedDesc[i], sortedDesc[i + 1]);
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
