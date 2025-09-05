# Web Security - Questions Bank

## Question 1: Cross-Site Scripting (XSS)

**Question:** What is XSS and how do you prevent it?

**Answer:**
XSS (Cross-Site Scripting) occurs when malicious scripts are injected into web pages and executed in users' browsers.

**Types of XSS:**

**1. Stored XSS (Persistent):**

```javascript
// Vulnerable code
app.post('/comment', (req, res) => {
  const comment = req.body.comment; // User input
  // Directly storing without sanitization
  db.comments.insert({ text: comment });
  res.redirect('/comments');
});

// Safe code
const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

app.post('/comment', (req, res) => {
  const comment = req.body.comment;
  // Sanitize HTML
  const cleanComment = DOMPurify.sanitize(comment);
  db.comments.insert({ text: cleanComment });
  res.redirect('/comments');
});
```

**2. Reflected XSS (Non-Persistent):**

```javascript
// Vulnerable code
app.get('/search', (req, res) => {
  const query = req.query.q;
  res.send(`<h1>Search results for: ${query}</h1>`);
});

// Safe code
app.get('/search', (req, res) => {
  const query = req.query.q;
  // Escape HTML characters
  const escapedQuery = query.replace(/[&<>"']/g, match => {
    const escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
    };
    return escapeMap[match];
  });
  res.send(`<h1>Search results for: ${escapedQuery}</h1>`);
});
```

**3. DOM-based XSS:**

```javascript
// Vulnerable code
function displayUser() {
  const username = new URLSearchParams(window.location.search).get('user');
  document.getElementById('welcome').innerHTML = `Welcome ${username}!`;
}

// Safe code
function displayUser() {
  const username = new URLSearchParams(window.location.search).get('user');
  // Use textContent instead of innerHTML
  document.getElementById('welcome').textContent = `Welcome ${username}!`;

  // Or sanitize if HTML is needed
  const sanitizedUsername = DOMPurify.sanitize(username);
  document.getElementById('welcome').innerHTML =
    `Welcome ${sanitizedUsername}!`;
}
```

**Prevention Strategies:**

```javascript
// Content Security Policy (CSP)
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:;"
  );
  next();
});

// Input validation
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(0).max(120),
});

app.post('/user', (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // Process validated data
});
```

---

## Question 2: Cross-Site Request Forgery (CSRF)

**Question:** What is CSRF and how do you prevent it?

**Answer:**
CSRF attacks trick users into performing unwanted actions on websites where they're authenticated.

**CSRF Protection:**

**1. CSRF Tokens:**

```javascript
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(csrf({ cookie: true }));

// Generate CSRF token
app.get('/form', (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

// Verify CSRF token
app.post('/submit', (req, res) => {
  // CSRF token is automatically verified
  res.send('Form submitted successfully');
});
```

**2. SameSite Cookies:**

```javascript
app.use(
  session({
    secret: 'your-secret-key',
    cookie: {
      secure: true, // HTTPS only
      httpOnly: true, // Not accessible via JavaScript
      sameSite: 'strict', // CSRF protection
    },
  })
);
```

**3. Double Submit Cookie:**

```javascript
// Generate random token
function generateCSRFToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Set token in cookie and form
app.get('/form', (req, res) => {
  const token = generateCSRFToken();
  res.cookie('csrf-token', token, {
    httpOnly: false, // Allow JavaScript access
    sameSite: 'strict',
  });
  res.render('form', { csrfToken: token });
});

// Verify token matches cookie
app.post('/submit', (req, res) => {
  const tokenFromForm = req.body.csrfToken;
  const tokenFromCookie = req.cookies['csrf-token'];

  if (tokenFromForm !== tokenFromCookie) {
    return res.status(403).json({ error: 'CSRF token mismatch' });
  }

  res.send('Form submitted successfully');
});
```

**4. Custom Headers:**

```javascript
// Require custom header for API requests
app.use('/api', (req, res, next) => {
  if (
    req.method === 'POST' ||
    req.method === 'PUT' ||
    req.method === 'DELETE'
  ) {
    const customHeader = req.get('X-Requested-With');
    if (customHeader !== 'XMLHttpRequest') {
      return res.status(403).json({ error: 'Missing required header' });
    }
  }
  next();
});
```

---

## Question 3: SQL Injection

