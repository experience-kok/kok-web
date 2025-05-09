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
        'https://media.istockphoto.com/id/2186780921/ko/%EC%82%AC%EC%A7%84/%EC%A0%8A%EC%9D%80-%EC%97%AC%EC%84%B1-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EB%8A%94-%ED%98%84%EB%8C%80%EC%A0%81%EC%9D%B8-%EC%82%AC%EB%AC%B4%EC%8B%A4-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-%EB%93%80%EC%96%BC-%EB%AA%A8%EB%8B%88%ED%84%B0%EB%A1%9C-%EC%BD%94%EB%94%A9%ED%95%98%EB%A9%B4%EC%84%9C-%EC%9E%91%EC%97%85%EC%97%90-%EC%A7%91%EC%A4%91%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4.webp?a=1&b=1&s=612x612&w=0&k=20&c=HKsOvJJBq5Os0Wr8QsDGC-jkiTEvjQC6ywhm0Anfzjk=',
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
