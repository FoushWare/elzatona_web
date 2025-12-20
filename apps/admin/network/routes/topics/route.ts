// Topics API Route for Admin
// v1.0 - Topic management for admin panel

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function sanitizeForLog(value: unknown): string {
  const raw =
    typeof value === "string"
      ? value
      : (() => {
          try {
            return JSON.stringify(value);
          } catch {
            return "[unserializable]";
          }
        })();

  return raw.split("\r").join(" ").split("\n").join(" ").slice(0, 500);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface Topic {
  id: string;
  name: string;
  description?: string;
  category_id?: string;
  order_index?: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// GET /api/topics - Get all topics
export async function GET() {
  try {
    console.log("🔄 Admin API: Fetching topics...");

    const { data: topics, error } = await supabase
      .from("topics")
      .select("*")
      .eq("is_active", true)
      .order("order_index", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    // Transform data to match expected format
    const transformedTopics =
      topics?.map((topic) => ({
        id: topic.id,
        name: topic.name,
        description: topic.description,
        category_id: topic.category_id,
        order_index: topic.order_index,
        is_active: topic.is_active,
        created_at: new Date(topic.created_at),
        updated_at: new Date(topic.updated_at),
      })) || [];

    console.log(
      "📊 Admin API: Topics fetched:",
      transformedTopics.length,
      "topics",
    );

    return NextResponse.json({
      success: true,
      data: transformedTopics,
      count: transformedTopics.length,
    });
  } catch (error) {
    console.error("❌ Admin API: Error fetching topics:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch topics",
      },
      { status: 500 },
    );
  }
}

// POST /api/topics - Create a new topic
export async function POST(request: NextRequest) {
  try {
    const topicData = await request.json();
    console.log(
      "🔄 Admin API: Creating topic with data:",
      sanitizeForLog(topicData),
    );

    // Validate required fields
    const requiredFields = ["name"];
    for (const field of requiredFields) {
      if (!topicData[field]) {
        console.error(
          "❌ Admin API: Missing required field:",
          sanitizeForLog(field),
        );
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          { status: 400 },
        );
      }
    }

    // Transform data to match Supabase schema
    const supabaseTopicData = {
      name: topicData.name,
      description: topicData.description || "",
      category_id: topicData.category_id || null,
      order_index: topicData.order_index || 0,
      is_active: topicData.is_active !== false,
    };

    const { data: newTopic, error } = await supabase
      .from("topics")
      .insert(supabaseTopicData)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    console.log("✅ Admin API: Topic created with ID:", newTopic.id);

    // Transform response to match expected format
    const transformedTopic = {
      id: newTopic.id,
      name: newTopic.name,
      description: newTopic.description,
      category_id: newTopic.category_id,
      order_index: newTopic.order_index,
      is_active: newTopic.is_active,
      created_at: new Date(newTopic.created_at),
      updated_at: new Date(newTopic.updated_at),
    };

    return NextResponse.json({
      success: true,
      data: transformedTopic,
      message: "Topic created successfully",
    });
  } catch (error) {
    console.error("❌ Admin API: Error creating topic:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create topic",
      },
      { status: 500 },
    );
  }
}
