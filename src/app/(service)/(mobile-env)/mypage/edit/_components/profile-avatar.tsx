import { Camera } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { Text } from 'components/ui/text';

interface Props {
  profileImage: string | null;
  fallbackText: string;
  onImageChange: (imageUrl: string) => void;
}

/**
 * 내 정보 수정 페이지의 유저 아바타 컴포넌트
 */
export default function ProfileAvatar({ profileImage, fallbackText, onImageChange }: Props) {
  const handleClick = async () => {
    // TODO presigned-url 구현 완료시 해당 부분에 로직 구현
    onImageChange(
      'https://media.istockphoto.com/id/2148178472/ko/%EC%82%AC%EC%A7%84/hispanic-programmers-collaborating-on-software-development-in-a-modern-office-setting.jpg?s=612x612&w=is&k=20&c=UYJ6tr2fi44xabWydFWWStS0jQO6R_n7KqN46YSMwHc=',
    );
    console.log('이미지 변경');
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-10">
      <div className="group relative cursor-pointer" onClick={handleClick}>
        <Avatar className="h-20 w-20">
          <AvatarImage src={profileImage ?? undefined} />
          <AvatarFallback>{fallbackText ?? ''}</AvatarFallback>
        </Avatar>

        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />

        <div className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border border-white bg-white">
          <Camera size={20} className="fill-muted-foreground text-white" />
        </div>
      </div>

      <Text weight="bold" color="muted-foreground">
        프로필 이미지 등록
      </Text>
    </section>
  );
}
