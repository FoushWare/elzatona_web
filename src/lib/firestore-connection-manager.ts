/**
 * Firestore Connection Manager
 * Handles connection state, retries, and error recovery
 */

import { Firestore, enableNetwork, disableNetwork } from 'firebase/firestore';

export class FirestoreConnectionManager {
  private static instance: FirestoreConnectionManager;
  private db: Firestore | null = null;
  private isConnected = true;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3;
  private reconnectDelay = 1000; // Start with 1 second

  static getInstance(): FirestoreConnectionManager {
    if (!FirestoreConnectionManager.instance) {
      FirestoreConnectionManager.instance = new FirestoreConnectionManager();
    }
    return FirestoreConnectionManager.instance;
  }

  initialize(db: Firestore) {
    this.db = db;
    this.setupConnectionMonitoring();
  }

  private setupConnectionMonitoring() {
    if (!this.db) return;

    // Monitor connection state
    const checkConnection = async () => {
      try {
        await enableNetwork(this.db!);
        if (!this.isConnected) {
          console.log('🔗 Firestore reconnected');
          this.isConnected = true;
          this.reconnectAttempts = 0;
          this.reconnectDelay = 1000; // Reset delay
        }
      } catch (error) {
        // Check if this is a Firebase internal assertion error
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        if (
          errorMessage.includes('INTERNAL ASSERTION FAILED') ||
          errorMessage.includes('Unexpected state') ||
          errorMessage.includes('TargetState') ||
          errorMessage.includes('WatchChangeAggregator')
        ) {
          // These are non-critical Firebase internal errors, don't treat as connection loss
          return;
        }

        if (this.isConnected) {
          console.log('🔌 Firestore connection lost');
          this.isConnected = false;
        }
        await this.handleReconnection();
      }
    };

    // Check connection every 30 seconds
    setInterval(checkConnection, 30000);
  }

  private async handleReconnection() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.warn(
        '⚠️ Max reconnection attempts reached. Firestore may be offline.'
      );
      return;
    }

    this.reconnectAttempts++;
    console.log(
      `🔄 Attempting to reconnect Firestore (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`
    );

    // Exponential backoff
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    await new Promise(resolve => setTimeout(resolve, delay));

    try {
      if (this.db) {
        await enableNetwork(this.db);
        console.log('✅ Firestore reconnected successfully');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.reconnectDelay = 1000;
      }
    } catch (error) {
      console.warn('❌ Reconnection failed:', error);
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        await this.handleReconnection();
      }
    }
  }

  async ensureConnection(): Promise<boolean> {
    if (!this.db) return false;

    try {
      await enableNetwork(this.db);
      this.isConnected = true;
      return true;
    } catch (error) {
      console.warn('Failed to ensure Firestore connection:', error);
      this.isConnected = false;
      return false;
    }
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Ensure connection before operation
        await this.ensureConnection();

        // Execute the operation
        const result = await operation();
        return result;
      } catch (error) {
        lastError = error as Error;
        console.warn(
          `Operation failed (attempt ${attempt}/${maxRetries}):`,
          error
        );

        if (attempt < maxRetries) {
          // Wait before retry with exponential backoff
          const delay = 1000 * Math.pow(2, attempt - 1);
          await new Promise(resolve => setTimeout(resolve, delay));

          // Try to reconnect
          await this.ensureConnection();
        }
      }
    }

    throw lastError || new Error('Operation failed after all retries');
  }
}

export const firestoreConnectionManager =
  FirestoreConnectionManager.getInstance();
