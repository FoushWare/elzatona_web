"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  StatsSection,
  SearchAndFilters,
  LearningCardsManager,
  PlansManager,
  TopicsManager,
  CategoriesManager,
  TopicQuestionsModal,
  DeleteConfirmationModal,
  CardManagementModal,
} from "@elzatona/common-ui";
import { Loader2 } from "lucide-react";
import { useContentManagement } from "./hooks/useContentManagement";

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
    createCategory,
    editCategory,
    removeCategory,
    createTopic,
    editTopic,
    removeTopic,
  } = useContentManagement();

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
            void createTopic();
          }}
          onEditTopic={(topic: any) => {
            void editTopic(topic);
          }}
          onDeleteTopic={(topic: any) => {
            void removeTopic(topic);
          }}
        />

        {/* Categories Management Section */}
        <CategoriesManager
          categories={categories}
          onCreateCategory={() => {
            void createCategory();
          }}
          onEditCategory={(category: any) => {
            void editCategory(category);
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
          questions={questions}
          stats={stats}
          expandedCards={expandedCards}
          toggleCard={toggleCard}
          expandedCategories={expandedCategories}
          toggleCategory={toggleCategory}
          expandedTopics={expandedTopics}
          toggleTopic={toggleTopic}
          onEditCard={(card) =>
            router.push(
              `/admin/learning-cards?edit=${encodeURIComponent(card.id)}`,
            )
          }
          onDeleteCard={openDeleteCardModal}
          onCreateCard={() => router.push("/admin/learning-cards")}
          onEditCategories={() => router.push("/admin/learning-cards")}
        />

        {/* Learning Plans Section */}
        <PlansManager
          plans={filteredPlans}
          cards={filteredCards}
          categories={categories}
          topics={topics}
          questions={questions}
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
        />

        {/* Modals */}
        <TopicQuestionsModal
          isOpen={isTopicQuestionsModalOpen}
          onOpenChange={setIsTopicQuestionsModalOpen}
          topic={selectedTopic}
          plan={selectedPlan}
          questions={questions}
          selectedQuestions={selectedQuestions}
          onToggleQuestion={toggleQuestionSelection}
          onSelectAll={selectAllQuestions}
          onDeselectAll={deselectAllQuestions}
          onAddSelected={addSelectedQuestionsToPlan}
          onCancel={closeTopicQuestionsModal}
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

        {/* Plan Edit Modal */}
        {isPlanEditModalOpen && planToEdit && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Edit Plan: {planToEdit.name}
                </h2>
              </div>
              <div className="p-6 space-y-4">
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
                          Number.parseInt(e.target.value) || 0,
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
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={closePlanEditModal}
                  className="px-4 py-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={updatePlan}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
