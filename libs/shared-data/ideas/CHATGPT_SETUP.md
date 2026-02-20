# ChatGPT Integration Setup Guide

This guide explains how to set up the ChatGPT integration for the AI Learning Assistant feature.

## Features

The AI Learning Assistant provides:

- 🤖 Real-time ChatGPT-powered responses
- 💬 Interactive chat interface on all pages
- 🎯 Frontend development focused assistance
- 💡 Suggested questions for new users
- 🌙 Dark/light mode support
- 📱 Mobile-responsive design

## Setup Instructions

### 1. Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the generated API key

### 2. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# ChatGPT API Configuration
OPENAI_API_KEY=<YOUR_OPENAI_API_KEY_HERE>

# Optional: Custom API endpoint (if using a proxy service)
# NEXT_PUBLIC_CHATGPT_API_URL=https://your-proxy-service.com/v1/chat/completions

# Optional: Custom model (default: gpt-3.5-turbo)
# NEXT_PUBLIC_CHATGPT_MODEL=gpt-4
```

### 3. Restart Development Server

After adding the environment variables, restart your development server:

```bash
npm run dev
# or
yarn dev
```

## How It Works

### Frontend Component

- **Location**: `src/components/ChatGPT.tsx`
- **Features**: Floating chat button, popup interface, message history
- **Styling**: TailwindCSS with dark/light mode support

### API Route

- **Location**: `src/app/api/chatgpt/route.ts`
- **Function**: Handles communication with OpenAI API
- **Security**: API key stored server-side only

### Configuration

- **Location**: `src/lib/chatgpt-config.ts`
- **Customization**: System prompts, error messages, suggested questions

## Customization Options

### System Prompt

Edit the system prompt in `src/lib/chatgpt-config.ts` to change the AI's behavior:

```typescript
SYSTEM_PROMPT: `You are an expert frontend development tutor...`;
```

### Suggested Questions

Modify the suggested questions for new users:

```typescript
SUGGESTED_QUESTIONS: [
  "What are the key differences between HTML4 and HTML5?",
  "How do I center a div both horizontally and vertically?",
  // Add your own questions here
];
```

### API Settings

Adjust model parameters:

```typescript
MODEL: 'gpt-4',           // Use GPT-4 instead of GPT-3.5
MAX_TOKENS: 1500,         // Increase response length
TEMPERATURE: 0.5,         // More focused responses
```

## Usage

1. **Access**: Click the floating chat icon (💬) on any page
2. **Ask Questions**: Type your frontend development questions
3. **Get Responses**: Receive AI-powered explanations and guidance
4. **Suggested Questions**: Click on suggested questions to get started quickly

## Troubleshooting

### API Key Issues

- Ensure `OPENAI_API_KEY` is set in `.env.local`
- Check that the API key is valid and has sufficient credits
- Verify the key has access to the specified model

### Rate Limiting

- OpenAI has rate limits for API calls
- Consider implementing caching for common questions
- Monitor your API usage in the OpenAI dashboard

### Network Issues

- Check your internet connection
- Verify the API endpoint is accessible
- Check browser console for error messages

## Security Considerations

- API keys are never exposed to the client
- All API calls go through your server
- Consider implementing user authentication for production use
- Monitor API usage to prevent abuse

## Production Deployment

For production deployment:

1. Set environment variables in your hosting platform
2. Consider implementing rate limiting
3. Add user authentication if needed
4. Monitor API costs and usage
5. Implement caching for better performance

## Support

If you encounter issues:

1. Check the browser console for errors
2. Verify your API key configuration
3. Test the API endpoint directly
4. Check OpenAI's service status

## Cost Considerations

- GPT-3.5-turbo: ~$0.002 per 1K tokens
- GPT-4: ~$0.03 per 1K tokens (input) / $0.06 per 1K tokens (output)
- Monitor usage in OpenAI dashboard
- Consider implementing usage limits for production
