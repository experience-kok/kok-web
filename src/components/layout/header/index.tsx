import React from 'react';

import HeaderLogo from 'components/layout/header/header-logo';
import HeaderNav from 'components/layout/header/header-nav';
import PaddingWrapper from 'components/layout/padding-wrapper';

/**
 * 헤더 레이아웃 컴포넌트
 */
export default function Header() {
  return (
    <header className="h-20 w-full border-b border-gray-300">
      <PaddingWrapper>
        <div className="flex h-full w-full items-center">
          <HeaderLogo />
          <HeaderNav />
        </div>
      </PaddingWrapper>
    </header>
  );
}
