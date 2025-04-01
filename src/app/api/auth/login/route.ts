// app/api/auth/login/route.ts
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const provider = searchParams.get('provider');

  if (!provider) {
    return new Response(JSON.stringify({ status: 400, message: 'Missing provider' }), {
      status: 400,
    });
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_KOK_BASE_URL}/api/auth/login?provider=${provider}`;

  const res = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const error = await res.json();
    return new Response(JSON.stringify(error), { status: res.status });
  }

  const result = await res.json();
  const loginUrl = result?.data?.loginUrl;

  if (!loginUrl) {
    return new Response(JSON.stringify({ status: 500, message: 'No loginUrl received' }), {
      status: 500,
    });
  }

  // 로그인 URL로 바로 리다이렉트
  return Response.redirect(loginUrl, 302);
}
