# 🗂️ **ER Diagram: Supabase Relational Structure**

## **Entity Relationship Diagram**

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              LEARNING PLANS                                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id (UUID, PK)                                                                  │
│ name (VARCHAR)                                                                 │
│ description (TEXT)                                                             │
│ duration_days (INTEGER)                                                        │
│ difficulty (VARCHAR)                                                           │
│ is_template (BOOLEAN)                                                          │
│ is_public (BOOLEAN)                                                            │
│ created_at (TIMESTAMP)                                                         │
│ updated_at (TIMESTAMP)                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ 1:N
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              PLAN_CARDS                                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id (UUID, PK)                                                                  │
│ plan_id (UUID, FK → learning_plans.id)                                        │
│ card_id (UUID, FK → learning_cards.id)                                         │
│ order_index (INTEGER)                                                          │
│ question_count (INTEGER)                                                       │
│ time_limit_minutes (INTEGER)                                                   │
│ difficulty (VARCHAR)                                                           │
│ is_active (BOOLEAN)                                                            │
│ created_at (TIMESTAMP)                                                        │
│ updated_at (TIMESTAMP)                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ N:1
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              LEARNING CARDS                                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id (UUID, PK)                                                                  │
│ title (VARCHAR)                                                                │
│ type (VARCHAR)                                                                 │
│ description (TEXT)                                                             │
│ color (VARCHAR)                                                               │
│ icon (VARCHAR)                                                                 │
│ order_index (INTEGER)                                                          │
│ is_active (BOOLEAN)                                                            │
│ created_at (TIMESTAMP)                                                        │
│ updated_at (TIMESTAMP)                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ 1:N
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              CATEGORIES                                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id (UUID, PK)                                                                  │
│ name (VARCHAR)                                                                 │
│ slug (VARCHAR, UNIQUE)                                                         │
│ description (TEXT)                                                             │
│ card_type (VARCHAR)                                                            │
│ icon (VARCHAR)                                                                 │
│ color (VARCHAR)                                                                │
│ order_index (INTEGER)                                                          │
│ learning_card_id (UUID, FK → learning_cards.id)                                │
│ is_active (BOOLEAN)                                                            │
│ created_at (TIMESTAMP)                                                        │
│ updated_at (TIMESTAMP)                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ 1:N
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              TOPICS                                            │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id (UUID, PK)                                                                  │
│ name (VARCHAR)                                                                 │
│ slug (VARCHAR, UNIQUE)                                                         │
│ description (TEXT)                                                             │
│ difficulty (VARCHAR)                                                           │
│ estimated_questions (INTEGER)                                                  │
│ order_index (INTEGER)                                                          │
│ category_id (UUID, FK → categories.id)                                         │
│ is_active (BOOLEAN)                                                            │
│ created_at (TIMESTAMP)                                                        │
│ updated_at (TIMESTAMP)                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ 1:N
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              QUESTIONS                                          │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id (UUID, PK)                                                                  │
│ title (VARCHAR)                                                                │
│ content (TEXT)                                                                 │
│ type (VARCHAR)                                                                 │
│ difficulty (VARCHAR)                                                           │
│ answer (TEXT)                                                                  │
│ explanation (TEXT)                                                             │
│ hints (TEXT[])                                                                 │
│ time_limit (INTEGER)                                                           │
│ points (INTEGER)                                                                │
│ tags (TEXT[])                                                                  │
│ metadata (JSONB)                                                               │
│ options (JSONB)                                                                 │
│ code_template (TEXT)                                                           │
│ test_cases (JSONB)                                                             │
│ sample_answers (TEXT[])                                                        │
│ stats (JSONB)                                                                  │
│ topic_id (UUID, FK → topics.id)                                                │
│ category_id (UUID, FK → categories.id)                                         │
│ learning_card_id (UUID, FK → learning_cards.id)                                │
│ is_active (BOOLEAN)                                                            │
│ created_at (TIMESTAMP)                                                        │
│ updated_at (TIMESTAMP)                                                         │
│ created_by (UUID)                                                              │
│ updated_by (UUID)                                                             │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ 1:N
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              USER_PROGRESS                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id (UUID, PK)                                                                  │
│ user_id (UUID)                                                                 │
│ plan_id (UUID, FK → learning_plans.id)                                         │
│ card_id (UUID, FK → learning_cards.id)                                         │
│ question_id (UUID, FK → questions.id)                                          │
│ status (VARCHAR)                                                               │
│ score (DECIMAL)                                                                 │
│ time_spent (INTEGER)                                                            │
│ attempts (INTEGER)                                                             │
│ last_attempted_at (TIMESTAMP)                                                   │
│ completed_at (TIMESTAMP)                                                        │
│ created_at (TIMESTAMP)                                                         │
│ updated_at (TIMESTAMP)                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ 1:N
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              QUESTION_ATTEMPTS                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id (UUID, PK)                                                                  │
│ user_id (UUID)                                                                 │
│ question_id (UUID, FK → questions.id)                                           │
│ selected_answer (TEXT)                                                          │
│ is_correct (BOOLEAN)                                                            │
│ time_spent (INTEGER)                                                            │
│ points_earned (INTEGER)                                                         │
│ attempt_number (INTEGER)                                                        │
│ created_at (TIMESTAMP)                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## **Relationship Summary:**

