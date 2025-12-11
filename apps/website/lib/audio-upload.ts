import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"]!;
const supabaseServiceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"]!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

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
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/ogg",
    "audio/m4a",
    "audio/aac",
    "audio/webm",
  ];

  /**
   * Upload question audio file
   */
  static async uploadQuestionAudio(
    question_id: string,
    file: File,
  ): Promise<AudioUploadResult> {
    try {
      // Validate file
      const validation = this.validateAudioFile(file);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      // Create file path
      const fileName = `questions/${question_id}/question_audio.${this.getFileExtension(file.type)}`;

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("audio-files")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("Error uploading question audio:", error);
        return { success: false, error: "Failed to upload question audio" };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("audio-files")
        .getPublicUrl(fileName);

      console.log(`✅ Question audio uploaded: ${urlData.publicUrl}`);
      return { success: true, url: urlData.publicUrl };
    } catch (error) {
      console.error("Error uploading question audio:", error);
      return { success: false, error: "Failed to upload question audio" };
    }
  }

  /**
   * Upload answer audio file
   */
  static async uploadAnswerAudio(
    question_id: string,
    file: File,
  ): Promise<AudioUploadResult> {
    try {
      // Validate file
      const validation = this.validateAudioFile(file);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      // Create file path
      const fileName = `questions/${question_id}/answer_audio.${this.getFileExtension(file.type)}`;

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("audio-files")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("Error uploading answer audio:", error);
        return { success: false, error: "Failed to upload answer audio" };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("audio-files")
        .getPublicUrl(fileName);

      console.log(`✅ Answer audio uploaded: ${urlData.publicUrl}`);
      return { success: true, url: urlData.publicUrl };
    } catch (error) {
      console.error("Error uploading answer audio:", error);
      return { success: false, error: "Failed to upload answer audio" };
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
        return { success: false, error: "Invalid audio URL" };
      }

      // Delete file from Supabase Storage
      const { error } = await supabase.storage
        .from("audio-files")
        .remove([filePath]);

      if (error) {
        console.error("Error deleting audio file:", error);
        return { success: false, error: "Failed to delete audio file" };
      }

      console.log(`✅ Audio file deleted: ${filePath}`);
      return { success: true };
    } catch (error) {
      console.error("Error deleting audio file:", error);
      return { success: false, error: "Failed to delete audio file" };
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
          "File type not supported. Please use MP3, WAV, OGG, M4A, AAC, or WebM",
      };
    }

    return { valid: true };
  }

  /**
   * Extract file path from Supabase Storage URL
   */
  private static extractFilePathFromUrl(url: string): string | null {
    try {
      // Supabase Storage URLs have a specific pattern
      // Extract the path from the URL
      const urlParts = url.split("/");
      const bucketIndex = urlParts.findIndex((part) =>
        part.includes("supabase.co"),
      );

      if (bucketIndex === -1) {
        return null;
      }

      // Get the path after the bucket name
      const pathParts = urlParts.slice(bucketIndex + 2); // Skip bucket and 'storage' parameter
      const path = pathParts.join("/");

      // Remove query parameters
      return path.split("?")[0];
    } catch (error) {
      console.error("Error extracting file path from URL:", error);
      return null;
    }
  }

  /**
   * Get file extension from MIME type
   */
  private static getFileExtension(mimeType: string): string {
    const extensions: { [key: string]: string } = {
      "audio/mpeg": "mp3",
      "audio/mp3": "mp3",
      "audio/wav": "wav",
      "audio/ogg": "ogg",
      "audio/m4a": "m4a",
      "audio/aac": "aac",
      "audio/webm": "webm",
    };
    return extensions[mimeType] || "mp3";
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
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
}
