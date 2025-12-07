const fs = require('fs');
const path = require('path');

// Read existing questions
const filePath = path.join(
  __dirname,
  '../../Rest/final-questions-v01/html-questions.json'
);
const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const newQuestions = [];
let questionCounter = 81; // Continue from html-08-html80

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
  options,
  questionType = 'multiple-choice'
) => {
  return {
    id: getQuestionId(topicNum, qNum),
    title,
    content,
    type: questionType, // "multiple-choice" or "multiple-select"
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

console.log('Starting to generate additional questions...');

// Additional Basics questions (5 more)
const moreBasics = [
  {
    title:
      'Which of the following are valid HTML5 semantic elements? (Select all that apply)',
    content:
      'Understanding HTML5 semantic elements is crucial. Identify which elements are valid HTML5 semantic elements.',
    difficulty: 'intermediate',
    tags: ['html', 'basics', 'html5', 'semantic-html', 'intermediate'],
    explanation:
      '<header>, <nav>, <main>, <article>, <section>, <aside>, and <footer> are all valid HTML5 semantic elements. <div> and <span> are generic containers, not semantic elements.',
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: '<header>',
        isCorrect: true,
        explanation: 'Correct. <header> is a semantic HTML5 element.',
      },
      {
        id: 'o2',
        text: '<nav>',
        isCorrect: true,
        explanation: 'Correct. <nav> is a semantic HTML5 element.',
      },
      {
        id: 'o3',
        text: '<main>',
        isCorrect: true,
        explanation: 'Correct. <main> is a semantic HTML5 element.',
      },
      {
        id: 'o4',
        text: '<div>',
        isCorrect: false,
        explanation:
          'Incorrect. <div> is a generic container, not a semantic element.',
      },
    ],
  },
  {
    title: "What are the valid values for the 'contenteditable' attribute?",
    content:
      'The contenteditable attribute allows users to edit content. Explain its valid values and behavior.',
    difficulty: 'intermediate',
    tags: ['html', 'basics', 'contenteditable', 'intermediate'],
    explanation:
      "contenteditable can be 'true' (editable), 'false' (not editable), or 'inherit' (inherits from parent). Empty string is treated as 'true'. Used for rich text editors, inline editing, and interactive content.",
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: "'true', 'false', or 'inherit'",
        isCorrect: true,
        explanation: 'Correct. These are the valid values for contenteditable.',
      },
      {
        id: 'o2',
        text: "Only 'true' or 'false'",
        isCorrect: false,
        explanation: "Incorrect. 'inherit' is also a valid value.",
      },
      {
        id: 'o3',
        text: 'Any string value',
        isCorrect: false,
        explanation: 'Incorrect. Only specific values are recognized.',
      },
      {
        id: 'o4',
        text: 'Numeric values only',
        isCorrect: false,
        explanation: 'Incorrect. contenteditable uses string values.',
      },
    ],
  },
  {
    title:
      'Which attributes are required for proper <a> tag functionality? (Select all that apply)',
    content:
      'Anchor tags need specific attributes. Identify which attributes are essential for proper link functionality.',
    difficulty: 'intermediate',
    tags: ['html', 'basics', 'links', 'intermediate'],
    explanation:
      "'href' is required for navigation (can be '#' or 'javascript:void(0)' for no-op). 'target' is optional (opens in new window). 'rel' is optional but recommended for security (noopener, noreferrer). 'title' is optional for tooltips.",
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'href',
        isCorrect: true,
        explanation: 'Correct. href is required for link functionality.',
      },
      {
        id: 'o2',
        text: 'target',
        isCorrect: false,
        explanation: 'Incorrect. target is optional.',
      },
      {
        id: 'o3',
        text: 'rel',
        isCorrect: false,
        explanation: 'Incorrect. rel is optional but recommended for security.',
      },
      {
        id: 'o4',
        text: 'title',
        isCorrect: false,
        explanation: 'Incorrect. title is optional for tooltips.',
      },
    ],
  },
  {
    title: "What is the purpose of the 'translate' attribute in HTML5?",
    content:
      'Internationalization requires proper attributes. Explain the translate attribute and its impact on translation tools.',
    difficulty: 'intermediate',
    tags: ['html', 'basics', 'i18n', 'translate', 'intermediate'],
    explanation:
      "'translate' attribute controls whether content should be translated: 'yes' (default, translate), 'no' (don't translate). Useful for proper nouns, code, brand names that shouldn't be translated. Helps translation tools and services.",
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'Controls whether content should be translated by translation tools',
        isCorrect: true,
        explanation:
          "Correct. translate='no' prevents translation, translate='yes' allows it.",
      },
      {
        id: 'o2',
        text: 'Specifies the language of the content',
        isCorrect: false,
        explanation: "Incorrect. The 'lang' attribute specifies language.",
      },
      {
        id: 'o3',
        text: 'Enables automatic translation on page load',
        isCorrect: false,
        explanation:
          "Incorrect. It only hints to translation tools, doesn't enable automatic translation.",
      },
      {
        id: 'o4',
        text: 'Controls text direction (LTR/RTL)',
        isCorrect: false,
        explanation: "Incorrect. The 'dir' attribute controls text direction.",
      },
    ],
  },
  {
    title:
      'Which of the following are self-closing HTML elements? (Select all that apply)',
    content:
      "Understanding self-closing elements is important. Identify which HTML elements are self-closing and don't require closing tags.",
    difficulty: 'intermediate',
    tags: ['html', 'basics', 'syntax', 'intermediate'],
    explanation:
      '<img>, <br>, <hr>, <input>, <meta>, <link>, <area>, <base>, <col>, <embed>, <source>, and <track> are self-closing elements. <div>, <span>, <p> require closing tags.',
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: '<img>',
        isCorrect: true,
        explanation: 'Correct. <img> is a self-closing element.',
      },
      {
        id: 'o2',
        text: '<br>',
        isCorrect: true,
        explanation: 'Correct. <br> is a self-closing element.',
      },
      {
        id: 'o3',
        text: '<input>',
        isCorrect: true,
        explanation: 'Correct. <input> is a self-closing element.',
      },
      {
        id: 'o4',
        text: '<div>',
        isCorrect: false,
        explanation: 'Incorrect. <div> requires a closing tag.',
      },
    ],
  },
];

