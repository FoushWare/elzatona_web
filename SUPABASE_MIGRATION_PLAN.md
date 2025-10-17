# 🚀 Supabase Migration Plan: Firebase → PostgreSQL

## 📋 **Current Firebase Structure Analysis**

### **Current Collections:**

- `unifiedQuestions` - All learning questions
- `learningCards` - Learning card definitions
- `learningPlans` - Learning plan templates
- `categories` - Question categories
- `topics` - Question topics
- `frontendTasks` - Frontend coding challenges
- `problemSolvingTasks` - Algorithmic challenges
- `userProgress` - User learning progress tracking
- `learningSessions` - User learning sessions
- `userAnalytics` - User analytics and insights

### **Current Relationships (Denormalized):**

- Questions have `category`, `topic`, `learningCardId` fields
- Plans contain nested `categories` → `topics` → `questions` structure
- Cards have `metadata.categories` and `metadata.topics` arrays
- No proper foreign key relationships

---

## 🎯 **New Relational Supabase Structure**

### **Core Tables:**

#### **1. learning_cards**

```sql
CREATE TABLE learning_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('core-technologies', 'framework-questions', 'problem-solving', 'system-design')),
  description TEXT,
  color VARCHAR(7), -- hex color
  icon VARCHAR(10),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **2. categories**

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  card_type VARCHAR(50) NOT NULL,
  icon VARCHAR(10),
  color VARCHAR(7),
  order_index INTEGER DEFAULT 0,
  learning_card_id UUID REFERENCES learning_cards(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **3. topics**

```sql
CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_questions INTEGER DEFAULT 0,
  order_index INTEGER DEFAULT 0,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **4. questions**

```sql
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('multiple-choice', 'open-ended', 'true-false', 'code')),
  difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  answer TEXT,
  explanation TEXT,
  hints TEXT[],
  time_limit INTEGER, -- in seconds
  points INTEGER DEFAULT 10,
  tags TEXT[],
  metadata JSONB,
  -- Multiple choice options (stored as JSONB)
  options JSONB,
  -- Code template and test cases
  code_template TEXT,
  test_cases JSONB,
  -- Sample answers for open-ended questions
  sample_answers TEXT[],
  -- Statistics
  stats JSONB,
  -- Relationships
  topic_id UUID REFERENCES topics(id) ON DELETE SET NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  learning_card_id UUID REFERENCES learning_cards(id) ON DELETE SET NULL,
  -- Status
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  updated_by UUID
);
```

#### **5. learning_plans**

```sql
CREATE TABLE learning_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  duration_days INTEGER DEFAULT 7,
  difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_time_hours INTEGER DEFAULT 0,
  is_template BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT false,
  prerequisites TEXT[],
  learning_objectives TEXT[],
  metadata JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  updated_by UUID
);
```

#### **6. plan_cards** (Junction table)

```sql
CREATE TABLE plan_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID REFERENCES learning_plans(id) ON DELETE CASCADE,
  card_id UUID REFERENCES learning_cards(id) ON DELETE CASCADE,
  order_index INTEGER DEFAULT 0,
  question_count INTEGER DEFAULT 0,
  time_limit_minutes INTEGER DEFAULT 0,
  difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(plan_id, card_id)
);
```

#### **7. user_progress**

```sql
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  plan_id UUID REFERENCES learning_plans(id) ON DELETE CASCADE,
  card_id UUID REFERENCES learning_cards(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  status VARCHAR(20) CHECK (status IN ('not_started', 'in_progress', 'completed', 'skipped')),
  score DECIMAL(5,2), -- percentage score
  time_spent INTEGER, -- in seconds
  attempts INTEGER DEFAULT 0,
  last_attempted_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);
```

#### **8. question_attempts**

```sql
CREATE TABLE question_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  selected_answer TEXT,
  is_correct BOOLEAN,
  time_spent INTEGER, -- in seconds
  points_earned INTEGER DEFAULT 0,
  attempt_number INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🔗 **Relationship Structure**

### **Hierarchical Structure:**

```
Learning Plans
    ↓ (1:N)
Plan Cards (Junction)
    ↓ (N:1)
Learning Cards
    ↓ (1:N)
Categories
    ↓ (1:N)
Topics
    ↓ (1:N)
