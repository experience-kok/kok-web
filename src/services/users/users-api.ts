import clientFetcher from 'utils/client-side/client-fetcher';

import { GetProfileResponse } from './users-types';

/**
 * 유저 정보 조회
 */
export const getProfile = () => {
  const response = clientFetcher.get<GetProfileResponse>(`/users/profile`);

  return response;
};

/**
 * 유저 정보 수정
 */
export const putProfile = () => {
  const response = clientFetcher.put<null>(`/users/profile`, {});

  return response;
};
