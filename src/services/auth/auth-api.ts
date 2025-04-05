import clientFetcher from 'utils/client-side/client-fetcher';

import { GetLoginUrlResponse, OAuthProvider } from './auth-types';

/**
 * OAuth 로그인 URL 받아오기
 * @param provider 소셜 로그인 제공자
 */
export const getLoginUrl = (provider: OAuthProvider) => {
  const query = new URLSearchParams(provider).toString();

  const response = clientFetcher.get<GetLoginUrlResponse>(`/api/auth/login?${query}`);
  return response;
};

/**
 * 로그아웃
 */
export const postLogout = () => {
  const response = clientFetcher.post<null>(`/api/auth/logout`);
  return response;
};
