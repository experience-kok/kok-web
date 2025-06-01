import { NextRequest, NextResponse } from 'next/server';

import { PostCampaignRequest } from 'services/campaign/campaign-types';

import { getAccessToken } from 'utils/server-side/get-access-token';
import { getRequestUrl } from 'utils/server-side/get-request-url';

export async function POST(request: NextRequest) {
  const body = (await request.json()) as PostCampaignRequest;

  const accessToken = getAccessToken(request);
  const requestUrl = getRequestUrl('/campaigns');

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
