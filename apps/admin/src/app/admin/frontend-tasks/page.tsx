"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Plus, Search, Code, Layout, Edit, Trash2 } from "lucide-react";
import { AdminFrontendTask, PaginatedResponse } from "@elzatona/types";
import {
  FrontendTaskEditor,
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  useToast,
} from "@elzatona/common-ui";

export default function FrontendTasksPage() {
  const [tasks, setTasks] = useState<AdminFrontendTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<AdminFrontendTask | null>(
    null,
  );
  const [editorMode, setEditorMode] = useState<"create" | "edit">("create");
  const { showSuccess, showError } = useToast();

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: "1",
        limit: "100", // Fetch a reasonable amount for the admin view
        search: searchQuery,
      });

      const response = await fetch(`/api/admin/frontend-tasks?${params}`);
      const data: PaginatedResponse<AdminFrontendTask> = await response.json();

      if (data.success) {
        setTasks(data.data);
      } else {
        throw new Error((data as any).error || "Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      showError("Error", "Failed to load frontend tasks");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, showError]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = () => {
    setSelectedTask(null);
    setEditorMode("create");
    setIsEditorOpen(true);
  };

  const handleEditTask = (task: AdminFrontendTask) => {
    setSelectedTask(task);
    setEditorMode("edit");
    setIsEditorOpen(true);
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(`/api/admin/frontend-tasks/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        showSuccess("Success", "Task deleted successfully");
        fetchTasks();
      } else {
        throw new Error(data.error || "Delete failed");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      showError("Error", "Failed to delete task");
    }
  };

  const handleSaveTask = async (taskData: FrontendTaskFormData) => {
    try {
      const url =
        editorMode === "create"
          ? "/api/admin/frontend-tasks"
          : `/api/admin/frontend-tasks/${selectedTask?.id}`;

      const method = editorMode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();

      if (data.success) {
        showSuccess(
          "Success",
          `Task ${editorMode === "create" ? "created" : "updated"} successfully`,
        );
        setIsEditorOpen(false);
        fetchTasks();
      } else {
        throw new Error(data.error || "Operation failed");
      }
    } catch (error) {
      console.error("Error saving task:", error);
      showError("Error", "Failed to save task");
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Code className="h-8 w-8 text-blue-600" />
            Frontend Tasks
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage interactive UI coding challenges
          </p>
        </div>
        <Button
          onClick={handleCreateTask}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Task
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tasks by title, description or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Task Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
          <Layout className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            No tasks found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1 mb-4">
            {searchQuery
              ? "No tasks match your search criteria"
              : "Get started by creating your first frontend task"}
          </p>
          {!searchQuery && (
            <Button onClick={handleCreateTask} variant="outline">
              Create Task
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <Card
              key={task.id}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge
                    variant={
                      task.difficulty === "easy"
                        ? "secondary"
                        : task.difficulty === "medium"
                          ? "default"
                          : "destructive"
                    }
                    className={
                      task.difficulty === "medium"
                        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                        : ""
                    }
                  >
                    {task.difficulty}
                  </Badge>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEditTask(task)}
                    >
                      <Edit className="h-4 w-4 text-gray-500 hover:text-blue-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-600" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="mt-3 line-clamp-1">
                  {task.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                  {task.description}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-400 mt-auto">
                  <Badge variant="outline" className="font-normal uppercase">
                    {task.category}
                  </Badge>
                  <span>{task.files?.length || 0} Files</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {task.tags?.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[10px] bg-blue-50 text-blue-700 border-blue-100"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {(task.tags?.length || 0) > 3 && (
                    <span className="text-[10px] text-gray-400 self-center">
                      +{(task.tags?.length || 0) - 3}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Editor Modal/Overlay */}
      {isEditorOpen && (
        <FrontendTaskEditor
          task={selectedTask}
          onSave={handleSaveTask}
          onCancel={() => setIsEditorOpen(false)}
          mode={editorMode}
        />
      )}
    </div>
  );
}
