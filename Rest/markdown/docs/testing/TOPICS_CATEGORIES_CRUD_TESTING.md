# 🧪 **TOPICS & CATEGORIES CRUD TESTING GUIDE**

## 📋 **Testing Overview**

This guide focuses specifically on CRUD operations for Topics and Categories management at `http://localhost:3000/admin/content-management`.

**🎯 New Unified Interface**: The admin page now features an integrated design with:

- **Single View**: Unified interface for managing categories, topics, and questions
- **Expandable Categories**: Click to expand categories and view their topics
- **Nested Topics**: Topics are organized under their parent categories
- **Question Management**: Add and view questions directly within topics
- **Visual Hierarchy**: Color-coded categories with intuitive navigation
- **Search & Filter**: Advanced filtering by card type and search terms

---

---

## 🏷️ **TOPICS CRUD OPERATIONS**

### **URL**: `http://localhost:3000/admin/content-management`

#### **✅ Topics CRUD Testing Checklist**

- [ ] **Page Access**
  - [ ] Navigate to `/admin/content-management`
  - [ ] Verify admin authentication required
  - [ ] Sign in with admin credentials
  - [ ] Verify page loads successfully
  - [ ] Verify unified interface is displayed (no tabs)
  - [ ] Verify categories are shown in expandable cards
  - [ ] Verify "Add Category" and "Add Topic" buttons are visible

- [ ] **Categories View**
  - [ ] Verify categories are displayed as expandable cards
  - [ ] Verify each category shows:
    - [ ] Category name with color indicator
    - [ ] Card type badge
    - [ ] Topic count and question count
    - [ ] Edit and Delete buttons
  - [ ] Click on a category to expand it
  - [ ] Verify topics are displayed under the expanded category
  - [ ] Verify each topic shows:
    - [ ] Topic name
    - [ ] Difficulty badge
    - [ ] Question count
    - [ ] Edit, Delete, and View buttons

#### **✅ Topics CRUD Operations Testing**

- [ ] **CREATE Topic**
  - [ ] Expand a category by clicking on it
  - [ ] Click "Add Topic" button within the category
  - [ ] Fill in topic form:
    - [ ] Name: "React Hooks Advanced"
    - [ ] Slug: "react-hooks-advanced"
    - [ ] Description: "Advanced React hooks patterns and custom hooks"
    - [ ] Difficulty: "Advanced"
    - [ ] Estimated Questions: 15
    - [ ] Order: 20
  - [ ] Click "Create Topic"
  - [ ] Verify topic appears under the category
  - [ ] Verify topic count updates in category header
  - [ ] Verify topic appears in Topics tab list
  - [ ] Switch to Categories tab and verify topic can be assigned to categories
  - [ ] Refresh page and verify topic persists

- [ ] **READ Topic**
  - [ ] Stay on "Topics" tab
  - [ ] Click on "React Hooks Advanced" topic
  - [ ] Verify topic details display:
    - [ ] Topic name
    - [ ] Category name (if assigned)
    - [ ] Description
    - [ ] Difficulty badge
    - [ ] Estimated question count
    - [ ] Order number
    - [ ] Created date
    - [ ] Updated date

- [ ] **UPDATE Topic**
  - [ ] Stay on "Topics" tab
  - [ ] Click "Edit" button on "React Hooks Advanced" topic
  - [ ] Modify topic details:
    - [ ] Change name to "React Hooks Advanced - Updated"
    - [ ] Change description to "Updated advanced React hooks patterns"
    - [ ] Change difficulty to "Intermediate"
    - [ ] Change estimated questions to 20
    - [ ] Change order to 25
  - [ ] Click "Update Topic"
  - [ ] Verify success notification
  - [ ] Verify changes reflected in Topics tab list
  - [ ] Switch to Categories tab and verify changes are reflected there too
  - [ ] Refresh page and verify changes persist

- [ ] **DELETE Topic**
  - [ ] Stay on "Topics" tab
  - [ ] Click "Delete" button on "React Hooks Advanced - Updated" topic
  - [ ] Verify confirmation dialog appears
  - [ ] Click "Confirm Delete"
  - [ ] Verify success notification
  - [ ] Verify topic removed from Topics tab list
  - [ ] Switch to Categories tab and verify topic is removed from any categories
  - [ ] Refresh page and verify topic is deleted

---

## 📚 **CATEGORIES CRUD OPERATIONS**

### **URL**: `http://localhost:3000/admin/content-management`

#### **✅ Categories CRUD Testing Checklist**

