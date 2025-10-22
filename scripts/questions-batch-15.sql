INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'dfd3ec97-030e-4263-ad40-86d7950d9f56',
          'How do you implement nested layouts in Next.js App Router?',
          'Create `layout.js` files in nested folders. Each layout wraps its child routes, enabling persistent UI like headers and sidebars.',
          'multiple-choice',
          'intermediate',
          7,
          NULL,
          NULL,
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
          '64ef4c2a-eb67-47e4-81de-d0e794aa112f',
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
          '8c6426d8-935c-4dff-915b-98b95e3dcb8c',
          'How do you handle dynamic routes in the App Router?',
          'Use dynamic segments like `app/users/[id]/page.js`. Fetch data using `params.id` in the Server Component.',
          'multiple-choice',
          'intermediate',
          7,
          NULL,
          NULL,
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
          '05cdad8f-09b7-4b3e-8d5a-d4e955a987b5',
          'What is the purpose of the `not-found.js` file?',
          '`not-found.js` defines a custom 404 page for a route segment when `notFound()` is thrown or a route doesn’t exist.',
          'multiple-choice',
          'intermediate',
          6,
          NULL,
          NULL,
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
          'b93e74b7-231b-48a7-8220-96e3ad2fd667',
          'How do you redirect in Next.js App Router?',
          'Use `redirect()` from `next/navigation` in Server Components, or `useRouter().push()` in Client Components.',
          'multiple-choice',
          'intermediate',
          7,
          NULL,
          NULL,
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
          '97fe0549-0a81-4541-9052-2720da0726a9',
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
          '7ef6cf3f-c516-41aa-983a-ca975b1480bb',
          'How does Next.js handle caching?',
          'Next.js extends `fetch()` with automatic caching, revalidation, and deduping. Use `cache`, `next.revalidate`, and `next.tags` options.',
          'multiple-choice',
          'advanced',
          9,
          NULL,
          NULL,
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
          '18c22303-bd90-4bc7-8972-5b73755a8c99',
          'What is on-demand revalidation in Next.js?',
          'On-demand revalidation allows you to purge cached data and regenerate pages after build time using `revalidateTag` or `revalidatePath`.',
          'multiple-choice',
          'advanced',
          8,
          NULL,
          NULL,
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
          'c2af0212-2124-4572-801d-9098a4be8778',
          'How do you implement middleware in Next.js?',
          'Create a `middleware.js` file in the root or route segment. It runs before requests and can rewrite, redirect, or add headers.',
          'multiple-choice',
          'intermediate',
          7,
          NULL,
          NULL,
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
          '879a52a6-4fb3-44f0-8f66-669423b1898f',
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
          'a6bcdeda-be93-44ef-91b9-a7bca54c1360',
          'How does Next.js optimize images?',
          'Next.js uses the `next/image` component to automatically optimize images (resize, compress, modern formats) and lazy-load them.',
          'multiple-choice',
          'intermediate',
          7,
          NULL,
          NULL,
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
          '711cca42-5360-4906-9e85-35693c8a51c5',
          'What is the difference between `next/image` and `next/future/image`?',
          '`next/future/image` was an experimental version in Next.js 12. It’s now stable and available as `next/image` in Next.js 13+.',
          'true-false',
          'intermediate',
          5,
          '[{"id":"a","text":"False","isCorrect":true,"explanation":""},{"id":"b","text":"True","isCorrect":false,"explanation":""}]',
          NULL,
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
          'a1fb1fdf-06f3-4d84-94c7-cc5622f7f92f',
          'Definition of Common Pattern',
          'What is the ''Common Pattern'' in JavaScript object creation?',
          'multiple-choice',
          'beginner',
          10,
          NULL,
          NULL,
          'It’s the simplest way of creating objects in JavaScript using object literals or basic functions. It involves manually defining properties and methods without abstraction.',
          NULL,
          ["Think about `{}` object literals.","No abstraction, no factories."],
          ARRAY['design-patterns','common-pattern','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-common-pattern-1","original_type":"open-ended","topic":"Common Pattern","subcategory":"","sample_answers":["It’s the simplest way of creating objects in JavaScript using object literals or basic functions.","It involves manually defining properties and methods without abstraction."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.203Z',
          '2025-10-15T00:47:17.204Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '9dfb2b43-d489-4886-938b-ca8c671b6711',
          'Code Output - Object Literal',
          'What will this code log?

```js
const user = {
  firstName: ''Alice'',
  lastName: ''Brown'',
  fullName: function() {
    return this.firstName + '' '' + this.lastName;
  }
};

console.log(user.fullName());
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Alice","isCorrect":false,"explanation":""},{"id":"b","text":"Brown","isCorrect":false,"explanation":""},{"id":"c","text":"Alice Brown","isCorrect":true,"explanation":""}]',
          NULL,
          'The correct answer is: Alice Brown',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-common-pattern-2","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.204Z',
          '2025-10-15T00:47:17.204Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c9e49f6b-4a88-477f-8622-f3af70da863b',
          'Pros of Common Pattern',
          'Which of the following are advantages of the Common Pattern?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Simple and easy to understand","isCorrect":true,"explanation":""},{"id":"b","text":"Minimal boilerplate code","isCorrect":true,"explanation":""},{"id":"c","text":"Great for small projects","isCorrect":true,"explanation":""},{"id":"d","text":"Highly scalable for large apps","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: Simple and easy to understand',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-common-pattern-3","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.204Z',
          '2025-10-15T00:47:17.204Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7529535c-fb31-4524-8adf-1ff1a323dde4',
          'Cons of Common Pattern',
          'What is a major drawback of the Common Pattern?',
          'multiple-choice',
          'beginner',
          10,
          NULL,
          NULL,
          'It doesn’t scale well because every object must be defined manually. Code duplication increases with many similar objects.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-common-pattern-4","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["It doesn’t scale well because every object must be defined manually.","Code duplication increases with many similar objects."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.204Z',
          '2025-10-15T00:47:17.204Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b09150ac-3d61-4fd6-8ce0-cd17d9681c40',
          'Repetition Problem',
          'Why might using the Common Pattern cause problems when creating many similar objects?',
          'multiple-choice',
          'intermediate',
          10,
          NULL,
          NULL,
          'Because you need to repeat the same properties and methods for each object. It leads to duplication and makes changes harder to maintain.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-common-pattern-5","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Because you need to repeat the same properties and methods for each object.","It leads to duplication and makes changes harder to maintain."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.204Z',
          '2025-10-15T00:47:17.204Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'feebf6b4-6671-4254-a680-83e75b6997b4',
          'Debugging Common Pattern',
          'Find the bug in this code:

```js
const car = {
  brand: ''Toyota'',
  model: ''Corolla'',
  getDetails: () => `${this.brand} ${this.model}`
};

console.log(car.getDetails());
```',
          'multiple-choice',
          'intermediate',
          10,
          NULL,
          NULL,
          'The arrow function doesn’t bind `this` properly, so `this.brand` and `this.model` are undefined. Use a regular function instead of an arrow function.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-common-pattern-6","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["The arrow function doesn’t bind `this` properly, so `this.brand` and `this.model` are undefined.","Use a regular function instead of an arrow function."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.204Z',
          '2025-10-15T00:47:17.204Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'dd4dd72a-eb0f-4bb9-a3fa-b44d83036fe9',
          'Best Use Case',
          'When is it appropriate to use the Common Pattern?',
          'multiple-choice',
          'intermediate',
          10,
          NULL,
          NULL,
          'For very small apps or scripts where only one or two objects are needed. When performance and scalability aren’t concerns.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-common-pattern-7","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["For very small apps or scripts where only one or two objects are needed.","When performance and scalability aren’t concerns."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.204Z',
          '2025-10-15T00:47:17.204Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd6fb7fe8-d263-40dd-a386-13a890e56af5',
          'Transition to Other Patterns',
          'Why do developers often move from the Common Pattern to the Factory Pattern or Constructor Pattern?',
          'multiple-choice',
          'advanced',
          10,
          NULL,
          NULL,
          'Because as applications grow, manually creating objects becomes repetitive and hard to maintain. Factories and constructors provide abstraction and scalability.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-common-pattern-8","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Because as applications grow, manually creating objects becomes repetitive and hard to maintain.","Factories and constructors provide abstraction and scalability."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.204Z',
          '2025-10-15T00:47:17.204Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e214b16b-14fb-4387-bb71-63f1cd013ea6',
          'Definition of Factory Pattern',
          'What is the Factory Pattern in JavaScript?',
          'multiple-choice',
          'beginner',
          10,
          NULL,
          NULL,
          'It’s a design pattern where a function (factory function) creates and returns objects without using the `new` keyword. It provides an abstraction for object creation.',
          NULL,
          [],
          ARRAY['design-patterns','factory-pattern','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-factory-pattern-9","original_type":"open-ended","topic":"Factory Pattern","subcategory":"","sample_answers":["It’s a design pattern where a function (factory function) creates and returns objects without using the `new` keyword.","It provides an abstraction for object creation."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'cd4f08cc-1110-4cda-9bc1-0769caed10e1',
          'Factory Pattern Example',
          'What will this code log?

```js
const createUser = ({ firstName, lastName, email }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
});

