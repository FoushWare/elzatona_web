# Web Accessibility (A11y) - Questions Bank

## Question 1: ARIA Attributes and Roles

**Question:** Explain ARIA attributes and roles for web accessibility.

**Answer:**
ARIA (Accessible Rich Internet Applications) provides semantic information to assistive technologies.

**ARIA Roles:**

```html
<!-- Landmark roles -->
<nav role="navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<main role="main">
  <article role="article">
    <h1>Article Title</h1>
    <p>Article content...</p>
  </article>
</main>

<aside role="complementary">
  <h2>Related Links</h2>
</aside>

<!-- Widget roles -->
<button role="button" aria-pressed="false">Toggle</button>
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel1">Tab 1</button>
  <button role="tab" aria-selected="false" aria-controls="panel2">Tab 2</button>
</div>

<div role="tabpanel" id="panel1" aria-labelledby="tab1">Panel 1 content</div>
```

**ARIA Properties and States:**

```html
<!-- Form accessibility -->
<label for="email">Email Address</label>
<input
  type="email"
  id="email"
  name="email"
  aria-required="true"
  aria-describedby="email-error"
  aria-invalid="false"
/>
<div id="email-error" role="alert" aria-live="polite">
  Please enter a valid email address
</div>

<!-- Dynamic content -->
<div role="status" aria-live="polite" aria-atomic="true">Loading...</div>

<!-- Expandable content -->
<button aria-expanded="false" aria-controls="menu" aria-haspopup="true">
  Menu
</button>
<ul id="menu" role="menu" aria-hidden="true">
  <li role="menuitem">Option 1</li>
  <li role="menuitem">Option 2</li>
</ul>
```

**ARIA Labels and Descriptions:**

```html
<!-- aria-label -->
<button aria-label="Close dialog">×</button>

<!-- aria-labelledby -->
<h2 id="section-title">User Settings</h2>
<section aria-labelledby="section-title">
  <!-- Section content -->
</section>

<!-- aria-describedby -->
<input type="password" aria-describedby="password-help" />
<div id="password-help">Password must be at least 8 characters long</div>

<!-- aria-hidden -->
<div aria-hidden="true">
  <span class="icon">🎉</span>
  <span>Congratulations!</span>
</div>
```

---

## Question 2: Keyboard Navigation

**Question:** How do you implement proper keyboard navigation?

**Answer:**
**Focus Management:**

```javascript
// Focus trap for modals
class FocusTrap {
  constructor(element) {
    this.element = element;
    this.focusableElements = this.getFocusableElements();
    this.firstFocusable = this.focusableElements[0];
    this.lastFocusable =
      this.focusableElements[this.focusableElements.length - 1];
  }

  getFocusableElements() {
    const selector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    return Array.from(this.element.querySelectorAll(selector));
  }

  trapFocus(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === this.firstFocusable) {
          e.preventDefault();
          this.lastFocusable.focus();
        }
      } else {
        if (document.activeElement === this.lastFocusable) {
          e.preventDefault();
          this.firstFocusable.focus();
        }
      }
    }
  }

  activate() {
    this.element.addEventListener('keydown', this.trapFocus.bind(this));
    this.firstFocusable.focus();
  }

  deactivate() {
    this.element.removeEventListener('keydown', this.trapFocus.bind(this));
  }
}

// Usage
const modal = document.getElementById('modal');
const focusTrap = new FocusTrap(modal);
focusTrap.activate();
```

**Custom Keyboard Navigation:**

```javascript
// Arrow key navigation for custom components
class CustomSelect {
  constructor(element) {
    this.element = element;
    this.options = Array.from(element.querySelectorAll('[role="option"]'));
    this.selectedIndex = 0;
    this.setupKeyboardNavigation();
  }

  setupKeyboardNavigation() {
    this.element.addEventListener('keydown', e => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          this.selectNext();
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.selectPrevious();
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          this.activateOption();
          break;
        case 'Escape':
          this.close();
          break;
        case 'Home':
          e.preventDefault();
          this.selectFirst();
          break;
        case 'End':
          e.preventDefault();
          this.selectLast();
          break;
      }
    });
  }

  selectNext() {
    this.selectedIndex = Math.min(
      this.selectedIndex + 1,
      this.options.length - 1
    );
    this.updateSelection();
  }

  selectPrevious() {
    this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
    this.updateSelection();
  }

  updateSelection() {
    this.options.forEach((option, index) => {
      option.setAttribute('aria-selected', index === this.selectedIndex);
      if (index === this.selectedIndex) {
        option.focus();
      }
    });
  }
}
```

**Skip Links:**

```html
<!-- Skip to main content -->
<a href="#main-content" class="skip-link"> Skip to main content </a>

<style>
  .skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 1000;
  }

  .skip-link:focus {
    top: 6px;
  }
</style>
```

---

## Question 3: Screen Reader Support

**Question:** How do you make content accessible to screen readers?

**Answer:**
**Semantic HTML:**

```html
<!-- Use proper heading hierarchy -->
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<h2>Another Section</h2>

<!-- Use semantic elements -->
<main>
  <article>
    <header>
      <h1>Article Title</h1>
      <time datetime="2023-12-01">December 1, 2023</time>
    </header>
    <p>Article content...</p>
    <footer>
      <p>Author: John Doe</p>
    </footer>
  </article>
</main>

<!-- Form labels -->
<label for="username">Username</label>
<input type="text" id="username" name="username" required />

<!-- Or use aria-label -->
<input type="text" aria-label="Username" required />
```

**Live Regions:**

```html
<!-- Announce dynamic content -->
<div aria-live="polite" id="status">
  <!-- Status messages will be announced -->
</div>

<div aria-live="assertive" id="error">
  <!-- Error messages will be announced immediately -->
</div>

<script>
  function updateStatus(message) {
    document.getElementById('status').textContent = message;
  }

  function showError(message) {
    document.getElementById('error').textContent = message;
    // Clear after announcement
    setTimeout(() => {
      document.getElementById('error').textContent = '';
    }, 1000);
  }
</script>
```

**Alternative Text:**

```html
<!-- Descriptive alt text -->
<img src="chart.png" alt="Sales increased by 25% in Q3 2023" />

<!-- Decorative images -->
<img src="decoration.png" alt="" role="presentation" />

<!-- Complex images -->
<img
  src="infographic.png"
  alt="Infographic showing web accessibility statistics. 15% of the world's population has a disability. 71% of users with disabilities leave a website that is not accessible."
/>

<!-- Long descriptions -->
<img
  src="complex-diagram.png"
  alt="System architecture diagram"
  longdesc="system-architecture.html"
/>
```

**Hidden Content:**

```html
<!-- Visually hidden but accessible -->
<span class="sr-only">Required field</span>

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
```

---

## Question 4: Color and Contrast

**Question:** How do you ensure proper color contrast and accessibility?

**Answer:**
**Color Contrast Ratios:**

- **Normal text**: 4.5:1 minimum
- **Large text (18pt+ or 14pt+ bold)**: 3:1 minimum
- **UI components**: 3:1 minimum

**CSS for High Contrast:**

```css
/* High contrast mode support */
@media (prefers-contrast: high) {
  .button {
    border: 2px solid;
    background: white;
    color: black;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #1a1a1a;
    --text-color: #ffffff;
    --link-color: #4a9eff;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Color-Independent Information:**

```html
<!-- Don't rely on color alone -->
<button class="error">
  <span class="icon" aria-hidden="true">⚠️</span>
  <span>Error: Invalid input</span>
</button>

<!-- Form validation -->
<div class="field">
  <label for="email">Email</label>
  <input
    type="email"
    id="email"
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <div id="email-error" role="alert">
    <span class="icon" aria-hidden="true">❌</span>
    Please enter a valid email address
  </div>
</div>
```

**Focus Indicators:**

```css
/* Visible focus indicators */
button:focus,
input:focus,
select:focus,
textarea:focus,
a:focus {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}

