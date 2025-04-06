import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    console.log('미들웨어 적용');

    const accessToken = request.cookies.get('accessToken');

    if (accessToken) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('Authorization', `Bearer ${accessToken.value}`);

      // 로그 찍기
      console.log('Authorization 헤더:', requestHeaders.get('Authorization'));

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } else {
      console.log('액세스 토큰 없음');
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
