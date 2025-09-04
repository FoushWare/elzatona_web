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
