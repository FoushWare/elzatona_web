import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { topic, duration = 30, apiKey } = await request.json();

    // Daily.co API endpoint
    const DAILY_API_URL = 'https://api.daily.co/v1/rooms';
    const DAILY_API_KEY = apiKey || process.env.DAILY_API_KEY;

    if (!DAILY_API_KEY) {
      return NextResponse.json(
        { error: 'Daily.co API key is required' },
        { status: 400 }
      );
    }

    // Create room configuration
    const roomConfig = {
      name: `interview-${Date.now()}`, // Unique room name
      privacy: 'private',
      properties: {
        enable_screenshare: true,
        enable_chat: true,
        enable_knocking: false,
        enable_recording: false,
        exp: Math.round(Date.now() / 1000) + duration * 60, // Room expires after duration
        max_participants: 2, // Learner + AI interviewer
        start_video_off: false,
        start_audio_off: false,
      },
    };

    // Create the room
    const response = await fetch(DAILY_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${DAILY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roomConfig),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Daily.co API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to create Daily.co room', details: errorData },
        { status: response.status }
      );
    }

    const roomData = await response.json();

    return NextResponse.json({
      success: true,
      room: {
        id: roomData.id,
        name: roomData.name,
        url: roomData.url,
        joinUrl: roomData.url,
        expiresAt: roomData.config?.exp,
        topic: topic || 'AI Mock Interview',
        duration,
      },
    });
  } catch (error) {
    console.error('Error creating Daily.co room:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
