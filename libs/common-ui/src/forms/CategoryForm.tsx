"use client";

// Category Form Component
// v1.0 - Form for creating and editing categories

import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../index";
import { CardType } from "@elzatona/types";

interface CategoryFormProps {
  category?: {
    id: string;
    name: string;
    description?: string;
    color?: string;
    cardType?: string;
    icon?: string;
    slug?: string;
    order?: number;
  };
  onSubmit: (data: CategoryFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface CategoryFormData {
  name: string;
  description: string;
  color: string;
  cardType: string;
  icon: string;
  slug: string;
  order: number;
}

const CARD_TYPES: CardType[] = [
  "core-technologies",
  "framework-questions",
  "problem-solving",
  "system-design",
];

const COLORS = [
  "#61DAFB", // React Blue
  "#F7DF1E", // JavaScript Yellow
  "#1572B6", // CSS Blue
  "#E34F26", // HTML Red
  "#000000", // Next.js Black
  "#9B59B6", // Purple
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Sky Blue
  "#96CEB4", // Mint Green
];

const ICONS = [
  "react",
  "javascript",
  "css",
  "html",
  "nextjs",
  "design-patterns",
  "system-design",
  "folder-open",
  "code",
  "layers",
  "cpu",
  "database",
  "globe",
];

export const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: category?.name || "",
    description: category?.description || "",
    color: category?.color || COLORS[0],
    cardType: category?.cardType || CARD_TYPES[0],
    icon: category?.icon || ICONS[0],
    slug: category?.slug || "",
    order: category?.["order"] || 1,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-generate slug from name
  useEffect(() => {
    if (!category && formData["name"]) {
      const slug = formData["name"]
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData, category]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData["name"].trim()) {
      newErrors["name"] = "Category name is required";
    }

    if (!formData["description"].trim()) {
      newErrors["description"] = "Description is required";
    }

    if (!formData["slug"].trim()) {
      newErrors["slug"] = "Slug is required";
    }

    if (formData["order"] < 1) {
      newErrors["order"] = "Order must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Category form submit failed:", error);
    }
  };

  const handleChange = (
    field: keyof CategoryFormData,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Category Name *</Label>
          <Input
            id="name"
            value={formData["name"]}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g., React"
            className={errors["name"] ? "border-red-500" : ""}
          />
          {errors["name"] && (
            <p className="text-sm text-red-500">{errors["name"]}</p>
          )}
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            value={formData["slug"]}
            onChange={(e) => handleChange("slug", e.target.value)}
            placeholder="e.g., react"
            className={errors["slug"] ? "border-red-500" : ""}
          />
          {errors["slug"] && (
            <p className="text-sm text-red-500">{errors["slug"]}</p>
          )}
        </div>

        {/* Card Type */}
        <div className="space-y-2">
          <Label htmlFor="cardType">Card Type</Label>
          <Select
            value={formData["cardType"]}
            onValueChange={(value) => handleChange("cardType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select card type" />
            </SelectTrigger>
            <SelectContent>
              {CARD_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Order */}
        <div className="space-y-2">
          <Label htmlFor="order">Order</Label>
          <Input
            id="order"
            type="number"
            min="1"
            value={formData["order"]}
            onChange={(e) =>
              handleChange("order", Number.parseInt(e.target.value, 10) || 1)
            }
            className={errors["order"] ? "border-red-500" : ""}
          />
          {errors["order"] && (
            <p className="text-sm text-red-500">{errors["order"]}</p>
          )}
        </div>

        {/* Color */}
        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <div className="flex gap-2">
            <Input
              id="color"
              type="color"
              value={formData["color"]}
              onChange={(e) => handleChange("color", e.target.value)}
              className="w-16 h-10 p-1"
            />
            <Select
              value={formData["color"]}
              onValueChange={(value) => handleChange("color", value)}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {COLORS.map((color) => (
                  <SelectItem key={color} value={color}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: color }}
                      />
                      {color}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Icon */}
        <div className="space-y-2">
          <Label htmlFor="icon">Icon</Label>
          <Select
            value={formData["icon"]}
            onValueChange={(value) => handleChange("icon", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select icon" />
            </SelectTrigger>
            <SelectContent>
              {ICONS.map((icon) => (
                <SelectItem key={icon} value={icon}>
                  {icon}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData["description"]}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Describe what this category covers..."
          rows={3}
          className={errors["description"] ? "border-red-500" : ""}
        />
        {errors["description"] && (
          <p className="text-sm text-red-500">{errors["description"]}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? "Saving..."
            : category
              ? "Update Category"
              : "Create Category"}
        </Button>
      </div>
    </form>
  );
};
