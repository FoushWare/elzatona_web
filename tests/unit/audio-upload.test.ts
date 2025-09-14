import { ClientAudioUploadService } from '@/lib/audio-upload-client';

// Mock fetch for API calls
global.fetch = jest.fn();

describe('ClientAudioUploadService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadQuestionAudio', () => {
    it('should upload question audio successfully', async () => {
      const mockFile = new File(['audio content'], 'question.mp3', {
        type: 'audio/mpeg',
      });

      const mockResponse = {
        success: true,
        data: {
          url: '/audio/questions/question-123.mp3',
          filename: 'question-123.mp3',
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await ClientAudioUploadService.uploadQuestionAudio(
        'question-123',
        mockFile
      );

      expect(result.success).toBe(true);
      expect(result.data?.url).toBe('/audio/questions/question-123.mp3');
      expect(global.fetch).toHaveBeenCalledWith('/api/audio/upload', {
        method: 'POST',
        body: expect.any(FormData),
      });
    });

    it('should handle upload errors', async () => {
      const mockFile = new File(['audio content'], 'question.mp3', {
        type: 'audio/mpeg',
      });

      const mockResponse = {
        success: false,
        error: 'File too large',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await ClientAudioUploadService.uploadQuestionAudio(
        'question-123',
        mockFile
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe('File too large');
    });

    it('should handle network errors', async () => {
      const mockFile = new File(['audio content'], 'question.mp3', {
        type: 'audio/mpeg',
      });

      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      );

      const result = await ClientAudioUploadService.uploadQuestionAudio(
        'question-123',
        mockFile
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Network error');
    });
  });

  describe('uploadAnswerAudio', () => {
    it('should upload answer audio successfully', async () => {
      const mockFile = new File(['audio content'], 'answer.mp3', {
        type: 'audio/mpeg',
      });

      const mockResponse = {
        success: true,
        data: {
          url: '/audio/answers/answer-123.mp3',
          filename: 'answer-123.mp3',
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await ClientAudioUploadService.uploadAnswerAudio(
        'answer-123',
        mockFile
      );

      expect(result.success).toBe(true);
      expect(result.data?.url).toBe('/audio/answers/answer-123.mp3');
    });

    it('should handle invalid file types', async () => {
      const mockFile = new File(['text content'], 'document.txt', {
        type: 'text/plain',
      });

      const mockResponse = {
        success: false,
        error: 'Invalid file type. Only audio files are allowed.',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await ClientAudioUploadService.uploadAnswerAudio(
        'answer-123',
        mockFile
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe(
        'Invalid file type. Only audio files are allowed.'
      );
    });
  });

  describe('deleteAudio', () => {
    it('should delete audio file successfully', async () => {
      const mockResponse = {
        success: true,
        message: 'Audio file deleted successfully',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await ClientAudioUploadService.deleteAudio(
        '/audio/questions/question-123.mp3'
      );

      expect(result.success).toBe(true);
      expect(result.message).toBe('Audio file deleted successfully');
      expect(global.fetch).toHaveBeenCalledWith('/api/audio/upload', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filePath: '/audio/questions/question-123.mp3',
        }),
      });
    });

    it('should handle deletion errors', async () => {
      const mockResponse = {
        success: false,
        error: 'File not found',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await ClientAudioUploadService.deleteAudio(
        '/audio/questions/non-existent.mp3'
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe('File not found');
    });
  });

  describe('validateAudioFile', () => {
    it('should validate audio file size', () => {
      const validFile = new File(['audio content'], 'audio.mp3', {
        type: 'audio/mpeg',
      });

      // Mock file size to be within limit (10MB = 10 * 1024 * 1024 bytes)
      Object.defineProperty(validFile, 'size', {
        value: 5 * 1024 * 1024, // 5MB
        writable: false,
      });

      const result = ClientAudioUploadService.validateAudioFile(validFile);
      expect(result.isValid).toBe(true);
    });

    it('should reject files that are too large', () => {
      const largeFile = new File(['audio content'], 'large-audio.mp3', {
        type: 'audio/mpeg',
      });

      // Mock file size to exceed limit
      Object.defineProperty(largeFile, 'size', {
        value: 15 * 1024 * 1024, // 15MB
        writable: false,
      });

      const result = ClientAudioUploadService.validateAudioFile(largeFile);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('File size exceeds 10MB limit');
    });

    it('should reject non-audio files', () => {
      const textFile = new File(['text content'], 'document.txt', {
        type: 'text/plain',
      });

      const result = ClientAudioUploadService.validateAudioFile(textFile);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid file type');
    });

    it('should accept various audio formats', () => {
      const audioFormats = [
        'audio/mpeg',
        'audio/wav',
        'audio/ogg',
        'audio/mp4',
        'audio/webm',
      ];

      audioFormats.forEach(format => {
        const audioFile = new File(
          ['audio content'],
          `audio.${format.split('/')[1]}`,
          {
            type: format,
          }
        );

        Object.defineProperty(audioFile, 'size', {
          value: 1024 * 1024, // 1MB
          writable: false,
        });

        const result = ClientAudioUploadService.validateAudioFile(audioFile);
        expect(result.isValid).toBe(true);
      });
    });
  });
});
