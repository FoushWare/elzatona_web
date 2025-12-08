# Refactoring Analysis Report

Generated: 2025-12-08T04:30:01.941Z

## Summary

- **Total Files Analyzed:** 711
- **Files Needing Refactoring:** 248
- **Average Line Count:** 213
- **Average Functions per File:** 11

## Files Needing Refactoring

### Criteria
- Files with >300 lines
- Files with >3 responsibilities
- Files with >10 functions

### Top Priority Files

#### reactQuestions.ts
- **Path:** `apps/website/lib/reactQuestions.ts`
- **Lines:** 7941
- **Functions:** 575
- **Components:** 4
- **Responsibilities:** 5 (state, effects, api, events, rendering)
- **Imports:** 249
- **Exports:** 2

#### page.tsx
- **Path:** `apps/website/page-components/guided-practice/page.tsx`
- **Lines:** 3966
- **Functions:** 312
- **Components:** 0
- **Responsibilities:** 5 (state, effects, api, events, rendering)
- **Imports:** 11
- **Exports:** 1

#### page.tsx
- **Path:** `apps/website/page-components/free-style-practice/page.tsx`
- **Lines:** 3924
- **Functions:** 213
- **Components:** 0
- **Responsibilities:** 5 (state, effects, api, events, rendering)
- **Imports:** 4
- **Exports:** 1

#### page.tsx
- **Path:** `apps/website/page-components/admin/content-management/page.tsx`
- **Lines:** 3418
- **Functions:** 183
- **Components:** 1
- **Responsibilities:** 5 (state, effects, api, events, rendering)
- **Imports:** 12
- **Exports:** 3

#### page.tsx
- **Path:** `apps/website/page-components/custom-roadmap/page.tsx`
- **Lines:** 3113
- **Functions:** 118
- **Components:** 0
- **Responsibilities:** 5 (state, effects, api, events, rendering)
- **Imports:** 4
- **Exports:** 1

#### page.tsx
- **Path:** `apps/admin/pages/admin/content-management/page.tsx`
- **Lines:** 2311
- **Functions:** 69
- **Components:** 1
- **Responsibilities:** 5 (state, effects, api, events, rendering)
- **Imports:** 2
- **Exports:** 1

#### FrontendTaskEditor.tsx
- **Path:** `libs/components/src/lib/admin/FrontendTaskEditor.tsx`
- **Lines:** 1851
- **Functions:** 78
- **Components:** 0
- **Responsibilities:** 4 (state, effects, events, rendering)
- **Imports:** 2
- **Exports:** 1

#### route.ts
- **Path:** `apps/website/network/routes/questions/unified/route.ts`
- **Lines:** 1695
- **Functions:** 66
- **Components:** 0
- **Responsibilities:** 2 (api, rendering)
- **Imports:** 4
- **Exports:** 4

#### route.ts
- **Path:** `apps/website/network/routes/guided-learning/plan-details/[planId]/route.ts`
- **Lines:** 1676
- **Functions:** 88
- **Components:** 0
- **Responsibilities:** 1 (api)
- **Imports:** 2
- **Exports:** 1

#### ProblemSolvingQuestion.tsx
- **Path:** `apps/website/components/ProblemSolvingQuestion.tsx`
- **Lines:** 1572
- **Functions:** 97
- **Components:** 0
- **Responsibilities:** 5 (state, effects, api, events, rendering)
- **Imports:** 2
- **Exports:** 1

#### page.tsx
- **Path:** `apps/website/page-components/frontend-tasks/[id]/page.tsx`
- **Lines:** 1524
- **Functions:** 67
- **Components:** 0
- **Responsibilities:** 4 (state, effects, events, rendering)
- **Imports:** 5
- **Exports:** 5

#### page.tsx
- **Path:** `apps/website/page-components/admin/content/questions/page.tsx`
- **Lines:** 1497
- **Functions:** 122
- **Components:** 0
- **Responsibilities:** 5 (state, effects, api, events, rendering)
- **Imports:** 16
- **Exports:** 1

#### useTanStackQuery.ts
- **Path:** `libs/hooks/src/lib/useTanStackQuery.ts`
- **Lines:** 1479
- **Functions:** 125
- **Components:** 0
- **Responsibilities:** 2 (api, rendering)
- **Imports:** 3
- **Exports:** 69

#### ProblemSolvingEditor.tsx
- **Path:** `libs/components/src/lib/admin/ProblemSolvingEditor.tsx`
- **Lines:** 1349
- **Functions:** 46
- **Components:** 0
- **Responsibilities:** 4 (state, effects, events, rendering)
- **Imports:** 3
- **Exports:** 1

#### internalResources.ts
- **Path:** `apps/website/lib/internalResources.ts`
- **Lines:** 1327
- **Functions:** 43
- **Components:** 0
- **Responsibilities:** 4 (state, effects, api, rendering)
- **Imports:** 9
- **Exports:** 16

#### QuestionForm.tsx
- **Path:** `apps/website/page-components/admin/content/questions/components/QuestionForm.tsx`
- **Lines:** 1313
- **Functions:** 41
- **Components:** 0
- **Responsibilities:** 4 (state, effects, events, rendering)
- **Imports:** 2
- **Exports:** 1

#### QuestionForm.tsx
- **Path:** `apps/website/src/app/admin/content/questions/components/QuestionForm.tsx`
- **Lines:** 1313
- **Functions:** 41
- **Components:** 0
- **Responsibilities:** 4 (state, effects, events, rendering)
- **Imports:** 2
- **Exports:** 1

#### BulkUploadForm.tsx
- **Path:** `apps/website/page-components/admin/content/questions/components/BulkUploadForm.tsx`
- **Lines:** 1262
- **Functions:** 95
- **Components:** 0
- **Responsibilities:** 4 (state, effects, events, rendering)
- **Imports:** 3
- **Exports:** 1

#### BulkUploadForm.tsx
- **Path:** `apps/website/src/app/admin/content/questions/components/BulkUploadForm.tsx`
- **Lines:** 1262
- **Functions:** 95
- **Components:** 0
- **Responsibilities:** 4 (state, effects, events, rendering)
- **Imports:** 3
- **Exports:** 1

#### BulkQuestionUploader.tsx
- **Path:** `libs/components/src/lib/common/BulkQuestionUploader.tsx`
- **Lines:** 1164
- **Functions:** 37
- **Components:** 0
- **Responsibilities:** 4 (state, effects, events, rendering)
- **Imports:** 3
- **Exports:** 1

#### Navbar.tsx
- **Path:** `libs/components/src/lib/common/Navbar.tsx`
- **Lines:** 1152
- **Functions:** 10
- **Components:** 0
- **Responsibilities:** 4 (state, effects, events, rendering)
- **Imports:** 6
- **Exports:** 1

#### CodeEditor.tsx
- **Path:** `apps/website/components/CodeEditor.tsx`
- **Lines:** 1128
- **Functions:** 58
- **Components:** 0
- **Responsibilities:** 5 (state, effects, api, events, rendering)
- **Imports:** 2
- **Exports:** 1

#### resources.ts
- **Path:** `apps/website/lib/resources.ts`
- **Lines:** 1106
- **Functions:** 9
- **Components:** 0
- **Responsibilities:** 2 (api, rendering)
- **Imports:** 2
- **Exports:** 8

#### QuestionContent.tsx
- **Path:** `libs/components/src/lib/QuestionContent.tsx`
- **Lines:** 1085
- **Functions:** 89
- **Components:** 0
- **Responsibilities:** 1 (rendering)
- **Imports:** 3
- **Exports:** 3

#### TopicManager.tsx
- **Path:** `libs/components/src/lib/common/TopicManager.tsx`
- **Lines:** 1077
- **Functions:** 38
- **Components:** 0
- **Responsibilities:** 5 (state, effects, api, events, rendering)
- **Imports:** 9
- **Exports:** 3

#### ViewQuestionModal.tsx
- **Path:** `apps/website/page-components/admin/content/questions/components/ViewQuestionModal.tsx`
- **Lines:** 1039
- **Functions:** 89
- **Components:** 0
- **Responsibilities:** 4 (state, effects, events, rendering)
- **Imports:** 4
- **Exports:** 1

#### ViewQuestionModal.tsx
- **Path:** `apps/website/src/app/admin/content/questions/components/ViewQuestionModal.tsx`
- **Lines:** 1039
- **Functions:** 89
- **Components:** 0
- **Responsibilities:** 4 (state, effects, events, rendering)
- **Imports:** 4
- **Exports:** 1

#### studyPlans.ts
- **Path:** `apps/website/lib/studyPlans.ts`
- **Lines:** 1028
- **Functions:** 5
- **Components:** 0
- **Responsibilities:** 2 (state, effects)
- **Imports:** 1
- **Exports:** 5

#### page.tsx
- **Path:** `apps/website/page-components/features/guided-learning/page.tsx`
- **Lines:** 1026
- **Functions:** 62
- **Components:** 0
- **Responsibilities:** 5 (state, effects, api, events, rendering)
- **Imports:** 4
- **Exports:** 1

#### website-features.ts
- **Path:** `apps/website/lib/website-features.ts`
- **Lines:** 948
- **Functions:** 17
- **Components:** 0
- **Responsibilities:** 0 ()
- **Imports:** 2
- **Exports:** 9

#### page.tsx
- **Path:** `apps/website/page-components/admin/frontend-tasks/page.tsx`
- **Lines:** 939
- **Functions:** 34
- **Components:** 0
- **Responsibilities:** 5 (state, effects, api, events, rendering)
- **Imports:** 3
- **Exports:** 1

#### learning-resources-service.ts
- **Path:** `apps/website/lib/learning-resources-service.ts`
- **Lines:** 922
- **Functions:** 19
- **Components:** 0
- **Responsibilities:** 2 (api, rendering)
- **Imports:** 0
- **Exports:** 3

#### section-service.ts
- **Path:** `apps/website/lib/section-service.ts`
- **Lines:** 914
- **Functions:** 43
- **Components:** 0
- **Responsibilities:** 1 (rendering)
- **Imports:** 2
- **Exports:** 6

