import type { Metadata } from 'next';

import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

import Provider from 'components/provider';
import GlobalLoading from 'components/shared/global-loading';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '체험콕',
  description: '체험콕 설명',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head></head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          <GlobalLoading />
          {children}
        </Provider>
      </body>
    </html>
  );
}