- [ ] **Categories Tab Navigation**
  - [ ] Click on "Categories" tab (should be default)
  - [ ] Verify categories are displayed in expandable cards
  - [ ] Verify each category shows:
    - [ ] Category name
    - [ ] Question count badge
    - [ ] Topics count badge
    - [ ] Expand/collapse chevron
    - [ ] Edit button
    - [ ] Delete button
  - [ ] Verify search functionality works for categories
  - [ ] Verify category filter works
  - [ ] Test expanding categories to see associated topics

#### **✅ Categories CRUD Operations Testing**

- [ ] **CREATE Category**
  - [ ] Stay on "Categories" tab
  - [ ] Click "Add Category" button
  - [ ] Fill in category form:
    - [ ] Name: "Vue.js"
    - [ ] Slug: "vue-js"
    - [ ] Description: "Vue.js framework fundamentals"
    - [ ] Card Type: "Framework Questions"
    - [ ] Icon: "🟢"
    - [ ] Color: "#4FC08D"
    - [ ] Order: 8
    - [ ] Topics: Select multiple topics from existing topics list
  - [ ] Click "Create Category"
  - [ ] Verify success notification
  - [ ] Verify category appears in Categories tab list
  - [ ] Expand the category to verify selected topics are associated
  - [ ] Switch to Topics tab and verify topics show the category name
  - [ ] Refresh page and verify category persists

- [ ] **READ Category**
  - [ ] Stay on "Categories" tab
  - [ ] Click on "Vue.js" category to expand
  - [ ] Verify category details display:
    - [ ] Category name
    - [ ] Description
    - [ ] Card type
    - [ ] Icon and color
    - [ ] Order number
    - [ ] Associated topics list
    - [ ] Topics count
    - [ ] Question count
  - [ ] Verify topics are properly linked to category
  - [ ] Test expanding/collapsing category

- [ ] **UPDATE Category**
  - [ ] Stay on "Categories" tab
  - [ ] Click "Edit" button on "Vue.js" category
  - [ ] Modify category details:
    - [ ] Change name to "Vue.js - Updated"
    - [ ] Change description to "Updated Vue.js description"
    - [ ] Change color to "#42B883"
    - [ ] Change order to 9
    - [ ] Add/remove topics from the topics array
  - [ ] Click "Update Category"
  - [ ] Verify success notification
  - [ ] Verify changes reflected in Categories tab list
  - [ ] Expand category to verify topics array is updated correctly
  - [ ] Switch to Topics tab and verify topic-category relationships are updated
  - [ ] Refresh page and verify changes persist

- [ ] **DELETE Category**
  - [ ] Stay on "Categories" tab
  - [ ] Click "Delete" button on "Vue.js - Updated" category
  - [ ] Verify confirmation dialog appears
  - [ ] Click "Confirm Delete"
  - [ ] Verify success notification
  - [ ] Verify category removed from Categories tab list
  - [ ] Switch to Topics tab and verify topics are unlinked from category (but not deleted)
  - [ ] Refresh page and verify category is deleted

---

## 🔗 **TOPICS-CATEGORIES RELATIONSHIP TESTING**

### **✅ Relationship Management Testing**

- [ ] **Topic-Category Association**
  - [ ] Create multiple topics first
  - [ ] Create category and select multiple topics
  - [ ] Verify topics appear under category
  - [ ] Verify topic count updates correctly

- [ ] **Category-Topic Updates**
  - [ ] Edit category to add more topics
  - [ ] Edit category to remove some topics
  - [ ] Verify topic associations update correctly
  - [ ] Verify topic counts are accurate

- [ ] **Data Integrity**
  - [ ] Delete category and verify topics are unlinked
  - [ ] Delete topic and verify it's removed from categories
  - [ ] Verify no orphaned relationships exist

---

## 🧪 **API TESTING**

### **✅ Topics API Testing**

```bash
# Test topics API
curl http://localhost:3000/api/topics

# Test creating topic via API
curl -X POST http://localhost:3000/api/topics \
  -H "Content-Type: application/json" \
  -d '{
    "name": "React Context API",
    "slug": "react-context-api",
    "description": "React Context API fundamentals",
    "difficulty": "intermediate",
    "estimatedQuestions": 12,
    "order": 15
  }'

# Test updating topic via API
curl -X PUT http://localhost:3000/api/topics/[topic-id] \
  -H "Content-Type: application/json" \
  -d '{
    "name": "React Context API - Updated",
    "description": "Updated React Context API description"
  }'

# Test deleting topic via API
curl -X DELETE http://localhost:3000/api/topics/[topic-id]
```

### **✅ Categories API Testing**

