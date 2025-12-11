// Type definitions for error-logging-service
// These types are used by shared-hooks but the service is app-specific

export class ErrorLoggingService {
  static async logError(
    error: Error,
    context?: Record<string, unknown>,
  ): Promise<void> {
    // Stub implementation
  }
  static async logPerformance(
    operation: string,
    duration: number,
    success: boolean,
    context: Record<string, unknown>,
    metadata?: Record<string, unknown>,
  ): Promise<void> {
    // Stub implementation
  }
}
