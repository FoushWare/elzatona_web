# API Design - Questions Bank

## Question 1: RESTful API Design

**Question:** Explain RESTful API design principles and best practices.

**Answer:**
**1. REST Principles:**

```javascript
// Resource-based URLs
GET    /api/users           // Get all users
GET    /api/users/123       // Get user by ID
POST   /api/users           // Create new user
PUT    /api/users/123       // Update entire user
PATCH  /api/users/123       // Partial update
DELETE /api/users/123       // Delete user

// Nested resources
GET    /api/users/123/orders        // Get user's orders
POST   /api/users/123/orders        // Create order for user
GET    /api/users/123/orders/456    // Get specific order

// Query parameters for filtering
GET    /api/users?page=1&limit=10&sort=name&order=asc
GET    /api/users?status=active&role=admin
GET    /api/users?search=john&fields=name,email
```

**2. HTTP Status Codes:**

```javascript
// Success responses
200 OK          // Successful GET, PUT, PATCH
201 Created     // Successful POST
204 No Content  // Successful DELETE

// Client errors
400 Bad Request     // Invalid request data
401 Unauthorized    // Authentication required
403 Forbidden       // Access denied
404 Not Found       // Resource not found
409 Conflict        // Resource conflict
422 Unprocessable Entity // Validation errors

// Server errors
500 Internal Server Error // Server error
502 Bad Gateway          // Upstream server error
503 Service Unavailable  // Service temporarily unavailable

// Example implementation
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

**3. Request/Response Format:**

```javascript
// Request format
{
  "data": {
    "type": "users",
    "attributes": {
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30
    }
  }
}

// Response format
{
  "data": {
    "id": "123",
    "type": "users",
    "attributes": {
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    },
    "links": {
      "self": "/api/users/123"
    }
  }
}

// Error response format
{
  "errors": [
    {
      "id": "validation-error",
      "status": "422",
      "code": "validation_failed",
      "title": "Validation Error",
      "detail": "Email is required",
      "source": {
        "pointer": "/data/attributes/email"
      }
    }
  ]
}
```

---

## Question 2: API Versioning

**Question:** Explain different API versioning strategies and their trade-offs.

**Answer:**
**1. URL Versioning:**

```javascript
// URL path versioning
app.use('/api/v1/users', v1UserRoutes);
app.use('/api/v2/users', v2UserRoutes);

// Example routes
GET / api / v1 / users / 123;
GET / api / v2 / users / 123;

// Pros: Clear, explicit, easy to understand
// Cons: URL pollution, harder to maintain
```

**2. Header Versioning:**

```javascript
// Accept header versioning
app.use('/api/users', (req, res, next) => {
  const acceptHeader = req.get('Accept');
  if (acceptHeader.includes('application/vnd.api.v2+json')) {
    req.apiVersion = 'v2';
  } else if (acceptHeader.includes('application/vnd.api.v1+json')) {
    req.apiVersion = 'v1';
  } else {
    req.apiVersion = 'v1'; // default
  }
  next();
});

// Example requests
GET / api / users / 123;
Accept: application / vnd.api.v2 + json;

// Pros: Clean URLs, flexible
// Cons: Less discoverable, requires client changes
```

**3. Query Parameter Versioning:**

```javascript
// Query parameter versioning
app.use('/api/users', (req, res, next) => {
  req.apiVersion = req.query.version || 'v1';
  next();
});

// Example requests
GET /api/users/123?version=v2
GET /api/users/123?v=2

// Pros: Simple, backward compatible
// Cons: URL pollution, caching issues
```

**4. Versioning Implementation:**

```javascript
class APIVersionManager {
  constructor() {
    this.versions = new Map();
  }

  registerVersion(version, routes) {
    this.versions.set(version, routes);
  }

  getVersion(version) {
    return this.versions.get(version);
  }

  getLatestVersion() {
    const versions = Array.from(this.versions.keys()).sort();
    return versions[versions.length - 1];
  }

  // Version compatibility check
  isCompatible(clientVersion, serverVersion) {
    const client = this.parseVersion(clientVersion);
    const server = this.parseVersion(serverVersion);

    // Major version must match
    return client.major === server.major;
  }

  parseVersion(version) {
    const [major, minor, patch] = version
      .replace('v', '')
      .split('.')
      .map(Number);
    return { major, minor, patch };
  }
}

// Usage
const versionManager = new APIVersionManager();
versionManager.registerVersion('v1', v1Routes);
versionManager.registerVersion('v2', v2Routes);
```

---

## Question 3: API Authentication and Authorization

**Question:** Explain different API authentication and authorization methods.

**Answer:**
**1. JWT Authentication:**

```javascript
const jwt = require('jsonwebtoken');

class JWTAuth {
  constructor(secret) {
    this.secret = secret;
  }

  generateToken(payload, options = {}) {
    return jwt.sign(payload, this.secret, {
      expiresIn: options.expiresIn || '1h',
      issuer: options.issuer || 'your-app',
      audience: options.audience || 'your-app-users',
    });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  // Middleware
  authenticate() {
    return (req, res, next) => {
      const authHeader = req.get('Authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
      }

      const token = authHeader.substring(7);
      try {
        const decoded = this.verifyToken(token);
        req.user = decoded;
        next();
      } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
      }
    };
  }
}

// Usage
const auth = new JWTAuth(process.env.JWT_SECRET);
app.use('/api/protected', auth.authenticate());
```

**2. API Key Authentication:**

```javascript
class APIKeyAuth {
  constructor() {
    this.apiKeys = new Map();
  }

  generateAPIKey(userId, permissions = []) {
    const key = crypto.randomBytes(32).toString('hex');
    this.apiKeys.set(key, {
      userId,
      permissions,
      createdAt: Date.now(),
      lastUsed: null,
    });
    return key;
  }

  validateAPIKey(key) {
    const keyData = this.apiKeys.get(key);
    if (!keyData) {
      return null;
    }

    // Update last used
    keyData.lastUsed = Date.now();
    return keyData;
  }

  // Middleware
  authenticate() {
    return (req, res, next) => {
      const apiKey = req.get('X-API-Key');
      if (!apiKey) {
        return res.status(401).json({ error: 'API key required' });
      }

      const keyData = this.validateAPIKey(apiKey);
      if (!keyData) {
        return res.status(401).json({ error: 'Invalid API key' });
      }

      req.user = { id: keyData.userId };
      req.permissions = keyData.permissions;
      next();
    };
  }
}
```

**3. OAuth 2.0:**

```javascript
class OAuth2Provider {
  constructor() {
    this.clients = new Map();
    this.authorizationCodes = new Map();
    this.accessTokens = new Map();
  }

  registerClient(clientId, clientSecret, redirectUri) {
    this.clients.set(clientId, {
      clientSecret,
      redirectUri,
      createdAt: Date.now(),
    });
  }

  // Authorization Code Flow
  generateAuthorizationCode(clientId, userId, scope) {
    const code = crypto.randomBytes(32).toString('hex');
    this.authorizationCodes.set(code, {
      clientId,
      userId,
      scope,
      expiresAt: Date.now() + 600000, // 10 minutes
    });
    return code;
  }

  exchangeCodeForToken(code, clientId, clientSecret) {
    const codeData = this.authorizationCodes.get(code);
    if (!codeData || codeData.clientId !== clientId) {
      throw new Error('Invalid authorization code');
    }

    if (Date.now() > codeData.expiresAt) {
      throw new Error('Authorization code expired');
    }

    const client = this.clients.get(clientId);
    if (!client || client.clientSecret !== clientSecret) {
      throw new Error('Invalid client credentials');
    }

    // Generate access token
    const accessToken = crypto.randomBytes(32).toString('hex');
    this.accessTokens.set(accessToken, {
      userId: codeData.userId,
      scope: codeData.scope,
      expiresAt: Date.now() + 3600000, // 1 hour
    });

    // Clean up authorization code
    this.authorizationCodes.delete(code);

    return {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 3600,
      scope: codeData.scope,
    };
  }

