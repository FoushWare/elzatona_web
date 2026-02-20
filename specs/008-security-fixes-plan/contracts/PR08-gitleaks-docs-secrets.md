# PR 8: Replace Hardcoded Secrets in Documentation

**Branch**: `fix/gitleaks-docs-secrets`
**Priority**: 🟢 LOW (secrets are in docs, not runtime code)
**Gitleaks Rules**: generic-api-key, google-api-key, supabase-key

## Instructions

For each file below, find the hardcoded secret value and replace it with a placeholder.

### Pattern

```markdown
<!-- BEFORE: -->

OPENAI_API_KEY=<EXAMPLE_SECRET_VALUE>

<!-- AFTER: -->

OPENAI_API_KEY=<YOUR_OPENAI_API_KEY_HERE>
```

## Files to Fix

### 1. CHATGPT_SETUP.md (Line 30)

Replace API key with `<YOUR_OPENAI_API_KEY_HERE>`

### 2. CHATGPT_COMPLETE_SETUP.md (Lines 33, 212)

Replace API keys with `<YOUR_OPENAI_API_KEY_HERE>`

### 3. CHATGPT_SETUP_SUMMARY.md (Line 42)

Replace API key with `<YOUR_OPENAI_API_KEY_HERE>`

### 4. FIREBASE_SETUP.md (Lines 72, 80)

Replace Firebase API key with `<YOUR_FIREBASE_API_KEY_HERE>`

### 5. FIREBASE_PROGRESS_SETUP.md (Lines 68-69)

Replace API key with `<YOUR_FIREBASE_API_KEY_HERE>`

### 6. FIREBASE_QUESTIONS_SETUP.md (Lines 107-108)

Replace API key with `<YOUR_FIREBASE_API_KEY_HERE>`

### 7. DAILY_SETUP.md (Lines 21, 149)

Replace API keys with `<YOUR_API_KEY_HERE>`

### 8. GROQ_SETUP.md (Line 21)

Replace API key with `<YOUR_GROQ_API_KEY_HERE>`

### 9. FREE_AI_SETUP.md (Lines 36, 68)

Replace API keys with `<YOUR_API_KEY_HERE>`

### 10. HUMAN_TTS_SETUP.md (Lines 18, 119)

Replace API keys with `<YOUR_TTS_API_KEY_HERE>`

### 11. DEVELOPMENT_SETUP.md (Lines 26-27)

Replace API key with `<YOUR_API_KEY_HERE>`

### 12. ISSUES_RESOLUTION_REPORT.md (Lines 140-141)

Replace API key with `<YOUR_API_KEY_HERE>`

### 13. References/debugging-web-scrapping.md (Line 6)

Replace API key with `<YOUR_API_KEY_HERE>`

### 14. QuestionsBank/security/questions.md (Lines 175, 455)

Replace API key and Supabase key with `<YOUR_API_KEY_HERE>` and `<YOUR_SUPABASE_KEY_HERE>`

### 15. QuestionsBank/english-learning/questions.md (Line 170)

Replace Supabase key with `<YOUR_SUPABASE_KEY_HERE>`

## Also: Update .gitleaks.toml

Add these paths to the allowlist to suppress historical alerts:

```toml
[allowlist]
paths = [
  '''CHATGPT_SETUP\.md''',
  '''CHATGPT_COMPLETE_SETUP\.md''',
  '''CHATGPT_SETUP_SUMMARY\.md''',
  '''FIREBASE_SETUP\.md''',
  '''FIREBASE_PROGRESS_SETUP\.md''',
  '''FIREBASE_QUESTIONS_SETUP\.md''',
  '''DAILY_SETUP\.md''',
  '''GROQ_SETUP\.md''',
  '''FREE_AI_SETUP\.md''',
  '''HUMAN_TTS_SETUP\.md''',
  '''DEVELOPMENT_SETUP\.md''',
  '''ISSUES_RESOLUTION_REPORT\.md''',
  '''References/.*\.md''',
  '''QuestionsBank/.*\.md''',
]
```

## Commit

```bash
git commit -m "fix(security): replace hardcoded secrets in documentation with placeholders"
```
