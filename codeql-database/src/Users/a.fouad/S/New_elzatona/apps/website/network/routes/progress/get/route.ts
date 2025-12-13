import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { cookies } from "next/headers";
import { verifySupabaseToken } from "../../../../lib/server-auth";
export async function GET(request: NextRequest) {
  try {
    // Get the Firebase token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("firebase_token")?.value;

    if (!token) {
      // For development, return mock progress data
      console.log(
        "⚠️ No authentication token found, returning mock data for development",
      );

      const mockProgress = {
        userId: "dev-user",
        totalQuestions: 0,
        correctAnswers: 0,
        accuracy: 0,
        timeSpent: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastActivity: new Date().toISOString(),
        sectionProgress: [],
        weeklyProgress: [],
        monthlyProgress: [],
        currentPlan: null,
        achievements: {
          badges: [],
          totalPoints: 0,
          level: 1,
          experience: 0,
        },
        preferences: {
          theme: "system",
          language: "en",
          learningMode: null,
          dailyGoal: 10,
          difficultyPreference: "mixed",
          sections: ["HTML", "CSS", "JavaScript", "React"],
        },
      };

      return NextResponse.json({
        success: true,
        progress: mockProgress,
        warning: "Using development mode - authentication not fully configured",
      });
    }

    // Verify the Firebase token
    const decodedToken = await verifySupabaseToken(token);
    if (!decodedToken) {
      console.warn(
        "Token verification failed, returning mock data for development",
      );

      // Return mock progress data for development
      const mockProgress = {
        userId: "dev-user",
        totalQuestions: 0,
        correctAnswers: 0,
        accuracy: 0,
        timeSpent: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastActivity: new Date().toISOString(),
        sectionProgress: [],
        weeklyProgress: [],
        monthlyProgress: [],
        currentPlan: null,
        achievements: {
          badges: [],
          totalPoints: 0,
          level: 1,
          experience: 0,
        },
        preferences: {
          theme: "system",
          language: "en",
          learningMode: null,
          dailyGoal: 10,
          difficultyPreference: "mixed",
          sections: ["HTML", "CSS", "JavaScript", "React"],
        },
      };

      return NextResponse.json({
        success: true,
        progress: mockProgress,
        warning: "Using development mode - authentication not fully configured",
      });
    }

    const { searchParams } = new URL(request.url);
    const learningMode = searchParams.get("mode") as
      | "guided"
      | "free-style"
      | null;
    const planId = searchParams.get("planId");

    // Fetch user data from Supabase
    const { data: userData, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", decodedToken.id)
      .single();
    if (error) throw error;

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const progress = userData.progress;
    const achievements = userData.achievements;
    const preferences = userData.preferences;

    // Get current learning plan if guided mode
    let currentPlan = null;
    if (learningMode === "guided" && planId) {
      const { data: planData, error: planError } = await supabase
        .from("learning_plans")
        .select("*")
        .eq("id", planId)
        .single();
      if (!planError) {
        currentPlan = planData;
      }
    }

    const progressData = {
      userId: decodedToken.id,
      totalQuestions: progress.totalQuestions,
      correctAnswers: progress.correctAnswers,
      accuracy: progress.accuracy,
      timeSpent: progress.totalTimeSpent,
      currentStreak: progress.currentStreak,
      longestStreak: progress.longestStreak,
      lastActivity: progress.lastActivityAt,
      sectionProgress: progress.sectionProgress,
      weeklyProgress: progress.weeklyProgress,
      monthlyProgress: progress.monthlyProgress,
      currentPlan,
      achievements: {
        badges: achievements.badges,
        totalPoints: achievements.totalPoints,
        level: achievements.level,
        experience: achievements.experience,
      },
      preferences: {
        theme: preferences.theme,
        language: preferences.language,
        learningMode: preferences.learningMode,
        dailyGoal: preferences.dailyGoal,
        difficultyPreference: preferences.difficultyPreference,
        sections: preferences.sections,
      },
    };

    return NextResponse.json({
      success: true,
      progress: progressData,
    });
  } catch (error) {
    console.error("Error fetching progress:", error);

    // Return mock data instead of error for development
    const mockProgress = {
      userId: "dev-user",
      totalQuestions: 0,
      correctAnswers: 0,
      accuracy: 0,
      timeSpent: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastActivity: new Date().toISOString(),
      sectionProgress: [],
      weeklyProgress: [],
      monthlyProgress: [],
      currentPlan: null,
      achievements: {
        badges: [],
        totalPoints: 0,
        level: 1,
        experience: 0,
      },
      preferences: {
        theme: "system",
        language: "en",
        learningMode: null,
        dailyGoal: 10,
        difficultyPreference: "mixed",
        sections: ["HTML", "CSS", "JavaScript", "React"],
      },
    };

    return NextResponse.json({
      success: true,
      progress: mockProgress,
      warning: "Using development mode due to server error",
    });
  }
}
