import { NextResponse, type NextRequest } from 'next/server';

import { PutProfileRequest } from 'services/users/users-types';

import { getAccessToken } from 'utils/server-side/get-access-token';
import { getRequestUrl } from 'utils/server-side/get-request-url';

// 내 정보 조회
export async function GET(request: NextRequest) {
  const accessToken = getAccessToken(request);
  const requestUrl = getRequestUrl('/users/profile');

  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  return NextResponse.json(data, {
    status: response.status,
  });
}

// 내 정보 수정
export async function PUT(request: NextRequest) {
  const body = (await request.json()) as PutProfileRequest;

  const accessToken = getAccessToken(request);
  const requestUrl = getRequestUrl('/users/profile');

  const response = await fetch(requestUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      ...body,
    }),
  });

  const data = await response.json();
  return NextResponse.json(data, {
    status: response.status,
  });
}
