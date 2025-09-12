# 🆓 Free AI Services Setup Guide

## 🎯 Available Options

### **1. DeepSeek API** ⭐ **Recommended**

- **Free Credits**: $5 free credits (very generous)
- **Fast & Reliable**: Excellent performance
- **Easy Setup**: Simple API key
- **No Credit Card**: Required for signup

### **2. Qwen AI (via OpenRouter)**

- **Completely Free**: No credit card required
- **Multiple Models**: Various Qwen models available
- **OpenRouter Platform**: Reliable service
- **Good Performance**: Fast responses

### **3. Groq AI** (Already implemented)

- **100% Free**: Generous daily limits
- **Super Fast**: Up to 10x faster than ChatGPT
- **No Credit Card**: Required

---

## 🚀 DeepSeek Setup (Recommended)

### **Step 1: Get Your Free API Key**

1. Go to [https://platform.deepseek.com/](https://platform.deepseek.com/)
2. Sign up with your email
3. Go to "API Keys" section
4. Click "Create API Key"
5. Copy your API key

### **Step 2: Add to Environment**

Add this line to your `.env.local` file:

```bash
DEEPSEEK_API_KEY=your-deepseek-api-key-here
```

### **Step 3: Update ChatGPT Component**

Change the API endpoint in `src/components/ChatGPT.tsx`:

```typescript
// Change from:
const response = await fetch('/api/groq', {

// To:
const response = await fetch('/api/deepseek', {
```

### **Step 4: Restart Server**

```bash
npm run dev
```

---

## 🌟 Qwen AI Setup (Alternative)

### **Step 1: Get Your Free API Key**

1. Go to [https://openrouter.ai/](https://openrouter.ai/)
2. Sign up with your email (no credit card required)
3. Go to "Keys" section
4. Click "Create Key"
5. Copy your API key

### **Step 2: Add to Environment**

Add this line to your `.env.local` file:

```bash
QWEN_API_KEY=your-qwen-api-key-here
```

### **Step 3: Update ChatGPT Component**

Change the API endpoint in `src/components/ChatGPT.tsx`:

```typescript
// Change from:
const response = await fetch('/api/groq', {

// To:
const response = await fetch('/api/qwen', {
```

### **Step 4: Restart Server**

```bash
npm run dev
```

---

## 📊 Comparison Table

| Service      | Free Credits | Speed      | Setup | Reliability |
| ------------ | ------------ | ---------- | ----- | ----------- |
| **DeepSeek** | $5 credits   | ⭐⭐⭐⭐⭐ | Easy  | ⭐⭐⭐⭐⭐  |
| **Qwen AI**  | Unlimited\*  | ⭐⭐⭐⭐   | Easy  | ⭐⭐⭐⭐    |
| **Groq**     | 14,400/day   | ⭐⭐⭐⭐⭐ | Easy  | ⭐⭐⭐⭐    |

\*Subject to rate limits

---

## 🔧 Quick Switch Between Services

You can easily switch between services by changing one line in `src/components/ChatGPT.tsx`:

```typescript
// DeepSeek (Recommended)
const response = await fetch('/api/deepseek', {

// Qwen AI
const response = await fetch('/api/qwen', {

// Groq (Current)
const response = await fetch('/api/groq', {
```

---

## 🎯 Recommendations

### **For Best Performance**: DeepSeek

- Fastest responses
- Most reliable
- $5 free credits go a long way

### **For Unlimited Usage**: Qwen AI

- Completely free
- Good performance
- No credit card required

### **For Speed**: Groq

- Extremely fast responses
- Good free tier
- Easy setup

---

## 🆘 Troubleshooting

### **"AI service not configured"**

- Check your API key in `.env.local`
- Make sure you restarted the server
- Verify the API key is correct

### **Rate Limited**

- DeepSeek: Check your credit balance
- Qwen: Wait a few minutes and try again
- Groq: Check daily limit usage

### **Slow Responses**

- DeepSeek: Usually very fast
- Qwen: May have delays during peak times
- Groq: Usually fastest

---

## 🎉 Benefits Over ChatGPT

- ✅ **No Monthly Fees** (completely free)
- ✅ **No Quota Issues** (generous limits)
- ✅ **Fast Responses** (often faster than ChatGPT)
- ✅ **Easy Setup** (just API key)
- ✅ **Reliable Service** (stable uptime)

---

**Ready to get started?** Choose your preferred service and follow the setup steps! 🚀
