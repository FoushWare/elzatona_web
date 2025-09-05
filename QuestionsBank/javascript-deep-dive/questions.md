# JavaScript Deep Dive - Questions Bank

## Question 1: JavaScript Event Loop

**Question:** Explain the JavaScript Event Loop and how it handles asynchronous operations.

**Answer:**
The Event Loop is JavaScript's mechanism for handling asynchronous operations:

**Components:**

1. **Call Stack**: Executes synchronous code
2. **Web APIs**: Handle async operations (setTimeout, fetch, DOM events)
3. **Task Queue**: Stores completed async operations
4. **Event Loop**: Continuously checks if call stack is empty, then moves tasks from queue to stack

**Example flow:**

```javascript
console.log('1'); // Call stack
setTimeout(() => console.log('2'), 0); // Web API
console.log('3'); // Call stack
// Output: 1, 3, 2
```

**Microtasks vs Macrotasks:**

- **Microtasks**: Promise.then(), queueMicrotask(), process.nextTick()
- **Macrotasks**: setTimeout(), setInterval(), I/O operations
- **Priority**: Microtasks have higher priority than macrotasks

**Example:**

```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2
```

---

## Question 2: Closures in JavaScript

**Question:** What is closure in JavaScript and provide practical examples.

**Answer:**
A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.

**Basic Example:**

```javascript
function createCounter() {
  let count = 0; // Private variable

  return function () {
    count++; // Access to outer scope variable
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

**Practical Uses:**

**1. Data Privacy:**

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit: amount => {
      balance += amount;
      return balance;
    },
    withdraw: amount => {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      return 'Insufficient funds';
    },
    getBalance: () => balance,
  };
}

const account = createBankAccount(1000);
console.log(account.getBalance()); // 1000
account.deposit(500);
console.log(account.getBalance()); // 1500
```

**2. Function Factories:**

```javascript
function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

**3. Event Handlers:**

```javascript
function setupButton(id) {
  const button = document.getElementById(id);
  let clickCount = 0;

  button.addEventListener('click', function () {
    clickCount++;
    console.log(`Button clicked ${clickCount} times`);
  });
}
```

---

## Question 3: JavaScript Prototypes and Inheritance

**Question:** Explain JavaScript prototypes and how inheritance works.

**Answer:**
JavaScript uses prototypal inheritance where objects inherit properties and methods from their prototype.

**Prototype Chain:**

```javascript
// Every object has a prototype
const obj = {};
console.log(obj.__proto__ === Object.prototype); // true

// Functions have prototypes
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, I'm ${this.name}`;
};

const john = new Person('John');
console.log(john.greet()); // "Hello, I'm John"

// Prototype chain lookup
console.log(john.toString()); // Inherited from Object.prototype
```

**ES6 Classes (Syntactic Sugar):**

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

class Student extends Person {
  constructor(name, grade) {
    super(name);
    this.grade = grade;
  }

  study() {
    return `${this.name} is studying`;
  }
}

const student = new Student('Alice', 'A');
console.log(student.greet()); // "Hello, I'm Alice"
console.log(student.study()); // "Alice is studying"
```

**Prototype Methods:**

```javascript
// Adding methods to built-in prototypes
Array.prototype.last = function () {
  return this[this.length - 1];
};

const arr = [1, 2, 3, 4, 5];
console.log(arr.last()); // 5

// Object.create for prototypal inheritance
const animal = {
  speak() {
    return `${this.name} makes a sound`;
  },
};

const dog = Object.create(animal);
dog.name = 'Buddy';
console.log(dog.speak()); // "Buddy makes a sound"
```

---

## Question 4: JavaScript Async/Await and Promises

**Question:** Explain Promises and async/await in JavaScript.

**Answer:**
**Promises** represent the eventual completion or failure of an asynchronous operation.

**Promise States:**

- **Pending**: Initial state, neither fulfilled nor rejected
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

**Basic Promise:**

```javascript
const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve('Operation successful');
  } else {
    reject('Operation failed');
  }
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

**Promise Methods:**

```javascript
// Promise.all - wait for all promises
Promise.all([fetch('/api/users'), fetch('/api/posts'), fetch('/api/comments')])
  .then(responses => Promise.all(responses.map(r => r.json())))
  .then(data => console.log(data));

// Promise.race - first promise to resolve/reject
Promise.race([
  fetch('/api/fast'),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), 5000)
  ),
])
  .then(response => console.log('Fast response'))
  .catch(error => console.log('Timeout or error'));

// Promise.allSettled - wait for all, regardless of success/failure
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success'),
]).then(results => {
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Promise ${index}: ${result.value}`);
    } else {
      console.log(`Promise ${index}: ${result.reason}`);
    }
  });
});
```

**Async/Await:**

```javascript
// Async function always returns a Promise
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const user = await response.json();

    const postsResponse = await fetch(`/api/users/${userId}/posts`);
    const posts = await postsResponse.json();

    return { user, posts };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

// Usage
fetchUserData(123)
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Or in another async function
async function displayUserData() {
  try {
    const data = await fetchUserData(123);
    console.log('User:', data.user);
    console.log('Posts:', data.posts);
  } catch (error) {
    console.error('Failed to display user data:', error);
  }
}
```

---

## Question 5: JavaScript Modules (ES6 Modules)

**Question:** Explain ES6 modules and how to use import/export.

**Answer:**
ES6 modules provide a standardized way to organize and share code between files.

**Export Types:**

**1. Named Exports:**

```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;

// Or export at the end
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
export { add, subtract };
```

**2. Default Export:**

```javascript
// calculator.js
class Calculator {
  add(a, b) {
    return a + b;
  }
  subtract(a, b) {
    return a - b;
  }
}

export default Calculator;
```

**3. Mixed Exports:**

```javascript
// utils.js
export const formatDate = date => {
  /* ... */
};
export const validateEmail = email => {
  /* ... */
};

const defaultConfig = { theme: 'light' };
export default defaultConfig;
```

**Import Types:**

**1. Named Imports:**

```javascript
import { add, subtract } from './math.js';
import { add as sum, subtract as diff } from './math.js';
import * as math from './math.js'; // Import all as namespace
```

**2. Default Import:**

```javascript
import Calculator from './calculator.js';
import calc from './calculator.js'; // Can use any name
```

**3. Mixed Imports:**

```javascript
import Calculator, { add, subtract } from './calculator.js';
import defaultConfig, { formatDate, validateEmail } from './utils.js';
```

**Dynamic Imports:**

```javascript
// Load module conditionally
async function loadModule() {
  if (condition) {
    const { heavyFunction } = await import('./heavy-module.js');
    heavyFunction();
  }
}

// Code splitting
const button = document.getElementById('load-feature');
button.addEventListener('click', async () => {
  const module = await import('./feature.js');
  module.init();
});
```

**Module Features:**

- **Strict mode**: Modules run in strict mode by default
- **Top-level await**: Can use await at module level
- **Tree shaking**: Unused exports can be eliminated
- **Circular dependencies**: Handled automatically

---

## Question 6: JavaScript Generators and Iterators

**Question:** What are generators and iterators in JavaScript?

**Answer:**
**Iterators** are objects that implement the iterator protocol, allowing you to iterate over collections.

**Iterator Protocol:**

```javascript
const iterable = {
  [Symbol.iterator]() {
    let count = 0;
    return {
      next() {
        if (count < 3) {
          return { value: count++, done: false };
        }
        return { done: true };
      },
    };
  },
};

for (const value of iterable) {
  console.log(value); // 0, 1, 2
}
```

**Generators** are functions that can be paused and resumed, returning an iterator.

**Basic Generator:**

```javascript
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

**Generator with Parameters:**

```javascript
function* fibonacci() {
  let a = 0,
    b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
```

**Generator with yield\*:**

```javascript
function* generator1() {
  yield 1;
  yield 2;
}

function* generator2() {
  yield* generator1();
  yield 3;
  yield 4;
}

for (const value of generator2()) {
  console.log(value); // 1, 2, 3, 4
}
```

**Practical Uses:**

**1. Lazy Evaluation:**

```javascript
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

// Only generates values as needed
const numbers = range(1, 1000000);
console.log(numbers.next().value); // 1
console.log(numbers.next().value); // 2
```

**2. Async Iteration:**

```javascript
async function* asyncGenerator() {
  yield await fetch('/api/data1');
  yield await fetch('/api/data2');
  yield await fetch('/api/data3');
}

for await (const response of asyncGenerator()) {
  const data = await response.json();
  console.log(data);
}
```

---

## Question 7: JavaScript Memory Management

**Question:** How does JavaScript handle memory management and garbage collection?

**Answer:**
JavaScript uses automatic garbage collection to manage memory, but understanding it helps write more efficient code.

**Memory Lifecycle:**

1. **Allocation**: Memory is allocated when objects are created
2. **Use**: Memory is used while objects are referenced
3. **Release**: Memory is freed when objects are no longer referenced

**Garbage Collection Algorithms:**

**1. Reference Counting:**

```javascript
let obj1 = { name: 'John' }; // Reference count: 1
let obj2 = obj1; // Reference count: 2
obj1 = null; // Reference count: 1
obj2 = null; // Reference count: 0 (garbage collected)
```

**2. Mark and Sweep:**

- Marks all reachable objects from root
- Sweeps unmarked objects
- Handles circular references

**Memory Leaks:**

**1. Global Variables:**

```javascript
// Bad - creates global variable
function createUser() {
  user = { name: 'John' }; // Missing 'let', 'const', or 'var'
}

// Good
function createUser() {
  const user = { name: 'John' };
  return user;
}
```

**2. Event Listeners:**

```javascript
// Bad - event listener not removed
function setupButton() {
  const button = document.getElementById('btn');
  button.addEventListener('click', handleClick);
}

// Good - remove event listener
function setupButton() {
  const button = document.getElementById('btn');
  button.addEventListener('click', handleClick);

  // Remove when no longer needed
  return () => button.removeEventListener('click', handleClick);
}
```

**3. Closures:**

```javascript
// Bad - closure holds reference to large object
function createHandler() {
  const largeObject = new Array(1000000).fill('data');

  return function () {
    // Only uses small part but holds reference to largeObject
    console.log('Handler called');
  };
}

// Good - only keep what's needed
function createHandler() {
  const smallData = 'needed data';

  return function () {
    console.log(smallData);
  };
}
```

**4. Timers:**

```javascript
// Bad - timer not cleared
function startTimer() {
  setInterval(() => {
    console.log('Timer tick');
  }, 1000);
}

// Good - clear timer when done
function startTimer() {
  const intervalId = setInterval(() => {
    console.log('Timer tick');
  }, 1000);

  return () => clearInterval(intervalId);
}
```

**Memory Optimization:**

**1. Object Pooling:**

```javascript
class ObjectPool {
  constructor(createFn, resetFn) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.pool = [];
  }

  get() {
    if (this.pool.length > 0) {
      return this.pool.pop();
    }
    return this.createFn();
  }

  release(obj) {
    this.resetFn(obj);
    this.pool.push(obj);
  }
}

// Usage
const pool = new ObjectPool(
  () => ({ x: 0, y: 0, active: false }),
  obj => {
    obj.x = 0;
    obj.y = 0;
    obj.active = false;
  }
);
```

**2. WeakMap and WeakSet:**

```javascript
// WeakMap - keys are weakly referenced
const weakMap = new WeakMap();
const obj = { data: 'important' };
weakMap.set(obj, 'metadata');

// When obj is garbage collected, entry is removed from WeakMap

// WeakSet - values are weakly referenced
const weakSet = new WeakSet();
weakSet.add(obj);

// When obj is garbage collected, it's removed from WeakSet
```

---

## Question 8: JavaScript Error Handling

**Question:** How do you handle errors in JavaScript effectively?

**Answer:**
**Error Types:**

- **SyntaxError**: Code syntax issues
- **ReferenceError**: Undefined variables
- **TypeError**: Wrong data type operations
- **RangeError**: Values outside valid range
- **Custom Errors**: User-defined errors

**Try-Catch-Finally:**

```javascript
function riskyOperation() {
  try {
    // Code that might throw an error
    const result = JSON.parse('invalid json');
    return result;
  } catch (error) {
    // Handle the error
    console.error('Error occurred:', error.message);
    return null;
  } finally {
    // Always executes
    console.log('Cleanup code');
  }
}
```

**Custom Errors:**

```javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

function validateUser(user) {
  if (!user.name) {
    throw new ValidationError('Name is required', 'name');
  }
  if (!user.email) {
    throw new ValidationError('Email is required', 'email');
  }
}

try {
  validateUser({});
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`Validation failed for ${error.field}: ${error.message}`);
  } else {
    console.log('Unexpected error:', error.message);
  }
}
```

**Promise Error Handling:**

```javascript
// Promise chain
fetch('/api/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Async/await
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw if needed
  }
}
```

**Global Error Handling:**

```javascript
// Global error handler
window.addEventListener('error', event => {
  console.error('Global error:', event.error);
  // Send to error reporting service
});

// Unhandled promise rejection
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled promise rejection:', event.reason);
  // Send to error reporting service
});

// Node.js
process.on('uncaughtException', error => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
});
```

**Error Boundaries (React):**

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

---

## Question 9: JavaScript Performance Optimization

**Question:** How do you optimize JavaScript performance?

**Answer:**
**1. Avoid Global Variables:**

```javascript
// Bad - global variable lookup
function calculate() {
  return globalValue * 2; // Slow
}

// Good - local variable
function calculate(value) {
  return value * 2; // Fast
}
```

**2. Minimize DOM Access:**

```javascript
// Bad - multiple DOM queries
function updateElements() {
  document.getElementById('item1').style.color = 'red';
  document.getElementById('item2').style.color = 'red';
  document.getElementById('item3').style.color = 'red';
}

// Good - cache DOM elements
function updateElements() {
  const elements = [
    document.getElementById('item1'),
    document.getElementById('item2'),
    document.getElementById('item3'),
  ];

  elements.forEach(el => (el.style.color = 'red'));
}
```

**3. Use Efficient Loops:**

```javascript
// Bad - for-in loop
for (let key in object) {
  console.log(object[key]);
}

// Good - for-of loop
for (let value of Object.values(object)) {
  console.log(value);
}

// Best - for loop for arrays
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}
```

**4. Debouncing and Throttling:**

```javascript
// Debouncing - delay execution until after events stop
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttling - limit execution frequency
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Usage
const debouncedSearch = debounce(searchFunction, 300);
const throttledScroll = throttle(scrollFunction, 100);
```

**5. Lazy Loading:**

```javascript
// Lazy load images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));
```

**6. Web Workers:**

```javascript
// main.js
const worker = new Worker('worker.js');

worker.postMessage({ data: largeArray });

worker.onmessage = function (e) {
  console.log('Result:', e.data);
};

// worker.js
self.onmessage = function (e) {
  const { data } = e.data;
  const result = data.map(item => item * 2); // Heavy computation
  self.postMessage(result);
};
```

**7. Memory Optimization:**

```javascript
// Use WeakMap for metadata
const metadata = new WeakMap();

function addMetadata(obj, data) {
  metadata.set(obj, data);
}

// Use object pooling for frequently created objects
class ObjectPool {
  constructor(createFn) {
    this.createFn = createFn;
    this.pool = [];
  }

  get() {
    return this.pool.pop() || this.createFn();
  }

  release(obj) {
    this.pool.push(obj);
  }
}
```

---

## Question 10: JavaScript Testing

**Question:** How do you write effective tests for JavaScript code?

**Answer:**
**Testing Types:**

- **Unit Tests**: Test individual functions/components
- **Integration Tests**: Test how multiple units work together
- **End-to-End Tests**: Test complete user workflows

**Jest Testing Framework:**

```javascript
// math.js
function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Arguments must be numbers');
  }
  return a + b;
}