**Question:** What is SQL injection and how do you prevent it?

**Answer:**
SQL injection occurs when malicious SQL code is inserted into application queries.

**Vulnerable Code:**

```javascript
// Vulnerable - direct string concatenation
app.get('/user', (req, res) => {
  const userId = req.query.id;
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  db.query(query, (err, result) => {
    res.json(result);
  });
});

// Vulnerable - string formatting
app.get('/search', (req, res) => {
  const searchTerm = req.query.q;
  const query = `SELECT * FROM products WHERE name LIKE '%${searchTerm}%'`;
  db.query(query, (err, result) => {
    res.json(result);
  });
});
```

**Prevention Methods:**

**1. Parameterized Queries:**

```javascript
// Safe - parameterized queries
app.get('/user', (req, res) => {
  const userId = req.query.id;
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [userId], (err, result) => {
    res.json(result);
  });
});

// Safe - named parameters
app.get('/search', (req, res) => {
  const searchTerm = req.query.q;
  const query = 'SELECT * FROM products WHERE name LIKE ?';
  db.query(query, [`%${searchTerm}%`], (err, result) => {
    res.json(result);
  });
});
```

**2. ORM/Query Builder:**

```javascript
// Using Sequelize ORM
const User = require('./models/User');

app.get('/user', async (req, res) => {
  try {
    const userId = req.query.id;
    const user = await User.findByPk(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Using Knex query builder
const knex = require('knex')(config);

app.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const products = await knex('products')
      .where('name', 'like', `%${searchTerm}%`)
      .select('*');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});
```

**3. Input Validation:**

```javascript
const Joi = require('joi');

const userSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

app.get('/user', (req, res) => {
  const { error, value } = userSchema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [value.id], (err, result) => {
    res.json(result);
  });
});
```

---

## Question 4: Authentication and Session Security

**Question:** How do you implement secure authentication and session management?

**Answer:**
**Secure Password Handling:**

```javascript
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Password hashing
async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

// Password verification
async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

// Registration
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate password strength
    if (!isStrongPassword(password)) {
      return res.status(400).json({ error: 'Password too weak' });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

function isStrongPassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  );
}
```

**Secure Session Management:**

```javascript
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

app.use(
  session({
    store: new RedisStore({
      host: 'localhost',
      port: 6379,
      ttl: 86400, // 24 hours
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      httpOnly: true, // Prevent XSS
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'strict', // CSRF protection
    },
    name: 'sessionId', // Don't use default 'connect.sid'
  })
);
```

**JWT Implementation:**

```javascript
const jwt = require('jsonwebtoken');

// Generate JWT
function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '15m', // Short expiration
    issuer: 'your-app',
    audience: 'your-app-users',
  });
}

// Generate refresh token
function generateRefreshToken(user) {
  const payload = { userId: user.id };
  return jwt.sign(payload, process.env.REFRESH_SECRET, {
    expiresIn: '7d',
    issuer: 'your-app',
  });
}

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await verifyPassword(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token securely
    await RefreshToken.create({
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.json({
      accessToken,
      refreshToken,
      expiresIn: 900, // 15 minutes
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});
```

**Rate Limiting:**

```javascript
const rateLimit = require('express-rate-limit');

// Login rate limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

app.use('/login', loginLimiter);

// General API rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests from this IP',
});

app.use('/api', apiLimiter);
```

---

## Question 5: HTTPS and Transport Security

**Question:** How do you implement HTTPS and secure transport?

**Answer:**
**HTTPS Configuration:**

```javascript
const https = require('https');
const fs = require('fs');

// Load SSL certificates
const options = {
  key: fs.readFileSync('path/to/private-key.pem'),
  cert: fs.readFileSync('path/to/certificate.pem'),
  ca: fs.readFileSync('path/to/ca-bundle.pem'),
};

// Create HTTPS server
const server = https.createServer(options, app);

// Security headers middleware
app.use((req, res, next) => {
  // Force HTTPS
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});

// Security headers
app.use((req, res, next) => {
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});
```

**CORS Configuration:**

```javascript
const cors = require('cors');

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'https://yourdomain.com',
      'https://www.yourdomain.com',
      'https://app.yourdomain.com',
    ];

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));
```

**Content Security Policy:**

