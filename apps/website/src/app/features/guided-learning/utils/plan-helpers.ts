import { GradeLevel } from "../types";

export function getDayNumberFromName(planName: string): number {
  const match = planName?.match(/(\d+)-Day/);
  return match ? parseInt(match[1], 10) : NaN;
}

export function getGradeColor(percentage: number): string {
  if (percentage >= 90)
    return "border-yellow-500 dark:border-yellow-400 ring-4 ring-yellow-200 dark:ring-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/20";
  if (percentage >= 80)
    return "border-green-500 dark:border-green-400 ring-4 ring-green-200 dark:ring-green-800 bg-green-50/50 dark:bg-green-900/20";
  if (percentage >= 70)
    return "border-blue-500 dark:border-blue-400 ring-4 ring-blue-200 dark:ring-blue-800 bg-blue-50/50 dark:bg-blue-900/20";
  if (percentage >= 60)
    return "border-orange-500 dark:border-orange-400 ring-4 ring-orange-200 dark:ring-orange-800 bg-orange-50/50 dark:bg-orange-900/20";
  return "border-red-500 dark:border-red-400 ring-4 ring-red-200 dark:ring-red-800 bg-red-50/50 dark:bg-red-900/20";
}

export function getGradeText(percentage: number): string {
  if (percentage >= 90) return "A+ (Excellent!)";
  if (percentage >= 80) return "A (Great!)";
  if (percentage >= 70) return "B+ (Good!)";
  if (percentage >= 60) return "B (Not bad!)";
  return "C (Keep practicing!)";
}

export function getGradeLevel(percentage: number): GradeLevel {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  return "C";
}

export function filterDayBasedPlans<T extends { name: string }>(
  plans: T[],
): T[] {
  const dayBasedPattern = /^\d+-(Day|Days) Plan$/i;
  return plans
    .filter((plan) => dayBasedPattern.test(plan.name))
    .sort(
      (a, b) => getDayNumberFromName(a.name) - getDayNumberFromName(b.name),
    );
}

export function getQuestionsRange(
  plans: { totalQuestions?: number }[],
): string {
  const nums = plans
    .map((p) => p.totalQuestions)
    .filter((n): n is number => typeof n === "number" && !isNaN(n));

  if (nums.length >= 1) {
    return `${Math.min(...nums)}-${Math.max(...nums)}`;
  }
  return "100-400";
}

export function getDaysRange(
  plans: { duration?: number; name: string }[],
): string {
  const durations = plans
    .map((p) =>
      typeof p.duration === "number" && !isNaN(p.duration)
        ? p.duration
        : getDayNumberFromName(p.name),
    )
    .filter((n): n is number => typeof n === "number" && !isNaN(n));

  if (durations.length >= 1) {
    return `${Math.min(...durations)}-${Math.max(...durations)}`;
  }
  return "1-7";
}
