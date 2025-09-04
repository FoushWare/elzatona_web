# Advanced CSS Mastery - Questions Bank

## Question 1: CSS Grid vs Flexbox

**Question:** Explain CSS Grid vs Flexbox and when to use each.

**Answer:**

- **CSS Grid**: 2-dimensional layout system (rows and columns). Best for complex layouts, page structure, and when you need precise control over both dimensions. Use for: page layouts, card grids, complex forms.
- **Flexbox**: 1-dimensional layout system (either row OR column). Best for component-level layouts and distributing space within a container. Use for: navigation bars, centering content, distributing items evenly.
- **Rule of thumb**: Grid for layout, Flexbox for components.

**Grid Example:**

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
  height: 100vh;
}
```

**Flexbox Example:**

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
```

---

## Question 2: CSS Custom Properties (CSS Variables)

**Question:** How do CSS custom properties work and what are their benefits?

**Answer:**
CSS custom properties (variables) allow you to store values that can be reused throughout your stylesheet.

**Syntax:**

```css
:root {
  --primary-color: #3498db;
  --font-size: 16px;
  --spacing: 1rem;
}

.element {
  color: var(--primary-color);
  font-size: var(--font-size);
  margin: var(--spacing);
}
```

**Benefits:**

- **Consistency**: Centralized value management
- **Theming**: Easy to create dark/light themes
- **Maintainability**: Change values in one place
- **Dynamic**: Can be changed with JavaScript
- **Cascade**: Inherit and override like other CSS properties

**JavaScript Integration:**

```javascript
// Set CSS variable
document.documentElement.style.setProperty('--primary-color', '#e74c3c');

// Get CSS variable
const primaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-color');
```

---

## Question 3: CSS Animations and Transitions

**Question:** What's the difference between CSS transitions and animations?

**Answer:**

- **Transitions**: Simple state changes between two values. Triggered by pseudo-classes or JavaScript.
- **Animations**: Complex sequences with multiple keyframes. Can loop, reverse, and have multiple states.

**Transition Example:**

```css
.button {
  background: blue;
  transition:
    background 0.3s ease,
    transform 0.2s ease;
}

.button:hover {
  background: red;
  transform: scale(1.1);
}
```

**Animation Example:**

```css
@keyframes slideIn {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.element {
  animation: slideIn 1s ease-in-out infinite alternate;
}
```

---

## Question 4: CSS Specificity

**Question:** How does CSS specificity work and how do you calculate it?

**Answer:**
CSS specificity determines which styles are applied when multiple rules target the same element.

**Specificity Calculation:**

- **Inline styles**: 1000 points
- **IDs**: 100 points each
- **Classes, attributes, pseudo-classes**: 10 points each
- **Elements, pseudo-elements**: 1 point each

**Examples:**

```css
/* Specificity: 1 */
div { color: red; }

/* Specificity: 10 */
.my-class { color: blue; }

/* Specificity: 100 */
#my-id { color: green; }

/* Specificity: 111 (1 + 10 + 100) */
div.my-class#my-id { color: purple; }

/* Specificity: 1000 */
<div style="color: orange;"> <!-- Inline style wins -->
```

**Important Rules:**

- Higher specificity wins
- If specificity is equal, last rule wins
- `!important` overrides everything (avoid if possible)

---

## Question 5: CSS Layout Techniques

**Question:** Compare different CSS layout methods: Float, Flexbox, Grid, and Positioning.

**Answer:**
**1. Float Layout (Legacy):**

```css
.float-left {
  float: left;
  width: 50%;
}
.float-right {
  float: right;
  width: 50%;
}
.clearfix::after {
  content: '';
  display: table;
  clear: both;
}
```

- **Pros**: Wide browser support
- **Cons**: Complex, hacky, not designed for layout

**2. Flexbox:**

