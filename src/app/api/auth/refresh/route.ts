import { NextRequest, NextResponse } from 'next/server';
import { verifyRefreshToken, generateAccessToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: 'Refresh token is required' },
        { status: 400 }
      );
    }

    // Verify refresh token
    const payload = await verifyRefreshToken(refreshToken);

    // Generate new access token
    const accessToken = await generateAccessToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    });

    return NextResponse.json({
      success: true,
      data: { accessToken },
      message: 'Token refreshed successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid or expired refresh token' },
      { status: 401 }
    );
  }
}
