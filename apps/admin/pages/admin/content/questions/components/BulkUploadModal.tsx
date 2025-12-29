"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@elzatona/common-ui";
import BulkUploadForm from "./BulkUploadForm";

interface BulkUploadModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onUpload: (file: File) => void;
  readonly loading: boolean;
  readonly error: string | null;
  readonly success: string | null;
  readonly progress: { current: number; total: number } | null;
  readonly onClearState: () => void;
}

export function BulkUploadModal({
  isOpen,
  onClose,
  onUpload,
  loading,
  error,
  success,
  progress,
  onClearState,
}: BulkUploadModalProps) {
  const handleClose = () => {
    if (loading) return;
    onClose();
    onClearState();
  };

  const handleBulkUpload = (questions: any[]) => {
    // Convert questions array back to file format for the modal's onUpload
    // This is a temporary fix - ideally the modal should be updated to handle questions directly
    const jsonString = JSON.stringify(questions);
    const blob = new Blob([jsonString], { type: "application/json" });
    const file = new File([blob], "bulk-upload.json", {
      type: "application/json",
    });
    onUpload(file);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bulk Upload Questions</DialogTitle>
          <DialogDescription>
            Upload multiple questions at once using CSV or JSON format. Preview
            will show the first 3 questions.
          </DialogDescription>
        </DialogHeader>
        <BulkUploadForm
          onUpload={handleBulkUpload}
          onCancel={handleClose}
          loading={loading}
          error={error}
          success={!!success}
          progress={
            progress
              ? Math.round((progress.current / progress.total) * 100)
              : undefined
          }
        />
      </DialogContent>
    </Dialog>
  );
}
