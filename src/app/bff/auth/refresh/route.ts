import { NextResponse, type NextRequest } from 'next/server';

import { getAccessToken } from 'utils/server-side/get-access-token';
import { getRequestUrl } from 'utils/server-side/get-request-url';

export async function POST(request: NextRequest) {
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

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}
