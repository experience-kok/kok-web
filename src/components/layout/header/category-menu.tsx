import { Button } from 'components/ui/button';

import HamburgerButton from './hamburger-button';

/**
 * 상단 헤더 카테고리 메뉴 컴포넌트
 */
export default function CategoryMenu() {
  return (
    <Button size="icon" className="hidden items-center md:flex">
      <HamburgerButton />
    </Button>
  );
}
