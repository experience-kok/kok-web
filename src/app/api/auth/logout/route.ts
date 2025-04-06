import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const kokBaseUrl = process.env.NEXT_PUBLIC_KOK_BASE_URL;

    if (!kokBaseUrl) {
      return NextResponse.json({ error: 'Environment variables not set' }, { status: 500 });
    }

    // accessToken 쿠키에서 추출
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token not found' }, { status: 401 });
    }

    // accessToken을 Authorization 헤더에 포함해서 API 서버로 요청
    const response = await fetch(`${kokBaseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(`요청 보낸 URL: ${kokBaseUrl}/auth/logout`);
    console.log(`Authorization 헤더: Bearer ${accessToken}`);

    if (!response.ok) {
      throw new Error(`HTTP 에러! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('로그아웃 에러: ', error);
    return NextResponse.json({ error: '로그아웃 실패' }, { status: 500 });
  }
}
