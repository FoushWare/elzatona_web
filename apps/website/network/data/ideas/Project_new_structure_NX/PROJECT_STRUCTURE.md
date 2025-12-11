# Tawuniya Sales - DH Sales V3 Project Structure

## Overview

This is an **Nx monorepo** workspace containing multiple insurance sales applications built with React, TypeScript, and Vite.

**Workspace Name:** `tawuniya-sales`  
**Nx Version:** 15.8.9  
**Package Manager:** npm/yarn  
**Build Tool:** Vite  
**Framework:** React 18.2.0

---

## Root Directory Structure

```
dh-sales-v3/
├── apps/                    # Application projects (43 insurance apps)
├── libs/                    # Shared libraries (5 libraries)
├── tools/                   # Build and development tools
├── dist/                    # Build output directory
├── node_modules/            # Dependencies
├── docs/                    # Documentation
├── .vscode/                 # VS Code configuration
├── .git/                    # Git repository
├── nx.json                  # Nx workspace configuration
├── package.json             # Root package dependencies and scripts
├── tsconfig.base.json       # Base TypeScript configuration
├── .eslintrc.json           # ESLint configuration
├── .prettierrc              # Prettier configuration
└── README.md                # Project documentation
```

---

## Nx Configuration

### nx.json

- **NPM Scope:** `@tawuniya-sales`
- **Default Base Branch:** `master`
- **Task Runner:** `nx/tasks-runners/default`
- **Cacheable Operations:** build, lint, test, e2e
- **Generators:** Configured for React with Vite bundler

### Target Defaults

- **build:** Depends on dependencies' build
- **e2e:** Uses default and production inputs
- **test:** Uses default and production inputs
- **lint:** Uses ESLint configuration

---

## Applications (apps/)

The workspace contains **43 insurance applications**. Each application follows a similar structure with its own configuration, source code, and assets.

```
apps/
├── motor/                          # Motor insurance (detailed below)
├── motor-sme/                      # Motor SME insurance
├── motor-upgrade/                  # Motor upgrade
├── mbi/                            # Medical Basic Insurance
├── medicalsme/                     # Medical SME
├── medicalsme-crm/                 # Medical SME CRM
├── home-insurance/                 # Home insurance
├── domestic-worker/                # Domestic worker insurance
├── travel-insurance/               # Travel insurance
├── visit-visa/                     # Visit visa insurance
├── property-and-casualty-360/      # Property & casualty
├── marine-tpl/                     # Marine TPL
├── marine-single-shipment/         # Marine single shipment
├── medical-malpractice/            # Medical malpractice
├── surplus/                        # Surplus insurance
├── parents-insurance/              # Parents insurance
├── my-family-insurance/            # Family insurance
├── drive-registration/             # Drive registration
├── premium-residency/              # Premium residency
├── unified-sme/                    # Unified SME
├── one-page-payment/               # One page payment
├── unified-payment/                # Unified payment
├── payment-page/                   # Payment page
├── vfs/                            # VFS integration
├── tawuniya-care-survey/           # Care survey
├── welcome-kit/                    # Welcome kit
├── partnerships-landing/           # Partnerships landing
├── nourah/                         # Nourah
├── cross-border/                   # Cross border
├── flex/                           # Flex insurance
├── income-protection-insurance/    # Income protection
├── claims/                         # Claims processing
├── consultants/                    # Consultants insurance
├── sports-insurance/               # Sports insurance
├── amazon-warranty/                # Amazon warranty
├── inherent-defects-insurance/     # Inherent defects
├── tawuniya-dare/                  # Dare program
├── dnata/                          # Dnata integration
├── civil-liability/                # Civil liability
├── tele/                           # Tele insurance
├── urban-mobility-claim/           # Urban mobility claim
├── general-payment/                # General payment
└── mbi-claims-nr/                  # MBI claims
```

---

## Motor Application Structure (apps/motor/)

### Root Files

```
apps/motor/
├── index.html              # HTML entry point
├── project.json            # Nx project configuration
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── tsconfig.app.json       # App-specific TypeScript config
├── tsconfig.spec.json      # Test TypeScript config
└── public/                 # Static assets
    ├── WEB-INF/           # Web application configuration
    ├── favicon.ico
    ├── apple-touch-icon.ico
    ├── robots.txt
    ├── sitemap.xml
    ├── arabic.xml
    └── english.xml
```

### Source Structure (src/)

