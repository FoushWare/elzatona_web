# React Mastery - Questions Bank

## Question 1: React Hooks

**Question:** What are React Hooks and explain the rules of hooks.

**Answer:**
React Hooks are functions that let you use state and other React features in functional components.

**Rules of Hooks:**

1. **Only call hooks at the top level** - Don't call inside loops, conditions, or nested functions
2. **Only call hooks from React functions** - Either React function components or custom hooks

**Common hooks:**

- `useState`: Manage component state
- `useEffect`: Handle side effects
- `useContext`: Access React context
- `useMemo`: Memoize expensive calculations
- `useCallback`: Memoize functions

**Example:**

```javascript
import React, { useState, useEffect, useMemo, useCallback } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect for side effects
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]); // Dependency array

  // useMemo for expensive calculations
  const userStats = useMemo(() => {
    if (!user) return null;
    return {
      fullName: `${user.firstName} ${user.lastName}`,
      accountAge: new Date() - new Date(user.createdAt),
      isActive: user.lastLogin > Date.now() - 30 * 24 * 60 * 60 * 1000,
    };
  }, [user]);

  // useCallback for memoized functions
  const handleUpdateProfile = useCallback(updates => {
    setUser(prev => ({ ...prev, ...updates }));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{userStats.fullName}</h1>
      <p>Account Age: {userStats.accountAge} days</p>
      <p>Status: {userStats.isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
}
```

---

## Question 2: React Component Lifecycle

**Question:** Explain React component lifecycle methods and their modern equivalents with hooks.

**Answer:**
**Class Component Lifecycle:**

**Mounting:**

- `constructor()`: Initialize state and bind methods
- `componentDidMount()`: Side effects after first render

**Updating:**

- `componentDidUpdate()`: Side effects after re-render
- `shouldComponentUpdate()`: Control re-rendering

**Unmounting:**

- `componentWillUnmount()`: Cleanup before removal

**Class Component Example:**

```javascript
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, loading: true };
  }

  componentDidMount() {
    this.fetchUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser();
    }
  }

  componentWillUnmount() {
    // Cleanup
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  fetchUser = async () => {
    this.setState({ loading: true });
    try {
      const response = await fetch(`/api/users/${this.props.userId}`);
      const user = await response.json();
      this.setState({ user, loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  render() {
    const { user, loading } = this.state;
    if (loading) return <div>Loading...</div>;
    return <div>{user?.name}</div>;
  }
}
```

**Functional Component with Hooks:**

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // componentDidMount + componentDidUpdate
  useEffect(() => {
    let isMounted = true;

    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        if (isMounted) {
          setUser(userData);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error:', error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    // componentWillUnmount cleanup
    return () => {
      isMounted = false;
    };
  }, [userId]); // Dependency array replaces componentDidUpdate logic

  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}
```

---

## Question 3: React State Management

**Question:** Compare different React state management solutions: useState, useReducer, Context API, and external libraries.

**Answer:**
**1. useState - Local Component State:**

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);

  return (
    <div>
      <p>Count: {count}</p>
      <input
        type="number"
        value={step}
        onChange={e => setStep(Number(e.target.value))}
      />
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

**2. useReducer - Complex State Logic:**

```javascript
const initialState = {
  count: 0,
  step: 1,
  history: [],
};

function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + state.step,
        history: [...state.history, { action: 'increment', value: state.step }],
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - state.step,
        history: [...state.history, { action: 'decrement', value: state.step }],
      };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <input
        type="number"
        value={state.step}
        onChange={e =>
          dispatch({ type: 'SET_STEP', payload: Number(e.target.value) })
        }
      />
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <div>History: {state.history.length} actions</div>
    </div>
  );
}
```

**3. Context API - Global State:**

```javascript
// ThemeContext.js
const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const login = userData => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    theme,
    user,
    toggleTheme,
    login,
    logout,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// App.js
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  );
}

// Header.js
function Header() {
  const { theme, user, toggleTheme, logout } = useTheme();

  return (
    <header className={`header ${theme}`}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
      {user && (
        <div>
          Welcome, {user.name}!<button onClick={logout}>Logout</button>
        </div>
      )}
    </header>
  );
}
```

**4. External Libraries (Redux Toolkit):**

```javascript
// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Counter.js
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './store';

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}
```

**When to Use Each:**

- **useState**: Simple local state
- **useReducer**: Complex state logic with multiple sub-values
- **Context API**: Global state shared across many components
- **Redux**: Large applications with complex state management needs

---

## Question 4: React Performance Optimization

**Question:** How do you optimize React application performance?

**Answer:**
**1. React.memo - Prevent Unnecessary Re-renders:**

```javascript
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  console.log('ExpensiveComponent rendered');
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      <button onClick={onUpdate}>Update</button>
    </div>
  );
});

