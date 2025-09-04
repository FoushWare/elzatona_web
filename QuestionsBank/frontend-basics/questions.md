# Frontend Fundamentals - Questions Bank

## Question 1: CSS Display Properties

**Question:** What is the difference between `display: block`, `display: inline`, and `display: inline-block` in CSS?

**Answer:**

- **`display: block`**: Elements take up the full width of their container, start on a new line, and can have width/height set. Examples: `<div>`, `<p>`, `<h1>`
- **`display: inline`**: Elements only take up as much width as their content, don't start on a new line, and cannot have width/height set. Examples: `<span>`, `<a>`, `<strong>`
- **`display: inline-block`**: Combines both - elements flow inline like inline elements but can have width/height set like block elements. Perfect for creating horizontal layouts with control over dimensions.

---

## Question 2: HTML Semantic Elements

**Question:** What are semantic HTML elements and why are they important?

**Answer:**
Semantic HTML elements clearly describe their meaning and purpose to both browsers and developers.

**Examples:**

- `<header>`: Page or section header
- `<nav>`: Navigation links
- `<main>`: Main content of the page
- `<article>`: Self-contained content
- `<section>`: Thematic grouping of content
- `<aside>`: Sidebar or related content
- `<footer>`: Page or section footer

**Benefits:**

- **Accessibility**: Screen readers understand content structure
- **SEO**: Search engines better understand content
- **Maintainability**: Code is self-documenting
- **Styling**: Easier to target with CSS

---

## Question 3: JavaScript Variables

**Question:** Explain the difference between `var`, `let`, and `const` in JavaScript.

**Answer:**

- **`var`**: Function-scoped, can be redeclared, hoisted with `undefined` value. Can cause issues with block scope.
- **`let`**: Block-scoped, cannot be redeclared in same scope, hoisted but not initialized (temporal dead zone).
- **`const`**: Block-scoped, cannot be redeclared or reassigned, must be initialized when declared.

**Examples:**

```javascript
// var - function scoped
function example() {
  if (true) {
    var x = 1;
  }
  console.log(x); // 1 (accessible)
}

// let - block scoped
function example() {
  if (true) {
    let y = 1;
  }
  console.log(y); // ReferenceError
}

// const - block scoped, immutable
const z = 1;
z = 2; // TypeError
```

---

## Question 4: CSS Box Model

**Question:** Explain the CSS Box Model and its components.

**Answer:**
The CSS Box Model describes how elements are rendered and consists of four parts:

1. **Content**: The actual content (text, images, etc.)
2. **Padding**: Space between content and border
3. **Border**: Line around the padding
4. **Margin**: Space outside the border

**Box-sizing property:**

- **`content-box`** (default): Width/height applies only to content
- **`border-box`**: Width/height includes content, padding, and border

**Example:**

```css
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
  box-sizing: border-box; /* Total width = 200px */
}
```

---

## Question 5: JavaScript Functions

**Question:** What is the difference between function declarations and function expressions?

**Answer:**

- **Function Declaration**: Hoisted completely, can be called before declaration
- **Function Expression**: Not hoisted, cannot be called before declaration

**Examples:**

```javascript
// Function Declaration (hoisted)
console.log(sayHello()); // "Hello!" (works)

function sayHello() {
  return 'Hello!';
}

// Function Expression (not hoisted)
console.log(sayGoodbye()); // ReferenceError

const sayGoodbye = function () {
  return 'Goodbye!';
};
```

---

## Question 6: CSS Selectors

**Question:** Explain different types of CSS selectors with examples.

**Answer:**

- **Element selector**: `p { color: blue; }`
- **Class selector**: `.my-class { font-size: 16px; }`
- **ID selector**: `#my-id { background: red; }`
- **Attribute selector**: `input[type="text"] { border: 1px solid; }`
- **Descendant selector**: `div p { margin: 0; }`
- **Child selector**: `div > p { color: green; }`
- **Adjacent sibling**: `h1 + p { margin-top: 0; }`
- **General sibling**: `h1 ~ p { color: gray; }`
- **Pseudo-class**: `a:hover { text-decoration: underline; }`
- **Pseudo-element**: `p::before { content: "→ "; }`

---

## Question 7: JavaScript Arrays

**Question:** What are the main array methods in JavaScript and their purposes?

**Answer:**
**Mutating methods (change original array):**

- `push()`: Add element to end
- `pop()`: Remove element from end
- `shift()`: Remove element from beginning
- `unshift()`: Add element to beginning
- `splice()`: Add/remove elements at specific index

**Non-mutating methods (return new array):**

- `map()`: Transform each element
- `filter()`: Create new array with elements that pass test
- `reduce()`: Reduce array to single value
- `slice()`: Extract portion of array
- `concat()`: Combine arrays

**Example:**

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2); // [2, 4, 6, 8, 10]
const evens = numbers.filter(x => x % 2 === 0); // [2, 4]
const sum = numbers.reduce((acc, x) => acc + x, 0); // 15
```

---

## Question 8: CSS Flexbox

**Question:** How do you center content using Flexbox?

**Answer:**

```css
.container {
  display: flex;
  justify-content: center; /* Horizontal centering */
  align-items: center; /* Vertical centering */
  height: 100vh; /* Full viewport height */
}
```

**Flexbox properties:**

- **`justify-content`**: Controls horizontal alignment (flex-start, center, flex-end, space-between, space-around)
- **`align-items`**: Controls vertical alignment (flex-start, center, flex-end, stretch, baseline)
- **`flex-direction`**: Controls main axis direction (row, column, row-reverse, column-reverse)
- **`flex-wrap`**: Controls wrapping (nowrap, wrap, wrap-reverse)

---

## Question 9: JavaScript Objects

**Question:** How do you create and manipulate objects in JavaScript?

**Answer:**
**Object creation:**

```javascript
// Object literal
const person = {
  name: 'John',
  age: 30,
  greet() {
    return `Hello, I'm ${this.name}`;
  },
};

// Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Class (ES6)
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }
}
```

**Object manipulation:**

```javascript
// Access properties
person.name; // "John"
person['name']; // "John"

// Add/modify properties
person.city = 'New York';
person['city'] = 'New York';

// Delete properties
delete person.age;

// Object methods
Object.keys(person); // ["name", "age", "greet"]
Object.values(person); // ["John", 30, function]
Object.entries(person); // [["name", "John"], ["age", 30], ["greet", function]]
```

---

## Question 10: CSS Responsive Design

**Question:** How do you make a website responsive using CSS?

**Answer:**
**1. Viewport Meta Tag:**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

**2. Flexible Grid:**

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
```

**3. Flexible Images:**

```css
img {
  max-width: 100%;
  height: auto;
}
```

**4. Media Queries:**

```css
/* Mobile first approach */
.container {
  padding: 10px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 20px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

**5. Flexible Typography:**

```css
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}
```

---

## Question 11: Critical Rendering Path

**Question:** In the critical rendering path, is CSS rendered before or after the DOM is constructed?

**Answer:**
CSS is rendered before the DOM. It is synchronous and blocking, meaning all CSS must be interpreted and any rules calculated before the browser can start parsing and rendering the HTML.

**Critical Rendering Path Steps:**
1. HTML parsing and DOM construction
2. CSS parsing and CSSOM construction (blocking)
3. Render tree construction
4. Layout (reflow)
5. Paint
6. Composite

---

## Question 12: HTML and CSS Rendering

**Question:** Is HTML rendered incrementally? Can we say the same about CSS?

**Answer:**
Yes, HTML is rendered incrementally as it is being parsed. However, CSS is "all or nothing" because it has a global namespace. The browser must interpret all CSS and calculate all possible rules that could apply to any element before it can proceed.

**Why CSS is blocking:**
- CSS has a global scope
- Rules can affect any element
- Browser needs complete CSS to determine final styles
- Prevents FOUC (Flash of Unstyled Content)

---

## Question 13: Script Loading Attributes

**Question:** What is the difference between async and defer attributes on a script tag?

**Answer:**
Both allow a script to be downloaded in the background without blocking HTML parsing.

**async:**
- Script is executed as soon as it is downloaded
- Can happen at any time, potentially before or after DOMContentLoaded
- Execution order is not guaranteed
- Use for independent scripts

**defer:**
- Script is executed only after HTML is fully parsed
- Just before the DOMContentLoaded event
- Execution order of deferred scripts is maintained
- ES6 modules are deferred by default

**Example:**
```html
<script src="script1.js" async></script>
<script src="script2.js" defer></script>
```

---

## Question 14: Browser Data Storage

**Question:** What are three ways to store data in the browser?

**Answer:**

**1. Cookies:**
- Small (~4KB)
- Sent with every HTTP request
- Great for authentication (if HTTP-only)
- Can have an expiration date
- Accessible via document.cookie

**2. Local Storage:**
- Larger storage limit (typically ~5MB)
- Persists indefinitely until explicitly cleared
- Accessible to client-side JavaScript
- Synchronous API

**3. Session Storage:**
- Similar to local storage but cleared when browser tab/window closes
- Useful for temporary data like form inputs during a session
- Same API as localStorage

**Example:**
```javascript
// Cookies
document.cookie = "username=john; expires=Thu, 18 Dec 2024 12:00:00 UTC";

// Local Storage
localStorage.setItem('user', JSON.stringify({name: 'John', age: 30}));
const user = JSON.parse(localStorage.getItem('user'));

// Session Storage
sessionStorage.setItem('tempData', 'temporary value');
```

---

## Question 15: JavaScript 'this' Keyword

**Question:** Explain the this keyword in JavaScript.

**Answer:**
The value of `this` depends on how a function is called:

**1. Global scope (non-strict mode):**
```javascript
console.log(this); // window object
```

**2. Object method:**
```javascript
const obj = {
  name: 'John',
  greet() {
    console.log(this.name); // 'John'
  }
};
obj.greet();
```

**3. Event handler:**
```javascript
button.addEventListener('click', function() {
  console.log(this); // button element
});
```

**4. Explicit binding (call, apply, bind):**
```javascript
function greet() {
  console.log(this.name);
}

const person = { name: 'Alice' };
greet.call(person); // 'Alice'
greet.apply(person); // 'Alice'
const boundGreet = greet.bind(person);
boundGreet(); // 'Alice'
```

**5. Arrow functions:**
```javascript
const obj = {
  name: 'John',
  greet: () => {
    console.log(this.name); // undefined (inherits from lexical scope)
  }
};
```

---

## Question 16: Event Loop

**Question:** Describe the steps in an Event Loop tick.

**Answer:**
The Event Loop processes tasks in this order:

**1. Execute the Call Stack:**
- Run all synchronous code until the call stack is empty

**2. Process the Microtask Queue:**
- Execute all microtasks (promise callbacks, queueMicrotask)
- This queue must be completely emptied before moving on
- Higher priority than macrotasks

**3. Render:**
- Update the UI if necessary
- Only happens if needed (60fps target)

**4. Process the Macrotask Queue:**
- Take one task from the macrotask queue (setTimeout, setInterval, I/O callbacks)
- Execute it completely

**5. Repeat:**
- Go back to step 1

**Example:**
```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2
```
