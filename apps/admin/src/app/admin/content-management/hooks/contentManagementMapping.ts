export type CanonicalCardKey = "core" | "framework" | "problem" | "system";

export type QuestionLike = {
  category_id?: string;
  topic_id?: string;
  learning_card_id?: string;
  categoryId?: string;
  topicId?: string;
  learningCardId?: string;
  categories?: unknown;
  topics?: unknown;
  learning_cards?: unknown;
  [key: string]: unknown;
};

export type CategoryLike = {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
  learning_card_id?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  card_type?: string | null;
};

export type MappedCategoryLike = {
  id: string;
  name: string;
  slug: string;
  description: string;
  learning_card_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

function toSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replaceAll(/[^a-z0-9\s-]/g, "")
    .replaceAll(/\s+/g, "-")
    .replaceAll(/-+/g, "-");
}

export function normalizeCardTypeKey(
  cardType?: string | null,
): CanonicalCardKey | null {
  if (!cardType) {
    return null;
  }

  const normalized = cardType.trim().toLowerCase();

  if (
    normalized === "core" ||
    normalized === "core technologies" ||
    normalized === "core_technologies" ||
    normalized === "core-technologies"
  ) {
    return "core";
  }

  if (
    normalized === "framework" ||
    normalized === "framework questions" ||
    normalized === "framework_questions" ||
    normalized === "framework-questions"
  ) {
    return "framework";
  }

  if (
    normalized === "problem" ||
    normalized === "problem solving" ||
    normalized === "problem_solving" ||
    normalized === "problem-solving"
  ) {
    return "problem";
  }

  if (
    normalized === "system" ||
    normalized === "system design" ||
    normalized === "system_design" ||
    normalized === "system-design"
  ) {
    return "system";
  }

  return null;
}

export function mapCategoryToCard(
  category: CategoryLike,
  idsByKey: Record<CanonicalCardKey, string>,
  cardIdByCategoryId: Map<string, string>,
): MappedCategoryLike | null {
  const mappedCardId =
    category.learning_card_id || cardIdByCategoryId.get(category.id);

  if (mappedCardId) {
    return {
      id: category.id,
      name: category.name ?? "",
      slug: category.slug ?? toSlug(category.name ?? category.id),
      description: category.description ?? "",
      learning_card_id: mappedCardId,
      is_active: category.is_active ?? true,
      created_at: category.created_at ?? "",
      updated_at: category.updated_at ?? "",
    };
  }

  const key = normalizeCardTypeKey(category.card_type);
  if (!key) {
    return null;
  }

  return {
    id: category.id,
    name: category.name ?? "",
    slug: category.slug ?? toSlug(category.name ?? category.id),
    description: category.description ?? "",
    learning_card_id: idsByKey[key],
    is_active: category.is_active ?? true,
    created_at: category.created_at ?? "",
    updated_at: category.updated_at ?? "",
  };
}

export function getPrimaryNestedId(value: unknown): string {
  if (!Array.isArray(value) || value.length === 0) {
    return "";
  }

  const first = value[0] as Record<string, unknown>;
  const id = first["id"];
  return typeof id === "string" ? id : "";
}

export function getQuestionCategoryId(question: QuestionLike): string {
  return (
    question.category_id ??
    question.categoryId ??
    getPrimaryNestedId(question.categories) ??
    ""
  );
}

export function getQuestionTopicId(question: QuestionLike): string {
  return (
    question.topic_id ??
    question.topicId ??
    getPrimaryNestedId(question.topics) ??
    ""
  );
}

export function getQuestionLearningCardId(question: QuestionLike): string {
  return (
    question.learning_card_id ??
    question.learningCardId ??
    getPrimaryNestedId(question.learning_cards) ??
    ""
  );
}

export function buildCategoryCardLookup(
  questions: QuestionLike[],
): Map<string, string> {
  const lookup = new Map<string, string>();

  questions.forEach((question) => {
    const categoryId = getQuestionCategoryId(question);
    const learningCardId = getQuestionLearningCardId(question);

    if (!categoryId || !learningCardId || lookup.has(categoryId)) {
      return;
    }

    lookup.set(categoryId, learningCardId);
  });

  return lookup;
}

export function buildTopicCategoryLookup(
  questions: QuestionLike[],
): Map<string, string> {
  const lookup = new Map<string, string>();

  questions.forEach((question) => {
    const topicId = getQuestionTopicId(question);
    const categoryId = getQuestionCategoryId(question);

    if (!topicId || !categoryId || lookup.has(topicId)) {
      return;
    }

    lookup.set(topicId, categoryId);
  });

  return lookup;
}

export function transformQuestion(q: QuestionLike): QuestionLike {
  const category_id =
    q.category_id ?? q.categoryId ?? getPrimaryNestedId(q.categories) ?? "";
  const topic_id =
    q.topic_id ?? q.topicId ?? getPrimaryNestedId(q.topics) ?? "";
  const learning_card_id =
    q.learning_card_id ??
    q.learningCardId ??
    getPrimaryNestedId(q.learning_cards) ??
    "";

  return {
    ...q,
    category_id,
    topic_id,
    learning_card_id,
    isActive: q.isActive ?? q.is_active ?? true,
    createdAt: q.createdAt ?? q.created_at ?? "",
    updatedAt: q.updatedAt ?? q.updated_at ?? "",
  };
}

export const contentManagementMappingTestUtils = {
  normalizeCardTypeKey,
  mapCategoryToCard,
  transformQuestion,
  buildCategoryCardLookup,
  buildTopicCategoryLookup,
};