```
src/
├── main.tsx                # Application entry point
├── i18n.ts                 # i18next configuration
├── react-i18next.d.ts      # i18next TypeScript definitions
├── styles.css              # Global styles
├── app/                    # Main application code
│   ├── app.tsx            # Root App component
│   ├── store.ts           # Redux store configuration
│   ├── reduxHooks.ts      # Typed Redux hooks
│   ├── Components/        # React components
│   ├── Pages/             # Page components
│   ├── Router/            # Routing configuration
│   ├── Redux/             # Redux slices and state
│   ├── Network/           # API calls and services
│   └── utils/             # Utility functions
└── assets/                # Application assets
    ├── fonts/             # Font files
    ├── icons/             # Icon assets (500+ car brand SVGs)
    └── locales/           # Translation files
        ├── ar/            # Arabic translations
        │   └── translation.json
        └── en/            # English translations
            └── translation.json
```

### Motor App Components (src/app/Components/)

```
Components/
├── AddAdditionalDriver/        # Add driver component
├── AddVehicle/                 # Add vehicle component
├── AdditionalCoverageCard/     # Coverage card component
├── BusinessLineBanner/         # Business line banner
├── CARZBanner/                 # CARZ integration banner
├── CoverageAccordion/          # Coverage accordion
├── CoverageDetails/            # Coverage details display
├── DatePicker/                 # Custom date picker
├── DeclarationOfExposure/      # Exposure declaration
├── DriverDetails/              # Driver details form
├── ErrorBoundary/              # Error boundary component
├── Footer/                     # Footer component
├── Header/                     # Header component
├── InsuranceCard/              # Insurance card display
├── PaymentSummary/             # Payment summary
├── PolicyCard/                 # Policy card component
├── QuoteCard/                  # Quote card display
├── VehicleCard/                # Vehicle card component
└── ... (more components)
```

### Motor App Pages (src/app/Pages/)

```
Pages/
├── HomePage/                   # Landing page
├── VehicleInformation/         # Vehicle info page
├── DriverInformation/          # Driver info page
├── QuotationPage/              # Quotation display
├── CoveragePage/               # Coverage selection
├── PaymentPage/                # Payment processing
├── ConfirmationPage/           # Order confirmation
├── PolicyDetailsPage/          # Policy details
└── ... (more pages)
```

### Motor App Redux (src/app/Redux/)

```
Redux/
├── slices/                     # Redux Toolkit slices
│   ├── vehicleSlice.ts
│   ├── driverSlice.ts
│   ├── quotationSlice.ts
│   ├── coverageSlice.ts
│   ├── paymentSlice.ts
│   └── ... (more slices)
└── types/                      # Redux type definitions
```

### Motor App Network (src/app/Network/)

```
Network/
├── api.ts                      # API client configuration
├── endpoints.ts                # API endpoint definitions
├── vehicleService.ts           # Vehicle-related APIs
├── quotationService.ts         # Quotation APIs
├── paymentService.ts           # Payment APIs
└── ... (more services)
```

### Motor App Router (src/app/Router/)

```
Router/
├── index.tsx                   # Main router configuration
├── routes.ts                   # Route definitions
├── PrivateRoute.tsx            # Protected route component
└── RouteGuard.tsx              # Route guard logic
```

### Motor App Utils (src/app/utils/)

```
utils/
├── constants.ts                # Application constants
├── helpers.ts                  # Helper functions
├── validators.ts               # Form validators
├── formatters.ts               # Data formatters
└── ... (more utilities)
```

---

## Shared Libraries (libs/)

The workspace includes **5 shared libraries** used across applications:

### 1. assets/ (1555 items)

Shared assets library containing images, icons, illustrations, and locales.

```
libs/assets/
├── src/
│   ├── Images/                 # Shared images
│   ├── icons/                  # Icon library
│   ├── illustrations/          # Illustration assets
│   ├── kycUtils/               # KYC utilities
│   ├── locales/                # Shared translations
│   └── index.ts                # Barrel export
├── package.json
├── project.json
├── tsconfig.json
├── tsconfig.lib.json
├── vite.config.ts
└── sample.xlsx                 # Sample Excel file
```

### 2. common-ui/ (345 items)

Shared UI components library with reusable React components.

```
libs/common-ui/
├── src/
│   ├── Components/             # Reusable UI components
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Card/
│   │   ├── Dropdown/
│   │   ├── Loader/
│   │   ├── Toast/
│   │   └── ... (more components)
│   ├── Layouts/                # Layout components
│   │   ├── MainLayout/
│   │   ├── AuthLayout/
│   │   └── ... (more layouts)
│   ├── Providers/              # Context providers
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeContextProvider.tsx
│   │   └── ... (more providers)
│   ├── Types/                  # Shared TypeScript types
│   ├── utils/                  # Utility functions
│   │   ├── constants.ts
│   │   └── ... (more utils)
│   └── index.ts                # Barrel export
├── package.json
├── project.json
├── tsconfig.json
├── tsconfig.lib.json
└── vite.config.ts
```

