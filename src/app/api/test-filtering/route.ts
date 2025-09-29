import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Testing filtering logic...');
    
    // Get all plans from the API
    const baseUrl = request.nextUrl.origin;
    const response = await fetch(`${baseUrl}/api/guided-learning/plans`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch plans');
    }
    
    const allPlans = data.plans;
    console.log('📊 Total plans from API:', allPlans.length);
    
    // Apply the same filtering logic as the guided learning page
    const dayBasedPlanIds = [
      '1-day-plan',
      '2-day-plan',
      '3-day-plan',
      '4-day-plan',
      '5-day-plan',
      '6-day-plan',
      '7-day-plan',
    ];
    
    const dayBasedPlans = allPlans.filter(plan => 
      dayBasedPlanIds.includes(plan.id)
    );
    
    const otherPlans = allPlans.filter(plan => 
      !dayBasedPlanIds.includes(plan.id)
    );
    
    console.log('✅ Filtering results:', {
      total: allPlans.length,
      dayBased: dayBasedPlans.length,
      other: otherPlans.length
    });
    
    return NextResponse.json({
      success: true,
      data: {
        totalPlans: allPlans.length,
        dayBasedPlans: dayBasedPlans.length,
        otherPlans: otherPlans.length,
        dayBasedPlanIds: dayBasedPlans.map(p => p.id),
        otherPlanIds: otherPlans.map(p => p.id),
        allPlanIds: allPlans.map(p => p.id),
        filtering: {
          logic: 'Filter plans where id is in [1-day-plan, 2-day-plan, 3-day-plan, 4-day-plan, 5-day-plan, 6-day-plan, 7-day-plan]',
          working: dayBasedPlans.length === 7 && otherPlans.length === allPlans.length - 7
        }
      }
    });
  } catch (error: any) {
    console.error('❌ Error in test-filtering API:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to test filtering',
      },
      { status: 500 }
    );
  }
}
