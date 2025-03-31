import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // localhost:8080/oauth2/authorization/kakao
  const requestUrl = `${process.env.NEXT_PUBLIC_KOK_BASE_URL}/auth/login?${searchParams}`;

  const response = await fetch(requestUrl, {
    method: 'GET',
  });

  const data = await response.json();

  return Response.json(data);
}
