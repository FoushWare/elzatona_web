// Helper functions to avoid nested filter operations
function countSelectedQuestionsForPlan(
  planId: string,
  planQuestions: Set<string>,
): number {
  return Array.from(planQuestions).filter((pq) => pq.startsWith(`${planId}-`))
    .length;
}

// Helper function to get topics for a category
function getTopicsForCategory(categoryId: string, topics: Topic[]): Topic[] {
  return topics.filter((topic) => topic.category_id === categoryId);
}

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Users,
  Edit,
  Plus,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Trash2,
  Calendar,
  Layers,
  MessageSquare,
  Target,
  Network,
} from "lucide-react";
import {
  LearningPlan,
  AdminLearningCard,
  AdminCategory,
  Topic,
  ContentManagementStats,
} from "@elzatona/types";

const CARD_ICONS = {
  "Core Technologies": { icon: Layers, color: "#3B82F6" },
  "Framework Questions": { icon: Layers, color: "#10B981" },
  "Problem Solving": { icon: Layers, color: "#F59E0B" },
  "System Design": { icon: Layers, color: "#EF4444" },
  "Frontend Tasks": { icon: Target, color: "#8B5CF6" },
} as const;

interface PlansManagerProps {
  plans: LearningPlan[];
  cards: AdminLearningCard[];
  categories: AdminCategory[];
  topics: Topic[];
  stats: ContentManagementStats;
  planQuestions: Set<string>;
  expandedPlans: Set<string>;
  togglePlan: (id: string) => void;
  expandedPlanCards: Set<string>;
  togglePlanCard: (id: string) => void;
  expandedPlanCategories: Set<string>;
  togglePlanCategory: (id: string) => void;
  expandedPlanTopics: Set<string>;
  togglePlanTopic: (id: string) => void;
  onEditPlan: (plan: LearningPlan) => void;
  onDeletePlan: (plan: LearningPlan) => void;
  onCreatePlan: () => void;
  onManageCards: (plan: LearningPlan) => void;
  openTopicQuestionsModal: (topic: Topic, plan: LearningPlan) => void;
}

