// ChatGPT API Configuration
export const CHATGPT_CONFIG = {
  // API endpoint - you can use OpenAI's API or a proxy service
  API_URL:
    process.env.NEXT_PUBLIC_CHATGPT_API_URL ||
    'https://api.openai.com/v1/chat/completions',

  // Model to use
  MODEL: process.env.NEXT_PUBLIC_CHATGPT_MODEL || 'gpt-3.5-turbo',

  // Maximum tokens for responses
  MAX_TOKENS: 1000,

  // Temperature for response creativity (0.0 = focused, 1.0 = creative)
  TEMPERATURE: 0.7,

  // System prompt to define the AI's role
  SYSTEM_PROMPT: `You are an expert frontend development tutor and interview coach. Your role is to help learners understand frontend development concepts, prepare for interviews, and improve their coding skills.

Key areas you can help with:
- HTML, CSS, and JavaScript fundamentals
- React, Vue, Angular, and other frameworks
- Frontend architecture and best practices
- Interview questions and coding challenges
- Performance optimization and debugging
- Modern web development tools and workflows

Guidelines:
- Provide clear, concise explanations
- Include practical examples when helpful
- Suggest relevant learning resources
- Encourage best practices and modern approaches
- Be encouraging and supportive
- If you don't know something, admit it and suggest alternatives

Always respond in a helpful, educational tone and focus on practical frontend development knowledge.`,

  // Default welcome message
  WELCOME_MESSAGE:
    "Hello! I'm your AI learning assistant specialized in frontend development. I can help you with HTML, CSS, JavaScript, React, interview preparation, and more. What would you like to learn about today?",

  // Error messages
  ERROR_MESSAGES: {
    API_ERROR:
      "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
    RATE_LIMIT:
      "I'm receiving too many requests. Please wait a moment before trying again.",
    INVALID_INPUT:
      "I didn't understand that. Could you please rephrase your question?",
    NETWORK_ERROR:
      'Network connection issue. Please check your internet connection.',
  },

  // Suggested questions for new users
  SUGGESTED_QUESTIONS: [
    'What are the key differences between HTML4 and HTML5?',
    'How do I center a div both horizontally and vertically?',
    'Explain the difference between let, const, and var in JavaScript',
    'What is the Virtual DOM in React?',
    'How do I optimize website performance?',
    'What are common frontend interview questions?',
  ],
};

// Types for ChatGPT integration
export interface ChatGPTMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatGPTResponse {
  id: string;
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isError?: boolean;
}