// Custom comparison function
const ExpensiveComponent = React.memo(
  ({ data, onUpdate }) => {
    // component logic
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (don't re-render)
    return prevProps.data.length === nextProps.data.length;
  }
);
```

**2. useMemo - Memoize Expensive Calculations:**

```javascript
function ProductList({ products, filter }) {
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    return products.filter(product =>
      product.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  const totalPrice = useMemo(() => {
    console.log('Calculating total...');
    return filteredProducts.reduce((sum, product) => sum + product.price, 0);
  }, [filteredProducts]);

  return (
    <div>
      <p>Total: ${totalPrice}</p>
      {filteredProducts.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

**3. useCallback - Memoize Functions:**

```javascript
function Parent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  // Without useCallback - creates new function on every render
  const handleAddItem = useCallback(item => {
    setItems(prev => [...prev, item]);
  }, []);

  // With useCallback - same function reference
  const handleRemoveItem = useCallback(id => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <ItemList
        items={items}
        onAdd={handleAddItem}
        onRemove={handleRemoveItem}
      />
    </div>
  );
}

const ItemList = React.memo(({ items, onAdd, onRemove }) => {
  console.log('ItemList rendered');
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          {item.name}
          <button onClick={() => onRemove(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
});
```

**4. Code Splitting with React.lazy:**

```javascript
import React, { Suspense } from 'react';

// Lazy load components
const LazyComponent = React.lazy(() => import('./LazyComponent'));
const AnotherLazyComponent = React.lazy(() => import('./AnotherLazyComponent'));

function App() {
  const [showLazy, setShowLazy] = useState(false);

  return (
    <div>
      <button onClick={() => setShowLazy(true)}>Load Lazy Component</button>

      {showLazy && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent />
        </Suspense>
      )}
    </div>
  );
}

// Route-based code splitting
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

**5. Virtual Scrolling for Large Lists:**

```javascript
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>{items[index].name}</div>
  );

  return (
    <List height={600} itemCount={items.length} itemSize={50}>
      {Row}
    </List>
  );
}
```

**6. Debouncing and Throttling:**

```javascript
function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');

  // Debounced search
  const debouncedSearch = useMemo(
    () =>
      debounce(searchQuery => {
        onSearch(searchQuery);
      }, 300),
    [onSearch]
  );

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    }
  }, [query, debouncedSearch]);

  return (
    <input
      type="text"
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

**7. Bundle Analysis and Optimization:**

```javascript
// webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer

// In webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};

// Dynamic imports for large libraries
const loadChart = () => import('chart.js').then(module => module.default);

function ChartComponent() {
  const [Chart, setChart] = useState(null);

  useEffect(() => {
    loadChart().then(setChart);
  }, []);

  if (!Chart) return <div>Loading chart...</div>;

  return <Chart data={chartData} />;
}
```

---

## Question 5: React Testing

**Question:** How do you test React components effectively?

**Answer:**
**1. Component Testing with React Testing Library:**

```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter Component', () => {
  test('renders initial count', () => {
    render(<Counter />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  test('increments count when button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const incrementButton = screen.getByRole('button', { name: /increment/i });
    await user.click(incrementButton);

    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  test('decrements count when button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const decrementButton = screen.getByRole('button', { name: /decrement/i });
    await user.click(decrementButton);

    expect(screen.getByText('Count: -1')).toBeInTheDocument();
  });
});
```

**2. Testing Async Operations:**

```javascript
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import UserProfile from './UserProfile';

// Mock API server
const server = setupServer(
  rest.get('/api/users/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays user data', async () => {
  render(<UserProfile userId={1} />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  expect(screen.getByText('john@example.com')).toBeInTheDocument();
});

test('handles API error', async () => {
  server.use(
    rest.get('/api/users/:id', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<UserProfile userId={1} />);

  await waitFor(() => {
    expect(screen.getByText('Error loading user')).toBeInTheDocument();
  });
});
```

**3. Testing Custom Hooks:**

```javascript
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('useCounter hook', () => {
  const { result } = renderHook(() => useCounter(0));

  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);

  act(() => {
    result.current.decrement();
  });

  expect(result.current.count).toBe(0);
});
```

**4. Testing Context Providers:**

```javascript
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';
import Header from './Header';

const renderWithTheme = (component, { theme = 'light' } = {}) => {
  const Wrapper = ({ children }) => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  );
  return render(component, { wrapper: Wrapper });
};

test('renders with light theme', () => {
  renderWithTheme(<Header />);
  expect(screen.getByText('My App')).toHaveClass('light-theme');
});

test('renders with dark theme', () => {
  renderWithTheme(<Header />, { theme: 'dark' });
  expect(screen.getByText('My App')).toHaveClass('dark-theme');
});
```

**5. Testing Forms:**

```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('submits form with valid data', async () => {
  const user = userEvent.setup();
  const onSubmit = jest.fn();

  render(<ContactForm onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText(/name/i), 'John Doe');
  await user.type(screen.getByLabelText(/email/i), 'john@example.com');
  await user.type(screen.getByLabelText(/message/i), 'Hello world');

  await user.click(screen.getByRole('button', { name: /submit/i }));

  expect(onSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello world',
  });
});

test('shows validation errors', async () => {
  const user = userEvent.setup();
  render(<ContactForm />);

  await user.click(screen.getByRole('button', { name: /submit/i }));

  expect(screen.getByText('Name is required')).toBeInTheDocument();
  expect(screen.getByText('Email is required')).toBeInTheDocument();
});
```

**6. Snapshot Testing:**

```javascript
import { render } from '@testing-library/react';
import Button from './Button';

test('Button component snapshot', () => {
  const { container } = render(<Button>Click me</Button>);
  expect(container.firstChild).toMatchSnapshot();
});

test('Button with different props snapshot', () => {
  const { container } = render(
    <Button variant="primary" size="large" disabled>
      Submit
    </Button>
  );
  expect(container.firstChild).toMatchSnapshot();
});
```

**Testing Best Practices:**

- Test behavior, not implementation
- Use semantic queries (getByRole, getByLabelText)
- Test user interactions, not internal state
- Mock external dependencies
- Write tests that are maintainable and readable
- Test edge cases and error conditions

---

## Question 11: React Hooks Rules

**Question:** What are the two main rules of Hooks?

**Answer:**

**1. Only Call Hooks at the Top Level:**
Don't call Hooks inside loops, conditions, or nested functions. This ensures Hooks are called in the same order every time a component renders, which is how React preserves state between calls.

**2. Only Call Hooks from React Functions:**
Call them from within React functional components or from custom Hooks.

**Examples:**

**❌ Wrong - Conditional Hook:**

```javascript
function MyComponent({ shouldUseEffect }) {
  if (shouldUseEffect) {
    useEffect(() => {
      // This violates the rules of hooks
    }, []);
  }

  return <div>Hello</div>;
}
```

**✅ Correct - Always Call Hooks:**

```javascript
function MyComponent({ shouldUseEffect }) {
  useEffect(() => {
    if (shouldUseEffect) {
      // Logic inside the hook
    }
  }, [shouldUseEffect]);

  return <div>Hello</div>;
}
```

**❌ Wrong - Hook in Loop:**

```javascript
function MyComponent({ items }) {
  items.forEach(item => {
    useState(item); // This violates the rules of hooks
  });

  return <div>Hello</div>;
}
```

**✅ Correct - Use Array:**

```javascript
function MyComponent({ items }) {
  const [selectedItems, setSelectedItems] = useState([]);

  return <div>Hello</div>;
}
```

---

## Question 12: Class Components vs Functional Components

**Question:** What can you do with class components that you cannot do with functional components?

**Answer:**
**Use Error Boundaries.** There is currently no way to create an Error Boundary component using a Hook. Error Boundaries are class components that define either `static getDerivedStateFromError()` or `componentDidCatch()`.

**Error Boundary Example:**

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

**Why No Hook Equivalent:**

- Error boundaries need to catch errors during the render phase
- Hooks run after the component has rendered
- The error boundary pattern requires lifecycle methods that don't have Hook equivalents

**Workaround with react-error-boundary:**

```javascript
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Error caught:', error, errorInfo);
      }}
    >
      <MyComponent />
    </ErrorBoundary>
  );
}
```

---

## Question 13: useEffect with async functions

**Question:** Why can't we use an async function directly as the input to useEffect?

**Answer:**
The function passed to `useEffect` can optionally return a cleanup function. If you mark it as `async`, it implicitly returns a Promise, and React cannot use a Promise as a cleanup function.

**❌ Wrong:**

```javascript
useEffect(async () => {
  const data = await fetchData();
  setData(data);
}, []);
```

**✅ Correct Pattern:**

```javascript
useEffect(() => {
  const fetchData = async () => {
    const result = await myApi.get(data);
    setData(result);
  };

  fetchData();
}, [data]);
```

**Alternative with IIFE (Immediately Invoked Function Expression):**

```javascript
useEffect(() => {
  (async () => {
    const data = await fetchData();
    setData(data);
  })();
}, []);
```

**With Cleanup:**

```javascript
useEffect(() => {
  let cancelled = false;

  const fetchData = async () => {
    const result = await myApi.get(data);
    if (!cancelled) {
      setData(result);
    }
  };

  fetchData();

  return () => {
    cancelled = true;
  };
}, [data]);
```

**With AbortController:**

```javascript
useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data', {
        signal: controller.signal,
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Fetch error:', error);
      }
    }
  };

  fetchData();

  return () => {
    controller.abort();
  };
}, []);
```

---

## Question 14: Concurrent React

**Question:** What is Concurrent React (or Concurrent Mode)?

**Answer:**
Concurrent React is a new behind-the-scenes feature in React 18 that allows React to prepare multiple versions of the UI at the same time. It introduces a scheduler that can prioritize renders, pause, resume, or abandon work.

**Key Features:**

- **Interruptible Rendering**: React can pause work to handle high-priority updates
- **Automatic Batching**: Multiple state updates are automatically batched
- **Suspense Improvements**: Better support for data fetching and code splitting
- **Transitions**: Mark updates as non-urgent to keep the UI responsive

**Example with useTransition:**

```javascript
import { useState, useTransition } from 'react';

function SearchResults() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);

  function handleChange(e) {
    setInput(e.target.value);

    startTransition(() => {
      // This update is marked as non-urgent
      setList(expensiveSearch(e.target.value));
    });
  }

  return (
    <div>
      <input value={input} onChange={handleChange} />
      {isPending && <div>Searching...</div>}
      <ul>
        {list.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Example with Suspense:**

```javascript
import { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

**Benefits:**

- **Better User Experience**: UI stays responsive during heavy computations
- **Automatic Batching**: Reduces unnecessary re-renders
- **Improved Performance**: Better handling of concurrent updates
- **Future-Proof**: Enables new React features

---

## Question 15: React Fiber

**Question:** What is a Fiber in React?

**Answer:**
A Fiber is a JavaScript object that represents a unit of work. It contains information about a component, its input, and its output. The Fiber architecture, introduced in React 16, enables features like Concurrent React by allowing React to break rendering work into incremental units that can be paused and resumed.

**Fiber Properties:**

```javascript
// Simplified Fiber structure
const fiber = {
  type: 'div', // Component type
  key: 'unique-key',
  props: { className: 'container' },
  stateNode: domElement, // DOM node
  child: childFiber, // First child
  sibling: siblingFiber, // Next sibling
  return: parentFiber, // Parent
  alternate: previousFiber, // Previous version
  effectTag: 'UPDATE', // What to do with this fiber
  expirationTime: 1000, // Priority
};
```

**Fiber Phases:**

1. **Render Phase**: Build the fiber tree, can be interrupted
2. **Commit Phase**: Apply changes to DOM, cannot be interrupted

**Example of Fiber Work:**

```javascript
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```

**Fiber Tree Structure:**

```
App Fiber
├── div Fiber
    ├── h1 Fiber
    │   └── "Count: 0" Text Fiber
    └── button Fiber
        └── "Increment" Text Fiber
```

**Benefits:**

- **Incremental Rendering**: Work can be split into chunks
- **Priority-based Updates**: High-priority updates can interrupt low-priority ones
- **Better Error Handling**: Errors are isolated to specific fibers
- **Time Slicing**: React can yield control back to the browser

---

## Question 16: React Performance Optimization

**Question:** How can we optimize the re-rendering process in React?

**Answer:**

**1. Avoid Unnecessary Re-renders:**

```javascript
// Use React.memo for components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{data.name}</div>;
});

// Use useMemo for expensive calculations
function MyComponent({ items }) {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  return <div>{expensiveValue}</div>;
}

// Use useCallback for functions passed as props
function Parent({ items }) {
  const handleClick = useCallback(id => {
    console.log('Clicked:', id);
  }, []);

  return (
    <div>
      {items.map(item => (
        <Child key={item.id} item={item} onClick={handleClick} />
      ))}
    </div>
  );
}
```

**2. Code Splitting & Lazy Loading:**

```javascript
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

**3. Virtualization for Long Lists:**

```javascript
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>{items[index].name}</div>
  );

  return (
    <List height={600} itemCount={items.length} itemSize={50}>
      {Row}
    </List>
  );
}
```

**4. Optimize Context Usage:**

```javascript
// Split contexts to avoid unnecessary re-renders
const UserContext = createContext();
const ThemeContext = createContext();

