'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '@elzatona/shared-components';
import { cn } from '@elzatona/shared-components';

export interface FormModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title: string;
  /** Modal content/body */
  children: React.ReactNode;
  /** Cancel button text (default: "Cancel") */
  cancelText?: string;
  /** Save button text (default: "Save") */
  saveText?: string;
  /** Callback when Save button is clicked */
  onSave?: () => void;
  /** Whether Save button is disabled */
  saveDisabled?: boolean;
  /** Whether Save button is loading */
  saveLoading?: boolean;
  /** Additional className for the modal container */
  className?: string;
  /** Maximum width of the modal (default: "max-w-4xl") */
  maxWidth?: string;
  /** Whether clicking overlay closes the modal (default: true) */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape closes the modal (default: true) */
  closeOnEscape?: boolean;
}

/**
 * Responsive, accessible modal component for forms
 * 
 * Features:
 * - Dimmed overlay that centers the modal
 * - Fixed header with left-aligned title and right-aligned close button
 * - Scrollable body area for form fields
 * - Fixed footer with Cancel and Save buttons
 * - Fully responsive and accessible
 */
export const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  cancelText = 'Cancel',
  saveText = 'Save',
  onSave,
  saveDisabled = false,
  saveLoading = false,
  className,
  maxWidth = 'max-w-4xl',
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Focus the modal container
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);
    } else {
      // Restore focus to the previously focused element
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = () => {
    if (onSave && !saveDisabled && !saveLoading) {
      onSave();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleOverlayClick}
    >
      {/* Dimmed Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className={cn(
          'relative z-[101] w-full',
          maxWidth,
          'bg-white dark:bg-gray-900',
          'rounded-lg shadow-2xl',
          'flex flex-col',
          'max-h-[95vh]',
          'overflow-hidden',
          'focus:outline-none',
          className
        )}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <h2
            id="modal-title"
            className="text-xl font-semibold text-gray-900 dark:text-white"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'ml-4 rounded-lg p-2',
              'text-gray-500 dark:text-gray-400',
              'hover:bg-gray-100 dark:hover:bg-gray-800',
              'hover:text-gray-700 dark:hover:text-gray-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              'transition-colors',
              'flex items-center justify-center'
            )}
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 px-6 py-4">
          <div className="space-y-4">
            {children}
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={saveLoading}
            className="min-w-[100px]"
          >
            {cancelText}
          </Button>
          {saveText && (
            <Button
              type="button"
              onClick={handleSave}
              disabled={saveDisabled || saveLoading}
              className="min-w-[100px]"
            >
              {saveLoading ? (
                <>
                  <span className="mr-2">Loading...</span>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </>
              ) : (
                saveText
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

