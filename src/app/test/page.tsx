'use client';

import { Button } from 'components/ui/button';

import { postLogout, postRefresh } from 'services/auth/auth-api';

export default function TestPage() {
  const handleRefresh = async () => {
    const response = await postRefresh();
  };

  const handleLogout = async () => {
    const response = await postLogout();
  };
  return (
    <>
      <Button onClick={handleRefresh}>토큰 재발급 요청</Button>
      <Button onClick={handleLogout}>로그아웃 요청</Button>
    </>
  );
}