moreBasics.forEach((q, idx) => {
  newQuestions.push(
    createQuestion(
      2,
      idx + 81,
      q.title,
      q.content,
      'Basics',
      q.difficulty,
      q.tags,
      q.explanation,
      q.points,
      q.options,
      q.type
    )
  );
});

console.log(
  `Generated ${newQuestions.length} additional Basics questions. Continuing...`
);

// Additional Forms questions (5 more)
const moreForms = [
  {
    title:
      'Which input types provide built-in validation in HTML5? (Select all that apply)',
    content:
      'HTML5 input types include validation. Identify which types provide native browser validation.',
    difficulty: 'intermediate',
    tags: ['html', 'forms', 'validation', 'html5', 'intermediate'],
    explanation:
      "email, url, number, date, time, tel, and search provide built-in validation. text and password don't have format validation (only required validation).",
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'email',
        isCorrect: true,
        explanation: 'Correct. email type validates email format.',
      },
      {
        id: 'o2',
        text: 'url',
        isCorrect: true,
        explanation: 'Correct. url type validates URL format.',
      },
      {
        id: 'o3',
        text: 'number',
        isCorrect: true,
        explanation: 'Correct. number type validates numeric input.',
      },
      {
        id: 'o4',
        text: 'text',
        isCorrect: false,
        explanation: "Incorrect. text type doesn't provide format validation.",
      },
    ],
  },
  {
    title:
      "What is the purpose of the 'formaction' attribute on submit buttons?",
    content:
      'Form submission can be customized per button. Explain the formaction attribute and its use cases.',
    difficulty: 'intermediate',
    tags: ['html', 'forms', 'buttons', 'intermediate'],
    explanation:
      "'formaction' overrides form's action attribute for specific submit button. Allows different submit buttons to send form to different URLs. Useful for multi-step forms, different actions (save vs publish), or A/B testing different endpoints.",
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: "Overrides the form's action attribute for that specific submit button",
        isCorrect: true,
        explanation:
          'Correct. formaction allows different buttons to submit to different URLs.',
      },
      {
        id: 'o2',
        text: "Specifies the form's default action",
        isCorrect: false,
        explanation: "Incorrect. That's the form's 'action' attribute.",
      },
      {
        id: 'o3',
        text: 'Prevents form submission',
        isCorrect: false,
        explanation:
          "Incorrect. formaction changes where form submits, doesn't prevent it.",
      },
      {
        id: 'o4',
        text: 'Validates form before submission',
        isCorrect: false,
        explanation: 'Incorrect. Validation is handled by other attributes.',
      },
    ],
  },
  {
    title:
      'Which attributes help prevent form spam and abuse? (Select all that apply)',
    content:
      'Form security requires multiple strategies. Identify attributes and techniques that help prevent spam and abuse.',
    difficulty: 'difficult',
    tags: ['html', 'forms', 'security', 'spam-prevention', 'difficult'],
    explanation:
      "'autocomplete' can help (but not prevent spam). 'name' attributes are required but don't prevent spam. Server-side validation, CAPTCHA, rate limiting, and CSRF tokens are needed. HTML5 validation can be bypassed. No single HTML attribute prevents spam.",
    points: 20,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'CSRF tokens (server-side)',
        isCorrect: true,
        explanation:
          'Correct. CSRF tokens help prevent cross-site request forgery.',
      },
      {
        id: 'o2',
        text: 'HTML5 validation attributes',
        isCorrect: false,
        explanation: 'Incorrect. Client-side validation can be bypassed.',
      },
      {
        id: 'o3',
        text: 'Rate limiting (server-side)',
        isCorrect: true,
        explanation: 'Correct. Rate limiting prevents abuse.',
      },
      {
        id: 'o4',
        text: 'autocomplete attribute',
        isCorrect: false,
        explanation: "Incorrect. autocomplete doesn't prevent spam.",
      },
    ],
  },
  {
    title:
      "What is the difference between 'formmethod' and 'method' attributes?",
    content:
      "Form submission methods can be customized. Explain formmethod attribute and how it relates to form's method attribute.",
    difficulty: 'intermediate',
    tags: ['html', 'forms', 'http-methods', 'intermediate'],
    explanation:
      "'method' on <form> sets default HTTP method (GET/POST). 'formmethod' on submit button overrides method for that specific button. Allows different buttons to use different methods (e.g., one button POSTs, another GETs for preview).",
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: "formmethod overrides form's method attribute for that specific submit button",
        isCorrect: true,
        explanation: 'Correct. formmethod allows per-button method override.',
      },
      {
        id: 'o2',
        text: 'They are identical and interchangeable',
        isCorrect: false,
        explanation:
          'Incorrect. formmethod is button-specific, method is form-wide.',
      },
      {
        id: 'o3',
        text: 'formmethod is for GET only, method is for POST only',
        isCorrect: false,
        explanation: 'Incorrect. Both can use GET or POST.',
      },
      {
        id: 'o4',
        text: 'method is deprecated, use formmethod instead',
        isCorrect: false,
        explanation: 'Incorrect. Both are valid, method is form-wide default.',
      },
    ],
  },
  {
    title:
      'Which form attributes improve mobile user experience? (Select all that apply)',
    content:
      'Mobile forms require specific considerations. Identify attributes that enhance mobile UX.',
    difficulty: 'intermediate',
    tags: ['html', 'forms', 'mobile', 'ux', 'intermediate'],
    explanation:
      "'inputmode' suggests mobile keyboard type. 'autocomplete' helps with autofill. 'placeholder' provides hints. 'type' (email, tel, number) shows appropriate keyboards. 'required' provides validation feedback.",
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'inputmode (suggests keyboard type)',
        isCorrect: true,
        explanation:
          'Correct. inputmode helps show appropriate mobile keyboard.',
      },
      {
        id: 'o2',
        text: "type='email' or 'tel' (shows appropriate keyboard)",
        isCorrect: true,
        explanation:
          'Correct. Specific input types show specialized keyboards.',
      },
      {
        id: 'o3',
        text: 'autocomplete (helps with autofill)',
        isCorrect: true,
        explanation: 'Correct. autocomplete improves mobile form filling.',
      },
      {
        id: 'o4',
        text: 'style attribute',
        isCorrect: false,
        explanation:
          "Incorrect. style doesn't specifically improve mobile UX for forms.",
      },
    ],
  },
];

