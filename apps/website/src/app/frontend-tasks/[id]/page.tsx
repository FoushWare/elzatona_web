import { getSupabaseClient } from "../../lib/get-supabase-client";
import { FrontendTaskSolver } from "@elzatona/common-ui";
import { FrontendTask } from "@elzatona/types";
import { notFound } from "next/navigation";

// Force dynamic to ensure we get fresh data
export const dynamic = "force-dynamic";

export default async function FrontendTaskPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = getSupabaseClient();

  // Fetch the task
  const { data: task, error } = await supabase
    .from("frontendTasks")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !task) {
    if (error) console.error("Error fetching frontend task:", error);
    notFound();
  }

  // Pass the task to the solver component
  return <FrontendTaskSolver task={task as unknown as FrontendTask} />;
}
