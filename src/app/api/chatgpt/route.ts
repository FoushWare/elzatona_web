import { NextRequest, NextResponse } from 'next/server';
import { CHATGPT_CONFIG, ChatGPTMessage } from '@/lib/chatgpt-config';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Return a simulated response for development
      return NextResponse.json({
        id: 'simulated-response',
        choices: [{
          message: {
            content: `I understand you're asking about frontend development. This is a simulated response since the ChatGPT API key isn't configured yet. 

To enable real ChatGPT integration:
1. Get an API key from OpenAI (https://platform.openai.com/api-keys)
2. Add OPENAI_API_KEY to your .env.local file
3. Restart your development server

For now, I can help you with general frontend development concepts. What specific topic would you like to learn about?`,
            role: 'assistant'
          },
          finish_reason: 'stop'
        }],
        usage: {
          prompt_tokens: 0,
          completion_tokens: 0,
          total_tokens: 0
        }
      });
    }

    // Prepare messages for ChatGPT API
    const chatMessages: ChatGPTMessage[] = [
      { role: 'system', content: CHATGPT_CONFIG.SYSTEM_PROMPT },
      ...messages
    ];

    // Call OpenAI API
    const response = await fetch(CHATGPT_CONFIG.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: CHATGPT_CONFIG.MODEL,
        messages: chatMessages,
        max_tokens: CHATGPT_CONFIG.MAX_TOKENS,
        temperature: CHATGPT_CONFIG.TEMPERATURE,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 429) {
        return NextResponse.json(
          { error: CHATGPT_CONFIG.ERROR_MESSAGES.RATE_LIMIT },
          { status: 429 }
        );
      }
      
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key. Please check your configuration.' },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { error: errorData.error?.message || CHATGPT_CONFIG.ERROR_MESSAGES.API_ERROR },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('ChatGPT API error:', error);
    return NextResponse.json(
      { error: CHATGPT_CONFIG.ERROR_MESSAGES.NETWORK_ERROR },
      { status: 500 }
    );
  }
}
