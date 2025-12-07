const fs = require('fs');
const path = require('path');

// Read existing questions
const filePath = path.join(
  __dirname,
  '../../Rest/final-questions-v01/html-questions.json'
);
const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const newQuestions = [];
let questionCounter = 21; // Continue from html-02-html20

const getQuestionId = (topicNum, qNum) => {
  const id = `html-0${topicNum}-html${String(questionCounter++).padStart(2, '0')}`;
  return id;
};

// Helper to create a question
const createQuestion = (
  topicNum,
  qNum,
  title,
  content,
  topic,
  difficulty,
  tags,
  explanation,
  points,
  customOptions = null
) => {
  const options = customOptions || [
    {
      id: 'o1',
      text: explanation.split('.')[0] + '.',
      isCorrect: true,
      explanation: 'Correct. ' + explanation,
    },
    {
      id: 'o2',
      text: 'All options are equivalent and can be used interchangeably',
      isCorrect: false,
      explanation:
        'Incorrect. There are important semantic and functional differences.',
    },
    {
      id: 'o3',
      text: "The differences are only visual and don't affect functionality",
      isCorrect: false,
      explanation:
        'Incorrect. These differences affect semantics, accessibility, and behavior.',
    },
    {
      id: 'o4',
      text: 'Modern browsers handle all cases identically regardless of choice',
      isCorrect: false,
      explanation:
        'Incorrect. Browser behavior and accessibility features differ based on element choice.',
    },
  ];

  return {
    id: getQuestionId(topicNum, qNum),
    title,
    content,
    type: 'multiple-choice',
    category: 'HTML',
    topic,
    difficulty,
    learningCardId: 'core-technologies',
    isActive: true,
    createdAt: '2025-01-15T03:53:54.816Z',
    updatedAt: '2025-01-15T03:53:54.816Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags,
    explanation,
    points,
    options,
    hints: [
      'Consider semantic meaning vs visual appearance',
      'Think about accessibility and screen reader behavior',
      'Remember that HTML structure affects both functionality and SEO',
    ],
    metadata: {},
  };
};

console.log('Starting to generate remaining 60 questions...');

// TOPIC 2: Forms (10 questions)
const forms = [
  {
    title:
      'What is the difference between GET and POST methods in forms? When should each be used?',
    content:
      'Senior developers must understand HTTP methods. Explain the differences between GET and POST, including security, caching, and use case implications.',
    difficulty: 'intermediate',
    tags: ['html', 'forms', 'http-methods', 'intermediate', 'security'],
    explanation:
      'GET sends data in URL (visible, bookmarkable, cached). POST sends data in body (hidden, not cached, no length limit). Use GET for idempotent operations (search, filters). Use POST for state changes (create, update, delete). GET is less secure for sensitive data.',
    points: 15,
  },
  {
    title:
      "Explain HTML5 form validation attributes. How do 'required', 'pattern', 'min', 'max' work together?",
    content:
      'HTML5 provides native validation. Explain how validation attributes work, their limitations, and when you still need JavaScript validation.',
    difficulty: 'intermediate',
    tags: ['html', 'forms', 'validation', 'html5', 'intermediate'],
    explanation:
      "'required' makes field mandatory. 'pattern' validates against regex. 'min'/'max' set numeric/date ranges. 'type' (email, url, number) provides built-in validation. Browser shows native error messages. Still need server-side validation (client-side can be bypassed).",
    points: 15,
  },
  {
    title:
      "What is the purpose of the 'novalidate' attribute on forms? When should it be used?",
    content:
      'Understanding form validation control. Explain when to disable HTML5 validation and implement custom validation instead.',
    difficulty: 'intermediate',
    tags: ['html', 'forms', 'validation', 'intermediate'],
    explanation:
      "'novalidate' disables browser's native HTML5 validation. Use when implementing custom validation logic, progressive enhancement, or when native messages don't match design. Still validate on server. Useful for complex validation rules or custom error UI.",
    points: 15,
  },
  {
    title:
      "Explain the difference between <input type='email'> and <input type='text'> with pattern validation. What are the accessibility implications?",
    content:
      'Input types affect validation and user experience. Compare email input type vs text with pattern, including mobile keyboard and accessibility differences.',
    difficulty: 'intermediate',
    tags: ['html', 'forms', 'input-types', 'accessibility', 'intermediate'],
    explanation:
      "type='email' provides native validation, mobile keyboard (@ symbol), and semantic meaning. pattern on text requires manual regex. Email type is more accessible (screen readers announce as email field). Use email type for email addresses, pattern for custom formats.",
    points: 15,
  },
  {
    title:
      'What is the purpose of the <fieldset> and <legend> elements? How do they improve form accessibility?',
    content:
      'Form grouping is important for accessibility. Explain how fieldset and legend help screen readers and keyboard navigation.',
    difficulty: 'intermediate',
    tags: ['html', 'forms', 'accessibility', 'fieldset', 'intermediate'],
    explanation:
      '<fieldset> groups related form controls. <legend> provides label for the group. Screen readers announce legend before each field in group. Improves form comprehension, especially for complex forms. Required for radio button groups. Helps keyboard navigation.',
    points: 15,
  },
  {
    title:
      "Explain the 'autocomplete' attribute on form inputs. What values are available and how do they improve UX?",
    content:
      'Browser autocomplete can enhance user experience. Explain the autocomplete attribute values and their impact on form filling.',
    difficulty: 'intermediate',
    tags: ['html', 'forms', 'autocomplete', 'ux', 'intermediate'],
    explanation:
      "'autocomplete' hints browser what data to suggest (name, email, address, etc.). Values like 'name', 'email', 'tel', 'address-line1', 'cc-number', 'current-password'. Improves UX, reduces errors, speeds up form completion. Use 'off' to disable, 'new-password' for password managers.",
    points: 15,
  },
  {
    title:
      "What is the difference between <input type='submit'> and <button type='submit'>? When should each be used?",
    content:
      'Form submission buttons have different implementations. Explain the differences and accessibility implications of input vs button elements.',
    difficulty: 'intermediate',
    tags: ['html', 'forms', 'buttons', 'accessibility', 'intermediate'],
    explanation:
      "<input type='submit'> only allows text content. <button type='submit'> allows HTML content (icons, formatting). Button is more flexible for styling and content. Both submit forms identically. Button is generally preferred for modern development due to flexibility.",
    points: 15,
  },
  {
    title:
      'Explain CSRF protection in HTML forms. How do hidden tokens and SameSite cookies help prevent attacks?',
    content:
      'Security is critical for forms. Explain Cross-Site Request Forgery (CSRF) attacks and how HTML form attributes help prevent them.',
    difficulty: 'difficult',
    tags: ['html', 'forms', 'security', 'csrf', 'difficult'],
    explanation:
      "CSRF tricks users into submitting forms to attacker's site. Protection: hidden CSRF tokens (server validates), SameSite cookie attribute (Strict/Lax prevents cross-site sends), referrer checking. HTML alone can't fully prevent CSRF; need server-side validation. SameSite='Strict' is strongest protection.",
    points: 20,
  },
  {
    title:
      "What is the purpose of the 'form' attribute on input elements? How does it enable form submission from outside the <form> tag?",
    content:
      "Modern HTML5 allows inputs outside forms. Explain the 'form' attribute and its use cases for complex form layouts.",
    difficulty: 'intermediate',
    tags: ['html', 'forms', 'html5', 'intermediate'],
    explanation:
      "'form' attribute links input to form by form's id, even if input is outside <form> tag. Enables flexible layouts (inputs in different DOM locations), multiple forms sharing inputs, or inputs in modals/dialogs. Input participates in form validation and submission.",
    points: 15,
  },
  {
    title:
      "Explain the difference between <input type='radio'> and <input type='checkbox'>. How do 'name' attributes group them?",
    content:
      'Understanding form control grouping. Explain how radio buttons and checkboxes differ, and how the name attribute creates groups.',
    difficulty: 'intermediate',
    tags: ['html', 'forms', 'input-types', 'intermediate'],
    explanation:
      "Radio buttons: single selection per group (same name), mutually exclusive. Checkboxes: multiple selections allowed, independent. Radio groups share 'name' attribute. Checkboxes can share name (array values) or be independent. Use radio for mutually exclusive options, checkbox for multiple selections.",
    points: 15,
  },
];