  validateAccessToken(token) {
    const tokenData = this.accessTokens.get(token);
    if (!tokenData || Date.now() > tokenData.expiresAt) {
      return null;
    }
    return tokenData;
  }
}
```

**4. Role-Based Access Control:**

```javascript
class RBAC {
  constructor() {
    this.roles = new Map();
    this.permissions = new Map();
  }

  defineRole(roleName, permissions) {
    this.roles.set(roleName, permissions);
  }

  definePermission(permission, resource, action) {
    this.permissions.set(permission, { resource, action });
  }

  hasPermission(userRole, permission) {
    const rolePermissions = this.roles.get(userRole);
    return rolePermissions && rolePermissions.includes(permission);
  }

  // Middleware
  requirePermission(permission) {
    return (req, res, next) => {
      const userRole = req.user.role;
      if (!this.hasPermission(userRole, permission)) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }
      next();
    };
  }

  // Resource-based authorization
  requireOwnership(resourceIdParam = 'id') {
    return (req, res, next) => {
      const resourceId = req.params[resourceIdParam];
      const userId = req.user.id;

      // Check if user owns the resource
      if (resourceId !== userId) {
        return res.status(403).json({ error: 'Access denied' });
      }
      next();
    };
  }
}

// Usage
const rbac = new RBAC();
rbac.defineRole('admin', ['read', 'write', 'delete']);
rbac.defineRole('user', ['read', 'write']);
rbac.defineRole('guest', ['read']);

app.get(
  '/api/users/:id',
  auth.authenticate(),
  rbac.requirePermission('read'),
  getUser
);
```

---

## Question 4: API Rate Limiting

**Question:** Explain API rate limiting strategies and implementation.

**Answer:**
**1. Token Bucket Algorithm:**

```javascript
class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  refill() {
    const now = Date.now();
    const timePassed = now - this.lastRefill;
    const tokensToAdd = (timePassed / 1000) * this.refillRate;

    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }

  consume(tokens = 1) {
    this.refill();

    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }

    return false;
  }

  getTokensRemaining() {
    this.refill();
    return this.tokens;
  }
}

class RateLimiter {
  constructor() {
    this.buckets = new Map();
  }

  getBucket(key, capacity, refillRate) {
    if (!this.buckets.has(key)) {
      this.buckets.set(key, new TokenBucket(capacity, refillRate));
    }
    return this.buckets.get(key);
  }

  isAllowed(key, capacity, refillRate, tokens = 1) {
    const bucket = this.getBucket(key, capacity, refillRate);
    return bucket.consume(tokens);
  }
}
```

**2. Sliding Window Rate Limiting:**

```javascript
class SlidingWindowRateLimiter {
  constructor() {
    this.windows = new Map();
  }

  isAllowed(key, limit, windowSize) {
    const now = Date.now();
    const windowStart = now - windowSize;

    if (!this.windows.has(key)) {
      this.windows.set(key, []);
    }

    const requests = this.windows.get(key);

    // Remove old requests
    const validRequests = requests.filter(timestamp => timestamp > windowStart);

    if (validRequests.length >= limit) {
      return false;
    }

    // Add current request
    validRequests.push(now);
    this.windows.set(key, validRequests);

    return true;
  }

  getRemainingRequests(key, limit, windowSize) {
    const now = Date.now();
    const windowStart = now - windowSize;

    if (!this.windows.has(key)) {
      return limit;
    }

    const requests = this.windows.get(key);
    const validRequests = requests.filter(timestamp => timestamp > windowStart);

    return Math.max(0, limit - validRequests.length);
  }
}
```

**3. Rate Limiting Middleware:**

```javascript
class RateLimitMiddleware {
  constructor() {
    this.limiters = new Map();
  }

  // Global rate limiting
  global(limit, windowSize) {
    return (req, res, next) => {
      const key = 'global';
      const limiter = this.getLimiter(key, limit, windowSize);

      if (!limiter.isAllowed(key, limit, windowSize)) {
        return res.status(429).json({
          error: 'Rate limit exceeded',
          retryAfter: windowSize / 1000,
        });
      }

      next();
    };
  }

