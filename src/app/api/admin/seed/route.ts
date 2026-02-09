import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

/**
 * POST /api/admin/seed - Create initial admin user
 * This endpoint should only be called once during setup
 * Default username: JabesNelma
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, seedKey } = body;

    // Verify seed key (simple security measure)
    const expectedSeedKey = process.env.SEED_KEY || 'admin-setup-key';

    if (seedKey !== expectedSeedKey) {
      return NextResponse.json(
        { success: false, message: 'Invalid seed key' },
        { status: 403 }
      );
    }

    // Use default username "JabesNelma" if not provided
    const finalUsername = username || 'JabesNelma';

    if (!finalUsername || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { username: finalUsername },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create admin user
    const user = await db.user.create({
      data: {
        username: finalUsername,
        passwordHash,
        role: 'admin',
        isActive: true,
      },
    });

    // Create default categories
    const categories = await Promise.all([
      db.category.create({
        data: {
          name: 'General',
          description: 'General data entries',
        },
      }),
      db.category.create({
        data: {
          name: 'Documentation',
          description: 'Documentation and guides',
        },
      }),
      db.category.create({
        data: {
          name: 'API',
          description: 'API-related data',
        },
      }),
    ]);

    // Create default data types
    const types = await Promise.all([
      db.dataType.create({
        data: {
          name: 'JSON',
          description: 'JSON formatted data',
        },
      }),
      db.dataType.create({
        data: {
          name: 'Text',
          description: 'Plain text data',
        },
      }),
      db.dataType.create({
        data: {
          name: 'Structured',
          description: 'Structured data with multiple fields',
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        categories,
        types,
      },
      message: 'Admin user and default data seeded successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