forms.forEach((q, idx) => {
  newQuestions.push(
    createQuestion(
      3,
      idx + 21,
      q.title,
      q.content,
      'Forms',
      q.difficulty,
      q.tags,
      q.explanation,
      q.points
    )
  );
});

console.log(
  `Generated ${newQuestions.length} Forms questions. Continuing with Media...`
);

// TOPIC 3: Media (10 questions)
const media = [
  {
    title:
      'Explain the difference between <img> and <picture> elements. When should you use <picture> for responsive images?',
    content:
      'Responsive images are crucial for performance. Explain when to use <picture> with <source> elements vs simple <img> with srcset.',
    difficulty: 'intermediate',
    tags: ['html', 'media', 'responsive-images', 'intermediate', 'performance'],
    explanation:
      '<img> is single image with optional srcset for different resolutions. <picture> allows multiple <source> elements with media queries or type attributes for art direction or format selection. Use <picture> for different images at different sizes (art direction) or format fallbacks (WebP to JPEG). Use <img srcset> for same image at different resolutions.',
    points: 15,
  },
  {
    title:
      "What is the purpose of the 'loading' attribute on images? How does lazy loading improve performance?",
    content:
      "Performance optimization for images. Explain the 'loading' attribute values and their impact on page load performance.",
    difficulty: 'intermediate',
    tags: ['html', 'media', 'performance', 'lazy-loading', 'intermediate'],
    explanation:
      "'loading' attribute controls when image loads: 'lazy' defers loading until near viewport, 'eager' loads immediately. Lazy loading reduces initial page load, saves bandwidth, improves LCP. Use 'lazy' for below-fold images, 'eager' for above-fold critical images. Browser support is good in modern browsers.",
    points: 15,
  },
  {
    title:
      "Explain the 'srcset' and 'sizes' attributes on <img>. How do they enable responsive images?",
    content:
      'Responsive images require proper srcset configuration. Explain how srcset and sizes work together to serve appropriate images.',
    difficulty: 'difficult',
    tags: ['html', 'media', 'responsive-images', 'difficult', 'performance'],
    explanation:
      "'srcset' provides multiple image sources with descriptors (width: 800w, pixel density: 2x). 'sizes' tells browser viewport width for image (e.g., '(max-width: 600px) 100vw, 50vw'). Browser selects best image based on device pixel ratio and viewport. Essential for responsive design performance.",
    points: 20,
  },
  {
    title:
      "What is the difference between <video> 'autoplay' and 'preload' attributes? What are the performance and UX implications?",
    content:
      'Video loading behavior affects performance and user experience. Explain autoplay vs preload and when each is appropriate.',
    difficulty: 'intermediate',
    tags: ['html', 'media', 'video', 'performance', 'intermediate'],
    explanation:
      "'autoplay' starts video automatically (requires 'muted' in most browsers). 'preload' hints how much to download: 'none' (don't preload), 'metadata' (dimensions, duration), 'auto' (entire video). Autoplay can annoy users and waste bandwidth. Preload='metadata' is good balance. Use autoplay sparingly with muted videos.",
    points: 15,
  },
  {
    title:
      "Explain the <audio> element attributes. How do 'controls', 'autoplay', and 'loop' affect audio playback?",
    content:
      'Audio elements have various playback controls. Explain the key attributes and their accessibility implications.',
    difficulty: 'intermediate',
    tags: ['html', 'media', 'audio', 'intermediate'],
    explanation:
      "'controls' shows play/pause/volume UI. 'autoplay' starts automatically (often blocked by browsers). 'loop' repeats audio. 'preload' controls download behavior. Always include 'controls' for accessibility. Avoid autoplay (annoying, blocked). Provide text alternative for audio content.",
    points: 15,
  },
  {
    title:
      'What is the purpose of the <source> element within <video> or <audio>? How does it enable format fallbacks?',
    content:
      'Media format compatibility is important. Explain how <source> elements provide fallbacks for different codecs and formats.',
    difficulty: 'intermediate',
    tags: ['html', 'media', 'video', 'audio', 'codecs', 'intermediate'],
    explanation:
      "<source> provides alternative media files within <video>/<audio>. Browser tries sources in order until one is supported. Enables format fallbacks (WebM, MP4, OGG) and codec selection. Use 'type' attribute to specify MIME type and codecs. Essential for cross-browser compatibility.",
    points: 15,
  },
  {
    title:
      "Explain the 'poster' attribute on <video> elements. How does it improve user experience?",
    content:
      'Video thumbnails enhance UX. Explain the poster attribute and its role in video presentation.',
    difficulty: 'intermediate',
    tags: ['html', 'media', 'video', 'ux', 'intermediate'],
    explanation:
      "'poster' attribute specifies image URL shown before video plays. Provides visual preview, improves perceived performance, gives context. Should be representative frame from video. Falls back to first frame if not provided. Important for video galleries and previews.",
    points: 15,
  },
  {
    title:
      'What is the difference between <iframe> embedding and <video>/<audio> elements? When should each be used for media?',
    content:
      'Media embedding has multiple approaches. Explain when to use iframe (YouTube, Vimeo) vs native video/audio elements.',
    difficulty: 'intermediate',
    tags: ['html', 'media', 'iframe', 'video', 'intermediate'],
    explanation:
      '<iframe> embeds external player (YouTube, Vimeo) - provides features, handles hosting, but less control. <video>/<audio> are native HTML5 players - full control, better performance, but you host files. Use iframe for third-party services. Use native elements for self-hosted media with custom controls.',
    points: 15,
  },
  {
    title:
      "Explain the 'playsinline' attribute on mobile video elements. Why is it important for mobile browsers?",
    content:
      'Mobile video behavior differs from desktop. Explain playsinline and its impact on iOS Safari and other mobile browsers.',
    difficulty: 'intermediate',
    tags: ['html', 'media', 'video', 'mobile', 'intermediate'],
    explanation:
      "'playsinline' prevents iOS Safari from entering fullscreen when video plays. Without it, video opens in fullscreen player. Essential for inline video playback in web pages on iOS. Also affects Android browsers. Use with autoplay for seamless mobile video experience.",
    points: 15,
  },
  {
    title:
      "What is the purpose of the 'alt' attribute on images? How does it differ from 'title' and when should each be used?",
    content:
      'Image accessibility requires proper attributes. Explain alt vs title attributes and their different purposes for accessibility and UX.',
    difficulty: 'intermediate',
    tags: ['html', 'media', 'accessibility', 'images', 'intermediate'],
    explanation:
      "'alt' provides text alternative for screen readers and when image fails to load. Required for accessibility. 'title' provides tooltip on hover (not read by screen readers). Use 'alt' for meaningful images (describe content), empty alt='' for decorative images. Use 'title' sparingly for additional context.",
    points: 15,
  },
];

