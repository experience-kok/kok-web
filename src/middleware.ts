import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // API 요청에만 미들웨어 적용
  if (request.nextUrl.pathname.startsWith('/api/')) {
    console.log('미들웨어 적용');
    const accessToken = request.cookies.get('accessToken');

    // 인증이 필요한 API 요청에만 토큰 추가
    if (accessToken) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('Authorization', `Bearer ${accessToken.value}`);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
  }

  return NextResponse.next();
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: ['/api/:path*'],
};
