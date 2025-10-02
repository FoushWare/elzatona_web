import { BackupQuestion } from './backup-service';

export interface BackupStats {
  totalFiles: number;
  totalQuestions: number;
  sections: { [section: string]: number };
}

export interface BackupApiResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

export class BackupClientService {
  private static readonly API_BASE = '/api/admin/backup';

  /**
   * Backup a question to its section file
   */
  static async backupQuestion(
    question: BackupQuestion
  ): Promise<BackupApiResult> {
    try {
      const response = await fetch(this.API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(question),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Backup client error:', error);
      return {
        success: false,
        error: 'Failed to backup question',
      };
    }
  }

  /**
   * Get backup statistics
   */
  static async getBackupStats(): Promise<BackupApiResult> {
    try {
      const response = await fetch(`${this.API_BASE}?action=stats`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Backup client error:', error);
      return {
        success: false,
        error: 'Failed to get backup statistics',
      };
    }
  }

  /**
   * Get all backup files
   */
  static async getBackupFiles(): Promise<BackupApiResult> {
    try {
      const response = await fetch(`${this.API_BASE}?action=files`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Backup client error:', error);
      return {
        success: false,
        error: 'Failed to get backup files',
      };
    }
  }

  /**
   * Get questions from a specific section backup
   */
  static async getSectionBackup(section: string): Promise<BackupApiResult> {
    try {
      const response = await fetch(
        `${this.API_BASE}?action=section&section=${encodeURIComponent(section)}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Backup client error:', error);
      return {
        success: false,
        error: 'Failed to get section backup',
      };
    }
  }

  /**
   * Delete section backup
   */
  static async deleteSectionBackup(section: string): Promise<BackupApiResult> {
    try {
      const response = await fetch(this.API_BASE, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ section }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Backup client error:', error);
      return {
        success: false,
        error: 'Failed to delete section backup',
      };
    }
  }

  /**
   * Format section name for display
   */
  static formatSectionName(section: string): string {
    return section
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Get section icon based on section name
   */
  static getSectionIcon(section: string): string {
    const iconMap: { [key: string]: string } = {
      learning: '📚',
      practice: '💻',
      'interview-prep': '🎯',
      media: '🎧',
      coding: '⚡',
      'system-design': '🏗️',
      security: '🔒',
      performance: '⚡',
      testing: '🧪',
      deployment: '🚀',
    };

    return iconMap[section.toLowerCase()] || '📄';
  }
}