// Use multiple providers
function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <MyComponent />
      </ThemeProvider>
    </UserProvider>
  );
}
```

**5. Use Production Build:**

```bash
npm run build
```

**6. Profile with React DevTools:**

- Use the Profiler tab to identify performance bottlenecks
- Look for components that render frequently
- Check for unnecessary re-renders

---

## Question 17: SSR Rehydration

**Question:** What is rehydration in the context of SSR?

**Answer:**
Rehydration is the process of "making the static HTML interactive." After the server sends pre-rendered HTML to the client, the React code on the client loads, reads the existing DOM, and attaches the necessary event handlers and component state to it.

**Rehydration Process:**

1. **Server**: Renders React components to HTML string
2. **Client**: Receives static HTML and displays it immediately
3. **Client**: Downloads and executes JavaScript bundle
4. **Client**: React "rehydrates" by attaching event handlers and state to existing DOM

**Example:**

```javascript
// Server-side rendering
import { renderToString } from 'react-dom/server';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}

// Server
const html = renderToString(<App />);
// Result: <div><h1>Count: 0</h1><button>Increment</button></div>
```

```javascript
// Client-side rehydration
import { hydrateRoot } from 'react-dom/client';

const container = document.getElementById('root');
hydrateRoot(container, <App />);
```

**Rehydration Challenges:**

```javascript
// ❌ Problem: Hydration mismatch
function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Server renders "Server", client renders "Client"
  return <div>{mounted ? 'Client' : 'Server'}</div>;
}

// ✅ Solution: Use suppressHydrationWarning
function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <div suppressHydrationWarning>{mounted ? 'Client' : 'Server'}</div>;
}
```

**Benefits:**

- **Faster Initial Load**: Users see content immediately
- **Better SEO**: Search engines can crawl the HTML
- **Progressive Enhancement**: Works even if JavaScript fails to load

---

## Question 18: Sibling Component Communication

**Question:** How can sibling components share state?

**Answer:**

**1. Lifting State Up:**
Move the shared state to the closest common parent component and pass it down via props.

```javascript
function Parent() {
  const [sharedState, setSharedState] = useState('');

  return (
    <div>
      <SiblingA value={sharedState} onChange={setSharedState} />
      <SiblingB value={sharedState} onChange={setSharedState} />
    </div>
  );
}

function SiblingA({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}

function SiblingB({ value, onChange }) {
  return <div>Current value: {value}</div>;
}
```

**2. Context API:**
Create a context to hold the state and use `useContext` to consume it in the siblings.

```javascript
const SharedStateContext = createContext();

function Parent() {
  const [sharedState, setSharedState] = useState('');

  return (
    <SharedStateContext.Provider value={{ sharedState, setSharedState }}>
      <SiblingA />
      <SiblingB />
    </SharedStateContext.Provider>
  );
}

function SiblingA() {
  const { sharedState, setSharedState } = useContext(SharedStateContext);

  return (
    <input value={sharedState} onChange={e => setSharedState(e.target.value)} />
  );
}

function SiblingB() {
  const { sharedState } = useContext(SharedStateContext);

  return <div>Current value: {sharedState}</div>;
}
```

**3. State Management Library:**
Use a global state library like Redux, Zustand, or Recoil.

```javascript
// With Zustand
import { create } from 'zustand';

const useStore = create(set => ({
  sharedState: '',
  setSharedState: value => set({ sharedState: value }),
}));

function SiblingA() {
  const { sharedState, setSharedState } = useStore();

  return (
    <input value={sharedState} onChange={e => setSharedState(e.target.value)} />
  );
}

function SiblingB() {
  const { sharedState } = useStore();

  return <div>Current value: {sharedState}</div>;
}
```

**4. Custom Hook:**
Create a custom hook that manages the shared state.

```javascript
function useSharedState(initialValue) {
  const [state, setState] = useState(initialValue);

  return [state, setState];
}

function Parent() {
  const [sharedState, setSharedState] = useSharedState('');

  return (
    <div>
      <SiblingA value={sharedState} onChange={setSharedState} />
      <SiblingB value={sharedState} />
    </div>
  );
}
```

---

## Question 19: Global State Disadvantages

**Question:** What are the disadvantages of using global state or React Context?

**Answer:**

**1. Performance Issues:**
Can cause unnecessary re-renders for all components subscribed to the context, even if they only care about a part of the state that didn't change.

```javascript
// ❌ Problem: All consumers re-render when any part of state changes
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([]);

  const value = {
    user,
    setUser,
    theme,
    setTheme,
    notifications,
    setNotifications,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// All components re-render when notifications change, even if they only use user
function UserProfile() {
  const { user } = useContext(AppContext); // Re-renders unnecessarily
  return <div>{user?.name}</div>;
}
```

**✅ Solution: Split Contexts**

```javascript
const UserContext = createContext();
const ThemeContext = createContext();
const NotificationContext = createContext();

function UserProfile() {
  const { user } = useContext(UserContext); // Only re-renders when user changes
  return <div>{user?.name}</div>;
}
```

**2. Testing Complexity:**
Components are coupled to the global state, making them harder to test in isolation.

```javascript
// ❌ Hard to test - component depends on global state
function UserProfile() {
  const { user } = useContext(AppContext);
  return <div>{user?.name}</div>;
}

// Test requires setting up the entire context
test('renders user name', () => {
  render(
    <AppContext.Provider value={{ user: { name: 'John' } }}>
      <UserProfile />
    </AppContext.Provider>
  );

  expect(screen.getByText('John')).toBeInTheDocument();
});

// ✅ Better - component accepts props
function UserProfile({ user }) {
  return <div>{user?.name}</div>;
}

// Test is simpler and more focused
test('renders user name', () => {
  render(<UserProfile user={{ name: 'John' }} />);
  expect(screen.getByText('John')).toBeInTheDocument();
});
```

**3. Maintainability Issues:**
Can make the data flow harder to reason about and can lead to overuse, making the application overly dependent on global state.

```javascript
// ❌ Problem: Everything is global
function App() {
  return (
    <GlobalStateProvider>
      <Header />
      <Main />
      <Sidebar />
      <Footer />
    </GlobalStateProvider>
  );
}

// All components access global state directly
function Header() {
  const { user, theme, notifications } = useContext(AppContext);
  // Component becomes tightly coupled to global state
}

// ✅ Better: Use global state sparingly
function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <Header />
        <Main />
        <Sidebar />
        <Footer />
      </ThemeProvider>
    </UserProvider>
  );
}

