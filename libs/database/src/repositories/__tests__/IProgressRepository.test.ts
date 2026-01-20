import { describe, it, expect } from "vitest";
import { createMockRepositories } from "../../../../../../tests/utils/mock-repositories";

describe("IProgressRepository", () => {
  const { progressRepository } = createMockRepositories();

  it("getProgressById success case", async () => {
    const progress = await progressRepository.getProgressById("1");
    expect(progress).toBeTruthy();
    expect(progress?.id).toBe("1");
  });

  it("getProgressById returns null for non-existent", async () => {
    const progress = await progressRepository.getProgressById("999");
    expect(progress).toBeNull();
  });

  it("getAllProgress returns array", async () => {
    const progresses = await progressRepository.getAllProgress();
    expect(Array.isArray(progresses)).toBe(true);
    expect(progresses.length).toBeGreaterThan(0);
  });

  it("createProgress with userId and flashcardId", async () => {
    const newProgress = await progressRepository.createProgress({
      userId: "u3",
      flashcardId: "1",
      status: "new",
    });
    expect(newProgress.id).toBeDefined();
    expect(newProgress.userId).toBe("u3");
  });

  it("updateProgress updates status", async () => {
    const updated = await progressRepository.updateProgress("1", {
      userId: "u1",
      flashcardId: "1",
      status: "reviewed",
    });
    expect(updated.status).toBe("reviewed");
  });

  it("deleteProgress removes progress record", async () => {
    await progressRepository.deleteProgress("2");
    const progress = await progressRepository.getProgressById("2");
    expect(progress).toBeNull();
  });
});
