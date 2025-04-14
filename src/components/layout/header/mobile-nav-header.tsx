import { ChevronLeft } from 'lucide-react';

import { Text } from 'components/ui/text';

/**
 * 모바일 환경에서만 보이는 헤더 컴포넌트
 * 뒤로가기 버튼, 현재 페이지명, 추가 버튼등이 있는 컴포넌트
 * 메인 페이지에서는 사용하지 않음
 */
export default function MobileNavHeader() {
  return (
    <header className="sticky top-0 z-10 mx-auto flex h-16 w-full max-w-[720px] items-center border-b border-gray-200 bg-white px-4 lg:hidden">
      <button className="absolute left-4">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <div className="w-full text-center">
        <Text size="2xl" weight="bold">
          내 정보
        </Text>
      </div>
    </header>
  );
}
