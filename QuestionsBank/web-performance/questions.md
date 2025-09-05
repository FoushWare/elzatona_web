# Web Performance Optimization - Questions Bank

## Question 1: Core Web Vitals

**Question:** Explain Core Web Vitals and how to measure and optimize them.

**Answer:**
Core Web Vitals are the three key metrics that Google uses to measure user experience:

**1. Largest Contentful Paint (LCP) - Loading Performance**

- **Definition**: Time when the largest content element becomes visible
- **Good**: ≤ 2.5 seconds
- **Needs Improvement**: 2.5-4 seconds
- **Poor**: > 4 seconds

**Optimization:**

```javascript
// Measure LCP
new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries();
  const lastEntry = entries[entries.length - 1];
  console.log('LCP:', lastEntry.startTime);
}).observe({ entryTypes: ['largest-contentful-paint'] });

// Optimize LCP
// 1. Optimize images
<img
  src="hero-image.webp"
  alt="Hero"
  loading="eager"
  fetchpriority="high"
  width="800"
  height="600"
/>

// 2. Preload critical resources
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/images/hero.webp" as="image">

// 3. Remove render-blocking resources
<link rel="stylesheet" href="critical.css">
<link rel="preload" href="non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

**2. First Input Delay (FID) - Interactivity**

- **Definition**: Time from first user interaction to browser response
- **Good**: ≤ 100ms
- **Needs Improvement**: 100-300ms
- **Poor**: > 300ms

**Optimization:**

```javascript
// Measure FID
new PerformanceObserver(entryList => {
  const entries = entryList.getEntries();
  entries.forEach(entry => {
    console.log('FID:', entry.processingStart - entry.startTime);
  });
}).observe({ entryTypes: ['first-input'] });

// Optimize FID
// 1. Code splitting
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// 2. Web Workers for heavy tasks
const worker = new Worker('heavy-task.js');
worker.postMessage(data);
worker.onmessage = e => {
  console.log('Result:', e.data);
};

// 3. Debounce/throttle event handlers
const debouncedSearch = debounce(searchFunction, 300);
```

**3. Cumulative Layout Shift (CLS) - Visual Stability**

- **Definition**: Unexpected layout shifts during page load
- **Good**: ≤ 0.1
- **Needs Improvement**: 0.1-0.25
- **Poor**: > 0.25

**Optimization:**

```javascript
// Measure CLS
let clsValue = 0;
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (!entry.hadRecentInput) {
      clsValue += entry.value;
    }
  }
  console.log('CLS:', clsValue);
}).observe({ entryTypes: ['layout-shift'] });

// Optimize CLS
// 1. Reserve space for images
<img
  src="image.jpg"
  alt="Description"
  width="400"
  height="300"
  style="aspect-ratio: 400/300;"
/>

// 2. Reserve space for ads
<div style="min-height: 250px;">
  <div id="ad-container"></div>
</div>

// 3. Avoid inserting content above existing content
// Bad
document.body.insertBefore(newElement, document.body.firstChild);

// Good
document.body.appendChild(newElement);
```

---

## Question 2: Image Optimization

**Question:** How do you optimize images for web performance?

**Answer:**
**1. Modern Image Formats:**

```html
<!-- WebP with fallback -->
<picture>
  <source srcset="image.webp" type="image/webp" />
  <source srcset="image.avif" type="image/avif" />
  <img src="image.jpg" alt="Description" />
</picture>

<!-- Responsive images -->
<img
  srcset="image-320w.webp 320w, image-640w.webp 640w, image-1280w.webp 1280w"
  sizes="(max-width: 320px) 280px, (max-width: 640px) 600px, 1200px"
  src="image-640w.webp"
  alt="Description"
  loading="lazy"
/>
```

**2. Lazy Loading:**

```javascript
// Native lazy loading
<img src="image.jpg" alt="Description" loading="lazy">

// Intersection Observer for custom lazy loading
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});
```

**3. Image Compression:**

```javascript
// Client-side compression
function compressImage(file, maxWidth = 800, quality = 0.8) {
  return new Promise(resolve => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };

    img.src = URL.createObjectURL(file);
  });
}

// Usage
const input = document.getElementById('image-input');
input.addEventListener('change', async e => {
  const file = e.target.files[0];
  const compressed = await compressImage(file);
  // Upload compressed image
});
```

**4. Next.js Image Optimization:**

```javascript
import Image from 'next/image';

