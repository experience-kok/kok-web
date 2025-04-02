'use client';

import { Button } from 'components/ui/button';
import { Text } from 'components/ui/text';

import KakaoIcon from 'public/icons/kakao.svg';

export default function KakaoLoginButton() {
  const handleKakaoLogin = () => {
    window.location.href = '/api/auth/login?provider=kakao';
  };

  return (
    <Button
      onClick={handleKakaoLogin}
      className="h-12 w-full rounded-lg bg-[#FEE500] text-black hover:bg-[#FEE500]/90"
      style={{ color: 'rgba(0, 0, 0, 0.85)' }}
    >
      <KakaoIcon width={24} height={24} fill="#000" />
      <Text weight="semibold">카카오로 로그인</Text>
    </Button>
  );
}
