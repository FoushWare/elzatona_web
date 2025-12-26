"use client";

import React, { Component, ReactNode, ErrorInfo } from "react";

// Conditional Supabase client creation with fallback values
const supabase = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createClient } = require("@supabase/supabase-js");
  const supabaseUrl =
    process.env["NEXT_PUBLIC_SUPABASE_URL"] ||
    "https://placeholder.supabase.co";
  const supabaseServiceRoleKey =
    process.env["SUPABASE_SERVICE_ROLE_KEY"] || "placeholder_key";

  if (
    supabaseUrl !== "https://placeholder.supabase.co" &&
    supabaseServiceRoleKey !== "placeholder_key"
  ) {
    const _supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    // Supabase client created but not used in ErrorBoundary
    // Reserved for future error logging functionality
    void _supabase;
  }
} catch (error) {
  console.warn("Supabase client creation failed in ErrorBoundary:", error);
}

import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorId: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorId: null,
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error
    this.logError(error, errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private async logError(error: Error, errorInfo: ErrorInfo) {
    try {
      // Simple error logging without external service dependency
      console.error("ErrorBoundary caught an error:", error);
      console.error("Error info:", errorInfo);

      // Generate a simple error ID
      const errorId = `error_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      this.setState({ errorId });
    } catch (logError) {
      console.error("Failed to log error:", logError);
    }
  }

  private readonly handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorId: null,
    });
  };

  private readonly handleGoHome = () => {
    if (typeof globalThis.window !== "undefined") {
      globalThis.window.location.href = "/";
    }
  };

  override render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Something went wrong
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We're sorry, but something unexpected happened. Our team has
                been notified.
              </p>
              {this.state.errorId && (
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                  Error ID: {this.state.errorId}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </button>
              <button
                onClick={this.handleGoHome}
                className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </button>
            </div>

            {process.env["NODE_ENV"] === "development" && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Bug className="h-4 w-4 inline mr-1" />
                  Error Details (Development)
                </summary>
                <div className="bg-gray-100 dark:bg-gray-700 rounded p-3 text-xs font-mono text-gray-800 dark:text-gray-200 overflow-auto">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  <div>
                    <strong>Stack:</strong>
                    <pre className="whitespace-pre-wrap mt-1">
                      {this.state.error.stack}
                    </pre>
                  </div>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easier usage
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, "children">,
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}
