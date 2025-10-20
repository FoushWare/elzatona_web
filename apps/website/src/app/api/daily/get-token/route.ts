import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { roomName, userName, isModerator = false } = await request.json();

    if (!roomName || !userName) {
      return NextResponse.json(
        { error: 'Room name and user name are required' },
        { status: 400 }
      );
    }

    const DAILY_API_KEY = process.env.DAILY_API_KEY;

    if (!DAILY_API_KEY) {
      return NextResponse.json(
        { error: 'Daily.co API key not configured' },
        { status: 500 }
      );
    }

    // Create meeting token
    const tokenConfig = {
      properties: {
        room_name: roomName,
        user_name: userName,
        is_owner: isModerator,
        exp: Math.round(Date.now() / 1000) + 60 * 60, // Token expires in 1 hour
      },
    };

    const response = await fetch('https://api.daily.co/v1/meeting-tokens', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${DAILY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tokenConfig),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Daily.co token API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to create meeting token', details: errorData },
        { status: response.status }
      );
    }

    const tokenData = await response.json();

    return NextResponse.json({
      success: true,
      token: tokenData.token,
      roomName,
      userName,
      expiresAt: tokenData.properties?.exp,
    });
  } catch (error) {
    console.error('Error creating Daily.co token:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
