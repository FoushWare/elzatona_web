import { NextRequest, NextResponse } from 'next/server';
import { CHATGPT_CONFIG, ChatGPTMessage } from '@/lib/chatgpt-config';
import { getFallbackResponse } from '@/lib/chatgpt-fallback';

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

    // Debug logging (remove in production)
    console.log('API Key check:', {
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey ? apiKey.length : 0,
      envVars: Object.keys(process.env).filter(key => key.includes('OPENAI')),
    });

    if (!apiKey) {
      console.error('OpenAI API key not found in environment variables');
      return NextResponse.json({
        id: 'fallback-response',
        choices: [
          {
            message: {
              content: `I'm currently running in fallback mode since the AI service isn't configured. However, I can still help you with frontend development!

I have knowledge about:
• **HTML & Semantic Markup** - Best practices, accessibility, and modern standards
• **CSS & Layout** - Grid, Flexbox, animations, and responsive design  
• **JavaScript** - ES6+ features, async programming, and DOM manipulation
• **React** - Hooks, components, state management, and performance
• **Performance** - Optimization techniques, lazy loading, and best practices
• **Interview Prep** - Common questions, coding challenges, and tips

What specific topic would you like to learn about? I'll provide helpful information and code examples! 🚀

*Note: To enable real-time AI assistance, please configure your OpenAI API key in .env.local and restart the server.*`,
              role: 'assistant',
            },
            finish_reason: 'stop',
          },
        ],
        usage: {
          prompt_tokens: 0,
          completion_tokens: 0,
          total_tokens: 0,
        },
      });
    }

    // Prepare messages for ChatGPT API
    const chatMessages: ChatGPTMessage[] = [
      { role: 'system', content: CHATGPT_CONFIG.SYSTEM_PROMPT },
      ...messages,
    ];

    // Call OpenAI API
    const response = await fetch(CHATGPT_CONFIG.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
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

      console.error('OpenAI API error:', {
        status: response.status,
        statusText: response.statusText,
        errorData,
        headers: Object.fromEntries(response.headers.entries()),
      });

      if (response.status === 429) {
        // Use fallback response instead of error when rate limited
        const userMessage = messages[messages.length - 1]?.content || '';
        const fallbackResponse = getFallbackResponse(userMessage);

        return NextResponse.json({
          id: 'fallback-response',
          choices: [
            {
              message: {
                content: `I'm currently experiencing high demand, but I can still help you with frontend development! Here's what I know about your question:

${fallbackResponse}

*Note: This is a fallback response while the AI service is temporarily unavailable. For real-time AI assistance, please check your OpenAI API quota or try again later.*`,
                role: 'assistant',
              },
              finish_reason: 'stop',
            },
          ],
          usage: {
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0,
          },
        });
      }

      if (response.status === 401) {
        // Use fallback response for authentication errors
        const userMessage = messages[messages.length - 1]?.content || '';
        const fallbackResponse = getFallbackResponse(userMessage);

        return NextResponse.json({
          id: 'fallback-response',
          choices: [
            {
              message: {
                content: `I'm having trouble connecting to the AI service, but I can still help you with frontend development! Here's what I know about your question:

${fallbackResponse}

*Note: This is a fallback response while the AI service is temporarily unavailable. Please check your OpenAI API configuration or try again later.*`,
                role: 'assistant',
              },
              finish_reason: 'stop',
            },
          ],
          usage: {
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0,
          },
        });
      }

      if (response.status === 400) {
        // Use fallback response for bad requests
        const userMessage = messages[messages.length - 1]?.content || '';
        const fallbackResponse = getFallbackResponse(userMessage);

        return NextResponse.json({
          id: 'fallback-response',
          choices: [
            {
              message: {
                content: `I'm experiencing some technical difficulties, but I can still help you with frontend development! Here's what I know about your question:

${fallbackResponse}

*Note: This is a fallback response while the AI service is temporarily unavailable. Please try again later.*`,
                role: 'assistant',
              },
              finish_reason: 'stop',
            },
          ],
          usage: {
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0,
          },
        });
      }

      // For any other errors, use fallback response
      const userMessage = messages[messages.length - 1]?.content || '';
      const fallbackResponse = getFallbackResponse(userMessage);

      return NextResponse.json({
        id: 'fallback-response',
        choices: [
          {
            message: {
              content: `I'm currently experiencing technical difficulties, but I can still help you with frontend development! Here's what I know about your question:

${fallbackResponse}

*Note: This is a fallback response while the AI service is temporarily unavailable. Please try again later.*`,
              role: 'assistant',
            },
            finish_reason: 'stop',
          },
        ],
        usage: {
          prompt_tokens: 0,
          completion_tokens: 0,
          total_tokens: 0,
        },
      });
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