### **Primary Relationships:**

1. **Learning Plans** → **Plan Cards** (1:N) - Junction table for many-to-many
2. **Plan Cards** → **Learning Cards** (N:1) - Each plan can have multiple cards
3. **Learning Cards** → **Categories** (1:N) - Each card contains multiple categories
4. **Categories** → **Topics** (1:N) - Each category contains multiple topics
5. **Topics** → **Questions** (1:N) - Each topic contains multiple questions

### **Secondary Relationships:**

6. **Questions** → **Categories** (N:1) - Direct category assignment
7. **Questions** → **Learning Cards** (N:1) - Direct card assignment
8. **User Progress** → **Questions** (1:N) - Track user progress per question
9. **Question Attempts** → **Questions** (1:N) - Track individual attempts

### **Key Benefits:**

- **Normalized Structure**: No data duplication
- **Referential Integrity**: Foreign key constraints
- **Flexible Queries**: JOIN operations for complex queries
- **Scalable**: Proper indexing and performance optimization
- **ACID Compliance**: Strong consistency guarantees

### **Query Examples:**

```sql
-- Get all questions for a specific plan with full hierarchy
SELECT
  q.title,
  q.content,
  q.difficulty,
  t.name as topic_name,
  c.name as category_name,
  lc.title as card_title,
  lp.name as plan_name
FROM questions q
JOIN topics t ON q.topic_id = t.id
JOIN categories c ON t.category_id = c.id
JOIN learning_cards lc ON c.learning_card_id = lc.id
JOIN plan_cards pc ON lc.id = pc.card_id
JOIN learning_plans lp ON pc.plan_id = lp.id
WHERE lp.id = $1 AND q.is_active = true
ORDER BY pc.order_index, c.order_index, t.order_index, q.created_at;

-- Get user progress for a specific plan
SELECT
  lp.name as plan_name,
  lc.title as card_title,
  c.name as category_name,
  t.name as topic_name,
  q.title as question_title,
  up.status,
  up.score,
  up.time_spent,
  up.completed_at
FROM user_progress up
JOIN questions q ON up.question_id = q.id
JOIN topics t ON q.topic_id = t.id
JOIN categories c ON t.category_id = c.id
JOIN learning_cards lc ON c.learning_card_id = lc.id
JOIN learning_plans lp ON up.plan_id = lp.id
WHERE up.user_id = $1 AND up.plan_id = $2
ORDER BY up.created_at DESC;
```

This relational structure provides a solid foundation for your learning platform with proper data integrity, performance, and scalability! 🚀
