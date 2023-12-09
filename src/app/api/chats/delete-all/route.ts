import { NextResponse } from 'next/server';
import { deleteChats } from '@/lib/api/db';
import { withSessionHandler } from '@/modules/auth/server/with-session-handler';

export const POST = withSessionHandler(async ({ currentUser }) => {
  try {
    const currentUserId = currentUser.id;

    await deleteChats(currentUserId);

    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
});
