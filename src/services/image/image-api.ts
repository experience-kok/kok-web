import clientFetcher from 'utils/client-side/client-fetcher';

import { PostPresignedUrlResponse, ProfileImageExtension } from './image-types';

/**
 * 이미지 업로드 URL 생성
 * @param fileExtension 파일 확장자
 */
export const postPresignedUrl = (fileExtension: ProfileImageExtension) => {
  const response = clientFetcher.post<PostPresignedUrlResponse>(`/images/presigned-url`, {
    fileExtension,
  });

  return response;
};