#### EnhancedDashboard.tsx
- **Path:** `libs/components/src/lib/common/EnhancedDashboard.tsx`
- **Lines:** 830
- **Functions:** 32
- **Components:** 0
- **Responsibilities:** 5 (state, effects, api, events, rendering)
- **Imports:** 4
- **Exports:** 1

#### NavbarSimple.tsx
- **Path:** `apps/website/components/NavbarSimple.tsx`
- **Lines:** 812
- **Functions:** 16
- **Components:** 1
- **Responsibilities:** 4 (state, effects, events, rendering)
- **Imports:** 10
- **Exports:** 2

#### EnhancedUserDashboard.tsx
- **Path:** `libs/components/src/lib/common/EnhancedUserDashboard.tsx`
- **Lines:** 784
- **Functions:** 11
- **Components:** 0
- **Responsibilities:** 4 (state, effects, events, rendering)
- **Imports:** 6
- **Exports:** 1

#### page.tsx
- **Path:** `apps/website/page-components/flashcards/page.tsx`
- **Lines:** 781
- **Functions:** 31
- **Components:** 0
- **Responsibilities:** 5 (state, effects, api, events, rendering)
- **Imports:** 2
- **Exports:** 1

#### AdvancedSearch.tsx
- **Path:** `libs/components/src/lib/components/common/AdvancedSearch.tsx`
- **Lines:** 747
- **Functions:** 30
- **Components:** 0
- **Responsibilities:** 5 (state, effects, api, events, rendering)
- **Imports:** 7
- **Exports:** 1

#### unified-question-schema.ts
- **Path:** `libs/types/src/lib/unified-question-schema.ts`
- **Lines:** 739
- **Functions:** 21
- **Components:** 0
- **Responsibilities:** 1 (rendering)
- **Imports:** 1
- **Exports:** 18

#### unified-question-schema.ts
- **Path:** `apps/website/lib/unified-question-schema.ts`
- **Lines:** 733
- **Functions:** 21
- **Components:** 0
- **Responsibilities:** 1 (rendering)
- **Imports:** 1
- **Exports:** 18

#### QuestionForm.tsx
- **Path:** `apps/admin/pages/admin/content/questions/components/QuestionForm.tsx`
- **Lines:** 732
- **Functions:** 11
- **Components:** 1
- **Responsibilities:** 4 (state, effects, events, rendering)
- **Imports:** 1
- **Exports:** 2

#### QuestionForm.tsx
- **Path:** `apps/admin/src/app/admin/content/questions/components/QuestionForm.tsx`
- **Lines:** 732
- **Functions:** 11
- **Components:** 1
- **Responsibilities:** 4 (state, effects, events, rendering)
- **Imports:** 1
- **Exports:** 2

#### markdown-question-parser.ts
- **Path:** `apps/website/lib/markdown-question-parser.ts`
- **Lines:** 698
- **Functions:** 60
- **Components:** 0
- **Responsibilities:** 0 ()
- **Imports:** 1
- **Exports:** 4

#### codingChallenges.ts
- **Path:** `apps/website/lib/codingChallenges.ts`
- **Lines:** 693
- **Functions:** 40
- **Components:** 0
- **Responsibilities:** 0 ()
- **Imports:** 0
- **Exports:** 5

#### useUnifiedQuestions.ts
- **Path:** `libs/hooks/src/lib/useUnifiedQuestions.ts`
- **Lines:** 683
- **Functions:** 50
- **Components:** 0
- **Responsibilities:** 4 (state, effects, api, rendering)
- **Imports:** 1
- **Exports:** 1

#### swagger-config.ts
- **Path:** `apps/website/lib/swagger-config.ts`
- **Lines:** 681
- **Functions:** 1
- **Components:** 0
- **Responsibilities:** 0 ()
- **Imports:** 0
- **Exports:** 1

#### preparationGuides.ts
- **Path:** `apps/website/lib/preparationGuides.ts`
- **Lines:** 658
- **Functions:** 4
- **Components:** 0
- **Responsibilities:** 2 (state, effects)
- **Imports:** 0
- **Exports:** 6

#### TanStackContentManagement.tsx
- **Path:** `apps/website/components/TanStackContentManagement.tsx`
- **Lines:** 657
- **Functions:** 41
- **Components:** 1
- **Responsibilities:** 3 (state, events, rendering)
- **Imports:** 6
- **Exports:** 2

#### seniorInterviewQA.ts
- **Path:** `apps/website/lib/seniorInterviewQA.ts`
- **Lines:** 655
- **Functions:** 30
- **Components:** 1
- **Responsibilities:** 5 (state, effects, api, events, rendering)
- **Imports:** 23
- **Exports:** 7

#### NavbarSimple.tsx
- **Path:** `libs/components/src/lib/common/NavbarSimple.tsx`
- **Lines:** 653
- **Functions:** 14
- **Components:** 1
- **Responsibilities:** 4 (state, effects, events, rendering)
- **Imports:** 9
- **Exports:** 2

