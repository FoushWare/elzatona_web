// Type definitions for error-logging-service
// These types are used by shared-hooks but the service is app-specific

export class ErrorLoggingService {
  static async logError(
    _error: Error,
    _context?: Record<string, unknown>,
  ): Promise<void> {
    // Stub implementation
  }
  static async logPerformance(
    _operation: string,
    _duration: number,
    _success: boolean,
    _context: Record<string, unknown>,
    _metadata?: Record<string, unknown>,
  ): Promise<void> {
    // Stub implementation
  }
}
