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
