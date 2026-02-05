# 🚀 ZICO Workflow Quick Reference

**Your Assistant**: Zico (MoltBot)  
**Role**: Development Assistant  
**Project**: FoushWare/elzatona_web  
**Phase**: Refactoring

---

## 🌳 Git Workflow Visual

```
                    ┌─────────────────┐
                    │  MAIN (Prod)    │
                    │  Vercel Deploy  │
                    └────────┬────────┘
                             │
                      (Release PR)
                             │
                    ┌────────▼────────┐
                    │ DEVELOPMENT     │
                    │ (Integration)   │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
       ┌──▼──┐         ┌────▼─────┐         ┌──▼──┐
       │Fix  │         │ Refactor │         │ New  │
       │Bugs │         │ Features │         │Issues│
       └──┬──┘         └────┬─────┘         └──┬──┘
          │                 │                  │
          └─────────┬───────┴──────────────────┘
                    │
            (Feature PRs)
                    │
                    ▼
          ┌──────────────────┐
          │   Code Review    │
          │   & Testing      │
          └──────────────────┘
```

---

## 📝 Workflow Steps

### Step 1️⃣: Start with Development

```bash
Command: "checkout development"
Result: You're on development branch (main integration point)
```

### Step 2️⃣: Create Feature Branch

```bash
Command: "create branch refactor/component-structure"

Examples:
- refactor/database-abstraction
- refactor/api-routes
- refactor/ui-components
- fix/performance-issue
- feature/new-feature (after refactoring phase)
```

### Step 3️⃣: Make Changes & Commit

```bash
Command: "commit Refactor: Improve component organization"

Commit Message Format:
- "Refactor: [What changed]"
- "Fix: [What was fixed]"
- "Feat: [New feature]"
- "Perf: [Performance improvement]"

Examples:
- "Refactor: Simplify component props structure"
- "Fix: Improve TypeScript type safety"
- "Perf: Reduce re-render operations"
```

### Step 4️⃣: Push to Remote

```bash
Command: "push"
Result: Branch pushed to origin/[branch-name]
```

### Step 5️⃣: Create Pull Request

```bash
Command: "create pr Refactor: Component structure improvements"

Important: Target must be 'development' (NOT main)
- For feature branches → development
- For release branches → main (only at release time)
```

### Step 6️⃣: Code Review

```
- Wait for review approval
- Address feedback if requested
- Tests must be passing
- Vercel preview must be green
```

### Step 7️⃣: Merge to Development

```bash
- Once approved, merge PR
- Delete feature branch
- Continue with next refactoring task
```

### Step 8️⃣: Release Preparation (When Ready)

```bash
Command: "create branch release/v1.2.0"
Result: Release branch created from development
```

### Step 9️⃣: Release PR to Main

```bash
Command: "create pr Release: v1.2.0"
Target: main branch (this time!)
- Full testing completed
- All refactoring merged
- Ready for production
```

### Step 🔟: Deploy to Vercel

```
- Merge release PR to main
- Vercel auto-deploys
- Monitor production
```

---

## ⚡ Quick Commands Cheat Sheet

### Navigation

```
"checkout development"      → Go to dev (start point)
"checkout [branch-name]"    → Switch to any branch
"current branch"            → Show current branch
"list branches"             → Show all branches
```

### Creating

```
"create branch refactor/[name]"  → New refactor branch
"create branch feature/[name]"   → New feature (after refactoring)
"create branch fix/[name]"       → Bug fix branch
```

### Working

```
"commit [message]"          → Commit changes
"push"                      → Push to origin
"show commits"              → Recent commit history
"show structure"            → Repository folder layout
```

### Pull Requests

```
"create pr [Title]"         → Create PR (auto → development)
"show prs"                  → List open PRs
"pr [number]"               → View specific PR details
```

### Information

```
"show issues"               → List open issues
"repo status"               → Repository info
"status"                    → Is Zico working?
"help"                      → All commands
```

---

## 🎯 Refactoring Phase Checklist

For each refactoring task:

```
Pre-Start:
✅ Create branch from development
✅ Name follows pattern: refactor/[feature]
✅ Understand scope of changes
✅ Review refactoring manifesto

During Work:
✅ Commit frequently with clear messages
✅ Keep commits logical and focused
✅ Test locally as you go
✅ Don't break existing functionality

Before PR:
✅ All tests passing
✅ No console errors/warnings
✅ TypeScript strict mode satisfied
✅ Code is clean and documented
✅ Ready for review

After PR Creation:
✅ Wait for code review
✅ Address feedback promptly
✅ Verify Vercel preview is green
✅ Once approved, merge to development

After Merge:
✅ Feature branch deleted
✅ Move to next refactoring task
✅ Keep development stable
```

---

