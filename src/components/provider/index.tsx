import React from 'react';

import QueryProvider from 'components/provider/query-provider';

import { JotaiProvider } from './jotai-provider';

/**
 * 프로젝트 내에 사용하는 모든 provider 들을 결합시키는 컴포넌트
 * @param children provider를 감싸줄 컴포넌트
 */
export default function Provider({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <QueryProvider>
        <JotaiProvider>{children}</JotaiProvider>
      </QueryProvider>
    </>
  );
}
