import React from 'react';

import Footer from 'components/layout/footer';
import FooterMenu from 'components/layout/footer-menu';
import Header from 'components/layout/header';
import ScrollToTopButton from 'components/shared/scroll-to-top-button';

export default function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="h-full w-full flex-grow">{children}</main>
      <FooterMenu />
      <Footer />

      {/* pc 버전 스크롤 버튼 */}
      <div className="fixed right-8 bottom-8 hidden md:block">
        <ScrollToTopButton />
      </div>
    </div>
  );
}
