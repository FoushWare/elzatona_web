/**
 * Cookie management utilities for authentication
 */

import { setAuthCookie } from './auth-utils';

import { User } from 'firebase/auth';

interface UserWithIdToken {
  getIdToken(): Promise<string>;
}

export class CookieManager {
  private static instance: CookieManager;
  private isSettingCookie = false;

  static getInstance(): CookieManager {
    if (!CookieManager.instance) {
      CookieManager.instance = new CookieManager();
    }
    return CookieManager.instance;
  }

  async ensureAuthCookie(user: UserWithIdToken): Promise<boolean> {
    if (this.isSettingCookie) {
      // Wait for the current cookie setting to complete
      return new Promise(resolve => {
        const checkInterval = setInterval(() => {
          if (!this.isSettingCookie) {
            clearInterval(checkInterval);
            resolve(true);
          }
        }, 100);
      });
    }

    this.isSettingCookie = true;

    try {
      const token = await user.getIdToken();
      await setAuthCookie(token);
      console.log('✅ Auth cookie ensured successfully');
      return true;
    } catch (error) {
      console.error('Failed to ensure auth cookie:', error);
      return false;
    } finally {
      this.isSettingCookie = false;
    }
  }

  async retryAuthCookie(
    user: UserWithIdToken,
    maxRetries: number = 3
  ): Promise<boolean> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const success = await this.ensureAuthCookie(user);
        if (success) {
          return true;
        }
      } catch (error) {
        console.warn(`Auth cookie retry ${i + 1} failed:`, error);
        if (i < maxRetries - 1) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    }
    return false;
  }
}

export const cookieManager = CookieManager.getInstance();
