import { NextRequest, NextResponse } from 'next/server';
import { db, surveys } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const result = await db.insert(surveys).values({
      email: body.email,
      name: body.name,
      experience: body.experience,
      currentTools: body.currentTools,
      primaryTool: body.primaryTool,
      satisfaction: body.satisfaction,
      features: body.features,
      challenges: body.challenges,
      recommendation: body.recommendation,
      futureInterest: body.futureInterest,
      additionalComments: body.additionalComments || null,
    }).returning();

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error('Error saving survey:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save survey' },
      { status: 500 }
    );
  }
}