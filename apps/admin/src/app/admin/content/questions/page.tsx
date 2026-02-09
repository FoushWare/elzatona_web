"use client";

import React, { useRef, Suspense } from "react";
import {
  Card,
  CardContent,
  Button,
  FormModal,
  AdvancedSearch,
  StatsCards,
  CategoriesOverview,
  FiltersCard,
  QuestionsList,
  PaginationControls,
  AdminQuestionForm,
} from "@elzatona/common-ui";
import { ViewQuestionModal } from "../../../../components/ViewQuestionModal";
import { Loader2 } from "lucide-react";
import { useQuestionsManagement } from "./hooks/useQuestionsManagement";

function QuestionManagementContent() {
  const {
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
    cardsData,
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
    setQuestions,

    // Handlers
    handleCreateOrUpdate,
    handleDelete,
    openViewModal,
    openEditModal,
    openCreateModal,
    closeModals,
    clearFilters,
  } = useQuestionsManagement();

  const questionFormRef = useRef<HTMLFormElement>(null);

  // Supplemental Data helpers
  const allTopics = (topicsData?.data || []).map((t: any) => ({
    id: t.id,
    name: t.name,
    categoryId: "",
  }));
  const allCategories = categoriesData?.data || [];

  if (loading && questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading questions...
          </p>
        </div>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
          <p className="font-semibold mb-2">Error loading questions:</p>
          <p>{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <StatsCards
        totalCount={totalCount}
        categoryCount={categoryCounts.length}
        activeQuestionsCount={questions.filter((q) => q.isActive).length}
        filteredResultsCount={questions.length}
      />

      <CategoriesOverview categoryCounts={categoryCounts} />

      <FiltersCard
        selectedCategory={selectedCategory}
        selectedTopic={selectedTopic}
        categoriesData={categoriesData}
        topicsData={topicsData}
        onCategoryChange={(v) => {
          setSelectedCategory(v);
          setCurrentPage(1);
        }}
        onTopicChange={(v) => {
          setSelectedTopic(v);
          setCurrentPage(1);
        }}
        onClearFilters={clearFilters}
      />

      {categoriesData && topicsData ? (
        <AdvancedSearch
          onResultsChange={(results) => setQuestions(results as any)}
          placeholder="Search questions by title, content, tags..."
          showFilters={true}
          showFacets={false}
          showSuggestions={false}
          showAnalytics={true}
          allCategories={allCategories}
          allTopics={allTopics}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      ) : (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin mr-2 text-blue-600" />
              <p className="text-gray-600 dark:text-gray-400">
                Loading search filters...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <QuestionsList
        questions={questions}
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        onView={openViewModal}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onCreate={openCreateModal}
      />

      {totalCount > 0 && (
        <div className="mt-6">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      )}

      <ViewQuestionModal
        isOpen={isViewModalOpen}
        onClose={() => closeModals()}
        question={selectedQuestion}
        cards={cardsData}
        allCategories={allCategories.map((cat: any) => cat.name)}
        onUpdate={handleCreateOrUpdate}
        editFormRef={questionFormRef}
      />

      <FormModal
        isOpen={isQuestionModalOpen}
        onClose={closeModals}
        title={isEditMode ? "Edit Question" : "Add Question"}
        maxWidth="max-w-6xl"
        cancelLabel="Cancel"
        saveLabel={isEditMode ? "Update Question" : "Create Question"}
        onSave={() => {
          if (questionFormRef.current) {
            questionFormRef.current.requestSubmit();
          }
        }}
        onCancel={closeModals}
      >
        <AdminQuestionForm
          ref={questionFormRef}
          initialData={
            isEditMode && selectedQuestion ? selectedQuestion : undefined
          }
          onSubmit={handleCreateOrUpdate}
          onCancel={closeModals}
          cards={cardsData}
          allCategories={allCategories.map((cat: any) => cat.name)}
          allTags={[]}
        />
      </FormModal>
    </>
  );
}

export default function AdminContentQuestionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Question Management
        </h1>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600 dark:text-gray-400">
                  Loading Question Management UI...
                </p>
              </div>
            </div>
          }
        >
          <QuestionManagementContent />
        </Suspense>
      </div>
    </div>
  );
}
