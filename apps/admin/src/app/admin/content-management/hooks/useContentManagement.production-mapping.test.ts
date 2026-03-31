import { describe, expect, it } from "vitest";

import { contentManagementMappingTestUtils } from "./useContentManagement";

const {
  transformQuestion,
  buildCategoryCardLookup,
  buildTopicCategoryLookup,
  mapCategoryToCard,
} = contentManagementMappingTestUtils;

describe("useContentManagement production mapping regressions", () => {
  it("normalizes question relation ids from nested relation arrays", () => {
    const normalized = transformQuestion({
      id: "q-1",
      title: "Question 1",
      categories: [{ id: "cat-1" }],
      topics: [{ id: "topic-1" }],
      learning_cards: [{ id: "card-1" }],
      is_active: true,
    });

    expect(normalized.category_id).toBe("cat-1");
    expect(normalized.topic_id).toBe("topic-1");
    expect(normalized.learning_card_id).toBe("card-1");
  });

  it("builds category and topic lookup from normalized questions", () => {
    const questions = [
      transformQuestion({
        id: "q-1",
        title: "Q1",
        categories: [{ id: "cat-10" }],
        topics: [{ id: "topic-10" }],
        learning_cards: [{ id: "card-10" }],
      }),
      transformQuestion({
        id: "q-2",
        title: "Q2",
        categories: [{ id: "cat-11" }],
        topics: [{ id: "topic-11" }],
        learning_cards: [{ id: "card-11" }],
      }),
    ];

    const categoryLookup = buildCategoryCardLookup(questions);
    const topicLookup = buildTopicCategoryLookup(questions);

    expect(categoryLookup.get("cat-10")).toBe("card-10");
    expect(categoryLookup.get("cat-11")).toBe("card-11");
    expect(topicLookup.get("topic-10")).toBe("cat-10");
    expect(topicLookup.get("topic-11")).toBe("cat-11");
  });

  it("maps category to canonical card id using card_type fallback", () => {
    const idsByKey = {
      core: "core-card-id",
      framework: "framework-card-id",
      problem: "problem-card-id",
      system: "system-card-id",
    };

    const mapped = mapCategoryToCard(
      {
        id: "cat-prod-1",
        name: "Prod Category",
        card_type: "framework_questions",
        learning_card_id: undefined,
      },
      idsByKey,
      new Map<string, string>(),
    );

    expect(mapped).not.toBeNull();
    expect(mapped?.learning_card_id).toBe("framework-card-id");
  });

  it("maps topic to category through question fallback data shape", () => {
    const questions = [
      transformQuestion({
        id: "q-prod",
        title: "Q prod",
        categories: [{ id: "cat-prod-2" }],
        topics: [{ id: "topic-prod-2" }],
        learning_cards: [{ id: "card-prod-2" }],
      }),
    ];

    const topicLookup = buildTopicCategoryLookup(questions);

    expect(topicLookup.get("topic-prod-2")).toBe("cat-prod-2");
  });
});