function OptimizedImage({ src, alt, width, height }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
      priority={false} // Set to true for above-the-fold images
      quality={75}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
```

---

## Question 3: JavaScript Performance

**Question:** How do you optimize JavaScript performance?

**Answer:**
**1. Code Splitting:**

```javascript
// Dynamic imports
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Route-based splitting
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));

// Conditional loading
async function loadFeature() {
  if (userHasPermission) {
    const { heavyFeature } = await import('./heavy-feature');
    heavyFeature.init();
  }
}
```

**2. Bundle Optimization:**

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};

// Tree shaking
import { debounce } from 'lodash-es'; // Good - only imports debounce
import _ from 'lodash'; // Bad - imports entire library
```

**3. Memory Management:**

```javascript
// Avoid memory leaks
class Component {
  constructor() {
    this.intervalId = setInterval(this.update, 1000);
    this.eventListener = this.handleClick.bind(this);
    document.addEventListener('click', this.eventListener);
  }

  destroy() {
    clearInterval(this.intervalId);
    document.removeEventListener('click', this.eventListener);
  }
}

// Object pooling
class ObjectPool {
  constructor(createFn, resetFn) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.pool = [];
  }

  get() {
    return this.pool.pop() || this.createFn();
  }

  release(obj) {
    this.resetFn(obj);
    this.pool.push(obj);
  }
}

// Usage
const pool = new ObjectPool(
  () => ({ x: 0, y: 0, active: false }),
  obj => {
    obj.x = 0;
    obj.y = 0;
    obj.active = false;
  }
);
```

**4. Debouncing and Throttling:**

```javascript
// Debounce - delay execution until after events stop
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle - limit execution frequency
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Usage
const debouncedSearch = debounce(searchFunction, 300);
const throttledScroll = throttle(scrollFunction, 100);
```

---

## Question 4: CSS Performance

**Question:** How do you optimize CSS for better performance?

**Answer:**
**1. Critical CSS:**

```html
<!-- Inline critical CSS -->
<style>
  .header {
    background: #333;
  }
  .hero {
    padding: 2rem;
  }
  .nav {
    display: flex;
  }
</style>

<!-- Load non-critical CSS asynchronously -->
<link
  rel="preload"
  href="styles.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript><link rel="stylesheet" href="styles.css" /></noscript>
```

**2. CSS Optimization:**

```css
/* Use efficient selectors */
.header .nav-item {
} /* Good - specific and fast */
* {
} /* Bad - too generic */
div div div div div {
} /* Bad - complex descendant */

/* Use CSS containment */
.component {
  contain: layout style paint;
}

/* Avoid expensive properties */
.element {
  /* Expensive - causes reflow */
  width: 100px;
  height: 100px;

  /* Better - uses transform */
  transform: scale(1.1);
}

/* Use will-change sparingly */
.animated-element {
  will-change: transform;
}
```

**3. CSS-in-JS Optimization:**

```javascript
// Styled-components with babel plugin
const Button = styled.button`
  background: ${props => (props.primary ? 'blue' : 'gray')};
  padding: 1rem;
`;

// Emotion with css prop
const styles = css`
  background: blue;
  padding: 1rem;
`;

function Component() {
  return <div css={styles}>Content</div>;
}
```

---

## Question 5: Network Optimization

**Question:** How do you optimize network performance?

**Answer:**
**1. HTTP/2 and HTTP/3:**

```javascript
// HTTP/2 server push
app.get('/', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
    Link: '</styles.css>; rel=preload; as=style',
  });
  res.end(html);
});

// HTTP/3 with QUIC
// Automatically handled by modern browsers
```

**2. Compression:**

```javascript
// Gzip compression
const compression = require('compression');
app.use(compression());

// Brotli compression
app.use(
  compression({
    filter: (req, res) => {
      if (req.headers['no-transform']) {
        return false;
      }
      return compression.filter(req, res);
    },
    level: 6,
    threshold: 1024,
  })
);
```

**3. Caching Strategies:**

```javascript
// Service Worker caching
self.addEventListener('fetch', event => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open('images').then(cache => {
        return cache.match(event.request).then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request).then(fetchResponse => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  }
});

// HTTP caching headers
app.use((req, res, next) => {
  if (req.url.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  }
  next();
});
```

**4. Resource Hints:**

```html
<!-- DNS prefetch -->
<link rel="dns-prefetch" href="//fonts.googleapis.com" />

<!-- Preconnect -->
<link rel="preconnect" href="https://api.example.com" />

<!-- Preload critical resources -->
<link
  rel="preload"
  href="/fonts/main.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<link rel="preload" href="/images/hero.webp" as="image" />

<!-- Prefetch next page -->
<link rel="prefetch" href="/next-page.html" />
```

