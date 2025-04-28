import clientFetcher from 'utils/client-side/client-fetcher';

import { GetProfileResponse } from './users-types';

/**
 * 유저 정보 조회
 */
export const getProfile = () => {
  const response = clientFetcher.get<GetProfileResponse>(`/users/profile`);

  return response;
};