moreForms.forEach((q, idx) => {
  newQuestions.push(
    createQuestion(
      3,
      idx + 86,
      q.title,
      q.content,
      'Forms',
      q.difficulty,
      q.tags,
      q.explanation,
      q.points,
      q.options,
      q.type
    )
  );
});

console.log(
  `Generated ${newQuestions.length} total additional questions. Continuing with more topics...`
);

// Additional Media questions (5 more)
const moreMedia = [
  {
    title:
      'Which attributes improve image accessibility and SEO? (Select all that apply)',
    content:
      'Images need proper attributes for accessibility and search engines. Identify which attributes are important.',
    difficulty: 'intermediate',
    tags: ['html', 'media', 'accessibility', 'seo', 'intermediate'],
    explanation:
      "'alt' is required for accessibility and SEO. 'title' provides additional context. 'loading' improves performance. 'width' and 'height' prevent layout shift. 'srcset' and 'sizes' enable responsive images.",
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'alt (required for accessibility)',
        isCorrect: true,
        explanation: 'Correct. alt is essential for screen readers and SEO.',
      },
      {
        id: 'o2',
        text: 'width and height (prevent layout shift)',
        isCorrect: true,
        explanation: 'Correct. Dimensions prevent Cumulative Layout Shift.',
      },
      {
        id: 'o3',
        text: 'loading (improves performance)',
        isCorrect: true,
        explanation: 'Correct. Lazy loading improves page load performance.',
      },
      {
        id: 'o4',
        text: 'style (for positioning)',
        isCorrect: false,
        explanation: "Incorrect. style doesn't improve accessibility or SEO.",
      },
    ],
  },
  {
    title: "What is the purpose of the 'decoding' attribute on <img> elements?",
    content:
      'Image decoding affects rendering performance. Explain the decoding attribute and its impact on page rendering.',
    difficulty: 'intermediate',
    tags: ['html', 'media', 'performance', 'images', 'intermediate'],
    explanation:
      "'decoding' hints how image should be decoded: 'sync' (blocking), 'async' (non-blocking), 'auto' (browser decides). 'async' allows other content to render while image decodes. Improves perceived performance, especially for large images.",
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'Hints whether image decoding should block rendering (sync) or be non-blocking (async)',
        isCorrect: true,
        explanation:
          'Correct. decoding controls whether image decoding blocks rendering.',
      },
      {
        id: 'o2',
        text: 'Specifies the image file format',
        isCorrect: false,
        explanation:
          'Incorrect. The file extension or type attribute specifies format.',
      },
      {
        id: 'o3',
        text: 'Controls image quality compression',
        isCorrect: false,
        explanation:
          'Incorrect. Compression is handled server-side or by format choice.',
      },
      {
        id: 'o4',
        text: 'Determines image display size',
        isCorrect: false,
        explanation:
          'Incorrect. width and height attributes control display size.',
      },
    ],
  },
  {
    title:
      'Which video attributes control playback behavior? (Select all that apply)',
    content:
      'Video elements have many playback controls. Identify which attributes affect how videos play.',
    difficulty: 'intermediate',
    tags: ['html', 'media', 'video', 'intermediate'],
    explanation:
      "'autoplay' starts automatically. 'controls' shows UI. 'loop' repeats. 'muted' silences (required for autoplay). 'playsinline' prevents fullscreen on mobile. 'preload' controls loading. 'poster' shows thumbnail.",
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'autoplay (starts automatically)',
        isCorrect: true,
        explanation: 'Correct. autoplay starts video automatically.',
      },
      {
        id: 'o2',
        text: 'loop (repeats video)',
        isCorrect: true,
        explanation: 'Correct. loop makes video repeat.',
      },
      {
        id: 'o3',
        text: 'muted (required for autoplay in most browsers)',
        isCorrect: true,
        explanation: 'Correct. muted is often required for autoplay.',
      },
      {
        id: 'o4',
        text: 'src (video source URL)',
        isCorrect: false,
        explanation:
          "Incorrect. src specifies source, doesn't control playback behavior.",
      },
    ],
  },
  {
    title:
      "What is the purpose of the 'track' element within <video> or <audio>?",
    content:
      'Media accessibility requires captions and subtitles. Explain the track element and its role in accessible media.',
    difficulty: 'intermediate',
    tags: ['html', 'media', 'accessibility', 'captions', 'intermediate'],
    explanation:
      "<track> provides timed text tracks: subtitles, captions, descriptions, chapters, metadata. 'kind' attribute specifies type. 'srclang' specifies language. 'label' provides user-visible label. Essential for accessibility and multilingual content.",
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'Provides timed text tracks (subtitles, captions, descriptions) for accessibility',
        isCorrect: true,
        explanation: 'Correct. track element adds captions and subtitles.',
      },
      {
        id: 'o2',
        text: 'Controls video playback speed',
        isCorrect: false,
        explanation:
          'Incorrect. Playback speed is controlled via JavaScript API.',
      },
      {
        id: 'o3',
        text: 'Specifies video codec format',
        isCorrect: false,
        explanation: 'Incorrect. Codec is determined by video file format.',
      },
      {
        id: 'o4',
        text: 'Enables video streaming',
        isCorrect: false,
        explanation: 'Incorrect. Streaming is handled by server and protocol.',
      },
    ],
  },
  {
    title: 'Which image formats support transparency? (Select all that apply)',
    content:
      'Image format choice affects capabilities. Identify which formats support transparency (alpha channel).',
    difficulty: 'intermediate',
    tags: ['html', 'media', 'images', 'formats', 'intermediate'],
    explanation:
      'PNG, WebP, SVG, and GIF support transparency. JPEG does not support transparency. PNG-24 and WebP support full alpha channel. GIF supports single-color transparency. SVG supports transparency via CSS or attributes.',
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'PNG',
        isCorrect: true,
        explanation: 'Correct. PNG supports transparency.',
      },
      {
        id: 'o2',
        text: 'WebP',
        isCorrect: true,
        explanation: 'Correct. WebP supports transparency.',
      },
      {
        id: 'o3',
        text: 'SVG',
        isCorrect: true,
        explanation: 'Correct. SVG supports transparency.',
      },
      {
        id: 'o4',
        text: 'JPEG',
        isCorrect: false,
        explanation: 'Incorrect. JPEG does not support transparency.',
      },
    ],
  },
];

