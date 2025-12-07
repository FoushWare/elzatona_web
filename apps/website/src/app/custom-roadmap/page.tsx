"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

import { useRouter } from "next/navigation";

// import { SignInPopup } from '@elzatona/components'; // Temporarily disabled due to import issues
import { useAuth, useUserType } from "@elzatona/contexts";
import { useLearningType } from "../../context/LearningTypeContext";
import {
  Plus,
  Minus,
  Check,
  Target,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Eye,
  X,
  PanelRightOpen,
  PanelRightClose,
  Clock,
  Zap,
  BookOpen,
} from "lucide-react";

interface Topic {
  id: string;
  name: string;
  description?: string;
  questions: Question[];
  isSelected: boolean;
  selectedQuestions: string[];
}

interface Category {
  id: string;
  name: string;
  description?: string;
  topics: Topic[];
  isSelected: boolean;
  selectedTopics: Set<string>;
}

interface Card {
  id: string;
  title: string;
  type: string;
  description?: string;
  categories: Category[];
  isSelected: boolean;
  selectedCategories: Set<string>;
}

interface Question {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedTime: string | null;
  points: number;
}

// Legacy Section interface for backward compatibility with existing code
interface Section {
  id: string;
  name: string;
  description: string;
  category: string;
  questions: Question[];
  isSelected: boolean;
  selectedQuestions: string[];
}

interface CustomPlan {
  id: string;
  name: string;
  description: string;
  duration: number;
  sections: Section[];
  totalQuestions: number;
  dailyQuestions: number;
  created_at: Date;
}

