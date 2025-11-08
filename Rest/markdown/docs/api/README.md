# Elzatona Admin API Documentation

This directory contains the API documentation for the Elzatona Admin API using Swagger/OpenAPI 3.0.

## 🚀 Quick Start

### Start the Documentation Server

```bash
cd docs/api
npm install
npm start
```

The server will start on `http://localhost:8080`

### Access the Documentation

- **Swagger UI**: http://localhost:8080/api-docs/
- **Swagger YAML**: http://localhost:8080/swagger.yaml
- **Swagger JSON**: http://localhost:8080/swagger.json

## 📖 API Overview

The Elzatona Admin API provides comprehensive endpoints for managing the learning platform:

### 🔐 Authentication

- `POST /auth/login` - Admin login
- `POST /auth/logout` - Admin logout

### ❓ Questions Management

- `GET /questions` - Get all questions (with filtering)
- `POST /questions` - Create new question
- `GET /questions/{id}` - Get question by ID
- `PUT /questions/{id}` - Update question
- `DELETE /questions/{id}` - Delete question

### 📚 Categories & Topics

- `GET /categories` - Get all categories
- `POST /categories` - Create new category
- `GET /topics` - Get all topics
- `POST /topics` - Create new topic

### 🎯 Learning Content

- `GET /learning-cards` - Get all learning cards
- `GET /frontend-tasks` - Get all frontend tasks
- `GET /problem-solving` - Get all problem solving tasks

### 📊 Analytics

- `GET /analytics/dashboard` - Get dashboard analytics

## 🔧 Development

### Adding New Endpoints

1. Edit `swagger.yaml` to add new endpoints
2. Define request/response schemas
3. Add proper authentication requirements
4. Test in Swagger UI

### Schema Definitions

All data models are defined in the `components/schemas` section:

- `User` - User information
- `Question` - Learning questions
- `Category` - Question categories
- `Topic` - Learning topics
- `LearningCard` - Learning cards and plans
- `FrontendTask` - React/frontend challenges
- `ProblemSolvingTask` - Algorithmic challenges
- `DashboardAnalytics` - Analytics data

## 🔒 Authentication

Most endpoints require authentication using JWT tokens:

1. Login using `POST /auth/login`
2. Include the token in the Authorization header: `Bearer <token>`
3. Use `POST /auth/logout` to invalidate the token

## 📝 Example Requests

### Login Request

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@elzatona.com",
    "password": "admin123"
  }'
```

### Get Questions Request

```bash
curl -X GET http://localhost:3000/api/questions \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json"
```

### Create Question Request

```bash
curl -X POST http://localhost:3000/api/questions \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "What is React?",
    "content": "React is a JavaScript library for building user interfaces...",
    "type": "mcq",
    "difficulty": "medium",
    "categoryId": "cat_123",
    "topicId": "topic_123",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Option A",
    "explanation": "React is a library created by Facebook..."
  }'
```

## 🛠️ Technical Details

- **OpenAPI Version**: 3.0.3
- **Authentication**: JWT Bearer tokens
- **Rate Limiting**: 1000 requests/hour per user
- **Error Format**: Consistent JSON error responses
- **Pagination**: Standard pagination for list endpoints

## 📋 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## 🔄 Updates

To update the documentation:

1. Modify `swagger.yaml`
2. Restart the documentation server
3. Refresh the Swagger UI

The documentation is automatically served and updated when the server restarts.
