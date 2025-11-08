# Elzatona API Examples

This file contains practical examples of how to use the Elzatona Learning Platform API with curl commands and JavaScript fetch examples.

## Prerequisites

- API server running on `http://localhost:3000`
- Valid authentication token (for protected endpoints)
- curl or JavaScript fetch API

## Authentication Examples

### Register a New User

```bash
curl -X POST "http://localhost:3000/api/auth" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "name": "John Doe",
    "role": "user"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "userId": "user-123"
}
```

### Login User

```bash
curl -X POST "http://localhost:3000/api/auth" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Response:**

```json
{
  "success": true,
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

## Question Management Examples

### Get All Questions (with pagination)

```bash
curl -X GET "http://localhost:3000/api/questions/unified?page=1&pageSize=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

### Get Questions by Category

```bash
curl -X GET "http://localhost:3000/api/questions/unified?category=React&difficulty=medium" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

### Search Questions

```bash
curl -X GET "http://localhost:3000/api/questions/unified?search=React&sortBy=difficulty&sortOrder=asc" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

### Create a New Question

```bash
curl -X POST "http://localhost:3000/api/questions/unified" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is the purpose of useEffect in React?",
    "type": "multiple_choice",
    "difficulty": "medium",
    "category": "React",
    "subcategory": "Hooks",
    "options": [
      "To manage component state",
      "To perform side effects",
      "To create custom hooks",
      "To optimize performance"
    ],
    "correct_answer": "To perform side effects",
    "explanation": "useEffect is used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.",
    "hints": [
      "Think about what happens after component renders",
      "Consider operations that affect things outside the component"
    ],
    "learning_path": "frontend-development",
    "section_id": "react-hooks-section",
    "order_index": 1,
    "is_active": true
}'
```

### Get a Specific Question

```bash
curl -X GET "http://localhost:3000/api/questions/unified/q-123" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

### Update a Question

```bash
curl -X PUT "http://localhost:3000/api/questions/unified/q-123" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is the purpose of useEffect in React? (Updated)",
    "type": "multiple_choice",
    "difficulty": "hard",
    "category": "React",
    "subcategory": "Hooks",
    "options": [
      "To manage component state",
      "To perform side effects",
      "To create custom hooks",
      "To optimize performance"
    ],
    "correct_answer": "To perform side effects",
    "explanation": "useEffect is used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM. It runs after every render by default.",
    "hints": [
      "Think about what happens after component renders",
      "Consider operations that affect things outside the component",
      "Remember it can run on every render or conditionally"
    ],
    "learning_path": "frontend-development",
    "section_id": "react-hooks-section",
    "order_index": 1,
    "is_active": true
}'
```

### Delete a Question

```bash
curl -X DELETE "http://localhost:3000/api/questions/unified/q-123" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

## Category Management Examples

### Get All Categories

```bash
curl -X GET "http://localhost:3000/api/categories" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

### Create a New Category

```bash
curl -X POST "http://localhost:3000/api/categories" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Backend Development",
    "description": "Questions related to backend technologies and server-side development",
    "color": "#10B981",
    "icon": "⚙️",
    "orderIndex": 2,
    "is_active": true
}'
```

### Get a Specific Category

```bash
curl -X GET "http://localhost:3000/api/categories/cat-123" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

### Update a Category

```bash
curl -X PUT "http://localhost:3000/api/categories/cat-123" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Frontend Development (Updated)",
    "description": "Comprehensive questions about frontend technologies including HTML, CSS, JavaScript, and modern frameworks",
    "color": "#3B82F6",
    "icon": "🎨",
    "orderIndex": 1,
    "is_active": true
}'
```

### Delete a Category

```bash
curl -X DELETE "http://localhost:3000/api/categories/cat-123" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

## Topic Management Examples

### Get All Topics

