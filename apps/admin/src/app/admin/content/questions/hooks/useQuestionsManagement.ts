"use client";

import { useState, useEffect, useCallback } from "react";
import type { AdminUnifiedQuestion } from "@elzatona/types";

export function useQuestionsManagement() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  // Data state
  const [questions, setQuestions] = useState<AdminUnifiedQuestion[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Additional data state
  const [cardsData, setCardsData] = useState<any[]>([]);
  const [topicsData, setTopicsData] = useState<any>(null);
  const [categoriesData, setCategoriesData] = useState<any>(null);
  const [categoryCounts, setCategoryCounts] = useState<any[]>([]);

  // Modal states
  const [selectedQuestion, setSelectedQuestion] =
    useState<AdminUnifiedQuestion | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Derived state
  const totalPages = Math.ceil(totalCount / pageSize);

  // Fetch Questions
  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: pageSize.toString(),
      });

      if (selectedCategory) params.append("category", selectedCategory);
      if (selectedTopic) params.append("topic", selectedTopic);

      const response = await fetch(
        `/api/questions/unified?${params.toString()}`,
      );
      if (!response.ok) throw new Error("Failed to fetch questions");

      const result = await response.json();
      setQuestions(result.data || []);
      setTotalCount(result.pagination?.totalCount || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setQuestions([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, selectedCategory, selectedTopic]);

  // Initial and dependent fetches
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cardsRes, topicsRes, categoriesRes, countsRes] =
          await Promise.all([
            fetch("/api/cards"),
            fetch("/api/topics"),
            fetch("/api/categories"),
            fetch("/api/categories/question-counts"),
          ]);

        if (cardsRes.ok) setCardsData((await cardsRes.json()).data || []);
        if (topicsRes.ok) setTopicsData(await topicsRes.json());
        if (categoriesRes.ok) setCategoriesData(await categoriesRes.json());
        if (countsRes.ok)
          setCategoryCounts((await countsRes.json()).data || []);
      } catch (error) {
        console.error("Error fetching supplemental data:", error);
      }
    };
    fetchData();
  }, []);

  // CRUD Handlers
  const handleCreateOrUpdate = async (data: Partial<AdminUnifiedQuestion>) => {
    try {
      const url =
        isEditMode && selectedQuestion
          ? `/api/questions/unified/${selectedQuestion.id}`
          : "/api/questions/unified";

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok)
        throw new Error(
          `Failed to ${isEditMode ? "update" : "create"} question`,
        );

      alert(`Question ${isEditMode ? "updated" : "created"} successfully`);
      closeModals();
      fetchQuestions(); // Refresh list
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this question?")) return;

    try {
      const response = await fetch(`/api/questions/unified/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete question");

      alert("Question deleted successfully");
      fetchQuestions(); // Refresh list
    } catch (error) {
      console.error(error);
      alert("Error deleting question");
    }
  };

  // Modal Handlers
  const openViewModal = (question: AdminUnifiedQuestion) => {
    setSelectedQuestion(question);
    setIsViewModalOpen(true);
  };

  const openEditModal = (question: AdminUnifiedQuestion) => {
    setSelectedQuestion(question);
    setIsEditMode(true);
    setIsQuestionModalOpen(true);
  };

  const openCreateModal = () => {
    setSelectedQuestion(null);
    setIsEditMode(false);
    setIsQuestionModalOpen(true);
  };

  const closeModals = () => {
    setIsViewModalOpen(false);
    setIsQuestionModalOpen(false);
    setSelectedQuestion(null);
    setIsEditMode(false);
  };

  return {
    // State
    currentPage,
    pageSize,
    selectedCategory,
    selectedTopic,
    questions,
    totalCount,
    totalPages,
    loading,
    error,
    cardsData: cardsData || [],
    topicsData,
    categoriesData,
    categoryCounts,
    selectedQuestion,
    isViewModalOpen,
    isQuestionModalOpen,
    isEditMode,

    // Setters
    setCurrentPage,
    setPageSize,
    setSelectedCategory,
    setSelectedTopic,
    setQuestions, // Needed for AdvancedSearch results

    // Handlers
    handleCreateOrUpdate,
    handleDelete,
    openViewModal,
    openEditModal,
    openCreateModal,
    closeModals,
    clearFilters: () => {
      setSelectedCategory("");
      setSelectedTopic("");
      setCurrentPage(1);
    },
    refresh: fetchQuestions,
  };
}
