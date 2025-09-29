'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class FirestoreErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Check if it's a Firestore internal assertion error
    const isFirestoreError = error.message && (
      error.message.includes('FIRESTORE') ||
      error.message.includes('INTERNAL ASSERTION FAILED') ||
      error.message.includes('Unexpected state') ||
      error.message.includes('ID: b815') ||
      error.message.includes('ID: ca9')
    );

    if (isFirestoreError) {
      // Suppress Firestore internal errors
      console.warn('⚠️ Suppressed Firestore internal error in ErrorBoundary:', error);
      return { hasError: false };
    }

    // For other errors, show the error boundary
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Check if it's a Firestore internal assertion error
    const isFirestoreError = error.message && (
      error.message.includes('FIRESTORE') ||
      error.message.includes('INTERNAL ASSERTION FAILED') ||
      error.message.includes('Unexpected state') ||
      error.message.includes('ID: b815') ||
      error.message.includes('ID: ca9')
    );

    if (isFirestoreError) {
      // Suppress Firestore internal errors
      console.warn('⚠️ Suppressed Firestore internal error in componentDidCatch:', error);
      return;
    }

    // Log other errors
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            Something went wrong
          </h2>
          <p className="text-red-600 dark:text-red-300">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default FirestoreErrorBoundary;
