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
        signal: controller.signal
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
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
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
  const handleClick = useCallback((id) => {
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
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={50}
    >
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
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
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
  
  return (
    <div suppressHydrationWarning>
      {mounted ? 'Client' : 'Server'}
    </div>
  );
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
      <SiblingA 
        value={sharedState} 
        onChange={setSharedState} 
      />
      <SiblingB 
        value={sharedState} 
        onChange={setSharedState} 
      />
    </div>
  );
}

function SiblingA({ value, onChange }) {
  return (
    <input 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
    />
  );
}

function SiblingB({ value, onChange }) {
  return (
    <div>Current value: {value}</div>
  );
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
    <input 
      value={sharedState} 
      onChange={(e) => setSharedState(e.target.value)} 
    />
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

const useStore = create((set) => ({
  sharedState: '',
  setSharedState: (value) => set({ sharedState: value }),
}));

function SiblingA() {
  const { sharedState, setSharedState } = useStore();
  
  return (
    <input 
      value={sharedState} 
      onChange={(e) => setSharedState(e.target.value)} 
    />
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
      <SiblingA 
        value={sharedState} 
        onChange={setSharedState} 
      />
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
  
  const value = { user, setUser, theme, setTheme, notifications, setNotifications };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
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
