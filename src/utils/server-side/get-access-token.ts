import type { NextRequest } from 'next/server';

/**
 * request 객체의 쿠키에서 accessToken 추출 함수
 * @param request next request 객체
 * @returns accessToken
 */
export const getAccessToken = (request: NextRequest) => {
  const accessToken = request.cookies.get('accessToken')?.value;

  return accessToken;
};
