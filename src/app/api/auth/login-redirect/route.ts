import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, provider } = body;

    if (!code || !provider) {
      return Response.json({ error: 'Missing code or provider' }, { status: 400 });
    }

    // 환경 변수에서 base URL 가져오기
    const baseUrl = process.env.NEXT_PUBLIC_BFF_BASE_URL;
    const kokBaseUrl = process.env.NEXT_PUBLIC_KOK_BASE_URL;

    if (!baseUrl || !kokBaseUrl) {
      return Response.json({ error: 'Environment variables not set' }, { status: 500 });
    }

    const redirectUri = `${baseUrl}/login/oauth2/code/${provider}`;
    const requestUrl = `${kokBaseUrl}/auth/login-redirect`;

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        provider,
        redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
}
