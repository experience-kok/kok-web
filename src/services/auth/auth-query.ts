import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';

import { cookieManager } from 'libs/cookie-manager';

import { accessTokenAtom, refreshTokenAtom, userAtom } from 'stores/user-atoms';

import { useMutation } from '@tanstack/react-query';

import { postLogout } from './auth-api';

/**
 * 로그아웃 뮤테이션
 */
export const useLogoutMutation = () => {
  const router = useRouter();

  // jotai atom reset을 위한 setter
  const setAccessToken = useSetAtom(accessTokenAtom);
  const setRefreshToken = useSetAtom(refreshTokenAtom);
  const setUser = useSetAtom(userAtom);

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      // 1. jotai 상태 초기화
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);

      // 2. 쿠키 제거
      cookieManager.delete('accessToken');
      cookieManager.delete('refreshToken');

      // 3. 로컬스토리지 제거
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // 4. 메인 페이지로 라우팅
      router.push('/');
    },
  });
};
