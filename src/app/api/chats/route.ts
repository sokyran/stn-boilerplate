import { NextResponse } from 'next/server';
import { getChatsList } from '@/lib/api/db';
import { withSessionHandler } from '@/modules/auth/server/with-session-handler';

export const dynamic = 'force-dynamic';

export const GET = withSessionHandler(async ({ currentUser }) => {
  try {
    const currentUserId = currentUser.id;

    const chats = await getChatsList(currentUserId);

    return NextResponse.json(chats);
  } catch (e) {
    return NextResponse.json({ error: e });
  }
});
