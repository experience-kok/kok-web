'use client';

import { Button } from 'components/ui/button';

import { postRefresh } from 'services/auth/auth-api';

export default function TestPage() {
  const handleRefresh = async () => {
    const response = await postRefresh();
  };
  return (
    <>
      <Button onClick={handleRefresh}>토큰 재발급 요청</Button>
    </>
  );
}
