// v1.0 - Comprehensive frontend tasks seeding script
// Run with: npx tsx src/scripts/seed-comprehensive-frontend-tasks.ts

import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain: 'fir-demo-project-adffb.firebaseapp.com',
  projectId: 'fir-demo-project-adffb',
  storageBucket: 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: '76366138630',
  appId: '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: 'G-XZ5VKFGG4Y',
};

// Initialize Firebase

const db = getFirestore(app);

// ==========================================
// Comprehensive Frontend Tasks
// ==========================================

const comprehensiveFrontendTasks = [
  {
    id: 'frontend-task-009',
    title: 'Build a Real-time Chat Application',
    description:
      'Create a real-time chat application with multiple rooms, user authentication, message history, and typing indicators using WebSocket or Socket.io.',
    category: 'React',
    difficulty: 'advanced',
    estimatedTime: '6-8 hours',
    tags: ['react', 'websocket', 'socket.io', 'real-time', 'authentication'],
    hints: [
      'Use Socket.io for real-time communication',
      'Implement room-based messaging',
      'Add typing indicators and online status',
      'Store message history in a database',
      'Implement user authentication',
    ],
    requirements: [
      'User authentication and registration',
      'Create and join chat rooms',
      'Real-time messaging between users',
      'Message history persistence',
      'Typing indicators',
      'Online/offline user status',
      'Message timestamps',
      'Private messaging between users',
      'File/image sharing in messages',
      'Message search functionality',
    ],
    files: [
      {
        name: 'App.jsx',
        content: `import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { io } from 'socket.io-client';
import ChatRoom from './components/ChatRoom';
import LoginForm from './components/LoginForm';
import RoomList from './components/RoomList';
import './App.css';

const socket = io('http://localhost:3001');

function App() {
  const [user, setUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Socket event listeners
    socket.on('message', (message) => {
      // Handle incoming messages
      console.log('New message:', message);
    });

    socket.on('userJoined', (data) => {
      console.log(\`\${data.username} joined the room\`);
    });

    socket.on('userLeft', (data) => {
      console.log(\`\${data.username} left the room\`);
    });

    socket.on('typing', (data) => {
      console.log(\`\${data.username} is typing...\`);
    });

    return () => {
      socket.off('message');
      socket.off('userJoined');
      socket.off('userLeft');
      socket.off('typing');
    };
  }, []);

  const handleLogin = (username) => {
    setUser({ username, id: Date.now() });
    socket.emit('join', { username });
  };

  const handleJoinRoom = (roomName) => {
    if (currentRoom) {
      socket.emit('leaveRoom', currentRoom);
    }
    socket.emit('joinRoom', roomName);
    setCurrentRoom(roomName);
  };

  const handleCreateRoom = (roomName) => {
    socket.emit('createRoom', roomName);
    setRooms(prev => [...prev, roomName]);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Real-time Chat</h1>
        <div className="user-info">
          Welcome, {user.username}!
        </div>
      </header>

      <div className="app-content">
        <RoomList
          rooms={rooms}
          currentRoom={currentRoom}
          onJoinRoom={handleJoinRoom}
          onCreateRoom={handleCreateRoom}
        />
        
        {currentRoom && (
          <ChatRoom
            room={currentRoom}
            user={user}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
}

export default App;`,
        language: 'jsx',
      },
      {
        name: 'components/ChatRoom.jsx',
        content: `import React, { useState, useEffect, useRef } from 'react';

function ChatRoom({ room, user, socket }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Listen for messages in this room
    socket.on('roomMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on('userTyping', (data) => {
      if (data.room === room && data.username !== user.username) {
        setTypingUsers(prev => [...prev.filter(u => u !== data.username), data.username]);
      }
    });

    socket.on('userStoppedTyping', (data) => {
      if (data.room === room) {
        setTypingUsers(prev => prev.filter(u => u !== data.username));
      }
    });

    return () => {
      socket.off('roomMessage');
      socket.off('userTyping');
      socket.off('userStoppedTyping');
    };
  }, [room, user.username, socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        username: user.username,
        room: room,
        timestamp: new Date().toISOString()
      };

      socket.emit('sendMessage', message);
      setNewMessage('');
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    
    if (e.target.value.trim()) {
      socket.emit('typing', { room, username: user.username });
    } else {
      socket.emit('stopTyping', { room, username: user.username });
    }
  };

  return (
    <div className="chat-room">
      <div className="room-header">
        <h2>Room: {room}</h2>
        <div className="typing-indicator">
          {typingUsers.length > 0 && (
            <span>{typingUsers.join(', ')} is typing...</span>
          )}
        </div>
      </div>

      <div className="messages-container">
        {messages.map(message => (
          <div key={message.id} className="message">
            <div className="message-header">
              <span className="username">{message.username}</span>
              <span className="timestamp">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="message-text">{message.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={handleTyping}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;`,
        language: 'jsx',
      },
      {
        name: 'components/LoginForm.jsx',
        content: `import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="username-input"
            required
          />
          <button type="submit" className="login-button">
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;`,
        language: 'jsx',
      },
      {
        name: 'components/RoomList.jsx',
        content: `import React, { useState } from 'react';

function RoomList({ rooms, currentRoom, onJoinRoom, onCreateRoom }) {
  const [newRoomName, setNewRoomName] = useState('');

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (newRoomName.trim()) {
      onCreateRoom(newRoomName.trim());
      setNewRoomName('');
    }
  };

  return (
    <div className="room-list">
      <h3>Chat Rooms</h3>
      
      <form onSubmit={handleCreateRoom} className="create-room-form">
        <input
          type="text"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          placeholder="Room name"
          className="room-input"
        />
        <button type="submit" className="create-room-button">
          Create Room
        </button>
      </form>

      <div className="rooms">
        {rooms.map(room => (
          <button
            key={room}
            onClick={() => onJoinRoom(room)}
            className={\`room-button \${currentRoom === room ? 'active' : ''}\`}
          >
            {room}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RoomList;`,
        language: 'jsx',
      },
      {
        name: 'App.css',
        content: `/* Real-time Chat App Styles */
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.app-header {
  background: #2c3e50;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-header h1 {
  margin: 0;
}

.user-info {
  font-size: 0.9rem;
  opacity: 0.9;
}

.app-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
}

.login-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 300px;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.username-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.username-input:focus {
  outline: none;
  border-color: #3498db;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.login-button:hover {
  background: #2980b9;
}

.room-list {
  width: 250px;
  background: #ecf0f1;
  padding: 1rem;
  border-right: 1px solid #bdc3c7;
}

.room-list h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.create-room-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.room-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 0.9rem;
}

.create-room-button {
  padding: 0.5rem 1rem;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.create-room-button:hover {
  background: #229954;
}

.rooms {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.room-button {
  padding: 0.75rem;
  background: white;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
}

.room-button:hover {
  background: #e8f4f8;
}

.room-button.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.chat-room {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.room-header {
  background: #34495e;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.room-header h2 {
  margin: 0;
}

.typing-indicator {
  font-size: 0.9rem;
  opacity: 0.8;
  font-style: italic;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: #f8f9fa;
}

.message {
  background: white;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.username {
  font-weight: bold;
  color: #2c3e50;
}

.timestamp {
  font-size: 0.8rem;
  color: #7f8c8d;
}

.message-text {
  color: #333;
  line-height: 1.4;
}

.message-form {
  display: flex;
  padding: 1rem;
  background: white;
  border-top: 1px solid #bdc3c7;
}

.message-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 1rem;
  margin-right: 0.5rem;
}

.message-input:focus {
  outline: none;
  border-color: #3498db;
}

.send-button {
  padding: 0.75rem 1.5rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.send-button:hover {
  background: #2980b9;
}

/* Responsive Design */
@media (max-width: 768px) {
  .app-content {
    flex-direction: column;
  }
  
  .room-list {
    width: 100%;
    height: 200px;
    border-right: none;
    border-bottom: 1px solid #bdc3c7;
  }
  
  .create-room-form {
    flex-direction: column;
  }
  
  .room-input {
    margin-bottom: 0.5rem;
  }
}`,
        language: 'css',
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'frontend-task-010',
    title: 'Create a Drag and Drop Kanban Board',
    description:
      'Build a fully functional Kanban board with drag and drop functionality, task management, and real-time updates using React DnD or similar library.',
    category: 'React',
    difficulty: 'advanced',
    estimatedTime: '5-6 hours',
    tags: ['react', 'drag-drop', 'kanban', 'state-management', 'ui'],
    hints: [
      'Use react-beautiful-dnd or @dnd-kit for drag and drop',
      'Implement column-based task organization',
      'Add task creation, editing, and deletion',
      'Use local storage for persistence',
      'Implement smooth animations',
    ],
    requirements: [
      'Create, edit, and delete tasks',
      'Drag and drop tasks between columns',
      'Add new columns dynamically',
      'Task priority and due date management',
      'Task search and filtering',
      'Responsive design for mobile',
      'Local storage persistence',
      'Task assignment to team members',
      'Task comments and attachments',
      'Export board data to JSON',
    ],
    files: [
      {
        name: 'App.jsx',
        content: `import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Column from './components/Column';
import AddColumn from './components/AddColumn';
import TaskModal from './components/TaskModal';
import './App.css';

const initialColumns = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: []
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: []
  },
  {
    id: 'done',
    title: 'Done',
    tasks: []
  }
];

function App() {
  const [columns, setColumns] = useState(initialColumns);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load data from localStorage
    const savedColumns = localStorage.getItem('kanban-board');
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns));
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage
    localStorage.setItem('kanban-board', JSON.stringify(columns));
  }, [columns]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = columns.find(col => col.id === source.droppableId);
    const finishColumn = columns.find(col => col.id === destination.droppableId);

    if (startColumn === finishColumn) {
      // Moving within the same column
      const newTasks = Array.from(startColumn.tasks);
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);

      const newColumn = {
        ...startColumn,
        tasks: newTasks
      };

      setColumns(prev => prev.map(col => 
        col.id === newColumn.id ? newColumn : col
      ));
    } else {
      // Moving between columns
      const startTasks = Array.from(startColumn.tasks);
      const [removed] = startTasks.splice(source.index, 1);
      
      const finishTasks = Array.from(finishColumn.tasks);
      finishTasks.splice(destination.index, 0, removed);

      const newStartColumn = {
        ...startColumn,
        tasks: startTasks
      };

      const newFinishColumn = {
        ...finishColumn,
        tasks: finishTasks
      };

      setColumns(prev => prev.map(col => {
        if (col.id === newStartColumn.id) return newStartColumn;
        if (col.id === newFinishColumn.id) return newFinishColumn;
        return col;
      }));
    }
  };

  const addTask = (columnId, task) => {
    const newTask = {
      id: Date.now().toString(),
      ...task,
      created_at: new Date().toISOString()
    };

    setColumns(prev => prev.map(col => {
      if (col.id === columnId) {
        return {
          ...col,
          tasks: [...col.tasks, newTask]
        };
      }
      return col;
    }));
  };

  const updateTask = (taskId, updates) => {
    setColumns(prev => prev.map(col => ({
      ...col,
      tasks: col.tasks.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      )
    })));
  };

  const deleteTask = (taskId) => {
    setColumns(prev => prev.map(col => ({
      ...col,
      tasks: col.tasks.filter(task => task.id !== taskId)
    })));
  };

  const addColumn = (title) => {
    const newColumn = {
      id: Date.now().toString(),
      title,
      tasks: []
    };
    setColumns(prev => [...prev, newColumn]);
  };

  const openTaskModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeTaskModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Kanban Board</h1>
        <div className="header-actions">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="add-task-btn"
          >
            Add Task
          </button>
        </div>
      </header>

      <main className="app-main">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="board">
            {columns.map(column => (
              <Column
                key={column.id}
                column={column}
                onAddTask={addTask}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
                onOpenTaskModal={openTaskModal}
              />
            ))}
            <AddColumn onAddColumn={addColumn} />
          </div>
        </DragDropContext>
      </main>

      {isModalOpen && (
        <TaskModal
          task={selectedTask}
          columns={columns}
          onSave={selectedTask ? updateTask : addTask}
          onDelete={selectedTask ? deleteTask : null}
          onClose={closeTaskModal}
        />
      )}
    </div>
  );
}

export default App;`,
        language: 'jsx',
      },
      {
        name: 'components/Column.jsx',
        content: `import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';
import AddTask from './AddTask';

function Column({ column, onAddTask, onUpdateTask, onDeleteTask, onOpenTaskModal }) {
  return (
    <div className="column">
      <div className="column-header">
        <h3>{column.title}</h3>
        <span className="task-count">{column.tasks.length}</span>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={\`task-list \${snapshot.isDraggingOver ? 'dragging-over' : ''}\`}
          >
            {column.tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={\`task-container \${snapshot.isDragging ? 'dragging' : ''}\`}
                  >
                    <Task
                      task={task}
                      onUpdate={onUpdateTask}
                      onDelete={onDeleteTask}
                      onOpenModal={onOpenTaskModal}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            
            <AddTask 
              columnId={column.id}
              onAddTask={onAddTask}
            />
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;`,
        language: 'jsx',
      },
      {
        name: 'components/Task.jsx',
        content: `import React from 'react';

function Task({ task, onUpdate, onDelete, onOpenModal }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#27ae60';
      default: return '#95a5a6';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div 
      className="task"
      onClick={() => onOpenModal(task)}
    >
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
        <div 
          className="priority-indicator"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        />
      </div>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      
      <div className="task-footer">
        {task.dueDate && (
          <span className="due-date">
            Due: {formatDate(task.dueDate)}
          </span>
        )}
        
        {task.assignee && (
          <span className="assignee">
            {task.assignee}
          </span>
        )}
        
        <div className="task-actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="delete-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Task;`,
        language: 'jsx',
      },
      {
        name: 'components/AddTask.jsx',
        content: `import React, { useState } from 'react';

function AddTask({ columnId, onAddTask }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    assignee: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onAddTask(columnId, formData);
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        assignee: ''
      });
      setIsFormOpen(false);
    }
  };

  if (!isFormOpen) {
    return (
      <button 
        className="add-task-button"
        onClick={() => setIsFormOpen(true)}
      >
        + Add Task
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        placeholder="Task title"
        className="task-title-input"
        autoFocus
        required
      />
      
      <textarea
        value={formData.description}
        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        placeholder="Task description"
        className="task-description-input"
        rows="3"
      />
      
      <div className="form-row">
        <select
          value={formData.priority}
          onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
          className="priority-select"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
          className="due-date-input"
        />
      </div>
      
      <input
        type="text"
        value={formData.assignee}
        onChange={(e) => setFormData(prev => ({ ...prev, assignee: e.target.value }))}
        placeholder="Assignee"
        className="assignee-input"
      />
      
      <div className="form-actions">
        <button type="submit" className="save-btn">
          Save
        </button>
        <button 
          type="button" 
          onClick={() => setIsFormOpen(false)}
          className="cancel-btn"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddTask;`,
        language: 'jsx',
      },
      {
        name: 'components/AddColumn.jsx',
        content: `import React, { useState } from 'react';

function AddColumn({ onAddColumn }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [columnTitle, setColumnTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (columnTitle.trim()) {
      onAddColumn(columnTitle.trim());
      setColumnTitle('');
      setIsFormOpen(false);
    }
  };

  if (!isFormOpen) {
    return (
      <button 
        className="add-column-button"
        onClick={() => setIsFormOpen(true)}
      >
        + Add Column
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="add-column-form">
      <input
        type="text"
        value={columnTitle}
        onChange={(e) => setColumnTitle(e.target.value)}
        placeholder="Column title"
        className="column-title-input"
        autoFocus
        required
      />
      <div className="form-actions">
        <button type="submit" className="save-btn">
          Add Column
        </button>
        <button 
          type="button" 
          onClick={() => setIsFormOpen(false)}
          className="cancel-btn"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddColumn;`,
        language: 'jsx',
      },
      {
        name: 'components/TaskModal.jsx',
        content: `import React, { useState, useEffect } from 'react';

function TaskModal({ task, columns, onSave, onDelete, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    assignee: '',
    columnId: 'todo'
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate || '',
        assignee: task.assignee || '',
        columnId: task.columnId || 'todo'
      });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      onSave(task.id, formData);
    } else {
      onSave(formData.columnId, formData);
    }
    onClose();
  };

  const handleDelete = () => {
    if (task && onDelete) {
      onDelete(task.id);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{task ? 'Edit Task' : 'Add Task'}</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Task title"
            className="form-input"
            required
          />

          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Task description"
            className="form-textarea"
            rows="4"
          />

          <div className="form-row">
            <select
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
              className="form-select"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>

            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              className="form-input"
            />
          </div>

          <input
            type="text"
            value={formData.assignee}
            onChange={(e) => setFormData(prev => ({ ...prev, assignee: e.target.value }))}
            placeholder="Assignee"
            className="form-input"
          />

          {!task && (
            <select
              value={formData.columnId}
              onChange={(e) => setFormData(prev => ({ ...prev, columnId: e.target.value }))}
              className="form-select"
            >
              {columns.map(column => (
                <option key={column.id} value={column.id}>
                  {column.title}
                </option>
              ))}
            </select>
          )}

          <div className="modal-actions">
            <button type="submit" className="save-btn">
              {task ? 'Update Task' : 'Add Task'}
            </button>
            {task && onDelete && (
              <button type="button" onClick={handleDelete} className="delete-btn">
                Delete Task
              </button>
            )}
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;`,
        language: 'jsx',
      },
      {
        name: 'App.css',
        content: `/* Kanban Board Styles */
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f6fa;
}

.app-header {
  background: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.app-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.add-task-btn {
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.add-task-btn:hover {
  background: #2980b9;
}

.app-main {
  flex: 1;
  overflow: hidden;
  padding: 1rem;
}

.board {
  display: flex;
  gap: 1rem;
  height: 100%;
  overflow-x: auto;
}

.column {
  min-width: 300px;
  background: #ecf0f1;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.column-header {
  padding: 1rem;
  background: #34495e;
  color: white;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.column-header h3 {
  margin: 0;
  font-size: 1rem;
}

.task-count {
  background: #3498db;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.task-list {
  flex: 1;
  padding: 1rem;
  min-height: 200px;
  transition: background-color 0.2s;
}

.task-list.dragging-over {
  background: #d5dbdb;
}

.task-container {
  margin-bottom: 0.75rem;
}

.task-container.dragging {
  transform: rotate(5deg);
}

.task {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.2s;
}

.task:hover {
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  transform: translateY(-1px);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.task-title {
  margin: 0;
  font-size: 1rem;
  color: #2c3e50;
}

.priority-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.task-description {
  margin: 0.5rem 0;
  color: #7f8c8d;
  font-size: 0.9rem;
  line-height: 1.4;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #7f8c8d;
}

.due-date {
  color: #e74c3c;
  font-weight: 500;
}

.assignee {
  background: #ecf0f1;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

.delete-btn {
  padding: 0.25rem 0.5rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.delete-btn:hover {
  background: #c0392b;
}

.add-task-button {
  width: 100%;
  padding: 0.75rem;
  background: #95a5a6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.add-task-button:hover {
  background: #7f8c8d;
}

.add-task-form {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.task-title-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.task-description-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  resize: vertical;
}

.form-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.priority-select,
.due-date-input,
.assignee-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 0.9rem;
}

.form-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.save-btn {
  flex: 1;
  padding: 0.5rem;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.save-btn:hover {
  background: #229954;
}

.cancel-btn {
  flex: 1;
  padding: 0.5rem;
  background: #95a5a6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.cancel-btn:hover {
  background: #7f8c8d;
}

.add-column-button {
  min-width: 300px;
  height: 60px;
  background: #bdc3c7;
  color: white;
  border: 2px dashed #95a5a6;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.add-column-button:hover {
  background: #95a5a6;
  border-color: #7f8c8d;
}

.add-column-form {
  min-width: 300px;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.column-title-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 1rem;
  border-bottom: 1px solid #ecf0f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #7f8c8d;
}

.close-btn:hover {
  color: #2c3e50;
}

.modal-form {
  padding: 1rem;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.form-textarea {
  resize: vertical;
}

.modal-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.modal-actions .save-btn {
  flex: 1;
}

.modal-actions .delete-btn {
  background: #e74c3c;
}

.modal-actions .delete-btn:hover {
  background: #c0392b;
}

/* Responsive Design */
@media (max-width: 768px) {
  .board {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .column {
    min-width: auto;
  }
  
  .form-row {
    flex-direction: column;
  }
  
  .modal-actions {
    flex-direction: column;
  }
}`,
        language: 'css',
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
];

// ==========================================
// Seeding Functions
// ==========================================

async function seedComprehensiveFrontendTasks() {
  console.log('🌱 Starting comprehensive frontend tasks seeding...');

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const task of comprehensiveFrontendTasks) {
    try {
      // Check if task already exists
      const existingQuery = query(
        supabase.from('frontendTasks'),
        where('id', task.id)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (existingSnapshot.length === 0) {
        // Add task to Firebase
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

  console.log('🎉 Comprehensive frontend tasks seeding completed!');
  console.log(`📊 Summary:`);
  console.log(`   - Successfully added: ${successCount}`);
  console.log(`   - Skipped (already exist): ${skipCount}`);
  console.log(`   - Errors: ${errorCount}`);
  console.log(`   - Total processed: ${comprehensiveFrontendTasks.length}`);
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  console.log('🚀 Starting comprehensive frontend tasks seeding process...');

  try {
    await seedComprehensiveFrontendTasks();

    console.log('\\n🎉 All frontend tasks seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
}

main().catch(console.error);
