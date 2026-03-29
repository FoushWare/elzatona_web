"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import { CardForm, CardFormData } from "../../../forms/CardForm";
import { AdminLearningCard } from "@elzatona/types";
import { Layers } from "lucide-react";

interface CardFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  card: AdminLearningCard | null | undefined;
  onSubmit: (data: CardFormData) => Promise<void>;
  isLoading?: boolean;
}

export const CardFormModal: React.FC<CardFormModalProps> = ({
  isOpen,
  onOpenChange,
  card,
  onSubmit,
  isLoading = false,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Layers className="h-5 w-5 text-blue-600" />
            <span>{card ? "Edit Learning Card" : "Create Learning Card"}</span>
          </DialogTitle>
          <DialogDescription>
            {card
              ? "Update the details of this learning card."
              : "Add a new learning card to your curriculum."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <CardForm
            card={card}
            onSubmit={async (data) => {
              await onSubmit(data);
              onOpenChange(false);
            }}
            onCancel={() => onOpenChange(false)}
            isLoading={isLoading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