const PlanTopicNode: React.FC<{
  topic: Topic;
  plan: LearningPlan;
  expandedPlanTopics: Set<string>;
  togglePlanTopic: (id: string) => void;
  openTopicQuestionsModal: (topic: Topic, plan: LearningPlan) => void;
  selectedQuestionsCount: number;
}> = ({
  topic,
  plan,
  expandedPlanTopics,
  togglePlanTopic,
  openTopicQuestionsModal,
  selectedQuestionsCount,
}) => {
  return (
    <div className="border-l-2 border-orange-100 pl-4 py-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => togglePlanTopic(topic.id)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {expandedPlanTopics.has(topic.id) ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          <Target className="h-4 w-4 text-orange-600" />
          <span className="text-xs">{topic.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-[10px] text-blue-600"
            onClick={() => openTopicQuestionsModal(topic, plan)}
          >
            Add Questions
          </Button>
          <Badge variant="outline" className="text-[10px] bg-green-50">
            {selectedQuestionsCount} Selected
          </Badge>
        </div>
      </div>
    </div>
  );
};

const PlanCategoryNode: React.FC<{
  category: AdminCategory;
  categoryTopics: Topic[];
  plan: LearningPlan;
  expandedPlanCategories: Set<string>;
  togglePlanCategory: (id: string) => void;
  expandedPlanTopics: Set<string>;
  togglePlanTopic: (id: string) => void;
  openTopicQuestionsModal: (topic: Topic, plan: LearningPlan) => void;
  selectedQuestionsCount: number;
}> = ({
  category,
  categoryTopics,
  plan,
  expandedPlanCategories,
  togglePlanCategory,
  expandedPlanTopics,
  togglePlanTopic,
  openTopicQuestionsModal,
  selectedQuestionsCount,
}) => {
  return (
    <div className="border-l-2 border-purple-200 pl-4">
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => togglePlanCategory(category.id)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {expandedPlanCategories.has(category.id) ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          <BookOpen className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-medium">{category.name}</span>
        </div>
        <Badge variant="outline" className="text-[10px] bg-purple-50">
          {categoryTopics.length} Topics
        </Badge>
      </div>

      {expandedPlanCategories.has(category.id) && (
        <div className="ml-6 space-y-2">
          {categoryTopics.map((topic) => (
            <PlanTopicNode
              key={topic.id}
              topic={topic}
              plan={plan}
              expandedPlanTopics={expandedPlanTopics}
              togglePlanTopic={togglePlanTopic}
              openTopicQuestionsModal={openTopicQuestionsModal}
              selectedQuestionsCount={selectedQuestionsCount}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const PlansManager: React.FC<PlansManagerProps> = ({
  plans,
  cards,
  categories,
  topics,
  stats,
  planQuestions,
  expandedPlans,
  togglePlan,
  expandedPlanCards,
  togglePlanCard,
  expandedPlanCategories,
  togglePlanCategory,
  expandedPlanTopics,
  togglePlanTopic,
  onEditPlan,
  onDeletePlan,
  onCreatePlan,
  onManageCards,
  openTopicQuestionsModal,
}) => {
  const getPlanCategories = (card: AdminLearningCard) =>
    categories.filter((cat) => cat.learning_card_id === card.id);

  const getSelectedQuestionsCount = (planId: string) =>
    countSelectedQuestionsForPlan(planId, planQuestions);

  const renderPlanCategoryNode = (
    plan: LearningPlan,
    category: AdminCategory,
  ) => {
    const categoryTopics = getTopicsForCategory(category.id, topics);

    return (
      <PlanCategoryNode
        key={category.id}
        category={category}
        categoryTopics={categoryTopics}
        plan={plan}
        expandedPlanCategories={expandedPlanCategories}
        togglePlanCategory={togglePlanCategory}
        expandedPlanTopics={expandedPlanTopics}
        togglePlanTopic={togglePlanTopic}
        openTopicQuestionsModal={openTopicQuestionsModal}
        selectedQuestionsCount={getSelectedQuestionsCount(plan.id)}
      />
    );
  };

  const renderPlanCard = (plan: LearningPlan, card: AdminLearningCard) => {
    const cardCategories = getPlanCategories(card);
    const IconComponent =
      CARD_ICONS[card.title as keyof typeof CARD_ICONS]?.icon || Layers;

    return (
      <div key={card.id} className="ml-4 border-l-2 border-blue-200 pl-4">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => togglePlanCard(card.id)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              {expandedPlanCards.has(card.id) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            <IconComponent className="h-4 w-4" style={{ color: card.color }} />
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white">
                {card.title}
              </h5>
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
          >
            {cardCategories.length} Categories
          </Badge>
        </div>

        {expandedPlanCards.has(card.id) && (
          <div className="ml-6 space-y-4">
            {cardCategories.map((category) =>
              renderPlanCategoryNode(plan, category),
            )}
          </div>
        )}
      </div>
    );
  };

  const renderPlan = (plan: LearningPlan) => {
    const planCardNodes = cards.map((card) => renderPlanCard(plan, card));

    const handlePlanToggle = () => togglePlan(plan.id);
    const handleEditPlan = () => onEditPlan(plan);
    const handleDeletePlan = () => onDeletePlan(plan);
    const handleManageCards = () => onManageCards(plan);

    return (
      <Card key={plan.id} className="border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePlanToggle}
                className="p-1 hover:bg-gray-100 rounded"
              >
                {expandedPlans.has(plan.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {plan.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{plan.estimated_duration} days</Badge>
              <Badge variant="outline">
                {plan.is_public ? "Public" : "Private"}
              </Badge>
              <div className="flex items-center space-x-1 ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEditPlan}
                  className="h-8 w-8 p-0 hover:bg-green-100"
                >
                  <Edit className="h-4 w-4 text-green-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDeletePlan}
                  className="h-8 w-8 p-0 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        {expandedPlans.has(plan.id) && (
          <CardContent className="pt-0">
            <div className="space-y-6">
              {/* Plan Details Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm">
                  <strong className="text-gray-900 dark:text-white">
                    Duration:
                  </strong>{" "}
                  <span className="text-gray-600 dark:text-gray-400">
                    {plan.estimated_duration} days
                  </span>
                </div>
                <div className="text-sm">
                  <strong className="text-gray-900 dark:text-white">
                    Status:
                  </strong>{" "}
                  <Badge variant={plan.is_active ? "default" : "secondary"}>
                    {plan.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="text-sm">
                  <strong className="text-gray-900 dark:text-white">
                    Visibility:
                  </strong>{" "}
                  <Badge variant={plan.is_public ? "default" : "outline"}>
                    {plan.is_public ? "Public" : "Private"}
                  </Badge>
                </div>
              </div>

              {/* Interaction Buttons */}
              <div className="flex flex-wrap gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Button
                  size="sm"
                  onClick={handleManageCards}
                  className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Layers className="h-4 w-4" />
                  <span>Manage Cards</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Add Questions</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Target className="h-4 w-4" />
                  <span>Copy from Plan</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Network className="h-4 w-4" />
                  <span>Manage Structure</span>
                </Button>
              </div>

              {/* Plan Structure */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Layers className="h-5 w-5 mr-2 text-blue-600" />
                  Plan Structure
                </h4>
                {planCardNodes}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <Users className="h-5 w-5 mr-2 text-green-600" />
          Learning Plans ({stats.totalPlans})
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-1"
          >
            <Edit className="h-4 w-4" />
            <span>Edit Plans</span>
          </Button>
          <Button
            size="sm"
            onClick={onCreatePlan}
            className="flex items-center space-x-1 bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4" />
            <span>Create Plan</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {plans.length === 0 ? (
          <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Learning Plans
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create your first learning plan to provide structured learning
                paths for users.
              </p>
            </CardContent>
          </Card>
        ) : (
          plans.map(renderPlan)
        )}
      </div>
    </div>
  );
};

export default PlansManager;
