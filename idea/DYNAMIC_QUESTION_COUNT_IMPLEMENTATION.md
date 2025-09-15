# Dynamic Question Count Implementation

## 🎯 **Problem Solved**
The learning paths were displaying hardcoded question counts that didn't reflect the actual number of questions available in Firebase. This created confusion when users saw counts like "122 questions" but found no questions when they visited the actual question pages.

## ✅ **Solution Implemented**

### **1. Created Dynamic Stats Hook** (`src/hooks/useLearningPathStats.ts`)
- **Purpose**: Fetches real-time question counts from Firebase for each learning path
- **Features**:
  - Fetches question counts from both unified questions API and legacy questions API
  - Provides loading states for better UX
  - Handles errors gracefully with fallback to 0
  - Caches results to avoid unnecessary API calls
  - Supports refreshing stats on demand

### **2. Enhanced Learning Path Card Component** (`src/components/LearningPathCard.tsx`)
- **New Props**:
  - `dynamicQuestionCount?: number` - Real-time question count from Firebase
  - `isQuestionCountLoading?: boolean` - Loading state for question count
- **Enhanced UI**:
  - Shows loading spinner when fetching question counts
  - Displays dynamic count when available, falls back to static count
  - Loading indicators in both collapsed and expanded views

### **3. Updated Learning Paths Grid** (`src/components/LearningPathsGrid.tsx`)
- **Integration**: Uses the new `useLearningPathStats` hook
- **Dynamic Data**: Passes real-time question counts to each card
- **Loading States**: Manages loading states across all cards

## 🔧 **How It Works**

### **Data Flow**:
1. **LearningPathsGrid** loads and calls `useLearningPathStats()`
2. **Hook** fetches question counts from Firebase for all learning paths
3. **Hook** returns dynamic counts and loading states
4. **Grid** passes dynamic data to each **LearningPathCard**
5. **Cards** display real-time counts with loading indicators

### **API Endpoints Used**:
- Primary: `/api/questions/unified?learningPath=${pathId}&isActive=true`
- Fallback: `/api/questions/${pathId}` (legacy endpoint)

### **Fallback Strategy**:
- If Firebase API fails → Shows static count from resources
- If loading → Shows loading spinner
- If no questions found → Shows 0 or hides count

## 🚀 **Benefits**

### **For Users**:
- ✅ **Accurate Counts**: See the real number of questions available
- ✅ **Real-time Updates**: Counts update when questions are added/removed
- ✅ **Better UX**: Loading indicators during data fetching
- ✅ **Reliable**: Fallback to static counts if API fails

### **For Developers**:
- ✅ **Maintainable**: No need to manually update static counts
- ✅ **Extensible**: Easy to add more dynamic stats in the future
- ✅ **Robust**: Handles errors and loading states gracefully
- ✅ **Performance**: Caches results and avoids unnecessary API calls

## 📊 **Before vs After**

### **Before**:
```
Frontend Fundamentals: 122 questions (hardcoded)
↓ User clicks to view questions
→ No questions found (confusing!)
```

### **After**:
```
Frontend Fundamentals: 0 questions (dynamic from Firebase)
↓ User clicks to view questions
→ Consistent experience - no questions as expected
```

## 🔍 **Testing**

### **Manual Testing Steps**:
1. Visit `/learning-paths`
2. Observe loading spinners on question counts
3. Verify counts match actual questions in Firebase
4. Test error handling by disabling network
5. Verify fallback to static counts works

### **Expected Behavior**:
- Question counts load dynamically from Firebase
- Loading indicators show during fetch
- Counts are accurate and match actual questions
- System gracefully handles API failures

## 📁 **Files Modified**

1. **New File**: `src/hooks/useLearningPathStats.ts`
   - Dynamic question count fetching hook

2. **Modified**: `src/components/LearningPathCard.tsx`
   - Added dynamic count props and loading states
   - Enhanced UI with loading indicators

3. **Modified**: `src/components/LearningPathsGrid.tsx`
   - Integrated dynamic stats hook
   - Passes dynamic data to cards

## 🎉 **Result**

The learning paths now display **accurate, real-time question counts** that reflect the actual number of questions available in Firebase. Users will no longer see misleading counts and will have a consistent experience throughout the application.

---

**Status**: ✅ **Implementation Complete**
**Testing**: 🔄 **Ready for Manual Testing**
**Deployment**: 🚀 **Ready for Production**
