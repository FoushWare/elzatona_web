"use client";

import { useState } from "react";
import Link from "next/link";

interface AuthStrategy {
  id: string;
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  useCases: string[];
  implementation: string;
  securityLevel: "low" | "medium" | "high";
  complexity: "simple" | "moderate" | "complex";
  codeExample: string;
}

const authStrategies: AuthStrategy[] = [
  {
    id: "jwt",
    title: "JSON Web Tokens (JWT)",
    description: "Stateless authentication using digitally signed tokens containing user information",
    pros: [
      "Stateless - no server-side session storage needed",
      "Scalable across multiple servers",
      "Contains user information (claims)",
      "Self-contained and portable",
      "Works well with microservices"
    ],
    cons: [
      "Tokens cannot be invalidated before expiration",
      "Larger payload size compared to session IDs",
      "Security depends on proper token storage",
      "No built-in logout mechanism",
      "Tokens stored in client-side storage"
    ],
    useCases: [
      "Single Page Applications (SPAs)",
      "Mobile applications",
      "Microservices architecture",
      "API authentication",
      "Cross-domain authentication"
    ],
    implementation: "Client stores JWT in localStorage/sessionStorage, sends with Authorization header",
    securityLevel: "high",
    complexity: "moderate",
    codeExample: `// JWT Implementation Example
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// Client-side usage
localStorage.setItem('token', token);
fetch('/api/protected', {
  headers: {
    'Authorization': \`Bearer \${token}\`
  }
});`
  },
  {
    id: "oauth",
    title: "OAuth 2.0",
    description: "Authorization framework for third-party applications to access user resources",
    pros: [
      "Industry standard for third-party access",
      "Granular permission control (scopes)",
      "No password sharing with third parties",
      "Supports multiple grant types",
      "Widely supported by major platforms"
    ],
    cons: [
      "Complex implementation",
      "Multiple grant types to understand",
      "Security depends on proper implementation",
      "Requires careful scope management",
      "Can be overkill for simple applications"
    ],
    useCases: [
      "Social login (Google, Facebook, GitHub)",
      "API access for third-party apps",
      "Mobile app authentication",
      "Enterprise SSO integration",
      "Microservices authorization"
    ],
    implementation: "Uses authorization codes, refresh tokens, and access tokens with specific scopes",
    securityLevel: "high",
    complexity: "complex",
    codeExample: `// OAuth 2.0 Flow Example
// 1. Redirect user to authorization server
const authUrl = \`https://accounts.google.com/oauth/authorize?\${new URLSearchParams({
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  scope: 'email profile',
  response_type: 'code'
})}\`;

// 2. Exchange authorization code for tokens
const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  body: new URLSearchParams({
    code: authorizationCode,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code'
  })
});`
  },
  {
    id: "sso",
    title: "Single Sign-On (SSO)",
    description: "Authentication system allowing users to access multiple applications with one login",
    pros: [
      "Single login for multiple applications",
      "Improved user experience",
      "Centralized user management",
      "Reduced password fatigue",
      "Enhanced security through centralized policies"
    ],
    cons: [
      "Complex infrastructure setup",
      "Single point of failure",
      "Requires coordination between applications",
      "Can be expensive to implement",
      "Vendor lock-in concerns"
    ],
    useCases: [
      "Enterprise applications",
      "Internal company tools",
      "Educational institutions",
      "Healthcare systems",
      "Government applications"
    ],
    implementation: "Uses protocols like SAML, OpenID Connect, or custom SSO solutions",
    securityLevel: "high",
    complexity: "complex",
    codeExample: `// SAML SSO Example
// Service Provider (SP) configuration
const samlConfig = {
  entryPoint: 'https://idp.example.com/sso',
  issuer: 'https://myapp.example.com',
  cert: fs.readFileSync('./cert.pem', 'utf8'),
  privateKey: fs.readFileSync('./key.pem', 'utf8')
};

// Handle SAML response
app.post('/saml/callback', (req, res) => {
  const samlResponse = req.body.SAMLResponse;
  const user = parseSAMLResponse(samlResponse);
  // Create session and redirect to app
});`
  },
  {
    id: "basic-auth",
    title: "Basic Authentication",
    description: "Simple authentication using username and password in HTTP headers",
    pros: [
      "Simple to implement",
      "Widely supported",
      "No additional infrastructure needed",
      "Works with any HTTP client",
      "Easy to understand and debug"
    ],
    cons: [
      "Credentials sent with every request",
      "No built-in logout mechanism",
      "Credentials stored in plain text (base64 encoded)",
      "No session management",
      "Poor user experience"
    ],
    useCases: [
      "API authentication",
      "Internal tools",
      "Development environments",
      "Simple web services",
      "Legacy system integration"
    ],
    implementation: "Username and password encoded in base64, sent in Authorization header",
    securityLevel: "low",
    complexity: "simple",
    codeExample: `// Basic Auth Implementation
// Client-side
const credentials = btoa('username:password');
fetch('/api/protected', {
  headers: {
    'Authorization': \`Basic \${credentials}\`
  }
});

// Server-side (Node.js/Express)
app.use('/api', (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  const credentials = Buffer.from(authHeader.slice(6), 'base64').toString();
  const [username, password] = credentials.split(':');
  
  // Validate credentials
  if (validateUser(username, password)) {
    next();
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});`
  },
  {
    id: "session-auth",
    title: "Session-Based Authentication",
    description: "Server-side session management with client-side session identifiers",
    pros: [
      "Server-side control over sessions",
      "Can be invalidated immediately",
      "Secure session storage",
      "Built-in logout functionality",
      "Can store additional session data"
    ],
    cons: [
      "Requires server-side session storage",
      "Scaling challenges with multiple servers",
      "Session fixation attacks",
      "CSRF protection needed",
      "Memory usage for session storage"
    ],
    useCases: [
      "Traditional web applications",
      "Server-rendered applications",
      "Applications requiring session data",
      "High-security applications",
      "Applications with complex user states"
    ],
    implementation: "Server creates session, sends session ID via cookie, validates on each request",
    securityLevel: "high",
    complexity: "moderate",
    codeExample: `// Session Auth Implementation
// Server-side (Node.js/Express with express-session)
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: true, 
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (validateUser(username, password)) {
    req.session.userId = user.id;
    req.session.authenticated = true;
    res.redirect('/dashboard');
  }
});

// Protected route middleware
const requireAuth = (req, res, next) => {
  if (req.session.authenticated) {
    next();
  } else {
    res.redirect('/login');
  }
};`
  }
];

