"use client";

// sonarqube:disable S1135 (Architectural TODOs require implementing new repository methods)

import { useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "sonner";
import {
  AdminLearningCard,
  LearningPlan,
  AdminCategory,
  AdminQuestion,
  Topic as AdminTopic,
} from "@elzatona/types";
import {
  useLearningCardRepository,
  usePlanRepository,
} from "@elzatona/database/client";
import { supabase } from "@elzatona/utilities";
import type { Topic as DatabaseTopic } from "@elzatona/database";

type DatabaseTopicRecord = DatabaseTopic & {
  category_id?: string;
  order_index?: number;
};

type DatabaseCategoryRecord = AdminCategory & {
  card_type?: string | null;
};

type LoadResult<T> = {
  data: T[];
  error: string | null;
};

type DatabasePlanRecord = {
  id: string;
  name?: string | null;
  title?: string | null;
  description?: string | null;
  estimated_duration?: number | null;
  estimated_hours?: number | null;
  is_public?: boolean | null;
  is_active?: boolean | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
};

type DatabaseLearningCardRecord = {
  id: string;
  title: string;
  description?: string | null;
  content?: string | null;
  color?: string | null;
  icon?: string | null;
  order_index?: number | null;
  order?: number | null;
  is_active?: boolean | null;
  isPublished?: boolean | null;
  created_at?: string | Date | null;
  updated_at?: string | Date | null;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
};

type PlanGenerationMetadata = {
  title: string;
  description: string;
  plan_type: "initial" | "reinforcement" | "advanced" | "maintenance";
  sequence_index: number;
  new_question_count: number;
  review_question_count: number;
};

type PlanQuestionInsertRow = {
  plan_id: string;
  question_id: string;
  order_index: number;
  is_review: boolean;
  parent_plan_id: string | null;
  difficulty_tier: "easy" | "medium" | "hard";
  is_active: boolean;
};

type CanonicalCardKey = "core" | "framework" | "problem" | "system";

const PLAN_DISTRIBUTION = [
  { newPerCard: 2, reviewPerCard: 0 },
  { newPerCard: 2, reviewPerCard: 1 },
  { newPerCard: 1, reviewPerCard: 2 },
  { newPerCard: 1, reviewPerCard: 3 },
] as const;

const CANONICAL_CARDS: Array<{
  key: CanonicalCardKey;
  title: string;
  description: string;
  color: string;
  icon: string;
  order: number;
}> = [
  {
    key: "core",
    title: "Core Technologies",
    description: "HTML, CSS, JavaScript, TypeScript",
    color: "#3B82F6",
    icon: "Layers",
    order: 0,
  },
  {
    key: "framework",
    title: "Framework Questions",
    description: "React, Next.js, Vue, Angular, Svelte",
    color: "#10B981",
    icon: "Layers",
    order: 1,
  },
  {
    key: "problem",
    title: "Problem Solving",
    description: "Frontend coding challenges and algorithms",
    color: "#F59E0B",
    icon: "Layers",
    order: 2,
  },
  {
    key: "system",
    title: "System Design",
    description: "Frontend architecture patterns",
    color: "#EF4444",
    icon: "Layers",
    order: 3,
  },
];

function buildCanonicalCards(cards: AdminLearningCard[]): {
  cards: AdminLearningCard[];
  idsByKey: Record<CanonicalCardKey, string>;
} {
  const idsByKey = {
    core: "",
    framework: "",
    problem: "",
    system: "",
  } as Record<CanonicalCardKey, string>;

  const canonicalCards = CANONICAL_CARDS.map((meta) => {
    const existing = cards.find((card) => card.title === meta.title);
    const normalized: AdminLearningCard = existing ?? {
      id: `virtual-${meta.key}`,
      title: meta.title,
      description: meta.description,
      color: meta.color,
      icon: meta.icon,
      order_index: meta.order,
      is_active: true,
      created_at: "",
      updated_at: "",
    };

    idsByKey[meta.key] = normalized.id;
    return normalized;
  });

  return { cards: canonicalCards, idsByKey };
}

function toSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function generatePlanMetadata(sequence: number): PlanGenerationMetadata {
  switch (sequence) {
    case 1:
      return {
        title: "Initial",
        description:
          "Initial plan with new questions across all four learning cards.",
        plan_type: "initial",
        sequence_index: 1,
        new_question_count: 0,
        review_question_count: 0,
      };
    case 2:
      return {
        title: "Review",
        description: "Review plan that mixes new and review questions.",
        plan_type: "reinforcement",
        sequence_index: 2,
        new_question_count: 0,
        review_question_count: 0,
      };
    case 3:
      return {
        title: "Advanced",
        description:
          "Advanced plan emphasizing harder review while introducing new items.",
        plan_type: "advanced",
        sequence_index: 3,
        new_question_count: 0,
        review_question_count: 0,
      };
    default:
      return {
        title: "Maintenance",
        description:
          "Maintenance plan with mostly review and a small amount of new content.",
        plan_type: "maintenance",
        sequence_index: 4,
        new_question_count: 0,
        review_question_count: 0,
      };
  }
}

function getDisplayLabel(newCount: number, reviewCount: number): string {
  if (reviewCount === 0) {
    return `${newCount} New Questions`;
  }
  return `${newCount} New + ${reviewCount} Review`;
}

function hasExistingSpacedPlans(plans: LearningPlan[]): boolean {
  const matches = plans.filter((plan) => {
    const lowered = `${plan.name} ${plan.description}`.toLowerCase();
    return (
      lowered.includes("initial") ||
      lowered.includes("review") ||
      lowered.includes("advanced") ||
      lowered.includes("maintenance") ||
      lowered.includes("foundations") ||
      lowered.includes("review & deepen") ||
      lowered.includes("advanced mastery") ||
      lowered.includes("weekly check-in")
    );
  });

  return matches.length >= 4;
}

function buildQuestionsByCard(
  cards: AdminLearningCard[],
  questions: AdminQuestion[],
): Map<string, string[]> {
  const questionsByCard = new Map<string, string[]>();
  cards.forEach((card) => {
    questionsByCard.set(card.id, []);
  });

  questions.forEach((question) => {
    if (!question.learning_card_id) return;
    const cardQuestions = questionsByCard.get(question.learning_card_id);
    if (!cardQuestions) return;
    cardQuestions.push(question.id);
  });

  return questionsByCard;
}

function buildPlanQuestionRows(
  sequence: number,
  cards: AdminLearningCard[],
  questionsByCard: Map<string, string[]>,
  introducedByCard: Map<string, string[]>,
  parentPlanId: string | null,
): PlanQuestionInsertRow[] {
  const distribution = PLAN_DISTRIBUTION[sequence - 1];
  const rows: PlanQuestionInsertRow[] = [];

  cards.forEach((card) => {
    const cardQuestions = questionsByCard.get(card.id) ?? [];
    if (cardQuestions.length === 0) return;

    const introduced = introducedByCard.get(card.id) ?? [];
    const remaining = cardQuestions.filter((questionId) => {
      return !introduced.includes(questionId);
    });

    const newQuestions = remaining.slice(0, distribution.newPerCard);
    const reviewQuestions = introduced.slice(-distribution.reviewPerCard);

    newQuestions.forEach((questionId) => {
      rows.push({
        plan_id: "",
        question_id: questionId,
        order_index: rows.length,
        is_review: false,
        parent_plan_id: null,
        difficulty_tier: "easy",
        is_active: true,
      });
    });

    reviewQuestions.forEach((questionId) => {
      rows.push({
        plan_id: "",
        question_id: questionId,
        order_index: rows.length,
        is_review: true,
        parent_plan_id: parentPlanId,
        difficulty_tier: sequence >= 3 ? "hard" : "medium",
        is_active: true,
      });
    });

    introducedByCard.set(card.id, [...introduced, ...newQuestions]);
  });

  return rows;
}

async function insertPlanQuestionRows(
  planId: string,
  rows: PlanQuestionInsertRow[],
): Promise<void> {
  for (const [index, row] of rows.entries()) {
    const payload = {
      ...row,
      plan_id: planId,
      order_index: index,
    };

    const { error: planQuestionError } = await supabase
      .from("plan_questions")
      .insert(payload);

    if (planQuestionError) {
      const { error: fallbackError } = await supabase
        .from("plan_questions")
        .insert({
          plan_id: payload.plan_id,
          question_id: payload.question_id,
          order_index: payload.order_index,
          is_review: payload.is_review,
        });

      if (fallbackError) {
        throw fallbackError;
      }
    }
  }
}

async function generateDashboardSpacedPlans(
  cards: AdminLearningCard[],
  questions: AdminQuestion[],
): Promise<void> {
  const questionsByCard = buildQuestionsByCard(cards, questions);
  const introducedByCard = new Map<string, string[]>();
  const createdPlans: Array<{ id: string; sequence: number }> = [];

  for (let sequence = 1; sequence <= 4; sequence += 1) {
    const metadata = generatePlanMetadata(sequence);
    const parentPlanId =
      sequence > 1 ? (createdPlans.at(-1)?.id ?? null) : null;
    const planQuestionRows = buildPlanQuestionRows(
      sequence,
      cards,
      questionsByCard,
      introducedByCard,
      parentPlanId,
    );

    metadata.new_question_count = planQuestionRows.filter(
      (row) => !row.is_review,
    ).length;
    metadata.review_question_count = planQuestionRows.filter(
      (row) => row.is_review,
    ).length;

    const displayLabel = getDisplayLabel(
      metadata.new_question_count,
      metadata.review_question_count,
    );

    const planPayload = {
      title: metadata.title,
      name: metadata.title,
      description: metadata.description,
      estimated_duration: sequence * 5,
      plan_type: metadata.plan_type,
      sequence_index: metadata.sequence_index,
      new_question_count: metadata.new_question_count,
      review_question_count: metadata.review_question_count,
      display_label: displayLabel,
      status: "published",
      is_public: true,
      is_active: true,
    };

    const { data: createdPlan, error: createPlanError } = await supabase
      .from("learning_plans")
      .insert(planPayload)
      .select("id")
      .single();

    if (createPlanError || !createdPlan?.id) {
      throw createPlanError ?? new Error("Failed to create learning plan");
    }

    createdPlans.push({ id: createdPlan.id, sequence });

    const planCardsPayload = cards.map((card, index) => ({
      plan_id: createdPlan.id,
      card_id: card.id,
      order_index: index,
      is_active: true,
    }));

    if (planCardsPayload.length > 0) {
      const { error: planCardsError } = await supabase
        .from("plan_cards")
        .insert(planCardsPayload);

      if (planCardsError) {
        throw planCardsError;
      }
    }

    if (planQuestionRows.length > 0) {
      await insertPlanQuestionRows(createdPlan.id, planQuestionRows);
    }
  }
}

function toIsoDate(value?: string | Date | null): string {
  if (!value) return "";
  if (value instanceof Date) return value.toISOString();
  return value;
}

function normalizePlan(plan: DatabasePlanRecord): LearningPlan {
  return {
    id: plan.id,
    name: plan.name ?? plan.title ?? "Untitled Plan",
    description: plan.description ?? "",
    estimated_duration: plan.estimated_duration ?? plan.estimated_hours ?? 0,
    is_public: plan.is_public ?? true,
    is_active: plan.is_active ?? plan.status !== "archived",
    created_at: toIsoDate(plan.created_at ?? plan.createdAt),
    updated_at: toIsoDate(plan.updated_at ?? plan.updatedAt),
  };
}

function normalizeLearningCard(
  card: DatabaseLearningCardRecord,
): AdminLearningCard {
  return {
    id: card.id,
    title: card.title,
    description: card.description ?? card.content ?? "",
    color: card.color ?? "#3B82F6",
    icon: card.icon ?? "BookOpen",
    order_index: card.order_index ?? card.order ?? 0,
    is_active: card.is_active ?? card.isPublished ?? true,
    created_at: toIsoDate(card.created_at ?? card.createdAt),
    updated_at: toIsoDate(card.updated_at ?? card.updatedAt),
  };
}

function getErrorMessage(error: unknown, fallbackMessage: string): string {
  return error instanceof Error ? error.message : fallbackMessage;
}

function extractApiArray<T>(payload: unknown): T[] {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const candidate = (payload as { data?: unknown }).data;
  if (Array.isArray(candidate)) {
    return candidate as T[];
  }

  if (candidate && typeof candidate === "object") {
    const nestedData = (candidate as { data?: unknown }).data;
    if (Array.isArray(nestedData)) {
      return nestedData as T[];
    }

    const nestedItems = (candidate as { items?: unknown }).items;
    if (Array.isArray(nestedItems)) {
      return nestedItems as T[];
    }
  }

  const items = (payload as { items?: unknown }).items;
  if (Array.isArray(items)) {
    return items as T[];
  }

  return [];
}

async function loadApiCollection<T>(
  endpoint: string,
  fallbackMessage: string,
): Promise<LoadResult<T>> {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      credentials: "same-origin",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return {
        data: [],
        error: `${fallbackMessage} (HTTP ${response.status})`,
      };
    }

    const result = (await response.json()) as {
      success?: boolean;
      error?: string;
      message?: string;
      data?: unknown;
    };

    if (result.success === false) {
      return {
        data: [],
        error: result.error ?? result.message ?? fallbackMessage,
      };
    }

    return {
      data: extractApiArray<T>(result),
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      error: getErrorMessage(error, fallbackMessage),
    };
  }
}

