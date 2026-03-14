import { cookies } from 'next/headers';

const SESSION_COOKIE = 'admin_session';

export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return !!session?.value;
}
