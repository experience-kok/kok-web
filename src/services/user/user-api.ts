import clientFetcher from 'utils/client-side/client-fetcher';

/**
 * 유저 정보 조회
 */
export const getProfile = () => {
  const response = clientFetcher.get<null>(`/users/profile`);

  return response;
};