/* Custom focus styles */
.custom-button:focus {
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  border-color: #005fcc;
}
```

---

## Question 5: Form Accessibility

**Question:** How do you create accessible forms?

**Answer:**
**Proper Form Structure:**

```html
<form>
  <fieldset>
    <legend>Personal Information</legend>

    <div class="field">
      <label for="first-name">First Name *</label>
      <input
        type="text"
        id="first-name"
        name="firstName"
        required
        aria-describedby="first-name-help"
      />
      <div id="first-name-help" class="help-text">
        Enter your legal first name
      </div>
    </div>

    <div class="field">
      <label for="email">Email Address *</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        aria-describedby="email-help email-error"
        aria-invalid="false"
      />
      <div id="email-help" class="help-text">We'll never share your email</div>
      <div id="email-error" class="error-text" role="alert" aria-live="polite">
        <!-- Error messages appear here -->
      </div>
    </div>

    <fieldset>
      <legend>Newsletter Preferences</legend>
      <div class="checkbox-group">
        <input type="checkbox" id="newsletter" name="newsletter" />
        <label for="newsletter">Subscribe to newsletter</label>
      </div>
    </fieldset>

    <button type="submit">Submit</button>
  </fieldset>
</form>
```

**Form Validation:**

```javascript
class AccessibleForm {
  constructor(form) {
    this.form = form;
    this.setupValidation();
  }

  setupValidation() {
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.validateForm();
    });

    // Real-time validation
    this.form.addEventListener(
      'blur',
      e => {
        if (e.target.matches('input, select, textarea')) {
          this.validateField(e.target);
        }
      },
      true
    );
  }

  validateField(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    const isValid = field.checkValidity();

    field.setAttribute('aria-invalid', !isValid);

    if (!isValid) {
      const errorMessage = this.getErrorMessage(field);
      errorElement.textContent = errorMessage;
      errorElement.setAttribute('role', 'alert');
    } else {
      errorElement.textContent = '';
      errorElement.removeAttribute('role');
    }
  }

  getErrorMessage(field) {
    if (field.validity.valueMissing) {
      return `${field.labels[0].textContent} is required`;
    }
    if (field.validity.typeMismatch) {
      return `Please enter a valid ${field.type}`;
    }
    if (field.validity.patternMismatch) {
      return `Please match the requested format`;
    }
    return 'Please correct this field';
  }

  validateForm() {
    const fields = this.form.querySelectorAll('input, select, textarea');
    let isValid = true;

    fields.forEach(field => {
      this.validateField(field);
      if (!field.checkValidity()) {
        isValid = false;
      }
    });

    if (isValid) {
      this.submitForm();
    } else {
      // Focus first invalid field
      const firstInvalid = this.form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }
  }
}
```

---

## Question 6: Testing Accessibility

**Question:** How do you test web accessibility?

**Answer:**
**Automated Testing:**

```javascript
// axe-core testing
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should not have accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// React Testing Library accessibility
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('form is accessible', async () => {
  const user = userEvent.setup();
  render(<ContactForm />);

  // Test keyboard navigation
  await user.tab();
  expect(screen.getByLabelText(/name/i)).toHaveFocus();

  await user.tab();
  expect(screen.getByLabelText(/email/i)).toHaveFocus();

  // Test form submission
  await user.type(screen.getByLabelText(/name/i), 'John Doe');
  await user.type(screen.getByLabelText(/email/i), 'john@example.com');
  await user.click(screen.getByRole('button', { name: /submit/i }));

  expect(screen.getByText(/thank you/i)).toBeInTheDocument();
});
```

**Manual Testing Checklist:**

```javascript
// Keyboard navigation test
function testKeyboardNavigation() {
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  console.log('Focusable elements:', focusableElements.length);

  // Test tab order
  focusableElements.forEach((element, index) => {
    element.addEventListener('focus', () => {
      console.log(`Element ${index} focused:`, element);
    });
  });
}

// Screen reader testing
function testScreenReader() {
  // Check for proper heading structure
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  console.log('Headings found:', headings.length);

  // Check for alt text on images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.alt && !img.getAttribute('aria-label')) {
      console.warn('Image without alt text:', img);
    }
  });

  // Check for form labels
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    const hasLabel = input.labels.length > 0;
    const hasAriaLabel = input.hasAttribute('aria-label');
    const hasAriaLabelledBy = input.hasAttribute('aria-labelledby');

    if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
      console.warn('Input without label:', input);
    }
  });
}
```

**Accessibility Testing Tools:**

```javascript
// Lighthouse accessibility audit
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runAccessibilityAudit(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['accessibility'],
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, options);
  await chrome.kill();

  return runnerResult;
}

// Pa11y command line testing
// npm install -g pa11y
// pa11y http://localhost:3000

// WAVE browser extension
// https://wave.webaim.org/extension/
```
