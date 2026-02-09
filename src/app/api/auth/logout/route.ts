import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // In a production environment, you might want to:
    // 1. Invalidate the token in a blacklist/redis
    // 2. Store the token in a "revoked tokens" list
    // For simplicity, we'll just return success
    // Client should delete tokens from storage

    return NextResponse.json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
