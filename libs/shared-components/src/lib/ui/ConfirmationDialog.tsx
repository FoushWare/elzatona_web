'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    setIsVisible(false);
    setTimeout(() => onConfirm(), 150);
  };

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(() => onCancel(), 150);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: <AlertTriangle className='w-6 h-6 text-red-500' />,
          confirmButton: 'bg-red-600 hover:bg-red-700 text-white',
          border: 'border-red-200 dark:border-red-800',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className='w-6 h-6 text-yellow-500' />,
          confirmButton: 'bg-yellow-600 hover:bg-yellow-700 text-white',
          border: 'border-yellow-200 dark:border-yellow-800',
        };
      case 'info':
        return {
          icon: <AlertTriangle className='w-6 h-6 text-blue-500' />,
          confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white',
          border: 'border-blue-200 dark:border-blue-800',
        };
      default:
        return {
          icon: <AlertTriangle className='w-6 h-6 text-red-500' />,
          confirmButton: 'bg-red-600 hover:bg-red-700 text-white',
          border: 'border-red-200 dark:border-red-800',
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-all duration-300
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />

      {/* Dialog */}
      <div
        className={`
          relative bg-white dark:bg-gray-800 rounded-lg shadow-xl
          border ${styles.border}
          max-w-md w-full mx-4
          transform transition-all duration-300
          ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
        `}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700'>
          <div className='flex items-center gap-3'>
            {styles.icon}
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
              {title}
            </h3>
          </div>
          <button
            onClick={handleCancel}
            className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Content */}
        <div className='p-6'>
          <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className='flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700'>
          <button
            onClick={handleCancel}
            className='px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors font-medium'
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`
              px-4 py-2 rounded-md font-medium transition-colors
              ${styles.confirmButton}
            `}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook for easy usage
export function useConfirmation() {
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
    onConfirm?: () => void;
    onCancel?: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
  });

  const showConfirmation = (config: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
    onConfirm: () => void;
    onCancel?: () => void;
  }) => {
    setDialog({
      isOpen: true,
      ...config,
    });
  };

  const hideConfirmation = () => {
    setDialog(prev => ({ ...prev, isOpen: false }));
  };

  const handleConfirm = () => {
    dialog.onConfirm?.();
    hideConfirmation();
  };

  const handleCancel = () => {
    dialog.onCancel?.();
    hideConfirmation();
  };

  return {
    showConfirmation,
    hideConfirmation,
    ConfirmationDialog: (
      <ConfirmationDialog
        isOpen={dialog.isOpen}
        title={dialog.title}
        message={dialog.message}
        confirmText={dialog.confirmText}
        cancelText={dialog.cancelText}
        type={dialog.type}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    ),
  };
}
