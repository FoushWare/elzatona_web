# Bulk Question Import Enhancement

## 🎯 **Request Summary**

The user requested to enhance the bulk question addition functionality to allow adding questions as an array of objects instead of one by one. This has been implemented with improved UI and validation.

## 🚀 **Enhancements Made**

### **1. BulkQuestionUploader Component**

- ✅ **Added Input Mode Toggle**: Switch between "Form Input" and "JSON Array" modes
- ✅ **JSON Textarea Input**: Direct paste of question arrays
- ✅ **Smart Parsing**: Handles both array format and object with "questions" property
- ✅ **Validation**: Comprehensive validation with detailed error messages
- ✅ **Generate JSON**: Convert form data to JSON format
- ✅ **Template Download**: Download JSON template for reference

### **2. UnifiedQuestionManager Component**

- ✅ **Enhanced Bulk Import**: Added JSON textarea input option
- ✅ **Input Method Toggle**: Switch between "Upload File" and "Paste JSON"
- ✅ **Improved UI**: Better organization and user experience
- ✅ **Error Handling**: Detailed error messages for invalid JSON

## 📋 **New Features**

### **Input Modes Available:**

#### **1. Form Input Mode (Existing)**

- Traditional form-based question creation
- One question at a time with visual form fields
- Add/remove questions and options dynamically

#### **2. JSON Array Mode (New)**

- Direct JSON textarea input
- Paste array of question objects
- Bulk validation and parsing
- Generate JSON from form data

### **Supported JSON Formats:**

#### **Array Format:**

```json
[
  {
    "title": "What is React?",
    "content": "React is a JavaScript library for building user interfaces.",
    "type": "single",
    "difficulty": "easy",
    "options": [
      { "id": "a", "text": "A JavaScript library", "isCorrect": true },
      { "id": "b", "text": "A CSS framework", "isCorrect": false },
      { "id": "c", "text": "A database", "isCorrect": false },
      { "id": "d", "text": "A server", "isCorrect": false }
    ],
    "correctAnswers": ["a"],
    "explanation": "React is indeed a JavaScript library for building user interfaces.",
    "category": "Frontend",
    "learningPath": "react-mastery",
    "tags": ["react", "javascript"],
    "points": 1
  }
]
```

#### **Object with Questions Property:**

```json
{
  "questions": [
    {
      "title": "Question 1",
      "content": "Question content...",
      "type": "single",
      "difficulty": "easy",
      "options": [...],
      "correctAnswers": ["a"],
      "explanation": "Explanation..."
    }
  ]
}
```

## 🔧 **Technical Implementation**

### **Enhanced BulkQuestionUploader:**

#### **New State Variables:**

```typescript
const [jsonInput, setJsonInput] = useState('');
const [inputMode, setInputMode] = useState<'form' | 'json'>('form');
```

#### **JSON Parsing Function:**

```typescript
const parseJsonInput = () => {
  try {
    const parsed = JSON.parse(jsonInput);

    // Handle both array format and object with questions property
    let questionsArray: BulkQuestionData[];
    if (Array.isArray(parsed)) {
      questionsArray = parsed;
    } else if (parsed.questions && Array.isArray(parsed.questions)) {
      questionsArray = parsed.questions;
    } else {
      throw new Error(
        'Invalid format. Expected an array of questions or an object with a "questions" property.'
      );
    }

    // Validate each question
    const validatedQuestions = questionsArray.map((q, index) => {
      // Validation logic...
      return {
        title: q.title,
        content: q.content,
        type: q.type || 'single',
        difficulty: q.difficulty || 'easy',
        options: q.options.map((opt, optIndex) => ({
          id: opt.id || String.fromCharCode(97 + optIndex), // a, b, c, d...
          text: opt.text || '',
          isCorrect: opt.isCorrect || false,
        })),
        correctAnswers:
          q.correctAnswers ||
          q.options.filter(opt => opt.isCorrect).map(opt => opt.id),
        explanation: q.explanation || '',
        category: q.category || sectionName,
        learningPath: q.learningPath || sectionId,
        tags: q.tags || [],
        points: q.points || 1,
      };
    });

    setQuestions(validatedQuestions);
    setError(null);
    setSuccess(
      `Successfully parsed ${validatedQuestions.length} questions from JSON!`
    );
  } catch (error) {
    setError(
      `JSON parsing error: ${error instanceof Error ? error.message : 'Invalid JSON format'}`
    );
    setSuccess(null);
  }
};
```

