import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import getQueryClient from 'configs/tanstack-query/get-query-client';

import { postPresignedUrl } from 'services/image/image-api';

import { userAtom } from 'stores/user-atoms';

import { User } from 'types/auth';

import { useMutation } from '@tanstack/react-query';

import { patchProfileImage, putProfile } from './users-api';
import { usersQueryKeys } from './users-query-key';

// localStorage 키 상수
const USER_STORAGE_KEY = 'user';

/**
 * 유저 정보 수정 뮤테이션
 */
export const usePutProfileMutation = () => {
  const queryClient = getQueryClient();
  const setUser = useSetAtom(userAtom);
  const router = useRouter();

  return useMutation({
    mutationFn: putProfile,
    onSuccess: ({ user }) => {
      // 이전 상태를 가져와서 새로운 상태 생성
      const prevUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || 'null');

      // user 객체를 직접 저장
      const newUser = {
        ...prevUser,
        profileImage: user.profileImage,
      } as User;

      // localStorage에 user 객체 직접 저장
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));

      // atom 상태도 user 객체로 직접 업데이트
      setUser(newUser);

      toast.info('프로필 정보가 변경되었어요.', {
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
      toast.error('프로필 정보 변경을 실패했어요.', {
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
  const setUser = useSetAtom(userAtom);

  return useMutation({
    mutationFn: patchProfileImage,
    onSuccess: ({ user }) => {
      // 이전 상태를 가져와서 새로운 상태 생성
      const prevUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || 'null');

      // user 객체를 직접 저장
      const newUser = {
        ...prevUser,
        profileImage: user.profileImage,
      } as User;

      // localStorage에 user 객체 직접 저장
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));

      // atom 상태도 user 객체로 직접 업데이트
      setUser(newUser);

      toast.info('프로필 이미지가 변경되었어요.', {
        position: 'top-center',
      });

      // 프로필 이미지 변경 완료시 유저 정보 리패칭
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.profile().queryKey,
      });
    },
    onError: () => {
      toast.error('프로필 이미지 변경을 실패했어요.', {
        position: 'top-center',
      });
    },
  });
};
