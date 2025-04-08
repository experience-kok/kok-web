/**
 * 서버사이드에서 요청할 api 서버 주소 생성 함수
 * @param 요청 세그먼트
 * @returns requestUrl
 */
export const getRequestUrl = (segment: string) => {
  const kokBaseUrl = process.env.NEXT_PUBLIC_KOK_BASE_URL;

  const requestUrl = `${kokBaseUrl}${segment}`;

  return requestUrl;
};
