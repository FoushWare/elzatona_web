import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface QuestionTopic {
  id: string;
  name: string;
  description: string;
  category:
    | "javascript-core"
    | "data-structures-algorithms"
    | "browser-dom"
    | "css-styling"
    | "react"
    | "nextjs-frameworks"
    | "typescript"
    | "testing"
    | "build-tools-workflow"
    | "security"
    | "software-engineering"
    | "performance-monitoring"
    | "advanced-future";
  color: string;
  created_at: string;
  updated_at: string;
  question_count: number;
}

// Load topics from Supabase
async function loadTopics(): Promise<QuestionTopic[]> {
  try {
    const { data: querySnapshot, error } = await supabase
      .from("topics")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading topics from Supabase:", error);
      return [];
    }

    const topics: QuestionTopic[] = [];
    querySnapshot?.forEach((doc) => {
      topics.push({
        id: doc.id,
        ...doc,
      } as QuestionTopic);
    });

    return topics;
  } catch (error) {
    console.error("Error loading topics from Supabase:", error);
    return [];
  }
}

// Save topic to Supabase
async function saveTopic(topic: Omit<QuestionTopic, "id">): Promise<string> {
  const { data: newTopic, error } = await supabase
    .from("topics")
    .insert({
      ...topic,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to save topic: ${error.message}`);
  }

  return newTopic.id;
}

// Update topic in Supabase
async function updateTopic(
  topicId: string,
  topic: Partial<QuestionTopic>,
): Promise<void> {
  const { error } = await supabase
    .from("topics")
    .update({
      ...topic,
      updated_at: new Date().toISOString(),
    })
    .eq("id", topicId);

  if (error) {
    throw new Error(`Failed to update topic: ${error.message}`);
  }
}

// Delete topic from Supabase
async function deleteTopic(topicId: string): Promise<void> {
  const { error } = await supabase.from("topics").delete().eq("id", topicId);

  if (error) {
    throw new Error(`Failed to delete topic: ${error.message}`);
  }
}

// Check if topic exists by name
async function topicExistsByName(name: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("topics")
      .select("id")
      .eq("name", name)
      .single();

    if (error) {
      return false;
    }

    return !!data;
  } catch (error) {
    console.error("Error checking if topic exists:", error);
    return false;
  }
}

// GET /api/admin/topics
export async function GET() {
  try {
    const topics = await loadTopics();
    return NextResponse.json({
      success: true,
      data: topics,
    });
  } catch (error) {
    console.error("Error loading topics:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to load topics",
      },
      { status: 500 },
    );
  }
}

// POST /api/admin/topics
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, category, color } = body;

    if (!name || !category) {
      return NextResponse.json(
        {
          success: false,
          error: "Name and category are required",
        },
        { status: 400 },
      );
    }

    // Check if topic with same name already exists
    const exists = await topicExistsByName(name);
    if (exists) {
      return NextResponse.json(
        {
          success: false,
          error: "Topic with this name already exists",
        },
        { status: 400 },
      );
    }

    const newTopic: Omit<QuestionTopic, "id"> = {
      name,
      description: description || "",
      category,
      color: color || "#3B82F6",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      question_count: 0,
    };

    const topicId = await saveTopic(newTopic);
    const createdTopic: QuestionTopic = {
      id: topicId,
      ...newTopic,
    };

    return NextResponse.json({
      success: true,
      data: createdTopic,
    });
  } catch (error) {
    console.error("Error creating topic:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create topic",
      },
      { status: 500 },
    );
  }
}
