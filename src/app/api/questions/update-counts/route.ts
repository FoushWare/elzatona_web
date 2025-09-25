// v1.0 - Update Learning Path Question Counts API Route

import { NextRequest, NextResponse } from 'next/server';
import UnifiedQuestionService from '@/lib/unified-question-schema';

// POST /api/questions/update-counts - Update all learning path question counts
export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Starting question count update for all learning paths...');
    
    // Get all learning paths
    const learningPaths = await UnifiedQuestionService.getLearningPaths();
    console.log(`📊 Found ${learningPaths.length} learning paths`);

    const results = [];

    for (const path of learningPaths) {
      try {
        console.log(`📝 Processing ${path.name} (${path.id})...`);
        
        // Get question count for this learning path
        const questions = await UnifiedQuestionService.getQuestionsByLearningPath(path.id);
        const questionCount = questions.length;
        
        console.log(`  Found ${questionCount} questions`);
        
        // Update the learning path with the correct question count
        await UnifiedQuestionService.updateLearningPath(path.id, {
          questionCount: questionCount,
          updatedAt: new Date().toISOString(),
        });
        
        results.push({
          id: path.id,
          name: path.name,
          questionCount: questionCount,
          success: true
        });
        
        console.log(`  ✅ Updated ${path.name} with ${questionCount} questions`);
      } catch (error) {
        console.error(`  ❌ Error updating ${path.name}:`, error);
        results.push({
          id: path.id,
          name: path.name,
          questionCount: 0,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    console.log('✅ Question count update complete!');

    return NextResponse.json({
      success: true,
      message: 'Learning path question counts updated successfully',
      data: results,
      summary: {
        total: results.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length
      }
    });
  } catch (error) {
    console.error('❌ Error updating question counts:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update question counts',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
