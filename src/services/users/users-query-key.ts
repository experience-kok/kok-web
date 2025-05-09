import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getProfile } from './users-api';

// users 쿼리키
export const usersQueryKeys = createQueryKeys('users', {
  profile: () => ({
    queryKey: ['my'],
    queryFn: () => getProfile(),
  }),
});
