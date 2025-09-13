// OpenAI TTS Integration for Human-Like Speech
// Requires OPENAI_API_KEY environment variable

interface OpenAITTSOptions {
  text: string;
  voice?: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
  model?: 'tts-1' | 'tts-1-hd';
  speed?: number; // 0.25 to 4.0
  format?: 'mp3' | 'opus' | 'aac' | 'flac';
}

interface TTSResponse {
  success: boolean;
  audioUrl?: string;
  error?: string;
  voice?: string;
  duration?: number;
}

export class OpenAITTS {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1/audio/speech';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';
  }

  async synthesize(options: OpenAITTSOptions): Promise<TTSResponse> {
    if (!this.apiKey) {
      return {
        success: false,
        error: 'OpenAI API key not provided. Please set OPENAI_API_KEY environment variable.'
      };
    }

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: options.model || 'tts-1-hd', // Use HD model for better quality
          input: options.text,
          voice: options.voice || 'nova', // Nova is very natural and clear
          response_format: options.format || 'mp3',
          speed: options.speed || 1.0, // Normal speed
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: `OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`
        };
      }

      // Convert response to blob and create URL
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      return {
        success: true,
        audioUrl,
        voice: options.voice || 'nova',
        duration: audioBlob.size / 16000 // Rough estimate
      };

    } catch (error) {
      return {
        success: false,
        error: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  // Get available voices with descriptions
  getAvailableVoices() {
    return [
      { id: 'alloy', name: 'Alloy', description: 'Neutral, balanced voice' },
      { id: 'echo', name: 'Echo', description: 'Clear, professional voice' },
      { id: 'fable', name: 'Fable', description: 'Warm, storytelling voice' },
      { id: 'onyx', name: 'Onyx', description: 'Deep, authoritative voice' },
      { id: 'nova', name: 'Nova', description: 'Bright, energetic voice (Recommended)' },
      { id: 'shimmer', name: 'Shimmer', description: 'Soft, gentle voice' },
    ];
  }

  // Check if API key is available
  isAvailable(): boolean {
    return !!this.apiKey;
  }
}

// Utility function for easy integration
export async function speakWithOpenAI(
  text: string,
  options?: Partial<OpenAITTSOptions>
): Promise<TTSResponse> {
  const tts = new OpenAITTS();
  return await tts.synthesize({
    text,
    voice: 'nova', // Default to most natural voice
    model: 'tts-1-hd', // Use HD model for best quality
    speed: 1.0,
    format: 'mp3',
    ...options
  });
}
