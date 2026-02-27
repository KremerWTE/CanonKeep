import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { search } from '@/lib/search';
import type { EntityType } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const types = searchParams.get('types');
    const projectId = searchParams.get('projectId');

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query parameter "q" is required' },
        { status: 400 }
      );
    }

    const entityTypes = types
      ? (types.split(',') as EntityType[])
      : undefined;

    const results = await search(prisma, query, {
      entityTypes,
      projectId: projectId || undefined,
    });

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    );
  }
}
