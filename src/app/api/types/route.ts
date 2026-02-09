import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET /api/types - Get all data types (public read access)
 */
export async function GET() {
  try {
    const types = await db.dataType.findMany({
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
      data: types,
      message: 'Data types retrieved successfully',
    });
  } catch (error) {
    console.error('Get types error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
