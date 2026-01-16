import { getSupabaseClient } from "../lib/get-supabase-client";
import { ProblemSolvingTask } from "@elzatona/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
} from "@elzatona/common-ui";
import { Terminal, ArrowRight, Code2, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProblemSolvingPage() {
  const supabase = getSupabaseClient();

  const { data: snapshot, error } = await supabase
    .from("problem_solving_tasks")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching problem solving tasks:", error);
    return (
      <div className="container mx-auto py-12 text-center">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold">Failed to load challenges</h2>
        <p className="text-gray-500">Please try again later.</p>
      </div>
    );
  }

  // Map to correct types
  const tasks: ProblemSolvingTask[] = (snapshot || []).map((t: any) => ({
    id: t.id,
    title: t.title,
    description: t.description,
    difficulty: t.difficulty,
    category: t.category,
    functionName: t.function_name || t.functionName,
    starterCode: t.starter_code || t.starterCode,
    solution: t.solution,
    testCases: t.test_cases || t.testCases || [],
    constraints: t.constraints || [],
    examples: t.examples || [],
    tags: t.tags || [],
    created_at: t.created_at,
    updated_at: t.updated_at,
    is_active: t.is_active,
  }));

  return (
    <div className="container mx-auto py-12 px-4 space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <Code2 className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
          Problem Solving
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Sharpen your algorithmic skills with our collection of coding
          challenges. Master data structures and algorithms through practice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className="group hover:shadow-xl transition-all duration-300 border-gray-200 dark:border-gray-800"
          >
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge
                  variant={
                    task.difficulty === "easy"
                      ? "secondary"
                      : task.difficulty === "medium"
                        ? "default"
                        : "destructive"
                  }
                  className={
                    task.difficulty === "medium"
                      ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                      : ""
                  }
                >
                  {task.difficulty}
                </Badge>
                <span className="text-xs text-gray-400 font-mono">
                  {task.category}
                </span>
              </div>
              <CardTitle className="group-hover:text-green-600 transition-colors">
                {task.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 line-clamp-2 mb-6">
                {task.description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex gap-2">
                  {task.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {task.tags.length > 2 && (
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      +{task.tags.length - 2}
                    </span>
                  )}
                </div>

                <Link href={`/problem-solving/${task.id}`}>
                  <Button
                    size="sm"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    Solve <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No challenges available yet. Check back soon!
        </div>
      )}
    </div>
  );
}
