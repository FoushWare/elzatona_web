-- Batch 30: Questions 291-300 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What are the usecases of useLayoutEffect?',
    '<pre><code>      useLayoutEffect(() =&gt; {
        const width = divRef.current.offsetWidth;
        if (width &lt; 400) {
          divRef.current.style.background = &#039;blue&#039;; // prevents flicker
        }
      }, []);</code></pre>

You need to use `useLayoutEffect` when your effect **must run before the browser paints**, such as:

      *   **Reading layout measurements** (e.g., element size, scroll position)
      *   **Synchronously applying DOM styles** to prevent visual flicker
      *   **Animating layout or transitions**
      *   **Integrating with third-party libraries** that require DOM manipulation

      If there''s no visual or layout dependency, prefer `useEffect` — it''s more performance-friendly.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You need to use `useLayoutEffect` when your effect **must run before the browser paints**, such as:

      *   **Reading layout measurements** (e.g., element size, scroll position)
      *   **Synchronously applying DOM styles** to prevent visual flicker
      *   **Animating layout or transitions**
      *   **Integrating with third-party libraries** that require DOM manipulation

      If there''s no visual or layout dependency, prefer `useEffect` — it''s more performance-friendly.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":291}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How does useLayoutEffect work during server-side rendering (SSR)?',
    '<pre><code>      const useIsomorphicLayoutEffect =
        typeof window !== &#039;undefined&#039; ? useLayoutEffect : useEffect;</code></pre>

The `useLayoutEffect` hook does **not run on the server**, because there is no DOM. React issues a warning in server environments like Next.js if `useLayoutEffect` is used directly.

     This can be mitigated using a conditional polyfill:


      i.e, Use `useIsomorphicLayoutEffect` in components that render both on client and server.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `useLayoutEffect` hook does **not run on the server**, because there is no DOM. React issues a warning in server environments like Next.js if `useLayoutEffect` is used directly.

     This can be mitigated using a conditional polyfill:


      i.e, Use `useIsomorphicLayoutEffect` in components that render both on client and server.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":292}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What happens if you use useLayoutEffect for non-layout logic?',
    '<pre><code>      useLayoutEffect(() =&gt; {
        console.log(&quot;Tracking analytics&quot;);
        fetch(&#039;/log-page-view&#039;);
      }, []);</code></pre>

Using `useLayoutEffect` for logic **unrelated to layout or visual DOM changes** (such as logging, data fetching, or analytics) is **not recommended**. It can lead to **performance issues** or even unexpected behavior.

      **Example: Anti-pattern**
      The above usage delays the paint of the UI just to send a network request, which could (and should) be done after paint using useEffect.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Using `useLayoutEffect` for logic **unrelated to layout or visual DOM changes** (such as logging, data fetching, or analytics) is **not recommended**. It can lead to **performance issues** or even unexpected behavior.

      **Example: Anti-pattern**
      The above usage delays the paint of the UI just to send a network request, which could (and should) be done after paint using useEffect.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":293}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How does useLayoutEffect cause layout thrashing?',
    '<pre><code>      function ThrashingComponent() {
        const ref = useRef();

        useLayoutEffect(() =&gt; {
          const height = ref.current.offsetHeight; //Read
          ref.current.style.height = height + 20 + &#039;px&#039;; //Write
          const newHeight = ref.current.offsetHeight; //Read again — forces reflow
        }, []);

        return &lt;div ref={ref}&gt;Hello&lt;/div&gt;;
      }</code></pre>

The `useLayoutEffect` can **cause layout thrashing** when you **repeatedly read and write to the DOM** in ways that force the browser to recalculate layout multiple times per frame. This is because `useLayoutEffect` runs _before the browser paints_, these reflows happen _synchronously_, blocking rendering and degrading performance.

      **Example:**
      In the above code, each read/write cycle triggers synchronous reflows, blocking the main thread and delays UI rendering.

      This issue can be avoided by batching your DOM reads and writes and prevent unnecessary reads after writes.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `useLayoutEffect` can **cause layout thrashing** when you **repeatedly read and write to the DOM** in ways that force the browser to recalculate layout multiple times per frame. This is because `useLayoutEffect` runs _before the browser paints_, these reflows happen _synchronously_, blocking rendering and degrading performance.

      **Example:**
      In the above code, each read/write cycle triggers synchronous reflows, blocking the main thread and delays UI rendering.

      This issue can be avoided by batching your DOM reads and writes and prevent unnecessary reads after writes.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":294}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How Do You Use useRef to Access a DOM Element in React? Give an example.',
    '<pre><code>        import React, { useRef } from &#039;react&#039;;
        
        function FocusInput() {
          const inputRef = useRef(null); // create the ref
        
          const handleFocus = () =&gt; {
            inputRef.current.focus(); // access DOM element and focus it
          };
        
          return (
              &lt;input type=&quot;text&quot; ref={inputRef} /&gt;
              &lt;button onClick={handleFocus}&gt;Focus the input&lt;/button&gt;
          );
        }</code></pre>

The `useRef` hook is commonly used in React to directly reference and interact with DOM elements — like focusing an input, scrolling to a section, or controlling media elements.
        
        When you assign a ref to a DOM element using useRef, React gives you access to the underlying DOM node via the .current property of the ref object.
        
        **Example: Focus an input**

       **Note:** The DOM reference is only available **after the component has mounted** — typically accessed in `useEffect` or event handlers.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `useRef` hook is commonly used in React to directly reference and interact with DOM elements — like focusing an input, scrolling to a section, or controlling media elements.
        
        When you assign a ref to a DOM element using useRef, React gives you access to the underlying DOM node via the .current property of the ref object.
        
        **Example: Focus an input**

       **Note:** The DOM reference is only available **after the component has mounted** — typically accessed in `useEffect` or event handlers.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":295}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Can you use useRef to persist values across renders??',
    '<pre><code>        function Timer() {
          const renderCount = useRef(0);
          useEffect(() =&gt; {
            renderCount.current++;
            console.log(&quot;Render count:&quot;, renderCount.current);
          });
        
          return &lt;div&gt;Check console for render count.&lt;/div&gt;;
        }</code></pre>

