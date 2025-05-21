'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { EditForm } from 'schemas/user-profile-edit-schema';

import { postPresignedUrlForProfileImage } from 'services/image/image-api';
import { ProfileImageExtension } from 'services/image/image-types';
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

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 이미지 변경 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!/\.(jpg|jpeg|png)$/i.test(file.name)) {
      alert('JPG 또는 PNG 파일만 업로드할 수 있어요.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setSelectedFile(file);
  };

  // 유저 정보 수정 요청
  const handleSubmit = async (formData: EditForm) => {
    if (!selectedFile) {
      // 이미지 변경이 없을 경우 기존 프로필 이미지 포함
      const finalData = {
        ...formData,
        profileImage: userData.user.profileImage,
      };
      userEditMutate(finalData);
      return;
    }

    const fileExtension = selectedFile.name.split('.').pop() as ProfileImageExtension;
    const { presignedUrl } = await postPresignedUrlForProfileImage(fileExtension);
    const imageUrl = presignedUrl.split('?')[0];

    try {
      // await new Promise(resolve => setTimeout(resolve, 10000));
      const response = await fetch(imageUrl, {
        method: 'PUT',
        body: selectedFile,
      });

      if (response.ok) {
        const finalData = {
          ...formData,
          profileImage: imageUrl,
        };
        userEditMutate(finalData);
        return;
      }
    } catch (error) {
      toast.error('프로필 이미지 변경을 실패했어요.', {
        position: 'top-center',
      });
    }
  };

  return (
    <>
      <ProfileAvatar
        preview={preview}
        onFileChange={handleFileChange}
        profileImage={userData.user.profileImage}
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
