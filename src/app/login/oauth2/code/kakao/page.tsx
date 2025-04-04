'use client';

import { useEffect } from 'react';

import { useSetAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { accessTokenAtom, refreshTokenAtom, userAtom } from 'stores/user-atoms';

import { AuthResponse } from 'types/auth';

import clientFetcher from 'utils/client-side/client-fetcher';

import LoadingLottie from 'public/lotties/loading.json';

const LottieLoader = dynamic(() => import('components/shared/lottie-loader'), {
  ssr: false,
});

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
        toast.error('로그인 정보를 찾을 수 없습니다.', {
          position: 'top-center',
          duration: 3000,
        });
        router.push('/login');
        return;
      }

      const redirectUri = `${process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URI}/kakao`;

      const res = await clientFetcher.post<AuthResponse>(`/api/auth/${provider}`, {
        authorizationCode: code,
        redirectUri,
      });

      if (!res.success) {
        console.error(`[${res.errorCode}] ${res.message}`);
        toast.error(res.message || '잠시 후 다시 시도해주세요.', {
          position: 'top-center',
          duration: 3000,
        });
        router.push('/login');
        return;
      }

      const { accessToken, refreshToken, user, loginType } = res.data;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);

      // 쿠키 설정
      document.cookie = `accessToken=${accessToken}; path=/; max-age=3600; SameSite=Strict`;
      document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800; SameSite=Strict`;

      if (loginType === 'login') {
        router.push('/');

        setTimeout(() => {
          toast.success(`${user.nickname}님, 환영합니다!`, {
            position: 'top-center',
            duration: 3000,
          });
        }, 1000);
      } else if (loginType === 'registration') {
        router.push('/welcome');
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