#### **JSON Generation Function:**

```typescript
const generateJsonFromQuestions = () => {
  const jsonData = questions.map(q => ({
    title: q.title,
    content: q.content,
    type: q.type,
    difficulty: q.difficulty,
    options: q.options,
    correctAnswers: q.correctAnswers,
    explanation: q.explanation,
    category: q.category || sectionName,
    learningPath: q.learningPath || sectionId,
    tags: q.tags || [],
    points: q.points || 1,
  }));

  setJsonInput(JSON.stringify(jsonData, null, 2));
};
```

### **Enhanced UnifiedQuestionManager:**

#### **New State Variables:**

```typescript
const [bulkJsonInput, setBulkJsonInput] = useState('');
const [bulkInputMode, setBulkInputMode] = useState<'file' | 'json'>('file');
```

#### **JSON Bulk Import Function:**

```typescript
const handleBulkJsonImport = async () => {
  try {
    const parsed = JSON.parse(bulkJsonInput);

    // Handle both array format and object with questions property
    let questionsData: BulkQuestionData[];
    if (Array.isArray(parsed)) {
      questionsData = parsed;
    } else if (parsed.questions && Array.isArray(parsed.questions)) {
      questionsData = parsed.questions;
    } else {
      alert(
        'Invalid format. Expected an array of questions or an object with a "questions" property.'
      );
      return;
    }

    const results = await bulkImportQuestions(questionsData);
    alert(
      `Import completed: ${results.success} successful, ${results.failed} failed`
    );

    if (results.errors.length > 0) {
      console.error('Import errors:', results.errors);
    }

    // Clear the input
    setBulkJsonInput('');
  } catch (error) {
    alert(
      `JSON parsing error: ${error instanceof Error ? error.message : 'Invalid JSON format'}`
    );
    console.error('Import error:', error);
  }
};
```

## 🎨 **UI Improvements**

### **Input Mode Toggle:**

- Clean toggle between "Form Input" and "JSON Array" modes
- Visual feedback for active mode
- Smooth transitions between modes

### **JSON Textarea:**

- Large textarea (h-64) for comfortable editing
- Monospace font for better JSON readability
- Helpful placeholder with example format
- Syntax highlighting through proper formatting

### **Action Buttons:**

- "Parse JSON" button with validation
- "Generate from Form" button to convert form data
- "Download Template" button for reference
- "Clear" button to reset input

### **Error Handling:**

- Detailed error messages for validation failures
- Success messages for successful parsing
- Clear indication of parsing results

## 📊 **Validation Features**

### **Question Validation:**

- ✅ **Required Fields**: title, content, options
- ✅ **Options Validation**: At least one correct answer required
- ✅ **Type Validation**: Valid question types (single, multiple, text, code)
- ✅ **Difficulty Validation**: Valid difficulty levels (easy, medium, hard)

### **Option Validation:**

- ✅ **ID Generation**: Auto-generate option IDs if missing (a, b, c, d...)
- ✅ **Text Validation**: Ensure option text is provided
- ✅ **Correct Answer**: At least one option must be marked as correct

### **Data Enhancement:**

- ✅ **Default Values**: Provide sensible defaults for missing fields
- ✅ **Category Assignment**: Auto-assign section name as category
- ✅ **Learning Path**: Auto-assign section ID as learning path
- ✅ **Points**: Default to 1 point if not specified

## 🚀 **Usage Examples**

### **1. Using BulkQuestionUploader:**

#### **Step 1: Access Bulk Upload**

1. Go to `/admin/sections`
2. Select a section
3. Click "Bulk Add Questions"

