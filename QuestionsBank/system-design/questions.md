# System Design - Questions Bank

## Question 1: Scalability Patterns

**Question:** Explain different scalability patterns and when to use them.

**Answer:**
**1. Horizontal vs Vertical Scaling:**

```javascript
// Vertical Scaling (Scale Up)
// Add more resources to existing server
const server = {
  cpu: '8 cores',
  ram: '32GB',
  storage: '1TB SSD',
};

// Horizontal Scaling (Scale Out)
// Add more servers
const servers = [
  { id: 1, cpu: '4 cores', ram: '16GB' },
  { id: 2, cpu: '4 cores', ram: '16GB' },
  { id: 3, cpu: '4 cores', ram: '16GB' },
];

// Load balancer configuration
const loadBalancer = {
  algorithm: 'round-robin',
  healthCheck: '/health',
  servers: servers,
};
```

**2. Database Scaling:**

```javascript
// Read Replicas
const masterDB = {
  host: 'master-db.example.com',
  role: 'write',
};

const readReplicas = [
  { host: 'replica-1.example.com', role: 'read' },
  { host: 'replica-2.example.com', role: 'read' },
  { host: 'replica-3.example.com', role: 'read' },
];

// Database connection strategy
class DatabaseConnection {
  constructor() {
    this.master = masterDB;
    this.replicas = readReplicas;
    this.currentReplica = 0;
  }

  getWriteConnection() {
    return this.master;
  }

  getReadConnection() {
    const replica = this.replicas[this.currentReplica];
    this.currentReplica = (this.currentReplica + 1) % this.replicas.length;
    return replica;
  }
}
```

**3. Caching Strategies:**

```javascript
// Cache-Aside Pattern
class CacheAside {
  constructor(cache, database) {
    this.cache = cache;
    this.db = database;
  }

  async get(key) {
    // Try cache first
    let value = await this.cache.get(key);
    if (value) {
      return value;
    }

    // Cache miss - get from database
    value = await this.db.get(key);
    if (value) {
      await this.cache.set(key, value, 3600); // 1 hour TTL
    }
    return value;
  }

  async set(key, value) {
    // Write to database
    await this.db.set(key, value);
    // Update cache
    await this.cache.set(key, value, 3600);
  }
}

// Write-Through Cache
class WriteThroughCache {
  constructor(cache, database) {
    this.cache = cache;
    this.db = database;
  }

  async set(key, value) {
    // Write to both cache and database
    await Promise.all([
      this.cache.set(key, value, 3600),
      this.db.set(key, value),
    ]);
  }
}
```

---

## Question 2: Load Balancing

**Question:** Explain different load balancing algorithms and strategies.

**Answer:**
**1. Load Balancing Algorithms:**

```javascript
// Round Robin
class RoundRobinLoadBalancer {
  constructor(servers) {
    this.servers = servers;
    this.currentIndex = 0;
  }

  getNextServer() {
    const server = this.servers[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.servers.length;
    return server;
  }
}

// Weighted Round Robin
class WeightedRoundRobinLoadBalancer {
  constructor(servers) {
    this.servers = servers;
    this.currentWeight = 0;
    this.currentIndex = -1;
  }

  getNextServer() {
    while (true) {
      this.currentIndex = (this.currentIndex + 1) % this.servers.length;
      if (this.currentIndex === 0) {
        this.currentWeight -= this.gcd();
        if (this.currentWeight <= 0) {
          this.currentWeight = Math.max(...this.servers.map(s => s.weight));
        }
      }

      if (this.servers[this.currentIndex].weight >= this.currentWeight) {
        return this.servers[this.currentIndex];
      }
    }
  }

  gcd() {
    return this.servers.reduce((a, b) => this.gcdTwo(a, b.weight), 0);
  }

  gcdTwo(a, b) {
    return b === 0 ? a : this.gcdTwo(b, a % b);
  }
}

// Least Connections
class LeastConnectionsLoadBalancer {
  constructor(servers) {
    this.servers = servers.map(server => ({
      ...server,
      connections: 0,
    }));
  }

  getNextServer() {
    const server = this.servers.reduce((min, current) =>
      current.connections < min.connections ? current : min
    );
    server.connections++;
    return server;
  }

  releaseConnection(server) {
    const s = this.servers.find(s => s.id === server.id);
    if (s) s.connections--;
  }
}
```

