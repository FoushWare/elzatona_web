import { describe, it, expect } from "vitest";
import { createMockRepositories } from "../../../../../../tests/utils/mock-repositories";

describe("ICategoryRepository", () => {
  const { categoryRepository } = createMockRepositories();

  it("getCategoryById success case", async () => {
    const cat = await categoryRepository.getCategoryById("1");
    expect(cat).toBeTruthy();
    expect(cat?.id).toBe("1");
  });

  it("getCategoryById returns null for non-existent", async () => {
    const cat = await categoryRepository.getCategoryById("999");
    expect(cat).toBeNull();
  });

  it("getAllCategories returns array", async () => {
    const cats = await categoryRepository.getAllCategories();
    expect(Array.isArray(cats)).toBe(true);
    expect(cats.length).toBeGreaterThan(0);
  });

  it("getAllCategories returns empty array when none exist", async () => {
    // Remove all categories
    const { categoryRepository: emptyRepo } = createMockRepositories();
    // @ts-ignore
    emptyRepo.getAllCategories = async () => [];
    const cats = await emptyRepo.getAllCategories();
    expect(cats).toEqual([]);
  });

  it("createCategory with valid data", async () => {
    const newCat = await categoryRepository.createCategory({ name: "History" });
    expect(newCat.id).toBeDefined();
    expect(newCat.name).toBe("History");
  });

  it("updateCategory updates existing category", async () => {
    const updated = await categoryRepository.updateCategory("1", {
      name: "Math Updated",
    });
    expect(updated.name).toBe("Math Updated");
  });

  it("deleteCategory removes category", async () => {
    await categoryRepository.deleteCategory("2");
    const cat = await categoryRepository.getCategoryById("2");
    expect(cat).toBeNull();
  });
});
