# 🎙️ Human-Like TTS Setup Guide

This guide shows you how to set up human-like text-to-speech using LLM APIs instead of robotic browser TTS.

## 🚀 Quick Setup (OpenAI TTS - Recommended)

### 1. Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the API key (starts with `sk-`)

### 2. Add API Key to Environment
Create a `.env.local` file in your project root:

```bash
# OpenAI API Key for Human-Like Text-to-Speech
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 3. Restart Development Server
```bash
npm run dev
```

## 🎯 Available TTS APIs

### 1. **OpenAI TTS** (Recommended)
- **Cost**: ~$0.015 per 1K characters
- **Quality**: Very human-like, natural intonation
- **Voices**: `alloy`, `echo`, `fable`, `onyx`, `nova`, `shimmer`
- **Best Voice**: `nova` (bright, energetic, most natural)

### 2. **ElevenLabs** (Most Human-Like)
- **Cost**: ~$0.18 per 1K characters
- **Quality**: Extremely human-like, emotional expression
- **Voices**: 1000+ voices including celebrity voices
- **Setup**: Add `ELEVENLABS_API_KEY` to `.env.local`

### 3. **Azure Cognitive Services**
- **Cost**: ~$4 per 1M characters
- **Quality**: High-quality neural voices
- **Voices**: Professional neural voices
- **Setup**: Add `AZURE_SPEECH_KEY` and `AZURE_SPEECH_REGION`

### 4. **Google Cloud TTS**
- **Cost**: ~$4 per 1M characters
- **Quality**: Very natural WaveNet voices
- **Voices**: Neural2 and WaveNet voices
- **Setup**: Add `GOOGLE_CLOUD_TTS_KEY`

## 🔧 How It Works

### Automatic Fallback System:
1. **OpenAI TTS** (if API key available) - Most human-like
2. **Browser TTS** (fallback) - Uses our enhanced voice selection
3. **Error Handling** - Graceful degradation

### Voice Selection Priority:
1. **Neural Voices** (100+ points) - Most human-like
2. **Google Cloud Voices** (90+ points) - Premium quality
3. **Microsoft Neural** (75-80+ points) - AI-powered
4. **Apple Voices** (30-40+ points) - Natural macOS voices

## 💡 Usage Examples

### In Learning Paths Questions:
- Questions and answers automatically use the best available TTS
- Console shows which voice is being used
- Automatic fallback if API fails

### In EnhancedTTS Component:
```tsx
<EnhancedTTS 
  text="Your text here" 
  autoPlay={true}
  onStart={() => console.log('Started speaking')}
  onEnd={() => console.log('Finished speaking')}
/>
```

## 🎵 Voice Comparison

| Voice | Type | Quality | Naturalness | Cost |
|-------|------|---------|-------------|------|
| OpenAI Nova | AI | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | $0.015/1K |
| ElevenLabs | AI | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | $0.18/1K |
| Browser Neural | Local | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Free |
| Browser Standard | Local | ⭐⭐ | ⭐⭐ | Free |

## 🔍 Testing Your Setup

1. **Check Console**: Look for "Using OpenAI TTS with voice: nova"
2. **Listen to Quality**: Compare with browser TTS
3. **Check Network**: Verify API calls in browser dev tools

## 🛠️ Troubleshooting

### API Key Issues:
- Make sure `.env.local` is in project root
- Restart development server after adding key
- Check API key format (starts with `sk-`)

### Fallback Behavior:
- If OpenAI fails, automatically uses browser TTS
- Check console for error messages
- Verify internet connection

### Cost Management:
- OpenAI TTS is very affordable (~$0.015 per 1K characters)
- Monitor usage in OpenAI dashboard
- Consider rate limiting for production

## 🚀 Production Deployment

### Vercel:
```bash
# Add environment variable in Vercel dashboard
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### Other Platforms:
- Add `OPENAI_API_KEY` to your environment variables
- Ensure the key is accessible to your API routes

## 📊 Performance Tips

1. **Use HD Model**: `tts-1-hd` for best quality
2. **Optimize Text**: Remove unnecessary characters
3. **Cache Audio**: Consider caching for repeated text
4. **Rate Limiting**: Implement rate limiting for production

## 🎉 Expected Results

With OpenAI TTS enabled, you'll experience:
- **Much more natural speech** with human-like intonation
- **Better pronunciation** of technical terms
- **Emotional expression** in the voice
- **Consistent quality** across all devices
- **Professional sound** suitable for learning content

The difference is night and day compared to robotic browser TTS!
