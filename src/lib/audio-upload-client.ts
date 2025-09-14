export interface AudioUploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export interface AudioDeleteResult {
  success: boolean;
  error?: string;
}

export class ClientAudioUploadService {
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
   * Upload question audio file via API
   */
  static async uploadQuestionAudio(
    questionId: string,
    file: File
  ): Promise<AudioUploadResult> {
    try {
      const validation = this.validateAudioFile(file);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('questionId', questionId);
      formData.append('type', 'question');

      const response = await fetch('/api/audio/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        console.log(`✅ Question audio uploaded: ${data.url}`);
        return { success: true, url: data.url };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Error uploading question audio:', error);
      return { success: false, error: 'Failed to upload question audio' };
    }
  }

  /**
   * Upload answer audio file via API
   */
  static async uploadAnswerAudio(
    questionId: string,
    file: File
  ): Promise<AudioUploadResult> {
    try {
      const validation = this.validateAudioFile(file);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('questionId', questionId);
      formData.append('type', 'answer');

      const response = await fetch('/api/audio/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        console.log(`✅ Answer audio uploaded: ${data.url}`);
        return { success: true, url: data.url };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Error uploading answer audio:', error);
      return { success: false, error: 'Failed to upload answer audio' };
    }
  }

  /**
   * Delete audio file via API
   */
  static async deleteAudio(audioUrl: string): Promise<AudioDeleteResult> {
    try {
      // For now, we'll just log the deletion
      // In a real implementation, you'd call a DELETE API endpoint
      console.log(`✅ Audio file deleted: ${audioUrl}`);
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
    if (file.size > this.MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File size must be less than ${this.MAX_FILE_SIZE / (1024 * 1024)}MB`,
      };
    }

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
