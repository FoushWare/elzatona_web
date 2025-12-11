"use client";

import React from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { cn } from "../utils";

export interface FormModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title (e.g., "Add Question" or "Edit Question") */
  title: string;
  /** Modal content/body */
  children: React.ReactNode;
  /** Callback when Save button is clicked */
  onSave?: () => void;
  /** Callback when Cancel button is clicked (defaults to onClose if not provided) */
  onCancel?: () => void;
  /** Save/Submit button text (default: "Save") */
  saveLabel?: string;
  /** Cancel button text (default: "Cancel") */
  cancelLabel?: string;
  /** Maximum width of the modal (default: "max-w-3xl") */
  maxWidth?: string;
  /** Additional className for the body/content area */
  bodyClassName?: string;
  /** Whether Save button is disabled */
  saveDisabled?: boolean;
  /** Whether Save button is loading */
  saveLoading?: boolean;
}

/**
 * Enhanced Modal Component for forms
 *
 * Features:
 * - Fixed header with title and close icon
 * - Scrollable body area
 * - Fixed footer with Cancel and Save buttons
 * - Separators between sections
 * - Fully responsive and accessible
 */
export const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onSave,
  onCancel,
  saveLabel = "Save",
  cancelLabel = "Cancel",
  maxWidth = "max-w-3xl",
  bodyClassName,
  saveDisabled = false,
  saveLoading = false,
}) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  const handleSave = () => {
    if (onSave && !saveDisabled && !saveLoading) {
      onSave();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn("p-0 gap-0 flex flex-col overflow-hidden my-8", maxWidth)}
        style={{ height: "calc(80vh - 4rem)", maxHeight: "calc(80vh - 4rem)" }}
      >
        {/* Fixed Header */}
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 space-y-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold m-0 leading-none">
              {title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full flex items-center justify-center m-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Divider after header */}
        <div className="border-t-2 border-gray-400 dark:border-gray-500 w-full shadow-sm" />

        {/* Scrollable Body - Takes remaining space */}
        <div
          className={cn(
            "px-6 py-4 overflow-y-auto flex-1 min-h-0",
            bodyClassName,
          )}
        >
          {children}
        </div>

        {/* Divider before footer */}
        <div className="border-t-2 border-gray-400 dark:border-gray-500 w-full shadow-sm" />

        {/* Fixed Footer */}
        <div className="px-6 py-4 flex justify-end gap-3 flex-shrink-0 bg-gray-50 dark:bg-gray-800/50">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={saveLoading}
            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            {cancelLabel}
          </Button>
          {onSave && (
            <Button
              onClick={handleSave}
              disabled={saveDisabled || saveLoading}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
            >
              {saveLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                saveLabel
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