```bash
curl -X GET "http://localhost:3000/api/topics" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

### Create a New Topic

```bash
curl -X POST "http://localhost:3000/api/topics" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "React Hooks",
    "description": "Questions about React hooks including useState, useEffect, useContext, and custom hooks",
    "category": "cat-123",
    "categoryId": "cat-123",
    "orderIndex": 2,
    "is_active": true
}'
```

### Get a Specific Topic

```bash
curl -X GET "http://localhost:3000/api/topics/topic-123" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

### Update a Topic

```bash
curl -X PUT "http://localhost:3000/api/topics/topic-123" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "React Hooks (Advanced)",
    "description": "Advanced questions about React hooks including useState, useEffect, useContext, useReducer, and custom hooks",
    "category": "cat-123",
    "categoryId": "cat-123",
    "orderIndex": 2,
    "is_active": true
}'
```

### Delete a Topic

```bash
curl -X DELETE "http://localhost:3000/api/topics/topic-123" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

## Learning Path Examples

### Get All Learning Paths

```bash
curl -X GET "http://localhost:3000/api/learning-paths" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

### Create a New Learning Path

```bash
curl -X POST "http://localhost:3000/api/learning-paths" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Full Stack Development",
    "description": "Complete learning path covering both frontend and backend development",
    "sections": [
      {
        "name": "HTML & CSS Fundamentals",
        "description": "Learn the basics of web markup and styling",
        "order_index": 1
      },
      {
        "name": "JavaScript Basics",
        "description": "Master JavaScript fundamentals",
        "order_index": 2
      },
      {
        "name": "React Development",
        "description": "Build modern web applications with React",
        "order_index": 3
      },
      {
        "name": "Node.js & Express",
        "description": "Create server-side applications",
        "order_index": 4
      },
      {
        "name": "Database Integration",
        "description": "Work with databases and data persistence",
        "order_index": 5
      }
    ],
    "order_index": 2,
    "is_active": true
}'
```

### Get a Specific Learning Path

```bash
curl -X GET "http://localhost:3000/api/learning-paths/lp-123" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

## Progress Tracking Examples

### Get User Progress

```bash
curl -X GET "http://localhost:3000/api/progress/get" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

### Save User Progress

```bash
curl -X POST "http://localhost:3000/api/progress/save" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "sectionId": "section-123",
    "questionId": "q-123",
    "isCorrect": true,
    "timeSpent": 45,
    "answer": "To perform side effects"
}'
```

## Admin Examples

### Get Admin Statistics

```bash
curl -X GET "http://localhost:3000/api/admin/stats" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

### Clear All Questions (Admin Only)

```bash
curl -X DELETE "http://localhost:3000/api/admin/clear-questions" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

## JavaScript Fetch Examples

### Authentication with Fetch

```javascript
// Register a new user
async function registerUser(email, password, name) {
  try {
    const response = await fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
        role: 'user',
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('User registered:', data.userId);
      return data;
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
}

// Login user
async function loginUser(email, password) {
  try {
    const response = await fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('User logged in:', data.user);
      // Store token for future requests
      localStorage.setItem('auth_token', data.user.token);
      return data.user;
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}
```

### Question Management with Fetch

```javascript
// Get questions with filters
async function getQuestions(filters = {}) {
  try {
    const params = new URLSearchParams(filters);
    const token = localStorage.getItem('auth_token');

    const response = await fetch(
      `http://localhost:3000/api/questions/unified?${params}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log('Questions retrieved:', data.data);
      return data;
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('Failed to get questions:', error);
    throw error;
  }
}

