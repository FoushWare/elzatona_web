# Route Structure Overview - Elzatona Web Platform

## 🗺️ **Complete Route Map**

This document provides a comprehensive overview of all routes in the Elzatona Web Platform.

## 📁 **Main Application Routes**

### **Root Route (`/`)**

- **File**: `apps/web/app/page.tsx`
- **Purpose**: Homepage with personalized content
- **Features**: Hero section, quick actions, user-specific content

### **Authentication Routes**

```
/auth/                          # Authentication page
/forgot-password/               # Password reset
```

### **Learning & Practice Routes**

```
/features/
├── learning-paths/             # Learning path management
│   ├── [id]/                  # Specific learning path
│   └── sections/[section]/    # Section-specific content
├── practice/                   # Practice exercises
│   ├── advanced/              # Advanced topics
│   ├── algorithm-problems/    # Algorithm challenges
│   ├── coding-exercises/      # Coding practice
│   └── quiz/                  # Quiz format
└── questions/                  # Question bank
    ├── [id]/                  # Specific question
    ├── behavioral/            # Behavioral questions
    ├── company-specific/      # Company-specific Q&A
    ├── javascript/            # JavaScript topics
    └── system-design/         # System design questions
```

### **Admin Routes**

```
/admin/
├── dashboard/                  # Admin dashboard
├── content/                    # Content management
│   ├── questions/             # Question management
│   └── topics/                # Topic management
├── users/                      # User management
├── reports/                    # Analytics & reports
└── settings/                   # System settings
```

### **API Routes**

```
/api/
├── auth/                       # Authentication endpoints
├── questions/                  # Question management
├── learning-paths/             # Learning path data
├── progress/                   # User progress tracking
├── flashcards/                 # Flashcard system
└── admin/                      # Admin-specific APIs
```

## 🏠 **Main Route Deep Dive**

### **Component Hierarchy**

```
HomePage (page.tsx)
├── AnimatedBackground
├── HeroSection
│   ├── Personalized Content
│   ├── CTA Buttons
│   └── Tour Trigger
├── UserStatistics
├── QuickActionsSection
│   ├── Practice Challenges
│   ├── Learning Paths
│   └── Get Started
├── UserContentSection (conditional)
│   ├── Guided User Content
│   └── Self-Directed Content
├── CallToActionSection (conditional)
├── GuidedTour
└── RTLToggle (dev tools)
```

### **State Management Flow**

```
User Type Context
├── 'guided' → Guided User Experience
├── 'self-directed' → Self-Directed Experience
└── null → New User Experience
```

## 🎯 **Route Categories**

### **1. Public Routes**

- `/` - Homepage
- `/auth` - Authentication
- `/documentation` - Platform docs
- `/blog` - Blog posts

### **2. Protected Routes**

- `/features/*` - Learning features
- `/pages/*` - User dashboard
- `/admin/*` - Admin panel

### **3. API Routes**

- `/api/*` - Backend endpoints
- RESTful design
- Authentication required

### **4. Dynamic Routes**

- `[id]` - Dynamic parameters
- `[...slug]` - Catch-all routes
- `(group)` - Route groups

## 🔧 **Technical Implementation**

### **Next.js App Router Features**

- **File-based routing**
- **Nested layouts**
- **Route groups**
- **Dynamic segments**
- **Parallel routes**

### **Route Protection**

```typescript
// Example: Protected route
export default function ProtectedPage() {
  const { user } = useAuth();

  if (!user) {
    redirect('/auth');
  }

  return <div>Protected content</div>;
}
```

### **Dynamic Routes**

```typescript
// Example: [id] dynamic route
export default function DynamicPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <div>Page for ID: {id}</div>;
}
```

## 🎨 **Layout System**

### **Root Layout (`layout.tsx`)**

- Global providers
- Metadata configuration
- Theme management
- RTL support

### **Nested Layouts**

- Admin layout for admin routes
- Auth layout for authentication
- Feature-specific layouts

## 🚀 **Performance Optimizations**

### **Code Splitting**

- Automatic route-based splitting
- Dynamic imports for heavy components
- Lazy loading for non-critical routes

### **Caching Strategy**

- Static generation where possible
- ISR for dynamic content
- Edge caching for API routes

## 📱 **Responsive Design**

All routes are fully responsive with:

- Mobile-first approach
- Flexible layouts
- Touch-friendly interactions
- Optimized for all devices

## 🔒 **Security Features**

- Route-level authentication
- CSRF protection
- XSS prevention
- Input validation
- Rate limiting

## 📊 **Analytics & Monitoring**

- Route-level analytics
- Performance monitoring
- Error tracking
- User behavior analysis

---

This route structure provides a comprehensive platform for frontend development interview preparation with clear separation of concerns and excellent user experience.
