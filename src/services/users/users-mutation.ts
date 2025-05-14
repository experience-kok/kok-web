import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import getQueryClient from 'configs/tanstack-query/get-query-client';

import { userAtom } from 'stores/user-atoms';

import { useMutation } from '@tanstack/react-query';

import { patchProfileImage, putProfile } from './users-api';
import { usersQueryKeys } from './users-query-key';

/**
 * 유저 정보 수정 뮤테이션
 */
export const usePutProfileMutation = () => {
  const queryClient = getQueryClient();
  const setUser = useSetAtom(userAtom);
  const router = useRouter();

  return useMutation({
    mutationFn: putProfile,
    onSuccess: userData => {
      setUser(userData);
      toast.info('프로필 정보가 변경되었어요', {
        position: 'top-center',
      });

      // 프로필 페이지로 이동
      router.push('/mypage');

      // 프로필 정보 변경 완료시 유저 정보 리패칭
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.profile().queryKey,
      });
    },
    onError: () => {
      toast.error('프로필 정보 변경을 실패했어요', {
        position: 'top-center',
      });
    },
  });
};

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
    onError: () => {
      toast.error('프로필 이미지 변경을 실패했어요', {
        position: 'top-center',
      });
    },
  });
};
