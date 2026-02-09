import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/api-auth';

/**
 * GET /api/data - Get all data entries (public read access)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const typeId = searchParams.get('typeId');

    // Build query with filters
    const where: any = {};
    if (categoryId) where.categoryId = categoryId;
    if (typeId) where.typeId = typeId;

    // Fetch data entries with relations
    const dataEntries = await db.dataEntry.findMany({
      where,
      include: {
        category: true,
        type: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Parse JSON content
    const entries = dataEntries.map((entry) => ({
      ...entry,
      content: JSON.parse(entry.content),
    }));

    return NextResponse.json({
      success: true,
      data: entries,
      message: 'Data entries retrieved successfully',
    });
  } catch (error) {
    console.error('Get data entries error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/data - Create new data entry (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate and require admin
    const authResult = await requireAdmin(request);

    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const body = await request.json();
    const { categoryId, typeId, title, content, source } = body;

    // Validate required fields
    if (!categoryId || !typeId || !title || !content) {
      return NextResponse.json(
        { success: false, message: 'categoryId, typeId, title, and content are required' },
        { status: 400 }
      );
    }

    // Validate JSON content
    let parsedContent;
    try {
      parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON content' },
        { status: 400 }
      );
    }

    // Verify category exists
    const category = await db.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }

    // Verify type exists
    const type = await db.dataType.findUnique({
      where: { id: typeId },
    });

    if (!type) {
      return NextResponse.json(
        { success: false, message: 'Data type not found' },
        { status: 404 }
      );
    }

    // Create data entry
    const dataEntry = await db.dataEntry.create({
      data: {
        categoryId,
        typeId,
        title,
        content: JSON.stringify(parsedContent),
        source,
      },
      include: {
        category: true,
        type: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        ...dataEntry,
        content: parsedContent,
      },
      message: 'Data entry created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Create data entry error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
