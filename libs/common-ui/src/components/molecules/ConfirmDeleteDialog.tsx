"use client";

import React from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

interface ConfirmDeleteDialogProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onConfirm: () => void | Promise<void>;
  readonly title: string;
  readonly itemName: string;
  readonly itemType: string;
  readonly isLoading?: boolean;
  readonly confirmLabel?: string;
  readonly cancelLabel?: string;
}

/**
 * ConfirmDeleteDialog Component
 * Reusable delete confirmation dialog
 * v1.0
 */
export function ConfirmDeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  itemName,
  itemType,
  isLoading = false,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
}: ConfirmDeleteDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete the {itemType} "{itemName}"? This
          action cannot be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export type ConfirmDeleteDialogPropsType = ConfirmDeleteDialogProps;
