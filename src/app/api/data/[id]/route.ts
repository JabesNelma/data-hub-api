import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/api-auth';

/**
 * GET /api/data/:id - Get data entry by ID (public read access)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const dataEntry = await db.dataEntry.findUnique({
      where: { id },
      include: {
        category: true,
        type: true,
      },
    });

    if (!dataEntry) {
      return NextResponse.json(
        { success: false, message: 'Data entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...dataEntry,
        content: JSON.parse(dataEntry.content),
      },
      message: 'Data entry retrieved successfully',
    });
  } catch (error) {
    console.error('Get data entry error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/data/:id - Update data entry (admin only)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate and require admin
    const authResult = await requireAdmin(request);

    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { id } = await params;
    const body = await request.json();
    const { categoryId, typeId, title, content, source } = body;

    // Check if data entry exists
    const existingEntry = await db.dataEntry.findUnique({
      where: { id },
    });

    if (!existingEntry) {
      return NextResponse.json(
        { success: false, message: 'Data entry not found' },
        { status: 404 }
      );
    }

    // Validate category if provided
    if (categoryId) {
      const category = await db.category.findUnique({
        where: { id: categoryId },
      });
      if (!category) {
        return NextResponse.json(
          { success: false, message: 'Category not found' },
          { status: 404 }
        );
      }
    }

    // Validate type if provided
    if (typeId) {
      const type = await db.dataType.findUnique({
        where: { id: typeId },
      });
      if (!type) {
        return NextResponse.json(
          { success: false, message: 'Data type not found' },
          { status: 404 }
        );
      }
    }

    // Validate JSON content if provided
    let parsedContent;
    if (content) {
      try {
        parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
      } catch (error) {
        return NextResponse.json(
          { success: false, message: 'Invalid JSON content' },
          { status: 400 }
        );
      }
    }

    // Update data entry
    const dataEntry = await db.dataEntry.update({
      where: { id },
      data: {
        ...(categoryId && { categoryId }),
        ...(typeId && { typeId }),
        ...(title && { title }),
        ...(content && { content: JSON.stringify(parsedContent) }),
        ...(source !== undefined && { source }),
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
        content: JSON.parse(dataEntry.content),
      },
      message: 'Data entry updated successfully',
    });
  } catch (error) {
    console.error('Update data entry error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/data/:id - Delete data entry (admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate and require admin
    const authResult = await requireAdmin(request);

    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { id } = await params;

    // Check if data entry exists
    const existingEntry = await db.dataEntry.findUnique({
      where: { id },
    });

    if (!existingEntry) {
      return NextResponse.json(
        { success: false, message: 'Data entry not found' },
        { status: 404 }
      );
    }

    // Delete data entry
    await db.dataEntry.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Data entry deleted successfully',
    });
  } catch (error) {
    console.error('Delete data entry error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