### 3. theme/ (64 items)

Theme configuration and styling utilities.

```
libs/theme/
├── src/
│   ├── colors.ts               # Color palette
│   ├── typography.ts           # Typography settings
│   ├── spacing.ts              # Spacing system
│   ├── breakpoints.ts          # Responsive breakpoints
│   └── index.ts                # Theme export
├── package.json
├── project.json
├── tsconfig.json
├── tsconfig.lib.json
└── vite.config.ts
```

### 4. hooks/ (24 items)

Shared React hooks library.

```
libs/hooks/
├── src/
│   ├── lib/
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useClickOutside.ts
│   │   └── ... (more hooks)
│   └── index.ts                # Barrel export
├── package.json
├── project.json
├── tsconfig.json
└── tsconfig.lib.json
```

### 5. firebase/ (8 items)

Firebase integration library.

```
libs/firebase/
├── src/
│   ├── lib/
│   │   ├── config.ts           # Firebase configuration
│   │   ├── auth.ts             # Authentication
│   │   ├── firestore.ts        # Firestore utilities
│   │   └── analytics.ts        # Analytics
│   └── index.ts                # Barrel export
├── package.json
├── project.json
├── tsconfig.json
└── tsconfig.lib.json
```

---

## Tools & Scripts (tools/)

```
tools/
├── scripts/                    # Build and deployment scripts
└── templates/                  # Project templates
    └── react-app/              # React app template
        ├── public/
        │   └── WEB-INF/
        └── src/
            ├── app/
            │   ├── Network/
            │   ├── Router/
            │   └── Utils/
            └── assets/
                ├── fonts/
                │   └── tawuniya/
                └── locales/
                    ├── ar/
                    └── en/
```

---

## Key Technologies & Dependencies

### Core Framework

- **React:** 18.2.0
- **React DOM:** 18.2.0
- **React Router DOM:** ^6.9.0
- **TypeScript:** ~4.9.5

### State Management

- **Redux Toolkit:** ^1.9.5
- **React Redux:** ^8.0.5

### UI & Styling

- **Material-UI (MUI):** ^5.16.9
- **Emotion:** ^11.13.5
- **Tailwind CSS:** ^3.4.17

### Form Handling

- **React Hook Form:** ^7.51.5

### Internationalization

- **i18next:** ^22.4.13
- **react-i18next:** ^12.2.0
- **i18next-browser-languagedetector:** ^7.0.1
- **i18next-http-backend:** ^2.2.0

### Date & Time

- **dayjs:** ^1.11.7
- **moment:** ^2.30.1
- **@mui/x-date-pickers:** ^6.4.0

### API & HTTP

- **axios:** ^1.4.0

### Maps & Location

- **@react-google-maps/api:** ^2.18.1
- **use-places-autocomplete:** ^4.0.0

### Charts & Visualization

- **chart.js:** ^4.4.8
- **react-chartjs-2:** ^5.3.0

### File Handling

- **exceljs:** ^4.4.0
- **file-saver:** ^2.0.5
- **xlsx:** ^0.18.5

### Security & Validation

- **crypto-js:** ^4.1.1
- **ajv:** ^8.17.1
- **react-google-recaptcha-v3:** ^1.10.1

### Payment Integration

- **frames-react:** ^1.1.0

### Firebase

- **firebase:** ^11.8.1

### Utilities

- **lodash:** ^4.17.21
- **uuid:** ^11.1.0

### Build Tools

- **Vite:** ^4.0.1
- **Nx:** 15.8.9
- **@nrwl/react:** 15.8.9
- **@nrwl/vite:** 15.8.9

### Testing

- **Vitest:** ^0.25.8
- **@testing-library/react:** 14.0.0
- **jsdom:** ~20.0.3

### Code Quality

- **ESLint:** ~8.15.0
- **Prettier:** ^2.6.2
- **TypeScript ESLint:** ^5.36.1

---

## Build & Development Scripts

### Motor Application Scripts

```bash
# Development
npm run motor                           # Start dev server

# Build
npm run motor:build                     # Development build
npm run motor:build:qa                  # QA build
npm run motor:build:uat                 # UAT build
npm run motor:build:beta                # Beta build
```

