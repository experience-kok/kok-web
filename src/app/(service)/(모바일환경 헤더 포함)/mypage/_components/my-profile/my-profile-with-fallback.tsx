'use client';

import { ErrorBoundary, Suspense } from '@suspensive/react';

import MyProfile from './my-profile';
import MyProfileSkeleton from './my-profile-skeleton';

/**
 * 클라이언트 컴포넌트: 마이페이지 프로필 영역
 *
 * - React Query의 Suspense 기반 데이터 패칭을 활용
 * - 로딩 상태에서는 MyProfileSkeleton 컴포넌트를 보여줌
 * - 쿼리 에러 발생 시 ErrorBoundary가 캐치하고 fallback UI를 렌더링
 *
 * 이 컴포넌트는 서버 컴포넌트에서 안전하게 사용할 수 있도록 분리
 */
export default function MyProfileWithFallback() {
  return (
    <ErrorBoundary
      fallback={props => (
        <>
          <button onClick={props.reset}>Try again</button>
          {props.error.message}
        </>
      )}
    >
      <Suspense fallback={<MyProfileSkeleton />}>
        <MyProfile />
      </Suspense>
    </ErrorBoundary>
  );
}