media.forEach((q, idx) => {
  newQuestions.push(
    createQuestion(
      4,
      idx + 31,
      q.title,
      q.content,
      'Media',
      q.difficulty,
      q.tags,
      q.explanation,
      q.points
    )
  );
});

console.log(
  `Generated ${newQuestions.length} total questions (Forms + Media). Continuing with SEO...`
);

// TOPIC 4: SEO (10 questions)
const seo = [
  {
    title:
      "Explain the purpose of <meta name='description'> and <meta name='keywords'>. Which is more important for SEO?",
    content:
      'SEO meta tags affect search rankings. Explain description vs keywords and their current importance in modern SEO.',
    difficulty: 'intermediate',
    tags: ['html', 'seo', 'meta-tags', 'intermediate'],
    explanation:
      "'description' provides snippet for search results (still important for CTR). 'keywords' is largely ignored by modern search engines (spam-prone). Description should be 150-160 characters, unique per page. Keywords meta tag is deprecated. Focus on description, title, and semantic HTML.",
    points: 15,
  },
  {
    title:
      'What is the purpose of Open Graph meta tags? How do they improve social media sharing?',
    content:
      'Social media sharing requires specific meta tags. Explain Open Graph protocol and its impact on link previews.',
    difficulty: 'intermediate',
    tags: ['html', 'seo', 'open-graph', 'social-media', 'intermediate'],
    explanation:
      'Open Graph tags (og:title, og:description, og:image, og:url) control how links appear when shared on social media (Facebook, Twitter, LinkedIn). Provides rich previews with images and descriptions. Improves click-through rates. Essential for content marketing and social sharing.',
    points: 15,
  },
  {
    title:
      'Explain structured data (JSON-LD, Microdata, RDFa). How does it improve SEO and search result appearance?',
    content:
      'Structured data helps search engines understand content. Explain the different formats and their SEO benefits.',
    difficulty: 'difficult',
    tags: ['html', 'seo', 'structured-data', 'schema', 'difficult'],
    explanation:
      "Structured data (Schema.org) helps search engines understand content type (Article, Product, Review, etc.). Formats: JSON-LD (recommended, in <script>), Microdata (attributes), RDFa (attributes). Enables rich snippets (ratings, prices, dates). JSON-LD is cleanest, doesn't mix with HTML. Improves search visibility.",
    points: 20,
  },
  {
    title:
      'What is the purpose of the <title> tag? How does it differ from <h1> and affect SEO?',
    content:
      'Title tags are crucial for SEO. Explain the relationship between <title>, <h1>, and search engine optimization.',
    difficulty: 'intermediate',
    tags: ['html', 'seo', 'title-tag', 'intermediate'],
    explanation:
      '<title> appears in browser tab and search results (50-60 chars optimal). <h1> is main page heading (visible on page). Both should be relevant but can differ. Title is for SEO and browser tab. H1 is for page structure and accessibility. Both important but serve different purposes.',
    points: 15,
  },
  {
    title:
      "Explain canonical URLs (<link rel='canonical'>). How do they prevent duplicate content issues in SEO?",
    content:
      'Duplicate content hurts SEO. Explain canonical tags and how they tell search engines which URL is the preferred version.',
    difficulty: 'intermediate',
    tags: ['html', 'seo', 'canonical', 'intermediate'],
    explanation:
      'Canonical tag specifies preferred URL when multiple URLs show same content (www vs non-www, HTTP vs HTTPS, parameters). Prevents duplicate content penalties, consolidates ranking signals. Use absolute URLs. Important for e-commerce (filtered product pages) and multi-domain setups.',
    points: 15,
  },
  {
    title:
      "What is the purpose of robots meta tags? How do 'noindex' and 'nofollow' affect search engine crawling?",
    content:
      'Controlling search engine behavior requires meta tags. Explain robots directives and when to use them.',
    difficulty: 'intermediate',
    tags: ['html', 'seo', 'robots', 'meta-tags', 'intermediate'],
    explanation:
      "'noindex' prevents page from appearing in search results. 'nofollow' tells crawlers not to follow links on page. 'noindex, nofollow' for private/admin pages. Use on duplicate content, staging sites, or pages you don't want indexed. Can also use X-Robots-Tag HTTP header.",
    points: 15,
  },
  {
    title:
      'Explain the difference between <h1>, <h2>, and other heading tags. How does heading hierarchy affect SEO?',
    content:
      'Heading structure matters for SEO and accessibility. Explain proper heading hierarchy and its impact on search rankings.',
    difficulty: 'intermediate',
    tags: ['html', 'seo', 'headings', 'semantic-html', 'intermediate'],
    explanation:
      "Headings create document outline: <h1> is main title (one per page), <h2> sections, <h3> subsections, etc. Proper hierarchy helps search engines understand content structure. Improves SEO and accessibility. Don't skip levels (h1 to h3). Use headings semantically, not for styling.",
    points: 15,
  },
  {
    title:
      "What is the purpose of <meta name='robots' content='max-snippet:50'>? How do snippet length controls work?",
    content:
      'Search result snippets can be controlled. Explain robots meta tag snippet controls and their SEO implications.',
    difficulty: 'intermediate',
    tags: ['html', 'seo', 'robots', 'snippets', 'intermediate'],
    explanation:
      "Snippet controls limit how search engines display your content: 'max-snippet' (character limit), 'max-image-preview' (image size), 'max-video-preview' (video length). Helps control how your content appears in search results. Useful for protecting content or optimizing CTR.",
    points: 15,
  },
  {
    title:
      "Explain the 'lang' attribute on <html> tag. How does it affect SEO and internationalization?",
    content:
      'Language declaration is important for SEO and accessibility. Explain the lang attribute and its impact on search engines.',
    difficulty: 'intermediate',
    tags: ['html', 'seo', 'i18n', 'accessibility', 'intermediate'],
    explanation:
      "'lang' attribute declares page language (e.g., 'en', 'es', 'fr'). Helps search engines serve content to right audience, improves accessibility (screen reader pronunciation), enables translation tools. Use on <html> for page language, on elements for language changes. Essential for multilingual sites.",
    points: 15,
  },
  {
    title:
      "What is the difference between <meta name='author'> and structured data for author information? Which is better for SEO?",
    content:
      'Author attribution affects SEO and rich snippets. Compare meta author tag vs structured data (Person/Author schema) for SEO benefits.',
    difficulty: 'intermediate',
    tags: ['html', 'seo', 'structured-data', 'author', 'intermediate'],
    explanation:
      'Meta author tag is simple but limited. Structured data (Person/Author schema) provides rich information (name, image, social profiles) and enables author rich snippets in search results. Structured data is preferred for SEO as it provides more context to search engines and better search result appearance.',
    points: 15,
  },
];

seo.forEach((q, idx) => {
  newQuestions.push(
    createQuestion(
      5,
      idx + 41,
      q.title,
      q.content,
      'SEO',
      q.difficulty,
      q.tags,
      q.explanation,
      q.points
    )
  );
});

console.log(
  `Generated ${newQuestions.length} total questions. Continuing with Accessibility...`
);

// TOPIC 5: Accessibility (10 questions)
const accessibility = [
  {
    title:
      "Explain ARIA landmarks (role='banner', role='main', role='navigation'). How do they improve screen reader navigation?",
    content:
      'ARIA landmarks help screen readers understand page structure. Explain the main landmark roles and their semantic equivalents.',
    difficulty: 'intermediate',
    tags: ['html', 'accessibility', 'aria', 'landmarks', 'intermediate'],
    explanation:
      "ARIA landmarks define page regions: 'banner' (header), 'main' (main content), 'navigation' (nav), 'complementary' (aside), 'contentinfo' (footer), 'search' (search area). Screen readers can jump between landmarks. Prefer semantic HTML (<header>, <main>, <nav>) but use ARIA when semantic elements aren't available.",
    points: 15,
  },
  {
    title:
      "What is the difference between 'aria-label' and 'aria-labelledby'? When should each be used?",
    content:
      'ARIA labeling provides accessible names. Explain the differences between aria-label and aria-labelledby and their use cases.',
    difficulty: 'intermediate',
    tags: ['html', 'accessibility', 'aria', 'intermediate'],
    explanation:
      "'aria-label' provides direct text label. 'aria-labelledby' references ID of element containing label text. Use 'aria-label' for simple labels when visible text isn't sufficient. Use 'aria-labelledby' when label text exists elsewhere in DOM (reuses existing text, maintains single source of truth).",
    points: 15,
  },
  {
    title:
      "Explain 'aria-hidden' and 'aria-live' attributes. How do they control screen reader announcements?",
    content:
      'ARIA attributes control screen reader behavior. Explain how aria-hidden and aria-live affect accessibility announcements.',
    difficulty: 'intermediate',
    tags: ['html', 'accessibility', 'aria', 'screen-readers', 'intermediate'],
    explanation:
      "'aria-hidden=true' hides element from screen readers (decorative content). 'aria-live' announces dynamic content changes ('polite' waits, 'assertive' interrupts). Use aria-hidden for icons, decorative images. Use aria-live for dynamic updates (form errors, notifications). Be careful not to hide important content.",
    points: 15,
  },
  {
    title:
      "What is the purpose of 'tabindex' attribute? Explain the difference between tabindex='0', tabindex='-1', and positive values.",
    content:
      'Keyboard navigation requires proper tabindex. Explain how different tabindex values affect focus order and keyboard accessibility.',
    difficulty: 'intermediate',
    tags: [
      'html',
      'accessibility',
      'keyboard-navigation',
      'tabindex',
      'intermediate',
    ],
    explanation:
      "tabindex='0' includes element in natural tab order. tabindex='-1' makes element focusable programmatically but not via tab. Positive values (1, 2, 3) create custom tab order (anti-pattern, avoid). Use 0 to make custom elements keyboard accessible. Use -1 for programmatic focus (modals, skip links).",
    points: 15,
  },
  {
    title:
      "Explain the difference between 'aria-describedby' and 'aria-labelledby'. When should each be used for form inputs?",
    content:
      'Form accessibility requires proper labeling. Explain how aria-describedby and aria-labelledby provide different types of information to screen readers.',
    difficulty: 'intermediate',
    tags: ['html', 'accessibility', 'aria', 'forms', 'intermediate'],
    explanation:
      "'aria-labelledby' provides primary label (what is this field). 'aria-describedby' provides additional description (help text, error messages, hints). Label is announced first, description after. Use labelledby for field name, describedby for instructions or errors. Both can reference multiple IDs.",
    points: 15,
  },
  {
    title:
      "What is the purpose of 'skip links' in HTML? How do they improve keyboard navigation accessibility?",
    content:
      'Skip links help keyboard users navigate. Explain skip links and their implementation for accessibility.',
    difficulty: 'intermediate',
    tags: [
      'html',
      'accessibility',
      'keyboard-navigation',
      'skip-links',
      'intermediate',
    ],
    explanation:
      "Skip links are hidden links (visible on focus) that jump to main content, bypassing navigation. Essential for keyboard users who would otherwise tab through entire navigation. Implement with <a href='#main'>Skip to main content</a> and CSS to hide until focused. Improves keyboard navigation efficiency.",
    points: 15,
  },
  {
    title:
      "Explain 'aria-expanded' and 'aria-controls' attributes. How do they describe collapsible content for screen readers?",
    content:
      'Dynamic content needs ARIA states. Explain how aria-expanded and aria-controls describe expandable/collapsible sections.',
    difficulty: 'intermediate',
    tags: ['html', 'accessibility', 'aria', 'dynamic-content', 'intermediate'],
    explanation:
      "'aria-expanded' indicates if controlled element is expanded (true/false). 'aria-controls' references ID of element being controlled. Together they describe relationship: button controls section, section is expanded/collapsed. Essential for accordions, menus, modals. Update aria-expanded when state changes.",
    points: 15,
  },
  {
    title:
      "What is the difference between 'role='button'' and native <button> element? When is ARIA role acceptable?",
    content:
      "Button functionality can be implemented multiple ways. Explain when to use native button vs ARIA role='button' and the implications.",
    difficulty: 'difficult',
    tags: ['html', 'accessibility', 'aria', 'buttons', 'difficult'],
    explanation:
      "Native <button> provides keyboard support (Enter, Space), focus management, and semantic meaning automatically. role='button' on <div> requires manual keyboard event handling, focus management, and ARIA states. Always prefer native <button>. Use role='button' only when native element cannot achieve design (rare, usually CSS can style button).",
    points: 20,
  },
  {
    title:
      "Explain 'aria-required' and 'required' attributes on form inputs. Are both necessary?",
    content:
      'Form validation requires proper attributes. Explain the relationship between HTML5 required and ARIA aria-required attributes.',
    difficulty: 'intermediate',
    tags: [
      'html',
      'accessibility',
      'aria',
      'forms',
      'validation',
      'intermediate',
    ],
    explanation:
      "HTML5 'required' provides both validation and accessibility (screen readers announce as required). 'aria-required' is redundant when 'required' is present. Use 'required' for native validation and accessibility. Only use 'aria-required' when you can't use 'required' (custom validation, progressive enhancement).",
    points: 15,
  },
  {
    title:
      "What is the purpose of 'aria-current' attribute? How does it indicate the current item in navigation or lists?",
    content:
      'Current page/item indication is important for navigation. Explain aria-current and how it helps screen reader users understand context.',
    difficulty: 'intermediate',
    tags: ['html', 'accessibility', 'aria', 'navigation', 'intermediate'],
    explanation:
      "'aria-current' indicates current item in set: 'page' (current page in nav), 'step' (current step in process), 'date' (current date in calendar), 'time' (current time), 'location' (current location). Screen readers announce 'current' to help users understand where they are. Essential for breadcrumbs, pagination, step indicators.",
    points: 15,
  },
];

