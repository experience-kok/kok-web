import React from 'react';

import HeaderLogo from 'components/layout/header/header-logo';
import HeaderNav from 'components/layout/header/header-nav';
import PaddingWrapper from 'components/layout/padding-wrapper';

import HeaderSecondNav from './header-second-nav';

/**
 * 헤더 레이아웃 컴포넌트
 */
export default function Header() {
  return (
    <>
      <header className="h-14 w-full md:h-16 md:border-b-[1px] md:border-gray-200">
        <PaddingWrapper>
          <div className="flex h-full w-full items-center">
            <HeaderLogo />
            <HeaderNav />
          </div>
        </PaddingWrapper>
      </header>
      <HeaderSecondNav />
    </>
  );
}