moreMedia.forEach((q, idx) => {
  newQuestions.push(
    createQuestion(
      4,
      idx + 91,
      q.title,
      q.content,
      'Media',
      q.difficulty,
      q.tags,
      q.explanation,
      q.points,
      q.options,
      q.type
    )
  );
});

console.log(
  `Generated ${newQuestions.length} total additional questions. Continuing...`
);

// Additional SEO questions (5 more)
const moreSEO = [
  {
    title: 'Which meta tags are essential for SEO? (Select all that apply)',
    content:
      'SEO requires specific meta tags. Identify which meta tags are most important for search engine optimization.',
    difficulty: 'intermediate',
    tags: ['html', 'seo', 'meta-tags', 'intermediate'],
    explanation:
      "<title> is critical. <meta name='description'> is important for snippets. <meta charset> is required. Open Graph tags help social sharing. robots meta can control indexing. keywords meta is largely ignored.",
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: '<title> (critical for SEO)',
        isCorrect: true,
        explanation:
          'Correct. Title tag is one of the most important SEO elements.',
      },
      {
        id: 'o2',
        text: "<meta name='description'> (affects search snippets)",
        isCorrect: true,
        explanation: 'Correct. Description affects click-through rates.',
      },
      {
        id: 'o3',
        text: '<meta charset> (required for proper rendering)',
        isCorrect: true,
        explanation: 'Correct. Charset is essential for proper text rendering.',
      },
      {
        id: 'o4',
        text: "<meta name='keywords'> (largely ignored by search engines)",
        isCorrect: false,
        explanation: 'Incorrect. Keywords meta tag is deprecated and ignored.',
      },
    ],
  },
  {
    title:
      'What is the purpose of hreflang tags? How do they help with international SEO?',
    content:
      'Multilingual sites need proper language targeting. Explain hreflang tags and their role in international SEO.',
    difficulty: 'intermediate',
    tags: ['html', 'seo', 'i18n', 'hreflang', 'intermediate'],
    explanation:
      "hreflang tells search engines which language/region version of page to show. Format: <link rel='alternate' hreflang='en' href='...'>. Helps serve correct language to users. Prevents duplicate content issues. Essential for multilingual sites.",
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'Tells search engines which language/region version to show users',
        isCorrect: true,
        explanation: 'Correct. hreflang helps with language targeting.',
      },
      {
        id: 'o2',
        text: "Specifies the page's primary language",
        isCorrect: false,
        explanation:
          "Incorrect. The 'lang' attribute on <html> specifies page language.",
      },
      {
        id: 'o3',
        text: 'Enables automatic translation',
        isCorrect: false,
        explanation:
          "Incorrect. hreflang doesn't enable translation, it helps serve the right version.",
      },
      {
        id: 'o4',
        text: 'Controls search result ranking',
        isCorrect: false,
        explanation:
          'Incorrect. hreflang helps with targeting, not ranking algorithm.',
      },
    ],
  },
  {
    title:
      'Which structured data types help with rich snippets? (Select all that apply)',
    content:
      'Structured data enables rich search results. Identify Schema.org types that commonly produce rich snippets.',
    difficulty: 'intermediate',
    tags: ['html', 'seo', 'structured-data', 'rich-snippets', 'intermediate'],
    explanation:
      'Article, Product, Review, Recipe, Event, Organization, Person, BreadcrumbList, FAQPage, and VideoObject commonly produce rich snippets. Each provides different information (ratings, prices, dates, etc.) in search results.',
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'Product (shows price, rating, availability)',
        isCorrect: true,
        explanation:
          'Correct. Product schema enables rich snippets with pricing.',
      },
      {
        id: 'o2',
        text: 'Article (shows publish date, author)',
        isCorrect: true,
        explanation: 'Correct. Article schema shows publication info.',
      },
      {
        id: 'o3',
        text: 'Review (shows star ratings)',
        isCorrect: true,
        explanation: 'Correct. Review schema enables star ratings in results.',
      },
      {
        id: 'o4',
        text: 'GenericObject (not a real schema type)',
        isCorrect: false,
        explanation: 'Incorrect. This is not a valid Schema.org type.',
      },
    ],
  },
  {
    title:
      "What is the difference between 'noindex' and 'nofollow' in robots meta tags?",
    content:
      'Controlling search engine behavior requires understanding robots directives. Explain noindex vs nofollow.',
    difficulty: 'intermediate',
    tags: ['html', 'seo', 'robots', 'meta-tags', 'intermediate'],
    explanation:
      "'noindex' prevents page from appearing in search results (page not indexed). 'nofollow' tells crawlers not to follow links on page (links not crawled, no PageRank passed). Can combine: 'noindex, nofollow'. Use noindex for private pages, nofollow for untrusted links.",
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'noindex prevents indexing the page; nofollow prevents following links on the page',
        isCorrect: true,
        explanation: 'Correct. They control different aspects of crawling.',
      },
      {
        id: 'o2',
        text: 'They are identical and interchangeable',
        isCorrect: false,
        explanation: 'Incorrect. They serve different purposes.',
      },
      {
        id: 'o3',
        text: 'noindex is for images, nofollow is for text',
        isCorrect: false,
        explanation: 'Incorrect. Both apply to pages, not content types.',
      },
      {
        id: 'o4',
        text: 'nofollow is deprecated, use noindex instead',
        isCorrect: false,
        explanation: 'Incorrect. Both are valid and serve different purposes.',
      },
    ],
  },
  {
    title: 'Which HTML elements contribute to SEO? (Select all that apply)',
    content:
      "SEO isn't just about meta tags. Identify which HTML elements help search engines understand and rank content.",
    difficulty: 'intermediate',
    tags: ['html', 'seo', 'semantic-html', 'intermediate'],
    explanation:
      'Semantic HTML5 elements (<header>, <nav>, <main>, <article>, <section>), heading hierarchy (<h1>-<h6>), <title>, <meta> tags, alt text on images, and proper link structure all contribute to SEO. Search engines use semantic structure to understand content.',
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'Semantic HTML5 elements (<header>, <article>, etc.)',
        isCorrect: true,
        explanation:
          'Correct. Semantic elements help search engines understand structure.',
      },
      {
        id: 'o2',
        text: 'Heading hierarchy (<h1>-<h6>)',
        isCorrect: true,
        explanation: 'Correct. Headings indicate content importance.',
      },
      {
        id: 'o3',
        text: 'Alt text on images',
        isCorrect: true,
        explanation: 'Correct. Alt text helps with image SEO.',
      },
      {
        id: 'o4',
        text: 'Inline styles (CSS)',
        isCorrect: false,
        explanation: "Incorrect. Styles don't directly affect SEO.",
      },
    ],
  },
];