```javascript
app.use((req, res, next) => {
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://trusted-cdn.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://api.yourdomain.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');

  res.setHeader('Content-Security-Policy', csp);
  next();
});
```

---

## Question 6: Input Validation and Sanitization

**Question:** How do you validate and sanitize user input?

**Answer:**
**Input Validation with Joi:**

```javascript
const Joi = require('joi');

// User registration schema
const userRegistrationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.alphanum': 'Username must contain only alphanumeric characters',
    'string.min': 'Username must be at least 3 characters long',
    'string.max': 'Username cannot exceed 30 characters',
  }),

  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
  }),

  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]'
      )
    )
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base':
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
    }),

  age: Joi.number().integer().min(13).max(120).optional(),
});

// Validation middleware
function validateUserRegistration(req, res, next) {
  const { error, value } = userRegistrationSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({
      error: 'Validation failed',
      details: errorMessages,
    });
  }

  req.validatedData = value;
  next();
}

app.post('/register', validateUserRegistration, (req, res) => {
  // Use req.validatedData instead of req.body
  const { username, email, password, age } = req.validatedData;
  // Process registration...
});
```

**HTML Sanitization:**

```javascript
const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

// Create DOMPurify instance
const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Sanitize HTML content
function sanitizeHTML(input) {
  return purify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
    ALLOWED_ATTR: [],
  });
}

// Rich text input sanitization
app.post('/comment', (req, res) => {
  const { content } = req.body;

  // Sanitize HTML content
  const sanitizedContent = sanitizeHTML(content);

  // Additional validation
  if (sanitizedContent.length > 1000) {
    return res.status(400).json({ error: 'Comment too long' });
  }

  // Store sanitized content
  Comment.create({ content: sanitizedContent });
  res.json({ message: 'Comment posted successfully' });
});
```

**File Upload Security:**

```javascript
const multer = require('multer');
const path = require('path');

// Configure multer for secure file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  // Define allowed file types
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter,
});

// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Additional security checks
  const filePath = req.file.path;
  const fileExtension = path.extname(req.file.originalname).toLowerCase();

  // Scan file for malware (implement with antivirus service)
  // scanFile(filePath);

  res.json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    size: req.file.size,
  });
});
```

---

## Question 11: Frontend Security Measures

**Question:** From a frontend perspective, what security measures are essential when communicating with a microservices backend?

**Answer:**
While the backend handles most security, the frontend must correctly implement:

**1. HTTPS:**
Always ensure all API calls are made to https:// endpoints to encrypt data in transit and prevent man-in-the-middle attacks.

**2. Authentication Token Management:**
The frontend is responsible for securely obtaining (e.g., via a login flow), storing (preferably in memory or secure HTTP-only cookies, not local storage for critical tokens), and attaching authentication tokens (like JWTs) to every outgoing request to the API Gateway.

**3. CORS Compliance:**
Understand that browsers block requests to different domains unless the server (the API Gateway) sends the correct CORS headers. The frontend must handle potential CORS errors gracefully.

**4. Input Sanitization:**
Although the backend must validate all data, frontend sanitization provides the first line of defense and better user experience.

**Example Implementation:**

```javascript
// Secure API client
class SecureAPIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.token = null;
  }

  // Store token securely (in memory, not localStorage)
  setToken(token) {
    this.token = token;
  }

  // Make secure API calls
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    // Add authentication token
    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);

      // Handle CORS errors
      if (!response.ok && response.status === 0) {
        throw new Error('CORS error - check server configuration');
      }

      return response;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Sanitize user input
  sanitizeInput(input) {
    if (typeof input !== 'string') return input;

    // Basic HTML sanitization
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }
}

// Usage
const apiClient = new SecureAPIClient('https://api.example.com');
apiClient.setToken('your-jwt-token');

// Sanitize before sending
const userInput = apiClient.sanitizeInput(userFormData.comment);
await apiClient.request('/comments', {
  method: 'POST',
  body: JSON.stringify({ comment: userInput }),
});
```

**Key Frontend Security Responsibilities:**

- Always use HTTPS for API calls
- Handle authentication tokens securely
- Implement proper error handling for CORS issues
- Sanitize user input before display
- Never store sensitive data in localStorage
- Implement proper session management
- Use Content Security Policy (CSP) headers
- Validate file uploads on the frontend (in addition to backend validation)
