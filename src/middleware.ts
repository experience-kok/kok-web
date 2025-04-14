// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  if (accessToken) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('Authorization', `Bearer ${accessToken}`);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/bff/:path*'],
};