---

## Question 6: Performance Monitoring

**Question:** How do you monitor and measure web performance?

**Answer:**
**1. Performance API:**

```javascript
// Navigation timing
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0];
  console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart);
  console.log(
    'DOM content loaded:',
    perfData.domContentLoadedEventEnd - perfData.fetchStart
  );
});

// Resource timing
performance.getEntriesByType('resource').forEach(resource => {
  console.log(`${resource.name}: ${resource.duration}ms`);
});

// User timing
performance.mark('start-processing');
// ... processing code ...
performance.mark('end-processing');
performance.measure('processing-time', 'start-processing', 'end-processing');
```

**2. Real User Monitoring (RUM):**

```javascript
// Custom performance monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observeWebVitals();
  }

  observeWebVitals() {
    // LCP
    new PerformanceObserver(entryList => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID
    new PerformanceObserver(entryList => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        this.metrics.fid = entry.processingStart - entry.startTime;
      });
    }).observe({ entryTypes: ['first-input'] });

    // CLS
    let clsValue = 0;
    new PerformanceObserver(entryList => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.metrics.cls = clsValue;
    }).observe({ entryTypes: ['layout-shift'] });
  }

  sendMetrics() {
    fetch('/api/metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: window.location.href,
        timestamp: Date.now(),
        metrics: this.metrics,
      }),
    });
  }
}

// Initialize monitoring
const monitor = new PerformanceMonitor();
window.addEventListener('beforeunload', () => monitor.sendMetrics());
```

**3. Performance Budgets:**

```javascript
// webpack-bundle-analyzer
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-report.html',
    }),
  ],
};

// Performance budget configuration
module.exports = {
  performance: {
    maxAssetSize: 250000,
    maxEntrypointSize: 250000,
    hints: 'warning',
  },
};
```

**4. Lighthouse CI:**

```yaml
# .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
```

---

## Question 11: First Contentful Paint (FCP)

**Question:** What is FCP (First Contentful Paint), and what are common causes of a poor FCP score?

**Answer:**
FCP measures the time from when the page starts loading to when any part of the page's content is rendered on the screen (e.g., text, an image).

**Causes of poor FCP:**

- **Heavy Client-Side Rendering**: Large JavaScript bundles that must be downloaded, parsed, and executed before rendering anything.
- **No CDN/Slow Assets**: Static assets (JS, CSS, images) are served from a slow origin server instead of a fast, globally distributed CDN.
- **Unoptimized Assets**: Large, uncompressed images and unminified code.
- **Render-Blocking Resources**: Large amounts of CSS that must be loaded and parsed before the browser can render.

**Measuring FCP:**

```javascript
// Measure FCP
new PerformanceObserver(entryList => {
  const entries = entryList.getEntries();
  entries.forEach(entry => {
    console.log('FCP:', entry.startTime);
  });
}).observe({ entryTypes: ['paint'] });

// FCP thresholds
const fcpThresholds = {
  good: 1800, // 1.8 seconds
  needsImprovement: 3000, // 3 seconds
  poor: 3000, // 3+ seconds
};
```

**FCP Optimization Strategies:**

```javascript
// 1. Critical CSS inlining
const criticalCSS = `
  body { margin: 0; font-family: Arial; }
  .header { background: #333; color: white; }
  .hero { height: 100vh; background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); }
`;

// Inline critical CSS
const html = `
<!DOCTYPE html>
<html>
<head>
  <style>${criticalCSS}</style>
  <link rel="preload" href="non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
</head>
<body>
  <div class="hero">Hero content</div>
</body>
</html>
`;

// 2. Resource hints
const resourceHints = `
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/images/hero.webp" as="image">
`;
```

**Server-Side Rendering for FCP:**

```javascript
// Next.js SSR example
export async function getServerSideProps() {
  const data = await fetchData();

  return {
    props: {
      data,
      // Pre-render critical content
      initialHtml: renderToString(<CriticalContent data={data} />),
    },
  };
}

// React SSR
import { renderToString } from 'react-dom/server';

function App({ data }) {
  return (
    <div>
      <Header />
      <HeroSection data={data} />
      <LazyContent />
    </div>
  );
}

// Server renders critical content immediately
const html = renderToString(<App data={data} />);
```

**CDN and Asset Optimization:**

