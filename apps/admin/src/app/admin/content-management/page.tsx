"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  StatsSection,
  SearchAndFilters,
  LearningCardsManager,
  PlansManager,
  TopicsManager,
  CategoriesManager,
  TopicQuestionsModal,
  DeleteConfirmationModal,
  CardManagementModal,
  CategoryFormModal,
  TopicFormModal,
  QuestionFormModal,
  CardFormModal,
} from "@elzatona/common-ui";
import type { AdminQuestion, AdminUnifiedQuestion } from "@elzatona/types";
import { Loader2 } from "lucide-react";
import { useContentManagement } from "./hooks/useContentManagement";

function toUnifiedQuestions(
  questions: AdminQuestion[],
): AdminUnifiedQuestion[] {
  return questions.map((question) => {
    const difficulty =
      question.difficulty === "beginner" ||
      question.difficulty === "intermediate" ||
      question.difficulty === "advanced"
        ? question.difficulty
        : "intermediate";

    const type =
      question.type === "multiple-choice" ||
      question.type === "true-false" ||
      question.type === "code" ||
      question.type === "mcq"
        ? question.type
        : "multiple-choice";

    const rawOptions = Array.isArray(question.options) ? question.options : [];
    const options = rawOptions
      .filter((option): option is string => typeof option === "string")
      .map((option, index) => ({
        id: `opt-${index + 1}`,
        text: option,
        isCorrect: option === question.correct_answer,
      }));

    return {
      id: question.id,
      title: question.title,
      content: question.content,
      difficulty,
      type,
      options,
      category_id: question.category_id,
      topic_id: question.topic_id,
      learning_card_id: question.learning_card_id,
      correct_answer: question.correct_answer,
      explanation: question.explanation,
      hints: question.hints,
      tags: question.tags,
      isActive: Boolean(question.is_active),
      createdAt: question.created_at,
      updatedAt: question.updated_at,
      is_active: question.is_active,
      created_at: question.created_at,
      updated_at: question.updated_at,
    };
  });
}

