import { useSuspenseQuery } from '@tanstack/react-query';

import { usersQueryKeys } from './users-query-key';

/**
 * 내 프로필 조회 쿼리
 */
export const useGetProfileQuery = () => {
  return useSuspenseQuery({
    ...usersQueryKeys.my(),
  });
};
