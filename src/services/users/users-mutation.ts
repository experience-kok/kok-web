import { toast } from 'sonner';

import getQueryClient from 'configs/tanstack-query/get-query-client';

import { useMutation } from '@tanstack/react-query';

import { patchProfileImage } from './users-api';
import { usersQueryKeys } from './users-query-key';

/**
 * 유저 프로필 이미지 변경 뮤테이션
 */
export const usePatchProfileImageMutation = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: patchProfileImage,
    onSuccess: () => {
      toast.info('프로필 이미지가 변경되었어요', {
        position: 'top-center',
      });

      // 프로필 이미지 변경 완료시 유저 정보 리패칭
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.profile().queryKey,
      });
    },
  });
};
