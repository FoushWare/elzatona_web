import { useCallback, useRef } from "react";
import { ErrorLoggingService } from "./types/error-logging-service";

export function usePerformanceMonitoring() {
  const timers = useRef<Map<string, number>>(new Map());

  const startTimer = useCallback((operation: string) => {
    timers.current.set(operation, Date.now());
  }, []);

  const endTimer = useCallback(
    async (
      operation: string,
      success: boolean = true,
      context: {
        userId?: string;
        adminId?: string;
        sessionId?: string;
        url?: string;
        method?: string;
      } = {},
      metadata: {
        component?: string;
        apiEndpoint?: string;
        databaseOperation?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
      } = {},
    ) => {
      const startTime = timers.current.get(operation);
      if (!startTime) {
        console.warn(`Timer for operation "${operation}" was not started`);
        return;
      }

      const duration = Date.now() - startTime;
      timers.current.delete(operation);

      // Log performance metrics
      await ErrorLoggingService.logPerformance(
        operation,
        duration,
        success,
        {
          ...context,
          url:
            typeof window !== "undefined" ? window.location.href : context.url,
        },
        metadata,
      );

      return duration;
    },
    [],
  );

  const measureAsync = useCallback(
    async <T>(
      operation: string,
      asyncFunction: () => Promise<T>,
      context: {
        userId?: string;
        adminId?: string;
        sessionId?: string;
        url?: string;
        method?: string;
      } = {},
      metadata: {
        component?: string;
        apiEndpoint?: string;
        databaseOperation?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
      } = {},
    ): Promise<T> => {
      startTimer(operation);

      try {
        const result = await asyncFunction();
        await endTimer(operation, true, context, metadata);
        return result;
      } catch (error) {
        await endTimer(operation, false, context, metadata);
        throw error;
      }
    },
    [startTimer, endTimer],
  );

  const measureSync = useCallback(
    <T>(
      operation: string,
      syncFunction: () => T,
      context: {
        userId?: string;
        adminId?: string;
        sessionId?: string;
        url?: string;
        method?: string;
      } = {},
      metadata: {
        component?: string;
        apiEndpoint?: string;
        databaseOperation?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
      } = {},
    ): T => {
      startTimer(operation);

      try {
        const result = syncFunction();
        endTimer(operation, true, context, metadata);
        return result;
      } catch (error) {
        endTimer(operation, false, context, metadata);
        throw error;
      }
    },
    [startTimer, endTimer],
  );

  return {
    startTimer,
    endTimer,
    measureAsync,
    measureSync,
  };
}