```javascript
// CDN configuration
const cdnConfig = {
  // Use CDN for static assets
  staticAssets: 'https://cdn.example.com',

  // Optimize images
  imageOptimization: {
    format: 'webp',
    quality: 85,
    responsive: true,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  },

  // Compress assets
  compression: {
    gzip: true,
    brotli: true,
    minify: true,
  },
};

// Image optimization
const optimizedImage = `
  <picture>
    <source srcset="hero.webp" type="image/webp">
    <source srcset="hero.avif" type="image/avif">
    <img src="hero.jpg" alt="Hero" loading="eager" fetchpriority="high">
  </picture>
`;
```

---

## Question 12: FCP Score Improvement

**Question:** How would you improve a poor FCP score?

**Answer:**

1. **CDN & Caching**: Serve all static assets from a CDN with proper caching headers.
2. **Bundle Analysis & Optimization**: Analyze the bundle (e.g., with Webpack Bundle Analyzer) to identify and remove large or unused libraries. Enable minification and compression.
3. **Code Splitting**: Use dynamic imports (React.lazy, import()) to split code into chunks that are loaded only when needed (e.g., per route).
4. **Consider SSR**: For content-heavy sites, Server-Side Rendering can send HTML directly to the client, dramatically improving FCP.

**Bundle Analysis and Optimization:**

```javascript
// webpack.config.js - Bundle analysis
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-report.html',
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};

// Code splitting with React.lazy
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

**Critical Resource Optimization:**

```javascript
// Critical CSS extraction
const criticalCSS = `
  /* Above-the-fold styles */
  .header { position: fixed; top: 0; width: 100%; }
  .hero { height: 100vh; display: flex; align-items: center; }
  .hero h1 { font-size: 3rem; margin: 0; }
`;

// Inline critical CSS
const html = `
<!DOCTYPE html>
<html>
<head>
  <style>${criticalCSS}</style>
  <link rel="preload" href="non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
</head>
<body>
  <header class="header">Header</header>
  <section class="hero">
    <h1>Hero Title</h1>
  </section>
</body>
</html>
`;

// Resource preloading
const preloadResources = `
  <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/images/hero.webp" as="image">
  <link rel="preload" href="/js/critical.js" as="script">
`;
```

**Server-Side Rendering Implementation:**

```javascript
// Next.js SSR
export async function getServerSideProps() {
  const startTime = Date.now();

  // Fetch critical data
  const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);

  const renderTime = Date.now() - startTime;

  return {
    props: {
      user,
      posts,
      renderTime,
    },
  };
}

// React SSR with streaming
import { renderToPipeableStream } from 'react-dom/server';

function App({ data }) {
  return (
    <div>
      <Header />
      <HeroSection data={data} />
      <Suspense fallback={<div>Loading...</div>}>
        <LazyContent />
      </Suspense>
    </div>
  );
}

// Stream rendering for faster FCP
const stream = renderToPipeableStream(<App data={data} />, {
  onShellReady() {
    // Send initial HTML immediately
    res.setHeader('Content-Type', 'text/html');
    stream.pipe(res);
  },
});
```

**CDN and Caching Strategy:**

```javascript
// CDN configuration
const cdnConfig = {
  // Static assets
  staticAssets: {
    domain: 'https://cdn.example.com',
    cacheControl: 'public, max-age=31536000, immutable',
  },

  // API responses
  apiResponses: {
    cacheControl: 'public, max-age=300, s-maxage=600',
  },

  // HTML pages
  htmlPages: {
    cacheControl: 'public, max-age=0, s-maxage=300',
  },
};

// Service Worker for caching
const serviceWorker = `
  self.addEventListener('fetch', event => {
    if (event.request.destination === 'image') {
      event.respondWith(
        caches.match(event.request).then(response => {
          return response || fetch(event.request);
        })
      );
    }
  });
`;
```

**Performance Monitoring:**

```javascript
// FCP monitoring
class FCPMonitor {
  constructor() {
    this.observeFCP();
  }

  observeFCP() {
    new PerformanceObserver(entryList => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (entry.name === 'first-contentful-paint') {
          this.reportFCP(entry.startTime);
        }
      });
    }).observe({ entryTypes: ['paint'] });
  }

  reportFCP(fcpTime) {
    // Send to analytics
    analytics.track('fcp', {
      value: fcpTime,
      rating: this.getRating(fcpTime),
    });
  }

  getRating(fcpTime) {
    if (fcpTime <= 1800) return 'good';
    if (fcpTime <= 3000) return 'needs-improvement';
    return 'poor';
  }
}

