const fs = require('fs');
const path = require('path');

/**
 * Generate additional senior-level Next.js questions
 * Focuses on topics with low question counts and advanced concepts
 */

const questionsFile = path.join(
  __dirname,
  '../final-questions-v01/nextjs-questions.json'
);

// Read existing questions to avoid duplicates
let existingQuestions = [];
if (fs.existsSync(questionsFile)) {
  existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
}

const existingIds = new Set(existingQuestions.map(q => q.id));

function formatCode(content) {
  if (!content) return '';

  // Handle code blocks (```language ... ```)
  content = content.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    (match, lang, code) => {
      code = code.trim();
      code = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `<pre><code>${code}</code></pre>`;
    }
  );

  // Handle inline code (`code`)
  content = content.replace(/`([^`\n]+)`/g, (match, code) => {
    if (match.includes('<pre>') || match.includes('<code>')) {
      return match;
    }
    code = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<code>${code}</code>`;
  });

  return content;
}

function generateQuestion(
  id,
  title,
  content,
  topic,
  options,
  explanation,
  difficulty = 'intermediate'
) {
  return {
    id: `nextjs-senior-${id}`,
    title: title,
    content: formatCode(content),
    type: 'multiple-choice',
    category: 'Next.js',
    topic: topic,
    difficulty: difficulty,
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', topic.toLowerCase().replace(/\s+/g, '-'), difficulty],
    explanation: formatCode(explanation),
    points: 15,
    options: options.map((opt, idx) => ({
      id: `o${idx + 1}`,
      text: formatCode(opt.text),
      isCorrect: opt.isCorrect,
      explanation: opt.explanation ? formatCode(opt.explanation) : '',
    })),
    hints: [
      'Consider Next.js best practices and performance implications',
      'Review Next.js documentation for advanced patterns',
      'Think about server vs client component boundaries',
    ],
    metadata: {},
  };
}

const newQuestions = [];

