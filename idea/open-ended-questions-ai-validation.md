# Open-Ended Questions with AI Validation

**Description**  
Add support for open-ended questions where users type their answers and AI validates them using free AI services.

**Details**

## Overview

This feature introduces a new question type called "open-ended" that allows users to provide free-form text answers instead of selecting from predefined options. The answers are validated using AI (Google Gemini free tier) to provide detailed feedback, scoring, and suggestions.

## Key Components

### 1. Question Schema Updates

- Added `'open-ended'` to question type enum
- New fields: `expectedAnswer`, `aiValidationPrompt`, `acceptPartialCredit`
- Updated both `UnifiedQuestion` and `BulkQuestionData` interfaces

### 2. AI Validation Service (`src/lib/ai-validation-service.ts`)

- Uses Google Gemini (free tier) for answer validation or other free AI services
- Provides 0-100% scoring with detailed feedback
- Includes fallback to keyword matching if AI fails
- Returns structured validation results with suggestions

### 3. API Endpoint (`src/app/api/questions/validate-answer/route.ts`)

- POST endpoint for AI validation requests
- Handles question ID, user answer, and validation settings
- Returns validation results with score and feedback

### 4. User Interface Components

#### OpenEndedQuestion Component (`src/components/OpenEndedQuestion.tsx`)

- Textarea for user input
- Loading states during AI validation
- Beautiful UI with score display and feedback
- Color-coded scoring (green: 80%+, yellow: 60-79%, red: <60%)
- Suggestions and detailed explanation display

#### Admin Interface Updates

- **QuestionEditModal**: Added AI validation settings section
- **MarkdownQuestionExtractor**: Support for importing open-ended questions
- Conditional UI based on question type selection

### 5. Learning Path Integration

- Updated learning path questions page to conditionally render open-ended questions
- Seamless integration with existing multiple-choice questions
- Proper state management for validation results

## Technical Implementation

### Question Type Detection

```typescript
type: 'single' | 'multiple' | 'text' | 'code' | 'open-ended';
```

### AI Validation Flow

1. User types answer in textarea
2. Answer sent to `/api/questions/validate-answer`
3. AI service validates against expected answer and custom prompt
4. Returns score, feedback, and suggestions
5. UI displays results with color-coded scoring

### Admin Configuration Options

- **Expected Answer**: Reference answer for AI validation
- **Custom AI Prompt**: Specific instructions for validation
- **Accept Partial Credit**: Whether to accept partially correct answers

## Usage Examples

### Creating Open-Ended Questions via Admin

1. Navigate to `/admin/content/questions`
2. Click "Edit" on any question
3. Select "Open-ended (AI Validated)" type
4. Configure AI validation settings
5. Save question

### Importing via Markdown

```markdown
###### 1. Explain the difference between `var`, `let`, and `const` in JavaScript.

<details><summary><b>Answer</b></summary>
<p>

#### Answer: Key Differences

**var:**

- Function-scoped or globally-scoped
- Hoisted and initialized with `undefined`
- Can be redeclared
- Can be reassigned

**let:**

- Block-scoped
- Hoisted but not initialized (temporal dead zone)
- Cannot be redeclared in same scope
- Can be reassigned

**const:**

- Block-scoped
- Hoisted but not initialized (temporal dead zone)
- Cannot be redeclared in same scope
- Cannot be reassigned (immutable binding)

</p>
</details>
```

### User Experience

1. User sees open-ended question with textarea
2. Types answer and clicks "🤖 Validate Answer"
3. AI processes answer and returns detailed feedback
4. Score displayed with color-coded badge
5. Suggestions and explanation shown below

## Configuration

### AI Service Setup

- Uses Google Gemini (free tier) or other free AI services
- API key required in environment variables
- Fallback to keyword matching if AI unavailable

### Validation Settings

- **Expected Answer**: Helps AI provide better validation
- **Custom Prompt**: Specific validation instructions
- **Partial Credit**: Accepts answers that are partially correct

## Benefits

1. **Flexible Assessment**: Allows for more nuanced evaluation than multiple choice
2. **Detailed Feedback**: AI provides specific suggestions for improvement
3. **Scalable**: Works with any subject matter without predefined answers
4. **Cost-Effective**: Uses free AI tier for validation (Google Gemini, DeepSeek, Qwen, Groq, etc.)
5. **User-Friendly**: Beautiful UI with clear scoring and feedback

## Future Enhancements

- Support for multiple AI providers (OpenAI, Claude, etc.)
- Custom scoring rubrics
- Batch validation for multiple answers
- Integration with learning analytics
- Export validation results for analysis

**E2E Testing**

1. **Admin Creation**:
   - Navigate to `/admin/content/questions`
   - Create new open-ended question
   - Configure AI validation settings
   - Save and verify question appears in list

2. **Markdown Import**:
   - Go to admin questions page
   - Click "Extract from Markdown"
   - Select "Open-ended (AI Validated)" type
   - Paste sample markdown with open-ended question
   - Import and verify questions created

3. **User Experience**:
   - Navigate to learning path questions page
   - Find open-ended question
   - Type answer and validate
   - Verify AI feedback and scoring
   - Check explanation and suggestions display

4. **AI Validation**:
   - Test with correct answers (should score 80%+)
   - Test with partially correct answers (should score 60-79%)
   - Test with incorrect answers (should score <60%)
   - Verify fallback to keyword matching if AI fails

**Status**  
Implemented ✅

**Files Modified**:

- `src/lib/unified-question-schema.ts` - Schema updates
- `src/lib/ai-validation-service.ts` - AI validation service
- `src/app/api/questions/validate-answer/route.ts` - API endpoint
- `src/components/OpenEndedQuestion.tsx` - User interface component
- `src/components/QuestionEditModal.tsx` - Admin interface updates
- `src/components/MarkdownQuestionExtractor.tsx` - Import support
- `src/app/learning-paths/[id]/questions/page.tsx` - Learning path integration

**Dependencies**:

- Google Gemini API (free tier) or other free AI services
- Next.js API routes
- React state management
- Tailwind CSS for styling