moreSEO.forEach((q, idx) => {
  newQuestions.push(
    createQuestion(
      5,
      idx + 96,
      q.title,
      q.content,
      'SEO',
      q.difficulty,
      q.tags,
      q.explanation,
      q.points,
      q.options,
      q.type
    )
  );
});

console.log(
  `Generated ${newQuestions.length} total additional questions. Continuing with Accessibility, Performance, and HTML5 APIs...`
);

// Additional Accessibility questions (5 more)
const moreAccessibility = [
  {
    title:
      'Which ARIA attributes help describe dynamic content changes? (Select all that apply)',
    content:
      'Dynamic content needs proper ARIA announcements. Identify attributes that help screen readers understand changes.',
    difficulty: 'intermediate',
    tags: ['html', 'accessibility', 'aria', 'dynamic-content', 'intermediate'],
    explanation:
      "'aria-live' announces dynamic changes. 'aria-atomic' controls whether entire region or just changes are announced. 'aria-relevant' specifies what changes trigger announcements. 'aria-busy' indicates content is updating.",
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'aria-live (announces changes)',
        isCorrect: true,
        explanation: 'Correct. aria-live enables dynamic announcements.',
      },
      {
        id: 'o2',
        text: 'aria-atomic (controls announcement scope)',
        isCorrect: true,
        explanation: 'Correct. aria-atomic controls what gets announced.',
      },
      {
        id: 'o3',
        text: 'aria-busy (indicates updating content)',
        isCorrect: true,
        explanation: 'Correct. aria-busy signals content is changing.',
      },
      {
        id: 'o4',
        text: 'aria-hidden (hides from screen readers)',
        isCorrect: false,
        explanation:
          "Incorrect. aria-hidden hides content, doesn't describe changes.",
      },
    ],
  },
  {
    title: "What is the purpose of 'aria-keyshortcuts' attribute?",
    content:
      'Keyboard shortcuts need to be announced. Explain aria-keyshortcuts and its role in keyboard accessibility.',
    difficulty: 'intermediate',
    tags: ['html', 'accessibility', 'aria', 'keyboard', 'intermediate'],
    explanation:
      "'aria-keyshortcuts' announces keyboard shortcuts to screen reader users. Format: 'Ctrl+K' or 'Alt+Shift+T'. Helps users discover and remember shortcuts. Important for power users and keyboard navigation.",
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'Announces keyboard shortcuts to screen reader users',
        isCorrect: true,
        explanation:
          'Correct. aria-keyshortcuts helps users discover shortcuts.',
      },
      {
        id: 'o2',
        text: 'Enables keyboard shortcuts programmatically',
        isCorrect: false,
        explanation:
          'Incorrect. Shortcuts are handled via JavaScript, not ARIA.',
      },
      {
        id: 'o3',
        text: 'Prevents keyboard shortcuts from working',
        isCorrect: false,
        explanation:
          "Incorrect. It only announces them, doesn't control functionality.",
      },
      {
        id: 'o4',
        text: 'Specifies which keys are disabled',
        isCorrect: false,
        explanation:
          'Incorrect. It describes available shortcuts, not disabled keys.',
      },
    ],
  },
  {
    title:
      'Which elements should have focus indicators? (Select all that apply)',
    content:
      'Keyboard navigation requires visible focus. Identify which interactive elements need focus indicators.',
    difficulty: 'intermediate',
    tags: [
      'html',
      'accessibility',
      'keyboard-navigation',
      'focus',
      'intermediate',
    ],
    explanation:
      'All interactive elements need focus indicators: <a>, <button>, <input>, <select>, <textarea>, custom interactive elements. Focus indicators help keyboard users see where they are. Essential for accessibility compliance (WCAG).',
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: '<a> (links)',
        isCorrect: true,
        explanation: 'Correct. Links need focus indicators.',
      },
      {
        id: 'o2',
        text: '<button> (buttons)',
        isCorrect: true,
        explanation: 'Correct. Buttons need focus indicators.',
      },
      {
        id: 'o3',
        text: '<input> (form controls)',
        isCorrect: true,
        explanation: 'Correct. Form inputs need focus indicators.',
      },
      {
        id: 'o4',
        text: '<div> (generic container)',
        isCorrect: false,
        explanation:
          'Incorrect. Only interactive elements need focus indicators.',
      },
    ],
  },
  {
    title: "What is the purpose of 'aria-orientation' attribute?",
    content:
      "Component orientation affects accessibility. Explain aria-orientation and when it's needed.",
    difficulty: 'intermediate',
    tags: ['html', 'accessibility', 'aria', 'orientation', 'intermediate'],
    explanation:
      "'aria-orientation' specifies component orientation: 'horizontal' (sliders, tabs) or 'vertical' (menus, lists). Helps screen readers understand layout and navigation direction. Important for custom components like sliders and tab panels.",
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'Specifies whether component is horizontal or vertical (for sliders, tabs, etc.)',
        isCorrect: true,
        explanation: 'Correct. aria-orientation describes layout direction.',
      },
      {
        id: 'o2',
        text: 'Controls screen rotation on mobile devices',
        isCorrect: false,
        explanation:
          "Incorrect. It's about component layout, not device orientation.",
      },
      {
        id: 'o3',
        text: 'Specifies text direction (LTR/RTL)',
        isCorrect: false,
        explanation: "Incorrect. The 'dir' attribute controls text direction.",
      },
      {
        id: 'o4',
        text: 'Enables automatic layout rotation',
        isCorrect: false,
        explanation:
          "Incorrect. It only describes orientation, doesn't control it.",
      },
    ],
  },
  {
    title:
      'Which techniques improve form accessibility? (Select all that apply)',
    content:
      'Accessible forms require multiple techniques. Identify best practices for form accessibility.',
    difficulty: 'intermediate',
    tags: ['html', 'accessibility', 'forms', 'intermediate'],
    explanation:
      'Proper <label> association (for/id), <fieldset>/<legend> for grouping, error messages with aria-describedby, required indicators, clear instructions, and logical tab order all improve form accessibility.',
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'Proper label association (for/id attributes)',
        isCorrect: true,
        explanation: 'Correct. Labels must be associated with inputs.',
      },
      {
        id: 'o2',
        text: 'fieldset and legend for grouping',
        isCorrect: true,
        explanation:
          'Correct. Grouping helps screen reader users understand form structure.',
      },
      {
        id: 'o3',
        text: 'Error messages with aria-describedby',
        isCorrect: true,
        explanation: 'Correct. Errors should be announced to screen readers.',
      },
      {
        id: 'o4',
        text: 'Using only div elements for layout',
        isCorrect: false,
        explanation: 'Incorrect. Semantic HTML is important for accessibility.',
      },
    ],
  },
];