// Most components use local state or props
function Header({ user, theme }) {
  // Component is more predictable and testable
}
```

**4. Debugging Complexity:**
Harder to trace where state changes come from and why components re-render.

**5. Bundle Size:**
State management libraries add to the bundle size.

**Best Practices:**

- Use local state when possible
- Split contexts by domain
- Use global state only for truly global concerns
- Consider alternatives like prop drilling for simple cases
- Use React DevTools Profiler to identify performance issues

---

## Question 11: React Fiber Architecture

**Question:** What is React Fiber, and how is it different from the Virtual DOM?

**Answer:**
The Virtual DOM is a lightweight JavaScript object representation of the real DOM. It's used for comparison (diffing) to calculate the most efficient update.

React Fiber is a complete rewrite of React's reconciliation algorithm. It's an internal data structure (a fiber node for each component) that enables features like:

- **Incremental Rendering**: The rendering work can be split into chunks.
- **Concurrent Mode**: React can pause, abort, or reuse work for high-priority updates (like user input).
- **Prioritization**: Different updates (e.g., user input vs. data fetch) can be assigned different priorities.

In short: The Virtual DOM is the what (the UI representation). Fiber is the how (the new engine that figures out what to update and when, enabling concurrency).

**Virtual DOM vs Fiber:**

```javascript
// Virtual DOM - What it represents
const virtualDOM = {
  type: 'div',
  props: {
    className: 'container',
    children: [
      {
        type: 'h1',
        props: {
          children: 'Hello World',
        },
      },
    ],
  },
};

// Fiber - How React processes updates
const fiberNode = {
  type: 'div',
  key: null,
  child: h1Fiber,
  sibling: null,
  return: parentFiber,
  alternate: previousFiber,
  effectTag: 'UPDATE',
  expirationTime: 1073741823,
  // ... many more properties for scheduling
};
```

**Fiber's Key Features:**

**1. Incremental Rendering:**

```javascript
// Before Fiber - All or nothing rendering
function renderComponent(component) {
  // Render entire component tree at once
  // If it takes 100ms, UI freezes for 100ms
  const newTree = component.render();
  diffAndUpdate(newTree);
}

// With Fiber - Work can be split
function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (nextUnitOfWork) {
    // More work to do, schedule it
    requestIdleCallback(workLoop);
  }
}
```

**2. Priority-based Updates:**

```javascript
// Different priorities for different updates
const priorities = {
  Immediate: 1, // User input, clicks
  UserBlocking: 2, // Hover effects
  Normal: 3, // Data fetching
  Low: 4, // Analytics
  Idle: 5, // Background tasks
};

// High priority update (user input)
function handleInputChange(event) {
  // This update gets high priority
  setInputValue(event.target.value);
}

// Low priority update (data fetching)
function fetchUserData() {
  // This update gets low priority
  setUserData(fetchedData);
}
```

**3. Interruptible Work:**

```javascript
// Fiber can pause and resume work
function performUnitOfWork(fiber) {
  // Do a small amount of work
  const element = fiber.element;

  if (fiber.child) {
    return fiber.child; // Continue with child
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling; // Continue with sibling
    }
    nextFiber = nextFiber.return; // Go back to parent
  }

  return null; // Work complete
}
```

**Concurrent Features Enabled by Fiber:**

```javascript
// 1. Suspense for Data Fetching
function UserProfile({ userId }) {
  return (
    <Suspense fallback={<UserProfileSkeleton />}>
      <UserDetails userId={userId} />
      <UserPosts userId={userId} />
    </Suspense>
  );
}

// 2. useTransition for non-urgent updates
function SearchResults({ query }) {
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState([]);

  const handleSearch = newQuery => {
    startTransition(() => {
      // This update can be interrupted
      setResults(expensiveSearch(newQuery));
    });
  };

  return (
    <div>
      {isPending && <Spinner />}
      {results.map(result => (
        <ResultItem key={result.id} result={result} />
      ))}
    </div>
  );
}

