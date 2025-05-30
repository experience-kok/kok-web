'use client';

import { useCallback } from 'react';

import { LogOut, Settings, User, CreditCard, HelpCircle, FolderPen } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from 'components/ui/hover-card';
import { Separator } from 'components/ui/separator';

import { useAuth } from 'hooks/use-auth';

import { useLogoutMutation } from 'services/auth/auth-query';

import UserAvatarMenu from './user-avatar-menu';

export default function UserAvatar() {
  const auth = useAuth();
  const router = useRouter();

  const logoutMutation = useLogoutMutation(); // 훅 사용

  // 로그아웃
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // 프로필 페이지 이동
  const handleRouteToProfilePage = useCallback(() => {
    router.push('/mypage');
  }, [router]);

  // 캠페인 관리 페이지 이동
  const handleRoouteToCampaignManagePage = useCallback(() => {
    router.push('/campaign/manage');
  }, [router]);

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage asChild src={auth.user?.profileImage ?? undefined}>
            <Image src={auth.user?.profileImage || ''} alt="logo" width={40} height={40} />
          </AvatarImage>
          <AvatarFallback>체험콕</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-44 p-2">
        <div className="flex flex-col gap-1">
          <UserAvatarMenu
            icon={<User size={16} />}
            label="내 정보"
            onClick={handleRouteToProfilePage}
          />
          <UserAvatarMenu
            icon={<FolderPen size={16} />}
            label="캠페인 관리"
            onClick={handleRoouteToCampaignManagePage}
          />
          <Separator />
          <UserAvatarMenu icon={<Settings size={16} />} label="설정" />
          <UserAvatarMenu icon={<CreditCard size={16} />} label="결제 관리" />
          <UserAvatarMenu icon={<HelpCircle size={16} />} label="도움말" />
          <UserAvatarMenu icon={<LogOut size={16} />} label="로그아웃" onClick={handleLogout} />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
