# Learning Plan Architecture Proposal: Spaced Repetition with Reviews

## Problem with Current Approach

- **Cumulative redundancy**: Questions repeat across 7 days unnecessarily
- **No learning feedback**: No indication of which questions need review
- **Artificial time-based structure**: 7-day plans don't reflect actual learning progression
- **Doesn't support mastery**: No path from foundations → advanced → maintenance

## Proposed Solution: Multi-Plan Spaced Repetition

### Plan Structure (3-4 Plans Per Topic)

#### Plan 1: Foundations

- **Title Format**: `{Topic}: Foundations`
- **Questions**: 10 (100% new)
- **Purpose**: Initial learning, cover 30-40% of topic depth
- **Example**: "Closures: Foundations"

#### Plan 2: Review & Deepen

- **Title Format**: `{Topic}: Review & Deepen`
- **Questions**: 10 total
  - 5 NEW questions (next 30% of topic)
  - 5 DIMMED REVIEW questions (strategically selected from Plan 1 - questions learner may struggle with)
- **Purpose**: Reinforce foundations + expand knowledge
- **Example**: "Closures: Review & Deepen"

#### Plan 3: Advanced Mastery

- **Title Format**: `{Topic}: Advanced Mastery`
- **Questions**: 12 total
  - 4 NEW questions (advanced patterns, edge cases)
  - 8 DIMMED REVIEW questions (hardest/most relevant from Plans 1-2)
- **Purpose**: Challenge understanding + solidify fundamentals
- **Example**: "Closures: Advanced Mastery"

#### Plan 4 (Optional): Weekly Check-in

- **Title Format**: `{Topic}: Weekly Check-in`
- **Questions**: 10 total
  - 2-3 NEW edge cases
  - 7-8 DIMMED REVIEW from all previous plans
- **Purpose**: Spaced maintenance, keep knowledge fresh
- **Example**: "Closures: Weekly Check-in"

### Database Schema Changes

#### learning_plans table additions:

```sql
ALTER TABLE learning_plans ADD COLUMN (
  plan_type VARCHAR(50) -- 'initial' | 'reinforcement' | 'advanced' | 'maintenance'
  new_question_count INTEGER,
  review_question_count INTEGER,
  display_label VARCHAR(255), -- "10 questions" or "5 new + 5 review"
  sequence_index INTEGER -- 1, 2, 3, 4 (plan order within topic)
);
```

#### plan_questions junction additions:

```sql
ALTER TABLE plan_questions ADD COLUMN (
  is_review BOOLEAN DEFAULT false, -- true = from previous plan
  parent_plan_id UUID, -- which plan this review Q came from
  difficulty_tier VARCHAR(50) -- 'easy' | 'medium' | 'hard'
);
```

### Seeding Algorithm

**For a topic with 30 total questions across 3 categories:**

```
Step 1: Group questions by difficulty tier
├─ Easy (Q1-Q10)
├─ Medium (Q11-Q20)
└─ Hard (Q21-Q30)

Step 2: Distribute across plans
├─ Plan 1 (Initial):        10q (spread across tiers)
├─ Plan 2 (Reinforce):      5 new + 5 review from Plan 1 (hardest in Plan 1)
├─ Plan 3 (Advanced):       4 new (hard) + 8 review from Plans 1-2 (hardest overall)
└─ Plan 4 (Check-in):       2-3 new + 7-8 review from all Plans (mixed difficulty)

Step 3: Mark reviews
├─ Plan 2 review Qs: is_review=true, parent_plan_id=Plan1.id
├─ Plan 3 review Qs: is_review=true, parent_plan_id=Plan1.id or Plan2.id
└─ Plan 4 review Qs: is_review=true, parent_plan_id=Plan1.id or Plan2.id or Plan3.id
```

### Frontend Display

**Plan Card (List View):**

```
┌────────────────────────────────┐
│ Closures: Review & Deepen [2/3] │
├────────────────────────────────┤
│ 5 new + 5 review         [10]   │
│                                │
│ Learn new patterns while        │
│ reinforcing fundamentals        │
│                                │
│ [Start Learning →]              │
│                                │
│ 🏷️  Topics: Scope, Binding      │
│ ⏱️  Est. 15-20 min              │
└────────────────────────────────┘
```

**During Quiz (Question Cards):**

```
Question 3 (NEW)
├─ [Normal blue styling]
└─ Question content...

Question 7 (REVIEW)
├─ [Dimmed gray styling + 📖 Review badge]
└─ This question appeared in "Closures: Foundations"
```

### Benefits

✅ **No redundancy** - Questions don't repeat unnecessarily  
✅ **Learning feedback** - Dimmed review questions show what to revisit  
✅ **Flexible progression** - Learners progress at their pace (3-4 plans vs 7 days)  
✅ **Spaced repetition** - Reviews are strategically timed  
✅ **Mastery path** - Clear progression: Foundations → Deepen → Advanced → Maintenance  
✅ **Scalable** - Works for 10Q or 100Q topics

### Category Distribution Example

**Topic: Closures (30 total questions)**

```
Category 1: Scope & Context (Q1-Q10)
├─ Plan 1: Q1,Q2,Q3,Q4,Q5 (first 5)
├─ Plan 2: Q6,Q7 (new) + review Q1,Q3,Q5 (hardest)
├─ Plan 3: Q8,Q9 (new) + review Q2,Q4,Q6,Q7
└─ Plan 4: Q10 (new) + review Q1,Q4,Q7 (maintenance)

Category 2: Closures & Memory (Q11-Q20)
├─ Plan 1: Q11,Q12,Q13,Q14,Q15
├─ Plan 2: Q16,Q17 (new) + review Q11,Q13,Q15
├─ Plan 3: Q18,Q19 (new) + review Q12,Q14,Q16,Q17
└─ Plan 4: Q20 (new) + review Q11,Q16,Q19

Category 3: Advanced Patterns (Q21-Q30)
├─ Plan 1: none
├─ Plan 2: none
├─ Plan 3: Q21,Q22,Q23,Q24 (all new) + review Q18,Q19,Q20
└─ Plan 4: Q25 (new) + review Q21,Q22,Q23,Q24
```

---

## Next Steps (Upon Approval)

1. ✅ Implement database schema migrations
2. ✅ Update seeder logic to generate 3-4 plans per topic
3. ✅ Mark `is_review` and `parent_plan_id` in plan_questions
4. ✅ Test with diverse topic question counts
5. ✅ Update frontend to display dimmed review questions
6. ✅ Add review badge/tooltip showing origin plan

---

## Approval Checklist

- [ ] Plan structure makes sense (3-4 plans instead of 7)
- [ ] Review questions + dimming provides good UX
- [ ] Category distribution approach is sound
- [ ] Database schema additions are appropriate
- [ ] Ready to implement seeder changes

**Proceed with implementation? (Y/N)**