**2. Health Checks:**

```javascript
class HealthChecker {
  constructor(servers, options = {}) {
    this.servers = servers;
    this.interval = options.interval || 30000; // 30 seconds
    this.timeout = options.timeout || 5000; // 5 seconds
    this.healthyServers = new Set();
    this.startHealthChecks();
  }

  startHealthChecks() {
    setInterval(() => {
      this.checkAllServers();
    }, this.interval);
  }

  async checkAllServers() {
    const promises = this.servers.map(server => this.checkServer(server));
    await Promise.allSettled(promises);
  }

  async checkServer(server) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(`${server.url}/health`, {
        signal: controller.signal,
        method: 'GET',
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        this.healthyServers.add(server.id);
      } else {
        this.healthyServers.delete(server.id);
      }
    } catch (error) {
      this.healthyServers.delete(server.id);
    }
  }

  isHealthy(server) {
    return this.healthyServers.has(server.id);
  }

  getHealthyServers() {
    return this.servers.filter(server => this.isHealthy(server));
  }
}
```

---

## Question 3: Database Design

**Question:** Explain database design patterns and optimization strategies.

**Answer:**
**1. Database Sharding:**

```javascript
// Horizontal Sharding
class ShardedDatabase {
  constructor(shards) {
    this.shards = shards;
  }

  getShard(key) {
    // Simple hash-based sharding
    const hash = this.hash(key);
    const shardIndex = hash % this.shards.length;
    return this.shards[shardIndex];
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      const char = key.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  async get(key) {
    const shard = this.getShard(key);
    return await shard.get(key);
  }

  async set(key, value) {
    const shard = this.getShard(key);
    return await shard.set(key, value);
  }
}

// Range-based Sharding
class RangeShardedDatabase {
  constructor(shards) {
    this.shards = shards.sort((a, b) => a.range.start - b.range.start);
  }

  getShard(key) {
    const keyValue = parseInt(key);
    for (const shard of this.shards) {
      if (keyValue >= shard.range.start && keyValue < shard.range.end) {
        return shard;
      }
    }
    throw new Error(`No shard found for key: ${key}`);
  }
}
```

**2. Database Indexing:**

```sql
-- Single column index
CREATE INDEX idx_user_email ON users(email);

-- Composite index
CREATE INDEX idx_user_name_email ON users(last_name, first_name, email);

-- Partial index
CREATE INDEX idx_active_users ON users(email) WHERE status = 'active';

-- Covering index
CREATE INDEX idx_user_cover ON users(id, email, first_name, last_name);

-- Query optimization
EXPLAIN SELECT * FROM users WHERE email = 'user@example.com';
```

**3. Database Normalization:**

```sql
-- First Normal Form (1NF)
-- Each column contains atomic values
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

-- Second Normal Form (2NF)
-- Remove partial dependencies
CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT,
  order_date DATE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
  id INT PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INT,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Third Normal Form (3NF)
-- Remove transitive dependencies
CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  category_id INT,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE categories (
  id INT PRIMARY KEY,
  name VARCHAR(100)
);
```

---

## Question 4: Microservices Architecture

**Question:** Explain microservices architecture and communication patterns.

**Answer:**
**1. Service Communication:**

