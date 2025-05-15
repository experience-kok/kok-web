import { NextRequest, NextResponse } from 'next/server';

import { ProfileImageExtension } from 'services/image/image-types';

import { getAccessToken } from 'utils/server-side/get-access-token';
import { getRequestUrl } from 'utils/server-side/get-request-url';

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    fileExtension: ProfileImageExtension;
  };

  const accessToken = getAccessToken(request);
  const requestUrl = getRequestUrl('/images/presigned-url');
  console.log(body);

  const response = await fetch(requestUrl, {
    method: 'POST',
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