// Server Components (0 questions) - Add 9 questions
newQuestions.push(
  generateQuestion(
    'sc-1',
    'How do React Server Components differ from traditional Server-Side Rendering in Next.js?',
    'React Server Components (RSC) in Next.js App Router provide a new rendering model. How does this differ from traditional SSR?',
    'Server Components',
    [
      {
        text: 'RSC send serialized component trees as JSON, allowing selective client hydration, while SSR sends full HTML',
        isCorrect: true,
        explanation:
          'RSC enables zero-JS components that never hydrate, reducing bundle size',
      },
      {
        text: 'RSC and SSR are identical - both render on the server',
        isCorrect: false,
      },
      {
        text: 'RSC only work in Pages Router, SSR only in App Router',
        isCorrect: false,
      },
      {
        text: 'RSC require manual hydration, SSR is automatic',
        isCorrect: false,
      },
    ],
    'RSC send component trees as JSON, enabling zero-JS components and selective hydration, unlike SSR which sends full HTML.'
  ),
  generateQuestion(
    'sc-2',
    'What happens when you try to use browser-only APIs in a Server Component?',
    'Consider this Server Component: <code>export default function ServerComponent() { const [state, setState] = useState(0); return <div>{state}</div>; }</code>',
    'Server Components',
    [
      {
        text: 'It will cause a build-time error - Server Components cannot use hooks or browser APIs',
        isCorrect: true,
        explanation:
          'Server Components run only on server, cannot use hooks, state, or browser APIs',
      },
      {
        text: 'It will work fine - Next.js handles it automatically',
        isCorrect: false,
      },
      {
        text: 'It will cause a runtime error only in production',
        isCorrect: false,
      },
      {
        text: 'It will automatically convert to a Client Component',
        isCorrect: false,
      },
    ],
    'Server Components cannot use hooks, state, or browser APIs. They run only on the server.'
  ),
  generateQuestion(
    'sc-3',
    'How do you pass data from a Server Component to a Client Component in Next.js App Router?',
    'You have a Server Component that fetches data and needs to pass it to a Client Component.',
    'Server Components',
    [
      {
        text: 'Pass data as props - Server Components can render Client Components with props',
        isCorrect: true,
        explanation:
          'Server Components can render Client Components and pass serializable props',
      },
      {
        text: 'Use Context API - it works across server/client boundary',
        isCorrect: false,
      },
      {
        text: 'Use global variables - they are shared between server and client',
        isCorrect: false,
      },
      {
        text: 'Use localStorage - it persists across server/client',
        isCorrect: false,
      },
    ],
    'Server Components can render Client Components and pass serializable props (JSON-serializable data).'
  ),
  generateQuestion(
    'sc-4',
    'What is the difference between async Server Components and regular Server Components?',
    'In Next.js App Router, you can make Server Components async. What is the key difference?',
    'Server Components',
    [
      {
        text: 'Async Server Components can use await for data fetching, regular ones cannot',
        isCorrect: true,
        explanation:
          'Async Server Components can directly await promises and fetch data',
      },
      {
        text: 'Async Server Components run on client, regular ones on server',
        isCorrect: false,
      },
      {
        text: 'There is no difference - all Server Components are async',
        isCorrect: false,
      },
      {
        text: 'Async Server Components cannot receive props',
        isCorrect: false,
      },
    ],
    'Async Server Components can directly await promises, making data fetching simpler without useEffect.'
  ),
  generateQuestion(
    'sc-5',
    'Can Server Components import and use Client Components?',
    'In Next.js App Router architecture, can a Server Component import and render a Client Component?',
    'Server Components',
    [
      {
        text: 'Yes, Server Components can import and render Client Components, but not the reverse',
        isCorrect: true,
        explanation:
          'Server Components can render Client Components, but Client Components cannot import Server Components',
      },
      {
        text: 'No, Server and Client Components cannot interact',
        isCorrect: false,
      },
      {
        text: 'Yes, but only if both are in the same directory',
        isCorrect: false,
      },
      {
        text: 'No, Server Components can only render other Server Components',
        isCorrect: false,
      },
    ],
    'Server Components can import and render Client Components. The reverse is not allowed - Client Components cannot import Server Components.'
  ),
  generateQuestion(
    'sc-6',
    'What happens to event handlers in Server Components?',
    'If you try to add an onClick handler to a Server Component, what happens?',
    'Server Components',
    [
      {
        text: 'Build error - Server Components cannot have event handlers, use Client Components instead',
        isCorrect: true,
        explanation:
          'Event handlers require client-side JavaScript, so they need Client Components',
      },
      {
        text: 'It works fine - Next.js handles it automatically',
        isCorrect: false,
      },
      {
        text: 'Runtime error - handlers are undefined on server',
        isCorrect: false,
      },
      { text: 'It works but handlers are ignored on server', isCorrect: false },
    ],
    'Server Components cannot have event handlers. Use Client Components (with "use client") for interactivity.'
  ),
  generateQuestion(
    'sc-7',
    'How does Next.js handle Server Component re-rendering?',
    'When data changes on the server, how are Server Components re-rendered?',
    'Server Components',
    [
      {
        text: 'Server Components re-render on the server when their data changes, sending updated JSON to client',
        isCorrect: true,
        explanation: 'RSC re-render on server and stream updates to client',
      },
      {
        text: 'Server Components never re-render - they are static',
        isCorrect: false,
      },
      {
        text: 'Server Components re-render on client using React state',
        isCorrect: false,
      },
      {
        text: 'Server Components re-render only on page navigation',
        isCorrect: false,
      },
    ],
    'Server Components re-render on the server when their data changes, and Next.js streams the updates to the client.'
  ),
  generateQuestion(
    'sc-8',
    'What is the performance benefit of Server Components over Client Components?',
    'Why would you choose Server Components over Client Components for certain parts of your app?',
    'Server Components',
    [
      {
        text: 'Server Components reduce JavaScript bundle size since they never ship to client',
        isCorrect: true,
        explanation:
          'Zero-JS components reduce bundle size and improve performance',
      },
      {
        text: 'Server Components are faster to render on client',
        isCorrect: false,
      },
      {
        text: 'Server Components have better SEO than Client Components',
        isCorrect: false,
      },
      { text: 'Server Components use less server memory', isCorrect: false },
    ],
    'Server Components reduce JavaScript bundle size because they never ship to the client - only their rendered output is sent.'
  ),
  generateQuestion(
    'sc-9',
    'Can Server Components access environment variables directly?',
    'In a Server Component, can you access process.env variables?',
    'Server Components',
    [
      {
        text: 'Yes, Server Components can access all environment variables, including server-only ones',
        isCorrect: true,
        explanation:
          'Server Components run on server, so they can access all env vars',
      },
      {
        text: 'No, only Client Components can access environment variables',
        isCorrect: false,
      },
      {
        text: 'Yes, but only NEXT_PUBLIC_ prefixed variables',
        isCorrect: false,
      },
      {
        text: 'No, environment variables are not available in Server Components',
        isCorrect: false,
      },
    ],
    'Server Components run on the server, so they can access all environment variables, including server-only secrets.'
  )
);

