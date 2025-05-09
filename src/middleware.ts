import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 로그인 후에만 접근 가능한 페이지
const protectedPaths = ['/dashboard', '/profile', '/settings', '/mypage'];

// 비로그인 상태에서만 접근 가능한 페이지
const publicOnlyPaths = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = url;

  const accessToken = request.cookies.get('accessToken')?.value || '';
  const refreshToken = request.cookies.get('refreshToken')?.value || '';

  const isProtected = protectedPaths.some(path => pathname.startsWith(path));
  const isPublicOnly = publicOnlyPaths.some(path => pathname.startsWith(path));
  const isLoggedIn = !!refreshToken;

  // 1️⃣ 로그인되지 않은 사용자가 보호 경로에 접근 → 로그인 페이지로 리디렉션
  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2️⃣ 로그인된 사용자가 로그인/회원가입 페이지에 접근 → 메인 페이지로 리디렉션
  if (isLoggedIn && isPublicOnly) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 3️⃣ BFF 요청이면 accessToken을 Authorization 헤더로 추가
  if (pathname.startsWith('/bff') && accessToken) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('Authorization', `Bearer ${accessToken}`);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 4️⃣ 그 외는 그냥 통과
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico).*)'], // 정적 파일 제외
};
