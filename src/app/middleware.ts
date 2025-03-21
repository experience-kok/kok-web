import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 특정 경로만 허용
  if (!pathname.startsWith('/api/user')) {
    return NextResponse.next(); // 요청을 그대로 통과시킴
  }

  console.log('Middleware reached for:', pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next).*)'],
};
