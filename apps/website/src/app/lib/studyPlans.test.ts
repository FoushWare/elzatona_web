import { describe, it, expect } from "vitest";
import { studyPlans, getStudyPlanById } from "./studyPlans";

describe("Study Plans (Milestone-based)", () => {
  it("should have at least the 3 core plans", () => {
    expect(studyPlans.length).toBeGreaterThanOrEqual(3);
  });

  it("should find the one-week-intensive plan", () => {
    const plan = getStudyPlanById("one-week-intensive");
    expect(plan).toBeDefined();
    expect(plan?.id).toBe("one-week-intensive");
  });

  it("should use the milestone structure instead of schedule", () => {
    const plan = getStudyPlanById("one-week-intensive");
    // @ts-ignore - checking that legacy schedule is gone
    expect(plan?.schedule).toBeUndefined();
    expect(plan?.milestones).toBeDefined();
    expect(Array.isArray(plan?.milestones)).toBe(true);
    expect(plan?.milestones?.length).toBeGreaterThan(0);
  });

  it("should have valid milestones with tasks", () => {
    const plan = getStudyPlanById("one-week-intensive");
    const firstMilestone = plan?.milestones?.[0];
    expect(firstMilestone).toBeDefined();
    expect(firstMilestone?.tasks).toBeDefined();
    expect(firstMilestone?.tasks.length).toBeGreaterThan(0);
    expect(firstMilestone?.tasks[0].id).toBeDefined();
  });

  it("should have estimatedTotalTime instead of estimatedTimePerDay", () => {
    const plan = getStudyPlanById("one-week-intensive");
    expect(plan?.estimatedTotalTime).toBeDefined();
    // @ts-ignore
    expect(plan?.estimatedTimePerDay).toBeUndefined();
  });
});