const user = createUser({ firstName: ''John'', lastName: ''Doe'', email: ''john@doe.com'' });

console.log(user.fullName());
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"undefined undefined","isCorrect":false,"explanation":""},{"id":"b","text":"John Doe","isCorrect":true,"explanation":""},{"id":"c","text":"[object Object]","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: John Doe',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-factory-pattern-10","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '4d3320cf-520d-4c60-be47-51a0f84e0e0d',
          'Pros of Factory Pattern',
          'Which of the following are benefits of using the Factory Pattern?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Encapsulation of object creation","isCorrect":true,"explanation":""},{"id":"b","text":"Easier to configure objects dynamically","isCorrect":true,"explanation":""},{"id":"c","text":"No need to repeat object structure","isCorrect":true,"explanation":""},{"id":"d","text":"Faster performance than constructors","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: Encapsulation of object creation',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-factory-pattern-11","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ca04c53f-7cb7-4d61-a30a-7de38be2561a',
          'Cons of Factory Pattern',
          'What is a major drawback of using the Factory Pattern in JavaScript?',
          'multiple-choice',
          'intermediate',
          10,
          NULL,
          NULL,
          'It can be less memory efficient since new objects are created each time without shared methods. May add unnecessary abstraction for simple cases.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-factory-pattern-12","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["It can be less memory efficient since new objects are created each time without shared methods.","May add unnecessary abstraction for simple cases."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6a51f6d5-6f0c-4bbc-ba52-9ac86c88400d',
          'When to Use',
          'When should the Factory Pattern be used instead of the Common Pattern?',
          'multiple-choice',
          'intermediate',
          10,
          NULL,
          NULL,
          'When creating many similar objects that need custom configurations. When object creation depends on environment or dynamic input.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-factory-pattern-13","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["When creating many similar objects that need custom configurations.","When object creation depends on environment or dynamic input."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '4e3bb983-be08-43fa-aff6-7a2559ce0c45',
          'Debugging Factory Pattern',
          'What is wrong with this code?

```js
const createCar = (brand, model) => {
  this.brand = brand;
  this.model = model;
  return { brand, model };
};

const car = createCar(''Toyota'', ''Corolla'');
console.log(car.brand);
```',
          'multiple-choice',
          'intermediate',
          10,
          NULL,
          NULL,
          'Using `this` inside a factory function doesn’t work as expected because factory functions don’t use `new`. The correct approach is just returning `{ brand, model }` without `this`.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-factory-pattern-14","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Using `this` inside a factory function doesn’t work as expected because factory functions don’t use `new`.","The correct approach is just returning `{ brand, model }` without `this`."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '5152e7c7-d3a9-4871-8239-4f2f756b53e9',
          'Comparison with Constructor Pattern',
          'How does the Factory Pattern differ from the Constructor Pattern in JavaScript?',
          'multiple-choice',
          'advanced',
          10,
          NULL,
          NULL,
          'Factory Pattern uses plain functions to return objects, while Constructor Pattern uses classes or functions with `new`. Factories don’t require `this` or `new` keyword.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-factory-pattern-15","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Factory Pattern uses plain functions to return objects, while Constructor Pattern uses classes or functions with `new`.","Factories don’t require `this` or `new` keyword."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '04877aed-a592-423a-864a-5cea28c80cf3',
          'Dynamic Factory Example',
          'What will this return?

```js
const createObjectFromArray = ([key, value]) => ({
  [key]: value,
});

console.log(createObjectFromArray(["name", "Alice"]));
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"{ key: \"name\", value: \"Alice\" }","isCorrect":false,"explanation":""},{"id":"b","text":"{ name: \"Alice\" }","isCorrect":true,"explanation":""},{"id":"c","text":"undefined","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: { name: "Alice" }',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-factory-pattern-16","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f8c292fa-fb11-4fa7-9dbc-99d5d3e7ecba',
          'Definition of Flyweight Pattern',
          'What is the Flyweight Pattern, and why is it useful?',
          'multiple-choice',
          'beginner',
          10,
          NULL,
          NULL,
          'It’s a structural design pattern that minimizes memory usage by sharing common object data instead of creating duplicates. It’s useful when creating a large number of similar objects, e.g., books with the same ISBN.',
          NULL,
          [],
          ARRAY['design-patterns','flyweight-pattern','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-flyweight-pattern-17","original_type":"open-ended","topic":"Flyweight Pattern","subcategory":"","sample_answers":["It’s a structural design pattern that minimizes memory usage by sharing common object data instead of creating duplicates.","It’s useful when creating a large number of similar objects, e.g., books with the same ISBN."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '16557c31-007c-4030-a46e-2aceb58328d6',
          'Flyweight Example Output',
          'What will this code log?

```js
console.log("Total amount of copies: ", bookList.length);
console.log("Total amount of books: ", isbnNumbers.size);
```
After adding 5 copies of 3 different books, what is the output?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Total amount of copies: 5, Total amount of books: 5","isCorrect":false,"explanation":""},{"id":"b","text":"Total amount of copies: 3, Total amount of books: 5","isCorrect":false,"explanation":""},{"id":"c","text":"Total amount of copies: 5, Total amount of books: 3","isCorrect":true,"explanation":""}]',
          NULL,
          'The correct answer is: Total amount of copies: 5, Total amount of books: 3',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-flyweight-pattern-18","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'cd8769bb-eceb-4488-ac1b-a1b67ddddbc6',
          'Advantages of Flyweight Pattern',
          'Which of the following are advantages of the Flyweight Pattern?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Reduced memory usage by reusing objects","isCorrect":true,"explanation":""},{"id":"b","text":"Improved performance for large-scale applications","isCorrect":true,"explanation":""},{"id":"c","text":"Simplifies debugging","isCorrect":false,"explanation":""},{"id":"d","text":"Reduces network latency","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: Reduced memory usage by reusing objects',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-flyweight-pattern-19","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ec66c397-948b-4311-9748-962867216675',
          'Disadvantages of Flyweight Pattern',
          'What is a drawback of using the Flyweight Pattern?',
          'multiple-choice',
          'intermediate',
          10,
          NULL,
          NULL,
          'It can increase code complexity by adding an extra layer of object management. Modern hardware often has enough memory, so the benefit may be negligible in many applications.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-flyweight-pattern-20","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["It can increase code complexity by adding an extra layer of object management.","Modern hardware often has enough memory, so the benefit may be negligible in many applications."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '9c7e0c98-68a2-47cc-ab3c-e2a8b5e6c1ad',
          'Flyweight vs Factory Pattern',
          'How does the Flyweight Pattern differ from the Factory Pattern?',
          'multiple-choice',
          'advanced',
          10,
          NULL,
          NULL,
          'Factory Pattern abstracts object creation, while Flyweight Pattern focuses on sharing existing objects to save memory. Factory decides *how* to create, Flyweight decides *whether to reuse*.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-flyweight-pattern-21","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Factory Pattern abstracts object creation, while Flyweight Pattern focuses on sharing existing objects to save memory.","Factory decides *how* to create, Flyweight decides *whether to reuse*."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c83e68aa-d3c3-4664-ac2d-aaa2e3f5ace0',
          'Fix the Bug',
          'What’s wrong with this implementation?

```js
const isbnNumbers = new Set();

const createBook = (title, author, isbn) => {
  const book = isbnNumbers.has(isbn);
  if (book) {
    return book;
  } else {
    const book = new Book(title, author, isbn);
    isbnNumbers.add(isbn);
    return book;
  }
};
```',
          'multiple-choice',
          'advanced',
          10,
          NULL,
          NULL,
          'The code incorrectly treats `isbnNumbers.has(isbn)` as the book object, but it returns a boolean. A `Map` or dictionary should be used to store ISBN → Book mappings, not just a `Set`.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-flyweight-pattern-22","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["The code incorrectly treats `isbnNumbers.has(isbn)` as the book object, but it returns a boolean.","A `Map` or dictionary should be used to store ISBN → Book mappings, not just a `Set`."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '781e7cfd-a41f-4303-ac30-3eac8c57d4d5',
          'When to Use Flyweight',
          'In which situation would the Flyweight Pattern be the best choice?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"When creating thousands of objects that share common properties","isCorrect":true,"explanation":""},{"id":"b","text":"When creating a single instance of a service","isCorrect":false,"explanation":""},{"id":"c","text":"When caching API responses","isCorrect":false,"explanation":""},{"id":"d","text":"When setting up event delegation in DOM","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: When creating thousands of objects that share common properties',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-flyweight-pattern-23","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ebc2dee3-72a5-4e48-8078-93a4099ed750',
          'Flyweight Pattern in Modern JS',
          'Why is the Flyweight Pattern considered less critical in modern JavaScript applications compared to older times?',
          'multiple-choice',
          'beginner',
          10,
          NULL,
          NULL,
          'Because modern devices have large amounts of memory (RAM), so optimizing object count is less often necessary. JavaScript engines also optimize memory allocation internally.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-flyweight-pattern-24","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Because modern devices have large amounts of memory (RAM), so optimizing object count is less often necessary.","JavaScript engines also optimize memory allocation internally."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '74c531c9-5da8-47fd-b7a7-d4c7fb2ca2d4',
          'Definition of Mediator Pattern',
          'What is the Mediator Pattern, and why is it useful?',
          'multiple-choice',
          'beginner',
          10,
          NULL,
          NULL,
          'It’s a behavioral design pattern that centralizes communication between objects instead of letting them reference each other directly. It reduces many-to-many relationships into one-to-many, improving code organization and reducing coupling.',
          NULL,
          [],
          ARRAY['design-patterns','mediator-pattern','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mediator-pattern-25","original_type":"open-ended","topic":"Mediator Pattern","subcategory":"","sample_answers":["It’s a behavioral design pattern that centralizes communication between objects instead of letting them reference each other directly.","It reduces many-to-many relationships into one-to-many, improving code organization and reducing coupling."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '18a3d88a-738e-4989-b534-af7a628d9de5',
          'Mediator Pattern Analogy',
          'Which analogy best describes the Mediator Pattern?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"A librarian managing which books readers can borrow","isCorrect":false,"explanation":""},{"id":"b","text":"An air traffic controller guiding planes so they don’t talk to each other directly","isCorrect":true,"explanation":""},{"id":"c","text":"A teacher grading exams","isCorrect":false,"explanation":""},{"id":"d","text":"A vending machine dispensing products","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: An air traffic controller guiding planes so they don’t talk to each other directly',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mediator-pattern-26","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '46d241ce-595e-429b-9dc0-2f9e613ceb2c',
          'Chatroom Example',
          'In the following code, how does the User class send messages?

```js
class User {
  constructor(name, chatroom) {
    this.name = name;
    this.chatroom = chatroom;
  }

  send(message) {
    this.chatroom.logMessage(this, message);
  }
}
```
',
          'multiple-choice',
          'intermediate',
          10,
          NULL,
          NULL,
          'The User calls the `send` method, which forwards the message to the mediator (`chatroom`) instead of directly to another user. The ChatRoom logs the message with the sender’s name and timestamp.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mediator-pattern-27","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["The User calls the `send` method, which forwards the message to the mediator (`chatroom`) instead of directly to another user.","The ChatRoom logs the message with the sender’s name and timestamp."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '5500c391-8014-497c-adde-fe1432e18718',
          'Express Middleware as Mediator',
          'How does Express.js middleware act as a mediator in the request-response cycle?',
          'multiple-choice',
          'intermediate',
          10,
          NULL,
          NULL,
          'Middleware functions act as mediators by receiving requests, modifying them, and passing them along to the next function in the chain. They centralize control, preventing each handler from directly depending on others.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mediator-pattern-28","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Middleware functions act as mediators by receiving requests, modifying them, and passing them along to the next function in the chain.","They centralize control, preventing each handler from directly depending on others."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '26eb1b70-5fb8-4d11-bfde-a604c1cac841',
          'Advantages of Mediator Pattern',
          'Which of the following are advantages of using the Mediator Pattern?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Reduces coupling between components","isCorrect":true,"explanation":""},{"id":"b","text":"Simplifies many-to-many relationships","isCorrect":true,"explanation":""},{"id":"c","text":"Always improves performance","isCorrect":false,"explanation":""},{"id":"d","text":"Provides a single point of communication","isCorrect":true,"explanation":""}]',
          NULL,
          'The correct answer is: Reduces coupling between components',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mediator-pattern-29","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '90778589-4083-4f2a-9476-90c0d3757b05',
          'Disadvantages of Mediator Pattern',
          'What is a potential disadvantage of the Mediator Pattern?',
          'multiple-choice',
          'intermediate',
          10,
          NULL,
          NULL,
          'The mediator can become a God Object if it grows too complex, containing too much business logic. It introduces an extra layer of indirection, which can make debugging harder.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mediator-pattern-30","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["The mediator can become a God Object if it grows too complex, containing too much business logic.","It introduces an extra layer of indirection, which can make debugging harder."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '69841705-e21b-414b-80d7-e1ff86787ba0',
          'Mediator vs Observer',
          'How does the Mediator Pattern differ from the Observer Pattern?',
          'multiple-choice',
          'advanced',
          10,
          NULL,
          NULL,
          'Observer Pattern is event-driven, where subscribers listen to changes. Mediator centralizes interactions by routing communication between participants. Mediator reduces direct object references, Observer reduces direct polling.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mediator-pattern-31","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Observer Pattern is event-driven, where subscribers listen to changes. Mediator centralizes interactions by routing communication between participants.","Mediator reduces direct object references, Observer reduces direct polling."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '72d9977b-6445-4999-b2b3-a83be9a5190d',
          'Debugging Middleware Flow',
          'Given this Express code:

```js
app.use(
  "/",
  (req, res, next) => {
    req.headers["test-header"] = 1234;
    next();
  },
  (req, res, next) => {
    console.log(`Request has test header: ${!!req.headers["test-header"]}`);
    next();
  }
);
```
What will the second middleware log?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Request has test header: false","isCorrect":false,"explanation":""},{"id":"b","text":"Request has test header: true","isCorrect":true,"explanation":""},{"id":"c","text":"Request has test header: undefined","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: Request has test header: true',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mediator-pattern-32","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ef15b2fd-9f93-4987-bbfb-80abf5396593',
          'Definition of Mixin Pattern',
          'What is the Mixin Pattern and why is it used?',
          'multiple-choice',
          'beginner',
          10,
          NULL,
          NULL,
          'A mixin is an object containing reusable functionality that can be added to another object or class without inheritance. It allows sharing behavior across classes without forming rigid inheritance hierarchies.',
          NULL,
          [],
          ARRAY['design-patterns','mixin-pattern','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mixin-pattern-33","original_type":"open-ended","topic":"Mixin Pattern","subcategory":"","sample_answers":["A mixin is an object containing reusable functionality that can be added to another object or class without inheritance.","It allows sharing behavior across classes without forming rigid inheritance hierarchies."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '740abe5c-33cf-40bf-ba94-01e6bc79e1b6',
          'Dog Example with Mixins',
          'Given the following code:

```js
class Dog {
  constructor(name) {
    this.name = name;
  }
}

const dogFunctionality = {
  bark: () => console.log("Woof!"),
  wagTail: () => console.log("Wagging my tail!"),
};

Object.assign(Dog.prototype, dogFunctionality);

const pet1 = new Dog("Daisy");
pet1.bark();
```
What will be logged when `pet1.bark()` is executed?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"undefined","isCorrect":false,"explanation":""},{"id":"b","text":"Woof!","isCorrect":true,"explanation":""},{"id":"c","text":"Error: bark is not a function","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: Woof!',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mixin-pattern-34","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '13abf17f-098a-46d0-a729-859130cd75ee',
          'Mixins vs Inheritance',
          'How does the Mixin Pattern differ from classical inheritance?',
          'multiple-choice',
          'intermediate',
          10,
          NULL,
          NULL,
          'Inheritance creates a parent-child relationship between classes, while mixins simply copy functionality into another class. Mixins allow horizontal code reuse across unrelated classes, inheritance enforces vertical hierarchy.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mixin-pattern-35","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Inheritance creates a parent-child relationship between classes, while mixins simply copy functionality into another class.","Mixins allow horizontal code reuse across unrelated classes, inheritance enforces vertical hierarchy."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a84c2c55-7b60-4e75-a3b6-8b3cb5a90827',
          'Chaining Mixins',
          'In the example with `animalFunctionality` and `dogFunctionality`, why does Dog end up with both `bark()` and `walk()` methods?',
          'multiple-choice',
          'intermediate',
          10,
          NULL,
          NULL,
          'Because `Object.assign(dogFunctionality, animalFunctionality)` merged animal methods into dogFunctionality, then `Object.assign(Dog.prototype, dogFunctionality)` added all methods to Dog’s prototype. This effectively chained multiple mixins together.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mixin-pattern-36","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Because `Object.assign(dogFunctionality, animalFunctionality)` merged animal methods into dogFunctionality, then `Object.assign(Dog.prototype, dogFunctionality)` added all methods to Dog’s prototype.","This effectively chained multiple mixins together."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2b0b8f02-934c-4bab-8412-075f51aa6363',
          'Real World Browser Example',
          'Which of the following are examples of mixins in the browser Window object?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"setTimeout and setInterval (from WindowOrWorkerGlobalScope)","isCorrect":true,"explanation":""},{"id":"b","text":"onbeforeunload (from WindowEventHandlers)","isCorrect":true,"explanation":""},{"id":"c","text":"document.querySelector","isCorrect":false,"explanation":""},{"id":"d","text":"console.log","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: setTimeout and setInterval (from WindowOrWorkerGlobalScope)',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mixin-pattern-37","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7b87fb37-cb9b-4e4f-b9d4-821eeca8d940',
          'Disadvantages of Mixins',
          'What are potential disadvantages of using Mixins?',
          'multiple-choice',
          'intermediate',
          10,
          NULL,
          NULL,
          'They can cause prototype pollution, making it unclear where a function originated. They can introduce naming conflicts if two mixins define the same property. In React, they added complexity, leading the team to recommend HOCs and Hooks instead.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mixin-pattern-38","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["They can cause prototype pollution, making it unclear where a function originated.","They can introduce naming conflicts if two mixins define the same property.","In React, they added complexity, leading the team to recommend HOCs and Hooks instead."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );