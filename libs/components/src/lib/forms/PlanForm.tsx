"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@elzatona/components";

export interface PlanFormErrors {
  name?: string;
  slug?: string;
  description?: string;
  duration?: string;
  difficulty?: string;
  color?: string;
  icon?: string;
  order?: string;
  estimatedHours?: string;
  prerequisites?: string;
  learningObjectives?: string;
}

export interface PlanFormData {
  name: string;
  slug: string;
  description: string;
  duration: string;
  difficulty: string;
  color: string;
  icon: string;
  order: number;
  estimatedHours: number;
  prerequisites: string[];
  learningObjectives: string[];
}

interface PlanFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plan?: any;
  onSubmit: (data: PlanFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const DIFFICULTIES = ["beginner", "intermediate", "advanced", "expert"];

const PLAN_ICONS = [
  "book-open",
  "atom",
  "server",
  "network",
  "code",
  "layers",
  "puzzle",
  "database",
  "globe",
  "shield",
  "zap",
  "star",
];

const PLAN_COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#06B6D4", // Cyan
  "#84CC16", // Lime
];

export const PlanForm: React.FC<PlanFormProps> = ({
  plan,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<PlanFormData>({
    name: "",
    slug: "",
    description: "",
    duration: "",
    difficulty: "beginner",
    color: "#3B82F6",
    icon: "book-open",
    order: 1,
    estimatedHours: 40,
    prerequisites: [],
    learningObjectives: [],
  });
  const [errors, setErrors] = useState<PlanFormErrors>({});
  const [prerequisiteInput, setPrerequisiteInput] = useState("");
  const [objectiveInput, setObjectiveInput] = useState("");

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name || "",
        slug: plan.slug || "",
        description: plan.description || "",
        duration: plan.duration || "",
        difficulty: plan.difficulty || "beginner",
        color: plan.color || "#3B82F6",
        icon: plan.icon || "book-open",
        order: plan.order || 1,
        estimatedHours: plan.estimatedHours || 40,
        prerequisites: plan.prerequisites || [],
        learningObjectives: plan.learningObjectives || [],
      });
    }
  }, [plan]);

  const handleChange = (field: keyof PlanFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Auto-generate slug from name
    if (field === "name") {
      const slug = (value as string)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAddPrerequisite = () => {
    if (prerequisiteInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        prerequisites: [...prev.prerequisites, prerequisiteInput.trim()],
      }));
      setPrerequisiteInput("");
    }
  };

  const handleRemovePrerequisite = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      prerequisites: prev.prerequisites.filter((_, i) => i !== index),
    }));
  };

  const handleAddObjective = () => {
    if (objectiveInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        learningObjectives: [...prev.learningObjectives, objectiveInput.trim()],
      }));
      setObjectiveInput("");
    }
  };

  const handleRemoveObjective = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter((_, i) => i !== index),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: PlanFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Plan name is required";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Plan slug is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.duration.trim()) {
      newErrors.duration = "Duration is required";
    }

    if (formData.order < 1) {
      newErrors.order = "Order must be at least 1";
    }

    if (formData.estimatedHours < 1) {
      newErrors.estimatedHours = "Estimated hours must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Plan Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="e.g., Frontend Fundamentals"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <Label htmlFor="slug">Slug *</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => handleChange("slug", e.target.value)}
          placeholder="e.g., frontend-fundamentals"
          className={errors.slug ? "border-red-500" : ""}
        />
        {errors.slug && (
          <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Describe what this plan covers..."
          rows={3}
          className={errors.description ? "border-red-500" : ""}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="duration">Duration *</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            placeholder="e.g., 12 weeks"
            className={errors.duration ? "border-red-500" : ""}
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
          )}
        </div>

        <div>
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select
            value={formData.difficulty}
            onValueChange={(value) => handleChange("difficulty", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              {DIFFICULTIES.map((difficulty) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="color">Color</Label>
          <div className="flex gap-1 mt-1 flex-wrap">
            {PLAN_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                className={`w-6 h-6 rounded-full border-2 ${
                  formData.color === color
                    ? "border-gray-800"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleChange("color", color)}
              />
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="icon">Icon</Label>
          <Select
            value={formData.icon}
            onValueChange={(value) => handleChange("icon", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an icon" />
            </SelectTrigger>
            <SelectContent>
              {PLAN_ICONS.map((icon) => (
                <SelectItem key={icon} value={icon}>
                  {icon}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="order">Order</Label>
          <Input
            id="order"
            type="number"
            min="1"
            value={formData.order}
            onChange={(e) =>
              handleChange("order", parseInt(e.target.value) || 1)
            }
            className={errors.order ? "border-red-500" : ""}
          />
          {errors.order && (
            <p className="text-red-500 text-sm mt-1">{errors.order}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="estimatedHours">Estimated Hours</Label>
        <Input
          id="estimatedHours"
          type="number"
          min="1"
          value={formData.estimatedHours}
          onChange={(e) =>
            handleChange("estimatedHours", parseInt(e.target.value) || 1)
          }
          className={errors.estimatedHours ? "border-red-500" : ""}
        />
        {errors.estimatedHours && (
          <p className="text-red-500 text-sm mt-1">{errors.estimatedHours}</p>
        )}
      </div>

      <div>
        <Label>Prerequisites</Label>
        <div className="flex gap-2 mt-1">
          <Input
            value={prerequisiteInput}
            onChange={(e) => setPrerequisiteInput(e.target.value)}
            placeholder="Add a prerequisite..."
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), handleAddPrerequisite())
            }
          />
          <Button type="button" onClick={handleAddPrerequisite} size="sm">
            Add
          </Button>
        </div>
        <div className="mt-2 space-y-1">
          {formData.prerequisites.map((prereq, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded"
            >
              <span className="text-sm">{prereq}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemovePrerequisite(index)}
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Learning Objectives</Label>
        <div className="flex gap-2 mt-1">
          <Input
            value={objectiveInput}
            onChange={(e) => setObjectiveInput(e.target.value)}
            placeholder="Add a learning objective..."
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), handleAddObjective())
            }
          />
          <Button type="button" onClick={handleAddObjective} size="sm">
            Add
          </Button>
        </div>
        <div className="mt-2 space-y-1">
          {formData.learningObjectives.map((objective, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded"
            >
              <span className="text-sm">{objective}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveObjective(index)}
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : plan ? "Update Plan" : "Create Plan"}
        </Button>
      </div>
    </form>
  );
};
