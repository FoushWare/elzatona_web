"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"]!;
const supabaseServiceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"]!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Palette,
  AlertCircle,
  BookOpen,
  Tag,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@elzatona/components";
import { toast } from "sonner";

export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  question_count: number;
  created_at: Date;
  updated_at: Date;
}

export default function TopicManager() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isEditTopicDialogOpen, setIsEditTopicDialogOpen] = useState(false);
  const [isEditCategoryDialogOpen, setIsEditCategoryDialogOpen] =
    useState(false);

  // Form states
  const [topicForm, setTopicForm] = useState({
    name: "",
    description: "",
    category: "",
    difficulty: "easy" as "easy" | "medium" | "hard",
  });

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    color: "#3B82F6",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("🔄 Loading topics and categories...");

      const [topicsResponse, categoriesResponse] = await Promise.all([
        fetch("/api/topics"),
        fetch("/api/categories"),
      ]);

      const topicsData = await topicsResponse.json();
      const categoriesData = await categoriesResponse.json();

      console.log("📊 Topics response:", topicsData);
      console.log("📊 Categories response:", categoriesData);

      if (topicsData.success) {
        setTopics(topicsData.data || []);
        console.log("✅ Topics loaded:", topicsData.data?.length || 0);
      } else {
        console.error("❌ Failed to load topics:", topicsData.error);
      }
      if (categoriesData.success) {
        setCategories(categoriesData.data || []);
        console.log("✅ Categories loaded:", categoriesData.data?.length || 0);
      } else {
        console.error("❌ Failed to load categories:", categoriesData.error);
      }
    } catch (err) {
      setError("Failed to load data");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!topicForm.name.trim() || !topicForm.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      console.log("🔄 Creating topic:", topicForm);

      const response = await fetch("/api/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(topicForm),
      });

      const data = await response.json();
      console.log("📊 Topic creation response:", data);

      if (data.success) {
        toast.success("Topic created successfully");

        setTopicForm({
          name: "",
          description: "",
          category: "",
          difficulty: "easy",
        });
        setIsCreateDialogOpen(false);
        console.log("🔄 Reloading data after topic creation...");
        loadData();
      } else {
        toast.error(data.error || "Failed to create topic");
        console.error("❌ Topic creation failed:", data.error);
      }
    } catch (err) {
      toast.error("Failed to create topic");
      console.error("Error creating topic:", err);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryForm.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryForm),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Category created successfully");

        setCategoryForm({ name: "", description: "", color: "#3B82F6" });
        setIsCategoryDialogOpen(false);
        loadData();
      } else {
        toast.error(data.error || "Failed to create category");
      }
    } catch (err) {
      toast.error("Failed to create category");
      console.error("Error creating category:", err);
    }
  };

  const filteredTopics = topics.filter((topic) => {
    const matchesSearch =
      topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      getCategoryName(topic.category) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.color || "#6B7280";
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.name || categoryId; // Fallback to ID if category not found
  };

  // Edit functions
  const handleEditTopic = (topic: Topic) => {
    setEditingTopic(topic);
    setTopicForm({
      name: topic.name,
      description: topic.description,
      category: topic.category,
      difficulty: topic.difficulty,
    });
    setIsEditTopicDialogOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description || "",
      color: category.color || "#3B82F6",
    });
    setIsEditCategoryDialogOpen(true);
  };

  const handleUpdateTopic = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingTopic || !topicForm.name.trim() || !topicForm.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch(`/api/topics/${editingTopic.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(topicForm),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Topic updated successfully");

        setEditingTopic(null);
        setTopicForm({
          name: "",
          description: "",
          category: "",
          difficulty: "easy",
        });
        setIsEditTopicDialogOpen(false);
        loadData();
      } else {
        toast.error(data.error || "Failed to update topic");
      }
    } catch (err) {
      toast.error("Failed to update topic");
      console.error("Error updating topic:", err);
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingCategory || !categoryForm.name.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch(`/api/categories/${editingCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryForm),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Category updated successfully");
        setEditingCategory(null);
        setCategoryForm({
          name: "",
          description: "",
          color: "#3B82F6",
        });
        setIsEditCategoryDialogOpen(false);
        loadData();
      } else {
        toast.error(data.error || "Failed to update category");
      }
    } catch (err) {
      toast.error("Failed to update category");
      console.error("Error updating category:", err);
    }
  };

  // Delete functions
  const handleDeleteTopic = async (topicId: string) => {
    // Find the topic to get its name for logging
    const topic = topics.find((t) => t.id === topicId);
    const topicName = topic?.name || "Unknown";

    if (
      !confirm(
        "Are you sure you want to delete this topic? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/topics/${topicId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Topic deleted successfully");

        loadData();
      } else {
        toast.error(data.error || "Failed to delete topic");
      }
    } catch (err) {
      toast.error("Failed to delete topic");
      console.error("Error deleting topic:", err);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this category? This will also delete all topics in this category. This action cannot be undone.",
      )
    ) {
      return;
    }
    // Find the category to get its name for logging
    const category = categories.find((c) => c.id === categoryId);

    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Category deleted successfully");

        loadData();
      } else {
        toast.error(data.error || "Failed to delete category");
      }
    } catch (err) {
      toast.error("Failed to delete category");
      console.error("Error deleting category:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading topics and categories...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Content Management
          </h2>
          <p className="text-gray-600">
            Manage categories and topics separately
          </p>
        </div>
      </div>

      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="categories"
            className="flex items-center space-x-2"
          >
            <Tag className="w-4 h-4" />
            <span>Categories</span>
          </TabsTrigger>
          <TabsTrigger value="topics" className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Topics</span>
          </TabsTrigger>
        </TabsList>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Categories
              </h3>
              <p className="text-gray-600">Organize topics by categories</p>
            </div>
            <Dialog
              open={isCategoryDialogOpen}
              onOpenChange={setIsCategoryDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Create Category</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Category</DialogTitle>
                  <DialogDescription>
                    Create a new category for organizing topics
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateCategory} className="space-y-4">
                  <div>
                    <Label htmlFor="category-name">Category Name *</Label>
                    <Input
                      id="category-name"
                      value={categoryForm.name}
                      onChange={(e) =>
                        setCategoryForm({
                          ...categoryForm,
                          name: e.target.value,
                        })
                      }
                      placeholder="e.g., JavaScript, React, CSS"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category-description">Description</Label>
                    <Textarea
                      id="category-description"
                      value={categoryForm.description}
                      onChange={(e) =>
                        setCategoryForm({
                          ...categoryForm,
                          description: e.target.value,
                        })
                      }
                      placeholder="Brief description of this category"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category-color">Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="category-color"
                        type="color"
                        value={categoryForm.color}
                        onChange={(e) =>
                          setCategoryForm({
                            ...categoryForm,
                            color: e.target.value,
                          })
                        }
                        className="w-16 h-10"
                      />
                      <Input
                        value={categoryForm.color}
                        onChange={(e) =>
                          setCategoryForm({
                            ...categoryForm,
                            color: e.target.value,
                          })
                        }
                        placeholder="#3B82F6"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCategoryDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Create Category</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span>{category.name}</span>
                    </div>
                    <Badge variant="secondary">
                      {
                        topics.filter(
                          (topic) => topic.category === category.name,
                        ).length
                      }{" "}
                      topics
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {category.description || "No description provided"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Color:</span>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 rounded border"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="font-mono text-xs">
                          {category.color}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Created:</span>
                      <span className="text-gray-500">
                        {new Date(category.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {categories.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Tag className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No categories found
              </h3>
              <p className="text-gray-600 mb-4">
                Get started by creating your first category
              </p>
              <Button onClick={() => setIsCategoryDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Category
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Topics Tab */}
        <TabsContent value="topics" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Topics</h3>
              <p className="text-gray-600">
                Manage topics and assign them to categories
              </p>
            </div>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Create Topic</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Topic</DialogTitle>
                  <DialogDescription>
                    Create a new topic and assign it to a category
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateTopic} className="space-y-4">
                  <div>
                    <Label htmlFor="topic-name">Topic Name *</Label>
                    <Input
                      id="topic-name"
                      value={topicForm.name}
                      onChange={(e) =>
                        setTopicForm({ ...topicForm, name: e.target.value })
                      }
                      placeholder="e.g., Closures, Hoisting, Promises"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="topic-description">Description</Label>
                    <Textarea
                      id="topic-description"
                      value={topicForm.description}
                      onChange={(e) =>
                        setTopicForm({
                          ...topicForm,
                          description: e.target.value,
                        })
                      }
                      placeholder="Brief description of this topic"
                    />
                  </div>
                  <div>
                    <Label htmlFor="topic-category">Category *</Label>
                    <Select
                      value={topicForm.category}
                      onValueChange={(value) =>
                        setTopicForm({ ...topicForm, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            <div className="flex items-center space-x-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: category.color }}
                              />
                              <span>{category.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="topic-difficulty">Difficulty</Label>
                    <Select
                      value={topicForm.difficulty}
                      onValueChange={(value: "easy" | "medium" | "hard") =>
                        setTopicForm({ ...topicForm, difficulty: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Create Topic</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => (
              <Card
                key={topic.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="truncate">{topic.name}</span>
                    <Badge variant="secondary">
                      {topic.question_count} questions
                    </Badge>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {topic.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Category:</span>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: getCategoryColor(topic.category),
                          }}
                        />
                        <span className="text-sm font-medium">
                          {getCategoryName(topic.category)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Difficulty:</span>
                      <Badge
                        className={
                          topic.difficulty === "easy"
                            ? "bg-green-100 text-green-800"
                            : topic.difficulty === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {topic.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Created:</span>
                      <span className="text-sm text-gray-500">
                        {new Date(topic.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditTopic(topic)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteTopic(topic.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTopics.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No topics found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by creating your first topic"}
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Topic
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Topic Dialog */}
      {isEditTopicDialogOpen && editingTopic && (
        <Dialog
          open={isEditTopicDialogOpen}
          onOpenChange={setIsEditTopicDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Topic</DialogTitle>
              <DialogDescription>
                Update the topic information
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdateTopic} className="space-y-4">
              <div>
                <Label htmlFor="edit-topic-name">Topic Name *</Label>
                <Input
                  id="edit-topic-name"
                  value={topicForm.name}
                  onChange={(e) =>
                    setTopicForm({ ...topicForm, name: e.target.value })
                  }
                  placeholder="e.g., Closures, Hoisting, Promises"
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-topic-description">Description</Label>
                <Textarea
                  id="edit-topic-description"
                  value={topicForm.description}
                  onChange={(e) =>
                    setTopicForm({
                      ...topicForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Brief description of this topic"
                />
              </div>
              <div>
                <Label htmlFor="edit-topic-category">Category *</Label>
                <Select
                  value={topicForm.category}
                  onValueChange={(value) =>
                    setTopicForm({ ...topicForm, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span>{category.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-topic-difficulty">Difficulty</Label>
                <Select
                  value={topicForm.difficulty}
                  onValueChange={(value: "easy" | "medium" | "hard") =>
                    setTopicForm({ ...topicForm, difficulty: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditTopicDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Update Topic</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Category Dialog */}
      {isEditCategoryDialogOpen && editingCategory && (
        <Dialog
          open={isEditCategoryDialogOpen}
          onOpenChange={setIsEditCategoryDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>
                Update the category information
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdateCategory} className="space-y-4">
              <div>
                <Label htmlFor="edit-category-name">Category Name *</Label>
                <Input
                  id="edit-category-name"
                  value={categoryForm.name}
                  onChange={(e) =>
                    setCategoryForm({
                      ...categoryForm,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g., JavaScript, React, CSS"
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-category-description">Description</Label>
                <Textarea
                  id="edit-category-description"
                  value={categoryForm.description}
                  onChange={(e) =>
                    setCategoryForm({
                      ...categoryForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Brief description of this category"
                />
              </div>
              <div>
                <Label htmlFor="edit-category-color">Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="edit-category-color"
                    type="color"
                    value={categoryForm.color}
                    onChange={(e) =>
                      setCategoryForm({
                        ...categoryForm,
                        color: e.target.value,
                      })
                    }
                    className="w-16 h-10"
                  />
                  <Input
                    value={categoryForm.color}
                    onChange={(e) =>
                      setCategoryForm({
                        ...categoryForm,
                        color: e.target.value,
                      })
                    }
                    placeholder="#3B82F6"
                    className="flex-1"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditCategoryDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Update Category</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