// Rendering (0 questions) - Add 9 questions
newQuestions.push(
  generateQuestion(
    'rendering-1',
    'What is the difference between Static Site Generation (SSG) and Incremental Static Regeneration (ISR) in Next.js?',
    'Both SSG and ISR generate static pages, but how do they differ?',
    'Rendering',
    [
      {
        text: 'SSG generates pages at build time, ISR allows re-generating pages on-demand after build',
        isCorrect: true,
        explanation:
          'ISR enables updating static pages without rebuilding the entire site',
      },
      {
        text: 'SSG is for Pages Router, ISR is for App Router only',
        isCorrect: false,
      },
      {
        text: 'SSG uses getStaticProps, ISR uses getServerSideProps',
        isCorrect: false,
      },
      { text: 'There is no difference - they are the same', isCorrect: false },
    ],
    'SSG generates pages at build time. ISR allows re-generating pages on-demand after build, enabling updates without full rebuilds.'
  ),
  generateQuestion(
    'rendering-2',
    'When should you use Server-Side Rendering (SSR) vs Static Site Generation (SSG) in Next.js?',
    'What factors determine whether to use SSR or SSG?',
    'Rendering',
    [
      {
        text: 'Use SSG for content that changes infrequently, SSR for content that needs to be fresh on every request',
        isCorrect: true,
        explanation:
          'SSG for static/pre-rendered content, SSR for dynamic/fresh content',
      },
      { text: 'Always use SSR - it is faster than SSG', isCorrect: false },
      { text: 'Always use SSG - it is more secure than SSR', isCorrect: false },
      {
        text: 'Use SSR for public pages, SSG for authenticated pages',
        isCorrect: false,
      },
    ],
    'Use SSG for content that changes infrequently (blogs, docs). Use SSR for content that must be fresh on every request (dashboards, user data).'
  ),
  generateQuestion(
    'rendering-3',
    'How does Next.js handle hybrid rendering strategies?',
    'Can you mix SSG, SSR, and client-side rendering in the same Next.js app?',
    'Rendering',
    [
      {
        text: 'Yes, Next.js supports per-page rendering strategies - you can mix SSG, SSR, and CSR',
        isCorrect: true,
        explanation: 'Next.js allows different rendering strategies per route',
      },
      {
        text: 'No, you must choose one strategy for the entire app',
        isCorrect: false,
      },
      {
        text: 'Yes, but only in App Router, not Pages Router',
        isCorrect: false,
      },
      { text: 'No, hybrid rendering is not supported', isCorrect: false },
    ],
    'Next.js supports per-page rendering strategies. You can use SSG for some pages, SSR for others, and CSR for interactive components.'
  ),
  generateQuestion(
    'rendering-4',
    'What is the revalidate option in getStaticProps used for?',
    'In Pages Router, what does the revalidate option control in getStaticProps?',
    'Rendering',
    [
      {
        text: 'It enables ISR - pages are regenerated at most once per revalidate seconds',
        isCorrect: true,
        explanation: 'revalidate enables ISR with time-based revalidation',
      },
      { text: 'It controls how often the page is cached', isCorrect: false },
      {
        text: 'It sets the cache expiration time for the page',
        isCorrect: false,
      },
      { text: 'It is not a valid option in getStaticProps', isCorrect: false },
    ],
    'The revalidate option enables ISR, allowing pages to be regenerated at most once per specified number of seconds.'
  ),
  generateQuestion(
    'rendering-5',
    'How does Next.js optimize rendering performance with automatic code splitting?',
    'What does Next.js do automatically to optimize rendering performance?',
    'Rendering',
    [
      {
        text: 'Next.js automatically splits code by route and component, loading only what is needed',
        isCorrect: true,
        explanation: 'Automatic code splitting reduces initial bundle size',
      },
      {
        text: 'Next.js bundles everything into a single file for faster loading',
        isCorrect: false,
      },
      {
        text: 'Next.js requires manual code splitting configuration',
        isCorrect: false,
      },
      { text: 'Next.js does not perform any code splitting', isCorrect: false },
    ],
    'Next.js automatically splits code by route and component, ensuring only necessary code is loaded for each page.'
  ),
  generateQuestion(
    'rendering-6',
    'What is the difference between getStaticProps and getServerSideProps in Pages Router?',
    'Both functions fetch data, but when do they run?',
    'Rendering',
    [
      {
        text: 'getStaticProps runs at build time (SSG), getServerSideProps runs on every request (SSR)',
        isCorrect: true,
        explanation:
          'getStaticProps = build time, getServerSideProps = request time',
      },
      {
        text: 'getStaticProps runs on client, getServerSideProps runs on server',
        isCorrect: false,
      },
      { text: 'They are identical - both run on server', isCorrect: false },
      {
        text: 'getStaticProps is for App Router, getServerSideProps is for Pages Router',
        isCorrect: false,
      },
    ],
    'getStaticProps runs at build time for SSG. getServerSideProps runs on every request for SSR.'
  ),
  generateQuestion(
    'rendering-7',
    'How does Next.js handle streaming SSR in App Router?',
    'What is streaming SSR and how does Next.js implement it?',
    'Rendering',
    [
      {
        text: 'Next.js streams HTML as it renders, allowing progressive page loading with Suspense',
        isCorrect: true,
        explanation:
          'Streaming enables progressive rendering and better perceived performance',
      },
      {
        text: 'Next.js waits for entire page to render before sending HTML',
        isCorrect: false,
      },
      { text: 'Streaming SSR is not supported in Next.js', isCorrect: false },
      {
        text: 'Streaming SSR only works with Client Components',
        isCorrect: false,
      },
    ],
    'Next.js streams HTML as it renders, enabling progressive page loading. Suspense boundaries allow streaming parts of the page independently.'
  ),
  generateQuestion(
    'rendering-8',
    'What is the purpose of generateStaticParams in App Router?',
    'How do you generate static paths for dynamic routes in App Router?',
    'Rendering',
    [
      {
        text: 'generateStaticParams returns an array of params to pre-render at build time for dynamic routes',
        isCorrect: true,
        explanation:
          'It enables SSG for dynamic routes by specifying which params to pre-render',
      },
      {
        text: 'generateStaticParams is used for API routes only',
        isCorrect: false,
      },
      {
        text: 'generateStaticParams generates client-side routes',
        isCorrect: false,
      },
      {
        text: 'generateStaticParams is not a valid Next.js function',
        isCorrect: false,
      },
    ],
    'generateStaticParams returns an array of params to pre-render at build time, enabling SSG for dynamic routes.'
  ),
  generateQuestion(
    'rendering-9',
    'How does Next.js handle partial prerendering?',
    'What is partial prerendering and how does Next.js support it?',
    'Rendering',
    [
      {
        text: 'Partial prerendering combines static and dynamic content, prerendering static parts and streaming dynamic parts',
        isCorrect: true,
        explanation:
          'PPR optimizes performance by prerendering static shell and streaming dynamic content',
      },
      {
        text: 'Partial prerendering is not supported in Next.js',
        isCorrect: false,
      },
      {
        text: 'Partial prerendering only works with Pages Router',
        isCorrect: false,
      },
      {
        text: 'Partial prerendering requires manual configuration in next.config.js',
        isCorrect: false,
      },
    ],
    'Partial prerendering combines static and dynamic content, prerendering the static shell and streaming dynamic parts for optimal performance.'
  )
);

// Configuration (0 questions) - Add 6 questions
newQuestions.push(
  generateQuestion(
    'config-1',
    'How do you configure custom webpack settings in Next.js?',
    'You need to customize webpack configuration in your Next.js app. How do you do this?',
    'Configuration',
    [
      {
        text: 'Use webpack function in next.config.js to modify webpack configuration',
        isCorrect: true,
        explanation:
          'next.config.js exports a webpack function for customization',
      },
      {
        text: 'Create a webpack.config.js file in the root directory',
        isCorrect: false,
      },
      {
        text: 'Webpack configuration cannot be customized in Next.js',
        isCorrect: false,
      },
      {
        text: 'Use webpack.config.js only in Pages Router, not App Router',
        isCorrect: false,
      },
    ],
    'Use the webpack function in next.config.js to customize webpack configuration. Example: webpack: (config) => { /* modify config */ return config; }'
  ),
  generateQuestion(
    'config-2',
    'What is the purpose of the experimental section in next.config.js?',
    'How do you enable experimental Next.js features?',
    'Configuration',
    [
      {
        text: 'The experimental section enables experimental features that are not yet stable',
        isCorrect: true,
        explanation: 'Experimental features are opt-in and may change',
      },
      {
        text: 'Experimental section is for testing only and does not affect production',
        isCorrect: false,
      },
      {
        text: 'Experimental features are enabled by default',
        isCorrect: false,
      },
      {
        text: 'Experimental section is not a valid Next.js configuration option',
        isCorrect: false,
      },
    ],
    'The experimental section in next.config.js enables experimental features. These features are opt-in and may change in future versions.'
  ),
  generateQuestion(
    'config-3',
    'How do you configure image domains for next/image in Next.js?',
    'You want to use next/image with external image domains. How do you configure this?',
    'Configuration',
    [
      {
        text: 'Add domains to images.domains array in next.config.js',
        isCorrect: true,
        explanation:
          'images.domains allows external image domains for next/image',
      },
      {
        text: 'Set NEXT_PUBLIC_IMAGE_DOMAINS environment variable',
        isCorrect: false,
      },
      {
        text: 'next/image works with all domains by default',
        isCorrect: false,
      },
      { text: 'Configure image domains in .env.local file', isCorrect: false },
    ],
    'Add domains to images.domains array in next.config.js. Example: images: { domains: ["example.com"] }'
  ),
  generateQuestion(
    'config-4',
    'What is the purpose of the output option in next.config.js?',
    'How do you configure Next.js build output format?',
    'Configuration',
    [
      {
        text: 'output option controls build output - "standalone" creates minimal server, "export" creates static HTML',
        isCorrect: true,
        explanation:
          'output controls whether to export static HTML or create standalone server',
      },
      {
        text: 'output option is for configuring API routes only',
        isCorrect: false,
      },
      {
        text: 'output option controls where build files are saved',
        isCorrect: false,
      },
      {
        text: 'output option is not a valid Next.js configuration',
        isCorrect: false,
      },
    ],
    'The output option controls build output format. "standalone" creates a minimal server, "export" creates static HTML files.'
  ),
  generateQuestion(
    'config-5',
    'How do you configure custom headers in Next.js?',
    'You need to add custom HTTP headers to your Next.js app. How do you configure this?',
    'Configuration',
    [
      {
        text: 'Use headers function in next.config.js to add custom headers',
        isCorrect: true,
        explanation: 'headers function allows adding/modifying HTTP headers',
      },
      {
        text: 'Create a headers.js file in the root directory',
        isCorrect: false,
      },
      {
        text: 'Custom headers can only be added in middleware',
        isCorrect: false,
      },
      { text: 'Custom headers are not supported in Next.js', isCorrect: false },
    ],
    'Use the headers function in next.config.js to add custom HTTP headers. It returns an array of header objects with source and headers properties.'
  ),
  generateQuestion(
    'config-6',
    'What is the purpose of the transpilePackages option in next.config.js?',
    'When would you use transpilePackages in your Next.js configuration?',
    'Configuration',
    [
      {
        text: 'transpilePackages allows transpiling node_modules packages that are not ES5 compatible',
        isCorrect: true,
        explanation:
          'Useful for packages that need to be transpiled for browser compatibility',
      },
      {
        text: 'transpilePackages is for transpiling TypeScript files only',
        isCorrect: false,
      },
      {
        text: 'transpilePackages is not a valid Next.js option',
        isCorrect: false,
      },
      {
        text: 'transpilePackages automatically transpiles all node_modules',
        isCorrect: false,
      },
    ],
    'transpilePackages allows you to specify which node_modules packages should be transpiled, useful for packages that are not ES5 compatible.'
  )
);