Questions
```

### **Key Relationships:**

1. **Plans → Cards**: Many-to-Many via `plan_cards` junction table
2. **Cards → Categories**: One-to-Many
3. **Categories → Topics**: One-to-Many
4. **Topics → Questions**: One-to-Many
5. **Questions → Cards**: Many-to-One (for direct card assignment)
6. **Questions → Categories**: Many-to-One (for direct category assignment)

---

## 📊 **Migration Benefits**

### **Relational Advantages:**

1. **Data Integrity**: Foreign key constraints prevent orphaned records
2. **Query Performance**: Proper indexing and JOINs instead of nested queries
3. **Scalability**: Better performance with large datasets
4. **Consistency**: Single source of truth for each entity
5. **Flexibility**: Easy to add new relationships and constraints

### **PostgreSQL Features:**

1. **JSONB Support**: Keep flexible metadata while having structured relationships
2. **Full-Text Search**: Better search capabilities than Firestore
3. **ACID Compliance**: Strong consistency guarantees
4. **Advanced Indexing**: GIN, GiST indexes for complex queries
5. **Row-Level Security**: Fine-grained access control

---

## 🚀 **Migration Strategy**

### **Phase 1: Schema Creation**

1. Create all tables with proper constraints
2. Set up indexes for performance
3. Configure Row-Level Security (RLS)
4. Create database functions and triggers

### **Phase 2: Data Migration**

1. Migrate learning cards first (no dependencies)
2. Migrate categories (depends on cards)
3. Migrate topics (depends on categories)
4. Migrate questions (depends on topics/categories/cards)
5. Migrate learning plans
6. Create plan-card relationships
7. Migrate user progress and attempts

### **Phase 3: API Updates**

1. Update API endpoints to use Supabase client
2. Implement proper JOIN queries
3. Add pagination and filtering
4. Update frontend components

### **Phase 4: Testing & Validation**

1. Verify data integrity
2. Test all CRUD operations
3. Performance testing
4. User acceptance testing

---

## 🔧 **Technical Implementation**

### **Supabase Client Setup:**

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

### **Query Examples:**

```typescript
// Get questions with full hierarchy
const { data } = await supabase
  .from('questions')
  .select(
    `
    *,
    topics:topic_id (
      *,
      categories:category_id (
        *,
        learning_cards:learning_card_id (*)
      )
    )
  `
  )
  .eq('is_active', true);

// Get plan with all cards and questions
const { data } = await supabase
  .from('learning_plans')
  .select(
    `
    *,
    plan_cards (
      *,
      learning_cards:card_id (
        *,
        categories (
          *,
          topics (
            *,
            questions (count)
          )
        )
      )
    )
  `
  )
  .eq('id', planId);
```

---

## 📈 **Performance Optimizations**

### **Indexes:**

```sql
-- Performance indexes
CREATE INDEX idx_questions_topic_id ON questions(topic_id);
CREATE INDEX idx_questions_category_id ON questions(category_id);
CREATE INDEX idx_questions_learning_card_id ON questions(learning_card_id);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_questions_is_active ON questions(is_active);
CREATE INDEX idx_questions_created_at ON questions(created_at);

-- Full-text search index
CREATE INDEX idx_questions_search ON questions USING gin(to_tsvector('english', title || ' ' || content));

-- Composite indexes for common queries
CREATE INDEX idx_questions_topic_active ON questions(topic_id, is_active);
CREATE INDEX idx_questions_card_active ON questions(learning_card_id, is_active);
```

### **Materialized Views:**

```sql
-- Question statistics view
CREATE MATERIALIZED VIEW question_stats AS
SELECT
  t.id as topic_id,
  t.name as topic_name,
  c.id as category_id,
  c.name as category_name,
  lc.id as card_id,
  lc.title as card_title,
  COUNT(q.id) as total_questions,
  COUNT(CASE WHEN q.difficulty = 'beginner' THEN 1 END) as beginner_questions,
  COUNT(CASE WHEN q.difficulty = 'intermediate' THEN 1 END) as intermediate_questions,
  COUNT(CASE WHEN q.difficulty = 'advanced' THEN 1 END) as advanced_questions
FROM topics t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN learning_cards lc ON c.learning_card_id = lc.id
LEFT JOIN questions q ON q.topic_id = t.id AND q.is_active = true
GROUP BY t.id, t.name, c.id, c.name, lc.id, lc.title;

-- Refresh the view periodically
CREATE OR REPLACE FUNCTION refresh_question_stats()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW question_stats;
END;
$$ LANGUAGE plpgsql;
```

---

## ✅ **Next Steps**

1. **Create Supabase Tables** - Execute the SQL schema
2. **Data Migration Scripts** - Build migration tools
3. **API Layer Updates** - Update all endpoints
4. **Frontend Integration** - Update components
5. **Testing & Validation** - Comprehensive testing
6. **Performance Monitoring** - Monitor and optimize

This migration will transform your Firebase document-based structure into a proper relational database with all the benefits of PostgreSQL and Supabase! 🚀