accessibility.forEach((q, idx) => {
  newQuestions.push(
    createQuestion(
      6,
      idx + 51,
      q.title,
      q.content,
      'Accessibility',
      q.difficulty,
      q.tags,
      q.explanation,
      q.points
    )
  );
});

console.log(
  `Generated ${newQuestions.length} total questions. Continuing with Performance...`
);

// TOPIC 6: Performance (10 questions)
const performance = [
  {
    title:
      "Explain the 'fetchpriority' attribute on <img> and <link> elements. How does it affect resource loading priority?",
    content:
      'Resource prioritization improves performance. Explain fetchpriority and how it helps optimize Critical Rendering Path.',
    difficulty: 'intermediate',
    tags: ['html', 'performance', 'resource-priority', 'intermediate'],
    explanation:
      "'fetchpriority' hints browser loading priority: 'high' (critical resources, above-fold images), 'low' (below-fold, non-critical), 'auto' (default). Helps browser prioritize LCP images, critical CSS. Use 'high' for hero images, 'low' for below-fold content. Improves Core Web Vitals.",
    points: 15,
  },
  {
    title:
      "What is the difference between 'preload' and 'prefetch' resource hints? When should each be used for optimization?",
    content:
      'Resource hints optimize loading. Explain preload vs prefetch and their different use cases for performance optimization.',
    difficulty: 'intermediate',
    tags: ['html', 'performance', 'resource-hints', 'intermediate'],
    explanation:
      "'preload' fetches critical resources for current page (fonts, critical CSS, hero images). 'prefetch' hints at resources for next navigation (next page assets). Preload is high priority, current page. Prefetch is low priority, future page. Use preload for above-fold critical resources, prefetch for likely next pages.",
    points: 15,
  },
  {
    title:
      "Explain the 'defer' and 'async' attributes on <script> tags. How do they affect page load performance?",
    content:
      'Script loading strategy impacts performance. Explain defer vs async and their execution timing implications.',
    difficulty: 'intermediate',
    tags: [
      'html',
      'performance',
      'javascript',
      'script-loading',
      'intermediate',
    ],
    explanation:
      "'async' downloads in parallel, executes immediately when ready (order not guaranteed). 'defer' downloads in parallel, executes after HTML parsing in document order. Async for independent scripts (analytics). Defer for DOM-dependent scripts. Both prevent render blocking. Defer maintains execution order.",
    points: 15,
  },
  {
    title:
      "What is the purpose of the 'integrity' attribute on <script> and <link> tags? How does Subresource Integrity (SRI) improve security and performance?",
    content:
      'CDN resources need integrity verification. Explain SRI and how the integrity attribute prevents tampering and ensures correct resource loading.',
    difficulty: 'difficult',
    tags: ['html', 'performance', 'security', 'sri', 'difficult'],
    explanation:
      "'integrity' attribute provides cryptographic hash of resource. Browser verifies hash matches before executing/loading. Prevents CDN compromise attacks, ensures correct version loaded. Format: 'sha384-...' or 'sha512-...'. Improves security and prevents malicious code injection from compromised CDNs.",
    points: 20,
  },
  {
    title:
      "Explain the 'loading' attribute on images and iframes. How does lazy loading improve initial page load performance?",
    content:
      'Lazy loading defers non-critical resources. Explain the loading attribute and its impact on Core Web Vitals.',
    difficulty: 'intermediate',
    tags: ['html', 'performance', 'lazy-loading', 'intermediate'],
    explanation:
      "'loading=lazy' defers image/iframe loading until near viewport. Reduces initial page load, saves bandwidth, improves LCP and FID. Use 'lazy' for below-fold content, 'eager' for above-fold critical images. Native browser support, no JavaScript required. Significant performance improvement for image-heavy pages.",
    points: 15,
  },
  {
    title:
      "What is the difference between 'dns-prefetch' and 'preconnect'? When should each be used for third-party resources?",
    content:
      'Connection optimization improves performance. Explain dns-prefetch vs preconnect and their use cases for external resources.',
    difficulty: 'intermediate',
    tags: ['html', 'performance', 'resource-hints', 'intermediate'],
    explanation:
      "'dns-prefetch' only resolves DNS (fast, lightweight). 'preconnect' resolves DNS, establishes TCP connection, performs TLS handshake (more complete, more resource-intensive). Use dns-prefetch for multiple domains, preconnect for critical third-party resources (CDNs, APIs) you'll definitely use. Preconnect is stronger optimization.",
    points: 15,
  },
  {
    title:
      "Explain the 'media' attribute on <link> tags for stylesheets. How does it enable conditional CSS loading?",
    content:
      'Conditional CSS loading optimizes performance. Explain the media attribute and how it defers non-matching stylesheets.',
    difficulty: 'intermediate',
    tags: ['html', 'performance', 'css', 'media-queries', 'intermediate'],
    explanation:
      "'media' attribute on <link rel='stylesheet'> specifies media query. Browser only loads stylesheet if media matches. Non-matching stylesheets are marked as non-render-blocking. Use for print stylesheets (media='print'), mobile-specific CSS, or conditional feature CSS. Reduces initial CSS payload.",
    points: 15,
  },
  {
    title:
      "What is the purpose of the 'crossorigin' attribute on <script> and <link> tags? How does it affect CORS and error handling?",
    content:
      'Cross-origin resources require CORS configuration. Explain crossorigin attribute and its impact on resource loading and error reporting.',
    difficulty: 'difficult',
    tags: ['html', 'performance', 'security', 'cors', 'difficult'],
    explanation:
      "'crossorigin' enables CORS for cross-origin resources. 'anonymous' (no credentials) or 'use-credentials' (with credentials). Required for proper error reporting in window.onerror, enables stricter CORS checks. Without it, errors are opaque. Use when loading resources from different origin, especially for SRI.",
    points: 20,
  },
  {
    title:
      "Explain the 'referrerpolicy' attribute on <a>, <img>, and <iframe>. How does it affect performance and privacy?",
    content:
      'Referrer policy controls what information is sent. Explain referrerpolicy and its impact on privacy and performance.',
    difficulty: 'intermediate',
    tags: ['html', 'performance', 'privacy', 'referrer', 'intermediate'],
    explanation:
      "'referrerpolicy' controls Referer header: 'no-referrer' (send nothing), 'same-origin' (only same origin), 'strict-origin-when-cross-origin' (default, full URL same-origin, origin only cross-origin). Reduces data leakage, can improve privacy. Some CDNs use referrer for caching optimization.",
    points: 15,
  },
  {
    title:
      "What is the difference between 'module' and 'nomodule' attributes on <script> tags? How do they enable modern JavaScript with fallbacks?",
    content:
      "Modern JavaScript requires fallback strategies. Explain type='module' and nomodule for progressive enhancement and performance.",
    difficulty: 'intermediate',
    tags: ['html', 'performance', 'javascript', 'es6-modules', 'intermediate'],
    explanation:
      "'type=module' loads ES6 modules (import/export) in modern browsers. 'nomodule' provides fallback for older browsers. Modern browsers load module, ignore nomodule. Old browsers ignore module, load nomodule. Enables modern JS with backward compatibility. Reduces bundle size for modern browsers.",
    points: 15,
  },
];

