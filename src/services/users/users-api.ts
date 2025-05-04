import clientFetcher from 'utils/client-side/client-fetcher';

import { GetProfileResponse, PatchProfileImageRequest } from './users-types';

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

/**
 * 프로필 이미지 수정
 * @param profileImage 변경할 이미지 주소
 */
export const patchProfileImage = ({ profileImage }: PatchProfileImageRequest) => {
  const response = clientFetcher.patch<null>(`/users/profile/image`, {
    profileImage,
  });

  return response;
};