#### **Step 2: Choose Input Mode**

1. Toggle to "JSON Array" mode
2. Paste your questions array
3. Click "Parse JSON" to validate
4. Click "Add Questions" to submit

### **2. Using UnifiedQuestionManager:**

#### **Step 1: Access Bulk Import**

1. Go to `/admin/questions/unified`
2. Click "Bulk Import"

#### **Step 2: Choose Import Method**

1. Toggle to "Paste JSON" mode
2. Paste your questions array
3. Click "Import Questions"

## 📝 **Question Schema**

### **Required Fields:**

```typescript
{
  title: string; // Question title
  content: string; // Question content/text
  options: Array<{
    // Answer options
    id: string; // Option ID (a, b, c, d...)
    text: string; // Option text
    isCorrect: boolean; // Whether this option is correct
  }>;
}
```

### **Optional Fields:**

```typescript
{
  type?: 'single' | 'multiple' | 'text' | 'code';  // Question type
  difficulty?: 'easy' | 'medium' | 'hard';         // Difficulty level
  correctAnswers?: string[];                       // Array of correct option IDs
  explanation?: string;                            // Answer explanation
  category?: string;                               // Question category
  learningPath?: string;                           // Learning path assignment
  tags?: string[];                                // Question tags
  points?: number;                                // Points for correct answer
  audioQuestion?: string;                         // Audio file URL for question
  audioAnswer?: string;                           // Audio file URL for answer
}
```

## ✅ **Benefits**

### **For Users:**

- ✅ **Faster Input**: Paste multiple questions at once
- ✅ **Flexible Format**: Support for different JSON structures
- ✅ **Better Validation**: Clear error messages and validation
- ✅ **Template Support**: Download templates for reference
- ✅ **Mode Switching**: Choose between form and JSON input

### **For Developers:**

- ✅ **Robust Parsing**: Handle various JSON formats
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Reusable Logic**: Shared validation functions
- ✅ **Clean UI**: Well-organized interface components

### **For the Application:**

- ✅ **Improved UX**: Better user experience for bulk operations
- ✅ **Data Integrity**: Strong validation prevents bad data
- ✅ **Flexibility**: Support multiple input methods
- ✅ **Performance**: Efficient bulk processing
- ✅ **Maintainability**: Clean, well-structured code

## 🧪 **Testing**

### **Test Cases:**

1. **Valid Array Format**: Test with proper question array
2. **Valid Object Format**: Test with object containing questions property
3. **Invalid JSON**: Test with malformed JSON
4. **Missing Fields**: Test with incomplete question data
5. **Validation Errors**: Test with invalid question structure
6. **Empty Input**: Test with empty or whitespace-only input
7. **Large Arrays**: Test with many questions (100+)

### **Expected Results:**

- ✅ Valid JSON arrays are parsed successfully
- ✅ Invalid JSON shows clear error messages
- ✅ Missing fields are handled gracefully with defaults
- ✅ Validation errors are specific and helpful
- ✅ Success messages show count of parsed questions

## 📋 **Files Modified**

1. **`src/components/BulkQuestionUploader.tsx`**
   - Added JSON input mode toggle
   - Added JSON textarea and parsing logic
   - Added validation and error handling
   - Added JSON generation from form data

2. **`src/components/UnifiedQuestionManager.tsx`**
   - Enhanced bulk import with JSON textarea
   - Added input method toggle
   - Improved UI organization
   - Added JSON parsing and validation

## 🎉 **Summary**

The bulk question import functionality has been significantly enhanced to support adding questions as arrays of objects. Users can now:

1. **Choose Input Method**: Form input or JSON array input
2. **Paste Question Arrays**: Direct JSON input with validation
3. **Validate Data**: Comprehensive validation with helpful errors
4. **Generate JSON**: Convert form data to JSON format
5. **Download Templates**: Get reference templates for proper format

This enhancement makes bulk question creation much more efficient and user-friendly, supporting both traditional form-based input and modern JSON array input methods.