  // Per-IP rate limiting
  perIP(limit, windowSize) {
    return (req, res, next) => {
      const key = `ip:${req.ip}`;
      const limiter = this.getLimiter(key, limit, windowSize);

      if (!limiter.isAllowed(key, limit, windowSize)) {
        return res.status(429).json({
          error: 'Rate limit exceeded',
          retryAfter: windowSize / 1000,
        });
      }

      next();
    };
  }

  // Per-user rate limiting
  perUser(limit, windowSize) {
    return (req, res, next) => {
      if (!req.user) {
        return next();
      }

      const key = `user:${req.user.id}`;
      const limiter = this.getLimiter(key, limit, windowSize);

      if (!limiter.isAllowed(key, limit, windowSize)) {
        return res.status(429).json({
          error: 'Rate limit exceeded',
          retryAfter: windowSize / 1000,
        });
      }

      next();
    };
  }

  getLimiter(key, limit, windowSize) {
    if (!this.limiters.has(key)) {
      this.limiters.set(key, new SlidingWindowRateLimiter());
    }
    return this.limiters.get(key);
  }
}

// Usage
const rateLimit = new RateLimitMiddleware();

// Global rate limiting: 100 requests per minute
app.use(rateLimit.global(100, 60000));

// Per-IP rate limiting: 10 requests per minute
app.use('/api/auth', rateLimit.perIP(10, 60000));

// Per-user rate limiting: 1000 requests per hour
app.use('/api/users', rateLimit.perUser(1000, 3600000));
```

---

## Question 5: API Documentation

**Question:** Explain API documentation best practices and tools.

**Answer:**
**1. OpenAPI/Swagger Specification:**

```yaml
# openapi.yaml
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
  description: API for managing users
servers:
  - url: https://api.example.com/v1
    description: Production server
  - url: https://staging-api.example.com/v1
    description: Staging server

paths:
  /users:
    get:
      summary: Get all users
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 10
      responses:
        '200':
          description: List of users
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/User'
                  meta:
                    $ref: '#/components/schemas/PaginationMeta'
    post:
      summary: Create a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserRequest'
      responses:
        '201':
          description: User created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          description: Bad request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /users/{id}:
    get:
      summary: Get user by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: User found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          description: User not found

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        email:
          type: string
          format: email
        created_at:
          type: string
          format: date-time
    CreateUserRequest:
      type: object
      required:
        - name
        - email
      properties:
        name:
          type: string
        email:
          type: string
          format: email
    Error:
      type: object
      properties:
        error:
          type: string
        message:
          type: string
    PaginationMeta:
      type: object
      properties:
        page:
          type: integer
        limit:
          type: integer
        total:
          type: integer
        pages:
          type: integer

  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
```

**2. API Documentation Generation:**

```javascript
// Using swagger-jsdoc
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API for managing users',
    },
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const specs = swaggerJSDoc(options);

// Using swagger-ui-express
const swaggerUi = require('swagger-ui-express');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// JSDoc comments for API documentation
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
app.get('/users', async (req, res) => {
  // Implementation
});
```

**3. API Testing Documentation:**

```javascript
// Using supertest for API testing
const request = require('supertest');
const app = require('../app');

