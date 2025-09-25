import { NextRequest, NextResponse } from 'next/server';
import { firestoreService } from '@/lib/firestore-service';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testing Firebase connection...');
    
    // Test getting learning plan templates
    const templates = await firestoreService.getLearningPlanTemplates();
    
    console.log('📊 Found templates:', templates.length);
    console.log('📋 Templates:', templates.map(t => ({ id: t.id, name: t.name })));
    
    return NextResponse.json({
      success: true,
      message: 'Firebase connection successful',
      templatesCount: templates.length,
      templates: templates.map(t => ({
        id: t.id,
        name: t.name,
        duration: t.duration,
        totalQuestions: t.totalQuestions
      }))
    });
  } catch (error) {
    console.error('❌ Firebase test error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Firebase connection failed'
    }, { status: 500 });
  }
}