```bash
# Test categories API
curl http://localhost:3000/api/categories

# Test creating category via API
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Angular",
    "slug": "angular",
    "description": "Angular framework fundamentals",
    "cardType": "Framework Questions",
    "icon": "🅰️",
    "color": "#DD0031",
    "order": 9,
    "topics": ["topic-id-1", "topic-id-2"]
  }'

# Test updating category via API
curl -X PUT http://localhost:3000/api/categories/[category-id] \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Angular - Updated",
    "description": "Updated Angular description",
    "topics": ["topic-id-1", "topic-id-2", "topic-id-3"]
  }'

# Test deleting category via API
curl -X DELETE http://localhost:3000/api/categories/[category-id]
```

---

## 📊 **TESTING WORKFLOW**

### **🔄 Complete Testing Workflow**

#### **Step 1: Authentication**

1. Navigate to `/admin/content-management`
2. Sign in with admin credentials
3. Verify access to admin page

#### **Step 2: Create Topics First**

1. Create multiple topics:
   - "React Hooks Advanced"
   - "React Context API"
   - "React Performance"
   - "Vue.js Components"
   - "Vue.js State Management"
2. Verify all topics appear in list
3. Verify topics can be edited and deleted

#### **Step 3: Create Categories with Topics**

1. Create "React Advanced" category
2. Select topics: "React Hooks Advanced", "React Context API", "React Performance"
3. Verify category is created with correct topics
4. Create "Vue.js Fundamentals" category
5. Select topics: "Vue.js Components", "Vue.js State Management"
6. Verify category is created with correct topics

#### **Step 4: Test Relationships**

1. Edit "React Advanced" category to add more topics
2. Edit "Vue.js Fundamentals" category to remove some topics
3. Verify topic associations update correctly
4. Verify topic counts are accurate

#### **Step 5: Test CRUD Operations**

1. Test updating both topics and categories
2. Test deleting topics (verify they're removed from categories)
3. Test deleting categories (verify topics are unlinked)
4. Test data persistence after page refresh

#### **Step 6: Integration Testing**

1. Verify changes reflect on website
2. Test API endpoints work correctly
3. Test error handling and edge cases

---

## 🚨 **EDGE CASES & ERROR HANDLING**

### **✅ Data Validation Testing**

- [ ] **Empty Fields**
  - [ ] Try to create topic with empty name
  - [ ] Try to create category with empty name
  - [ ] Verify validation errors appear

- [ ] **Invalid Data**
  - [ ] Try to create topic with invalid difficulty
  - [ ] Try to create category with invalid card type
  - [ ] Verify validation errors appear

- [ ] **Duplicate Names**
  - [ ] Try to create topic with existing name
  - [ ] Try to create category with existing name
  - [ ] Verify duplicate validation works

### **✅ Relationship Edge Cases**

- [ ] **Orphaned Topics**
  - [ ] Delete category and verify topics are unlinked
  - [ ] Verify topics still exist but are not associated

- [ ] **Empty Categories**
  - [ ] Create category without topics
  - [ ] Verify category shows 0 topics
  - [ ] Add topics to empty category

- [ ] **Topic Deletion**
  - [ ] Delete topic that's associated with category
  - [ ] Verify topic is removed from category
  - [ ] Verify category topic count updates

---

## 📈 **SUCCESS CRITERIA**

### **✅ Functional Requirements**

- [ ] All CRUD operations work correctly for topics
- [ ] All CRUD operations work correctly for categories
- [ ] Topic-category relationships work properly
- [ ] Data persistence is reliable
- [ ] Real-time updates work correctly

### **✅ Data Integrity Requirements**

- [ ] No data loss during operations
- [ ] Topic-category relationships are maintained correctly
- [ ] Statistics update accurately
- [ ] Validation prevents invalid data
- [ ] Cleanup handles orphaned relationships

### **✅ User Experience Requirements**

- [ ] Intuitive interface for managing topics and categories
- [ ] Clear error messages
- [ ] Responsive design
- [ ] Easy topic-category association
- [ ] Smooth workflow from topics to categories

---

## 🎯 **QUICK TEST COMMANDS**

### **API Testing**

```bash
# Test topics API
curl http://localhost:3000/api/topics

# Test categories API
curl http://localhost:3000/api/categories

# Test with formatted output
curl -s http://localhost:3000/api/topics | jq '.data[0:3]'
curl -s http://localhost:3000/api/categories | jq '.data[0:3]'
```

### **Manual Testing**

1. Navigate to `http://localhost:3000/admin/content-management`
2. Create topics first
3. Create categories with topic arrays
4. Test all CRUD operations
5. Verify relationships work correctly

This focused testing guide ensures comprehensive validation of topics and categories CRUD operations! 🚀
