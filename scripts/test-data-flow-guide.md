# Data Flow Testing Guide

This guide will help you test the complete data flow from adding a question to seeing it reflected across all connected systems.

## Prerequisites

1. Make sure your development server is running: `npm run dev`
2. Have access to the admin panel at `http://localhost:3001/admin`

## Step 1: Clear All Firebase Data

### Option A: Using the Admin Interface

1. Go to `http://localhost:3001/admin/content/questions`
2. Click the "Clear All Questions" button (red button with trash icon)
3. Confirm the deletion when prompted

### Option B: Using the Script (if needed)

```bash
node scripts/clear-all-firebase-data.js
```

## Step 2: Add One Test Question

### Option A: Using the Unified Questions Interface

1. Go to `http://localhost:3001/admin/questions/unified`
2. Click "Add New Question"
3. Use the test question data from `scripts/test-question.json`:
   - **Title**: "What is React?"
   - **Content**: "React is a JavaScript library for building user interfaces, particularly web applications."
   - **Type**: Single Choice
   - **Difficulty**: Easy
   - **Category**: react
   - **Learning Path**: react-mastery
   - **Points**: 10
   - **Tags**: react, javascript, frontend, library
   - **Options**:
     - A JavaScript library for building user interfaces ✓
     - A CSS framework for styling
     - A database management system
     - A server-side programming language
   - **Explanation**: "React is a JavaScript library developed by Facebook for building user interfaces, especially for web applications. It uses a component-based architecture and virtual DOM for efficient rendering."

### Option B: Using Markdown Extractor

1. Go to `http://localhost:3001/admin/content/questions`
2. Click "Extract from Markdown"
3. Use this markdown content:

```markdown
# What is React?

React is a JavaScript library for building user interfaces, particularly web applications.

**Type:** Single Choice  
**Difficulty:** Easy  
**Category:** react  
**Learning Path:** react-mastery  
**Points:** 10  
**Tags:** react, javascript, frontend, library

## Options

- A JavaScript library for building user interfaces ✓
- A CSS framework for styling
- A database management system
- A server-side programming language

## Explanation

React is a JavaScript library developed by Facebook for building user interfaces, especially for web applications. It uses a component-based architecture and virtual DOM for efficient rendering.
```

## Step 3: Verify Question Appears in All Systems

### 3.1 Check Questions Management

- Go to `http://localhost:3001/admin/content/questions`
- Verify the question appears in the list
- Check that it shows as "Active" and "Complete"

### 3.2 Check Guided Learning Plans

- Go to `http://localhost:3001/admin/guided-learning`
- Click on any plan (e.g., "1-day-plan")
- Click "Edit"
- Verify the question appears in the question pool
- Check that it can be assigned to sections

### 3.3 Check Learning Sections

- Go to `http://localhost:3001/admin/sections`
- Verify the question appears in the sections
- Check that it's properly categorized

### 3.4 Check Learning Paths

- Go to `http://localhost:3001/learning-paths`
- Verify the question appears in the "React Mastery" learning path
- Check that the question count is updated

### 3.5 Check Public Learning Flow

- Go to `http://localhost:3001/get-started`
- Choose "Free-style mode"
- Navigate to learning paths
- Verify the question appears in the React Mastery path

## Step 4: Test Data Flow Connections

### 4.1 Test Question Updates

1. Edit the question in the admin interface
2. Verify changes appear in all connected systems
3. Check that learning path question counts update

### 4.2 Test Question Deactivation

1. Deactivate the question in admin
2. Verify it doesn't appear in public interfaces
3. Verify it still appears in admin but marked as inactive

### 4.3 Test Question Deletion

1. Delete the question from admin
2. Verify it disappears from all systems
3. Verify learning path question counts update

## Expected Results

After completing this test, you should see:

1. ✅ Question appears in admin questions management
2. ✅ Question appears in guided learning plans
3. ✅ Question appears in learning sections
4. ✅ Question appears in learning paths
5. ✅ Question appears in public learning flow
6. ✅ Question counts update correctly across all systems
7. ✅ Question updates/deletions propagate to all connected systems

## Troubleshooting

If any step fails:

1. **Check Firebase Console**: Go to Firebase Console and verify data is being written
2. **Check Browser Console**: Look for JavaScript errors
3. **Check Network Tab**: Verify API calls are successful
4. **Check Server Logs**: Look for server-side errors in the terminal

## Next Steps

Once the single question test passes:

1. Add more test questions with different categories and learning paths
2. Test bulk question import
3. Test question filtering and search
4. Test question assignment to different sections and plans
5. Test the complete user journey from question to completion
