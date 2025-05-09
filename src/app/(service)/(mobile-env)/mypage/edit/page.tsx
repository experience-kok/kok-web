import { ErrorBoundary, Suspense } from '@suspensive/react';

import ErrorFallback from 'components/shared/error-fallback';

import MyProfileEditContainer from './_components/profile-edit-container';

/**
 * 내 정보 수정 페이지
 */
export default function MyProfileEditPage() {
  return (
    <>
      <ErrorBoundary fallback={ErrorFallback}>
        <Suspense clientOnly>
          <MyProfileEditContainer />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
