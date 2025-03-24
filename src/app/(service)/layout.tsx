import React from 'react';

import Footer from 'components/layout/footer';
import FooterMenu from 'components/layout/footer-menu';
import Header from 'components/layout/header';

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
    </div>
  );
}
