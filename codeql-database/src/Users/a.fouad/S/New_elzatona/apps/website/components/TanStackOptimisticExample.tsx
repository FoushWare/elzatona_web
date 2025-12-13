/* eslint-disable @typescript-eslint/no-explicit-any */
// This file uses 'any' types for card data and mutation functions
"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const _supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@elzatona/components";
import { Button } from "@elzatona/components";
import { Input } from "@elzatona/components";
import { Label } from "@elzatona/components";
import { Textarea } from "@elzatona/components";
import { Badge } from "@elzatona/components";
import {
  useCards,
  useCreateCard as _useCreateCard,
  useUpdateCard as _useUpdateCard,
  useDeleteCard as _useDeleteCard,
  queryKeys,
} from "@elzatona/hooks";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  Layers,
} from "lucide-react";
import { toast } from "sonner";

// Form component for creating/editing cards
const CardForm: React.FC<{
  card?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}> = ({ card, onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: card?.name || "",
    description: card?.description || "",
    color: card?.color || "#3B82F6",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Card name is required");
      return;
    }
    onSave(formData);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Layers className="h-5 w-5 mr-2" />
          {card ? "Edit Card" : "Create New Card"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Card Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter card name"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Enter card description"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="color">Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, color: e.target.value }))
                }
                className="w-16 h-10"
              />
              <Input
                value={formData.color}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, color: e.target.value }))
                }
                placeholder="#3B82F6"
                className="flex-1"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {card ? "Update" : "Create"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// Main component demonstrating TanStack Query with optimistic updates
export const TanStackOptimisticExample: React.FC = () => {
  const [editingCard, setEditingCard] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  // Fetch cards data
  const {
    data: cardsData,
    isLoading: cardsLoading,
    error: cardsError,
  } = useCards();

  // Create card mutation with optimistic updates
  const createCardMutation = useMutation({
    mutationFn: async (cardData: any) => {
      // Simulate API call
      const response = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardData),
      });

      if (!response.ok) {
        throw new Error("Failed to create card");
      }

      return response.json();
    },
    onMutate: async (newCard) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.cards });

      // Snapshot previous value
      const previousCards = queryClient.getQueryData(queryKeys.cards);

      // Optimistically update
      queryClient.setQueryData(queryKeys.cards, (old: any) => {
        const tempId = `temp-${Date.now()}`;
        return {
          ...old,
          data: [
            ...(old?.data || []),
            {
              id: tempId,
              ...newCard,
              isOptimistic: true,
            },
          ],
          count: (old?.count || 0) + 1,
        };
      });

      // Return context for rollback
      return { previousCards };
    },
    onError: (err, newCard, context) => {
      // Rollback on error
      if (context?.previousCards) {
        queryClient.setQueryData(queryKeys.cards, context.previousCards);
      }
      toast.error("Failed to create card");
    },
    onSuccess: (_data) => {
      toast.success("Card created successfully");
      setShowForm(false);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: queryKeys.cards });
    },
  });

  // Update card mutation with optimistic updates
  const updateCardMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await fetch(`/api/cards/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update card");
      }

      return response.json();
    },
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.cards });

      const previousCards = queryClient.getQueryData(queryKeys.cards);

      queryClient.setQueryData(queryKeys.cards, (old: any) => ({
        ...old,
        data: old?.data?.map((card: any) =>
          card.id === id ? { ...card, ...data, isOptimistic: true } : card,
        ),
      }));

      return { previousCards };
    },
    onError: (err, variables, context) => {
      if (context?.previousCards) {
        queryClient.setQueryData(queryKeys.cards, context.previousCards);
      }
      toast.error("Failed to update card");
    },
    onSuccess: (_data) => {
      toast.success("Card updated successfully");
      setEditingCard(null);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cards });
    },
  });

  // Delete card mutation with optimistic updates
  const deleteCardMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/cards/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete card");
      }

      return response.json();
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.cards });

      const previousCards = queryClient.getQueryData(queryKeys.cards);

      queryClient.setQueryData(queryKeys.cards, (old: any) => ({
        ...old,
        data: old?.data?.filter((card: any) => card.id !== id),
        count: Math.max(0, (old?.count || 0) - 1),
      }));

      return { previousCards };
    },
    onError: (err, id, context) => {
      if (context?.previousCards) {
        queryClient.setQueryData(queryKeys.cards, context.previousCards);
      }
      toast.error("Failed to delete card");
    },
    onSuccess: () => {
      toast.success("Card deleted successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cards });
    },
  });

  // Handle form submission
  const handleSave = (data: any) => {
    if (editingCard) {
      updateCardMutation.mutate({ id: editingCard.id, data });
    } else {
      createCardMutation.mutate(data);
    }
  };

  // Handle delete
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      deleteCardMutation.mutate(id);
    }
  };

  if (cardsError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Error Loading Cards
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {cardsError.message}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            TanStack Query Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Optimistic updates, error handling, and caching
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingCard(null);
            setShowForm(true);
          }}
          disabled={showForm}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="flex justify-center">
          <CardForm
            card={editingCard}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingCard(null);
            }}
            isLoading={
              createCardMutation.isPending || updateCardMutation.isPending
            }
          />
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cardsLoading
          ? // Loading skeletons
            [...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))
          : cardsData?.data?.map((card) => (
              <Card
                key={card.id}
                className={`border-l-4 ${(card as any).isOptimistic ? "opacity-75" : ""}`}
                style={{ borderLeftColor: card.color }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Layers
                        className="h-5 w-5"
                        style={{ color: card.color }}
                      />
                      <CardTitle className="text-lg">{card.title}</CardTitle>
                      {(card as any).isOptimistic && (
                        <Badge variant="secondary" className="text-xs">
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          Saving...
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingCard(card);
                          setShowForm(true);
                        }}
                        disabled={
                          updateCardMutation.isPending ||
                          deleteCardMutation.isPending
                        }
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(card.id)}
                        disabled={
                          updateCardMutation.isPending ||
                          deleteCardMutation.isPending
                        }
                      >
                        {deleteCardMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {card.description}
                  </p>
                  <div className="mt-3 flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: card.color }}
                    />
                    <span className="text-xs text-gray-500">{card.color}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Empty State */}
      {!cardsLoading && (!cardsData?.data || cardsData.data.length === 0) && (
        <div className="text-center py-12">
          <Layers className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Cards Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create your first learning card to get started.
          </p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create First Card
          </Button>
        </div>
      )}

      {/* Status Indicators */}
      <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
        {createCardMutation.isPending && (
          <div className="flex items-center">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Creating card...
          </div>
        )}
        {updateCardMutation.isPending && (
          <div className="flex items-center">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Updating card...
          </div>
        )}
        {deleteCardMutation.isPending && (
          <div className="flex items-center">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Deleting card...
          </div>
        )}
        {!createCardMutation.isPending &&
          !updateCardMutation.isPending &&
          !deleteCardMutation.isPending && (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              All operations complete
            </div>
          )}
      </div>
    </div>
  );
};

export default TanStackOptimisticExample;
