import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('Middleware reached for:', pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next).*)'],
};
