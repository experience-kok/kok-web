'use client';

import { ReactNode } from 'react';
import { useState } from 'react';

import { Camera } from 'lucide-react';
import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { Button } from 'components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog';
import { Text } from 'components/ui/text';

import getQueryClient from 'configs/tanstack-query/get-query-client';

import { usePatchProfileImageWithPresignedUrlMutation } from 'services/image/image-mutation';
import { ProfileImageExtension } from 'services/image/image-types';
import { usersQueryKeys } from 'services/users/users-query-key';

import { User } from 'types/auth';

interface Props {
  children: ReactNode;
}

/**
 * 프로필 이미지 업로드 다이얼로그
 */
export default function ProfileImageUploadDialog({ children }: Props) {
  const queryClient = getQueryClient();

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const userData = queryClient.getQueryData(usersQueryKeys.profile().queryKey) as
    | { user: User }
    | undefined;

  const { mutate: handlePostPresignedUrlMutation } =
    usePatchProfileImageWithPresignedUrlMutation(selectedFile);

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

  // 다이얼로그가 닫힐 때 실행될 함수
  const handleCloseDialog = (open: boolean) => {
    if (!open && preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      return;
    }

    // 파일 확장자
    const fileExtension = selectedFile.name.split('.').pop() as ProfileImageExtension;
    handlePostPresignedUrlMutation(fileExtension);
  };

  const handleAvatarClick = () => {
    // input 요소를 클릭하여 파일 선택 다이얼로그 열기
    const fileInput = document.getElementById('profile-image-input');
    fileInput?.click();
  };

  return (
    <Dialog onOpenChange={handleCloseDialog}>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>프로필 이미지 업로드</DialogTitle>
        </DialogHeader>

        <section className="flex flex-col items-center justify-center">
          <div className="group relative">
            <div className="relative cursor-pointer" onClick={handleAvatarClick}>
              <Avatar className="h-20 w-20">
                {preview ? (
                  <AvatarImage asChild src={preview}>
                    <Image src={preview} width={70} height={70} alt="프로필 이미지" />
                  </AvatarImage>
                ) : userData?.user?.profileImage ? (
                  <AvatarImage asChild src={userData.user.profileImage}>
                    <Image
                      src={userData.user.profileImage}
                      width={70}
                      height={70}
                      alt="프로필 이미지"
                    />
                  </AvatarImage>
                ) : null}
                <AvatarFallback>체험콕</AvatarFallback>
              </Avatar>

              {/* 어두운 오버레이 */}
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />

              {/* 카메라 아이콘 */}
              <div className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border border-white bg-white">
                <Camera size={20} className="fill-muted-foreground text-white" />
              </div>
            </div>

            {/* 숨겨진 파일 입력 */}
            <input
              id="profile-image-input"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <Text size={'sm'} color="red" className="mt-2">
            JPG 또는 PNG 파일만 업로드할 수 있어요.
          </Text>
        </section>

        <DialogClose asChild>
          <Button onClick={handleSubmit} disabled={!selectedFile}>
            저장
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
