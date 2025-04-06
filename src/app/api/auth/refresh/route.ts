import { NextResponse, type NextRequest } from 'next/server';

import { getAccessToken } from 'utils/server-side/get-access-token';
import { getRequestUrl } from 'utils/server-side/get-request-url';

export async function POST(request: NextRequest) {
  try {
    const accessToken = getAccessToken(request);
    const requestUrl = getRequestUrl('/auth/refresh');
    const { refreshToken } = await request.json();

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error(`HTTP 에러! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('토큰 갱신 에러: ', error);
    return NextResponse.json({ error: '토큰 갱신 실패' }, { status: 500 });
  }
}