```javascript
// Synchronous Communication (HTTP/REST)
class UserService {
  constructor() {
    this.baseURL = 'http://user-service:3001';
  }

  async getUser(userId) {
    try {
      const response = await fetch(`${this.baseURL}/users/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async createUser(userData) {
    const response = await fetch(`${this.baseURL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  }
}

// Asynchronous Communication (Message Queue)
class OrderService {
  constructor(messageQueue) {
    this.messageQueue = messageQueue;
    this.setupEventHandlers();
  }

  setupEventHandlers() {
    // Listen for user events
    this.messageQueue.subscribe(
      'user.created',
      this.handleUserCreated.bind(this)
    );
    this.messageQueue.subscribe(
      'user.updated',
      this.handleUserUpdated.bind(this)
    );
  }

  async handleUserCreated(event) {
    const { userId, userData } = event.payload;
    // Create user profile in order service
    await this.createUserProfile(userId, userData);
  }

  async handleUserUpdated(event) {
    const { userId, userData } = event.payload;
    // Update user profile in order service
    await this.updateUserProfile(userId, userData);
  }

  async createOrder(orderData) {
    // Create order
    const order = await this.saveOrder(orderData);

    // Publish event
    await this.messageQueue.publish('order.created', {
      orderId: order.id,
      userId: order.userId,
      amount: order.total,
    });

    return order;
  }
}
```

**2. API Gateway:**

```javascript
class APIGateway {
  constructor(services) {
    this.services = services;
    this.routes = new Map();
    this.setupRoutes();
  }

  setupRoutes() {
    // User service routes
    this.routes.set('/api/users', this.services.userService);
    this.routes.set('/api/users/*', this.services.userService);

    // Order service routes
    this.routes.set('/api/orders', this.services.orderService);
    this.routes.set('/api/orders/*', this.services.orderService);

    // Product service routes
    this.routes.set('/api/products', this.services.productService);
    this.routes.set('/api/products/*', this.services.productService);
  }

  async handleRequest(req, res) {
    try {
      // Authentication
      const user = await this.authenticate(req);
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Rate limiting
      if (!(await this.checkRateLimit(user.id))) {
        return res.status(429).json({ error: 'Rate limit exceeded' });
      }

      // Route to appropriate service
      const service = this.findService(req.url);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      // Forward request
      const response = await service.handleRequest(req, user);
      res.json(response);
    } catch (error) {
      console.error('API Gateway error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  findService(url) {
    for (const [pattern, service] of this.routes) {
      if (url.startsWith(pattern.replace('*', ''))) {
        return service;
      }
    }
    return null;
  }
}
```

**3. Service Discovery:**

```javascript
class ServiceRegistry {
  constructor() {
    this.services = new Map();
  }

  register(serviceName, serviceInfo) {
    this.services.set(serviceName, {
      ...serviceInfo,
      registeredAt: Date.now(),
      healthCheck: serviceInfo.healthCheck || '/health',
    });
  }

  discover(serviceName) {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }
    return service;
  }

  async getHealthyInstance(serviceName) {
    const service = this.discover(serviceName);
    const instances = service.instances || [];

    for (const instance of instances) {
      try {
        const response = await fetch(`${instance.url}${service.healthCheck}`);
        if (response.ok) {
          return instance;
        }
      } catch (error) {
        console.error(`Health check failed for ${instance.url}:`, error);
      }
    }

    throw new Error(`No healthy instances found for ${serviceName}`);
  }
}
```

---

## Question 5: Caching Strategies

**Question:** Explain different caching strategies and their implementation.

**Answer:**
**1. Cache-Aside Pattern:**

```javascript
class CacheAside {
  constructor(cache, database) {
    this.cache = cache;
    this.db = database;
  }

  async get(key) {
    // Try cache first
    let value = await this.cache.get(key);
    if (value) {
      console.log('Cache hit for key:', key);
      return value;
    }

    console.log('Cache miss for key:', key);
    // Cache miss - get from database
    value = await this.db.get(key);
    if (value) {
      // Update cache
      await this.cache.set(key, value, 3600); // 1 hour TTL
    }
    return value;
  }

  async set(key, value) {
    // Write to database
    await this.db.set(key, value);
    // Update cache
    await this.cache.set(key, value, 3600);
  }

  async delete(key) {
    // Delete from database
    await this.db.delete(key);
    // Delete from cache
    await this.cache.delete(key);
  }
}
```

**2. Write-Through Cache:**

```javascript
class WriteThroughCache {
  constructor(cache, database) {
    this.cache = cache;
    this.db = database;
  }

  async set(key, value) {
    // Write to both cache and database
    await Promise.all([
      this.cache.set(key, value, 3600),
      this.db.set(key, value),
    ]);
  }

  async get(key) {
    // Try cache first
    let value = await this.cache.get(key);
    if (value) {
      return value;
    }

    // Cache miss - get from database
    value = await this.db.get(key);
    if (value) {
      // Update cache
      await this.cache.set(key, value, 3600);
    }
    return value;
  }
}
```

**3. Write-Behind Cache:**

```javascript
class WriteBehindCache {
  constructor(cache, database) {
    this.cache = cache;
    this.db = database;
    this.writeQueue = [];
    this.batchSize = 100;
    this.flushInterval = 5000; // 5 seconds
    this.startBatchProcessor();
  }

  async set(key, value) {
    // Write to cache immediately
    await this.cache.set(key, value, 3600);

    // Queue for database write
    this.writeQueue.push({ key, value, timestamp: Date.now() });

    // Flush if queue is full
    if (this.writeQueue.length >= this.batchSize) {
      await this.flush();
    }
  }

  async get(key) {
    return await this.cache.get(key);
  }

  startBatchProcessor() {
    setInterval(async () => {
      if (this.writeQueue.length > 0) {
        await this.flush();
      }
    }, this.flushInterval);
  }

  async flush() {
    if (this.writeQueue.length === 0) return;

    const batch = this.writeQueue.splice(0, this.batchSize);

    try {
      // Batch write to database
      await this.db.batchWrite(batch);
      console.log(`Flushed ${batch.length} items to database`);
    } catch (error) {
      console.error('Batch write failed:', error);
      // Re-queue failed items
      this.writeQueue.unshift(...batch);
    }
  }
}
```

**4. Cache Invalidation:**

```javascript
class CacheInvalidation {
  constructor(cache, database) {
    this.cache = cache;
    this.db = database;
    this.invalidationPatterns = new Map();
  }

  // TTL-based invalidation
  async setWithTTL(key, value, ttl) {
    await this.cache.set(key, value, ttl);
  }

  // Event-based invalidation
  async invalidateOnEvent(event, pattern) {
    this.invalidationPatterns.set(event, pattern);
  }

  async handleEvent(event, data) {
    const pattern = this.invalidationPatterns.get(event);
    if (pattern) {
      await this.invalidateByPattern(pattern, data);
    }
  }

  async invalidateByPattern(pattern, data) {
    const keys = await this.cache.keys(pattern);
    if (keys.length > 0) {
      await this.cache.delete(...keys);
      console.log(
        `Invalidated ${keys.length} cache keys matching pattern: ${pattern}`
      );
    }
  }

  // Version-based invalidation
  async setWithVersion(key, value, version) {
    const versionedKey = `${key}:v${version}`;
    await this.cache.set(versionedKey, value, 3600);

    // Store current version
    await this.cache.set(`${key}:current`, version, 3600);
  }

  async getWithVersion(key) {
    const currentVersion = await this.cache.get(`${key}:current`);
    if (currentVersion) {
      const versionedKey = `${key}:v${currentVersion}`;
      return await this.cache.get(versionedKey);
    }
    return null;
  }
}
```

---

## Question 6: Performance Optimization

**Question:** Explain system performance optimization techniques.

**Answer:**
**1. Database Query Optimization:**

```sql
-- Index optimization
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_order_user_date ON orders(user_id, order_date);

-- Query optimization
-- Bad: SELECT * FROM users WHERE email LIKE '%@gmail.com';
-- Good: SELECT id, name, email FROM users WHERE email LIKE '%@gmail.com';

-- Use EXPLAIN to analyze queries
EXPLAIN SELECT * FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.email = 'user@example.com';

-- Pagination
SELECT * FROM users
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;

-- Use cursor-based pagination for large datasets
SELECT * FROM users
WHERE created_at < '2023-01-01'
ORDER BY created_at DESC
LIMIT 20;
```

**2. Connection Pooling:**

```javascript
class ConnectionPool {
  constructor(config) {
    this.config = config;
    this.pool = [];
    this.maxConnections = config.maxConnections || 10;
    this.minConnections = config.minConnections || 2;
    this.initializePool();
  }

  async initializePool() {
    for (let i = 0; i < this.minConnections; i++) {
      const connection = await this.createConnection();
      this.pool.push(connection);
    }
  }

  async getConnection() {
    // Try to get existing connection
    if (this.pool.length > 0) {
      return this.pool.pop();
    }

    // Create new connection if under limit
    if (this.pool.length < this.maxConnections) {
      return await this.createConnection();
    }

    // Wait for connection to become available
    return await this.waitForConnection();
  }

  releaseConnection(connection) {
    if (this.pool.length < this.maxConnections) {
      this.pool.push(connection);
    } else {
      connection.close();
    }
  }

  async waitForConnection() {
    return new Promise(resolve => {
      const checkPool = () => {
        if (this.pool.length > 0) {
          resolve(this.pool.pop());
        } else {
          setTimeout(checkPool, 100);
        }
      };
      checkPool();
    });
  }
}
```

**3. Asynchronous Processing:**

```javascript
class AsyncProcessor {
  constructor(options = {}) {
    this.concurrency = options.concurrency || 5;
    this.queue = [];
    this.processing = new Set();
  }

  async addTask(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        task,
        resolve,
        reject,
      });
      this.processNext();
    });
  }

  async processNext() {
    if (this.processing.size >= this.concurrency || this.queue.length === 0) {
      return;
    }

    const { task, resolve, reject } = this.queue.shift();
    const taskId = Date.now() + Math.random();

    this.processing.add(taskId);

    try {
      const result = await task();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.processing.delete(taskId);
      this.processNext();
    }
  }
}

// Usage
const processor = new AsyncProcessor({ concurrency: 3 });

// Add tasks
processor.addTask(async () => {
  await processUserData();
  return 'User data processed';
});

processor.addTask(async () => {
  await sendEmail();
  return 'Email sent';
});
```

**4. Monitoring and Metrics:**

```javascript
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.startTime = Date.now();
  }

  startTimer(name) {
    this.metrics.set(name, { start: Date.now() });
  }

  endTimer(name) {
    const metric = this.metrics.get(name);
    if (metric) {
      metric.duration = Date.now() - metric.start;
      metric.end = Date.now();
    }
  }

  recordMetric(name, value) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name).push({
      value,
      timestamp: Date.now(),
    });
  }

  getMetrics() {
    const result = {};
    for (const [name, data] of this.metrics) {
      if (Array.isArray(data)) {
        result[name] = {
          count: data.length,
          average:
            data.reduce((sum, item) => sum + item.value, 0) / data.length,
          latest: data[data.length - 1]?.value,
        };
      } else {
        result[name] = data;
      }
    }
    return result;
  }

  // Middleware for Express
  middleware() {
    return (req, res, next) => {
      const start = Date.now();

      res.on('finish', () => {
        const duration = Date.now() - start;
        this.recordMetric('response_time', duration);
        this.recordMetric(
          `response_time_${req.method}_${req.route?.path || req.path}`,
          duration
        );
      });

      next();
    };
  }
}
```

---

## Question 11: Frontend System Design Process

**Question:** Walk me through your initial process for designing a complex frontend application like a ChatGPT interface.

**Answer:**
The first step is always to understand the problem by defining the functional requirements through user stories. For a chat interface, the core story is: a user types a query and receives a streamed answer. Next, I create a wireframe to visualize the UI components, which helps in extracting the necessary state variables and state transitions. This foundational work informs the API design and data structures before finally addressing non-functional requirements like performance, security, and accessibility.

**Step-by-Step Process:**

**1. Requirements Gathering:**

```javascript
// User Stories
const userStories = [
  'As a user, I want to type a message and send it',
  'As a user, I want to see the AI response stream in real-time',
  'As a user, I want to view my conversation history',
  'As a user, I want to start a new conversation',
];
```

**2. Wireframe Creation:**

```javascript
// Component Structure
const ChatInterface = {
  components: {
    ChatHeader: 'Title and new chat button',
    MessageList: 'Scrollable list of messages',
    InputArea: 'Text input and send button',
    StatusBar: 'Connection status and typing indicator',
  },
};
```

**3. State Modeling:**

```javascript
// State Structure
const chatState = {
  userQuery: '', // Current input
  conversation: [], // Message history
  isConnected: false, // SSE connection status
  isTyping: false, // AI typing indicator
};
```

**4. API Design:**

```javascript
// API Endpoints
const apiEndpoints = {
  sendMessage: 'POST /api/chat',
  streamResponse: 'GET /api/chat/stream/:conversationId',
  getHistory: 'GET /api/conversations/:id',
};
```

**5. Non-Functional Requirements:**

- **Performance**: Virtual scrolling for long conversations
- **Security**: XSS prevention for AI responses
- **Accessibility**: Screen reader support, keyboard navigation
- **Scalability**: Efficient state management, connection pooling

---

## Question 12: Wireframe Importance in System Design

**Question:** Why is creating a wireframe a crucial step in a frontend system design interview?

**Answer:**
A wireframe brings clarity to your intentions. It allows you to visually identify components, model the state distribution, and understand state transitions. It demonstrates seniority by showing you can translate user needs into a functional UI structure without a pre-existing design, a key skill for a senior developer.

**Benefits of Wireframing:**

**1. Component Identification:**

```javascript
// Wireframe helps identify these components
const components = {
  ChatContainer: 'Main wrapper',
  MessageList: 'Scrollable message container',
  MessageItem: 'Individual message component',
  InputForm: 'Message input and send button',
  TypingIndicator: 'Shows when AI is responding',
};
```

**2. State Distribution:**

```javascript
// Wireframe reveals state needs
const stateDistribution = {
  global: ['conversation', 'connectionStatus'],
  local: ['userQuery', 'isTyping', 'scrollPosition'],
};
```

**3. Data Flow Visualization:**

```javascript
// Wireframe shows data flow
const dataFlow = {
  userInput: 'InputForm → ChatContainer → API',
  aiResponse: 'API → ChatContainer → MessageList → MessageItem',
  history: 'API → ChatContainer → MessageList',
};
```

**4. User Experience Considerations:**

- **Visual Hierarchy**: What's most important?
- **Interaction Patterns**: How do users navigate?
- **Responsive Design**: How does it work on mobile?
- **Loading States**: What happens during API calls?

**Example Wireframe Structure:**

```
┌─────────────────────────────────────┐
│ Chat Header (New Chat, Settings)    │
├─────────────────────────────────────┤
│                                     │
│ Message List (Scrollable)           │
│ ┌─────────────────────────────────┐ │
│ │ User: Hello, how are you?       │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ AI: I'm doing well, thank you!  │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│ Input: [Type message...] [Send]     │
└─────────────────────────────────────┘
```

---

## Question 13: Chat Application State Modeling

**Question:** How would you model the state for the chat conversation?

**Answer:**
I would model it with two primary state variables:

**userQuery (string)**: A controlled input for the user's current message.

**conversation (Array of objects)**: An array containing the history of the chat. Each item in the array would be a "reply" object with properties like id (string), type (e.g., 'user' or 'chat'), timestamp, and content (string).

**Detailed State Structure:**

```javascript
// TypeScript interfaces
interface Message {
  id: string;
  conversationId: string;
  timestamp: Date;
  type: 'user' | 'assistant';
  content: string;
  status?: 'sending' | 'sent' | 'error';
}

interface ChatState {
  userQuery: string;
  conversation: Message[];
  isConnected: boolean;
  isTyping: boolean;
  currentConversationId: string | null;
}

// React state implementation
const [chatState, setChatState] = useState<ChatState>({
  userQuery: '',
  conversation: [],
  isConnected: false,
  isTyping: false,
  currentConversationId: null
});
```

**State Management Functions:**

```javascript
// Add user message
const addUserMessage = (content: string) => {
  const newMessage: Message = {
    id: generateId(),
    conversationId: chatState.currentConversationId,
    timestamp: new Date(),
    type: 'user',
    content,
    status: 'sending'
  };

  setChatState(prev => ({
    ...prev,
    conversation: [...prev.conversation, newMessage],
    userQuery: ''
  }));
};

// Add AI response chunk
const addAIResponseChunk = (chunk: string, messageId?: string) => {
  setChatState(prev => {
    const lastMessage = prev.conversation[prev.conversation.length - 1];

    if (lastMessage?.type === 'assistant' && lastMessage.status === 'streaming') {
      // Append to existing AI message
      return {
        ...prev,
        conversation: prev.conversation.map((msg, index) =>
          index === prev.conversation.length - 1
            ? { ...msg, content: msg.content + chunk }
            : msg
        )
      };
    } else {
      // Create new AI message
      const newMessage: Message = {
        id: messageId || generateId(),
        conversationId: prev.currentConversationId,
        timestamp: new Date(),
        type: 'assistant',
        content: chunk,
        status: 'streaming'
      };

      return {
        ...prev,
        conversation: [...prev.conversation, newMessage]
      };
    }
  });
};
```

---

## Question 14: State Transitions in Chat Application

**Question:** What are the primary state transitions in this chat application?

**Answer:**
State transitions come from two sources:

**User Interactions**: Typing in the input field (updates userQuery) and clicking the "send" button (clears userQuery and initiates an API call).

**Backend Synchronization**: Listening for new data chunks from the server via Server-Sent Events and appending them to the conversation array.

**State Transition Diagram:**

```javascript
// State transition mapping
const stateTransitions = {
  // User Interactions
  userTyping: {
    from: { userQuery: 'any string' },
    to: { userQuery: 'new string' },
    trigger: 'onChange event',
  },

  sendMessage: {
    from: { userQuery: 'non-empty string', conversation: 'any' },
    to: { userQuery: '', conversation: 'adds user message' },
    trigger: 'onSubmit event',
    sideEffect: 'API call to /api/chat',
  },

  // Backend Synchronization
  receiveChunk: {
    from: { conversation: 'any', isTyping: 'any' },
    to: { conversation: 'appends chunk', isTyping: true },
    trigger: 'SSE message event',
  },

  streamComplete: {
    from: { isTyping: true },
    to: { isTyping: false },
    trigger: 'SSE close event',
  },

  connectionLost: {
    from: { isConnected: true },
    to: { isConnected: false },
    trigger: 'SSE error event',
  },

  connectionRestored: {
    from: { isConnected: false },
    to: { isConnected: true },
    trigger: 'SSE open event',
  },
};
```

**Implementation with React:**

```javascript
// User interaction handlers
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setChatState(prev => ({
    ...prev,
    userQuery: e.target.value
  }));
};

const handleSendMessage = async () => {
  if (!chatState.userQuery.trim()) return;

  // Add user message to conversation
  const userMessage: Message = {
    id: generateId(),
    conversationId: chatState.currentConversationId,
    timestamp: new Date(),
    type: 'user',
    content: chatState.userQuery,
    status: 'sending'
  };

  setChatState(prev => ({
    ...prev,
    userQuery: '',
    conversation: [...prev.conversation, userMessage]
  }));

  // Initiate API call
  await sendMessageToAPI(userMessage);
};

// Backend synchronization
useEffect(() => {
  const eventSource = new EventSource('/api/chat/stream');

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === 'chunk') {
      setChatState(prev => ({
        ...prev,
        isTyping: true,
        conversation: appendChunkToLastMessage(prev.conversation, data.content)
      }));
    } else if (data.type === 'complete') {
      setChatState(prev => ({
        ...prev,
        isTyping: false
      }));
    }
  };

  eventSource.onopen = () => {
    setChatState(prev => ({ ...prev, isConnected: true }));
  };

  eventSource.onerror = () => {
    setChatState(prev => ({ ...prev, isConnected: false }));
  };

  return () => {
    eventSource.close();
  };
}, []);
```

---

## Question 11: Backend Service Scalability Design

**Question:** How do you design a backend service for scalability?

**Answer:**
Designing a scalable backend service requires considering multiple architectural patterns and principles:

**1. Statelessness:**
Design services to be stateless (using JWTs for auth instead of server-side sessions) so any instance can handle any request.

```javascript
// Stateless service design
class UserService {
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
  }

  // No server-side session storage
  async authenticateUser(token) {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      return { userId: decoded.userId, role: decoded.role };
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  // Any instance can handle any request
  async getUserData(userId) {
    // Stateless operation - no local state dependencies
    return await this.database.getUser(userId);
  }
}
```

**2. Horizontal Scaling:**
Use a load balancer to distribute traffic across multiple identical instances of your service.

```javascript
// Load balancer configuration
const loadBalancerConfig = {
  algorithm: 'round-robin',
  healthCheck: {
    path: '/health',
    interval: 30000,
    timeout: 5000,
  },
  instances: [
    { host: 'service-1.example.com', port: 3000 },
    { host: 'service-2.example.com', port: 3000 },
    { host: 'service-3.example.com', port: 3000 },
  ],
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
```

**3. Database Scaling:**
Consider database read replicas, sharding, or moving appropriate data to a more scalable NoSQL solution.

```javascript
// Database scaling strategy
class DatabaseManager {
  constructor() {
    this.masterDB = new Connection(process.env.MASTER_DB_URL);
    this.readReplicas = [
      new Connection(process.env.REPLICA_1_URL),
      new Connection(process.env.REPLICA_2_URL),
      new Connection(process.env.REPLICA_3_URL),
    ];
  }

  // Write operations go to master
  async write(query, params) {
    return await this.masterDB.query(query, params);
  }

  // Read operations can use replicas
  async read(query, params) {
    const replica = this.getRandomReplica();
    return await replica.query(query, params);
  }

  getRandomReplica() {
    const index = Math.floor(Math.random() * this.readReplicas.length);
    return this.readReplicas[index];
  }
}
```

**4. Caching:**
Implement caching layers (e.g., Redis) to reduce load on the database and application servers.

```javascript
// Redis caching implementation
class CacheService {
  constructor() {
    this.redis = new Redis(process.env.REDIS_URL);
  }

  async get(key) {
    try {
      const cached = await this.redis.get(key);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key, value, ttl = 3600) {
    try {
      await this.redis.setex(key, ttl, JSON.stringify(value));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async invalidate(pattern) {
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error) {
      console.error('Cache invalidation error:', error);
    }
  }
}

// Usage in service
class ProductService {
  constructor() {
    this.cache = new CacheService();
    this.db = new DatabaseManager();
  }

  async getProduct(productId) {
    const cacheKey = `product:${productId}`;

    // Try cache first
    let product = await this.cache.get(cacheKey);

    if (!product) {
      // Cache miss - fetch from database
      product = await this.db.read('SELECT * FROM products WHERE id = ?', [
        productId,
      ]);

      // Cache for future requests
      if (product) {
        await this.cache.set(cacheKey, product, 1800); // 30 minutes
      }
    }

    return product;
  }
}
```

**Key Scalability Principles:**

- **Stateless Design**: No server-side session storage
- **Horizontal Scaling**: Multiple identical instances behind load balancer
- **Database Optimization**: Read replicas, connection pooling, query optimization
- **Caching Strategy**: Redis for frequently accessed data
- **Microservices**: Break monolith into focused services
- **Message Queues**: Decouple services with async communication
- **CDN**: Serve static assets from edge locations
- **Monitoring**: Track performance metrics and bottlenecks
