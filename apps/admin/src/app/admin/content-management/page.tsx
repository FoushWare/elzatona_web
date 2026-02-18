"use client";

import React from "react";
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
  } = useContentManagement();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
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
          onCreateTopic={() => console.log("Create topic")}
          onEditTopic={(topic) => console.log("Edit topic", topic)}
          onDeleteTopic={(topic) => console.log("Delete topic", topic)}
        />

        {/* Categories Management Section */}
        <CategoriesManager
          categories={categories}
          onCreateCategory={() => console.log("Create category")}
          onEditCategory={(category) => console.log("Edit category", category)}
          onDeleteCategory={(category) =>
            console.log("Delete category", category)
          }
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
          onEditCard={(card) => console.log("Edit card", card)}
          onDeleteCard={openDeleteCardModal}
          onCreateCard={() => console.log("Create card")}
          onEditCategories={() => console.log("Edit categories")}
        />

        {/* Learning Plans Section */}
        <PlansManager
          plans={filteredPlans}
          cards={filteredCards}
          categories={categories}
          topics={topics}
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
          onEditPlan={(plan) => console.log("Edit plan", plan)}
          onDeletePlan={(plan) => console.log("Delete plan", plan)}
          onCreatePlan={() => console.log("Create plan")}
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
      </div>
    </div>
  );
}
