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
      retry: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
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
      // const err = error as ErrorResponse;
      console.log(error);

      toast.error(error.message, {
        position: 'top-center',
      });
    },
  }),
};

export default queryClientOptions;