// 3. useDeferredValue for deferring updates
function ProductList({ products }) {
  const [filter, setFilter] = useState('');
  const deferredFilter = useDeferredValue(filter);

  const filteredProducts = useMemo(() => {
    return products.filter(product => product.name.includes(deferredFilter));
  }, [products, deferredFilter]);

  return (
    <div>
      <input
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="Search products..."
      />
      {filteredProducts.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**Fiber's Impact on Performance:**

```javascript
// Before Fiber - Blocking rendering
function HeavyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // This blocks the UI until complete
    const heavyData = processLargeDataset();
    setData(heavyData);
  }, []);

  return <div>{data ? renderData(data) : 'Loading...'}</div>;
}

// With Fiber - Non-blocking rendering
function HeavyComponent() {
  const [data, setData] = useState(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      // This can be interrupted for user interactions
      const heavyData = processLargeDataset();
      setData(heavyData);
    });
  }, []);

  return (
    <div>
      {isPending && <ProgressBar />}
      {data ? renderData(data) : 'Loading...'}
    </div>
  );
}
```

---

## Question 12: Reconciliation and Key Prop

**Question:** Explain the Reconciliation process and the role of the "key" prop.

**Answer:**
Reconciliation is React's algorithm for diffing one virtual DOM tree against another to determine which parts of the real DOM need to be updated.

The key prop is crucial for performance and correctness when rendering lists. It helps React identify which items have changed, been added, or been removed.

**Stable Keys**: If keys are stable and unique, React can efficiently re-order elements instead of re-rendering them, minimizing DOM operations.

**Unstable Keys (e.g., array index)**: If an item is removed from the list, the indexes of all following items change. React sees them as new elements, causing unnecessary re-renders and potential state bugs. Never use array indexes as keys if the list can change.

**Reconciliation Process:**

```javascript
// 1. Element type comparison
function reconcileChildren(returnFiber, currentFirstChild, newChildren) {
  // If element type is the same, update props
  if (currentFiber.type === newElement.type) {
    // Reuse existing fiber, just update props
    return updateElement(currentFiber, newElement);
  }

  // If element type is different, create new fiber
  return createFiberFromElement(newElement);
}

// 2. Key-based reconciliation for lists
function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren) {
  const resultingFirstChild = null;
  let previousNewFiber = null;

  // First pass: find matching fibers by key
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    const key = newChild.key;

    // Look for existing fiber with same key
    const existingFiber = findExistingFiber(currentFirstChild, key);

    if (existingFiber) {
      // Reuse existing fiber
      const newFiber = updateElement(existingFiber, newChild);
      // ... link fibers
    } else {
      // Create new fiber
      const newFiber = createFiberFromElement(newChild);
      // ... link fibers
    }
  }

  return resultingFirstChild;
}
```

**Key Prop Examples:**

**❌ Bad - Using Array Index:**

```javascript
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem
          key={index} // ❌ Bad: index changes when items are removed
          todo={todo}
        />
      ))}
    </ul>
  );
}

// Problem: When first item is removed
// Before: [0: "Buy milk", 1: "Walk dog", 2: "Clean house"]
// After:  [0: "Walk dog", 1: "Clean house"]
// React thinks "Walk dog" is a new item and "Clean house" is new too
```

**✅ Good - Using Stable IDs:**

```javascript
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id} // ✅ Good: stable, unique identifier
          todo={todo}
        />
      ))}
    </ul>
  );
}

// When first item is removed, React knows exactly which items to keep
// and which to remove, minimizing DOM operations
```

**Key Prop Best Practices:**

```javascript
// 1. Use unique, stable identifiers
const users = [
  { id: 'user-1', name: 'John' },
  { id: 'user-2', name: 'Jane' },
  { id: 'user-3', name: 'Bob' },
];

// ✅ Good
{
  users.map(user => <UserCard key={user.id} user={user} />);
}

// 2. For items without IDs, create stable keys
const items = ['apple', 'banana', 'orange'];

// ✅ Good - use the value itself if it's unique
{
  items.map(item => <Item key={item} item={item} />);
}

// 3. For complex objects, combine multiple fields
const products = [
  { category: 'electronics', name: 'laptop', price: 999 },
  { category: 'electronics', name: 'phone', price: 699 },
];

// ✅ Good - combine fields for uniqueness
{
  products.map(product => (
    <Product key={`${product.category}-${product.name}`} product={product} />
  ));
}

// 4. Avoid random keys
// ❌ Bad - creates new key on every render
{
  items.map(item => <Item key={Math.random()} item={item} />);
}
```

**Performance Impact:**

```javascript
// Without proper keys - expensive re-renders
function ExpensiveList({ items }) {
  return (
    <div>
      {items.map((item, index) => (
        <ExpensiveComponent
          key={index} // Causes unnecessary re-renders
          data={item}
        />
      ))}
    </div>
  );
}

// With proper keys - efficient updates
function OptimizedList({ items }) {
  return (
    <div>
      {items.map(item => (
        <ExpensiveComponent
          key={item.id} // Efficient updates
          data={item}
        />
      ))}
    </div>
  );
}

// State preservation with keys
function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <input defaultValue={todo.text} />
      ) : (
        <span>{todo.text}</span>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
}

// With proper keys, editing state is preserved when list reorders
// With index keys, editing state is lost
```

**Reconciliation Optimization:**

```javascript
// React.memo for preventing unnecessary re-renders
const TodoItem = React.memo(({ todo }) => {
  return (
    <div>
      <span>{todo.text}</span>
      <span>{todo.completed ? '✓' : '○'}</span>
    </div>
  );
});

// useMemo for expensive calculations
function TodoList({ todos, filter }) {
  const filteredTodos = useMemo(() => {
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(filter.toLowerCase())
    );
  }, [todos, filter]);

  return (
    <div>
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
```

---

## Question 13: React Scheduler and Responsiveness

**Question:** How does React's use of requestIdleCallback and priorities make the UI feel more responsive?

**Answer:**
React's Fiber architecture uses a scheduler that simulates the behavior of requestIdleCallback. It breaks rendering work into small units. After completing a unit, it yields to the browser, allowing it to paint the screen, handle user events, or perform other critical tasks. This prevents long, uninterrupted rendering work from "janking" or freezing the UI. High-priority updates (like typing in an input) can interrupt low-priority work (like rendering a large fetched list), ensuring the user interactions feel immediate and fluid.

**Scheduler Implementation:**

```javascript
// React's internal scheduler (simplified)
function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (nextUnitOfWork) {
    // More work to do, schedule it for later
    requestIdleCallback(workLoop);
  } else {
    // All work complete, commit changes
    commitRoot();
  }
}

// Priority-based scheduling
const priorities = {
  Immediate: 1, // User input, clicks
  UserBlocking: 2, // Hover effects, animations
  Normal: 3, // Data fetching, updates
  Low: 4, // Analytics, logging
  Idle: 5, // Background tasks
};

function scheduleUpdate(fiber, expirationTime) {
  const priorityLevel = getCurrentPriorityLevel();

  if (priorityLevel === ImmediatePriority) {
    // Execute immediately
    performSyncWorkOnRoot(root);
  } else {
    // Schedule for later
    scheduleCallback(
      priorityLevel,
      performConcurrentWorkOnRoot.bind(null, root)
    );
  }
}
```

**Responsive UI Examples:**

**1. Interruptible Rendering:**

```javascript
// Before - Blocking rendering
function HeavyList({ items }) {
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // This blocks the UI until complete
    const filtered = items.filter(item => item.visible);
    setFilteredItems(filtered);
  }, [items]);

  return (
    <div>
      {filteredItems.map(item => (
        <HeavyComponent key={item.id} data={item} />
      ))}
    </div>
  );
}

// After - Interruptible rendering
function ResponsiveList({ items }) {
  const [filteredItems, setFilteredItems] = useState([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      // This can be interrupted for user interactions
      const filtered = items.filter(item => item.visible);
      setFilteredItems(filtered);
    });
  }, [items]);

  return (
    <div>
      {isPending && <Spinner />}
      {filteredItems.map(item => (
        <HeavyComponent key={item.id} data={item} />
      ))}
    </div>
  );
}
```

**2. Priority-based Updates:**

```javascript
function SearchApp() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleInputChange = e => {
    const value = e.target.value;

    // High priority - immediate UI update
    setQuery(value);

    // Low priority - can be interrupted
    startTransition(() => {
      const newResults = searchItems(value);
      setResults(newResults);
    });
  };

  return (
    <div>
      <input
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      {isPending && <div>Searching...</div>}
      <ResultsList results={results} />
    </div>
  );
}
```

**3. Deferred Values:**

```javascript
function ProductList({ products, filter }) {
  const [inputValue, setInputValue] = useState(filter);
  const deferredFilter = useDeferredValue(inputValue);

  const filteredProducts = useMemo(() => {
    // This expensive calculation can be deferred
    return products.filter(product =>
      product.name.toLowerCase().includes(deferredFilter.toLowerCase())
    );
  }, [products, deferredFilter]);

  return (
    <div>
      <input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Filter products..."
      />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
```

**4. Suspense for Better UX:**

```javascript
function App() {
  return (
    <div>
      <Header />
      <Suspense fallback={<PageSkeleton />}>
        <MainContent />
      </Suspense>
      <Footer />
    </div>
  );
}

function MainContent() {
  return (
    <div>
      <Suspense fallback={<UserProfileSkeleton />}>
        <UserProfile />
      </Suspense>
      <Suspense fallback={<PostsSkeleton />}>
        <UserPosts />
      </Suspense>
    </div>
  );
}

// Each Suspense boundary can load independently
// User sees content as it becomes available
```

**Performance Monitoring:**

```javascript
// Measuring responsiveness
function usePerformanceMonitor() {
  useEffect(() => {
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure') {
          console.log(`${entry.name}: ${entry.duration}ms`);
        }
      }
    });

    observer.observe({ entryTypes: ['measure'] });

    return () => observer.disconnect();
  }, []);
}

// Measuring frame drops
function useFrameRateMonitor() {
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    function measureFrameRate() {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        console.log(`FPS: ${fps}`);

        if (fps < 30) {
          console.warn('Low frame rate detected!');
        }

        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFrameRate);
    }

    requestAnimationFrame(measureFrameRate);
  }, []);
}
```

**Best Practices for Responsive UI:**

````javascript
// 1. Use transitions for non-urgent updates
function DataTable({ data }) {
  const [isPending, startTransition] = useTransition();
  const [filteredData, setFilteredData] = useState(data);

  const handleFilter = filter => {
    startTransition(() => {
      // This won't block user interactions
      setFilteredData(data.filter(item => item.matches(filter)));
    });
  };

  return (
    <div>
      <FilterInput onFilter={handleFilter} />
      {isPending && <LoadingIndicator />}
      <Table data={filteredData} />
    </div>
  );
}

// 2. Defer expensive calculations
function Chart({ data }) {
  const [inputData, setInputData] = useState(data);
  const deferredData = useDeferredValue(inputData);

  const chartData = useMemo(() => {
    // Expensive data transformation
    return processChartData(deferredData);
  }, [deferredData]);

  return <ChartComponent data={chartData} />;
}

---

## Question 14: React Hooks Rules

**Question:** What are the two main rules of React Hooks?

**Answer:**
1. **Top-Level Only**: Only call Hooks at the top level of your React function component or custom Hook. Do not call them inside loops, conditions, or nested functions.
2. **Only in React Functions**: Only call Hooks from React function components or from within other custom Hooks. Never call them from regular JavaScript functions.

**Rule 1 - Top-Level Only:**

```javascript
// ❌ Wrong - Hooks inside conditions
function BadComponent({ shouldFetch }) {
  if (shouldFetch) {
    const [data, setData] = useState(null); // Violation!
  }

  return <div>Bad example</div>;
}

// ❌ Wrong - Hooks inside loops
function BadList({ items }) {
  const results = [];
  for (let item of items) {
    const [value, setValue] = useState(item); // Violation!
    results.push(value);
  }
  return <div>{results}</div>;
}

// ❌ Wrong - Hooks inside nested functions
function BadComponent() {
  const handleClick = () => {
    const [count, setCount] = useState(0); // Violation!
  };

  return <button onClick={handleClick}>Click me</button>;
}

// ✅ Correct - Hooks at top level
function GoodComponent({ shouldFetch }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (shouldFetch) {
      setLoading(true);
      fetchData().then(setData).finally(() => setLoading(false));
    }
  }, [shouldFetch]);

  return <div>{loading ? 'Loading...' : data}</div>;
}
````

**Rule 2 - Only in React Functions:**

```javascript
// ❌ Wrong - Hooks in regular JavaScript functions
function regularFunction() {
  const [state, setState] = useState(0); // Violation!
  return state;
}

// ❌ Wrong - Hooks in event handlers
function BadComponent() {
  return (
    <button
      onClick={() => {
        const [count, setCount] = useState(0); // Violation!
      }}
    >
      Click me
    </button>
  );
}

// ✅ Correct - Hooks in React components
function GoodComponent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(prev => prev + 1); // This is fine - calling setState
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}

// ✅ Correct - Hooks in custom hooks
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount(prev => prev + 1), []);
  const decrement = useCallback(() => setCount(prev => prev - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
}
```

**Why These Rules Exist:**

```javascript
// React relies on the order of Hook calls to maintain state
function Component() {
  // React tracks: useState call #1, useState call #2, useEffect call #1
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);

  useEffect(() => {
    console.log('Effect runs');
  }, []);

  // If hooks were called conditionally, the order would change
  // and React would lose track of which state belongs to which hook
}

// Custom hook example
function useFormData(initialData) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback(
    (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: null }));
      }
    },
    [errors]
  );

  const validateForm = useCallback(() => {
    const newErrors = {};
    // Validation logic here
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  const submitForm = useCallback(
    async onSubmit => {
      if (!validateForm()) return;

      setIsSubmitting(true);
      try {
        await onSubmit(formData);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm]
  );

  return {
    formData,
    errors,
    isSubmitting,
    updateField,
    submitForm,
  };
}
```

---

## Question 15: React.lazy and Suspense

**Question:** Explain the purpose and trade-offs of React.lazy and Suspense.

**Answer:**
**Purpose**: React.lazy enables code-splitting by dynamically importing a component, telling Webpack to create a separate bundle. Suspense provides a fallback UI (like a loading spinner) to display while the lazy-loaded component is being fetched.

**Trade-offs:**

**Pros**: Reduces initial bundle size, improving load time.

**Cons**: Can be an anti-pattern if overused on critical components, as it adds HTTP requests to the critical rendering path. It can also complicate Server-Side Rendering (SSR) setups.

**Basic Implementation:**

```javascript
import React, { Suspense, lazy } from 'react';

// Lazy load a component
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```

**Route-based Code Splitting:**

```javascript
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load route components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav>{/* Navigation */}</nav>

        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

// Loading component
function PageLoader() {
  return (
    <div className="page-loader">
      <div className="spinner" />
      <p>Loading page...</p>
    </div>
  );
}
```

**Multiple Suspense Boundaries:**

```javascript
function App() {
  return (
    <div>
      <Header />

      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>

      <main>
        <Suspense fallback={<ContentSkeleton />}>
          <MainContent />
        </Suspense>
      </main>

      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </div>
  );
}

// Each boundary can load independently
// User sees content as it becomes available
```

**Error Boundaries with Lazy Loading:**

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error loading component:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong loading this component.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
```

**Preloading Strategies:**

```javascript
// Preload component on hover
function NavigationLink({ to, children }) {
  const handleMouseEnter = () => {
    // Preload the component
    import(`./pages/${to}`);
  };

  return (
    <Link to={to} onMouseEnter={handleMouseEnter}>
      {children}
    </Link>
  );
}

// Preload after initial render
function App() {
  useEffect(() => {
    // Preload non-critical components after app loads
    const timer = setTimeout(() => {
      import('./pages/About');
      import('./pages/Contact');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    </div>
  );
}
```

**SSR Considerations:**

```javascript
// For SSR, you might need to handle hydration differently
function SSRApp() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Server-side: render fallback or placeholder
    return <div>Loading...</div>;
  }

  // Client-side: render with Suspense
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

**Performance Monitoring:**

```javascript
// Monitor lazy loading performance
function withLoadingMetrics(Component) {
  return function WrappedComponent(props) {
    const startTime = performance.now();

    useEffect(() => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;

      // Send metrics to analytics
      analytics.track('component_load_time', {
        component: Component.name,
        loadTime: loadTime,
      });
    }, [startTime]);

    return <Component {...props} />;
  };
}

// Usage
const LazyComponent = lazy(() =>
  import('./LazyComponent').then(module => ({
    default: withLoadingMetrics(module.default),
  }))
);
```

---

## Question 16: useMemo and useCallback Comparison

**Question:** Compare and contrast useMemo and useCallback. When would you use them?

**Answer:**
Both are performance optimization Hooks that memoize values based on a dependency array.

**useMemo**: Memoizes the result of a computation. Use it when you have an expensive calculation that you don't want to re-run on every render (e.g., sorting a large array, complex math).

**useCallback**: Memoizes the function instance itself. Use it when you need to pass a stable function reference to a child component that is optimized with React.memo to prevent unnecessary re-renders.

**Caution**: Use them pragmatically; most apps don't need them everywhere. Profile performance first.

**useMemo Examples:**

```javascript
function ExpensiveComponent({ items, filter }) {
  // Expensive calculation - only runs when items or filter changes
  const filteredItems = useMemo(() => {
    console.log('Filtering items...'); // Only logs when dependencies change
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  // Expensive sorting - only runs when filteredItems changes
  const sortedItems = useMemo(() => {
    console.log('Sorting items...'); // Only logs when filteredItems changes
    return filteredItems.sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredItems]);

  return (
    <div>
      {sortedItems.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}

// Complex calculations
function DataVisualization({ data }) {
  const chartData = useMemo(() => {
    // Expensive data transformation
    return data.map(item => ({
      x: item.timestamp,
      y: calculateComplexMetric(item),
      color: getColorByCategory(item.category),
    }));
  }, [data]);

  const statistics = useMemo(() => {
    return {
      mean: calculateMean(chartData.map(d => d.y)),
      median: calculateMedian(chartData.map(d => d.y)),
      standardDeviation: calculateStdDev(chartData.map(d => d.y)),
    };
  }, [chartData]);

  return (
    <div>
      <Chart data={chartData} />
      <Statistics stats={statistics} />
    </div>
  );
}
```

**useCallback Examples:**

```javascript
// Preventing unnecessary re-renders
const ExpensiveChild = React.memo(({ onClick, data }) => {
  console.log('ExpensiveChild rendered'); // Only logs when props actually change
  return <button onClick={onClick}>{data.name}</button>;
});

function ParentComponent({ items }) {
  const [count, setCount] = useState(0);

  // Without useCallback - function recreated on every render
  const handleClick = useCallback(item => {
    console.log('Clicked:', item.name);
    // Handle click logic
  }, []); // Empty dependency array - function never changes

  // With dependencies
  const handleItemUpdate = useCallback((itemId, updates) => {
    setItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, ...updates } : item))
    );
  }, []); // setItems is stable from useState

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>

      {items.map(item => (
        <ExpensiveChild
          key={item.id}
          onClick={() => handleClick(item)}
          data={item}
        />
      ))}
    </div>
  );
}
```

**When NOT to Use Them:**

```javascript
// ❌ Don't use useMemo for simple calculations
function BadExample({ a, b }) {
  const sum = useMemo(() => a + b, [a, b]); // Overkill!
  return <div>{sum}</div>;
}