// math.test.js
describe('add function', () => {
  test('adds two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
  });

  test('throws error for non-number arguments', () => {
    expect(() => add('2', 3)).toThrow('Arguments must be numbers');
    expect(() => add(2, '3')).toThrow('Arguments must be numbers');
  });

  test('handles edge cases', () => {
    expect(add(Number.MAX_VALUE, 1)).toBe(Number.MAX_VALUE + 1);
  });
});
```

**Async Testing:**

```javascript
// api.js
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
}

// api.test.js
describe('fetchUser', () => {
  test('fetches user successfully', async () => {
    const mockUser = { id: 1, name: 'John' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUser),
    });

    const result = await fetchUser(1);
    expect(result).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith('/api/users/1');
  });

  test('throws error when user not found', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    await expect(fetchUser(999)).rejects.toThrow('User not found');
  });
});
```

**Mocking:**

```javascript
// userService.js
class UserService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async getUser(id) {
    const user = await this.apiClient.get(`/users/${id}`);
    return {
      ...user,
      displayName: `${user.firstName} ${user.lastName}`,
    };
  }
}

// userService.test.js
describe('UserService', () => {
  let userService;
  let mockApiClient;

  beforeEach(() => {
    mockApiClient = {
      get: jest.fn(),
    };
    userService = new UserService(mockApiClient);
  });

  test('getUser returns user with displayName', async () => {
    const mockUser = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
    };

    mockApiClient.get.mockResolvedValue(mockUser);

    const result = await userService.getUser(1);

    expect(result).toEqual({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      displayName: 'John Doe',
    });
    expect(mockApiClient.get).toHaveBeenCalledWith('/users/1');
  });
});
```

**Testing Best Practices:**

```javascript
// 1. Test behavior, not implementation
// Bad
test('calls setState', () => {
  const component = shallow(<MyComponent />);
  component.instance().handleClick();
  expect(component.state().clicked).toBe(true);
});

// Good
test('shows success message when clicked', () => {
  const component = shallow(<MyComponent />);
  component.find('button').simulate('click');
  expect(component.find('.success-message')).toHaveLength(1);
});

// 2. Use descriptive test names
test('should return error when email format is invalid', () => {
  // test implementation
});

// 3. Test edge cases
test('handles empty array input', () => {
  expect(processArray([])).toEqual([]);
});

test('handles null input gracefully', () => {
  expect(() => processArray(null)).not.toThrow();
});

// 4. Use setup and teardown
describe('Database operations', () => {
  let db;

  beforeAll(async () => {
    db = await setupTestDatabase();
  });

  afterAll(async () => {
    await cleanupTestDatabase(db);
  });

  beforeEach(() => {
    // Reset database state
  });
});
```

---

## Question 11: Variable Declarations - let, const, var

**Question:** What is the difference between let, const, and var?

**Answer:**

**var:**

- Function-scoped or globally-scoped
- Hoisted and initialized with `undefined`
- Can be redeclared
- Can cause issues with block scope

**let:**

- Block-scoped (`{}`)
- Hoisted but not initialized (Temporal Dead Zone)
- Cannot be redeclared in the same scope
- Better for loop variables

**const:**

- Block-scoped
- Must be initialized at declaration
- Cannot be reassigned
- Note: The object it points to can still be mutated

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

// const - block scoped, immutable reference
const z = 1;
z = 2; // TypeError

const obj = { name: 'John' };
obj.name = 'Jane'; // OK - object is mutable
obj = {}; // TypeError - cannot reassign
```

---

## Question 12: Event Bubbling and Capturing

**Question:** Explain Event Bubbling and Capturing.

**Answer:**
These are two phases of event propagation in the DOM:

**1. Capturing (Trickling):**

- Event travels from the root of the DOM tree down to the target element
- Use `addEventListener(event, callback, true)` to listen in capturing phase

**2. Target:**

- Event reaches the target element

**3. Bubbling:**

- Event bubbles up from the target element back to the root
- This is the default behavior

**Example:**

```html
<div id="parent">
  <button id="child">Click me</button>
</div>
```

```javascript
// Capturing phase
document.getElementById('parent').addEventListener(
  'click',
  function () {
    console.log('Parent clicked (capturing)');
  },
  true
);

// Bubbling phase (default)
document.getElementById('parent').addEventListener('click', function () {
  console.log('Parent clicked (bubbling)');
});

document.getElementById('child').addEventListener('click', function () {
  console.log('Child clicked');
});

// Output when clicking button:
// Parent clicked (capturing)
// Child clicked
// Parent clicked (bubbling)
```

**Stopping Propagation:**

```javascript
element.addEventListener('click', function (event) {
  event.stopPropagation(); // Stops event from bubbling/capturing
  event.stopImmediatePropagation(); // Stops all event listeners
});
```

---

## Question 13: Closures - Advantages and Disadvantages

**Question:** What is a Closure? What are its advantages and disadvantages?

**Answer:**
A closure is a function that "remembers" and has access to variables from its lexical (outer) scope even after that outer function has finished executing.

**Advantages:**

- **Data Privacy**: Emulate private variables in JavaScript
- **Function Factories**: Create specialized functions
- **Event Handlers**: Maintain state in event callbacks
- **Module Pattern**: Create encapsulated modules

**Disadvantages:**

- **Memory Leaks**: Variables enclosed in a closure cannot be garbage collected as long as the function exists
- **Performance**: Closures can be slower than regular functions
- **Debugging**: Can make debugging more complex

**Examples:**

**Data Privacy:**

```javascript
function createCounter() {
  let count = 0; // Private variable

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = createCounter();
console.log(counter.getCount()); // 0
counter.increment();
console.log(counter.getCount()); // 1
// count is not directly accessible
```

**Function Factory:**

```javascript
function createMultiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

**Memory Leak Example:**

```javascript
function createHandler() {
  const largeData = new Array(1000000).fill('data');

  return function () {
    // This closure keeps largeData in memory
    console.log('Handler called');
  };
}

const handler = createHandler();
// largeData cannot be garbage collected until handler is removed
```

---

## Question 14: Event Loop Execution Order

**Question:** What is the output of the following code and why?

```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
```

**Answer:**
The output will be: **1, 3, 2**

**Explanation:**
Even though the setTimeout has a delay of 0, its callback is a macrotask and is pushed to the Web APIs and then the Task Queue. The Event Loop will only execute it after the current call stack is empty (i.e., after 1 and 3 have been logged).

**Event Loop Steps:**

1. `console.log('1')` executes immediately (call stack)
2. `setTimeout` is registered with Web APIs (0ms delay)
3. `console.log('3')` executes immediately (call stack)
4. Call stack is now empty
5. Event loop moves the setTimeout callback to the call stack
6. `console.log('2')` executes

**More Complex Example:**

```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2
```

**Why 3 comes before 2:**

- Promises create microtasks (higher priority)
- setTimeout creates macrotasks (lower priority)
- Microtasks are processed before macrotasks

---

## Question 15: async/await and Promises

**Question:** What is the relationship between async/await and Promises?

**Answer:**
async/await is syntactic sugar built on top of Promises. It makes asynchronous code look and behave more like synchronous code.

**Key Points:**

- An `async` function always returns a Promise
- The `await` keyword pauses the execution of the async function until the Promise is settled
- `await` can only be used inside `async` functions
- `async/await` handles both resolved and rejected Promises

**Examples:**

**Basic async/await:**

```javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

**Equivalent Promise version:**

```javascript
function fetchData() {
  return fetch('/api/data')
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });
}
```

**Parallel execution:**

```javascript
// Sequential (slower)
async function sequential() {
  const user = await fetchUser();
  const posts = await fetchPosts();
  return { user, posts };
}

// Parallel (faster)
async function parallel() {
  const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
  return { user, posts };
}
```

**Error handling:**

```javascript
async function handleErrors() {
  try {
    const result = await riskyOperation();
    return result;
  } catch (error) {
    // Handle both sync and async errors
    console.error('Operation failed:', error);
    throw error; // Re-throw if needed
  }
}
```

---

## Question 16: Pure Functions

**Question:** What is a Pure Function?

**Answer:**
A pure function is a function where the output is determined only by its input arguments, without any observable side effects.

**Characteristics:**

- **Deterministic**: Same inputs always produce the same output
- **No Side Effects**: Doesn't modify external state, make API calls, or modify the DOM
- **Referential Transparency**: Can be replaced with its return value without changing program behavior

**Examples:**

**Pure Function:**

```javascript
function add(a, b) {
  return a + b;
}

function multiplyByTwo(numbers) {
  return numbers.map(n => n * 2);
}

function filterEvens(numbers) {
  return numbers.filter(n => n % 2 === 0);
}
```

**Impure Functions:**

```javascript
let counter = 0;

function increment() {
  counter++; // Side effect: modifies external state
  return counter;
}

function getCurrentTime() {
  return new Date(); // Side effect: different output each time
}

function logMessage(message) {
  console.log(message); // Side effect: I/O operation
  return message;
}
```

**Benefits:**

- **Predictable**: Easy to reason about and test
- **Cacheable**: Results can be memoized
- **Parallelizable**: Safe to run in parallel
- **Testable**: No need to mock external dependencies

**Example with Memoization:**

```javascript
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalculation = memoize(n => {
  console.log('Computing...');
  return n * n * n;
});

expensiveCalculation(5); // Computing... 125
expensiveCalculation(5); // 125 (from cache)
```

---

## Question 17: Generator Functions

**Question:** What is a Generator Function?

**Answer:**
A generator function (defined with `function*`) can be paused and resumed. When called, it returns a generator object (which is an iterator). Execution is paused at each `yield` expression.

**Key Features:**

- **Pausable**: Can pause execution with `yield`
- **Resumable**: Can resume execution from where it left off
- **Iterator**: Returns an iterator object
- **Lazy Evaluation**: Values are generated on demand

**Basic Example:**

```javascript
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

**Practical Examples:**

**1. Infinite Sequence:**

```javascript
function* fibonacci() {
  let a = 0,
    b = 1;

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
```

**2. Custom Iterator:**

```javascript
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for (const num of range(1, 5)) {
  console.log(num); // 1, 2, 3, 4, 5
}
```

**3. Data Processing Pipeline:**

```javascript
function* dataProcessor(data) {
  for (const item of data) {
    if (item > 0) {
      yield item * 2;
    }
  }
}

const numbers = [-1, 2, -3, 4, 5];
const processed = [...dataProcessor(numbers)];
console.log(processed); // [4, 8, 10]
```

**Use Cases:**

- **Custom Iterators**: Create iterable objects
- **Lazy Evaluation**: Generate values on demand
- **State Machines**: Manage complex state transitions
- **Async Flow Control**: Before async/await was available

---

## Question 18: Proxy Objects

**Question:** What is a Proxy object?

**Answer:**
A Proxy object wraps another object and allows you to intercept and redefine fundamental operations for that object, such as property lookup, assignment, enumeration, and function invocation.

**Syntax:**

```javascript
const proxy = new Proxy(target, handler);
```

**Common Use Cases:**

- **Validation**: Validate property assignments
- **Logging**: Log property access and modifications
- **Reactive State**: Create reactive data structures
- **Virtual Properties**: Create computed properties

**Examples:**

**1. Property Validation:**

```javascript
const person = new Proxy(
  {},
  {
    set(target, property, value) {
      if (property === 'age' && typeof value !== 'number') {
        throw new TypeError('Age must be a number');
      }
      if (property === 'age' && value < 0) {
        throw new RangeError('Age cannot be negative');
      }
      target[property] = value;
      return true;
    },
  }
);

person.name = 'John'; // OK
person.age = 25; // OK
person.age = 'invalid'; // TypeError: Age must be a number
```

**2. Logging Proxy:**

```javascript
const loggedObject = new Proxy(
  {},
  {
    get(target, property) {
      console.log(`Getting property: ${property}`);
      return target[property];
    },
    set(target, property, value) {
      console.log(`Setting property: ${property} = ${value}`);
      target[property] = value;
      return true;
    },
  }
);

loggedObject.name = 'Alice'; // Setting property: name = Alice
console.log(loggedObject.name); // Getting property: name, Alice
```

**3. Reactive State (Vue 3 style):**

```javascript
function reactive(target) {
  return new Proxy(target, {
    get(target, property) {
      console.log(`Accessing: ${property}`);
      return target[property];
    },
    set(target, property, value) {
      console.log(`Updating: ${property} = ${value}`);
      target[property] = value;
      // Trigger reactivity system
      return true;
    },
  });
}

const state = reactive({ count: 0 });
state.count++; // Accessing: count, Updating: count = 1
```

**4. Virtual Properties:**

```javascript
const user = new Proxy(
  { firstName: 'John', lastName: 'Doe' },
  {
    get(target, property) {
      if (property === 'fullName') {
        return `${target.firstName} ${target.lastName}`;
      }
      return target[property];
    },
  }
);

console.log(user.fullName); // John Doe
```

**Available Traps:**

- `get`: Property access
- `set`: Property assignment
- `has`: `in` operator
- `deleteProperty`: `delete` operator
- `ownKeys`: `Object.keys()`
- `apply`: Function calls
- `construct`: `new` operator

---

## Question 19: Tail Call Optimization (TCO)

**Question:** What is Tail Call Optimization (TCO) and is it supported in JavaScript?

**Answer:**
TCO is a compiler feature where a recursive function call in tail position (the last action in a function) is optimized to reuse the current stack frame instead of creating a new one. This prevents stack overflow for deep recursion.

**Tail Position:**
A function call is in tail position if it's the last thing executed before the function returns.

**Examples:**

**Tail Recursive (can be optimized):**

```javascript
function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return factorial(n - 1, n * acc); // Tail call
}

// This can be optimized to use constant stack space
console.log(factorial(5)); // 120
```

**Not Tail Recursive:**

```javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1); // Not tail call - multiplication after return
}

// This cannot be optimized and will use O(n) stack space
```

**JavaScript Support:**
As of now, TCO is only implemented in the JavaScript engine of **Safari**. It is **not supported** in:

- **V8** (Chrome, Node.js, Edge)
- **SpiderMonkey** (Firefox)

**Workarounds:**

**1. Trampoline Pattern:**

```javascript
function trampoline(fn) {
  while (typeof fn === 'function') {
    fn = fn();
  }
  return fn;
}

function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return () => factorial(n - 1, n * acc);
}

const result = trampoline(factorial(1000));
console.log(result);
```

**2. Iterative Approach:**

```javascript
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorialIterative(1000)); // Works without stack overflow
```

**3. Generator-based:**

```javascript
function* factorialGenerator(n, acc = 1) {
  if (n <= 1) {
    yield acc;
  } else {
    yield* factorialGenerator(n - 1, n * acc);
  }
}

const result = factorialGenerator(1000).next().value;
console.log(result);
```

**Benefits of TCO:**

- **Memory Efficiency**: Constant stack space usage
- **Performance**: No function call overhead
- **Safety**: Prevents stack overflow for deep recursion
- **Functional Programming**: Enables recursive algorithms without performance concerns

---

## Question 11: JavaScript Scope Deep Understanding

**Question:** What is scope in JavaScript, and why is it crucial for a senior developer to understand?

**Answer:**
Scope defines the accessibility or visibility of variables and functions in your code. A senior developer must instantly recognize the scope of any variable (e.g., global, module, function, block) to predict code behavior, avoid bugs, and manage memory effectively. They understand that data lives in scopes, and misjudging scope leads to undefined errors, memory leaks, or unintended variable mutations.

**Types of Scope:**

```javascript
// 1. Global Scope
var globalVar = 'I am global';
let globalLet = 'I am also global';
const globalConst = 'I am global too';

function globalFunction() {
  console.log(globalVar); // Accessible
}

// 2. Function Scope
function functionScope() {
  var functionVar = 'I am function scoped';
  let functionLet = 'I am function scoped';
  const functionConst = 'I am function scoped';

  // All variables are accessible here
  console.log(functionVar, functionLet, functionConst);
}

// console.log(functionVar); // ReferenceError: functionVar is not defined

// 3. Block Scope (ES6+)
if (true) {
  var blockVar = 'I am function scoped (hoisted)';
  let blockLet = 'I am block scoped';
  const blockConst = 'I am block scoped';

  console.log(blockVar, blockLet, blockConst); // All accessible
}

console.log(blockVar); // Accessible (hoisted)
// console.log(blockLet); // ReferenceError: blockLet is not defined
// console.log(blockConst); // ReferenceError: blockConst is not defined

// 4. Module Scope
// In ES6 modules, variables are module-scoped
export const moduleVar = 'I am module scoped';
```

**Scope Chain and Lexical Scoping:**

```javascript
// Lexical scoping: inner functions have access to outer scope
function outerFunction(x) {
  // Outer scope
  const outerVar = 'outer';

  function innerFunction(y) {
    // Inner scope
    const innerVar = 'inner';

    // Can access outer scope
    console.log(x, outerVar, y, innerVar);

    function deepestFunction(z) {
      // Deepest scope
      console.log(x, outerVar, y, innerVar, z);
    }

    return deepestFunction;
  }

  return innerFunction;
}

const inner = outerFunction('parameter');
const deepest = inner('inner-param');
deepest('deepest-param');
```

**Common Scope Pitfalls:**

```javascript
// 1. Variable Hoisting
console.log(hoistedVar); // undefined (not ReferenceError)
var hoistedVar = 'I am hoisted';

// 2. Temporal Dead Zone
// console.log(temporalVar); // ReferenceError
let temporalVar = 'I am in TDZ';

// 3. Loop Variable Capture
const functions = [];
for (var i = 0; i < 3; i++) {
  functions.push(() => console.log(i)); // All log 3
}
functions.forEach(fn => fn()); // 3, 3, 3

// Fix with let
const functionsFixed = [];
for (let i = 0; i < 3; i++) {
  functionsFixed.push(() => console.log(i)); // Each logs its own value
}
functionsFixed.forEach(fn => fn()); // 0, 1, 2

// 4. Global Pollution
function badFunction() {
  // Accidentally creates global variable
  globalPollution = 'I am global!';
}

badFunction();
console.log(window.globalPollution); // 'I am global!'
```

**Memory Management and Scope:**

```javascript
// Memory leaks through closures
function createLeak() {
  const largeData = new Array(1000000).fill('data');

  return function () {
    // This closure keeps largeData in memory
    console.log('Closure executed');
  };
}

const leakyFunction = createLeak();
// largeData is still in memory even though createLeak finished

// Proper cleanup
function createCleanClosure() {
  const largeData = new Array(1000000).fill('data');

  return function () {
    console.log('Clean closure');
    // Explicitly clear reference
    largeData.length = 0;
  };
}
```

---

## Question 12: Closures Practical Examples

**Question:** Explain closures and provide a practical example of their use.

**Answer:**
A closure is a function that "encloses" or remembers its lexical scope, even when that function is executed outside that scope. This means it has continuous access to variables from the place where it was created, not where it is called.

**Basic Closure Example:**

```javascript
function createCounter() {
  let count = 0; // `count` is enclosed by the inner function

  return function increment() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// Each counter maintains its own private state
const counter2 = createCounter();
console.log(counter2()); // 1 (independent state)
console.log(counter()); // 4 (original counter still works)
```

**Practical Use Cases:**

**1. Module Pattern:**

```javascript
const userModule = (function () {
  let users = [];
  let currentUser = null;

  return {
    addUser: function (user) {
      users.push(user);
    },

    getUsers: function () {
      return [...users]; // Return copy to prevent external mutation
    },

    setCurrentUser: function (user) {
      currentUser = user;
    },

    getCurrentUser: function () {
      return currentUser;
    },

    getUserCount: function () {
      return users.length;
    },
  };
})();

// Usage
userModule.addUser({ name: 'John', id: 1 });
userModule.addUser({ name: 'Jane', id: 2 });
console.log(userModule.getUserCount()); // 2
console.log(userModule.getUsers()); // [{ name: 'John', id: 1 }, { name: 'Jane', id: 2 }]

// users and currentUser are private - cannot be accessed directly
```

**2. Function Factories:**

```javascript
function createMultiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// More complex factory
function createValidator(rules) {
  return function (data) {
    const errors = [];

    for (const [field, rule] of Object.entries(rules)) {
      if (rule.required && !data[field]) {
        errors.push(`${field} is required`);
      }

      if (rule.minLength && data[field]?.length < rule.minLength) {
        errors.push(`${field} must be at least ${rule.minLength} characters`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };
}

const userValidator = createValidator({
  name: { required: true, minLength: 2 },
  email: { required: true, minLength: 5 },
});

console.log(userValidator({ name: 'J', email: 'test@example.com' }));
// { isValid: false, errors: ['name must be at least 2 characters'] }
```

**3. Event Handlers with State:**

```javascript
function createButtonHandler(buttonId) {
  let clickCount = 0;

  return function (event) {
    clickCount++;
    console.log(`Button ${buttonId} clicked ${clickCount} times`);

    if (clickCount === 3) {
      event.target.disabled = true;
      console.log(`Button ${buttonId} disabled after 3 clicks`);
    }
  };
}

// Each button gets its own click counter
const button1Handler = createButtonHandler('btn1');
const button2Handler = createButtonHandler('btn2');

// In real DOM:
// document.getElementById('btn1').addEventListener('click', button1Handler);
// document.getElementById('btn2').addEventListener('click', button2Handler);
```

**4. Memoization:**

```javascript
function createMemoizedFunction(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log('Cache hit!');
      return cache.get(key);
    }

    console.log('Computing...');
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Expensive calculation
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFibonacci = createMemoizedFunction(fibonacci);

console.log(memoizedFibonacci(10)); // Computing... 55
console.log(memoizedFibonacci(10)); // Cache hit! 55
console.log(memoizedFibonacci(11)); // Computing... 89
```

**5. Partial Application:**

```javascript
function createPartialFunction(fn, ...presetArgs) {
  return function (...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

function add(a, b, c) {
  return a + b + c;
}

const add5 = createPartialFunction(add, 5);
const add5And10 = createPartialFunction(add, 5, 10);

console.log(add5(3, 2)); // 10 (5 + 3 + 2)
console.log(add5And10(1)); // 16 (5 + 10 + 1)

// Real-world example: API calls
function apiCall(method, url, data) {
  return fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined,
  });
}

const get = createPartialFunction(apiCall, 'GET');
const post = createPartialFunction(apiCall, 'POST');

// Usage
// get('/api/users')
// post('/api/users', { name: 'John' })
```

---

## Question 13: Event Loop Execution Order

**Question:** Describe the JavaScript Event Loop. What is the execution order of this code: `console.log('start'); setTimeout(() => console.log('timeout'), 0); Promise.resolve().then(() => console.log('promise')); console.log('end');`?

**Answer:**
The Event Loop manages asynchronous execution. It has a Call Stack for synchronous code, a Microtask Queue for promises, and a Macrotask Queue for timers and events.

**Execution Order:**

1. `'start'` (sync, goes to stack)
2. `'end'` (sync, goes to stack)
3. `'promise'` (microtask, runs after sync code)
4. `'timeout'` (macrotask, runs after microtasks are clear)

**Output:** start, end, promise, timeout

**Event Loop Components:**

```javascript
// 1. Call Stack - Synchronous execution
console.log('1'); // Goes to call stack immediately

// 2. Web APIs - Handle async operations
setTimeout(() => console.log('2'), 0); // Goes to Web API, then macrotask queue
setInterval(() => console.log('interval'), 1000); // Goes to Web API

// 3. Microtask Queue - Higher priority
Promise.resolve().then(() => console.log('3')); // Goes to microtask queue
queueMicrotask(() => console.log('4')); // Goes to microtask queue

// 4. Macrotask Queue - Lower priority
setTimeout(() => console.log('5'), 0); // Goes to macrotask queue

console.log('6'); // Goes to call stack immediately

// Execution order: 1, 6, 3, 4, 2, 5
```

**Detailed Event Loop Flow:**

```javascript
// Step-by-step execution
console.log('start'); // 1. Call stack: ['start'] -> logs 'start'

setTimeout(() => console.log('timeout'), 0);
// 2. Web API: setTimeout registered
// 3. Call stack: [] (empty)
// 4. Macrotask queue: [timeout callback]

Promise.resolve().then(() => console.log('promise'));
// 5. Web API: Promise resolved
// 6. Microtask queue: [promise callback]

console.log('end'); // 7. Call stack: ['end'] -> logs 'end'

// 8. Call stack is empty, check microtask queue
// 9. Microtask queue: [] -> execute promise callback -> logs 'promise'
// 10. Microtask queue is empty, check macrotask queue
// 11. Macrotask queue: [] -> execute timeout callback -> logs 'timeout'
```

**Priority System:**

```javascript
// Microtasks have higher priority than macrotasks
console.log('1');

setTimeout(() => console.log('macrotask 1'), 0);
setTimeout(() => console.log('macrotask 2'), 0);

Promise.resolve().then(() => console.log('microtask 1'));
Promise.resolve().then(() => console.log('microtask 2'));

queueMicrotask(() => console.log('microtask 3'));

console.log('2');

// Output: 1, 2, microtask 1, microtask 2, microtask 3, macrotask 1, macrotask 2
```

**Real-world Example:**

```javascript
// Understanding this helps with debugging async code
function asyncExample() {
  console.log('1. Start');

  // Macrotask
  setTimeout(() => {
    console.log('4. Timeout 1');

    // Microtask inside macrotask
    Promise.resolve().then(() => {
      console.log('5. Promise inside timeout');
    });
  }, 0);

  // Microtask
  Promise.resolve().then(() => {
    console.log('3. Promise 1');

    // Macrotask inside microtask
    setTimeout(() => {
      console.log('6. Timeout inside promise');
    }, 0);
  });

  console.log('2. End');
}

asyncExample();
// Output: 1. Start, 2. End, 3. Promise 1, 4. Timeout 1, 5. Promise inside timeout, 6. Timeout inside promise
```

**Performance Implications:**

```javascript
// Blocking the event loop
function blockingFunction() {
  console.log('Start blocking');

  // This blocks the event loop
  const start = Date.now();
  while (Date.now() - start < 3000) {
    // 3 seconds of blocking
  }

  console.log('End blocking');
}

// Non-blocking alternative
function nonBlockingFunction() {
  console.log('Start non-blocking');

  // This doesn't block the event loop
  setTimeout(() => {
    console.log('Non-blocking work done');
  }, 3000);

  console.log('End non-blocking');
}

// Test
console.log('Before blocking');
blockingFunction(); // UI freezes for 3 seconds
console.log('After blocking');

console.log('Before non-blocking');
nonBlockingFunction(); // UI remains responsive
console.log('After non-blocking');
```

---

## Question 14: Promises vs Callbacks

**Question:** What problem do Promises solve, and how do they improve upon callback patterns?

**Answer:**
Promises solve "Callback Hell," the deeply nested, hard-to-read, and error-prone code structure that results from handling multiple asynchronous operations with callbacks. Promises provide a chainable `.then().catch()` syntax that flattens the code, making it more readable and easier to reason about. They also offer superior and centralized error handling with `.catch()`.

**Callback Hell Problem:**

```javascript
// ❌ Callback Hell - Hard to read and maintain
getData(
  function (a) {
    getMoreData(
      a,
      function (b) {
        getEvenMoreData(
          b,
          function (c) {
            getFinalData(
              c,
              function (d) {
                console.log('Got all data:', d);
              },
              function (error) {
                console.error('Error in final step:', error);
              }
            );
          },
          function (error) {
            console.error('Error in third step:', error);
          }
        );
      },
      function (error) {
        console.error('Error in second step:', error);
      }
    );
  },
  function (error) {
    console.error('Error in first step:', error);
  }
);
```

**Promise Solution:**

```javascript
// ✅ Promise Chain - Clean and readable
getData()
  .then(a => getMoreData(a))
  .then(b => getEvenMoreData(b))
  .then(c => getFinalData(c))
  .then(d => console.log('Got all data:', d))
  .catch(error => console.error('Something went wrong:', error));
```

**Key Improvements:**

**1. Flattened Structure:**

```javascript
// Callbacks: Nested pyramid
asyncOperation1(result1 => {
  asyncOperation2(result1, result2 => {
    asyncOperation3(result2, result3 => {
      // Deep nesting
    });
  });
});

// Promises: Flat chain
asyncOperation1()
  .then(result1 => asyncOperation2(result1))
  .then(result2 => asyncOperation3(result2))
  .then(result3 => {
    // Clean structure
  });
```

**2. Centralized Error Handling:**

```javascript
// Callbacks: Error handling scattered
function callbackExample() {
  getData((data, error) => {
    if (error) {
      console.error('Step 1 error:', error);
      return;
    }

    processData(data, (result, error) => {
      if (error) {
        console.error('Step 2 error:', error);
        return;
      }

      saveData(result, (saved, error) => {
        if (error) {
          console.error('Step 3 error:', error);
          return;
        }

        console.log('Success:', saved);
      });
    });
  });
}

// Promises: Single error handler
function promiseExample() {
  getData()
    .then(data => processData(data))
    .then(result => saveData(result))
    .then(saved => console.log('Success:', saved))
    .catch(error => {
      // All errors caught here
      console.error('Error in any step:', error);
    });
}
```

**3. Better Composition:**

```javascript
// Parallel operations with callbacks
let results = [];
let completed = 0;
const total = 3;

function checkComplete() {
  completed++;
  if (completed === total) {
    console.log('All done:', results);
  }
}

getData1(result => {
  results[0] = result;
  checkComplete();
});

getData2(result => {
  results[1] = result;
  checkComplete();
});

getData3(result => {
  results[2] = result;
  checkComplete();
});

// Parallel operations with Promises
Promise.all([getData1(), getData2(), getData3()])
  .then(results => {
    console.log('All done:', results);
  })
  .catch(error => {
    console.error('One or more failed:', error);
  });
```

**4. Promise States and Methods:**

```javascript
// Promise states
const pendingPromise = new Promise((resolve, reject) => {
  // Pending state
});

const resolvedPromise = Promise.resolve('resolved');
const rejectedPromise = Promise.reject('rejected');

// Promise methods
Promise.resolve('value')
  .then(value => {
    console.log(value); // 'value'
    return 'new value';
  })
  .then(value => {
    console.log(value); // 'new value'
    throw new Error('Something went wrong');
  })
  .catch(error => {
    console.error(error.message); // 'Something went wrong'
    return 'recovery value';
  })
  .finally(() => {
    console.log('Always executed');
  });
```

**5. Modern Async/Await:**

```javascript
// Even cleaner with async/await
async function modernExample() {
  try {
    const a = await getData();
    const b = await getMoreData(a);
    const c = await getEvenMoreData(b);
    const d = await getFinalData(c);

    console.log('Got all data:', d);
  } catch (error) {
    console.error('Something went wrong:', error);
  }
}

// Parallel execution with async/await
async function parallelExample() {
  try {
    const [result1, result2, result3] = await Promise.all([
      getData1(),
      getData2(),
      getData3(),
    ]);

    console.log('All results:', { result1, result2, result3 });
  } catch (error) {
    console.error('One or more failed:', error);
  }
}
```

---

## Question 15: CommonJS vs ES6 Modules

**Question:** Compare and contrast CommonJS (require/module.exports) and ES6 Modules (import/export).

**Answer:**

| Feature     | CommonJS                                 | ES6 Modules                              |
| ----------- | ---------------------------------------- | ---------------------------------------- |
| Syntax      | `require()`, `module.exports`            | `import`, `export`                       |
| Loading     | Dynamic (runtime)                        | Static (parse-time)                      |
| Analysis    | Hard to analyze (e.g., for tree-shaking) | Enables static analysis and tree-shaking |
| Environment | Primarily Node.js                        | Universal (Node.js + Browsers)           |
| Value       | Copies exported values                   | Live read-only view of exported values   |

**CommonJS Examples:**

```javascript
// math.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = {
  add,
  subtract,
};

// Or individual exports
exports.add = add;
exports.subtract = subtract;

// main.js
const math = require('./math');
const { add, subtract } = require('./math');

console.log(math.add(2, 3)); // 5
console.log(add(2, 3)); // 5

// Dynamic require
const moduleName = 'math';
const mathModule = require(`./${moduleName}`);
```

**ES6 Modules Examples:**

```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// Default export
export default function multiply(a, b) {
  return a * b;
}

// main.js
import multiply, { add, subtract } from './math';
import * as math from './math';

console.log(add(2, 3)); // 5
console.log(multiply(2, 3)); // 6
console.log(math.subtract(5, 2)); // 3

// Dynamic import (async)
const moduleName = 'math';
const mathModule = await import(`./${moduleName}`);
```

**Key Differences:**

**1. Loading Time:**

```javascript
// CommonJS - Runtime loading
if (condition) {
  const module = require('./module'); // Loaded at runtime
}

// ES6 - Parse-time loading (static)
// import module from './module'; // Must be at top level
// Cannot be inside conditionals

// ES6 Dynamic import (async)
if (condition) {
  const module = await import('./module'); // Async loading
}
```

**2. Value Binding:**

```javascript
// CommonJS - Value copying
// counter.js
let count = 0;
module.exports = {
  getCount: () => count,
  increment: () => ++count,
};

// main.js
const counter1 = require('./counter');
const counter2 = require('./counter');

counter1.increment();
console.log(counter1.getCount()); // 1
console.log(counter2.getCount()); // 1 (shared state)

// ES6 - Live binding
// counter.js
let count = 0;
export const getCount = () => count;
export const increment = () => ++count;

// main.js
import { getCount, increment } from './counter';

increment();
console.log(getCount()); // 1 (live binding)
```

**3. Tree Shaking:**

```javascript
// CommonJS - No tree shaking
// utils.js
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
exports.multiply = (a, b) => a * b;

// main.js
const { add } = require('./utils'); // All functions bundled

// ES6 - Tree shaking possible
// utils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;

// main.js
import { add } from './utils'; // Only 'add' function bundled
```

**4. Hoisting Behavior:**

```javascript
// CommonJS
console.log(typeof require); // 'function'
console.log(typeof module); // 'object'

// ES6
console.log(typeof import); // 'undefined' (not hoisted)
console.log(typeof export); // 'undefined' (not hoisted)

// Import hoisting
console.log(myFunction()); // Works! (imports are hoisted)

import { myFunction } from './module';
```

**5. Circular Dependencies:**

```javascript
// CommonJS - Partial loading
// a.js
console.log('a starting');
const b = require('./b');
console.log('in a, b.done =', b.done);
module.exports = { done: true };

// b.js
console.log('b starting');
const a = require('./a');
console.log('in b, a.done =', a.done);
module.exports = { done: true };

// Output: a starting, b starting, in b, a.done = undefined, in a, b.done = true

// ES6 - Live binding
// a.js
console.log('a starting');
import { done as bDone } from './b.js';
console.log('in a, b.done =', bDone);
export const done = true;

// b.js
console.log('b starting');
import { done as aDone } from './a.js';
console.log('in b, a.done =', aDone);
export const done = true;

// Output: a starting, b starting, in b, a.done = undefined, in a, b.done = true
```

**Migration Example:**

```javascript
// Before (CommonJS)
const express = require('express');
const { Router } = require('express');
const path = require('path');

const app = express();
const router = Router();

module.exports = { app, router };

// After (ES6)
import express, { Router } from 'express';
import path from 'path';

const app = express();
const router = Router();

export { app, router };
```

---

## Question 11: JavaScript Scope Deep Understanding

**Question:** What is scope in JavaScript, and why is it crucial for a senior developer to understand?

**Answer:**
Scope defines the accessibility or visibility of variables and functions in your code. A senior developer must instantly recognize the scope of any variable (e.g., global, module, function, block) to predict code behavior, avoid bugs, and manage memory effectively. They understand that data lives in scopes, and misjudging scope leads to undefined errors, memory leaks, or unintended variable mutations.

**Types of Scope:**

**1. Global Scope:**

```javascript
var globalVar = 'I am global';

function test() {
  console.log(globalVar); // Accessible everywhere
}

// Can be accessed from anywhere
console.log(window.globalVar); // In browsers
```

**2. Function Scope:**

```javascript
function outerFunction() {
  var functionScoped = 'I am function scoped';

  function innerFunction() {
    console.log(functionScoped); // Accessible
  }

  innerFunction();
}

// console.log(functionScoped); // ReferenceError
```

**3. Block Scope (ES6):**

```javascript
if (true) {
  let blockScoped = 'I am block scoped';
  const alsoBlockScoped = 'Me too';

  console.log(blockScoped); // Works
}

// console.log(blockScoped); // ReferenceError
```

**4. Module Scope:**

```javascript
// module.js
const moduleScoped = 'I am module scoped';
export { moduleScoped };

// other-module.js
import { moduleScoped } from './module.js';
console.log(moduleScoped); // Works
```

**Scope Chain and Lexical Scoping:**

```javascript
const globalVar = 'global';

function outer() {
  const outerVar = 'outer';

  function inner() {
    const innerVar = 'inner';

    // Can access all three variables
    console.log(innerVar); // 'inner'
    console.log(outerVar); // 'outer'
    console.log(globalVar); // 'global'
  }

  inner();
}

outer();
```

**Why Scope Matters for Senior Developers:**

- **Memory Management**: Understanding when variables are garbage collected
- **Debugging**: Quickly identify where variables are accessible
- **Performance**: Avoid creating unnecessary closures
- **Security**: Prevent variable pollution and unintended access
- **Code Architecture**: Design proper encapsulation and data flow

---

## Question 12: Closures Practical Applications

**Question:** Explain closures and provide a practical example of their use.

**Answer:**
A closure is a function that "encloses" or remembers its lexical scope, even when that function is executed outside that scope. This means it has continuous access to variables from the place where it was created, not where it is called.

**Basic Closure Example:**

```javascript
function createCounter() {
  let count = 0; // `count` is enclosed by the inner function

  return function increment() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

**Practical Use Cases:**

**1. Data Privacy (Module Pattern):**

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable

  return {
    deposit: function (amount) {
      balance += amount;
      return balance;
    },
    withdraw: function (amount) {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      throw new Error('Insufficient funds');
    },
    getBalance: function () {
      return balance;
    },
  };
}

const account = createBankAccount(1000);
console.log(account.getBalance()); // 1000
account.deposit(500);
console.log(account.getBalance()); // 1500
// account.balance; // undefined - private!
```

**2. Function Factories:**

```javascript
function createMultiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

**3. Event Handlers with State:**

```javascript
function createButtonHandler(buttonId) {
  let clickCount = 0;

  return function (event) {
    clickCount++;
    console.log(`Button ${buttonId} clicked ${clickCount} times`);

    if (clickCount === 3) {
      event.target.disabled = true;
      console.log('Button disabled after 3 clicks');
    }
  };
}

// Usage
document
  .getElementById('myButton')
  .addEventListener('click', createButtonHandler('myButton'));
```

**4. Memoization:**

```javascript
function createMemoizedFunction(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache[key]) {
      console.log('Cache hit!');
      return cache[key];
    }

    console.log('Computing...');
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// Usage
const expensiveCalculation = createMemoizedFunction(function (n) {
  // Simulate expensive operation
  let result = 0;
  for (let i = 0; i < n * 1000000; i++) {
    result += i;
  }
  return result;
});

console.log(expensiveCalculation(5)); // Computing...
console.log(expensiveCalculation(5)); // Cache hit!
```

**Closure Advantages:**

- **Data Privacy**: Create private variables
- **Stateful Functions**: Functions that remember their state
- **Function Factories**: Create specialized functions
- **Event Handling**: Maintain state across event calls
- **Module Pattern**: Encapsulate related functionality

**Closure Disadvantages:**

- **Memory Usage**: Closures keep references to outer scope variables
- **Memory Leaks**: Can prevent garbage collection if not handled properly
- **Debugging Complexity**: Can make debugging more difficult
- **Performance**: Slight overhead due to scope chain lookup

---

## Question 27: JavaScript Hoisting and Variable Declarations

**Question:** What's the output of this code?

```javascript
function sayHi() {
  console.log(name);
  console.log(age);
  var name = 'Lydia';
  let age = 21;
}

sayHi();
```

**Answer:**

The output is `undefined` and `ReferenceError`.

**Explanation:**

Within the function, we first declare the `name` variable with the `var` keyword. This means that the variable gets hoisted (memory space is set up during the creation phase) with the default value of `undefined`, until we actually get to the line where we define the variable. We haven't defined the variable yet on the line where we try to log the `name` variable, so it still holds the value of `undefined`.

Variables with the `let` keyword (and `const`) are hoisted, but unlike `var`, don't get initialized. They are not accessible before the line we declare (initialize) them. This is called the "temporal dead zone". When we try to access the variables before they are declared, JavaScript throws a `ReferenceError`.

---

## Question 28: JavaScript Event Loop and setTimeout

**Question:** What's the output of this code?

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
```

**Answer:**

The output is `3 3 3` and `0 1 2`.

**Explanation:**

Because of the event queue in JavaScript, the `setTimeout` callback function is called after the loop has been executed. Since the variable `i` in the first loop was declared using the `var` keyword, this value was global. During the loop, we incremented the value of `i` by `1` each time, using the unary operator `++`. By the time the `setTimeout` callback function was invoked, `i` was equal to `3` in the first example.

In the second loop, the variable `i` was declared using the `let` keyword: variables declared with the `let` (and `const`) keyword are block-scoped (a block is anything between `{ }`). During each iteration, `i` will have a new value, and each value is scoped inside the loop.

---

## Question 29: JavaScript Arrow Functions and `this` Context

**Question:** What's the output of this code?

```javascript
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.diameter());
console.log(shape.perimeter());
```

**Answer:**

The output is `20` and `NaN`.

**Explanation:**

Note that the value of `diameter` is a regular function, whereas the value of `perimeter` is an arrow function.

With arrow functions, the `this` keyword refers to its current surrounding scope, unlike regular functions! This means that when we call `perimeter`, it doesn't refer to the shape object, but to its surrounding scope (window for example).

Since there is no value `radius` in the scope of the arrow function, `this.radius` returns `undefined` which, when multiplied by `2 * Math.PI`, results in `NaN`.

---

## Question 30: JavaScript Type Coercion

**Question:** What's the output of this code?

```javascript
+true;
!'Lydia';
```

**Answer:**

The output is `1` and `false`.

**Explanation:**

The unary plus tries to convert an operand to a number. `true` is `1`, and `false` is `0`.

The string `'Lydia'` is a truthy value. What we're actually asking, is "Is this truthy value falsy?". This returns `false`.

---

## Question 31: JavaScript Object Property Access

**Question:** Which one is true?

```javascript
const bird = {
  size: 'small',
};

const mouse = {
  name: 'Mickey',
  small: true,
};
```

**Answer:**

`mouse.bird.size` is not valid.

**Explanation:**

In JavaScript, all object keys are strings (or Symbols). Even though we might not type them as strings, they are always converted into strings under the hood.

JavaScript interprets (or unboxes) statements. When we use bracket notation, it sees the first opening bracket `[` and keeps going until it finds the closing bracket `]`. Only then, it will evaluate the statement.

`mouse[bird.size]`: First it evaluates `bird.size`, which is `"small"`. `mouse["small"]` returns `true`.

However, with dot notation, this doesn't happen. `mouse` does not have a key called `bird`, which means `mouse.bird` is `undefined`. Then, we ask for the `size` using dot notation: `mouse.bird.size`. Since `mouse.bird` is `undefined`, we're actually asking `undefined.size`. This isn't valid, and will throw an error similar to `Cannot read property 'size' of undefined`.

---

## Question 32: JavaScript Array Methods and Mutation

**Question:** What's the output of this code?

```javascript
let c = { greeting: 'Hey!' };
let d;

d = c;
c.greeting = 'Hello';
console.log(d.greeting);
```

**Answer:**

The output is `Hello`.

**Explanation:**

In JavaScript, all objects interact by reference when setting them equal to each other.

First, variable `c` holds a value to an object. Later, we assign `d` with the same reference that `c` has to the object.

When you change one object, you change all of them.

---

## Question 33: JavaScript Function Parameters and Arguments

**Question:** What's the output of this code?

```javascript
function getAge(...args) {
  console.log(typeof args);
}

getAge(21);
```

**Answer:**

The output is `object`.

**Explanation:**

The rest parameter (`...args`) lets us "collect" all remaining arguments into an array. An array is an object, so `typeof args` returns `"object"`.

---

## Question 34: JavaScript Prototype Chain

**Question:** What's the output of this code?

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person('Lydia', 'Hallie');
Person.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

console.log(member.getFullName());
```

**Answer:**

The code will throw a `TypeError`.

**Explanation:**

You can't add properties to a constructor like you can with regular objects. If you want to add a feature to all objects at once, you have to use the prototype instead. So in this case:

```javascript
Person.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};
```

would have made `member.getFullName()` work. In this case, we're trying to add a method as a property on the constructor function. `member` is an instance of `Person`, and doesn't have access to this method. Since `getFullName` is not defined on `member`, it throws a `TypeError`.

---

## Question 35: JavaScript Event Loop and Promise

**Question:** What's the output of this code?

```javascript
console.log('start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('promise');
});

console.log('end');
```

**Answer:**

The output is:

```
start
end
promise
setTimeout
```

**Explanation:**

1. `console.log('start')` - synchronous, goes to call stack immediately
2. `setTimeout(() => console.log('setTimeout'), 0)` - goes to Web API, then to macrotask queue
3. `Promise.resolve().then(() => console.log('promise'))` - goes to microtask queue
4. `console.log('end')` - synchronous, goes to call stack immediately

The event loop processes:

1. All synchronous code first (call stack)
2. All microtasks (promises have higher priority)
3. Then macrotasks (setTimeout)

So the order is: start → end → promise → setTimeout

---

## Question 36: JavaScript Object Reference vs Value

**Question:** What's the output of this code?

```javascript
let c = { greeting: 'Hey!' };
let d;

d = c;
c.greeting = 'Hello';
console.log(d.greeting);
```

**Answer:**

The output is `Hello`.

**Explanation:**

In JavaScript, all objects interact by reference when setting them equal to each other.

First, variable `c` holds a value to an object. Later, we assign `d` with the same reference that `c` has to the object.

When you change one object, you change all of them.

---

## Question 37: JavaScript Number Constructor vs Primitive

**Question:** What's the output of this code?

```javascript
let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b);
console.log(a === b);
console.log(b === c);
```

**Answer:**

The output is `true false false`.

**Explanation:**

`new Number()` is a built-in function constructor. Although it looks like a number, it's not really a number: it has a bunch of extra features and is an object.

When we use the `==` operator (Equality operator), it only checks whether it has the same value. They both have the value of `3`, so it returns `true`.

However, when we use the `===` operator (Strict equality operator), both value and type should be the same. It's not: `new Number()` is not a number, it's an object. Both return `false`.

---

## Question 38: JavaScript Static Methods

**Question:** What's the output of this code?

```javascript
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
    return this.newColor;
  }

  constructor({ newColor = 'green' } = {}) {
    this.newColor = newColor;
  }
}

const freddie = new Chameleon({ newColor: 'purple' });
console.log(freddie.colorChange('orange'));
```

**Answer:**

The code will throw a `TypeError`.

**Explanation:**

The `colorChange` function is static. Static methods are designed to live only on the constructor in which they are created, and cannot be passed down to any children or called upon class instances. Since `freddie` is an instance of class Chameleon, the function cannot be called upon it. A `TypeError` is thrown.

---

## Question 39: JavaScript Global Object and Typos

**Question:** What's the output of this code?

```javascript
let greeting;
greetign = {}; // Typo!
console.log(greetign);
```

**Answer:**

The output is `{}`.

**Explanation:**

It logs the object, because we just created an empty object on the global object! When we mistyped `greeting` as `greetign`, the JS interpreter actually saw this as:

1. `global.greetign = {}` in Node.js
2. `window.greetign = {}`, `frames.greetign = {}` and `self.greetign` in browsers.
3. `self.greetign` in web workers.
4. `globalThis.greetign` in all environments.

In order to avoid this, we can use `"use strict"`. This makes sure that you have declared a variable before setting it equal to anything.

---

## Question 40: JavaScript Functions as Objects

**Question:** What happens when we do this?

```javascript
function bark() {
  console.log('Woof!');
}

bark.animal = 'dog';
```

**Answer:**

Nothing, this is totally fine!

**Explanation:**

This is possible in JavaScript, because functions are objects! (Everything besides primitive types are objects)

A function is a special type of object. The code you write yourself isn't the actual function. The function is an object with properties. This property is invocable.

---

## Question 41: JavaScript Constructor Functions and Prototype

**Question:** What's the output of this code?

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person('Lydia', 'Hallie');
Person.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

console.log(member.getFullName());
```

**Answer:**

The code will throw a `TypeError`.

**Explanation:**

You can't add properties to a constructor like you can with regular objects. If you want to add a feature to all objects at once, you have to use the prototype instead. So in this case:

```javascript
Person.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};
```

would have made `member.getFullName()` work. In this case, we're trying to add a method as a property on the constructor function. `member` is an instance of `Person`, and doesn't have access to this method. Since `getFullName` is not defined on `member`, it throws a `TypeError`.

---

## Question 42: JavaScript `this` Context in Methods

**Question:** What's the output of this code?

```javascript
const person = {
  name: 'Lydia',
  age: 21,
};

for (const item in person) {
  console.log(item);
}
```

**Answer:**

The output is `name` and `age`.

**Explanation:**

With a `for-in` loop, we can iterate through object keys, in this case `name` and `age`. Under the hood, object keys are strings (or Symbols). On every loop, we set the value of `item` equal to the current key it's iterating over. First, `item` is equal to `"name"`, and gets logged. Then, `item` is equal to `"age"`, which gets logged.

---

## Question 43: JavaScript Array Methods and Mutation

**Question:** What's the output of this code?

```javascript
const arr = [1, 2, 3];
arr[10] = 11;
console.log(arr);
```

**Answer:**

The output is `[1, 2, 3, empty × 7, 11]`.

**Explanation:**

When you set a value to an element in an array that exceeds the length of the array, JavaScript creates something called "empty slots". These actually have the value of `undefined`, but you'll see something like:

`[1, 2, 3, empty × 7, 11]`

depending on where you run it (it's different for every browser, node, etc.)

---

## Question 44: JavaScript Function Arguments

**Question:** What's the output of this code?

```javascript
function getAge(...args) {
  console.log(typeof args);
}

getAge(21);
```

**Answer:**

The output is `object`.

**Explanation:**

The rest parameter (`...args`) lets us "collect" all remaining arguments into an array. An array is an object, so `typeof args` returns `"object"`.

---

## Question 45: JavaScript `this` Binding

**Question:** What's the output of this code?

```javascript
const obj = {
  a: 'Hello',
  b: function () {
    console.log(this.a);
  },
};

const c = obj.b;
c();
```

**Answer:**

The output is `undefined`.

**Explanation:**

When you assign `obj.b` to `c`, you're not calling the function, you're just assigning the function reference. When you call `c()`, it's called in the global context, so `this` refers to the global object (or `undefined` in strict mode). Since there's no `a` property on the global object, it returns `undefined`.

---

## Question 46: JavaScript Array Methods

**Question:** What's the output of this code?

```javascript
const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);
```

**Answer:**

The output is `[1, 2, 3, empty × 7, 11]`.

**Explanation:**

When you set a value to an element in an array that exceeds the length of the array, JavaScript creates something called "empty slots". These actually have the value of `undefined`, but you'll see something like:

`[1, 2, 3, empty × 7, 11]`

depending on where you run it (it's different for every browser, node, etc.)

---

## Question 47: JavaScript Object Property Access

**Question:** What's the output of this code?

```javascript
const person = {
  name: 'Lydia',
  age: 21,
};

for (const item in person) {
  console.log(item);
}
```

**Answer:**

The output is `name` and `age`.

**Explanation:**

With a `for-in` loop, we can iterate through object keys, in this case `name` and `age`. Under the hood, object keys are strings (or Symbols). On every loop, we set the value of `item` equal to the current key it's iterating over. First, `item` is equal to `"name"`, and gets logged. Then, `item` is equal to `"age"`, which gets logged.

---

## Question 48: JavaScript Function Hoisting

**Question:** What's the output of this code?

```javascript
sayHi();

function sayHi() {
  console.log('Hey!');
}

var sayHi = function () {
  console.log('Hi!');
};
```

**Answer:**

The output is `Hey!`.

**Explanation:**

Function declarations are hoisted, but function expressions are not. The function declaration `function sayHi()` is hoisted to the top of its scope, so when we call `sayHi()` before its declaration, it works and logs `"Hey!"`.

The function expression `var sayHi = function()` is not hoisted, so it doesn't affect the first call.

---

## Question 49: JavaScript Closure and Scope

**Question:** What's the output of this code?

```javascript
function createIncrement() {
  let count = 0;
  function increment() {
    count++;
  }
  let message = `Count is ${count}`;
  function log() {
    console.log(message);
  }
  return [increment, log];
}

const [increment, log] = createIncrement();
increment();
increment();
increment();
log();
```

**Answer:**

The output is `Count is 0`.

**Explanation:**

The `message` variable is created when the `createIncrement` function is called, and at that time, `count` is `0`. Even though `increment` is called multiple times, the `message` variable is not updated because it was captured at the time of creation.

---

## Question 50: JavaScript Array Methods and Return Values

**Question:** What's the output of this code?

```javascript
const numbers = [1, 2, 3, 4, 5];
const result = numbers.map(num => num * 2).filter(num => num > 5);
console.log(result);
```

**Answer:**

The output is `[6, 8, 10]`.

**Explanation:**

The `map` method creates a new array with each element multiplied by 2: `[2, 4, 6, 8, 10]`.

The `filter` method then filters out elements that are not greater than 5, leaving `[6, 8, 10]`.

---

## Question 51: JavaScript Constructor Functions and `new` Keyword

**Question:** What's the output of this code?

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person('Lydia', 'Hallie');
const sarah = Person('Sarah', 'Smith');

console.log(lydia);
console.log(sarah);
```

**Answer:**

The output is `Person {firstName: "Lydia", lastName: "Hallie"}` and `undefined`.

**Explanation:**

For `sarah`, we didn't use the `new` keyword. When using `new`, `this` refers to the new empty object we create. However, if you don't add `new`, `this` refers to the global object!

We said that `this.firstName` equals `"Sarah"` and `this.lastName` equals `"Smith"`. What we actually did, is defining `global.firstName = 'Sarah'` and `global.lastName = 'Smith'`. `sarah` itself is left `undefined`, since we don't return a value from the `Person` function.

---

## Question 52: JavaScript Event Propagation Phases

**Question:** What are the three phases of event propagation?

**Answer:**

The three phases are: Capturing > Target > Bubbling.

**Explanation:**

During the **capturing** phase, the event goes through the ancestor elements down to the target element. It then reaches the **target** element, and **bubbling** begins.

The event first travels down the DOM tree (capturing phase), reaches the target element (target phase), and then travels back up the DOM tree (bubbling phase).

---

## Question 53: JavaScript Object Prototypes

**Question:** Do all objects have prototypes?

**Answer:**

No, not all objects have prototypes.

**Explanation:**

All objects have prototypes, except for the **base object**. The base object is the object created by the user, or an object that is created using the `new` keyword. The base object has access to some methods and properties, such as `.toString`. This is the reason why you can use built-in JavaScript methods! All of such methods are available on the prototype. Although JavaScript can't find it directly on your object, it goes down the prototype chain and finds it there, which makes it accessible for you.

---

## Question 54: JavaScript Type Coercion

**Question:** What's the output of this code?

```javascript
function sum(a, b) {
  return a + b;
}

sum(1, '2');
```

**Answer:**

The output is `"12"`.

**Explanation:**

JavaScript is a **dynamically typed language**: we don't specify what types certain variables are. Values can automatically be converted into another type without you knowing, which is called _implicit type coercion_. **Coercion** is converting from one type into another.

In this example, JavaScript converts the number `1` into a string, in order for the function to make sense and return a value. During the addition of a numeric type (`1`) and a string type (`'2'`), the number is treated as a string. We can concatenate strings like `"Hello" + "World"`, so what's happening here is `"1" + "2"` which returns `"12"`.

---

## Question 55: JavaScript Postfix vs Prefix Operators

**Question:** What's the output of this code?

```javascript
let number = 0;
console.log(number++);
console.log(++number);
console.log(number);
```

**Answer:**

The output is `0 2 2`.

**Explanation:**

The **postfix** unary operator `++`:

1. Returns the value (this returns `0`)
2. Increments the value (number is now `1`)

The **prefix** unary operator `++`:

1. Increments the value (number is now `2`)
2. Returns the value (this returns `2`)

This returns `0 2 2`.

---

## Question 56: JavaScript Tagged Template Literals

**Question:** What's the output of this code?

```javascript
function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = 'Lydia';
const age = 21;

getPersonInfo`${person} is ${age} years old`;
```

**Answer:**

The output is `["", " is ", " years old"]`, `"Lydia"`, `21`.

**Explanation:**

If you use tagged template literals, the value of the first argument is always an array of the string values. The remaining arguments get the values of the passed expressions!

The first argument is an array containing the string parts: `["", " is ", " years old"]`, the second argument is the first expression value `"Lydia"`, and the third argument is the second expression value `21`.

---

## Question 57: JavaScript Object Comparison

**Question:** What's the output of this code?

```javascript
function checkAge(data) {
  if (data === { age: 18 }) {
    console.log('You are an adult!');
  } else if (data == { age: 18 }) {
    console.log('You are still an adult.');
  } else {
    console.log(`Hmm.. You don't have an age I guess`);
  }
}

checkAge({ age: 18 });
```

**Answer:**

The output is `Hmm.. You don't have an age I guess`.

**Explanation:**

When testing equality, primitives are compared by their _value_, while objects are compared by their _reference_. JavaScript checks if the objects have a reference to the same location in memory.

The two objects that we are comparing don't have that: the object we passed as a parameter refers to a different location in memory than the object we used for checking equality.

This is why both `{ age: 18 } === { age: 18 }` and `{ age: 18 } == { age: 18 }` return `false`.

---

## Question 58: JavaScript `typeof` Operator

**Question:** What's the output of this code?

```javascript
console.log(typeof typeof 1);
```

**Answer:**

The output is `"string"`.

**Explanation:**

`typeof 1` returns `"number"`. `typeof "number"` returns `"string"`.

The `typeof` operator always returns a string, so `typeof typeof` will always return `"string"`.

---

## Question 59: JavaScript Array Methods and Mutation

**Question:** What's the output of this code?

```javascript
const numbers = [1, 2, 3];
numbers[9] = 11;
console.log(numbers);
```

**Answer:**

The output is `[1, 2, 3, empty × 6, 11]`.

**Explanation:**

When you set a value to an element in an array that exceeds the length of the array, JavaScript creates something called "empty slots". These actually have the value of `undefined`, but you'll see something like:

`[1, 2, 3, empty × 6, 11]`

depending on where you run it (it's different for every browser, node, etc.)

---

## Question 60: JavaScript Function Parameters

**Question:** What's the output of this code?

```javascript
function getAge() {
  'use strict';
  age = 21;
  console.log(age);
}

getAge();
```

**Answer:**

The code will throw a `ReferenceError`.

**Explanation:**

With `"use strict"`, you can't reference undeclared variables. We never declared the variable `age`, and since we use `"use strict"`, it will throw a reference error. If we didn't use `"use strict"`, it would have worked, since the property `age` would have gotten added to the global object.

---

## Question 61

**What's the output?**

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person('Lydia', 'Hallie');
Person.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

console.log(member.getFullName());
```

**A:** `TypeError`  
**B:** `SyntaxError`  
**C:** `Lydia Hallie`  
**D:** `undefined undefined`

**Answer:** A

**Explanation:** In JavaScript, functions are objects, and therefore, the method `getFullName` gets added to the constructor function object itself. For that reason, we can call `Person.getFullName()`, but `member.getFullName` throws a `TypeError`. If you want a method to be available to all object instances, you have to add it to the prototype property.

---

## Question 62

**What's the output?**

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person('Lydia', 'Hallie');
const sarah = Person('Sarah', 'Smith');

console.log(lydia);
console.log(sarah);
```

**A:** `Person {firstName: "Lydia", lastName: "Hallie"}` and `undefined`  
**B:** `Person {firstName: "Lydia", lastName: "Hallie"}` and `Person {firstName: "Sarah", lastName: "Smith"}`  
**C:** `Person {firstName: "Lydia", lastName: "Hallie"}` and `{}`  
**D:** `Person {firstName: "Lydia", lastName: "Hallie"}` and `ReferenceError`

**Answer:** A

**Explanation:** For `sarah`, we didn't use the `new` keyword. When using `new`, `this` refers to the new empty object we create. However, if you don't add `new`, `this` refers to the **global object**! We said that `this.firstName` equals `"Sarah"` and `this.lastName` equals `"Smith"`. What we actually did, is defining `global.firstName = 'Sarah'` and `global.lastName = 'Smith'`. `sarah` itself is left `undefined`, since we don't return a value from the `Person` function.

---

## Question 63

**What are the three phases of event propagation?**

**A:** Target > Capturing > Bubbling  
**B:** Bubbling > Target > Capturing  
**C:** Target > Bubbling > Capturing  
**D:** Capturing > Target > Bubbling

**Answer:** D

**Explanation:** During the **capturing** phase, the event goes through the ancestor elements down to the target element. It then reaches the **target** element, and **bubbling** begins.

---

## Question 64

**All object have prototypes.**

**A:** true  
**B:** false

**Answer:** B

**Explanation:** All objects have prototypes, except for the **base object**. The base object is the object created by the user, or an object that is created using the `new` keyword. The base object has access to some methods and properties, such as `.toString`. This is the reason why you can use built-in JavaScript methods! All of such methods are available on the prototype. Although JavaScript can't find it directly on your object, it goes down the prototype chain and finds it there, which makes it accessible for you.

---

## Question 65

**What's the output?**

```javascript
function sum(a, b) {
  return a + b;
}

sum(1, '2');
```

**A:** `NaN`  
**B:** `TypeError`  
**C:** `"12"`  
**D:** `3`

**Answer:** C

**Explanation:** JavaScript is a **dynamically typed language**: we don't specify what types certain variables are. Values can automatically be converted into another type without you knowing, which is called _implicit type coercion_. **Coercion** is converting from one type into another. In this example, JavaScript converts the number `1` into a string, in order for the function to make sense and return a value. During the addition of a numeric type (`1`) and a string type (`'2'`), the number is treated as a string.

---

## Question 66

**What's the output?**

```javascript
let number = 0;
console.log(number++);
console.log(++number);
console.log(number);
```

**A:** `1` `1` `2`  
**B:** `1` `2` `2`  
**C:** `0` `2` `2`  
**D:** `0` `1` `2`

**Answer:** C

**Explanation:** The **postfix** unary operator `++`:

1. Returns the value (this returns `0`)
2. Increments the value (number is now `1`)

The **prefix** unary operator `++`:

1. Increments the value (number is now `2`)
2. Returns the value (this returns `2`)

This returns `0 2 2`.

---

## Question 67

**What's the output?**

```javascript
function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = 'Lydia';
const age = 21;

getPersonInfo`${person} is ${age} years old`;
```

**A:** `"Lydia"` `21` `["", " is ", " years old"]`  
**B:** `["", " is ", " years old"]` `"Lydia"` `21`  
**C:** `"Lydia"` `["", " is ", " years old"]` `21`

**Answer:** B

**Explanation:** If you use tagged template literals, the value of the first argument is always an array of the string values. The remaining arguments get the values of the passed expressions!

---

## Question 68

**What's the output?**

```javascript
function checkAge(data) {
  if (data === { age: 18 }) {
    console.log('You are an adult!');
  } else if (data == { age: 18 }) {
    console.log('You are still an adult.');
  } else {
    console.log(`Hmm.. You don't have an age I guess`);
  }
}

checkAge({ age: 18 });
```

**A:** `You are an adult!`  
**B:** `You are still an adult.`  
**C:** `Hmm.. You don't have an age I guess`

**Answer:** C

**Explanation:** When testing equality, primitives are compared by their _value_, while objects are compared by their _reference_. JavaScript checks if the objects have a reference to the same location in memory. The two objects that we are comparing don't have that: the object we passed as a parameter refers to a different location in memory than the object we used for checking equality.

---

## Question 69

**What's the output?**

```javascript
function getAge(...args) {
  console.log(typeof args);
}

getAge(21);
```

**A:** `"number"`  
**B:** `"array"`  
**C:** `"object"`  
**D:** `"NaN"`

**Answer:** C

**Explanation:** The rest parameter (`...args`) lets us "collect" all remaining arguments into an array. An array is an object, so `typeof args` returns `"object"`.

---

## Question 70

**What's the output?**

```javascript
function getAge() {
  'use strict';
  age = 21;
  console.log(age);
}

getAge();
```

**A:** `21`  
**B:** `undefined`  
**C:** `ReferenceError`  
**D:** `TypeError`

**Answer:** C

**Explanation:** With `"use strict"`, you can't reference undeclared variables. We would get a `ReferenceError` saying `age is not defined`.

---

## Question 71

**What's the value of `sum`?**

```javascript
const sum = eval('10*10+5');
```

**A:** `"105"`  
**B:** `105`  
**C:** `TypeError`  
**D:** `"10*10+5"`

**Answer:** B

**Explanation:** `eval` evaluates codes that's passed as a string. If it's an expression, like in this case, it evaluates the expression. The expression is `10 * 10 + 5`. This returns the number `105`.

---

## Question 72

**How long is `cool_secret` accessible?**

```javascript
sessionStorage.setItem('cool_secret', 123);
```

**A:** Forever, the data doesn't get lost.  
**B:** When the user closes the tab.  
**C:** When the user closes the entire browser, not only the tab.  
**D:** When the user shuts off their computer.

**Answer:** B

**Explanation:** The data stored in `sessionStorage` gets removed after closing the _tab_. If you used `localStorage`, the data would've been there forever, unless for example `localStorage.clear()` is invoked.

---

## Question 73

**What's the output?**

```javascript
var num = 8;
var num = 10;

console.log(num);
```

**A:** `8`  
**B:** `10`  
**C:** `SyntaxError`  
**D:** `ReferenceError`

**Answer:** B

**Explanation:** With the `var` keyword, you can declare multiple variables with the same name. The variable will then hold the latest value. You cannot do this with `let` or `const` since they're block-scoped.

---

## Question 74

**What's the output?**

```javascript
const obj = { 1: 'a', 2: 'b', 3: 'c' };
const set = new Set([1, 2, 3, 4, 5]);

obj.hasOwnProperty('1');
obj.hasOwnProperty(1);
set.has('1');
set.has(1);
```

**A:** `false` `true` `false` `true`  
**B:** `false` `true` `true` `true`  
**C:** `true` `true` `false` `true`  
**D:** `true` `true` `true` `true`

**Answer:** C

**Explanation:** All object keys (excluding Symbols) are strings under the hood, even if you don't type it yourself as a string. This is why `obj.hasOwnProperty('1')` also returns `true`. It doesn't work that way for a set. There is no `'1'` in our set: `set.has('1')` returns `false`. It has the numeric type `1`, `set.has(1)` returns `true`.

---

## Question 75

**What's the output?**

```javascript
const obj = { a: 'one', b: 'two', a: 'three' };
console.log(obj);
```

**A:** `{ a: "one", b: "two" }`  
**B:** `{ b: "two", a: "three" }`  
**C:** `{ a: "three", b: "two" }`  
**D:** `SyntaxError`

**Answer:** C

**Explanation:** If you have two keys with the same name, the key will be replaced. It will still be in its first position, but with the last specified value.

---

## Question 76

**What's the output?**

```javascript
[1, 2, 3].map(num => {
  if (typeof num === 'number') return;
  return num * 2;
});
```

**A:** `[]`  
**B:** `[null, null, null]`  
**C:** `[undefined, undefined, undefined]`  
**D:** `[ 3 x empty ]`

**Answer:** C

**Explanation:** When mapping over the array, the value of `num` is equal to the element it's currently looping over. In this case, the elements are numbers, so the condition `typeof num === 'number'` returns `true`. The map function creates a new array and inserts the values returned by the function. However, we don't return a value. When we don't return a value from a function, the function returns `undefined`. For every element in the array, the function block gets called, so for each element we return `undefined`.

---

## Question 77

**What's the output?**

```javascript
function getInfo(member, year) {
  member.name = 'Lydia';
  year = '1998';
}

const person = { name: 'Sarah' };
const birthYear = '1997';

getInfo(person, birthYear);

console.log(person, birthYear);
```

**A:** `{ name: "Lydia" }, "1997"`  
**B:** `{ name: "Sarah" }, "1998"`  
**C:** `{ name: "Lydia" }, "1998"`  
**D:** `{ name: "Sarah" }, "1997"`

**Answer:** A

**Explanation:** Arguments are passed by value, unless their value is a reference to an object, then they're passed by reference. `birthYear` is passed by value, since it's a string, not an object. When we pass arguments by value, a _copy_ of that value is created.

The variable `birthYear` has a reference to the value `"1997"`. The argument `year` also has a reference to the value `"1997"`, but it's not the same value as `birthYear` has a reference to. When we update the value of `year` by setting `year = '1998'`, we are only updating the value of `year`. `birthYear` is still equal to `"1997"`.

The value of `person` is an object. The argument `member` has a (copied) reference to the _same_ object. When we modify a property of the object `member` has a reference to, the value of `person` will also be modified, since they both have a reference to the same object. `person`'s `name` property is now equal to `"Lydia"`.

---

## Question 78

**What's the output?**

```javascript
function greeting() {
  throw 'Hello world!';
}

function sayHi() {
  try {
    const data = greeting();
    console.log('It worked!', data);
  } catch (e) {
    console.log('Oh no an error:', e);
  }
}

sayHi();
```

**A:** `It worked! Hello world!`  
**B:** `Oh no an error: undefined`  
**C:** `SyntaxError: can only throw Error objects`  
**D:** `Oh no an error: Hello world!`

**Answer:** D

**Explanation:** With the `throw` statement, we can create custom errors. With this statement, you can throw exceptions. An exception can be a string, a number, a boolean or an object. In this case, our exception is the string `'Hello world!'`.

With the `catch` block, we can specify what to do if an exception is thrown in the try block. An exception is thrown: the string `'Hello world!'`. `e` is now equal to that string, which we log. This results in `'Oh no an error: Hello world!'`.

---

## Question 79

**What's the output?**

```javascript
function Car() {
  this.make = 'Lamborghini';
  return { make: 'Maserati' };
}

const myCar = new Car();
console.log(myCar.make);
```

**A:** `"Lamborghini"`  
**B:** `"Maserati"`  
**C:** `ReferenceError`  
**D:** `TypeError`

**Answer:** B

**Explanation:** When you return a property, the value of the property is equal to the returned value, not the value set in the constructor function. We return the string `"Maserati"`, so `myCar.make` equals `"Maserati"`.

---

## Question 80

**What's the output?**

```javascript
(() => {
  let x = (y = 10);
})();

console.log(typeof x);
console.log(typeof y);
```

**A:** `"undefined", "number"`  
**B:** `"number", "number"`  
**C:** `"object", "number"`  
**D:** `"number", "undefined"`

**Answer:** A

**Explanation:** `let x = y = 10;` is actually shorthand for:

```javascript
y = 10;
let x = y;
```

When we set `y = 10`, we actually add a property `y` to the global object (window in browser, global in Node). In a browser, `window.y` equals `10`.

Then, we declare a variable `x` with the value of `y`, which is `10`. Variables declared with the `let` keyword are _block scoped_, they are only defined within the block they're declared in; the immediately invoked function expression (IIFE) in this case. When we use the `typeof` operator, the operand `x` is not defined: we are trying to access `x` outside of the block it's declared in. This means that `x` is not defined. Values who haven't been assigned a value or declared are of type `"undefined"`. `console.log(typeof x)` returns `"undefined"`.

However, we created a global variable `y` when setting `y = 10`. This value is accessible anywhere in our code. `y` is defined, and holds a value of type `"number"`. `console.log(typeof y)` returns `"number"`.

---

## Question 81

**What's the output?**

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }
}

Dog.prototype.bark = function () {
  console.log(`Woof I am ${this.name}`);
};

const pet = new Dog('Mara');

pet.bark();

delete Dog.prototype.bark;

pet.bark();
```

**A:** `"Woof I am Mara"`, `TypeError`  
**B:** `"Woof I am Mara"`, `"Woof I am Mara"`  
**C:** `"Woof I am Mara"`, `undefined`  
**D:** `TypeError`, `TypeError`

**Answer:** A

**Explanation:** We can delete properties from objects using the `delete` keyword, also on the prototype. By deleting a property on the prototype, it is not available anymore in the prototype chain. In this case, the `bark` function is not available anymore on the prototype after `delete Dog.prototype.bark`, yet we still try to access it.

When we try to invoke something that is not a function, a `TypeError` is thrown. In this case `TypeError: pet.bark is not a function`, since `pet.bark` is `undefined`.

---

## Question 82

**What's the output?**

```javascript
const set = new Set([1, 1, 2, 3, 4]);

console.log(set);
```

**A:** `[1, 1, 2, 3, 4]`  
**B:** `[1, 2, 3, 4]`  
**C:** `{1, 1, 2, 3, 4}`  
**D:** `{1, 2, 3, 4}`

**Answer:** D

**Explanation:** The `Set` object is a collection of _unique_ values: a value can only occur once in a set.

We passed the iterable `[1, 1, 2, 3, 4]` with a duplicate value `1`. Since we cannot have two of the same values in a set, one of them gets removed. This results in `{1, 2, 3, 4}`.

---

## Question 83

**What's the output?**

```javascript
// counter.js
let counter = 10;
export default counter;
```

```javascript
// index.js
import myCounter from './counter';

myCounter += 1;

console.log(myCounter);
```

**A:** `10`  
**B:** `11`  
**C:** `Error`  
**D:** `NaN`

**Answer:** C

**Explanation:** An imported module is _read-only_: you cannot modify the imported module. Only the module that exports them can change its value.

When we try to increment the value of `myCounter`, it throws an error: `myCounter` is read-only and cannot be modified.

---

## Question 84

**What's the output?**

```javascript
const name = 'Lydia';
age = 21;

console.log(delete name);
console.log(delete age);
```

**A:** `false`, `true`  
**B:** `"Lydia"`, `21`  
**C:** `true`, `true`  
**D:** `undefined`, `undefined`

**Answer:** A

**Explanation:** The `delete` operator returns a boolean value: `true` on a successful deletion, else it'll return `false`. However, variables declared with the `var`, `const` or `let` keyword cannot be deleted using the `delete` operator.

The `name` variable was declared with a `const` keyword, so its deletion is not successful: `false` is returned. When we set `age = 21`, we actually added a property called `age` to the global object. You can delete properties from objects this way, and the `delete` operator returns `true`.

---

## Question 85

**What's the output?**

```javascript
const numbers = [1, 2, 3, 4, 5];
const [y] = numbers;

console.log(y);
```

**A:** `[[1, 2, 3, 4, 5]]`  
**B:** `[1, 2, 3, 4, 5]`  
**C:** `1`  
**D:** `[1]`

**Answer:** C

**Explanation:** We can unpack values from arrays or properties from objects through destructuring. For example:

```javascript
[a, b] = [1, 2, 3];
```

The value of `a` is now `1`, and the value of `b` is now `2`. What we actually did in the question, is:

```javascript
[y] = [1, 2, 3, 4, 5];
```

This means that the value of `y` is equal to the first value in the array, which is the number `1`. When we log `y`, `1` is returned.

---

## Question 86

**What's the output?**

```javascript
const user = { name: 'Lydia', age: 21 };
const admin = { admin: true, ...user };

console.log(admin);
```

**A:** `{ admin: true, user: { name: "Lydia", age: 21 } }`  
**B:** `{ admin: true, name: "Lydia", age: 21 }`  
**C:** `{ admin: true, user: ["Lydia", 21] }`  
**D:** `{ admin: true, age: 21 }`

**Answer:** B

**Explanation:** It's possible to combine objects using the spread operator `...`. It lets you create copies of the key/value pairs of one object, and add them to another object. In this case, we create copies of the `user` object, and add them to the `admin` object. The `admin` object now contains the copied key/value pairs, which results in `{ admin: true, name: "Lydia", age: 21 }`.

---

## Question 87

**What's the output?**

```javascript
const person = { name: 'Lydia' };

Object.defineProperty(person, 'age', { value: 21 });

console.log(person);
console.log(Object.keys(person));
```

**A:** `{ name: "Lydia", age: 21 }, ["name", "age"]`  
**B:** `{ name: "Lydia", age: 21 }, ["name"]`  
**C:** `{ name: "Lydia" }, ["name", "age"]`  
**D:** `{ name: "Lydia" }, ["age"]`

**Answer:** B

**Explanation:** With the `defineProperty` method, we can add new properties to an object, or modify existing ones. When we add a property to an object using the `defineProperty` method, they are by default _not enumerable_. The `Object.keys` method returns all _enumerable_ property names from an object, in this case `"name"`.

Properties added using the `defineProperty` method are immutable by default. You can override this behavior using the `writable`, `configurable` and `enumerable` properties. This way, the `defineProperty` method gives you a lot more control over the properties you're adding to an object.

---

## Question 88

**What's the output?**

```javascript
const settings = {
  username: 'lydiahallie',
  level: 19,
  health: 90,
};

const data = JSON.stringify(settings, ['level', 'health']);
console.log(data);
```

**A:** `"{"level":19,"health":90}"`  
**B:** `"{"username":"lydiahallie"}"`  
**C:** `"["level","health"]"`  
**D:** `"{"username":"lydiahallie","level":19,"health":90}"`

**Answer:** A

**Explanation:** The second argument of `JSON.stringify` is the _replacer_. The replacer can either be a function or an array, and lets you control what and how the values should be stringified.

If the replacer is an _array_, only the property names included in the array will be added to the JSON string. In this case, only the properties with the names `"level"` and `"health"` are included, `"username"` is excluded. `data` is now equal to `"{"level":19,"health":90}"`.

---

## Question 89

**What's the output?**

```javascript
let num = 10;

const increaseNumber = () => num++;
const increasePassedNumber = number => number++;

const num1 = increaseNumber();
const num2 = increasePassedNumber(num1);

console.log(num1);
console.log(num2);
```

**A:** `10`, `10`  
**B:** `10`, `11`  
**C:** `11`, `11`  
**D:** `11`, `12`

**Answer:** A

**Explanation:** The unary operator `++` _returns_ the value of the operand, _then_ increments the value of the operand. The value of `num1` is `10`, since the `increaseNumber` function returns the value of `num` first, which is `10`, and only then increments the value of `num`.

`num2` is `10`, since we passed `num1` to the `increasePassedNumber`. `number` is equal to `10` (the value of `num1`. Again, the unary operator `++` returns the value of the operand, _then_ increments the value of the operand. The value of `number` is `10`, so `num2` is equal to `10`.

---

## Question 90

**What's the output?**

```javascript
const value = { number: 10 };

const multiply = (x = { ...value }) => {
  console.log((x.number *= 2));
};

multiply();
multiply();
multiply(value);
multiply(value);
```

**A:** `20`, `40`, `80`, `160`  
**B:** `20`, `20`, `20`, `40`  
**C:** `20`, `20`, `20`, `20`  
**D:** `NaN`, `NaN`, `20`, `40`

**Answer:** B

**Explanation:** In ES6, we can initialize parameters with a default value. The value of the parameter will be the default value if no other value has been passed to the function, or if the value of the parameter is `"undefined"`. In this case, we spread the properties of the `value` object into a new object, so `x` has the default value of `{ number: 10 }`.

The default argument is evaluated at _call time_. Every time we call the function, a _new_ object is created. We invoke the `multiply` function the first two times without passing a value: `x` has the default value of `{ number: 10 }`. We then log the multiplied value of that number, which is `20`.

The third time we invoke multiply, we do pass an argument: the object called `value`. The `*=` operator is actually shorthand for `x.number = x.number * 2`: we modify the value of `x.number`, and log the multiplied value `20`.

The fourth time, we pass the `value` object again. `x.number` was previously modified to `20`, so `x.number *= 2` logs `40`.

---

## Question 91

**What's the output?**

```javascript
[1, 2, 3, 4].reduce((x, y) => console.log(x, y));
```

**A:** `1` `2` and `3` `3` and `6` `4`  
**B:** `1` `2` and `2` `3` and `3` `4`  
**C:** `1` `undefined` and `2` `undefined` and `3` `undefined` and `4` `undefined`  
**D:** `1` `2` and `undefined` `3` and `undefined` `4`

**Answer:** D

**Explanation:** The first argument that the `reduce` method receives is the _accumulator_, `x` in this case. The second argument is the _current value_, `y`. With the `reduce` method, we execute a reducer function on every element of the array, which could result in a single value.

In this example, we are not returning any values, we are simply logging the values of the accumulator and the current value.

The value of the accumulator is equal to the previously returned value of the reducer function. If you don't pass the optional `initialValue` argument to the `reduce` method, the accumulator is equal to the first element on the first call.

On the first call, the accumulator (`x`) is `1`, and the current value (`y`) is `2`. We log the accumulator and current value: `1` and `2` get logged.

Since we don't return a value, it returns `undefined`. On the next call, the accumulator is `undefined`, and the current value is `3`. `undefined` and `3` get logged.

On the fourth call, we again don't return a value, so the accumulator is again `undefined`. The current value is `4`. `undefined` and `4` get logged.

---

## Question 92

**What's the output?**

```javascript
function getItems(fruitList, ...args, favoriteFruit) {
  return [...fruitList, ...args, favoriteFruit]
}

getItems(["banana", "apple"], "pear", "orange")
```

**A:** `["banana", "apple", "pear", "orange"]`  
**B:** `[["banana", "apple"], "pear", "orange"]`  
**C:** `["banana", "apple", ["pear"], "orange"]`  
**D:** `SyntaxError`

**Answer:** D

**Explanation:** `...args` is a rest parameter. The rest parameter's value is an array containing all remaining arguments, **and can only be the last parameter**! In this example, the rest parameter was the second parameter. This is not possible, and will throw a syntax error.

```javascript
function getItems(fruitList, favoriteFruit, ...args) {
  return [...fruitList, ...args, favoriteFruit];
}

getItems(['banana', 'apple'], 'pear', 'orange');
```

The above example works. This returns the array `[ 'banana', 'apple', 'orange', 'pear' ]`

---

## Question 93

**What's the output?**

```javascript
const person = { name: 'Lydia' };

Object.defineProperty(person, 'age', { value: 21 });

console.log(person);
console.log(Object.keys(person));
```

**A:** `{ name: "Lydia", age: 21 }`, `["name", "age"]`  
**B:** `{ name: "Lydia", age: 21 }`, `["name"]`  
**C:** `{ name: "Lydia"}`, `["name"]`  
**D:** `{ name: "Lydia"}`, `["name", "age"]`

**Answer:** B

**Explanation:** With the `defineProperty` method, we can add new properties to an object, or modify existing ones. When we add a property to an object using the `defineProperty` method, they are by default _not enumerable_. The `Object.keys` method returns all _enumerable_ property names from an object, in this case only `"name"`.

Properties added using the `defineProperty` method are immutable by default. You can override this behavior using the `writable`, `configurable` and `enumerable` properties. This way, the `defineProperty` method gives you a lot more control over the properties you're adding to an object.

---

## Question 94

**What's the output?**

```javascript
const settings = {
  username: 'lydiahallie',
  level: 19,
  health: 90,
};

const data = JSON.stringify(settings, ['level', 'health']);
console.log(data);
```

**A:** `"{"level":19,"health":90}"`  
**B:** `"{"username":"lydiahallie"}"`  
**C:** `"["level","health"]"`  
**D:** `"{"username":"lydiahallie","level":19,"health":90}"`

**Answer:** A

**Explanation:** The second argument of `JSON.stringify` is the _replacer_. The replacer can either be a function or an array, and lets you control what and how the values should be stringified.

If the replacer is an _array_, only the property names included in the array will be added to the JSON string. In this case, only the properties with the names `"level"` and `"health"` are included, `"username"` is excluded. `data` is now equal to `"{"level":19,"health":90}"`.

---

## Question 95

**What's the output?**

```javascript
const name = 'Lydia Hallie';

console.log(name.padStart(13));
console.log(name.padStart(2));
```

**A:** `"Lydia Hallie"`, `"Lydia Hallie"`  
**B:** `" Lydia Hallie"`, `"Lydia Hallie"`  
**C:** `" Lydia Hallie"`, `"Ly"`  
**D:** `"Lydia Hallie"`, `"Lydia Hallie"`

**Answer:** B

**Explanation:** With the `padStart` method, we can add padding to the beginning of a string. The value passed to this method is the _total_ length of the string together with the padding. The string `"Lydia Hallie"` has a length of `12`. `name.padStart(13)` inserts 1 space at the beginning of the string, because 12 + 1 is 13.

If the argument passed to the `padStart` method is smaller than the length of the array, no padding will be added.

---

## Question 96

**What's the output?**

```javascript
const emojis = ['🥑', '😍', '✨'];

emojis.map(x => x + '✨');
emojis.filter(x => x !== '🥑');
emojis.find(x => x !== '🥑');
emojis.reduce((acc, cur) => acc + '✨');
emojis.slice(1, 2, '✨');
emojis.splice(1, 2, '✨');
```

**A:** `All of them`  
**B:** `map` `reduce` `slice` `splice`  
**C:** `map` `slice` `splice`  
**D:** `splice`

**Answer:** D

**Explanation:** With `splice` method, we modify the original array by deleting, replacing or adding elements. In this case, we removed 2 items from index 1 (we removed `'🥑'` and `'😍'`) and added the ✨ emoji instead.

`map`, `filter` and `slice` return a new array, `find` returns an element, and `reduce` returns a reduced value.

---

## Question 97

**What's the output?**

```javascript
const food = ['🍕', '🍫', '🥑', '🍔'];
const info = { favoriteFood: food[0] };

info.favoriteFood = '🍝';

console.log(food);
```

**A:** `['🍕', '🍫', '🥑', '🍔']`  
**B:** `['🍝', '🍫', '🥑', '🍔']`  
**C:** `['🍝', '🍕', '🍫', '🥑', '🍔']`  
**D:** `ReferenceError`

**Answer:** A

**Explanation:** We set the value of the `favoriteFood` property on the `info` object equal to the string with the pizza emoji, `'🍕'`. A string is a primitive data type. In JavaScript, primitive data types don't interact by reference.

In JavaScript, primitive data types (everything that's not an object) interact by _value_. In this case, we set the value of the `favoriteFood` property on the `info` object equal to the value of the first element in the `food` array, the string with the pizza emoji in this case (`'🍕'`). A string is a primitive data type, and interact by value.

Then, we change the value of the `favoriteFood` property on the `info` object. The `food` array hasn't changed, since the value of `favoriteFood` was merely a _copy_ of the value of the first element in the array, and doesn't have a reference to the same spot in memory as the element on `food[0]`. When we log food, it's still the original array, `['🍕', '🍫', '🥑', '🍔']`.

---

## Question 98

**What's the output?**

```javascript
const person = {
  name: 'Lydia Hallie',
  address: {
    street: '100 Main St',
  },
};

Object.freeze(person);
```

**A:** `person.name = "Evan Bacon"`  
**B:** `delete person.address`  
**C:** `person.address.street = "101 Main St"`  
**D:** `person.pet = { name: "Mara" }`

**Answer:** C

**Explanation:** The `Object.freeze` method _freezes_ an object. No properties can be added, modified, or removed.

However, it only _shallowly_ freezes the object, meaning that only _direct_ properties on the object are frozen. If the property is another object, like `address` in this case, the properties on that object aren't frozen, and can be modified.

---

## Question 99

**What's the output?**

```javascript
const add = x => x + x;

function myFunc(num = 2, value = add(num)) {
  console.log(num, value);
}

myFunc();
myFunc(3);
```

**A:** `2` `4` and `3` `6`  
**B:** `2` `NaN` and `3` `NaN`  
**C:** `2` `Error` and `3` `6`  
**D:** `2` `4` and `3` `Error`

**Answer:** A

**Explanation:** Default parameters are available from left to right. When we pass arguments to a function, the arguments are assigned in the order: the first argument gets the value of the first parameter, the second argument gets the value of the second parameter, etc.

In this case, we call `myFunc()` without passing any arguments. This means that `num` gets the default value `2`, and `value` gets the default value `add(num)`. We call `add(2)`, which returns `4`.

In the second call, we call `myFunc(3)`. We pass the argument `3` to the function. The `num` parameter gets the value `3`. We didn't pass a second argument, so `value` gets the default value `add(num)`. We call `add(3)`, which returns `6`.

---

## Question 100

**What's the output?**

```javascript
class Counter {
  #number = 10;

  increment() {
    this.#number++;
  }

  getNum() {
    return this.#number;
  }
}

