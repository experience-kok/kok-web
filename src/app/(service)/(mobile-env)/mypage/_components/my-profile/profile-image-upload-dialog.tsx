import { ReactNode } from 'react';

import { Button } from 'components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog';

import { usePatchProfileImageMutation } from 'services/users/users-mutation';

interface Props {
  children: ReactNode;
}

/**
 * 프로필 이미지 업로드 다이얼로그
 */
export default function ProfileImageUploadDialog({ children }: Props) {
  const { mutate: handlePatchProfileImageMutation } = usePatchProfileImageMutation();

  const handlePatchProfileImage = () => {
    handlePatchProfileImageMutation({
      profileImage:
        'https://images.unsplash.com/photo-1726057403600-725ebb4a20b6?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    });
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>프로필 이미지 업로드</DialogTitle>
        </DialogHeader>
        이미지 업로드 테스트
        <DialogClose asChild>
          <Button onClick={handlePatchProfileImage}>저장</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
