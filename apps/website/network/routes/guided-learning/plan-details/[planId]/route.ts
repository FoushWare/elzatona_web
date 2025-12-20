import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// GET /api/guided-learning/plan-details/[planId] - Get detailed plan with cards, categories, topics, and questions
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ planId: string }> },
) {
  let planId: string | undefined;
  try {
    // Use environment variables for Supabase credentials (required)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required Supabase environment variables",
        },
        { status: 500 },
      );
    }

    console.log("🔍 Plan Details API Debug: Using Supabase URL:", supabaseUrl);
    console.log(
      "🔍 Plan Details API Debug: Anon key exists:",
      !!supabaseAnonKey,
    );

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const resolvedParams = await params;
    planId = resolvedParams.planId;

    if (!planId) {
      return NextResponse.json(
        { success: false, error: "Plan ID is required" },
        { status: 400 },
      );
    }

    // Get the plan from Supabase
    const { data: plan, error: planError } = await supabase
      .from("learning_plans")
      .select("*")
      .eq("id", planId)
      .single();

    if (planError || !plan) {
      return NextResponse.json(
        { success: false, error: "Plan not found in database" },
        { status: 404 },
      );
    }

    // Get cards linked to this specific plan via plan_cards table
    const { data: planCardsData, error: planCardsError } = await supabase
      .from("plan_cards")
      .select("card_id")
      .eq("plan_id", planId);

    console.log("🔍 Plan Details Debug: plan_cards query result:", {
      planCardsData,
      planCardsError: planCardsError?.message || null,
      planCardsCount: planCardsData?.length || 0,
      planId,
    });

    if (planCardsError) {
      console.error("Error fetching plan cards:", planCardsError);
    }

    const planCardIds = (planCardsData || []).map((pc) => pc.card_id);
    console.log("🔍 Plan Details Debug: Plan card IDs:", planCardIds);

    // Get cards that are linked to this plan
    let cards;
    let cardsError = null;

    if (planCardIds.length > 0) {
      const { data: cardsData, error: cardsErr } = await supabase
        .from("learning_cards")
        .select("*")
        .in("id", planCardIds)
        .order("created_at", { ascending: true });

      cards = cardsData;
      cardsError = cardsErr;
    } else {
      // No cards linked to this plan - return empty array
      cards = [];
      console.warn("⚠️ Plan Details Debug: No cards linked to this plan");
    }

    if (cardsError) {
      console.error("Error fetching cards:", cardsError);
    }

    console.log("🔍 Plan Details Debug: Cards for this plan:", {
      cardsCount: cards?.length || 0,
      cardIds: cards?.map((c) => c.id) || [],
    });

    // Always use separate queries for better control
    console.log("Using separate queries for better data control...");

    // Get all categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: true });

    if (categoriesError) {
      console.error("Error fetching categories:", categoriesError);
    }
    const categories = categoriesData || [];

    // Get all topics
    const { data: topicsData, error: topicsError } = await supabase
      .from("topics")
      .select("*")
      .order("created_at", { ascending: true });

    if (topicsError) {
      console.error("Error fetching topics:", topicsError);
    }
    const topics = topicsData || [];

    // Get questions associated with this specific plan via plan_questions table
    console.log(
      "🔍 Plan Details Debug: Querying plan_questions for planId:",
      planId,
    );

    const { data: planQuestionsData, error: planQuestionsError } =
      await supabase
        .from("plan_questions")
        .select("question_id, topic_id")
        .eq("plan_id", planId)
        .eq("is_active", true);

    console.log("🔍 Plan Details Debug: Raw plan_questions query result:", {
      planQuestionsData,
      planQuestionsError,
      planQuestionsCount: planQuestionsData?.length || 0,
      samplePlanQuestions: planQuestionsData?.slice(0, 3) || [],
    });

    if (planQuestionsError) {
      console.error("Error fetching plan questions:", planQuestionsError);
    }

    console.log("🔍 Plan Details Debug: Plan questions query result:", {
      planQuestionsCount: planQuestionsData?.length || 0,
      planQuestions:
        planQuestionsData?.map((pq) => ({
          questionId: pq.question_id,
          topicId: pq.topic_id,
        })) || [],
    });

    // Get all questions first (no joins - questions table has topic_id directly)
    // Fetch all pages to get all questions (Supabase has a default limit)
    let allQuestionsData: any[] = [];
    let allQuestionsError = null;
    let page = 0;
    const pageSize = 1000;
    let hasMore = true;

    while (hasMore) {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .order("created_at", { ascending: false })
        .range(page * pageSize, (page + 1) * pageSize - 1);

      if (error) {
        allQuestionsError = error;
        hasMore = false;
      } else if (data && data.length > 0) {
        allQuestionsData = [...allQuestionsData, ...data];
        hasMore = data.length === pageSize;
        page++;
      } else {
        hasMore = false;
      }
    }

    if (allQuestionsError) {
      console.error("Error fetching all questions:", allQuestionsError);
    } else {
      console.log(
        "🔍 Plan Details Debug: All questions count:",
        allQuestionsData?.length || 0,
      );
    }

    // Filter questions: PRIORITIZE plan_questions table - use ONLY those if they exist
    // Otherwise, fall back to topic-based filtering
    let questions;

    // nosemgrep: js.useless-conditional
    // CodeQL suppression: allQuestionsData is a variable that can be null/undefined, this check is necessary
    if (planQuestionsData && planQuestionsData.length > 0 && allQuestionsData) {
      // Use ONLY questions explicitly linked via plan_questions table
      const planQuestionIds = new Set(
        planQuestionsData.map((pq) => pq.question_id),
      );
      questions = allQuestionsData.filter((q) => planQuestionIds.has(q.id));

      console.log(
        "🔍 Plan Details Debug: Using ONLY plan_questions filter (explicitly linked questions)",
        {
          totalQuestions: questions.length,
          planQuestionsLinked: planQuestionsData.length,
          planQuestionIds: Array.from(planQuestionIds).slice(0, 5),
        },
      );
    } else {
      // Fallback: Get questions from topics associated with plan's categories
      // First, get all category IDs from the plan's cards
      const planCategoryIds = new Set<string>();
      const planTopicIds = new Set<string>();

      (cards || []).forEach((card) => {
        (categories || []).forEach((category) => {
          // Match categories to cards
          if (
            category.learning_card_id === card.id ||
            category.card_type === card.type
          ) {
            planCategoryIds.add(category.id);
          }
        });
      });

      // Get all topics that belong to these categories
      (topics || []).forEach((topic) => {
        if (topic.category_id && planCategoryIds.has(topic.category_id)) {
          planTopicIds.add(topic.id);
        }
      });

      // Include questions from plan topics as fallback
      // nosemgrep: js.useless-conditional
      // CodeQL suppression: allQuestionsData is a variable that can be null/undefined, this check is necessary
      if (planTopicIds.size > 0 && allQuestionsData) {
        questions = allQuestionsData.filter(
          (q) => q.topic_id && planTopicIds.has(q.topic_id),
        );

        console.log(
          "🔍 Plan Details Debug: Fallback - Filtered questions by plan topics",
          {
            totalQuestions: questions.length,
            planTopicsCount: planTopicIds.size,
            planCategoriesCount: planCategoryIds.size,
            note: "No plan_questions found, using topic-based filtering",
          },
        );
      } else {
        // Last resort: use all questions (should not happen in normal operation)
        // nosemgrep: js.useless-conditional
        // CodeQL suppression: allQuestionsData is a variable that can be null/undefined, this check is necessary
        questions = allQuestionsData || [];
        console.log(
          "🔍 Plan Details Debug: Last resort - Using all questions (no filters available)",
          {
            totalQuestions: questions.length,
            warning: "No plan_questions and no matching topics found!",
          },
        );
      }
    }

    console.log(
      "🔍 Plan Details Debug: Final questions count:",
      questions?.length || 0,
    );
    console.log(
      "🔍 Plan Details Debug: Sample questions:",
      questions?.slice(0, 3).map((q) => ({
        id: q.id,
        title: q.title,
        topic_id: q.topic_id,
      })) || [],
    );

    // Helper function to decode HTML entities
    const decodeHtmlEntities = (text: string): string => {
      if (!text) return "";
      const entityMap: Record<string, string> = {
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
    };

    /**
     * Comprehensive option text cleaning algorithm
     * Optimized for markdown-formatted content from markdown files
     * Similar to cleanContent but optimized for option text (removes HTML tags, preserves inline code)
     */
    const cleanOptionText = (text: string): string => {
      if (!text || typeof text !== "string") return text || "";

      let cleaned = text;

      // ============================================
      // PHASE -1: Markdown-specific cleaning (FIRST - preserve markdown structure)
      // ============================================
      // Since questions come from markdown files, handle markdown patterns first

      // Fix malformed markdown code blocks (```code```)
      cleaned = cleaned
        // Fix triple+ backticks at start: ````` -> ```
        .replace(/`{4,}/g, "```")
        // Fix malformed code block markers: `````code``` -> ```code```
        .replace(/```{2,}([^`]+)```{2,}/g, "```$1```")
        // Fix code blocks with extra backticks: `````code````` -> ```code```
        .replace(/```{2,}([\s\S]*?)```{2,}/g, "```$1```");

      // Fix malformed markdown inline code (`code`)
      cleaned = cleaned
        // Fix triple+ backticks used for inline code (single line): ```code``` -> `code`
        .replace(/```([^`\n]+)```/g, "`$1`")
        // Fix double backticks in inline code: ``code`` -> `code` (avoid code blocks)
        // Use a more compatible approach without negative lookbehind
        .replace(/([^`])``([^`\n]+)``([^`])/g, "$1`$2`$3");

      // Fix markdown bold/italic with extra characters
      cleaned = cleaned
        // Fix bold with extra asterisks: ****text**** -> **text**
        .replace(/\*{4,}([^*]+)\*{4,}/g, "**$1**")
        // Fix italic with extra asterisks: ***text*** -> *text*
        .replace(/\*{3}([^*]+)\*{3}/g, "*$1*");

      // ============================================
      // PHASE 0: Fix special malformed patterns with backticks
      // ============================================
      // Handle patterns like <pr`code`</pr or <pr`code`</pr
      // Convert backticks to proper <code> tags
      cleaned = cleaned
        // Pattern: <pr`code content`</pr -> <pre><code>code content</code></pre>
        .replace(/<pr`([^`]+)`\s*<\/pr/gi, "<pre><code>$1</code></pre>")
        // Pattern: <pr`code content`</pr (with newlines)
        .replace(/<pr`([\s\S]*?)`\s*<\/pr/gi, "<pre><code>$1</code></pre>")
        // Pattern: <pr`code (no closing backtick, find </pr)
        .replace(/<pr`([\s\S]*?)<\/pr/gi, "<pre><code>$1</code></pre>")
        // Pattern: <pr`code` (standalone, no closing tag)
        .replace(/<pr`([^`]+)`/gi, "<pre><code>$1</code></pre>");

      // ============================================
      // PHASE 1: Fix malformed HTML tags (MULTIPLE PASSES)
      // ============================================
      for (let pass = 0; pass < 5; pass++) {
        cleaned = cleaned
          // Fix deeply nested malformed opening tags
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
          .replace(/<pr`/gi, "<pre><code>") // Handle <pr` -> <pre><code>
          .replace(/<pr</gi, "<pre>")
          // Fix deeply nested malformed closing tags
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
          .replace(/`\s*<\/pr/gi, "</code></pre>") // Handle `</pr -> </code></pre>
          .replace(/<\/code><\/pre>e>/gi, "</code></pre>")
          .replace(/<\/code><\/pre>\s*e>/gi, "</code></pre>")
          .replace(/<\/pree/gi, "</pre>")
          .replace(/<\/codee/gi, "</code>")
          .replace(/<\/cod/gi, "</code>")
          .replace(/<\/pr/gi, "</pre>") // Handle standalone </pr -> </pre>
          // Fix other common malformed HTML tags with repeated characters
          // Fix article tags with repeated 'e' characters: <articleeeee -> <article>
          .replace(/<article+e+([^>]*)>/gi, "<article$1>")
          .replace(/<article+([^>]*)>/gi, "<article$1>")
          .replace(/<articl+e+([^>]*)>/gi, "<article$1>")
          .replace(/<articl([^>]*)>/gi, "<article$1>")
          .replace(/<\/article+e+>/gi, "</article>")
          .replace(/<\/article+>/gi, "</article>")
          .replace(/<\/articl+e+>/gi, "</article>")
          .replace(/<\/articl>/gi, "</article>")
          // Fix section tags with repeated 'n' characters: <sectionnnnnn -> <section>
          .replace(/<section+n+([^>]*)>/gi, "<section$1>")
          .replace(/<section+([^>]*)>/gi, "<section$1>")
          .replace(/<sectio+n+([^>]*)>/gi, "<section$1>")
          .replace(/<sectio([^>]*)>/gi, "<section$1>")
          .replace(/<\/section+n+>/gi, "</section>")
          .replace(/<\/section+>/gi, "</section>")
          .replace(/<\/sectio+n+>/gi, "</section>")
          .replace(/<\/sectio>/gi, "</section>")
          .replace(/<nav\b/gi, "<nav")
          .replace(/<\/nav>/gi, "</nav>")
          .replace(/<head\b/gi, "<header")
          .replace(/<\/head>/gi, "</header>")
          .replace(/<foot\b/gi, "<footer")
          .replace(/<\/foot>/gi, "</footer>")
          .replace(/<mai\b/gi, "<main")
          .replace(/<\/mai>/gi, "</main>")
          // Fix patterns where code tags are merged with content
          .replace(/<cod([a-zA-Z])/gi, "<code>$1")
          .replace(/<code([a-zA-Z])/gi, "<code>$1")
          .replace(/([a-zA-Z])<\/cod/gi, "$1</code>")
          .replace(/([a-zA-Z])<\/code/gi, "$1</code>");
      }

      // ============================================
      // PHASE 2: Decode HTML entities
      // ============================================
      cleaned = decodeHtmlEntities(cleaned);

      // ============================================
      // PHASE 3: Convert HTML tags to inline code format (but not if already in backticks)
      // ============================================
      cleaned = cleaned.replace(
        /([^`])<([a-zA-Z][a-zA-Z0-9]*)([^>]*)>([^`])/g,
        (match, before, tag, attrs, after) => {
          if (tag.toLowerCase() === "code" || tag.toLowerCase() === "pre")
            return match;
          return `${before}\`<${tag}${attrs}>\`${after}`;
        },
      );
      cleaned = cleaned.replace(
        /([^`])<\/([a-zA-Z][a-zA-Z0-9]*)>([^`])/g,
        (match, before, tag, after) => {
          return `${before}\`</${tag}>\`${after}`;
        },
      );

      // Convert inline <code> tags to backticks
      // SECURITY: Sanitize code content after decoding HTML entities to prevent HTML injection
      cleaned = cleaned.replace(
        /<code[^>]*>([^<]+)<\/code>/gi,
        (_, codeContent) => {
          // Decode HTML entities first
          let decodedContent = decodeHtmlEntities(codeContent).trim();
          // SECURITY: Ensure decoded content cannot form HTML tags.
          // Strip any tag-like sequences repeatedly, then escape any remaining angle brackets.
          while (/<[^>]*>/g.test(decodedContent)) {
            decodedContent = decodedContent.replace(/<[^>]*>/g, "");
          }
          decodedContent = decodedContent
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;");
          return `\`${decodedContent}\``;
        },
      );

      // Remove remaining HTML tags
      // nosemgrep: js.incomplete-multi-character-sanitization
      // CodeQL suppression: This regex is part of a multi-pass sanitization process. The cleaned text is sent as JSON (not rendered as HTML), and all HTML tags are removed through multiple passes.
      cleaned = cleaned.replace(/<[^>]+>/g, "");

      // ============================================
      // PHASE 4: Fix code-related artifacts (MULTIPLE PASSES)
      // ============================================
      for (let pass = 0; pass < 5; pass++) {
        cleaned = cleaned
          // Fix efor -> for
          .replace(/efor\s*\(/gi, "for (")
          .replace(/efor\s+/gi, "for ")
          .replace(/efor/gi, "for")
          // Fix ereturn -> return
          .replace(/ereturn\s+/gi, "return ")
          .replace(/ereturn/gi, "return")
          // Fix esetTimeout -> setTimeout
          .replace(/esetTimeout/gi, "setTimeout")
          .replace(/esetInterval/gi, "setInterval")
          // Fix econsole -> console
          .replace(/econsole\.log/gi, "console.log")
          .replace(/econsole\./gi, "console.")
          .replace(/econsole/gi, "console")
          // Remove e> artifacts
          .replace(/e>e>e>e>/g, "")
          .replace(/e>e>e>/g, "")
          .replace(/e>e>/g, "")
          .replace(/^e>+/g, "")
          .replace(/e>+$/g, "")
          .replace(/(\w+)e>/g, "$1")
          .replace(/e>(\w+)/g, "$1")
          .replace(/\s*e>\s*/g, " ")
          // Fix NaN patterns
          .replace(/NaNe>NaN/gi, "NaN")
          .replace(/NaNe>/gi, "NaN")
          .replace(/NaN>/gi, "NaN")
          .replace(/NaN\s*e>/gi, "NaN")
          .replace(/NaN\s*>/gi, "NaN")
          // Fix method name duplications
          .replace(/diameterameter/gi, "diameter")
          .replace(/perimeterimeter/gi, "perimeter")
          .replace(/consoleonsole\.log/gi, "console.log")
          .replace(/console\.loge>/gi, "console.log")
          .replace(/console\.log>/gi, "console.log")
          .replace(/console\.loge\.log/gi, "console.log")
          .replace(/console\.log\.log/gi, "console.log")
          .replace(/newColorwColor/gi, "newColor")
          .replace(/newColorolor/gi, "newColor")
          // Fix duplicated method names (e.g., giveLydiaPizzaaPizza -> giveLydiaPizza)
          // Pattern 1: giveLydiaPizzaaPizza -> giveLydiaPizza (Pizza + aPizza where Pizza is duplicated)
          .replace(/(\w+)([A-Z][a-z]+)([a-z]*)\2/gi, "$1$2") // Matches: giveLydiaPizzaaPizza -> giveLydiaPizza
          // Pattern 2: giveLydiaPizzaPizza -> giveLydiaPizza (exact duplication)
          .replace(/(\w+)([A-Z][a-z]+)\2/gi, "$1$2") // Matches: giveLydiaPizzaPizza -> giveLydiaPizza
          // Fix patterns where > appears between words
          .replace(/([a-zA-Z]+)e>([a-zA-Z]+)/g, "$1$2")
          .replace(/([a-zA-Z]+)>([a-zA-Z]+)/g, "$1 $2")
          .replace(/([a-zA-Z]+)>/g, "$1")
          // Remove standalone > characters
          .replace(/^>\s*/g, "")
          .replace(/\s*>$/g, "")
          .replace(/\s+>\s+/g, " ")
          .replace(
            /([a-zA-Z0-9])>\s*([a-zA-Z0-9])/g,
            (match, before, after) => {
              if (/[0-9]/.test(before) && /[0-9]/.test(after)) {
                return match; // Preserve number comparisons
              }
              return `${before} ${after}`;
            },
          );
      }

      // ============================================
      // PHASE 5: Fix duplicated text patterns
      // ============================================
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

      // ============================================
      // PHASE 6: Final cleanup (PRESERVE FORMATTING)
      // ============================================
      // Preserve newlines and paragraph breaks - only normalize spaces within lines
      cleaned = cleaned
        // Normalize multiple spaces to single space (but preserve newlines)
        .replace(/[ \t]+/g, " ") // Multiple spaces/tabs to single space
        // Normalize multiple newlines to double newline (paragraph break)
        .replace(/\n{3,}/g, "\n\n") // More than 2 newlines -> 2 newlines
        // Remove spaces before newlines
        .replace(/ +\n/g, "\n")
        // Remove spaces after newlines
        .replace(/\n +/g, "\n")
        // Final pass for > artifacts (but preserve code operators)
        .replace(
          /([a-zA-Z0-9])\s*>\s*([a-zA-Z0-9])/g,
          (match, before, after) => {
            // Preserve number comparisons like "3 > 2"
            if (/[0-9]/.test(before) && /[0-9]/.test(after)) {
              return match;
            }
            // Otherwise remove the > artifact
            return `${before} ${after}`;
          },
        )
        .replace(/\s*>\s+/g, " ") // Standalone > with spaces
        .trim();

      return cleaned;
    };

    /**
     * Format code content with proper indentation
     * Intelligently adds indentation based on code structure (braces, blocks, classes, methods, etc.)
     */
    const formatCodeContent = (code: string): string => {
      if (!code || typeof code !== "string") return code || "";

      // Normalize line endings
      let formatted = code.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

      // Remove excessive leading/trailing whitespace from entire block
      formatted = formatted.trim();

      // Split into lines for processing
      const lines = formatted.split("\n").map((line) => line.trimEnd());

      if (lines.length === 0) return "";

      // Check if code already has indentation
      const hasExistingIndent = lines.some(
        (line) => line.trim().length > 0 && /^\s/.test(line),
      );

      // If code has no indentation, add it based on structure
      if (!hasExistingIndent) {
        let indentLevel = 0;
        let inClass = false;
        let inMethod = false;

        formatted = lines
          .map((line, index) => {
            const trimmed = line.trim();

            // Skip empty lines
            if (trimmed.length === 0) return "";

            // Detect class declaration
            if (/^(class|interface|type)\s+\w+/.test(trimmed)) {
              inClass = true;
              const indent = "  ".repeat(indentLevel);
              indentLevel++;
              return indent + trimmed;
            }

            // Detect static methods, regular methods, or constructors
            if (
              inClass &&
              (/^(static\s+)?\w+\s*\(/.test(trimmed) || // method declaration
                /^constructor\s*\(/.test(trimmed) || // constructor
                /^get\s+\w+\s*\(/.test(trimmed) || // getter
                /^set\s+\w+\s*\(/.test(trimmed)) // setter
            ) {
              inMethod = true;
              const indent = "  ".repeat(indentLevel);
              // Check if method has opening brace on same line
              if (trimmed.match(/[{\[\(]\s*$/)) {
                indentLevel++;
              }
              return indent + trimmed;
            }

            // Count braces/brackets to determine net change
            const openBraces = (trimmed.match(/{/g) || []).length;
            const closeBraces = (trimmed.match(/}/g) || []).length;
            const openBrackets = (trimmed.match(/\[/g) || []).length;
            const closeBrackets = (trimmed.match(/\]/g) || []).length;
            const openParens = (trimmed.match(/\(/g) || []).length;
            const closeParens = (trimmed.match(/\)/g) || []).length;

            // Net change: positive = more opens, negative = more closes
            const netBraces = openBraces - closeBraces;
            const netBrackets = openBrackets - closeBrackets;
            const netParens = openParens - closeParens;

            // Decrease indent for closing braces/brackets/parens at the start of line
            if (trimmed.match(/^[}\]\)]/)) {
              indentLevel = Math.max(0, indentLevel - 1);
              // If we're closing a class, method, or constructor, reset flags
              if (closeBraces > 0 && inClass) {
                // Check if this is the end of a method or the class itself
                const nextNonEmptyLine = lines
                  .slice(index + 1)
                  .find((l) => l.trim().length > 0);
                if (
                  !nextNonEmptyLine ||
                  /^(class|interface|type|const|let|var|function)/.test(
                    nextNonEmptyLine.trim(),
                  )
                ) {
                  inClass = false;
                  inMethod = false;
                } else if (inMethod) {
                  inMethod = false;
                }
              }
            }

            // Add indentation for current line
            const indent = "  ".repeat(indentLevel);
            const result = indent + trimmed;

            // Increase indent if line ends with opening brace/bracket/paren
            // This means the next line should be indented
            if (trimmed.match(/[{\[\(]\s*$/)) {
              indentLevel++;
            }
            // Also increase if there are more opens than closes (unclosed braces/brackets/parens)
            else if (netBraces > 0 || netBrackets > 0 || netParens > 0) {
              indentLevel += Math.max(netBraces, netBrackets, netParens);
            }

            return result;
          })
          .join("\n");
      } else {
        // Code already has indentation - normalize it to 2 spaces
        const indentations = lines
          .filter((line) => line.trim().length > 0)
          .map((line) => {
            const match = line.match(/^(\s*)/);
            return match ? match[1].length : 0;
          });

        if (indentations.length > 0) {
          const minIndent = Math.min(...indentations);

          // Normalize indentation: preserve relative indentation but use consistent 2-space spacing
          formatted = lines
            .map((line) => {
              if (line.trim().length === 0) return "";

              // Count leading whitespace (tabs and spaces)
              const leadingWhitespace = line.match(/^(\s*)/)?.[1] || "";
              const indentCount = leadingWhitespace
                .split("")
                .reduce((count, char) => count + (char === "\t" ? 2 : 1), 0);

              // Calculate relative indent level (subtract minimum indent)
              const relativeIndent = Math.max(0, indentCount - minIndent);

              // Use 2 spaces per indent level for consistency
              const normalizedIndent = "  ".repeat(
                Math.floor(relativeIndent / 2) + (relativeIndent % 2),
              );

              // Get content without leading whitespace
              const content = line.trimStart();

              return normalizedIndent + content;
            })
            .join("\n");
        }
      }

      // Remove excessive blank lines (more than 2 consecutive)
      formatted = formatted.replace(/\n{3,}/g, "\n\n");

      return formatted;
    };

    /**
     * Comprehensive content cleaning algorithm
     * Optimized for markdown-formatted content from markdown files
     * Handles markdown formatting, malformed HTML, entities, artifacts, and code blocks
     */
    const cleanContent = (text: string): string => {
      if (!text || typeof text !== "string") return text || "";

      let cleaned = text;

      // ============================================
      // PHASE -1: Markdown-specific cleaning (FIRST - preserve markdown structure)
      // ============================================
      // Since questions come from markdown files, handle markdown patterns first

      // Fix malformed markdown code blocks (```code```)
      // Handle cases like `````code````` (extra backticks)
      cleaned = cleaned
        // Fix triple+ backticks at start: ````` -> ```
        .replace(/`{4,}/g, "```")
        // Fix malformed code block markers: `````code``` -> ```code```
        .replace(/```{2,}([^`]+)```{2,}/g, "```$1```")
        // Fix code blocks with extra backticks: `````code````` -> ```code```
        .replace(/```{2,}([\s\S]*?)```{2,}/g, "```$1```")
        // Fix code blocks missing closing backticks: ```code -> ```code```
        .replace(/```([\s\S]*?)(?=\n\n|$)/g, (match, code) => {
          // If no closing backticks found, add them
          if (!match.includes("```", match.indexOf("```") + 3)) {
            return `\`\`\`${code}\`\`\``;
          }
          return match;
        });

      // Fix malformed markdown inline code (`code`)
      // Handle cases like ``code`` (double backticks for inline) or ````code````
      cleaned = cleaned
        // Fix triple+ backticks used for inline code (single line): ```code``` -> `code`
        .replace(/```([^`\n]+)```/g, "`$1`")
        // Fix double backticks in inline code: ``code`` -> `code` (avoid code blocks)
        // Use a more compatible approach without negative lookbehind
        .replace(/([^`])``([^`\n]+)``([^`])/g, "$1`$2`$3");

      // Fix markdown headers with extra # characters: ####### -> ####
      cleaned = cleaned
        .replace(/^#{7,}\s+/gm, "#### ")
        .replace(/^#{6,}\s+/gm, "###### ");

      // Fix markdown lists with malformed markers
      cleaned = cleaned
        // Fix lists with extra dashes: ---- -> -
        .replace(/^(\s*)----+/gm, "$1- ")
        // Fix lists with extra asterisks: **** -> *
        .replace(/^(\s*)\*{3,}/gm, "$1* ")
        // Fix lists with extra numbers: 1.1.1. -> 1.
        .replace(/^(\d+)\.(\d+)\.(\d+)\./gm, "$1.");

      // Fix markdown bold/italic with extra characters: ****text**** -> **text**
      cleaned = cleaned
        // Fix bold with extra asterisks: ****text**** -> **text**
        .replace(/\*{4,}([^*]+)\*{4,}/g, "**$1**")
        // Fix italic with extra asterisks: ***text*** -> *text*
        .replace(/\*{3}([^*]+)\*{3}/g, "*$1*")
        // Fix bold with extra underscores: ____text____ -> __text__
        .replace(/_+([^_]+)_+/g, (match, text) => {
          // Only fix if it's 4+ underscores (likely malformed bold)
          if (match.match(/^_{4,}/)) {
            return `__${text}__`;
          }
          return match;
        });

      // Preserve markdown link syntax [text](url) - don't break it
      // Preserve markdown image syntax ![alt](url) - don't break it
      // These will be handled by markdown renderer later

      // ============================================
      // PHASE 0: Fix special malformed patterns with backticks
      // ============================================
      // Handle patterns like <pr`code`</pr or <pr`code`</pr
      // Convert backticks to proper <code> tags
      cleaned = cleaned
        // Pattern: <pr`code content`</pr -> <pre><code>code content</code></pre>
        .replace(/<pr`([^`]+)`\s*<\/pr/gi, "<pre><code>$1</code></pre>")
        // Pattern: <pr`code content`</pr (with newlines)
        .replace(/<pr`([\s\S]*?)`\s*<\/pr/gi, "<pre><code>$1</code></pre>")
        // Pattern: <pr`code` (incomplete, try to find closing)
        .replace(/<pr`([\s\S]*?)`\s*<\/pr/gi, "<pre><code>$1</code></pre>")
        // Pattern: <pr`code (no closing backtick, find </pr)
        .replace(/<pr`([\s\S]*?)<\/pr/gi, "<pre><code>$1</code></pre>")
        // Pattern: <pr`code` (standalone, no closing tag)
        .replace(/<pr`([^`]+)`/gi, "<pre><code>$1</code></pre>");

      // ============================================
      // PHASE 1: Fix malformed HTML tags (MULTIPLE PASSES)
      // ============================================
      // Apply multiple passes to catch nested malformed tags
      for (let pass = 0; pass < 5; pass++) {
        cleaned = cleaned
          // Fix deeply nested malformed opening tags (most specific first)
          .replace(/<pr<cod<cod<cod/gi, "<pre><code>")
          .replace(/<pr<code<code<code/gi, "<pre><code>")
          .replace(/<pr<cod<cod/gi, "<pre><code>")
          .replace(/<pr<code<code/gi, "<pre><code>")
          .replace(/<pr<codee<code/gi, "<pre><code>")
          .replace(/<pr<codee<cod/gi, "<pre><code>")
          .replace(/<pr<code<cod/gi, "<pre><code>")
          .replace(/<pr<codee/gi, "<pre><code>")
          .replace(/<pr<code/gi, "<pre><code>")
          .replace(/<pr<cod([a-zA-Z])/gi, "<pre><code>$1") // Handle <pr<codfor -> <pre><code>for
          .replace(/<pr<cod\s/gi, "<pre><code>") // Handle <pr<cod followed by space
          .replace(/<pr<cod/gi, "<pre><code>")
          .replace(/<pr<co/gi, "<pre><code>")
          .replace(/<pr`/gi, "<pre><code>") // Handle <pr` -> <pre><code>
          .replace(/<pr</gi, "<pre>")
          // Fix deeply nested malformed closing tags
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
          .replace(/`\s*<\/pr/gi, "</code></pre>") // Handle `</pr -> </code></pre>
          .replace(/<\/code><\/pre>e>/gi, "</code></pre>")
          .replace(/<\/code><\/pre>\s*e>/gi, "</code></pre>")
          .replace(/<\/pree/gi, "</pre>")
          .replace(/<\/codee/gi, "</code>")
          .replace(/<\/cod/gi, "</code>")
          .replace(/<\/pr/gi, "</pre>") // Handle standalone </pr -> </pre>
          // Fix other common malformed HTML tags with repeated characters
          // Fix article tags with repeated 'e' characters: <articleeeee -> <article>
          // Pattern: <articl followed by 2+ 'e' chars (extra e's) -> <article>
          .replace(/<articl+e{2,}([^>]*)>/gi, "<article$1>") // <articleeeee -> <article>
          .replace(/<articl+e([^>]*)>/gi, "<article$1>") // <articlee -> <article>
          .replace(/<articl([^>]*)>/gi, "<article$1>") // <articl -> <article>
          .replace(/<\/articl+e{2,}>/gi, "</article>") // </articleeeee -> </article>
          .replace(/<\/articl+e>/gi, "</article>") // </articlee -> </article>
          .replace(/<\/articl>/gi, "</article>") // </articl -> </article>
          // Fix section tags with repeated 'n' characters: <sectionnnnnn -> <section>
          // Pattern: <sectio followed by 2+ 'n' chars (extra n's) -> <section>
          .replace(/<sectio+n{2,}([^>]*)>/gi, "<section$1>") // <sectionnnnnn -> <section>
          .replace(/<sectio+n([^>]*)>/gi, "<section$1>") // <sectionn -> <section>
          .replace(/<sectio([^>]*)>/gi, "<section$1>") // <sectio -> <section>
          .replace(/<\/sectio+n{2,}>/gi, "</section>") // </sectionnnnnn -> </section>
          .replace(/<\/sectio+n>/gi, "</section>") // </sectionn -> </section>
          .replace(/<\/sectio>/gi, "</section>") // </sectio -> </section>
          .replace(/<nav([^>]*)>/gi, "<nav$1>")
          .replace(/<\/nav>/gi, "</nav>")
          .replace(/<head([^>]*)>/gi, "<header$1>")
          .replace(/<\/head>/gi, "</header>")
          .replace(/<foot([^>]*)>/gi, "<footer$1>")
          .replace(/<\/foot>/gi, "</footer>")
          .replace(/<mai([^>]*)>/gi, "<main$1>")
          .replace(/<\/mai>/gi, "</main>")
          // Fix patterns where code tags are merged with content
          .replace(/<cod([a-zA-Z])/gi, "<code>$1")
          .replace(/<code([a-zA-Z])/gi, "<code>$1")
          .replace(/([a-zA-Z])<\/cod/gi, "$1</code>")
          .replace(/([a-zA-Z])<\/code/gi, "$1</code>")
          // Fix malformed <cod patterns with numbers/units (e.g., <cod1rem -> <code>1rem</code>)
          .replace(/<cod(\d+[a-zA-Z]+)/gi, "<code>$1</code>")
          .replace(/<cod(\d+)/gi, "<code>$1</code>");
      }

      // ============================================
      // PHASE 2: Decode HTML entities
      // ============================================
      cleaned = decodeHtmlEntities(cleaned);

      // ============================================
      // PHASE 3: Convert inline <code> tags to backticks (but NOT inside <pre> blocks)
      // ============================================
      const parts: string[] = [];
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

      // ============================================
      // PHASE 4: Fix code-related artifacts (MULTIPLE PASSES)
      // ============================================
      for (let pass = 0; pass < 5; pass++) {
        cleaned = cleaned
          // Fix efor -> for (handle all variations)
          .replace(/efor\s*\(/gi, "for (")
          .replace(/efor\s+/gi, "for ")
          .replace(/efor/gi, "for")
          // Fix ereturn -> return
          .replace(/ereturn\s+/gi, "return ")
          .replace(/ereturn/gi, "return")
          // Fix esetTimeout -> setTimeout
          .replace(/esetTimeout/gi, "setTimeout")
          .replace(/esetInterval/gi, "setInterval")
          // Fix econsole -> console
          .replace(/econsole\.log/gi, "console.log")
          .replace(/econsole\./gi, "console.")
          .replace(/econsole/gi, "console")
          // Remove e> artifacts (most aggressive - handles all variations)
          .replace(/e>e>e>e>/g, "") // Remove quadruple e>
          .replace(/e>e>e>/g, "") // Remove triple e>
          .replace(/e>e>/g, "") // Remove double e>
          .replace(/^e>+/g, "") // Remove e> at start
          .replace(/e>+$/g, "") // Remove e> at end
          .replace(/(\w+)e>/g, "$1") // Remove e> after words
          .replace(/e>(\w+)/g, "$1") // Remove e> before words
          .replace(/\s*e>\s*/g, " ") // Remove standalone e> with spaces
          // Fix NaN patterns
          .replace(/NaNe>NaN/gi, "NaN")
          .replace(/NaNe>/gi, "NaN")
          .replace(/NaN>/gi, "NaN")
          .replace(/NaN\s*e>/gi, "NaN")
          .replace(/NaN\s*>/gi, "NaN")
          // Fix method name duplications
          .replace(/diameterameter/gi, "diameter")
          .replace(/perimeterimeter/gi, "perimeter")
          .replace(/consoleonsole\.log/gi, "console.log")
          .replace(/console\.loge>/gi, "console.log")
          .replace(/console\.log>/gi, "console.log")
          .replace(/console\.loge\.log/gi, "console.log")
          .replace(/console\.log\.log/gi, "console.log")
          .replace(/newColorwColor/gi, "newColor")
          .replace(/newColorolor/gi, "newColor")
          // Fix duplicated method names (e.g., giveLydiaPizzaaPizza -> giveLydiaPizza)
          // Pattern 1: giveLydiaPizzaaPizza -> giveLydiaPizza (Pizza + aPizza where Pizza is duplicated)
          .replace(/(\w+)([A-Z][a-z]+)([a-z]*)\2/gi, "$1$2") // Matches: giveLydiaPizzaaPizza -> giveLydiaPizza
          // Pattern 2: giveLydiaPizzaPizza -> giveLydiaPizza (exact duplication)
          .replace(/(\w+)([A-Z][a-z]+)\2/gi, "$1$2") // Matches: giveLydiaPizzaPizza -> giveLydiaPizza
          // Remove standalone > characters that are clearly artifacts (but preserve code operators)
          // Only remove > that are not part of valid code patterns
          .replace(/^>\s*/g, "")
          .replace(/\s*>$/g, "")
          .replace(/\s+>\s+/g, " ")
          // Fix patterns where > appears between words (but not in code comparisons)
          .replace(
            /([a-zA-Z0-9])\s*>\s*([a-zA-Z0-9])/g,
            (match, before, after) => {
              // If it looks like a comparison operator in code context, preserve it
              if (/[0-9]/.test(before) && /[0-9]/.test(after)) {
                return match; // Preserve number comparisons like "3 > 2"
              }
              // Otherwise, it's likely an artifact
              return `${before} ${after}`;
            },
          );
      }

      // ============================================
      // PHASE 5: Fix duplicated text patterns
      // ============================================
      // Pattern 1: "Word"word" where word is a suffix of Word
      cleaned = cleaned.replace(
        /"([A-Za-z]+)"([a-z]+)"/g,
        (match, word, suffix) => {
          if (word.toLowerCase().endsWith(suffix.toLowerCase())) {
            return `"${word}"`;
          }
          return match;
        },
      );

      // Pattern 2: "Word"Word" - full word duplication
      cleaned = cleaned.replace(/"([A-Za-z]+)"\1"/g, '"$1"');

      // Pattern 3: "Word"partial" where partial matches the end of Word
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

      // Pattern 4: Handle cases without quotes: Number"mber" -> Number"
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

      // Pattern 5: Fix specific known patterns
      cleaned = cleaned
        .replace(/"Number"mber"/gi, '"Number"')
        .replace(/"Array"rray"/gi, '"Array"')
        .replace(/"object"ject"/gi, '"object"')
        .replace(/"NaN"NaN"/gi, '"NaN"')
        .replace(/"String"ring"/gi, '"String"')
        .replace(/"Boolean"oolean"/gi, '"Boolean"')
        .replace(/"undefined"efined"/gi, '"undefined"')
        .replace(/"function"unction"/gi, '"function"');

      // ============================================
      // PHASE 6: Format code blocks with proper indentation
      // ============================================
      // Extract and format code blocks (<pre><code>...</code></pre>)
      cleaned = cleaned.replace(
        /<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi,
        (match, codeContent) => {
          // Format the code content with proper indentation
          const formattedCode = formatCodeContent(codeContent);
          return `<pre><code>${formattedCode}</code></pre>`;
        },
      );

      // Also format markdown code blocks (```code```)
      cleaned = cleaned.replace(
        /```(\w+)?\n?([\s\S]*?)```/g,
        (match, lang, codeContent) => {
          // Format the code content with proper indentation
          const formattedCode = formatCodeContent(codeContent);
          return `\`\`\`${lang || ""}\n${formattedCode}\n\`\`\``;
        },
      );

      // ============================================
      // PHASE 7: Final cleanup (PRESERVE FORMATTING)
      // ============================================
      // Preserve newlines and paragraph breaks - only normalize spaces within lines
      // Replace multiple spaces with single space, but preserve newlines
      cleaned = cleaned
        // Normalize multiple spaces to single space (but preserve newlines)
        .replace(/[ \t]+/g, " ") // Multiple spaces/tabs to single space
        // Normalize multiple newlines to double newline (paragraph break)
        .replace(/\n{3,}/g, "\n\n") // More than 2 newlines -> 2 newlines
        // Remove spaces before newlines
        .replace(/ +\n/g, "\n")
        // Remove spaces after newlines
        .replace(/\n +/g, "\n")
        // Final pass for > artifacts (but preserve code operators)
        .replace(
          /([a-zA-Z0-9])\s*>\s*([a-zA-Z0-9])/g,
          (match, before, after) => {
            // Preserve number comparisons like "3 > 2"
            if (/[0-9]/.test(before) && /[0-9]/.test(after)) {
              return match;
            }
            // Otherwise remove the > artifact
            return `${before} ${after}`;
          },
        )
        .replace(/\s*>\s+/g, " ") // Standalone > with spaces
        .trim();

      return cleaned;
    };

    // Enrich questions with topic information
    if (questions && questions.length > 0) {
      questions = questions
        .map((q) => {
          try {
            // Find topic information
            const topic = topics.find((t) => t.id === q.topic_id);

            // Parse options if it's a string or ensure it's an array
            let parsedOptions = q.options;

            // If options is a string (JSON stringified), parse it
            if (typeof q.options === "string") {
              try {
                parsedOptions = JSON.parse(q.options);
              } catch (e) {
                console.error(
                  `Failed to parse options for question ${q.id}:`,
                  e,
                );
                parsedOptions = null;
              }
            }

            // Clean option text if options is an array
            if (Array.isArray(parsedOptions)) {
              parsedOptions = parsedOptions.map((opt: any) => {
                if (typeof opt === "string") {
                  // If option is just a string, clean and return it
                  return cleanOptionText(opt);
                } else if (opt && typeof opt === "object") {
                  // If option is an object, clean the text property
                  const cleanedOpt = { ...opt };
                  if (opt.text && typeof opt.text === "string") {
                    cleanedOpt.text = cleanOptionText(opt.text);
                  }
                  // Also clean any other string properties that might contain text
                  Object.keys(cleanedOpt).forEach((key) => {
                    if (typeof cleanedOpt[key] === "string" && key !== "id") {
                      cleanedOpt[key] = cleanOptionText(cleanedOpt[key]);
                    }
                  });
                  return cleanedOpt;
                }
                return opt;
              });
            }

            // Clean title, content (preserves code blocks), correct_answer, and explanation
            // Add null checks to prevent errors
            const cleanedTitle =
              q.title && typeof q.title === "string"
                ? cleanContent(q.title)
                : q.title || "";
            const cleanedContent =
              q.content && typeof q.content === "string"
                ? cleanContent(q.content)
                : q.content || "";
            const cleanedCorrectAnswer =
              q.correct_answer && typeof q.correct_answer === "string"
                ? cleanOptionText(q.correct_answer)
                : q.correct_answer || "";
            const cleanedExplanation =
              q.explanation && typeof q.explanation === "string"
                ? cleanOptionText(q.explanation)
                : q.explanation || "";

            // Clean hints if they exist
            let cleanedHints = null;
            if (q.hints) {
              if (Array.isArray(q.hints)) {
                cleanedHints = q.hints.map((hint: string) =>
                  cleanOptionText(hint),
                );
              } else {
                cleanedHints = [cleanOptionText(q.hints)];
              }
            }

            // Return question with properly parsed and cleaned options and enriched with topic info
            return {
              ...q,
              title: cleanedTitle,
              content: cleanedContent,
              options: parsedOptions,
              correct_answer: cleanedCorrectAnswer,
              explanation: cleanedExplanation,
              hints: cleanedHints,
              // Add topic information
              topic_name: topic?.name || null,
              topic_description: topic?.description || null,
              // Ensure constraints is an array (could be null or empty)
              constraints: Array.isArray(q.constraints)
                ? q.constraints
                : q.constraints
                  ? [q.constraints]
                  : null,
              // Ensure tags is an array (could be null or empty)
              tags: Array.isArray(q.tags) ? q.tags : q.tags ? [q.tags] : null,
              // Include language from database (defaults to 'javascript' if null)
              language: q.language || "javascript",
              // Include resources if they exist (nullable field)
              resources: q.resources || null,
            };
          } catch (questionError) {
            console.error(
              `❌ Error processing question ${q?.id || "unknown"}:`,
              questionError,
            );
            // Return question with minimal processing if error occurs
            return {
              ...q,
              options: Array.isArray(q.options)
                ? q.options
                : q.options
                  ? [q.options]
                  : [],
              constraints: Array.isArray(q.constraints)
                ? q.constraints
                : q.constraints
                  ? [q.constraints]
                  : null,
              tags: Array.isArray(q.tags) ? q.tags : q.tags ? [q.tags] : null,
              language: q.language || "javascript",
            };
          }
        })
        .filter((q) => q !== null && q !== undefined); // Remove any null/undefined questions

      console.log(
        "🔍 Plan Details Debug: Questions with options parsed. Sample:",
        questions?.slice(0, 2).map((q) => ({
          id: q.id,
          title: q.title,
          options: q.options,
          optionsType: typeof q.options,
          optionsLength: Array.isArray(q.options) ? q.options.length : null,
        })) || [],
      );
    }
    console.log("🔍 Plan Details Debug: Raw data counts:", {
      cards: cards?.length || 0,
      categories: categories?.length || 0,
      topics: topics?.length || 0,
      questions: questions?.length || 0,
      planQuestions: planQuestionsData?.length || 0,
    });

    console.log("🔍 Plan Details Debug: Sample card and category data:", {
      sampleCard: cards?.[0]
        ? {
            id: cards[0].id,
            title: cards[0].title,
            type: cards[0].type,
          }
        : null,
      sampleCategories:
        categories?.slice(0, 3).map((c) => ({
          id: c.id,
          name: c.name,
          learning_card_id: c.learning_card_id,
          card_type: c.card_type,
        })) || [],
      totalCategories: categories?.length || 0,
      categoriesWithLearningCardId:
        categories?.filter((c) => c.learning_card_id).length || 0,
    });

    // Build the hierarchy using plan_questions data
    // Group questions by their topic_id from plan_questions (not from question itself)
    const questionsByTopic = new Map();
    const questionsByCategory = new Map();

    try {
      // Create a map of question_id -> topic_id from plan_questions
      const questionToTopicMap = new Map();
      (planQuestionsData || []).forEach((pq) => {
        try {
          if (pq?.question_id && pq?.topic_id) {
            questionToTopicMap.set(pq.question_id, pq.topic_id);
          }
        } catch (pqError) {
          console.error("❌ Error processing plan_question:", pqError, pq);
        }
      });

      (questions || []).forEach((question) => {
        try {
          if (!question || !question.id) {
            console.warn("⚠️ Skipping invalid question:", question);
            return;
          }

          // Use topic_id from plan_questions, fallback to question.topic_id
          const topicId =
            questionToTopicMap.get(question.id) || question.topic_id;

          if (topicId) {
            // Find the topic to get its category_id
            const topic = topics.find((t) => t?.id === topicId);
            const categoryId = topic?.category_id;

            if (!questionsByTopic.has(topicId)) {
              questionsByTopic.set(topicId, []);
            }
            const topicQuestions = questionsByTopic.get(topicId);
            if (Array.isArray(topicQuestions)) {
              topicQuestions.push(question);
            }

            if (categoryId) {
              if (!questionsByCategory.has(categoryId)) {
                questionsByCategory.set(categoryId, []);
              }
              const categoryQuestions = questionsByCategory.get(categoryId);
              if (Array.isArray(categoryQuestions)) {
                categoryQuestions.push(question);
              }
            }
          }
        } catch (questionError) {
          console.error(
            `❌ Error processing question ${question?.id || "unknown"}:`,
            questionError,
          );
        }
      });
    } catch (hierarchyError) {
      console.error("❌ Error building question hierarchy:", hierarchyError);
      // Continue with empty maps if hierarchy building fails
    }

    console.log("🔍 Plan Details Debug: Questions grouped by topic/category:", {
      topicsWithQuestions: Array.from(questionsByTopic.entries()).map(
        ([topicId, qs]) => ({
          topicId,
          questionCount: qs.length,
          topicName: topics.find((t) => t.id === topicId)?.name,
        }),
      ),
      categoriesWithQuestions: Array.from(questionsByCategory.entries()).map(
        ([categoryId, qs]) => ({
          categoryId,
          questionCount: qs.length,
          categoryName: categories.find((c) => c.id === categoryId)?.name,
        }),
      ),
    });

    // Build the hierarchy: Cards -> Categories -> Topics -> Questions
    const cardsWithData = (cards || [])
      .map((card) => {
        try {
          // Find categories that belong to this card
          const cardCategories = (categories || []).filter((category) => {
            try {
              // Match by learning_card_id first, then by card_type as fallback
              const matchesCardId = category?.learning_card_id === card?.id;
              const matchesCardType = category?.card_type === card?.type;

              console.log(
                `🔍 Category matching for card "${card?.title || "unknown"}":`,
                {
                  categoryName: category?.name,
                  categoryLearningCardId: category?.learning_card_id,
                  cardId: card?.id,
                  categoryCardType: category?.card_type,
                  cardType: card?.type,
                  matchesCardId,
                  matchesCardType,
                  willInclude: matchesCardId || matchesCardType,
                },
              );

              return matchesCardId || matchesCardType;
            } catch (categoryError) {
              console.error(`❌ Error matching category:`, categoryError);
              return false;
            }
          });

          console.log(
            `🔍 Plan Details Debug: Card "${card?.title || "unknown"}" (${card?.id || "unknown"})`,
            {
              cardType: card?.type,
              cardId: card?.id,
              foundCategories: cardCategories.length,
              categoryIds: cardCategories.map((c) => c?.id).filter(Boolean),
            },
          );

          const categoriesWithTopics = cardCategories.map((category) => {
            try {
              // Find topics that belong to this category
              const categoryTopics = (topics || []).filter(
                (topic) => topic?.category_id === category?.id,
              );

              const topicsWithQuestions = categoryTopics.map((topic) => {
                // Get questions for this topic from plan_questions
                const topicQuestions = questionsByTopic.get(topic?.id) || [];

                return {
                  ...topic,
                  questions: topicQuestions,
                  questionCount: topicQuestions.length,
                };
              });

              return {
                ...category,
                topics: topicsWithQuestions,
                questionCount: topicsWithQuestions.reduce(
                  (sum, topic) => sum + (topic?.questionCount || 0),
                  0,
                ),
              };
            } catch (categoryError) {
              console.error(
                `❌ Error processing category "${category?.name || category?.id || "unknown"}":`,
                categoryError,
              );
              return {
                ...category,
                topics: [],
                questionCount: 0,
              };
            }
          });

          return {
            ...card,
            categories: categoriesWithTopics,
            questionCount: categoriesWithTopics.reduce(
              (sum, category) => sum + (category?.questionCount || 0),
              0,
            ),
            hasQuestions: categoriesWithTopics.some(
              (cat) => (cat?.questionCount || 0) > 0,
            ),
          };
        } catch (cardError) {
          console.error(
            `❌ Error processing card "${card?.title || card?.id || "unknown"}":`,
            cardError,
          );
          // Return card with empty categories if processing fails
          return {
            ...card,
            categories: [],
            questionCount: 0,
            hasQuestions: false,
          };
        }
      })
      .filter((card) => card !== null && card !== undefined);

    // Calculate total questions
    const totalQuestions = cardsWithData.reduce(
      (sum, card) => sum + (card?.questionCount || 0),
      0,
    );

    console.log("🔍 Plan Details Debug: Final result:", {
      totalCards: cardsWithData.length,
      totalQuestions,
      cardsWithQuestions: cardsWithData.filter(
        (c) => (c?.questionCount || 0) > 0,
      ).length,
      cardDetails: cardsWithData.map((c) => ({
        title: c?.title || "Unknown",
        questionCount: c?.questionCount || 0,
        categoriesCount: (c?.categories || []).length,
      })),
    });

    // Prepare response data with error handling
    try {
      const responseData = {
        success: true,
        data: {
          id: plan?.id,
          name: plan?.name,
          description: plan?.description,
          duration: plan?.duration,
          difficulty: plan?.difficulty,
          created_at: plan?.created_at,
          updated_at: plan?.updated_at,
          is_active: plan?.is_active,
          cards: cardsWithData,
          totalQuestions,
          // Add raw data for debugging (limited to prevent large responses)
          rawData: {
            cardsCount: cards?.length || 0,
            categoriesCount: categories?.length || 0,
            topicsCount: topics?.length || 0,
            questionsCount: questions?.length || 0,
            planQuestionsCount: planQuestionsData?.length || 0,
          },
          // Legacy compatibility - create sections from cards for backward compatibility
          sections: cardsWithData.map((card, index) => {
            try {
              const questionCount = card?.questionCount || 0;
              const categories = card?.categories || [];
              return {
                id: card?.id || `card-${index}`,
                name: card?.title || "Unknown Card",
                category: card?.type || "unknown",
                weight:
                  totalQuestions > 0
                    ? Math.round((questionCount / totalQuestions) * 100)
                    : 0,
                order: index + 1,
                questions: categories.flatMap((cat: any) =>
                  (cat?.topics || []).flatMap(
                    (topic: any) => topic?.questions || [],
                  ),
                ),
                questionCount: questionCount,
                // Add card-specific metadata
                cardType: card?.type || "unknown",
                description: card?.description || null,
                color: card?.color || null,
                icon: card?.icon || null,
                hasQuestions: questionCount > 0,
              };
            } catch (sectionError) {
              console.error(
                `❌ Error creating section for card ${card?.id || index}:`,
                sectionError,
              );
              return {
                id: card?.id || `card-${index}`,
                name: card?.title || "Unknown Card",
                category: card?.type || "unknown",
                weight: 0,
                order: index + 1,
                questions: [],
                questionCount: 0,
                cardType: card?.type || "unknown",
                description: null,
                color: null,
                icon: null,
                hasQuestions: false,
              };
            }
          }),
        },
      };

      return NextResponse.json(responseData);
    } catch (responseError) {
      console.error("❌ Error creating response JSON:", responseError);
      const errorMessage =
        responseError instanceof Error
          ? responseError.message
          : "Unknown error";
      return NextResponse.json(
        {
          success: false,
          error: "Failed to serialize response data",
          details:
            process.env.NODE_ENV === "development" ? errorMessage : undefined,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error fetching plan details:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error("Error details:", {
      message: errorMessage,
      stack: errorStack,
      planId: planId || "unknown",
    });
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch plan details",
        details:
          process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 },
    );
  }
}
