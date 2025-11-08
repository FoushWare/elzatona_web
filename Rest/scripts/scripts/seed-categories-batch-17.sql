INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '14932500-1e7f-499a-be19-09d6a1ad022b',
          'How do you handle loading states in the App Router?',
          'Use the `loading.js` file in a route segment to show a loading UI while data is being fetched. It works with React Suspense.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          '`loading.js` provides an instant loading UI without client-side JavaScript, improving perceived performance.',
          NULL,
          [],
          ARRAY['nextjs','loading-states','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next41-60-nextjs-q47","original_type":"open-ended","topic":"Loading States","subcategory":"","sample_answers":["Create `app/dashboard/loading.js` that exports a component. Next.js shows it immediately while the `page.js` data loads.","This is built on React Suspense—no need for `useState` or `useEffect` to manage loading states manually."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '800b330f-3a6c-46b5-8162-90c466df43fa',
          'What is the purpose of error.js in the App Router?',
          'The `error.js` file defines an error boundary for a route segment, catching errors in Server and Client Components and displaying a fallback UI.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It uses React error boundaries under the hood and can be reset with the `error.reset()` function.',
          NULL,
          [],
          ARRAY['nextjs','error-handling','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next41-60-nextjs-q48","original_type":"open-ended","topic":"Error Handling","subcategory":"","sample_answers":["`error.js` exports a Client Component that receives `error` and `reset` props. It catches errors in the route segment and lets users retry.","Unlike Pages Router, error boundaries are file-based and automatically scoped to the route."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'eb01ae48-c954-4e97-9b8e-50f9debd5ea2',
          'How do you implement nested layouts in Next.js App Router?',
          'Create `layout.js` files in nested folders. Each layout wraps its child routes, enabling persistent UI like headers and sidebars.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Layouts are Server Components by default and can fetch data. They persist across route changes, improving performance.',
          NULL,
          [],
          ARRAY['nextjs','layouts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next41-60-nextjs-q49","original_type":"open-ended","topic":"Layouts","subcategory":"","sample_answers":["In `app/dashboard/layout.js`, return a layout with a sidebar. All pages in `app/dashboard/` will be wrapped by it.","Layouts can be nested: `app/layout.js` → `app/dashboard/layout.js` → `app/dashboard/settings/page.js`."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'dc7a0666-2867-4abb-82ee-33da47344c8e',
          'What is the difference between `generateStaticParams` and `getStaticPaths`?',
          '`generateStaticParams` is used in App Router for dynamic routes with SSG. `getStaticPaths` is the Pages Router equivalent.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"`generateStaticParams`: App Router; `getStaticPaths`: Pages Router","isCorrect":true,"explanation":""},{"id":"b","text":"They are the same function","isCorrect":false,"explanation":""},{"id":"c","text":"`getStaticPaths` works in App Router","isCorrect":false,"explanation":""},{"id":"d","text":"`generateStaticParams` is for SSR","isCorrect":false,"explanation":""}]',
          NULL,
          'Both define which dynamic routes to pre-render at build time.',
          NULL,
          [],
          ARRAY['nextjs','static-site-generation-(ssg)','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next41-60-nextjs-q50","original_type":"multiple-choice","topic":"Static Site Generation (SSG)","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '511879fb-363d-4f73-8d31-2d592dbee28b',
          'How do you handle dynamic routes in the App Router?',
          'Use dynamic segments like `app/users/[id]/page.js`. Fetch data using `params.id` in the Server Component.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The `params` object is passed to `page.js`, `layout.js`, and other route handlers automatically.',
          NULL,
          [],
          ARRAY['nextjs','dynamic-routes','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next41-60-nextjs-q51","original_type":"open-ended","topic":"Dynamic Routes","subcategory":"","sample_answers":["Create `app/blog/[slug]/page.js`. The `slug` is available via `params.slug` in the component: `export default async function Page({ params }) { ... }`","Use `generateStaticParams` to pre-render dynamic routes at build time for SSG."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '1a473de7-647a-4933-865c-4bfec40c5f46',
          'What is the purpose of the `not-found.js` file?',
          '`not-found.js` defines a custom 404 page for a route segment when `notFound()` is thrown or a route doesn’t exist.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It’s the App Router equivalent of `pages/404.js` but scoped to route segments.',
          NULL,
          [],
          ARRAY['nextjs','error-handling','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next41-60-nextjs-q52","original_type":"open-ended","topic":"Error Handling","subcategory":"","sample_answers":["Create `app/not-found.js` for a global 404, or `app/blog/not-found.js` for blog-specific 404s.","Call `notFound()` from `next/navigation` in a Server Component to trigger it programmatically."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e23bb8bc-7ace-4445-bc50-58b61dff0477',
          'How do you redirect in Next.js App Router?',
          'Use `redirect()` from `next/navigation` in Server Components, or `useRouter().push()` in Client Components.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          '`redirect()` is for server-side redirects (e.g., auth checks); `useRouter` is for client-side navigation.',
          NULL,
          [],
          ARRAY['nextjs','redirects','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next41-60-nextjs-q53","original_type":"open-ended","topic":"Redirects","subcategory":"","sample_answers":["In a Server Component: `import { redirect } from ''next/navigation''; if (!user) redirect(''/login'');`","In a Client Component: `const router = useRouter(); router.push(''/dashboard'');`"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ad3c6ab7-19a2-4569-a548-78d43c15e392',
          'What is the `useRouter` hook used for?',
          '`useRouter` provides client-side navigation methods like `push`, `replace`, and `refresh` in Client Components.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Client-side navigation in Client Components","isCorrect":true,"explanation":""},{"id":"b","text":"Data fetching in Server Components","isCorrect":false,"explanation":""},{"id":"c","text":"Server-side redirects","isCorrect":false,"explanation":""},{"id":"d","text":"Only works in Pages Router","isCorrect":false,"explanation":""}]',
          NULL,
          'It’s the App Router equivalent of `next/router` but with the same API.',
          NULL,
          [],
          ARRAY['nextjs','client-side-navigation','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next41-60-nextjs-q54","original_type":"multiple-choice","topic":"Client-Side Navigation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '1cc2ac1b-deb0-4a14-9e69-ce44a54e8ec1',
          'How does Next.js handle caching?',
          'Next.js extends `fetch()` with automatic caching, revalidation, and deduping. Use `cache`, `next.revalidate`, and `next.tags` options.',
          'multiple-choice',
          'advanced',
          9,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Caching is opt-in via `fetch` options, replacing `getStaticProps`/`getServerSideProps`.',
          NULL,
          [],
          ARRAY['nextjs','caching','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next41-60-nextjs-q55","original_type":"open-ended","topic":"Caching","subcategory":"","sample_answers":["`fetch(url, { next: { revalidate: 60 } })` caches for 60 seconds. `fetch(url, { cache: ''no-store'' })` disables caching for SSR.","Use `tags` for on-demand revalidation: `fetch(url, { next: { tags: [''posts''] } })` then `revalidateTag(''posts'')` in an API route."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0ab87460-b510-4a11-ae33-a02c3c5a4181',
          'What is on-demand revalidation in Next.js?',
          'On-demand revalidation allows you to purge cached data and regenerate pages after build time using `revalidateTag` or `revalidatePath`.',
          'multiple-choice',
          'advanced',
          8,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It’s the App Router equivalent of ISR but triggered manually via API routes or webhooks.',
          NULL,
          [],
          ARRAY['nextjs','incremental-static-regeneration','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next41-60-nextjs-q56","original_type":"open-ended","topic":"Incremental Static Regeneration","subcategory":"","sample_answers":["Tag a `fetch` with `next: { tags: [''product-123''] }`. Later, call `revalidateTag(''product-123'')` in an API route to update the page.","Useful for CMS webhooks, e-commerce inventory updates, or admin actions that require immediate content refresh."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '95746916-195b-4c8f-94c6-6659910b6f59',
          'How do you implement middleware in Next.js?',
          'Create a `middleware.js` file in the root or route segment. It runs before requests and can rewrite, redirect, or add headers.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Middleware is ideal for authentication, A/B testing, i18n, and bot protection.',
          NULL,
          [],
          ARRAY['nextjs','middleware','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next41-60-nextjs-q57","original_type":"open-ended","topic":"Middleware","subcategory":"","sample_answers":["```js\nexport { default } from ''next-auth/middleware'';\nexport const config = { matcher: [''/dashboard/:path*''] };\n```","Use `NextRequest` to inspect cookies, headers, or URL, then `NextResponse.rewrite()` or `redirect()` as needed."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '508d62fa-1a6b-433a-8373-23cf2a2bdfca',
          'What is the purpose of `next.config.js`?',
          '`next.config.js` customizes Next.js build settings like Webpack, Babel, environment variables, and experimental features.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Customize Webpack, Babel, env vars, and experimental features","isCorrect":true,"explanation":""},{"id":"b","text":"Required for every Next.js app","isCorrect":false,"explanation":""},{"id":"c","text":"Only for CSS configuration","isCorrect":false,"explanation":""},{"id":"d","text":"Replaces package.json","isCorrect":false,"explanation":""}]',
          NULL,
          'It’s optional but powerful for advanced customization without ejecting.',
          NULL,
          [],
          ARRAY['nextjs','next.js-configuration','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next41-60-nextjs-q58","original_type":"multiple-choice","topic":"Next.js Configuration","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '9ca44d4f-963e-47ca-8069-c0ba6bbd4c3e',
          'How does Next.js optimize images?',
          'Next.js uses the `next/image` component to automatically optimize images (resize, compress, modern formats) and lazy-load them.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It reduces bandwidth, improves LCP, and prevents layout shift with automatic sizing.',
          NULL,
          [],
          ARRAY['nextjs','image-optimization','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next41-60-nextjs-q59","original_type":"open-ended","topic":"Image Optimization","subcategory":"","sample_answers":["`next/image` serves optimized WebP/AVIF, resizes based on device, and lazy-loads offscreen images—no config needed.","It integrates with CDNs and local file storage, and supports blur-up placeholders."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '54e04bfe-9b62-453e-ac71-2ae2aa73d23b',
          'What is the difference between `next/image` and `next/future/image`?',
          '`next/future/image` was an experimental version in Next.js 12. It’s now stable and available as `next/image` in Next.js 13+.',
          'true-false',
          'intermediate',
          5,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          'As of Next.js 13, `next/image` is the stable, recommended component.',
          NULL,
          [],
          ARRAY['nextjs','image-optimization','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next41-60-nextjs-q60","original_type":"true-false","topic":"Image Optimization","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '4d742449-cda6-4a49-b607-1feaf862be84',
          'What is Bundle Splitting?',
          '### Bundle Splitting
Bundle Splitting is a performance optimization technique that divides a large JavaScript bundle into smaller chunks. Instead of loading one huge file containing all code (even unused code), the application loads only what’s required for the current view.

**Example:**
Splitting `main.bundle.js` into `main.bundle.js` and `emoji-picker.bundle.js` reduces initial load time by fetching less data.

**Why it matters:**
- Reduces time to First Contentful Paint (FCP) and Largest Contentful Paint (LCP)
- Decreases loading and execution time
- Improves Time To Interactive (TTI)

**Goal:** Deliver visible and interactive content to the user faster by minimizing unnecessary code loading.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Bundle Splitting divides a large JavaScript file into smaller bundles so the browser loads only necessary code for the current route or view, improving load performance.',
          NULL,
          [],
          ARRAY['performance-patterns','bundle-splitting','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-bundle-splitting-pp1","original_type":"open-ended","topic":"Bundle Splitting","subcategory":"","sample_answers":["Bundle Splitting divides a large JavaScript file into smaller bundles so the browser loads only necessary code for the current route or view, improving load performance."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ed008e8f-3f5e-4c57-9b99-dcb009c60efa',
          'What are the main benefits of Bundle Splitting?',
          'Select all benefits that result from splitting your bundle into smaller chunks.',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"o1","text":"Reduced time to First Contentful Paint (FCP)","isCorrect":true,"explanation":""},{"id":"o2","text":"Reduced Time To Interactive (TTI)","isCorrect":true,"explanation":""},{"id":"o3","text":"Larger initial download size","isCorrect":false,"explanation":""},{"id":"o4","text":"Improved perceived performance on slower networks","isCorrect":true,"explanation":""}]',
          NULL,
          'Splitting bundles reduces loading and execution times, improving FCP, LCP, and TTI metrics—especially for low-end devices or slow networks.',
          NULL,
          [],
          ARRAY['performance-patterns','bundle-splitting','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-bundle-splitting-pp2","original_type":"multiple-choice","topic":"Bundle Splitting","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '951aaccb-953a-4ad0-bae1-6ec4faa87c10',
          'True or False: Bundle Splitting reduces the total amount of JavaScript your app needs to execute.',
          'Evaluate this statement based on the performance pattern.',
          'true-false',
          'beginner',
          10,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          'The correct answer is: False',
          NULL,
          [],
          ARRAY['performance-patterns','bundle-splitting','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-bundle-splitting-pp3","original_type":"true-false","topic":"Bundle Splitting","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c78970f6-d746-4eca-8826-d553a68ac39d',
          'Which performance metrics are most directly improved by Bundle Splitting?',
          'Identify which performance metrics benefit most from applying bundle splitting.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"m1","text":"First Contentful Paint (FCP)","isCorrect":true,"explanation":""},{"id":"m2","text":"Largest Contentful Paint (LCP)","isCorrect":true,"explanation":""},{"id":"m3","text":"Cumulative Layout Shift (CLS)","isCorrect":false,"explanation":""},{"id":"m4","text":"Time To Interactive (TTI)","isCorrect":true,"explanation":""}]',
          NULL,
          'FCP, LCP, and TTI improve as less code needs to be parsed and executed before meaningful content appears.',
          NULL,
          [],
          ARRAY['performance-patterns','bundle-splitting','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-bundle-splitting-pp4","original_type":"multiple-choice","topic":"Bundle Splitting","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7f187cbc-2233-4e1b-a6f9-32d20350b897',
          'What problem does Bundle Splitting aim to solve?',
          '### Problem Description
Large bundles can delay the time it takes before the browser paints the first visible content and becomes interactive. Even unused code has to be downloaded and parsed before rendering.

**Question:**
What core issue does bundle splitting address in modern web applications?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Bundle splitting addresses slow load times caused by downloading and parsing large monolithic bundles that contain code not needed on initial render.',
          NULL,
          [],
          ARRAY['performance-patterns','bundle-splitting','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-bundle-splitting-pp5","original_type":"open-ended","topic":"Bundle Splitting","subcategory":"","sample_answers":["Bundle splitting addresses slow load times caused by downloading and parsing large monolithic bundles that contain code not needed on initial render."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '73e34f9b-8577-4ad3-82cb-deb0a56c3955',
          'Which of the following statements best describes Time To Interactive (TTI)?',
          'Select the correct definition for TTI in the context of performance patterns.',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"c1","text":"The time it takes for all content to be painted and interactive after the bundle loads","isCorrect":true,"explanation":""},{"id":"c2","text":"The time between a user''s first input and a response","isCorrect":false,"explanation":""},{"id":"c3","text":"The time it takes to fetch the HTML document from the server","isCorrect":false,"explanation":""},{"id":"c4","text":"The total JavaScript execution time","isCorrect":false,"explanation":""}]',
          NULL,
          'TTI measures how long it takes for the page to become fully interactive, which bundle splitting helps improve by reducing load and execution time.',
          NULL,
          [],
          ARRAY['performance-patterns','time-to-interactive','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-bundle-splitting-pp6","original_type":"multiple-choice","topic":"Time To Interactive","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '8fe1eb8f-004f-4b83-9484-38e997be404e',
          'What is the main purpose of JavaScript compression?',
          'JavaScript compression reduces the size of scripts to improve transfer, load, and execution time over the network.',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Compression minimizes script size, making downloads faster and reducing network bandwidth usage.',
          NULL,
          [],
          ARRAY['performance-patterns','web-performance-optimization','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-compression-1","original_type":"mcq","topic":"Web Performance Optimization","subcategory":"","sample_answers":["To reduce file size and improve loading performance"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '67a55ab4-6f7f-4f9f-98a7-df02ff0907db',
          'Which compression algorithms are most commonly used for JavaScript?',
          'The two most common compression algorithms used for HTTP and JavaScript data are Gzip and Brotli.',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Modern browsers widely support Gzip and Brotli for compressing text-based assets like JavaScript, HTML, and CSS.',
          NULL,
          [],
          ARRAY['performance-patterns','compression-algorithms','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-compression-2","original_type":"mcq","topic":"Compression Algorithms","subcategory":"","sample_answers":["Gzip and Brotli"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2a3a2cdb-8955-44b6-8973-9403ca14d405',
          'Which compression algorithm provides better compression ratios?',
          'Brotli typically provides smaller file sizes compared to Gzip at similar compression levels.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Brotli achieves denser compression through context modeling and larger dictionary windows, reducing file size effectively.',
          NULL,
          [],
          '["performance-patterns","compression-comparison",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-compression-3","original_type":"mcq","topic":"Compression Comparison","subcategory":"","sample_answers":["Brotli has a better compression ratio at similar levels"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ef8abc0c-4a53-4fec-a974-df2e275e27ac',
          'What is the difference between lossy and lossless compression?',
          'Lossy compression slightly alters files while maintaining usability, while lossless compression preserves data exactly.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'JavaScript requires lossless compression to preserve code integrity during compression and decompression.',
          NULL,
          [],
          '["performance-patterns","compression-types",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-compression-4","original_type":"mcq","topic":"Compression Types","subcategory":"","sample_answers":["Lossy slightly changes files; lossless preserves them exactly"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c7299981-37d8-4f01-9886-92d52b2671fb',
          'Which compression type should be used for JavaScript files?',
          'JavaScript should always use lossless compression to ensure code runs correctly after decompression.',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Since JavaScript must remain valid after compression, only lossless algorithms like Brotli or Gzip should be used.',
          NULL,
          [],
          ARRAY['performance-patterns','compression-best-practices','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-compression-5","original_type":"mcq","topic":"Compression Best Practices","subcategory":"","sample_answers":["Lossless compression"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2f7fde8f-bf99-418d-be66-926ec539f250',
          'What does minification do before compression?',
          'Minification removes unnecessary syntax like spaces, comments, and line breaks to reduce file size.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Minification optimizes code before compression, enabling smaller payloads without changing functionality.',
          NULL,
          [],
          '["performance-patterns","minification",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-compression-6","original_type":"mcq","topic":"Minification","subcategory":"","sample_answers":["Removes unnecessary syntax to shrink file size"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2c70514e-2380-4656-b13a-276bdb638df6',
          'What is static compression?',
          'Static compression pre-compresses resources at build time for better download performance of infrequently changing files.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Static compression is ideal for files that rarely change, improving transfer speeds without runtime cost.',
          NULL,
          [],
          '["performance-patterns","compression-types",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-compression-7","original_type":"mcq","topic":"Compression Types","subcategory":"","sample_answers":["Pre-compressing files during build time"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b8472b51-c0c1-4665-ba53-8fbfd93a096a',
          'What is dynamic compression?',
          'Dynamic compression happens at runtime when the browser requests a resource, compressing it on the fly.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Dynamic compression is used for frequently changing content, balancing CPU time with real-time optimization.',
          NULL,
          [],
          '["performance-patterns","http-compression",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-compression-8","original_type":"mcq","topic":"HTTP Compression","subcategory":"","sample_answers":["Compression applied during runtime on request"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '5484a541-9cd0-448f-8a77-0766a5857f78',
          'Which Webpack plugin enables Brotli compression?',
          'You can use the BrotliWebpackPlugin in Webpack to enable Brotli compression for bundled assets.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Webpack supports Brotli through BrotliWebpackPlugin, enabling efficient compression of assets for production builds.',
          NULL,
          [],
          '["performance-patterns","webpack-configuration",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-compression-9","original_type":"mcq","topic":"Webpack Configuration","subcategory":"","sample_answers":["BrotliWebpackPlugin"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b7f8f306-a009-4f23-bf4f-7fe06e7d141f',
          'What trade-off does bundle granularity create in compression?',
          'Smaller chunks improve caching but reduce compression efficiency, while larger chunks compress better but cache less effectively.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'This is the granularity trade-off: compression efficiency and caching benefits often compete in bundle optimization.',
          NULL,
          [],
          '["performance-patterns","granularity-trade-off",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-compression-10","original_type":"mcq","topic":"Granularity Trade-off","subcategory":"","sample_answers":["Smaller chunks cache better, larger compress better"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'bfec9129-d01f-48df-bcf7-bc19522eb86d',
          'What problem does dynamic import solve in the chat application example?',
          'Dynamic import prevents loading unnecessary modules like EmojiPicker on the initial render, reducing bundle size and improving load performance.',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Dynamic imports allow you to load components only when needed, reducing initial bundle size and improving first render speed.',
          NULL,
          [],
          ARRAY['performance-patterns','code-splitting-and-lazy-loading','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-dynamic-import-11","original_type":"mcq","topic":"Code Splitting and Lazy Loading","subcategory":"","sample_answers":["It avoids unnecessary loading of non-critical modules"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2f7ee8ab-fcfb-4a18-9200-ae2f93f744cb',
          'How does React Suspense help in dynamic importing?',
          'React Suspense allows components to wait for a dynamically imported module to load, showing a fallback while loading.',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Suspense provides a fallback UI while waiting for the dynamically imported component to be fetched and rendered.',
          NULL,
          [],
          ARRAY['performance-patterns','react-suspense','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-dynamic-import-12","original_type":"mcq","topic":"React Suspense","subcategory":"","sample_answers":["It renders a fallback while a lazy component loads"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '930cdbcc-80fe-4373-9290-281a78e079c8',
          'Which React function is used to dynamically import components?',
          'React.lazy is used to dynamically import components at runtime.',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          '`React.lazy(() => import(''./Component''))` loads a component only when it is rendered for the first time.',
          NULL,
          [],
          ARRAY['performance-patterns','react-lazy-loading','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-dynamic-import-13","original_type":"mcq","topic":"React Lazy Loading","subcategory":"","sample_answers":["React.lazy"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '1af00aad-1d8a-4ce2-8175-d7551e429660',
          'How much was the bundle size reduced by using dynamic import for EmojiPicker?',
          'By dynamically importing EmojiPicker, the initial bundle size was reduced from 1.5 MiB to 1.33 MiB.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The example reduced the main bundle from 1.5 MiB to 1.33 MiB by deferring the loading of EmojiPicker.',
          NULL,
          [],
          '["performance-patterns","bundle-optimization",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-dynamic-import-14","original_type":"mcq","topic":"Bundle Optimization","subcategory":"","sample_answers":["From 1.5 MiB to 1.33 MiB"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'cf679e48-bb92-45f7-ad00-6b3bdc338e72',
          'When is the EmojiPicker component actually loaded in the dynamic import example?',
          'EmojiPicker is loaded only when the user clicks on the emoji icon, triggering the lazy import.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The lazy import ensures that the module is fetched and executed only upon user interaction with the emoji button.',
          NULL,
          [],
          '["performance-patterns","lazy-loading-behavior",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-dynamic-import-15","original_type":"mcq","topic":"Lazy Loading Behavior","subcategory":"","sample_answers":["Only when the emoji button is clicked"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '043b1bce-610c-437c-9e20-378866b3ff17',
          'What is the purpose of the fallback prop in Suspense?',
          'The fallback prop defines what should be rendered while a component is being dynamically loaded.',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Suspense uses the fallback UI (like a loader or placeholder) until the lazy component finishes loading.',
          NULL,
          [],
          ARRAY['performance-patterns','react-suspense-fallback','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-dynamic-import-16","original_type":"mcq","topic":"React Suspense Fallback","subcategory":"","sample_answers":["Displays content while waiting for lazy component"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2845bbd9-6cbb-4f37-8171-388dabc586f0',
          'Why is React Suspense not ideal for server-side rendering (SSR)?',
          'React Suspense currently lacks SSR support, meaning lazy-loaded components can’t be pre-rendered on the server.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Suspense currently only supports client-side rendering; SSR requires libraries like `@loadable/component` to manage lazy imports.',
          NULL,
          [],
          '["performance-patterns","ssr-limitation",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-dynamic-import-17","original_type":"mcq","topic":"SSR Limitation","subcategory":"","sample_answers":["Because Suspense can’t yet stream server-rendered lazy components"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '57597278-2422-4417-bdef-5a45abdb1ca8',
          'What library is recommended for dynamic imports in SSR applications?',
          'The loadable-components library is recommended for SSR applications since React Suspense does not yet support SSR.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The `@loadable/component` library provides a Suspense-like API compatible with both SSR and CSR environments.',
          NULL,
          [],
          '["performance-patterns","ssr-alternatives",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-dynamic-import-18","original_type":"mcq","topic":"SSR Alternatives","subcategory":"","sample_answers":["@loadable/component"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0b33d14a-0e81-423b-bf77-92f396fe106e',
          'What happens while a lazy-loaded module is still being fetched?',
          'The fallback component (e.g., a loading message) is rendered until the lazy-loaded component is ready.',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'A fallback placeholder keeps the UI responsive and visually communicates that the module is still loading.',
          NULL,
          [],
          ARRAY['performance-patterns','user-experience','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-dynamic-import-19","original_type":"mcq","topic":"User Experience","subcategory":"","sample_answers":["The fallback component displays temporarily"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '178eeacf-9545-4174-9514-c056ca6ed7c9',
          'Why does dynamic import improve the user experience?',
          'It lets the app load faster by deferring non-critical resources, making the UI interactive sooner.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'By deferring low-priority code, dynamic imports shorten Time to Interactive (TTI) and improve perceived performance.',
          NULL,
          [],
          '["performance-patterns","performance-ux",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-dynamic-import-20","original_type":"mcq","topic":"Performance UX","subcategory":"","sample_answers":["It reduces initial bundle size and improves interactivity"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '1cdf2c72-3b51-480f-b18b-03969425b95c',
          'What is the main goal of the Import On Interaction pattern?',
          'Import On Interaction delays the loading of non-critical resources until the user interacts with the UI element that requires them, improving page load performance.',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The Import On Interaction pattern improves load performance by deferring loading of non-critical JavaScript until a user interacts with a relevant element.',
          NULL,
          [],
          ARRAY['performance-patterns','lazy-loading','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-import-on-interaction-1","original_type":"mcq","topic":"Lazy Loading","subcategory":"","sample_answers":["To lazy-load non-critical resources when needed"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '19c5c886-7239-4576-a8b7-bfedf58edb31',
          'Which user actions typically trigger Import On Interaction?',
          'The pattern can be triggered when a user clicks, scrolls into view, or when the browser is idle.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The pattern optimizes performance by waiting for direct user interactions or idle time before loading heavy resources.',
          NULL,
          [],
          '["performance-patterns","user-interaction-events",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-import-on-interaction-2","original_type":"mcq","topic":"User Interaction Events","subcategory":"","sample_answers":["On user click, scroll, or idle time"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '4a088c4d-fdc1-4033-add7-59bd7d306796',
          'What is a facade in Import On Interaction?',
          'A facade is a lightweight placeholder or preview that mimics a heavy component until the user interacts with it.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'A facade prevents heavy resources from loading immediately by displaying a placeholder (like a thumbnail or fake button) until the user interacts.',
          NULL,
          [],
          '["performance-patterns","facades-and-placeholders",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-import-on-interaction-3","original_type":"mcq","topic":"Facades and Placeholders","subcategory":"","sample_answers":["A placeholder element shown before real content loads"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a63ad96f-c86d-4fa9-8a0d-0deecbec4dd9',
          'What problem does Import On Interaction solve with third-party scripts?',
          'Third-party scripts can block rendering or hydration. Import On Interaction delays their load until user interaction.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'By loading third-party scripts only when needed, the main thread remains available for critical tasks like rendering and user input.',
          NULL,
          [],
          '["performance-patterns","third-party-script-optimization",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-import-on-interaction-4","original_type":"mcq","topic":"Third-Party Script Optimization","subcategory":"","sample_answers":["It defers non-critical third-party scripts until needed"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a0393691-4b4b-4df2-81d0-e34a96478eb6',
          'Which metrics can Import On Interaction improve?',
          'By reducing blocking resources, it improves First Input Delay (FID), Total Blocking Time (TBT), and Time to Interactive (TTI).',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Deferring heavy scripts helps the browser respond to user input faster, improving FID, TBT, and TTI metrics.',
          NULL,
          [],
          '["performance-patterns","web-vitals",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-import-on-interaction-5","original_type":"mcq","topic":"Web Vitals","subcategory":"","sample_answers":["First Input Delay (FID), Total Blocking Time (TBT), Time to Interactive (TTI)"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f9e9b76b-9a22-4b5c-8874-c84038ac5386',
          'Which JavaScript feature enables dynamic Import On Interaction?',
          'The dynamic `import()` function allows modules to be loaded only when needed.',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Dynamic `import()` returns a promise and can load modules lazily, which is ideal for import-on-interaction use cases.',
          NULL,
          [],
          ARRAY['performance-patterns','dynamic-imports','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-import-on-interaction-6","original_type":"mcq","topic":"Dynamic Imports","subcategory":"","sample_answers":["dynamic import()"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7bc49ec2-234d-4612-a5e3-b4431c9ee122',
          'How does React support Import On Interaction?',
          'React supports lazy-loading components using React.lazy and Suspense, or by dynamically importing a component on user interaction.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'React’s `lazy()` and `Suspense` make it easy to defer loading non-critical components until interaction occurs.',
          NULL,
          [],
          '["performance-patterns","react-lazy-loading",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-import-on-interaction-7","original_type":"mcq","topic":"React Lazy Loading","subcategory":"","sample_answers":["Using React.lazy and Suspense or dynamic import on click"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'caa14c90-940c-4ebf-adad-78f01c57f589',
          'What trade-off can occur with Import On Interaction?',
          'Users may experience a delay after clicking while the script loads if the resource is large or network is slow.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'While the page loads faster initially, there might be a small delay when the resource is fetched on demand.',
          NULL,
          [],
          '["performance-patterns","performance-trade-offs",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-import-on-interaction-8","original_type":"mcq","topic":"Performance Trade-offs","subcategory":"","sample_answers":["Possible delay after user interaction"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd3ce81c1-3d1b-48b0-8275-769d2b1b84f8',
          'What is an example of Import On Interaction in Google Docs?',
          'Google Docs loads the 500KB share feature script only when the user clicks the Share button.',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Google Docs defers loading large non-critical scripts until the user actually interacts with the Share feature.',
          NULL,
          [],
          ARRAY['performance-patterns','real-world-example','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-import-on-interaction-9","original_type":"mcq","topic":"Real World Example","subcategory":"","sample_answers":["It loads the share feature dynamically on click"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '28e04926-0816-4609-969b-a5ed14d7b91f',
          'What is a common use case for Import On Interaction with third-party widgets?',
          'Loading chat widgets, video players, or authentication SDKs only after user interaction to save initial load time.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Deferring third-party widget code until interaction avoids blocking critical rendering and reduces main-thread congestion.',
          NULL,
          [],
          '["performance-patterns","third-party-optimization",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-import-on-interaction-10","original_type":"mcq","topic":"Third-Party Optimization","subcategory":"","sample_answers":["Lazy-loading non-critical third-party widgets"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );;