import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET /api/categories - Get all categories (public read access)
 */
export async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        _count: {
          select: { dataEntries: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: categories,
      message: 'Categories retrieved successfully',
    });
  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