Yes, you can use `useRef` to persist values across renders in React. Unlike `useState`, changing `.current` does not cause re-renders, but the value is preserved across renders.
        
        **Example:**',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Yes, you can use `useRef` to persist values across renders in React. Unlike `useState`, changing `.current` does not cause re-renders, but the value is preserved across renders.
        
        **Example:**',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":296}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Can useRef be used to store previous values?',
    '<pre><code>        import { useEffect, useRef, useState } from &#039;react&#039;;
        
        function PreviousValueExample() {
          const [count, setCount] = useState(0);
          const prevCountRef = useRef();
        
          useEffect(() =&gt; {
            prevCountRef.current = count;
          }, [count]);
        
          const prevCount = prevCountRef.current;
        
          return (
              &lt;p&gt;Current: {count}&lt;/p&gt;
              &lt;p&gt;Previous: {prevCount}&lt;/p&gt;
              &lt;button onClick={() =&gt; setCount(c =&gt; c + 1)}&gt;Increment&lt;/button&gt;
          );
        }</code></pre>

Yes, `useRef` is a common pattern when you want to compare current and previous props or state without causing re-renders.
        
        **Example: Storing previous state value**',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Yes, `useRef` is a common pattern when you want to compare current and previous props or state without causing re-renders.
        
        **Example: Storing previous state value**',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":297}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Is it possible to access a ref in the render method?',
    '<pre><code>        const divRef = useRef(null);
        
        console.log(divRef.current); // ❌ null on initial render
        return &lt;div ref={divRef}&gt;Hello&lt;/div&gt;;</code></pre>

Yes, you can access a ref in the render method, but what you get from it depends on how you''re using the ref and when in the component lifecycle you''re rendering.
        
        For example, when using ref to access a DOM node (e.g., divRef.current), it''s not immediately available on the first render.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Yes, you can access a ref in the render method, but what you get from it depends on how you''re using the ref and when in the component lifecycle you''re rendering.
        
        For example, when using ref to access a DOM node (e.g., divRef.current), it''s not immediately available on the first render.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":298}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the common usecases of useRef hook?',
    'Some of the common cases are:
      *   Automatically focus an input when a component mounts.
      *   Scroll to a specific element.
      *   Measure element dimensions (`offsetWidth`, `clientHeight`).
      *   Control video/audio playback.
      *   Integrate with non-React libraries (like D3 or jQuery).',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Some of the common cases are:
      *   Automatically focus an input when a component mounts.
      *   Scroll to a specific element.
      *   Measure element dimensions (`offsetWidth`, `clientHeight`).
      *   Control video/audio playback.
      *   Integrate with non-React libraries (like D3 or jQuery).',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":299}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is useImperativeHandle Hook? Give an example.',
    '<pre><code>      import React, {
        useRef,
        useState,
        useImperativeHandle,
        forwardRef,
      } from &#039;react&#039;;
      import &#039;./Dialog.css&#039;; 

      const Dialog = forwardRef((props, ref) =&gt; {
        const [isOpen, setIsOpen] = useState(false);
        const [formData, setFormData] = useState(&#039;&#039;);

        useImperativeHandle(ref, () =&gt; ({
          open: () =&gt; setIsOpen(true),
          close: () =&gt; setIsOpen(false),
          reset: () =&gt; setFormData(&#039;&#039;),
        }));

        if (!isOpen) return null;

        return (
            &lt;h2&gt;Dialog&lt;/h2&gt;
            &lt;input
              type=&quot;text&quot;
              value={formData}
              placeholder=&quot;Type something...&quot;
              onChange={(e) =&gt; setFormData(e.target.value)}
            /&gt;
            &lt;br /&gt;
            &lt;button onClick={() =&gt; setIsOpen(false)}&gt;Close&lt;/button&gt;
        );
      });

      function Parent() {
        const dialogRef = useRef();

        return (
            &lt;h1&gt;useImperativeHandle Dialog Example&lt;/h1&gt;
            &lt;button onClick={() =&gt; dialogRef.current.open()}&gt;Open Dialog&lt;/button&gt;
            &lt;button onClick={() =&gt; dialogRef.current.reset()}&gt;Reset Dialog&lt;/button&gt;
            &lt;button onClick={() =&gt; dialogRef.current.close()}&gt;Close Dialog&lt;/button&gt;

            &lt;Dialog ref={dialogRef} /&gt;
        );
      }

      export default Parent;</code></pre>

`useImperativeHandle` is a React Hook that allows a **child component** to expose **custom functions or properties** to its **parent component**, when using `ref`.
      It is typically used with `forwardRef` and is very useful in cases like **modals**, **dialogs**, **custom inputs**, etc., where the parent needs to **control behavior imperatively** (e.g., open, close, reset).

      **Example: Dialog component**',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '`useImperativeHandle` is a React Hook that allows a **child component** to expose **custom functions or properties** to its **parent component**, when using `ref`.
      It is typically used with `forwardRef` and is very useful in cases like **modals**, **dialogs**, **custom inputs**, etc., where the parent needs to **control behavior imperatively** (e.g., open, close, reset).

      **Example: Dialog component**',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":300}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );
