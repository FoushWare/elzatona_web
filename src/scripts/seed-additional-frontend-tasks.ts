// v1.0 - Seed additional frontend tasks to Firebase
// Run with: npx tsx src/scripts/seed-additional-frontend-tasks.ts

import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'fir-demo-project-adffb.firebaseapp.com',
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'fir-demo-project-adffb',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '76366138630',
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-XZ5VKFGG4Y',
};

// Initialize Firebase

const db = getFirestore(app);

// ==========================================
// Additional Frontend Tasks
// ==========================================

const additionalFrontendTasks = [
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    description:
      'Build a responsive weather dashboard that displays current weather conditions, 5-day forecast, and location-based weather data.',
    category: 'React',
    difficulty: 'intermediate',
    tags: ['React', 'API Integration', 'Responsive Design', 'Weather API'],
    hints: [
      'Use a weather API like OpenWeatherMap or WeatherAPI',
      "Implement geolocation to get user's current location",
      'Create reusable components for weather cards',
      'Add loading states and error handling',
      'Implement search functionality for different cities',
    ],
    requirements: [
      'Display current weather with temperature, humidity, wind speed',
      'Show 5-day weather forecast',
      'Include weather icons and descriptions',
      'Implement city search functionality',
      'Make it responsive for mobile and desktop',
      'Add loading states and error handling',
      'Use proper TypeScript types',
    ],
    files: [
      {
        id: 'weather-dashboard-1',
        name: 'App.tsx',
        type: 'tsx',
        content: `import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import Forecast from './components/Forecast';
import { WeatherData, ForecastData } from './types/weather';
import { getCurrentWeather, getForecast } from './services/weatherService';
import './App.css';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('London');

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchWeatherData = async (cityName: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const [currentWeather, forecastData] = await Promise.all([
        getCurrentWeather(cityName),
        getForecast(cityName)
      ]);
      
      setWeather(currentWeather);
      setForecast(forecastData);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (cityName: string) => {
    setCity(cityName);
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">{error}</div>
        <SearchBar onSearch={handleSearch} />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather Dashboard</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      
      <main className="app-main">
        {weather && <WeatherCard weather={weather} />}
        {forecast.length > 0 && <Forecast forecast={forecast} />}
      </main>
    </div>
  );
}

export default App;`,
        isEntryPoint: true,
      },
      {
        id: 'weather-dashboard-2',
        name: 'components/WeatherCard.tsx',
        type: 'tsx',
        content: `import React from 'react';
import { WeatherData } from '../types/weather';
import './WeatherCard.css';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{weather.city}</h2>
        <p className="weather-description">{weather.description}</p>
      </div>
      
      <div className="weather-main">
        <div className="temperature">
          <span className="temp-value">{Math.round(weather.temperature)}</span>
          <span className="temp-unit">°C</span>
        </div>
        <div className="weather-icon">
          <img 
            src={\`https://openweathermap.org/img/wn/\${weather.icon}@2x.png\`}
            alt={weather.description}
          />
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Feels like</span>
          <span className="detail-value">{Math.round(weather.feelsLike)}°C</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{weather.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind</span>
          <span className="detail-value">{weather.windSpeed} m/s</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{weather.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;`,
        isEntryPoint: false,
      },
      {
        id: 'weather-dashboard-3',
        name: 'App.css',
        type: 'css',
        content: `/* Weather Dashboard Styles */
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
}

.app-header h1 {
  color: white;
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.app-main {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.loading, .error {
  text-align: center;
  color: white;
  font-size: 1.2rem;
  padding: 40px;
}

.error {
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  border-radius: 8px;
}

@media (min-width: 768px) {
  .app-main {
    grid-template-columns: 1fr 1fr;
  }
}`,
        isEntryPoint: false,
      },
    ],
    solution:
      'Implement a weather dashboard with API integration, responsive design, and proper error handling.',
    created_at: new Date(),
    updated_at: new Date(),
    is_active: true,
    author: 'system',
  },
  {
    id: 'ecommerce-cart',
    title: 'E-commerce Shopping Cart',
    description:
      'Create a fully functional shopping cart for an e-commerce application with add/remove items, quantity management, and total calculation.',
    category: 'React',
    difficulty: 'intermediate',
    tags: ['React', 'State Management', 'E-commerce', 'Shopping Cart'],
    hints: [
      'Use React Context or Redux for cart state management',
      'Implement local storage to persist cart data',
      'Create reusable product and cart item components',
      'Add quantity controls with increment/decrement buttons',
      'Calculate totals including tax and shipping',
      'Implement cart item removal functionality',
    ],
    requirements: [
      'Display product list with images, names, prices',
      'Add products to cart with quantity selection',
      'Show cart items with quantity controls',
      'Calculate subtotal, tax, and total',
      'Remove items from cart',
      'Persist cart data in localStorage',
      'Show empty cart state',
      'Add loading states and error handling',
    ],
    files: [
      {
        id: 'ecommerce-cart-1',
        name: 'App.tsx',
        type: 'tsx',
        content: `import React, { createContext, useContext, useReducer, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="app">
        <header className="app-header">
          <h1>E-commerce Store</h1>
        </header>
        
        <main className="app-main">
          <ProductList />
          <Cart />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;`,
        isEntryPoint: true,
      },
      {
        id: 'ecommerce-cart-2',
        name: 'context/CartContext.tsx',
        type: 'tsx',
        content: `import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      }
      
      const newItems = [...state.items, { product: action.payload, quantity: 1 }];
      return {
        items: newItems,
        total: calculateTotal(newItems)
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.product.id !== action.payload);
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.product.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };
    
    case 'LOAD_CART':
      return {
        items: action.payload,
        total: calculateTotal(action.payload)
      };
    
    default:
      return state;
  }
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      dispatch({ type: 'LOAD_CART', payload: cartItems });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};`,
        isEntryPoint: false,
      },
    ],
    solution:
      'Implement a shopping cart with state management, localStorage persistence, and proper cart operations.',
    created_at: new Date(),
    updated_at: new Date(),
    is_active: true,
    author: 'system',
  },
  {
    id: 'task-manager',
    title: 'Task Manager with Drag & Drop',
    description:
      'Build a task management application with drag-and-drop functionality, task categories, and filtering options.',
    category: 'React',
    difficulty: 'advanced',
    tags: ['React', 'Drag & Drop', 'Task Management', 'State Management'],
    hints: [
      'Use react-beautiful-dnd or @dnd-kit for drag and drop',
      'Implement task categories (To Do, In Progress, Done)',
      'Add task creation, editing, and deletion',
      'Implement filtering and search functionality',
      'Use local storage to persist tasks',
      'Add due dates and priority levels',
    ],
    requirements: [
      'Create tasks with title, description, and due date',
      'Implement drag and drop between columns',
      'Add task editing and deletion',
      'Implement filtering by status and priority',
      'Add search functionality',
      'Persist data in localStorage',
      'Add responsive design',
      'Include task priority levels',
    ],
    files: [
      {
        id: 'task-manager-1',
        name: 'App.tsx',
        type: 'tsx',
        content: `import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskColumn from './components/TaskColumn';
import TaskForm from './components/TaskForm';
import { Task, TaskStatus } from './types/task';
import './App.css';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design user interface',
    description: 'Create wireframes and mockups for the new feature',
    status: 'todo',
    priority: 'high',
    dueDate: new Date('2024-02-15'),
    created_at: new Date()
  },
  {
    id: '2',
    title: 'Implement authentication',
    description: 'Add user login and registration functionality',
    status: 'in-progress',
    priority: 'medium',
    dueDate: new Date('2024-02-20'),
    created_at: new Date()
  }
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const newTasks = Array.from(tasks);
      const [reorderedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, reorderedTask);
      setTasks(newTasks);
    } else {
      // Moving between columns
      const newTasks = Array.from(tasks);
      const taskIndex = newTasks.findIndex(task => task.id === draggableId);
      newTasks[taskIndex] = {
        ...newTasks[taskIndex],
        status: destination.droppableId as TaskStatus
      };
      setTasks(newTasks);
    }
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      created_at: new Date()
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.priority === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const columns = [
    { id: 'todo', title: 'To Do', tasks: filteredTasks.filter(task => task.status === 'todo') },
    { id: 'in-progress', title: 'In Progress', tasks: filteredTasks.filter(task => task.status === 'in-progress') },
    { id: 'done', title: 'Done', tasks: filteredTasks.filter(task => task.status === 'done') }
  ];

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <div className="controls">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="filter-select"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </header>

      <main className="app-main">
        <TaskForm onAddTask={addTask} />
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="columns">
            {columns.map(column => (
              <TaskColumn
                key={column.id}
                column={column}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
              />
            ))}
          </div>
        </DragDropContext>
      </main>
    </div>
  );
}

export default App;`,
        isEntryPoint: true,
      },
    ],
    solution:
      'Implement a task manager with drag-and-drop functionality, filtering, and local storage persistence.',
    created_at: new Date(),
    updated_at: new Date(),
    is_active: true,
    author: 'system',
  },
  {
    id: 'chat-application',
    title: 'Real-time Chat Application',
    description:
      'Build a real-time chat application with WebSocket integration, message history, and user presence indicators.',
    category: 'React',
    difficulty: 'advanced',
    tags: ['React', 'WebSocket', 'Real-time', 'Chat', 'Socket.io'],
    hints: [
      'Use Socket.io for real-time communication',
      'Implement message history and persistence',
      'Add user authentication and presence',
      'Create message components with timestamps',
      'Implement typing indicators',
      'Add emoji support and message reactions',
    ],
    requirements: [
      'Real-time message sending and receiving',
      'User authentication and identification',
      'Message history persistence',
      'Online/offline user status',
      'Typing indicators',
      'Message timestamps',
      'Responsive design',
      'Error handling and reconnection',
    ],
    files: [
      {
        id: 'chat-app-1',
        name: 'App.tsx',
        type: 'tsx',
        content: `import React, { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import UserList from './components/UserList';
import { Message, User } from './types/chat';
import './App.css';

const socket: Socket = io('http://localhost:3001');

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Socket connection events
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    });

    // User events
    socket.on('userJoined', (user: User) => {
      setUsers(prev => [...prev.filter(u => u.id !== user.id), user]);
    });

    socket.on('userLeft', (userId: string) => {
      setUsers(prev => prev.filter(user => user.id !== userId));
    });

    socket.on('usersList', (userList: User[]) => {
      setUsers(userList);
    });

    // Message events
    socket.on('message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on('messageHistory', (messageHistory: Message[]) => {
      setMessages(messageHistory);
    });

    // Cleanup
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('userJoined');
      socket.off('userLeft');
      socket.off('usersList');
      socket.off('message');
      socket.off('messageHistory');
    };
  }, []);

  const handleLogin = (username: string) => {
    const user: User = {
      id: socket.id || '',
      username,
      isOnline: true,
      lastSeen: new Date()
    };
    setCurrentUser(user);
    socket.emit('join', user);
  };

  const handleSendMessage = (text: string) => {
    if (currentUser && text.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: text.trim(),
        user: currentUser,
        timestamp: new Date(),
        type: 'text'
      };
      socket.emit('message', message);
    }
  };

  const handleTyping = (isTyping: boolean) => {
    if (currentUser) {
      socket.emit('typing', { user: currentUser, isTyping });
    }
  };

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <ChatHeader 
        currentUser={currentUser}
        isConnected={isConnected}
        userCount={users.length}
      />
      
      <div className="chat-container">
        <div className="chat-main">
          <MessageList 
            messages={messages}
            currentUser={currentUser}
          />
          <MessageInput 
            onSendMessage={handleSendMessage}
            onTyping={handleTyping}
          />
        </div>
        
        <UserList users={users} />
      </div>
    </div>
  );
}

const LoginForm: React.FC<{ onLogin: (username: string) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Join Chat</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit">Join</button>
        </form>
      </div>
    </div>
  );
};

export default App;`,
        isEntryPoint: true,
      },
    ],
    solution:
      'Implement a real-time chat application with WebSocket integration, user management, and message persistence.',
    created_at: new Date(),
    updated_at: new Date(),
    is_active: true,
    author: 'system',
  },
  {
    id: 'data-visualization',
    title: 'Interactive Data Visualization Dashboard',
    description:
      'Create an interactive dashboard with multiple chart types, data filtering, and real-time updates using Chart.js or D3.js.',
    category: 'React',
    difficulty: 'advanced',
    tags: ['React', 'Data Visualization', 'Charts', 'Dashboard', 'D3.js'],
    hints: [
      'Use Chart.js or D3.js for data visualization',
      'Implement multiple chart types (line, bar, pie, scatter)',
      'Add data filtering and date range selection',
      'Implement real-time data updates',
      'Create responsive and interactive charts',
      'Add data export functionality',
    ],
    requirements: [
      'Display multiple chart types (line, bar, pie, scatter)',
      'Implement data filtering and sorting',
      'Add date range picker for time-series data',
      'Include real-time data updates',
      'Create responsive design for mobile',
      'Add chart interaction (zoom, pan, tooltips)',
      'Implement data export (CSV, JSON)',
      'Add loading states and error handling',
    ],
    files: [
      {
        id: 'data-viz-1',
        name: 'App.tsx',
        type: 'tsx',
        content: `import React, { useState, useEffect } from 'react';
import ChartContainer from './components/ChartContainer';
import DataControls from './components/DataControls';
import MetricsCards from './components/MetricsCards';
import { ChartData, FilterOptions } from './types/chart';
import { generateSampleData } from './utils/dataGenerator';
import './App.css';

function App() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [filteredData, setFilteredData] = useState<ChartData[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: { start: new Date('2024-01-01'), end: new Date('2024-12-31') },
    category: 'all',
    metric: 'sales'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);
      try {
        const data = generateSampleData();
        setChartData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // Apply filters
    const filtered = chartData.filter(item => {
      const dateMatch = item.date >= filters.dateRange.start && item.date <= filters.dateRange.end;
      const categoryMatch = filters.category === 'all' || item.category === filters.category;
      return dateMatch && categoryMatch;
    });
    setFilteredData(filtered);
  }, [chartData, filters]);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleRefreshData = async () => {
    setLoading(true);
    try {
      const newData = generateSampleData();
      setChartData(newData);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Data Visualization Dashboard</h1>
        <button onClick={handleRefreshData} className="refresh-btn">
          Refresh Data
        </button>
      </header>

      <main className="app-main">
        <DataControls 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        
        <MetricsCards data={filteredData} />
        
        <div className="charts-grid">
          <ChartContainer
            type="line"
            data={filteredData}
            title="Sales Trend"
            metric={filters.metric}
          />
          <ChartContainer
            type="bar"
            data={filteredData}
            title="Category Comparison"
            metric={filters.metric}
          />
          <ChartContainer
            type="pie"
            data={filteredData}
            title="Distribution"
            metric={filters.metric}
          />
          <ChartContainer
            type="scatter"
            data={filteredData}
            title="Correlation Analysis"
            metric={filters.metric}
          />
        </div>
      </main>
    </div>
  );
}

export default App;`,
        isEntryPoint: true,
      },
    ],
    solution:
      'Implement an interactive data visualization dashboard with multiple chart types, filtering, and real-time updates.',
    created_at: new Date(),
    updated_at: new Date(),
    is_active: true,
    author: 'system',
  },
];

