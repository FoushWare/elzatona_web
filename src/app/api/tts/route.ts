import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const {
      text,
      voice = 'en',
      speed = 0.9,
      pitch = 1.0,
    } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Try multiple TTS services for better voice quality
    let ttsResponse;
    let audioBuffer;

    try {
      // First try: Enhanced Google Translate TTS with better parameters
      const encodedText = encodeURIComponent(text);
      const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${voice}&client=tw-ob&q=${encodedText}&ttsspeed=${speed}&ttspitch=${pitch}`;

      ttsResponse = await fetch(ttsUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Referer: 'https://translate.google.com/',
          Accept: 'audio/mpeg, audio/*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
        },
      });

      if (ttsResponse.ok) {
        audioBuffer = await ttsResponse.arrayBuffer();
      } else {
        throw new Error('Google TTS failed');
      }
    } catch (error) {
      // Fallback: Try alternative TTS service
      try {
        const alternativeUrl = `https://api.voicerss.org/?key=demo&hl=${voice}&src=${encodeURIComponent(text)}&f=44khz_16bit_mono&c=mp3&r=${speed}&p=${pitch}`;

        ttsResponse = await fetch(alternativeUrl, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        });

        if (ttsResponse.ok) {
          audioBuffer = await ttsResponse.arrayBuffer();
        } else {
          throw new Error('Alternative TTS failed');
        }
      } catch (fallbackError) {
        // Final fallback: Basic Google Translate
        const basicUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(text)}`;

        ttsResponse = await fetch(basicUrl, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            Referer: 'https://translate.google.com/',
          },
        });

        if (!ttsResponse.ok) {
          throw new Error('All TTS services failed');
        }

        audioBuffer = await ttsResponse.arrayBuffer();
      }
    }

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('TTS API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate speech' },
      { status: 500 }
    );
  }
}
