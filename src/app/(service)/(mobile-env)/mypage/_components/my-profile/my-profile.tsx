'use client';

import { Camera } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Tooltip from 'components/shared/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { Text } from 'components/ui/text';

import { useGetProfileQuery } from 'services/users/users-query';

import ProfileImageUploadDialog from './profile-image-upload-dialog';

/**
 * 클라이언트 컴포넌트: 마이페이지 프로필 영역
 */
export default function MyProfile() {
  const { data: userData } = useGetProfileQuery();

  return (
    <section className="px-6 py-10">
      <div className="flex items-center gap-5">
        <ProfileImageUploadDialog>
          <Tooltip content="프로필 이미지 변경">
            <div className="group relative cursor-pointer">
              <Avatar className="h-20 w-20">
                <AvatarImage asChild src={userData.user.profileImage ?? undefined}>
                  <Image
                    src={userData.user.profileImage ?? ''}
                    width={70}
                    height={70}
                    alt="프로필 이미지"
                  />
                </AvatarImage>

                <AvatarFallback>체험콕</AvatarFallback>
              </Avatar>

              {/* 어두운 오버레이 */}
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border border-white bg-white">
                <Camera size={20} className="fill-muted-foreground text-white" />
              </div>
            </div>
          </Tooltip>
        </ProfileImageUploadDialog>

        <div className="flex flex-col items-start">
          <Text weight="bold" size="2xl">
            {userData.user?.nickname}
          </Text>
          <Link href="/mypage/edit">
            <Text
              weight="semibold"
              size="md"
              color="muted-foreground"
              className="cursor-pointer underline"
            >
              내 정보 수정
            </Text>
          </Link>
        </div>
      </div>
    </section>
  );
}
