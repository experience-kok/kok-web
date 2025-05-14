'use client';

import { ReactNode } from 'react';
import { useState } from 'react';

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
import { Input } from 'components/ui/input';
import { Text } from 'components/ui/text';

import getQueryClient from 'configs/tanstack-query/get-query-client';

import { usePostPresignedUrlMutation } from 'services/image/image-mutation';
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

  const { mutate: handlePostPresignedUrlMutation } = usePostPresignedUrlMutation(selectedFile);

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

  return (
    <Dialog onOpenChange={handleCloseDialog}>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>프로필 이미지 업로드</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center">
          <Avatar className="mb-4 h-20 w-20">
            {preview ? (
              <AvatarImage src={preview} />
            ) : userData?.user?.profileImage ? (
              <AvatarImage src={userData?.user?.profileImage} />
            ) : null}
            <AvatarFallback>{userData?.user?.nickname ?? ''}</AvatarFallback>
          </Avatar>

          <div className="mb-2 grid w-full max-w-sm items-center gap-1.5">
            <Input
              onChange={handleFileChange}
              id="profileImage"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>
          <Text size={'sm'} color="red">
            JPG 또는 PNG 파일만 업로드할 수 있어요.
          </Text>
        </div>

        <DialogClose asChild>
          <Button onClick={handleSubmit} disabled={!selectedFile}>
            저장
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
