'use client';

import { useState } from 'react';

import { EditForm } from 'schemas/user-profile-edit-schema';

import { usePutProfileMutation } from 'services/users/users-mutation';
import { useGetProfileQuery } from 'services/users/users-query';

import ProfileAvatar from './profile-avatar';
import ProfileForm from './profile-form';

/**
 * 실제 데이터 조회 및 상태 관리 담당 컨테이너
 */
export default function MyProfileEditContainer() {
  const { data: userData } = useGetProfileQuery();
  const { mutate: userEditMutate } = usePutProfileMutation();

  const [profileImage, setProfileImage] = useState<string | null>(null);

  // 이미지 변경 함수
  const handleImageChange = (newImageUrl: string) => {
    setProfileImage(newImageUrl);
  };

  // 요청
  const handleSubmit = (formData: EditForm) => {
    const finalData = {
      ...formData,
      profileImage: profileImage ?? userData.user.profileImage,
    };

    userEditMutate(finalData);
  };

  return (
    <>
      <ProfileAvatar
        profileImage={profileImage ?? userData.user.profileImage}
        fallbackText={userData.user.nickname}
        onImageChange={handleImageChange}
      />
      <ProfileForm
        defaultValues={{
          nickname: userData.user.nickname,
          phone: userData.user.phone ?? '',
          gender: userData.user.gender,
          age: userData.user.age ?? 0,
        }}
        onSubmit={handleSubmit}
      />
    </>
  );
}
