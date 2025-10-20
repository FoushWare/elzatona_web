// API endpoint to clear all questions
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function DELETE(request: NextRequest) {
  try {
    console.log('🗑️  Starting to clear all question tables...');

    const tablesToClear = [
      'questions',
      'unified_questions',
      'enhanced_questions',
      'custom_questions',
    ];
    let totalDeleted = 0;

    for (const tableName of tablesToClear) {
      try {
        console.log(`📋 Fetching records from ${tableName}...`);

        // First, get count of records
        const { count } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true });

        console.log(`📊 Found ${count || 0} records in ${tableName}`);

        if (!count || count === 0) {
          console.log(`✅ ${tableName} is already empty`);
          continue;
        }

        console.log(`🗑️  Deleting ${count} records from ${tableName}...`);

        // Delete all records from the table
        const { error } = await supabase.from(tableName).delete().neq('id', 0); // This will delete all records

        if (error) {
          console.error(`❌ Error deleting from ${tableName}:`, error);
          continue;
        }

        console.log(`✅ Deleted ${count} records from ${tableName}`);
        totalDeleted += count;
      } catch (error) {
        console.error(`❌ Error clearing ${tableName}:`, error);
        // Continue with other tables even if one fails
      }
    }

    console.log(`🎉 CLEARING COMPLETE! Total records deleted: ${totalDeleted}`);

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${totalDeleted} questions from all tables`,
      totalDeleted,
    });
  } catch (error) {
    console.error('❌ Error clearing questions:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
