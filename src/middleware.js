import { NextResponse } from 'next/server';
import { verifySession } from './lib/auth';

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // 1. Protect all /admin routes, except the login page
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const sessionCookie = request.cookies.get('adpulse_session')?.value;
    const session = await verifySession(sessionCookie);

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // 2. Protect all admin API routes, except the authentication endpoint
  if (path.startsWith('/api/admin') && path !== '/api/admin/auth') {
    const sessionCookie = request.cookies.get('adpulse_session')?.value;
    const session = await verifySession(sessionCookie);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
