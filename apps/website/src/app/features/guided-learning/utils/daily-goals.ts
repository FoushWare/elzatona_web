import { LearningPlan, DailyGoal } from "../types";

export function generateDailyGoals(plan: LearningPlan): DailyGoal[] {
  const goals: DailyGoal[] = [];
  const today = new Date();

  for (let day = 1; day <= plan.duration; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() + day - 1);

    goals.push({
      day,
      date: date.toLocaleDateString(),
      questions: plan.dailyQuestions,
      sections: plan.sections.map((s) => s.name),
      completed: false,
      progress: 0,
    });
  }

  return goals;
}