// Deployment (0 questions) - Add 6 questions
newQuestions.push(
  generateQuestion(
    'deploy-1',
    'What is the difference between deploying Next.js with "next start" vs "next export"?',
    'How do these two deployment methods differ?',
    'Deployment',
    [
      {
        text: '"next start" runs a Node.js server for SSR/API routes, "next export" creates static HTML files',
        isCorrect: true,
        explanation: 'next start = Node server, next export = static files',
      },
      { text: 'Both methods are identical', isCorrect: false },
      {
        text: '"next start" is for development, "next export" is for production',
        isCorrect: false,
      },
      {
        text: '"next export" requires Node.js server, "next start" creates static files',
        isCorrect: false,
      },
    ],
    '"next start" runs a Node.js server supporting SSR and API routes. "next export" creates static HTML files for static hosting.'
  ),
  generateQuestion(
    'deploy-2',
    'How do you deploy a Next.js app to Vercel?',
    'What is the recommended way to deploy Next.js to Vercel?',
    'Deployment',
    [
      {
        text: 'Connect your Git repository to Vercel - it automatically detects Next.js and deploys',
        isCorrect: true,
        explanation:
          'Vercel has built-in Next.js support with automatic detection',
      },
      {
        text: 'You must manually build and upload files to Vercel',
        isCorrect: false,
      },
      { text: 'Vercel does not support Next.js deployment', isCorrect: false },
      {
        text: 'You need to configure next.config.js specifically for Vercel',
        isCorrect: false,
      },
    ],
    'Connect your Git repository to Vercel. It automatically detects Next.js and handles deployment, including environment variables and build settings.'
  ),
  generateQuestion(
    'deploy-3',
    'What environment variables are available in Next.js at build time vs runtime?',
    'How do NEXT_PUBLIC_ prefixed variables differ from regular environment variables?',
    'Deployment',
    [
      {
        text: 'NEXT_PUBLIC_ variables are exposed to browser, regular variables are server-only',
        isCorrect: true,
        explanation:
          'NEXT_PUBLIC_ prefix makes variables available to client-side code',
      },
      {
        text: 'All environment variables are available everywhere',
        isCorrect: false,
      },
      { text: 'NEXT_PUBLIC_ variables are server-only', isCorrect: false },
      {
        text: 'Environment variables are not supported in Next.js',
        isCorrect: false,
      },
    ],
    'NEXT_PUBLIC_ prefixed variables are exposed to the browser. Regular environment variables are server-only and not exposed to client code.'
  ),
  generateQuestion(
    'deploy-4',
    'How do you configure a custom server for Next.js deployment?',
    'You need to use a custom Express server with Next.js. How do you configure this?',
    'Deployment',
    [
      {
        text: 'Create a custom server.js file and use next() to handle requests, then run "node server.js"',
        isCorrect: true,
        explanation:
          'Custom server wraps Next.js app and handles requests before passing to Next.js',
      },
      { text: 'Configure custom server in next.config.js', isCorrect: false },
      { text: 'Custom servers are not supported in Next.js', isCorrect: false },
      { text: 'Custom servers only work with Pages Router', isCorrect: false },
    ],
    'Create a custom server.js file that imports Next.js and uses next() to handle requests. Run it with "node server.js" instead of "next start".'
  ),
  generateQuestion(
    'deploy-5',
    'What is the standalone output mode in Next.js and when would you use it?',
    'How does the standalone build output differ from the default build?',
    'Deployment',
    [
      {
        text: 'Standalone mode creates a minimal server with only necessary files, useful for Docker deployments',
        isCorrect: true,
        explanation:
          'Standalone reduces deployment size by including only required files',
      },
      {
        text: 'Standalone mode creates static HTML files only',
        isCorrect: false,
      },
      { text: 'Standalone mode is for development only', isCorrect: false },
      {
        text: 'Standalone mode is not a valid Next.js feature',
        isCorrect: false,
      },
    ],
    'Standalone mode creates a minimal server with only necessary files, reducing deployment size. Useful for Docker and self-hosted deployments.'
  ),
  generateQuestion(
    'deploy-6',
    'How do you handle environment-specific configurations in Next.js deployment?',
    'You need different configurations for development, staging, and production. How do you manage this?',
    'Deployment',
    [
      {
        text: 'Use .env.local, .env.development, .env.production files and environment variables in deployment platform',
        isCorrect: true,
        explanation:
          'Next.js loads env files based on NODE_ENV and deployment platform env vars',
      },
      {
        text: 'Create separate next.config.js files for each environment',
        isCorrect: false,
      },
      {
        text: 'Environment-specific configs are not supported',
        isCorrect: false,
      },
      { text: 'Use only .env file for all environments', isCorrect: false },
    ],
    'Use .env files (.env.local, .env.development, .env.production) and set environment variables in your deployment platform. Next.js loads the appropriate file based on NODE_ENV.'
  )
);

