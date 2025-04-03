import type { NextRequest } from 'next/server';

/**
 * 인가코드 백엔드로 전달
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { authorizationCode, redirectUri } = body;

    if (!authorizationCode || !redirectUri) {
      return Response.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // 환경 변수에서 base URL 가져오기
    const kokBaseUrl = process.env.NEXT_PUBLIC_KOK_BASE_URL;

    if (!kokBaseUrl) {
      return Response.json({ error: 'Environment variables not set' }, { status: 500 });
    }

    const response = await fetch(`${kokBaseUrl}/auth/kakao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authorizationCode,
        redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Kakao login error:', error);
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
}
