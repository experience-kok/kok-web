import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 환경 변수에서 base URL 가져오기
    const kokBaseUrl = process.env.NEXT_PUBLIC_KOK_BASE_URL;

    if (!kokBaseUrl) {
      return Response.json({ error: 'Environment variables not set' }, { status: 500 });
    }

    const response = await fetch(`${kokBaseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP 에러! status: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('로그아웃 에러: ', error);
    return Response.json({ error: '로그아웃 실패' }, { status: 500 });
  }
}
