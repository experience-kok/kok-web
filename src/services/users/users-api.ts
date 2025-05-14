import clientFetcher from 'utils/client-side/client-fetcher';

import {
  GetProfileResponse,
  PatchProfileImageRequest,
  PatchProfileImageResponse,
  PutProfileRequest,
} from './users-types';

/**
 * 내 정보 조회
 */
export const getProfile = () => {
  const response = clientFetcher.get<GetProfileResponse>(`/users/profile`);

  return response;
};

/**
 * 내 정보 수정
 */
export const putProfile = (requestBody: PutProfileRequest) => {
  const response = clientFetcher.put<null>(`/users/profile`, {
    ...requestBody,
  });

  return response;
};

/**
 * 프로필 이미지 수정
 * @param profileImage 변경할 이미지 주소
 */
export const patchProfileImage = ({ profileImage }: PatchProfileImageRequest) => {
  const response = clientFetcher.patch<PatchProfileImageResponse>(`/users/profile/image`, {
    profileImage,
  });

  return response;
};
