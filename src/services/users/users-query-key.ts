import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getProfile } from './users-api';

// users 쿼리키
export const usersQueryKeys = createQueryKeys('users', {
  my: () => ({
    queryKey: ['my'],
    queryFn: () => getProfile(),
  }),
});
