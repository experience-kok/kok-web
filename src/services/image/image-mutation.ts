import { useMutation } from '@tanstack/react-query';

import { postPresignedUrl } from './image-api';

/**
 * 업로드 이미지 생성 뮤테이션
 */
export const usePostPresignedUrlMutation = () => {
  return useMutation({
    mutationFn: postPresignedUrl,
  });
};
