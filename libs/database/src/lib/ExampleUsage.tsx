/* eslint-disable @typescript-eslint/no-explicit-any */
// Example Usage of Database Abstraction
// v1.0 - Demonstrates how to use the multi-database support
// This file uses 'any' types for example database operations

import React from "react";
import { DatabaseProvider, useDatabase } from "database";
import { DatabaseResult } from "./IDatabaseService";

// Example component using the database abstraction
export const ExampleComponent: React.FC = () => {
  const { database } = useDatabase();

  const handleCreateUser = async () => {
    try {
      const result: DatabaseResult<any> = await database.add("users", {
        email: "user@example.com",
        name: "John Doe",
        role: "user",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as any);

      if (result.error) {
        console.error("Error creating user:", result.error);
      } else {
        console.log("User created:", result.data);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleGetQuestions = async () => {
    try {
      const result = (await database.getAll("questions", {
        filters: { is_active: true },
      })) as unknown as DatabaseResult<any[]>;

      if (result.error) {
        console.error("Error fetching questions:", result.error);
      } else {
        console.log("Active questions:", result.data);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <div>
      <h1>Database Abstraction Example</h1>
      <button onClick={handleCreateUser}>Create User</button>
      <button onClick={handleGetQuestions}>Get Questions</button>
    </div>
  );
};

// App component with database provider
export const App: React.FC = () => {
  return (
    <DatabaseProvider>
      <ExampleComponent />
    </DatabaseProvider>
  );
};

// Example of switching databases via environment variables
export const DatabaseSwitcher: React.FC = () => {
  const { isFirebase, isSupabase } = useDatabase();

  return (
    <div>
      <h2>Current Database:</h2>
      <p>Firebase: {isFirebase ? "✅" : "❌"}</p>
      <p>Supabase: {isSupabase ? "✅" : "❌"}</p>
    </div>
  );
};

// Example of using the service factory
export const ServiceFactoryExample: React.FC = () => {
  const { database } = useDatabase();

  const handleBatchOperations = async () => {
    try {
      // Create multiple questions at once
      const questions = [
        {
          title: "Question 1",
          content: "What is React?",
          type: "multiple-choice",
          difficulty: "beginner",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          title: "Question 2",
          content: "What is TypeScript?",
          type: "open-ended",
          difficulty: "intermediate",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      // Add each question individually (batch operations would need to be implemented)
      for (const question of questions) {
        const result: DatabaseResult<any> = await database.add(
          "questions",
          question as any,
        );
        if (result.error) {
          console.error("Error creating question:", result.error);
        } else {
          console.log("Question created:", result.data);
        }
      }
    } catch (error) {
      console.error("Error in batch operations:", error);
    }
  };

  return (
    <div>
      <h2>Service Factory Example</h2>
      <button onClick={handleBatchOperations}>Batch Create Questions</button>
    </div>
  );
};
