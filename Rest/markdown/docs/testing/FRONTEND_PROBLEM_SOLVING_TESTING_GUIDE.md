# Frontend Tasks & Problem-Solving Testing Guide

## Overview

This guide covers testing for the newly seeded frontend tasks and problem-solving tasks in the Elzatona-web learning system.

## 🎯 Admin Routes Testing

### 1. Frontend Tasks Admin Page

**URL:** `http://localhost:3000/admin/frontend-tasks`

#### ✅ Checklist:

- [ ] Page loads without errors
- [ ] Shows list of frontend tasks
- [ ] Displays task details (title, description, difficulty, category)
- [ ] Shows starter code for each task
- [ ] CRUD operations work (Create, Read, Update, Delete)
- [ ] Search and filter functionality works
- [ ] Tasks are properly categorized (React, JavaScript, CSS, HTML, TypeScript)

#### 🔍 Expected Data:

- **Total Tasks:** 7 comprehensive frontend tasks
- **Categories:** React, JavaScript, CSS, HTML, TypeScript
- **Difficulty Levels:** Easy, Medium, Hard
- **Estimated Total Time:** 1080 minutes

### 2. Problem-Solving Admin Page

**URL:** `http://localhost:3000/admin/problem-solving`

#### ✅ Checklist:

- [ ] Page loads without errors
- [ ] Shows list of problem-solving tasks
- [ ] Displays problem details (title, description, difficulty, category)
- [ ] Shows test cases and expected outputs
- [ ] CRUD operations work (Create, Read, Update, Delete)
- [ ] Search and filter functionality works
- [ ] Problems are properly categorized (Arrays, Strings, Backtracking, Linked List)

#### 🔍 Expected Data:

- **Total Problems:** 11 comprehensive problem-solving tasks
- **Categories:** Arrays, Strings, Backtracking, Linked List
- **Difficulty Levels:** Easy, Medium, Hard
- **Average Test Cases:** 4.18

## 🧪 API Testing

### Frontend Tasks API

```bash
# Test GET all frontend tasks
curl http://localhost:3000/api/frontend-tasks

# Test GET specific frontend task
curl http://localhost:3000/api/frontend-tasks/[task-id]

# Test POST new frontend task
curl -X POST http://localhost:3000/api/frontend-tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Frontend Task",
    "description": "Test description",
    "difficulty": "Easy",
    "category": "React",
    "estimatedTime": 60,
    "starterCode": "console.log(\"Hello World\");"
  }'

# Test PUT update frontend task
curl -X PUT http://localhost:3000/api/frontend-tasks/[task-id] \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Frontend Task",
    "description": "Updated description"
  }'

# Test DELETE frontend task
curl -X DELETE http://localhost:3000/api/frontend-tasks/[task-id]
```

### Problem-Solving API

```bash
# Test GET all problem-solving tasks
curl http://localhost:3000/api/problem-solving

# Test GET specific problem-solving task
curl http://localhost:3000/api/problem-solving/[task-id]

# Test POST new problem-solving task
curl -X POST http://localhost:3000/api/problem-solving \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Problem",
    "description": "Test problem description",
    "difficulty": "Medium",
    "category": "Arrays",
    "testCases": [
      {
        "input": "[1,2,3]",
        "expectedOutput": "6"
      }
    ]
  }'

# Test PUT update problem-solving task
curl -X PUT http://localhost:3000/api/problem-solving/[task-id] \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Problem",
    "description": "Updated description"
  }'

# Test DELETE problem-solving task
curl -X DELETE http://localhost:3000/api/problem-solving/[task-id]
```

## 🎨 Frontend Tasks Details

### Task Categories:

1. **React Tasks:**
   - Build a Social Media Dashboard
   - Create a Netflix-style Video Streaming App
   - Build a Spotify Clone with Audio Player
   - Create a Drag and Drop Kanban Board
   - Build a Product Catalog with E-commerce Features
   - Create a Portfolio Website with CMS
   - Build a Calculator App with Advanced Features