moreAccessibility.forEach((q, idx) => {
  newQuestions.push(
    createQuestion(
      6,
      idx + 101,
      q.title,
      q.content,
      'Accessibility',
      q.difficulty,
      q.tags,
      q.explanation,
      q.points,
      q.options,
      q.type
    )
  );
});

// Additional Performance questions (5 more)
const morePerformance = [
  {
    title:
      'Which techniques reduce initial page load time? (Select all that apply)',
    content:
      'Performance optimization requires multiple strategies. Identify techniques that improve initial page load.',
    difficulty: 'intermediate',
    tags: ['html', 'performance', 'page-load', 'intermediate'],
    explanation:
      'Lazy loading images, deferring non-critical scripts, inlining critical CSS, using resource hints (preload, preconnect), minimizing render-blocking resources, and code splitting all reduce initial load time.',
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'Lazy loading below-fold images',
        isCorrect: true,
        explanation: 'Correct. Lazy loading reduces initial payload.',
      },
      {
        id: 'o2',
        text: 'Deferring non-critical JavaScript',
        isCorrect: true,
        explanation: 'Correct. Defer prevents render blocking.',
      },
      {
        id: 'o3',
        text: 'Using preload for critical resources',
        isCorrect: true,
        explanation: 'Correct. Preload prioritizes critical assets.',
      },
      {
        id: 'o4',
        text: 'Loading all resources immediately',
        isCorrect: false,
        explanation: 'Incorrect. This increases load time.',
      },
    ],
  },
  {
    title:
      "What is the purpose of the 'importance' attribute (hint) on <link> and <script>?",
    content:
      'Resource priority hints optimize loading. Explain the importance attribute and its impact on resource prioritization.',
    difficulty: 'intermediate',
    tags: ['html', 'performance', 'resource-priority', 'intermediate'],
    explanation:
      "'importance' hint (or 'fetchpriority') suggests resource priority: 'high' (critical, above-fold), 'low' (non-critical, below-fold), 'auto' (default). Helps browser prioritize resource loading. Improves Core Web Vitals, especially LCP.",
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'Hints browser about resource loading priority (high/low/auto)',
        isCorrect: true,
        explanation: 'Correct. importance helps browser prioritize resources.',
      },
      {
        id: 'o2',
        text: 'Specifies resource file size',
        isCorrect: false,
        explanation: "Incorrect. It's about priority, not size.",
      },
      {
        id: 'o3',
        text: 'Controls resource caching',
        isCorrect: false,
        explanation:
          'Incorrect. Caching is controlled by Cache-Control headers.',
      },
      {
        id: 'o4',
        text: 'Enables resource compression',
        isCorrect: false,
        explanation:
          'Incorrect. Compression is handled by server/Content-Encoding.',
      },
    ],
  },
  {
    title:
      'Which attributes help prevent layout shift (CLS)? (Select all that apply)',
    content:
      'Cumulative Layout Shift hurts user experience. Identify techniques that prevent unexpected layout shifts.',
    difficulty: 'intermediate',
    tags: ['html', 'performance', 'cls', 'layout-shift', 'intermediate'],
    explanation:
      'Setting width and height on images, reserving space for ads/embeds, using aspect-ratio CSS, avoiding inserting content above existing content, and using font-display: swap properly all help prevent CLS.',
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'width and height attributes on images',
        isCorrect: true,
        explanation: 'Correct. Dimensions reserve space and prevent shift.',
      },
      {
        id: 'o2',
        text: 'aspect-ratio CSS property',
        isCorrect: true,
        explanation: 'Correct. aspect-ratio reserves space.',
      },
      {
        id: 'o3',
        text: 'Loading images without dimensions',
        isCorrect: false,
        explanation: 'Incorrect. This causes layout shift.',
      },
      {
        id: 'o4',
        text: 'Reserving space for dynamic content',
        isCorrect: true,
        explanation: 'Correct. Reserving space prevents shifts.',
      },
    ],
  },
  {
    title:
      "What is the difference between 'modulepreload' and 'preload' for JavaScript modules?",
    content:
      'Module loading has specific optimization techniques. Explain modulepreload vs preload for ES6 modules.',
    difficulty: 'difficult',
    tags: ['html', 'performance', 'javascript-modules', 'difficult'],
    explanation:
      "'preload' loads module file but doesn't execute dependencies. 'modulepreload' loads module and recursively preloads all its dependencies. modulepreload is more comprehensive for module optimization. Use modulepreload for critical module entry points.",
    points: 20,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'modulepreload recursively preloads module dependencies; preload only loads the file',
        isCorrect: true,
        explanation: 'Correct. modulepreload is more comprehensive.',
      },
      {
        id: 'o2',
        text: 'They are identical',
        isCorrect: false,
        explanation: 'Incorrect. modulepreload handles dependencies.',
      },
      {
        id: 'o3',
        text: 'preload is for modules, modulepreload is for regular scripts',
        isCorrect: false,
        explanation:
          "Incorrect. It's the opposite - modulepreload is for modules.",
      },
      {
        id: 'o4',
        text: 'modulepreload is deprecated',
        isCorrect: false,
        explanation: 'Incorrect. modulepreload is the modern approach.',
      },
    ],
  },
  {
    title:
      'Which techniques improve font loading performance? (Select all that apply)',
    content:
      'Web fonts can block rendering. Identify techniques that optimize font loading and prevent FOIT/FOUT.',
    difficulty: 'intermediate',
    tags: ['html', 'performance', 'fonts', 'intermediate'],
    explanation:
      'font-display: swap (shows fallback immediately), preloading font files, using font-display: optional for non-critical fonts, subsetting fonts, and using system fonts as fallbacks all improve font performance.',
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'font-display: swap (shows fallback immediately)',
        isCorrect: true,
        explanation: 'Correct. swap prevents invisible text.',
      },
      {
        id: 'o2',
        text: 'Preloading critical font files',
        isCorrect: true,
        explanation: 'Correct. Preload reduces font load time.',
      },
      {
        id: 'o3',
        text: 'Using font-display: block (causes FOIT)',
        isCorrect: false,
        explanation: 'Incorrect. block causes Flash of Invisible Text.',
      },
      {
        id: 'o4',
        text: 'Subsetting fonts to reduce file size',
        isCorrect: true,
        explanation: 'Correct. Smaller fonts load faster.',
      },
    ],
  },
];

