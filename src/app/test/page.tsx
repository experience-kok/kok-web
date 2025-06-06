'use client';

import { Button } from 'components/ui/button';

import { cookieManager } from 'libs/cookie-manager';

import { postLogout, postRefresh } from 'services/auth/auth-api';

export default function TestPage() {
  // 토큰 재발급
  const handleRefresh = async () => {
    try {
      const response = await postRefresh();

      cookieManager.set('accessToken', response.accessToken);
      cookieManager.set('refreshToken', response.refreshToken);

      return true;
    } catch {
      return false;
    }
  };

  // 로그아웃
  const handleLogout = async () => {
    const response = await postLogout();
  };

  return (
    <>
      <h1>auth 관련 테스트</h1>
      <Button onClick={handleRefresh}>토큰 재발급 요청</Button>
      <Button onClick={handleLogout}>로그아웃 요청</Button>
    </>
  );
}
