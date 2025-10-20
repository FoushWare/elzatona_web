import { v2 as cloudinary } from 'cloudinary';

export interface AudioFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
  url: string;
  publicId: string;
}

export class CloudinaryAudioStorage {
  private static initialized = false;

  static async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      this.initialized = true;
      console.log('✅ Cloudinary audio storage initialized');
    } catch (error) {
      console.error('❌ Failed to initialize Cloudinary:', error);
      throw error;
    }
  }

  static async uploadAudio(
    file: Buffer,
    filename: string,
    type: 'question' | 'answer',
    question_id: string
  ): Promise<AudioFile> {
    try {
      await this.initialize();

      const fileId = `${question_id}-${Date.now()}`;
      const publicId = `audio/${type}s/${fileId}`;

      const result = await cloudinary.uploader.upload(
        `data:audio/mpeg;base64,${file.toString('base64')}`,
        {
          public_id: publicId,
          resource_type: 'video', // Cloudinary treats audio as video
          folder: `audio/${type}s`,
          use_filename: false,
          unique_filename: true,
        }
      );

      const audioFile: AudioFile = {
        id: fileId,
        filename: filename,
        originalName: filename,
        mimeType: 'audio/mpeg',
        size: result.bytes,
        uploadedAt: new Date(),
        url: result.secure_url,
        publicId: result.public_id,
      };

      console.log(`✅ Audio uploaded to Cloudinary: ${audioFile.url}`);
      return audioFile;
    } catch (error) {
      console.error('❌ Failed to upload audio to Cloudinary:', error);
      throw error;
    }
  }

  static async getAudioUrl(audioFile: AudioFile): Promise<string> {
    return audioFile.url;
  }

  static async deleteAudio(audioFile: AudioFile): Promise<void> {
    try {
      await this.initialize();
      await cloudinary.uploader.destroy(audioFile.publicId);
      console.log(`✅ Audio deleted from Cloudinary: ${audioFile.publicId}`);
    } catch (error) {
      console.error('❌ Failed to delete audio from Cloudinary:', error);
      throw error;
    }
  }
}
