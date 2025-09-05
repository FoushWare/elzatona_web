# GitHub Repository About Section Setup

## Instructions to add deployment links to GitHub About section:

### 1. Go to your GitHub repository
- Navigate to: https://github.com/FoushWare/GreatFrontendHub

### 2. Click on the gear icon (⚙️) next to "About" on the right sidebar

### 3. Fill in the following information:

**Description:**
```
A platform for frontend developers to practice coding challenges and prepare for technical interviews. Master HTML, CSS, and JavaScript with hands-on projects and real-world scenarios.
```

**Website:**
```
https://great-frontend-ib73ljepe-foushwares-projects.vercel.app
```

**Topics (add these tags):**
```
frontend, react, nextjs, typescript, tailwindcss, coding-challenges, interview-prep, javascript, html, css, storybook, vercel
```

### 4. Click "Save changes"

## Alternative: Use GitHub CLI (if you have it installed)

```bash
gh repo edit FoushWare/GreatFrontendHub \
  --description "A platform for frontend developers to practice coding challenges and prepare for technical interviews. Master HTML, CSS, and JavaScript with hands-on projects and real-world scenarios." \
  --homepage "https://great-frontend-ib73ljepe-foushwares-projects.vercel.app" \
  --add-topic "frontend,react,nextjs,typescript,tailwindcss,coding-challenges,interview-prep,javascript,html,css,storybook,vercel"
```

## Result

After setup, your repository will show:
- ✅ Description in the About section
- ✅ Website link that goes to your main application
- ✅ Relevant topics for better discoverability
- ✅ Professional appearance for visitors

## Additional Links

You can also add these links to your README or create a separate "Links" section:

- **Main Website**: https://great-frontend-ib73ljepe-foushwares-projects.vercel.app
- **Storybook (Component Library)**: https://great-frontend-hub-storybook-e1uw1c7ci-foushwares-projects.vercel.app
