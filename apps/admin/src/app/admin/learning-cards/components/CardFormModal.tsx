"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Input,
  Label,
  Textarea,
} from "@elzatona/common-ui";
import { AdminLearningCard } from "@elzatona/types";

interface CardFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<AdminLearningCard>) => void;
  editingCard: AdminLearningCard | null;
}

const COLORS = [
  { label: "Blue", value: "#3B82F6" },
  { label: "Green", value: "#10B981" },
  { label: "Purple", value: "#8B5CF6" },
  { label: "Orange", value: "#F59E0B" },
  { label: "Red", value: "#EF4444" },
  { label: "Indigo", value: "#6366F1" },
  { label: "Pink", value: "#EC4899" },
];

export default function CardFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingCard,
}: CardFormModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(COLORS[0].value);
  const [icon, setIcon] = useState("BookOpen");
  const [orderIndex, setOrderIndex] = useState(0);

  useEffect(() => {
    if (editingCard) {
      setTitle(editingCard.title || "");
      setDescription(editingCard.description || "");
      setColor(editingCard.color || COLORS[0].value);
      setIcon(editingCard.icon || "BookOpen");
      setOrderIndex(editingCard.order_index || 0);
    } else {
      setTitle("");
      setDescription("");
      setColor(COLORS[0].value);
      setIcon("BookOpen");
      setOrderIndex(0);
    }
  }, [editingCard, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      color,
      icon,
      order_index: orderIndex,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingCard ? "Edit Learning Card" : "Create Learning Card"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              placeholder="e.g., Core Technologies"
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
              placeholder="A brief description of this content area..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="icon">Icon Name (Lucide)</Label>
              <Input
                id="icon"
                value={icon}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIcon(e.target.value)
                }
                placeholder="e.g., BookOpen, Layers"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="order">Order Index</Label>
              <Input
                id="order"
                type="number"
                value={orderIndex}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setOrderIndex(parseInt(e.target.value) || 0)
                }
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label>Color Theme</Label>
            <div className="flex flex-wrap gap-2 pt-1">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    color === c.value
                      ? "border-black scale-110"
                      : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: c.value }}
                  onClick={() => setColor(c.value)}
                  title={c.label}
                />
              ))}
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {editingCard ? "Save Changes" : "Create Card"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
