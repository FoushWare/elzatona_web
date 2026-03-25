"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui";
import { BookOpen } from "lucide-react";
import { Topic as AdminTopic, AdminCategory } from "@elzatona/types";

export interface TopicFormData {
  name: string;
  description?: string;
  category_id: string;
}

interface TopicFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  topic: AdminTopic | null;
  categories: AdminCategory[];
  onSubmit: (data: TopicFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export const TopicFormModal: React.FC<TopicFormModalProps> = ({
  isOpen,
  onOpenChange,
  topic,
  categories,
  onSubmit,
  isSubmitting,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [errors, setErrors] = useState<{ name?: string; categoryId?: string }>(
    {},
  );

  useEffect(() => {
    if (isOpen) {
      if (topic) {
        setName(topic.name || "");
        setDescription(topic.description || "");
        setCategoryId(topic.category_id || "");
      } else {
        setName("");
        setDescription("");
        setCategoryId(categories.length > 0 ? categories[0].id : "");
      }
      setErrors({});
    }
  }, [isOpen, topic, categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; categoryId?: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!categoryId) newErrors.categoryId = "Category is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await onSubmit({
      name: name.trim(),
      description: description.trim(),
      category_id: categoryId,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-purple-600" />
            <span>{topic ? "Edit Topic" : "Create Topic"}</span>
          </DialogTitle>
          <DialogDescription>
            {topic
              ? "Update the topic details below."
              : "Add a new topic under a specific category."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label
              htmlFor="topic-name"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Topic Name
            </label>
            <Input
              id="topic-name"
              placeholder="e.g. React Hooks"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="topic-category"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Parent Category
            </label>
            <Select
              value={categoryId}
              onValueChange={(val) => {
                setCategoryId(val);
                if (errors.categoryId)
                  setErrors({ ...errors, categoryId: undefined });
              }}
            >
              <SelectTrigger
                id="topic-category"
                className={errors.categoryId ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className="text-sm text-red-500">{errors.categoryId}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="topic-description"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Description (Optional)
            </label>
            <Textarea
              id="topic-description"
              placeholder="Brief description of this topic..."
              className="resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isSubmitting
                ? "Saving..."
                : topic
                  ? "Save Changes"
                  : "Create Topic"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