export default function ContentManagementPage() {
  const router = useRouter();
  const {
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filterCardType,
    setFilterCardType,
    stats,
    filteredCards,
    filteredPlans,
    categories,
    topics,
    questions,
    cards,
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
    planToEdit,
    planEditFormData,
    setPlanEditFormData,
    openPlanEditModal,
    closePlanEditModal,
    updatePlan,
    openCreateCategoryModal,
    openEditCategoryModal,
    submitCategory,
    removeCategory,
    openCreateTopicModal,
    openEditTopicModal,
    submitTopic,
    removeTopic,
    isCategoryModalOpen,
    setIsCategoryModalOpen,
    categoryToEdit,
    isTopicModalOpen,
    setIsTopicModalOpen,
    topicToEdit,
    isQuestionModalOpen,
    setIsQuestionModalOpen,
    questionToEdit,
    isQuestionReadOnly,
    selectedTopicIdForNewQuestion,
    openViewQuestionModal,
    openEditQuestionModal,
    openCreateQuestionModal,
    submitQuestion,
    isSubmittingQuestion,
    isCardFormModalOpen,
    setIsCardFormModalOpen,
    cardToEdit,
    isSubmittingCard,
    isSubmittingTopic,
    isSubmittingCategory,
    openCreateCardModal,
    openEditCardModal,
    submitCard,
  } = useContentManagement();

  const unifiedQuestions = toUnifiedQuestions(questions);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2
                role="status"
                className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600"
              />
              <p className="text-gray-600 dark:text-gray-400">
                Loading content management data...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Error Loading Data
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                There was an error loading the content management data. Please
                try refreshing the page.
              </p>
              <Button
                onClick={() => globalThis.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Refresh Page
              </Button>
              <div className="mt-4 text-sm text-gray-500">
                <p>Error: {error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🎯 Unified Learning Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive admin interface for managing learning cards, plans,
            categories, topics, and questions
          </p>
        </div>

        {/* Stats */}
        <StatsSection stats={stats} />

        {/* Search and Filters */}
        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterCardType={filterCardType}
          onFilterChange={setFilterCardType}
        />

        {/* Topics Management Section */}
        <TopicsManager
          topics={topics}
          onCreateTopic={() => {
            void openCreateTopicModal();
          }}
          onEditTopic={(topic: any) => {
            void openEditTopicModal(topic);
          }}
          onDeleteTopic={(topic: any) => {
            void removeTopic(topic);
          }}
        />

        {/* Categories Management Section */}
        <CategoriesManager
          categories={categories}
          onCreateCategory={() => {
            void openCreateCategoryModal();
          }}
          onEditCategory={(category: any) => {
            void openEditCategoryModal(category);
          }}
          onDeleteCategory={(category: any) => {
            void removeCategory(category);
          }}
        />

        {/* Learning Cards Section */}
        <LearningCardsManager
          cards={filteredCards}
          categories={categories}
          topics={topics}
          questions={unifiedQuestions}
          stats={stats}
          expandedCards={expandedCards}
          toggleCard={toggleCard}
          expandedCategories={expandedCategories}
          toggleCategory={toggleCategory}
          expandedTopics={expandedTopics}
          toggleTopic={toggleTopic}
          onEditCard={openEditCardModal}
          onDeleteCard={openDeleteCardModal}
          onCreateCard={openCreateCardModal}
          onEditCategories={() => {}}
          onViewQuestion={openViewQuestionModal}
          onEditQuestion={openEditQuestionModal}
          onCreateQuestion={openCreateQuestionModal}
        />

        {/* Learning Plans Section */}
        <PlansManager
          plans={filteredPlans}
          cards={filteredCards}
          categories={categories}
          topics={topics}
          questions={unifiedQuestions}
          stats={stats}
          planQuestions={planQuestions}
          expandedPlans={expandedPlans}
          togglePlan={togglePlan}
          expandedPlanCards={expandedPlanCards}
          togglePlanCard={togglePlanCard}
          expandedPlanCategories={expandedPlanCategories}
          togglePlanCategory={togglePlanCategory}
          expandedPlanTopics={expandedPlanTopics}
          togglePlanTopic={togglePlanTopic}
          onEditPlan={openPlanEditModal}
          onDeletePlan={(plan) =>
            globalThis.alert(
              `Plan deletion from this screen is coming soon: ${plan.name}`,
            )
          }
          onCreatePlan={createSpacedRepetitionPlans}
          onManageCards={openCardManagementModal}
          openTopicQuestionsModal={openTopicQuestionsModal}
          onViewQuestion={openViewQuestionModal}
          onEditQuestion={openEditQuestionModal}
          onCreateQuestion={openCreateQuestionModal}
        />

        {/* Modals */}
        <CategoryFormModal
          isOpen={isCategoryModalOpen}
          onOpenChange={setIsCategoryModalOpen}
          category={categoryToEdit}
          onSubmit={submitCategory}
        />

        <TopicFormModal
          isOpen={isTopicModalOpen}
          onOpenChange={setIsTopicModalOpen}
          topic={topicToEdit}
          categories={categories}
          onSubmit={submitTopic}
          onCreateCategory={async (name) => {
            await submitCategory({ name });
          }}
          isSubmitting={isSubmittingTopic}
        />

        <TopicQuestionsModal
          isOpen={isTopicQuestionsModalOpen}
          onOpenChange={setIsTopicQuestionsModalOpen}
          topic={selectedTopic}
          plan={selectedPlan}
          questions={unifiedQuestions}
          selectedQuestions={selectedQuestions}
          onToggleQuestion={toggleQuestionSelection}
          onSelectAll={selectAllQuestions}
          onDeselectAll={deselectAllQuestions}
          onAddSelected={addSelectedQuestionsToPlan}
          onCancel={closeTopicQuestionsModal}
        />

        <QuestionFormModal
          isOpen={isQuestionModalOpen}
          onOpenChange={setIsQuestionModalOpen}
          question={questionToEdit}
          topicId={selectedTopicIdForNewQuestion}
          cards={cards}
          allCategories={categories.map((c) => c.name)}
          onSubmit={submitQuestion}
          readOnly={isQuestionReadOnly}
          isLoading={isSubmittingQuestion}
        />

        <CardFormModal
          isOpen={isCardFormModalOpen}
          onOpenChange={setIsCardFormModalOpen}
          card={cardToEdit}
          onSubmit={submitCard}
          isLoading={isSubmittingCard}
        />

        <DeleteConfirmationModal
          isOpen={isDeleteCardModalOpen}
          onOpenChange={setIsDeleteCardModalOpen}
          title="Delete Learning Card"
          description="This action cannot be undone. All associated categories, topics, and questions will be affected."
          itemName={cardToDelete?.title || ""}
          isDeleting={isDeleting}
          onConfirm={deleteCard}
          onCancel={closeDeleteCardModal}
        />

        <CardManagementModal
          isOpen={isCardManagementModalOpen}
          onOpenChange={setIsCardManagementModalOpen}
          plan={selectedPlanForCards}
          planCards={planCards}
          availableCards={availableCards}
          isLoading={isManagingCards}
          onAddCard={addCardToPlan}
          onRemoveCard={removeCardFromPlan}
          onToggleActive={toggleCardActiveStatus}
          onClose={closeCardManagementModal}
        />

        <Dialog
          open={isPlanEditModalOpen && Boolean(planToEdit)}
          onOpenChange={(open) => {
            if (!open) {
              closePlanEditModal();
            }
          }}
        >
          {planToEdit && (
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Plan: {planToEdit.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <label
                    htmlFor="plan-edit-title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Title
                  </label>
                  <input
                    id="plan-edit-title"
                    type="text"
                    value={planEditFormData.title}
                    onChange={(e) =>
                      setPlanEditFormData({
                        ...planEditFormData,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="plan-edit-description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="plan-edit-description"
                    value={planEditFormData.description}
                    onChange={(e) =>
                      setPlanEditFormData({
                        ...planEditFormData,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="plan-edit-estimated-duration"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Estimated Duration (minutes)
                  </label>
                  <input
                    id="plan-edit-estimated-duration"
                    type="number"
                    value={planEditFormData.estimated_duration}
                    onChange={(e) =>
                      setPlanEditFormData({
                        ...planEditFormData,
                        estimated_duration:
                          Number.parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="plan-edit-status"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Status
                  </label>
                  <select
                    id="plan-edit-status"
                    value={planEditFormData.status}
                    onChange={(e) =>
                      setPlanEditFormData({
                        ...planEditFormData,
                        status: e.target.value as
                          | "published"
                          | "draft"
                          | "archived",
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-2">
                <Button variant="outline" onClick={closePlanEditModal}>
                  Cancel
                </Button>
                <Button
                  onClick={updatePlan}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
}
