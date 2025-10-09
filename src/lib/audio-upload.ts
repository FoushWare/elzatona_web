import { storage } from './firebase';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

export interface AudioUploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export interface AudioDeleteResult {
  success: boolean;
  error?: string;
}

export class AudioUploadService {
  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private static readonly ALLOWED_TYPES = [
    'audio/mpeg',
    'audio/mp3',
    'audio/wav',
    'audio/ogg',
    'audio/m4a',
    'audio/aac',
    'audio/webm',
  ];

  /**
   * Upload question audio file
   */
  static async uploadQuestionAudio(
    questionId: string,
    file: File
  ): Promise<AudioUploadResult> {
    try {
      // Validate file
      const validation = this.validateAudioFile(file);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      // Create storage reference
      if (!storage) {
        return { success: false, error: 'Firebase Storage not available' };
      }
      const fileName = `questions/${questionId}/question_audio`;
      const storageRef = ref(storage, fileName);

      // Upload file
      const snapshot = await uploadBytes(storageRef, file);

      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log(`✅ Question audio uploaded: ${downloadURL}`);
      return { success: true, url: downloadURL };
    } catch (error) {
      console.error('Error uploading question audio:', error);
      return { success: false, error: 'Failed to upload question audio' };
    }
  }

  /**
   * Upload answer audio file
   */
  static async uploadAnswerAudio(
    questionId: string,
    file: File
  ): Promise<AudioUploadResult> {
    try {
      // Validate file
      const validation = this.validateAudioFile(file);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      // Create storage reference
      if (!storage) {
        return { success: false, error: 'Firebase Storage not available' };
      }
      const fileName = `questions/${questionId}/answer_audio`;
      const storageRef = ref(storage, fileName);

      // Upload file
      const snapshot = await uploadBytes(storageRef, file);

      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log(`✅ Answer audio uploaded: ${downloadURL}`);
      return { success: true, url: downloadURL };
    } catch (error) {
      console.error('Error uploading answer audio:', error);
      return { success: false, error: 'Failed to upload answer audio' };
    }
  }

  /**
   * Delete audio file
   */
  static async deleteAudio(audioUrl: string): Promise<AudioDeleteResult> {
    try {
      // Extract file path from URL
      const filePath = this.extractFilePathFromUrl(audioUrl);
      if (!filePath) {
        return { success: false, error: 'Invalid audio URL' };
      }

      // Create storage reference
      if (!storage) {
        return { success: false, error: 'Firebase Storage not available' };
      }
      const storageRef = ref(storage, filePath);

      // Delete file
      await deleteObject(storageRef);

      console.log(`✅ Audio file deleted: ${filePath}`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting audio file:', error);
      return { success: false, error: 'Failed to delete audio file' };
    }
  }

  /**
   * Validate audio file
   */
  private static validateAudioFile(file: File): {
    valid: boolean;
    error?: string;
  } {
    // Check file size
    if (file.size > this.MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File size must be less than ${this.MAX_FILE_SIZE / (1024 * 1024)}MB`,
      };
    }

    // Check file type
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      return {
        valid: false,
        error:
          'File type not supported. Please use MP3, WAV, OGG, M4A, AAC, or WebM',
      };
    }

    return { valid: true };
  }

  /**
   * Extract file path from Firebase Storage URL
   */
  private static extractFilePathFromUrl(url: string): string | null {
    try {
      // Firebase Storage URLs have a specific pattern
      // Extract the path from the URL
      const urlParts = url.split('/');
      const bucketIndex = urlParts.findIndex(part =>
        part.includes('firebasestorage.googleapis.com')
      );

      if (bucketIndex === -1) {
        return null;
      }

      // Get the path after the bucket name
      const pathParts = urlParts.slice(bucketIndex + 2); // Skip bucket and 'o' parameter
      const path = pathParts.join('/');

      // Remove query parameters
      return path.split('?')[0];
    } catch (error) {
      console.error('Error extracting file path from URL:', error);
      return null;
    }
  }

  /**
   * Get file size in MB
   */
  static getFileSizeMB(file: File): number {
    return file.size / (1024 * 1024);
  }

  /**
   * Format file size for display
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
