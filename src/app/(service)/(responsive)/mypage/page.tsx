'use client';

import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import SplitBox from 'components/ui/split-box';
import { Text } from 'components/ui/text';

import { useAuth } from 'hooks/use-auth';

import { ROLE } from 'types/auth';

/**
 * 마이페이지
 */
export default function MyPage() {
  const { user } = useAuth();
  return (
    <>
      <section className="px-4 py-10 lg:px-16">
        <div className="flex items-center gap-5">
          <Avatar className="h-20 w-20">
            {/* 프로필 이미지가 미지정일 경우 사용할 서비스 이미지 필요 */}
            <AvatarImage src={user?.profileImage ?? undefined} />
            <AvatarFallback>{user?.nickname ?? 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <Text weight="bold" size="2xl">
              {user?.nickname}
            </Text>
            <Text weight="semibold" size="lg">
              {user?.email}
            </Text>
          </div>
        </div>
      </section>

      <SplitBox className="h-2" />

      <section className="px-4 py-10 lg:px-16">
        <Text as="h2" size="2xl" weight="bold" className="mb-4">
          내 캠페인
        </Text>
        <div className="grid grid-cols-4 divide-x">
          {new Array(4).fill(0).map((_, index) => (
            <div className="flex flex-col items-center gap-1" key={index}>
              <Text size="2xl" weight="bold" color="primary">
                0
              </Text>
              <Text size="lg" weight="semibold">
                지원
              </Text>
            </div>
          ))}
        </div>
      </section>

      <SplitBox className="h-2" />

      <section className="px-4 py-10 lg:px-16">
        <Text as="h2" size="2xl" weight="bold" className="mb-4">
          등록된 SNS
        </Text>
      </section>
    </>
  );
}