performance.forEach((q, idx) => {
  newQuestions.push(
    createQuestion(
      7,
      idx + 61,
      q.title,
      q.content,
      'Performance',
      q.difficulty,
      q.tags,
      q.explanation,
      q.points
    )
  );
});

console.log(
  `Generated ${newQuestions.length} total questions. Continuing with HTML5 APIs...`
);

// TOPIC 7: HTML5 APIs (10 questions)
const html5Apis = [
  {
    title:
      'Explain the Web Storage API (localStorage and sessionStorage). What are the differences and use cases?',
    content:
      'Client-side storage is essential for modern web apps. Explain localStorage vs sessionStorage and when to use each.',
    difficulty: 'intermediate',
    tags: ['html', 'html5-apis', 'web-storage', 'localStorage', 'intermediate'],
    explanation:
      'localStorage persists across browser sessions (until cleared). sessionStorage persists only for tab session (cleared on tab close). Both store key-value pairs (strings only, ~5-10MB limit). localStorage for user preferences, sessionStorage for temporary data. Both are synchronous, can block main thread.',
    points: 15,
  },
  {
    title:
      'What is the Geolocation API? How do you request user location and handle privacy concerns?',
    content:
      'Location services require user permission. Explain the Geolocation API and best practices for requesting and using location data.',
    difficulty: 'intermediate',
    tags: ['html', 'html5-apis', 'geolocation', 'privacy', 'intermediate'],
    explanation:
      'Geolocation API (navigator.geolocation) requests user location. Requires user permission (privacy-sensitive). Methods: getCurrentPosition() (one-time), watchPosition() (tracking). Options: enableHighAccuracy, timeout, maximumAge. Always request permission clearly, explain why location is needed, handle errors gracefully.',
    points: 15,
  },
  {
    title:
      'Explain the File API and FileReader. How do you read file contents in the browser without uploading?',
    content:
      'Client-side file handling enables rich interactions. Explain File API, FileReader, and how to process files before upload.',
    difficulty: 'intermediate',
    tags: ['html', 'html5-apis', 'file-api', 'filereader', 'intermediate'],
    explanation:
      "File API provides access to file objects from <input type='file'>. FileReader reads file contents as text, data URL, array buffer, or binary string. Methods: readAsText(), readAsDataURL(), readAsArrayBuffer(). Enables client-side image preview, file validation, parsing before upload. Asynchronous API with onload/onerror handlers.",
    points: 15,
  },
  {
    title:
      'What is the Drag and Drop API? Explain the drag events and dataTransfer object.',
    content:
      'Drag and drop interactions enhance UX. Explain the HTML5 Drag and Drop API, events, and dataTransfer for implementing drag operations.',
    difficulty: 'difficult',
    tags: ['html', 'html5-apis', 'drag-drop', 'difficult'],
    explanation:
      "Drag and Drop API enables drag operations: dragstart, drag, dragend (draggable element), dragover, drop (drop zone). dataTransfer object stores data (setData/getData), controls drop effect (copy, move, link), provides files. Requires draggable='true' attribute. Complex API with many edge cases, browser differences.",
    points: 20,
  },
  {
    title:
      'Explain Web Workers. How do they enable background processing without blocking the main thread?',
    content:
      'Performance requires offloading work. Explain Web Workers and how they enable multithreading in JavaScript.',
    difficulty: 'difficult',
    tags: ['html', 'html5-apis', 'web-workers', 'performance', 'difficult'],
    explanation:
      "Web Workers run JavaScript in background thread, don't block main thread. No DOM access, communicate via postMessage/onmessage. Use for CPU-intensive tasks (image processing, calculations, parsing). Dedicated Workers (single script), Shared Workers (multiple tabs), Service Workers (PWA). Improves responsiveness for heavy computations.",
    points: 20,
  },
  {
    title:
      'What is the History API? Explain pushState, replaceState, and popstate for single-page applications.',
    content:
      'SPAs need URL management. Explain the History API and how it enables client-side routing without page reloads.',
    difficulty: 'intermediate',
    tags: ['html', 'html5-apis', 'history-api', 'spa', 'intermediate'],
    explanation:
      'History API manipulates browser history: pushState() (adds entry, changes URL), replaceState() (replaces current entry), popstate event (fires on back/forward). Enables SPA routing, maintains browser history, allows bookmarking. URL changes without page reload. Must handle popstate for back/forward navigation.',
    points: 15,
  },
  {
    title:
      'Explain the Canvas API. How does it differ from SVG and when should each be used?',
    content:
      'Graphics rendering has multiple approaches. Explain Canvas API vs SVG and their different use cases.',
    difficulty: 'intermediate',
    tags: ['html', 'html5-apis', 'canvas', 'svg', 'intermediate'],
    explanation:
      'Canvas is pixel-based, imperative (draw commands), good for games, image manipulation, dynamic graphics. SVG is vector-based, declarative (XML), scalable, accessible, good for icons, illustrations, interactive graphics. Canvas better for performance (many objects), SVG better for scalability and accessibility.',
    points: 15,
  },
  {
    title:
      'What is the WebSocket API? How does it enable real-time bidirectional communication?',
    content:
      'Real-time communication requires persistent connections. Explain WebSocket API and how it differs from HTTP polling.',
    difficulty: 'difficult',
    tags: ['html', 'html5-apis', 'websocket', 'real-time', 'difficult'],
    explanation:
      'WebSocket provides full-duplex communication over single TCP connection. Persistent connection (not request/response like HTTP). Lower latency, less overhead than HTTP polling. Events: onopen, onmessage, onerror, onclose. Methods: send(), close(). Use for chat, live updates, gaming. Requires WebSocket server.',
    points: 20,
  },
  {
    title:
      'Explain the Intersection Observer API. How does it enable efficient scroll-based animations and lazy loading?',
    content:
      'Scroll performance requires efficient observation. Explain Intersection Observer and how it replaces scroll event listeners for better performance.',
    difficulty: 'intermediate',
    tags: [
      'html',
      'html5-apis',
      'intersection-observer',
      'performance',
      'intermediate',
    ],
    explanation:
      "Intersection Observer efficiently detects when elements enter/leave viewport. Replaces scroll event listeners (more performant, doesn't block main thread). Use for lazy loading images, infinite scroll, scroll animations, analytics. Callback fires when threshold crossed. Better performance than scroll events, especially for many elements.",
    points: 15,
  },
  {
    title:
      'What is the Web Audio API? How does it enable audio processing and synthesis in the browser?',
    content:
      'Audio manipulation requires specialized APIs. Explain Web Audio API and its use cases for audio processing.',
    difficulty: 'difficult',
    tags: ['html', 'html5-apis', 'web-audio', 'audio-processing', 'difficult'],
    explanation:
      'Web Audio API provides low-level audio processing: AudioContext, AudioNodes (source, effects, destination), audio routing/graph. Enables audio synthesis, effects, analysis, visualization. More powerful than <audio> element (programmatic control, real-time processing). Use for music apps, games, audio editors. Complex API with learning curve.',
    points: 20,
  },
];

html5Apis.forEach((q, idx) => {
  newQuestions.push(
    createQuestion(
      8,
      idx + 71,
      q.title,
      q.content,
      'HTML5 APIs',
      q.difficulty,
      q.tags,
      q.explanation,
      q.points
    )
  );
});

console.log(`Generated all ${newQuestions.length} remaining questions!`);

// Combine existing and new questions
const allQuestions = [...existingData, ...newQuestions];

// Write to file
fs.writeFileSync(filePath, JSON.stringify(allQuestions, null, 2));
console.log(
  `\n✅ Successfully wrote ${allQuestions.length} total questions to ${filePath}`
);
console.log(`   - Existing: ${existingData.length}`);
console.log(`   - New: ${newQuestions.length}`);
console.log(
  `   - Topics: Basics (10), Forms (10), Media (10), SEO (10), Accessibility (10), Performance (10), HTML5 APIs (10)`
);
