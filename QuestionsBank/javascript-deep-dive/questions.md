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
document.getElementById('parent').addEventListener('click', function() {
  console.log('Parent clicked (capturing)');
}, true);

// Bubbling phase (default)
document.getElementById('parent').addEventListener('click', function() {
  console.log('Parent clicked (bubbling)');
});

document.getElementById('child').addEventListener('click', function() {
  console.log('Child clicked');
});

// Output when clicking button:
// Parent clicked (capturing)
// Child clicked
// Parent clicked (bubbling)
```

**Stopping Propagation:**
```javascript
element.addEventListener('click', function(event) {
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
    getCount: () => count
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
  return function(number) {
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
  
  return function() {
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
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
  ]);
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
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalculation = memoize((n) => {
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
  let a = 0, b = 1;
  
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
const person = new Proxy({}, {
  set(target, property, value) {
    if (property === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    if (property === 'age' && value < 0) {
      throw new RangeError('Age cannot be negative');
    }
    target[property] = value;
    return true;
  }
});

person.name = 'John'; // OK
person.age = 25; // OK
person.age = 'invalid'; // TypeError: Age must be a number
```

**2. Logging Proxy:**
```javascript
const loggedObject = new Proxy({}, {
  get(target, property) {
    console.log(`Getting property: ${property}`);
    return target[property];
  },
  set(target, property, value) {
    console.log(`Setting property: ${property} = ${value}`);
    target[property] = value;
    return true;
  }
});

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
    }
  });
}

const state = reactive({ count: 0 });
state.count++; // Accessing: count, Updating: count = 1
```

**4. Virtual Properties:**
```javascript
const user = new Proxy({ firstName: 'John', lastName: 'Doe' }, {
  get(target, property) {
    if (property === 'fullName') {
      return `${target.firstName} ${target.lastName}`;
    }
    return target[property];
  }
});

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
