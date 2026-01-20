import { describe, it, expect } from "vitest";
import { createMockRepositories } from "../../../../../../tests/utils/mock-repositories";

describe("IFlashcardRepository", () => {
  const { flashcardRepository } = createMockRepositories();

  it("getFlashcardById success case", async () => {
    const flashcard = await flashcardRepository.getFlashcardById("1");
    expect(flashcard).toBeTruthy();
    expect(flashcard?.id).toBe("1");
  });

  it("getFlashcardById returns null for non-existent", async () => {
    const flashcard = await flashcardRepository.getFlashcardById("999");
    expect(flashcard).toBeNull();
  });

  it("getAllFlashcards returns array", async () => {
    const flashcards = await flashcardRepository.getAllFlashcards();
    expect(Array.isArray(flashcards)).toBe(true);
    expect(flashcards.length).toBeGreaterThan(0);
  });

  it("createFlashcard with sectionId reference", async () => {
    const newFlashcard = await flashcardRepository.createFlashcard({
      question: "Q3",
      answer: "A3",
      sectionId: "1",
    });
    expect(newFlashcard.id).toBeDefined();
    expect(newFlashcard.sectionId).toBe("1");
  });

  it("updateFlashcard updates existing flashcard", async () => {
    const updated = await flashcardRepository.updateFlashcard("1", {
      question: "Q1 updated",
      answer: "A1",
      sectionId: "1",
    });
    expect(updated.question).toBe("Q1 updated");
  });

  it("deleteFlashcard removes flashcard", async () => {
    await flashcardRepository.deleteFlashcard("2");
    const flashcard = await flashcardRepository.getFlashcardById("2");
    expect(flashcard).toBeNull();
  });
});
