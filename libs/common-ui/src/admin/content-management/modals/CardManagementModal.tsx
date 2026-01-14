"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from "../../../index";
import { Layers, Plus, Trash2, Loader2 } from "lucide-react";
import { LearningPlan, AdminLearningCard } from "@elzatona/types";

// Reuse CARD_ICONS or pass as props? I'll re-define it here for now or use a shared util later.
const CARD_ICONS = {
  "Core Technologies": { icon: Layers, color: "#3B82F6" },
  "Framework Questions": { icon: Layers, color: "#10B981" },
  "Problem Solving": { icon: Layers, color: "#F59E0B" },
  "System Design": { icon: Layers, color: "#EF4444" },
  "Frontend Tasks": { icon: Layers, color: "#8B5CF6" },
} as const;

interface CardManagementModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  plan: LearningPlan | null;
  planCards: { card_id: string; is_active: boolean }[];
  availableCards: AdminLearningCard[];
  isLoading: boolean;
  onAddCard: (cardId: string) => void;
  onRemoveCard: (cardId: string) => void;
  onToggleActive: (cardId: string, currentStatus: boolean) => void;
  onClose: () => void;
}

export const CardManagementModal: React.FC<CardManagementModalProps> = ({
  isOpen,
  onOpenChange,
  plan,
  planCards,
  availableCards,
  isLoading,
  onAddCard,
  onRemoveCard,
  onToggleActive,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col mx-auto my-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Layers className="h-5 w-5 text-blue-600" />
            <span>Manage Cards for &quot;{plan?.name}&quot;</span>
          </DialogTitle>
          <DialogDescription>
            Add or remove learning cards from this plan. You can also
            activate/deactivate cards.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Loading cards...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-1">
              {/* Current Cards in Plan */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Layers className="h-5 w-5 mr-2 text-green-600" />
                  Cards in Plan ({planCards.length})
                </h3>

                <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
                  {planCards.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Layers className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                      <p>No cards in this plan</p>
                    </div>
                  ) : (
                    planCards.map((planCard) => {
                      const card = availableCards.find(
                        (c) => c.id === planCard.card_id,
                      );
                      if (!card) return null;

                      const IconComponent =
                        CARD_ICONS[card.title as keyof typeof CARD_ICONS]
                          ?.icon || Layers;

                      return (
                        <div
                          key={planCard.card_id}
                          className={`p-4 border rounded-lg transition-colors ${
                            planCard.is_active
                              ? "border-green-200 bg-green-50 dark:bg-green-900/20"
                              : "border-gray-200 bg-gray-50 dark:bg-gray-800"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <IconComponent
                                className="h-5 w-5"
                                style={{ color: card.color }}
                              />
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  {card.title}
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  {card.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  onToggleActive(
                                    planCard.card_id,
                                    planCard.is_active,
                                  )
                                }
                                className={`h-8 px-2 text-[10px] ${
                                  planCard.is_active
                                    ? "text-green-600 hover:bg-green-100"
                                    : "text-gray-400 hover:bg-gray-100"
                                }`}
                              >
                                {planCard.is_active ? "Active" : "Inactive"}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onRemoveCard(planCard.card_id)}
                                className="h-8 w-8 p-0 hover:bg-red-100"
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Available Cards to Add */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Plus className="h-5 w-5 mr-2 text-blue-600" />
                  Available Cards (
                  {
                    availableCards.filter(
                      (card) => !planCards.find((pc) => pc.card_id === card.id),
                    ).length
                  }
                  )
                </h3>

                <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
                  {availableCards
                    .filter(
                      (card) => !planCards.find((pc) => pc.card_id === card.id),
                    )
                    .map((card) => {
                      const IconComponent =
                        CARD_ICONS[card.title as keyof typeof CARD_ICONS]
                          ?.icon || Layers;

                      return (
                        <div
                          key={card.id}
                          className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <IconComponent
                                className="h-5 w-5"
                                style={{ color: card.color }}
                              />
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  {card.title}
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  {card.description}
                                </p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => onAddCard(card.id)}
                              className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 h-8 text-[10px]"
                            >
                              <Plus className="h-4 w-4" />
                              <span>Add</span>
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex items-center justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {planCards.length} cards in plan
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CardManagementModal;
