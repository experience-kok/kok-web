import { NextRequest, NextResponse } from 'next/server';

import { getAccessToken } from 'utils/server-side/get-access-token';
import { getRequestUrl } from 'utils/server-side/get-request-url';

// 프로필 이미지 수정
export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { profileImage } = body;

  const accessToken = getAccessToken(request);
  const requestUrl = getRequestUrl('/users/profile/image');

  const response = await fetch(requestUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      profileImage,
    }),
  });

  const data = await response.json();
  return NextResponse.json(data, {
    status: response.status,
  });
}
