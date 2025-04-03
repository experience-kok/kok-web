'use client';

import { PropsWithChildren } from 'react';

import getQueryClient from 'configs/tanstack-query/get-query-client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';

/**
 * tanstack-query provider 컴포넌트
 */
export default function QueryProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      {/* <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" /> */}
    </QueryClientProvider>
  );
}