export default function CustomRoadmapPage() {
  const router = useRouter();
  const {
    isAuthenticated: authIsAuthenticated,
    user,
    isLoading: authIsLoading,
  } = useAuth();
  const { setUserType } = useUserType();
  const { setLearningType } = useLearningType();

  // Enhanced authentication check - check multiple sources
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  // Check authentication from multiple sources (similar to guided-learning page)
  useEffect(() => {
    let authCheckDone = false;

    const checkAuth = () => {
      if (authCheckDone) return;

      // Check AuthContext first
      if (authIsAuthenticated && user) {
        console.log("✅ [CustomRoadmap] Authenticated via AuthContext");
        setIsAuthenticated(true);
        setAuthCheckComplete(true);
        authCheckDone = true;
        return;
      }

      // Check localStorage and sessionStorage for various auth indicators
      if (typeof window !== "undefined") {
        // Check for auth token in localStorage
        const authToken = localStorage.getItem("auth-token");
        const frontendUser = localStorage.getItem("frontend-koddev-user");

        if (authToken || frontendUser) {
          console.log(
            "✅ [CustomRoadmap] Authenticated via localStorage (token or user data found)",
          );
          setIsAuthenticated(true);
          setAuthCheckComplete(true);
          authCheckDone = true;
          return;
        }

        // Check sessionStorage for isAuthenticated (could be string or JSON object)
        try {
          const commonAuthKeys = [
            "navbar-auth-state",
            "auth",
            "auth-state",
            "authentication",
            "isAuthenticated",
            "authStatus",
            "authState",
            "user-auth",
            "session-auth",
          ];

          for (const key of commonAuthKeys) {
            const value = sessionStorage.getItem(key);
            if (value) {
              try {
                const parsed = JSON.parse(value);
                if (
                  parsed &&
                  typeof parsed === "object" &&
                  parsed.isAuthenticated === true
                ) {
                  console.log(
                    `✅ [CustomRoadmap] Authenticated via sessionStorage (${key} with isAuthenticated=true)`,
                  );
                  setIsAuthenticated(true);
                  setAuthCheckComplete(true);
                  authCheckDone = true;
                  return;
                }
              } catch {
                // Not JSON, check if it's the string "true"
                if (value === "true") {
                  console.log(
                    `✅ [CustomRoadmap] Authenticated via sessionStorage (${key}=true string)`,
                  );
                  setIsAuthenticated(true);
                  setAuthCheckComplete(true);
                  authCheckDone = true;
                  return;
                }
              }
            }
          }
        } catch (e) {
          console.warn("Error checking sessionStorage:", e);
        }
      }

      // If we've waited for auth to load and still no authentication found
      if (!authIsLoading) {
        console.log(
          "❌ [CustomRoadmap] No authentication found after checking all sources",
        );
        setIsAuthenticated(false);
        setAuthCheckComplete(true);
        authCheckDone = true;
      } else {
        // If auth is still loading, we haven't found auth yet, but we should still mark check as attempting
        // This prevents the page from redirecting prematurely
        console.log(
          "⏳ [CustomRoadmap] Auth context still loading, waiting...",
        );
      }
    };

    checkAuth();

    // Safety timeout: if auth check takes too long, mark as complete anyway (prevents infinite loading)
    const safetyTimeout = setTimeout(() => {
      if (!authCheckDone) {
        console.warn(
          "⏰ [CustomRoadmap] Auth check timeout - marking as complete to prevent infinite loading",
        );
        setAuthCheckComplete(true);
        authCheckDone = true;
      }
    }, 5000); // 5 second timeout

    // Listen for storage changes (e.g., when user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === "auth-token" ||
        e.key === "frontend-koddev-user" ||
        e.key === "isAuthenticated" ||
        e.key === "navbar-auth-state"
      ) {
        console.log(
          "🔄 [CustomRoadmap] Storage changed, rechecking auth:",
          e.key,
        );
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom events (for same-tab auth changes)
    const handleAuthStateChange = () => {
      console.log(
        "🔄 [CustomRoadmap] Auth state changed event received, rechecking auth",
      );
      checkAuth();
    };

    window.addEventListener("auth-state-changed", handleAuthStateChange);

    return () => {
      clearTimeout(safetyTimeout);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-state-changed", handleAuthStateChange);
    };
  }, [authIsAuthenticated, user, authIsLoading, authCheckComplete]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [planName, setPlanName] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const [duration, setDuration] = useState(7);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());
  // Legacy sections state for backward compatibility
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSections, setSelectedSections] = useState<Set<string>>(
    new Set(),
  );
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasTriedLoadForStep2 = useRef(false); // Track if we've tried loading for step 2

  // Modal state for question details
  interface QuestionDetails {
    id: string;
    question_text?: string;
    question?: string;
    title?: string;
    difficulty?: string;
    question_type?: string;
    type?: string;
    estimated_time?: string;
    points?: number;
    point_value?: number;
    options?: string[];
    correct_answer?: string;
    correctAnswer?: string;
    explanation?: string;
    tags?: string[];
    [key: string]: unknown; // Allow additional fields from API
  }

  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    null,
  );
  const [questionDetails, setQuestionDetails] =
    useState<QuestionDetails | null>(null);
  const [isLoadingQuestionDetails, setIsLoadingQuestionDetails] =
    useState(false);
  const [isSummaryVisible, setIsSummaryVisible] = useState(true); // Start with summary open

  const loadSections = useCallback(async () => {
    console.log("📦 [loadSections] ==========================================");
    console.log("📦 [loadSections] START - Function called!");
    console.log("📦 [loadSections] Setting isLoading to true");
    setIsLoading(true);
    setError(null); // Clear any previous errors

    // Safety timeout: ALWAYS stop loading after 10 seconds
    const timeoutId = setTimeout(() => {
      console.warn("⏰ [TIMEOUT] Forcing isLoading to false after 10 seconds");
      setIsLoading(false);
      setError("Loading timeout. Please try again.");
    }, 10000);

    try {
      // Step 1: Fetch predefined cards
      console.log(
        "📡 [loadSections] ==========================================",
      );
      console.log(
        "📡 [loadSections] About to make fetch request to /api/cards...",
      );
      console.log("📡 [loadSections] Making fetch request NOW...");
      console.log(
        "📡 [loadSections] URL:",
        window.location.origin + "/api/cards",
      );
      console.log(
        "📡 [loadSections] Current window location:",
        window.location.href,
      );

      // Force the fetch to execute immediately - use absolute URL to ensure it works
      const cardsUrl = `${window.location.origin}/api/cards`;
      console.log("📡 [loadSections] Full URL:", cardsUrl);
      console.log("📡 [loadSections] Calling fetch() NOW...");

      const fetchPromise = fetch(cardsUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Ensure fresh request
      });

      console.log("📡 [loadSections] Fetch promise created:", fetchPromise);
      console.log("📡 [loadSections] Fetch promise type:", typeof fetchPromise);
      console.log(
        "📡 [loadSections] Is fetch promise?",
        fetchPromise instanceof Promise,
      );
      console.log("📡 [loadSections] Awaiting fetch response...");

      const cardsResponse = await fetchPromise;
      console.log(
        "📡 [loadSections] ==========================================",
      );
      console.log(
        "📡 [loadSections] Fetch completed! Status:",
        cardsResponse.status,
        "OK:",
        cardsResponse.ok,
      );
      console.log(
        "📡 [loadSections] Response headers:",
        Object.fromEntries(cardsResponse.headers.entries()),
      );

      interface ApiCard {
        id: string;
        title: string;
        name?: string;
        type: string;
        description?: string;
        icon?: string;
        color?: string;
        order?: number;
        order_index?: number;
      }

      let cardsFromAPI: ApiCard[] = [];

      if (cardsResponse.ok) {
        const cardsData = await cardsResponse.json();
        console.log("📦 [loadSections] Cards API response:", cardsData);

        // Handle different response formats
        if (Array.isArray(cardsData)) {
          cardsFromAPI = cardsData;
        } else if (cardsData.data && Array.isArray(cardsData.data)) {
          cardsFromAPI = cardsData.data;
        } else if (cardsData.cards && Array.isArray(cardsData.cards)) {
          cardsFromAPI = cardsData.cards;
        } else {
          cardsFromAPI = [];
        }

        console.log(
          `📦 [loadSections] Parsed ${cardsFromAPI.length} cards from API`,
        );

        // Filter to only the predefined cards we want
        const predefinedCardTypes = [
          "core-technologies",
          "framework-questions",
          "problem-solving",
          "system-design",
        ];
        const beforeFilter = cardsFromAPI.length;
        cardsFromAPI = cardsFromAPI.filter((card: ApiCard) => {
          const matches = predefinedCardTypes.includes(card.type);
          console.log(
            `🔍 [loadSections] Card "${card.title}" (type: ${card.type}, id: ${card.id}) - matches: ${matches}`,
          );
          return matches;
        });

        console.log(
          `📦 [loadSections] After filtering: ${beforeFilter} -> ${cardsFromAPI.length} cards`,
        );

        // Sort by order if available
        cardsFromAPI.sort((a, b) => {
          const orderA = a.order_index ?? a.order ?? 0;
          const orderB = b.order_index ?? b.order ?? 0;
          return orderA - orderB;
        });

        console.log(
          `✅ [loadSections] Found ${cardsFromAPI.length} predefined cards after filtering and sorting`,
        );
      } else {
        const errorText = await cardsResponse
          .text()
          .catch(() => "Unknown error");
        console.error(
          "❌ [loadSections] Cards API failed:",
          cardsResponse.status,
          errorText,
        );
        throw new Error(
          `Failed to fetch cards: ${cardsResponse.status} ${errorText}`,
        );
      }

      // If no cards found after filtering, throw an error (don't use mock data)
      if (cardsFromAPI.length === 0) {
        console.error("❌ [loadSections] No cards found after filtering");
        throw new Error(
          "No learning cards available. Please ensure cards are configured in the database.",
        );
      }

      // Step 2: Fetch categories
      console.log("📡 [loadSections] Fetching categories...");
      let categoriesFromAPI: ApiCategory[] = [];

      interface ApiCategory {
        id: string;
        name: string;
        description?: string;
        learning_card_id?: string;
        cardType?: string;
        card_type?: string; // Database field name
      }

      try {
        const categoriesResponse = await fetch("/api/categories");
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          categoriesFromAPI = Array.isArray(categoriesData)
            ? categoriesData
            : categoriesData.data || categoriesData.categories || [];
          console.log(
            `✅ [loadSections] Found ${categoriesFromAPI.length} categories`,
          );
        } else {
          const errorText = await categoriesResponse
            .text()
            .catch(() => "Unknown error");
          console.warn(
            "⚠️ [loadSections] Categories API failed:",
            categoriesResponse.status,
            errorText,
          );
          // Don't throw - continue with empty categories (cards can still be shown)
        }
      } catch (categoriesError) {
        console.warn(
          "⚠️ [loadSections] Categories fetch error:",
          categoriesError,
        );
        // Don't throw - continue with empty categories (cards can still be shown)
      }

      // Step 3: Fetch topics
      console.log("📡 [loadSections] Fetching topics...");

      interface ApiTopic {
        id: string;
        name: string;
        slug?: string;
        description?: string;
        category_id?: string;
        categoryId?: string;
      }

      let topicsFromAPI: ApiTopic[] = [];

      try {
        const topicsResponse = await fetch("/api/topics");
        if (topicsResponse.ok) {
          const topicsData = await topicsResponse.json();
          topicsFromAPI = Array.isArray(topicsData)
            ? topicsData
            : topicsData.data || topicsData.topics || [];
          console.log(`✅ [loadSections] Found ${topicsFromAPI.length} topics`);
        }
      } catch (topicsError) {
        console.warn("⚠️ [loadSections] Topics fetch failed:", topicsError);
      }

      // Step 4: Fetch questions
      console.log("📡 [loadSections] Fetching questions...");

      interface ApiQuestion {
        id: string;
        title?: string;
        question?: string;
        question_text?: string;
        difficulty?: string;
        estimated_time?: string;
        estimatedTime?: string;
        points?: number;
        point_value?: number;
        topic_id?: string;
        topicId?: string; // camelCase from API transformation
        learning_topic_id?: string;
        learningTopicId?: string;
        category_id?: string;
        categoryId?: string; // camelCase from API transformation
        learning_category_id?: string;
        learningCategoryId?: string;
        learning_card_id?: string;
      }

      let allQuestions: ApiQuestion[] = [];

      try {
        const questionsResponse = await fetch("/api/questions?limit=1000");
        if (questionsResponse.ok) {
          const questionsData = await questionsResponse.json();
          allQuestions = Array.isArray(questionsData)
            ? questionsData
            : questionsData.data || questionsData.questions || [];
          console.log(
            `✅ [loadSections] Found ${allQuestions.length} questions`,
          );
        }
      } catch (questionsError) {
        console.warn(
          "⚠️ [loadSections] Questions fetch failed:",
          questionsError,
        );
      }

      // Step 5: Build hierarchical structure: Cards -> Categories -> Topics -> Questions
      console.log(
        `🔄 [loadSections] Building hierarchy for ${cardsFromAPI.length} cards...`,
      );
      console.log(
        `📦 [loadSections] Available categories: ${categoriesFromAPI.length}`,
      );
      console.log(
        `📦 [loadSections] Available topics: ${topicsFromAPI.length}`,
      );
      console.log(
        `📦 [loadSections] Available questions: ${allQuestions.length}`,
      );

      // Ensure we have cards to transform
      if (cardsFromAPI.length === 0) {
        throw new Error(
          "No cards available from API. Please check the database configuration.",
        );
      }

      const transformedCards: Card[] = cardsFromAPI.map((card: ApiCard) => {
        console.log(
          `🔄 [loadSections] Processing card: ${card.title} (${card.type}, id: ${card.id})`,
        );

        // Find categories for this card (match by learning_card_id, card_type, or cardType)
        const cardCategories = categoriesFromAPI.filter((cat: ApiCategory) => {
          // Match by learning_card_id (exact match) - primary matching method
          if (cat.learning_card_id === card.id) {
            console.log(
              `✅ [loadSections] Category "${cat.name}" matches card "${card.title}" by learning_card_id`,
            );
            return true;
          }

          // Match by card_type or cardType (check both possible field names)
          const categoryCardType = cat.card_type || cat.cardType || "";

          // Map card types to their display names
          const cardTypeMapping: Record<string, string[]> = {
            "core-technologies": ["Core Technologies", "Core Technologies"],
            "framework-questions": [
              "Framework Questions",
              "Framework Questions",
            ],
            "problem-solving": [
              "Problem Solving",
              "Problem Solving",
              "Frontend Tasks",
            ],
            "system-design": ["System Design", "System Design"],
          };

          const possibleTypeNames = cardTypeMapping[card.type] || [
            card.title || "",
          ];

          // Check if category's card_type matches any of the possible type names for this card
          if (
            categoryCardType &&
            possibleTypeNames.some(
              (typeName) =>
                categoryCardType.toLowerCase() === typeName.toLowerCase(),
            )
          ) {
            console.log(
              `✅ [loadSections] Category "${cat.name}" (card_type: "${categoryCardType}") matches card "${card.title}" (type: "${card.type}") by card_type`,
            );
            return true;
          }

          // Also try matching by card title or type in category name (fallback)
          if (card.title && cat.name) {
            const cardTitleWords = card.title.toLowerCase().split(" ");
            const categoryNameLower = cat.name.toLowerCase();
            if (
              cardTitleWords.some(
                (word) => categoryNameLower.includes(word) && word.length > 3,
              )
            ) {
              console.log(
                `✅ [loadSections] Category "${cat.name}" matches card "${card.title}" by name similarity`,
              );
              return true;
            }
          }

          return false;
        });

        console.log(
          `📦 [loadSections] Card "${card.title}" has ${cardCategories.length} matching categories`,
        );

        // Transform categories with their topics and questions
        // If no categories match, create an empty array (card will still display, just without categories)
        const transformedCategories: Category[] = cardCategories.map(
          (category: ApiCategory) => {
            // Find topics for this category
            const categoryTopics = topicsFromAPI.filter(
              (topic: ApiTopic) =>
                topic.category_id === category.id ||
                topic.categoryId === category.id,
            );

            // Transform topics with their questions
            const transformedTopics: Topic[] = categoryTopics.map(
              (topic: ApiTopic) => {
                // Find questions for this topic - check multiple possible field names
                const topicQuestions = allQuestions
                  .filter((q: ApiQuestion) => {
                    // Try multiple possible field names for topic_id
                    const matchesTopicId =
                      q.topic_id === topic.id ||
                      q.topicId === topic.id ||
                      q.learning_topic_id === topic.id ||
                      q.learningTopicId === topic.id;

                    if (matchesTopicId) {
                      console.log(
                        `✅ [loadSections] Question "${q.title || q.question || q.id}" matches topic "${topic.name}" (id: ${topic.id})`,
                      );
                    }

                    return matchesTopicId;
                  })
                  .map((q: ApiQuestion) => ({
                    id: q.id,
                    title:
                      q.title ||
                      q.question ||
                      q.question_text ||
                      "Untitled Question",
                    difficulty: (q.difficulty === "beginner"
                      ? "Easy"
                      : q.difficulty === "advanced"
                        ? "Hard"
                        : "Medium") as "Easy" | "Medium" | "Hard",
                    estimatedTime: (q.estimated_time || q.estimatedTime) as
                      | string
                      | null,
                    points: q.points || q.point_value || 0,
                  }));

                console.log(
                  `📦 [loadSections] Topic "${topic.name}" (id: ${topic.id}) has ${topicQuestions.length} questions`,
                );

                return {
                  id: topic.id,
                  name: topic.name,
                  description: topic.description,
                  questions: topicQuestions,
                  isSelected: false,
                  selectedQuestions: [],
                };
              },
            );

            // Also find questions directly linked to category (without a topic) - check multiple field names
            const directCategoryQuestions = allQuestions
              .filter((q: ApiQuestion) => {
                const matchesCategory =
                  q.category_id === category.id ||
                  q.categoryId === category.id ||
                  q.learning_category_id === category.id ||
                  q.learningCategoryId === category.id;

                const hasNoTopic =
                  !q.topic_id &&
                  !q.topicId &&
                  !q.learning_topic_id &&
                  !q.learningTopicId;

                return matchesCategory && hasNoTopic;
              })
              .map((q: ApiQuestion) => ({
                id: q.id,
                title:
                  q.title ||
                  q.question ||
                  q.question_text ||
                  "Untitled Question",
                difficulty: (q.difficulty === "beginner"
                  ? "Easy"
                  : q.difficulty === "advanced"
                    ? "Hard"
                    : "Medium") as "Easy" | "Medium" | "Hard",
                estimatedTime: (q.estimated_time || q.estimatedTime) as
                  | string
                  | null,
                points: q.points || q.point_value || 0,
              }));

            // If there are direct category questions (not linked to a specific topic),
            // add them to a "General" topic for organization
            // This is a UI grouping mechanism, not hardcoded data
            if (directCategoryQuestions.length > 0) {
              transformedTopics.push({
                id: `category-${category.id}-general`,
                name: "General",
                description: "Questions without a specific topic",
                questions: directCategoryQuestions,
                isSelected: false,
                selectedQuestions: [],
              });
            }

            return {
              id: category.id,
              name: category.name,
              description: category.description,
              topics: transformedTopics,
              isSelected: false,
              selectedTopics: new Set(),
            };
          },
        );

        const transformedCard: Card = {
          id: card.id,
          title: card.title || card.name || "Untitled Card",
          type: card.type,
          description: card.description,
          categories: transformedCategories,
          isSelected: false,
          selectedCategories: new Set<string>(),
        };

        const totalTopics = transformedCategories.reduce(
          (sum, cat) => sum + cat.topics.length,
          0,
        );
        const totalQuestions = transformedCategories.reduce(
          (sum, cat) =>
            sum +
            cat.topics.reduce(
              (topicSum, topic) => topicSum + topic.questions.length,
              0,
            ),
          0,
        );

        console.log(
          `✅ [loadSections] Card "${card.title}" transformed: ${transformedCategories.length} categories, ${totalTopics} topics, ${totalQuestions} questions`,
        );

        return transformedCard;
      });

      // Clear timeout
      clearTimeout(timeoutId);

      // Set cards and stop loading
      console.log(`✅ [loadSections] Setting ${transformedCards.length} cards`);
      console.log(
        "📦 [loadSections] Transformed cards:",
        transformedCards.map((c) => ({
          id: c.id,
          title: c.title,
          categoriesCount: c.categories.length,
          totalTopics: c.categories.reduce(
            (sum, cat) => sum + cat.topics.length,
            0,
          ),
          totalQuestions: c.categories.reduce(
            (sum, cat) =>
              sum +
              cat.topics.reduce(
                (topicSum, topic) => topicSum + topic.questions.length,
                0,
              ),
            0,
          ),
        })),
      );

      // Always set cards, even if empty (so UI can show empty state)
      if (transformedCards.length > 0) {
        setCards(transformedCards);
        setError(null); // Clear any previous errors if we successfully loaded cards
        setIsLoading(false);
        console.log(
          `✅ [loadSections] DONE - Set ${transformedCards.length} cards, isLoading set to false`,
        );
      } else {
        // This shouldn't happen if the check above worked, but handle it anyway
        console.error(
          "❌ [loadSections] No transformed cards despite having cards from API",
        );
        throw new Error(
          "Failed to transform cards data. Please check the console for details.",
        );
      }
    } catch (error) {
      // Clear timeout
      clearTimeout(timeoutId);

      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("❌ [loadSections] ERROR:", error);
      console.error("❌ Error message:", errorMessage);

      // ALWAYS set loading to false on error and show error message
      setCards([]);
      setIsLoading(false);
      setError(
        errorMessage ||
          "Failed to load data from the database. Please try again.",
      );
      console.log("✅ [loadSections] ERROR HANDLED - isLoading set to false");
    }
  }, []); // Empty deps - loadSections is stable and doesn't need to change

  const checkAuthAndRedirect = useCallback(() => {
    // Clear any pending intent flags when user reaches this page (authenticated)
    if (isAuthenticated) {
      try {
        // Clear localStorage intent flags
        localStorage.removeItem("pending_browse_practice_questions_intent");
        localStorage.removeItem("pending_custom_roadmap_intent");
        console.log("✅ Cleared pending intent flags on custom-roadmap page");

        // Set navbar to Free Style mode
        setUserType("self-directed");
        setLearningType("free-style");
        console.log("✅ Set navbar to Free Style mode");
      } catch (e) {
        console.warn(
          "Error clearing localStorage flags or setting user type:",
          e,
        );
      }

      // ALWAYS load cards proactively when authenticated (regardless of current step)
      // This prepares the data while user fills in step 1, so it's ready for step 2
      if (cards.length === 0) {
        console.log(
          "📦 [Page Load] Proactively loading cards immediately (authenticated, no cards yet)...",
        );
        console.log(
          "📦 [Page Load] This will prepare data while user fills step 1 form",
        );
        console.log("📦 [Page Load] About to call loadSections()...");
        console.log("📦 [Page Load] loadSections type:", typeof loadSections);
        setIsLoading(true);

        // Call loadSections and ensure it executes
        try {
          const loadPromise = loadSections();
          console.log(
            "📦 [Page Load] loadSections() called, returned promise:",
            loadPromise,
          );

          if (loadPromise && typeof loadPromise.then === "function") {
            loadPromise
              .then(() => {
                console.log(
                  "✅ [Page Load] Cards loaded successfully and ready for step 2!",
                );
                setIsLoading(false);
              })
              .catch((error) => {
                console.error("❌ [Page Load] Error loading cards:", error);
                setIsLoading(false);
                setError(
                  error instanceof Error
                    ? error.message
                    : "Failed to load cards",
                );
              });
          } else {
            console.error(
              "❌ [Page Load] loadSections() did not return a promise!",
              loadPromise,
            );
            setIsLoading(false);
            setError("loadSections did not return a promise");
          }
        } catch (syncError) {
          console.error(
            "❌ [Page Load] Synchronous error calling loadSections:",
            syncError,
          );
          setIsLoading(false);
          setError(
            syncError instanceof Error
              ? syncError.message
              : "Failed to call loadSections",
          );
        }
      } else {
        // If cards are already loaded, just ensure loading is false
        console.log(
          "✅ [Page Load] Cards already loaded, setting isLoading to false",
        );
        setIsLoading(false);
      }
      return;
    }

    // If not authenticated, store intent and redirect to auth immediately
    try {
      localStorage.setItem("pending_browse_practice_questions_intent", "true");
      localStorage.setItem("pending_custom_roadmap_intent", "true");
      console.log("✅ Set pending intent flags before redirecting to auth");
      // Use window.location.href for immediate redirect (doesn't wait for React router)
      window.location.href = "/auth?redirect=/dashboard";
    } catch (e) {
      console.warn("Error setting localStorage flag:", e);
      // Fallback to router if window.location fails
      router.push("/auth?redirect=/dashboard");
    }
  }, [
    isAuthenticated,
    router,
    loadSections,
    setUserType,
    setLearningType,
    cards.length,
  ]);

  useEffect(() => {
    console.log("🔄 [useEffect] Running auth check...", {
      authIsLoading,
      isAuthenticated,
      hasCheckedAuth,
      authCheckComplete,
      cardsCount: cards.length,
    });

    // Wait for auth check to complete before proceeding
    if (!authCheckComplete) {
      console.log("⏳ [useEffect] Waiting for auth check to complete...");
      setIsLoading(true); // Keep loading state while waiting for auth
      return;
    }

    // Wait for auth context to finish loading before checking
    if (authIsLoading) {
      console.log("⏳ [useEffect] Waiting for auth context to load...");
      setIsLoading(true); // Keep loading state while waiting for auth
      return;
    }

    // Mark that we've checked auth (prevent multiple redirects)
    if (hasCheckedAuth) {
      console.log("✅ [useEffect] Auth already checked");
      // If already checked and authenticated but no cards, try loading again as fallback
      if (cards.length === 0 && isAuthenticated && !isLoading) {
        console.log(
          "🔄 [useEffect] Fallback: Loading cards (already checked auth, no cards)...",
        );
        setIsLoading(true);
        loadSections()
          .then(() => {
            console.log("✅ [useEffect] Fallback load successful");
            setIsLoading(false);
          })
          .catch((error: Error) => {
            console.error("❌ [useEffect] Fallback load error:", error);
            setIsLoading(false);
            setError(error.message || "Failed to load cards");
          });
      } else if (isLoading && !isAuthenticated) {
        // If not authenticated and loading, stop loading
        console.log("⚠️ [useEffect] Not authenticated, stopping load");
        setIsLoading(false);
      }
      return;
    }

    console.log(
      "✅ [useEffect] First time checking auth, setting hasCheckedAuth to true",
    );
    setHasCheckedAuth(true);

    // Check if we have pending intent flags (meaning we were redirected here from dashboard)
    const hasPendingIntent =
      localStorage.getItem("pending_browse_practice_questions_intent") ===
        "true" ||
      localStorage.getItem("pending_custom_roadmap_intent") === "true";

    // If we have pending flags and auth is still loading, wait a bit more
    if (hasPendingIntent && !isAuthenticated && authCheckComplete) {
      console.log(
        "⏳ [useEffect] Has pending intent, waiting a bit more for auth to propagate...",
      );
      const timeout = setTimeout(() => {
        checkAuthAndRedirect();
      }, 500);
      return () => clearTimeout(timeout);
    }

    // Only call checkAuthAndRedirect after auth check is complete
    if (authCheckComplete) {
      console.log(
        "✅ [useEffect] Auth check complete, calling checkAuthAndRedirect",
      );
      checkAuthAndRedirect();
    }
  }, [
    authIsLoading,
    isAuthenticated,
    hasCheckedAuth,
    authCheckComplete,
    checkAuthAndRedirect,
    isLoading,
    cards.length,
    loadSections,
    sections.length,
  ]);

  // Load cards automatically when step 2 is reached (fallback - cards should already be loaded from page load)
  useEffect(() => {
    console.log("🔍 [useEffect Step 2] Effect triggered with:", {
      currentStep,
      isAuthenticated,
      cardsLength: cards.length,
      error,
      isLoading,
      hasTriedLoad: hasTriedLoadForStep2.current,
      loadSectionsDefined: typeof loadSections === "function",
    });

    // Reset the ref when leaving step 2
    if (currentStep !== 2) {
      hasTriedLoadForStep2.current = false;
      return;
    }

    // FORCE load when on step 2, authenticated, and no cards - regardless of other conditions
    if (currentStep === 2 && isAuthenticated && cards.length === 0) {
      // Only try once per step 2 visit to avoid infinite loops
      if (!hasTriedLoadForStep2.current) {
        console.log("🚀 [useEffect Step 2] FORCING LOAD - All conditions met!");
        console.log(
          "🚀 [useEffect Step 2] Step 2 ✅, Authenticated ✅, No cards ✅",
        );

        hasTriedLoadForStep2.current = true; // Mark that we've tried

        // Set loading state immediately
        setIsLoading(true);
        setError(null);

        // Call loadSections immediately - don't wait for anything
        console.log("📞 [useEffect Step 2] Calling loadSections() NOW...");
        console.log(
          "📞 [useEffect Step 2] loadSections type:",
          typeof loadSections,
        );
        console.log("📞 [useEffect Step 2] loadSections value:", loadSections);

        try {
          const loadPromise = loadSections();
          console.log(
            "📞 [useEffect Step 2] loadSections() returned:",
            loadPromise,
          );
          console.log(
            "📞 [useEffect Step 2] Is promise?",
            loadPromise && typeof loadPromise.then === "function",
          );

          if (loadPromise && typeof loadPromise.then === "function") {
            loadPromise
              .then(() => {
                console.log("✅ [useEffect Step 2] Cards loaded successfully");
              })
              .catch((error: Error) => {
                console.error(
                  "❌ [useEffect Step 2] Error loading cards:",
                  error,
                );
                setIsLoading(false);
                setError(error.message || "Failed to load cards");
                // Reset on error so user can retry manually
                hasTriedLoadForStep2.current = false;
              });
          } else {
            console.error(
              "❌ [useEffect Step 2] loadSections() did not return a promise!",
              loadPromise,
            );
            setIsLoading(false);
            setError("loadSections did not return a promise");
            hasTriedLoadForStep2.current = false;
          }
        } catch (syncError) {
          console.error(
            "❌ [useEffect Step 2] Synchronous error calling loadSections:",
            syncError,
          );
          setIsLoading(false);
          setError(
            syncError instanceof Error
              ? syncError.message
              : "Failed to call loadSections",
          );
          hasTriedLoadForStep2.current = false;
        }
      } else {
        console.log(
          "⏸️ [useEffect Step 2] Already tried loading for this step 2 visit",
        );
      }
    } else {
      console.log("⏸️ [useEffect Step 2] Conditions not met:", {
        currentStepNot2: currentStep !== 2,
        notAuthenticated: !isAuthenticated,
        hasCards: cards.length > 0,
      });
    }
  }, [
    currentStep,
    isAuthenticated,
    cards.length,
    loadSections,
    error,
    isLoading,
  ]);

  // Card selection handlers - select all children when card is selected
  const handleCardToggle = (cardId: string) => {
    setCards((prev) =>
      prev.map((card) => {
        if (card.id === cardId) {
          const newIsSelected = !card.isSelected;

          // If selecting the card, select all categories, topics, and questions
          if (newIsSelected) {
            const updatedCategories = card.categories.map((category) => {
              // Select all topics in this category
              const updatedTopics = category.topics.map((topic) => {
                // Select all questions in this topic
                const allQuestionIds = topic.questions.map((q) => q.id);
                return {
                  ...topic,
                  isSelected: true,
                  selectedQuestions: allQuestionIds,
                };
              });
              // Select all topics
              const allTopicIds = new Set(updatedTopics.map((t) => t.id));
              return {
                ...category,
                isSelected: true,
                topics: updatedTopics,
                selectedTopics: allTopicIds,
              };
            });
            return {
              ...card,
              isSelected: true,
              categories: updatedCategories,
            };
          } else {
            // If deselecting, deselect all children
            const updatedCategories = card.categories.map((category) => {
              const updatedTopics = category.topics.map((topic) => ({
                ...topic,
                isSelected: false,
                selectedQuestions: [],
              }));
              return {
                ...category,
                isSelected: false,
                topics: updatedTopics,
                selectedTopics: new Set<string>(),
              };
            });
            return {
              ...card,
              isSelected: false,
              categories: updatedCategories,
            };
          }
        }
        return card;
      }),
    );

    const newSelectedCards = new Set(selectedCards);
    if (newSelectedCards.has(cardId)) {
      newSelectedCards.delete(cardId);
    } else {
      newSelectedCards.add(cardId);
    }
    setSelectedCards(newSelectedCards);

    // When a card is clicked, collapse the full summary
    // The compact version or collapsed badge will show based on question count
    // This allows users to see the count while keeping the summary collapsed
    setIsSummaryVisible(false);
  };

  // Category selection handlers - select all topics and questions when category is selected
  const handleCategoryToggle = (cardId: string, categoryId: string) => {
    setCards((prev) =>
      prev.map((card) => {
        if (card.id === cardId) {
          const updatedCategories = card.categories.map((category) => {
            if (category.id === categoryId) {
              const newIsSelected = !category.isSelected;

              if (newIsSelected) {
                // Select all topics and questions in this category
                const updatedTopics = category.topics.map((topic) => {
                  // Select all questions in this topic
                  const allQuestionIds = topic.questions.map((q) => q.id);
                  return {
                    ...topic,
                    isSelected: true,
                    selectedQuestions: allQuestionIds,
                  };
                });
                const allTopicIds = new Set(updatedTopics.map((t) => t.id));
                return {
                  ...category,
                  isSelected: true,
                  topics: updatedTopics,
                  selectedTopics: allTopicIds,
                };
              } else {
                // Deselect all topics and questions
                const updatedTopics = category.topics.map((topic) => ({
                  ...topic,
                  isSelected: false,
                  selectedQuestions: [],
                }));
                return {
                  ...category,
                  isSelected: false,
                  topics: updatedTopics,
                  selectedTopics: new Set<string>(),
                };
              }
            }
            return category;
          });
          return { ...card, categories: updatedCategories };
        }
        return card;
      }),
    );
  };

  // Topic selection handlers - select all questions when topic is selected
  const handleTopicToggle = (
    cardId: string,
    categoryId: string,
    topicId: string,
  ) => {
    setCards((prev) =>
      prev.map((card) => {
        if (card.id === cardId) {
          const updatedCategories = card.categories.map((category) => {
            if (category.id === categoryId) {
              const updatedTopics = category.topics.map((topic) => {
                if (topic.id === topicId) {
                  const newIsSelected = !topic.isSelected;

                  if (newIsSelected) {
                    // Select all questions in this topic
                    const allQuestionIds = topic.questions.map((q) => q.id);
                    return {
                      ...topic,
                      isSelected: true,
                      selectedQuestions: allQuestionIds,
                    };
                  } else {
                    // Deselect all questions
                    return {
                      ...topic,
                      isSelected: false,
                      selectedQuestions: [],
                    };
                  }
                }
                return topic;
              });
              const newSelectedTopics = new Set(category.selectedTopics);
              const topic = updatedTopics.find((t) => t.id === topicId);
              if (topic?.isSelected) {
                newSelectedTopics.add(topicId);
              } else {
                newSelectedTopics.delete(topicId);
              }
              return {
                ...category,
                topics: updatedTopics,
                selectedTopics: newSelectedTopics,
              };
            }
            return category;
          });
          return { ...card, categories: updatedCategories };
        }
        return card;
      }),
    );
  };

  // Question selection handlers (for cards structure)
  const handleQuestionToggleCard = (
    cardId: string,
    categoryId: string,
    topicId: string,
    questionId: string,
  ) => {
    setCards((prev) =>
      prev.map((card) => {
        if (card.id === cardId) {
          const updatedCategories = card.categories.map((category) => {
            if (category.id === categoryId) {
              const updatedTopics = category.topics.map((topic) => {
                if (topic.id === topicId) {
                  const newSelectedQuestions = topic.selectedQuestions.includes(
                    questionId,
                  )
                    ? topic.selectedQuestions.filter((id) => id !== questionId)
                    : [...topic.selectedQuestions, questionId];
                  return {
                    ...topic,
                    selectedQuestions: newSelectedQuestions,
                    isSelected: newSelectedQuestions.length > 0,
                  };
                }
                return topic;
              });
              return { ...category, topics: updatedTopics };
            }
            return category;
          });
          return { ...card, categories: updatedCategories };
        }
        return card;
      }),
    );
  };

  // Question selection handler (legacy for Step 3 sections)
  const handleQuestionToggle = (sectionId: string, question_id: string) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          const newSelectedQuestions = section.selectedQuestions.includes(
            question_id,
          )
            ? section.selectedQuestions.filter((id) => id !== question_id)
            : [...section.selectedQuestions, question_id];
          return { ...section, selectedQuestions: newSelectedQuestions };
        }
        return section;
      }),
    );
  };

  // Legacy handlers for backward compatibility (not used in new UI but kept for Step 3)
  // Section selection handlers - select all questions when section is selected
  const handleSectionToggle = (sectionId: string) => {
    const newSelectedSections = new Set(selectedSections);
    if (newSelectedSections.has(sectionId)) {
      newSelectedSections.delete(sectionId);
      // Deselect all questions in this section
      setSections((prev) =>
        prev.map((section) =>
          section.id === sectionId
            ? { ...section, isSelected: false, selectedQuestions: [] }
            : section,
        ),
      );
    } else {
      newSelectedSections.add(sectionId);
      // Select all questions in this section
      setSections((prev) =>
        prev.map((section) => {
          if (section.id === sectionId) {
            const allQuestionIds = section.questions.map((q) => q.id);
            return {
              ...section,
              isSelected: true,
              selectedQuestions: allQuestionIds,
            };
          }
          return section;
        }),
      );
    }
    setSelectedSections(newSelectedSections);
  };

  const handleSelectAllQuestions = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          const allQuestionIds = section.questions.map((q) => q.id);
          return { ...section, selectedQuestions: allQuestionIds };
        }
        return section;
      }),
    );
  };

  const handleClearAllQuestions = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          return { ...section, selectedQuestions: [] };
        }
        return section;
      }),
    );
  };

  // Fetch question details asynchronously - doesn't block UI
  const fetchQuestionDetails = useCallback(async (questionId: string) => {
    // Don't set loading here - it's already set when modal opens
    // This allows the modal to render immediately while fetching

    try {
      const response = await fetch(`/api/questions/${questionId}`);
      if (response.ok) {
        const data = await response.json();
        const questionData = data.data || data;

        // Parse options if they're stored as a JSON string
        if (questionData.options) {
          if (typeof questionData.options === "string") {
            try {
              questionData.options = JSON.parse(questionData.options);
            } catch (e) {
              console.warn("Failed to parse options JSON:", e);
              // Keep as string if parsing fails
            }
          }
        }

        // Parse tags if they're stored as a JSON string
        if (questionData.tags) {
          if (typeof questionData.tags === "string") {
            try {
              questionData.tags = JSON.parse(questionData.tags);
            } catch (e) {
              console.warn("Failed to parse tags JSON:", e);
              // Keep as string if parsing fails
            }
          }
        }

        setQuestionDetails(questionData);
      } else {
        throw new Error("Failed to fetch question details");
      }
    } catch (error) {
      console.error("Error fetching question details:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load question details",
      );
    } finally {
      setIsLoadingQuestionDetails(false);
    }
  }, []);

  // Handle opening question details modal - open immediately, fetch in background
  const handleViewQuestion = useCallback(
    (questionId: string, e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent checkbox toggle
      setSelectedQuestionId(questionId);
      setQuestionDetails(null); // Clear previous details
      setIsLoadingQuestionDetails(true);
      // Fetch in background - don't await, let it update when ready
      fetchQuestionDetails(questionId).catch((error) => {
        console.error("Error fetching question details:", error);
        // Error is already handled in fetchQuestionDetails
      });
    },
    [fetchQuestionDetails],
  );

  // Handle closing modal
  const handleCloseModal = useCallback(() => {
    setSelectedQuestionId(null);
    setQuestionDetails(null);
  }, []);

  const calculatePlanStats = () => {
    // Calculate from cards structure - count ALL selected questions from ALL cards
    // (not just from selected cards, because questions can be selected individually)
    let totalQuestions = 0;

    cards.forEach((card) => {
      // Count questions from all cards, regardless of card selection status
      // This allows users to select individual questions without selecting entire cards
      card.categories.forEach((category) => {
        category.topics.forEach((topic) => {
          totalQuestions += topic.selectedQuestions.length;
        });
      });
    });

    // Also calculate from legacy sections for backward compatibility
    const selectedSectionsData = sections.filter((section) =>
      selectedSections.has(section.id),
    );
    const legacyTotalQuestions = selectedSectionsData.reduce(
      (sum, section) => sum + section.selectedQuestions.length,
      0,
    );

    // Use whichever is greater (cards or legacy sections)
    totalQuestions = Math.max(totalQuestions, legacyTotalQuestions);
    const dailyQuestions = Math.ceil(totalQuestions / duration);

    return { totalQuestions, dailyQuestions };
  };

  const handleSavePlan = async () => {
    if (!planName.trim()) {
      alert("Please enter a plan name");
      return;
    }

    // Check if any questions are selected from cards
    const hasSelectedQuestions = cards.some((card) =>
      card.categories.some((category) =>
        category.topics.some((topic) => topic.selectedQuestions.length > 0),
      ),
    );

    if (!hasSelectedQuestions && totalQuestions === 0) {
      alert("Please select at least one question");
      return;
    }

    // Legacy sections check (for backward compatibility)
    const selectedSectionsData = sections.filter((section) =>
      selectedSections.has(section.id),
    );
    const totalSelectedQuestions = selectedSectionsData.reduce(
      (sum, section) => sum + section.selectedQuestions.length,
      0,
    );

    setIsSaving(true);
    setError(null);

    try {
      // Build plan data from selected cards structure
      const selectedCardsForPlan: Card[] = [];

      cards.forEach((card) => {
        if (card.isSelected || selectedCards.has(card.id)) {
          const selectedCategoriesForCard: Category[] = [];
          card.categories.forEach((category) => {
            if (category.isSelected || category.selectedTopics.size > 0) {
              const selectedTopicsForCategory: Topic[] = [];
              category.topics.forEach((topic) => {
                if (topic.isSelected || topic.selectedQuestions.length > 0) {
                  selectedTopicsForCategory.push({
                    ...topic,
                    questions: topic.questions.filter((q) =>
                      topic.selectedQuestions.includes(q.id),
                    ),
                  });
                }
              });
              if (selectedTopicsForCategory.length > 0) {
                selectedCategoriesForCard.push({
                  ...category,
                  topics: selectedTopicsForCategory,
                });
              }
            }
          });
          if (selectedCategoriesForCard.length > 0) {
            selectedCardsForPlan.push({
              ...card,
              categories: selectedCategoriesForCard,
            });
          }
        }
      });

      // Calculate total questions from cards structure
      let totalSelectedQuestionsFromCards = 0;
      selectedCardsForPlan.forEach((card) => {
        card.categories.forEach((category) => {
          category.topics.forEach((topic) => {
            totalSelectedQuestionsFromCards += topic.selectedQuestions.length;
          });
        });
      });

      // Use cards structure if available, otherwise fall back to legacy sections
      const totalQuestions =
        totalSelectedQuestionsFromCards > 0
          ? totalSelectedQuestionsFromCards
          : totalSelectedQuestions;

      // Create plan object
      const plan: CustomPlan = {
        id: `plan_${Date.now()}`,
        name: planName,
        description: planDescription,
        duration,
        sections: selectedSectionsData, // Legacy format for compatibility
        totalQuestions,
        dailyQuestions: Math.ceil(totalQuestions / duration),
        created_at: new Date(),
      };

      // TODO: Replace with API call to save plan to database
      // For now, save to localStorage as a temporary solution
      // In production, this should be: await fetch('/api/plans', { method: 'POST', body: JSON.stringify(plan) })
      const existingPlans = JSON.parse(
        localStorage.getItem("userPlans") || "[]",
      );
      existingPlans.push(plan);
      localStorage.setItem("userPlans", JSON.stringify(existingPlans));

      setIsSaving(false);
      router.push("/my-plans");
    } catch (err) {
      setIsSaving(false);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save plan";
      setError(errorMessage);
      console.error("Error saving plan:", err);
    }
  };

  const { totalQuestions, dailyQuestions } = calculatePlanStats();

  // Show loading/redirecting state if waiting for auth check or auth context to load
  if (
    authIsLoading ||
    !authCheckComplete ||
    (!isAuthenticated && !hasCheckedAuth)
  ) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Checking authentication...
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Please wait
          </p>
        </div>
      </div>
    );
  }

  // Show redirecting state if not authenticated (after auth check is complete)
  if (!isAuthenticated && hasCheckedAuth && authCheckComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Redirecting to login...
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Please sign in to continue
          </p>
        </div>
      </div>
    );
  }

  // Don't block the UI - always show the form, even while loading
  // Loading states will be shown within specific sections (Step 2) instead

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-20 scale-110" />
            <div className="relative w-24 h-24 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
              <Target className="w-12 h-12 text-white" />
              <div
                className="absolute inset-0 rounded-3xl border-4 border-white/20 animate-spin"
                style={{ animationDuration: "8s" }}
              />
            </div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Create Your Custom Roadmap
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
            Build a personalized learning path tailored to your goals, schedule,
            and interests. Choose from all available sections and select
            specific questions to create your perfect study plan.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {currentStep > step ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      currentStep > step
                        ? "bg-indigo-600"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Plan Details */}
        {currentStep === 1 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Plan Details
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Plan Name *
                  </label>
                  <input
                    type="text"
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    placeholder="e.g., Frontend Mastery Plan"
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={planDescription}
                    onChange={(e) => setPlanDescription(e.target.value)}
                    placeholder="Describe your learning goals and what you want to achieve..."
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Duration (days)
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setDuration(Math.max(1, duration - 1))}
                      className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) =>
                        setDuration(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      min="1"
                      max="365"
                      className="w-20 text-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      onClick={() => setDuration(Math.min(365, duration + 1))}
                      className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-right">
                <button
                  onClick={() => {
                    console.log(
                      "🖱️ [Button Click] Moving to step 2, cards.length:",
                      cards.length,
                    );
                    setCurrentStep(2);
                    // Reset the ref so useEffect can trigger load
                    hasTriedLoadForStep2.current = false;
                    // Always try to load cards when moving to step 2 if we don't have them
                    if (cards.length === 0 && isAuthenticated) {
                      console.log(
                        "🔄 [Button Click] Starting to load cards immediately when moving to step 2...",
                      );
                      hasTriedLoadForStep2.current = true; // Prevent duplicate calls
                      setIsLoading(true);
                      setError(null);
                      loadSections()
                        .then(() => {
                          console.log(
                            "✅ [Button Click] loadSections completed successfully",
                          );
                        })
                        .catch((error: Error) => {
                          console.error(
                            "❌ [Button Click] Error loading cards:",
                            error,
                          );
                          setIsLoading(false);
                          setError(error.message || "Failed to load cards");
                          hasTriedLoadForStep2.current = false; // Allow retry
                        });
                    }
                  }}
                  disabled={!planName.trim()}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:shadow-none"
                >
                  Next: Select Sections
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Select Cards and Content */}
        {currentStep === 2 && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Select Learning Content
                </h2>
              </div>

              {/* Show loading indicator at top if loading, but don't block the UI */}
              {isLoading && cards.length === 0 && (
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-600 dark:text-blue-400" />
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      Loading cards in the background... You can continue with
                      other steps.
                    </p>
                  </div>
                </div>
              )}

              {/* Show error banner at top if error, but don't block the UI */}
              {error && cards.length === 0 && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <p className="text-red-700 dark:text-red-300 text-sm">
                        {error}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setError(null);
                        setIsLoading(true);
                        loadSections();
                      }}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}

              {/* Show cards if available, or empty state if not loading and no error */}
              {cards.length === 0 && !isLoading && !error ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
                    No cards available yet
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                    Cards will appear here once they&apos;re loaded from the
                    database.
                  </p>
                  <button
                    onClick={() => {
                      setIsLoading(true);
                      setError(null);
                      loadSections();
                    }}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors"
                  >
                    Load Cards
                  </button>
                </div>
              ) : (
                cards.length > 0 && (
                  <div className="space-y-4">
                    {cards.map((card) => (
                      <div
                        key={card.id}
                        className={`border-2 rounded-xl overflow-hidden transition-all ${
                          selectedCards.has(card.id)
                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                            : "border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        {/* Card Header */}
                        <div
                          className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => {
                            handleCardToggle(card.id);
                            setExpandedCard(
                              expandedCard === card.id ? null : card.id,
                            );
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedCard(
                                    expandedCard === card.id ? null : card.id,
                                  );
                                }}
                                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                              >
                                {expandedCard === card.id ? (
                                  <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                ) : (
                                  <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                )}
                              </button>
                              <div
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                  selectedCards.has(card.id)
                                    ? "border-indigo-500 bg-indigo-500"
                                    : "border-gray-300 dark:border-gray-600"
                                }`}
                              >
                                {selectedCards.has(card.id) && (
                                  <Check className="w-4 h-4 text-white" />
                                )}
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {card.title}
                              </h3>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {card.description}
                            </p>
                          </div>
                        </div>

                        {/* Card Content - Categories */}
                        {expandedCard === card.id && (
                          <div className="px-4 pb-4 space-y-3">
                            {card.categories.length === 0 ? (
                              <p className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">
                                No categories available for this card
                              </p>
                            ) : (
                              card.categories.map((category) => (
                                <div
                                  key={category.id}
                                  className={`border rounded-lg overflow-hidden ${
                                    category.isSelected
                                      ? "border-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/10"
                                      : "border-gray-200 dark:border-gray-700"
                                  }`}
                                >
                                  {/* Category Header */}
                                  <div
                                    className="p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    onClick={() => {
                                      handleCategoryToggle(
                                        card.id,
                                        category.id,
                                      );
                                      setExpandedCategory(
                                        expandedCategory === category.id
                                          ? null
                                          : category.id,
                                      );
                                    }}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-2">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setExpandedCategory(
                                              expandedCategory === category.id
                                                ? null
                                                : category.id,
                                            );
                                          }}
                                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                                        >
                                          {expandedCategory === category.id ? (
                                            <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                          ) : (
                                            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                          )}
                                        </button>
                                        <div
                                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                            category.isSelected
                                              ? "border-indigo-500 bg-indigo-500"
                                              : "border-gray-300 dark:border-gray-600"
                                          }`}
                                        >
                                          {category.isSelected && (
                                            <Check className="w-3 h-3 text-white" />
                                          )}
                                        </div>
                                        <h4 className="font-medium text-gray-800 dark:text-gray-200">
                                          {category.name}
                                        </h4>
                                      </div>
                                      <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {category.topics.reduce(
                                          (sum, t) => sum + t.questions.length,
                                          0,
                                        )}{" "}
                                        questions
                                      </span>
                                    </div>
                                  </div>

                                  {/* Category Content - Topics */}
                                  {expandedCategory === category.id && (
                                    <div className="px-3 pb-3 space-y-2">
                                      {category.topics.length === 0 ? (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 py-2 text-center">
                                          No topics available
                                        </p>
                                      ) : (
                                        category.topics.map((topic) => (
                                          <div
                                            key={topic.id}
                                            className={`border rounded-md overflow-hidden ${
                                              topic.isSelected
                                                ? "border-indigo-300 bg-indigo-50/30 dark:bg-indigo-900/5"
                                                : "border-gray-200 dark:border-gray-700"
                                            }`}
                                          >
                                            {/* Topic Header */}
                                            <div
                                              className="p-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                              onClick={() => {
                                                handleTopicToggle(
                                                  card.id,
                                                  category.id,
                                                  topic.id,
                                                );
                                                setExpandedTopic(
                                                  expandedTopic === topic.id
                                                    ? null
                                                    : topic.id,
                                                );
                                              }}
                                            >
                                              <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                  <button
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      setExpandedTopic(
                                                        expandedTopic ===
                                                          topic.id
                                                          ? null
                                                          : topic.id,
                                                      );
                                                    }}
                                                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                                                  >
                                                    {expandedTopic ===
                                                    topic.id ? (
                                                      <ChevronDown className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                                    ) : (
                                                      <ChevronRight className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                                    )}
                                                  </button>
                                                  <div
                                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                                      topic.isSelected
                                                        ? "border-indigo-500 bg-indigo-500"
                                                        : "border-gray-300 dark:border-gray-600"
                                                    }`}
                                                  >
                                                    {topic.isSelected && (
                                                      <Check className="w-2 h-2 text-white" />
                                                    )}
                                                  </div>
                                                  <span className="text-sm text-gray-700 dark:text-gray-300">
                                                    {topic.name}
                                                  </span>
                                                </div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                  {topic.questions.length}{" "}
                                                  questions
                                                </span>
                                              </div>
                                            </div>

                                            {/* Topic Content - Questions */}
                                            {expandedTopic === topic.id &&
                                              topic.questions.length > 0 && (
                                                <div className="px-2 pb-2 space-y-1 max-h-60 overflow-y-auto">
                                                  {topic.questions.map(
                                                    (question) => (
                                                      <label
                                                        key={question.id}
                                                        className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer"
                                                        onClick={(e) =>
                                                          e.stopPropagation()
                                                        }
                                                      >
                                                        <input
                                                          type="checkbox"
                                                          checked={topic.selectedQuestions.includes(
                                                            question.id,
                                                          )}
                                                          onChange={() =>
                                                            handleQuestionToggleCard(
                                                              card.id,
                                                              category.id,
                                                              topic.id,
                                                              question.id,
                                                            )
                                                          }
                                                          className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                                        />
                                                        <span className="text-xs text-gray-700 dark:text-gray-300 flex-1">
                                                          {question.title}
                                                        </span>
                                                        <button
                                                          onClick={(e) =>
                                                            handleViewQuestion(
                                                              question.id,
                                                              e,
                                                            )
                                                          }
                                                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                                                          title="View question details"
                                                        >
                                                          <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                                        </button>
                                                        <span
                                                          className={`text-xs px-1.5 py-0.5 rounded ${
                                                            question.difficulty ===
                                                            "Easy"
                                                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                              : question.difficulty ===
                                                                  "Medium"
                                                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                          }`}
                                                        >
                                                          {question.difficulty}
                                                        </span>
                                                      </label>
                                                    ),
                                                  )}
                                                </div>
                                              )}
                                          </div>
                                        ))
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
              )}

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={totalQuestions === 0}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:shadow-none"
                >
                  Next: Review Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review Selected Questions */}
        {currentStep === 3 && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Review Your Selected Questions
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {totalQuestions}{" "}
                    {totalQuestions === 1 ? "question" : "questions"} selected
                    across {selectedCards.size}{" "}
                    {selectedCards.size === 1 ? "card" : "cards"}
                  </p>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800">
                  <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1">
                    Total Questions
                  </div>
                  <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">
                    {totalQuestions}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                  <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">
                    Duration
                  </div>
                  <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {duration} days
                  </div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-xl p-4 border border-pink-200 dark:border-pink-800">
                  <div className="text-sm text-pink-600 dark:text-pink-400 font-medium mb-1">
                    Daily Goal
                  </div>
                  <div className="text-2xl font-bold text-pink-900 dark:text-pink-100">
                    {dailyQuestions}/day
                  </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                  <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1">
                    Progress
                  </div>
                  <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                    {Math.round(
                      (totalQuestions /
                        Math.max(dailyQuestions * duration, 1)) *
                        100,
                    )}
                    %
                  </div>
                </div>
              </div>

              {/* Selected Questions by Card */}
              <div className="space-y-6">
                {cards
                  .filter((card) => {
                    // Show card if it has any selected questions
                    return card.categories.some((category) =>
                      category.topics.some(
                        (topic) => topic.selectedQuestions.length > 0,
                      ),
                    );
                  })
                  .map((card) => (
                    <div
                      key={card.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gradient-to-br from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-800"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {card.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {card.categories.reduce(
                              (total, cat) =>
                                total +
                                cat.topics.reduce(
                                  (sum, topic) =>
                                    sum + topic.selectedQuestions.length,
                                  0,
                                ),
                              0,
                            )}{" "}
                            {card.categories.reduce(
                              (total, cat) =>
                                total +
                                cat.topics.reduce(
                                  (sum, topic) =>
                                    sum + topic.selectedQuestions.length,
                                  0,
                                ),
                              0,
                            ) === 1
                              ? "question"
                              : "questions"}{" "}
                            selected
                          </p>
                        </div>
                      </div>

                      {/* Categories and Topics */}
                      <div className="space-y-4">
                        {card.categories
                          .filter((category) =>
                            category.topics.some(
                              (topic) => topic.selectedQuestions.length > 0,
                            ),
                          )
                          .map((category) => (
                            <div
                              key={category.id}
                              className="ml-4 border-l-2 border-indigo-200 dark:border-indigo-800 pl-4"
                            >
                              <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
                                {category.name}
                              </h4>
                              {category.topics
                                .filter(
                                  (topic) => topic.selectedQuestions.length > 0,
                                )
                                .map((topic) => (
                                  <div key={topic.id} className="ml-4 mb-3">
                                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                      {topic.name} (
                                      {topic.selectedQuestions.length}{" "}
                                      {topic.selectedQuestions.length === 1
                                        ? "question"
                                        : "questions"}
                                      )
                                    </h5>
                                    <div className="grid md:grid-cols-2 gap-3">
                                      {topic.questions
                                        .filter((q) =>
                                          topic.selectedQuestions.includes(
                                            q.id,
                                          ),
                                        )
                                        .map((question) => (
                                          <div
                                            key={question.id}
                                            className="p-3 rounded-lg border-2 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 flex items-start justify-between group hover:shadow-md transition-all duration-200"
                                          >
                                            <div className="flex-1 min-w-0">
                                              <div className="flex items-start justify-between mb-2">
                                                <h6 className="font-medium text-gray-900 dark:text-white text-sm flex-1 pr-2">
                                                  {question.title}
                                                </h6>
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleViewQuestion(
                                                      question.id,
                                                      e,
                                                    );
                                                  }}
                                                  className="p-1 hover:bg-indigo-200 dark:hover:bg-indigo-800 rounded transition-colors flex-shrink-0"
                                                  title="View question details"
                                                >
                                                  <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                                </button>
                                              </div>
                                              <div className="flex items-center space-x-2 flex-wrap gap-1">
                                                <span
                                                  className={`px-2 py-0.5 rounded text-xs ${
                                                    question.difficulty ===
                                                    "Easy"
                                                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                      : question.difficulty ===
                                                          "Medium"
                                                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                  }`}
                                                >
                                                  {question.difficulty}
                                                </span>
                                                {question.estimatedTime && (
                                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {question.estimatedTime}
                                                  </span>
                                                )}
                                                {question.points && (
                                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {question.points} pts
                                                  </span>
                                                )}
                                              </div>
                                            </div>
                                            <button
                                              onClick={() => {
                                                // Find the card, category, and topic to remove this question
                                                const cardIndex =
                                                  cards.findIndex(
                                                    (c) => c.id === card.id,
                                                  );
                                                if (cardIndex !== -1) {
                                                  const categoryIndex = cards[
                                                    cardIndex
                                                  ].categories.findIndex(
                                                    (c) => c.id === category.id,
                                                  );
                                                  if (categoryIndex !== -1) {
                                                    const topicIndex = cards[
                                                      cardIndex
                                                    ].categories[
                                                      categoryIndex
                                                    ].topics.findIndex(
                                                      (t) => t.id === topic.id,
                                                    );
                                                    if (topicIndex !== -1) {
                                                      handleQuestionToggleCard(
                                                        card.id,
                                                        category.id,
                                                        topic.id,
                                                        question.id,
                                                      );
                                                    }
                                                  }
                                                }
                                              }}
                                              className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors ml-2 flex-shrink-0"
                                              title="Remove question"
                                            >
                                              <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                                            </button>
                                          </div>
                                        ))}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>

              {totalQuestions === 0 && (
                <div className="text-center py-12">
                  <Target className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No questions selected yet
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                    Go back to select questions from your cards
                  </p>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleSavePlan}
                  disabled={totalQuestions === 0 || isSaving}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:shadow-none flex items-center space-x-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Create Plan</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Plan Summary Toggle Button Container - Fixed positioning with relative toggle button and absolute badge */}
      {currentStep > 1 && (
        <div
          className={`fixed top-1/2 transform -translate-y-1/2 z-20 ${
            isSummaryVisible
              ? totalQuestions > 0
                ? "right-[19rem]"
                : "right-[22rem]"
              : totalQuestions > 0
                ? "right-[10rem]"
                : "right-8"
          }`}
        >
          {/* Toggle Button - Relative positioned */}
          <button
            onClick={() => setIsSummaryVisible(!isSummaryVisible)}
            className="relative w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-3xl"
            aria-label={isSummaryVisible ? "Hide summary" : "Show summary"}
            title={isSummaryVisible ? "Hide Plan Summary" : "Show Plan Summary"}
          >
            {isSummaryVisible ? (
              <PanelRightClose className="w-6 h-6" />
            ) : (
              <PanelRightOpen className="w-6 h-6" />
            )}
          </button>

          {/* Premium Collapsed Count Badge - Absolute positioned under toggle button */}
          {!isSummaryVisible && totalQuestions > 0 && (
            <button
              onClick={() => setIsSummaryVisible(true)}
              className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 w-32 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl shadow-2xl border-2 border-white/30 dark:border-white/20 p-4 z-10 transition-all duration-300 hover:shadow-3xl hover:scale-105 hover:from-indigo-600 hover:via-purple-700 hover:to-pink-600 cursor-pointer group relative overflow-hidden"
              title="Click to expand plan summary"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/50 via-purple-400/50 to-pink-400/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

              <div className="flex flex-col items-center space-y-2.5 relative z-10">
                {/* Icon with animated pulse */}
                <div className="relative">
                  <div className="absolute inset-0 bg-white/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 animate-pulse" />
                  <div className="w-10 h-10 bg-white/25 dark:bg-white/15 rounded-xl flex items-center justify-center shadow-xl backdrop-blur-md border border-white/30 group-hover:bg-white/35 group-hover:scale-110 transition-all duration-300">
                    <Target className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                </div>

                {/* Count with gradient text - better alignment */}
                <div className="text-center w-full">
                  <div className="text-2xl font-black text-white drop-shadow-2xl mb-0.5 leading-tight">
                    {totalQuestions}
                  </div>
                  <div className="text-[10px] text-white/95 dark:text-white/90 font-bold uppercase tracking-wider leading-tight">
                    {totalQuestions === 1 ? "Question" : "Questions"}
                  </div>
                </div>

                {/* Progress bar with percentage */}
                <div className="w-full space-y-1">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[8px] text-white/80 font-medium">
                      Progress
                    </span>
                    <span className="text-[8px] text-white font-bold">
                      {Math.round(
                        (totalQuestions /
                          Math.max(dailyQuestions * duration, 1)) *
                          100,
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                    <div
                      className="h-full bg-gradient-to-r from-white via-white/90 to-white rounded-full transition-all duration-700 ease-out shadow-lg relative"
                      style={{
                        width: `${Math.min(100, (totalQuestions / Math.max(dailyQuestions * duration, 1)) * 100)}%`,
                      }}
                    >
                      {/* Shimmer effect */}
                      <div
                        className="absolute inset-0 opacity-60"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                          backgroundSize: "200% 100%",
                          animation: "shimmer 2s linear infinite",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Quick stats indicator */}
                <div className="flex items-center gap-2 pt-0.5">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-white/80" />
                    <span className="text-[8px] text-white/80 font-medium">
                      {duration}d
                    </span>
                  </div>
                  <div className="w-px h-2.5 bg-white/30" />
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-white/80" />
                    <span className="text-[8px] text-white/80 font-medium">
                      {dailyQuestions}/day
                    </span>
                  </div>
                </div>
              </div>

              {/* Expand hint - positioned at top */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-60 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-1 text-white/70 bg-indigo-500/80 dark:bg-indigo-600/80 px-2 py-1 rounded-full backdrop-blur-sm">
                  <PanelRightOpen className="w-3 h-3" />
                  <span className="text-[8px] font-medium uppercase tracking-wider">
                    Expand
                  </span>
                </div>
              </div>
            </button>
          )}
        </div>
      )}

      {/* Enhanced Plan Summary Sidebar - Full Summary (shown when no questions selected) */}
      {currentStep > 1 && isSummaryVisible && totalQuestions === 0 && (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-indigo-200/60 dark:border-indigo-700/60 p-6 z-10 transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] animate-in fade-in slide-in-from-right-4">
          {/* Header with Icon */}
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110 hover:rotate-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Plan Summary
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Overview of your roadmap
              </p>
            </div>
          </div>

          {/* Stats Grid with Enhanced Design */}
          <div className="space-y-3">
            <div className="group flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-pink-50/50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/50 transition-all duration-200 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md hover:scale-[1.02]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium block">
                    Duration
                  </span>
                  <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                    {duration} days
                  </span>
                </div>
              </div>
            </div>

            <div className="group flex items-center justify-between p-4 bg-gradient-to-r from-purple-50/50 via-pink-50/50 to-rose-50/50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-rose-900/20 rounded-xl border border-purple-100 dark:border-purple-800/50 transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md hover:scale-[1.02]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium block">
                    Selected Cards
                  </span>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
                    {selectedCards.size}
                  </span>
                </div>
              </div>
            </div>

            <div className="group flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/50 via-cyan-50/50 to-teal-50/50 dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-teal-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50 transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md hover:scale-[1.02]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium block">
                    Total Questions
                  </span>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
                    {totalQuestions}
                  </span>
                </div>
              </div>
            </div>

            <div className="group flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50/50 via-green-50/50 to-lime-50/50 dark:from-emerald-900/20 dark:via-green-900/20 dark:to-lime-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/50 transition-all duration-200 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md hover:scale-[1.02]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center shadow-md">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium block">
                    Daily Goal
                  </span>
                  <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-green-400">
                    {dailyQuestions} {dailyQuestions === 1 ? "Q" : "Qs"}/day
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Helpful Hint */}
          <div className="mt-6 p-3 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
              💡 Select questions from cards to build your custom plan
            </p>
          </div>
        </div>
      )}

      {/* Enhanced Compact Question Count Indicator with Header (shown when questions are selected) */}
      {currentStep > 1 && isSummaryVisible && totalQuestions > 0 && (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 w-72 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-indigo-200/60 dark:border-indigo-700/60 p-5 z-10 transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] animate-in fade-in slide-in-from-right-4">
          {/* Header with Icon and Count */}
          <div className="flex items-center space-x-3 mb-5 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110 hover:rotate-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">
                Plan Summary
              </h3>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                {totalQuestions}{" "}
                {totalQuestions === 1 ? "Question" : "Questions"} Selected
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Progress
              </span>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {Math.round(
                  (totalQuestions / Math.max(dailyQuestions * duration, 1)) *
                    100,
                )}
                %
              </span>
            </div>
            <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{
                  width: `${Math.min(100, (totalQuestions / Math.max(dailyQuestions * duration, 1)) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Quick Stats with Icons */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/50 transition-all duration-200 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Duration:
                </span>
              </div>
              <span className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                {duration} days
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-100 dark:border-purple-800/50 transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Daily Goal:
                </span>
              </div>
              <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
                {dailyQuestions} {dailyQuestions === 1 ? "Q" : "Qs"}/day
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Question Details Modal */}
      {selectedQuestionId && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Question Details
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {isLoadingQuestionDetails ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                  <span className="ml-3 text-gray-600 dark:text-gray-400">
                    Loading question details...
                  </span>
                </div>
              ) : questionDetails ? (
                <div className="space-y-6">
                  {/* Question Text */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                      Question
                    </h3>
                    <p className="text-lg text-gray-900 dark:text-white">
                      {questionDetails.question_text ||
                        questionDetails.question ||
                        questionDetails.title ||
                        "No question text available"}
                    </p>
                  </div>

                  {/* Question Metadata */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                        Difficulty
                      </h4>
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${
                          questionDetails.difficulty === "easy" ||
                          questionDetails.difficulty === "Easy"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : questionDetails.difficulty === "medium" ||
                                questionDetails.difficulty === "Medium"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {questionDetails.difficulty || "N/A"}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                        Type
                      </h4>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {questionDetails.question_type ||
                          questionDetails.type ||
                          "N/A"}
                      </p>
                    </div>
                    {questionDetails.estimated_time && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                          Time
                        </h4>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {questionDetails.estimated_time}
                        </p>
                      </div>
                    )}
                    {(questionDetails.points ||
                      questionDetails.point_value) && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                          Points
                        </h4>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {questionDetails.points ||
                            questionDetails.point_value ||
                            0}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Options (if multiple choice) */}
                  {questionDetails.options &&
                    Array.isArray(questionDetails.options) &&
                    questionDetails.options.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                          Options
                        </h3>
                        <div className="space-y-2">
                          {}
                          {questionDetails.options.map(
                            (option: any, index: number) => {
                              // Handle both string options and object options (with id, text, isCorrect)
                              const optionText =
                                typeof option === "string"
                                  ? option
                                  : option?.text ||
                                    option?.label ||
                                    option?.option ||
                                    JSON.stringify(option);
                              const optionId =
                                typeof option === "object"
                                  ? option?.id
                                  : undefined;
                              const isCorrect =
                                typeof option === "object"
                                  ? option?.isCorrect === true ||
                                    option?.is_correct === true
                                  : option === questionDetails.correct_answer ||
                                    option === questionDetails.correctAnswer;

                              return (
                                <div
                                  key={optionId || index}
                                  className={`p-3 rounded-lg border-2 ${
                                    isCorrect
                                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                      : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
                                  }`}
                                >
                                  <div className="flex items-start space-x-2">
                                    <span className="font-medium text-gray-600 dark:text-gray-400">
                                      {String.fromCharCode(65 + index)}.
                                    </span>
                                    <span className="text-gray-900 dark:text-white flex-1">
                                      {optionText}
                                    </span>
                                    {isCorrect && (
                                      <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                                    )}
                                  </div>
                                </div>
                              );
                            },
                          )}
                        </div>
                      </div>
                    )}

                  {/* Correct Answer */}
                  {(questionDetails.correct_answer ||
                    questionDetails.correctAnswer) && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                        Correct Answer
                      </h3>
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <p className="text-green-900 dark:text-green-100 font-medium">
                          {questionDetails.correct_answer ||
                            questionDetails.correctAnswer}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Explanation */}
                  {questionDetails.explanation && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                        Explanation
                      </h3>
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <p className="text-gray-900 dark:text-white">
                          {questionDetails.explanation}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {questionDetails.tags &&
                    Array.isArray(questionDetails.tags) &&
                    questionDetails.tags.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                          Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {questionDetails.tags.map(
                            (tag: string, index: number) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm"
                              >
                                {tag}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Failed to load question details
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-6 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sign-in Popup */}
      {/* Sign-in Popup - Redirected to /auth page instead */}
    </div>
  );
}
