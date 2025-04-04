'use client';

import { useEffect } from 'react';

import { useSetAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import LottieLoader from 'components/shared/lottie-loader';

import { accessTokenAtom, refreshTokenAtom, userAtom } from 'stores/user-atoms';

import { AuthResponse } from 'types/auth';
import { APIResponse } from 'types/global';

import LoadingLottie from 'public/lotties/loading.json';

/**
 * 카카오 로그인 콜백 페이지
 */
export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAccessToken = useSetAtom(accessTokenAtom);
  const setRefreshToken = useSetAtom(refreshTokenAtom);
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const provider = window.location.pathname.split('/').pop(); // 'kakao' 추출

      if (!code || !provider) {
        console.error('provider 또는 code값을 찾을 수 없습니다.');
        toast.error('로그인 정보를 찾을 수 없습니다.', {
          position: 'top-center',
          duration: 3000,
        });
        router.push('/login');
        return;
      }

      try {
        const response = await fetch(`/api/auth/${provider}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            authorizationCode: code,
            redirectUri: window.location.href.split('?')[0], // 현재 URL에서 쿼리 파라미터 제외
          }),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data: APIResponse<AuthResponse> = await response.json();

        // 유저 정보 설정
        setAccessToken(data.data.accessToken);
        setRefreshToken(data.data.refreshToken);
        setUser(data.data.user);

        // 쿠키 설정
        document.cookie = `accessToken=${data.data.accessToken}; path=/; max-age=3600; SameSite=Strict`;
        document.cookie = `refreshToken=${data.data.refreshToken}; path=/; max-age=604800; SameSite=Strict`;

        // 로그인 성공 후 메인 페이지로 리다이렉트
        router.push('/');

        // !TODO 로그인 성공 토스트 출력 시점이 네트워크에 따라 달라질 수 있음
        setTimeout(() => {
          toast.success(`${data.data.user.nickname}님, 환영합니다!`, {
            position: 'top-center',
            duration: 3000,
          });
        }, 1000);
      } catch (error) {
        console.error('Login error:', error);
        // 에러 발생 시 토스트
        toast.error('잠시 후 다시 시도해주세요.', {
          position: 'top-center',
          duration: 3000,
        });
        // 에러 발생 시 로그인 페이지로 리다이렉트
        router.push('/login');
      }
    };

    handleCallback();
  }, [router, searchParams, setUser, setAccessToken, setRefreshToken]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <LottieLoader animationData={LoadingLottie} className="h-48 w-48 md:h-60 md:w-60" />
        <h1 className="text-center text-2xl font-bold">로그인을 처리 중이에요...</h1>
        <p className="mt-2 text-center text-gray-600">잠시만 기다려주세요</p>
      </div>
    </div>
  );
}
