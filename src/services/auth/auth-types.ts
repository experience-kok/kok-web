// OAuth 지원 타입
export type OAuthProvider = 'kakao';

// OAuth 로그인 URL 받아오기 응답값
export interface GetLoginUrlResponse {
  loginUrl: string;
  provider: OAuthProvider;
}

// 토큰 재발급 응답값
export interface PostRefreshResponse {
  accessToken: string;
  refreshToken: string;
}
