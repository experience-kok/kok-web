import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getAccessToken } from 'utils/server-side/get-access-token';
import { getRequestUrl } from 'utils/server-side/get-request-url';

export async function POST(request: NextRequest) {
  try {
    const accessToken = getAccessToken(request);
    const requestUrl = getRequestUrl('/auth/logout');

    // accessToken을 Authorization 헤더에 포함해서 API 서버로 요청
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

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