```css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

- **Pros**: Great for 1D layouts, easy centering
- **Cons**: Limited for complex 2D layouts

**3. CSS Grid:**

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

- **Pros**: Perfect for 2D layouts, powerful
- **Cons**: Newer, some older browser limitations

**4. Positioning:**

```css
.absolute {
  position: absolute;
  top: 0;
  left: 0;
}
.fixed {
  position: fixed;
  top: 0;
  right: 0;
}
```

- **Pros**: Precise control
- **Cons**: Removes from document flow, can cause overlap

---

## Question 6: CSS Preprocessors

**Question:** What are CSS preprocessors and what benefits do they provide?

**Answer:**
CSS preprocessors extend CSS with programming features like variables, nesting, and functions.

**Popular Preprocessors:**

- **Sass/SCSS**: Most popular, Ruby-based
- **Less**: JavaScript-based, similar to Sass
- **Stylus**: Most flexible syntax

**Sass/SCSS Features:**

```scss
// Variables
$primary-color: #3498db;
$font-size: 16px;

// Nesting
.navbar {
  background: $primary-color;

  ul {
    list-style: none;

    li {
      display: inline-block;

      a {
        color: white;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

// Mixins
@mixin button-style($bg-color, $text-color) {
  background: $bg-color;
  color: $text-color;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

.btn-primary {
  @include button-style($primary-color, white);
}

// Functions
@function rem($pixels) {
  @return $pixels / 16px * 1rem;
}

.text {
  font-size: rem(24px); // 1.5rem
}
```

**Benefits:**

- **DRY Principle**: Don't Repeat Yourself
- **Maintainability**: Easier to update styles
- **Organization**: Better code structure
- **Features**: Variables, functions, mixins, nesting

---

## Question 7: CSS Performance Optimization

**Question:** How do you optimize CSS for better performance?

**Answer:**
**1. Minimize and Compress:**

```bash
# Minify CSS
cssnano input.css output.css

# Gzip compression (server-side)
gzip -c styles.css > styles.css.gz
```

**2. Critical CSS:**

```html
<!-- Inline critical CSS -->
<style>
  .header {
    background: #333;
  }
  .hero {
    padding: 2rem;
  }
</style>

<!-- Load non-critical CSS asynchronously -->
<link
  rel="preload"
  href="styles.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
```

**3. Efficient Selectors:**

```css
/* Good - specific and fast */
.header .nav-item {
}

/* Bad - too generic */
* {
}

/* Bad - complex descendant */
div div div div div {
}
```

**4. Use CSS Containment:**

```css
.component {
  contain: layout style paint;
}
```

**5. Avoid Expensive Properties:**

```css
/* Expensive - causes reflow */
.element {
  width: 100px;
  height: 100px;
}

/* Better - uses transform */
.element {
  transform: scale(1.1);
}
```

**6. CSS-in-JS Optimization:**

```javascript
// Use CSS-in-JS libraries that extract CSS
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => (props.primary ? 'blue' : 'gray')};
`;
```

---

## Question 8: CSS Architecture Patterns

**Question:** Explain different CSS architecture methodologies like BEM, OOCSS, and SMACSS.

**Answer:**
**1. BEM (Block Element Modifier):**

```css
/* Block */
.card {
}

/* Element */
.card__title {
}
.card__content {
}
.card__button {
}

/* Modifier */
.card--featured {
}
.card__button--primary {
}
```

**HTML:**

```html
<div class="card card--featured">
  <h3 class="card__title">Title</h3>
  <p class="card__content">Content</p>
  <button class="card__button card__button--primary">Click</button>
</div>
```

**2. OOCSS (Object-Oriented CSS):**

```css
/* Structure */
.button { padding: 10px; border: none; }

/* Skin */
.button-primary { background: blue; color: white; }
.button-secondary { background: gray; color: black; }

/* Usage */
<button class="button button-primary">Primary</button>
<button class="button button-secondary">Secondary</button>
```

**3. SMACSS (Scalable and Modular CSS):**

```css
/* Base */
body,
h1,
p {
  margin: 0;
}

/* Layout */
.l-header {
}
.l-main {
}
.l-sidebar {
}

/* Module */
.m-button {
}
.m-card {
}

/* State */
.is-hidden {
  display: none;
}
.is-active {
  background: blue;
}

/* Theme */
.t-dark {
  background: #333;
}
```

**Benefits:**

- **Maintainability**: Easier to update and modify
- **Scalability**: Works well with large projects
- **Reusability**: Components can be reused
- **Consistency**: Standardized naming conventions

---

## Question 9: CSS Modern Features

**Question:** What are some modern CSS features and how do you use them?

**Answer:**
**1. CSS Custom Properties (Variables):**

```css
:root {
  --primary: #3498db;
  --spacing: 1rem;
}

.element {
  color: var(--primary);
  margin: var(--spacing);
}
```

**2. CSS Grid:**

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

**3. CSS Flexbox:**

```css
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

**4. CSS Container Queries:**

```css
.card {
  container-type: inline-size;
}

@container (min-width: 300px) {
  .card__content {
    display: flex;
  }
}
```

**5. CSS Logical Properties:**

```css
.element {
  margin-inline-start: 1rem; /* left in LTR, right in RTL */
  margin-block-end: 2rem; /* bottom */
}
```

**6. CSS Subgrid:**

```css
.grid {
  display: grid;
  grid-template-columns: subgrid;
}
```

**7. CSS Cascade Layers:**

```css
@layer base, components, utilities;

@layer base {
  body {
    margin: 0;
  }
}

@layer components {
  .button {
    padding: 1rem;
  }
}
```

---

## Question 10: CSS Debugging and Tools

**Question:** What tools and techniques do you use for CSS debugging?

**Answer:**
**1. Browser DevTools:**

- **Elements Panel**: Inspect and modify CSS
- **Computed Tab**: See final computed values
- **Styles Tab**: View all applied styles
- **Box Model**: Visualize padding, border, margin

**2. CSS Validation:**

```bash
# W3C CSS Validator
https://jigsaw.w3.org/css-validator/
```

**3. CSS Linting:**

```bash
# Stylelint
npm install -g stylelint
stylelint "**/*.css"
```

**4. CSS Debugging Techniques:**

```css
/* Debug borders */
* {
  border: 1px solid red;
}

/* Debug backgrounds */
* {
  background: rgba(255, 0, 0, 0.1);
}

/* Debug with outline */
.debug {
  outline: 2px solid blue;
}
```

**5. CSS Performance Tools:**

- **Chrome DevTools Performance Tab**
- **Lighthouse**: CSS performance audit
- **WebPageTest**: Real-world performance

**6. CSS Organization Tools:**

```bash
# PostCSS with plugins
npm install postcss postcss-import postcss-nested
```

**7. CSS-in-JS Debugging:**

```javascript
// Styled-components debugging
const Button = styled.button`
  background: ${props => props.theme.primary};
  ${props =>
    props.debug &&
    css`
      border: 2px solid red;
    `}
`;
```

---

## Question 11: CSS Units - em vs rem

**Question:** What is the difference between em and rem?

**Answer:**
Both are relative units, but they reference different elements:

**em:**
- Relative to the font-size of its direct or nearest parent element
- Can compound when nested (1.2em × 1.2em = 1.44em)
- Useful for component-level scaling

**rem (Root em):**
- Relative to the font-size of the root (`<html>`) element
- Consistent across the entire document
- Better for global scaling and accessibility

**Examples:**
```css
html {
  font-size: 16px; /* Root font size */
}

.parent {
  font-size: 20px;
}

.child-em {
  font-size: 1.5em; /* 30px (20px × 1.5) */
  margin: 2em; /* 40px (20px × 2) */
}

.child-rem {
  font-size: 1.5rem; /* 24px (16px × 1.5) */
  margin: 2rem; /* 32px (16px × 2) */
}
```

**When to use:**
- **em**: Component-level scaling, typography within components
- **rem**: Global spacing, consistent sizing across the site

---

## Question 12: CSS Box Model Deep Dive

**Question:** Explain the CSS Box Model in detail.

**Answer:**
The Box Model describes how every element is structured in CSS:

**Components:**
1. **Content**: The actual text or image
2. **Padding**: Space between the content and the border
3. **Border**: A line that surrounds the padding and content
4. **Margin**: The outermost space that separates the element from other elements

**Box-sizing Property:**
```css
/* content-box (default) */
.element {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Total width = 200px + 40px + 10px = 250px */
  box-sizing: content-box;
}

/* border-box */
.element {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Total width = 200px (includes padding and border) */
  box-sizing: border-box;
}
```

**Visual Representation:**
```
┌─────────────────────────────────────┐ ← Margin (transparent)
│ ┌─────────────────────────────────┐ │
│ │ ┌─────────────────────────────┐ │ │ ← Border
│ │ │ ┌─────────────────────────┐ │ │ │
│ │ │ │        Content          │ │ │ │ ← Padding
│ │ │ │                         │ │ │ │
│ │ │ └─────────────────────────┘ │ │ │
│ │ └─────────────────────────────┘ │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## Question 13: CSS Specificity Calculation

**Question:** What is CSS Specificity and how is it calculated?

**Answer:**
Specificity is the set of rules that determines which CSS styles are applied when multiple rules target the same element.

**Specificity Calculation (a, b, c, d):**

1. **Inline styles** (`style="..."`): (1, 0, 0, 0) - Highest specificity
2. **IDs**: (0, 1, 0, 0) - e.g., `#navbar`
3. **Classes, attributes, pseudo-classes**: (0, 0, 1, 0) - e.g., `.nav-item`, `[type="text"]`, `:hover`
4. **Elements and pseudo-elements**: (0, 0, 0, 1) - e.g., `div`, `::before`

**Examples:**
```css
/* Specificity: (0, 0, 0, 1) */
div { color: red; }

/* Specificity: (0, 0, 1, 0) */
.my-class { color: blue; }

/* Specificity: (0, 1, 0, 0) */
#my-id { color: green; }

/* Specificity: (0, 1, 1, 1) */
div.my-class#my-id { color: purple; }

/* Specificity: (1, 0, 0, 0) */
<div style="color: orange;"> <!-- Inline style wins -->
```

**Important Rules:**
- Higher specificity wins
- If specificity is equal, last rule wins (cascade order)
- `!important` overrides everything but is generally discouraged

---

## Question 14: Critical CSS

**Question:** What is Critical CSS?

**Answer:**
Critical CSS is the minimal set of CSS code required to style the content that is above the fold (visible to the user without scrolling) on the initial page load.

**Benefits:**
- Faster initial page render
- Improved perceived performance
- Better Core Web Vitals scores
- Reduced FOUC (Flash of Unstyled Content)

**Implementation:**
```html
<!-- Inline critical CSS -->
<style>
  .header { background: #333; }
  .hero { padding: 2rem; }
  .nav { display: flex; }
</style>

<!-- Load non-critical CSS asynchronously -->
<link
  rel="preload"
  href="styles.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript>
  <link rel="stylesheet" href="styles.css">
</noscript>
```

**Tools for Critical CSS:**
- **Critical**: npm package for extracting critical CSS
- **Penthouse**: Critical CSS generator
- **Addy Osmani's critical**: Webpack plugin

**Example with Critical tool:**
```bash
npm install -g critical
critical https://example.com --base dist --css dist/styles.css --width 1300 --height 900 --inline
```

---

## Question 15: CSS Architecture for Large Applications

**Question:** How do you manage CSS in a large-scale application to avoid conflicts?

**Answer:**

**1. CSS-in-JS (e.g., Styled Components):**
```javascript
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'gray'};
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
`;
```
- Generates unique, scoped class names
- Virtually eliminates global namespace conflicts
- Component-based styling

**2. CSS Modules:**
```css
/* Button.module.css */
.button {
  background: blue;
  padding: 10px 20px;
}
```
```javascript
import styles from './Button.module.css';
<button className={styles.button}>Click me</button>
```
- Automatically scopes class names to a specific component
- Build-time transformation

**3. BEM (Block, Element, Modifier):**
```css
/* Block */
.card { }

/* Element */
.card__title { }
.card__content { }
.card__button { }

/* Modifier */
.card--featured { }
.card__button--primary { }
```
- Strict naming convention
- Makes selectors very specific
- Avoids clashes through naming discipline

**4. Design System & CDN:**
```html
<!-- Shared design system -->
<link rel="stylesheet" href="https://cdn.example.com/design-system.css">

<!-- App-specific CSS -->
<link rel="stylesheet" href="/app-styles.css">
```
- Extract shared design system CSS file with long cache policy
- Load app-specific CSS separately
- Version control for design system

**5. CSS Architecture Layers:**
```css
@layer base, components, utilities;

@layer base {
  body { margin: 0; }
  h1 { font-size: 2rem; }
}

@layer components {
  .button { padding: 1rem; }
  .card { border: 1px solid #ccc; }
}

@layer utilities {
  .text-center { text-align: center; }
  .mb-1 { margin-bottom: 1rem; }
}
```
