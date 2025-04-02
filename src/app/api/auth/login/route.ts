import { NextRequest } from 'next/server';

/**
 * 로그인 URL 받아와서 redirect
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const provider = searchParams.get('provider');

  if (!provider) {
    return new Response(JSON.stringify({ status: 400, message: 'Missing provider' }), {
      status: 400,
    });
  }

  const requestUrl = `${process.env.NEXT_PUBLIC_KOK_BASE_URL}/auth/login?provider=${provider}`;

  try {
    const res = await fetch(requestUrl, {
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

    // loginUrl로 리다이렉트
    console.log('direct test', loginUrl);
    return Response.redirect(loginUrl, 302);
  } catch (error) {
    console.error('Login redirect failed:', error);
    return new Response(JSON.stringify({ status: 500, message: 'Internal server error' }), {
      status: 500,
    });
  }
}
