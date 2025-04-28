'use client';

import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { Text } from 'components/ui/text';

import { useGetProfileQuery } from 'services/users/users-query';

/**
 * 클라이언트 컴포넌트: 마이페이지 프로필 영역
 */
export default function MyProfile() {
  const { data: userData } = useGetProfileQuery();

  return (
    <section className="px-6 py-10">
      <div className="flex items-center gap-5">
        <Avatar className="h-20 w-20">
          {/* 프로필 이미지가 미지정일 경우 사용할 서비스 이미지 필요 */}
          <AvatarImage src={userData.user?.profileImage ?? undefined} />
          <AvatarFallback>{userData.user?.nickname ?? ''}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <Text weight="bold" size="2xl">
            {userData.user?.nickname}
          </Text>
          <Text weight="semibold" size="lg">
            {userData.user?.email}
          </Text>
        </div>
      </div>
    </section>
  );
}
