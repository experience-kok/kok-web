import React from 'react';

import type { Metadata } from 'next';

import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

import Footer from 'components/layout/footer';
import Header from 'components/layout/header';
import Provider from 'components/provider';

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
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="h-full w-full flex-grow">{children}</main>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
