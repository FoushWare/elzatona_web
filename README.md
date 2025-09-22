# GreatFrontendHub 🚀

A platform for frontend developers to practice coding challenges and prepare for technical interviews. Master HTML, CSS, and JavaScript with hands-on projects and real-world scenarios.

## 🌐 Live Applications

- **Main Website**: [https://zatona-web.vercel.app](https://zatona-web.vercel.app)
- **Storybook (Component Library)**: [https://zatona-web-storybook.vercel.app](https://zatona-web-storybook.vercel.app)

## ✨ Features

- **Open Access**: No signup required - start practicing immediately
- **Coding Challenges**: HTML, CSS, and JavaScript challenges with varying difficulty levels
- **In-Browser Editor**: Write, test, and preview code directly in your browser
- **Live Preview**: See your code changes in real-time
- **Test Cases**: Automated testing to validate your solutions
- **Expert Solutions**: Detailed explanations and best practices for each challenge
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Code Editor**: Monaco Editor (planned)
- **Deployment**: Vercel ✅
- **Monitoring**: Sentry (planned)

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

### Sprint 1 (Weeks 1-3) - Core Foundation & Challenge Library ✅

- [x] Project setup with Next.js and TailwindCSS
- [x] Basic project structure and TypeScript configuration
- [x] Homepage with categories and featured challenges
- [x] Challenge listing page with filters
- [x] Challenge detail pages
- [x] Practice questions database (500+ questions from greatfrontend.com)
- [x] Study plans system (1-week, 1-month, 3-month plans)
- [x] Preparation guides (Frontend Playbook, GFE75, Blind75, System Design)
- [x] Learning progress tracker
- [x] Internal resources with interactive questions
- [ ] Admin interface for challenge management

### Sprint 2 (Weeks 4-6) - Code Editor & Execution

- [ ] Monaco Editor integration
- [ ] Live preview pane
- [ ] Test case execution system
- [ ] Code reset functionality
- [ ] Starter code templates
- [ ] Search functionality
- [ ] Question detail pages with solutions

### Sprint 3 (Weeks 7-9) - Solutions, Explanations & Deployment

- [ ] Solution display system
- [ ] Detailed explanations
- [ ] Solution comparison view
- [ ] Responsive design implementation
- [ ] Dark/light mode toggle
- [x] Vercel deployment ✅
- [ ] CI/CD pipeline
- [ ] Monitoring integration

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

## 🆘 Support

If you have any questions or need help, please open an issue on GitHub or contact us at [support@greatfrontendhub.com](mailto:support@greatfrontendhub.com).

---

**Happy Coding! 🎉**
# Git Hooks Setup Complete
