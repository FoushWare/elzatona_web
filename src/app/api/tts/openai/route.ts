import { NextRequest, NextResponse } from 'next/server';
import { OpenAITTS } from '@/lib/openai-tts';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, voice, model, speed, format } = body;

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Initialize OpenAI TTS
    const tts = new OpenAITTS();

    // Check if API key is available
    if (!tts.isAvailable()) {
      return NextResponse.json(
        { 
          error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.',
          fallback: 'browser'
        },
        { status: 503 }
      );
    }

    // Synthesize speech
    const result = await tts.synthesize({
      text,
      voice: voice || 'nova',
      model: model || 'tts-1-hd',
      speed: speed || 1.0,
      format: format || 'mp3'
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    // Return the audio URL and metadata
    return NextResponse.json({
      success: true,
      audioUrl: result.audioUrl,
      voice: result.voice,
      duration: result.duration,
      provider: 'openai'
    });

  } catch (error) {
    console.error('OpenAI TTS API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to check available voices
export async function GET() {
  const tts = new OpenAITTS();
  
  return NextResponse.json({
    available: tts.isAvailable(),
    voices: tts.getAvailableVoices(),
    provider: 'openai'
  });
}
