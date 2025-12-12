/* eslint-disable @typescript-eslint/no-require-imports */
// Script to check all questions in database and divide into batches
// Then check each batch for code/content cleaning issues

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Supabase configuration (environment variables required)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Error: Missing required Supabase environment variables");
  console.error(
    "   NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Batch size - process 50 questions at a time
const BATCH_SIZE = 50;

// Patterns to detect issues
const ISSUE_PATTERNS = {
  malformedHtml: [
    /<pr<cod/gi,
    /<\/cod<\/pr/gi,
    /<articl+e{2,}/gi,
    /<sectio+n{2,}/gi,
    /<pr`/gi,
    /`\s*<\/pr/gi,
  ],
  malformedCode: [
    /efor\s*\(/gi,
    /econsole\.log/gi,
    /e>e>/g,
    /NaNe>/gi,
    /diameterameter/gi,
    /perimeterimeter/gi,
  ],
  malformedMarkdown: [/`{4,}/g, /\*{4,}/g, /#{7,}/g],
  missingSpacing: [
    /([a-zA-Z])([a-zA-Z]{2,})"([a-z]{2,})"/g, // Duplicated text
  ],
};

/**
 * Check a question for cleaning issues
 */
function checkQuestionForIssues(question) {
  const issues = [];

  // Check title
  if (question.title) {
    ISSUE_PATTERNS.malformedHtml.forEach((pattern) => {
      if (pattern.test(question.title)) {
        issues.push({
          field: "title",
          type: "malformedHtml",
          pattern: pattern.toString(),
        });
      }
    });
    ISSUE_PATTERNS.malformedCode.forEach((pattern) => {
      if (pattern.test(question.title)) {
        issues.push({
          field: "title",
          type: "malformedCode",
          pattern: pattern.toString(),
        });
      }
    });
  }

  // Check content
  if (question.content) {
    ISSUE_PATTERNS.malformedHtml.forEach((pattern) => {
      if (pattern.test(question.content)) {
        issues.push({
          field: "content",
          type: "malformedHtml",
          pattern: pattern.toString(),
        });
      }
    });
    ISSUE_PATTERNS.malformedCode.forEach((pattern) => {
      if (pattern.test(question.content)) {
        issues.push({
          field: "content",
          type: "malformedCode",
          pattern: pattern.toString(),
        });
      }
    });
    ISSUE_PATTERNS.malformedMarkdown.forEach((pattern) => {
      if (pattern.test(question.content)) {
        issues.push({
          field: "content",
          type: "malformedMarkdown",
          pattern: pattern.toString(),
        });
      }
    });
  }

  // Check explanation
  if (question.explanation) {
    ISSUE_PATTERNS.malformedHtml.forEach((pattern) => {
      if (pattern.test(question.explanation)) {
        issues.push({
          field: "explanation",
          type: "malformedHtml",
          pattern: pattern.toString(),
        });
      }
    });
    ISSUE_PATTERNS.malformedCode.forEach((pattern) => {
      if (pattern.test(question.explanation)) {
        issues.push({
          field: "explanation",
          type: "malformedCode",
          pattern: pattern.toString(),
        });
      }
    });
  }

  // Check options
  if (question.options) {
    let options = question.options;
    if (typeof options === "string") {
      try {
        options = JSON.parse(options);
      } catch (_e) {
        // Not JSON, treat as string
        options = [options];
      }
    }

    if (Array.isArray(options)) {
      options.forEach((opt, index) => {
        const optText = typeof opt === "string" ? opt : opt?.text || "";
        if (optText) {
          ISSUE_PATTERNS.malformedHtml.forEach((pattern) => {
            if (pattern.test(optText)) {
              issues.push({
                field: `options[${index}]`,
                type: "malformedHtml",
                pattern: pattern.toString(),
              });
            }
          });
          ISSUE_PATTERNS.malformedCode.forEach((pattern) => {
            if (pattern.test(optText)) {
              issues.push({
                field: `options[${index}]`,
                type: "malformedCode",
                pattern: pattern.toString(),
              });
            }
          });
        }
      });
    }
  }

  return issues;
}

/**
 * Main function to fetch and batch questions
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
      `📦 Divided into ${batches.length} batches (${BATCH_SIZE} questions per batch)`,
    );

    // Check each batch
    const batchResults = [];
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      const batchNumber = i + 1;

      console.log(`\n🔍 Checking batch ${batchNumber}/${batches.length}...`);

      const batchIssues = [];
      batch.forEach((question) => {
        const issues = checkQuestionForIssues(question);
        if (issues.length > 0) {
          batchIssues.push({
            questionId: question.id,
            title: question.title?.substring(0, 50) || "No title",
            issues: issues,
          });
        }
      });

      batchResults.push({
        batchNumber,
        totalQuestions: batch.length,
        questionsWithIssues: batchIssues.length,
        issues: batchIssues,
      });

      console.log(
        `  ✅ Batch ${batchNumber}: ${batchIssues.length}/${batch.length} questions have issues`,
      );
    }

    // Save results to file
    const resultsDir = path.join(__dirname, "question-cleaning-results");
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }

    const resultsFile = path.join(
      resultsDir,
      `batch-results-${Date.now()}.json`,
    );
    fs.writeFileSync(
      resultsFile,
      JSON.stringify(
        {
          totalQuestions: questions.length,
          totalBatches: batches.length,
          batchSize: BATCH_SIZE,
          batches: batchResults,
          summary: {
            totalQuestionsWithIssues: batchResults.reduce(
              (sum, b) => sum + b.questionsWithIssues,
              0,
            ),
            issuesByType: batchResults.reduce((acc, batch) => {
              batch.issues.forEach((q) => {
                q.issues.forEach((issue) => {
                  acc[issue.type] = (acc[issue.type] || 0) + 1;
                });
              });
              return acc;
            }, {}),
          },
        },
        null,
        2,
      ),
    );

    console.log(`\n✅ Results saved to: ${resultsFile}`);
    console.log(`\n📊 Summary:`);
    console.log(`   Total questions: ${questions.length}`);
    console.log(
      `   Questions with issues: ${batchResults.reduce((sum, b) => sum + b.questionsWithIssues, 0)}`,
    );
    console.log(`   Total batches: ${batches.length}`);

    // Print batch summary
    console.log(`\n📋 Batch Summary:`);
    batchResults.forEach((batch) => {
      console.log(
        `   Batch ${batch.batchNumber}: ${batch.questionsWithIssues}/${batch.totalQuestions} questions need fixing`,
      );
    });
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

// Run the script
main();