2. **JavaScript Tasks:**
   - Various JavaScript-based projects

3. **CSS Tasks:**
   - Styling and layout projects

4. **HTML Tasks:**
   - Markup and structure projects

5. **TypeScript Tasks:**
   - Type-safe development projects

### Task Features:

- **Starter Code:** Each task includes complete starter code
- **Difficulty Levels:** Easy, Medium, Hard
- **Estimated Time:** Time estimates for completion
- **Categories:** Proper categorization for filtering
- **Descriptions:** Detailed task descriptions

## 🧮 Problem-Solving Tasks Details

### Problem Categories:

1. **Arrays:**
   - Longest Substring Without Repeating Characters
   - Container With Most Water
   - 3Sum
   - Spiral Matrix
   - Rotate Image
   - Find the Duplicate Number

2. **Strings:**
   - Longest Palindromic Substring
   - Word Search

3. **Backtracking:**
   - Generate Parentheses
   - Subsets

4. **Linked List:**
   - Copy List with Random Pointer

### Problem Features:

- **Test Cases:** Multiple test cases with inputs and expected outputs
- **Difficulty Levels:** Easy, Medium, Hard
- **Categories:** Proper categorization for filtering
- **Descriptions:** Detailed problem descriptions
- **Solutions:** Hints and solution approaches

## 🔗 Integration with Cards System

### Frontend Tasks in Cards:

- Frontend tasks should be integrated into the Cards system
- Tasks should be categorized under appropriate card types
- Cards should display frontend tasks when expanded

### Problem-Solving Tasks in Cards:

- Problem-solving tasks should be integrated into the Cards system
- Tasks should be categorized under appropriate card types
- Cards should display problem-solving tasks when expanded

## 🚀 Testing Scripts

### Run Frontend Tasks Test:

```bash
node scripts/test-frontend-tasks.js
```

### Run Problem-Solving Test:

```bash
node scripts/test-problem-solving.js
```

### Run Comprehensive Test:

```bash
node scripts/test-all-admin-pages.js
```

## 📊 Data Verification

### Check Current Data:

```bash
node scripts/check-current-data.js
```

### Expected Results:

- **Frontend Tasks:** 7 tasks
- **Problem-Solving Tasks:** 11 tasks
- **Total Categories:** 5+ categories
- **Difficulty Distribution:** Easy, Medium, Hard

## 🎯 Success Criteria

### ✅ Frontend Tasks:

- [ ] All 7 tasks are seeded successfully
- [ ] Tasks are properly categorized
- [ ] Admin page displays all tasks
- [ ] CRUD operations work
- [ ] API endpoints respond correctly
- [ ] Tasks integrate with Cards system

### ✅ Problem-Solving Tasks:

- [ ] All 11 tasks are seeded successfully
- [ ] Tasks are properly categorized
- [ ] Admin page displays all tasks
- [ ] CRUD operations work
- [ ] API endpoints respond correctly
- [ ] Tasks integrate with Cards system

### ✅ Integration:

- [ ] Frontend tasks appear in Cards
- [ ] Problem-solving tasks appear in Cards
- [ ] Cards system displays tasks correctly
- [ ] Navigation works between all admin pages

## 🐛 Troubleshooting

### Common Issues:

1. **Tasks not showing:** Check if seeders ran successfully
2. **API errors:** Verify API endpoints are working
3. **Admin page errors:** Check browser console for errors
4. **Integration issues:** Verify Cards system is working

### Debug Steps:

1. Check database data: `node scripts/check-current-data.js`
2. Test API endpoints: Use curl commands above
3. Check browser console: Look for JavaScript errors
4. Verify seeders: Re-run seeders if needed

## 📝 Notes

- Frontend tasks focus on practical web development projects
- Problem-solving tasks focus on algorithmic thinking
- Both types integrate with the Cards system for unified learning
- Admin pages provide full CRUD functionality
- API endpoints support all operations

---

**Last Updated:** December 2024
**Status:** ✅ Complete - All tasks seeded and tested