## 📊 Refactoring Progress Tracking

Ask Zico:

```
"show issues"               → See what needs refactoring
"show commits"              → Track what's done
"list branches"             → See in-progress work
"show structure"            → Verify organization
```

---

## 🚀 Release Workflow (When Complete)

When refactoring is done:

```
1. "create branch release/v1.2.0"
   Create release branch from development

2. Final testing & verification on Vercel preview

3. "create pr Release: v1.2.0"
   Create PR targeting main branch (not development!)

4. Final approval and merge to main

5. Vercel auto-deploys to production

6. Delete release branch

7. Start new issues/features phase
```

---

## ⚠️ Critical Rules (NEVER Break)

```
🔴 NEVER:
   ❌ Commit directly to main
   ❌ Create feature PR to main (only releases)
   ❌ Merge without review
   ❌ Force push without asking
   ❌ Work on main branch
   ❌ Skip testing before PR

🟢 ALWAYS:
   ✅ Start from development
   ✅ Create feature branches
   ✅ Target PRs to development
   ✅ Run tests locally
   ✅ Write clear commit messages
   ✅ Follow the workflow steps
```

---

## 🔄 Daily Workflow Example

**Morning: Start new refactoring**

```
You: "checkout development"
Zico: ✅ Switched to development

You: "create branch refactor/database-abstraction"
Zico: ✅ Branch created and checked out

You: (make code changes)
```

**Mid-Day: Commit progress**

```
You: "commit Refactor: Add database abstraction layer"
Zico: ✅ Changes committed

You: "push"
Zico: ✅ Pushed to origin
```

**End of Day: Create PR**

```
You: "create pr Refactor: Database abstraction improvements"
Zico: ✅ PR created targeting development branch

You: (wait for review)
```

**Next Day: After Review**

```
You: "show prs"
Zico: [Shows PR status - approved]

You: (merge when ready, continue with next task)
```

---

## 📈 Common Scenarios

### Scenario 1: Need to switch tasks

```
You: "checkout development"           → Back to main branch
You: "create branch refactor/[new]"   → Start new task
```

### Scenario 2: Forgot which branch you're on

```
You: "current branch"
Zico: "You are on: refactor/database-abstraction"
```

### Scenario 3: Need to see what you've done

```
You: "show commits"
Zico: [Shows recent commits with messages]
```

### Scenario 4: PR has conflicts

```
You: "checkout development"
You: "pull"
You: (resolve conflicts locally)
You: "commit Resolve merge conflicts"
You: "push"
```

### Scenario 5: Ready for release

```
You: "create branch release/v1.2.0"
You: (verify everything works)
You: "create pr Release: v1.2.0"    → Target: main!
```

---

## 🎓 Branch Naming Convention

```
Refactoring Phase:
refactor/database-abstraction
refactor/component-structure
refactor/api-routes
refactor/ui-components
refactor/type-safety
refactor/performance

After Refactoring:
feature/new-page
feature/user-dashboard
feature/analytics
fix/login-bug
fix/performance-issue
```

---

## ✅ Your Setup Checklist

Before you start:

```
[ ] Read ZICO_SETUP_PROMPT.md completely
[ ] Send the prompt to @HamadapilotBot
[ ] Wait for Zico to confirm readiness
[ ] Zico says "Ready to work as Zico!"
[ ] Bookmark this file (ZICO_WORKFLOW_QUICK_REFERENCE.md)
[ ] Have ZICO_SETUP_PROMPT.md ready for reference
[ ] Understand the git workflow above
[ ] Know the critical rules by heart
```

---

## 📞 Quick Help

**Stuck?** Ask Zico:

```
"help"              → All available commands
"show structure"    → See repository layout
"status"            → Check system status
"show prs"          → See current PRs
"show issues"       → See what needs work
```

---

## 🎯 Success Criteria

For each refactoring task, you've succeeded when:

```
✅ Feature branch created from development
✅ Changes made following manifesto principles
✅ All tests passing
✅ PR created targeting development
✅ Code reviewed and approved
✅ Merged to development
✅ Feature branch deleted
✅ Development branch remains stable
```

---

## 🚀 Next: Send the Setup Prompt

You're ready! Next step:

1. Open the file: **ZICO_SETUP_PROMPT.md**
2. Copy the complete prompt (the big section in ``` ````)
3. Open Telegram and message @HamadapilotBot
4. Paste the prompt
5. Wait for Zico to confirm: "Ready to work as Zico!"
6. Start with: "checkout development"

**Let's refactor! 🚀**

---

**Created**: February 5, 2026  
**For**: Foush (TechLead | Senior Frontend | DevOps)  
**Assistant**: Zico (MoltBot)  
**Project**: FoushWare/elzatona_web  
**Phase**: Refactoring