// Add more questions for topics with low counts
// API Routes (1 question) - Add 5 more
newQuestions.push(
  generateQuestion(
    'api-1',
    'How do you handle CORS in Next.js API routes?',
    'You need to enable CORS for your Next.js API route. How do you do this?',
    'API Routes',
    [
      {
        text: 'Set CORS headers manually in the API route handler response',
        isCorrect: true,
        explanation:
          'Manually set Access-Control-Allow-Origin and related headers in the response',
      },
      {
        text: 'CORS is automatically enabled for all API routes',
        isCorrect: false,
      },
      { text: 'Configure CORS in next.config.js', isCorrect: false },
      { text: 'CORS is not supported in Next.js API routes', isCorrect: false },
    ],
    'Set CORS headers manually in your API route handler. Example: res.setHeader("Access-Control-Allow-Origin", "*")'
  ),
  generateQuestion(
    'api-2',
    'What is the difference between API routes in Pages Router vs App Router?',
    'How do API routes differ between the two routing systems?',
    'API Routes',
    [
      {
        text: 'Pages Router uses pages/api, App Router uses app/api with route handlers (async functions)',
        isCorrect: true,
        explanation:
          'App Router uses route handlers (async functions) instead of default exports',
      },
      { text: 'They are identical - no difference', isCorrect: false },
      { text: 'API routes only work in Pages Router', isCorrect: false },
      { text: 'API routes only work in App Router', isCorrect: false },
    ],
    'Pages Router uses pages/api with default export functions. App Router uses app/api with route handlers (GET, POST, etc. as named exports).'
  ),
  generateQuestion(
    'api-3',
    'How do you handle file uploads in Next.js API routes?',
    'You need to handle multipart/form-data file uploads in your API route.',
    'API Routes',
    [
      {
        text: 'Use a library like formidable or multer to parse multipart/form-data, or use FormData API',
        isCorrect: true,
        explanation: 'Parse multipart data using libraries or FormData API',
      },
      { text: 'Next.js handles file uploads automatically', isCorrect: false },
      {
        text: 'File uploads are not supported in API routes',
        isCorrect: false,
      },
      { text: 'Use next/image component for file uploads', isCorrect: false },
    ],
    'Use libraries like formidable or multer to parse multipart/form-data. In App Router, you can also use the FormData API.'
  ),
  generateQuestion(
    'api-4',
    'Can Next.js API routes be deployed as serverless functions?',
    'How are API routes deployed on platforms like Vercel?',
    'API Routes',
    [
      {
        text: 'Yes, API routes are automatically deployed as serverless functions on Vercel',
        isCorrect: true,
        explanation: 'Each API route becomes a separate serverless function',
      },
      { text: 'No, API routes require a Node.js server', isCorrect: false },
      { text: 'Yes, but only in Pages Router', isCorrect: false },
      { text: 'Yes, but manual configuration is required', isCorrect: false },
    ],
    'Yes, API routes are automatically deployed as serverless functions on platforms like Vercel. Each route becomes a separate function.'
  ),
  generateQuestion(
    'api-5',
    'How do you handle streaming responses in Next.js API routes?',
    'You need to stream data from your API route. How do you implement this?',
    'API Routes',
    [
      {
        text: 'Use ReadableStream or Response with streaming body in App Router, or res.write() in Pages Router',
        isCorrect: true,
        explanation: 'Streaming enables sending data incrementally',
      },
      { text: 'Streaming is not supported in API routes', isCorrect: false },
      { text: 'Use next/stream component', isCorrect: false },
      { text: 'Streaming only works with GET requests', isCorrect: false },
    ],
    'In App Router, use ReadableStream or Response with streaming body. In Pages Router, use res.write() to stream chunks.'
  )
);