// ==========================================
// Seeding Functions
// ==========================================

async function seedAdditionalFrontendTasks() {
  console.log('🌱 Seeding additional frontend tasks...');

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const task of additionalFrontendTasks) {
    try {
      // Check if task already exists
      const existingQuery = query(
        supabase.from('frontendTasks'),
        where('id', task.id)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (existingSnapshot.length === 0) {
        await addDoc(supabase.from('frontendTasks'), task);
        successCount++;
        console.log(`✅ Added frontend task: ${task.title}`);
      } else {
        skipCount++;
        console.log(`⏭️  Frontend task already exists: ${task.title}`);
      }
    } catch (error) {
      errorCount++;
      console.error(`❌ Error adding frontend task ${task.title}:`, error);
    }
  }

  console.log('🎉 Additional frontend tasks seeding completed!');
  console.log(`📊 Summary:`);
  console.log(`   - Successfully added: ${successCount}`);
  console.log(`   - Skipped (already exist): ${skipCount}`);
  console.log(`   - Errors: ${errorCount}`);
  console.log(`   - Total processed: ${additionalFrontendTasks.length}`);
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  console.log('🚀 Starting additional frontend tasks seeding process...');

  try {
    await seedAdditionalFrontendTasks();
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
}

main().catch(console.error);