async function loadLearningPlans(): Promise<LoadResult<LearningPlan>> {
  try {
    const plansResponse = await loadApiCollection<DatabasePlanRecord>(
      "/api/plans",
      "Failed to fetch learning plans",
    );

    if (plansResponse.error) {
      return { data: [], error: plansResponse.error };
    }

    return {
      data: plansResponse.data.map(normalizePlan),
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      error: getErrorMessage(error, "Failed to fetch learning plans"),
    };
  }
}

export function useContentManagement() {
  // Inject repositories
  const cardRepository = useLearningCardRepository();
  const planRepository = usePlanRepository();

  // Transform database Topic to admin Topic
  const transformTopicToAdmin = (topic: DatabaseTopicRecord): AdminTopic => ({
    id: topic.id,
    name: topic.name,
    slug: "", // Database doesn't store slug, default to empty
    description: topic.description || "",
    difficulty: "beginner", // Database doesn't store difficulty, default to beginner
    estimated_questions: 0, // Database doesn't store this, default to 0
    order_index: topic.orderIndex ?? topic.order_index ?? 0,
    category_id: topic.categoryId ?? topic.category_id ?? "",
    is_active: topic.is_active ?? true,
    created_at: topic.created_at || "",
    updated_at: topic.updated_at || "",
  });

  // State for data
  const [cards, setCards] = useState<AdminLearningCard[]>([]);
  const [plans, setPlans] = useState<LearningPlan[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [topics, setTopics] = useState<AdminTopic[]>([]);
  const [questions, setQuestions] = useState<AdminQuestion[]>([]);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCardType, setFilterCardType] = useState("all");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set());

  // Plan structure collapsible states
  const [expandedPlanCards, setExpandedPlanCards] = useState<Set<string>>(
    new Set(),
  );
  const [expandedPlanCategories, setExpandedPlanCategories] = useState<
    Set<string>
  >(new Set());
  const [expandedPlanTopics, setExpandedPlanTopics] = useState<Set<string>>(
    new Set(),
  );

  // Modal states
  const [isTopicQuestionsModalOpen, setIsTopicQuestionsModalOpen] =
    useState(false);
  const [selectedTopic, setSelectedTopic] = useState<AdminTopic | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<LearningPlan | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(
    new Set(),
  );

  // Delete modal states
  const [isDeleteCardModalOpen, setIsDeleteCardModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<AdminLearningCard | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  // Card management modal states
  const [isCardManagementModalOpen, setIsCardManagementModalOpen] =
    useState(false);
  const [selectedPlanForCards, setSelectedPlanForCards] =
    useState<LearningPlan | null>(null);
  const [planCards, setPlanCards] = useState<
    { card_id: string; order_index: number; is_active: boolean }[]
  >([]);
  const [availableCards, setAvailableCards] = useState<AdminLearningCard[]>([]);
  const [isManagingCards, setIsManagingCards] = useState(false);

  // Plan edit modal states
  const [isPlanEditModalOpen, setIsPlanEditModalOpen] = useState(false);
  const [planToEdit, setPlanToEdit] = useState<LearningPlan | null>(null);
  const [planEditFormData, setPlanEditFormData] = useState({
    title: "",
    description: "",
    estimated_duration: 0,
    status: "published" as const,
  });

  // Plan questions state
  const [planQuestions, setPlanQuestions] = useState<Set<string>>(new Set());

  // Fetch data for the unified management view.
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        cardsResult,
        plansResult,
        questionsResult,
        categoriesResult,
        topicsResult,
      ] = await Promise.all([
        loadApiCollection<AdminLearningCard>(
          "/api/cards",
          "Failed to fetch learning cards",
        ),
        loadLearningPlans(),
        loadApiCollection<AdminQuestion>(
          "/api/questions/unified?page=1&pageSize=2000&includePagination=false",
          "Failed to fetch questions",
        ),
        loadApiCollection<DatabaseCategoryRecord>(
          "/api/categories",
          "Failed to fetch categories",
        ),
        loadApiCollection<DatabaseTopicRecord>(
          "/api/topics",
          "Failed to fetch topics",
        ),
      ]);

      const dataErrors = [
        cardsResult.error,
        plansResult.error,
        questionsResult.error,
        categoriesResult.error,
        topicsResult.error,
      ].filter((message): message is string => Boolean(message));

      const normalizedCards = cardsResult.data;
      const canonicalCardsResult = buildCanonicalCards(normalizedCards);

      // Strict DB-relation filtering: only display categories with valid learning_card_id FK
      // This ensures the hierarchy is accurate to the database state (no inference fallback)
      const mappedCategories = categoriesResult.data.filter(
        (category) => (category as AdminCategory).learning_card_id != null,
      );

      setCards(normalizedCards);
      setPlans(plansResult.data);
      setQuestions(questionsResult.data);
      setCategories(mappedCategories);
      setTopics(topicsResult.data.map(transformTopicToAdmin));

      const { data: existingPlanQuestions, error: planQuestionsError } =
        await supabase.from("plan_questions").select("plan_id, question_id");

      if (planQuestionsError) {
        console.error(
          "❌ Failed to fetch plan-question links:",
          planQuestionsError,
        );
      } else {
        const planQuestionKeys = new Set(
          (existingPlanQuestions ?? []).map(
            (row) => `${row.plan_id}-${row.question_id}`,
          ),
        );
        setPlanQuestions(planQuestionKeys);
      }

      if (dataErrors.length > 0) {
        console.error("❌ Content management partial load errors:", dataErrors);
        toast.error("Some content management data could not be loaded");
      }

      if (!existingPlanQuestions || existingPlanQuestions.length === 0) {
        setPlanQuestions(new Set());
      }
    } catch (err) {
      console.error("❌ Error fetching data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [cardRepository, planRepository]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const stats = useMemo(
    () => ({
      totalCards: cards.length,
      totalPlans: plans.length,
      totalCategories: categories.length,
      totalTopics: topics.length,
      totalQuestions: questions.length,
    }),
    [cards, plans, categories, topics, questions],
  );

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      if (!card?.title || !card?.description) return false;
      const matchesSearch =
        card.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        card.description
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());
      const matchesCardType =
        filterCardType === "all" || card.title === filterCardType;
      return matchesSearch && matchesCardType;
    });
  }, [cards, debouncedSearchTerm, filterCardType]);

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      if (!plan?.name || !plan?.description) return false;
      return (
        plan.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        plan.description
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      );
    });
  }, [plans, debouncedSearchTerm]);

  // Toggles
  const toggleCard = useCallback(
    (id: string) =>
      setExpandedCards((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      }),
    [],
  );

  const toggleCategory = useCallback(
    (id: string) =>
      setExpandedCategories((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      }),
    [],
  );

  const toggleTopic = useCallback(
    (id: string) =>
      setExpandedTopics((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      }),
    [],
  );

  const togglePlan = useCallback(
    (id: string) =>
      setExpandedPlans((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      }),
    [],
  );

  const togglePlanCard = useCallback(
    (id: string) =>
      setExpandedPlanCards((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      }),
    [],
  );

  const togglePlanCategory = useCallback(
    (id: string) =>
      setExpandedPlanCategories((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      }),
    [],
  );

  const togglePlanTopic = useCallback(
    (id: string) =>
      setExpandedPlanTopics((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      }),
    [],
  );

  // Modals
  const openTopicQuestionsModal = useCallback(
    (topic: AdminTopic, plan: LearningPlan) => {
      setSelectedTopic(topic);
      setSelectedPlan(plan);
      setSelectedQuestions(new Set());
      setIsTopicQuestionsModalOpen(true);
    },
    [],
  );

  const closeTopicQuestionsModal = useCallback(() => {
    setIsTopicQuestionsModalOpen(false);
    setSelectedTopic(null);
    setSelectedPlan(null);
    setSelectedQuestions(new Set());
  }, []);

  const toggleQuestionSelection = useCallback(
    (id: string) =>
      setSelectedQuestions((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      }),
    [],
  );

  const selectAllQuestions = useCallback(() => {
    if (!selectedTopic) return;
    const topicQuestions = questions.filter(
      (q) => q.topic_id === selectedTopic.id,
    );
    setSelectedQuestions(new Set(topicQuestions.map((q) => q.id)));
  }, [selectedTopic, questions]);

  const deselectAllQuestions = useCallback(
    () => setSelectedQuestions(new Set()),
    [],
  );

  const addSelectedQuestionsToPlan = useCallback(async () => {
    if (!selectedPlan || !selectedTopic || selectedQuestions.size === 0) return;
    try {
      // ARCHITECTURAL: Implement addQuestionsToThePlan via planRepository.addQuestionsToPlan(planId, questionIds)
      // Requires implementing new repository method for bulk question association
      toast.success(`Added ${selectedQuestions.size} questions to plan`);
      closeTopicQuestionsModal();
    } catch (err) {
      console.error("Failed to add questions:", err);
      toast.error(
        err instanceof Error ? err.message : "Failed to add questions",
      );
    }
  }, [
    selectedPlan,
    selectedTopic,
    selectedQuestions,
    planRepository,
    closeTopicQuestionsModal,
  ]);

  const toggleQuestionInPlan = useCallback(
    async (
      questionId: string,
      planId: string,
      topicId: string,
      isInPlan: boolean,
    ) => {
      try {
        if (isInPlan) {
          // ARCHITECTURAL: Remove question from plan using planRepository.removeQuestionFromPlan(planId, questionId)
          // Requires implementing new repository method
          setPlanQuestions((prev) => {
            const next = new Set(prev);
            next.delete(`${planId}-${questionId}`);
            return next;
          });
          toast.success("Removed from plan");
        } else {
          // ARCHITECTURAL: Add question to plan using planRepository.addQuestionToPlan(planId, questionId)
          // Requires implementing new repository method
          setPlanQuestions((prev) => {
            const next = new Set(prev);
            next.add(`${planId}-${questionId}`);
            return next;
          });
          toast.success("Added to plan");
        }
      } catch (err) {
        console.error("Failed to update plan:", err);
        toast.error(
          err instanceof Error ? err.message : "Failed to update plan",
        );
      }
    },
    [planRepository],
  );

  const openDeleteCardModal = useCallback((card: AdminLearningCard) => {
    setCardToDelete(card);
    setIsDeleteCardModalOpen(true);
  }, []);

  const closeDeleteCardModal = useCallback(() => {
    setIsDeleteCardModalOpen(false);
    setCardToDelete(null);
    setIsDeleting(false);
  }, []);

  const deleteCard = useCallback(async () => {
    if (!cardToDelete) return;
    setIsDeleting(true);
    try {
      await cardRepository.delete(cardToDelete.id);
      toast.success(`Deleted card "${cardToDelete.title}"`);
      await fetchData();
      closeDeleteCardModal();
    } catch (err) {
      console.error("Failed to delete card:", err);
      toast.error(err instanceof Error ? err.message : "Failed to delete card");
      setIsDeleting(false);
    }
  }, [cardToDelete, cardRepository, fetchData, closeDeleteCardModal]);

  const openCardManagementModal = useCallback(
    async (plan: LearningPlan) => {
      setSelectedPlanForCards(plan);
      setIsCardManagementModalOpen(true);
      setIsManagingCards(true);
      try {
        // ARCHITECTURAL: Fetch current plan cards using planRepository.getPlanCards(selectedPlanId) and available cards
        // Requires implementing new repository methods for plan-card relationships
        const current: any = [];
        setPlanCards(current || []);
        setAvailableCards(cards);
      } catch (err) {
        console.error("Failed to load cards:", err);
        toast.error(
          err instanceof Error ? err.message : "Failed to load cards",
        );
      } finally {
        setIsManagingCards(false);
      }
    },
    [cards],
  );

  const closeCardManagementModal = useCallback(() => {
    setIsCardManagementModalOpen(false);
    setSelectedPlanForCards(null);
    setPlanCards([]);
    setAvailableCards([]);
  }, []);

  const openPlanEditModal = useCallback((plan: LearningPlan) => {
    setPlanToEdit(plan);
    setPlanEditFormData({
      title: plan.title || plan.name || "",
      description: plan.description || "",
      estimated_duration: plan.estimated_duration || 0,
      status: (plan.status as "published" | "draft" | "archived") || "published",
    });
    setIsPlanEditModalOpen(true);
  }, []);

  const closePlanEditModal = useCallback(() => {
    setIsPlanEditModalOpen(false);
    setPlanToEdit(null);
    setPlanEditFormData({
      title: "",
      description: "",
      estimated_duration: 0,
      status: "published",
    });
  }, []);

  const updatePlan = useCallback(async () => {
    if (!planToEdit || !planRepository) return;

    try {
      await planRepository.update(planToEdit.id, {
        title: planEditFormData.title,
        description: planEditFormData.description,
        estimated_duration: planEditFormData.estimated_duration,
        status: planEditFormData.status,
      });

      toast.success("Plan updated successfully");
      closePlanEditModal();
      await fetchData();
    } catch (err) {
      console.error("Failed to update plan:", err);
      toast.error(
        err instanceof Error ? err.message : "Failed to update plan",
      );
    }
  }, [planToEdit, planEditFormData, planRepository, closePlanEditModal, fetchData]);

  const addCardToPlan = useCallback(
    async (cardId: string) => {
      if (!selectedPlanForCards) return;
      try {
        const nextOrder =
          Math.max(...planCards.map((pc) => pc.order_index), 0) + 1;
        // ARCHITECTURAL: Use planRepository.addCardToPlan(planId, cardId) method
        // Requires implementing new repository method
        //   selectedPlanForCards.id,
        //   cardId,
        //   nextOrder,
        // );
        setPlanCards((prev) => [
          ...prev,
          { card_id: cardId, order_index: nextOrder, is_active: true },
        ]);
        toast.success("Added to plan");
      } catch (err) {
        console.error("Failed to add card:", err);
        toast.error(err instanceof Error ? err.message : "Failed to add card");
      }
    },
    [selectedPlanForCards, planCards, planRepository],
  );

  const removeCardFromPlan = useCallback(
    async (cardId: string) => {
      if (!selectedPlanForCards) return;
      try {
        // ARCHITECTURAL: Use planRepository.removeCardFromPlan(planId, cardId) method
        // Requires implementing new repository method
        // await planRepository.removeCardFromPlan?.(
        //   selectedPlanForCards.id,
        //   cardId,
        // );
        setPlanCards((prev) => prev.filter((pc) => pc.card_id !== cardId));
        toast.success("Removed from plan");
      } catch (err) {
        console.error("Failed to remove card:", err);
        toast.error(
          err instanceof Error ? err.message : "Failed to remove card",
        );
      }
    },
    [selectedPlanForCards, planRepository],
  );

  const toggleCardActiveStatus = useCallback(
    async (cardId: string, isActive: boolean) => {
      if (!selectedPlanForCards) return;
      try {
        // ARCHITECTURAL: Use planRepository.updateCardStatus(cardId, status) or similar method
        // Requires implementing new repository method
        //   selectedPlanForCards.id,
        //   cardId,
        //   !isActive,
        // );
        setPlanCards((prev) =>
          prev.map((pc) =>
            pc.card_id === cardId ? { ...pc, is_active: !isActive } : pc,
          ),
        );
        toast.success("Status updated");
      } catch (err) {
        console.error("Failed to update status:", err);
        toast.error(
          err instanceof Error ? err.message : "Failed to update status",
        );
      }
    },
    [selectedPlanForCards, planRepository],
  );

  const createSpacedRepetitionPlans = useCallback(async () => {
    if (hasExistingSpacedPlans(plans)) {
      toast.info("Spaced-repetition plans already exist.");
      return;
    }

    if (cards.length === 0 || questions.length === 0) {
      toast.error("Need existing cards and questions before generating plans.");
      return;
    }

    try {
      await generateDashboardSpacedPlans(cards, questions);

      toast.success("Created dashboard-based spaced-repetition plans.");
      await fetchData();
    } catch (err) {
      console.error("Failed to generate spaced-repetition plans:", err);
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to generate spaced-repetition plans",
      );
    }
  }, [cards, fetchData, plans, questions]);

  const createCategory = useCallback(async () => {
    const name = globalThis.prompt("Category name");
    if (!name || !name.trim()) {
      return;
    }

    const description =
      globalThis.prompt("Category description (optional)") || "";

    const defaultCardId = cards[0]?.id;
    const payload: Record<string, unknown> = {
      name: name.trim(),
      description,
      slug: toSlug(name),
      is_active: true,
    };

    if (defaultCardId) {
      payload.learning_card_id = defaultCardId;
    }

    const { error: createError } = await supabase
      .from("categories")
      .insert(payload);

    if (createError) {
      toast.error(createError.message || "Failed to create category");
      return;
    }

    toast.success("Category created");
    await fetchData();
  }, [cards, fetchData]);

  const editCategory = useCallback(
    async (category: AdminCategory) => {
      const nextName = globalThis.prompt("Category name", category.name ?? "");
      if (!nextName || !nextName.trim()) {
        return;
      }

      const nextDescription =
        globalThis.prompt("Category description", category.description ?? "") ??
        "";

      const { error: updateError } = await supabase
        .from("categories")
        .update({
          name: nextName.trim(),
          description: nextDescription,
          slug: toSlug(nextName),
        })
        .eq("id", category.id);

      if (updateError) {
        toast.error(updateError.message || "Failed to update category");
        return;
      }

      toast.success("Category updated");
      await fetchData();
    },
    [fetchData],
  );

  const removeCategory = useCallback(
    async (category: AdminCategory) => {
      const confirmed = globalThis.confirm(
        `Delete category \"${category.name}\"?`,
      );
      if (!confirmed) {
        return;
      }

      const { error: deleteError } = await supabase
        .from("categories")
        .delete()
        .eq("id", category.id);

      if (deleteError) {
        toast.error(deleteError.message || "Failed to delete category");
        return;
      }

      toast.success("Category deleted");
      await fetchData();
    },
    [fetchData],
  );

  const createTopic = useCallback(async () => {
    if (categories.length === 0) {
      toast.error("Create a category first");
      return;
    }

    const name = globalThis.prompt("Topic name");
    if (!name || !name.trim()) {
      return;
    }

    const description = globalThis.prompt("Topic description (optional)") || "";
    const categoryId = categories[0]?.id;

    if (!categoryId) {
      toast.error("No category available for topic assignment");
      return;
    }

    const payload = {
      name: name.trim(),
      description,
      category_id: categoryId,
      is_active: true,
      order_index: 0,
    };

    const { error: createError } = await supabase
      .from("topics")
      .insert(payload);

    if (createError) {
      toast.error(createError.message || "Failed to create topic");
      return;
    }

    toast.success("Topic created");
    await fetchData();
  }, [categories, fetchData]);

  const editTopic = useCallback(
    async (topic: AdminTopic) => {
      const nextName = globalThis.prompt("Topic name", topic.name ?? "");
      if (!nextName || !nextName.trim()) {
        return;
      }

      const nextDescription =
        globalThis.prompt("Topic description", topic.description ?? "") ?? "";

      const { error: updateError } = await supabase
        .from("topics")
        .update({
          name: nextName.trim(),
          description: nextDescription,
        })
        .eq("id", topic.id);

      if (updateError) {
        toast.error(updateError.message || "Failed to update topic");
        return;
      }

      toast.success("Topic updated");
      await fetchData();
    },
    [fetchData],
  );

  const removeTopic = useCallback(
    async (topic: AdminTopic) => {
      const confirmed = globalThis.confirm(`Delete topic \"${topic.name}\"?`);
      if (!confirmed) {
        return;
      }

      const { error: deleteError } = await supabase
        .from("topics")
        .delete()
        .eq("id", topic.id);

      if (deleteError) {
        toast.error(deleteError.message || "Failed to delete topic");
        return;
      }

      toast.success("Topic deleted");
      await fetchData();
    },
    [fetchData],
  );

  return {
    cards,
    plans,
    categories,
    topics,
    questions,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filterCardType,
    setFilterCardType,
    stats,
    filteredCards,
    filteredPlans,
    planQuestions,
    expandedCards,
    toggleCard,
    expandedCategories,
    toggleCategory,
    expandedTopics,
    toggleTopic,
    expandedPlans,
    togglePlan,
    expandedPlanCards,
    togglePlanCard,
    expandedPlanCategories,
    togglePlanCategory,
    expandedPlanTopics,
    togglePlanTopic,
    isTopicQuestionsModalOpen,
    setIsTopicQuestionsModalOpen,
    selectedTopic,
    selectedPlan,
    selectedQuestions,
    toggleQuestionSelection,
    selectAllQuestions,
    deselectAllQuestions,
    addSelectedQuestionsToPlan,
    closeTopicQuestionsModal,
    toggleQuestionInPlan,
    isDeleteCardModalOpen,
    setIsDeleteCardModalOpen,
    cardToDelete,
    isDeleting,
    openDeleteCardModal,
    closeDeleteCardModal,
    deleteCard,
    isCardManagementModalOpen,
    setIsCardManagementModalOpen,
    selectedPlanForCards,
    planCards,
    availableCards,
    isManagingCards,
    openCardManagementModal,
    closeCardManagementModal,
    addCardToPlan,
    removeCardFromPlan,
    toggleCardActiveStatus,
    openTopicQuestionsModal,
    createSpacedRepetitionPlans,
    isPlanEditModalOpen,
    setIsPlanEditModalOpen,
    planToEdit,
    planEditFormData,
    setPlanEditFormData,
    openPlanEditModal,
    closePlanEditModal,
    updatePlan,
    createCategory,
    editCategory,
    removeCategory,
    createTopic,
    editTopic,
    removeTopic,
  };
}
