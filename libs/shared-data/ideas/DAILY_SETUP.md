# Daily.co AI Mock Interview Setup

This guide will help you set up the AI Mock Interview feature using Daily.co.

## 🚀 Quick Start

### 1. Get Daily.co API Key

1. Go to [Daily.co Dashboard](https://dashboard.daily.co/)
2. Sign up for a free account (no credit card required)
3. Navigate to **Developers** → **API Keys**
4. Create a new API key
5. Copy the API key

### 2. Configure Environment Variables

Add your Daily.co API key to your environment file:

```bash
# .env.local
DAILY_API_KEY=your_daily_api_key_here
```

### 3. Test the Integration

1. Start your development server: `npm run dev`
2. Go to `/schedule-interview`
3. Fill in your details and click "Start AI Mock Interview"
4. Allow camera and microphone access when prompted

## 🎯 Features

### ✅ What's Included

- **Live Video Interviews**: Real-time video calls with AI interviewer
- **Voice Interaction**: AI speaks questions and listens to answers
- **Real-time Feedback**: Instant evaluation and follow-up questions
- **Adaptive Questioning**: AI adjusts difficulty based on responses
- **Professional Interface**: Clean, modern video call interface

### 🤖 AI Interviewer Capabilities

- **Speech-to-Text**: Converts your spoken answers to text
- **Natural Language Processing**: Evaluates answer quality
- **Follow-up Questions**: Asks relevant follow-ups based on your responses
- **Real-time Feedback**: Provides immediate feedback on answers
- **Multiple Topics**: Supports various interview topics (React, JavaScript, CSS, etc.)

## 🛠️ Technical Details

### Architecture

```
User Browser → Daily.co Room → AI Agent
     ↓              ↓            ↓
Video/Audio    Video/Audio   Voice Processing
     ↓              ↓            ↓
Daily.co SDK → Room Management → AI Evaluation
```

### Components

- **`DailyVideoCall.tsx`**: Main video call interface
- **`AIInterviewerAgent.tsx`**: AI agent that joins the room
- **`/api/daily/create-room`**: Creates Daily.co rooms
- **`/api/daily/get-token`**: Generates meeting tokens

### API Endpoints

- `POST /api/daily/create-room`: Creates a new interview room
- `POST /api/daily/get-token`: Generates meeting tokens for participants

## 💰 Pricing

### Free Tier

- **10,000 participant-minutes/month** (free)
- Perfect for testing and small-scale usage
- No credit card required

### Paid Plans

- Usage-based pricing after free tier
- Additional features like recording, transcription
- Enterprise features and support

## 🔧 Customization

### Adding New Interview Topics

Edit `AIInterviewerAgent.tsx` and add questions to the `interviewQuestions` array:

```typescript
const interviewQuestions: InterviewQuestion[] = [
  {
    id: "your-topic-1",
    question: "Your question here?",
    category: "Your Category",
    difficulty: "intermediate",
    expectedKeywords: ["keyword1", "keyword2"],
    followUpQuestions: ["Follow-up question?"],
  },
];
```

### Customizing AI Behavior

Modify the `evaluateAnswer` function in `AIInterviewerAgent.tsx` to change how the AI evaluates responses.

### Styling

The video call interface uses Tailwind CSS. Customize colors and layout in `DailyVideoCall.tsx`.

## 🐛 Troubleshooting

### Common Issues

1. **"Daily.co API key not configured"**
   - Make sure `DAILY_API_KEY` is set in your environment variables
   - Restart your development server after adding the key

2. **"Failed to create interview room"**
   - Check your Daily.co API key is valid
   - Ensure you have sufficient quota remaining

3. **Camera/Microphone not working**
   - Check browser permissions
   - Try refreshing the page
   - Use HTTPS in production

4. **AI Agent not joining**
   - Check browser console for errors
   - Ensure Daily.co room was created successfully
   - Verify AI agent component is properly initialized

### Debug Mode

Enable debug logging by adding this to your environment:

```bash
NEXT_PUBLIC_DEBUG_DAILY=true
```

## 🚀 Production Deployment

### Environment Variables

Make sure to set these in your production environment:

```bash
DAILY_API_KEY=your_production_api_key
```

### HTTPS Required

Daily.co requires HTTPS in production. Make sure your deployment supports HTTPS.

### Domain Configuration

Configure your domain in Daily.co dashboard under **Settings** → **Domains**.

## 📚 Resources

- [Daily.co Documentation](https://docs.daily.co/)
- [Daily.co API Reference](https://docs.daily.co/reference)
- [Daily.co JavaScript SDK](https://docs.daily.co/reference/daily-js)
- [Daily.co Pricing](https://www.daily.co/pricing)

## 🤝 Support

If you encounter issues:

1. Check the [Daily.co Status Page](https://status.daily.co/)
2. Review the [Daily.co Documentation](https://docs.daily.co/)
3. Check browser console for error messages
4. Verify your API key and quota

---

**Happy Interviewing! 🎉**