describe('User API', () => {
  describe('GET /api/users', () => {
    it('should return list of users', async () => {
      const response = await request(app).get('/api/users').expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should support pagination', async () => {
      const response = await request(app)
        .get('/api/users?page=1&limit=5')
        .expect(200);

      expect(response.body.data.length).toBeLessThanOrEqual(5);
      expect(response.body).toHaveProperty('meta');
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });
});
```

---

## Question 6: API Error Handling

**Question:** Explain API error handling strategies and best practices.

**Answer:**
**1. Error Response Format:**

```javascript
class APIError extends Error {
  constructor(message, statusCode, code, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }

  toJSON() {
    return {
      error: {
        message: this.message,
        code: this.code,
        status: this.statusCode,
        timestamp: this.timestamp,
        details: this.details,
      },
    };
  }
}

// Specific error types
class ValidationError extends APIError {
  constructor(message, details) {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

class NotFoundError extends APIError {
  constructor(resource, id) {
    super(`${resource} with id ${id} not found`, 404, 'NOT_FOUND');
  }
}

class UnauthorizedError extends APIError {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

class ForbiddenError extends APIError {
  constructor(message = 'Forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}
```

**2. Error Handling Middleware:**

```javascript
class ErrorHandler {
  static handle(err, req, res, next) {
    // Log error
    console.error('API Error:', {
      message: err.message,
      stack: err.stack,
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });

    // Handle different error types
    if (err instanceof APIError) {
      return res.status(err.statusCode).json(err.toJSON());
    }

    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: {
          message: 'Validation failed',
          code: 'VALIDATION_ERROR',
          status: 400,
          details: err.details,
        },
      });
    }

    if (err.name === 'CastError') {
      return res.status(400).json({
        error: {
          message: 'Invalid ID format',
          code: 'INVALID_ID',
          status: 400,
        },
      });
    }

    if (err.name === 'MongoError' && err.code === 11000) {
      return res.status(409).json({
        error: {
          message: 'Duplicate entry',
          code: 'DUPLICATE_ENTRY',
          status: 409,
        },
      });
    }

    // Default error
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_ERROR',
        status: 500,
      },
    });
  }

  static notFound(req, res, next) {
    const error = new APIError(
      `Route ${req.originalUrl} not found`,
      404,
      'ROUTE_NOT_FOUND'
    );
    next(error);
  }

  static asyncHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}

// Usage
app.use(ErrorHandler.notFound);
app.use(ErrorHandler.handle);
```

**3. Validation Error Handling:**

```javascript
const Joi = require('joi');

class ValidationMiddleware {
  static validate(schema) {
    return (req, res, next) => {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const details = error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message,
          value: detail.context.value,
        }));

        const validationError = new ValidationError(
          'Validation failed',
          details
        );
        return next(validationError);
      }

      req.validatedData = value;
      next();
    };
  }
}

// Usage
const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(0).max(120).optional(),
});

app.post(
  '/api/users',
  ValidationMiddleware.validate(userSchema),
  async (req, res, next) => {
    try {
      const user = await User.create(req.validatedData);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);
```

**4. Error Monitoring:**

```javascript
class ErrorMonitor {
  constructor() {
    this.errors = [];
    this.maxErrors = 1000;
  }

  logError(error, context = {}) {
    const errorLog = {
      id: crypto.randomUUID(),
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      context,
    };

    this.errors.push(errorLog);

    // Keep only recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Send to external monitoring service
    this.sendToMonitoringService(errorLog);
  }

  async sendToMonitoringService(errorLog) {
    try {
      await fetch('https://monitoring-service.com/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.MONITORING_API_KEY}`,
        },
        body: JSON.stringify(errorLog),
      });
    } catch (error) {
      console.error('Failed to send error to monitoring service:', error);
    }
  }

  getErrors(limit = 100) {
    return this.errors.slice(-limit);
  }

  getErrorStats() {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    const oneDay = 24 * oneHour;

    const lastHour = this.errors.filter(
      e => new Date(e.timestamp).getTime() > now - oneHour
    );

    const lastDay = this.errors.filter(
      e => new Date(e.timestamp).getTime() > now - oneDay
    );

    return {
      total: this.errors.length,
      lastHour: lastHour.length,
      lastDay: lastDay.length,
      byType: this.getErrorsByType(),
    };
  }

  getErrorsByType() {
    const types = {};
    this.errors.forEach(error => {
      const type = error.message.split(':')[0];
      types[type] = (types[type] || 0) + 1;
    });
    return types;
  }
}

// Usage
const errorMonitor = new ErrorMonitor();

app.use((err, req, res, next) => {
  errorMonitor.logError(err, {
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  next(err);
});
```
