import { NextResponse } from 'next/server';
import { createCategory, getCategoriesList } from '@/lib/api/db';
import { withSessionHandler } from '@/modules/auth/server/with-session-handler';

export const dynamic = 'force-dynamic';

export const POST = withSessionHandler(async ({ req, currentUser }) => {
  try {
    const body = await req.json();

    const userId = currentUser.id;

    const category = await createCategory(
      {
        name: body?.name ?? 'Undefined',
        color: body?.color ?? '#3F51B5',
      },
      userId,
    );

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error });
  }
});

export const GET = withSessionHandler(async ({ currentUser }) => {
  try {
    const userId = currentUser.id;

    const categories = await getCategoriesList(userId);

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error });
  }
});