// Create a new question
async function createQuestion(questionData) {
  try {
    const token = localStorage.getItem('auth_token');

    const response = await fetch(
      'http://localhost:3000/api/questions/unified',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log('Question created:', data.data);
      return data.data;
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('Failed to create question:', error);
    throw error;
  }
}

// Usage examples
async function exampleUsage() {
  try {
    // Login first
    const user = await loginUser('user@example.com', 'password123');

    // Get questions with filters
    const questions = await getQuestions({
      category: 'React',
      difficulty: 'medium',
      page: 1,
      pageSize: 10,
    });

    // Create a new question
    const newQuestion = await createQuestion({
      question: 'What is the purpose of useEffect in React?',
      type: 'multiple_choice',
      difficulty: 'medium',
      category: 'React',
      subcategory: 'Hooks',
      options: [
        'To manage component state',
        'To perform side effects',
        'To create custom hooks',
        'To optimize performance',
      ],
      correct_answer: 'To perform side effects',
      explanation:
        'useEffect is used to perform side effects in functional components.',
      hints: [
        'Think about what happens after component renders',
        'Consider operations that affect things outside the component',
      ],
      learning_path: 'frontend-development',
      section_id: 'react-hooks-section',
      order_index: 1,
      is_active: true,
    });

    console.log('All operations completed successfully!');
  } catch (error) {
    console.error('Operation failed:', error);
  }
}
```

### Progress Tracking with Fetch

```javascript
// Get user progress
async function getUserProgress() {
  try {
    const token = localStorage.getItem('auth_token');

    const response = await fetch('http://localhost:3000/api/progress/get', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.success) {
      console.log('User progress:', data.data);
      return data.data;
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('Failed to get progress:', error);
    throw error;
  }
}

// Save user progress
async function saveUserProgress(progressData) {
  try {
    const token = localStorage.getItem('auth_token');

    const response = await fetch('http://localhost:3000/api/progress/save', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(progressData),
    });

    const data = await response.json();

    if (data.success) {
      console.log('Progress saved successfully');
      return data;
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('Failed to save progress:', error);
    throw error;
  }
}
```

## Error Handling Examples

### Common Error Responses

```json
{
  "success": false,
  "error": "Authentication required",
  "details": "Please provide a valid authentication token"
}
```

```json
{
  "success": false,
  "error": "Validation error",
  "details": "Category name is required"
}
```

```json
{
  "success": false,
  "error": "Resource not found",
  "details": "Question with ID 'q-999' does not exist"
}
```

### Handling Errors in JavaScript

```javascript
async function handleApiCall(apiFunction) {
  try {
    const result = await apiFunction();
    return result;
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      const errorData = await error.response.json();
      console.error('API Error:', errorData.error);
      console.error('Details:', errorData.details);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.message);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    throw error;
  }
}
```

## Testing Scripts

### Test All Endpoints

```bash
#!/bin/bash

# Test script for Elzatona API
BASE_URL="http://localhost:3000"
TOKEN="YOUR_TOKEN_HERE"

echo "🧪 Testing Elzatona API Endpoints"
echo "================================="

# Test authentication
echo "🔐 Testing authentication..."
curl -s -X POST "$BASE_URL/api/auth" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  | jq '.'

# Test categories
echo "📁 Testing categories..."
curl -s -X GET "$BASE_URL/api/categories" \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.'

# Test topics
echo "📚 Testing topics..."
curl -s -X GET "$BASE_URL/api/topics" \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.'

# Test questions
echo "❓ Testing questions..."
curl -s -X GET "$BASE_URL/api/questions/unified?page=1&pageSize=5" \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.'

# Test learning paths
echo "🛤️ Testing learning paths..."
curl -s -X GET "$BASE_URL/api/learning-paths" \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.'

# Test progress
echo "📊 Testing progress..."
curl -s -X GET "$BASE_URL/api/progress/get" \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.'

echo "✅ API testing completed!"
```

## Rate Limiting Examples

### Handling Rate Limits

```javascript
async function makeApiCallWithRetry(apiFunction, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiFunction();
    } catch (error) {
      if (error.response?.status === 429) {
        // Rate limited - wait and retry
        const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
        console.log(
          `Rate limited. Waiting ${waitTime}ms before retry ${attempt}/${maxRetries}`
        );
        await new Promise(resolve => setTimeout(resolve, waitTime));
      } else {
        throw error;
      }
    }
  }
  throw new Error('Max retries exceeded');
}
```

---

_For more examples and detailed documentation, visit the Swagger UI at `http://localhost:8080` when running the API documentation server._
