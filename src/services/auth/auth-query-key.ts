import { createQueryKeys } from '@lukemorales/query-key-factory';

// auth 쿼리키
export const authQueryKeys = createQueryKeys('auth', {
  // login url 받아오는건 굳이 쿼리로 관리할 필요가 있을까?
  // oauth: (provider: OAuthProvider) => ({
  //   queryKey: [provider],
  //   queryFn: () => getLoginUrl(provider),
  // }),
});
