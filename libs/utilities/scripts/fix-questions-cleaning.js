// Script to fix code/content cleaning issues in all questions
// Applies the same cleaning algorithm used in the API route

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Supabase configuration - REQUIRES environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase environment variables");
  console.error(
    "Required: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY",
  );
  console.error("Please set these in your .env.local file");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Batch size - process 50 questions at a time
const BATCH_SIZE = 50;

/**
 * Decode HTML entities
 */
function decodeHtmlEntities(text) {
  if (!text) return "";
  const entityMap = {
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
    "&#x27;": "'",
    "&#x2F;": "/",
    "&nbsp;": " ",
    "&#160;": " ",
    "&apos;": "'",
  };
  let decoded = text;
  for (const [entity, char] of Object.entries(entityMap)) {
    decoded = decoded.replace(new RegExp(entity, "gi"), char);
  }
  decoded = decoded.replace(/&#(\d+);/g, (_, dec) =>
    String.fromCharCode(parseInt(dec, 10)),
  );
  decoded = decoded.replace(/&#x([0-9a-fA-F]+);/gi, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16)),
  );
  return decoded;
}

/**
 * Clean option text - optimized for markdown
 */
function cleanOptionText(text) {
  if (!text || typeof text !== "string") return text || "";

  let cleaned = text;

  // PHASE -1: Markdown-specific cleaning
  cleaned = cleaned
    .replace(/`{4,}/g, "```")
    .replace(/```{2,}([^`]+)```{2,}/g, "```$1```")
    .replace(/```{2,}([\s\S]*?)```{2,}/g, "```$1```")
    .replace(/```([^`\n]+)```/g, "`$1`")
    .replace(/([^`])``([^`\n]+)``([^`])/g, "$1`$2`$3")
    .replace(/\*{4,}([^*]+)\*{4,}/g, "**$1**")
    .replace(/\*{3}([^*]+)\*{3}/g, "*$1*");

  // PHASE 0: Fix special malformed patterns with backticks
  cleaned = cleaned
    .replace(/<pr`([^`]+)`\s*<\/pr/gi, "<pre><code>$1</code></pre>")
    .replace(/<pr`([\s\S]*?)`\s*<\/pr/gi, "<pre><code>$1</code></pre>")
    .replace(/<pr`([\s\S]*?)<\/pr/gi, "<pre><code>$1</code></pre>")
    .replace(/<pr`([^`]+)`/gi, "<pre><code>$1</code></pre>");

  // PHASE 1: Fix malformed HTML tags (5 passes)
  for (let pass = 0; pass < 5; pass++) {
    cleaned = cleaned
      .replace(/<pr<cod<cod<cod/gi, "<pre><code>")
      .replace(/<pr<code<code<code/gi, "<pre><code>")
      .replace(/<pr<cod<cod/gi, "<pre><code>")
      .replace(/<pr<code<code/gi, "<pre><code>")
      .replace(/<pr<codee<code/gi, "<pre><code>")
      .replace(/<pr<codee<cod/gi, "<pre><code>")
      .replace(/<pr<code<cod/gi, "<pre><code>")
      .replace(/<pr<codee/gi, "<pre><code>")
      .replace(/<pr<code/gi, "<pre><code>")
      .replace(/<pr<cod([a-zA-Z])/gi, "<pre><code>$1")
      .replace(/<pr<cod\s/gi, "<pre><code>")
      .replace(/<pr<cod/gi, "<pre><code>")
      .replace(/<pr<co/gi, "<pre><code>")
      .replace(/<pr`/gi, "<pre><code>")
      .replace(/<pr</gi, "<pre>")
      .replace(/<\/cod<\/cod<\/cod<\/pr/gi, "</code></pre>")
      .replace(/<\/code<\/code<\/code<\/pr/gi, "</code></pre>")
      .replace(/<\/cod<\/cod<\/pr/gi, "</code></pre>")
      .replace(/<\/code<\/code<\/pr/gi, "</code></pre>")
      .replace(/<\/codee<\/codee<\/pree/gi, "</code></pre>")
      .replace(/<\/cod<\/cod<\/pree/gi, "</code></pre>")
      .replace(/<\/code<\/code<\/pree/gi, "</code></pre>")
      .replace(/<\/codee<\/pree/gi, "</code></pre>")
      .replace(/<\/cod<\/pree/gi, "</code></pre>")
      .replace(/<\/code<\/pree/gi, "</code></pre>")
      .replace(/<\/cod<\/pr/gi, "</code></pre>")
      .replace(/<\/code<\/pr/gi, "</code></pre>")
      .replace(/<\/cod<\/pre/gi, "</code></pre>")
      .replace(/<\/cod</gi, "</code>")
      .replace(/`\s*<\/pr/gi, "</code></pre>")
      .replace(/<\/code><\/pre>e>/gi, "</code></pre>")
      .replace(/<\/code><\/pre>\s*e>/gi, "</code></pre>")
      .replace(/<\/pree/gi, "</pre>")
      .replace(/<\/codee/gi, "</code>")
      .replace(/<\/cod/gi, "</code>")
      .replace(/<\/pr/gi, "</pre>")
      .replace(/<articl+e{2,}([^>]*)>/gi, "<article$1>")
      .replace(/<articl+e([^>]*)>/gi, "<article$1>")
      .replace(/<articl([^>]*)>/gi, "<article$1>")
      .replace(/<\/articl+e{2,}>/gi, "</article>")
      .replace(/<\/articl+e>/gi, "</article>")
      .replace(/<\/articl>/gi, "</article>")
      .replace(/<sectio+n{2,}([^>]*)>/gi, "<section$1>")
      .replace(/<sectio+n([^>]*)>/gi, "<section$1>")
      .replace(/<sectio([^>]*)>/gi, "<section$1>")
      .replace(/<\/sectio+n{2,}>/gi, "</section>")
      .replace(/<\/sectio+n>/gi, "</section>")
      .replace(/<\/sectio>/gi, "</section>")
      .replace(/<cod([a-zA-Z])/gi, "<code>$1")
      .replace(/<code([a-zA-Z])/gi, "<code>$1")
      .replace(/([a-zA-Z])<\/cod/gi, "$1</code>")
      .replace(/([a-zA-Z])<\/code/gi, "$1</code>");
  }

  // PHASE 2: Decode HTML entities
  cleaned = decodeHtmlEntities(cleaned);

  // PHASE 3: Convert inline <code> tags to backticks
  cleaned = cleaned.replace(
    /<code[^>]*>([^<]+)<\/code>/gi,
    (_, codeContent) => {
      return `\`${decodeHtmlEntities(codeContent).trim()}\``;
    },
  );

  // PHASE 4: Fix code-related artifacts (5 passes)
  for (let pass = 0; pass < 5; pass++) {
    cleaned = cleaned
      .replace(/efor\s*\(/gi, "for (")
      .replace(/efor\s+/gi, "for ")
      .replace(/efor/gi, "for")
      .replace(/ereturn\s+/gi, "return ")
      .replace(/ereturn/gi, "return")
      .replace(/esetTimeout/gi, "setTimeout")
      .replace(/esetInterval/gi, "setInterval")
      .replace(/econsole\.log/gi, "console.log")
      .replace(/econsole\./gi, "console.")
      .replace(/econsole/gi, "console")
      .replace(/e>e>e>e>/g, "")
      .replace(/e>e>e>/g, "")
      .replace(/e>e>/g, "")
      .replace(/^e>+/g, "")
      .replace(/e>+$/g, "")
      .replace(/(\w+)e>/g, "$1")
      .replace(/e>(\w+)/g, "$1")
      .replace(/\s*e>\s*/g, " ")
      .replace(/NaNe>NaN/gi, "NaN")
      .replace(/NaNe>/gi, "NaN")
      .replace(/NaN>/gi, "NaN")
      .replace(/NaN\s*e>/gi, "NaN")
      .replace(/NaN\s*>/gi, "NaN")
      .replace(/diameterameter/gi, "diameter")
      .replace(/perimeterimeter/gi, "perimeter")
      .replace(/consoleonsole\.log/gi, "console.log")
      .replace(/console\.loge>/gi, "console.log")
      .replace(/console\.log>/gi, "console.log")
      .replace(/console\.loge\.log/gi, "console.log")
      .replace(/console\.log\.log/gi, "console.log")
      .replace(/newColorwColor/gi, "newColor")
      .replace(/newColorolor/gi, "newColor")
      .replace(/(\w+)([A-Z][a-z]+)([a-z]*)\2/gi, "$1$2") // Matches: giveLydiaPizzaaPizza -> giveLydiaPizza
      .replace(/(\w+)([A-Z][a-z]+)\2/gi, "$1$2") // Matches: giveLydiaPizzaPizza -> giveLydiaPizza
      .replace(/^>\s*/g, "")
      .replace(/\s*>$/g, "")
      .replace(/\s+>\s+/g, " ")
      .replace(/([a-zA-Z0-9])\s*>\s*([a-zA-Z0-9])/g, (match, before, after) => {
        if (/[0-9]/.test(before) && /[0-9]/.test(after)) {
          return match;
        }
        return `${before} ${after}`;
      });
  }

  // PHASE 5: Fix duplicated text patterns
  cleaned = cleaned.replace(
    /"([A-Za-z]+)"([a-z]+)"/g,
    (match, word, suffix) => {
      if (word.toLowerCase().endsWith(suffix.toLowerCase())) {
        return `"${word}"`;
      }
      return match;
    },
  );
  cleaned = cleaned.replace(/"([A-Za-z]+)"\1"/g, '"$1"');
  cleaned = cleaned.replace(
    /"([A-Za-z]+)"([a-z]{2,})"/gi,
    (match, word, partial) => {
      const wordLower = word.toLowerCase();
      const partialLower = partial.toLowerCase();
      if (wordLower.endsWith(partialLower) && partialLower.length >= 2) {
        return `"${word}"`;
      }
      return match;
    },
  );
  cleaned = cleaned.replace(
    /([A-Za-z]+)"([a-z]{2,})"/g,
    (match, word, suffix) => {
      const wordLower = word.toLowerCase();
      const suffixLower = suffix.toLowerCase();
      if (wordLower.endsWith(suffixLower) && suffixLower.length >= 2) {
        return `"${word}"`;
      }
      return match;
    },
  );
  cleaned = cleaned
    .replace(/"Number"mber"/gi, '"Number"')
    .replace(/"Array"rray"/gi, '"Array"')
    .replace(/"object"ject"/gi, '"object"')
    .replace(/"NaN"NaN"/gi, '"NaN"')
    .replace(/"String"ring"/gi, '"String"')
    .replace(/"Boolean"oolean"/gi, '"Boolean"')
    .replace(/"undefined"efined"/gi, '"undefined"')
    .replace(/"function"unction"/gi, '"function"');

  // PHASE 6: Final cleanup (preserve formatting)
  cleaned = cleaned
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/ +\n/g, "\n")
    .replace(/\n +/g, "\n")
    .replace(/([a-zA-Z0-9])\s*>\s*([a-zA-Z0-9])/g, (match, before, after) => {
      if (/[0-9]/.test(before) && /[0-9]/.test(after)) {
        return match;
      }
      return `${before} ${after}`;
    })
    .replace(/\s*>\s+/g, " ")
    .trim();

  return cleaned;
}

/**
 * Clean content - optimized for markdown
 */
function cleanContent(text) {
  if (!text || typeof text !== "string") return text || "";

  let cleaned = text;

  // PHASE -1: Markdown-specific cleaning
  cleaned = cleaned
    .replace(/`{4,}/g, "```")
    .replace(/```{2,}([^`]+)```{2,}/g, "```$1```")
    .replace(/```{2,}([\s\S]*?)```{2,}/g, "```$1```")
    .replace(/```([^`\n]+)```/g, "`$1`")
    .replace(/([^`])``([^`\n]+)``([^`])/g, "$1`$2`$3")
    .replace(/^#{7,}\s+/gm, "#### ")
    .replace(/^#{6,}\s+/gm, "###### ")
    .replace(/^(\s*)----+/gm, "$1- ")
    .replace(/^(\s*)\*{3,}/gm, "$1* ")
    .replace(/^(\d+)\.(\d+)\.(\d+)\./gm, "$1.")
    .replace(/\*{4,}([^*]+)\*{4,}/g, "**$1**")
    .replace(/\*{3}([^*]+)\*{3}/g, "*$1*");

  // PHASE 0: Fix special malformed patterns with backticks
  cleaned = cleaned
    .replace(/<pr`([^`]+)`\s*<\/pr/gi, "<pre><code>$1</code></pre>")
    .replace(/<pr`([\s\S]*?)`\s*<\/pr/gi, "<pre><code>$1</code></pre>")
    .replace(/<pr`([\s\S]*?)<\/pr/gi, "<pre><code>$1</code></pre>")
    .replace(/<pr`([^`]+)`/gi, "<pre><code>$1</code></pre>");

  // PHASE 1: Fix malformed HTML tags (5 passes)
  for (let pass = 0; pass < 5; pass++) {
    cleaned = cleaned
      .replace(/<pr<cod<cod<cod/gi, "<pre><code>")
      .replace(/<pr<code<code<code/gi, "<pre><code>")
      .replace(/<pr<cod<cod/gi, "<pre><code>")
      .replace(/<pr<code<code/gi, "<pre><code>")
      .replace(/<pr<codee<code/gi, "<pre><code>")
      .replace(/<pr<codee<cod/gi, "<pre><code>")
      .replace(/<pr<code<cod/gi, "<pre><code>")
      .replace(/<pr<codee/gi, "<pre><code>")
      .replace(/<pr<code/gi, "<pre><code>")
      .replace(/<pr<cod([a-zA-Z])/gi, "<pre><code>$1")
      .replace(/<pr<cod\s/gi, "<pre><code>")
      .replace(/<pr<cod/gi, "<pre><code>")
      .replace(/<pr<co/gi, "<pre><code>")
      .replace(/<pr`/gi, "<pre><code>")
      .replace(/<pr</gi, "<pre>")
      .replace(/<\/cod<\/cod<\/cod<\/pr/gi, "</code></pre>")
      .replace(/<\/code<\/code<\/code<\/pr/gi, "</code></pre>")
      .replace(/<\/cod<\/cod<\/pr/gi, "</code></pre>")
      .replace(/<\/code<\/code<\/pr/gi, "</code></pre>")
      .replace(/<\/codee<\/codee<\/pree/gi, "</code></pre>")
      .replace(/<\/cod<\/cod<\/pree/gi, "</code></pre>")
      .replace(/<\/code<\/code<\/pree/gi, "</code></pre>")
      .replace(/<\/codee<\/pree/gi, "</code></pre>")
      .replace(/<\/cod<\/pree/gi, "</code></pre>")
      .replace(/<\/code<\/pree/gi, "</code></pre>")
      .replace(/<\/cod<\/pr/gi, "</code></pre>")
      .replace(/<\/code<\/pr/gi, "</code></pre>")
      .replace(/<\/cod<\/pre/gi, "</code></pre>")
      .replace(/<\/cod</gi, "</code>")
      .replace(/`\s*<\/pr/gi, "</code></pre>")
      .replace(/<\/code><\/pre>e>/gi, "</code></pre>")
      .replace(/<\/code><\/pre>\s*e>/gi, "</code></pre>")
      .replace(/<\/pree/gi, "</pre>")
      .replace(/<\/codee/gi, "</code>")
      .replace(/<\/cod/gi, "</code>")
      .replace(/<\/pr/gi, "</pre>")
      .replace(/<articl+e{2,}([^>]*)>/gi, "<article$1>")
      .replace(/<articl+e([^>]*)>/gi, "<article$1>")
      .replace(/<articl([^>]*)>/gi, "<article$1>")
      .replace(/<\/articl+e{2,}>/gi, "</article>")
      .replace(/<\/articl+e>/gi, "</article>")
      .replace(/<\/articl>/gi, "</article>")
      .replace(/<sectio+n{2,}([^>]*)>/gi, "<section$1>")
      .replace(/<sectio+n([^>]*)>/gi, "<section$1>")
      .replace(/<sectio([^>]*)>/gi, "<section$1>")
      .replace(/<\/sectio+n{2,}>/gi, "</section>")
      .replace(/<\/sectio+n>/gi, "</section>")
      .replace(/<\/sectio>/gi, "</section>")
      .replace(/<cod([a-zA-Z])/gi, "<code>$1")
      .replace(/<code([a-zA-Z])/gi, "<code>$1")
      .replace(/([a-zA-Z])<\/cod/gi, "$1</code>")
      .replace(/([a-zA-Z])<\/code/gi, "$1</code>");
  }

  // PHASE 2: Decode HTML entities
  cleaned = decodeHtmlEntities(cleaned);

  // PHASE 3: Convert inline <code> tags to backticks (but NOT inside <pre> blocks)
  const parts = [];
  const preBlockRegex = /<pre[^>]*>[\s\S]*?<\/pre>/gi;
  let lastIndex = 0;
  let preMatch;

  preBlockRegex.lastIndex = 0;

  while ((preMatch = preBlockRegex.exec(cleaned)) !== null) {
    if (preMatch.index > lastIndex) {
      const textBeforePre = cleaned.substring(lastIndex, preMatch.index);
      const processedText = textBeforePre.replace(
        /<code[^>]*>([^<]+)<\/code>/gi,
        (_, codeContent) => {
          return `\`${decodeHtmlEntities(codeContent).trim()}\``;
        },
      );
      parts.push(processedText);
    }
    parts.push(preMatch[0]);
    lastIndex = preMatch.index + preMatch[0].length;
  }

  if (lastIndex < cleaned.length) {
    const textAfterPre = cleaned.substring(lastIndex);
    const processedText = textAfterPre.replace(
      /<code[^>]*>([^<]+)<\/code>/gi,
      (_, codeContent) => {
        return `\`${decodeHtmlEntities(codeContent).trim()}\``;
      },
    );
    parts.push(processedText);
  }

  if (parts.length === 0) {
    cleaned = cleaned.replace(
      /<code[^>]*>([^<]+)<\/code>/gi,
      (_, codeContent) => {
        return `\`${decodeHtmlEntities(codeContent).trim()}\``;
      },
    );
  } else {
    cleaned = parts.join("");
  }

  // PHASE 4: Fix code-related artifacts (5 passes)
  for (let pass = 0; pass < 5; pass++) {
    cleaned = cleaned
      .replace(/efor\s*\(/gi, "for (")
      .replace(/efor\s+/gi, "for ")
      .replace(/efor/gi, "for")
      .replace(/ereturn\s+/gi, "return ")
      .replace(/ereturn/gi, "return")
      .replace(/esetTimeout/gi, "setTimeout")
      .replace(/esetInterval/gi, "setInterval")
      .replace(/econsole\.log/gi, "console.log")
      .replace(/econsole\./gi, "console.")
      .replace(/econsole/gi, "console")
      .replace(/e>e>e>e>/g, "")
      .replace(/e>e>e>/g, "")
      .replace(/e>e>/g, "")
      .replace(/^e>+/g, "")
      .replace(/e>+$/g, "")
      .replace(/(\w+)e>/g, "$1")
      .replace(/e>(\w+)/g, "$1")
      .replace(/\s*e>\s*/g, " ")
      .replace(/NaNe>NaN/gi, "NaN")
      .replace(/NaNe>/gi, "NaN")
      .replace(/NaN>/gi, "NaN")
      .replace(/NaN\s*e>/gi, "NaN")
      .replace(/NaN\s*>/gi, "NaN")
      .replace(/diameterameter/gi, "diameter")
      .replace(/perimeterimeter/gi, "perimeter")
      .replace(/consoleonsole\.log/gi, "console.log")
      .replace(/console\.loge>/gi, "console.log")
      .replace(/console\.log>/gi, "console.log")
      .replace(/console\.loge\.log/gi, "console.log")
      .replace(/console\.log\.log/gi, "console.log")
      .replace(/newColorwColor/gi, "newColor")
      .replace(/newColorolor/gi, "newColor")
      .replace(/(\w+)([A-Z][a-z]+)([a-z]*)\2/gi, "$1$2") // Matches: giveLydiaPizzaaPizza -> giveLydiaPizza
      .replace(/(\w+)([A-Z][a-z]+)\2/gi, "$1$2") // Matches: giveLydiaPizzaPizza -> giveLydiaPizza
      .replace(/^>\s*/g, "")
      .replace(/\s*>$/g, "")
      .replace(/\s+>\s+/g, " ")
      .replace(/([a-zA-Z0-9])\s*>\s*([a-zA-Z0-9])/g, (match, before, after) => {
        if (/[0-9]/.test(before) && /[0-9]/.test(after)) {
          return match;
        }
        return `${before} ${after}`;
      });
  }

  // PHASE 5: Fix duplicated text patterns
  cleaned = cleaned.replace(
    /"([A-Za-z]+)"([a-z]+)"/g,
    (match, word, suffix) => {
      if (word.toLowerCase().endsWith(suffix.toLowerCase())) {
        return `"${word}"`;
      }
      return match;
    },
  );
  cleaned = cleaned.replace(/"([A-Za-z]+)"\1"/g, '"$1"');
  cleaned = cleaned.replace(
    /"([A-Za-z]+)"([a-z]{2,})"/gi,
    (match, word, partial) => {
      const wordLower = word.toLowerCase();
      const partialLower = partial.toLowerCase();
      if (wordLower.endsWith(partialLower) && partialLower.length >= 2) {
        return `"${word}"`;
      }
      return match;
    },
  );
  cleaned = cleaned.replace(
    /([A-Za-z]+)"([a-z]{2,})"/g,
    (match, word, suffix) => {
      const wordLower = word.toLowerCase();
      const suffixLower = suffix.toLowerCase();
      if (wordLower.endsWith(suffixLower) && suffixLower.length >= 2) {
        return `"${word}"`;
      }
      return match;
    },
  );
  cleaned = cleaned
    .replace(/"Number"mber"/gi, '"Number"')
    .replace(/"Array"rray"/gi, '"Array"')
    .replace(/"object"ject"/gi, '"object"')
    .replace(/"NaN"NaN"/gi, '"NaN"')
    .replace(/"String"ring"/gi, '"String"')
    .replace(/"Boolean"oolean"/gi, '"Boolean"')
    .replace(/"undefined"efined"/gi, '"undefined"')
    .replace(/"function"unction"/gi, '"function"');

  // PHASE 6: Final cleanup (preserve formatting)
  cleaned = cleaned
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/ +\n/g, "\n")
    .replace(/\n +/g, "\n")
    .replace(/([a-zA-Z0-9])\s*>\s*([a-zA-Z0-9])/g, (match, before, after) => {
      if (/[0-9]/.test(before) && /[0-9]/.test(after)) {
        return match;
      }
      return `${before} ${after}`;
    })
    .replace(/\s*>\s+/g, " ")
    .trim();

  return cleaned;
}

/**
 * Process a batch of questions and fix cleaning issues
 */
async function processBatch(batchNumber, questions) {
  console.log(
    `\n🔧 Processing batch ${batchNumber} (${questions.length} questions)...`,
  );

  let fixedCount = 0;

  for (const question of questions) {
    const questionUpdates = {};
    let needsUpdate = false;

    // Clean title
    if (question.title) {
      const cleanedTitle = cleanContent(question.title);
      if (cleanedTitle !== question.title) {
        questionUpdates.title = cleanedTitle;
        needsUpdate = true;
      }
    }

    // Clean content
    if (question.content) {
      const cleanedContent = cleanContent(question.content);
      if (cleanedContent !== question.content) {
        questionUpdates.content = cleanedContent;
        needsUpdate = true;
      }
    }

    // Clean explanation
    if (question.explanation) {
      const cleanedExplanation = cleanOptionText(question.explanation);
      if (cleanedExplanation !== question.explanation) {
        questionUpdates.explanation = cleanedExplanation;
        needsUpdate = true;
      }
    }

    // Clean correct_answer
    if (question.correct_answer) {
      const cleanedAnswer = cleanOptionText(question.correct_answer);
      if (cleanedAnswer !== question.correct_answer) {
        questionUpdates.correct_answer = cleanedAnswer;
        needsUpdate = true;
      }
    }

    // Clean options
    if (question.options) {
      let options = question.options;
      if (typeof options === "string") {
        try {
          options = JSON.parse(options);
        } catch (e) {
          options = [options];
        }
      }

      if (Array.isArray(options)) {
        const cleanedOptions = options.map((opt) => {
          if (typeof opt === "string") {
            const cleaned = cleanOptionText(opt);
            return cleaned !== opt ? cleaned : opt;
          } else if (opt && typeof opt === "object") {
            const cleanedOpt = { ...opt };
            if (opt.text) {
              const cleaned = cleanOptionText(opt.text);
              if (cleaned !== opt.text) {
                cleanedOpt.text = cleaned;
              }
            }
            return cleanedOpt;
          }
          return opt;
        });

        // Check if any option was changed
        const hasChanges = cleanedOptions.some((cleaned, idx) => {
          const original = options[idx];
          if (typeof original === "string" && typeof cleaned === "string") {
            return cleaned !== original;
          }
          if (original?.text && cleaned?.text) {
            return cleaned.text !== original.text;
          }
          return false;
        });

        if (hasChanges) {
          questionUpdates.options = cleanedOptions;
          needsUpdate = true;
        }
      }
    }

    // Update if needed
    if (needsUpdate) {
      try {
        const { error } = await supabase
          .from("questions")
          .update(questionUpdates)
          .eq("id", question.id);

        if (error) {
          console.error(
            `  ❌ Error updating question ${question.id}:`,
            error.message,
          );
        } else {
          fixedCount++;
          console.log(
            `  ✅ Fixed question: ${question.title?.substring(0, 50) || question.id}`,
          );
        }
      } catch (err) {
        console.error(
          `  ❌ Error updating question ${question.id}:`,
          err.message,
        );
      }
    }
  }

  console.log(
    `  ✅ Batch ${batchNumber}: Fixed ${fixedCount}/${questions.length} questions`,
  );
  return { batchNumber, total: questions.length, fixed: fixedCount };
}

/**
 * Main function
 */
async function main() {
  try {
    console.log("🔍 Fetching all questions from database...");

    // Fetch all questions
    const { data: questions, error } = await supabase
      .from("questions")
      .select("id, title, content, explanation, options, correct_answer")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("❌ Error fetching questions:", error);
      process.exit(1);
    }

    if (!questions || questions.length === 0) {
      console.log("⚠️ No questions found in database");
      process.exit(0);
    }

    console.log(`✅ Found ${questions.length} questions`);

    // Divide into batches
    const batches = [];
    for (let i = 0; i < questions.length; i += BATCH_SIZE) {
      batches.push(questions.slice(i, i + BATCH_SIZE));
    }

    console.log(
      `📦 Processing ${batches.length} batches (${BATCH_SIZE} questions per batch)\n`,
    );

    // Process each batch
    const results = [];
    for (let i = 0; i < batches.length; i++) {
      const result = await processBatch(i + 1, batches[i]);
      results.push(result);

      // Small delay between batches to avoid rate limiting
      if (i < batches.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Summary
    const totalFixed = results.reduce((sum, r) => sum + r.fixed, 0);
    console.log(
      `\n✅ Complete! Fixed ${totalFixed}/${questions.length} questions across ${batches.length} batches`,
    );
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

// Run the script
main();
