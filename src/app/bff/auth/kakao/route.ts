import type { NextRequest } from 'next/server';

/**
 * 인가코드 백엔드로 전달
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { authorizationCode, redirectUri } = body;

  // 환경 변수에서 base URL 가져오기
  const kokBaseUrl = process.env.NEXT_PUBLIC_KOK_BASE_URL;
  console.log(kokBaseUrl);

  const response = await fetch(`${kokBaseUrl}/auth/kakao`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authorizationCode,
      redirectUri,
    }),
  });

  const data = await response.json();
  return Response.json(data);
}
