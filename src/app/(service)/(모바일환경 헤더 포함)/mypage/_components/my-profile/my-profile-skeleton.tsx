'use client';

import { Skeleton } from 'components/ui/skeleton';

/**
 * 클라이언트 컴포넌트: 마이페이지 프로필 영역 스켈레톤 컴포넌트
 */
export default function MyProfileSkeleton() {
  return (
    <section className="px-6 py-10">
      <div className="flex items-center gap-5">
        {/* 프로필 이미지 자리 */}
        <Skeleton className="h-20 w-20 rounded-full" />

        {/* 닉네임, 이메일 자리 */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-40" /> {/* 닉네임 자리 */}
          <Skeleton className="h-4 w-60" /> {/* 이메일 자리 */}
        </div>
      </div>
    </section>
  );
}
