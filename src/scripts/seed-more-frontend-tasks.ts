// v1.0 - Seed additional frontend tasks to Firebase
// Run with: npx tsx src/scripts/seed-more-frontend-tasks.ts

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================================
// Frontend Task Interface
// ==========================================

interface FrontendTask {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  tags: string[];
  hints: string[];
  requirements: string[];
  files: Array<{
    name: string;
    content: string;
    language: string;
  }>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

// ==========================================
// Additional Frontend Tasks
// ==========================================

const additionalFrontendTasks: FrontendTask[] = [
  {
    id: 'frontend-task-006',
    title: 'Build a Todo App with Local Storage',
    description:
      'Create a fully functional todo application with add, edit, delete, and mark complete functionality. Implement local storage to persist todos between sessions.',
    category: 'React',
    difficulty: 'intermediate',
    estimatedTime: '2-3 hours',
    tags: ['react', 'localStorage', 'state-management', 'crud'],
    hints: [
      'Use useState to manage todos array',
      'Implement useEffect to load/save from localStorage',
      'Create separate components for TodoItem and TodoForm',
      'Use unique IDs for each todo item',
    ],
    requirements: [
      'Add new todos with text input',
      'Mark todos as complete/incomplete',
      'Edit existing todos inline',
      'Delete todos with confirmation',
      'Persist data in localStorage',
      'Show count of active/completed todos',
      'Filter todos by status (all/active/completed)',
      'Clear completed todos button',
    ],
    files: [
      {
        name: 'App.jsx',
        content: `import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const deleteTodo = (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo App</h1>
        <p>Manage your tasks efficiently</p>
      </header>
      
      <main className="app-main">
        <TodoForm onAddTodo={addTodo} />
        
        <div className="todo-stats">
          <span>Active: {activeCount}</span>
          <span>Completed: {completedCount}</span>
          {completedCount > 0 && (
            <button onClick={clearCompleted} className="clear-btn">
              Clear Completed
            </button>
          )}
        </div>
        
        <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
        
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onDelete={deleteTodo}
        />
      </main>
    </div>
  );
}

export default App;`,
        language: 'jsx',
      },
      {
        name: 'components/TodoForm.jsx',
        content: `import React, { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="todo-input"
      />
      <button type="submit" className="add-btn">
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;`,
        language: 'jsx',
      },
      {
        name: 'components/TodoList.jsx',
        content: `import React, { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onEdit, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos found. Add one above!</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;`,
        language: 'jsx',
      },
      {
        name: 'components/TodoItem.jsx',
        content: `import React, { useState } from 'react';

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={\`todo-item \${todo.completed ? 'completed' : ''}\`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyPress={handleKeyPress}
          className="edit-input"
          autoFocus
        />
      ) : (
        <span
          className="todo-text"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}
      
      <div className="todo-actions">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="edit-btn"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;`,
        language: 'jsx',
      },
      {
        name: 'components/TodoFilter.jsx',
        content: `import React from 'react';

function TodoFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' }
  ];

  return (
    <div className="todo-filter">
      {filters.map(filter => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={\`filter-btn \${currentFilter === filter.key ? 'active' : ''}\`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;`,
        language: 'jsx',
      },
      {
        name: 'App.css',
        content: `/* Todo App Styles */
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
}

.app-header h1 {
  color: #333;
  margin-bottom: 10px;
}

.todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

.todo-input:focus {
  outline: none;
  border-color: #007bff;
}

.add-btn {
  padding: 12px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.add-btn:hover {
  background: #0056b3;
}

.todo-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 6px;
}

.clear-btn {
  padding: 6px 12px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.clear-btn:hover {
  background: #c82333;
}

.todo-filter {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-btn {
  padding: 8px 16px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 8px;
  background: white;
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
}

.todo-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 16px;
  cursor: pointer;
}

.edit-input {
  flex: 1;
  padding: 8px;
  border: 2px solid #007bff;
  border-radius: 4px;
  font-size: 16px;
}

.todo-actions {
  display: flex;
  gap: 8px;
}

.edit-btn, .delete-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.edit-btn {
  background: #28a745;
  color: white;
}

.edit-btn:hover {
  background: #218838;
}

.delete-btn {
  background: #dc3545;
  color: white;
}

.delete-btn:hover {
  background: #c82333;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
}

.empty-state p {
  font-size: 18px;
  margin: 0;
}`,
        language: 'css',
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'frontend-task-007',
    title: 'Create a Weather Dashboard',
    description:
      'Build a responsive weather dashboard that displays current weather conditions, 5-day forecast, and location-based weather data using a weather API.',
    category: 'React',
    difficulty: 'intermediate',
    estimatedTime: '3-4 hours',
    tags: ['react', 'api', 'responsive', 'charts', 'geolocation'],
    hints: [
      'Use OpenWeatherMap API or similar weather service',
      'Implement geolocation to get user location',
      'Use Chart.js or similar library for weather charts',
      'Handle loading states and error cases',
      'Make the dashboard responsive for mobile devices',
    ],
    requirements: [
      'Display current weather conditions',
      'Show 5-day weather forecast',
      'Include temperature, humidity, wind speed',
      'Display weather icons and descriptions',
      'Allow location search by city name',
      'Use geolocation for automatic location detection',
      'Show loading states during API calls',
      'Handle API errors gracefully',
      'Make dashboard responsive',
      'Include temperature unit toggle (Celsius/Fahrenheit)',
    ],
    files: [
      {
        name: 'App.jsx',
        content: `import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import LocationSearch from './components/LocationSearch';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { getCurrentWeather, getForecast } from './services/weatherService';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');
  const [unit, setUnit] = useState('metric');

  useEffect(() => {
    // Get user's current location on app load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Fallback to default location
          fetchWeatherByLocation('London');
        }
      );
    } else {
      fetchWeatherByLocation('London');
    }
  }, []);

  const fetchWeatherByLocation = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      const [currentWeather, forecastData] = await Promise.all([
        getCurrentWeather(city, unit),
        getForecast(city, unit)
      ]);
      
      setWeather(currentWeather);
      setForecast(forecastData);
      setLocation(city);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);
    
    try {
      const [currentWeather, forecastData] = await Promise.all([
        getCurrentWeather(lat, lon, unit),
        getForecast(lat, lon, unit)
      ]);
      
      setWeather(currentWeather);
      setForecast(forecastData);
      setLocation(currentWeather.name);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = (city) => {
    fetchWeatherByLocation(city);
  };

  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    fetchWeatherByLocation(location);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather Dashboard</h1>
        <div className="header-controls">
          <button onClick={toggleUnit} className="unit-toggle">
            {unit === 'metric' ? '°F' : '°C'}
          </button>
        </div>
      </header>

      <main className="app-main">
        <LocationSearch onSearch={handleLocationSearch} />
        
        {loading && <LoadingSpinner />}
        
        {error && <ErrorMessage message={error} />}
        
        {weather && !loading && (
          <>
            <WeatherCard weather={weather} unit={unit} />
            <Forecast forecast={forecast} unit={unit} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;`,
        language: 'jsx',
      },
      {
        name: 'services/weatherService.js',
        content: `// Weather API service
const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeather = async (location, unit = 'metric') => {
  const url = typeof location === 'string' 
    ? \`\${BASE_URL}/weather?q=\${location}&appid=\${API_KEY}&units=\${unit}\`
    : \`\${BASE_URL}/weather?lat=\${location.lat}&lon=\${location.lon}&appid=\${API_KEY}&units=\${unit}\`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch current weather');
  }
  
  return response.json();
};

export const getForecast = async (location, unit = 'metric') => {
  const url = typeof location === 'string'
    ? \`\${BASE_URL}/forecast?q=\${location}&appid=\${API_KEY}&units=\${unit}\`
    : \`\${BASE_URL}/forecast?lat=\${location.lat}&lon=\${location.lon}&appid=\${API_KEY}&units=\${unit}\`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch forecast');
  }
  
  const data = await response.json();
  
  // Group forecast by day and return 5-day forecast
  const dailyForecast = {};
  
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyForecast[date]) {
      dailyForecast[date] = {
        date: date,
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        weather: item.weather[0],
        humidity: item.main.humidity,
        wind: item.wind.speed
      };
    } else {
      dailyForecast[date].temp_min = Math.min(dailyForecast[date].temp_min, item.main.temp_min);
      dailyForecast[date].temp_max = Math.max(dailyForecast[date].temp_max, item.main.temp_max);
    }
  });
  
  return Object.values(dailyForecast).slice(0, 5);
};`,
        language: 'javascript',
      },
      {
        name: 'components/WeatherCard.jsx',
        content: `import React from 'react';

function WeatherCard({ weather, unit }) {
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';
  
  return (
    <div className="weather-card">
      <div className="weather-main">
        <div className="weather-icon">
          <img 
            src={\`https://openweathermap.org/img/wn/\${weather.weather[0].icon}@2x.png\`}
            alt={weather.weather[0].description}
          />
        </div>
        <div className="weather-info">
          <h2 className="location">{weather.name}, {weather.sys.country}</h2>
          <div className="temperature">
            {Math.round(weather.main.temp)}{tempUnit}
          </div>
          <div className="description">
            {weather.weather[0].description}
          </div>
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <span className="label">Feels like</span>
          <span className="value">{Math.round(weather.main.feels_like)}{tempUnit}</span>
        </div>
        <div className="detail-item">
          <span className="label">Humidity</span>
          <span className="value">{weather.main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="label">Wind</span>
          <span className="value">{weather.wind.speed} {windUnit}</span>
        </div>
        <div className="detail-item">
          <span className="label">Pressure</span>
          <span className="value">{weather.main.pressure} hPa</span>
        </div>
        <div className="detail-item">
          <span className="label">Visibility</span>
          <span className="value">{weather.visibility / 1000} km</span>
        </div>
        <div className="detail-item">
          <span className="label">UV Index</span>
          <span className="value">{weather.uvi || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;`,
        language: 'jsx',
      },
      {
        name: 'components/Forecast.jsx',
        content: `import React from 'react';

function Forecast({ forecast, unit }) {
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  
  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-list">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-item">
            <div className="forecast-date">
              {new Date(day.date).toLocaleDateString('en-US', { 
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </div>
            <div className="forecast-icon">
              <img 
                src={\`https://openweathermap.org/img/wn/\${day.weather.icon}@2x.png\`}
                alt={day.weather.description}
              />
            </div>
            <div className="forecast-temps">
              <span className="temp-high">{Math.round(day.temp_max)}{tempUnit}</span>
              <span className="temp-low">{Math.round(day.temp_min)}{tempUnit}</span>
            </div>
            <div className="forecast-desc">
              {day.weather.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;`,
        language: 'jsx',
      },
      {
        name: 'components/LocationSearch.jsx',
        content: `import React, { useState } from 'react';

function LocationSearch({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="location-search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter city name..."
        className="search-input"
      />
      <button type="submit" className="search-btn">
        Search
      </button>
    </form>
  );
}

export default LocationSearch;`,
        language: 'jsx',
      },
      {
        name: 'components/LoadingSpinner.jsx',
        content: `import React from 'react';

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading weather data...</p>
    </div>
  );
}

export default LoadingSpinner;`,
        language: 'jsx',
      },
      {
        name: 'components/ErrorMessage.jsx',
        content: `import React from 'react';

function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;`,
        language: 'jsx',
      },
      {
        name: 'App.css',
        content: `/* Weather Dashboard Styles */
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e9ecef;
}

.app-header h1 {
  color: #333;
  margin: 0;
}

.header-controls {
  display: flex;
  gap: 10px;
}

.unit-toggle {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.unit-toggle:hover {
  background: #0056b3;
}

.location-search {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  max-width: 400px;
}

.search-input {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
}

.search-btn {
  padding: 12px 20px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.search-btn:hover {
  background: #218838;
}

.weather-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.weather-main {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.weather-icon img {
  width: 80px;
  height: 80px;
}

.weather-info {
  margin-left: 20px;
}

.location {
  font-size: 24px;
  margin: 0 0 10px 0;
  font-weight: 300;
}

.temperature {
  font-size: 48px;
  font-weight: 300;
  margin: 0;
}

.description {
  font-size: 18px;
  text-transform: capitalize;
  opacity: 0.9;
}

.weather-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.detail-item .label {
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 5px;
}

.detail-item .value {
  font-size: 18px;
  font-weight: 600;
}

.forecast {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.forecast h3 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 24px;
}

.forecast-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.forecast-item {
  text-align: center;
  padding: 20px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: #f8f9fa;
}

.forecast-date {
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.forecast-icon img {
  width: 50px;
  height: 50px;
  margin: 10px 0;
}

.forecast-temps {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
}

.temp-high {
  font-weight: 600;
  color: #333;
}

.temp-low {
  color: #666;
}

.forecast-desc {
  font-size: 14px;
  color: #666;
  text-transform: capitalize;
}

.loading-spinner {
  text-align: center;
  padding: 40px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #f5c6cb;
  margin-bottom: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .app {
    padding: 10px;
  }
  
  .app-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .weather-main {
    flex-direction: column;
    text-align: center;
  }
  
  .weather-info {
    margin-left: 0;
    margin-top: 20px;
  }
  
  .weather-details {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .forecast-list {
    grid-template-columns: 1fr;
  }
  
  .location-search {
    flex-direction: column;
  }
}`,
        language: 'css',
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
];

// ==========================================
// Seeding Functions
// ==========================================

async function seedAdditionalFrontendTasks() {
  console.log('🌱 Starting additional frontend tasks seeding...');

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const task of additionalFrontendTasks) {
    try {
      // Check if task already exists
      const existingQuery = query(
        collection(db, 'frontendTasks'),
        where('id', '==', task.id)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (existingSnapshot.empty) {
        // Add task to Firebase
        await addDoc(collection(db, 'frontendTasks'), task);

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
