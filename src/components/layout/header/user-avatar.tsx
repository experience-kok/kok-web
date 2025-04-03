'use client';

import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';

import { useAuth } from 'hooks/use-auth';

/**
 * 유저 아바타 컴포넌트
 */
export default function UserAvatar() {
  const auth = useAuth();
  return (
    <Avatar>
      <AvatarImage src={auth.user?.profileImage} />
      {/* 추후 기본 이미지 필요 */}
      <AvatarFallback>CK</AvatarFallback>
    </Avatar>
  );
}
