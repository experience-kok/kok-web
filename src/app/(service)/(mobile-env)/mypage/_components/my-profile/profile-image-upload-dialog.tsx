'use client';

import { ReactNode, useEffect } from 'react';
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
import { Label } from 'components/ui/label';
import { Text } from 'components/ui/text';

import getQueryClient from 'configs/tanstack-query/get-query-client';

import { usePatchProfileImageMutation } from 'services/users/users-mutation';
import { usersQueryKeys } from 'services/users/users-query-key';

import { User } from 'types/auth';

interface Props {
  children: ReactNode;
}

/**
 * 프로필 이미지 업로드 다이얼로그
 */
export default function ProfileImageUploadDialog({ children }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const queryClient = getQueryClient();
  const userData = queryClient.getQueryData(usersQueryKeys.profile().queryKey) as
    | { user: User }
    | undefined;

  // 이미지는 string

  const { mutate: handlePatchProfileImageMutation } = usePatchProfileImageMutation();

  const handlePatchProfileImage = () => {
    handlePatchProfileImageMutation({
      profileImage:
        'https://media.istockphoto.com/id/2186780921/ko/%EC%82%AC%EC%A7%84/%EC%A0%8A%EC%9D%80-%EC%97%AC%EC%84%B1-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EB%8A%94-%ED%98%84%EB%8C%80%EC%A0%81%EC%9D%B8-%EC%82%AC%EB%AC%B4%EC%8B%A4-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-%EB%93%80%EC%96%BC-%EB%AA%A8%EB%8B%88%ED%84%B0%EB%A1%9C-%EC%BD%94%EB%94%A9%ED%95%98%EB%A9%B4%EC%84%9C-%EC%9E%91%EC%97%85%EC%97%90-%EC%A7%91%EC%A4%91%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4.webp?a=1&b=1&s=612x612&w=0&k=20&c=HKsOvJJBq5Os0Wr8QsDGC-jkiTEvjQC6ywhm0Anfzjk=',
    });
  };

  // 이미지 변경 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // 확장자 검사
    if (!/\.(jpg|jpeg|png)$/i.test(file.name)) {
      alert('JPG 또는 PNG 파일만 업로드할 수 있어요.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  // 다이얼로그가 닫힐 때 실행될 함수
  const handleCloseDialog = (open: boolean) => {
    if (!open && preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
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
          <Button onClick={handlePatchProfileImage}>저장</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
