"use client";

import React, { Suspense, useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronRight,
  Target,
  Plus,
  Edit,
  Trash2,
  Search,
  X,
} from "lucide-react";

const Card = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.Card,
  })),
);
const CardContent = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.CardContent,
  })),
);
const CardHeader = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.CardHeader,
  })),
);
const CardTitle = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.CardTitle,
  })),
);
const Collapsible = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.Collapsible,
  })),
);
const CollapsibleTrigger = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.CollapsibleTrigger,
  })),
);
const CollapsibleContent = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.CollapsibleContent,
  })),
);
const Button = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.Button,
  })),
);
const Input = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.Input,
  })),
);
const Badge = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.Badge,
  })),
);

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
  </div>
);

interface Topic {
  id: string;
  name?: string;
  description?: string;
  category_id?: string;
  [key: string]: unknown;
}

interface Category {
  id: string;
  name?: string;
  [key: string]: unknown;
}

interface TopicsListProps {
  topics: Topic[];
  categories: Category[];
  isLoading: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: () => void;
  onEdit: (topic: Topic) => void;
  onDelete: (topic: Topic) => void;
}

export const TopicsList: React.FC<TopicsListProps> = ({
  topics,
  categories,
  isLoading,
  isOpen,
  onOpenChange,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [search, setSearch] = useState("");

  const filteredTopics = useMemo(() => {
    if (!search) return topics;
    return topics.filter(
      (topic) =>
        topic.name?.toLowerCase().includes(search.toLowerCase()) ||
        topic.description?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [topics, search]);

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Card className="bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-800 shadow-lg">
        <Collapsible open={isOpen} onOpenChange={onOpenChange}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors border-b border-orange-100 dark:border-orange-800">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                {isOpen ? (
                  <ChevronDown className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                )}
                <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                Topics ({topics.length})
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          {isOpen && (
            <CollapsibleContent
              className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up"
              onClick={(e) => e.stopPropagation()}
            >
              <CardContent
                className="pt-4 bg-orange-50/30 dark:bg-gray-800"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Search and Add button */}
                <div className="mb-4 space-y-3">
                  <div
                    className="relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <Input
                      placeholder="Search topics..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                    {search && (
                      <button
                        onClick={() => setSearch("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdd();
                      }}
                      className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/40 border-orange-200 dark:border-orange-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Topic
                    </Button>
                  </div>
                </div>

                {isLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600 mx-auto"></div>
                  </div>
                ) : filteredTopics.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Target className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>{search ? "No topics found" : "No topics yet"}</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {filteredTopics.map((topic) => (
                      <div
                        key={topic.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                            {topic.name || "Unnamed Topic"}
                          </p>
                          {topic.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                              {topic.description}
                            </p>
                          )}
                          {topic.category_id && (
                            <Badge
                              variant="secondary"
                              className="mt-1 text-xs"
                            >
                              Category:{" "}
                              {categories.find((c) => c.id === topic.category_id)
                                ?.name || "Unknown"}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(topic);
                            }}
                            className="h-8 w-8 p-0"
                            title="Edit topic"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete(topic);
                            }}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                            title="Delete topic"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          )}
        </Collapsible>
      </Card>
    </Suspense>
  );
};

