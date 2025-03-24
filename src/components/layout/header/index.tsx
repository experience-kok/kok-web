import React from 'react';

import HeaderLogo from 'components/layout/header/header-logo';
import HeaderNav from 'components/layout/header/header-nav';
import PaddingWrapper from 'components/layout/padding-wrapper';

import HeaderSecondNav from './header-second-nav';
import LoginButton from './login-button';
import SearchButton from './search-button';

/**
 * 헤더 레이아웃 컴포넌트
 */
export default function Header() {
  return (
    <>
      <header className="flex h-14 w-full md:h-16 md:border-b-[1px] md:border-gray-200">
        <PaddingWrapper>
          <div className="flex h-full w-full items-center">
            <div className="flex h-full w-full items-center">
              <HeaderLogo />
              <HeaderNav />
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <LoginButton />
              </div>
              <SearchButton />
            </div>
          </div>
        </PaddingWrapper>
      </header>
      <HeaderSecondNav />
    </>
  );
}
