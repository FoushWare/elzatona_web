# Elzatona - Frontend Interview Preparation Platform 🚀

A comprehensive learning platform for frontend developers preparing for technical interviews. Master HTML, CSS, JavaScript, React, and system design with structured learning paths and admin-managed content.

## 🌐 Live Applications

- **Main Website**: [https://zatona-web.vercel.app](https://zatona-web.vercel.app)
- **Storybook (Component Library)**: [https://zatona-web-storybook.vercel.app](https://zatona-web-storybook.vercel.app)

## ✨ Key Features

### 🎯 **Guided-Freestyle Learning System**

- **No Sign-in Required**: Start learning immediately with simple onboarding
- **Two Learning Modes**:
  - **Guided Learning**: Structured plans with admin-managed content
  - **Free Style Learning**: Custom roadmaps and flexible scheduling
- **Smart Onboarding**: 3-step process to personalize your learning journey

### 📚 **Admin-Managed Learning Plans**

- **Four Main Categories**:
  - **Practice Questions**: HTML, CSS, JavaScript fundamentals
  - **Framework Mastery**: React, Next.js, Vue, Svelte, Angular
  - **Problem Solving**: Frontend algorithms and data structures
  - **System Design**: Design Facebook feeds, Twitter clone, e-commerce systems
- **Configurable Content**: Admin dashboard for managing plans and question counts
- **Time-Based Plans**: 1-7 day preparation schedules
- **Difficulty Levels**: Beginner, Intermediate, Advanced

### 🎨 **Beautiful User Experience**

- **Interactive Plan Cards**: Visual selection with category filtering
- **Progress Tracking**: Local storage for offline progress
- **Responsive Design**: Works perfectly on all devices
- **Dark Mode Support**: Seamless theme switching
- **Smooth Animations**: Engaging user interactions

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Context API
- **Icons**: Lucide React
- **Deployment**: Vercel ✅
- **Architecture**: Nx Monorepo with shared libraries
- **Code Quality**: ESLint, Prettier, Husky pre-commit hooks

## 📁 Project Structure

```
├── apps/                    # Applications
│   ├── web/                # Main web application
│   │   ├── app/            # Next.js App Router pages
│   │   │   ├── features/   # Feature-based pages
│   │   │   │   ├── learning/    # Learning pages
│   │   │   │   ├── practice/    # Practice pages
│   │   │   │   └── admin/       # Admin dashboard
│   │   │   └── auth/       # Authentication pages
│   │   └── components/     # App-specific components
│   └── admin/              # Admin application (future)
├── libs/                   # Shared libraries
│   ├── shared/            # Shared utilities and types
│   │   ├── types/         # TypeScript type definitions
│   │   ├── utils/         # Utility functions
│   │   ├── hooks/         # Custom React hooks
│   │   └── contexts/      # React contexts
│   └── ui/                # UI component library
│       └── src/components/ # Reusable UI components
├── Info/                   # Documentation and features
├── public/                 # Static assets
└── QuestionsBank/          # Question data sources
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd GreatFrontendHub
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run storybook` - Start Storybook for component development
- `npm run build-storybook` - Build Storybook for deployment

## 🎛 Admin Dashboard

The platform includes a comprehensive admin dashboard for managing learning content:

### Features

- **Plan Management**: Create, edit, and delete learning plans
- **Section Configuration**: Manage plan sections with custom question counts
- **Category Organization**: Organize content by Questions, Framework, Problem Solving, System Design
- **Real-time Statistics**: Track total plans, questions, and learning hours
- **Search & Filtering**: Find and manage content efficiently
- **Status Management**: Activate/deactivate plans as needed

### Access

- Navigate to `/admin/plans` to access the admin dashboard
- Full CRUD operations for all learning content
- Responsive design works on all devices

## 🏗 Learning System Architecture

### Onboarding Flow

1. **First Visit**: User sees onboarding modal with learning style selection
2. **Category Selection**: User chooses focus areas (Questions, Framework, etc.)
3. **Personalization**: User sets experience level and interview date
4. **Plan Display**: Admin-managed plans shown with category filtering
5. **Plan Selection**: User clicks on plan card to start learning

### Data Flow

- **Local Storage**: Progress saved locally (no sign-in required)
- **Admin Management**: Content managed through admin dashboard
- **Real-time Updates**: Plan changes reflect immediately
- **Category Filtering**: Dynamic content organization

### Component Architecture

- **Shared Libraries**: Reusable components and utilities
- **Type Safety**: Full TypeScript coverage
- **Context Management**: React Context for state management
- **Responsive Design**: Mobile-first approach with TailwindCSS

### Code Quality & Pre-commit Hooks

This project uses pre-commit hooks to ensure code quality:

- **Husky**: Manages Git hooks
- **lint-staged**: Runs linting and formatting only on staged files
- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting

The pre-commit hook will automatically:

1. Run ESLint with auto-fix on staged files
2. Format code with Prettier
3. Add the formatted files back to staging

**Note**: Make sure to run `npm install` after cloning to set up the pre-commit hooks.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── lib/                 # Utility functions and data
├── types/               # TypeScript type definitions
├── utils/               # Helper functions
├── hooks/               # Custom React hooks
└── data/                # Static data files
```

## 🎯 Development Roadmap

### Phase 1: Core Learning System ✅ (Completed)

- [x] **Guided-Freestyle Learning System**: Complete onboarding and learning mode selection
- [x] **Admin-Managed Plans**: Full CRUD operations for learning plans and sections
- [x] **Plan Categories**: Questions, Framework, Problem Solving, System Design
- [x] **Interactive UI**: Beautiful plan cards with category filtering
- [x] **No Sign-in Required**: Immediate access with local progress tracking
- [x] **Responsive Design**: Mobile-first design with dark mode support
- [x] **Nx Monorepo**: Organized codebase with shared libraries

### Phase 2: Practice & Content System (In Progress)

- [ ] **Practice Questions Engine**: Interactive question system with real-time feedback
- [ ] **Code Editor Integration**: Monaco Editor for coding challenges
- [ ] **Test Case Execution**: Automated testing and validation
- [ ] **Progress Analytics**: Detailed learning insights and performance tracking
- [ ] **Flashcard System**: Spaced repetition for difficult questions
- [ ] **Question Bank**: 500+ curated questions across all categories

### Phase 3: Advanced Features (Planned)

- [ ] **User Authentication**: Optional sign-in for cross-device sync
- [ ] **Custom Question Creation**: User-generated content with admin moderation
- [ ] **Community Features**: Question sharing and peer review
- [ ] **AI-Powered Recommendations**: Personalized learning suggestions
- [ ] **Gamification**: Badges, achievements, and leaderboards
- [ ] **Advanced Analytics**: Comprehensive reporting and insights

### Future Enhancements

- [ ] **Arabic Language Support**: Full internationalization (i18n) with RTL support
  - [ ] Translate all UI components and navigation
  - [ ] Translate practice questions and answers
  - [ ] Translate study plans and preparation guides
  - [ ] Implement RTL layout support
  - [ ] Add Arabic font support and typography
  - [ ] Create Arabic-specific content and examples

## 🌍 Arabic Language Support (Future Implementation)

GreatFrontendHub is designed to support Arabic language in the future. The current codebase includes:

### Current Implementation Status

- ✅ Translation infrastructure (`src/translations/` directory)
- ✅ Translation hook (`src/hooks/useTranslation.ts`)
- ✅ Language switcher component (`src/components/LanguageSwitcher.tsx`)
- ✅ RTL layout wrapper (`src/components/LayoutWrapper.tsx`)
- ✅ RTL CSS support in global styles
- ✅ Comprehensive English translations
- ✅ Comprehensive Arabic translations

### What's Ready for Arabic Support

1. **Translation System**: Complete i18n infrastructure with parameter support
2. **RTL Layout**: CSS classes and layout adjustments for right-to-left text
3. **Language Switching**: UI component to toggle between English and Arabic
4. **Content Translation**: All UI text, navigation, and static content translated
5. **Study Plans**: All study plan content available in Arabic
6. **Preparation Guides**: All preparation guide content translated

### What Needs to be Done

1. **Question Content**: Translate 500+ practice questions and their answers
2. **Interactive Content**: Translate internal resource questions and explanations
3. **Code Examples**: Provide Arabic comments and documentation for code examples
4. **Arabic-Specific Content**: Create content tailored to Arabic-speaking developers
5. **Testing**: Comprehensive testing of RTL layouts and Arabic text rendering
6. **Performance**: Optimize Arabic font loading and text rendering

### Technical Implementation Notes

- The translation system uses a JSON-based approach with nested keys
- RTL support is implemented through CSS classes and dynamic direction setting
- Language preference is stored in localStorage and URL parameters
- All components are designed to work with both LTR and RTL layouts
- Arabic translations are already prepared in `src/translations/ar.json`

### Getting Started with Arabic Support

When ready to implement Arabic support:

1. **Enable Language Switching**: Uncomment the language switcher in navigation
2. **Test RTL Layouts**: Verify all components work correctly in RTL mode
3. **Translate Questions**: Add Arabic translations for all practice questions
4. **Add Arabic Content**: Create Arabic-specific examples and explanations
5. **Test Performance**: Ensure Arabic fonts load efficiently
6. **User Testing**: Get feedback from Arabic-speaking developers

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Quick Start Guide

### For Learners

1. Visit the homepage - no signup required!
2. Complete the 3-step onboarding process
3. Choose your learning mode (Guided or Free Style)
4. Select your focus categories
5. Browse and select learning plans
6. Start your frontend interview preparation journey!

### For Admins

1. Navigate to `/admin/plans`
2. Create new learning plans with custom sections
3. Configure question counts and difficulty levels
4. Organize content by categories
5. Monitor usage statistics and plan performance

## 🆘 Support

If you have any questions or need help, please open an issue on GitHub or contact us at [support@elzatona.com](mailto:support@elzatona.com).

## 🎉 What's Next?

The platform is continuously evolving with new features and improvements. Check out our [development roadmap](#-development-roadmap) to see what's coming next!

---

**Happy Learning! 🚀📚**