### Other Application Scripts

Each application follows the same pattern:

```bash
npm run <app-name>                      # Start dev server
npm run <app-name>:build                # Development build
npm run <app-name>:build:qa             # QA build
npm run <app-name>:build:uat            # UAT build
npm run <app-name>:build:beta           # Beta build
npm run <app-name>:build:production     # Production build (if available)
```

---

## Nx Workspace Benefits

### 1. **Code Sharing**

- Shared libraries (`common-ui`, `assets`, `hooks`, `theme`, `firebase`)
- Reusable components across applications
- Centralized configuration

### 2. **Build Optimization**

- Incremental builds
- Computation caching
- Parallel execution
- Affected command for targeted builds

### 3. **Dependency Graph**

- Visual representation of project dependencies
- Impact analysis for changes
- Better understanding of project structure

### 4. **Consistent Tooling**

- Unified build system (Vite)
- Shared ESLint and Prettier configuration
- Consistent TypeScript configuration

### 5. **Scalability**

- Easy to add new applications
- Shared libraries promote DRY principles
- Independent deployment of applications

---

## Project Conventions

### File Naming

- **Components:** PascalCase (e.g., `AddVehicle.tsx`)
- **Utilities:** camelCase (e.g., `helpers.ts`)
- **Styles:** `styles.ts` or `styles.css`
- **Types:** `types.ts`

### Directory Structure

- Each component has its own directory
- Component directory contains: component file, styles, and types
- Barrel exports (`index.ts`) for cleaner imports

### TypeScript

- Strict mode enabled
- Type definitions in separate `types.ts` files
- Shared types in `libs/common-ui/src/Types/`

### Styling

- Material-UI components
- Emotion for styled components
- Tailwind CSS for utility classes
- CSS modules for component-specific styles

### Internationalization

- Arabic and English support
- Translation files in `assets/locales/`
- i18next for runtime translation

---

## Environment Configuration

### Environment Files

- `.env` - Environment variables
- Configuration per environment (dev, qa, uat, beta, production)

### Build Configurations

Each application has multiple build configurations in `project.json`:

- **development** - Local development
- **qa** - QA environment
- **uat** - UAT environment
- **beta** - Beta environment
- **production** - Production environment

---

## Deployment

### Build Output

- Built files are generated in `dist/` directory
- Each application has its own build output folder
- Static assets are copied to build output

### Web Server Configuration

- `public/WEB-INF/` contains web server configuration
- `robots.txt` for SEO
- `sitemap.xml` for search engines
- Language-specific XML files (arabic.xml, english.xml)

---

## Development Workflow

1. **Start Development Server**

   ```bash
   npm run motor
   ```

2. **Make Changes**
   - Edit files in `apps/motor/src/`
   - Hot module replacement (HMR) updates automatically

3. **Build for Testing**

   ```bash
   npm run motor:build:qa
   ```

4. **Deploy**
   - Build output in `dist/apps/motor/`
   - Deploy to target environment

---

## Best Practices

### Component Development

- Keep components small and focused
- Use TypeScript for type safety
- Implement proper error boundaries
- Write reusable components in `libs/common-ui/`

### State Management

- Use Redux Toolkit for global state
- Use React hooks for local state
- Keep Redux slices focused and modular

### API Integration

- Centralize API calls in `Network/` directory
- Use axios interceptors for common logic
- Handle errors consistently

### Performance

- Lazy load routes and components
- Optimize bundle size
- Use Vite's code splitting
- Leverage Nx caching

### Code Quality

- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages
- Review code before merging

---

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Clear Nx cache: `npx nx reset`
   - Delete `node_modules` and reinstall
   - Check TypeScript errors

2. **Port Conflicts**
   - Change port in `vite.config.ts`
   - Kill processes using the port

3. **Module Resolution**
   - Check `tsconfig.base.json` paths
   - Verify library exports in `index.ts`

---

## Additional Resources

- **Nx Documentation:** https://nx.dev
- **React Documentation:** https://react.dev
- **Vite Documentation:** https://vitejs.dev
- **Material-UI Documentation:** https://mui.com

---

## Summary

This is a large-scale **Nx monorepo** containing **43 insurance applications** and **5 shared libraries**. The **motor application** is detailed above with comprehensive features for motor insurance sales including vehicle information, driver details, quotation, coverage selection, and payment processing. The workspace uses modern technologies like React 18, TypeScript, Vite, Redux Toolkit, and Material-UI, with strong emphasis on code sharing, build optimization, and scalability through the Nx build system.
