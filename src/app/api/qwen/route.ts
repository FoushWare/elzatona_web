import { NextRequest, NextResponse } from 'next/server';

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
    const apiKey = process.env.QWEN_API_KEY;

    if (!apiKey) {
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

*Note: To enable real-time AI assistance, please configure your Qwen API key in .env.local and restart the server.*`,
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

    // Prepare messages for Qwen API (via OpenRouter)
    const chatMessages = [
      {
        role: 'system',
        content:
          'You are a helpful AI assistant specialized in frontend development. You help with HTML, CSS, JavaScript, React, and interview preparation. Provide clear, practical answers with code examples when appropriate.',
      },
      ...messages,
    ];

    // Call Qwen API via OpenRouter
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': 'http://localhost:3000', // Optional: for analytics
          'X-Title': 'Great Frontend Hub', // Optional: for analytics
        },
        body: JSON.stringify({
          model: 'qwen/qwen3-30b-a3b:free', // Free Qwen model
          messages: chatMessages,
          max_tokens: 1000,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Qwen API error:', {
        status: response.status,
        statusText: response.statusText,
        errorData,
      });

      // Return fallback response for any errors
      const userMessage = messages[messages.length - 1]?.content || '';

      return NextResponse.json({
        id: 'fallback-response',
        choices: [
          {
            message: {
              content: `I'm having trouble connecting to the AI service, but I can still help you with frontend development! Here's what I know about your question:

${getFallbackResponse(userMessage)}

*Note: This is a fallback response while the AI service is temporarily unavailable. Please check your Qwen API configuration or try again later.*`,
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
    console.error('Qwen API error:', error);
    return NextResponse.json(
      { error: 'Network error occurred' },
      { status: 500 }
    );
  }
}

function getFallbackResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('react')) {
    return `React is a JavaScript library for building user interfaces. Key concepts include:
• **Components** - Reusable UI pieces
• **JSX** - JavaScript syntax extension
• **State** - Component data that can change
• **Props** - Data passed between components
• **Hooks** - Functions that let you use state and lifecycle features

Would you like me to explain any specific React concept in detail?`;
  }

  if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
    return `JavaScript is a programming language for web development. Key topics include:
• **ES6+ Features** - Arrow functions, destructuring, modules
• **Async Programming** - Promises, async/await, callbacks
• **DOM Manipulation** - Selecting and modifying HTML elements
• **Event Handling** - Responding to user interactions
• **Closures** - Functions that remember their lexical scope

What specific JavaScript concept would you like to explore?`;
  }

  if (lowerMessage.includes('css')) {
    return `CSS (Cascading Style Sheets) is used to style web pages. Key areas include:
• **Layout** - Flexbox, Grid, positioning
• **Responsive Design** - Media queries, mobile-first approach
• **Animations** - Transitions, keyframes, transforms
• **Selectors** - Targeting specific elements
• **Box Model** - Margin, border, padding, content

Which CSS topic interests you most?`;
  }

  if (lowerMessage.includes('html')) {
    return `HTML (HyperText Markup Language) structures web content. Important concepts:
• **Semantic Elements** - header, nav, main, section, article
• **Forms** - input, textarea, select, validation
• **Accessibility** - ARIA attributes, alt text, keyboard navigation
• **SEO** - meta tags, structured data, semantic markup
• **Modern HTML5** - New elements and APIs

What HTML aspect would you like to learn about?`;
  }

  if (lowerMessage.includes('interview') || lowerMessage.includes('prep')) {
    return `Frontend interview preparation covers several areas:
• **Technical Questions** - JavaScript, React, CSS fundamentals
• **Coding Challenges** - Algorithm problems, DOM manipulation
• **System Design** - Architecture, scalability, performance
• **Behavioral Questions** - Problem-solving, teamwork, learning
• **Portfolio Review** - Projects, code quality, best practices

What type of interview preparation would you like to focus on?`;
  }

  return `I'd be happy to help you with frontend development! I can assist with:
• **HTML & Semantic Markup** - Best practices, accessibility, and modern standards
• **CSS & Layout** - Grid, Flexbox, animations, and responsive design
• **JavaScript** - ES6+ features, async programming, and DOM manipulation
• **React** - Hooks, components, state management, and performance
• **Performance** - Optimization techniques, lazy loading, and best practices
• **Interview Prep** - Common questions, coding challenges, and tips

What specific topic would you like to learn about? I can provide detailed explanations, code examples, and practical tips! 🚀`;
}