new FCPMonitor();
```

---

## Question 13: SSR vs CSR Performance

**Question:** When should you consider Server-Side Rendering (SSR) vs. Client-Side Rendering (CSR)?

**Answer:**

- **Use SSR for**: Content-focused websites where SEO and initial load time (FCP) are critical (e.g., e-commerce, news sites, marketing pages).
- **Use CSR for**: Highly interactive web applications (SaaS dashboards, accounting software) where the user experience after the initial load is the priority, and SEO is less critical. CSR is often simpler to develop and deploy.

**SSR Use Cases:**

```javascript
// E-commerce product page - SSR
export async function getServerSideProps({ params }) {
  const product = await fetchProduct(params.id);
  const reviews = await fetchReviews(params.id);

  return {
    props: {
      product,
      reviews,
      // Pre-render for SEO and fast FCP
      meta: {
        title: product.name,
        description: product.description,
        image: product.image,
      },
    },
  };
}

// News article - SSR
export async function getServerSideProps({ params }) {
  const article = await fetchArticle(params.slug);

  return {
    props: {
      article,
      // Critical for SEO
      meta: {
        title: article.title,
        description: article.excerpt,
        publishedTime: article.publishedAt,
      },
    },
  };
}
```

**CSR Use Cases:**

```javascript
// Dashboard application - CSR
function Dashboard() {
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // Load data after initial render
    fetchDashboardData(filters).then(setData);
  }, [filters]);

  return (
    <div>
      <FilterPanel onFilterChange={setFilters} />
      <DataVisualization data={data} />
      <InteractiveCharts data={data} />
    </div>
  );
}

// Admin panel - CSR
function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <UserList users={users} onSelect={setSelectedUser} />
      <UserEditor user={selectedUser} />
    </div>
  );
}
```

**Hybrid Approach (SSG + CSR):**

```javascript
// Static generation for content, CSR for interactivity
export async function getStaticProps() {
  const posts = await fetchPosts();

  return {
    props: { posts },
    revalidate: 3600, // Revalidate every hour
  };
}

function Blog({ posts }) {
  const [comments, setComments] = useState({});

  // Static content rendered at build time
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>

          {/* Interactive content loaded client-side */}
          <Comments
            postId={post.id}
            comments={comments[post.id]}
            onLoad={setComments}
          />
        </article>
      ))}
    </div>
  );
}
```

**Performance Comparison:**

```javascript
// SSR Performance
const ssrMetrics = {
  fcp: 800, // Fast - HTML sent immediately
  lcp: 1200, // Fast - content pre-rendered
  ttfb: 200, // Fast - server response
  fid: 50, // Good - minimal JS
  cls: 0.05, // Good - stable layout
  seo: 'excellent', // Perfect - content in HTML
};

// CSR Performance
const csrMetrics = {
  fcp: 2500, // Slow - JS must load first
  lcp: 3000, // Slow - content rendered after JS
  ttfb: 100, // Fast - static files
  fid: 200, // Poor - large JS bundle
  cls: 0.15, // Poor - layout shifts
  seo: 'poor', // Poor - no content in HTML
};
```

**Implementation Considerations:**

```javascript
// SSR Implementation
const ssrApp = {
  // Pros
  pros: [
    'Fast initial load',
    'Excellent SEO',
    'Social media sharing',
    'Accessibility',
    'Progressive enhancement',
  ],

  // Cons
  cons: [
    'Complex deployment',
    'Server costs',
    'Slower subsequent navigation',
    'Limited interactivity',
    'Hydration issues',
  ],
};

// CSR Implementation
const csrApp = {
  // Pros
  pros: [
    'Simple deployment',
    'Fast subsequent navigation',
    'Rich interactivity',
    'Offline capabilities',
    'Real-time updates',
  ],

  // Cons
  cons: [
    'Slow initial load',
    'Poor SEO',
    'Accessibility issues',
    'Large bundle size',
    'JavaScript required',
  ],
};
```

**Decision Matrix:**

```javascript
const decisionMatrix = {
  // Choose SSR when:
  ssr: {
    seo: 'critical',
    content: 'static',
    users: 'public',
    performance: 'initial-load',
    complexity: 'low',
  },

  // Choose CSR when:
  csr: {
    seo: 'not-important',
    content: 'dynamic',
    users: 'authenticated',
    performance: 'interaction',
    complexity: 'high',
  },

  // Choose hybrid when:
  hybrid: {
    seo: 'important',
    content: 'mixed',
    users: 'both',
    performance: 'balanced',
    complexity: 'medium',
  },
};
```
