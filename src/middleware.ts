import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 로그인 상태에서 접근 가능한 페이지
const protectedPaths = [
  '/dashboard',
  '/profile',
  '/settings',
  '/mypage',
  '/bff', // BFF도 보호 경로에 포함됨
];

// 비로그인 상태에서 접근 가능한 페이지
const publicPaths = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = url;

  const accessToken = request.cookies.get('accessToken')?.value || '';
  const refreshToken = request.cookies.get('refreshToken')?.value || '';

  const isProtected = protectedPaths.some(path => pathname.startsWith(path));
  const isPublicOnly = publicPaths.some(path => pathname.startsWith(path));

  console.log('토큰 상태', accessToken, refreshToken);
  console.log('유저 상태', isProtected, isPublicOnly);

  // // 1. 로그인 안 된 사용자
  // if (!refreshToken || !accessToken) {
  //   // 보호된 페이지에 접근시 (토큰이 필요한 페이지)
  //   if (isProtected) {
  //     const loginUrl = new URL('/login', request.url);
  //     return NextResponse.redirect(loginUrl);
  //   }
  // }

  // // ✅ 2. 로그인된 사용자가 로그인/회원가입 페이지 접근 → 메인으로 리디렉션
  // if (refreshToken && isPublicOnly) {
  //   console.log('2번');
  //   const homeUrl = new URL('/', request.url);
  //   return NextResponse.redirect(homeUrl);
  // }

  // ✅ 3. BFF API 요청에는 accessToken을 Authorization 헤더로 주입
  if (pathname.startsWith('/bff') && accessToken) {
    console.log('3번');
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('Authorization', `Bearer ${accessToken}`);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  console.log('4번');
  return NextResponse.next();
}

export const config = {
  // matcher: ['/bff/:path*'],
  matcher: ['/((?!_next|static|favicon.ico).*)'],
};
