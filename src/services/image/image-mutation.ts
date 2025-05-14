import { toast } from 'sonner';

import { usePatchProfileImageMutation } from 'services/users/users-mutation';

import { useMutation } from '@tanstack/react-query';

import { postPresignedUrl } from './image-api';

/**
 * 업로드 이미지 생성 뮤테이션
 */
export const usePostPresignedUrlMutation = (profileImageFile: File | null) => {
  const { mutate: handlePatchProfileImage } = usePatchProfileImageMutation();

  return useMutation({
    mutationFn: postPresignedUrl,
    onSuccess: async ({ presignedUrl }) => {
      const imageUrl = presignedUrl.split('?')[0];

      // presigned-url에 이미지 업로드 요청
      try {
        // await new Promise(resolve => setTimeout(resolve, 10000));
        const response = await fetch(imageUrl, {
          method: 'PUT',
          body: profileImageFile,
        });

        if (response.ok) {
          handlePatchProfileImage({
            profileImage: imageUrl,
          });
        }
      } catch (error) {
        toast.error('프로필 이미지 변경을 실패했어요', {
          position: 'top-center',
        });
      }
    },
  });
};
