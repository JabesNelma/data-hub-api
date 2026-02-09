import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, extractTokenFromHeader } from './auth';
import { db } from './db';

export interface AuthenticatedUser {
  userId: string;
  email: string;
  role: string;
}

/**
 * Middleware to authenticate API requests
 */
export async function authenticateRequest(
  request: NextRequest
): Promise<AuthenticatedUser | NextResponse> {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify token
    const payload = await verifyAccessToken(token);

    return payload;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid or expired token' },
      { status: 401 }
    );
  }
}

/**
 * Middleware to verify admin role
 */
export async function requireAdmin(
  request: NextRequest
): Promise<AuthenticatedUser | NextResponse> {
  const authResult = await authenticateRequest(request);

  if (authResult instanceof NextResponse) {
    return authResult;
  }

  if (authResult.role !== 'admin') {
    return NextResponse.json(
      { success: false, message: 'Admin access required' },
      { status: 403 }
    );
  }

  // Verify user exists and is active
  const user = await db.user.findUnique({
    where: { id: authResult.userId },
  });

  if (!user || !user.isActive) {
    return NextResponse.json(
      { success: false, message: 'User account is not active' },
      { status: 403 }
    );
  }

  return authResult;
}
