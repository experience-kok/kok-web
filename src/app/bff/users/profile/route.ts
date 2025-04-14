import { NextResponse, type NextRequest } from 'next/server';

import { getAccessToken } from 'utils/server-side/get-access-token';
import { getRequestUrl } from 'utils/server-side/get-request-url';

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