export default function AuthenticationStrategiesPage() {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

  const getSecurityColor = (level: string) => {
    switch (level) {
      case "low": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "high": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "simple": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "moderate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "complex": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4 inline-block"
            >
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Authentication Strategies
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Comprehensive guide to modern authentication methods for frontend applications
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{authStrategies.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Strategies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {authStrategies.filter(strategy => strategy.securityLevel === "high").length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">High Security</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {authStrategies.filter(strategy => strategy.complexity === "moderate").length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Moderate Complexity</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Strategies Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {authStrategies.map((strategy) => (
            <div key={strategy.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {strategy.title}
                </h2>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSecurityColor(strategy.securityLevel)}`}>
                    {strategy.securityLevel} security
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getComplexityColor(strategy.complexity)}`}>
                    {strategy.complexity}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">{strategy.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">✅ Pros</h3>
                  <ul className="space-y-2">
                    {strategy.pros.map((pro, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                        <span className="text-green-500 mr-2 mt-1">•</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">❌ Cons</h3>
                  <ul className="space-y-2">
                    {strategy.cons.map((con, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                        <span className="text-red-500 mr-2 mt-1">•</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🎯 Use Cases</h3>
                <div className="flex flex-wrap gap-2">
                  {strategy.useCases.map((useCase, index) => (
                    <span key={index} className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full">
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🔧 Implementation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{strategy.implementation}</p>
              </div>
              
              <button
                onClick={() => setSelectedStrategy(selectedStrategy === strategy.id ? null : strategy.id)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {selectedStrategy === strategy.id ? "Hide Code Example" : "Show Code Example"}
              </button>
              
              {selectedStrategy === strategy.id && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">💻 Code Example</h3>
                  <pre className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-gray-900 dark:text-gray-100">
                      {strategy.codeExample}
                    </code>
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Comparison Table */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Strategy Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Strategy</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Security</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Complexity</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Scalability</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Best For</th>
                </tr>
              </thead>
              <tbody>
                {authStrategies.map((strategy) => (
                  <tr key={strategy.id} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{strategy.title}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSecurityColor(strategy.securityLevel)}`}>
                        {strategy.securityLevel}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getComplexityColor(strategy.complexity)}`}>
                        {strategy.complexity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                      {strategy.id === "jwt" ? "High" : strategy.id === "oauth" ? "High" : strategy.id === "sso" ? "Medium" : strategy.id === "basic-auth" ? "Low" : "Medium"}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                      {strategy.useCases[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
