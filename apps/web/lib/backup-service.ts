import { promises as fs } from 'fs';
import path from 'path';

// Types
export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface BackupQuestion {
  id: string;
  title: string;
  content: string;
  type: 'single' | 'multiple';
  difficulty: 'easy' | 'medium' | 'hard';
  section: string;
  options: QuestionOption[];
  correctAnswers: string[];
  explanation: string;
  audioQuestion?: string;
  audioAnswer?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface BackupResult {
  success: boolean;
  message: string;
  backupPath?: string;
  error?: string;
}

export interface RestoreResult {
  success: boolean;
  message: string;
  questionsRestored?: number;
  error?: string;
}

export class BackupService {
  private static readonly BACKUP_DIR = path.join(process.cwd(), 'backup');
  private static readonly QUESTIONS_DIR = path.join(
    this.BACKUP_DIR,
    'questions'
  );

  /**
   * Ensure backup directories exist
   */
  private static async ensureBackupDirectories(): Promise<void> {
    try {
      await fs.mkdir(this.BACKUP_DIR, { recursive: true });
      await fs.mkdir(this.QUESTIONS_DIR, { recursive: true });
    } catch (error) {
      console.error('Failed to create backup directories:', error);
      throw new Error('Failed to create backup directories');
    }
  }

  /**
   * Get backup file path for a section
   */
  private static getSectionBackupPath(section: string): string {
    const sanitizedSection = section.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return path.join(this.QUESTIONS_DIR, `${sanitizedSection}-questions.json`);
  }

  /**
   * Backup a question to its section file
   */
  static async backupQuestion(question: BackupQuestion): Promise<BackupResult> {
    try {
      await this.ensureBackupDirectories();

      const backupPath = this.getSectionBackupPath(question.section);
      let existingQuestions: BackupQuestion[] = [];

      // Read existing questions if file exists
      try {
        const fileContent = await fs.readFile(backupPath, 'utf-8');
        existingQuestions = JSON.parse(fileContent);
      } catch (error) {
        // File doesn't exist yet, start with empty array
        console.log(
          `Creating new backup file for section: ${question.section}`
        );
      }

      // Check if question already exists (by ID)
      const existingIndex = existingQuestions.findIndex(
        q => q.id === question.id
      );

      if (existingIndex >= 0) {
        // Update existing question
        existingQuestions[existingIndex] = question;
        console.log(
          `Updated question ${question.id} in backup for section: ${question.section}`
        );
      } else {
        // Add new question
        existingQuestions.push(question);
        console.log(
          `Added new question ${question.id} to backup for section: ${question.section}`
        );
      }

      // Sort questions by creation date (newest first)
      existingQuestions.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Write updated questions to backup file
      await fs.writeFile(
        backupPath,
        JSON.stringify(existingQuestions, null, 2)
      );

      return {
        success: true,
        message: `Question backed up successfully to ${question.section} section`,
        backupPath,
      };
    } catch (error) {
      console.error('Backup failed:', error);
      return {
        success: false,
        message: 'Failed to backup question',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get all backup files
   */
  static async getBackupFiles(): Promise<string[]> {
    try {
      await this.ensureBackupDirectories();

      const files = await fs.readdir(this.QUESTIONS_DIR);
      return files.filter(file => file.endsWith('.json'));
    } catch (error) {
      console.error('Failed to get backup files:', error);
      return [];
    }
  }

  /**
   * Get questions from a specific section backup
   */
  static async getSectionBackup(section: string): Promise<BackupQuestion[]> {
    try {
      await this.ensureBackupDirectories();

      const backupPath = this.getSectionBackupPath(section);
      const fileContent = await fs.readFile(backupPath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      console.error(`Failed to read backup for section ${section}:`, error);
      return [];
    }
  }

  /**
   * Restore questions from backup to Firebase (placeholder for future implementation)
   */
  static async restoreFromBackup(section: string): Promise<RestoreResult> {
    try {
      const questions = await this.getSectionBackup(section);

      if (questions.length === 0) {
        return {
          success: false,
          message: `No backup questions found for section: ${section}`,
          questionsRestored: 0,
        };
      }

      // TODO: Implement Firebase restoration
      // This would involve:
      // 1. Connecting to Firebase
      // 2. Adding questions to the appropriate collection
      // 3. Handling duplicates and conflicts

      console.log(
        `Would restore ${questions.length} questions for section: ${section}`
      );

      return {
        success: true,
        message: `Successfully prepared ${questions.length} questions for restoration from ${section} section`,
        questionsRestored: questions.length,
      };
    } catch (error) {
      console.error('Restore failed:', error);
      return {
        success: false,
        message: 'Failed to restore questions from backup',
        error: error instanceof Error ? error.message : 'Unknown error',
        questionsRestored: 0,
      };
    }
  }

  /**
   * Get backup statistics
   */
  static async getBackupStats(): Promise<{
    totalFiles: number;
    totalQuestions: number;
    sections: { [section: string]: number };
  }> {
    try {
      const files = await this.getBackupFiles();
      let totalQuestions = 0;
      const sections: { [section: string]: number } = {};

      for (const file of files) {
        const section = file.replace('-questions.json', '');
        const questions = await this.getSectionBackup(section);
        sections[section] = questions.length;
        totalQuestions += questions.length;
      }

      return {
        totalFiles: files.length,
        totalQuestions,
        sections,
      };
    } catch (error) {
      console.error('Failed to get backup stats:', error);
      return {
        totalFiles: 0,
        totalQuestions: 0,
        sections: {},
      };
    }
  }

  /**
   * Delete backup file for a section
   */
  static async deleteSectionBackup(section: string): Promise<BackupResult> {
    try {
      const backupPath = this.getSectionBackupPath(section);
      await fs.unlink(backupPath);

      return {
        success: true,
        message: `Backup file deleted for section: ${section}`,
      };
    } catch (error) {
      console.error('Failed to delete backup:', error);
      return {
        success: false,
        message: 'Failed to delete backup file',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
