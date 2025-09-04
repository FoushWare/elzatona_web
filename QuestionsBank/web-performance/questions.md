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