// Authentication (1 question) - Add 5 more
newQuestions.push(
  generateQuestion(
    'auth-1',
    'How do you implement authentication in Next.js App Router?',
    'You need to add authentication to your Next.js App Router app. What is the recommended approach?',
    'Authentication',
    [
      {
        text: 'Use middleware to protect routes and handle auth logic, or use libraries like NextAuth.js',
        isCorrect: true,
        explanation:
          'Middleware runs before route handlers, perfect for auth checks',
      },
      {
        text: 'Authentication must be handled only in API routes',
        isCorrect: false,
      },
      {
        text: 'Next.js has built-in authentication - no setup needed',
        isCorrect: false,
      },
      { text: 'Authentication only works in Pages Router', isCorrect: false },
    ],
    'Use middleware to protect routes and check authentication. Libraries like NextAuth.js provide complete auth solutions for Next.js.'
  ),
  generateQuestion(
    'auth-2',
    'How do you protect API routes with authentication in Next.js?',
    'You want to require authentication for your API routes. How do you implement this?',
    'Authentication',
    [
      {
        text: 'Check authentication in the API route handler or use middleware to protect /api routes',
        isCorrect: true,
        explanation:
          'Verify auth tokens/sessions in route handler or use middleware',
      },
      { text: 'API routes are automatically protected', isCorrect: false },
      {
        text: 'Use getServerSideProps to protect API routes',
        isCorrect: false,
      },
      { text: 'API routes cannot be protected', isCorrect: false },
    ],
    'Check authentication in the API route handler by verifying tokens or sessions. You can also use middleware to protect /api routes.'
  ),
  generateQuestion(
    'auth-3',
    'How do you handle JWT tokens in Next.js Server Components?',
    'You need to verify JWT tokens in Server Components. How do you do this?',
    'Authentication',
    [
      {
        text: 'Read cookies/headers in Server Components and verify tokens server-side',
        isCorrect: true,
        explanation:
          'Server Components can access cookies and headers to verify tokens',
      },
      {
        text: 'JWT tokens can only be verified in Client Components',
        isCorrect: false,
      },
      {
        text: 'Use localStorage to store tokens in Server Components',
        isCorrect: false,
      },
      { text: 'JWT tokens are not supported in Next.js', isCorrect: false },
    ],
    'Server Components can read cookies and headers. Verify JWT tokens server-side using libraries like jsonwebtoken.'
  ),
  generateQuestion(
    'auth-4',
    'What is the recommended way to store authentication state in Next.js?',
    'How should you manage authentication state across server and client?',
    'Authentication',
    [
      {
        text: 'Store auth tokens in httpOnly cookies for security, access via Server Components or middleware',
        isCorrect: true,
        explanation:
          'httpOnly cookies prevent XSS attacks and are accessible server-side',
      },
      {
        text: 'Store tokens in localStorage for easy access',
        isCorrect: false,
      },
      { text: 'Store tokens in sessionStorage', isCorrect: false },
      { text: 'Store tokens in global variables', isCorrect: false },
    ],
    'Store auth tokens in httpOnly cookies for security. They are accessible server-side and protected from XSS attacks.'
  ),
  generateQuestion(
    'auth-5',
    'How do you implement role-based access control (RBAC) in Next.js?',
    'You need to restrict access based on user roles. How do you implement this?',
    'Authentication',
    [
      {
        text: 'Check user roles in middleware or Server Components, redirect unauthorized users',
        isCorrect: true,
        explanation:
          'Verify roles server-side and redirect or show error for unauthorized access',
      },
      { text: 'RBAC can only be implemented client-side', isCorrect: false },
      { text: 'Use getStaticProps for role checking', isCorrect: false },
      { text: 'RBAC is not supported in Next.js', isCorrect: false },
    ],
    'Check user roles in middleware or Server Components. Verify roles server-side and redirect or show errors for unauthorized access.'
  )
);

// Filter out any questions with duplicate IDs
const uniqueQuestions = newQuestions.filter(q => !existingIds.has(q.id));

console.log(
  `\n📝 Generated ${uniqueQuestions.length} new senior-level Next.js questions`
);
console.log(`\n📊 Breakdown by topic:`);
const topicCounts = {};
uniqueQuestions.forEach(q => {
  topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
});
Object.entries(topicCounts)
  .sort()
  .forEach(([topic, count]) => {
    console.log(`  ${topic}: ${count} questions`);
  });

// Append to existing questions
existingQuestions.push(...uniqueQuestions);

// Write back
fs.writeFileSync(questionsFile, JSON.stringify(existingQuestions, null, 2));

console.log(
  `\n✅ Added ${uniqueQuestions.length} questions to ${questionsFile}`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