// ✅ Simple calculations are fine without memoization
function GoodExample({ a, b }) {
  const sum = a + b; // This is fast enough
  return <div>{sum}</div>;
}

// ❌ Don't use useCallback for functions that don't need stability
function BadExample({ items }) {
  const handleClick = useCallback(item => {
    console.log(item.name);
  }, []); // If this function isn't passed to memoized children, it's unnecessary

  return (
    <div>
      {items.map(item => (
        <div key={item.id} onClick={() => handleClick(item)}>
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

**Performance Profiling:**

```javascript
// Use React DevTools Profiler to identify actual performance issues
function ProfiledComponent({ data }) {
  // Only add memoization after profiling shows it's needed
  const expensiveValue = useMemo(() => {
    return data.reduce((acc, item) => {
      // Expensive operation
      return acc + complexCalculation(item);
    }, 0);
  }, [data]);

  return <div>{expensiveValue}</div>;
}

// Custom hook for performance monitoring
function usePerformanceMonitor(name) {
  const renderCount = useRef(0);
  renderCount.current++;

  useEffect(() => {
    console.log(`${name} rendered ${renderCount.current} times`);
  });
}
```

**Advanced Patterns:**

````javascript
// Combining useMemo and useCallback
function AdvancedComponent({ items, onItemSelect }) {
  // Memoize the filtered items
  const filteredItems = useMemo(() => {
    return items.filter(item => item.active);
  }, [items]);

  // Memoize the selection handler
  const handleSelect = useCallback((item) => {
    onItemSelect(item);
  }, [onItemSelect]);

  // Memoize the rendered list
  const itemList = useMemo(() => {
    return filteredItems.map(item => (
      <Item
        key={item.id}
        item={item}
        onSelect={handleSelect}
      />
    ));
  }, [filteredItems, handleSelect]);

  return <div>{itemList}</div>;
}

// Custom hook for expensive operations
function useExpensiveCalculation(data, options) {
  return useMemo(() => {
    return performExpensiveCalculation(data, options);
  }, [data, options]);
}

---

## Question 17: Key Prop Necessity

**Question:** Why is the key prop necessary when rendering lists in React?

**Answer:**
The key prop helps React identify which items have changed, been added, or been removed. It provides a stable identity for each element, allowing React to efficiently update and re-order the DOM instead of re-rendering the entire list, which is a costly operation. Never use array indexes as keys if the list can be reordered, as this defeats the purpose and can lead to bugs and performance issues.

**Why Keys Are Essential:**

```javascript
// Without keys - React can't efficiently update
function BadTodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem todo={todo} /> // No key - React treats all as new
      ))}
    </ul>
  );
}

// With keys - React can efficiently update
function GoodTodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} /> // Stable key
      ))}
    </ul>
  );
}
````

**Performance Impact:**

```javascript
// Without proper keys - expensive re-renders
function ExpensiveList({ items }) {
  return (
    <div>
      {items.map((item, index) => (
        <ExpensiveComponent
          key={index} // ❌ Bad: causes unnecessary re-renders
          data={item}
        />
      ))}
    </div>
  );
}

// With proper keys - efficient updates
function OptimizedList({ items }) {
  return (
    <div>
      {items.map(item => (
        <ExpensiveComponent
          key={item.id} // ✅ Good: efficient updates
          data={item}
        />
      ))}
    </div>
  );
}
```

**State Preservation:**

```javascript
function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <input defaultValue={todo.text} />
      ) : (
        <span>{todo.text}</span>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
}

// With proper keys, editing state is preserved when list reorders
// With index keys, editing state is lost
```

---

## Question 18: React Context Performance Pitfalls

**Question:** What are the potential performance pitfalls of using React Context, and how can you mitigate them?

**Answer:**
**Pitfall**: Any component consuming a Context will re-render whenever any value in that Context's state changes, even if it only cares about a specific part of the state.

**Mitigation**: Split your state into multiple, logically separate Contexts (e.g., AuthContext, SettingsContext). This way, a component subscribing to SettingsContext won't re-render when the authentication state changes.

**The Problem:**

```javascript
// ❌ Bad - Single context with multiple concerns
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState({});

  const value = {
    user,
    setUser,
    theme,
    setTheme,
    notifications,
    setNotifications,
    settings,
    setSettings,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Any component using this context re-renders when ANY value changes
function Header() {
  const { theme } = useContext(AppContext); // Re-renders when user changes!
  return <header className={theme}>Header</header>;
}
```

**The Solution:**

```javascript
// ✅ Good - Split contexts by domain
const AuthContext = createContext();
const ThemeContext = createContext();
const NotificationContext = createContext();
const SettingsContext = createContext();

// Auth Context
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const value = useMemo(
    () => ({
      user,
      setUser,
      isLoading,
      setIsLoading,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Theme Context
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const value = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Now components only re-render when their specific context changes
function Header() {
  const { theme } = useContext(ThemeContext); // Only re-renders when theme changes
  return <header className={theme}>Header</header>;
}

function UserProfile() {
  const { user } = useContext(AuthContext); // Only re-renders when user changes
  return <div>Welcome, {user?.name}</div>;
}
```

**Advanced Optimization:**

```javascript
// Custom hook for selective context consumption
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Memoized context values
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      user,
      setUser,
      isLoading,
      setIsLoading,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Context selector pattern
function useAuthSelector(selector) {
  const context = useContext(AuthContext);
  return useMemo(() => selector(context), [context, selector]);
}

// Usage - only re-renders when user.name changes
function UserName() {
  const userName = useAuthSelector(state => state.user?.name);
  return <span>{userName}</span>;
}
```

---

## Question 19: Error Boundaries

**Question:** What is an Error Boundary, and why can't it be implemented with a functional component?

**Answer:**
An Error Boundary is a React component that uses the `componentDidCatch` or `getDerivedStateFromError` lifecycle methods to catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the whole app. It cannot be a functional component because Hooks do not have an equivalent to these lifecycle methods yet. Error Boundaries must be class components.

**Basic Error Boundary:**

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Send to error reporting service
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <Header />
      <MainContent />
      <Footer />
    </ErrorBoundary>
  );
}
```

**Advanced Error Boundary:**

```javascript
class AdvancedErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Different handling based on error type
    if (error.name === 'ChunkLoadError') {
      // Handle code splitting errors
      this.handleChunkError();
    } else if (error.name === 'TypeError') {
      // Handle type errors
      this.handleTypeError(error);
    } else {
      // Generic error handling
      this.handleGenericError(error, errorInfo);
    }
  }

  handleChunkError = () => {
    // Reload the page for chunk errors
    window.location.reload();
  };

  handleTypeError = error => {
    // Log type errors for debugging
    console.error('Type error detected:', error);
  };

  handleGenericError = (error, errorInfo) => {
    // Send to error reporting service
    errorReportingService.captureException(error, {
      extra: errorInfo,
      tags: {
        component: 'ErrorBoundary',
      },
    });
  };

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1,
    }));
  };

  render() {
    if (this.state.hasError) {
      if (this.state.retryCount >= 3) {
        return (
          <div className="error-boundary">
            <h2>Something went wrong and we couldn't recover.</h2>
            <p>Please refresh the page or contact support.</p>
            <button onClick={() => window.location.reload()}>
              Refresh Page
            </button>
          </div>
        );
      }

      return (
        <div className="error-boundary">
          <h2>Oops! Something went wrong.</h2>
          <p>We're sorry for the inconvenience.</p>
          <button onClick={this.handleRetry}>
            Try Again ({this.state.retryCount}/3)
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details>
              <summary>Error Details</summary>
              <pre>{this.state.error && this.state.error.toString()}</pre>
              <pre>{this.state.errorInfo.componentStack}</pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Multiple Error Boundaries:**

```javascript
function App() {
  return (
    <ErrorBoundary>
      <Header />

      <ErrorBoundary>
        <Sidebar />
      </ErrorBoundary>

      <main>
        <ErrorBoundary>
          <MainContent />
        </ErrorBoundary>
      </main>

      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </ErrorBoundary>
  );
}

// Each boundary can catch errors independently
// If Sidebar crashes, Header and MainContent still work
```

**Error Boundary with Hooks (Workaround):**

```javascript
// Since Error Boundaries must be class components,
// you can create a wrapper that provides error state to hooks
class ErrorBoundaryWithHooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.error);
    }

    return this.props.children;
  }
}

// Usage with hooks
function ComponentWithErrorHandling() {
  return (
    <ErrorBoundaryWithHooks
      fallback={error => (
        <div>
          <h2>Error occurred</h2>
          <p>{error.message}</p>
        </div>
      )}
    >
      <RiskyComponent />
    </ErrorBoundaryWithHooks>
  );
}
```

---

## Question 20: useEffect Pitfalls

**Question:** Explain the common pitfalls of the useEffect Hook. Why can't its callback be async?

**Answer:**
**Pitfalls**: Overusing useEffect can lead to a messy "effect soup" that is hard to reason about and can cause unnecessary re-renders or infinite loops.

**Async Callback**: The useEffect callback cannot be async because an async function implicitly returns a Promise. useEffect expects its return value to be either nothing or a cleanup function (a regular function). A Promise is not a function, so React doesn't know how to use it for cleanup. The solution is to define an async function inside the useEffect and call it.

**Common Pitfalls:**

```javascript
// ❌ Pitfall 1: Missing dependencies
function BadComponent({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser); // Missing userId in deps
  }, []); // Empty dependency array

  return <div>{user?.name}</div>;
}

// ✅ Correct
function GoodComponent({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Include all dependencies

  return <div>{user?.name}</div>;
}
```

**Infinite Loops:**

```javascript
// ❌ Pitfall 2: Infinite loop with object dependencies
function BadComponent({ user }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(user).then(setData);
  }, [user]); // user object recreated on every render

  return <div>{data}</div>;
}

// ✅ Solutions
function GoodComponent({ user }) {
  const [data, setData] = useState(null);

  // Solution 1: Use specific properties
  useEffect(() => {
    fetchData(user.id).then(setData);
  }, [user.id]);

  // Solution 2: Memoize the object
  const memoizedUser = useMemo(() => user, [user.id, user.name]);

  useEffect(() => {
    fetchData(memoizedUser).then(setData);
  }, [memoizedUser]);

  return <div>{data}</div>;
}
```

**Async Function Handling:**

```javascript
// ❌ Wrong - async callback
function BadComponent() {
  useEffect(async () => {
    const data = await fetchData();
    setData(data);
  }, []);

  return <div>Bad example</div>;
}

// ✅ Correct - async function inside useEffect
function GoodComponent() {
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchData();
        setData(data);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, []);

  return <div>Good example</div>;
}

