import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const questions = [
  {
    id: "q1",
    title: "CSS Display Properties - Block Elements",
    question: "Which of the following statements about display: block is true?",
    answer: "B) It always starts on a new line.",
    explanation:
      "Block-level elements always start on a new line and take up the full width of their container. They can have width and height properties set, unlike inline elements.",
    difficulty: "beginner",
    category: "CSS",
    options: [
      "It takes only the width of its content.",
      "It always starts on a new line.",
      "Width and height cannot be set.",
      "It behaves like inline elements.",
    ],
    correctAnswer: 1,
    learningPath: "frontend-basics",
    order: 1,
  },
  {
    id: "q2",
    title: "CSS Display Properties - Inline Elements",
    question: "What happens when you apply display: inline to an element?",
    answer: "B) It ignores width and height properties.",
    explanation:
      "Inline elements ignore width and height properties and only take up as much space as their content requires. They flow with text and do not start on new lines.",
    difficulty: "beginner",
    category: "CSS",
    options: [
      "It takes the full width of its parent.",
      "It ignores width and height properties.",
      "It always starts on a new line.",
      "It behaves like a block element.",
    ],
    correctAnswer: 1,
    learningPath: "frontend-basics",
    order: 2,
  },
  {
    id: "q3",
    title: "CSS Display Properties - Inline-Block Elements",
    question:
      "Which display type allows you to place elements side-by-side and set custom width and height?",
    answer: "C) inline-block",
    explanation:
      "inline-block combines the best of both worlds: elements flow inline like inline elements but can have width and height set like block elements, making them perfect for side-by-side layouts with custom dimensions.",
    difficulty: "beginner",
    category: "CSS",
    options: ["block", "inline", "inline-block", "none of the above"],
    correctAnswer: 2,
    learningPath: "frontend-basics",
    order: 3,
  },
  {
    id: "q4",
    title: "CSS Display Properties - Inline Behavior",
    question:
      "For an element with display: inline, which of the following is true?",
    answer: "C) It flows with text and takes only content width.",
    explanation:
      "Inline elements flow with text content and only take up the width needed for their content. They cannot have width/height set and do not start on new lines.",
    difficulty: "beginner",
    category: "CSS",
    options: [
      "You can set width and height freely.",
      "Vertical margin works normally.",
      "It flows with text and takes only content width.",
      "It always pushes the next element to a new line.",
    ],
    correctAnswer: 2,
    learningPath: "frontend-basics",
    order: 4,
  },
  {
    id: "q5",
    title: "CSS Display Properties - Block Elements Examples",
    question:
      "Which of the following are examples of default block-level elements? (Choose all that apply)",
    answer: "A, B, D) <div>, <p>, <h1>",
    explanation:
      "Block-level elements like <div>, <p>, and <h1> take up the full width of their container and start on new lines. <span> is an inline element by default.",
    difficulty: "beginner",
    category: "CSS",
    options: ["<div>", "<p>", "<span>", "<h1>"],
    correctAnswer: 0,
    learningPath: "frontend-basics",
    order: 5,
  },
  {
    id: "q6",
    title: "CSS Display Properties - Inline Elements Examples",
    question:
      "Which of the following are examples of default inline elements? (Choose all that apply)",
    answer: "A, B) <a>, <strong>",
    explanation:
      "Inline elements like <a> and <strong> flow with text and only take up the space needed for their content. <img> is inline-block by default, and <section> is a block element.",
    difficulty: "beginner",
    category: "CSS",
    options: ["<a>", "<strong>", "<img>", "<section>"],
    correctAnswer: 0,
    learningPath: "frontend-basics",
    order: 6,
  },
  {
    id: "q7",
    title: "CSS Display Properties - Navigation Layout",
    question:
      "If you want to create button-like navigation items that align side-by-side and allow custom width/height, which display property is most suitable?",
    answer: "C) inline-block",
    explanation:
      "inline-block is perfect for navigation items because it allows elements to sit side-by-side (like inline) while still allowing you to set custom width and height (like block).",
    difficulty: "beginner",
    category: "CSS",
    options: ["block", "inline", "inline-block", "flex"],
    correctAnswer: 2,
    learningPath: "frontend-basics",
    order: 7,
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { learningPath, questions: questionsToAdd } = body;

    if (!questionsToAdd || !Array.isArray(questionsToAdd)) {
      return NextResponse.json(
        { success: false, error: "Questions array is required" },
        { status: 400 },
      );
    }

    console.log(
      `Adding ${questionsToAdd.length} questions to Supabase for learning path: ${learningPath}`,
    );

    const results = [];

    for (const question of questionsToAdd) {
      const { error: insertError } = await supabase
        .from("questions")
        .insert(question);

      if (insertError) {
        throw insertError;
      }

      results.push(
        `✅ Added question ${question.id}: ${question.question?.substring(0, 50)}...`,
      );
      console.log(
        `✅ Added question ${question.id}: ${question.question?.substring(0, 50)}...`,
      );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully added ${questionsToAdd.length} questions to Supabase!`,
      results,
    });
  } catch (error) {
    console.error("❌ Error adding questions:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to add questions to Supabase",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
