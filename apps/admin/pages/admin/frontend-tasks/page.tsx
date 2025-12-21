"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Badge,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@elzatona/components";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Clock,
  User,
  Building,
  Code,
  FileText,
  Tag,
} from "lucide-react";
import { toast } from "sonner";

interface FrontendTask {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  estimated_time: number;
  author: string;
  company?: string;
  requirements: string;
  hints: string[];
  solution?: string;
  starter_code?: string;
  files: Array<{ name: string; content: string }>;
  test_cases: Array<{ input: unknown; expected: unknown }>;
  tags: string[];
  created_at: string;
  updated_at: string;
}

interface TaskStats {
  total: number;
  byCategory: Record<string, number>;
  byDifficulty: Record<string, number>;
}

export default function FrontendTasksPage() {
  const [tasks, setTasks] = useState<FrontendTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<TaskStats>({
    total: 0,
    byCategory: {},
    byDifficulty: {},
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    "React",
    "CSS",
    "JavaScript",
    "Responsive",
    "TypeScript",
    "Next.js",
  ];
  const difficulties = ["easy", "medium", "hard"];

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedCategory, selectedDifficulty, searchTerm]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedDifficulty && { difficulty: selectedDifficulty }),
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/frontend-tasks?${params}`);
      const data = await response.json();

      if (response.ok) {
        setTasks(data.tasks);
        setTotalPages(data.pagination.totalPages);
        calculateStats(data.tasks);
      } else {
        toast.error("Failed to fetch frontend tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Error fetching frontend tasks");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (taskList: FrontendTask[]) => {
    const newStats: TaskStats = {
      total: taskList.length,
      byCategory: {},
      byDifficulty: {},
    };

    taskList.forEach((task) => {
      newStats.byCategory[task.category] =
        (newStats.byCategory[task.category] || 0) + 1;
      newStats.byDifficulty[task.difficulty] =
        (newStats.byDifficulty[task.difficulty] || 0) + 1;
    });

    setStats(newStats);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "react":
        return "⚛️";
      case "css":
        return "🎨";
      case "javascript":
        return "🔧";
      case "responsive":
        return "📱";
      case "typescript":
        return "📘";
      case "next.js":
        return "▲";
      default:
        return "💻";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            💻 Frontend Tasks
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
            Create and manage React/frontend coding challenges
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categories.map((category) => (
            <Card
              key={category}
              className="p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{getCategoryIcon(category)}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {category} Tasks
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {category === "React" && "Component and hook challenges"}
                  {category === "CSS" && "Styling and layout challenges"}
                  {category === "JavaScript" && "DOM manipulation and events"}
                  {category === "Responsive" &&
                    "Mobile-first design challenges"}
                  {category === "TypeScript" && "Type-safe development"}
                  {category === "Next.js" && "Full-stack React framework"}
                </p>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.byCategory[category] || 0}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search frontend tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedDifficulty}
              onValueChange={setSelectedDifficulty}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Difficulties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Difficulties</SelectItem>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Task</span>
            </Button>
          </div>
        </Card>

        {/* Tasks List */}
        <Card className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Loading tasks...
              </p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚀</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No Frontend Tasks Found
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {searchTerm || selectedCategory || selectedDifficulty
                  ? "Try adjusting your search criteria"
                  : "Create your first frontend development challenge"}
              </p>
              <Button className="flex items-center space-x-2 mx-auto">
                <Plus className="h-4 w-4" />
                <span>Create First Task</span>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {task.title}
                        </h3>
                        <Badge className={getDifficultyColor(task.difficulty)}>
                          {task.difficulty}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center space-x-1"
                        >
                          <span className="text-lg">
                            {getCategoryIcon(task.category)}
                          </span>
                          <span>{task.category}</span>
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {task.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{task.estimated_time} min</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{task.author}</span>
                        </div>
                        {task.company && (
                          <div className="flex items-center space-x-1">
                            <Building className="h-4 w-4" />
                            <span>{task.company}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Task Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>Requirements</span>
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {task.requirements.substring(0, 200)}...
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                        <Code className="h-4 w-4" />
                        <span>Starter Code</span>
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {task.starter_code ? "Available" : "Not provided"}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  {task.tags && task.tags.length > 0 && (
                    <div className="flex items-center space-x-2 mb-4">
                      <Tag className="h-4 w-4 text-gray-500" />
                      <div className="flex flex-wrap gap-2">
                        {task.tags.map((tag, index) => (
                          <Badge
                            key={`tag-${tag}`}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hints */}
                  {task.hints && task.hints.length > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                        Hints ({task.hints.length})
                      </h4>
                      <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                        {task.hints.slice(0, 2).map((hint, index) => (
                          <li key={`hint-${index}-${hint.substring(0, 10)}`}>• {hint}</li>
                        ))}
                        {task.hints.length > 2 && (
                          <li className="text-blue-600 dark:text-blue-400">
                            ... and {task.hints.length - 2} more hints
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