// ✅ Alternative - using .then()
function AlternativeComponent() {
  useEffect(() => {
    fetchData().then(setData).catch(setError);
  }, []);

  return <div>Alternative example</div>;
}
```

**Cleanup Functions:**

```javascript
// ✅ Proper cleanup
function ComponentWithCleanup() {
  useEffect(() => {
    const subscription = subscribeToUpdates();
    const timer = setInterval(updateData, 1000);

    // Cleanup function
    return () => {
      subscription.unsubscribe();
      clearInterval(timer);
    };
  }, []);

  return <div>Component with cleanup</div>;
}

// ✅ Cleanup with async operations
function ComponentWithAsyncCleanup() {
  useEffect(() => {
    let isCancelled = false;

    async function fetchData() {
      try {
        const data = await fetchData();
        if (!isCancelled) {
          setData(data);
        }
      } catch (error) {
        if (!isCancelled) {
          setError(error);
        }
      }
    }

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);

  return <div>Component with async cleanup</div>;
}
```

**Effect Soup Prevention:**

```javascript
// ❌ Effect soup - multiple effects doing related things
function BadComponent({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchUser(userId).then(user => {
      setUser(user);
      setLoading(false);
    });
  }, [userId]);

  useEffect(() => {
    if (user) {
      fetchUserPosts(user.id).then(setPosts);
    }
  }, [user]);

  useEffect(() => {
    if (user && posts.length > 0) {
      updateUserActivity(user.id, posts.length);
    }
  }, [user, posts]);

  return <div>Bad example</div>;
}

