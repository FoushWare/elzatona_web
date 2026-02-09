import { getSupabaseClient } from "../../lib/get-supabase-client";
import { ProblemSolvingTask } from "@elzatona/types";
import { ProblemSolver, Button } from "@elzatona/common-ui";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProblemSolvingIdPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = getSupabaseClient();

  const { data: taskDoc, error } = await supabase
    .from("problem_solving_tasks")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !taskDoc) {
    if (error && error.code !== "PGRST116") {
      // Not found error code
      console.error("Error fetching problem solving task:", error);
    }
    return notFound();
  }

  // Map to correct types & ensure snake_case to camelCase
  const task: ProblemSolvingTask = {
    id: taskDoc.id,
    title: taskDoc.title,
    description: taskDoc.description,
    difficulty: taskDoc.difficulty,
    category: taskDoc.category,
    functionName: taskDoc.function_name || taskDoc.functionName,
    starterCode: taskDoc.starter_code || taskDoc.starterCode,
    solution: taskDoc.solution,
    testCases: taskDoc.test_cases || taskDoc.testCases || [],
    constraints: taskDoc.constraints || [],
    examples: taskDoc.examples || [],
    tags: taskDoc.tags || [],
    created_at: taskDoc.created_at,
    updated_at: taskDoc.updated_at,
    is_active: taskDoc.is_active,
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="flex items-center h-14 border-b px-4 justify-between bg-white dark:bg-gray-950 z-10">
        <div className="flex items-center gap-4">
          <Link href="/problem-solving">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Challenges
            </Button>
          </Link>
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-800" />
          <h1 className="font-semibold">{task.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Additional header items like Timer or settings could go here */}
        </div>
      </div>

      {/* Solver Component */}
      <div className="flex-1 overflow-hidden">
        <ProblemSolver task={task} />
      </div>
    </div>
  );
}
