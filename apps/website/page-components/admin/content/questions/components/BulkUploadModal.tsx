"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@elzatona/components";
import { BulkUploadForm } from "./BulkUploadForm";

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  loading: boolean;
  error: string | null;
  success: string | null;
  progress: { current: number; total: number } | null;
  onClearState: () => void;
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
    onClearState();
    onClose();
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
          onUpload={onUpload}
          onCancel={handleClose}
          loading={loading}
          error={error}
          success={success}
          progress={progress}
        />
      </DialogContent>
    </Dialog>
  );
}