morePerformance.forEach((q, idx) => {
  newQuestions.push(
    createQuestion(
      7,
      idx + 106,
      q.title,
      q.content,
      'Performance',
      q.difficulty,
      q.tags,
      q.explanation,
      q.points,
      q.options,
      q.type
    )
  );
});

// Additional HTML5 APIs questions (5 more)
const moreHTML5APIs = [
  {
    title:
      'Which Web Storage API methods are available? (Select all that apply)',
    content:
      'Web Storage provides client-side storage. Identify the methods available in the Storage API.',
    difficulty: 'intermediate',
    tags: ['html', 'html5-apis', 'web-storage', 'intermediate'],
    explanation:
      'setItem(key, value), getItem(key), removeItem(key), clear(), and length property are available. All methods are synchronous. Keys and values are strings. Storage is limited to ~5-10MB per origin.',
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'setItem(key, value)',
        isCorrect: true,
        explanation: 'Correct. setItem stores a value.',
      },
      {
        id: 'o2',
        text: 'getItem(key)',
        isCorrect: true,
        explanation: 'Correct. getItem retrieves a value.',
      },
      {
        id: 'o3',
        text: 'removeItem(key)',
        isCorrect: true,
        explanation: 'Correct. removeItem deletes a value.',
      },
      {
        id: 'o4',
        text: 'asyncSetItem() (not a real method)',
        isCorrect: false,
        explanation: 'Incorrect. Storage API is synchronous.',
      },
    ],
  },
  {
    title: 'What is the difference between IndexedDB and Web Storage?',
    content:
      'Client-side storage has multiple options. Explain when to use IndexedDB vs localStorage/sessionStorage.',
    difficulty: 'difficult',
    tags: ['html', 'html5-apis', 'indexeddb', 'web-storage', 'difficult'],
    explanation:
      'Web Storage (localStorage/sessionStorage) is simple key-value store, synchronous, ~5-10MB limit, strings only. IndexedDB is object database, asynchronous, larger storage (~50% of disk), supports complex queries, indexes, transactions. Use Web Storage for simple data, IndexedDB for complex structured data.',
    points: 20,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'Web Storage is simple key-value (strings); IndexedDB is object database with queries and indexes',
        isCorrect: true,
        explanation: 'Correct. IndexedDB is more powerful for complex data.',
      },
      {
        id: 'o2',
        text: 'They are identical, just different names',
        isCorrect: false,
        explanation:
          'Incorrect. They have fundamentally different capabilities.',
      },
      {
        id: 'o3',
        text: 'Web Storage is faster, IndexedDB is slower',
        isCorrect: false,
        explanation:
          'Incorrect. IndexedDB is asynchronous and can be faster for large datasets.',
      },
      {
        id: 'o4',
        text: 'IndexedDB is deprecated, use Web Storage',
        isCorrect: false,
        explanation: 'Incorrect. Both are valid, IndexedDB is more powerful.',
      },
    ],
  },
  {
    title:
      'Which events are part of the Drag and Drop API? (Select all that apply)',
    content:
      'Drag and drop requires multiple events. Identify the events in the Drag and Drop API lifecycle.',
    difficulty: 'intermediate',
    tags: ['html', 'html5-apis', 'drag-drop', 'intermediate'],
    explanation:
      'dragstart (dragging begins), drag (during drag), dragend (drag ends), dragover (over drop zone), dragenter (enters drop zone), dragleave (leaves drop zone), drop (dropped). dragover must preventDefault() to allow drop.',
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'dragstart (drag begins)',
        isCorrect: true,
        explanation: 'Correct. dragstart fires when drag starts.',
      },
      {
        id: 'o2',
        text: 'dragover (over drop zone)',
        isCorrect: true,
        explanation: 'Correct. dragover fires continuously over drop zone.',
      },
      {
        id: 'o3',
        text: 'drop (item dropped)',
        isCorrect: true,
        explanation: 'Correct. drop fires when item is released.',
      },
      {
        id: 'o4',
        text: 'dragclick (not a real event)',
        isCorrect: false,
        explanation: 'Incorrect. This is not a drag and drop event.',
      },
    ],
  },
  {
    title: 'What is the purpose of the Notification API?',
    content:
      'Browser notifications enhance user engagement. Explain the Notification API and its use cases.',
    difficulty: 'intermediate',
    tags: ['html', 'html5-apis', 'notifications', 'intermediate'],
    explanation:
      'Notification API shows system notifications outside browser. Requires user permission (Notification.requestPermission()). Use for alerts, reminders, updates when page is not active. Part of Progressive Web App (PWA) features. Requires secure context (HTTPS).',
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'Shows system notifications outside the browser, requires user permission',
        isCorrect: true,
        explanation: 'Correct. Notifications work even when page is closed.',
      },
      {
        id: 'o2',
        text: 'Displays in-page alerts only',
        isCorrect: false,
        explanation: 'Incorrect. Notifications are system-level, not in-page.',
      },
      {
        id: 'o3',
        text: 'Automatically enabled without permission',
        isCorrect: false,
        explanation: 'Incorrect. User must grant permission first.',
      },
      {
        id: 'o4',
        text: 'Only works on mobile devices',
        isCorrect: false,
        explanation: 'Incorrect. Works on desktop and mobile browsers.',
      },
    ],
  },
  {
    title:
      'Which methods are available in the Geolocation API? (Select all that apply)',
    content:
      'Location services provide specific methods. Identify the methods in the Geolocation API.',
    difficulty: 'intermediate',
    tags: ['html', 'html5-apis', 'geolocation', 'intermediate'],
    explanation:
      'getCurrentPosition() gets location once, watchPosition() tracks location continuously, clearWatch() stops tracking. All require user permission. Options include enableHighAccuracy, timeout, maximumAge.',
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'getCurrentPosition() (one-time location)',
        isCorrect: true,
        explanation: 'Correct. Gets current position once.',
      },
      {
        id: 'o2',
        text: 'watchPosition() (continuous tracking)',
        isCorrect: true,
        explanation: 'Correct. Tracks position over time.',
      },
      {
        id: 'o3',
        text: 'clearWatch() (stops tracking)',
        isCorrect: true,
        explanation: 'Correct. Stops position watching.',
      },
      {
        id: 'o4',
        text: 'setLocation() (not a real method)',
        isCorrect: false,
        explanation: "Incorrect. You can't set location, only get it.",
      },
    ],
  },
];

moreHTML5APIs.forEach((q, idx) => {
  newQuestions.push(
    createQuestion(
      8,
      idx + 111,
      q.title,
      q.content,
      'HTML5 APIs',
      q.difficulty,
      q.tags,
      q.explanation,
      q.points,
      q.options,
      q.type
    )
  );
});

console.log(`Generated all ${newQuestions.length} additional questions!`);

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
  `   - Breakdown: Basics (+5), Forms (+5), Media (+5), SEO (+5), Accessibility (+5), Performance (+5), HTML5 APIs (+5)`
);

// Verify question types
const types = {};
allQuestions.forEach(q => {
  types[q.type] = (types[q.type] || 0) + 1;
});
console.log(`\nQuestion types:`);
Object.entries(types).forEach(([type, count]) =>
  console.log(`   ${type}: ${count}`)
);
