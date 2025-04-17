import { toast } from 'sonner';

import { ErrorResponse } from 'types/global';

import {
  Query,
  QueryCache,
  QueryClientConfig,
  defaultShouldDehydrateQuery,
} from '@tanstack/react-query';

const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 1,
      staleTime: 1000 * 3 * 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 0,
    },

    mutations: {
      networkMode: 'always',
    },

    dehydrate: {
      shouldDehydrateQuery: (query: Query) =>
        defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
    },
  },

  queryCache: new QueryCache({
    onError: error => {
      const err = error as unknown as ErrorResponse;

      // 인증 만료 -> 로그인 페이지로 이동 필요
      if (err.errorCode === 'UNAUTHORIZED') {
        toast.error('인증 시간 만료', {
          position: 'top-center',
        });

        return;
      }

      toast.error(error.message, {
        position: 'top-center',
      });
    },
  }),
};

export default queryClientOptions;
