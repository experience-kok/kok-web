'use client';

import { useCallback } from 'react';

import { LogOut, Settings, User, CreditCard, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from 'components/ui/hover-card';

import { useAuth } from 'hooks/use-auth';

import { useLogoutMutation } from 'services/auth/auth-query';

import UserMenuItem from './user-avatar-menu';

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

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src={auth.user?.profileImage ?? undefined} />
          <AvatarFallback>{auth.user?.nickname ?? 'U'}</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-44 p-2">
        <div className="flex flex-col gap-1">
          <UserMenuItem
            icon={<User size={16} />}
            label="내 프로필"
            onClick={handleRouteToProfilePage}
          />
          <UserMenuItem icon={<Settings size={16} />} label="설정" />
          <UserMenuItem icon={<CreditCard size={16} />} label="결제 관리" />
          <UserMenuItem icon={<HelpCircle size={16} />} label="도움말" />
          <UserMenuItem icon={<LogOut size={16} />} label="로그아웃" onClick={handleLogout} />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
