'use client';

import { useState } from 'react';

import { useGetProfileQuery } from 'services/users/users-query';

import { EditForm } from 'types/auth';

import ProfileAvatar from './profile-avatar';
import ProfileForm from './profile-form';

/**
 * 실제 데이터 조회 및 상태 관리 담당 컨테이너
 */
export default function MyProfileEditContainer() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // 여기서 suspense 옵션을 사용
  const { data: userData } = useGetProfileQuery();

  const handleImageChange = (newImageUrl: string) => {
    setProfileImage(newImageUrl);
  };

  const handleSubmit = (formData: EditForm) => {
    const finalData = {
      ...formData,
      profileImage: profileImage ?? userData.user.profileImage,
    };
    console.log('전송 데이터:', finalData);
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
