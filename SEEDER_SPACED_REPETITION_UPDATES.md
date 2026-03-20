# Seeder Updates: Spaced Repetition Architecture

## Overview

The learning plan seeding logic has been refactored from a 7-day cumulative approach to a 4-plan spaced repetition architecture focused on progressive learning with strategic reviews.

## Key Changes

### 1. New Plan Generation Functions

#### `generatePlanMetadata(planSequence, topicName)`

Generates metadata for each of the 4 plans:

**Plan 1: Foundations**

- 10 questions (100% new)
- Type: `initial`
- Purpose: Master fundamentals
- Display: "10 questions"

**Plan 2: Review & Deepen**

- 10 questions total (5 new + 5 review)
- Type: `reinforcement`
- Purpose: Expand knowledge + reinforce foundations
- Display: "5 new + 5 review"

**Plan 3: Advanced Mastery**

- 12 questions total (4 new + 8 review)
- Type: `advanced`
- Purpose: Advanced scenarios + target weak areas
- Display: "4 new + 8 review"

**Plan 4: Weekly Check-in**

- 10 questions total (2 new + 8 review)
- Type: `maintenance`
- Purpose: Spaced repetition to maintain knowledge
- Display: "2 new + 8 review"

#### `getDisplayLabel(newCount, reviewCount)`

Formats the question count display for frontend cards:

- "10 questions" (if no review)
- "5 new + 5 review" (if mixed)

#### `groupQuestionsByDifficulty(questions)`

Groups questions into three difficulty tiers:

- Easy (first third)
- Medium (middle third)
- Hard (final third)

Used to strategically select which questions appear as reviews in later plans.

### 2. Intelligent Question Distribution

**Plan 1 (Foundations)**

- ~10 questions spread across cards
- All new, progressive difficulty
- Covers foundations (easy → medium difficulty)

**Plan 2 (Review & Deepen)**

- 5 new questions (from where Plan 1 left off)
- 5 review questions (hardest from Plan 1)
- Mix reinforces weak areas while introducing new content

**Plan 3 (Advanced Mastery)**

- 4 new questions (advanced patterns/edge cases)
- 8 review questions (hardest overall from Plans 1-2)
- Focus on challenging fundamentals

**Plan 4 (Weekly Check-in)**

- 2-3 new "edge case" questions
- 7-8 review questions from all previous plans
- Mixed difficulty to maintain broad knowledge
- Includes unassigned questions

### 3. Database Schema Extensions

New fields added to `learning_plans` table:

```sql
plan_type VARCHAR(50)           -- 'initial' | 'reinforcement' | 'advanced' | 'maintenance'
sequence_index INTEGER          -- 1, 2, 3, or 4
new_question_count INTEGER      -- count of new questions in this plan
review_question_count INTEGER   -- count of review questions in this plan
display_label VARCHAR(255)      -- "10 questions" | "5 new + 5 review"
```

New fields added to `plan_questions` junction table:

```sql
is_review BOOLEAN               -- true if from previous plan
parent_plan_id UUID             -- references learning_plans.id of origin plan
difficulty_tier VARCHAR(50)     -- 'easy' | 'medium' | 'hard'
```

### 4. Seeding Algorithm Details

```javascript
// For each plan (1-4):
for (const planSeq of [1, 2, 3, 4]) {
  // 1. Create plan record with metadata
  const metadata = generatePlanMetadata(planSeq, topicName);

  // 2. Link ALL cards to the plan
  linkAllCardsToPlan(cardIds);

  // 3. Distribute questions based on plan type:
  //    - Plan 1: New questions from first 30% of range
  //    - Plan 2: New from next 30% + hardest reviews from Plan 1
  //    - Plan 3: New advanced + hardest from Plans 1-2
  //    - Plan 4: Final edge cases + mixed reviews from all

  // 4. Mark reviews with metadata:
  for (const reviewQuestion of reviewQuestions) {
    question.is_review = true;
    question.parent_plan_id = originPlan.id; // Trace back origin
    question.difficulty_tier = determinedTier;
  }

  // 5. Insert into plan_questions junction
}
```

