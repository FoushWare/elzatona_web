"use client";

import React from "react";
import { StatsSection } from "../organisms/StatsSection";
import { SearchAndFilters } from "../molecules/SearchAndFilters";
import { ActionButtons, type ActionButton } from "../molecules/ActionButtons";
import { CategoriesList } from "../organisms/CategoriesList";
import { TopicsList } from "../organisms/TopicsList";
import { CardsList } from "../organisms/CardsList";
import { PlansList } from "../organisms/PlansList";
import type { StatsSectionPropsType } from "../organisms/StatsSection";
import type { CategoriesListPropsType } from "../organisms/CategoriesList";
import type { TopicsListPropsType } from "../organisms/TopicsList";
import type { CardsListPropsType } from "../organisms/CardsList";
import type { PlansListPropsType } from "../organisms/PlansList";

interface ContentManagementTemplateProps {
  readonly title?: string;
  readonly subtitle?: string;
  readonly stats: StatsSectionPropsType["stats"];
  readonly searchAndFilters: {
    readonly searchTerm: string;
    readonly onSearchChange: (value: string) => void;
    readonly filterCardType: string;
    readonly onFilterChange: (value: string) => void;
  };
  readonly actionButtons: readonly ActionButton[];
  readonly categoriesList: Omit<
    CategoriesListPropsType,
    | "categories"
    | "filteredCategories"
    | "isLoading"
    | "searchTerm"
    | "onSearchChange"
    | "isOpen"
    | "onOpenChange"
    | "onAdd"
    | "onEdit"
    | "onDelete"
  > & {
    readonly categories: CategoriesListPropsType["categories"];
    readonly filteredCategories: CategoriesListPropsType["filteredCategories"];
    readonly isLoading: CategoriesListPropsType["isLoading"];
    readonly searchTerm: CategoriesListPropsType["searchTerm"];
    readonly onSearchChange: CategoriesListPropsType["onSearchChange"];
    readonly isOpen: CategoriesListPropsType["isOpen"];
    readonly onOpenChange: CategoriesListPropsType["onOpenChange"];
    readonly onAdd: CategoriesListPropsType["onAdd"];
    readonly onEdit: CategoriesListPropsType["onEdit"];
    readonly onDelete: CategoriesListPropsType["onDelete"];
  };
  readonly topicsList: Omit<
    TopicsListPropsType,
    | "topics"
    | "filteredTopics"
    | "categories"
    | "isLoading"
    | "searchTerm"
    | "onSearchChange"
    | "selectedCategoryFilter"
    | "onCategoryFilterChange"
    | "isOpen"
    | "onOpenChange"
    | "onAdd"
    | "onEdit"
    | "onDelete"
  > & {
    readonly topics: TopicsListPropsType["topics"];
    readonly filteredTopics: TopicsListPropsType["filteredTopics"];
    readonly categories: TopicsListPropsType["categories"];
    readonly isLoading: TopicsListPropsType["isLoading"];
    readonly searchTerm: TopicsListPropsType["searchTerm"];
    readonly onSearchChange: TopicsListPropsType["onSearchChange"];
    readonly selectedCategoryFilter: TopicsListPropsType["selectedCategoryFilter"];
    readonly onCategoryFilterChange: TopicsListPropsType["onCategoryFilterChange"];
    readonly isOpen: TopicsListPropsType["isOpen"];
    readonly onOpenChange: TopicsListPropsType["onOpenChange"];
    readonly onAdd: TopicsListPropsType["onAdd"];
    readonly onEdit: TopicsListPropsType["onEdit"];
    readonly onDelete: TopicsListPropsType["onDelete"];
  };
  readonly cardsList: CardsListPropsType;
  readonly plansList: PlansListPropsType;
}

/**
 * ContentManagementTemplate Component
 * Main template for the content management page that composes all list components
 */
export function ContentManagementTemplate({
  title = "🎯 Unified Learning Management",
  subtitle = "Comprehensive admin interface for managing learning cards, plans, categories, topics, and questions",
  stats,
  searchAndFilters,
  actionButtons,
  categoriesList,
  topicsList,
  cardsList,
  plansList,
}: ContentManagementTemplateProps) {
  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
      </div>

      {/* Stats */}
      <StatsSection stats={stats} />

      {/* Topics and Categories Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <CategoriesList {...categoriesList} />
        <TopicsList {...topicsList} />
      </div>

      {/* Search and Filters */}
      <SearchAndFilters {...searchAndFilters} />

      {/* Action Buttons */}
      <ActionButtons actions={actionButtons} />

      {/* Cards Section */}
      <CardsList {...cardsList} />

      {/* Plans Section */}
      <PlansList {...plansList} />
    </div>
  );
}

export type ContentManagementTemplatePropsType = ContentManagementTemplateProps;