// ✅ Better - combine related effects
function GoodComponent({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUserData() {
      setLoading(true);
      try {
        const userData = await fetchUser(userId);
        setUser(userData);

        const userPosts = await fetchUserPosts(userData.id);
        setPosts(userPosts);

        updateUserActivity(userData.id, userPosts.length);
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, [userId]);

  return <div>Good example</div>;
}
```

**Custom Hook for Async Effects:**

```javascript
// Custom hook to handle async effects properly
function useAsyncEffect(asyncFn, deps) {
  useEffect(() => {
    let isCancelled = false;

    async function runAsync() {
      try {
        const result = await asyncFn();
        if (!isCancelled) {
          return result;
        }
      } catch (error) {
        if (!isCancelled) {
          throw error;
        }
      }
    }

    runAsync();

    return () => {
      isCancelled = true;
    };
  }, deps);
}

// Usage
function ComponentUsingCustomHook({ userId }) {
  const [user, setUser] = useState(null);

  useAsyncEffect(async () => {
    const userData = await fetchUser(userId);
    setUser(userData);
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

```

// 3. Use Suspense boundaries strategically
function Dashboard() {
  return (
    <div>
      <Suspense fallback={<QuickStatsSkeleton />}>
        <QuickStats />
      </Suspense>
      <Suspense fallback={<DetailedChartSkeleton />}>
        <DetailedChart />
      </Suspense>
    </div>
  );
}
```