const counter = new Counter();
console.log(counter.#number);
```

**A:** `10`  
**B:** `undefined`  
**C:** `SyntaxError`  
**D:** `ReferenceError`

**Answer:** C

**Explanation:** In ES2022, we can add private fields to a class using the `#` syntax. Private fields are not accessible from outside the class.

In this case, we try to access the private field `#number` from outside the class. This results in a `SyntaxError` because private fields are not accessible from outside the class.

---

## Question 101

**What's the output?**

```javascript
function getFruit(fruits) {
  console.log(fruits?.[1]?.[1]);
}

getFruit([['🍊', '🍌'], ['🍍']]);
getFruit();
getFruit([['🍍'], ['🍊', '🍌']]);
```

**A:** `null`, `undefined`, 🍌  
**B:** `[]`, `null`, 🍌  
**C:** `[]`, `[]`, 🍌  
**D:** `undefined`, `undefined`, 🍌

**Answer:** D

**Explanation:** The `?` allows us to optionally access deeper nested properties within objects. We're trying to log the item on index `1` within the subarray that's on index `1` of the `fruits` array. If the subarray on index `1` in the `fruits` array doesn't exist, it'll simply return `undefined`. If the subarray on index `1` in the `fruits` array exists, but this subarray doesn't have an item on its `1` index, it'll also return `undefined`.

First, we're trying to log the second item in the `['🍍']` subarray of `[['🍊', '🍌'], ['🍍']]`. This subarray only contains one item, which means there is no item on index `1`, and returns `undefined`.

Then, we're invoking the `getFruits` function without passing a value as an argument, which means that `fruits` has a value of `undefined` by default. Since we're conditionally chaining the item on index `1` of`fruits`, it returns `undefined` since this item on index `1` does not exist.

Lastly, we're trying to log the second item in the `['🍊', '🍌']` subarray of `['🍍'], ['🍊', '🍌']`. The item on index `1` within this subarray is `🍌`, which gets logged.

---

## Question 102

**What's the output?**

```javascript
class Calc {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
  }
}

const calc = new Calc();
console.log(calc.count);
calc.increment();
console.log(calc.count);
```

**A:** `0` `1`  
**B:** `1` `2`  
**C:** `0` `0`  
**D:** `1` `1`

**Answer:** A

**Explanation:** The `Calc` class has a constructor that initializes the `count` property to `0`. When we create a new instance of `Calc` with `new Calc()`, the constructor is called and `this.count` is set to `0`.

The `increment` method increments the `count` property by 1. When we call `calc.increment()`, the `count` property is incremented from `0` to `1`.

So the first `console.log(calc.count)` outputs `0`, and the second `console.log(calc.count)` outputs `1`.

---

## Question 103

**What's the output?**

```javascript
const nums = [0, 1, 2, 3];
let count = 0;

for (const num of nums) {
  if (num) count++;
}

console.log(count);
```

**A:** `0`  
**B:** `1`  
**C:** `2`  
**D:** `3`

**Answer:** D

**Explanation:** The `if` condition within the `for...of` loop checks whether the value of `num` is truthy or falsy. Since the first number in the `nums` array is `0`, a falsy value, the `if` statement's code block won't be executed. `count` only gets incremented for the other 3 numbers in the `nums` array, `1`, `2` and `3`. Since `count` gets incremented by `1` 3 times, the value of `count` is `3`.

---

## Question 104

**What's the output?**

```javascript
const user = {
  email: 'my@email.com',
  updateEmail: email => {
    this.email = email;
  },
};

user.updateEmail('new@email.com');
console.log(user.email);
```

**A:** `my@email.com`  
**B:** `new@email.com`  
**C:** `undefined`  
**D:** `ReferenceError`

**Answer:** A

**Explanation:** The `updateEmail` function is an arrow function, and is not bound to the `user` object. This means that the `this` keyword is not referring to the `user` object, but refers to the global scope in this case. The value of `email` within the `user` object does not get updated. When logging the value of `user.email`, the original value of `my@email.com` gets returned.

---

## Question 105

**What's the output?**

```javascript
const promise1 = Promise.resolve('First');
const promise2 = Promise.resolve('Second');
const promise3 = Promise.reject('Third');
const promise4 = Promise.resolve('Fourth');

const runPromises = async () => {
  const res1 = await Promise.all([promise1, promise2]);
  const res2 = await Promise.all([promise3, promise4]);
  return [res1, res2];
};

runPromises()
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

**A:** `[['First', 'Second'], ['Fourth']]`  
**B:** `[['First', 'Second'], ['Third', 'Fourth']]`  
**C:** `[['First', 'Second']]`  
**D:** `'Third'`

**Answer:** D

**Explanation:** The `Promise.all` method runs the passed promises in parallel. If one promise fails, the `Promise.all` method _rejects_ with the value of the rejected promise. In this case, `promise3` is rejected with the value `"Third"`. We're catching the rejected value in the chained `catch` method on the `runPromises` invocation to catch any errors within the `runPromises` function. Only `"Third"` gets logged, since `promise3` is rejected with this value.


---

## Question 106: Type Coercion in JavaScript

**Question:** What's the output of the following code?

\`\`\`javascript
function getAge() {
  'use strict';
  age = 21;
  console.log(age);
}

getAge();
\`\`\`

**A:** \`21\`  
**B:** \`ReferenceError\`  
**C:** \`TypeError\`  
**D:** \`"12"\`  
**E:** \`3\`

**Answer:** B

**Explanation:** With \`"use strict"\`, you can't reference undeclared variables. We never declared the variable \`age\`, and since we use \`"use strict"\`, it will throw a reference error. If we didn't use \`"use strict"\`, it would have worked, since the property \`age\` would have gotten added to the global object.

---

## Question 107: Implicit Type Coercion

**Question:** What's the output of the following code?

\`\`\`javascript
function sum(a, b) {
  return a + b;
}

sum(1, '2');
\`\`\`

**A:** \`NaN\`  
**B:** \`TypeError\`  
**C:** \`"12"\`  
**D:** \`3\`

**Answer:** C

**Explanation:** JavaScript is a **dynamically typed language**: we don't specify what types certain variables are. Values can automatically be converted into another type without you knowing, which is called _implicit type coercion_. **Coercion** is converting from one type into another.

In this example, JavaScript converts the number \`1\` into a string, in order for the function to make sense and return a value. During the addition of a numeric type (\`1\`) and a string type (\`'2'\`), the number is treated as a string. We can concatenate strings like \`"Hello" + "World"\`, so what's happening here is \`"1" + "2"\` which returns \`"12"\`.

---

## Question 108: Postfix vs Prefix Increment

**Question:** What's the output of the following code?

\`\`\`javascript
let number = 0;
console.log(number++);
console.log(++number);
console.log(number);
\`\`\`

**A:** \`1\` \`1\` \`2\`  
**B:** \`1\` \`2\` \`2\`  
**C:** \`0\` \`2\` \`2\`  
**D:** \`0\` \`1\` \`2\`

**Answer:** C

**Explanation:** The **postfix** unary operator \`++\`:

1. Returns the value (this returns \`0\`)
2. Increments the value (number is now \`1\`)

The **prefix** unary operator \`++\`:

1. Increments the value (number is now \`2\`)
2. Returns the value (this returns \`2\`)

This returns \`0 2 2\`.

---

## Question 109: Object Comparison by Reference

**Question:** What's the output of the following code?

\`\`\`javascript
function checkAge(data) {
  if (data === { age: 18 }) {
    console.log('You are an adult!');
  } else if (data == { age: 18 }) {
    console.log('You are still an adult.');
  } else {
    console.log('Hmm.. You don\'t have an age I guess');
  }
}

checkAge({ age: 18 });
\`\`\`

**A:** \`You are an adult!\`  
**B:** \`You are still an adult.\`  
**C:** \`Hmm.. You don\'t have an age I guess\`

**Answer:** C

**Explanation:** When testing equality, primitives are compared by their _value_, while objects are compared by their _reference_. JavaScript checks if the objects have a reference to the same location in memory.

The two objects that we are comparing don't have that: the object we passed as a parameter refers to a different location in memory than the object we used in order to check equality.

This is why both \`{ age: 18 } === { age: 18 }\` and \`{ age: 18 } == { age: 18 }\` return \`false\`.

---

## Question 110: Rest Parameters and typeof

**Question:** What's the output of the following code?

\`\`\`javascript
function getAge(...args) {
  console.log(typeof args);
}

getAge(21);
\`\`\`

**A:** \`"number"\`  
**B:** \`"array"\`  
**C:** \`"object"\`  
**D:** \`"NaN"\`

**Answer:** C

**Explanation:** The rest parameter (\`...args\`) lets us "collect" all remaining arguments into an array. An array is an object, so \`typeof args\` returns \`"object"\`

---

## Question 111: Array Methods and Mutation

**Question:** What's the output of the following code?

\`\`\`javascript
const arr = [1, 2, 3];
arr[10] = 11;
console.log(arr);
\`\`\`

**A:** \`[1, 2, 3, 7 x empty, 11]\`  
**B:** \`[1, 2, 3, 11]\`  
**C:** \`[1, 2, 3, 7 x null, 11]\`  
**D:** \`[1, 2, 3, 7 x undefined, 11]\`

**Answer:** A

**Explanation:** When you set a value to an element in an array that exceeds the length of the array, JavaScript creates something called "empty slots". These actually have the value of \`undefined\`, but you will see something like:

\`\`\`javascript
[1, 2, 3, 7 x empty, 11]
\`\`\`

depending on where you run it (it's different for every browser, node, etc.)

---

## Question 112: Array Methods and Return Values

**Question:** What's the output of the following code?

\`\`\`javascript
const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);
\`\`\`

**A:** \`[1, 2, 3, 7 x empty, 11]\`  
**B:** \`[1, 2, 3, 11]\`  
**C:** \`[1, 2, 3, 7 x null, 11]\`  
**D:** \`[1, 2, 3, 7 x undefined, 11]\`

**Answer:** A

**Explanation:** When you set a value to an element in an array that exceeds the length of the array, JavaScript creates something called "empty slots". These actually have the value of \`undefined\`, but you will see something like:

\`\`\`javascript
[1, 2, 3, 7 x empty, 11]
\`\`\`

depending on where you run it (it's different for every browser, node, etc.)

---

## Question 113: Array Methods and Return Values

**Question:** What's the output of the following code?

\`\`\`javascript
const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);
\`\`\`

**A:** \`[1, 2, 3, 7 x empty, 11]\`  
**B:** \`[1, 2, 3, 11]\`  
**C:** \`[1, 2, 3, 7 x null, 11]\`  
**D:** \`[1, 2, 3, 7 x undefined, 11]\`

**Answer:** A

**Explanation:** When you set a value to an element in an array that exceeds the length of the array, JavaScript creates something called "empty slots". These actually have the value of \`undefined\`, but you will see something like:

\`\`\`javascript
[1, 2, 3, 7 x empty, 11]
\`\`\`

depending on where you run it (it's different for every browser, node, etc.)

---

## Question 114: Array Methods and Return Values

**Question:** What's the output of the following code?

\`\`\`javascript
const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);
\`\`\`

**A:** \`[1, 2, 3, 7 x empty, 11]\`  
**B:** \`[1, 2, 3, 11]\`  
**C:** \`[1, 2, 3, 7 x null, 11]\`  
**D:** \`[1, 2, 3, 7 x undefined, 11]\`

**Answer:** A

**Explanation:** When you set a value to an element in an array that exceeds the length of the array, JavaScript creates something called "empty slots". These actually have the value of \`undefined\`, but you will see something like:

\`\`\`javascript
[1, 2, 3, 7 x empty, 11]
\`\`\`

depending on where you run it (it's different for every browser, node, etc.)

---

## Question 115: Array Methods and Return Values

**Question:** What's the output of the following code?

\`\`\`javascript
const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);
\`\`\`

**A:** \`[1, 2, 3, 7 x empty, 11]\`  
**B:** \`[1, 2, 3, 11]\`  
**C:** \`[1, 2, 3, 7 x null, 11]\`  
**D:** \`[1, 2, 3, 7 x undefined, 11]\`

**Answer:** A

**Explanation:** When you set a value to an element in an array that exceeds the length of the array, JavaScript creates something called "empty slots". These actually have the value of \`undefined\`, but you will see something like:

\`\`\`javascript
[1, 2, 3, 7 x empty, 11]
\`\`\`

depending on where you run it (it's different for every browser, node, etc.)

## Question 116

What's the output?

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person('Lydia', 'Hallie');
const sarah = Person('Sarah', 'Smith');

console.log(lydia);
console.log(sarah);
```

**A:** `Person {firstName: "Lydia", lastName: "Hallie"}` and `undefined`  
**B:** `Person {firstName: "Lydia", lastName: "Hallie"}` and `Person {firstName: "Sarah", lastName: "Smith"}`  
**C:** `Person {firstName: "Lydia", lastName: "Hallie"}` and `{}`  
**D:** `Person {firstName: "Lydia", lastName: "Hallie"}` and `ReferenceError`

**Answer:** A

**Explanation:** For `sarah`, we didn't use the `new` keyword. When using `new`, `this` refers to the new empty object we create. However, if you don't add `new`, `this` refers to the **global object**! We said that `this.firstName` equals `"Sarah"` and `this.lastName` equals `"Smith"`. What we actually did, is defining `global.firstName = 'Sarah'` and `global.lastName = 'Smith'`. `sarah` itself is left `undefined`, since we don't return a value from the `Person` function.

## Question 117

What are the three phases of event propagation?

**A:** Target > Capturing > Bubbling  
**B:** Bubbling > Target > Capturing  
**C:** Target > Bubbling > Capturing  
**D:** Capturing > Target > Bubbling

**Answer:** D

**Explanation:** During the **capturing** phase, the event goes through the ancestor elements down to the target element. It then reaches the **target** element, and **bubbling** begins.

## Question 118

All object have prototypes.

**A:** true  
**B:** false

**Answer:** B

**Explanation:** All objects have prototypes, except for the **base object**. The base object is the object created by the user, or an object that is created using the `new` keyword. The base object has access to some methods and properties, such as `.toString`. This is the reason why you can use built-in JavaScript methods! All of such methods are available on the prototype. Although JavaScript can't find it directly on your object, it goes down the prototype chain and finds it there, which makes it accessible for you.

## Question 119

What's the output?

```javascript
function sum(a, b) {
  return a + b;
}

sum(1, '2');
```

**A:** `NaN`  
**B:** `TypeError`  
**C:** `"12"`  
**D:** `3`

**Answer:** C

**Explanation:** JavaScript is a **dynamically typed language**: we don't specify what types certain variables are. Values can automatically be converted into another type without you knowing, which is called _implicit type coercion_. **Coercion** is converting from one type into another. In this example, JavaScript converts the number `1` into a string, in order for the function to make sense and return a value. During the addition of a numeric type (`1`) and a string type (`'2'`), the number is treated as a string. We can concatenate strings like `"Hello" + "World"`, so what's happening here is `"1" + "2"` which returns `"12"`.

## Question 120

What's the output?

```javascript
let number = 0;
console.log(number++);
console.log(++number);
console.log(number);
```

**A:** `1` `1` `2`  
**B:** `1` `2` `2`  
**C:** `0` `2` `2`  
**D:** `0` `1` `2`

**Answer:** C

**Explanation:** The **postfix** unary operator `++`: 1. Returns the value (this returns `0`) 2. Increments the value (number is now `1`). The **prefix** unary operator `++`: 1. Increments the value (number is now `2`) 2. Returns the value (this returns `2`). This returns `0 2 2`.

## Question 121

What's the output?

```javascript
function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = 'Lydia';
const age = 21;

getPersonInfo`${person} is ${age} years old`;
```

**A:** `"Lydia"` `21` `["", " is ", " years old"]`  
**B:** `["", " is ", " years old"]` `"Lydia"` `21`  
**C:** `"Lydia"` `["", " is ", " years old"]` `21`

**Answer:** B

**Explanation:** If you use tagged template literals, the value of the first argument is always an array of the string values. The remaining arguments get the values of the passed expressions!

## Question 122

What's the output?

```javascript
function checkAge(data) {
  if (data === { age: 18 }) {
    console.log('You are an adult!');
  } else if (data == { age: 18 }) {
    console.log('You are still an adult.');
  } else {
    console.log(`Hmm.. You don't have an age I guess`);
  }
}

checkAge({ age: 18 });
```

**A:** `You are an adult!`  
**B:** `You are still an adult.`  
**C:** `Hmm.. You don't have an age I guess`

**Answer:** C

**Explanation:** When testing equality, primitives are compared by their _value_, while objects are compared by their _reference_. JavaScript checks if the objects have a reference to the same location in memory. The two objects that we are comparing don't have that: the object we passed as a parameter refers to a different location in memory than the object we used in order to check equality. This is why both `{ age: 18 } === { age: 18 }` and `{ age: 18 } == { age: 18 }` return `false`.

## Question 123

What's the output?

```javascript
function getAge(...args) {
  console.log(typeof args);
}

getAge(21);
```

**A:** `"number"`  
**B:** `"array"`  
**C:** `"object"`  
**D:** `"NaN"`

**Answer:** C

**Explanation:** The rest parameter (`...args`) lets us "collect" all remaining arguments into an array. An array is an object, so `typeof args` returns `"object"`

## Question 124

What's the output?

```javascript
function getAge() {
  'use strict';
  age = 21;
  console.log(age);
}

getAge();
```

**A:** `21`  
**B:** `undefined`  
**C:** `ReferenceError`  
**D:** `TypeError`

**Answer:** C

**Explanation:** With `"use strict"`, you can make sure that you don't accidentally declare global variables. We never declared the variable `age`, and since we use `"use strict"`, it will throw a reference error. If we didn't use `"use strict"`, it would have worked, since the property `age` would have gotten added to the global object.

## Question 125

What's the value of `sum`?

```javascript
const sum = eval('10*10+5');
```

**A:** `105`  
**B:** `"105"`  
**C:** `TypeError`  
**D:** `"10*10+5"`

**Answer:** A

**Explanation:** `eval` evaluates code that's passed as a string. If it's an expression, like in this case, it evaluates the expression. The expression is `10 * 10 + 5`. This returns the number `105`.

## Question 126

How long is cool_secret accessible?

```javascript
sessionStorage.setItem('cool_secret', 123);
```

**A:** Forever, the data doesn't get lost.  
**B:** When the user closes the tab.  
**C:** When the user closes the entire browser, not only the tab.  
**D:** When the user shuts off their computer.

**Answer:** B

**Explanation:** The data stored in `sessionStorage` is removed after closing the _tab_. If you used `localStorage`, the data would've been there forever, unless for example `localStorage.clear()` is invoked.

## Question 127

What's the output?

```javascript
var num = 8;
var num = 10;

console.log(num);
```

**A:** `8`  
**B:** `10`  
**C:** `SyntaxError`  
**D:** `ReferenceError`

**Answer:** B

**Explanation:** With the `var` keyword, you can declare multiple variables with the same name. The variable will then hold the latest value. You cannot do this with `let` or `const` since they're block-scoped and therefore can't be redeclared.

## Question 128

What's the output?

```javascript
const obj = { 1: 'a', 2: 'b', 3: 'c' };
const set = new Set([1, 2, 3, 4, 5]);

obj.hasOwnProperty('1');
obj.hasOwnProperty(1);
set.has('1');
set.has(1);
```

**A:** `false` `true` `false` `true`  
**B:** `false` `true` `true` `true`  
**C:** `true` `true` `false` `true`  
**D:** `true` `true` `true` `true`

**Answer:** C

**Explanation:** All object keys (excluding Symbols) are strings under the hood, even if you don't type it yourself as a string. This is why `obj.hasOwnProperty('1')` also returns true. It doesn't work that way for a set. There is no `'1'` in our set: `set.has('1')` returns `false`. It has the numeric type `1`, `set.has(1)` returns `true`.

## Question 129

What's the output?

```javascript
const obj = { a: 'one', b: 'two', a: 'three' };
console.log(obj);
```

**A:** `{ a: "one", b: "two" }`  
**B:** `{ b: "two", a: "three" }`  
**C:** `{ a: "three", b: "two" }`  
**D:** `SyntaxError`

**Answer:** C

**Explanation:** If you have two keys with the same name, the key will be replaced. It will still be in its first position, but with the last specified value.