## Benefits of New Approach

✅ **No Redundancy** - Questions don't repeat unnecessarily
✅ **Learning Feedback** - `is_review` flag indicates which topics to focus on
✅ **Flexible Progression** - 4 plans adapt to learner pace vs fixed 7 days
✅ **Spaced Repetition** - Reviews strategically placed in later plans
✅ **Mastery Path** - Clear progression: Foundations → Deepen → Advanced → Maintain
✅ **Scalable** - Works for 10 or 100 questions per topic
✅ **Traceable** - `parent_plan_id` shows where reviews came from

## Frontend Integration Points

### Plan List View

```jsx
<PlanCard
  title="Closures: Review & Deepen" // From metadata.title
  displayLabel="5 new + 5 review" // From display_label field
  completionPercentage={0}
  planType="reinforcement" // Visual styling cue
  sequence={2} // Show "2/4"
/>
```

### During Quiz

```jsx
<QuestionCard
  question={q}
  isReview={pq.is_review} // true = dimmed styling
  reviewBadge={pq.is_review ? `From: ${originPlan.title}` : null}
/>
```

## Testing Checklist

- [ ] Seeder creates 4 plans per topic ✅
- [ ] Plans named correctly (Foundations, Review & Deepen, Advanced, Check-in) ✅
- [ ] Question counts match expected distribution (10, 10, 12, 10) ✅
- [ ] `is_review` flag correctly set ✅
- [ ] `parent_plan_id` references valid origin plans ✅
- [ ] `difficulty_tier` populated appropriately ✅
- [ ] All cards linked to all plans ✅
- [ ] No duplicate questions within a single plan ✅
- [ ] Total questions across plans = 2-3x original count (no waste) ✅
- [ ] Questions from earlier difficulty tiers appear as reviews in later plans ✅

## Migration Notes

### For Existing Data

If migrating from cumulative 7-day plans:

```sql
-- Back up old plans
CREATE TABLE learning_plans_cumulative_backup AS
SELECT * FROM learning_plans WHERE status = 'published';

-- Remove old plans (keeping only new 4-plan structure)
DELETE FROM learning_plans WHERE plan_type IS NULL;
DELETE FROM learning_plans WHERE estimated_duration > 20;

-- Alternatively, run fresh seed
npm run seed
```

### Environment Requirements

- `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- Supabase database with tables: `learning_plans`, `plan_cards`, `plan_questions`
- Extended schema with new columns (see Database Schema Extensions above)

## Code Location

- **Seeder**: `tools/seed/seed-all.mjs` (lines ~95-350)
- **Plan Metadata**: `generatePlanMetadata()` function
- **Question Distribution**: Case statements in plan seeding loop (planSeq 1-4)
- **New Helper Functions**: `getDisplayLabel()`, `groupQuestionsByDifficulty()`

## Example Output

```
🧭 Seeding Learning Plans (Spaced Repetition)...
   ✅ Plan 1: JavaScript: Foundations
   ✅ Linked 10 questions to JavaScript: Foundations
   ✅ Plan 2: JavaScript: Review & Deepen
   ✅ Linked 10 questions to JavaScript: Review & Deepen
   ✅ Plan 3: JavaScript: Advanced Mastery
   ✅ Linked 12 questions to JavaScript: Advanced Mastery
   ✅ Plan 4: JavaScript: Weekly Check-in
   ✅ Linked 10 questions to JavaScript: Weekly Check-in

✨ Seeding completed!
```

## Future Enhancements

1. **Adaptive question selection** - Use actual difficulty scores instead of position-based grouping
2. **Learner performance tracking** - Select review questions based on past incorrect answers
3. **Multi-topic plans** - Create cross-topic review plans
4. **Randomized reviews** - Shuffle review questions to prevent pattern learning
5. **Difficulty ramping** - Dynamically adjust difficulty curve per learner
6. **Performance analytics** - Track which review questions improve retention most
